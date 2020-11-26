Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties:{
    // 展开
    expend:{
      type: Boolean,
      value: false,
      observer(value){
        this.setData({ rotate: value })
      }
    },
    duration:{
      type: Number,
      value: 0.3
    },
    showIcon:{
      type: Boolean,
      value: false
    },
    disabledSure:{
      type: Boolean,
      value: false
    },
    sureText:{
      type: String,
      value: '下一步'
    },
    color:{
      type: String,
      value:'#101820'
    },
    sureActived:{
      type: Boolean,
      value:false
    }
  },
  data: {
    rotate: false
  },
  methods:{
    onClickPrice(){
      this.setData({
        rotate: !this.data.rotate
      })
      this.triggerEvent('onlooksum')
    },
    onClickSure(){
      if (this.data.disabledSure) return
      this.triggerEvent('onsure')
    }
  }
})
