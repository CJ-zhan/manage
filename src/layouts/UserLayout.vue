<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="~@/assets/img/logo.svg" class="logo" alt="logo">
            <span class="title">触漫微服务后台</span>
          </a>
        </div>
        <div class="desc">
          成为全球最伟大的虚拟科技企业
        </div>
      </div>

      <route-view></route-view>

      <!-- <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">
          Copyright &copy; 2018 白鹭学园技术组出品
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {}
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;
    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 92%;
        }
      }
    }
    .container {
      position: relative;
      width: 100%;
      padding-top: 120px;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/img/background.svg) no-repeat 50%;
      background-size: 100%;
      a {
        text-decoration: none;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }
          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }
      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;
        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
  @media screen and(max-width: 375px) {
    #userLayout.user-layout-wrapper {
      .container {
        padding-top: 12%;
      }
    }
  }
</style>
