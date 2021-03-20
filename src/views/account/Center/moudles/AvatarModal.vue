<template>

  <a-modal
    title="修改头像"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="800"
    :footer="null"
    @cancel="cancelHandel">
    <a-row>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        >
        </vue-cropper>
      </a-col>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img"/>
        </div>
      </a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :lg="2" :md="2">
        <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false">
          <a-button icon="upload">选择图片</a-button>
        </a-upload>
      </a-col>
      <a-col :lg="{span: 1, offset: 2}" :md="2">
        <a-button icon="plus" @click="changeScale(1)"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="minus" @click="changeScale(-1)"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="undo" @click="rotateLeft"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="redo" @click="rotateRight"/>
      </a-col>
      <a-col :lg="{span: 2, offset: 6}" :md="2">
        <a-button type="primary" @click="finish()">保存</a-button>
      </a-col>
    </a-row>
  </a-modal>

</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      visible: false,
      id: null,
      baseimg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      confirmLoading: false,
      fileBase64: '',
      uploading: false,
      options: {
        img: '',
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      },
      previews: {}
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  mounted () {
    this.options.img = this.user.photo || this.baseimg
  },
  methods: {
    ...mapActions(['GetInfo']),
    edit (id) {
      this.visible = true
      this.id = id
    },
    close () {
      this.id = null
      this.visible = false
      this.options.img = this.user.photo || this.baseimg
    },
    cancelHandel () {
      this.close()
    },
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    beforeUpload (file) {
      console.log(file)
      const reader = new FileReader()
      // 把Array Buffer转化为blob 如果是base64不需要
      // 转化为base64
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.options.img = reader.result
        // this.fileBase64 = reader.result
      }
      // 转化为blob
      // reader.readAsArrayBuffer(file)

      return false
    },
    blobToDataURI (blob, callback) {
      var reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = function (e) {
        callback(e.target.result)
      }
    },
    realTime (data) {
      this.previews = data
    },
    // 上传图片（点击上传按钮）
    finish () {
      const _this = this
      this.$refs.cropper.getCropBlob(async (data) => {
        await this.blobToDataURI(data, function (res) {
          _this.fileBase64 = res
          const params = { pic: _this.fileBase64 }
          _this.$api.user.UserPhotoChange(params)
            .then(res => {
              console.log(res)
              _this.GetInfo()
              _this.visible = false
            })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-preview {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
