//index.js
//获取应用实例
const app = getApp()
const API = require('../../utils/api')
const { USER_STATUS } = require('../../contants/constants')
const {formatTime} = require('../../utils/util')
Page({
  data: {
    merchant: {},
    timeList: [],
    foodList: [],
  },
  onShow: function () {
    this.checkLogin()
  },
  checkLogin(){
    if (app.getUserInfo()){
      this.initMerchant()
    }else{
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }
  },
  initMerchant(){
    const merchant = wx.getStorageSync('merchant')
    if (merchant){
      this.setData({
        merchant
      })
      this.initTimeList()
      this.initFoodList()
    }else{
      wx.navigateTo({
        url: '/pages/merchant-list/merchant-list',
      })
    }
  },
  initTimeList(){
    const timeList = [...new Array(7).keys()].map((item,index) => {
      const date = new Date(Date.now() + 24*60*60*1000*index)
      const day = formatTime(date, 'yyyy-MM-dd')
      const week = formatTime(date, 'EE')
      let selected = false
      if(app.globalData.day){
        selected = day === app.globalData.day
      }else{
        selected = index === 0
      }
      return {
        day,
        date:formatTime(date, 'MM-dd'),
        week,
        selected: selected
      }
    })
    this.setData({
      timeList
    })
  },
  selectDay:function(e){
    const index = e.currentTarget.dataset.index
    const timeList = this.data.timeList.map((item,i) => {
      return {
        ...item,
        selected: i === index
      }
    })
    app.globalData.day = this.data.timeList[index].day
    this.setData({
      timeList
    })
    this.initFoodList()
  },
  initFoodList(){
    const busId = this.data.merchant.id
    const day = this.getSelectDay()
    API.getFoodList({busId,day})
        .then(res => {
          this.setData({
            foodList:res
          })
        })
  },
  getSelectDay(){
    return this.data.timeList.find(item => item.selected).day
  },
  toMenuPage:function(e){
    const userInfo = app.getUserInfo() || {}
    if (userInfo.status == USER_STATUS.INACTIVE){
      wx.showToast({
        title: '您的账号当前处于冻结状态，无法下单',
        icon: 'none'
      })
      return
    }
    const { distributeType, distributeTime, isCutoff } = e.currentTarget.dataset.item
    const distributeDate = this.getSelectDay()
    wx.navigateTo({
      url: `/pages/menu/menu?distributeType=${distributeType}&distributeDate=${distributeDate}&distributeTime=${distributeTime}&isCutoff=${isCutoff}`,
    })
  }
})
