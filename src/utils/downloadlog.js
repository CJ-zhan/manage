import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

export function getFile (url) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'blob'
    }).then(data => {
      resolve(data.data)
    }).catch(error => {
      reject(error.toString())
    })
  })
}
export function handleBatchDownload (data, name) {
  const dataurl = data // 需要下载打包的路径, 可以是本地相对路径, 也可以是跨域的全路径
  const zip = new JSZip()
  const cache = {}
  const promises = []
  dataurl.forEach(item => {
    const promise = getFile(item).then(data => { // 下载文件, 并存成blob对象
      const arrname = item.split('/')
      const filename = arrname[arrname.length - 1] // 获取文件名
      zip.file(filename, data, { binary: true }) // 逐个添加文件
      cache[filename] = data
    })
    promises.push(promise)
  })

  Promise.all(promises).then(() => {
    zip.generateAsync({ type: 'blob' }).then(content => { // 生成二进制流
      FileSaver.saveAs(content, `用户ID为${name}日志打包下载.zip`) // 利用file-saver保存文件
    })
  }).catch(err => {
    console.log(err)
    alert('导出失败')
  })
}
