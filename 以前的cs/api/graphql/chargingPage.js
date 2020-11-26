 const query = `query ChargingPage($locale: SiteLocale) {
  doCharging(locale: $locale) {
    title
    calculatorCaption
    subtitle
    sliderTitle
    publicChargingParagraph
    timeCaption
    description
    disclaimer
    readMore
    primaryCtaText
    primaryCtaLink
    secondaryCtaText
    secondaryCtaLink
    desktopImage {
      url
      alt
    }
    tabs {
      tabTitle
      items {
        title
        powerValue
        chargeTimeMinutes
        image {
          url
          alt
        }
      }
    }
    maximumRange
  }
}
`

export default query