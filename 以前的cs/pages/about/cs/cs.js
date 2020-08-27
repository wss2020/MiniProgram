// pages/about/cs/cs.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardid: '',
        sku: [],
        skuid: '',
        productlist: {},
        categorylist: '',
        thispNum: '',
        pageEnd: false,
        bottom_tap: false,
        selectBox:false,
        currentTab: 1,
        type: null,   //1推荐   2价格   3折扣
        addproindex: '',
        disabled: [],
        selected: {},
        selectedcount: 0,
        maxcount: 0,
        showbox: false,
        chooseindex: 2,
        id: '',
        key: '',
        min: null,
        max: null,
        sort: '',
    },

    /**
     * 生命周期函数--监听页面加载   url: "/pages/about/cs/cs?id=null&length=&maxcount=" + left + "&ids=" + ids.join(",")
     */
    onLoad: function (options) {
        if (options.length) {
            this.setData({addproindex: options.length});
        }
        if (options.ids) {
            var ids = options.ids.split(',');
            this.setData({disabled: ids});
        }
        this.setData({cardid: options.id, maxcount: options.maxcount});
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.func.getPromise('/categories')
            .then(([code, res]) => {
                if (code == 200) {
                    this.setData({
                        categorylist: res.data,
                    }, this.requestnav(0, 2, 0, 10000));
                }
            })
    },
    requestnav: function (id, type, min, max) {
        var tabindex = 'sku' + id;
        this.setData({
            skuid: tabindex,
            id: id,
        });
        this.reqpropuct1({id: id, type: type, min: min, max: max});
    },
    reqpropuct1: function (obj) {
        var id = obj.id ? obj.id : 0;
        var key = obj.key ? obj.key : '';
        var sort = obj.sort ? obj.sort : '';
        var type = obj.type ? obj.type : 2;
        var min = obj.min ? obj.min : 0;
        var max = obj.max ? obj.max : 10000;
        var offset = obj.offset ? obj.offset : 0;
        var minrate = obj.minrate ? obj.minrate : '';
        var maxrate = obj.maxrate ? obj.maxrate : '';
        app.func.postPromise('/card/selectpro2', {
            id: id, type: type, min: min, max: max, offset: offset, min_rate: minrate, max_rate: maxrate,
            key: key, sort: sort, length: 20,
        }).then(([code, res]) => {
            if (offset == 0) {
                this.setData({
                    type: type, min: min, max: max, minrate: minrate, maxrate: maxrate, key: key, sort: sort
                }, this.setProductList(res.data, id))
            } else if (res.data.length == 0) {
                this.setProductListEnd(id, () => wx.hideLoading());
            } else {
                if (res.data.length < 20) {
                    this.setProductListEnd(id, () => wx.hideLoading());
                }
                this.addProductList(res.data, id, () => wx.hideLoading());
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var list = this.data.productlist[this.data.skuid];
        var data = this.data;
        if (list.pageEnd) {
            //do nothing
        } else if (this.data.id == 999) {
            wx.showLoading({title: '加载更多', mask: true});
            this.optimalList(data.id, list.data.length);
        } else {
            wx.showLoading({title: '加载更多', mask: true});
            this.reqpropuct1({
                id: data.id, type: list.type, min: data.min, max: data.max, offset: list.data.length,
                min_rate: data.minrate, max_rate: data.maxrate, key: data.key, sort: data.sort,
            })
        }
    },

    //点击 推荐
    choosetype: function (e) {
        var id = this.data.id;
        var type = e.currentTarget.dataset.type;
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        this.setData({ selectBox: false });
        this.reqpropuct1({id: id, type: type})
    },

    //点击 价格/折扣排序
    proListOrder: function (e) {
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        var ordetType = e.currentTarget.dataset.type;
        var sort = this.data.sort;
        var data = this.data;
        if (ordetType == 0) {
            sort = sort && sort == 3 ? 4 : 3;
        } else {
            sort = sort && sort == 1 ? 2 : 1;
        }
        this.reqpropuct1({
            id: data.id, min: data.min, max: data.max,
            min_rate: data.minrate, max_rate: data.maxrate,
            key: data.key, sort: sort, type: data.type,
        });
    },

    //点击筛选
    chooseall: function (e) {
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        this.setData({selectBox: true, chooseindex: 2, showbox: true});
    },
    backbtn: function () {
        this.setData({showbox: false,selectBox: false});
    },
    chooseindex: function (e) {
        console.log(e);
        var index = e.currentTarget.dataset.index;
        this.setData({chooseindex: index});
    },
    formsubmit(e) {
        var id = this.data.id;
        var type = this.data.chooseindex;
        var minrate = e.detail.value.minrate;
        var maxrate = e.detail.value.maxrate;
        var minprice = e.detail.value.minprice;
        var maxprice = e.detail.value.maxprice;
        var key = e.detail.value.key;
        this.setData({
            showbox: false
        }, this.reqpropuct1({
            id: id, type: type, min: minprice, max: maxprice,
            minrate: minrate, maxrate: maxrate, key: key
        }));
    },


    //获取所选择的ID
    getSelectedIds: function (id) {
        let infos = this.data.selected;
        let keys = Object.keys(infos);
        let ids = [];
        for (var i = 0; i < keys.length; i++) {
            ids.push(infos[keys[i]].id);
        }
        return ids;
    },


    //点击顶部分类
    selected_classify: function (e) {
        var that = this;
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        var current = e.currentTarget.dataset.current;
        this.setData({currentTab: current,selectBox: false});
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

    //处理 第一次加载商品（点击顶部，或者其他筛选条件）的数据
    setProductList: function (list, id, type) {
        if (list != null) {
            for (var i = 0; i < list.length; i++) {
                var product = list[i];
                if (this.data.disabled.indexOf(product.id + "") >= 0) {
                    product.checked = true;
                    product.disabled = true;
                } else {
                    if (this.data.selected["product" + product.id] != null) {
                        product.checked = true;
                    }
                }
            }
        }
        var toset = "productlist.sku" + id;
        this.setData({
            [toset]: {data: list, pageEnd: false, type: type}
        });
    },

    //处理 触底加载，加载更多商品 的数据
    addProductList: function (list, id, cb) {
        var productlist = this.data.productlist['sku' + id].data;
        var resultlist = productlist.concat(list);
        for (var i = 0; i < resultlist.length; i++) {
            var product = resultlist[i];
            if (this.data.disabled.indexOf(product.id + "") >= 0) {
                product.checked = true;
                product.disabled = true;
            } else {
                if (this.data.selected["product" + product.id] != null) {
                    product.checked = true;
                }
            }
        }
        this.setData({
            ["productlist.sku" + id + ".data"]: resultlist
        }, cb);
    },

    //处理 触底，商品加载完成 提示："已经到底了"
    setProductListEnd: function (id, cb) {
        var toset = "productlist.sku" + id + ".pageEnd";
        this.setData({
            [toset]: true
        }, cb);
    },


    //处理 优选 的数据
    optimal: function (id) {
        var productlist = this.data.productlist;
        var tabindex = 'sku' + id;
        this.setData({
            skuid: tabindex,
            id: id,
        });
        if (!productlist[tabindex]) {
            this.optimalList(999, 0);
        } else {
            var products = this.data.productlist[tabindex].data;
            var ids = this.getSelectedIds();
            for (var i = 0; i < products.length; i++) {
                let product = products[i];
                if (!product.disabled) {
                    if (ids.indexOf(product.id) >= 0) {
                        product.checked = true;
                    } else {
                        product.checked = false;
                    }
                }
            }
            this.setData({
                ["productlist." + tabindex + ".data"]: products
            });
        }
    },
    optimalList: function (id, offset) {
        app.func.getPromise('/product/choose2/' + offset + '?length=5')
            .then(([code, res]) => {
                if (offset == 0) {
                    this.setProductList(res.data, id);
                } else if (res.data.length == 0) {
                    this.setProductListEnd(id, () => wx.hideLoading());
                } else {
                    if (res.data.length < 5) {
                        this.setProductListEnd(id, () => wx.hideLoading());
                    }
                    this.addProductList(res.data, id, () => wx.hideLoading());
                }
            })
    },


    //点击复选框
    checkboxChange: function (e) {
        let tabindex = this.data.skuid;
        var list = this.data.productlist[tabindex].data;
        var checked = e.detail.value;
        var selected = this.data.selected;
        for (var i = 0; i < list.length; i++) {
            let product = list[i];
            if (!product.disabled) {
                product.checked = false;
                delete selected["product" + product.id];
            }
        }
        for (var i = 0; i < checked.length; i++) {
            let product = list[checked[i]];
            if (!product.disabled) {
                product.checked = true;
                selected["product" + product.id] = product;
            }
        }
        this.setData({
            selected: selected,
            selectedcount: Object.keys(selected).length,
            ["productlist." + tabindex + ".data"]: list
        });
    },
    //批量添加
    add_array: function () {
        var checked = [];
        var keys = Object.keys(this.data.selected);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var item = this.data.selected[key];
            checked.push({
                id: item.id,
                pro_id: item.id,
                brand: item.brand,
                title: item.name,
                image: item.pic,
                name: item.name,
                price: item.price,
                description: item.intro,
            });
        }
        this.addshop(checked);
    },

    addshop: function (checked) {
        if (checked.length == 0) {
            app.func.toastPromise('请先选择商品')
        } else {
            var cardid = this.data.cardid;
            if (cardid == 'null') {
                this.addpro(checked);
            } else {
                this.selfaddpro(cardid, checked);
            }
        }
    },
    addpro: function (checked) {
        app.func.setModalResult(checked);
        wx.navigateBack({delta: 1,})
    },


    selfaddpro: function (cardid, checked) {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({addpro: checked, modifyindex: 1});
        wx.navigateBack({delta: 1,})
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

})







