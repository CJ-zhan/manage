<template>
  <div class="page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false" >
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="Src">
            </div>
            <div class="username">{{ nickname }}</div>
            <div class="email">邮箱:{{ email }}</div>
            <div class="bio">{{ bio }}</div>
          </div>
          <div class="account-center-detail">
            <p>
              <i class="title"></i>{{ user.info.role }}
            </p>
            <p>
              <i class="group"></i>{{ `人力资源部－${user.info.role}` }}
            </p>
            <p>
              <i class="address"></i>
              <span>广东省</span>
              <span>广州市</span>
            </p>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card style="width:100%;height:100%">
          <a-tabs default-active-key="1" tab-position="left">
            <a-tab-pane key="1" tab="基本设置">
              <base-setting></base-setting>
            </a-tab-pane>
            <a-tab-pane key="2" tab="安全设置">
              <security></security>
            </a-tab-pane>
            <!-- <a-tab-pane key="3" tab="Tab 3">
              Content of Tab 3
            </a-tab-pane> -->
          </a-tabs>

        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>

import BaseSetting from './moudles/BaseSetting'
import Security from './moudles/Security'
import { mapState } from 'vuex'
export default {
  components: {
    BaseSetting,
    Security
  },
  data () {
    return {
      nickname: '',
      email: '',
      bio: '',
      Src: ''
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    init () {
      console.log(this.user)
      this.nickname = this.user.info.nickname
      this.bio = this.user.info.bio
      this.email = this.user.info.email
    }
  },
  mounted () {
    this.Src = this.user.photo
    this.init()
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  min-height: 100%;
  transition: 0.3s;
  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;
    height: 100%;
    & > .avatar {
      margin: 5px auto;
      width: 150px;
      height: 150px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .username,.bio,.emial{
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    .bio,.emial{
      margin-top: 5px;
      font-size: 12px;
     }
  }

  .account-center-detail {
    p {
      margin-bottom: 7px;
      padding-left: 26px;
      position: relative;
    }
    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }
    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }
}
</style>
