import md5 from 'md5'
// import XLSX from 'xlsx'

export function handleFormat (obj) {
  const result = []
  for (const key in obj) {
    result[key] = obj[key]
  }
  return result
}
export function transToUint8Array (str) {
  var a = str.substr(5, 21)
  var len = a.length
  var arr = []
  for (let i = 0; i < len; i++) {
    arr.push(a.charCodeAt(i))
  }
  var tmpUint8Array = new Uint8Array(arr)
  return tmpUint8Array
}
export function listToTree (list) {
  var getTree = (routes, pid = 0) => {
    const result = []
    let temp
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].pid === pid) {
        const current = { ...routes[i] }
        temp = getTree(routes, routes[i].id)
        if (temp.length > 0) {
          current.children = temp
        }
        result.push(current)
      }
    }
    return result
  }
  return getTree(list)
}

// export function importExcel (event, element, callback) {
//   if (!event.target.files) return
//   var f = event.target.files[0]
//   var reader = new FileReader()
//   var excelJson
//   reader.onload = function (e) {
//     var data = e.target.result
//     var wb = XLSX.read(data, { type: 'binary' })
//     excelJson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
//     var excelXLSX = wb.Sheets[wb.SheetNames[0]]
//     document.getElementById(element).reset()
//     callback(excelJson, excelXLSX)
//   }
//   reader.readAsBinaryString(f)
// }

// export function timeFix () {
//   const time = new Date()
//   const hour = time.getHours()
//   return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
// }

// export function welcome () {
//   const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
//   const index = Math.floor(Math.random() * arr.length)
//   return arr[index]
// }

export function isEmail (value) {
  const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return regex.test(value)
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * 清理空值，对象
 * @param children
 * @returns {*[]}
 */
export function filterEmpty (children = []) {
  return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
}

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}

/**
 *
 * @param {*} param
 */
export const md5Hash = (param) => {
  const str = param || Date.now() + Math.round(Math.random() * 1000)
  return md5(str)
}

/**
 *
 * @param {*} file
 * @param {*} key
 * @param {*} token
 */
