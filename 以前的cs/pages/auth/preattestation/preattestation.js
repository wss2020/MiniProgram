// pages/auth/preattestation/preattestation.js
const  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        info:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      app.func.getPromise('/user/authinfo')
          .then(([code,res])=>{
                this.setData({
                       info:res.data
                });
          })
  },

    //图片点击事件
    imgYu: function (e) {
        var src = e.currentTarget.dataset.src;
        wx.previewImage({
            urls: [src]
        })
    },

})
