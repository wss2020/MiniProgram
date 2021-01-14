Component({
  relations: {
    './step': {
      type: 'child'
    }
  },
  properties: {
    active: {
      type: null,
      observer(val) {
        this.setData({
          currentValue: val
        })
      }
    }
  },
  data: {
    stepList: []
  },
  methods: {
    updateStep() {
      const stepList = []
      const { currentValue } = this.data
      this._getAllSteps().forEach((tab, index) => {
        stepList.push({ label: tab.data.label, name: tab.data.name || index })
        this.setData({ stepList })
        if (!tab.data.name) tab.data.name = index
        // 未传入active时
        if (index === 0) {
          if (!currentValue) {
            this.setData({ currentValue: tab.name || index })
          }
        }
      })

      this._updateStatus()
    },
    toPrev() {
      const { currentValue } = this.data
      if (currentValue === 0) return
      this.setData({ currentValue: currentValue - 1 })
      this._updateStatus()
    },
    toNext() {
      const { currentValue, stepList } = this.data
      if (currentValue === stepList.length - 1) return
      this.setData({ currentValue: currentValue + 1 })
      this._updateStatus()
    },
    _getAllSteps() {
      return this.getRelationNodes('./step')
    },
    _updateStatus() {
      const { currentValue } = this.data
      this._getAllSteps().forEach((tab) => {
        tab.setData({ hide: tab.data.name !== currentValue })
      })
      this.triggerEvent('onchange', currentValue)
    }
  }
})
