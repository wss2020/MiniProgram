Component({
  properties: {
    checked: {
      type: Boolean,
      value: false,
      observer(val) {
        this.setData({ selfChecked: val })
      }
    }
  },
  methods: {
    onCheckboxChange(e) {
      const selfChecked = e.detail.value.length > 0
      this.setData({ selfChecked })
      this.triggerEvent('onchange', selfChecked)
    }
  }
})
