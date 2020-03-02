// pages/menu/menu.js
const API = require('../../utils/api')
const {DELIVERY_TYPE} = require('../../contants/constants')
const {MEAL_STATUS} = require('../../contants/constants')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchant: {},
    params: {
      isCutoff: '',
      distributeType: '',
      distributeTime: '',
      distributeDate: ''
    },
    canSubmit: false,
    showShoppingCart: false,
    menuList: [],
    allFoodNum: 0,
    moneyInfo:{
      payAmount: '',
      afterDiscount: '',
      beforeDiscount: '',
      discount: '',
      discountAmount: '',
    },
    orderDetail: {
      foodDetail:[],
    },
    // 是否能添加
    canBook: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.params = options
    if(this.data.params.isCutoff != MEAL_STATUS.BOOKING){
        this.setData({
          canBook: false
        })
    }
    this.initMerchant()
  },
  addFood(e){
    const {food} = e.currentTarget.dataset
    const foodDetail = this.data.orderDetail.foodDetail
    // 判断是新增数量还是新增记录
    let index;
    foodDetail.find((item,i) => {
      const result = (item.id === food.id)
      result && (index = i)
      return result
    })
    if(index !== undefined){
      foodDetail[index].foodNum++
    }else{
      foodDetail.push({
        ...food,
        foodNum: 1
      })
    }
    this.setData({
      'orderDetail.foodDetail':foodDetail,
    })
    this.setAllFoodNum()
    this.calcMoney()
  },
  setAllFoodNum(){
    const foodDetail = this.data.orderDetail.foodDetail
    const allFoodNum = foodDetail.reduce((cur, item, index) => {
      return cur + item.foodNum
    },0)
    this.setData({
      allFoodNum
    })
  },
  calcMoney(){
    API.calculatePrice(this.getCalcMoneyData())
        .then(res =>{
          this.setData({
            moneyInfo: res
          })
          this.setCanSubmit(res)
        })
  },
  setCanSubmit({limitType,limitValue}){
    if(limitType && limitValue){
      const {afterDiscount} = this.data.moneyInfo
      const allFoodNum = this.data.allFoodNum
      // 0 按金额  1：按数量
      if((limitType == 0 && limitValue > afterDiscount)
            || (limitType == 1 && limitValue > allFoodNum)){
        this.setData({
          canSubmit: false
        })
        return;
      }
    }
    this.setData({
      canSubmit: true
    })
  },
  getCalcMoneyData(){
    return {
      ...this.data.orderDetail,
      businessId: this.data.merchant.id,
      // 配送方式:1.自取 2.外卖
      transportType: DELIVERY_TYPE.SELF_PICK
    }
  },
  clearShopCar(){
    this.setData({
      'orderDetail.foodDetail': [],
      showShoppingCart: false
    })
  },
  addOrder(){
    if(!this.data.canSubmit)return
    wx.navigateTo({
      url: '/pages/order-pay/order-pay',
    })
  },
  getSubmitData(){
    const data = {
      ...this.data.orderDetail,
      ...this.data.params,
        businessId: this.data.merchant.id,
      transportType: DELIVERY_TYPE.DELIVERY
    }
    return data
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
  initMerchant() {
    const merchant = wx.getStorageSync('merchant')
    this.setData({
      merchant
    })
    this.initMenuList()
  },
  initMenuList(){
    const params = {
      busId: this.data.merchant.id,
      distributionType: this.data.params.distributeType,
      day: this.data.params.distributeDate,
    }
    API.getMenuList(params)
        .then(res => {
          this.setData({
            menuList: res
          })
        })
  },
  numChange:function(e){
    const foodDetail = this.data.orderDetail.foodDetail
    const {foodNum, index} = e.detail
    foodDetail[index].foodNum = foodNum
    this.setData({
      foodDetail
    })
    this.setAllFoodNum()
    this.calcMoney()
  },
})
