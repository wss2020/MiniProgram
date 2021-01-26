Component({
  properties: {
    Width:{
      type:Number,
      value:654,
    },
    Height:{
      type:Number,
      value:392,
    },
    current:{
      type: Number,
      value: 0
    },
    swiperList: {
      type: Array,
      value: []
    },
    duration:{
      type: Number,
      value: 500
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    swiperChange(e){
      this.setData({
        currentIndex: e.detail.current
      })
    },
    onClickPanoramic(){
      this.triggerEvent('onclickpanoramic')
    }
  }
})
