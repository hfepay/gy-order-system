// pages/my-info/my-info.js
const API = require('../../utils/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      "name" : "", // 姓名
      "mobile" : "", // 手机号码
      "staffOneUnit" : "", // 一级单位
      "staffOneDepartment" : "", // 一级部门
      "staffNo" : "", // 员工编号
      "staffType" : 1, // 会员类型:1:集团员工：2:驻场单位
      "memberNo" : "",
    },
    // 身份证是否验证成功
    validateIdcard: true,
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
    if(this.isRegist()){
      this.setData({
        validateIdcard: false
      })
      wx.setNavigationBarTitle({title: '会员信息填写'})
    }else{
      this.getInfo()
    }
  },
  isRegist(){
    return this.data.params.type === 'regist'
  },
  submit(){
    if(this.isRegist()){
      this.regist()
    }else{
      this.updateInfo()
    }
  },
  updateInfo(){
    const{staffNo, mobile} = this.data.form
    API.updateInfo({staffNo, mobile})
        .then(res => {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
          })
        })
  },
  validateIdcard(){
    const memberNo = this.data.form.memberNo
    const openId = this.data.params.openId
    API.verifyMemberNo({ openId, identity:memberNo})
        .then(res => {
          this.setData({
            form:{...res,memberNo},
            validateIdcard: true
          })
        })
  },
  getInfo(){
    API.getMyInfo()
        .then(res =>
            this.setData({
              form: res
            })
        )
  },
  regist(){
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
