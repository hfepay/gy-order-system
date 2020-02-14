// pages/my_info/my_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    VIPTypeList: [{id:'1', name:'vip'},{id:'2', name:'svip'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(false){
      wx.setNavigationBarTitle({title: '会员信息填写'})
    }

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
