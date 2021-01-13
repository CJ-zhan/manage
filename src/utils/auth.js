// import Cookies from 'js-cookie'
import Vue from 'vue'

const TOKEN_KEY = 'APP_TOKEN'

// export function getToken () {
//   return Cookies.get(TOKEN_KEY)
// }

// export function setToken (token) {
//   return Cookies.set(TOKEN_KEY, token)
// }

// export function removeToken () {
//   return Cookies.remove(TOKEN_KEY)
// }

export function getToken () {
  // return localStorage.getItem(TOKEN_KEY)
  return Vue.ls.get(TOKEN_KEY)
}

export function setToken (token) {
  Vue.ls.set(TOKEN_KEY, token, 8 * 60 * 60 * 1000)
  // return localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken () {
  Vue.ls.remove(TOKEN_KEY)
  // return localStorage.removeItem(TOKEN_KEY)
}

export function getStorage (key) {
  return localStorage.getItem(key)
}

export function setStorage (key, val) {
  return localStorage.setItem(key, val)
}

export function removeStorage (key) {
  return localStorage.removeItem(key)
}

export function removeAllStorge () {
  return localStorage.clear()
}
