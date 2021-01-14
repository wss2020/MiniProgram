const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  lifetimes: {
    attached() {
      this.setSessionFrom()
      // app.checkAuth().then(() => {
      //   this.setData({
      //     showAuthBtn: false
      //   })
      // }).catch(() => {
      //   this.setData({
      //     showAuthBtn: true
      //   })
      // })
    }
  },
  methods: {
    onCustomerAuth(e) {
      if (e.detail.errMsg === 'getUserInfo:ok') {
        // 设置客服信息
        this.setSessionFrom(e.detail.rawData)
        // 注册成功
        app.register().then((res) => {
          if (res.unionId) {
            this.setData({
              showAuthBtn: false
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '获取unionid失败,请重试',
              showCancel: false
            })
          }
        })
      } else {
        wx.showToast({
          title: '请先授权，以便后续操作',
          icon: 'none',
          duration: 1500
        })
      }
    },
    onGotUserInfo(e) {
      if (e.detail.errMsg === 'getUserInfo:ok') {
        try {
          // 设置客服信息
          this.setSessionFrom(e.detail.rawData)
        } catch (error) {
          console.log(error);
        }
        // 注册成功
        app.register().then((res) => {
          if (res.unionId) {
            this.setData({
              showAuthBtn: false
            })
            this.onbook()
          } else {
            wx.showModal({
              title: '提示',
              content: '获取unionid失败,请重试',
              showCancel: false
            })
          }
        })
      } else {
        wx.showToast({
          title: '请先授权，以便后续操作',
          icon: 'none',
          duration: 1500
        })
      }
    },
    setSessionFrom(info) {
      let userinfo = info || wx.getStorageSync('userInfo')
      if (userinfo) {
        userinfo = JSON.parse(userinfo)
        userinfo.unionId = wx.getStorageSync('unionid') || ''
        this.setData({
          sessionFrom: JSON.stringify(userinfo)
        })
      }
    },
    onbook() {
      this.triggerEvent('onbook')
    }
  }
})
