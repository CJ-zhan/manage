import { service } from '@/utils/request'

class user {
  static Login (params) { return service.post('/v1/AdmUser/login', params) }
  static Logout (params) { return service.post('/v1/AdmUser/logout', params) }
}

export default user
