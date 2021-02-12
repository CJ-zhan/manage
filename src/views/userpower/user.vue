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
          <a-popconfirm
            title="是否确认启用该管理员权限"
            @confirm="() => fnOpenPowerItem(record)"
          >
            <a-button type="primary" :disabled="record.status ? true : false">启用</a-button>
          </a-popconfirm>
          <a-popconfirm
            title="是否确认禁用用该管理员权限"
            @confirm="() => fnClosePowerItem(record)"
          >
            <a-button :disabled="record.status ? false : true" v-if="record.user !== 'admin'">停用</a-button>
          </a-popconfirm>
          <a-popconfirm
            title="确定删除此管理员用户？"
            @confirm="() => handleDeleteUser(record)"
          >
            <a-button :disabled="record.user === 'admin' ? true : false">删除</a-button>
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
          dataIndex: 'user',
          title: '用户名'
        },
        {
          dataIndex: 'nickname',
          title: '用户名称'
        },
        {
          dataIndex: 'status',
          title: '管理状态',
          scopedSlots: { customRender: 'status' }
        },
        {
          dataIndex: 'mtime',
          title: '操作时间',
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
        const params = {
          ...parameter,
          ...this.search.getFieldsValue()
        }
        return this.$api.userpower.UserInfo(params)
          .then(res => {
            const newdata = []
            res.data.map(item => {
              newdata.push(
                Object.assign(item, { id: item._id })
              )
            })
            return newdata
          }).catch(err => {
            console.log(err)
          })
      }
    }
  },
  methods: {
    fnOpenPowerItem (record) {
      this.$api.userpower.OpenPower({ _id: record.id })
        .then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.handleOk(true)
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('删除失败')
        })
    },
    fnClosePowerItem (record) {
      this.$api.userpower.ClosePower({ _id: record.id })
        .then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.handleOk(true)
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('删除失败')
        })
    },
    handleOk (bool = false) {
      this.$refs.table.refresh(bool)
    },
    handleDeleteUser (record) {
      this.$api.userpower.UserDeleteInfo({ _id: record._id })
        .then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.handleOk(true)
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('删除失败')
        })
    }
  }
}
</script>
