Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    baseUrl: String,
    showConflict: {
      type: Boolean,
      value: true
    },
    features: {
      type: Object,
      value: {},
      observer(value) {
        if (JSON.stringify(value) === '{}') return
        let { featureGroups } = value
        featureGroups = featureGroups || []
        const selectedFeatures = this.getSelectedFeatures(featureGroups)
        const activedIndex = this.getActivedIndex(featureGroups)
        this.setData({
          activedIndex,
          selectedFeatures,
          featureGroups: featureGroups[0].features || []
        })

      }
    }
  },
  data: {
    featureGroups: [],
    selectedFeatures: {}
  },
  methods: {
    handleClickFeature(e) {
      const { featureGroups, activedIndex } = this.data
      const { index, code } = e.currentTarget.dataset
      const selected = featureGroups.find(item => item.code === code)
      let added = null
      if (selected.conflict) {
        added = selected.conflict.added
      }
      const hasAdded = added && added.length > 0
      if (index !== activedIndex) {
        if ( this.data.showConflict && ((selected.selectedState === 'Excluded') || hasAdded) ) {
          this.triggerEvent('onextention', selected)
          return
        }
        this.triggerEvent('onchangefeature', selected)
      }
    },
    getSelectedFeatures(featureGroups) {
      return featureGroups[0].features.find(item => (item.selectedState === 'Selected') || (item.selectedState === 'Included') || (item.selectedState === 'PackageIncluded'))
    },
    getActivedIndex(featureGroups) {
      return featureGroups[0].features.findIndex(item => (item.selectedState === 'Selected') || (item.selectedState === 'Included') || (item.selectedState === 'PackageIncluded'))
    }
  }
})
