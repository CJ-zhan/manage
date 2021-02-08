import { service, axios } from '@/utils/request'

import user from './v1/user'
import userpower from './v1/userpower'
import employee from './v1/employee'
import department from './v1/department'
import salary from './v1/salary'

const api = {
  install (Vue) {
    Vue.prototype.$api = api
    Vue.prototype.$http = service
    Vue.prototype.$third = axios
  },
  user,
  userpower,
  employee,
  department,
  salary
}

export default api
