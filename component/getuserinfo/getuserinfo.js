// component/getuserinfo/getuserinfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    getuserinfo: function (e) {
      if (e.detail.rawData) {
        this.triggerEvent('getuserinfo', e.detail.rawData)
      }
    }
  }
})
