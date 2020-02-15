//index.js
//获取应用实例
const app = getApp()
const API = require('../../utils/api')
const {formatTime} = require('../../utils/util')
Page({
  data: {
    merchant: {},
    timeList: [],
    foodList: [],
  },
  onLoad: function () {
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
      return {
        day:formatTime(date, 'yyyy-MM-dd'),
        date:formatTime(date, 'MM-dd'),
        week:formatTime(date, 'EE'),
        selected: index === 0 ? true: false
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
    const { distributeType, cutoff } = e.currentTarget.dataset.item
    const day = this.getSelectDay()
    wx.navigateTo({
      url: `/pages/menu/menu?distributionType=${distributeType}&day=${day}`,
    })
  }
})
