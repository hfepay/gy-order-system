const API = require('../../utils/api')
const {ORDER_QUERY_TYPE_ENUM, ORDER_QUERY_TYPE} = require('../../contants/constants')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    queryParams: {
        type: ORDER_QUERY_TYPE_ENUM.UNFINISHED,
        current:0,
        size: 10,
        pages:1
    },
    loading: false,
    activeTab: ORDER_QUERY_TYPE_ENUM.UNFINISHED
  },
  onLoad: function (options) {
      // this.initTabs(true)
      this.getOrders()
  },
  onReachBottom(){
    this.getOrders()
  },
  initTabs(init){
    const tabs = Object.keys(ORDER_QUERY_TYPE).map(item => {
          return {
              name:item,
              title:ORDER_QUERY_TYPE[item]
          }
      })
    this.setData({
        tabs
    })
      init &&  this.setData({
          activeTab: ORDER_QUERY_TYPE_ENUM.UNFINISHED
      })
  },
  getOrders(reset){
    if(this.data.queryParams.current == this.data.queryParams.pages)return
      this.setData({
          loading: true
      })
    this.data.queryParams.current++
    API.getOrderList(this.getQueryParams())
        .then(res => {
            const{records, ...queryParams} = res
            const orderList = reset ? records: [...this.data.orderList, ...records]
            this.setData({
                orderList,
                loading: false,
                queryParams: {...this.data.queryParams,...queryParams}
            })
        }).catch(_ => {
            this.setData({
                loading: false
            })
    })
  },
  getQueryParams(){
    return this.data.queryParams
  },
  onTabClick(e){
      const {name} = e.detail
      this.data.queryParams.type = name
      this.data.queryParams.current = 0
      this.data.queryParams.pages = 1
      this.getOrders(true)
  },
})
