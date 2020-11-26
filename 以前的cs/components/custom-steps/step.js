Component({
  relations: {
    './steps': {
      type: 'parent',
      linked: function (target) {
        target.updateStep()
      }
    }
  },
  properties: {
    label: String
  },
  data: {
    hide: false
  }
})
