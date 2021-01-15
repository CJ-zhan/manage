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
    redirect: '/employee/info',
    children: [
      // {
      //   path: '/logs',
      //   name: 'logs',
      //   redirect: '/logs/strategy',
      //   component: PageView,
      //   meta: { title: '日志', icon: bxAnaalyse },
      //   children: [
      //     {
      //       path: '/logs/:id/search',
      //       name: 'searchlogs',
      //       hidden: true,
      //       component: () => import('@/views/logs/SearchLogs'),
      //       meta: { title: '查询日志' }
      //     },
      //     {
      //       path: '/logs/strategy',
      //       name: 'Strategy',
      //       component: () => import('@/views/logs/Strategy'),
      //       meta: { title: '策略页面' }
      //     }
      //   ]
      // },
      {
        path: '/employee',
        name: 'employee',
        redirect: '/employee/info',
        component: PageView,
        meta: { title: '员工资料', icon: bxAnaalyse },
        children: [
          {
            path: '/employee/info',
            name: 'infoManage',
            component: () => import('@/views/employee/Employee'),
            meta: { title: '员工资料管理页面' }
          }
        ]
      },
      {
        path: '/salary',
        name: 'salary',
        redirect: '/salary/manage',
        component: PageView,
        meta: { title: '薪资管理', icon: bxAnaalyse },
        children: [
          {
            path: '/salary/manage',
            name: 'salaryManage',
            component: () => import('@/views/salary/Salary'),
            meta: { title: '薪资管理页面' }
          }
        ]
      },
      {
        path: '/department',
        name: 'department',
        redirect: '/department/manage',
        component: PageView,
        meta: { title: '部门管理', icon: bxAnaalyse },
        children: [
          {
            path: '/department/manage',
            name: 'departmentManage',
            component: () => import('@/views/department/Department'),
            meta: { title: '部门管理页面' }
          }
        ]
      },
      {
        path: '/statistics',
        name: 'statistics',
        redirect: '/statistics/manage',
        component: PageView,
        meta: { title: '统计管理', icon: bxAnaalyse },
        children: [
          {
            path: '/statistics/manage',
            name: 'statisticsManage',
            component: () => import('@/views/statistics/Statistics'),
            meta: { title: '统计管理页面' }
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