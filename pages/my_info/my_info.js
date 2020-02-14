// pages/my_info/my_info.js
const API = require('../../utils/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    VIPTypeList: [{id:'1', name:'vip'},{id:'2', name:'svip'}],
    form: {
      "name" : "", 								// 姓名
      "mobile" : "",								// 手机号码
      "staffOneUnit" : "",					// 一级单位
      "staffOneDepartment" : "",		// 一级部门
      "staffNo" : "",								// 员工编号
      "staffType" : 1,									// 会员类型:1:集团员工：2:驻场单位
      "openId" : "",								// 微信opend
      "wechatAvatar" : "",					// 微信头像
      "wechatNickName" : ""
    },
    // 页面传过来的参数
    params: {
      type:'',
      openId:'',
      session_key:'',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.params = options
    if(this.data.params.type === 'regist'){
      wx.setNavigationBarTitle({title: '会员信息填写'})
    }
  },
  submit(){
    const data = {...this.data.form, openId: this.data.params.openId}
    API.register(data)
        .then(res => {
          app.globalData.userInfo = res
          wx.switchTab({
            url: '/pages/index/index',
          })
        })
  },
  handleInputChange(e){
    const val = e.detail
    const {key} = e.currentTarget.dataset
    this.data.form[key] = val
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
  onConfirm: function(){
    this.setData({
      show: false
    })
  },
  onCancel: function(){
    this.setData({
      show: false
    })
  },
  selectVIPType: function(){
    this.setData({
      show: true
    })
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
