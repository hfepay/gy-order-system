// pages/order-pay/order-pay.js
const API = require('../../utils/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneyInfo: {},
    orderDetail: {},
    address: {}
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
  numChange:function(e){
    const foodDetail = this.data.orderDetail.details
    const {foodNum, index} = e.detail
    foodDetail[index].foodNum = foodNum
    this.setData({
      foodDetail
    })
    this.calcMoney()
  },
  calcMoney(){
    API.calculatePrice(this.getCalcMoneyData())
        .then(res =>
            this.setData({
              moneyInfo: res
            })
        )
  },
  getCalcMoneyData(){
    return {
      foodDetail: this.data.orderDetail.details
    }
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
        foodDetail:this.data.orderDetail.details,
        ...this.data.address,
        orderNo: this.data.orderDetail.id
      }
    ).then(_ => {
      wx.switchTab({
        url: '/pages/order/order',
      })
    })
  }
})
