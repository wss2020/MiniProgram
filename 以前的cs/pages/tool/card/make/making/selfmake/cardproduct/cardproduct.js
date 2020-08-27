// pages/tool/card/make/making/selfmake/cardproduct/cardproduct.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        product: '',
        cardid: '',
        addpro: '',
        modifyindex: 0,
        pronums: ''
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({cardid: options.id}, this.product(options.id));
    },
    onShow: function () {
        // var modifyindex = this.data.modifyindex;
        // if (modifyindex == 1) {
            this.delRepeat();
        // }
    },
    product: function (id) {
        app.func.getPromise("/card/product/" + id)
            .then(([code, res]) => {
                this.setData({
                    product: res.data,
                    pronums: res.data.length,
                });
            })
    },


    //查看商品详情
    prodetail: function (e) {
        var id = e.currentTarget.dataset.skuid;
        wx.navigateTo({
            url: '/pages/index/productdetail/productdetail?id=' + id
        })
    },
    //删除商品
    delete_product: function (e) {
        var id = e.currentTarget.dataset.id;
        var product = this.data.product;
        for (var i = 0; i < product.length; i++) {
            if (id == product[i].pro_id) {
                product.splice(i, 1);
                this.setData({product: product});
            }
        }
    },
    addproduct: function () {
        var id = this.data.cardid;
        wx.navigateTo({
            url: '/pages/tool/card/make/addproduck/addproduct?id=' + id+ '&maxcount=999'
        })
    },
    //去除重复数据
    delRepeat: function () {
        var promise = app.func.resolve();
        var that = this;
        var addpro = this.data.addpro;
        for (var i = 0; i < addpro.length; i++) {
            let product = addpro[i];
            promise = promise.then(() => {
                return that.addProduct(product);
            })
        }
    },
    addProduct: function (product) {
        for (var i = 0; i <= this.data.product.length; i++) {
            var _product = this.data.product[i];
            if (_product == null) {
                break;
            }
            if (_product.pro_id === product.pro_id) {
                return;
            }
        }
        return app.func.promise((resolve, reject) => {
            var tempArray = this.data.product;
            tempArray = tempArray.concat(product);
            this.setData({
                product: tempArray
            }, () => {
                resolve();
            });
        });
    },


    add_array: function () {
        var cardid = this.data.cardid;
        var index = this.data.pronums;
        var addpro = this.data.product.splice(index);
        app.func.postPromise('/cardpro/add',
            {
                id: cardid,
                sku: addpro,
            }).then(([code, res]) => {
            if (code == 200) {
                app.func.toastPromise('提交成功')
                    .then(() => {
                        wx.redirectTo({
                            url: '/pages/tool/card/make/make'
                        })
                        // wx.navigateBack({delta:2});
                    })
            } else {
                app.func.toastPromise(res.message);
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */


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

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
