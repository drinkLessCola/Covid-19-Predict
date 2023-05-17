import { defineStore } from "pinia";
import { ref } from "vue";

interface IRoute {

}

export const useRouterStore = defineStore('router', () => {
  
  const keepAliveRoutes = ref<IRoute>([])
  const asyncRouterFlag = ref()

  const asyncRoutes = ref<IRoute>([])
  const routes = ref()

  const setKeepAliveRoutes = (routes: IRoute[]) => {
    const routeSet = new Set<IRoute>()
    routes.forEach(route => {
      if (route) {
        routeSet.add(route)
      }
    })
    keepAliveRoutes.value = Array.from(routeSet)
  }

  // emit setKeepAlive


  const setAsyncRoutes = () => {
    // 获取动态路由
    // 格式化动态路由
  }
})