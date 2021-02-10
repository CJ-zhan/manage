<template>
  <a-modal
    title=" 编辑员工薪资信息"
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
            :disabled="true"

            v-decorator="[
              's_name',
              {rules: [{ required: true, message: '请输入' }],
               initialValue:s_name}
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
            :disabled="true"
            v-decorator="[
              'p_id',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: p_id}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="基本工资"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              's_salary',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.s_salary}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="五险"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              's_insurance',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.s_insurance}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="公积金"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              's_fund',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.s_fund}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="补贴金"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              's_allowance',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.s_allowance}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="加班工资"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              's_addsalary',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.s_addsalary}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="实发工资"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            :disabled="true"
            v-decorator="[
              's_realsalary',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.s_realsalary}
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
      s_name: '',
      p_id: '',
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
      this.s_name = record.s_name.p_name
      this.p_id = record.s_name.p_id
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
        delete params.s_name
        delete params.p_id
        for (const key in params) {
          params[key] = Number(params[key])
        }
        params._id = this.currentRecord._id
        params.s_realsalary = (params.s_salary + params.s_addsalary + params.s_allowance) - (params.s_insurance + params.s_fund)
        this.$api.salary.salaryEdit(params)
          .then(res => {
            const { msg } = res
            this.$message.success(msg)
            this.hide()
            this.$emit('fnRefresh')
          })
          .catch(err => {
            this.$message.error('编辑失败')
            console.log(err)
          })
          .finally(() => {
            this.confirmLoading = false
            this.hide()
          })
      })
    }
  }
}
</script>
