// pages/tool/card/make/making/design/design/design.js

import BBCode from "../../../../../../template/designer/bbcode";

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        current: 1,
        designerWidth: 0,
        designerHeight1: 0,
        designerHeight2: 0,
        showbox: true,
        toupload: {},
        addpro: '',
        data: [],
        areas1: [],
        areas2: [],
        wizarda: true,
        wizardb: true,
        wizardindexa: 0,
        wizardindexb: 0,
    },

    /**
     * 生命周期函数--监听页面加载 1.礼品券兑换有效期至[color=#cb231c]2020年6月30日[/color]\n2.劳防套装兑换有效期至[color=#cb231c]2019年7月31日[/color]\n3.大闸蟹兑换有效期至[color=#cb231c]2019年11月30日[/color]
     */
    onLoad: function (options) {
        if (options.cardid) {
            wx.setNavigationBarTitle({title: '修改信息'});
            this.setData({
                wizarda: false,
                wizardb: false,
            },this.getcardinfo(options));
        } else {
            app.func.getPromise('/card/exchangetel')
                .then(([code, res]) => {
                    return res.data;
                }).then((companyinfo) => {
                if (options.products == 1) {
                    this.ingleChoice(options, companyinfo);
                } else {
                    this.ultipleChoice(options, companyinfo);
                }
            })

        }
    },


    ingleChoice: function (options, companyinfo) {
        this.setData({
            atemplate: options.amode,
            btemplate: options.bmode,
            data: {
                "service_time": "( 工作时间9:00-16:00 国定节假日休息 )",
                "exchange": "1.刮开礼品券上方银色覆盖区域密码，需完成刮开\n2.本券由" + companyinfo.company + "发行",
                "exchange1": "1.如因产品断货换季，请耐心等待或改换其他商品\n2.部分商品若因厂家或不可抗力造成缺货，我们将以其他等价值商品予以调换\n3.因填写姓名、地址、联系方式等收货信息不准确而造成的损失，我司概不负责\n4.本券售出不退换、不记名、不挂失、不找零、不兑换现金\n5.购券时已开具发票，发货时不再提供",
                "tel": companyinfo.tel,
            }
        }, this.modeinfo(options.amode, options.bmode));
    },

    ultipleChoice: function (options, companyinfo) {
        this.setData({
            atemplate: options.amode,
            btemplate: options.bmode,
            data: {
                "service_time": "( 工作时间9:00-16:00 国定节假日休息 )",
                "exchange": "1.本券" + options.products + "款商品中任意选择一款您喜欢的礼品进行兑换\n2.刮开礼品券上方银色覆盖区域密码，需完成刮开\n3.本券由" + companyinfo.company + "发行",
                "exchange1": "1.如因产品断货换季，请耐心等待或改换其他商品\n2.部分商品若因厂家或不可抗力造成缺货，我们将以其他等价值商品予以调换\n3.因填写姓名、地址、联系方式等收货信息不准确而造成的损失，我司概不负责\n4.本券售出不退换、不记名、不挂失、不找零、不兑换现金\n5.购券时已开具发票，发货时不再提供",
                "tel": companyinfo.tel,
            }
        }, this.modeinfo(options.amode, options.bmode));
    },

    modeinfo: function (amode, bmode) {
        var that = this;
        wx.getSystemInfo({
            success(res) {
                var width = res.windowWidth - 20;
                that.setData({
                    designerWidth: width
                });
                app.func.getPromise('/v2/card/templateA/' + amode + '/' + width)
                    .then(([code, res]) => {
                        that.processTemplate(res.data, 1);
                    });
                app.func.getPromise('/v2/card/templateB/' + bmode + '/' + width)
                    .then(([code, res]) => {
                        that.processTemplate(res.data, 2);
                    });
            }
        });
        app.func.getPromise('/v2/customer/seal/my')
            .then(([code, res]) => {
                if (code == 200) {
                    return res.data;
                } else {
                    return app.func.reject();
                }
            })
            .then((url) => {
                return app.func.promise((resolve, reject) => {
                    wx.downloadFile({
                        url: url,
                        success(res) {
                            resolve(res.tempFilePath);
                        },
                        fail(res) {
                            reject();
                        },
                    })
                });
            })
            .then((tempFilePath) => {
                return app.func.promise((resolve, reject) => {
                    wx.getImageInfo({
                        src: tempFilePath,
                        success(res) {
                            resolve(tempFilePath);
                        },
                        fail(res) {
                            reject();
                        }
                    })
                });
            })
            .then((tempFilePath) => {
                that.setData({
                    ["data.companyimg"]: tempFilePath,
                    ["toupload.companyimg"]: true
                })
            }, () => {
                // that.setData({
                // 	["data.companyimg"]: "https://files.dianlinet.com/dianli/images/2019-11-09/18-03-23.jpg"
                // })
            });
    },

    getcardinfo: function (options) {
        app.func.getPromise('/cardtype/detail/' + options.cardid)
            .then(([code, res]) => {
                var data = JSON.parse(res.data.params);
                this.setData({
                        atemplate: res.data.a_template,
                        btemplate: res.data.b_template,
                        data: data,
                        cardid: options.cardid
                    }
                    , this.modeinfo(res.data.a_template, res.data.b_template)
                );
            })
    },

    processTemplate(template, index) {
        let areas = JSON.parse(template);
        let height = 0;
        var that = this;
        for (let i = 0; i < areas.length; i++) {
            let area = areas[i];
            area.top = height;
            height = height + area.height;
        }
        var areaname = "areas" + index;
        var desingerHeight = "designerHeight" + index;
        that.setData({
            [areaname]: areas,
            [desingerHeight]: height
        });
    },

    selfmake: function (e) {
        wx.navigateTo({
            url: '/pages/tool/card/make/making/selfmake/selfmake'
        })
    },

    //选择A面  B面
    choosetype: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({current: index});
    },

    wizardFinishA: function (e) {
        this.setData({wizarda: false}, () => {
            if (this.data.wizardb) {
                this.setData({current: 2});
            }
        });
    },

    wizardFinishB: function (e) {
        this.setData({wizardb: false}, () => {
            if (this.data.wizarda) {
                this.setData({current: 1});
            } else {
                console.log("wizard finish");
                var tips = wx.getStorageSync('tips');
                if (tips) {
                    return;
                } else {
                    this.setData({showbox: false});
                }
            }
        });
    },

    wizardNextA: function (e) {
        this.setData({
            wizardindexa: e.detail.index
        });
    },

    wizardNextB: function (e) {
        this.setData({
            wizardindexb: e.detail.index
        });
    },

    drawFinish: function (e) {
        console.log(e.detail.thumbnail);
        if (e.detail.thumbnail) {
            this.setData({tipsbg: e.detail.thumbnail});
        }
    },
    confirmbtn: function () {
        this.setData({showbox: true});
        wx.setStorageSync('tips', '1');
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (res) {
        let result = app.func.getModalResult();
        if (result != null) {
            this.setData({
                addpro: result
            }, () => {
                this.setData({
                    addpro: []
                });
            });
        }
    },


    selfstyle: function () {
        this.setData({
            showbox: true
        });
    },

    addproduct: function () {
        var length = Object.keys(this.data.data).length - 5;
        wx.navigateTo({
            url: "/pages/tool/card/make/addproduck/addproduct?id=null&length=" + length
        })
    },

    onDataChangeda: function (res) {
        console.log(res);
        var toupdate = 'data.' + res.detail.field;
        var that = this;
        var toset = [];
        if(res.detail.wizard != null) {
            toset["wizardindexa"] = res.detail.wizard;
        }
        if (res.detail.data != null) {
            toset[toupdate] = res.detail.data ? res.detail.data : null;
            this.setData(toset, () => {
                if (res.detail.toupload != null) {
                    var toupload = "toupload." + res.detail.toupload;
                    that.setData({
                        [toupload]: true,
                    })
                }
            });
        } else {
            var data = this.data.data;
            delete data[res.detail.field];
            that.setData({"data": data});
        }
    },

    onDataChangedb: function (res) {
        console.log(res);
        var toupdate = 'data.' + res.detail.field;
        var that = this;
        var toset = [];
        if(res.detail.wizard != null) {
            toset["wizardindexb"] = res.detail.wizard;
        }
        if (res.detail.data != null) {
            toset[toupdate] = res.detail.data ? res.detail.data : null;
            this.setData(toset, () => {
                if (res.detail.toupload != null) {
                    var toupload = "toupload." + res.detail.toupload;
                    that.setData({
                        [toupload]: true,
                    })
                }
            });
        } else {
            var data = this.data.data;
            delete data[res.detail.field];
            that.setData({"data": data});
        }
    },

    upload: function () {
        let toupload = this.data.toupload;
        let data = this.data.data;
        var promises = [];
        var i = 0;
        for (let key in toupload) {
            let suffix = i++;
            let value = toupload[key];
            if (value) {
                let src = data[key];
                promises.push(
                    app.func.uploadPromise("/v2/image/upload", src, 'file', {suffix: suffix}).then(function ([code, res]) {
                        if (code == 3102 || code == 3103) {
                            return app.func.toastPromise('图片内容违规').then((resolve, reject) => {
                                reject();
                            });
                        } else {
                            data[key] = res.data;
                            toupload[key] = false;
                        }
                    })
                );
            }
        }
        return app.func.promise_all(promises).then(() => {
            return app.func.promise((resolve, reject) => {
                this.setData({
                    data: data,
                    toupload: toupload
                }, resolve);
            });
        })
    },

    preview: function (res) {
        console.log(JSON.stringify(this.data.data));
        this.upload()
            .then(() => {
                var atemplate = this.data.atemplate;
                var btemplate = this.data.btemplate;
                var data = this.data.data;
                var urls = [];
                app.func.postPromise("/v2/card/previewA/url/" + atemplate, data)
                    .then(([code, res]) => {
                        urls.push(res.data);
                        return app.func.postPromise("/v2/card/previewB/url/" + btemplate, data);
                    })
                    .then(([code, res]) => {
                        urls.push(res.data);
                    })
                    .then(() => {
                        wx.previewImage({
                            current: urls[0],
                            urls: urls
                        })
                    })
            });
    },

    //提交信息
    submit_info: function () {
        var data = this.data.data;

        if (!data.title || data.title.length == 0) {
            app.func.toastPromise('型号不能为空');
            return;
        } else if (!data.exchange1 || data.title.exchange1 == 0) {
            app.func.toastPromise('友情提示不能为空');
            return;
        } else if (!data.tel || data.title.tel == 0) {
            app.func.toastPromise('服务电话不能为空');
            return;
        } else if (!data.service_time || data.title.service_time == 0) {
            app.func.toastPromise('服务时间不能为空');
            return;
        } else if (!data.time || data.time.length == 0) {
            app.func.toastPromise('卡券有效期不能为空');
            return;
        } else if (!data.exchange || data.title.exchange == 0) {
            app.func.toastPromise('兑换须知不能为空');
            return;
        } else if (!data.product1) {
            app.func.toastPromise('产品不能为空');
            return;
        }
        var expire = this.slipDate(data.time);
        wx.showLoading('提交中');
        var promise = this.upload();
        if (this.data.cardid) {
            this.modify(promise, expire);
        } else {
            this.submit(promise, expire);
        }
    },

    //解bbcode
    slipText: function (text) {
        var arr = [];
        var handle = {
            onText: function (text) {
                arr.push(text);
            }
        };
        new BBCode(handle).parse(text);
        return arr;
    },
    dealtime: function (date) {
        date = date.replace('年', '-');
        date = date.replace('月', '-');
        date = date.replace('日', '');
        return date;
    },
    slipDate: function (text) {
        if (!text) {
            return '';
        }
        var lines = text.split('\n');
        for (var i = 0; i < lines.length; i++) {
            if (i == 0) {
                var parts = this.slipText(lines[i]);
                var item = this.dealtime(parts[1]);
                return item;
            }
        }

    },


    submit: function (promise, expire) {
        promise.then(() => {
            var atemplate = this.data.atemplate;
            var btemplate = this.data.btemplate;
            var params = JSON.stringify(this.data.data);
            app.func.postPromise('/card/template', {
                expire: expire,
                a_template_id: atemplate,
                b_template_id: btemplate,
                params: params,
            }).then(([code, res]) => {
                wx.hideLoading();
                if (code == 200) {
                    app.func.toastPromise('提交成功')
                        .then(() => {
                            wx.redirectTo({
                                url: '/pages/tool/card/make/making/design/submit/submit?id=' + res.data,
                            })
                        })
                } else {
                    app.func.toastPromise(res.message);
                }
            })
        });
    },
    modify: function (promise, expire) {
        promise.then(() => {
            var cardid = this.data.cardid;
            var atemplate = this.data.atemplate;
            var btemplate = this.data.btemplate;
            var params = JSON.stringify(this.data.data);
            app.func.postPromise('/card/templatedit/', {
                id: cardid,
                a_template_id: atemplate,
                b_template_id: btemplate,
                expire: expire,
                params: params,
            }).then(([code, res]) => {
                wx.hideLoading();
                if (code == 200) {
                    app.func.toastPromise('提交成功')
                        .then(() => {
                            wx.redirectTo({
                                url: '/pages/tool/card/make/making/design/submit/submit?id=' + res.data,
                            })
                        })
                } else {
                    app.func.toastPromise(res.message);
                }
            })
        });
    },




    // onReady:function () {
    //     console.log('onReady');
    // },
    // onHide:function () {
    //     console.log('onHide');
    // },
    // onUnload:function () {
    //     var data = this.data.data;
    //     console.log('onUnload');
    //     console.log(data);
    // },

})



