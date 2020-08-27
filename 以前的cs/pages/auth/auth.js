const app = getApp();
// pages/auth/auth.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        route: null,
        type: "page",
        param: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);

        // if (options.type == "tab") {
        //     this.setData({
        //         type: "tab",
        //         route: options.route
        //     })
        // } else {
        //     this.setData({
        //         type:"page",
        //         route: options.route,
        //         options:JSON.parse(options.options)
        //     })
        // }
    },


    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            app.func.ongetuserinfo(e.detail.userInfo, () => {
                // if (this.data.type == "tab") {
                //     wx.switchTab({url: '/' + this.data.route});
                // } else {
                //     var o = this.data.options;
                //     var array = [];
                //     for(var item in o) {
                //         array.push(item + "=" + o[item]);
                //     }
                //     wx.redirectTo({url: '/' + this.data.route +"?" + array.join('&')});
                // }

                wx.navigateTo({
                    url:'/pages/auth/login/login'
                })

            });
        } else {
            wx.showModal({
                title: '提示',
                content: '只有点击授权才能进行账号登录，请再次点击登录按钮哦～',
                showCancel: false,
                success: function (res) {}
            })
            return false;
        }
    },

    bindGetUserInfo1: function (e) {
        if (e.detail.userInfo) {
            app.func.ongetuserinfo(e.detail.userInfo, () => {
                wx.navigateTo({
                    url:'/pages/auth/login/tellogin/tellogin'
                })

            });
        } else {
            wx.showModal({
                title: '提示',
                content: '只有点击授权才能进行手机号登录，请再次点击登录按钮哦～',
                showCancel: false,
                success: function (res) {}
            })
            return false;
        }
    },

    noauth:function () {
        var route = this.data.route;
        if(route == 'pages/gifts/pages/exchange/exchange' || route == 'pages/about/integral/recharge/recharge' ){
            wx.switchTab({url: '/pages/index/index'});
        } else if (this.data.type == "tab") {
            wx.switchTab({url: '/' + this.data.route});
        } else {
            var o = this.data.options;
            var array = [];
            for(var item in o) {
                array.push(item + "=" + o[item]);
            }
            wx.redirectTo({url: '/' + this.data.route +"?" + array.join('&')});
        }
    },




})
