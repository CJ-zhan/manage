<template>
  <a-card :bordered="false">
    <!-- <div class="table-page-search-wrapper">
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
                name="type">
                <a-select-option value="1">策略ID</a-select-option>
                <a-select-option value="2">策略名称</a-select-option>
                <a-select-option value="3">修改时间</a-select-option>
                <a-select-option value="4">状态</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="搜索内容">
              <a-input v-decorator="['name']" name="name" />
            </a-form-item>
          </a-col>
          <div class="table-operator">
            <a-button
              type="primary"
            >查询</a-button>
            <a-button @click="handleReset">重置</a-button>
          </div>
        </a-row>
      </a-form>
    </div> -->
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit()">新增策略</a-button>
    </div>
    <s-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="loadData">
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="mtime" slot-scope="text">{{ text | moment }}</span>
      <span slot="action" slot-scope="text, record">
        <a-button-group size="small">
          <a-button @click="handleEdit(record, true)">编辑</a-button>
          <!-- <a-popconfirm
            v-if="record.status === 0"
            title="确定启用此策略？"
            @confirm="() => handleEnableStrategy(record)"
          >
            <a-button>启用</a-button>
          </a-popconfirm>
          <a-popconfirm
            v-if="record.status === 1"
            title="确定停用此策略？"
            @confirm="() => handleDisableStrategy(record)"
          >
            <a-button type="danger">停用</a-button>
          </a-popconfirm> -->
          <a-button>
            <router-link :to="{ name: 'searchlogs', params: { id: record.act_id } }">查看日志</router-link>
          </a-button>
          <a-popconfirm
            title="确定删除此策略？"
            @confirm="() => handleDeleteStrategy(record)"
          >
            <a-button>删除</a-button>
          </a-popconfirm>
          <a-button @click="handledownloadAll(record)">
            下载
          </a-button>
        </a-button-group>
      </span>
    </s-table>
    <add-strategy-form @fnRefresh="handleOk" ref="strategyModal" />
  </a-card>
</template>

<script>
import AddStrategyForm from './modules/AddStrategyForm'
import { downloadLogs } from '@/utils/download'
export default {
  components: {
    AddStrategyForm
  },
  data () {
    return {
      search: this.$form.createForm(this),
      columns: [],
      loadData: parameter => {
        const params = {
          ...parameter,
          ...this.search.getFieldsValue(),
          ...this.queryParam
        }
        return this.$api.applog.getStrategyList(params)
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
            this.columns.push(a)
            return res.data
          })
      }
    }
  },
  methods: {
    // 状态开关
    // handleEnableStrategy (record) {
    //   const params = {
    //     strategy_id: record.id
    //   }
    //   this.$api.gray.enableStrategy(params)
    //     .then(res => {
    //       const { message } = res.message
    //       this.$message.success(message)
    //       this.handleOk()
    //     })
    //     .catch(() => {})
    // },
    //
    // handleDisableStrategy (record) {
    //   const params = {
    //     strategy_id: record.id
    //   }
    //   this.$api.gray.disableStrategy(params)
    //     .then(res => {
    //       const { message } = res.message
    //       this.$message.success(message)
    //       this.handleOk()
    //     })
    //     .catch(() => {})
    // },
    handledownloadAll (record) {
      const fileurl = 'http://qnp.chumanapp.com/m/test/server-2020-02-21.log'
      downloadLogs(fileurl)
    },
    handleDeleteStrategy (record) {
      const actid = String(record.act_id)
      const params = {
        act_ids: actid
      }
      this.$api.applog.removeStrategy(params)
        .then(res => {
          const { message } = res.message
          this.$message.success(message)
          this.handleOk()
        })
        .catch(() => {})
    },
    handleEdit (record, isEdit) {
      this.$refs.strategyModal.show(record, isEdit)
    },
    // 搜索重置
    // handleReset () {
    //   this.search.resetFields()
    //   this.handleOk(true)
    // },
    handleOk (bool = false) {
      this.$refs.table.refresh(bool)
    }
  }
}
</script>
