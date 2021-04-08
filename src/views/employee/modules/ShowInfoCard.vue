<template>
  <a-modal
    :title="'员工信息卡片'"
    :width="1080"
    :footer="null"
    :visible="visible"
    @cancel="hide">
    <a-form :form="form" label="inline">
      <a-row>
        <a-col :span="6">
          <a-form-item
            label="姓名"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <span>{{ currentRecord.p_name }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item
            label="性别"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <span>{{ currentRecord.p_sex |statusSex }}</span>

            <!-- <a-radio-group
              v-decorator="['p_sex', {initialValue: currentRecord.p_sex}]"
            >
              <a-radio :value="0">男</a-radio>
              <a-radio :value="1">女</a-radio>
            </a-radio-group> -->
          </a-form-item>
        </a-col>
        <a-col :span="6">

          <a-form-item
            label="出生日期"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <span>{{ currentRecord.p_birth |dayjs }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="身份证"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <span>{{ currentRecord.p_pid }}</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">
          <a-form-item
            label="民族"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <span>{{ currentRecord.p_minzu }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item
            label="政治面貌"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <span>{{ currentRecord.p_nation|nationStatus }}</span>

            <!-- <a-select
              v-decorator="[
                'p_nation',
                {initialValue: currentRecord.p_nation}
              ]"
              placeholder="请选择类型"
            >
              <a-select-option value="1">普通公民</a-select-option>
              <a-select-option value="2">团员</a-select-option>
              <a-select-option value="3">党员</a-select-option>
            </a-select> -->
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            label="婚姻状况"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <span>{{ currentRecord.p_marriage|marriageStatus }}</span>

            <!-- <a-radio-group
              v-decorator="['p_marriage', {initialValue: currentRecord.p_marriage}]"
            >
              <a-radio :value="0">已婚</a-radio>
              <a-radio :value="1">未婚</a-radio>
            </a-radio-group> -->
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="籍贯"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <span>{{ currentRecord.p_fromwhere }}</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">
          <a-form-item
            label="学历"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <span>{{ currentRecord.p_xueli |xueliStatus }}</span>

            <!-- <a-select
              v-decorator="[
                'p_xueli',
                {initialValue: currentRecord.p_xueli}
              ]"
              placeholder="请选择类型"
            >
              <a-select-option value="1">高中</a-select-option>
              <a-select-option value="2">专科</a-select-option>
              <a-select-option value="3">本科</a-select-option>
              <a-select-option value="4">研究生</a-select-option>
              <a-select-option value="5">博士生</a-select-option>
            </a-select> -->
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item
            label="毕业院校"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <span>{{ currentRecord.p_school }}</span>

            <!-- <a-input
              v-decorator="[
                'p_school',
                {initialValue: currentRecord.p_school}
              ]"
              placeholder="请输入"
            /> -->
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            label="主修专业"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <span>{{ currentRecord.p_profession }}</span>

            <!-- <a-input
              v-decorator="[
                'p_profession',
                {initialValue: currentRecord.p_profession}
              ]"
              placeholder="请输入"
            /> -->
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="工号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <span>{{ currentRecord.p_id }}</span>

            <!-- <a-input
              v-decorator="[
                'p_id',
                {initialValue: currentRecord.p_id}
              ]"
              placeholder="请输入"
            /> -->
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
            <span>{{ currentRecord.p_department }}</span>

            <!-- <a-input
              v-decorator="[
                'p_department',
                {initialValue: currentRecord.p_department}
              ]"
              placeholder="请输入"
            /> -->
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item
            label="职位"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <span>{{ currentRecord.p_position }}</span>

            <!-- <a-input
              v-decorator="[
                'p_position',
                {initialValue: currentRecord.p_position}
              ]"
              placeholder="请输入"
            /> -->
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            label="联系电话"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <span>{{ currentRecord.p_phone }}</span>

          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="电子邮箱"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <span>{{ currentRecord.p_email }}</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item
            label="是否转正"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <span>{{ currentRecord.p_role|roleStatus }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            label="入职日期"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <span>{{ currentRecord.p_rtime|dayjs }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item
            label="转正日期"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <span>{{ currentRecord.p_ztime |dayjs }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            label="联系地址"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <span>{{ currentRecord.p_address }}</span>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      currentRecord: {},
      visible: false,
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
  // computed: {
  //   pbirth: function () {
  //     return this.currentRecord.p_birth
  //   },
  //   prtime: function () {
  //     if (this.currentRecord.p_rtime) {
  //       return moment(this.currentRecord.p_rtime, 'YYYYMMDD')
  //     } else {
  //       return null
  //     }
  //   },
  //   pztime: function () {
  //     if (this.currentRecord.p_ztime) {
  //       return moment(this.currentRecord.p_ztime, 'YYYYMMDD')
  //     } else {
  //       return null
  //     }
  //   }
  // },
  methods: {
    async show (record) {
      this.currentRecord = record
      this.visible = true
    },
    hide () {
      this.visible = false
      this.currentRecord = {}
    }
  }
}
</script>
