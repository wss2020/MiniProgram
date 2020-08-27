// pages/about/balance/refill/refill.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        amount: '',
        processing: false,
        cusid: null,
        // showcolor:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            cusid: options.cusid,
        })
    },

    // input: function (e) {
    //     if(e.detail.cursor > 0){
    //         this.setData({showcolor:true});
    //     }else{
    //         this.setData({showcolor:false});
    //     }
    // },

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

    formsubmit: function (e) {
        var amount = e.detail.value.amount;
        this.setData({
            processing: true,
            amount: e.detail.value.amount
        });
        var that = this;
        var paymentid = null;
        var checkstatus = function (status) {
            if (status == 1) {
                return status;
            }
            return app.func.toastPromise('支付成功')
                .then(() => {
                    return app.func.getPromise('/wechatpay/status/' + paymentid)
                        .then(([code, res]) => {
                            return res.data.status;
                        }, app.func.reject);
                });
        };
        app.func.postPromise('/v2/customer/refill/' + this.data.cusid, {amount: amount})
            .then(([code, res]) => {
                if (code == 200) {
                    var param = res.data;
                    paymentid = res.data.paymentid;

                    return app.func.promise((resolve, reject) => {
                        wx.requestPayment({
                            timeStamp: param.timeStamp,
                            nonceStr: param.nonceStr,
                            package: param.package,
                            signType: param.signType,
                            paySign: param.paySign,
                            success(res) {
                                resolve(0);
                            },
                            fail(res) {
                                return app.func.postPromise("/v2/pay/unpay/" + paymentid, {})
                                    .then(reject);
                            }
                        });
                    });
                } else {
                    return app.func.reject();
                }
            }).then(checkstatus).then(checkstatus).then(checkstatus)
            .then((status) => {
                if (status == 1) {
                    return app.func.toastPromise('充值成功');
                }
            }).finally(() => {
            this.setData({processing: false});
        });
    }
})
