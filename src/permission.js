import router from './router'
import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import message from 'ant-design-vue/es/message'

import { getToken } from '@/utils/auth'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'

NProgress.configure({ showSpinner: false })
const whiteList = ['login', 'register', 'registerResult', 'exception']

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (getToken()) {
    if (to.path === '/user/login') {
      next({ path: '/logs/strategy' })
      NProgress.done()
    } else {
      if (!store.getters.isLogin) {
        store
          .dispatch('GetInfo')
          .then(response => {
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            store.dispatch('GenerateAsyncRoutes', response).then(routes => {
              router.addRoutes(routes)
              if (to.path === redirect) {
                next({ ...to, replace: true })
              } else {
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            message.error('未登录或授权信息过期，请重新登录')
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})