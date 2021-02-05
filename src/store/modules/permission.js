import { asyncRouterMap, notFoundRouter, constantRouterMap } from '@/config/router.config'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
// function hasPermission (permission, route) {
//   if (route.meta && route.meta.permission) {
//     let flag = false
//     for (let i = 0, len = permission.length; i < len; i++) {
//       // flag = route.meta.permission.includes(permission[i])
//       flag = permission[i].key === route.name
//       if (flag) {
//         return true
//       }
//     }
//     return false
//   }
//   return true
// }

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

// function filterAsyncRouter (routerMap, roles) {
//   const accessedRouters = routerMap.filter((route, index) => {
//     if (hasPermission(roles.permissions, route)) {
//       route['title'] = route.meta && route.meta.title
//       route['key'] = route.name // 假设已有
//       // if (route.name === 'index') {
//       //   route['disableCheckbox'] = true
//       // }
//       if (route.children && route.children.length) {
//         // route['disableCheckbox'] = true
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

// // 将平铺动态路由处理成树状路由
// function getRouterTree (routers) {
//   var getTree = (routes, pid = 0) => {
//     const result = []
//     let temp
//     for (let i = 0; i < routes.length; i++) {
//       if (routes[i].pid === pid) {
//         const current = { ...routes[i] }
//         temp = getTree(routes, routes[i].id)
//         if (temp.length > 0) {
//           current.children = temp
//         }
//         result.push(current)
//       }
//     }
//     return result
//   }
//   return getTree(routers)
// }
// 拼接动态路由
// function generator (routerMap, parent) {
//   return routerMap.map(item => {
//     const current = asyncRouterMap[item.key]
//     const currentRouter = {
//       id: item.id,
//       title: item.name,
//       name: item.key || '',
//       key: item.key,
//       path: current.path,
//       component: current.module,
//       meta: { title: item.name, icon: current.meta && current.meta.icon || item.icon || undefined }
//     }
//     // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个反斜杠
//     currentRouter.path = currentRouter.path.replace('//', '/')
//     // 重定向
//     current.redirect && (currentRouter.redirect = current.redirect)
//     // 是否有子菜单，有则递归处理
//     if (item.children && !!item.children.length) {
//       currentRouter.children = generator(item.children, currentRouter)
//     }
//     return currentRouter
//   })
// }
// 将树状路由平铺
// function treeToList (tree) {
//   var queen = []
//   var out = []
//   queen = queen.concat(tree)
//   while (queen.length) {
//     var first = queen.shift()
//     if (first.children) {
//       queen = queen.concat(first.children)
//       delete first['children']
//     }
//     out.push(first)
//   }
//   return out
// }
function hasRoute (permission, route) {
  const permissions = permission.map(i => i.key)
  let flag = false
  for (let i = 0, len = permissions.length; i < len; i++) {
    // 在此做路由权限逻辑控制  结合后端数据
    // flag = route.name === permission[i].key
    flag = true
    if (flag) {
      return true
    }
  }
  return false
}
// function generRouter (routerMap, parent) {
//   return routerMap.map(item => {
//     const currentRouter = {
//       id: item.id,
//       title: item.name,
//       name: item.key || '',
//       key: item.key,
//       path: item.path,
//       component: item.component,
//       meta: { title: item.meta && item.meta.title, icon: item.meta && item.meta.icon || item.icon || undefined }
//     }
//     // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个反斜杠
//     currentRouter.path = currentRouter.path.replace('//', '/')
//     // 重定向
//     item.redirect && (currentRouter.redirect = item.redirect)
//     // 是否有子菜单，有则递归处理
//     if (item.children && !!item.children.length) {
//       currentRouter.children = generRouter(item.children, currentRouter)
//     }
//     return currentRouter
//   })
// }

function filterAccessRouter (routerMap, roles) {
  // console.log(routerMap)
  // console.log(roles)
  const accessedRouters = routerMap.filter(route => {
    if (hasRoute(roles.permissions, route)) {
      route['title'] = route.meta && route.meta.title
      route['key'] = route.name
      if (route.children && route.children.length) {
        route.children = filterAccessRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  console.log(accessedRouters)
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    // GenerateRoutes ({ commit }, data) {
    //   return new Promise(resolve => {
    //     const accessedRouters = filterAsyncRouter(asyncRouterMap, data)
    //     // const accessedRouters = constantRouterMap.concat(asyncRouterMap)
    //     commit('SET_ROUTERS', accessedRouters)
    //     resolve(accessedRouters)
    //   })
    // },
    // GenerateAccessRoutes ({ commit }, data) {
    //   return new Promise(resolve => {
    //     const routerTree = getRouterTree(data.permissions)
    //     const routers = generator(routerTree)
    //     routers.push(notFoundRouter)
    //     commit('SET_ROUTERS', routers)
    //     resolve(routers)
    //   })
    // },
    GenerateAsyncRoutes ({ commit }, data) {
      return new Promise(resolve => {
        // // const routerTree = treeToList(asyncRouterMap)
        // const routers = generRouter(asyncRouterMap)
        // routers.push(notFoundRouter)
        // commit('SET_ROUTERS', routers)
        // resolve(routers)
        const accessedRouters = filterAccessRouter(asyncRouterMap, data)
        console.log('过滤后的路由表')
        console.log(accessedRouters)

        accessedRouters.push(notFoundRouter)
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    }
  }
}

export default permission
