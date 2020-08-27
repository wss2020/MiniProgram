// pages/index/pages/product/product.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUrl: ''
  },
  onLoad: function (options) {
    app.func.onPageLoad(this, options);
    this.setData({
      showUrl: app.globalData.imgUrl + '/Weixin/index/productview?id=' + options.id
    })
  },//网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。e.detail = { data }
  bindmessage: function (e) {
    //console.log(e.detail)
  },


  onShow:function(){}


})