import router from '@/router'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

let activeAxios = 0
let timer: NodeJS.Timeout

const showLoading = () => {
  activeAxios++
  if (timer) {
    clearTimeout(timer)
  }
  // timer = setTimeout(() => {
  //   if (activeAxios > 0) {
  //     emitter.emit('showLoading')
  //   }
  // }, 400)
}

// const closeLoading = () => {
//   acitveAxios--
//   if (acitveAxios <= 0) {
//     clearTimeout(timer)
//     emitter.emit('closeLoading')
//   }
// }
// http request 拦截器
request.interceptors.request.use(
  config => {
    showLoading()
    const userStore = useUserStore()
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      'Token': userStore.token
    }
    return config
  },
  error => {
    if (!error.config.doNotShowLoading) {
      // closeLoading()
    }
    ElMessage({
      showClose: true,
      message: error,
      type: 'error'
    })
    return error
  }
)

// http response 拦截器
request.interceptors.response.use(
  response => {
    try {
      const { config, data, status } = response
      console.log(response)
      const userStore = useUserStore()
      if (!config.doNotShowLoading) {
        // closeLoading()
      }
      // if (response.headers['new-token']) {
      //   userStore.setToken(response.headers['new-token'])
      // }
      switch (data.code) {
        case 200: return data.data
        case 401: 
          router.push({ name: 'Login', replace: true })
        default:         
          ElMessage({
            showClose: true,
            message: data.msg || decodeURI(response.headers.message),
            type: 'error'
          })
          if (data.data?.reload) {
            userStore.token = ''
            localStorage.clear()
            router.push({ name: 'Login', replace: true })
          }
          return data.msg ? data : response
      }
    } catch (err) {
      console.log(err)
      throw(err)
    }
  },
  error => {
    console.log(error)

    if (!error.config.donNotShowLoading) {
      // closeLoading()
    }

    if (!error.response) {
      ElMessageBox.confirm(`
        <p>检测到请求错误</p>
        <p>${error}</p>
        `, '请求报错', {
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true,
        confirmButtonText: '稍后重试',
        cancelButtonText: '取消'
      })
      return
    }

    switch (error.response.status) {
      case 401:
        ElMessage({
          type: 'error',
          message: '登录状态过期，请重新登录'
        })
        router.replace('/login')
        break
      case 500:
        ElMessageBox.confirm(`
        <p>检测到接口错误${error}</p>
        <p>错误码<span style="color:red"> 500 </span>：此类错误内容常见于后台panic，请先查看后台日志，如果影响您正常使用可强制登出清理缓存</p>
        `, '接口报错', {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: '清理缓存',
          cancelButtonText: '取消'
        })
          .then(() => {
            const userStore = useUserStore()
            userStore.token = ''
            localStorage.clear()
            router.push({ name: 'Login', replace: true })
          })
        break
      case 404:
        ElMessageBox.confirm(`
          <p>检测到接口错误${error}</p>
          <p>错误码<span style="color:red"> 404 </span>：此类错误多为接口未注册（或未重启）或者请求路径（方法）与api路径（方法）不符--如果为自动化代码请检查是否存在空格</p>
          `, '接口报错', {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: '我知道了',
          cancelButtonText: '取消'
        })
        break
    }

    return error
  }
)

export default request