import { service, axios } from '@/utils/request'

import user from './v1/user'
import userpower from './v1/userpower'
import employee from './v1/employee'
const api = {
  install (Vue) {
    Vue.prototype.$api = api
    Vue.prototype.$http = service
    Vue.prototype.$third = axios
  },
  user,
  userpower,
  employee
}

export default api
