//app.js
const API = require('utils/api.js')
App({
  onLaunch: function () {
    wx.removeStorageSync('jsCode')
    API.initJsCode()
  },
  setUserInfo(data){
    this.globalData.userInfo = data
    wx.setStorageSync('userInfo', data)
    return data
  },
  getUserInfo(){
    if(this.globalData.userInfo){
      return this.globalData.userInfo
    }else{
      const userInfo = wx.getStorageSync('userInfo')
      if(userInfo){
        return this.setUserInfo(userInfo)
      }
      return null
    }
  },
  globalData: {
    userInfo: null,
    address: null
  }
})
