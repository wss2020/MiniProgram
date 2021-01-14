let timer;
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    value: {
      type: String,
      value: '',
      observer(val) {
        this.setData({ searchText: val })
      }
    },
    show: Boolean
  },
  data: {
    searchText: '',
    inputFocus: false,
    result: [],
    isloading: false
  },
  lifetimes: {
    attached() {
      this.setStyles()
    }
  },
  methods: {
    handleFocus() {
      this.setData({ inputFocus: true })
    },
    handleBlur() {
      if (!this.data.searchText) {
        this.setData({ inputFocus: false })
      }
    },
    handleInput(e) {
      this.setData({ searchText: e.detail.value })
      this.searchAddress(e.detail.value)
    },
    searchAddress(keyword) {
      if (timer) clearTimeout(timer);
      if (!keyword.trim()) {
        this.setData({ result: [] })
        return
      }
      this.setData({ isloading: true })
      timer = setTimeout(() => {
        getApp().qqmapsdk.getSuggestion({
          keyword,
          success: res => {
            this.setData({ isloading: false, result: res.data })
          },
          fail(error) {
            console.error(error);
          }
        })

      }, 800)

    },
    handleClickAddress(e) {
      const { title, location } = e.target.dataset.detail
      this.triggerEvent('onchange', { title, location })
      this.triggerEvent('onclose')
    },
    handleclose() {
      this.triggerEvent('onclose')
    },
    setStyles() {
      const {
        navBarHeight,
        statusBarHeight,
        capsulePosition,
        navBarExtendHeight,
      } = getApp().globalSystemInfo;

      const calcNavBarHeight = navBarHeight + navBarExtendHeight
      let wraperStyle = [
        `padding-top:${calcNavBarHeight}px`
      ].join(';');

      let backIconStyle = [
        `top:${statusBarHeight}px`,
        `height:${capsulePosition.height}px`
      ].join(';');


      this.setData({ wraperStyle, backIconStyle })
    },
  }

})