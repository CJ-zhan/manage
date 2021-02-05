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
                <a-select-option value="2">身份证号</a-select-option>
                <a-select-option value="3">工号</a-select-option>
                <a-select-option value="4">性别</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="搜索内容" v-if="nameValue">
              <a-input v-decorator="['p_name']" name="p_name" />
            </a-form-item>
            <a-form-item label="搜索内容" v-else-if="pidValue">
              <a-input v-decorator="['p_pid']" name="p_pid" />
            </a-form-item>
            <a-form-item label="搜索内容" v-else-if="phoneValue">
              <a-input v-decorator="['p_phone']" name="p_phone" />
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
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit()">新增员工</a-button>
    </div>
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
      <span slot="p_sex" slot-scope="text">{{ text | statusSex }}</span>
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
    <add-edit-modal @fnRefresh="handleOk" ref="employeeModal"></add-edit-modal>
  </a-card>
</template>

<script>
import AddEditModal from './modules/AddEditModal.vue'
export default {
  components: {
    AddEditModal
  },
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
          dataIndex: 'p_pid',
          title: '身份号'
        },
        {
          dataIndex: 'p_position',
          title: '职位'
        },
        {
          dataIndex: 'p_fromwhere',
          title: '联系地址'
        },
        {
          dataIndex: 'p_phone',
          title: '手机号'
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
            id: 4,
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
        this.pidValue = false
        this.phoneValue = false
      } else if (value === '2') {
        this.nameValue = false
        this.pidValue = true
        this.phoneValue = false
      } else if (value === '3') {
        this.nameValue = false
        this.pidValue = true
        this.phoneValue = true
      } else {
        this.nameValue = false
        this.pidValue = false
        this.phoneValue = false
      }
    },
    handleRsset () {
      this.search.resetFields()
    },
    handleOk (bool = false) {
      this.$refs.table.refresh(bool)
    },
    handleEdit (record, isEdit) {
      this.$refs.employeeModal.show(record, isEdit)
    },
    handleDeleteStrategy () {}
  }
}
</script>
