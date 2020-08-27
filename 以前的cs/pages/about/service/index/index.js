//获取应用实例
const app = getApp();

Page({

  data: {
    rooms: []
  },
  onLoad: function (options) {
    app.func.onPageLoad(this, options);
    app.func.on("MSG", this.onMessage);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    app.func.getPromise('/room/list/' + app.sup_id)
        .then(([code, res]) => {
          if (code === 200) {
            let rooms = res.data;
            that.setData({
              rooms: rooms
            });
          }
        });
  },


  gochat: function (e) {
    var form_id = e.detail.formId;
    var roomid = e.currentTarget.dataset.roomid;
    app.func.postPromise('/heartbeat?form_id=' + form_id,)
        .then(([code, res]) => {
          if (code === 200) {
            wx.navigateTo({
              url: '/pages/about/service/index/chat/index?roomid=' + roomid
            });
          }
        })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },

  onMessage: function (msg) {
    wx.vibrateShort();
    var roomid = msg.roomid;
    var rooms = this.data.rooms;
    var that = this;
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      if (room.roomid === roomid) {
        room.unread = room.unread + 1;
        if (msg.type == 1) {
          room.msg = msg.title;
        }
        if (msg.type == 2) {
          room.msg = "[图片消息]";
        }
        if (msg.type == 3) {
          room.msg == "[小程序消息]";
        }
        room.timestr = msg.timestr;
        room.time = msg.time;
        rooms.splice(i, 1);
        rooms = rooms.reverse();
        rooms.push(room);
        rooms = rooms.reverse();
        this.setData({rooms: rooms});
        return;
      }
    }
    app.func.getPromise('/room/info/' + roomid)
        .then(([code, res]) => {
          if(code === 200) {
            var rooms = this.data.rooms;
            for (var i = 0; i < rooms.length; i++) {
              var room = rooms[i];
              if (room.roomid === roomid) {
                that.onMessage(msg);
                return;
              }
            }
            rooms = rooms.reverse();
            rooms.push(res.data);
            rooms = rooms.reverse();
            that.setData({
              rooms: rooms
            }, () => {
              that.onMessage(msg);
            })
          }
        });
  }
})
