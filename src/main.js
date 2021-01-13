import '@babel/polyfill'
import Vue from 'vue'
import moment from 'moment'
import App from './App'
import router from './router'
import store from './store'
import api from './api'
// import * as Sentry from '@sentry/browser'
// import { Vue as VueIntegration } from '@sentry/integrations'

import bootstrap from './core/bootstrap'
import constv from './config/constv'

import {
  STable
} from '@/components'

import './core/lazy_use'
import './permission'
import './utils/filter'
Object.defineProperty(Vue.prototype, '$moment', { value: moment })

// if (process.env.NODE_ENV === 'production') {
//   Sentry.init({
//     dsn: 'http://76680e91aa5c402ea552984e8b3c9d4a@test-sentry.c82fce5bf83c440a6b9db3edf8d0166b8.cn-shenzhen.alicontainer.com/8',
//     integrations: [new VueIntegration({ Vue, attachProps: true, logErrors: true })]
//   })
// }
console.log(process.env.VUE_APP_ENV)
Vue.config.productionTip = false
Vue.prototype.constv = constv

Vue.use(api)

Vue.component('s-table', STable)
new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
