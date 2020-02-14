//app.js
const API = require('utils/api.js')
App({
  onLaunch: function () {
    wx.removeStorageSync('jsCode')
    API.initJsCode()
  },
  globalData: {
    userInfo: null
  }
})
