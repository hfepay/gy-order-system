//app.js
const API = require('utils/api.js')
App({
  onLaunch: function () {
    API.initJsCode()
  },
  globalData: {
    userInfo: null
  }
})