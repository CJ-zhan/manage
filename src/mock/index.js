export default {
  // 当前用户信息
  info: {
    code: 0,
    msg: '请求成功',
    data: {
      id: 1,
      username: 'admin',
      nickname: '管理员123',
      status: 1,
      group_id: 1,
      avatar: 'https://easy-mock.com/upload/2019/06/14/205048d5a91d16468fd81534a55b2384.png',
      email: 'chuman@dreampix.com'
    }
  },
  //
  routes: {
    code: 0,
    msg: '请求成功',
    data: [
      {
        id: 1,
        pid: 0,
        name: '首页',
        key: 'index',
        permission: 'BasicLayout',
        url: 'Admin/Index/index.html',
        icon: 'am-icon-home',
        ismenu: 1,
        spacer: '',
        haschild: 0
      },
      {
        id: 2,
        pid: 1,
        name: '仪表盘',
        key: 'dashboard',
        permission: 'RouteView',
        url: 'Admin/Index/index.html',
        icon: 'am-icon-home',
        ismenu: 1,
        spacer: '',
        haschild: 0
      },
      {
        id: 3,
        pid: 2,
        name: '分析页',
        key: 'analysis',
        permission: 'analysis',
        url: 'Admin/Index/index.html',
        icon: 'am-icon-home',
        ismenu: 1,
        spacer: '',
        haschild: 0
      },
      {
        id: 4,
        pid: 2,
        name: '工作台',
        key: 'workplace',
        permission: 'workplace',
        url: 'Admin/Index/index.html',
        icon: 'am-icon-home',
        ismenu: 1,
        spacer: '',
        haschild: 0
      },
      {
        id: 5,
        pid: 1,
        name: '权限管理',
        key: 'auth',
        permission: 'auth',
        url: 'Admin/Index/index.html',
        icon: 'am-icon-home',
        ismenu: 1,
        spacer: '',
        haschild: 0
      },
      {
        id: 6,
        pid: 5,
        name: '权限菜单',
        key: 'authMenus',
        permission: 'authMenus',
        url: '',
        icon: 'am-icon-file',
        ismenu: 1,
        spacer: '',
        haschild: 1
      },
      {
        id: 7,
        pid: 5,
        name: '权限列表',
        key: 'authRoutes',
        permission: 'authRoutes',
        url: '',
        icon: 'am-icon-file',
        ismenu: 1,
        spacer: '',
        haschild: 1
      },
      {
        id: 8,
        pid: 5,
        name: '管理员列表',
        key: 'authList',
        permission: 'authList',
        url: '',
        icon: 'am-icon-file',
        ismenu: 1,
        spacer: '',
        haschild: 1
      },
      {
        id: 9,
        pid: 5,
        name: '编辑管理员',
        key: 'authEdit',
        permission: 'authEdit',
        url: '',
        icon: 'am-icon-file',
        ismenu: 1,
        spacer: '',
        haschild: 1
      },
      {
        id: 10,
        pid: 5,
        name: '角色列表',
        key: 'authRoles',
        permission: 'authRoles',
        url: '',
        icon: 'am-icon-th-list',
        ismenu: 0,
        spacer: '&nbsp;└',
        haschild: 0
      }
    ]
  }
}
