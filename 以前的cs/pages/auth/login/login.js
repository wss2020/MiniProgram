// pages/auth/login/login.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    formsubmit: function (e) {
        var name = e.detail.value.name;
        var password = e.detail.value.password;
        var formId = e.detail.formId;
        if (name.length == 0) {
            wx.showToast({
                title: '请输入账号',
                icon: 'none',
                duration: 1500,
                mask: true,
            })
            return;
        } else if (password.length == 0) {
            wx.showToast({
                title: '密码不能为空',
                icon: 'none',
                duration: 1500,
                mask: true,
            })
            return;
        } else {
            wx.showLoading({title: '登录中'});
            var that = this;
            var promise = app.func.resolve();
            promise.then(function () {
                return app.func.postPromise('/login?form_id=' + formId,
                    {
                        user_name: name,
                        password: password
                    })
                    .then(([code, res]) => {
                        wx.hideLoading();
                        if (code == 200) {
                            wx.showToast({
                                title: '登录成功',
                                icon: 'success',
                                duration: 1000,
                                mask: true,
                                success(res) {
                                    setTimeout(function () {
                                        wx.switchTab({
                                          url: '/pages/about/about'
                                        })
                                    }, 1500)
                                }
                            })
                        } else {
                            wx.showToast({
                                title: res.message,
                                icon: 'none',
                                duration: 2000,
                                mask: true,
                                success(res) {
                                }
                            })
                        }
                    })
            });
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },


})
