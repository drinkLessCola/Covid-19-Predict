import { login, type ILoginData } from "@/api/permission";
import router from "@/router";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

interface IUserInfo {
  userName: string
  nickName: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  // localStorage.getItem 如果不存在会返回 null
  // JSON.parse(null) 返回 null
  const userInfo = ref<IUserInfo>(
    JSON.parse(window.localStorage.getItem('userInfo')!) ??
    {
      userName: '',
      nickName: '',
      email: ''
    }
  )

  const token = ref(window.localStorage.getItem('token') || '')

  const setUserInfo = (val: IUserInfo) => {
    userInfo.value = val
  }

  const setToken = (val: string) => {
    token.value = val
  }




  const clearStorage = () => {
    token.value = ''
    sessionStorage.clear()
    localStorage.clear()
  }

  const handleLogin = async (loginData: ILoginData) => {
    try {
      const { token } = await login(loginData)
      // setUserInfo()
      setToken(token)


      // const routerStore = useRouterStore()
      // routerStore.setAsyncRouter()

      // const asyncRouters = routerStore.asyncRouters
      // asyncRouters.forEach(asyncRouter => {
      //   router.addRoute(asyncRouter)
      // })

      await router.replace('/admin/user')
      return true
    } catch (e) {
    } finally {
      // loadingInstance.value.close()
    }
  }

  const handleLogout = async () => {
    clearStorage()
    router.replace({ name: 'login' })
    // why 刷新
    // window.location.reload()  
  }

  watch(() => userInfo.value, () => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  })

  watch(() => token.value, () => {
    localStorage.setItem('token', token.value)
  })

  return {
    userInfo,
    token,

    login: handleLogin,
    logout: handleLogout
  }
})