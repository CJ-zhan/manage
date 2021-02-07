import { service } from '@/utils/request'

class salary {
  static salaryInfo (params) { return service.get('/salary/info', { params }) }
}

export default salary
