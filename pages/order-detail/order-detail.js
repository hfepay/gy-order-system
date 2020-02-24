// pages/order-detail/order-detail.js
const API = require('../../utils/api')
const {DELIVERY_TYPE} = require('../../contants/constants')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
      //是否为自取
      selfPick:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id}) {
      this.getOrder(id)
  },
  getOrder(id){
    API.getOrder(id)
        .then(order =>
            {
              this.setData({
                order
              })
                if(order.transportType == DELIVERY_TYPE.SELF_PICK){
                    this.setData({
                        selfPick: true
                    })
                }
            }
        )
  },
  takeMeal(){
      API.finishOrder(this.data.order.id)
          .then(_ =>
              this.gotoOrder()
          )
  },
  cancelOrder(){
    API.cancelOrder(this.data.order.id)
        .then(_ =>
            this.gotoOrder()
        )
  },
    gotoOrder(){
        wx.switchTab({
            url: '/pages/order/order',
            success: function(e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return
                page.onLoad();
            }
        })
    },
  gotoPay(){
    wx.navigateTo({
      url: '/pages/order-pay/order-pay?orderId='+this.data.order.id,
    })
  }
})
