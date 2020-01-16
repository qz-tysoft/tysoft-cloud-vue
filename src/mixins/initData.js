import {initData } from '@/api/data/initData';

export default {
  data() {
    return {
      loading: true, data: [], page: 0, size: 10, total: 0, url: '', params: {}, query: {}, time: 200
    }
  },
  methods: {
    // async异步处理初始化时候得到相关数据
    async init() {
      // await同步(beforeInit()没执行完不往下执行)
      if (!await this.pageParamsInit()) {
          return
      }
      //Promise用在异步回调函数身上(此方法采取链式写法)如下面还有一个Promise
      //则需要有依赖于上一个Promise的状态
      return new Promise((resolve, reject) => {
        //提供的这两个函数resolve(未完成转完成状态),reject(未完成转失败状态)
        this.loading = true
        initData(this.url, this.params).then(res => {
          this.total = res.totalElements
          this.data = res.content
          setTimeout(() => {
            this.loading = false
          }, this.time)
          resolve(res)//状态转成功
        }).catch(err => {
          this.loading = false
          reject(err)//状态转失败
        })
      })
    },
    beforeInit() {
      return true
    },
    pageChange(e) {
      this.page = e - 1
      this.init()
    },
    sizeChange(e) {
      this.page = 0
      this.size = e
      this.init()
    },
    // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
    dleChangePage(size) {
      if (size === undefined) {
        size = 1
      }
      if (this.data.length === size && this.page !== 0) {
        this.page = this.page - 1
      }
    }
  }
}
