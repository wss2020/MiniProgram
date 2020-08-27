// pages/gifts/pages/order/order.js
const app = getApp();

var page = {

    /**
     * 页面的初始数据
     */
    data: {
        agreement: 1,
        message: "",
        name: "",
        postalCode: "",
        telNumber: "",
        area: "",
        address: "",
        region: ['请选择', '请选择', '请选择'],
        customItem: '请选择',
        showpage: false,
        showrange: true,
        modifyaddress: 0,
        showcurrency: false,
        norange: false,
        addressdetail: false,
        showchoose: false,
        count: 1,
        provinceName: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.chooseAddress({
            success: function (res) {
                var region = [res.provinceName, res.cityName, res.countyName];
                that.setData({
                    region: region,
                    name: res.userName,
                    postalCode: res.postalCode,
                    telNumber: res.telNumber,
                    address: res.detailInfo,
                    showpage: true,
                    id: options.id,
                    provinceName: res.provinceName
                }, () => that.precreate(1));
            }, fail: function () {
                that.setData({showpage: true});
            }, complete: function () {
            }
        })

        this.shopinfo(options.id);
    },


    //更新选择的地址
    bindRegionChange: function (e) {
        this.setData({
            region: e.detail.value,
            provinceName: e.detail.value[0]
        }, this.getcount);
    },
    getcount: function () {
        var count = this.data.count;
        this.precreate(count);
    },

    //添加数量
    addCount: function (e) {
        var count = this.data.count + 1;
        if (count > 10) {
            app.func.toastPromise('最多10件');
        } else {
            this.precreate(count);
        }
    },
    //减数量
    minusCount: function (e) {
        var count = this.data.count;
        if (count <= 1) {
            return false;
        }
        count = count - 1 * 1;
        this.precreate(count);
    },

    //订单预计算
    precreate: function (count) {
        var id = this.data.id;
        var provinceName = this.data.provinceName;

        console.log(provinceName);

        if (!provinceName) {
            app.func.toastPromise('请先填写地址');
            return;
        }
        app.func.postPromise('/order/precreate', {
            sku_id: id,
            num: count,
            province: provinceName,
        }).then(([code, res]) => {
            if (code == 200) {
                this.setData({count: count});
            } else if (code == 3003) {
                app.func.toastPromise('该商品暂不支持该地区配送')
            } else if (code == 6002) {
                app.func.toastPromise('请先结清月结账款')
            } else if (code == 1102) {
                app.func.toastPromise('商品已下架')
            } else {
                app.func.toastPromise(res.message);
            }
            this.setData({precreate: res.data});
        })
    },

    shopinfo: function (id) {
        app.func.getPromise('/product/detail/' + id)
            .then(([code, res]) => {
                this.setData({productinfo: res.data, id: id});
            })
    },

    makeorder: function (orderdata) {
        return app.func.postPromise('/order/create',
            orderdata).then(([code, res]) => {
            if (code === 6001) {
                console.log(res.data);
                return this.refill(res.data.price, res.data.cusid, orderdata);
            }
            if (code == 3003) {
                app.func.toastPromise('该商品暂不支持该地区配送')
            }
            if (code == 6002) {
                app.func.toastPromise('请先结清月结账款')
            }
            if (code == 1102) {
                app.func.toastPromise('商品已下架')
            }
            if (code == 3002) {
                this.setData({showchoose: true});
            }
            if (code === 200) {
                wx.redirectTo({
                    url: '/pages/about/orderlist/orderlist'
                })
                // app.func.toastPromise("下单成功");
            }
        });
    },

    refill: function (amount, cusid, orderdata) {
        var paymentid = null;
        var checkstatus = function (status) {
            if (status === 1) {
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
        return app.func.postPromise('/v2/customer/refill/' + cusid, {amount: amount})
            .then(([code, res]) => {
                if (code === 200) {
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
            })
            .then(checkstatus).then(checkstatus).then(checkstatus)
            .then((status) => {
                if (status === 1) {
                    return this.makeorder(orderdata);
                } else {
                    return app.func.toastPromise('充值失败')
                        .then(app.func.reject);
                }
            });
    },

    formsubmit: function (e) {

        console.log(666);


        var that = this;
        var showinfo = this.data.showinfo;
        var count = this.data.count;
        var name = e.detail.value.name;
        var telNumber = e.detail.value.telNumber;
        var region = this.data.region;
        var address = e.detail.value.address;
        var content = e.detail.value.content;
        var provinceName = that.data.region[0]; //国标收货地址第一级地址
        var cityName = that.data.region[1];     //国标收货地址第二级地址
        var countyName = that.data.region[2];   //国标收货地址第三级地址
        if (name == "" || telNumber == "" || region == "" || address == "" || provinceName == "请选择" || cityName == "请选择" || countyName == "请选择") {
            wx.showToast({
                title: '请完善信息后重试',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: true,
                success: function (res) {
                },
                fail: function (res) {
                },
                complete: function (res) {
                },
            })
        } else if (name.length < 2) {
            wx.showToast({
                title: '姓名不得小于两个字',
                icon: 'none',
                image: '',
                duration: 1000,
                mask: true,
                success: function (res) {
                },
                fail: function (res) {
                },
                complete: function (res) {
                },
            })
        } else {
            let orderdata = {
                sku_id: this.data.id,
                name: name,
                tel: telNumber,
                province: provinceName,
                city: cityName,
                county: countyName,
                address: address,
                content: content,
                num: count
            };
            this.makeorder(orderdata);
        }
    },


    addressdetail: function () {
        wx.showToast({
            title: '亲，详细地址填写有误，请重新填写。',
            icon: 'none',
            image: '',
            duration: 2000,
            mask: true,
        })
    },


    checkboxChange: function (e) {
        console.log(e.detail.value.length);
        var agreement = e.detail.value.length > 0 ? '1' : '2';
        this.setData({
            agreement: agreement
        });
    },


    viewAgreement: function () {
        var src = 'https://www.dianlinet.com/index.php/customer/login/agreement.html'
        wx.navigateTo({
            url: '/pages/auth/agreement/agreement?src=' + src
        })
    },

    productdetail: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/index/productdetail/productdetail?id=' + id
        })
    },
    jumpindex: function () {
        wx.switchTab({
            url: '/pages/index/index'
        })
    },

    //认证企业信息
    attestation: function () {
        wx.navigateTo({
            url: '/pages/auth/attestation/attestation'
        })
    }


};
Page(page);
