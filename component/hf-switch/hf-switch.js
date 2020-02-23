// component/hf-switch/hf-switch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultValue: {type:Boolean,default: false},
    inactiveText: {type:String},
    activeText: {type:String},
  },

  /**
   * 组件的初始数据
   */
  data: {
    on: false
  },
  attached: function() {
    // 在组件实例进入页面节点树时执行
    this.setData({
      on:this.data.defaultValue
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e){
      const value = e.currentTarget.dataset.value
      if(value === this.data.on)return
      this.setData({
        on:value
      })
      this.triggerEvent('change', value)
    }
  }
})
