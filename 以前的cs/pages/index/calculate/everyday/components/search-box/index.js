Component({
  properties: {
    show: Boolean,
    searchText: {
      type: String,
      observer(val){
        this.setData({ selfSearchText: val.trim() })
      }
    }
  },
  data:{
    selfSearchText: ''
  },
  methods: {
    onfocus(){
      this.triggerEvent('onfocus')
    },
    onsearch(){
      if (this.data.selfSearchText) {
        this.triggerEvent('onsearch')
      }
    },
    clearText(){
      this.triggerEvent('onclear')
    }
  }
})
