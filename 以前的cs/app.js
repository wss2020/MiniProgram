

var mixin =  require('mixins/mixin.js');


// var gio = require("service/gio-minp.js").default;
// version 是你的小程序的版本号, 发版时请调整
// gio('init', '98db34f72a1e8c40', 'wx4175126b5f2a68dc', { version: '2.0.1.66' });

//app.js
var http = require('service/http.js');
var req = require('service/dl.js');
var storage = require('service/storage');
var fmt = require('service/fmt.js');


const updateManager = wx.getUpdateManager();

var app = {
    globalData: {
        userInfo: null,
        uid: null,
        openid: null,
        token: null,
        accesstoken:null,
        imgUrl: 'https://www.dianlinet.com',
        // ceshi: "https://www.dianlinet.com/cs",
        // ceshi: "https://cs.dianlinet.cn/cs",
        // ceshi: "http://127.0.0.1:84/cs",
        // invalid : null


        // 录音专用接口
        ceshi: "https://cs.dianlinet.cn/wxa/",

    },

    onLaunch: function () {
        //判断token是否存在
            var accesstoken = wx.getStorageSync('accesstoken')
        if (accesstoken) {
            console.log(wx.getStorageSync('uid'));
            this.globalData.uid = wx.getStorageSync('uid');
            this.globalData.openid = wx.getStorageSync('openid');
            this.globalData.token = wx.getStorageSync('token');
            this.globalData.accesstoken = wx.getStorageSync('accesstoken');
            // console.log(wx.getStorageSync('token'));
        }
        storage.load(req);

        wx.removeStorageSync('browse');

        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate)
        });

        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                showCancel: false,
                success: function (res) {
                    // if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate()
                    // }
                }
            })
        })

    },

    // onHide:function(){
    //
    // },

    func: req,

    funct: {
        req: http.req
    },

    storage: storage,

    fmt: fmt,
    //当前供应商ID
    sup_id: null

};
req.registerApiHost(app.globalData.ceshi);
App(app);

