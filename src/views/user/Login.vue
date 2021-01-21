<template>
  <div class="main">
    <a-form
      class="user-layout-login"
      :form="form"
      @submit.prevent="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入账号"
          v-decorator="[
            'user',
            {rules: [{ required: true, message: '请输入帐户名' }]}
          ]"
        >
          <a-icon
            slot="prefix"
            type="user"
            :style="{ color: 'rgba(0, 0, 0, .25)' }"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="请输入密码"
          v-decorator="[
            'password',
            {rules: [{ required: true, message: '请输入密码' }]}
          ]"
        >
          <a-icon
            slot="prefix"
            type="lock"
            :style="{ color: 'rgba(0, 0, 0, .25)' }"
          />
        </a-input>
      </a-form-item>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
      </a-form-item>
      <div class="user-login-other">
        <router-link class="register" :to="{ name: 'register' }">注册用户</router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
// import { md5Hash } from '@/utils/util'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loginBtn: false,
      form: this.$form.createForm(this),
      state: {
        loginBtn: false
      }
    }
  },
  methods: {
    ...mapActions([
      'Login'
    ]),
    handleSubmit () {
      const { state, Login } = this
      state.loginBtn = true
      this.form.validateFields({ force: true }, (error, values) => {
        if (error) {
          state.loginBtn = false
          return
        }
        // const pwd = md5Hash(String((id << 2) + 1) + md5Hash(values.pwd))
        // const id = Number(values.id)
        const params = {
          ...values
        }
        // console.log(params)
        Login(params)
          .then((res) => {
            // console.log(res)
            const { msg, code } = res
            if (code === 0) {
              this.$message.success(msg)
              this.$router.push({ name: 'employee' })
            } else {
              this.$message.error(msg)
            }
          })
          .catch(() => {})
          .finally(() => {
            state.loginBtn = false
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
  .forge-password {
    font-size: 14px;
  }
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;
    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }
    .register {
      float: right;
    }
  }
}
</style>
