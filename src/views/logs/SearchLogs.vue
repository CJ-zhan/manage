<template>
  <a-card>
    <div class="table-page-search-wrapper">
      <a-form
        layout="inline"
        :form="search"
      >
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="搜索类型">
              <a-select
                v-decorator="[
                  'type',
                  {rules: [{ required: false, message: '请选择搜索类型' }]}
                ]"
                placeholder="请选择类型"
                name="type"
              >
                <a-select-option value="1">用户id</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="搜索内容">
              <a-input name="user_id" v-decorator="[ 'user_id', {rules: [{ required: false, message: '请输入' }]}]"></a-input>
            </a-form-item>
          </a-col>
          <div class="table-operator">
            <a-button
              type="primary"
              @click="handleOk(true)"
            >查询</a-button>
            <a-button @click="handleReset">重置</a-button>
          </div>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button
        type="primary"
        @click="handleAddAll()"
      >文件导入</a-button>
      <a-popover :visible="tipVisible" title="请选择需要操作的日志哦~" trigger="click" @click="tipShow">
        <a-button
          :disabled="!hasSelected"
          type="primary"
          @click="handleALLAction()"
        >
          批量操作
        </a-button>
      </a-popover>
    </div>
    <s-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection">
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="mtime" slot-scope="text">{{ text | moment }}</span>
      <span slot="action" slot-scope="text, record">
        <a-button @click="handleEditModal(record)">编辑</a-button>
        <a-button @click="handledown(record)">下载</a-button>
        <a-popconfirm
          title="确定删除此日志？"
          @confirm="() => handleDelete(record)"
        >
          <a-button>删除</a-button>
        </a-popconfirm>
      </span>
    </s-table>
    <!-- 编辑start -->
    <a-modal
      title="编辑"
      :visible="visible1"
      :width="640"
      :confirm-loading="confirmLoading1"
      @ok="handleEdit"
      @cancel="handleCancel1" >
      <a-spin :spinning="confirmLoading1">
        <a-form :form="form1">
          <a-form-item
            label="用户ID"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              disabled
              v-decorator="['user_id', { rules: [{ required: true, message: '请输入' }], initialValue: currentRecord.user_id }]"
            />
          </a-form-item>
          <a-form-item
            label="日志ID"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              disabled
              v-decorator="['log_id', { rules: [{ required: true, message: '请输入' }], initialValue: currentRecord.log_id }]"
            />
          </a-form-item>
          <a-form-item
            label="有效时间"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              v-decorator="['effect_time', { rules: [{ required: true, message: '请输入' }], initialValue: currentRecord.effect_time }]"
            />
          </a-form-item>
          <a-form-item
            label="状态"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-radio-group
              v-decorator="['status', {rules: [{ required: true, message: '请选择状态' }], initialValue: currentRecord.status}]"
            >
              <a-radio :value="0">关闭</a-radio>
              <a-radio :value="1">启用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
    <!-- 编辑end -->
    <!-- 批量操作start -->
    <a-modal
      title="批量操作"
      :visible="visible"
      :width="640"
      :confirm-loading="confirmLoading"
      @ok="showConfirm"
      @cancel="handleCancel" >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item
            label="请选择"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-radio-group
              v-decorator="['choose',{rules: [{ required: true, message: '请选择操作' }]} ]"
              @change="handleSearchTypechange"
            >
              <a-radio :value="0">下载</a-radio>
              <a-radio :value="1">删除</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
    <!-- 批量操作end -->
    <add-logs-form @fnRefresh="handleOk" ref="addModal" :strategyid="strategyid"></add-logs-form>
  </a-card>
</template>

<script>
import AddLogsForm from './modules/AddLogsForm'
// eslint-disable-next-line no-unused-vars
import { getFile, handleBatchDownload } from '@/utils/downloadlog'
import constv from '@/config/constv'

export default {
  components: {
    AddLogsForm
  },
  data () {
    return {
      confirmLoading: false,
      confirmLoading1: false,
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      search: this.$form.createForm(this),
      visible: false,
      visible1: false,
      tipVisible: false,
      currentRecord: {},
      title: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      columns: [],
      strategyid: this.$route.params.id,
      queryParam: {
        act_id: this.$route.params.id
      },
      loadData: parameter => {
        const params = {
          ...parameter,
          ...this.search.getFieldsValue(),
          ...this.queryParam
        }
        return this.$api.applog.getLogsList(params)
          .then(res => {
            this.columns = res.data.columns
            const a = {
              title: '操作',
              dataIndex: 'action',
              align: 'center',
              scopedSlots: { customRender: 'action' }
            }
            for (let i = 0; i < this.columns.length; i++) {
              const b = { customRender: 'mtime' }
              if (this.columns[i].dataIndex === 'mtime') {
                this.columns[i].scopedSlots = b
              }
            }
            for (let i = 0; i < this.columns.length; i++) {
              const c = { customRender: 'status' }
              if (this.columns[i].dataIndex === 'status') {
                this.columns[i].scopedSlots = c
              }
            }
            for (let i = 0; i < this.columns.length; i++) {
              if (this.columns[i].dataIndex === 'log_file_addr') {
                this.columns[i].ellipsis = true
              }
            }
            this.columns.push(a)
            return res.data
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    showConfirm () {
      const that = this
      that.$confirm({
        title: that.title,
        onOk () {
          that.handleAll()
        },
        onCancel () {
          that.handleCancel()
        }
      })
    },
    handleSearchTypechange (value) {
      if (value.target.value === 1) {
        this.title = '是否确认删除所选项'
      } else {
        this.title = '是否确认下载所选项'
      }
    },
    tipShow () {
      if (this.selectedRowKeys.length <= 0) {
        this.tipVisible = !this.tipVisible
      } else {
        this.tipVisible = false
      }
    },
    // 下载操作
    handledown (record) {
      const list1 = record.log_file_addr.split(',')
      const head = constv.PULISH_URL
      const list = list1.map(item => { return head + item })
      console.log(list)
      // const list = ['http://qnp.chumanapp.com/m/test/server-2020-02-21.log', 'http://s.qunarzz.com/homenode/images/touchheader/flight.png']
      const data = list // 需要下载打包的路径, 可以是本地相对路径, 也可以是跨域的全路径
      handleBatchDownload(data, record.user_id)
    },
    handleDelete (record) {
      const params = {
        log_ids: String(record.log_id)
      }
      this.$api.applog.removeLogs(params)
        .then(res => {
          const { message } = res.message
          this.$message.success(message)
          this.handleOk()
        })
        .catch(() => {})
    },
    // 批量操作
    handleALLAction () {
      this.visible = true
    },
    handleCancel () {
      this.form.resetFields()
      this.visible = false
    },
    handleCancel1 () {
      this.form1.resetFields()
      this.visible1 = false
    },
    handleAll () {
      this.confirmLoading = true
      this.form.validateFields((err, values) => {
        if (err) {
          this.confirmLoading = false
          this.handleCancel()
          return
        }
        if (values.choose === 1) {
          const list = this.selectedRowKeys.join(',')
          const params = {
            log_ids: list
          }
          this.$api.applog.removeLogs(params)
            .then(res => {
              const { message } = res.message
              this.$message.success(message)
              // console.log(message)
              this.handleOk()
              this.handleCancel()
            })
            .catch(() => {})
            .finally(() => {
              this.confirmLoading = false
            })
        } else {
          // 请求处理fileurl  获取的各用户id
          console.log('下载操作')
          // const fileurl = 'http://qnp.chumanapp.com/m/test/server-2020-02-21.log'
          // downloadLogs(fileurl)
          this.visible = false
          this.form.resetFields()
        }
        // console.log(this.selectedRowKeys)
      })
    },
    handleEditModal (record) {
      this.currentRecord = record
      this.visible1 = true
    },
    // 编辑修改
    handleEdit () {
      this.confirmLoading1 = true
      this.form1.validateFields((err, values) => {
        if (err) {
          this.confirmLoading1 = false
          this.handleCancel1()
          return
        }
        // const { log_id, status, effect_time } = values
        delete values.user_id
        const params = {
          ...values
        }
        this.$api.applog.updateLogs(params)
          .then(res => {
            const { message } = res.message
            this.$message.success(message)
            this.handleCancel1()
            this.handleOk()
          })
          .catch(() => {})
          .finally(() => {
            this.confirmLoading1 = false
          })
      })
    },
    handleOk (bool = false) {
      this.$refs.table.refresh(bool)
    },
    // 文件导入日志操作
    handleAddAll () {
      this.$refs.addModal.show()
    },
    // 搜索重置
    handleReset () {
      this.search.resetFields()
      this.handleOk(true)
    },
    // // 搜索操作
    // handleSearch () {
    //   this.handleOk(true)
    //   this.search.resetFields()
    // },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
