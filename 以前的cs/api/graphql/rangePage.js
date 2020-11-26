const query = `query RangePage($locale: SiteLocale) {
  allDoRangeControls(locale: $locale) {
    title
    placement
    control {
      title
      isdefault
      effect
      category
    }
  }
  doRange(locale: $locale) {
    title
    subtitle
    disclaimer
    maxRangeInKm
  }
}
`

export default query;
