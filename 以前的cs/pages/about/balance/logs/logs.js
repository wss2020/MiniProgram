const app = getApp();
// pages/about/balance/logs/logs.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logs: [],
        end: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.func.onPageLoad(this, options);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        app.func.loading("加载中")
            .then(() => {
                return app.func.getPromise("/user/mylog/0")
                    .then(([code, res]) => {
                        that.setData({
                            logs: res.data,
                            end: res.data.length == 0
                        })
                    })
            }).finally(wx.hideLoading);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log("onPullDownRefresh")
        var that = this;
        app.func.loading("加载中")
            .then(() => {
                return app.func.getPromise("/user/mylog/0")
                    .then(([code, res]) => {
                        that.setData({
                            logs: res.data,
                            end: res.data.length == 0
                        })
                    })
            }).finally(() => {
            wx.stopPullDownRefresh();
            wx.hideLoading();
        });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.end) {
            var logs = this.data.logs;
            var length = logs.length;
            app.func.getapi("/user/mylog/" + length,
                (code, res, that) => {
                    that.setData({
                        logs: logs.concat(res.data),
                        end: res.data.length == 0
                    });
                }, (res, that) => {

                }, this);
        }
    },

    detail: function (e) {
        var orderid = e.currentTarget.dataset.orderid;
        if (orderid != null) {
            // console.log(e)
            wx.navigateTo({
                url: '/pages/gifts/pages/send-order-detail/send-order-detail?orderid=' + e.currentTarget.dataset.orderid + '&givingid=' + e.currentTarget.dataset.givingid,
                success: function (res) {
                },
                fail: function (res) {
                },
                complete: function (res) {
                },
            })
        }
    }
})