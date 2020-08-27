// pages/tool/card/make/making/making.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardimgs:'',
        cardindex:1,
        cardChoose:['单选', '4选1', '8选1', '12选1', '16选1'],
        scene:[{name:'全部'}, {name:'春节'}, {name:'女神节'}, {name:'端午节'}, {name:'儿童节'},{name:'中秋节'}],
        clickScene:0,
        cardinfo:[],
        showtips:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.cardimgs(1);
    },

    onShow: function (res) {},

   //券样库
    cardimgs:function(index){
        app.func.postPromise('/cardimg/list/' + index)
            .then(([code,res])=>{
                 this.setData({
                     ['cardinfo[' + index + ']'] : res.data,
                     clickScene:0,
                 },this.addnature(res.data));
            })
    },
    addnature:function(data){
        var scene = this.data.scene;
        for(let i=1; i<scene.length; i++){
            scene[i].value = false;
            for(var j=0; j<data.length; j++){
                if(data[j].scene == i){
                    scene[i].value = true;
                }
            }
        }
        this.setData({ scene:scene });
    },


    //选择  几选1
    cardpage:function(e){
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        var index = e.currentTarget.dataset.index;
        this.setData({
            cardindex:index,
        },this.cardimgs(index));
    },
    //选场景
    clickScene:function(e){
        wx.pageScrollTo({scrollTop: 0, duration: 0});
        var index = e.currentTarget.dataset.index;
        this.setData({ clickScene:index });
    },

    selfmake: function (e) {
        wx.navigateTo({
            url: '/pages/tool/card/make/making/selfmake/selfmake'
        })
    },

    makeCard:function(e){
       var amode = e.currentTarget.dataset.amode;
       var bmode = e.currentTarget.dataset.bmode;
       var products = e.currentTarget.dataset.products;
       wx.navigateTo({
           url:'/pages/tool/card/make/making/design/design/design?amode=' + amode + '&bmode=' + bmode + "&products=" + products
       });
    },





    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },



    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

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

    selfstyle: function () {
        this.setData({showbox: true});
    },
    reword: function () {
        this.setData({showbox: false});
    },






})
