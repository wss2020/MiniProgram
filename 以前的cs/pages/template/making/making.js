var app = getApp();

Component({
    "options": {
        styleIsolation: 'isolated'
    },
    properties: {
        template: {type: Object, value: {}},
        data: {type: Object, value: {}}
    },
    data: {
        form: {
            show: false,
            multiline: true,
            tooltip: '',
            value: ''
        }
    },
    lifetimes: {
        attached: function () {
        },
        ready() {
        }
    },
    // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
    attached: function () {
    },
    observers: {},
    methods: {
        tapImg: function (e) {
            var field = e.currentTarget.dataset.field;
            var that = this;
            var toupdate = 'data.' + field;
            wx.chooseImage({
                count: 1,
                success(res) {
                    app.func.uploadPromise("/v2/image/upload", res.tempFilePaths[0], 'file',).then(function ([code, res]) {
                        if (code == 3102 || code == 3103) {
                            return app.func.toastPromise('图片内容违规').then((resolve, reject) => {
                                reject();
                            });
                        } else {
                            that.setData({
                                [toupdate]: res.data
                            }, () => {
                                that.triggerEvent('dataChanged', that.data.data, {});
                            });
                        }
                    });
                }
            })
        },
        tapText: function (e) {
            var field = e.currentTarget.dataset.field;
            var value = this.data.data[field];
            var multiline = e.currentTarget.dataset.multiline;
            var tooltip = e.currentTarget.dataset.tooltip;
            this.setData({
                form: {
                    show: true,
                    field: field,
                    value: value,
                    multiline: multiline,
                    tooltip: tooltip
                }
            })
        },
        hideshow: function () {
            var toupdate = "form.show";
            this.setData({
                [toupdate]: false
            })
        },
        formsubmit: function (e) {
            var form = this.data.form;
            var value = e.detail.value.value;
            var field = form.field;
            var toupdate1 = 'data.' + field;
            var toupdate2 = 'form.show';
            this.setData({
                [toupdate1]: value,
                [toupdate2]: false
            }, () => {
                this.triggerEvent('dataChanged', this.data.data, {});
            });
        }
    }
});
