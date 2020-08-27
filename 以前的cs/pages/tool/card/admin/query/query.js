// pages/tool/card/admin/query/query.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showquery: false,
        topclass: [],
        status: 0,
        cardlist: {},
        cardStatus: '全部',
        allstatus: ['全部', '未开卡', '已开通', '已置换', '作废'],
        key: '',
        sup_type: '',
        card_type: '',
        start: '',
        end: '',
        pageEnd:false
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.func.getPromise('/card/cardstatus')
            .then(([code, res]) => {
                this.setData({
                    topclass: res.data
                },this.cardlist(0,0));
            });
    },

    //点击头部
    onclass: function (e) {
        var status = e.currentTarget.dataset.status;
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        this.setData({
            status: status,
            key: '',
            sup_type: '',
            card_type: '',
            start: '',
            end: '',
        }, () => this.cardlist(0,status))
    },

    cardlist: function (offset, status, key, sup_type, card_type, start, end) {
        app.func.postPromise('/card/cardlist', {
            length: 20,
            offset: offset,
            key: key,
            sup_type: sup_type,
            card_type: card_type,
            status: status,
            start: start,
            end: end
        }).then(([code, res]) => {
            var cardlist = this.data.cardlist;
            if (offset == 0) {
                cardlist[status] = res.data;
                this.setData({cardlist: cardlist,pageEnd:false});
            }else  if (res.data.length == 0) {
                this.setData({ pageEnd:true });
            } else{
                var tempArray = cardlist[status];
                tempArray = tempArray.concat(res.data);
                cardlist[status] = tempArray;
                this.setData({cardlist: cardlist});
            }
            wx.hideLoading();
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(this.data.pageEnd){
              return;
        }else{
            wx.showLoading({title: '加载更多', mask: true});
            var status = this.data.status;
            var offset = this.data.cardlist[status].length;
            var key = this.data.key;
            var sup_type = this.data.sup_type;
            var card_type = this.data.card_type;
            var start = this.data.start;
            var end = this.data.end;
            this.cardlist(offset, status, key, sup_type, card_type, start, end);
        }
    },

    query: function () {
        this.setData({showquery: true,cardStatus: '全部'});
    },
    hideshow: function () {
        this.setData({showquery: false});
    },
    //更新选择查询范围
    bindRegionChange: function (e) {
        var index = e.detail.value;
        var cardStatus = this.data.allstatus[index];
        this.setData({cardStatus: cardStatus});
    },

    formsubmit: function (e) {
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        var offset = 0;
        var status = e.detail.value.status ? e.detail.value.status : 0;
        var key = e.detail.value.key ? e.detail.value.key : '';
        var sup_type = e.detail.value.suptype ? e.detail.value.suptype : '';
        var card_type = e.detail.value.cardtype ? e.detail.value.cardtype : '';
        var start = e.detail.value.start ? e.detail.value.start : '';
        var end = e.detail.value.end ? e.detail.value.end : '';
        this.setData(
            {
                status: status,
                key:key,
                sup_type:sup_type,
                card_type:card_type,
                start:start,
                end:end,
                showquery: false,},
            this.cardlist(offset, status, key, sup_type, card_type, start, end)
        );
    },
    detail:function(e){
        var index = e.currentTarget.dataset.index;
        var data = JSON.stringify( this.data.cardlist[this.data.status][index]);
        wx.navigateTo({
            url:'/pages/tool/card/admin/detail/query-detail/query-detail?data=' + data
        });
    }


})
