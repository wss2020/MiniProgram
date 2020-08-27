// pages/auth/register/register.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tel: '',
        index:0,
        sheng: ['请选择','北京市', '上海市', '天津市', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '河北省', '山西省', '内蒙古自治区', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '辽宁省', '吉林省', '黑龙江省', '海南省', '台湾省', '香港特别行政区', '澳门特别行政区'],
        region:'请选择',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.func.getPromise('/my/info')
            .then(([code, res]) => {
                if (code == 200) {
                    this.setData({name: res.data.nick});
                    if (res.data.mobile.length != 0) {
                        this.setData({tel: res.data.mobile});
                    }
                }
            })


    },

    //更新选择的地址
    bindRegionChange: function (e) {
        console.log(e);
        var index = e.detail.value;
        var region = this.data.sheng[index];
        this.setData({region: region});
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    formsubmit: function (e) {

        console.log(e);

        var name = this.data.name;
        var tel = e.detail.value.tel;
        var industry = e.detail.value.industry;
        var region = this.data.sheng[e.detail.value.region];
        var company = e.detail.value.company;
        var formId = e.detail.formId;
        if (tel.length == 0) {
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 1500,
                mask: true,
            })
            return;
        } else if (company.length == 0) {
            wx.showToast({
                title: '公司名称不能为空',
                icon: 'none',
                duration: 1500,
                mask: true,
            })
            return;
        }else if (industry.length == 0) {
            wx.showToast({
                title: '你未选择行业',
                icon: 'none',
                duration: 1500,
                mask: true,
            })
            return;
        }else if (region == '请选择') {
            wx.showToast({
                title: '你未选择公司区域',
                icon: 'none',
                duration: 1500,
                mask: true,
            })
            return;
        } else {
            var promise = app.func.resolve();
            wx.showLoading({title: '注册中'});
            var that = this;
            promise.then(function () {
                return app.func.postPromise('/register?form_id=' + formId,
                    {
                        name: name,
                        tel: tel,
                        company: company,
                        industry: industry,
                        region: region,
                    })
                    .then(([code, res]) => {
                        wx.hideLoading();
                        if (code == 200) {
                            wx.showToast({
                                title: '注册成功',
                                icon: 'success',
                                duration: 1000,
                                mask: true,
                                success(res) {
                                    setTimeout(function () {
                                        wx.switchTab({
                                            url: '/pages/about/about'
                                        })
                                    }, 1500)
                                }
                            })
                        } else if (code == 1006) {
                            wx.showToast({
                                title: '该手机号已被注册',
                                icon: 'none',
                                duration: 2000,
                                mask: true,
                                success(res) {
                                }
                            })
                        } else {
                            wx.showToast({
                                title: res.message,
                                icon: 'none',
                                duration: 2000,
                                mask: true,
                                success(res) {
                                }
                            })
                        }
                    })
            });
        }
    },


})
