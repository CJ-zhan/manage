import { service } from '@/utils/request'

class userpower {
  static UserInfo (params) { return service.get('/user/info', { params }) }
  static UserPowerInfo (params) { return service.get('/user/powerinfo', { params }) }
  static UserDeleteInfo (params) { return service.post('/user/deleteuser', params) }
  static OpenPower (params) { return service.post('/user/openpower', params) }
  static ClosePower (params) { return service.post('/user/closepower', params) }
}

export default userpower
