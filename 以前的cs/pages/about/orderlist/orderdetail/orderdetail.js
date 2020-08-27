// pages/about/orderlist/orderdetail/orderdetail.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.func.getPromise('/order/detail/' + options.id)
            .then(([code, res]) => {
                if (code == 200) {
                    this.setData({detail: res.data,id:options.id});
                }
            })
    },

    logistics: function () {
        var id = this.data.id;
        wx.navigateTo({
            url: '/pages/about/orderlist/logistics/logistics?id=' + id
        })
    },

    productdetail: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url:'/pages/index/productdetail/productdetail?id=' + id
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },


})
