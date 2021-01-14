Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    show: Boolean,
    searchText: String
  },
  methods: {
    onfocus(){
      this.triggerEvent('onfocus')
    }
  }
})