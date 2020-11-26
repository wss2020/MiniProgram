const query = `query CalculatePage($locale: SiteLocale) {
  doCalculate(locale: $locale) {
    isLive
    title
    intro
    driveDistanceDescription
    tabs {
      __typename
      ... on DoFuelSavingsTabRecord {
        tabName
        title
        description
        readMoreLink
        readMoreContent
        chartDescription
        polestarChartLabel
        pricesError
        closeError
        regionToggle
        changeRegion
        regionDropdownLabel
        regionDropdownHint
        regionDropdownNoOption
        regionDialogConfirm
      }
      ... on DoBenefitsTabRecord {
        tabName
        content
        designButton
        designButtonHref
      }
      ... on DoChargingTabRecord {
        title
        tabName
        autocompleteFieldLabel
        autocompleteFieldHint
        notFoundMessage
        loading
        selectAddressButton
        serverErrorMessage
        closeButton
        readMoreLink
        readMoreLinkHref
        chargingLink
        chargingLinkHref
      }
      ... on DoEmissionsSavingsTabRecord {
        tabName
        title
        description
        greenElectricityToggle
        greenCo2Emissions
        readMoreLink
        readMoreContent
        polestarEmissionText
        fossilFueledCarText
        polestarChartLabel
      }
      ... on DoWeeklyTabRecord {
        tabName
        title
        chargingLabel
        chargingDescription
        disclaimer
        disclaimerReadMore
      }
    }
    vehicles {
      vehicleType
      co2Emission
      energyConsumption
    }
    maximumRange
    defaultRange
    useMiles
  }
  allDoTexts(locale: $locale, first: 100) {
    id
    text(locale: $locale)
  }
  sharedCurrency(locale: $locale) {
    currency {
      symbol
      comesBefore
    }
  }
}
`

export default query