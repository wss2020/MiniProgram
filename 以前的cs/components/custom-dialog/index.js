Component({
  properties: {
    showCancel:{
      type: Boolean,
      value: false
    },
    center:{
      type: Boolean,
      value: false
    },
    cancelColor:{
      type: String,
      value: 'rgba(16,24,32,0.3)'
    },
    cancelText:{
      type: String,
      value: '取消'
    },
    sureColor:{
      type: String,
      value: '#101820'
    },
    sureText:{
      type: String,
      value: '确定'
    },
    showDialog: { 
      type: Boolean,
      value: false
    },
    message: { 
      type: String,
      value: ''
    },
    title: { 
      type: String,
      value: ''
    }
  },
  methods: {
    // 阻止滚动
    noTouchMove: function () {},
    oncancel:function(){
      this.triggerEvent('oncancel')
    },
    onsure:function () {
      this.triggerEvent('onsure')
    }
  }
})