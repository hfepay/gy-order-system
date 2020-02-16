// pages/menu/menu.js
const API = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchant: {},
    params: {
      distributeType: '',
      distributeTime: '',
      distributeDate: ''
    },
    showShoppingCart: false,
    menuList: [],
    allFoodNum: 0,
    moneyInfo:{
      afterDiscount: '',
      beforeDiscount: '',
      discount: '',
      discountAmount: '',
    },
    orderDetail: {
      foodDetail:[],
    },
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
        .then(res =>
          this.setData({
            moneyInfo: res
          })
        )
  },
  getCalcMoneyData(){
    return this.data.orderDetail
  },
  clearShopCar(){
    this.setData({
      'orderDetail.foodDetail': [],
      showShoppingCart: false
    })
  },
  addOrder(){
    API.addOrder(this.getSubmitData())
        .then(orderId => {
          wx.navigateTo({
            url: '/pages/order-pay/order-pay?orderId='+orderId,
          })
        })

  },
  getSubmitData(){
    const data = {
      ...this.data.orderDetail,
      ...this.data.params,
      busId: this.data.merchant.id
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
