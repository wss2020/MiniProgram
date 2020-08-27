// pages/tool/card/make/detail/detail.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardcategory:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.func.getPromise('/cardtype/detail/' + options.id)
            .then(([code, res]) => {
                this.setData({detail: res.data});
            }).then(() => {
            return app.func.getPromise('/cardtype/category')
                .then(([code, res]) => {
                    this.setData({cardcategory: res.data});
                }).then(()=>{
								 	return app.func.getPromise('/card/product/'+ options.id)
									     .then(([code,res])=>{
                             this.setData({ productlist:res.data});
											 })
								})
        })
    },

	//图片预览
	imgpre: function (e) {
		var src = e.currentTarget.dataset.src;
		wx.previewImage({
			urls: [src]
		})
	},

	//商品详情
	productdetail: function (e) {
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '/pages/index/productdetail/productdetail?id=' + id
		})
	},
	//货源说明
	product_info: function (e) {
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '/pages/index/productdetail/product-description/product-description?id=' + id
		})
	},


})
