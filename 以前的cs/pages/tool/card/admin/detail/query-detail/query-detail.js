// pages/tool/card/admin/detail/query-detail/query-detail.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: {1:'未开卡', 2:'已开通', 3:'已置换', 4:'作废'},
        order_status:{1:'未确认', 2:'已确认', 3:'已完成',}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var data = JSON.parse(options.data);
        this.setData({
            data: data
        }, this.info(data.cardNo));
    },

    info: function (no) {
        app.func.getPromise('/card/exchangeinfo/' + no)
            .then(([code, res]) => {
                if (code == 200) {
                    this.setData({
                        exchangeinfo: res.data
                    });
                }
            })
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
