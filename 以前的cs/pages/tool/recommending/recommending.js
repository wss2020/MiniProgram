// pages/tool/recommending/recommending.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
        list: '',
        info: '',
        log_id: '',
        showmodify: false,
        proname: '',   //当前修改的商品名称
        proid: '',     //当前修改的商品名id
        procontent:'',
        proprice:'',
        showmodifyprice:false,  //批量修改当前方案价格
        addpricetype:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({log_id: options.log_id})
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var log_id = this.data.log_id;
        app.func.getPromise('/plan/info/' + log_id)
            .then(([code, res]) => {
                this.setData({info: res.data,  addpricetype:0});
            })

        app.func.getPromise('/plan/list/' + log_id)
            .then(([code, res]) => {
                if (code == 200) {
                    this.setData({list: res.data});
                }
            })
    },

    modify_title: function () {
        wx.navigateTo({
            url: '/pages/tool/recommending/title/title?log_id=' + this.data.log_id
        })
    },

    //添加产品
    addproduct: function () {
        var current = this.data.current;
        var list = this.data.list;
        var log_id = this.data.log_id;
        if (list.length == 0) {
            var plan_id = null;
        } else {
            var plan_id = list[current].plan_id;
        }
        wx.navigateTo({
            url: '/pages/tool/recommending/newadddpro/newadddpro?plan_id=' + plan_id + '&current=' + current + '&log_id=' + log_id
        })
    },
    // 添加方案
    addrecommend: function () {
        var current = this.data.list.length;
        var log_id = this.data.log_id;
        var plan_id = null;
        wx.navigateTo({
            url: '/pages/tool/recommending/newadddpro/newadddpro?plan_id=' + plan_id + '&current=' + current + '&log_id=' + log_id
        })
    },
    //删除方案
    deleterecommend: function (e) {
        console.log(e);
        var plan_id = e.currentTarget.dataset.plan_id;
        var index = e.currentTarget.dataset.index;
        var that = this;
        wx.showModal({
            title: '删除方案' + index,
            content: '方案一旦删除，不可恢复',
            success: function (res) {
                if (res.confirm) {
                    app.func.getPromise('/plan/delplan/' + plan_id)
                        .then(([code, res]) => {
                            if (code == 200) {
                                that.refresh(0);
                            }
                        })
                } else {
                    console.log('用户点击取消')
                }
            }
        })

    },
    //选择查看方案
    choose_recommend: function (e) {
        var plan_id = e.currentTarget.dataset.plan_id;
        var index = e.currentTarget.dataset.index;
        this.setData({current: index});
    },
    //删除产品
    delete_product: function (e) {
        var that = this;
        var current = this.data.current;
        var id = e.currentTarget.dataset.id;
        app.func.getPromise('/plan/delplansku/' + id)
            .then(([code, res]) => {
                if (code == 200) {
                    wx.showToast({
                        title: '删除商品成功',
                        icon: 'none',
                        duration: 1000,
                        mask: true,
                        success: function (res) {
                            setTimeout(function () {
                                that.refresh(current);
                            }, 1000)
                        },
                    });
                }
            })
    },


    //刷新页面
    refresh: function (current) {
        this.setData({current: current}, this.onShow());
    },

    open_modify: function (e) {
        var proname = e.currentTarget.dataset.proname;
        var proprice = e.currentTarget.dataset.proprice;
        var procontent = e.currentTarget.dataset.procontent;
        var proid = e.currentTarget.dataset.id;
        this.setData({
            showmodify: true,
            proname: proname,
            proprice: proprice,
            procontent: procontent,
            proid: proid
        });
    },

    // 修改商品
    formsubmit: function (e) {
        var that = this;
        var current = this.data.current;
        var proid = this.data.proid;
        var name = e.detail.value.name;
        var price = e.detail.value.price;
        var content = e.detail.value.content;
        app.func.postPromise('/plan/modifysku',
            {
                id: proid,
                pro_name: name,
                content: content,
                price: price
            }).then(([code, res]) => {
            if (code == 200) {
                wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 1000,
                    mask: true,
                    success(res) {
                        setTimeout(function () {
                            that.setData({ showmodify: false },that.refresh(current));
                        }, 1500)
                    }
                })
            }
        })
    },


    hideshow: function (e) {
        this.setData({showmodify: false, showmodifyprice:false,addpricetype:0});
    },


    //批量加价
    showaddprice:function(){
        this.setData({ showmodifyprice:true });
    },
    radioChange:function(e){
        var index = e.detail.value;
        this.setData({ addpricetype:index });
    },
    addprice:function(e){
          console.log(e);
          var that = this;
          var addpricetype = this.data.addpricetype;
          var current = this.data.current;
          var plan_id = this.data.list[current].plan_id;
          var price_add = e.detail.value.price;
        app.func.postPromise('/plan/modifylist',{
               plan_id: plan_id,
               price_add:price_add,
               price_add_type:addpricetype
          }).then(([code,res])=>{
                   if (code == 200) {
                       wx.showToast({
                           title: '修改成功',
                           icon: 'success',
                           duration: 1000,
                           mask: true,
                           success(res) {
                               setTimeout(function () {
                                   that.setData({ showmodify: false,showmodifyprice:false, },that.refresh(current));
                               }, 1500)
                           }
                       })
                   }
          })
    },



    //检测是否允许生成链接
    check:function () {
         var logid = this.data.log_id;
         app.func.postPromise('/plan/confirm',
             {
                 log_id:logid
             }).then(([code,res])=>{
                 if(code == 2006 || code == 200){
                    wx.switchTab({
                         url:'/pages/tool/tool'
                    })
                 }
             })
    },

    preview:function () {
        var info = this.data.info;
        if(info.pre_link){
            wx.navigateTo({
                url: '/pages/auth/agreement/agreement?src=' + info.pre_link
            })
        }else{
            app.func.toastPromise('方案未完成')
        }
    },

    //查看商品详情
    prodetail:function (e) {
        var id = e.currentTarget.dataset.skuid;
        wx.navigateTo({
            url: '/pages/index/productdetail/productdetail?id=' + id
        })
    },

})
