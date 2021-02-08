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
                <a-select-option value="3">身份证</a-select-option>
                <a-select-option value="4">毕业院校</a-select-option>
                <a-select-option value="5">性别</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="搜索内容" v-if="nameValue">
              <a-input v-decorator="['p_name']" name="p_name" />
            </a-form-item>
            <a-form-item label="搜索内容" v-else-if="idValue">
              <a-input v-decorator="['p_id']" name="p_id" />
            </a-form-item>
            <a-form-item label="搜索内容" v-else-if="pidValue">
              <a-input v-decorator="['p_pid']" name="p_pid" />
            </a-form-item>
            <a-form-item label="搜索内容" v-else-if="schoolValue">
              <a-input v-decorator="['p_school']" name="p_school" />
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
          <a-button @click="handleCheckInfo(record)">查看个人信息</a-button>
          <a-popconfirm
            title="确定删除此人信息？"
            @confirm="() => handleDeleteInfo(record)"
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
      idValue: false,
      schoolValue: false,
      search: this.$form.createForm(this),
      columns: [
        { dataIndex: 'id',
          title: 'ID',
          width: 100,
          ellipsis: true
        },
        {
          dataIndex: 'p_name',
          title: '姓名',
          width: 80
        },
        {
          dataIndex: 'p_id',
          title: '工号'
        },
        {
          dataIndex: 'p_sex',
          title: '性别',
          width: 50,
          scopedSlots: { customRender: 'p_sex' }
        },
        {
          dataIndex: 'p_pid',
          title: '身份号'
        },
        {
          dataIndex: 'p_school',
          title: '毕业院校'
        },
        {
          dataIndex: 'p_address',
          title: '联系地址',
          ellipsis: true
        },
        {
          dataIndex: 'p_email',
          title: '邮箱'
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
        return this.$api.employee.allemployee(params)
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
    handleSearchTypechange (value) {
      if (value === '1') {
        this.nameValue = true
        this.pidValue = false
        this.schoolValue = false
        this.idValue = false
      } else if (value === '2') {
        this.nameValue = false
        this.idValue = true
        this.pidValue = false
        this.schoolValue = false
      } else if (value === '3') {
        this.nameValue = false
        this.idValue = false
        this.pidValue = true
        this.schoolValue = false
      } else if (value === '4') {
        this.nameValue = false
        this.idValue = false
        this.pidValue = false
        this.schoolValue = true
      } else {
        this.nameValue = false
        this.idValue = false
        this.pidValue = false
        this.schoolValue = false
      }
    },
    handleRsset () {
      this.search.resetFields()
      this.handleOk(true)
    },
    handleOk (bool = false) {
      this.$refs.table.refresh(bool)
    },
    handleEdit (record, isEdit) {
      this.$refs.employeeModal.show(record, isEdit)
    },
    handleCheckInfo () {

    },
    handleDeleteInfo (record) {
      console.log(record._id)
      const { _id } = record
      const params = {
        _id
      }
      this.$api.employee.employeeDeleteInfo(params)
        .then(res => {
          const { msg } = res
          this.$message.success(msg)
          this.handleOk(true)
        })
        .catch(err => {
          this.$message.error('删除失败')
          console.log(err)
        })
    }
  }
}
</script>
