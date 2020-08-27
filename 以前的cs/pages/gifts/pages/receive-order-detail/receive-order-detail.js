// pages/gifts/pages/receive-order-detail/receive-order-detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
       status:['未确认','已确认','已完成']  // 1未确认  2已确认  3已完成
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      app.func.getPromise('/order/order/' + options.dlorderid)
          .then(([code, res]) => {
              if (code === 200) {
                  this.setData({
                      order: res.data,
                      img: app.globalData.imgUrl + res.data.pic
                  });
              }
          });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },



  //卡券商品详情
  exchangedetail: function (e) {
    wx.navigateTo({
      url: '/pages/gifts/pages/receive-order-detail/shopdetail/shopdetail?id=' + e.currentTarget.dataset.id,
    })
  },



})