// pages/about/orderlist/logistics/logistics.js
let wxparse = require("../../../../wxParse/wxParse.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tips:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    app.func.getPromise('/order/express/' + options.id)
        .then(([code, res]) => {
          var ship_detail = JSON.parse(res.data.ship_detail)
          this.setData({
              logistics: res.data,ship_detail:ship_detail
          },this.tips(res.data.skuid));
        })
  },

    productdetail: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url:'/pages/index/productdetail/productdetail?id=' + id
        })
    },

    tips:function(id){
        app.func.getPromise(`/product/notice/${id}`)
            .then(([code,res])=>{
                if(res.data){
                    this.setData({tips:res.data});
                }
            })
    },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})
