// pages/tool/tool.js
const app = getApp();
Page({

    mixins: [require('../../mixins/common.js')],

    /**
     * 页面的初始数据
     */
    data: {
        tool: ['做方案', '做卡券', '做商城', 'API对接'],
        recommendlist: [],
        status: ''   // 0不能分享   1可分享
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.func.getPromise('/plan/log')
            .then(([code, res]) => {
                this.setData({recommendlist: res.data});
            })
    },

    recommending: function (e) {
        var index = e.currentTarget.dataset.index;
        if (index == 0) {
            this.checkLogin(index);
        }else if(index == 1){
            this.checkLogin(index);
        }else if(index == 2){
            var src = 'https://www.dianlinet.com/dianlinet/shop.html';
            wx.navigateTo({
                url: '/pages/auth/agreement/agreement?src=' + src
            })
        }else if(index == 3){
            var src = 'https://www.dianlinet.com/dianlinet/api.html';
            wx.navigateTo({
                url: '/pages/auth/agreement/agreement?src=' + src
            })
        }
    },


    checkLogin: function (index) {
        app.func.getuserinfo(() => {
            this.myinfo(index);
        }, () => {
            this.login();
        })
    },
    myinfo:function(index){
        app.func.getPromise('/my/info')
            .then(([code, res]) => {
                if (code == 200) {
                    var customers = res.data.customers;
                    if (customers.length == 0) {
                        this.login();
                    } else {
                        this.goon(index);
                    }
                }
            })
    },
    goon: function (index) {
        if (index == 0) {
            wx.navigateTo({
                url: '/pages/tool/recommending/recommending?log_id=0'
            })
        } else if (index == 1) {
            wx.navigateTo({
                url:'/pages/tool/card/make/make'
            })
        }
    },
    login: function () {
        wx.switchTab({
            url: '/pages/about/about'
        })
    },


    delete_logid: function (e) {
        var log_id = e.currentTarget.dataset.log_id;
        var that = this;
        wx.showModal({
            title: '提示',
            content: '记录一旦删除，不可恢复',
            success: function (res) {
                if (res.confirm) {
                    app.func.getPromise('/plan/dellog/' + log_id)
                        .then(([code,res])=>{
                             if(code == 200){
                                 that.onShow();
                             }
                        })
                } else {
                    console.log('用户点击取消')
                }
            }
        })

    },

    view_recom: function (e) {
        var log_id = e.currentTarget.dataset.log_id;
        wx.navigateTo({
            url: '/pages/tool/recommending/recommending?log_id=' + log_id
        })
    },


    unshare:function () {
        app.func.toastPromise('方案没有制作完成')
    },
    //复制
    copy: function (e) {
        var link = e.currentTarget.dataset.link;
        var title = e.currentTarget.dataset.title;
        var content = title + ':' + link
        wx.setClipboardData({
            data: content,
            success:function (res) {
                wx.showModal({
                    title: '提示',
                    content: '方案链接（'+ link +'）已复制,快去分享吧',
                    showCancel: false,
                    success: function (res) {

                    }
                })
            }
        })
    },

})
