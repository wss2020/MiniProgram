Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    parent: String,
    buttons: {
      type: Array,
      observer(value) {
        this.setBtnStyle(value)
        this.setActived(value)
      }
    },
  },

  methods: {
    setBtnStyle(buttons) {
      let style = ''
      const length = buttons.length
      const gaps = length - 1
      style += `flex-basis: ${((100 - gaps - 1) / length).toFixed(2)}%;`
      this.setData({ buttonStyle: style })
    },
    setActived(buttons) {
      const activedIndex = buttons.findIndex(item => item.isdefault)
      this.setData({ activedIndex })
    },
    onClick(e) {
      const { activedIndex, parent } = this.data
      const { index, button } = e.currentTarget.dataset
      if (activedIndex === index) return
      this.setData({ activedIndex: index })
      this.triggerEvent('onclick', { ...button, parent })
    }
  }
})
