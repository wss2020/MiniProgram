const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authoried: true,
    canshare: false,
    suppliers: null,
    tobind: null
  },


  goindex:function(){
    wx.switchTab({
      url:'/pages/index/index'
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          height: res.screenHeight
        });
      }
    });

    //判断是否授权
    app.func.getuserinfo((userInfo) => {
      this.setData({
        userInfo: userInfo,
        authoried: true
      });
    }, () => {
      console.log('未授权');
      this.setData({
        authoried: false
      });
    });


    console.log(options.scene);
    var scene = options.scene;
    var that = this;
    //取得自己的供应商
    var promise = app.func.getPromise('/supplier/me')
        .then(([code, res]) => {
          if (code === 200) {
            return app.func.promise((resolve) => {
              that.setData({
                suppliers: res.data
              }, () => {
                return resolve(res.data);
              })
            });
          }
          return app.func.reject();
        });

    if (scene != null) {
      //二维码
      promise.then((suppliers) => {
        //二维码信息
        app.func.getPromise('/scene/' + scene)
            .then(([code, res]) => {
              if (code === 200) {
                return [res.data, suppliers];
              }
              return app.func.reject();
            })
            .then(([param, suppliers]) => {
              if (param.supid != null) {
                return [param.supid, suppliers];
              } else {
                return app.func.reject();
              }
            })
            .then(([sup_id, suppliers]) => {
              for (var i = 0; i < suppliers.length; i++) {
                if (suppliers[i].sup_id == sup_id) {
                  that.jump(sup_id);
                  return app.func.reject();
                }
              }
              return sup_id;
            })
            .then((supid) => {
              //二维码对应的供应商信息
              return app.func.getPromise('/supplier/info/' + supid);
            })
            .then(([code, res]) => {
              if (code == 200) {
                that.setData({
                  tobind: res.data
                });
              }
            });
      });
    }else {
      promise.then((suppliers) => {
        if(suppliers.length == 1){
          that.jump(suppliers[0].sup_id);
        }
      });
    }
  },

  //跳转
  jump: function (sup_id) {
    console.log("jump" + sup_id);
    app.sup_id = sup_id;
    app.func.startWebSocket(sup_id);
    wx.navigateTo({url: "/pages/about/service/index/index"});
  },

  switch: function (e) {
    var sup_id = e.currentTarget.dataset.sup_id;
    this.jump(sup_id);
  },

  //解绑
  unbind: function (e) {
    var sup_id = e.currentTarget.dataset.sup_id;
    var that = this;
    app.func.postPromise('/supplier/unbind', {
      sup_id: sup_id
    }).then(([code, res]) => {
      if (code === 200) {
        that.setData({
          tobind: null
        }, () => {
          return app.func.toastPromise("解绑成功")
        });
      }
    }).then(() => {
      return app.func.getPromise('/supplier/me')
    }).then(([code, res]) => {
      if (code === 200) {
        return app.func.promise((resolve) => {
          that.setData({
            suppliers: res.data
          }, () => {
            return resolve(res.data);
          })
        });
      }
      return app.func.reject();
    });
  },

  //绑定
  bind: function (e) {
    console.log(e);
    var formid = e.detail.formId;
    var tobind = this.data.tobind;
    var that = this;
    if (tobind != null) {
      wx.showModal({
        title: "绑定账户",
        content: tobind.name,
        success(res) {
          if (res.confirm) {
            app.func.postPromise('/supplier/bind?form_id='+ formid , {
              sup_id: tobind.sup_id
            }).then(([code, res]) => {
              if (code === 200) {
                that.setData({
                  tobind: null
                }, () => {
                  app.func.toastPromise("绑定成功").then(() => {
                    that.jump(tobind.sup_id);
                  })
                });
              }
            });
          }
        }
      });
    }
  },

  //授权登录
  bindGetUserInfo: function (e) {
    // console.log(e);
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        authoried: true
      });
      app.func.ongetuserinfo(e.detail.userInfo);
      // this.onLoad();
    } else {
      return false;
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})
