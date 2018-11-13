import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import UserList from '@/components/user-list/user-list'
import Rights from '@/components/rights'
import Roles from '@/components/roles'
import Categories from '@/components/categories'
import Goods from '@/components/goods'
import GoodsAdd from '@/components/goods-add'

// 演示第三方包与Vue的配合使用
import BaiduMap from '@/components/vendors/baidumap'
import Echarts from '@/components/vendors/echarts'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/users',
          component: UserList
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/categories',
          component: Categories
        },
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/goods-add',
          component: GoodsAdd
        }
      ]
    },
    {
      path: '/map',
      component: BaiduMap
    },
    {
      path: '/echarts',
      component: Echarts
    }
    // ,
    // { path: '*', redirect: '/home' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  // 校验登录
  const token = localStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})

export default router
