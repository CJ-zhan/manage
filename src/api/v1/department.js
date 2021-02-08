import { service } from '@/utils/request'

class department {
  static departmentInfo (params) { return service.get('/department/info', { params }) }
  static departmentAdd (params) { return service.post('/department/adddepart', params) }
  static departmentUpdate (params) { return service.post('/department/updatedepart', params) }
  static departmentDelete (params) { return service.post('/department/deletedepart', params) }
}

export default department
