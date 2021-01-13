import { UserLayout, BasicLayout, RouteView, PageView } from '@/layouts'
// import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    title: '首页',
    meta: { title: '首页' },
    redirect: '/logs/strategy',
    children: [
      {
        path: '/logs',
        name: 'logs',
        redirect: '/logs/strategy',
        component: PageView,
        meta: { title: '日志', icon: bxAnaalyse },
        children: [
          {
            path: '/logs/:id/search',
            name: 'searchlogs',
            hidden: true,
            component: () => import('@/views/logs/SearchLogs'),
            meta: { title: '查询日志' }
          },
          {
            path: '/logs/strategy',
            name: 'Strategy',
            component: () => import('@/views/logs/Strategy'),
            meta: { title: '策略页面' }
          }
        ]
      }
    ]
  }
]

const notFoundRouter = {
  path: '*',
  name: 'notFound',
  meta: { title: 'notFound' },
  redirect: '/404',
  hidden: true
}
// 基础路由
const constantRouterMap = [
  {
    path: '/user',
    name: 'user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      { path: 'login', name: 'login', component: () => import('@/views/user/Login') },
      { path: 'register', name: 'register', component: () => import('@/views/user/Register') }
    ]
  },
  {
    path: '/exception',
    name: 'exception',
    component: RouteView,
    hidden: true,
    redirect: '/exception/403',
    meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
    children: [
      {
        path: '/exception/403',
        name: 'exception403',
        component: () => import('@/views/exception/403'),
        meta: { title: '403', permission: ['exception'] }
      },
      {
        path: '/exception/404',
        name: 'exception404',
        component: () => import('@/views/exception/404'),
        meta: { title: '404', permission: ['exception'] }
      },
      {
        path: '/exception/500',
        name: 'exception500',
        component: () => import('@/views/exception/500'),
        meta: { title: '500', permission: ['exception'] }
      }
    ]
  },
  { path: '/404', name: '404', meta: { title: '404' }, component: () => import('@/views/exception/404') }
]

export { asyncRouterMap, notFoundRouter, constantRouterMap }
