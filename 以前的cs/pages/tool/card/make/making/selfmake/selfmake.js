// pages/tool/card/make/making/selfmake/selfmake.js
import Promise from "../../../../../../service/es6-promise.min";

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imglist: [],
        info: '',
        cardtype: '',
        cardcategory: '',
        chooseindex: '',
        categoryindex: '',
        categorytext: '',
        showbox: false,
        printtime: '',
        cardinfo: '',
        editimg: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.modify) {
            wx.setNavigationBarTitle({title: '修改卡券信息'});
            this.setData({
                modify: options.modify,
                cardid: options.id
            }, this.cardinfo(options.id));
        }
    },
    onShow: function() {
        let res = app.func.getModalResult();
    },
    cardinfo: function (id) {
        var promise = app.func.resolve();
        promise.then(() => {
            this.cardtype();
        }).then(() => {
            this.cardinfo1(id);
        });
    },
    cardinfo1: function (id) {
        app.func.getPromise('/cardtype/detail/' + id)
            .then(([code, res]) => {
                if (code == 200) {
                    this.setData({
                        cardinfo: res.data,
                        cardtype: res.data.type,
                        categoryindex: res.data.category1,
                        printtime: res.data.expire,
                        editimg: res.data.pic
                    });
                }
            })
    },
    cardtype: function () {
        app.func.getPromise('/cardtype/category')
            .then(([code, res]) => {
                this.setData({cardcategory: res.data});
            })
    },
    img_w_show: function () {
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                console.log(res);
                that.setData({
                    imglist: res.tempFilePaths
                })

            }
        })
    },
    //图片点击事件
    imgYu: function (e) {
        var src = e.currentTarget.dataset.src;
        wx.previewImage({
            urls: [src]
        })
    },

    choose_category: function (e) {
        var index = e.currentTarget.dataset.index;
        if (index == 2) {
            this.cardtype();
        }
        this.setData({showbox: true, chooseindex: index});
    },
    radioChange: function (e) {
        var index = e.detail.value;
        this.setData({cardtype: index}, this.show);
    },
    radioChange1: function (e) {
        var index = e.detail.value;
        this.setData({categoryindex: index}, this.show);
    },
    show: function () {
        var that = this;
        setTimeout(function () {
            that.setData({showbox: false});
        }, 400);
    },
    categorytext: function (e) {
        var text = e.detail.value;
        this.setData({categorytext: text});
    },
    addcategory: function () {
        var text = this.data.categorytext;
        this.addcate(text);
    },
    addcate: function (name) {
        app.func.postPromise('/cardtype/categoryadd', {
            name: name
        }).then(([code, res]) => {
                if (code == 200) {
                    this.setData({showbox: false, categoryindex: res.data}, this.cardtype);
                } else {
                    app.func.toastPromise(res.message);
                }
            }
        )
    },

    bindDateChange: function (e) {
        var time = e.detail.value;
        this.setData({printtime: time});
    },

    formsubmit: function (e) {
        var modify = this.data.modify;
        var name = e.detail.value.name;
        var no = e.detail.value.no;
        var type = this.data.cardtype;
        var category = this.data.categoryindex;
        var tips = e.detail.value.tips;
        var expire = e.detail.value.time;
        var content = e.detail.value.content;
        wx.showLoading({title: '提交中'});
        var pic;
        var promise = app.func.resolve();
        var promise1 = promise.then(() => {
            let imglist = this.data.imglist[0];
            let editimg = this.data.editimg;
            if (imglist) {
                return app.func.uploadPromise("/v2/image/upload", imglist, 'file',).then(function ([code, res]) {
                    if (code == 3102 || code == 3103) {
                        return app.func.toastPromise('图片内容违规').then((resolve, reject) => {
                            reject();
                        });
                    } else {
                        pic = res.data;
                    }
                });
            } else if (editimg) {
                pic = editimg;
            } else {
                app.func.toastPromise('券样不能为空');
                return;
            }
        });
        promise1.then(() => {
            if (modify) {
                this.selfedit(pic, name, no, type, category, tips, expire, content);
            } else {
                this.create(pic, name, no, type, category, tips, expire, content);
            }
        })
    },

    selfedit: function (pic, name, no, type, category, tips, expire, content) {
        var id = this.data.cardid;
        app.func.postPromise('/cardtype/selfedit',
            {
                id: id,
                pic: pic,
                name: name,
                no: no,
                type: type,
                category: category,
                tips: tips,
                expire: expire,
                content: content,
            }).then(([code, res]) => {
            wx.hideLoading();
            if (code == 200) {
                app.func.toastPromise('提交成功')
                    .then(() => {
                        wx.navigateBack({delta: 1});
                    })
            } else {
                app.func.toastPromise(res.message)
            }
        })
    },

    create: function (pic, name, no, type, category, tips, expire, content) {
        app.func.postPromise('/cardtype/create',
            {
                pic: pic,
                name: name,
                no: no,
                type: type,
                category: category,
                tips: tips,
                expire: expire,
                content: content,
            }).then(([code, res]) => {
            wx.hideLoading();
            var id = res.data;
            if (code == 200) {
                app.func.toastPromise('提交成功')
                    .then(
                        wx.redirectTo({
                            url: '/pages/tool/card/make/making/selfmake/cardproduct/cardproduct?id=' + id
                        })
                    )
            } else {
                app.func.toastPromise(res.message)
            }
        })
    },

})
