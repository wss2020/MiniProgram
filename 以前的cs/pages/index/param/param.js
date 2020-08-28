// pages/index/param/param.js
const app = getApp();

app.func.mpage({

	/**
	 * 页面的初始数据
	 */
	data: {
		value:'二级页面',
	},



	// 接收上一个页面，传过来的参数
	onModal: function (args) {
		this.setData({
			amount: args.amount
		});
		app.func.toastPromise("receive:" + args.amount);
	},


	// 返回上一页面，并且传参数
	showModal: function () {
		this.closeModal(this.data.amount * 2);
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

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
