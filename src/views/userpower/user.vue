<template>
  <a-card :bordered="false">
    <!-- <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit()">批量导入</a-button>
    </div> -->
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
            title="确定删除此人信息？"
            @confirm="() => handleDeleteStrategy(record)"
          >
            <a-button>删除</a-button>
          </a-popconfirm>
        </a-button-group>
      </span>
    </s-table>
  </a-card>
</template>

<script>

export default {
  data () {
    return {
      nameValue: true,
      pidValue: false,
      phoneValue: false,
      search: this.$form.createForm(this),
      columns: [
        { dataIndex: 'id',
          title: 'ID'
        },
        {
          dataIndex: 'p_user',
          title: '用户名'
        },
        {
          dataIndex: 'p_roal',
          title: '权限角色'
        },
        {
          dataIndex: 'status',
          title: '状态'
        },
        {
          dataIndex: 'mtime',
          title: '更新时间',
          scopedSlots: { customRender: 'mtime' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: 200,
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return new Promise(resolve => {
          resolve()
        }).then((res) => {
          const arr = [{
            id: 1,
            status: 0,
            p_user: 'admin',
            p_roal: '普通管理员',
            mtime: 1599731801
          },
          {
            id: 2,
            status: 0,
            p_user: 'admin1',
            p_roal: '管理员',
            mtime: 1599731801
          }]
          return arr
        })
      }
    }
  },
  methods: {
    handleOk () {},
    handleEdit (record, isEdit) {
      // this.$refs.employeeModal.show(record, isEdit)
    },
    handleDeleteStrategy () {}
  }
}
</script>
