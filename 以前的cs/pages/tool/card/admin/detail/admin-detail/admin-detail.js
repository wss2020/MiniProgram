// pages/tool/card/admin/detail/admin-detail/admin-detail.js

const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		data: '',
		bottom_tap: false,
		startNo:'',
		endNo:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var cardinfo = JSON.parse(options.cardinfo);
		console.log(cardinfo);


		this.setData({
			pic:cardinfo.pic,
			name:cardinfo.cardName,
			startNo:cardinfo.startNo,
			endNo:cardinfo.endNo
		},this.card(cardinfo.startNo,cardinfo.endNo,0));
	},

    card:function(startNo,endNo,offent){
		app.func.getPromise('/card/openedinfo/'+ offent +'/' + startNo + '/' + endNo)
			.then(([code,res])=>{
				if(offent ==  0){
					this.setData({
						data: res.data, bottom_tap: false, checkpro:''
					});
				}else if(res.data.length == 0){
					this.setData({ bottom_tap: true});
				}else{
					var tempArray = this.data.data;
					tempArray = tempArray.concat(res.data);
					this.setData({data: tempArray});
				}
				wx.hideLoading();
			})
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		if (this.data.bottom_tap) {
			this.setData({  bottom_tap: true });
		} else {
			wx.showLoading({  title: '加载更多', mask: true });
			var data = this.data.data;
			var startNo = this.data.startNo;
			var endNo = this.data.endNo;
			this.card(startNo,endNo,data.length);
		}
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
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})
