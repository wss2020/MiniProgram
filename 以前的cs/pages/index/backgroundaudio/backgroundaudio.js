// pages/index/backgroundaudio/backgroundaudio.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
		name: '此时此刻',
		author: '许巍',
		src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',

		showaudiowww:false,
	},

	showaudiowww(){
	    this.setData({
			showaudiowww:true
		});
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.twoPlay();
	},
	twoPlay(){
		// 第二种播放
		this.audioCtx = wx.createInnerAudioContext();
		this.audioCtx.onPlay(() => {
			this.setData({
				voice_playing: true
			});
		});
		this.audioCtx.onStop(() => {
			this.setData({
				voice_playing: false
			})
		});
		this.audioCtx.onError(() => {
			this.setData({
				voice_playing: false
			})
		});
		this.audioCtx.onEnded(() => {
			this.setData({
				voice_playing: false
			})
		});
		this.audioCtx.src = 'https://files.dianlinet.com/public/uploads/20200904/2020090465a0bf58884dc26a54a208e2eb1d91bf.mp3';
		this.audioCtx.play();
	},
	onUnload: function () {
		this.audioCtx.stop();
	},
	onHide: function () {
		this.audioCtx.stop();
	},





	// 第一种播放
	// onReady: function (e) {
	// 	// 使用 wx.createAudioContext 获取 audio 上下文 context
	// 	this.audioCtx = wx.createAudioContext('myAudio')
	// },
	// audioPlay: function () {
	// 	this.audioCtx.play()
	// },
	// audioPause: function () {
	// 	this.audioCtx.pause()
	// },
	// audio14: function () {
	// 	this.audioCtx.seek(14)
	// },
	// audioStart: function () {
	// 	this.audioCtx.seek(0)
	// },



})
