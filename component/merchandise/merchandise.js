// component/merchandise/merchandise.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commodity: Object,
    index:Number,
    disabled:Boolean,
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
    numChange:function (e) {
      this.triggerEvent('numChange', {foodNum:e.detail,index:this.data.index})
    }
  }
})
