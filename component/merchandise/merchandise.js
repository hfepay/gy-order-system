// component/merchandise/merchandise.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commodity: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    commodityNumChange:function (e) {
      this.triggerEvent('countChange', e.detail)
    }
  }
})
