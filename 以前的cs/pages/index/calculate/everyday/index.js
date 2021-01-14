import { everyDayPageDetail, pricesDetail, getOpenChargeMap } from '../../../../api/service'
import { back } from '../../../../utils/router'
import { qqmapKey } from '../../../../api/data'

let timer;
let sliderTimer;

Page({
  data: {
    qqmapKey,
    showSearch: false,
    showSearchInput: false,
    showSearchLoading: false,
    searchText: '',
    enableZoom: false,
    latitude: 39.903740,
    longitude: 116.397827,
    tabs: [{ tabTitle: '月' }, { tabTitle: '年' }],
    switchValue: false,
    vehiclesName: 'emission',
    active: 1,
    doCalculate: {},
    price: {},
    range: 0,
    frequency: 3,
    vehicles: {
      energy: {},
      emission: {}
    },
    showTips: false,
    currentStep: 0,
    markerIconWidth: 22,
    markerIconHeight: 30,
    markerIcon: '../../../assets/images/location_icon.png',
  },
  onLoad: function (options) {

    Promise.all([this.getEveryDayDetail(), this.getPricesDetail()]).then(res => {
      this.calculate()
    })
  },
  handleChangeAddress(e) {
    this.setData({ searchText: e.detail.title, location: e.detail.location })
  },
  handleSearchFocus() {
    this.setData({ showSearch: true })
  },
  handleCloseSearch() {
    this.setData({ showSearch: false })
  },
  handleClearSearch() {
    this.setData({ searchText: '' })
  },
  onSearchInputFocus() {
    this.setData({ showSearchInput: false })
  },
  handleSearch() {
    this.setData({ showSearchInput: true, showSearchLoading: true })
    const { lat, lng } = this.data.location
    getOpenChargeMap(lng, lat).then(res => {
      const markers = this.setMapData(res)
      this.setData({
        markers,
        longitude: lng,
        latitude: lat,
        showSearchLoading: false
      })
    })
  },
  // 设置地图数据
  setMapData(openChargeData) {
    const { markerIcon, markerIconWidth, markerIconHeight } = this.data
    let markers = []
    openChargeData.forEach(item => {
      const { ID: id, Latitude: latitude, Longitude: longitude } = item.AddressInfo
      markers.push({
        id,
        latitude,
        longitude,
        width: markerIconWidth,
        height: markerIconHeight,
        iconPath: markerIcon
      })
    })
    return markers
  },
  toConfigurator() {
    wx.navigateTo({
      url: '/pages/configuratorlanding/index'
    })
  },
  getEveryDayDetail() {
    return everyDayPageDetail().then(res => {
      const { doCalculate } = res.data
      this.setData({
        doCalculate,
        range: doCalculate.defaultRange
      })
      return res
    })
  },
  getPricesDetail() {
    return pricesDetail().then(res => {
      const { getElectricityById, getFuelById } = res.data
      const price = {
        polestar: getElectricityById.average,
        petrol: getFuelById.gasoline.price,
        diesel: getFuelById.diesel.price
      }
      this.setData({ price })
      return res
    })
  },

  change: function (e) {
    this.setSliderValue(e.detail)
    this.calculate()
  },
  onDrag(e) {
    let that = this;
    this.setSliderValue(e.detail.value);
    that.calculate();
  },
  setSliderValue(value) {
    this.setData({
      range: value
    });
  },
  calculate() {
    let that = this;
    clearTimeout(sliderTimer);
    sliderTimer = setTimeout(function () {
      that.setData({ frequency: that.calculateWeekly() })
      that.calculateVehicles(1);
    }, 30);
  },
  calculateWeekly() {
    const kilometers = this.data.range
    const maxRange = this.data.doCalculate.maximumRange
    const maxRangeWeek = maxRange / 4;
    return Math.ceil(kilometers / (kilometers <= maxRange - maxRangeWeek ? maxRangeWeek : maxRange))
  },
  calculateVehicles() {
    let months = this.data.month;
    let switchValue = this.data.switchValue;
    if (!this.data.doCalculate.vehicles) return;
    this.data.doCalculate.vehicles.forEach(item => {
      const key = item.vehicleType.toLowerCase()
      const weeks = 52.1775;
      const energy = (item.energyConsumption * this.data.range * weeks) / months
      const costs = Math.round(energy * this.data.price[key])

      let emission = Math.round(Math.round(item.energyConsumption * item.co2Emission * this.data.range) * 52 / months)

      if (switchValue && key === 'polestar') {
        emission = Math.round((emission / this.data.doCalculate.vehicles[0].co2Emission) * this.data.doCalculate.tabs[3].greenCo2Emissions);
      }

      let vehicles = this.data.vehicles
      vehicles.energy[key] = costs
      vehicles.emission[key] = emission
      this.setData({ vehicles: vehicles });
    })

    this.onChange(this.data.currentStep);

  },

  handleChange(e) {
    this.setData({
      currentStep: e.detail,
      active: 1,
      month: 1,
      switchValue: false
    });
    this.calculateVehicles();
    if (e.detail === 1) {
      // 充电站
      this.getUserLocation()
    }
  },
  // 获取用户位置
  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({ latitude, longitude })
      }
    })
  },
  switchChange(e) {
    this.setData({ switchValue: e.detail })
    this.calculateVehicles();
  },
  onChange(value) {
    this.selectComponent('#tabs1').setLine(true);
    this.selectComponent('#tabs2').setLine(true);

    if (value == 0 || value == 1) return;

    this.selectComponent(`#timepiece${value - 1}`).reset();
    if (value == 2) {
      this.setData({
        vehiclesName: 'emission'
      });
    }
    if (value == 3) {
      this.setData({
        vehiclesName: 'energy'
      });
    }

    this.StartVehiclesTime(value - 1);
  },
  StartVehiclesTime(value) {
    let that = this;
    let result = 0;
    let vehicles = this.data.vehicles;
    if (value == 1) result = vehicles.energy.petrol - vehicles.energy.polestar;
    else result = vehicles.emission.petrol - vehicles.emission.polestar;
    clearTimeout(timer);
    timer = setTimeout(function () {
      that.selectComponent(`#timepiece${value}`).start(result);
    }, 30);
  },
  onChangePre(e) {
    this.setData({
      active: e.detail.index,
      month: e.detail.index == 0 ? 12 : 1
    });
    this.calculateVehicles();
  },

  showtips() {
    this.setData({ showTips: true });
  },
  onsure() {
    this.setData({ showTips: false });
  },
  onBack() {
    back('/pages/ps2/index')
  }


})
