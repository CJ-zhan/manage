<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit()">批量导入</a-button>
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
  </a-card>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          dataIndex: 'act_id',
          title: '策略ID'
        },
        {
          dataIndex: 'act_name',
          title: '策略名称'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'right',
          width: 280,
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return new Promise(resolve => {
          resolve()
        }).then((res) => {
          const arr = [{
            act_id: 6,
            act_name: '10443',
            ctime: 1599731775,
            id: 56,
            is_show: 1,
            mtime: 1599731801,
            status: 1
          }, {
            act_id: 5,
            act_name: '10443',
            ctime: 1599731775,
            id: 5,
            is_show: 1,
            mtime: 1599731801,
            status: 1
          }, {
            act_id: 56,
            act_name: '10443',
            ctime: 1599731775,
            id: 6,
            is_show: 1,
            mtime: 1599731801,
            status: 1
          }]
          return arr
        })
      }
    }
  },
  methods: {
    handleEdit () {
      console.log(12)
    },
    handleDeleteStrategy () {},
    handledownloadAll () {}
  }
}
</script>
