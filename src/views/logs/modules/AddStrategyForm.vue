<template>
  <a-modal
    :title="[isEdit ? '编辑' : '添加'] + '策略'"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="hide">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="策略名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            :disabled="isEdit"
            v-decorator="[
              'act_name',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.act_name}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="策略ID"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          v-if="isEdit"
        >
          <a-input
            disabled
            v-decorator="[
              'act_id',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.act_id}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="状态"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-radio-group
            v-decorator="['status', {rules: [{ required: true, message: '请选择状态' }], initialValue: currentRecord.status}]"
          >
            <a-radio :value="0">关闭</a-radio>
            <a-radio :value="1">启用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="文件"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          v-if="!isEdit"
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
            <a-button><a-icon type="upload" /> 文件导入 </a-button>
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
      isEdit: false,
      currentRecord: {},
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      file: '',
      fileList: []
    }
  },
  methods: {
    async show (record, isEdit) {
      this.isEdit = !!record
      if (record) {
        this.currentRecord = record
      }
      this.visible = true
    },
    hide () {
      this.currentRecord = {}
      this.form.resetFields()
      this.file = ''
      this.fileList = []
      this.visible = false
    },
    handleChange (file, fileList) {
      if (file.size >= 2 * 1024 * 1024) {
        this.$message.error('文件尺寸过大')
      } else {
        this.fileList[0] = file
        this.flie = file
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
        // console.log(_that.file)
        // console.log(jsonArr)
      }
      if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f)
      return false
    },
    handleSubmit () {
      this.confirmLoading = true
      this.form.validateFields({ force: true }, (error, values) => {
        if (error) {
          this.confirmLoading = false
          return
        }
        const params = {
          ...values
        }
        if (this.isEdit) {
          this.$api.applog.updateStrategy(params)
            .then(res => {
              const { message } = res.message
              this.$message.success(message)
              this.hide()
              this.$emit('fnRefresh')
            })
            .catch(() => {})
            .finally(() => {
              this.confirmLoading = false
            })
        } else {
          delete values.file
          const datajson = this.file
          const status = Number(values.status)
          const actname = values.act_name
          const params1 = {
            status,
            act_name: actname
          }
          this.$api.applog.createStrategy(params1)
            .then(res => {
              const { message } = res.message
              this.$message.success(message)
              this.hide()
              this.$emit('fnRefresh')
              // 获取新增策略id再进行批量导入请求
              const actid = res.data.act_id
              const datajson1 = []
              datajson.map((item, index) => {
                datajson1.push(
                  Object.assign({}, item, { act_id: actid })
                )
              })
              const params2 = {
                data_json: datajson1
              }
              return this.$api.applog.allAddLogs(params2)
            })
            .then(res => {
              const { message } = res.message
              this.$message.success(message)
            })
            .catch(() => {})
            .finally(() => {
              this.confirmLoading = false
            })
        }
      })
    }
  }
}
</script>
