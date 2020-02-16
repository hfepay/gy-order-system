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
  }
})
