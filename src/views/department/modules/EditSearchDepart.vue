<template>
  <a-modal
    title="更改员工部门"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="hide">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="姓名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            :disabled="isEdit"
            v-decorator="[
              'p_name',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.p_name}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="工号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            :disabled="isEdit"
            v-decorator="[
              'p_pid',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.p_id}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="更改部门"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'p_department',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.p_department}
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
      isEdit: true,
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
    async show (record) {
      this.currentRecord = record
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
        console.log(params)
        this.confirmLoading = false
      })
    }
  }
}
</script>
