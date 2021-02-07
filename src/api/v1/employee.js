import { service } from '@/utils/request'

class employee {
  static allemployee (params) { return service.get('/employee/info', { params }) }
  static employeeAddInfo (params) { return service.post('/employee/addinfo', params) }
  static employeeEditInfo (params) { return service.post('/employee/editinfo', params) }
  static employeeDeleteInfo (params) { return service.post('/employee/deleteinfo', params) }
}

export default employee
