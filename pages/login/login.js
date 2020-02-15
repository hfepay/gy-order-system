// pages/login/login.js
const API = require('../../utils/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  login: function(e){
    API.login(e.detail)
        .then(res => {
          app.setUserInfo(res)
          wx.switchTab({
            url: '/pages/index/index',
          })
        })
        .catch(err => {
          if (err.code === 1003){
            const { openid, session_key} = err.data
            wx.redirectTo({
              url: `/pages/my-info/my-info?type=regist&openId=${openid}&session_key=${session_key}`,
            })
          }
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
