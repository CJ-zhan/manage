<template>
  <a-modal
    :title="'员工信息卡片'"
    :width="1280"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="hide">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" label="inline">
        <a-row>
          <a-col :span="6">
            <a-form-item
              label="姓名"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                v-decorator="[
                  'p_name',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_name}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="性别"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-radio-group
                v-decorator="['p_sex', {rules: [{ required: true, message: '请选择性别' }], initialValue: currentRecord.p_sex}]"
              >
                <a-radio :value="0">男</a-radio>
                <a-radio :value="1">女</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="出生日期"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
              <a-date-picker
                :disabled="isEdit"
                v-decorator="[
                  'p_birth',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: pbirth}
                ]"
                placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="身份证"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                :disabled="isEdit"
                v-decorator="[
                  'p_pid',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_pid}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-item
              label="民族"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
              <a-input
                v-decorator="[
                  'p_minzu',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_minzu}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="政治面貌"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
              <a-select
                v-decorator="[
                  'p_nation',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_nation}
                ]"
                placeholder="请选择类型"
              >
                <a-select-option value="1">普通公民</a-select-option>
                <a-select-option value="2">团员</a-select-option>
                <a-select-option value="3">党员</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="婚姻状况"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-radio-group
                v-decorator="['p_marriage', {rules: [{ required: true, message: '请选择婚姻状况' }], initialValue: currentRecord.p_marriage}]"
              >
                <a-radio :value="0">已婚</a-radio>
                <a-radio :value="1">未婚</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="籍贯"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
              <a-input
                v-decorator="[
                  'p_fromwhere',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_fromwhere}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-item
              label="学历"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
              <a-select
                v-decorator="[
                  'p_xueli',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_xueli}
                ]"
                placeholder="请选择类型"
              >
                <a-select-option value="1">高中</a-select-option>
                <a-select-option value="2">专科</a-select-option>
                <a-select-option value="3">本科</a-select-option>
                <a-select-option value="4">研究生</a-select-option>
                <a-select-option value="5">博士生</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="毕业院校"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                v-decorator="[
                  'p_school',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_school}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="主修专业"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                v-decorator="[
                  'p_profession',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_profession}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
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
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-item
              label="部门"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                :disabled="isEdit"
                v-decorator="[
                  'p_department',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_department}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="职位"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                :disabled="isEdit"
                v-decorator="[
                  'p_position',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_position}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="联系电话"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                v-decorator="[
                  'p_phone',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_phone}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="电子邮箱"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                v-decorator="[
                  'p_email',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_email}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-item
              label="入职日期"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
              <a-date-picker
                v-decorator="[
                  'p_rtime',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: prtime}
                ]"
                placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="转正日期"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
              <a-date-picker
                v-decorator="[
                  'p_ztime',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: pztime}
                ]"
                placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="联系地址"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                v-decorator="[
                  'p_address',
                  {rules: [{ required: true, message: '请输入' }],
                   initialValue: currentRecord.p_address}
                ]"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
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
  computed: {
    pbirth: function () {
      if (this.currentRecord.p_birth) {
        return moment(this.currentRecord.p_birth, 'YYYYMMDD')
      } else {
        return null
      }
    },
    prtime: function () {
      if (this.currentRecord.p_rtime) {
        return moment(this.currentRecord.p_rtime, 'YYYYMMDD')
      } else {
        return null
      }
    },
    pztime: function () {
      if (this.currentRecord.p_ztime) {
        return moment(this.currentRecord.p_ztime, 'YYYYMMDD')
      } else {
        return null
      }
    }
  },
  methods: {
    async show (record, isEdit) {
      this.isEdit = !!record
      if (record) {
        // console.log(record)
        this.currentRecord = record
      }
      this.visible = true
    },
    onChange (date, dateString) {
      console.log(date, dateString)
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
        const pbirth = values.p_birth.format('YYYYMMDD')
        const prtime = values.p_rtime.format('YYYYMMDD')
        const pztime = values.p_ztime.format('YYYYMMDD')
        const params = {
          ...values,
          p_birth: pbirth,
          p_time: prtime,
          p_ztime: pztime
        }
        this.confirmLoading = false
        if (this.isEdit) {
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
        } else {
          console.log(params)
          this.$api.employee.employeeAddInfo(params)
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
