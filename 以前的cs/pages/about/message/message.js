const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        plan_id: '',
        sku: [],
        skuid: '',
        current: '',
        log_id: '',
        key: '',
        productlist: {},
        categorylist: '',
        thispNum: '',
        pageEnd: false,
        bottom_tap: false,
        currentTab: 1,
        type: null,   //1推荐   2价格   3折扣
        min: null,
        max: null,
        showprice: 0,   //隐藏价格区间
        showdiscount: 0,
        id: '',
        showbox: true,
        chooseindex:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.setData({
        //   plan_id: options.plan_id,
        //   current: options.current,
        //   log_id: options.log_id
        // });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.func.getPromise('/categories')
            .then(([code, res]) => {
                if (code == 200) {
                    this.setData({categorylist: res.data,},
                        this.requestnav(0, 2, 0, 10000)
                    );
                }
            })
    },

    optimal: function (id) {
        var productlist = this.data.productlist;
        var tabindex = 'sku' + id;
        if (productlist[tabindex]) {
            this.setData({
                productlist: productlist, skuid: tabindex, id: id,
            })
        } else {
            app.func.getPromise('/product/choose2/0?length=5')
                .then(([code, res]) => {
                    productlist['sku' + id] = {data: res.data, pageEnd: false};
                    this.setData({
                        skuid: tabindex, id: id, productlist: productlist
                    });
                })
        }
    },


    //点击顶部分类
    selected_classify: function (e) {
        var that = this;
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        var current = e.currentTarget.dataset.current;
        this.setData({
            currentTab: current,
            pricearea: 0, discount: 0, showprice: 0, type: 2
        });
        wx.createSelectorQuery().select("#" + e.currentTarget.id).fields({size: true}, function (res) {
            var itemwidth = res.width;
            wx.createSelectorQuery().select(".scroll-view").fields({size: true, rect: true}, function (res) {
                var left = e.currentTarget.offsetLeft;
                left = left + itemwidth / 2;
                var width = res.width;
                that.setData({
                    navScrollLeft: left - width / 2
                })
            }).exec();
        }).exec();
        var id = e.target.dataset.id;
        if (id == -1) {
            this.optimal(999);
        } else {
            this.requestnav(id, 2, 0, 10000);
        }
    },
    requestnav: function (id, type, min, max) {
        var productlist = this.data.productlist;
        var tabindex = 'sku' + id;
        if (productlist[tabindex]) {
            this.setData({
                productlist: productlist,
                skuid: tabindex,
                id: id,
            })
        } else {
            this.reqpropuct(id, type, min, max);
        }
    },

    reqpropuct: function (id, type, min, max) {
        var productlist = this.data.productlist;
        var tabindex = 'sku' + id;
        app.func.getPromise('/category2?offset=0&id=' + id + '&type=' + type + '&min=' + min + '&max=' + max + '&length=20')
            .then(([code, res]) => {
                productlist['sku' + id] = {data: res.data, pageEnd: false, type: type};
                this.setData({
                    skuid: tabindex,
                    id: id,
                    productlist: productlist
                });
            })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var id = this.data.id;
        var productlist = this.data.productlist;
        var list = this.data.productlist[this.data.skuid];
        if (list.pageEnd) {
            this.setData({productlist: productlist});
        } else if (this.data.id == 999) {
            wx.showLoading({title: '加载更多', mask: true});
            var that = this;
            var id = this.data.id;
            var productlist = this.data.productlist;
            var list = this.data.productlist[this.data.skuid];
            app.func.getPromise('/product/choose2/' + list.data.length + '?length=5')
                .then(([code, res]) => {
                    if (res.data.length == 0) {
                        list.pageEnd = true;
                        productlist[skuid] = list;
                        that.setData({
                            productlist: productlist
                        }, () => wx.hideLoading())
                    } else {
                        var tempArray = list.data;
                        tempArray = tempArray.concat(res.data);
                        list.data = tempArray;
                        productlist['sku' + id] = list;
                        that.setData({
                            productlist: productlist,
                        }, () => wx.hideLoading());
                    }
                })
        } else {
            wx.showLoading({title: '加载更多', mask: true});
            var min = this.data.min == null ? '0' : this.data.min;
            var max = this.data.max == null ? '10000' : this.data.max;
            var that = this;
            var productlist = this.data.productlist;
            var list = this.data.productlist[this.data.skuid];
            console.log(list);
            app.func.getPromise('/category2?offset=' + list.data.length + '&id=' + id + '&type=' + list.type + '&min=' + min + '&max=' + max + '&length=20')
                .then(([code, res]) => {
                    if (res.data.length == 0) {
                        list.pageEnd = true;
                        productlist[skuid] = list;
                        that.setData({
                            productlist: productlist,
                        }, () => wx.hideLoading())
                    } else {
                        var tempArray = list.data;
                        tempArray = tempArray.concat(res.data);
                        list.data = tempArray;
                        productlist['sku' + id] = list;
                        that.setData({
                            productlist: productlist,
                        }, () => wx.hideLoading());
                    }
                })
        }
    },


    //批量添加
    checkboxChange: function (e) {
        console.log(e);
        var list = this.data.productlist[this.data.skuid];
        var data = list.data;
        var checked = e.detail.value;
        for (var i = 0; i < data.length; i++) {
            data[i].checked = false;
        }
        for (var i = 0; i < checked.length; i++) {
            data[checked[i]].checked = true;
        }
    },
    add_array: function () {
        var plan_id = this.data.plan_id;
        console.log(plan_id);
        var checked = [];
        var productList = this.data.productlist;
        for (var index in productList) {
            var data = productList[index];
            console.log(data);
            for (var i = 0; i < data.data.length; i++) {
                var item = data.data[i];
                if (item.checked) {
                    checked.push(item.id);
                }
            }
        }
        console.log(checked);
        if (plan_id == 'null') {
            this.addrecommend(checked);
        } else {
            this.addshop(checked);
        }
    },


    addrecommend: function (checked) {
        var current = this.data.current;
        var log_id = this.data.log_id;
        if (checked.length == 0) {
            app.func.toastPromise('请先选择商品')
        } else {
            console.log(checked);
            // app.func.postPromise('/plan/create',
            //     {
            //       title: '',
            //       sku: checked,
            //       log_id: log_id
            //     }).then(([code, res]) => {
            //   var log_id = res.data;
            //   if (code == 200) {
            //     wx.showToast({
            //       title: '添加方案成功',
            //       icon: 'none',
            //       image: '',
            //       duration: 1500,
            //       mask: true,
            //       success: function (res) {
            //         setTimeout(function () {
            //           let pages = getCurrentPages();
            //           let prevPage = pages[pages.length - 2];
            //           prevPage.setData({current: current, log_id: log_id});
            //           wx.navigateBack({delta: 1,})
            //         }, 1500)
            //       },
            //     });
            //   }
            // })
        }

    },

    addshop: function (checked) {
        var current = this.data.current;
        var plan_id = this.data.plan_id;
        if (checked.length == 0) {
            app.func.toastPromise('请先选择商品')
        } else {

            console.log(checked);

            // app.func.postPromise('/plan/add',
            //     {
            //       plan_id: plan_id,
            //       sku: checked,
            //     }).then(([code, res]) => {
            //   if (code == 200) {
            //     wx.showToast({
            //       title: '添加商品成功',
            //       icon: 'none',
            //       image: '',
            //       duration: 1000,
            //       mask: true,
            //       success: function (res) {
            //         setTimeout(function () {
            //           let pages = getCurrentPages();
            //           let prevPage = pages[pages.length - 2];
            //           prevPage.setData({current: current,});
            //           wx.navigateBack({delta: 1,})
            //         }, 1000)
            //       },
            //     });
            //   } else if (code == 2004) {
            //     app.func.toastPromise('有商品已经添加过了');
            //   }
            // })
        }
    },


    //批量添加
    checkboxChange: function (e) {
        console.log(e);
        var list = this.data.productlist[this.data.skuid];
        var data = list.data;
        var checked = e.detail.value;
        for (var i = 0; i < data.length; i++) {
            data[i].checked = false;
        }
        for (var i = 0; i < checked.length; i++) {
            data[checked[i]].checked = true;
        }
    },
    add_array: function () {
        var plan_id = this.data.plan_id;
        console.log(plan_id);
        var checked = [];
        var productList = this.data.productlist;
        for (var index in productList) {
            var data = productList[index];
            console.log(data);
            for (var i = 0; i < data.data.length; i++) {
                var item = data.data[i];
                if (item.checked) {
                    checked.push(item.id);
                }
            }
        }
        console.log(checked);
        if (plan_id == 'null') {
            this.addrecommend(checked);
        } else {
            this.addshop(checked);
        }
    },


    //点击 推荐
    choosetype: function (e) {
        var id = this.data.id;
        this.setData({pricearea: 0});
        wx.pageScrollTo({scrollTop: e.currentTarget.offsetTop - 100, duration: 0});
        this.reqpropuct(id, 1, 0, 10000);
    },

    //点击价格
    chooseprice: function (e) {
        var id = this.data.id;
        var type = e.currentTarget.dataset.type;
        var showprice = this.data.showprice;
        if (showprice == 0) {
            this.setData({type: type, bottom_tap: false, showprice: 1});
            wx.pageScrollTo({scrollTop: e.currentTarget.offsetTop - 100, duration: 0});
        } else {
            this.setData({showprice: 0});
        }
        this.setData({showdiscount: 0,});
    },

    //价格区间筛选
    searchPrice: function (e) {
        wx.pageScrollTo({scrollTop: e.currentTarget.offsetTop - 100, duration: 0});
        var id = this.data.id;
        var min = e.detail.value.minp;
        var max = e.detail.value.maxp;
        this.reqpropuct(id, 2, min, max);
        this.setData({
            pricearea: 1,
            min: min,
            max: max,
            showprice: 0,
            bottom_tap: false
        });
    },


    //点击折扣
    choosediscount: function (e) {
        var id = this.data.id;
        var type = e.currentTarget.dataset.type;
        var showdiscount = this.data.showdiscount;
        if (showdiscount == 0) {
            this.setData({type: type, bottom_tap: false, showdiscount: 1});
            wx.pageScrollTo({scrollTop: e.currentTarget.offsetTop - 100, duration: 0});
        } else {
            this.setData({showdiscount: 0,});
        }
        this.setData({showprice: 0});
    },

    //折扣区间筛选
    searchDiscount: function (e) {
        wx.pageScrollTo({scrollTop: e.currentTarget.offsetTop - 100, duration: 0});
        var id = this.data.id;
        var min = e.detail.value.mind;
        var max = e.detail.value.maxd;
        this.reqpropuct(id, 3, min, max);
        this.setData({
            discount: 1,
            min: min,
            max: max,
            showdiscount: 0,
            bottom_tap: false
        });
    },


    selectdiscount: function (e) {
        wx.pageScrollTo({scrollTop: e.currentTarget.offsetTop - 100, duration: 0});
        var id = this.data.id;
        var discount = e.currentTarget.dataset.discount;
        var min = e.currentTarget.dataset.min;
        var max = e.currentTarget.dataset.max;
        this.requestnav(id, 3, min, max);
        this.setData({
            discount: discount,
            min: min,
            max: max,
            showdiscount: 0,
            bottom_tap: false
        });
    },


    //货源说明
    product_info: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/index/productdetail/product-description/product-description?id=' + id
        })
    },
    productdetail: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/index/productdetail/productdetail?id=' + id
        })
    },

    login: function () {
        wx.navigateTo({
            url: '/pages/auth/auth'
        })
    },


    //点击筛选
    chooseall: function (e) {
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        var type = e.currentTarget.dataset.type;
        this.setData({type: type,chooseindex:1, showbox: true});
    },
    backbtn: function () {
        this.setData({showbox: false});
    },
    chooseindex:function (e) {
        console.log(e);
        var index = e.currentTarget.dataset.index;
        this.setData({ chooseindex:index });
    },
    formsubmit(e) {
        var id = this.data.id;
        var type = this.data.chooseindex;
        var minrate = e.detail.value.minrate;
        var maxrate = e.detail.value.maxrate;
        var minprice = e.detail.value.minprice;
        var maxprice = e.detail.value.maxprice;
        app.func.postPromise('/card/selectpro2', {
            offset:0,
            length:20,
            id:id,
            type:type,
            min: minprice,
            max: maxprice,
            min_rate: minrate,
            max_rate: maxrate
        }).then(([code,res])=>{
             this.setData({
                 showbox:false
             });
        })
    }


})






