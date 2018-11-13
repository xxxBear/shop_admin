export default {
  created () {
    this.getUserList()
  },
  data () {
    return {
      userList: [],
      total: 0,
      pagenum: 1,
      searchTxt: '',

      // 添加用户对话框
      dialogFormVisible: false,
      editFormVisible: false,
      roleFormVisible: false,

      rolesList: [],
      roleForm: {
        username: '',
        roleId: -1,
        userId: -1
      },

      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      userEditForm: {
        id: -1,
        email: '',
        mobile: ''
      },

      editRules: {
        email: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[3,4,5,7,8][0-9]{9}$/, message: '手机格式不正确', trigger: 'blur' }
        ]
      },

      // 表单校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '用户名长度为5到12个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度为5到12个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[3,4,5,7,8][0-9]{9}$/, message: '手机格式不正确', trigger: 'blur' }
        ]
      },

      rightsList: {},

      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  methods: {
    /**
     * 获取分页数据
     * @param {number} pagenum 当前页默认值为：1
     */
    getUserList (pagenum = 1, query = '') {
      this
        .$http
        .get('/users', {
          // 传递get参数：
          params: {
            pagenum: pagenum,
            pagesize: 2,
            query
          }
        })
        .then(res => {
          console.log(res.data)
          const { meta, data } = res.data
          if (meta.status === 200) {
            this.userList = data.users
            this.total = data.total
            this.pagenum = data.pagenum
          }
        })
    },

    search () {
      this.getUserList(1, this.searchTxt)
    },

    addUser () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this
            .$http({
              method: 'post',
              url: '/users',
              data: this.userAddForm
            })
            .then(res => {
              const { meta } = res.data
              // console.log(meta, data)

              if (meta.status === 201) {
                this.dialogFormVisible = false
                this.$refs.userForm.resetFields()
              }
            })
        } else {
          return false
        }
      })
    },

    cancelAdd () {
      this.dialogFormVisible = false
      this.$refs.userForm.resetFields()
    },

    changeUserState (data) {
      this
        .$http
        .put(`users/${data.id}/state/${data.mg_state}`)
        .then(res => {
          const { meta } = res.data

          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: `${data.mg_state ? '启用' : '禁用'}成功`
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '操作失败，请稍后再试'
          })
        })
    },

    delUser (data) {
      this.$confirm('您确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return this
            .$http
            .delete(`users/${data.id}`)
        })
        .then(res => {
          const { meta } = res.data
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })

            // 删除数据
            this.userList = this.userList.filter(user => user.id !== data.id)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
    },

    showEdit (data) {
      this.editFormVisible = true
      this.userEditForm = { id: data.id, username: data.username, email: data.email, mobile: data.mobile }
    },

    editUser () {
      const { id, email, mobile } = this.userEditForm

      this
        .$http
        .put(`/users/${id}`, {
          email,
          mobile
        })
        .then(res => {
          const { meta } = res.data

          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: meta.msg
            })

            this.editFormVisible = false
            this.getUserList(this.pagenum)
          }
        })
    },

    async showRoleDialog (user) {
      // 获取当前用户的角色信息
      const roleInfo = await this.$http.get(`/users/${user.id}`)
      const { meta: roleMeta, data: roleData } = roleInfo.data
      if (roleMeta.status === 200) {
        // 新用户展示请选择，而不是数字 -1
        if (roleData.rid === -1) {
          this.roleForm.roleId = ''
        } else {
          this.roleForm.roleId = roleData.rid
        }
      }

      // 获取所有角色信息
      const ret = await this.$http.get('/roles')
      const { meta, data } = ret.data
      if (meta.status === 200) {
        this.rolesList = data
        this.roleForm.username = user.username
        this.roleForm.userId = user.id
        this.roleFormVisible = true
      }
    },

    async assignRoleToUser () {
      const { userId, roleId } = this.roleForm
      const ret = await this.$http.put(`users/${userId}/role`, {
        rid: roleId
      })

      const { meta } = ret.data
      if (meta.status === 200) {
        this.roleFormVisible = false
        this.$message({
          type: 'success',
          mesage: '分配角色成功'
        })
      }
    }
  },

  watch: {
    dialogFormVisible (curVal) {
      !curVal && this.$refs.userForm.clearValidate()
    }
  }
}
