export default {
  created () {
    this.fetchCategoryList()
  },

  data () {
    return {
      cateList: [],
      pagesize: 10,
      total: 0,
      loading: true,
      categories: [],
      cateForm_add: {
        cat_name: '',
        cat_pid: []
      },
      showCateDialog_add: false
    }
  },

  methods: {
    async fetchCategoryList (pagenum = 1) {
      this.loading = true

      const ret = await this.$http.get('categories', {
        params: {
          pagenum,
          pagesize: 10
        }
      })

      const { meta, data } = ret.data
      if (meta.status === 200) {
        this.cateList = data.result
        this.total = data.total
        this.loading = false
      }
    },

    async showAddCateDialog () {
      const ret = await this.$http.get('/categories', {
        params: {
          type: 2
        }
      })

      const { meta, data } = ret.data
      if (meta.status === 200) {
        this.categories = data
        this.showCateDialog_add = true
      }
    },

    async addCateForm () {
      const { cat_name, cat_pid } = this.cateForm_add
      const cat_level = cat_pid.length

      const ret = await this.$http.post('/categories', {
        cat_name,
        cat_pid: cat_pid.pop(),
        cat_level
      })

      const { meta } = ret.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加分类成功'
        })
        this.showCateDialog_add = false
        this.fetchCategoryList()
      }
    }
  }
}
