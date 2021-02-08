<template>
  <a-modal
    :title="[isEdit ? '编辑' : '新增'] + '部门'"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="hide">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="部门名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            :disabled="isEdit"
            v-decorator="[
              'd_name',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.d_name}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="部门详细信息"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'd_describe',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.d_describe}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
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
      }
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
      this.visible = false
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
        this.confirmLoading = false
        if (this.isEdit) {
          params._id = this.currentRecord._id
          this.$api.department.departmentUpdate(params)
            .then(res => {
              console.log(res)
              const { msg } = res
              this.$message.success(msg)
              this.hide()
              this.$emit('fnRefresh')
            })
            .catch((err) => {
              this.$message.error('更新失败')
              console.log(err)
            })
            .finally(() => {
              this.hide()
              this.confirmLoading = false
            })
        } else {
          console.log(params)
          this.$api.department.departmentAdd(params)
            .then(res => {
              console.log(res)
              const { msg } = res
              this.$message.success(msg)
              this.hide()
              this.$emit('fnRefresh')
            })
            .catch((err) => {
              this.$message.error('更新失败')
              console.log(err)
            })
            .finally(() => {
              this.confirmLoading = false
              this.hide()
            })
        }
      })
    }
  }
}
</script>
