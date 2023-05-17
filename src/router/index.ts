import Home from '@/views/Home/index.vue'
import About from '@/views/About/index.vue'
import Literature from '@/views/Literature/index.vue'
import System from '@/views/System/index.vue'
import ArticleDetail from '@/views/ArticleDetail/index.vue'
import Login from '@/views/Admin/login.vue'
import Admin from '@/views/Admin/index.vue'
import LayoutDefault from '@/layout/default.vue'
import LayoutAdmin from '@/layout/admin.vue'
import AdminData from '@/views/Admin/data.vue'
import AdminLiterature from '@/views/Admin/literature.vue'
import AdminUser from '@/views/Admin/user.vue'
import { createRouter, createWebHistory } from 'vue-router'

const adminRoute = [
  {
    path: 'data',
    name: 'AdminData',
    component: AdminData
  },
  {
    path: 'literature',
    name: 'AdminLiterature',
    component: AdminLiterature
  },
  {
    path: 'user',
    name: 'User',
    component: AdminUser
  },
  {
    path: '',
    redirect: 'dashboard'
  }
]

const childrenRoute = [
  {
    path:'/home',
    name:'Home',
    component: Home
  },
  {
    path:'/system',
    name:'System',
    component:() => System
  },
  {
    path:'/literature',
    name:'Literature',
    component:() => Literature
  },
  {
    path:'/about',
    name:'About',
    component:() => About
  },
  {
    path: '/detail/:province',
    name: 'Detail',
    component: () => ArticleDetail
  },
  {
    path: '',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass:'router-active',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      component: LayoutAdmin,
      children: adminRoute
    },
    {
      path: '/',
      component: LayoutDefault,
      children: childrenRoute
    }
  ]
})

export default router
