// pages/order-detail/order-detail.js
const API = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id}) {
      this.getOrder(id)
  },
  getOrder(id){
    API.getOrder(id)
        .then(order =>
            {
              this.setData({
                order
              })
                console.log(this.data.order)
            }
        )
  },
  takeMeal(){
      API.finishOrder(this.data.order.id)
          .then(_ =>
              wx.switchTab({
                  url: '/pages/order/order',
              })
          )
  },
  cancelOrder(){
    API.cancelOrder(this.data.order.id)
        .then(_ =>
            wx.switchTab({
              url: '/pages/order/order',
            })
        )
  },
  gotoPay(){
    wx.navigateTo({
      url: '/pages/order-pay/order-pay?orderId='+this.data.order.id,
    })
  }
})
