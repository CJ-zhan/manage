<template>
  <div class="page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false" >
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
                <a-icon type="cloud-upload-o" class="upload-icon"/>
                <div class="mask">
                  <a-icon type="plus" />
                </div>
                <img :src="option.img"/>
              </div>
            </div>
            <div class="username">{{ nickname }}</div>
            <div class="email">邮箱:{{ email || '请添加邮箱哦' }}</div>
            <div class="bio">{{ bio }}</div>
          </div>
          <div class="account-center-detail">
            <p>
              <i class="title"></i>身份:{{ user.info.role }}
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
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
    <avatar-modal ref="modal" @ok="setavatar"/>
  </div>
</template>

<script>

import BaseSetting from './moudles/BaseSetting'
import Security from './moudles/Security'
import AvatarModal from './moudles/AvatarModal'

import { mapState } from 'vuex'
export default {
  components: {
    BaseSetting,
    Security,
    AvatarModal

  },
  data () {
    return {
      nickname: '',
      email: '',
      bio: '',
      Src: '',
      option: {
        img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
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
    },
    setavatar (url) {
      this.option.img = url
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
      // overflow: hidden;
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
.ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
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
