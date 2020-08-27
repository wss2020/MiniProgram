// pages/tool/recommending/title/title.js
const  app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:[],   //传过来的logo
    imglist: [],
    log_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.func.getPromise('/plan/info/' + options.log_id)
        .then(([code,res])=>{
          this.setData({
            tel:res.data.tel,
            name:res.data.name,
            title:res.data.title,
            content:res.data.content,
            ["img[0]"]:res.data.logo,
            log_id: options.log_id
          });
        })
  },


  img_w_show: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res);
        that.setData({
          imglist: res.tempFilePaths
        })

      }
    })
  },
  //图片点击事件
  imgYu: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src]
    })
  },

  formsubmit: function (e) {
    console.log(e);
    var title = e.detail.value.title;
    var name = e.detail.value.name;
    var log_id = this.data.log_id;
    var tel = e.detail.value.tel;
    var content = e.detail.value.content;
    if (title.length == 0) {
      wx.showToast({
        title: '方案名称不能为空',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return;
    } else if (name.length == 0) {
      wx.showToast({
        title: '联系人不能为空',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return;
    }else if (tel.length == 0) {
      wx.showToast({
        title: '电话不能为空',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return;
    } else {
      wx.showLoading({title: '修改中'});
      var uploadimg;
      var promise = app.func.resolve();
      promise = promise.then(() => {
        let imglist = this.data.imglist[0];
        let img = this.data.img[0];
        if(imglist){
            // if(img){
            //   uploadimg = img;
            // }else{
              return app.func.uploadPromise("/v2/image/upload", imglist, 'file',).then(function ([code, res]) {
                if(code == 3102 || code == 3103){
                  return app.func.toastPromise('图片内容违规').then((resolve, reject)=>{reject();});
                } else {
                  uploadimg = res.data;
                }
              });
            // }
        }else{
          uploadimg = '';
        }
      });
      promise.then(() => {
        app.func.postPromise('/plan/modify',
            {
              logo: uploadimg,
              title: title,
              name: name,
              tel: tel,
              content: content,
              log_id:log_id
            })
            .then(([code, res]) => {
              wx.hideLoading();
              var log_id = res.data;
              if (code == 200) {
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 1000,
                  mask: true,
                  success(res) {
                    setTimeout(function () {
                      let pages = getCurrentPages();
                      let prevPage = pages[pages.length - 2];
                      prevPage.setData({log_id: log_id});
                      wx.navigateBack({delta: 1,})
                    }, 1500)
                  }
                })
              } else {
                wx.showToast({
                  title: res.message,
                  icon: 'none',
                  duration: 2000,
                  mask: true,
                  success(res) {
                  }
                })
              }
            })
      })
    }
  },

})
