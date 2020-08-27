// pages/auth/attestation/attestation.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imglist: [],
        imglist1: [],
        info:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.func.getPromise('/user/authinfo')
            .then(([code,res])=>{
                if(res.data.status == 4){
                    this.setData({info:res.data});
                }
            })
    },

    img_w_show: function () {
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                console.log(res);
                that.setData({
                    imglist: res.tempFilePaths
                })

            }
        })
    },
    img_w_show1: function () {
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                console.log(res);
                that.setData({
                    imglist1: res.tempFilePaths
                })

            }
        })
    },
    //图片点击事件
    imgYu: function (e) {
        var src = e.currentTarget.dataset.src;
        wx.previewImage({
            urls: [src]
        })
    },


    formsubmit: function (e) {
        var company = e.detail.value.company;
        var tel = e.detail.value.tel;
        var taxno = e.detail.value.taxno;
        var bank = e.detail.value.bank;
        var address = e.detail.value.address;
        var account = e.detail.value.account;
        var license = e.detail.value.license;
        var ticket_tel = e.detail.value.ticket_tel;
        var ticket_address = e.detail.value.ticket_address;
        if(false){}
        if (company.length == 0) {
            app.func.toastPromise('公司名不能为空');
            return;
        }
        else if (tel.length == 0) {
            app.func.toastPromise('公司电话不能为空');
            return;
        } else if (address.length == 0) {
            app.func.toastPromise('公司地址不能为空');
            return;
        } else if (taxno.length == 0) {
            app.func.toastPromise('纳税人识别号不能为空');
            return;
        } else if (bank.length == 0) {
            app.func.toastPromise('开户行不能为空');
            return;
        } else if (account.length == 0) {
            app.func.toastPromise('账号不能为空');
            return;
        } else if (license.length == 0) {
            app.func.toastPromise('财务联系人姓名不能为空');
            return;
        } else if (ticket_tel.length == 0) {
            app.func.toastPromise('财务联系电话不能为空');
            return;
        } else if (ticket_address.length == 0) {
            app.func.toastPromise('收税人地址不能为空');
            return;
        }
        else {
            wx.showLoading({title: '提交中'});
            var uploadimg;
            var uploadimg1;
            var info = this.data.info;
            var promise = app.func.resolve();
            promise = promise.then(() => {
                let imglist = this.data.imglist[0];
                if (imglist) {
                    console.log(11);
                    return app.func.uploadPromise("/v2/image/upload", imglist, 'file',).then(function ([code, res]) {
                        if (code == 3102 || code == 3103) {
                            return app.func.toastPromise('图片内容违规').then((resolve, reject) => {
                                reject();
                            });
                        } else {
                            uploadimg = res.data;
                            console.log(uploadimg);
                        }
                    });
                } else if(info.business_license){
                    uploadimg = info.business_license;
                }else{
                    console.log('xx1');
                }
            });
            promise = promise.then(() => {
                let imglist1 = this.data.imglist1[0];
                if (imglist1) {
                    return app.func.uploadPromise("/v2/image/upload", imglist1, 'file',).then(function ([code, res]) {
                        if (code == 3102 || code == 3103) {
                            return app.func.toastPromise('图片内容违规').then((resolve, reject) => {
                                reject();
                            });
                        } else {
                            uploadimg1 = res.data;
                        }
                    });
                } else if(info.taxpayer_license){
                    uploadimg1 = info.taxpayer_license;
                } else { console.log('xx2'); }
            });
            promise.then(() => {
                app.func.postPromise('/user/auth',
                    {
                        cy_company: company,
                        cy_tel: tel,
                        cy_address: address,
                        cy_taxno: taxno,
                        cy_bank: bank,
                        cy_account: account,
                        cy_business_license: uploadimg,
                        cy_taxpayer_license: uploadimg1,
                        cy_finance_name: license,
                        cy_ticket_tel: ticket_tel,
                        cy_ticket_address: ticket_address
                    })
                    .then(([code, res]) => {
                        wx.hideLoading();
                        var log_id = res.data;
                        if (code == 200) {
                            wx.showToast({
                                title: '提交成功',
                                icon: 'success',
                                duration: 1000,
                                mask: true,
                                success(res) {
                                    setTimeout(function () {
                                        wx.switchTab({
                                            url:'/pages/about/about'
                                        })
                                    }, 1500)
                                }
                            })
                        } else {
                            app.func.toastPromise(res.message)
                        }
                    })
            })
        }
    },

})
