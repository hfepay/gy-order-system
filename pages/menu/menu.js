// pages/menu/menu.js
const API = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchant: {},
    params: {
      distributionType: '',
      day: ''
    },
    showShoppingCart: false,
    menuList: [],
    commodityList: [
      {img: '/static/image/icon/ad.png',name: '香辣鸡腿堡套餐', money: '72.0', count: 2},
      {img: '/static/image/icon/ad.png',name: '香辣鸡腿堡套餐', money: '11.0', count: 1},
    ]
  },
  onSubmit: function(){

  },

  hiddenShoppingCart:function(e){
    this.setData({
      showShoppingCart: false
    })
  },
  showShoppingCart: function(){
      this.setData({
        showShoppingCart: true
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.params = options
    this.initMerchant()
  },
  initMerchant() {
    const merchant = wx.getStorageSync('merchant')
    this.setData({
      merchant
    })
    this.initMenuList()
  },
  initMenuList(){
    API.getMenuList({ ...this.data.params, busId: this.data.merchant.id})
        .then(res => {
          this.setData({
            menuList: res
          })
        })
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
  countChange:function(e){
    console.log(e)
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
