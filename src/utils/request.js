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

// const err = (error) => {
//   return Promise.reject(error)
// }

service.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}` // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  console.log(response)
  const newdata = []
  response.data.data.map(item => {
    newdata.push(
      Object.assign(item, { id: item._id })
    )
  })
  console.log(newdata)

  const result = newdata
  const message = result.msg
  if (result.code === -1) {
    Message.error(message)
    return Promise.reject(message)
  }
  if (result.errCode === 10200) {
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    })
  }
  return result
}, error => { // 请求其他错误状态码处理信息
  console.log({ error })
  const { msg = '请求失败' } = error.response.data
  Message.error(msg)
  return Promise.reject(error)
})

export { service, axios }
