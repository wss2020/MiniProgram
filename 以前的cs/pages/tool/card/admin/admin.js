// pages/tool/card/admin/admin.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openlist: '',
        showbox: false,
        openno_index: '',    //选择开卡的下标
        pageEnd: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    onShow: function () {
        this.openlist(0);
    },


    openlist: function (offset) {
        app.func.getPromise('/card/make/' + offset + '?length=20')
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
            this.openlist(offset);
        }
    },


    //查看开卡详情
    detail: function (e) {
        var openlist = this.data.openlist;
        var index = e.currentTarget.dataset.index;
        var cardinfo = JSON.stringify(openlist[index]);
        wx.navigateTo({
            url: '/pages/tool/card/admin/detail/admin-detail/admin-detail?cardinfo=' + cardinfo
        });
    },

    apply_opencard: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({showbox: true, openno_index: index});
    },
    hideshow: function () {
        this.setData({showbox: false});
    },
    //开卡
    opencard: function (e) {
        console.log(e);
        var price = e.detail.value.price;
        var start = e.detail.target.dataset.start;
        var end = e.detail.target.dataset.end;
        if (!price) {
            app.func.toastPromise('请填写销售价');
            return;
        }

        app.func.postPromise('/card/cardlistop',
            {
                type: 1,
                start: start,
                end: end,
                price: price
            })
            .then(([code, res]) => {
                wx.hideLoading();
                if (code == 200) {
                    app.func.toastPromise('开卡成功');
                    this.setData({showbox: false}, this.openlist(0, 20));
                } else {
                    app.func.toastPromise(res.message);
                }
            })
    },

    card_operate: function () {
        wx.navigateTo({
            url: '/pages/tool/card/admin/operate/operate'
        })
    },
    card_query: function () {
        wx.navigateTo({
            url: '/pages/tool/card/admin/query/query'
        })
    },

    mack_card: function () {
        wx.redirectTo({
            url: '/pages/tool/card/make/make'
        })
    },

    admin_card: function () {
        wx.redirectTo({
            url: '/pages/tool/card/admin/admin'
        })
    },

    statistics_card: function () {
        wx.redirectTo({
            url: '/pages/tool/card/statistics/statistics'
        })
    },

    inputvalue: function (e) {
        console.log(e);
    }


})
