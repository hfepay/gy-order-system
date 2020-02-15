// pages/address/address.js
const API = require('../../utils/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({type}){
      this.data.type = type
  },
  onShow: function () {
    this.initAddressList()
  },
  chooseAddress(e){
      if(this.data.type === 'choose'){
          const {address} = e.currentTarget.dataset
          app.globalData.address = address
          wx.navigateBack()
      }
  },
  initAddressList(){
    API.getAddressList()
        .then(res => {
          this.setData({
            addressList: res
          })
        })
  },
    edit(e){
        const {id} = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/edit-address/edit-address?id=${id}`,
        })
    },
})
