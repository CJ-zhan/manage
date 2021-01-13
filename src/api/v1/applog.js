import { service } from '@/utils/request'

class logs {
  // 策略页面
  static getStrategyList (params) {
    return service.get('/v1/AdmAppLog/get_app_log_act_list', { params })
  }
  static createStrategy (params) {
    return service.post('/v1/AdmAppLog/add_app_log_act', params)
  }
  static updateStrategy (params) {
    return service.post('/v1/AdmAppLog/edit_app_log_act', params)
  }
  static removeStrategy (params) {
    return service.post('/v1/AdmAppLog/del_app_log_act_in_batch', params)
  }

  // 日志页面
  static getLogsList (params) {
    return service.get('/v1/AdmAppLog/get_app_log_act_user_list', { params })
  }
  static allAddLogs (params) {
    return service.post('/v1/AdmAppLog/add_app_log_act_user_in_batch', params)
  }
  static removeLogs (params) {
    return service.post('/v1/AdmAppLog/del_app_log_act_user_in_batch', params)
  }
  static updateLogs (params) {
    return service.post('/v1/AdmAppLog/edit_app_log_act_user', params)
  }
}

export default logs
