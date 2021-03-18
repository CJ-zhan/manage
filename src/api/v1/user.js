import { service } from '@/utils/request'

class user {
  static Login (params, config = {}) { return service.post('/user/login', params, config) }
  static Register (params) { return service.post('/user/register', params) }
  static UserInfo (params) { return service.get('/user/info', { params }) }
  static UserPhotoInfo (params) { return service.get('/user/getphoto', { params }) }
  static UserPhotoChange (params) { return service.post('/user/changephoto', params) }
  static ChangePwd (params) { return service.post('/user/resetpwd', params) }
  static ChangeInfo (params) { return service.post('/user/changeinfo', params) }
}

export default user
