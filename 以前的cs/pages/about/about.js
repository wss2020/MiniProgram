//获取应用实例
const app = getApp();

app.func.page(
    {
        data: {
            userInfo: {},
            hasUserInfo: false,
            canIUse: wx.canIUse('button.open-type.getUserInfo'),
            limoney: false,
            dot: false,  //提示优惠券过期的点
            authoried: true,
            invitenew: true,
            login: true
        },




        // 点击页面账户余额，查看两个页面之间通信。
        balance: function () {
            this.navigateModal("/pages/about/balance/balance", {
                amount: 13
            }).then((res) => {
                return app.func.toastPromise("return:" + res);
            }).catch((res) => {
                console.log(res);
            })
        },































        onLoad: function (options) {
            app.func.onPageLoad(this, options);
        },

        onShow: function () {
            //判断是否授权
            app.func.getuserinfo((userInfo) => {
                this.setData({userinfomation: userInfo, authoried: true});
            }, () => {
                console.log('未授权');
                this.setData({authoried: false});
            });

            app.func.getPromise('/my/info')
                .then(([code, res]) => {
                    if (code == 200) {
                        var customers = res.data.customers;
                        this.setData({myinfo: res.data});
                        if (customers.length == 0) {
                            this.setData({login: false});
                        } else {
                            this.setData({login: true, name: customers[0].name});
                        }
                    }
                })
        },

        getPhoneNumber: function (e) {
            console.log(e);
        },

        information: function () {
            wx.navigateTo({
                url: '/pages/about/information/information',
            })
        },



        //登录
        onauth: function () {
            wx.navigateTo({
                url: '/pages/auth/auth'
            })
        },

        // 跳转到个人中心
        oninformation: function () {
            wx.navigateTo({
                url: '/pages/about/information/information',
            })
        },
        // 跳转到我的消息
        mynews: function () {
            wx.navigateTo({
                url: '/pages/about/service/index',
            })
        },

        myorder: function () {
            wx.navigateTo({
                url: '/pages/about/orderlist/orderlist'
            })
        },

        attestation: function () {
            app.func.getPromise('/user/authinfo')
                .then(([code, res]) => {
                    if (res.data.status == 1 || res.data.status == 4) {
                        wx.navigateTo({
                            url: '/pages/auth/attestation/attestation'
                        })
                    } else {
                        wx.navigateTo({
                            url: '/pages/auth/preattestation/preattestation'
                        })
                    }
                })
        },


        /**
         * 用户点击右上角分享
         */
        // onShareAppMessage: function () {
        //     return {
        //         "title": "一点送礼，见证你我，留下印记",
        //         "imageUrl": "/image/guide.png",
        //         "path": "pages/index/index"
        //         // "path": "pages/index/index?channel=" + channel
        //     }
        // },


    })
