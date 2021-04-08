<template>
  <a-card :bordered="false">
    <s-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="loadData">
      <span slot="status" slot-scope="text">
        {{ text | roleStatus }}
      </span>
      <span slot="mtime" slot-scope="text">{{ text | moment }}</span>
      <span slot="p_sex" slot-scope="text">{{ text | statusSex }}</span>
      <span slot="action" slot-scope="text, record">
        <a-popconfirm
          v-if="user.info.role === 'generaladmin'"
          :disabled="record.p_role==='0'"
          title="确定提交转正审核？"
          @confirm="() => handleEdit(record,'0')"
        >
          <a-button :disabled="record.p_role==='0'">提交审核</a-button>
        </a-popconfirm>
        <a-popconfirm
          v-if="user.info.role === 'admin'"
          :disabled="record.p_role==='1'"
          title="确定同意给予转正？"
          @confirm="() => handleEdit(record,'1')"
        >
          <a-button :disabled="record.p_role==='1'">同意转正</a-button>
        </a-popconfirm>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      columns: [
        { dataIndex: 'id',
          title: 'ID',
          width: 100,
          ellipsis: true
        },
        {
          dataIndex: 'p_name',
          title: '姓名'
        },
        {
          dataIndex: 'p_id',
          title: '工号'
        },
        {
          dataIndex: 'p_sex',
          title: '性别',
          scopedSlots: { customRender: 'p_sex' }
        },
        {
          dataIndex: 'p_role',
          title: '转正状态',
          scopedSlots: { customRender: 'status' }
        },
        {
          dataIndex: 'mtime',
          title: '操作时间',
          scopedSlots: { customRender: 'mtime' }
        },
        {
          title: '提交转正审核',
          dataIndex: 'action',
          width: 200,
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const params = {
          ...parameter
        }
        return this.$api.employee.allemployee(params)
          .then(res => {
            const newdata = []
            if (this.user.info.role === 'admin') {
              res.data.map(item => {
                if (String(item.p_role) === '0') {
                  newdata.push(
                    Object.assign(item, { id: item._id })
                  )
                }
              })
            } else {
              res.data.map(item => {
                if (String(item.p_role) === '2' || String(item.p_role) === '0') {
                  newdata.push(
                    Object.assign(item, { id: item._id })
                  )
                }
              })
            }
            return newdata
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    handleOk (bool = false) {
      this.$refs.table.refresh(bool)
    },
    handleEdit (record, param) {
      console.log(record)
      const params = record
      params.p_role = param
      this.$api.employee.employeeEditInfo(params)
        .then(res => {
          // const { msg } = res
          this.$message.success('提交审核成功')
          this.handleOk(true)
        })
        .catch((err) => {
          this.$message.error('提交审核失败')
          console.log(err)
        })
    }
  }
}
</script>
