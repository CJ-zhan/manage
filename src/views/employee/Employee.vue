<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit()">批量导入</a-button>
    </div>
    <s-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="loadData">
      <span slot="action">
        <a>编辑</a>
        <a-divider type="vertical"/>
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>
  </a-card>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '规则编号',
          dataIndex: 'no'
        },
        {
          title: '描述',
          dataIndex: 'description'
        },
        {
          title: '服务调用次数',
          dataIndex: 'callNo'
        },
        {
          title: '状态',
          dataIndex: 'status'
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt'
        },
        {
          table: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      datalist: {
        'message': '',
        'result': {
          'data': [{
            id: 1,
            title: 'Alipay',
            description: '那是一种内在的东西， 他们到达不了，也无法触及的',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
          },
          {
            id: 2,
            title: 'Angular',
            description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
          },
          {
            id: 3,
            title: 'Ant Design',
            description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
          },
          {
            id: 4,
            title: 'Ant Design Pro',
            description: '那时候我只会想自己想要什么，从不想自己拥有什么',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
          },
          {
            id: 5,
            title: 'Bootstrap',
            description: '凛冬将至',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
          },
          {
            id: 6,
            title: 'Vue',
            description: '生命就像一盒巧克力，结果往往出人意料',
            status: 1,
            updatedAt: '2018-07-26 00:00:00'
          }
          ],
          'pageSize': 10,
          'pageNo': 0,
          'totalPage': 6,
          'totalCount': 57
        },
        'status': 200,
        'timestamp': 1534955098193
      },
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // return getUsers(Object.assign(parameter, this.queryParam)).then(res => {
        //   return res.result
        // })
        this.getList().then(res => {
          console.log(res.result)
          return res.result.data
        })
      }
    }
  },
  methods: {
    handleEdit () {},
    getList () {
      return new Promise((resolve, reject) => {
        const temp = true
        const err = 'err'
        if (temp) {
          resolve(this.datalist)
        } else {
          reject(err)
        }
      })
    }
  }
}
</script>
