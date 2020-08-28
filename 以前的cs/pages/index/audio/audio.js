const app = getApp();
// pages/giftbag/record/record.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		voice_playing: false
	},


	startRecord: function () {
		this.mgr.start({
			sampleRate: 11025,
			numberOfChannels: 1,
			format: "mp3",
			encodeBitRate: 16000,
			frameSize: 50
		});
	},

	endRecord: function () {
		this.mgr.stop();
	},

	play: function (res) {
		if(this.data.voice_playing) {
			this.ctx.stop();
		} else {
			this.ctx.src = this.data.url;
			this.ctx.play();
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.platform = app.func.getPlatform();
		this.mgr = this.platform.getRecordManager();


		//创建内部 audio 上下文 InnerAudioContext 对象。     返回值  InnerAudioContext
		this.ctx = wx.createInnerAudioContext();

		// InnerAudioContext 实例，可通过 wx.createInnerAudioContext 接口获取实例。
		// InnerAudioContext.onPlay(function callback)      监听音频播放事件
		this.ctx.onPlay(() => {
			this.setData({
				voice_playing: true
			});
		});

		//InnerAudioContext.onStop(function callback)   监听音频停止事件
		this.ctx.onStop(() => {
			this.setData({
				voice_playing: false
			})
		});

		// InnerAudioContext.onError(function callback)   监听音频播放错误事件
		this.ctx.onError(() => {
			this.setData({
				voice_playing: false
			})
		});

		// InnerAudioContext.offEnded(function callback) 取消监听音频自然播放至结束的事件
		this.ctx.onEnded(() => {
			this.setData({
				voice_playing: false
			})
		});

		this.setData({
			recording: false,
			url: null
		});


		this.onRecordError = () => {
			this.checkPermission("scope.record", "麦克风");
			this.setData({
				recording: false
			})
		};


		var that = this;
		this.onRecordStop = (res) => {
			if (this.data.recording) {
				let duration = res.duration;
				return app.func.uploadPromise(
					"/v2/mp3/upload",
					res.tempFilePath,
					'file',
					{suffix: 1}
				).then(function ([code, res]) {
					that.setData({
						recording: false,
						url: res.data,
						duration: duration,
					});
				});
			}
		};
		this.onRecordStart = () => {
			this.setData({
				recording: true,
			})
		};
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.mgr.on('record-error', this.onRecordError);
		this.mgr.on('record-stop', this.onRecordStop);
		this.mgr.on('record-start', this.onRecordStart);
		this.setData({
			recording: false,
		});
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		this.mgr.off('record-error', this.onRecordError);
		this.mgr.off('record-stop', this.onRecordStop);
		this.mgr.off('record-start', this.onRecordStart);
		this.mgr.stop();
	},




	onModal: function(res) {
		if(res != null) {
			this.setData({
				url: res.url,
				duration: res.duration
			});
		} else {
			this.setData({
				url: null,
				duration: 0
			});
		}
	},

	confirm: function() {
		this.closeModal({url: this.data.url, duration: this.data.duration});
	},








	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

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
})
