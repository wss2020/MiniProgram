// pages/about/information/information.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '请选择时间',
        starttime:'',
        serviceTime:[

        ]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.func.getPromise('/my/info')
            .then(([code, res]) => {
                if (code == 200) {
                    this.setData({myinfo: res.data});
                }
            })
    },
    share: function () {
        wx.navigateTo({
            url: '/pages/send-coupon/send-coupon'
        })
    },


    onShow: function () {
        var lastDay = this.getTimeByDay(30);
        var lastTime = this.formatTime(lastDay);

        this.setData({ starttime:lastTime })
    },


    getTimeByDay: function (num) {
        var today = new Date().getTime();
        return today + 60 * 60 * 1000 * 24 * num;
    },

    formatTime: function (time) {
         //return new Date(time).toISOString();   // => 2019-02-23T08:40:35.825Z
         return new Date(time).toISOString().split('T')[0];
    },

    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        });
    }

})
