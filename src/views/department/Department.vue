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
            <a-button @click="handleRsset">重置</a-button>
          </div>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd()">新增部门</a-button>
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
      <span slot="action" slot-scope="text, record">
        <a-button-group size="small">
          <a-button>
            <router-link :to="{ name: 'searchdepart', params: { id: record.id } }">查看部门</router-link>
          </a-button>
          <a-button @click="handleEdit(record, true)">编辑</a-button>
          <a-popconfirm
            title="确定删除此部门？"
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
      search: this.$form.createForm(this),
      columns: [
        { dataIndex: 'id',
          title: 'ID'
        },
        {
          dataIndex: 'd_name',
          title: '部门名称'
        },
        {
          dataIndex: 'd_numbers',
          title: '部门人数'
        },
        {
          dataIndex: 'd_desc',
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
        return new Promise(resolve => {
          resolve()
        }).then((res) => {
          const arr = [{
            id: 1,
            d_name: '研发部',
            d_numbers: 30,
            d_desc: '研发产品'
          },
          {
            id: 2,
            d_name: '产品部门',
            d_numbers: 20,
            d_desc: '研发产品'
          }, {
            id: 3,
            d_name: '运营部门',
            d_numbers: 20,
            d_desc: '研发产品'
          }, {
            id: 4,
            d_name: '运维部门',
            d_numbers: 10,
            d_desc: '研发产品'
          } ]
          return arr
        })
      }
    }
  },
  methods: {
    handleSearch () {},
    handleRsset () {},
    handleEdit () {
      console.log(12)
    },
    handleAdd () {},
    handleDeleteStrategy () {}
  }
}
</script>
