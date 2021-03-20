<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form :form="form" layout="vertical">
          <a-form-item
            label="昵称"
          >
            <a-input
              v-decorator="[
                'nickname',
                {rules: [{ required: true, message: '请输入' }],
                 initialValue: user.info.nickname
                }
              ]"
              placeholder="请输入昵称"
            />
          </a-form-item>
          <a-form-item
            label="Bio"
          >
            <a-textarea
              rows="2"
              v-decorator="[
                'bio',
                {rules: [{ required: true, message: '请输入' }],
                 initialValue: user.info.bio}
              ]"
              placeholder="you are not alone"/>
          </a-form-item>

          <a-form-item
            label="电子邮件"
          >
            <a-input
              v-decorator="[
                'email',
                {rules: [{ required: true, message: '请输入邮箱' }],
                 initialValue: user.info.email || '请添加邮箱哦'
                }
              ]"
              placeholder="请输入邮箱哦"
            />
          </a-form-item>
          <a-form-item>
            <!-- <a-button type="primary" @click="handleOk">提交</a-button> -->
            <a-button style="margin-left: 8px" @click="handleOk">保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <!-- <avatar-modal ref="modal" @ok="setavatar"/> -->

  </div>
</template>

<script>
// import AvatarModal from './AvatarModal'
import { mapState, mapActions } from 'vuex'

export default {
  // components: {
  //   AvatarModal
  // },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    ...mapActions(['GetInfo']),
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = { ...values }
          this.$api.user.ChangeInfo(params)
            .then(res => {
              if (res.code === 0) {
                this.GetInfo()
                this.$message.success(res.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

</style>
