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
            <a-form-item label="搜索类型">
              <a-select
                placeholder="请选择类型"
                v-decorator="['type']"
                name="type"
                @change="handleSearchTypechange"
              >
                <a-select-option value="1">姓名</a-select-option>
                <a-select-option value="2">工号</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="搜索内容" v-if="nameValue">
              <a-input v-decorator="['p_name']" name="p_name" />
            </a-form-item>
            <a-form-item label="搜索内容" v-else>
              <a-input v-decorator="['p_id']" name="p_id" />
            </a-form-item>
          </a-col>
          <div class="table-operator">
            <a-button
              type="primary"
              html-type="submit"
            >查询</a-button>
            <a-button @click="handleRsset">重置</a-button>
          </div>
        </a-row>
      </a-form>
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
          <a-button @click="handleEdit(record)">编辑</a-button>
        </a-button-group>
      </span>
    </s-table>
    <edit-modal @fnRefresh="handleOk" ref="salaryModal"></edit-modal>
  </a-card>
</template>

<script>
import EditModal from './modules/EditModal.vue'
export default {
  components: {
    EditModal
  },
  data () {
    return {
      nameValue: false,
      search: this.$form.createForm(this),
      columns: [
        { dataIndex: 'id',
          title: 'ID',
          width: 100,
          ellipsis: true
        },
        {
          dataIndex: 's_name.p_name',
          title: '姓名'
        },
        {
          dataIndex: 's_name.p_id',
          title: '工号'
        },
        {
          dataIndex: 's_salary',
          title: '基本工资'
        },
        {
          dataIndex: 's_insurance',
          title: '五险'
        }, {
          dataIndex: 's_fund',
          title: '缴纳公积金'
        },
        {
          dataIndex: 's_addsalary',
          title: '加班工资'
        },
        {
          dataIndex: 's_allowance',
          title: '补贴金'
        },
        {
          dataIndex: 's_realsalary',
          title: '实发工资'
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
      loadData: async parameter => {
        const params = {
          ...parameter,
          ...this.search.getFieldsValue()
        }
        if (params.type || params.type !== undefined) {
          const sname = await this.$api.employee.allemployee(params)
            .then(res => {
              return res.data
            })
            .catch(err => {
              console.log(err)
            })
          const params1 = {
            s_name: sname[0]._id
          }
          console.log(params1)
          return this.$api.salary.salaryInfo(params1)
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
        } else {
          return this.$api.salary.salaryInfo(params)
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
    handleSearchTypechange (value) {
      if (value === '1') {
        this.nameValue = true
      } else {
        this.nameValue = false
      }
    },
    handleEdit (record) {
      this.$refs.salaryModal.show(record)
    },
    handleOk (bool = false) {
      // 更新数据
      this.$refs.table.refresh(bool)
    },
    handleAdd () {},
    handleDeleteStrategy () {}
  }
}
</script>
