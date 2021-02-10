import { service } from '@/utils/request'

class salary {
  static salaryInfo (params) { return service.get('/salary/info', { params }) }
  static salaryEdit (params) { return service.post('/salary/updateinfo', params) }
  static salaryDelete (params) { return service.post('/salary/deleteinfo', params) }
}

export default salary
