// pages/index/brandsku/brandsku.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productlist:'',
    thispNum: '',
    pageEnd: false,
    bottom_tap: false,
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.func.postPromise('/brandsku/0?length=20',{ brand_name:options.name })
        .then(([code,res])=>{
          if(code == 200){
            this.setData({
              productlist:res.data,
              thispNum: res.data.length,
              name:options.name,
            });
            wx.setNavigationBarTitle({title: res.name});
          }
        })
  },

  //货源说明
  product_info:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/productdetail/product-description/product-description?id=' + id
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.pageEnd) {
      this.setData({  bottom_tap: true });
    } else {
      wx.showLoading({  title: '加载更多', mask: true });
      var thispNum = this.data.thispNum;
      var name = this.data.name;
      var that = this;
      app.func.postPromise('/brandsku/'+ thispNum +'?length=20',{brand_name: name})
          .then(([code,res])=>{
            if (res.data.length == 0) {
              that.setData({
                pageEnd: true,
                bottom_tap: true
              }, ()=> wx.hideLoading())
            } else {
              var tempArray = that.data.productlist;
              tempArray = tempArray.concat(res.data);
              that.setData({
                productlist: tempArray,
                thispNum: that.data.thispNum + res.data.length
              }, ()=> wx.hideLoading());
            }
          })
    }
  },

  productdetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'/pages/index/productdetail/productdetail?id=' + id
    })
  },

  login:function () {
    wx.navigateTo({
      url:'/pages/auth/auth'
    })
  },

  addOptimal: function (e) {
    var id = e.currentTarget.dataset.id;
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }


})
