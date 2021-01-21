import axios from 'axios'
import store from '@/store'
// import Qs from 'qs'
import { getToken } from './auth'
import constv from '@/config/constv'
import { message as Message } from 'ant-design-vue/es'

const service = axios.create({
  baseURL: `${constv.API_URL}/manage`,
  timeout: 20000
  // transformRequest: params => Qs.stringify(params) // 参数格式化 qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' }) => 'a=b&a=c'
  // paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'repeat' }) // 参数格式化 qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' }) => 'a=b&a=c'
})

const err = (error) => {
  return Promise.reject(error)
}

service.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers['MAuthorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

service.interceptors.response.use(response => {
  const result = response.data
  const message = result.msg
  if (result.status === 'error') {
    Message.error(message.message)
    return Promise.reject(message.message)
  }
  if (result.errCode === 10200) {
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    })
  }
  return result
}, err)

export { service, axios }
