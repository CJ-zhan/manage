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
      <a-form :form="form" >
        <a-form-item
          label="旧密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['oldPwd', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
        <a-form-item
          label="新密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['newPwd', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
        <a-form-item
          label="确认密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['newPwd1', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
        <a-form-item
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
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
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
        { title: '账户密码', description: '当前密码强度', value: '强', actions: { title: '修改', callback: () => { this.changePassword() } } },
        { title: '密保手机', description: '已绑定手机', value: '138****8293', actions: { title: '修改', callback: () => { this.$message.success('This is a message of success') } } },
        { title: '密保问题', description: '未设置密保问题，密保问题可有效保护账户安全', value: '', actions: { title: '设置', callback: () => { this.$message.error('This is a message of error') } } }
      ]
    }
  },
  methods: {
    changePassword () {
      this.visible = true
    },
    handlePwd () {

    },
    handlePwdCancel () {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
