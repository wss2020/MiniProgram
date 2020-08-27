// pages/about/userinfo/userinfo.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    giftsID:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.gid){
      this.setData({
        giftsID: options.gid
      }) 
    }
  },
  getUserInfo: function (e) {
    //console.log(e)    
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      wx.setStorageSync('userInfo', e.detail.userInfo);
      var that = this;
      app.func.req('/Login/update', {
        uID: app.globalData.uid,
        token: app.globalData.token,
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl
      }, function (res) {
        //console.log(res)
        if (res.success) {
          that.setData({
            giftsID: 0
          })
          wx.navigateBack({
            delta: 1
          })
        } else {    
          that.onLoad();      
          console.log(res.message)
        }
      });
    } else {
      this.onLoad();
    }
  },
  /**
   * 生命周期函数--监听页面卸载---退出授权页面处理
   */
  onUnload: function () {
    if (this.data.giftsID>0){ //判断来源页面是否从微信点击领取
      const wxCurrPage = getCurrentPages();//获取当前页面的页面栈
      const wxPrevPage = wxCurrPage[wxCurrPage.length - 2];//获取上级页面的page对象
      var that = this;
      app.func.req('/Gifts/giftsdelete', { uID: app.globalData.uid, token: app.globalData.token, giftsID: that.data.giftsID }, function (res) {
        //console.log(res)          
          if (wxPrevPage) {
            //修改上级页面的数据
            wxPrevPage.setData({
              hasSucInfo: false,
              Tishimeg: '需要授权登录，才能领取礼物'  //设置上级页面的数据
            })
          }
      }); 
      
    }
  }

})