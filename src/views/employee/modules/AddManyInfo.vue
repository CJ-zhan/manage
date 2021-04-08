<template>
  <a-modal
    title="批量导入员工信息"
    :visible="visible"
    :width="640"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- 用户id、系统版本、厂商、设备型号、App版本号、渠道、日期 -->
        <a-form-item
          label="文件"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-upload
            name="file"
            :multiple="false"
            :beforeUpload="handleChange"
            :customRequest="handleChange"
            :file-list="fileList"
            accept=".xlsx,.csv"
            v-decorator="[
              'file',
              {rules: [{ required: true}],
              }
            ]"
          >
            <a-button>
              <a-icon type="upload" /> 文件导入 </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import XLSX from 'xlsx'
export default {
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this),
      confirmLoading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      fileList: [],
      file: ''
    }
  },
  methods: {
    handleChange (file, fileList) {
      if (file.size >= 2 * 1024 * 1024) {
        this.$message.error('文件尺寸过大')
      } else {
        this.fileList[0] = file
      }
      var rABS = true
      const f = fileList[0]
      var reader = new FileReader()
      const _that = this
      reader.onload = function (e) {
        var data = e.target.result
        if (!rABS) data = new Uint8Array(data)
        var workbook = XLSX.read(data, {
          type: rABS ? 'binary' : 'array'
        })
        // 假设我们的数据在第一个标签
        var firstworksheet = workbook.Sheets[workbook.SheetNames[0]]
        // XLSX自带了一个工具把导入的数据转成json
        var jsonArr = XLSX.utils.sheet_to_json(firstworksheet)
        // 通过自定义的方法处理Json，比如加入state来展示
        _that.file = jsonArr
        console.log(_that.file)
        // console.log(jsonArr)
      }
      if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f)
      return false
    },
    handleOk () {
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (err) {
          this.confirmLoading = false
          return
        }
        const datajson = this.file
        console.log(datajson)
        const params = {
          data_json: datajson
        }
        console.log(params)
        this.$api.employee.employeeAddManyInfo(params)
          .then(res => {
            console.log(res)
            const { total, success } = res.data
            this.$message.info(`总共导入${total}条员工信息，成功导入${success}条员工信息`)
            this.$emit('fnRefresh')
            this.handleCancel()
          })
          .catch(() => {})
          .finally(() => {
            this.confirmLoading = false
            // console.log(params)
            this.form.resetFields()
            this.visible = false
            this.fileList = []
            this.file = ''
          })
      })
    },
    handleCancel () {
      this.visible = false
      this.form.resetFields()
      this.fileList = []
      this.file = ''
    },
    show () {
      this.visible = true
      this.form.resetFields()
    }
  }
}
</script>
