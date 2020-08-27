// pages/about/orderlist/orderlist.js
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
        app.func.getPromise('/order/list')
            .then(([code, res]) => {
                this.setData({proList: res.data})
            })
    },

    viewdetail: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/about/orderlist/orderdetail/orderdetail?id=' + id
        })
    },

    logistics: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/about/orderlist/logistics/logistics?id=' + id
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },


})
