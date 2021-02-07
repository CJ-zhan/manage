import { service } from '@/utils/request'

class department {
  static departmentInfo (params) { return service.get('/department/info', { params }) }
}

export default department
