<template>
  <div>
    <a-list
      itemLayout="horizontal"
      :dataSource="data"
    >
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span class="security-list-description">{{ item.description }}</span>
            <span v-if="item.value"> : </span>
            <span class="security-list-value">{{ item.value }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>
      </a-list-item>
    </a-list>
    <a-modal
      title="修改密码"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handlePwd"
      @cancel="handlePwdCancel"
    >
      <!-- <a-spin :spinning="confirmLoading"> -->
      <a-form :form="form" >
        <a-form-item
          label="旧密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            type="password"
            v-decorator="['oldpassword', { rules: [{ required: true, message: '请输入密码' }] }]"
          />
        </a-form-item>
        <a-form-item
          label="新密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            type="password"
            v-decorator="['newpassword', { rules: [{ required: true, message: '请输入新密码' }] }]"
          />
        </a-form-item>
        <a-form-item
          label="确认密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            type="password"
            v-decorator="['newpassword1', { rules: [{ required: true, message: '请确认新密码' },,{validator:this.validnewpassword},{validateTrigger: ['change', 'blur']}]}]"
          />
        </a-form-item>
        <!-- <a-form-item
          label="验证码"
          :labelCol="{ span: 6 }"
          :wrapperCol="{ span: 6 }">
          <a-input
            v-decorator="['code', { rules: [{ required: true, message: 'Please input your code!' }] }]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol">
          <a-button type="primary" style="margin-left:25%">获取验证码</a-button>
        </a-form-item> -->
      </a-form>
      <!-- </a-spin> -->
    </a-modal>
  </div>
</template>

<script>
import { md5Hash } from '@/utils/util'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      data: [
        { title: '账户密码', description: '当前密码强度', value: '强', actions: { title: '修改', callback: () => { this.changePassword() } } }
        // { title: '密保手机', description: '已绑定手机', value: '138****8293', actions: { title: '修改', callback: () => { this.$message.success('This is a message of success') } } },
        // { title: '密保问题', description: '未设置密保问题，密保问题可有效保护账户安全', value: '', actions: { title: '设置', callback: () => { this.$message.error('This is a message of error') } } }
      ]
    }
  },
  methods: {
    validnewpassword (rule, value, callback) {
      const password = this.form.getFieldValue('newpassword')
      // console.log('value', value)
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },
    changePassword () {
      this.visible = true
    },
    handlePwd () {
      this.form.validateFields({ force: true }, (error, values) => {
        this.confirmLoading = true
        if (error) {
          this.confirmLoading = false
        }
        const { oldpassword, newpassword } = { ...values }
        const oldpwd = md5Hash(md5Hash(oldpassword))
        const newpwd = md5Hash(md5Hash(newpassword))

        const params = { oldpassword: oldpwd, newpassword: newpwd }
        this.$api.user.ChangePwd(params)
          .then(res => {
            if (res.data.repeat === true) {
              this.$message.success(res.msg)
              this.confirmLoading = false
            } else {
              this.handlePwdCancel()
              this.$message.success(res.msg)
            }
          })
          .catch(err => {
            this.$message.error(err, '修改失败')
            this.handlePwdCancel()
          })
        // console.log(values)
        // setTimeout(() => {
        //   this.confirmLoading = false
        //   this.handlePwdCancel()
        // }, 1000)
      })
    },
    handlePwdCancel () {
      this.visible = false
      this.form.resetFields()
      this.confirmLoading = false
    }
  }
}
</script>

<style scoped>

</style>
