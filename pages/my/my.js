// pages/my/my.js
const API = require('../../utils/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    this.initUserInfo()
  },
  initUserInfo(){
    const userInfo = app.globalData.userInfo
    userInfo && this.setData({userInfo})
  },
  logout(){
    API.logout()
  }
})
