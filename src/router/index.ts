import Home from '@/views/Home/index.vue'
import About from '@/views/About/index.vue'
import Literature from '@/views/Literature/index.vue'
import System from '@/views/System/index.vue'
import Login from '@/views/Admin/login.vue'
import LayoutDefault from '@/layout/default.vue'
import LayoutAdmin from '@/layout/admin.vue'
import AdminData from '@/views/Admin/data/index.vue'
import AdminLiterature from '@/views/Admin/literature.vue'
import AdminUser from '@/views/Admin/user.vue'
import AdminAbout from '@/views/Admin/about.vue'
import { createRouter, createWebHistory } from 'vue-router'

const adminRoute = [
  {
    path: 'data',
    name: 'AdminData',
    component: AdminData,
    children: [
      {
        path: 'current',
        name: 'currentData',
        component: () => import('@/views/Admin/data/currentData.vue')
      },
      {
        path: 'upload',
        name: 'uploadData',
        component: () => import('@/views/Admin/data/UploadData.vue'),
      },
      {
        path: '',
        redirect: '/admin/data/current'
      }
    ]
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
    path: 'about',
    name: 'AdminAbout',
    component: AdminAbout
  },
  {
    path: '',
    redirect: 'admin/user'
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
    component: () => import('@/views/System/index.vue')
  },
  {
    path:'/literature',
    name:'Literature',
    component: () => import('@/views/Literature/index.vue')
  },
  {
    path:'/about',
    name:'About',
    component:() => About
  },
  {
    path: '/detail/:province',
    name: 'Detail',
    component: () => import('@/views/ArticleDetail/index.vue')
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
      path: '/admin',
      component: LayoutAdmin,
      children: adminRoute
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: LayoutDefault,
      children: childrenRoute
    }
  ]
})

export default router
