// pages/order-pay/order-pay.js
const API = require('../../utils/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {},
    address: {},
    commodity: {name:'香辣鸡腿堡套餐',img:'/static/image/logo/logo.png',money:'￥72.0', count:'1'}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({orderId}) {
    this.getOrderDetail(orderId)
        .then(orderDetail => {
          this.setData({
            orderDetail
          })
        })
  },
  onShow(){
    this.initAddress()
  },
  initAddress(){
    if(app.globalData.address){
      this.setData({
        address: app.globalData.address
      })
    }
  },
  getOrderDetail(orderId){
    API.getOrder(orderId)
        .then(orderDetail => {
          this.setData({
            orderDetail
          })
        })
  },
  submit(){
    API.pay(
        {
        ...this.data.address,
        orderNo: this.data.orderDetail.orderId
      }
    ).then(_ => {
      wx.switchTab({
        url: '/pages/order/order',
      })
    })
  }
})
