// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElTreeGrid from 'element-tree-grid'

// 全局样式
import './assets/css/index.css'

Vue.use(ElementUI)
Vue.component(ElTreeGrid.name, ElTreeGrid)

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 统一处理token
axios.interceptors.request.use((config) => {
  // console.log('axios', config)
  if (config.url.indexOf('login') <= 0) {
    config.headers['Authorization'] = localStorage.getItem('token')
  }

  return config
})
// 生产提示输出
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
