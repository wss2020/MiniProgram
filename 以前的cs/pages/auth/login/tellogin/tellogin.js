// pages/auth/login/tellogin/tellogin.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showchoose: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    onShow: function (options) {
        wx.login({
            success: res => {
                this.setData({code: res.code,});
            },
        });
    },

    getPhoneNumber: function (e) {
        console.log(e);
        if (e.detail.errMsg == "getPhoneNumber:ok") {
            app.func.postPromise('/v2/login/phone', {
                "code": this.data.code,
                "iv": e.detail.iv,
                "encryptedData": e.detail.encryptedData,
            }).then(([code, res]) => {
                if (code == 200) {
                    app.func.getPromise('/my/info')
                        .then(([code, res]) => {
                            console.log(res.data.customers.length);
                            if (res.data.customers.length != 0) {
                                wx.switchTab({
                                    url: '/pages/about/about'
                                })
                            } else {
                                this.setData({showchoose: true});
                            }
                        })
                }
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '只有允许授权才能继续使用手机号登录,请再次点击登录按钮哦～',
                showCancel: false,
                success: function (res) {
                }
            })
        }

    },


    //绑定账户
    bindlogin: function () {
        wx.redirectTo({
            url: '/pages/auth/login/login'
        })
    },

    //注册账户
    register: function () {
        wx.redirectTo({
            url: '/pages/auth/register/register'
        })
    }
})
