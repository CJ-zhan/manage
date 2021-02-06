import { service } from '@/utils/request'

class userpower {
  static UserInfo (params) { return service.get('/user/info', params) }
}

export default userpower
