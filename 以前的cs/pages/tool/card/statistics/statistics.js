// pages/tool/card/make/make.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        category:''
    },

    onLoad:function(){
       this.category();
       // this.product();
    },

    category: function () {
        app.func.getPromise('/category/statistics')
            .then(([code, res]) => {
                 this.setData({ category:res.data });
            })
    },

    product: function () {
        app.func.getPromise("/product/statistics")
            .then(([code, res]) => {

            })
    },





    mack_card: function () {
        wx.redirectTo({
            url: '/pages/tool/card/make/make'
        })
    },
    admin_card: function () {
        wx.redirectTo({
            url: '/pages/tool/card/admin/admin'
        })
    },
    statistics_card: function () {
        wx.redirectTo({
            url: '/pages/tool/card/statistics/statistics'
        })
    },

})
