import axios from 'axios'
import router from '@/router'
import { Message } from 'iview'
import { setToken, setUserName } from '@/libs/util'
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      if(config.method === 'get'){
        config.data = true
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status, headers } = res
      return { data, status, headers }
    }, error => {
      this.destroy(url)
      console.log(`${url} response code is ${error.response.status}`)
      if(403==error.response.status){
        if(!this.flag){
          Message.warning('登录已过期，请重新扫码登录')
          this.flag = true
        }
        setTimeout(()=>{
          setToken('')
          setUserName('')
          // 清除Modal
          document.getElementById('m_modal_Layer').innerHTML = ''
          // 跳转登录页面
          router.replace({name: 'login'})
        }, 1000)
      }
      return Promise.reject(error.response)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
