// pages/index/productdetail/productdetail.js
let wxparse = require("../../../wxParse/wxParse.js");
//获取应用实例
const app = getApp();

Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        authoried: false,
        canshare: false,
        productinfo: '',
        tips:'',
        hidetips:true
    },

    onLoad: function (options) {
        app.func.onPageLoad(this,options);
        if(options.id){
            this.detail(options.id);
        }

        this.tips(options.id);

    },



    onSceneInfo: function (data) {
        this.detail(data.id);
        this.tips(data.id);
    },

    tips:function(id){
       app.func.getPromise(`/product/notice/${id}`)
           .then(([code,res])=>{
               if(res.data){
                   this.setData({
                       hidetips:false,
                       tips:res.data
                   });
               }
           })
    },

    detail: function (id) {
        app.func.getPromise('/product/detail/' + id)
            .then(([code, res]) => {
                this.setData({
                    productinfo: res.data,
                    key: res.key
                });
                wxparse.wxParse('dkcontent', 'html', res.data.content, this, 5);
            })
    },


    onShow: function () {
        //判断是否授权
        app.func.getuserinfo((userInfo) => {
            this.setData({userinfomation: userInfo, authoried: true});
        }, () => {
            console.log('未授权');
            this.setData({authoried: false});
        });


        //判断是否有账户
        app.func.getPromise('/my/info')
            .then(([code, res]) => {
                if (code == 200) {
                    var customers = res.data.customers;
                    if (customers.length == 0) {
                        this.setData({login: false});
                    } else {
                        this.setData({login: true});
                    }
                }
            })
    },

    jumpindex: function () {
        wx.switchTab({
            url: '/pages/index/index'
        })
    },

    addonshopbuy: function () {
        var id = this.data.productinfo.id;
        wx.navigateTo({
            url: '/pages/gifts/pages/order/order?id=' + id
        })
    },

    addproduct: function () {
        var id = this.data.productinfo.id;
        app.func.getPromise('/product/addchoose/' + id)
            .then(([code, res]) => {
                if (code == 200) {
                    wx.showToast({
                        title: '加入成功',
                        icon: 'none',
                        duration: 1500,
                        mask: true,
                    })
                } else if (code == 2001) {
                    wx.showToast({
                        title: '已经加入优选',
                        icon: 'none',
                        duration: 1500,
                        mask: true,
                    })
                }
            })
    },

    login: function () {
        wx.navigateTo({
            url: '/pages/auth/auth'
        })
    },

    //货源说明
    product_info: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/index/productdetail/product-description/product-description?id=' + id
        })
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }


});
