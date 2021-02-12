import api from '@/api'
import { setToken, removeToken, setStorage, removeAllStorge } from '@/utils/auth'
import mock from '@/mock'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: '',
    routes: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      // console.log(userInfo)
      return api.user.Login(userInfo)
        .then(res => {
          console.log(res)
          if (res.code === 0) {
            const result = res.data
            setToken(result.token)
            commit('SET_TOKEN', result.token)
          }
          return res
        })
        .catch(() => {})
    },
    GetInfo ({ commit }) {
      return new Promise(async (resolve, reject) => {
        const { data: info } = await api.userpower.UserPowerInfo()
        const { data: generalroutes } = mock.generalroutes
        const { data: powerroutes } = mock.powerroutes
        if (info.role === 'admin') {
          console.log('管理员')
          const result = {
            ...info,
            permissions: powerroutes,
            permissionList: powerroutes.map(i => i.permission)
          }
          setStorage('USER_INFO', JSON.stringify(result))
          commit('SET_NAME', result.user)
          commit('SET_INFO', result)
          commit('SET_ROLES', result)
          commit('SET_ROUTES', powerroutes)
          resolve(result)
        } else {
          console.log('普通管理员')
          const result = {
            ...info,
            permissions: generalroutes,
            permissionList: generalroutes.map(i => i.permission)
          }
          setStorage('USER_INFO', JSON.stringify(result))
          commit('SET_NAME', result.username)
          commit('SET_INFO', result)
          commit('SET_ROLES', result)
          commit('SET_ROUTES', generalroutes)
          resolve(result)
        }
      })
    },
    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        removeToken()
        removeAllStorge()
        resolve()
      })
    }
  }
}

export default user
