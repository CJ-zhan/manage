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

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)
})
Vue.filter('xueliStatus', function (dataStr) {

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
Vue.filter('nationStatus', function (dataStr) {
  if (dataStr === '1') {
    return '普通公民'
  } else if (dataStr === '2') {
    return '团员'
  } else {
    return '党员'
  }
})
Vue.filter('roleStatus', function (dataStr) {
  if (dataStr === '2') {
    return '未转正'
  } else if (dataStr === '0') {
    return '转正审核中....'
  } else {
    return '已转正'
  }
})
Vue.filter('marriageStatus', function (dataStr) {
  if (dataStr === '0') {
    return '已婚'
  } else {
    return '未婚'
  }
})
Vue.filter('xueliStatus', function (dataStr) {
  if (dataStr === '1') {
    return '高中'
  } else if (dataStr === '2') {
    return '专科'
  } else if (dataStr === '3') {
    return '本科'
  } else if (dataStr === '4') {
    return '研究生'
  } else {
    return '博士生'
  }
})

// 上下架状态
Vue.filter('statusFilter', function (type) {
  return constv.VISIBILITY[type].text
})
Vue.filter('statusTypeFilter', function (type) {
  return constv.VISIBILITY[type].status
})

// Vue.filter('millisecondToHMS', function (millisecond) {
//   const seconds = Math.round(millisecond / 100)
//   const h = Math.floor(seconds / 60 / 60)
//   const m = Math.floor(seconds / 60 % 60)
//   const s = Math.floor(seconds % 60)
//   return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
// })
