// pages/index/productdetail/product-description/product-description.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.func.getPromise('/product/service/' + options.id)
        .then(([code, res]) => {
            this.setData({data: res.data,});
        });
  },




})
