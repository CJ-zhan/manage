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
              'p_id',
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
          <a-select
            v-decorator="[
              'p_department',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.p_department}
            ]"
            placeholder="请选择类型"
          >
            <a-select-option v-for="(item) in departments" :key="item._id" :value="item.d_name">{{ item.d_name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="职位"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'p_position',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.p_position}
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
      departments: [],
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
      this.$api.department.departmentInfo()
        .then(res => {
          this.departments = res.data
        })
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
        params._id = this.currentRecord._id
        this.$api.employee.employeeEditInfo(params)
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
      })
    }
  }
}
</script>
