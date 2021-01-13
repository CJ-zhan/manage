import { service, axios } from '@/utils/request'

import user from './v1/user'
import applog from './v1/applog'

const api = {
  install (Vue) {
    Vue.prototype.$api = api
    Vue.prototype.$http = service
    Vue.prototype.$third = axios
  },
  user,
  applog
}

export default api
