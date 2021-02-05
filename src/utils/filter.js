import Vue from 'vue'
import moment from 'moment'
import constv from '@/config/constv'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  // return moment(dataStr).format(pattern)
  return moment.unix(dataStr).format(pattern)
})

Vue.filter('statusSex', function (dataStr) {
  if (dataStr === 0) {
    return '男'
  } else {
    return '女'
  }
})
// 上下架状态
Vue.filter('statusFilter', function (type) {
  return constv.VISIBILITY[type].text
})
Vue.filter('statusTypeFilter', function (type) {
  return constv.VISIBILITY[type].status
})

Vue.filter('millisecondToHMS', function (millisecond) {
  const seconds = Math.round(millisecond / 100)
  const h = Math.floor(seconds / 60 / 60)
  const m = Math.floor(seconds / 60 % 60)
  const s = Math.floor(seconds % 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})
