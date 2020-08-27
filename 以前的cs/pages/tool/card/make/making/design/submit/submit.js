// pages/tool/card/make/making/design/submit/submit.js
const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		info: '',
		cardtype: '',
		cardcategory: '',
		chooseindex: '',
		categoryindex: '',
		categorytext: '',
		showbox: false,
		cardid:'',
		title:'',
		cardinfo:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		    this.cardtype();

			this.setData({
				cardid:options.id
			},this.cardinfo(options.id));
	},

	cardinfo:function(id){
		app.func.getPromise('/cardtype/detail/' + id)
			.then(([code,res])=>{
				if(code == 200 ){
					this.setData({
						cardinfo:res.data,
						cardtype: res.data.type,
						categoryindex: res.data.category1,
						printtime: res.data.expire,
					});
				}
			})
	},

	cardtype: function () {
		app.func.getPromise('/cardtype/category')
			.then(([code, res]) => {
				this.setData({ cardcategory: res.data });
			})
	},



	hidebox:function(){
	   this.setData({showbox:false});
	},
	choose_category: function (e) {
		var index = e.currentTarget.dataset.index;
		if (index == 2) {
			this.cardtype();
		}
		this.setData({ showbox: true, chooseindex: index });
	},
	radioChange: function (e) {
		var index = e.detail.value;
		this.setData({ cardtype: index }, this.show);
	},
	radioChange1: function (e) {
		var index = e.detail.value;
		this.setData({ categoryindex: index }, this.show);
	},
	show: function () {
		var that = this;
		setTimeout(function () {
			that.setData({ showbox: false });
		}, 400);
	},
	categorytext: function (e) {
		var text = e.detail.value;
		this.setData({ categorytext: text });
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
					this.setData({ showbox: false, categoryindex: res.data }, this.cardtype);
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
		console.log(e);
		var id = this.data.cardid;
		var name = e.detail.value.name;
		var no = e.detail.value.no;
		var type = this.data.cardtype;
		var category = this.data.categoryindex;
		var date = e.detail.value.time;
		var content = e.detail.value.content;
		wx.showLoading({ title: '提交中' });
		var promise = app.func.resolve();
		promise.then(() => {
			app.func.postPromise('/cardtype/edit',
				{
					id: id,
					name: name,
					no:no,
					expire:date,
					type: type,
					category: category,
					content: content,
				}).then(([code, res]) => {
				wx.hideLoading();
				var id = res.data;
				if (code == 200) {
					app.func.toastPromise('提交成功')
						.then(
							wx.redirectTo({
								url: '/pages/tool/card/make/make'
							})
						)
				} else {
					app.func.toastPromise(res.message)
				}
			})
		})
	},

})
