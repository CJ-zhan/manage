<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form
        layout="inline"
        :form="search"
        @submit="handleSearch"
      >
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="搜索部门名称">
              <a-input v-decorator="['d_name']" name="d_name" />
            </a-form-item>
          </a-col>
          <div class="table-operator">
            <a-button
              type="primary"
              html-type="submit"
            >查询</a-button>
            <a-button @click="handleRsset()">重置</a-button>
          </div>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit()">新增部门</a-button>
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
          <a-button>
            <router-link :to="{ name: 'searchdepart', params: { id: record.id,d_name: record.d_name } }">查看部门</router-link>
          </a-button>
          <a-popconfirm
            title="确定删除此部门？"
            @confirm="() => handleDeleteDepart(record)"
          >
            <a-button type="danger">删除</a-button>
          </a-popconfirm>
        </a-button-group>
      </span>
    </s-table>
    <add-edit-modal @fnRefresh="handleOk" ref="departmentModal"></add-edit-modal>
  </a-card>
</template>

<script>
import AddEditModal from './modules/AddEditModal'
export default {
  components: {
    AddEditModal
  },
  data () {
    return {
      search: this.$form.createForm(this),
      columns: [
        { dataIndex: 'id',
          title: '部门ID'
        },
        {
          dataIndex: 'd_name',
          title: '部门名称'
        },
        {
          dataIndex: 'd_describe',
          title: '详细信息'
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
          ...this.search.getFieldsValue(),
          ...this.queryParam
        }
        return this.$api.department.departmentInfo(params)
          .then(res => {
            const newdata = []
            res.data.map(item => {
              newdata.push(
                Object.assign(item, { id: item._id })
              )
            })
            return newdata
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  methods: {
    handleSearch (e) {
      e.preventDefault()
      this.handleOk(true)
    },
    handleRsset () {
      this.search.resetFields()
      this.handleOk(true)
    },
    handleEdit (record, isEdit) {
      this.$refs.departmentModal.show(record, isEdit)
    },
    handleOk (bool = false) {
      this.$refs.table.refresh(bool)
    },
    handleDeleteDepart (record) {
      const { _id } = record
      const params = {
        _id
      }
      this.$api.department.departmentDelete(params)
        .then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.handleOk(true)
        })
        .catch(err => {
          this.$router.push({ name: 'searchdepart', params: { id: record.id, d_name: record.d_name } })
          console.log(err)
        })
    }
  }
}
</script>
