import { service } from '@/utils/request'
class employee {
  // 查看员工信息
  static allemployee (params) { return service.get('/employee/info', { params }) }
  // 添加员工信息
  static employeeAddInfo (params) { return service.post('/employee/addinfo', params) }
  // 编辑员工信息
  static employeeEditInfo (params) { return service.post('/employee/editinfo', params) }
  // 删除出员工信息
  static employeeDeleteInfo (params) { return service.post('/employee/deleteinfo', params) }
  // 批量添加
  static employeeAddManyInfo (params) { return service.post('/employee/addmany', params) }
}

export default employee
