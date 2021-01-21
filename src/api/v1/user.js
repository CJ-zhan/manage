import { service } from '@/utils/request'

class user {
  static Login (params) { return service.post('/user/login', params) }
  static Register (params) { return service.post('/user/register', params) }
  static Logout (params) { return service.post('/user/logout', params) }
}

export default user
