/*
 * @Author: Roger
 * @Date: 2019-05-17 10:05:54
 * @Last Modified by: Roger
 * @Last Modified time: 2019-06-30 00:12:21
 * @Description: 频道管理-栏目管理
 */
<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="showModal()">新增</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>

      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>

      <span slot="property" slot-scope="">
        xxxxxxxxxx
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="visible2 = true" :record="record">删除</a>
        </template>
      </span>
    </s-table>

    <a-modal
      title="基本信息"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item
            label="用户ID"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input />
          </a-form-item>
          <a-form-item
            label="权限类型"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-radio-group>
              <a-radio :value="0">保存图片与点赞</a-radio>
              <a-radio :value="1">内部素材包</a-radio>
              <a-radio :value="2">帖子视频</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>

    <a-modal
      title="转让频道"
      :width="640"
      :visible="visible2"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item
            label="转让给用户"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </a-card>
</template>

<script>

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}
export default {
  name: 'ChannelMember',
  components: {
  },
  data () {
    return {
      isHot: 1,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: true,
      // 查询参数
      params: {},
      // 表头
      columns: [
        {
          title: 'ID',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '昵称',
          dataIndex: 'no'
        },
        {
          title: '用户名',
          dataIndex: ''
        },
        {
          title: '邮箱',
          dataIndex: ''
        },
        {
          title: '特权',
          dataIndex: ''
        },
        {
          title: '创建日期',
          dataIndex: ''
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '80px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return this.$api.message.getMessageList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      visible2: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    handleEdit (record) {
      console.log(record)
      this.$refs.modal.edit(record)
    },
    handleDelete (record) {
      this.$confirm({
        title: 'Do you want to delete these items?',
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk () {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
