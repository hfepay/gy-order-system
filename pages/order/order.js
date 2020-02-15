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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
