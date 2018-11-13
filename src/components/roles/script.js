export default {
  data () {
    return {
      rolesList: [],
      rightsList: [],
      checkedRights: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rightFormVisible: false,
      curRoleId: -1
    }
  },

  created () {
    this.fetchRolesList()
  },

  methods: {
    async fetchRolesList () {
      const ret = await this.$http.get(`roles`)

      const { meta, data } = ret.data
      if (meta.status === 200) {
        this.rolesList = data
      }
    },

    async showRightsDialog (curRole) {
      this.curRoleId = curRole.id

      const checkedRights = []
      curRole.children.forEach(level1 => {
        level1.children.forEach(level2 => {
          level2.children.forEach(level3 => {
            checkedRights.push(level3.id)
          })
        })
      })
      this.checkedRights = checkedRights

      const ret = await this.$http.get('rights/tree')

      const { meta, data } = ret.data
      if (meta.status === 200) {
        this.rightsList = data
        this.rightFormVisible = true
      }
    },

    async updateRoleRight () {
      const rids = this.$refs.rightTree.getCheckedKeys()
      const halfIds = this.$refs.rightTree.getHalfCheckedKeys()

      const ret = await this.$http.post(`roles/${this.curRoleId}/rights`, {
        rids: [...rids, ...halfIds].join(',')
      })

      const { meta } = ret.data
      if (meta.status === 200) {
        this.rightFormVisible = false
        this.fetchRolesList()
        this.$message({
          type: 'success',
          message: '角色授权成功'
        })
      }
    },

    async removeRight (role, rightId) {
      // console.log(role.id, rightId)
      const ret = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)

      const { meta, data } = ret.data
      if (meta.status === 200) {
        role.children = data
      }
    },

    indexMethod (index) {
      return index
    }
  }
}
