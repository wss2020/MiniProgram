Component({
  properties:{
    swiperList: Array,
    inActivedColor:String,
    activedColor:{
      type:String,
      value:'#FF7500'
    }
  },
  data: {
    swiperIndex: 0
  },
  methods:{
    swiperChange(e){
      this.setData({
        swiperIndex:e.detail.current
      })
    }
  }
})