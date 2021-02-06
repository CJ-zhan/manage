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
          <a-button @click="handleEdit(record)">更改人员部门</a-button>
        </a-button-group>
      </span>
    </s-table>
    <edit-search-depart @fnRefresh="handleOk" ref="editSerachDepart"></edit-search-depart>
  </a-card>
</template>

<script>
import EditSearchDepart from './modules/EditSearchDepart'
export default {
  components: {
    EditSearchDepart
  },
  data () {
    return {
      nameValue: true,
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
          dataIndex: 'p_department',
          title: '部门'
        },
        {
          dataIndex: 'p_position',
          title: '职位'
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
        return new Promise(resolve => {
          resolve()
        }).then((res) => {
          const arr = [{
            id: 1,
            p_pid: 446277389287739376,
            p_name: '骆鹏',
            p_sex: 0,
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
            p_sex: 1,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 3,
            p_pid: 446277389287739376,
            p_name: '王五',
            p_sex: 1,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 5,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: 0,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 6,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: 0,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 7,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: 0,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 8,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: 0,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 9,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: 0,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 10,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: 0,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 11,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: 0,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 12,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: 0,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 14,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: 0,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 13,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: 0,
            p_position: '经理',
            p_phone: 15992825543,
            ctime: 1599731775,
            p_department: '研发部',
            mtime: 1599731801
          }, {
            id: 15,
            p_pid: 446277389287739376,
            p_name: '阿铭',
            p_sex: 0,
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
    handleSearch (e) {
      console.log(e)
      e.preventDefault()
      this.search.validateFields((error, values) => {
        if (error) {
          return
        }
        const params = {
          ...values
        }
        console.log(params)
      })
    },
    handleSearchTypechange (value) {
      if (value === '1') {
        this.nameValue = true
      } else {
        this.nameValue = false
      }
    },
    handleRsset () {
      this.search.resetFields()
    },
    handleOk (bool = false) {
      this.$refs.table.refresh(bool)
    },
    handleEdit (record) {
      this.$refs.editSerachDepart.show(record)
    },
    handleDeleteStrategy () {}
  }
}
</script>
