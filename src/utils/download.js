import axios from 'axios'
import JSzip from 'jszip'
import filesaver from 'file-saver'

export function downloadLogs (url) {
  // const fileurl = url
  const zip = new JSzip()
  axios.get(url, { responseType: 'blob' })
    .then((response) => {
      console.log(response)
      var myJson = response.data
      zip.file('1_.log', myJson, { binary: true })
      zip.generateAsync({
        type: 'blob'
      }).then((blob) => {
        filesaver.saveAs(blob, 'name.zip')
      }, (err) => {
        console.log(err)
        alert('导出失败')
      })
    })
}
