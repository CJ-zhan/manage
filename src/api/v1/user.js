import { service } from '@/utils/request'

class user {
  static Login (params) { return service.post('/user/login', params) }
  static Register (params) { return service.post('/user/register', params) }
  static UserInfo (params) { return service.get('/user/info', { params }) }
  static UserPhotoInfo (params) { return service.get('/user/getphoto', { params }) }
  static ChangePwd (params) { return service.post('/user/resetpwd', params) }
}

export default user
