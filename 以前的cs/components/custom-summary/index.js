Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    config: {
      type: Object,
      observer(value) {
        this.setSummary(value)
      }
    }
  },
  methods: {
    setSummary(config) {
      let checkedFeatures = []
      const { configuration: { prices: { startingPrice } }, configuration: { features } } = config
      const promoGroups = config.promoDetail.items
      // 找出状态是Selected或Included或PackageIncluded的feature
      for (let i = 0; i < features.length; i++) {
        const featuresArray = features[i].data.featureGroups[0].features
        for (let j = 0; j < featuresArray.length; j++) {
          const feature = featuresArray[j];
          if (feature.selectedState === 'Selected' || feature.selectedState === 'Included' || feature.selectedState === 'PackageIncluded') {
            checkedFeatures.push(feature)
          }
        }
      }
      this.setData({
        startingPrice,
        checkedFeatures,
        promoGroups
      })
    },
    onClose(){
      this.triggerEvent('onclose')
    },
    noMove() { }
  }
})
