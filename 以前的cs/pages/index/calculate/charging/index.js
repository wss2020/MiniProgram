const app = getApp();
import {InitData} from './data';
let timer;
Page({
    data: {
        KMValue: 0,
        maximumRange: 0,
        currentValue: 100,
        tabs: [],
        currentTab: 0,
        currentTabIndex: 1,
    },
    onLoad() {
        let res = InitData;
        this.setData({
            tabs: res.data.doCharging.tabs,
            maximumRange: res.data.doCharging.maximumRange,
            KMValue: res.data.doCharging.maximumRange,
        });
        this.calculateMinutes();
    },

    startTimepiece(value) {
        this.selectComponent('#timepiece').start(value);
    },

    calculateMaximumRange(currentTab, currentTabIndex, currentValue) {
        if (currentTab == 1 && currentTabIndex != 0 && currentValue >= 80) return 80;
        if (currentTab == 1 && currentTabIndex == 0 && currentValue >= 80) return 100;
        if (currentTab == 0 && currentValue >= 80) return 100;
        else return currentValue;
    },
    onChange(e) {
        let value = e.detail.name;
        let currentTabIndex = value == 0 ? value : 2;
        let currentValue = this.data.currentValue;
        let result = this.calculateMaximumRange(value, currentTabIndex, currentValue);
        let KMValue = this.getMinutes(result);
        this.setData({
            currentTab: value,
            currentTabIndex: currentTabIndex,
            currentValue: result,
            KMValue: KMValue
        });
        this.calculateMinutes();
    },
    onChangeTabValue(e) {
        let index = e.currentTarget.dataset.index;
        let currentTab = this.data.currentTab;
        let currentValue = this.data.currentValue;
        let result = this.calculateMaximumRange(currentTab, index, currentValue);
        let KMValue = this.getMinutes(result);
        this.setData({
            currentTabIndex: index,
            currentValue: result,
            KMValue: KMValue
        });
        this.calculateMinutes();
    },
    change: function (e) {
        let that = this;
        this.setSliderValue(e.detail)
        clearTimeout(timer);
        timer = setTimeout(function () {
            that.calculateMinutes();
        }, 200);
    },
    onDrag(e) {
        this.setSliderValue(e.detail.value);
    },
    setSliderValue(value) {
        value = this.calculateMax(value);
        let result = this.getMinutes(value);
        this.setData({
            currentValue: value,
            KMValue: result
        });
    },
    getMinutes(value) {
        return Math.round((this.data.maximumRange / 100) * value);
    },
    calculateMax(value) {
        let currentTab = this.data.currentTab;
        let currentTabIndex = this.data.currentTabIndex;
        if (value > 80 && currentTab == 1 && currentTabIndex != 0) {
            return 80;
        } else {
            return value;
        }
    },

    calculateMinutes() {
        let chargeTimeMinutes = this.data.tabs[this.data.currentTab].items[this.data.currentTabIndex].chargeTimeMinutes;
        let value = this.data.currentValue;
        this.startTimepiece(Math.round(chargeTimeMinutes * (value / 100)));
    },

    onBack() {
        back('/pages/ps2/index')
    }


})
