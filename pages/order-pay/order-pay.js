// pages/order-pay/order-pay.js
const API = require('../../utils/api')
const {DELIVERY_TYPE, PAY_TYPE, PAY_TYPE_ENUM} = require('../../contants/constants')
const WxValidate = require('../../utils/validate.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPayType: false,
    moneyInfo: {},
    orderDetail: {},
    address: {},
    payTypeList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({orderId}) {
    this.initPayTypeList()
    this.initData()
    this.calcMoney()
  },
  onShow(){
    this.initAddress()
  },
  initPayTypeList(){
    const payTypeList = Object.keys(PAY_TYPE).map(key => {
      return {
        value:key,
        name: PAY_TYPE[key]
      }
    })
    this.setData({
      payTypeList
    })
  },
  initData(){
    const pages = getCurrentPages()
    const length = pages.length
    const {orderDetail,merchant,params} = pages[length-2].data
    const  businessAddress = merchant.address
    const  businessMobile = merchant.mobile
    const  orderBusName = merchant.businessName
    const  businessId = merchant.id
    const data = {
      ...orderDetail,
      orderBusName,
      businessAddress,
      businessMobile,
      businessId,
      transportType:DELIVERY_TYPE.DELIVERY,
      ...params
    }
    this.setData({
      orderDetail:data
    })
  },
  handleInput(e){
    const val = e.detail
    const {key} = e.currentTarget.dataset
    this.data.orderDetail[key] = val
  },
  numChange:function(e){
    const foodDetail = this.data.orderDetail.details
    const {foodNum, index} = e.detail
    foodDetail[index].foodNumber = foodNum
    this.setData({
      foodDetail
    })
    this.calcMoney()
  },
  calcMoney(){
    API.calculatePrice(this.getCalcMoneyData())
        .then(res =>
            this.setData({
              moneyInfo: res
            })
        )
  },
  getCalcMoneyData(){
    const { businessId, transportType, foodDetail} = this.data.orderDetail
    return {
      transportType,
      businessId,
      foodDetail
    }
  },
  onSwitchChange(e){
    this.setData({
      'orderDetail.transportType':e.detail?DELIVERY_TYPE.SELF_PICK:DELIVERY_TYPE.DELIVERY,
    })
    this.calcMoney()
  },
  initAddress(){
    const address = app.globalData.address
    if(address){
      const orderDetail = {...this.data.orderDetail,...address,id:''}
      this.setData({
        orderDetail
      })
    }
  },
  getOrderDetail(orderId){
    API.getOrder(orderId)
        .then(orderDetail => {
          this.setData({
            orderDetail
          })
        })
  },
  validateForm(){
    let rule = {}
    let messages = {
      addrMore: { required: '请选择地址' },
      memberMobile: { required: '请输入预留手机', tel: '手机号非法' }
    }
    // 自取
    if (this.data.orderDetail.transportType == DELIVERY_TYPE.SELF_PICK){
      rule.memberMobile = { required: true, tel: true}
      rule.addrMore = {}
      }else{
      rule.memberMobile = {}
      rule.addrMore = { required: true}
    }
    const wxValidate = new WxValidate(rule, messages)
    // 传入表单数据，调用验证方法
    if (!wxValidate.checkForm(this.data.orderDetail)) {
      const error = wxValidate.errorList[0]
      wx.showToast({
        title: error.msg,
        icon: 'none'
      })
      return false
    }
    return true
  },
  submit(){
    if(!this.validateForm())return
    const data = this.getSubmitData()
    API.addOrder(data)
        .then(orderId => {
          const cb = data.payType == PAY_TYPE_ENUM.WECHAT ? new Promise(resolve => {
            API.getPayInfo(orderId)
                .then(info => {
                  const { timeStamp, nonceStr, signType, paySign} = info
                  wx.requestPayment({
                    timeStamp,
                    nonceStr,
                    package: info.package,
                    signType,
                    paySign,
                    'success'(res){
                      resolve(res)
                    },
                    'fail'(){
                      wx.switchTab({
                        url: '/pages/order/order',
                        success(){
                          setTimeout(_ => {
                            wx.navigateTo({
                              url: '/pages/order-detail/order-detail?id=' + orderId,
                              success(res) {
                                console.log('跳转结果:', res)
                              }
                            })
                          }, 1000)
                        }
                      })
                    }
                  })
                })
          }) : null
          this.confirmOrder(orderId, cb)
        })
  },
  confirmOrder(orderId, fn){
    fn = fn || new Promise(resolve => resolve())
    fn.then(res => {
      API.pay({orderId}).then(_ => {
        this.gotoPayResult(orderId)
      })
    })
  },
  gotoPayResult(orderId){
    wx.switchTab({
      url: '/pages/order/order',
    })
  },
  selectPayType(){
      this.setData({
        showPayType: true
      })
  },
  onClose() {
    this.setData({ showPayType: false });
  },

  onSelect(event) {
    const {value, name} = event.detail
    this.setData({
      'orderDetail.payType':value
    })
    this.onClose()
  },
  getSubmitData(){
    return {
      ...this.data.orderDetail,
      ...this.data.address
    }
  },
})
