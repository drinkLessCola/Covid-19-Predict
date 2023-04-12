import Home from '@/views/Home/index.vue'
import About from '@/views/About/index.vue'
import Literature from '@/views/Literature/index.vue'
import System from '@/views/System/index.vue'
import ArticleDetail from '@/views/ArticleDetail/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass:'router-active',
  routes: [
    {
      path:'/home',
      name:'Home',
      component:Home
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
      component: ArticleDetail
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router
