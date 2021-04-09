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
    <!-- <div class="table-operator">
      <a-button
        type="primary"
        @click="handleOutAll()"
      ><a-icon type="vertical-align-bottom" />批量操作</a-button>
    </div> -->
    <div class="table-operator">
      <a-button
        type="primary"
        @click="handleOut()"
      >
        <a-icon type="vertical-align-bottom" /> 全部导出
      </a-button>
      <a-popover :visible="tipVisible" title="请选择需要操作的数据哦~" trigger="click" @click="tipShow">
        <a-button
          :disabled="!hasSelected"
          type="primary"
          @click="handleOutAll()"
        >
          <a-icon type="vertical-align-bottom" /> 批量导出
        </a-button>
      </a-popover>
    </div>
    <s-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="alert"
      :rowSelection="rowSelection">
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="mtime" slot-scope="text">{{ text | moment }}</span>
      <span slot="action" slot-scope="text, record">
        <a-button-group size="small">
          <a-button v-show="record.s_changesalary !== 2" :disabled="record.s_changesalary === 1" @click="handleChangeSalary(record)">{{ record.s_changesalary === 0 ? `申请调薪`:`调薪审核中...` }}</a-button>
          <a-button v-if="record.s_changesalary === 2" @click="handleEdit(record)">编辑</a-button>
        </a-button-group>
        <a-button-group size="small">
          <a-button @click="handleOutOne(record)">导出工资条</a-button>
        </a-button-group>
      </span>
    </s-table>
    <edit-modal @fnRefresh="handleOk" ref="salaryModal"></edit-modal>
    <a-modal
      title="批量操作"
      :visible="visible"
      :width="640"
      :confirm-loading="confirmLoading"
      @ok="showConfirm"
      @cancel="handleCancel" >
      <span>确认导出选中数据吗！</span>
    </a-modal>
  </a-card>
</template>

<script>
import EditModal from './modules/EditModal.vue'
import { export_json_to_excel as exportjsontoexcel } from '@utils/Export2Excel'
export default {
  components: {
    EditModal
  },
  data () {
    return {
      nameValue: false,
      visible: false,
      confirmLoading: false,
      alldata: [],
      title: '是否确认下载导出所选薪资数据',
      tipVisible: false,
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
          const snameid = []
          sname.forEach(item => {
            snameid.push(item._id)
          })
          const params1 = {
            snameid
          }
          console.log(snameid)
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
              this.alldata = newdata
              return newdata
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      selectedRowKeys: [],
      selectedRows: [],
      alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
      rowSelection: {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
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
    handleChangeSalary (record) {
      const params = Object.assign({}, record)
      params.s_changesalary = 1
      this.$api.salary.salaryEdit(params)
        .then(res => {
          this.$message.success('申请调薪成功')
          this.handleOk(true)
        })
        .catch(err => {
          this.$message.error('申请调薪失败')
          console.log(err)
        })
    },
    handleEdit (record) {
      this.$refs.salaryModal.show(record)
    },
    handleOk (bool = false) {
      // 更新数据
      this.$refs.table.refresh(bool)
    },
    handleOutOne (record) {
      const list = [record]
      console.log(list)
      this.export2Excel(list)
    },
    handleOutAll () {
      this.visible = true
    },
    handleCancel () {
      this.visible = false
      this.selectedRowKeys = []
      console.log(this.selectedRowKeys)
    },
    handleAll () {
      this.export2Excel(this.selectedRows)
      this.handleCancel()
    },
    handleOut () {
      this.export2Excel(this.alldata)
    },
    export2Excel (tablelist) {
      require.ensure([], () => {
        const tHeader = ['姓名', '工号', '基本工资', '五险', '公积金', '加班工资', '补贴金', '实发工资']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['sname', 's_id', 's_salary', 's_insurance', 's_fund', 's_addsalary', 's_allowance', 's_realsalary']
        // 上面的 s_name、s_id、是selectedRows里对象的属性
        const list = tablelist // 把data里的tableData存到list
        list.map(item => {
          item['sname'] = item['s_name']['p_name']
          item['s_id'] = item['s_name']['p_id']
        })
        const data = this.formatJson(filterVal, list)
        if (list.length > 1) {
          exportjsontoexcel(tHeader, data, '员工薪资表')
        } else {
          exportjsontoexcel(tHeader, data, `${list[0]['sname']}员工薪资表`)
        }
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    showConfirm () {
      const that = this
      that.$confirm({
        title: that.title,
        onOk () {
          that.handleAll()
        },
        onCancel () {
          that.handleCancel()
        }
      })
    },
    tipShow () {
      if (this.selectedRowKeys.length <= 0) {
        this.tipVisible = !this.tipVisible
      } else {
        this.tipVisible = false
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
