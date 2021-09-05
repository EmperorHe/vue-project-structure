/**
 * 本文件为全局接口拦截器
 */

import axios from 'axios'

axios.defaults.withCredentials = true
// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.baseURL,
  timeout: 190000
})

// 发送请求
service.interceptors.request.use(
  config => {
    // const token = getToken()
    // // 判断是否有token
    // if (token) {
    //   // 每个接口请求头带上token
    //   config.headers['Authorization'] = token
    // }
    return config
  },
  error => {
    // console.log(`发送request请求错误：${error}`)
    // notification.error({
    //   message: '服务出错',
    //   description: '前端服务出现意外，请联系管理员！'
    // })
    return Promise.reject(error)
  }
)

// 接收后端响应信息
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export { service as axios }
