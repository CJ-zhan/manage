/*
 * @Author: Roger
 * @Date: 2019-05-17 18:35:41
 * @Last Modified by: Roger
 * @Last Modified time: 2019-10-09 17:13:57
 * @Description: 错误报告
 */
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="反馈状态">
              <a-select placeholder="请选择" defaultValue="0" @change="value => queryParam.userType = value">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">已解决</a-select-option>
                <a-select-option value="2">未解决</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="handleOk(true)">查询</a-button>
              <a-button style="margin-left: 10px" @click="handleReset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus">解决</a-button>
      <a-button type="primary" icon="delete">删除</a-button>
    </div>

    <s-table
      ref="table"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">查看</a>
      </span>
    </s-table>
  </a-card>
</template>

<script>const statusMap = {
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
  data () {
    return {
      queryParam: {},
      columns: [
        {
          title: 'ID',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '内容',
          dataIndex: 'no'
        },
        {
          title: '是否解决',
          dataIndex: 'description'
        },
        {
          title: '用户',
          dataIndex: ''
        },
        {
          title: '发布日期',
          dataIndex: ''
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: 80,
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return this.$api.message.getMessageList(Object.assign(parameter, this.queryParam))
          .then(res => {
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
      },
      optionAlertShow: false
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
    handleBlock () {

    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleOk (bool = false) {
      this.$refs.table.refresh(bool)
    },
    handleReset () {
      this.queryParam = {}
      this.handleOk(true)
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
