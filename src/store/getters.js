import { listToTree } from '@/utils/util'
const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  isLogin: state => !!state.user.info,
  routeList: state => state.user.routes,
  routeTree: state => {
    const routes = []
    state.user.routes.forEach(route => {
      const empty = {
        ...route
      }
      empty.okey = route.key
      empty.key = route.id // 为了方便再 a-tree 组件中使用
      empty.title = route.name
      routes.push(empty)
    })
    return listToTree(routes)
  }
}

export default getters
