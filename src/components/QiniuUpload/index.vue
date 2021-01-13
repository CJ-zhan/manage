<template>
  <div class="cm-upload">
    <a-upload
      listType="picture-card"
      :action="constv.QINIU_UPLOAD_BUCKET_URL"
      :multiple="multiple"
      :accept="accept"
      :disabled="disabled"
      :fileList="fileList"
      :data="(file) => ({
        token: QiniuImageToken,
        key: `${dir}/${md5Hash(file.uid)}.${file.name.split('.')[1]}`
      })"
      @change="handleChange"
      @preview="handlePreview"
      :remove="handleRemove"
      :beforeUpload="() => GetQiniuImageToken()"
    >
      <div v-if="fileList.length < max">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传图片</div>
      </div>
    </a-upload>
    <a-modal
      :width="600"
      :closable="false"
      :visible="previewVisible"
      :destroyOnClose="true"
      @cancel="previewVisible = false">
      <img v-if="isImage" style="width: 100%" :src="previewFile.url || previewFile.thumbUrl" />
      <video v-else :src="previewFile.url || previewFile.thumbUrl" controls autoplay></video>
    </a-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { md5Hash } from '@/utils/util'
export default {
  props: {
    defaultFileList: {
      type: Array,
      default: () => [],
      required: true
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    needImageInfo: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dir: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    max: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      fileList: [],
      previewVisible: false,
      previewFile: '',
      isImage: true
    }
  },
  computed: {
    ...mapState({
      QiniuImageToken: ({ app }) => app.QiniuImageToken
    })
  },
  created () {
    this.fileList = this.defaultFileList
  },
  methods: {
    ...mapActions([
      'GetQiniuImageToken'
    ]),
    md5Hash,
    handleRemove (file) {
      const index = this.fileList.findIndex(item => item.response.key === file.response.key)
      this.fileList.splice(index, 1)
      this.handleUploadDone(this.fileList)
    },
    handleUploadDone (fileList) {
      const params = {}
      params[this.field] = fileList.length ? fileList.map(i => i.response && i.response.key).join(',') : ''
      this.form.setFieldsValue(params)

      this.$emit('handleUploadDone', fileList)
    },
    handleChange ({ file, fileList, event }) {
      if (file.status === 'done') {
        // 上传完成添加图片宽高
        if (this.needImageInfo) {
          this.getImageSize(`${this.constv.QINIU_IMAGE_CND_URL}${file.response.key}`, (width, height) => {
            fileList.map(item => {
              item.width = width
              item.height = height
              return item
            })
          })
        }
        // 设置表单字段值
        this.handleUploadDone(fileList)
      }
      this.fileList = fileList
    },
    handlePreview (file) {
      const imageReg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/
      imageReg.test(file.name) ? this.isImage = true : this.isImage = false
      this.previewFile = file
      this.previewVisible = true
    },
    getImageSize (src, callback) {
      const image = new Image()
      image.onload = () => callback(image.width, image.height)
      image.src = src
    }
  }
}
</script>
