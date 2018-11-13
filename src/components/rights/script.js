export default {
  data () {
    return {
      rightsList: []
    }
  },

  created () {
    this.fetchRightsList()
  },

  methods: {
    async fetchRightsList () {
      const ret = await this.$http.get(`rights/list`)

      const { meta, data } = ret.data
      if (meta.status === 200) {
        this.rightsList = data
      }
    },
    indexMethod (index) {
      return index
    }
  }
}
