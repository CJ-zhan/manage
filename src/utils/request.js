import axios from 'axios'
import store from '@/store'
// import Qs from 'qs'
import { getToken } from './auth'
import constv from '@/config/constv'
import { message as Message } from 'ant-design-vue/es'

const service = axios.create({
  baseURL: `${constv.API_URL}/manage`,
  timeout: 20000
})

service.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    // console.log(config)
    config.headers['Authorization'] = `Bearer ${token}` // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  console.log(response.data)
  console.log(response)
  const result = response.data
  const message = result.msg
  if (result.data.errCode === 10200) {
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 500)
    })
  }
  if (result.code === -1) {
    Message.error(message)
    return Promise.reject(message)
  }
  return result
}, error => { // 请求其他错误状态码处理信息
  console.log({ error })
  console.log(error.response.data)
  if (error.response.data.errCode === 10200) {
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    })
  }
  const { msg = '请求失败' } = error.response.data
  Message.error(msg)
  return Promise.reject(error)
})

export { service, axios }
