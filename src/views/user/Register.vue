<template>
  <div class="main user-layout-register">
    <h3><span>注册</span></h3>
    <a-form ref="formRegister" :form="form" id="formRegister">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="账号"
          v-decorator="['user', {rules: [{ required: true, message: '请输入账号' }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          @click="handlePasswordInputClick"
          autocomplete="false"
          placeholder="至少6位密码，区分大小写"
          v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}]}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="确认密码"
          v-decorator="['password2', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn">注册
        </a-button>
        <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin.js'

export default {
  name: 'Register',
  components: {
  },
  mixins: [mixinDevice],
  data () {
    return {
      form: this.$form.createForm(this),
      state: {
        time: 60,
        smsSendBtn: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false
    }
  },
  methods: {

    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      // console.log('value', value)
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    // handlePhoneCheck (rule, value, callback) {
    //   console.log('handlePhoneCheck, rule:', rule)
    //   console.log('handlePhoneCheck, value', value)
    //   console.log('handlePhoneCheck, callback', callback)

    //   callback()
    // },

    handlePasswordInputClick () {
      if (!this.isMobile()) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    handleSubmit () {
      const { form: { validateFields }, $router } = this
      validateFields((err, values) => {
        console.log(values)
        if (!err) {
          this.$api.user.Register(values)
            .then((res) => {
              const { msg, code } = res
              if (code === 0) {
                this.$message.success(msg)
                $router.push({ name: 'login' })
                // 清空表单
                this.form.resetFields()
              } else {
                this.$message.error(msg)
              }
            })
          // $router.push({ name: 'login', params: { ...values } })
        }
      })
    },

    // getCaptcha (e) {
    //   e.preventDefault()
    //   const { form: { validateFields }, state, $message, $notification } = this

    //   validateFields(['mobile'], { force: true },
    //     (err, values) => {
    //       if (!err) {
    //         state.smsSendBtn = true

    //         const interval = window.setInterval(() => {
    //           if (state.time-- <= 0) {
    //             state.time = 60
    //             state.smsSendBtn = false
    //             window.clearInterval(interval)
    //           }
    //         }, 1000)

    //         const hide = $message.loading('验证码发送中..', 0)

    //         getSmsCaptcha({ mobile: values.mobile }).then(res => {
    //           setTimeout(hide, 2500)
    //           $notification['success']({
    //             message: '提示',
    //             description: '验证码获取成功，您的验证码为：' + res.result.captcha,
    //             duration: 8
    //           })
    //         }).catch(err => {
    //           setTimeout(hide, 1)
    //           clearInterval(interval)
    //           state.time = 60
    //           state.smsSendBtn = false
    //           this.requestFailed(err)
    //         })
    //       }
    //     }
    //   )
    // },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
      this.registerBtn = false
    }
  },
  watch: {
    'state.passwordLevel' (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less">
  .user-register {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }

  }

  .user-layout-register {
    .ant-input-group-addon:first-child {
      background-color: #fff;
    }
  }
</style>
<style lang="less" scoped>
  .user-layout-register {

    & > h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .register-button {
      width: 50%;
    }

    .login {
      float: right;
      line-height: 40px;
    }
  }
</style>
