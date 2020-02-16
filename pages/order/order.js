// pages/order/order.js
const API = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getUnfinishedOrders()
  },
  getUnfinishedOrders(){
    API.getUnfinishedOrders()
        .then(res => {
          this.setData({
            orderList: res
          })
        })
  },
  getFinishedOrders(){
    API.getFinishedOrders()
        .then(res => {
          this.setData({
            orderList: res
          })
        })
  },
  onTabClick(e){
    switch (e.detail.index) {
      case 0:
        this.getUnfinishedOrders();
        break
      case 1:
        this.getFinishedOrders();
        break
    }
  },
})
