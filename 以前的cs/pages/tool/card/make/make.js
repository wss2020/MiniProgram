// pages/tool/card/make/make.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showprint: false,
        printid: '',  //当前需要印刷的id
        printtime: '',
        printindex: '',
        makeno: '',
        showmake: false,
        showbottom: false,
        rejectAuth: 0
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    onShow: function () {
        this.openlist(0, 10);
    },

    openlist: function (offset, length) {
        app.func.getPromise('/cardtype/list/' + offset + '?length=' + length)
            .then(([code, res]) => {
                if(offset == 0) {
                    this.setData({openlist: res.data});
                }else if (res.data.length == 0) {
                    this.setData({showbottom: true},()=>wx.hideLoading());
                } else {
                    var tempArray = this.data.openlist;
                    tempArray = tempArray.concat(res.data);
                    this.setData({openlist: tempArray}, () => wx.hideLoading());
                }
            })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        wx.showLoading({title: '加载更多', mask: true});
        var offset = this.data.openlist.length;
        this.openlist(offset, 10);
    },

    //修改卡券信息
    editinfo: function (e) {
        var id = e.currentTarget.dataset.id;
        var design = e.currentTarget.dataset.design;
        if (design == 0) {
            wx.navigateTo({
                url: '/pages/tool/card/make/making/selfmake/selfmake?id=' + id + "&modify=1",
            })
        } else {
            // wx.navigateTo({
            //     url:'/pages/tool/card/make/making/design/submit/submit?id=' + id,
            // })
            //
            wx.navigateTo({
                url: '/pages/tool/card/make/making/design/design/design?cardid=' + id
            })
        }
    },

    //添加商品
    addproduct: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/tool/card/make/making/selfmake/cardproduct/cardproduct?id=' + id
        });
    },

    //确认
    submit: function (e) {
        var id = e.currentTarget.dataset.id;
        app.func.getPromise('/submit/' + id)
            .then(([code, res]) => {
                if (code == 200) {
                    app.func.toastPromise('提交成功');
                    this.openlist(0, 10);
                } else if (code == 1007) {
                    app.func.toastPromise('您还未通过认证')
                        .then(() => {
                            wx.navigateTo({
                                url: '/pages/auth/attestation/attestation'
                            });
                        })
                } else {
                    app.func.toastPromise(res.message);
                }
            })
    },

    //复制
    copycard: function (e) {
        var id = e.currentTarget.dataset.id;
        app.func.getPromise('/copy/' + id)
            .then(([code, res]) => {
                if (code == 200) {
                    app.func.toastPromise('复制成功');
                    this.openlist(0, 10);
                } else {
                    app.func.toastPromise(res.message);
                }
            })
    },

    //删除卡券
    deletecard: function (e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '删除卡券',
            content: '卡券一旦删除，不可恢复',
            success(res) {
                if (res.confirm) {
                    that.confirmdel(id);
                } else if (res.cancel) {
                    console.log('用户点击了取消');
                }
            }
        })
    },

    confirmdel: function (id) {
        app.func.getPromise('/card/delete/' + id)
            .then(([code, res]) => {
                if (code == 200) {
                    app.func.toastPromise('删除成功');
                    this.openlist(0, 10);
                } else {
                    app.func.toastPromise(res.message);
                }
            })
    },



    //生成（制作卡券）
    creat: function (e) {
        var id = e.currentTarget.dataset.id;
        var type = e.currentTarget.dataset.type;
        this.setData({
            showmake: true,
            makeid: id,
            maketype: type,
        });
    },
    makecardnums: function (e) {
        var num = this.data.makenum;
        var makeid = this.data.makeid;
        var maketype = this.data.maketype;
        this.makenum(maketype, makeid, num);
    },
    makenum: function (maketype, makeid, num) {
        app.func.postPromise('/cardmake/make', {
            type: maketype,
            id: makeid,
            num: num
        }).then(([code, res]) => {
            if (code == 200) {
                this.setData({
                    maketype: '',
                    makeid: '',
                    showmake: false,
                }, this.openlist(0, 10));
            } else {
                app.func.toastPromise(res.message);
            }
        })
    },

    getNum:function(e){
        this.setData({ makenum:e.detail.value * 50 });
    },


    //请求印刷  信息
    printing: function (e) {
        var id = e.currentTarget.dataset.id;
        app.func.getPromise('/print/info/' + id)
            .then(([code, res]) => {
                var printinfo = res.data;
                var makeno = this.data.makeno;
                for (var i = 0; i < printinfo.length; i++) {
                    var item = printinfo[i].startNo + '-' + printinfo[i].endNo;
                    console.log(item);
                    this.setData({
                        ["makeno[" + i + "]"]: item
                    });
                }
                this.setData({
                    showprint: true,
                    printinfo: printinfo,
                    printindex: 0
                });
            })
    },
    bindcardChange: function (e) {
        var index = e.detail.value;
        this.setData({printindex: index});
    },

    hideshow: function () {
        this.setData({
            showprint: false,
            showmake: false
        });
    },
    bindDateChange: function (e) {
        var time = e.detail.value;
        this.setData({printtime: time});
    },
    formsubmit: function (e) {
        var makeid = this.data.printinfo[this.data.printindex].id;
        var company = e.detail.value.company;
        var receiver = e.detail.value.receiver;
        var tel = e.detail.value.tel;
        var time = e.detail.value.time;
        var address = e.detail.value.address;
        var content = e.detail.value.content;
        if (company.length == 0) {
            app.func.toastPromise('公司不能为空');
            return;
        } else if (receiver.length == 0) {
            app.func.toastPromise('收卡人不能为空');
            return;
        } else if (tel.length == 0) {
            app.func.toastPromise('手机号不能为空');
            return;
        } else if (time.length == 0) {
            app.func.toastPromise('时间不能为空');
            return;
        } else if (address.length == 0) {
            app.func.toastPromise('地址不能为空');
            return;
        } else {
            wx.showLoading({title: '上传中'});
            this.printcard(makeid, company, receiver, tel, time, address, content);
        }
    },
    printcard: function (makeid, company, receiver, tel, time, address, content) {
        app.func.postPromise('/print', {
            id: makeid,
            company: company,
            name: receiver,
            mobile: tel,
            address: address,
            content: content,
            time: time
        }).then(([code, res]) => {
            wx.hideLoading();
            if (code == 200) {
                app.func.toastPromise('提交成功');
                this.setData({
                    showprint: false,
                    makeno: '',
                    printtime: ''
                }, this.openlist(0, 10));
            } else {
                app.func.toastPromise(res.message);
            }
        })
    },

    detail: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/tool/card/make/detail/detail?id=' + id
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

    add_btn: function () {
        wx.navigateTo({
            url: '/pages/tool/card/make/making/making'
        })
    },


    //用户点击分享
    share: function (e) {
        var apic = e.currentTarget.dataset.apic;
        var bpic = e.currentTarget.dataset.bpic;
        var pic = e.currentTarget.dataset.pic;
        if (apic) {
            var arr = [apic, bpic]
        } else {
            var arr = [pic];
        }
        this.poster(arr);
    },
    callback: function (e) {
        var that = this;
        if (e.detail.authSetting["scope.writePhotosAlbum"]) {
            that.setData({rejectAuth: 0}, () => that.poster1());
        }
    },
    poster: function (urls) {
        var that = this;
        var scope = "scope.writePhotosAlbum";
        wx.getSetting({
            success(res) {
                if (!res.authSetting[scope]) {
                    wx.authorize({
                        scope: scope,
                        success(res) {
                            that.poster1(urls);
                        },
                        fail(res) {
                            that.setData({rejectAuth: 1});
                        }
                    })
                } else {
                    that.poster1(urls);
                }
            }
        })
    },
    poster1: function (urls) {
        wx.showLoading({
            title: '分享图片保存中...',
            icon: 'loading'
        });
        var promises = [];
        for (var i = 0; i < urls.length; i++) {
            let url = urls[i];
            var promise = app.func.promise((resolve, reject) => {
                wx.downloadFile({
                    url: url,
                    success(res) {
                        resolve(res.tempFilePath);
                    },
                    fail: reject
                })
            }).then((tempFilePath) => {
                return app.func.promise((resolve, reject) => {
                    wx.saveImageToPhotosAlbum({
                        filePath: tempFilePath,
                        success: resolve,
                        fail: reject
                    })
                })
            });
            promises.push(promise);
        }
        wx.hideLoading();
        app.func.promise_all(promises).then(() => {
            wx.showModal({
                title: '保存成功',
                content: '券样图片成功保存到相册了',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#e33d3d',
            });
        });
    },

    backIndex:function(){
        wx.switchTab({
            url:'/pages/index/index'
        })
    },


})
