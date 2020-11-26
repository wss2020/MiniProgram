Component({
  properties: {
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
    },
    showPanoramic:{
      type: Boolean,
      value: true
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
