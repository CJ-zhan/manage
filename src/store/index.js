import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import template from './modules/template'
import finance from './modules/finance'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    template,
    finance
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})