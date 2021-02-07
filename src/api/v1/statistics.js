import { service } from '@/utils/request'

class statistics {
  static allemployee (params) { return service.get('/statistics/info', { params }) }
}

export default statistics
