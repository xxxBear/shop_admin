export default {
  created () {
    this.fetchGoodsList()
  },

  data () {
    return {
      goodsList: [],
      total: 0
    }
  },

  methods: {
    async fetchGoodsList (pagenum = 1) {
      const ret = await this.$http.get('goods', {
        params: {
          pagenum,
          pagesize: 5,
          query: ''
        }
      })

      const { meta, data } = ret.data
      if (meta.status === 200) {
        this.goodsList = data.goods
        this.total = data.total
      }
    }
  }
}
