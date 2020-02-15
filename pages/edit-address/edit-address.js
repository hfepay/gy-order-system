const API = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断是否是选择地址
    type: '',
    form:{
      id:"",
      "addrName": "",
      "addrMobile": "",
      "addrMore": ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id, type}) {
    this.data.type = type
    if(id){
      wx.setNavigationBarTitle({title: '修改地址'})
      this.getAddress(id)
    }
  },
  getAddress(id){
    API.getAddress(id)
        .then(res => {
          this.setData({
            form: res
          })
        })
  },
  submit(){
    if(this.data.form.id){
      this.updateAddress()
    }else{
      this.addAddress()
    }
  },
  updateAddress(){
    API.updateAddress(this.data.form)
        .then(_ =>
            wx.navigateBack()
        )
  },
  addAddress(){
    API.addAddress(this.data.form)
        .then(_ =>
            wx.navigateBack()
        )
  },
  delAddress(){
    API.delAddress(this.data.form.id)
        .then(_ =>
            wx.navigateBack()
        )
  },
  handleInput(e){
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
