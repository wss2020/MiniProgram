const app = getApp();

// pages/index/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomid: null,
    messages: [],
    lastmsgid: null,
    room: null,
    inputvalue: '',
    showbtn: 1,         // 1选择相册  2发送信息
    inputHeight: 0,      //默认键盘高度
    focus: false,       // 是否为聚焦事件
    itemid: '',          // 滑动到哪个id所在位置
    messageheight: '',    //信息的高度
    windowHeight: ''      //屏幕的高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({roomid: options.roomid});
    var roomid = this.data.roomid;
    app.func.getPromise('/room/enter/' + roomid)
        .then(([code, res]) => {
          if (code === 200) {
            wx.setNavigationBarTitle({title: res.data.user.nick});
            this.setData({
              room: res.data
            });
            wx.showLoading({
              title: '加载中',
            })
          }
        })
        .then(() => {
          return app.func.getPromise("/room/unread/" + roomid)
        })
        .then(([code, res]) => {
          if (code === 200) {
            this.setData({
              messages: res.data
            });
          }
        });


    var that = this;
    wx.getSystemInfo({
      success(res) {
        console.log(res);
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
    setTimeout(function () {
      that.messageheight();
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var roomid = this.data.roomid;
    var fs = wx.getFileSystemManager();
    fs.readFile({
      filePath: wx.env.USER_DATA_PATH + "/" + roomid + '.txt',
      encoding: 'utf8',
      success(res) {
        var data = JSON.parse(res.data);
        console.log(data);
      }
    });

    app.func.on("MSG_ROOM_" + roomid, this.onMessage);
  },

  onHide: function () {
    console.log("onHide");
    var roomid = this.data.roomid;
    app.func.off("MSG_ROOM_" + roomid);
  },

  onUnload: function () {
    console.log("onUnload");
    var roomid = this.data.roomid;
    app.func.off("MSG_ROOM_" + roomid);
  },

  send: function (e) {
    console.log(e);
    this.sendconfirm(e.detail.formId);
  },

  //监听内容
  layoutvalue: function (e) {
    var inputvalue = e.detail.value;
    if (inputvalue.length > 0) {
      this.setData({showbtn: 2});
    } else {
      this.setData({showbtn: 1});
    }
    this.setData({
      inputvalue: inputvalue
    });
  },

  sendconfirm: function () {
    var message = this.data.inputvalue;
    var that = this;
    // console.log(this.data.messageheight);
    // console.log(this.data.windowHeight);
    app.func.postPromise('/room/send/' + this.data.roomid,
        {"message": message})
        .then(([code, res]) => {
          if (code === 200) {
            var messages = that.data.messages;
            messages.push(res.data);
            that.setData({messages: messages, inputvalue: '', showbtn: 1, focus: true});
            that.messageheight();
            that.wirteFile();
          }
        })
  },

  sendpic: function (e) {
    var roomid = this.data.roomid;
    var that = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        console.log(res);
        app.func.uploadPromise('/room/pic/' + roomid, res.tempFilePaths[0], "file")
            .then(([code, res]) => {
              console.log(res);
              if (code === 200) {
                var messages = that.data.messages;
                messages.push(res.data);
                that.setData({
                  messages: messages
                });
                that.messageheight();
                that.wirteFile();
              }
            });
      },
      fail(res) {
        console.log('出错了');
        console.log(res);
      }
    });
  },


  messageheight: function () {
    var that = this;
    var windowHeight = that.data.windowHeight;
    wx.createSelectorQuery().select('.messageheight').boundingClientRect(function (rect) {
      console.log(rect);
      if (rect.height > windowHeight) {
        that.setData({itemid: 'bottomid'});
      }
      that.setData({
        showpage:true
      }, wx.hideLoading() );
    }).exec()
  },

  wirteFile: function () {
    var filename = this.data.roomid;
    var message = this.data.messages;
    if (message.length > 500) {
      message = message.slice(-500);
    }
    message = JSON.stringify(message);
    var fs = wx.getFileSystemManager();
    fs.writeFile({
      filePath: wx.env.USER_DATA_PATH + "/" + filename + '.txt',
      data: message,
      success(res) {
        console.log('写入成功');
      },
      fail(res) {
        console.log('写入失败');
      }
    });
  },

  //预览图片
  previewImg: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  //查看订单
  tapcard: function (e) {
    var page = e.currentTarget.dataset.page;
    wx.navigateTo({url: "/" + page});
  },

  onMessage: function (res) {
    try {
      var messages = this.data.messages;
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].id === res.id) {
          return;
        }
      }
      messages.push(res);
      messages.sort((m1, m2) => {
        return m1.time - m2.time;
      });
      this.setData({
        messages: messages
      });
      this.messageheight();
      this.wirteFile();
    } finally {
      app.func.send("MSG-ACK", {id: res.id});
    }
  }
})
;
