import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {
  quillEditor
} from 'vue-quill-editor'

export default {
  created () {
    this.fetchGoodsCategoryList()
  },

  data () {
    return {
      goodsCateList: [],
      goodsFormAdd: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        is_promote: false,
        pics: [],
        goods_introduce: ''
      },
      files: [],
      uploadHeader: {
        Authorization: localStorage.getItem('token')
      },
      step: 0,
      stepName: 'basic'
    }
  },

  methods: {
    async fetchGoodsCategoryList () {
      const ret = await this.$http.get('/categories', {
        params: {
          type: 3
        }
      })
      const { meta, data } = ret.data
      if (meta.status === 200) {
        this.goodsCateList = data
      }
    },

    async addGoods () {
      const ret = await this.$http.post('goods', {
        ...this.goodsFormAdd,
        goods_cat: this.goodsFormAdd.goods_cat.join(',')
      })

      const { meta } = ret.data
      if (meta.status === 201) {
        this.$refs.goodsFormAddRef.resetFields()

        this.$message({
          type: 'success',
          message: '商品添加成功'
        })
      } else if (meta.status === 400) {
        this.$message({
          type: 'error',
          message: meta.msg
        })
      }
    },

    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },

    async uploadSuccess (response, file, fileList) {
      const path = response.data.tmp_path
      this.goodsFormAdd.pics.push({
        pic: path
      })
    },

    nextStep (step, stepName) {
      this.step = step
      this.stepName = stepName
    },

    changeTab (tab) {
      this.step = tab.index - 0
    }
  },

  components: {
    quillEditor
  }
}
