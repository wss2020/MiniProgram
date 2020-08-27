const app = getApp();
// pages/about/balance/balance.js
app.func.page({

    /**
     * 页面的初始数据
     */
    data: {
        showModalStatus: false,
        userInfo: null
    },



    // 接收上一个页面，传过来的参数
    onModal: function (args) {
        this.setData({
            amount: args.amount
        });
        app.func.toastPromise("receive:" + args.amount);
    },


    // 返回上一页面，并且传参数
    showModal: function () {
        this.closeModal(this.data.amount * 2);
    },
























































    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.func.onPageLoad(this, options);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.func.getapi('/my/info?access_token={{access_token}}',
            (code, res, that) => {
                that.setData({
                    userInfo: res.data
                });
            }, (res, that) => {

            }, this);
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

    refill: function () {
        wx.navigateTo({
            url: 'refill/refill?cusid=' + this.data.userInfo.customers[0].cus_id
        })
    },





    // //显示对话框
    // showModal: function () {
    //   wx.navigateTo({
    //     url: 'logs/logs'
    //   })
    // },
})
