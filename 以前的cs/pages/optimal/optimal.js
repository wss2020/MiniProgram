// pages/optimal/optimal.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        productlist: '',
        bottom_tap: false,
        checkpro:'',
        showdel:false,
        unpro:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.optimal(0);
    },

    optimal:function(offent){
        app.func.getPromise('/product/choose2/'+ offent +'?length=10')
            .then(([code, res]) => {
                if(offent ==  0){
                    if(res.data.length == 0){
                        this.setData({ unpro:true});
                    }else{
                        this.setData({ unpro:false});
                    }
                    this.setData({
                        productlist: res.data, bottom_tap: false, checkpro:'',
                    });
                }else if(res.data.length == 0){
                    this.setData({ bottom_tap: true});
                }else{
                    var tempArray = this.data.productlist;
                    tempArray = tempArray.concat(res.data);
                    // let tempArray = [...this.data.productlist,...res.data];
                    this.setData({productlist: tempArray});
                }
                wx.hideLoading();
            })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.bottom_tap) {
            this.setData({  bottom_tap: true });
        } else {
            wx.showLoading({  title: '加载更多', mask: true });
            var productlist = this.data.productlist;
            this.optimal(productlist.length);
        }
    },

    //产品单删除
    delete_product: function (e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        console.log(id);
        wx.showModal({
            title: '删除优选',
            content: '优选一旦删除，可从商品详情重新添加',
            success: function (res) {
                if (res.confirm) {
                    app.func.getPromise('/product/delchoose/'+id)
                        .then(([code, res]) => {
                            if(code == 200){that.optimal(0);}
                        })
                } else {
                    console.log('用户点击取消')
                }

            }
        })
    },

   //批量删除
    choosedel:function(){
        this.setData({showdel:true});
    },
    canceldel:function(){
        this.setData({showdel:false,checkpro:''});
    },
    checkboxChange:function(e){
        var pro = e.detail.value;
        this.setData({ checkpro: pro });
    },
    delCheck:function () {
        var checkpro = this.data.checkpro;
        console.log(checkpro);
        if(checkpro.length == 0){
            app.func.toastPromise('请选择商品');
            return;
        }
        app.func.postPromise('/product/batchdelchoose',{
             sku:checkpro
        }).then(([code,res])=>{
             if(code == 200){
                 wx.pageScrollTo({scrollTop: 0, duration: 0});
                 app.func.toastPromise('删除成功');
                this.setData({
                    showdel:false
                },this.optimal(0));
             }else{
                 app.func.toastPromise(res.message);
             }
        })

    },

    addpro:function(){
       wx.navigateTo({
           url:'/pages/index/categorysku/categorysku'
       })
    },

    //商品详情
    productdetail: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/index/productdetail/productdetail?id=' + id
        })
    },
    //货源说明
    product_info:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/index/productdetail/product-description/product-description?id=' + id
        })
    },
    //购买
    apply:function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url:'/pages/gifts/pages/order/order?id=' + id
        })
    },


})
