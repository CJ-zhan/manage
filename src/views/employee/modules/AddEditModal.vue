<template>
  <a-modal
    :title="[isEdit ? '编辑' : '新增'] + '员工信息'"
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
        <a-form-item
          label="出生日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-date-picker
            :disabled="isEdit"
            v-decorator="[
              'p_birtime',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: birtime}
            ]"
            placeholder="请输入"
            @change="onChange" />
        </a-form-item>
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
        <a-form-item
          label="政治面貌"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
              'p_zhengzhi',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.p_zhengzhi}
            ]"
            placeholder="请选择类型"
          >
            <a-select-option value="1">普通公民</a-select-option>
            <a-select-option value="2">团员</a-select-option>
            <a-select-option value="3">党员</a-select-option>
          </a-select>
        </a-form-item>
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
        <a-form-item
          label="婚姻状况"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-radio-group
            v-decorator="['p_sex', {rules: [{ required: true, message: '请选择婚姻状况' }], initialValue: currentRecord.p_sex}]"
          >
            <a-radio :value="0">已婚</a-radio>
            <a-radio :value="1">未婚</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="联系地址"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'p_livewhere',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.p_livewhere}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
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
        <a-form-item
          label="主修专业"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'p_zhuanye',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: currentRecord.p_zhuanye}
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
          label="部门"
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
        <a-form-item
          label="入职日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-date-picker
            v-decorator="[
              'p_time',
              {rules: [{ required: true, message: '请输入' }],
               initialValue: ptime}
            ]"
            placeholder="请输入" />
        </a-form-item>
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
    birtime: function () {
      return moment('20210509', 'YYYYMMDD')

      // return moment(this.currentRecord.p_birtime, 'YYYYMMDD')
    },
    ptime: function () {
      return moment('20210509', 'YYYYMMDD')

      // return moment(this.currentRecord.p_ptime, 'YYYYMMDD')
    },
    pztime: function () {
      return moment('20210509', 'YYYYMMDD')
      // return moment(this.currentRecord.p_pztime, 'YYYYMMDD')
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
        const pbirtime = values.p_birtime.format('YYYYMMDD')
        const ptime = values.p_time.format('YYYYMMDD')
        const pztime = values.p_ztime.format('YYYYMMDD')

        const params = {
          ...values,
          p_birtime: pbirtime,
          p_time: ptime,
          p_ztime: pztime
        }
        console.log(params)
        console.log(pbirtime)
        this.confirmLoading = false

        // if (this.isEdit) {
        //   this.$api.applog.updateStrategy(params)
        //     .then(res => {
        //       const { message } = res.message
        //       this.$message.success(message)
        //       this.hide()
        //       this.$emit('fnRefresh')
        //     })
        //     .catch(() => {})
        //     .finally(() => {
        //       this.confirmLoading = false
        //     })
        // } else {
        //   delete values.file
        //   const datajson = this.file
        //   const status = Number(values.status)
        //   const actname = values.act_name
        //   const params1 = {
        //     status,
        //     act_name: actname
        //   }
        //   this.$api.applog.createStrategy(params1)
        //     .then(res => {
        //       const { message } = res.message
        //       this.$message.success(message)
        //       this.hide()
        //       this.$emit('fnRefresh')
        //       // 获取新增策略id再进行批量导入请求
        //       const actid = res.data.act_id
        //       const datajson1 = []
        //       datajson.map((item, index) => {
        //         datajson1.push(
        //           Object.assign({}, item, { act_id: actid })
        //         )
        //       })
        //       const params2 = {
        //         data_json: datajson1
        //       }
        //       return this.$api.applog.allAddLogs(params2)
        //     })
        //     .then(res => {
        //       const { message } = res.message
        //       this.$message.success(message)
        //     })
        //     .catch(() => {})
        //     .finally(() => {
        //       this.confirmLoading = false
        //     })
        // }
      })
    }
  }
}
</script>
