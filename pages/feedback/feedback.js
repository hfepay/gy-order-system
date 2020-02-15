// pages/feedback/feedback.js
const API = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      description: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleInput(e){
    const val = e.detail.value
    const {key} = e.currentTarget.dataset
    this.data.form[key] = val
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  submit: function(e){
    API.feedback(this.data.form)
        .then(_ =>
            wx.navigateTo({
              url: '/pages/feedback-success/feedback-success',
            })
        )
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
