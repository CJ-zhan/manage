import api from '@/api'

const template = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 用户导出Excel操作日志
    /**
     * @param {*} operation_type 1.钻石流水、2.充值日志、3.打赏日志、4.被打赏日志、5.服装店购买日志、6.素材市集购买
     * @param {*} admin_id 操作者id
     */
    handleAddOperationLog ({ commit, state }, params) {
      return api.finance.addOperationLog(params)
        .then(() => {})
        .catch(() => {})
    }
  }
}

export default template
