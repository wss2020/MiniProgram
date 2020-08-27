// pages/index/categorysku/categorysku.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        productlist: [],
        categorylist: '',
        pageEnd: false,
        currentTab: 0,
        type: null,   //1推荐   2价格   3折扣  4筛选
        min: null,
        max: null,
        showbox: false,  //隐藏筛选框
        chooseindex: 4,  //筛选框默认选择全部搜索
        sort: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.func.getPromise('/categories')
            .then(([code, res]) => {
                if (code == 200) {
                    res.data.splice(1, 1);
                    this.setData({
                            categorylist: res.data
                        }, this.requestnav1({id: 0, type: 0})
                    );
                }
            });
    },


    //点击顶部分类  自动居中
    selected_classify: function (e) {
        var that = this;
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        var current = e.currentTarget.dataset.current;
        this.setData({currentTab: current});
        wx.createSelectorQuery().select("#" + e.currentTarget.id).fields({size: true}, function (res) {
            var itemwidth = res.width;
            wx.createSelectorQuery().select(".scroll-view").fields({size: true, rect: true}, function (res) {
                var left = e.currentTarget.offsetLeft;
                left = left + itemwidth / 2;
                var width = res.width;
                that.setData({navScrollLeft: left - width / 2})
            }).exec();
        }).exec();
        var id = e.target.dataset.id;
        this.requestnav1({id: id, type: 0});
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.pageEnd) {
            this.setData({pageEnd: true});
        } else {
            wx.showLoading({title: '加载更多', mask: true});
            var prolist = this.data.productlist;
            var index = this.data.currentTab;
            var data = this.data;
            this.requestnav1({
                id: data.id, offset: prolist[index].length, min: data.min, max: data.max,
                min_rate: data.min_rate, max_rate: data.max_rate, type: data.type, key: data.key, sort: data.sort,
            });
        }
    },

    //公共函数
    requestnav1: function (obj) {
        var id = obj.id;
        var offset = obj.offset ? obj.offset : 0;
        var type = obj.type ? obj.type : 0;
        var key = obj.key ? obj.key : '';
        var min = obj.min ? obj.min : 0;
        var max = obj.max ? obj.max : 10000;
        var min_rate = obj.min_rate ? obj.min_rate : '';
        var max_rate = obj.max_rate ? obj.max_rate : '';
        var sort = obj.sort ? obj.sort : '';
        app.func.postPromise('/category3',
            {
                id: id, offset: offset, length: 20, min: min, max: max,
                min_rate: min_rate, max_rate: max_rate, type: type, key: key, sort: sort,
            }
        ).then(([code, res]) => {
            var prolist = this.data.productlist;
            var index = this.data.currentTab;
            if (offset == 0) {
                if (res.data.length == 0) {
                    app.func.toastPromise('该分类下暂无此商品');
                } else {
                    prolist[index] = res.data;
                    this.setData({
                        id: id,
                        type: type,
                        min: min,
                        max: max,
                        key: key,
                        sort: sort,
                        min_rate: min_rate,
                        max_rate: max_rate,
                        productlist: prolist,
                        pageEnd: false,
                    });
                    wx.setNavigationBarTitle({title: res.name});
                }
            } else if (res.data.length == 0) {
                this.setData({pageEnd: true}, () => wx.hideLoading());
            } else {
                prolist[index] = prolist[index].concat(res.data);
                this.setData({productlist: prolist}, () => wx.hideLoading());
            }
        });
    },

    //点击 推荐
    choosetype: function (e) {
        var id = this.data.id;
        // this.setData({showprice: 0, showdiscount: 0});
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        this.requestnav1({id: id, type: 1,});
    },

    //列表排序
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
        this.setData({sort: sort}, this.requestnav1({
            id: data.id, offset: 0, min: data.min, max: data.max,
            min_rate: data.min_rate, max_rate: data.max_rate, type: data.type, key: data.key, sort: sort,
        }));
    },


    //点击筛选
    chooseall: function () {
        this.setData({showbox: true});
    },
    backbtn: function () {
        this.setData({showbox: false});
    },
    chooseindex: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({chooseindex: index});
    },
    formsubmit(e) {
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        var id = this.data.id;
        var type = this.data.chooseindex;
        var data = e.detail.value;
        this.setData({
            showbox: false
        }, this.requestnav1({
            id: id,
            type: type,
            key: data.key,
            min: data.minprice,
            max: data.maxprice,
            min_rate: data.minrate,
            max_rate: data.maxrate,
        }));
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

    addOptimal: function (e) {
        var id = e.currentTarget.dataset.id;
        app.func.getPromise('/product/addchoose/' + id)
            .then(([code, res]) => {
                if (code == 200) {
                    app.func.toastPromise('加入成功', 'none', 800);
                } else if (code == 2001) {
                    app.func.toastPromise('已经加入优选', 'none', 800);
                }
            })
    },


})






