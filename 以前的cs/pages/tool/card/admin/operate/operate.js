// pages/tool/card/admin/operate/operate.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openlist: '',
        startvalue: '',
        endvalue: '',
        pageEnd: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.openlist(0, 20);
    },


    openlist: function (offset, length) {
        app.func.getPromise('/card/openlog/' + offset + '?length=' + length)
            .then(([code, res]) => {
                wx.hideLoading();
                if (offset == 0) {
                    this.setData({openlist: res.data});
                } else if (res.data.length == 0) {
                    this.setData({pageEnd: true});
                } else {
                    var tempArray = this.data.openlist;
                    tempArray = tempArray.concat(res.data);
                    this.setData({openlist: tempArray});
                }
            })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.pageEnd) {
              return;
        } else {
            wx.showLoading({title: '加载更多', mask: true});
            var offset = this.data.openlist.length;
            this.openlist(offset, 20);
        }
    },

    formsubmit: function (e) {
        var type = e.detail.target.dataset.type;
        var startno = e.detail.value.startno;
        var endno = e.detail.value.endno;
        if (startno.length == 0) {
            app.func.toastPromise('请输入开始卡号');
            return;
        } else if (endno.length == 0) {
            app.func.toastPromise('请输入结束卡号');
            return;
        } else {
            if(type == 1){
                var price = e.detail.value.price;
                if(!price){
                    app.func.toastPromise('请填写销售价');
                    return;
                }
                this.opencard1(type, startno, endno, price);
            }else{
                this.opencard(type, startno, endno);
            }

        }
    },

    opencard1: function (type, startno, endno,price) {
        var that = this;
        wx.showLoading({title: '执行中'});
        app.func.postPromise('/card/cardlistop',
            {
                type: type,
                start: startno,
                end: endno,
                price:price
            })
            .then(([code, res]) => {
                wx.hideLoading();
                if (code == 200) {
                        app.func.toastPromise('开卡成功');
                    this.setData({startvalue: '', endvalue: ''}, this.openlist(0, 20));
                } else {
                    app.func.toastPromise(res.message);
                }
            })
    },

    opencard: function (type, startno, endno) {
        var that = this;
        wx.showLoading({title: '执行中'});
        app.func.postPromise('/card/cardlistop',
            {
                type: type,
                start: startno,
                end: endno
            })
            .then(([code, res]) => {
                wx.hideLoading();
                if (code == 200) {
                    if (type == 2) {
                        app.func.toastPromise('退卡成功');
                    } else {
                        app.func.toastPromise('废卡成功');
                    }
                    this.setData({startvalue: '', endvalue: ''}, this.openlist(0, 20));
                } else {
                    app.func.toastPromise(res.message);
                }
            })
    }

})
