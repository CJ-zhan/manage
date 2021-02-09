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
                <a-select-option value="3">性别</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="搜索内容" v-if="nameValue">
              <a-input v-decorator="['p_name']" name="p_name" />
            </a-form-item>
            <a-form-item label="搜索内容" v-else-if="pidValue">
              <a-input v-decorator="['p_id']" name="p_id" />
            </a-form-item>
            <a-form-item label="搜索内容" v-else>
              <a-select
                v-decorator="['p_sex']"
                placeholder="请选择"
                name="p_sex">
                <a-select-option value="0">男</a-select-option>
                <a-select-option value="1">女</a-select-option>
              </a-select>
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
      nameValue: true,
      pidValue: false,
      search: this.$form.createForm(this),
      columns: [
        { dataIndex: 'id',
          title: 'ID'
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
          dataIndex: 's_salary',
          title: '基本工资'
        },
        {
          dataIndex: 's_insurance',
          title: '五险'
        }, {
          dataIndex: 's_fund',
          title: '公积金'
        },
        {
          dataIndex: 's_addsalary',
          title: '加班工资'
        },
        {
          dataIndex: 's_realsalary',
          title: '实发工资'
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
            p_pid: 446277389287739376,
            p_name: '张三',
            p_sex: '男',
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          },
          {
            id: 2,
            p_pid: 446277389287739376,
            p_name: '李四',
            p_sex: '男',
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 3,
            p_pid: 446277389287739376,
            p_name: '王五',
            p_sex: '男',
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 4,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: '男',
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }]
          return arr
        })
      }
    }
  },
  methods: {
    handleSearch () {},
    handleSearchTypechange (value) {
      if (value === '1') {
        this.nameValue = true
        this.pidValue = false
      } else if (value === '2') {
        this.nameValue = false
        this.pidValue = true
      } else {
        this.nameValue = false
        this.pidValue = false
      }
    },
    handleRsset () {},
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
