var rootDocment = 'https://www.dianlinet.com/weixin';//你的域名
function req(url, data, cb) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    // url: rootDocment + url,
    url: url,
    data: data,
    method: 'post',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    success: function (res) {      
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    },complete:function(){
      wx.hideLoading(); //隐藏加载控件
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新
    }
  })
}


module.exports = {
  req: req
}  
