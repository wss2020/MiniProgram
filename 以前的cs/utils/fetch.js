const systemInfo = wx.getSystemInfoSync()
systemInfo.clientType = 'mp'

export default function fetch(url, data = {}, options = {}) {
  let {
    loading = true, toast = true, method = 'GET', successCode = 0, tips = 'msg',loadingText='加载中', header
  } = options
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token');
    let Authorization = token ? `Bearer ${token}` :  '';
    if (loading) {
      wx.showLoading({
        title: loadingText+'...',
        mask: true
      })
    }
    wx.request({
      url,
      data,
      method,
      header: {
        clientInfo: JSON.stringify(systemInfo),
        Authorization: Authorization,
        ...header
      },
      success: res => {
        if (res.statusCode == 200) {
          if (loading) {
            wx.hideLoading()
          }
          resolve(res.data)
        } else {
          // 错误信息监控
          console.error(res);
          wx.hideLoading()
          if (toast) {
            wx.showModal({
              title: '提示',
              content: '服务端异常，请重试',
              showCancel: false
            })
          }
          reject(res)
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '请求超时，请重试',
          showCancel: false
        })
        reject()
      }
    })
  })
}

