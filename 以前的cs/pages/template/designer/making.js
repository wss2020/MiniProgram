var app = getApp();
import BBCode from "./bbcode"

var drawer = require("./drawer");

var product_sort = [];

for (var i = 1; i < 20; i++) {
    product_sort.push('product' + i);
}

Component({
    "options": {
        styleIsolation: 'isolated'
    },
    properties: {
        template: {type: Object, value: {}},
        data: {type: Object, value: {}},
        width: {type: Number, value: 320},
        height: {type: Number, value: 320},
        addpro: {type: Object},
        wizardmode: {type: Boolean, value: false},
        wizardindex: {type: Number, value: 0}
    },
    data: {
        form: {
            show: false,
            multiline: true,
            tooltip: '',
            value: '',
            date: []
        },
        removeArea: {height: 50, show: false, product: null},
        tapable: [],
        drag: {
            mode: false,
            handle: {},
        },
        dropable: [],
        image_buffer: [],
        maxproductid: 0,
        wizard: {
            mode: false
        },
        dateStartTime:''
    },
    lifetimes: {

        //此时这里没有用到
        attached: function () {  console.log("attached"); },

        //在组件在视图层布局完成后执行 这里可以操作，一开始页面传进来的数据。
        ready: function () {
            this.dateStartTime();     // 定义兑换有效期可以选择的开始时间

            this.data.wizard.mode = this.data.wizardmode;   //向导模块是否显示  值为布尔型
            var ctx = wx.createCanvasContext('designer', this);    //创建 canvas 的绘图上下文 CanvasContext 对象
            var that = this;

            //new 一个
            this.data.drawer = new drawer.Drawer(ctx, {
                onFinish: function () {
                    //把当前画布指定区域的内容导出生成指定大小的图片。在 draw() 回调里调用该方法才能保证图片导出成功。
                    wx.canvasToTempFilePath({
                        canvasId: "designer",
                        success(res) {
                            // console.log( '当前画布指定区域生成的图片链接：' +  res.tempFilePath);
                            that.setData({
                                thumbnail: res.tempFilePath
                            }, () => {
                                // 这句话，页面没有监听的函数，接受者
                                // that.triggerEvent('drawFinish', {thumbnail: res.tempFilePath});
                            });
                        },
                        fail(res) {
                            console.log(res);
                        }
                    }, that);
                }
            });
        },

        //每当组件方法抛出错误时执行
        error: function (e) {  console.log(e);  }
    },
    // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容  可忽略
    attached: function () {
    },
    ready: function () {
    },


    observers: {
        "template": function (template) {
            // console.log("组件开始监听，传进来的数据了。。");
            // console.log("template!!!!!");

            this.data.card = new drawer.Card(template);
            this.data.card.on('taptext', (text) => {
                this.changeText(text);
            });
            this.data.card.on('tapimage', (image) => {
                this.changeImage(image);
            });
            this.data.card.on('tapaddproduct', () => {
                this.chooseProduct();
            });
            this.data.card.on('startdrag', (res) => {
                this.startDragProduct(res);
            });
            this.data.card.on('swapproduct', (res) => {
                this.swapProduct(res.product1, res.product2);
            });
            this.data.card.applyData(this.data.data);
            this.redraw();
            this.rewizard();
        },
        "data": function (data) {
            if (this.data.card != null) {
                this.data.card.applyData(data);
                this.rewizard();
                this.redraw();
            }
        },
        "wizardmode": function (wizardmode) {
            this.setData({
                ["wizard.mode"]: wizardmode
            });
        },
        "wizardindex": function (wizardindex) {
            this.rewizard();
        },
        "addpro": function (addpro) {
            if (addpro == null) {
                return;
            }
            var that = this;
            var count = this.data.card.getProductSize();
            for (var i = 0; i < addpro.length; i++) {
                let product = addpro[i];
                that.triggerEvent('dataChanged', {field: "product" + (count + 1), data: product});
                count++;
            }
        }
    },
    methods: {

        //选择商品  笔记有详细介绍，自己看笔记
        chooseProduct: function () {
            var ids = this.data.card.selectProductids();
            let left = this.data.card.maxproductid - ids.length;
            console.log(ids);
            wx.navigateTo({
                url: "/pages/tool/card/make/addproduck/addproduct?id=null&length=&maxcount=" + left + "&ids=" + ids.join(",")
            });
        },

        swapProduct: function(product1, product2) {
            var p1 = this.data.data[product1];
            var p2 = this.data.data[product2];
            this.triggerEvent('dataChanged', {field: product1, data: p2}, {});
            this.triggerEvent('dataChanged', {field: product2, data: p1}, {});
        },

        startDragProduct: function (res) {
            let dropables = this.data.card.getDropables();
            dropables.push({
                left: 0,
                top: this.data.height,
                width: this.data.width,
                height: this.data.removeArea.height,
                over: false,
                cb: () => {
                    var field = this.data.drag.product.field;
                    var product = this.data.data[field];
                    this.setData({
                        ["removeArea.show"]: true,
                        ["removeArea.product"]: product,
                        ["removeArea.field"]: field
                    })
                }
            });
            console.log(dropables);
            this.setData({
                drag: {
                    mode: true,
                    product: res.target.options,
                    handle: {
                        left: res.rect.left,
                        top: res.rect.top,
                        width: res.rect.width,
                        height: res.rect.height
                    },
                    touch: {
                        x: res.touch.x,
                        y: res.touch.y
                    }
                },
                dropable: dropables
            });
        },

        hideshow: function () {
            this.setData({
                ["form.show"]: false,
                ["removeArea.show"]: false
            }, () => {
                this.redraw();
            })
        },

        formsubmit: function (e) {
            var form = this.data.form;
            if (e.detail.value.date0 && e.detail.value.time0) {
                var date = [
                    {title: e.detail.value.date0, time: e.detail.value.time0},
                    {title: e.detail.value.date1, time: e.detail.value.time1},
                    {title: e.detail.value.date2, time: e.detail.value.time2}
                ];
                var value = this.dealDate(date);
                if (value == null) {
                    value = form.value;
                }
            } else {
                var value = e.detail.value.value;
                // if (value == null) {
                //     value = form.value;
                // }
                if (!value || e.detail.value.time0 || e.detail.value.date0) {
                    app.func.toastPromise('必填项，不能为空');
                    return;
                }

            }
            var field = form.field;
            var toupdate1 = 'data.' + field;
            var toupdate2 = 'form.show';
            var that = this;
            this.setData({
                [toupdate1]: value,
                [toupdate2]: false
            }, () => {
                that.triggerEvent('dataChanged', {field: field, data: value, wizard: that.data.wizard.index}, {});
            });
        },

        confirmDelete: function (e) {
            var toset = {["removeArea.show"]: false};
            var field = this.data.removeArea.field;
            var sort2 = product_sort.indexOf(field);
            var changed = [];
            for (var i = sort2; i < product_sort.length; i++) {
                let product = this.data.data[product_sort[i + 1]];
                toset["data." + product_sort[i]] = product;
                changed.push({field: product_sort[i], data: product});
                if (product == null) {
                    break;
                }
            }
            this.setData(toset, () => {
                for (var i = 0; i < changed.length; i++) {
                    this.triggerEvent('dataChanged', changed[i], {});
                }
            });
        },


        rewizard: function () {
            if (this.data.wizard.mode) {
                var area = this.data.card.wizard(this.data.wizardindex);
                if (area != null) {
                    let r1 = area.left * area.top;
                    let r2 = (this.data.width - area.width - area.left) * area.top;
                    let r3 = area.left * (this.data.height - area.height - area.top);
                    let r4 = (this.data.width - area.width - area.left) * (this.data.height - area.height - area.top);
                    let max = Math.max(r1, r2, r3, r4);
                    var arrow = "right-bottom";
                    if (r2 == max) {
                        arrow = "left-bottom";
                    } else {
                        if (r3 == max) {
                            arrow = "right-top";
                        } else {
                            if (r4 == max) {
                                arrow = "left-top";
                            }
                        }
                    }
                    this.setData({
                        ["wizard.mode"]: true,
                        ["wizard.left"]: area.left,
                        ["wizard.top"]: area.top,
                        ["wizard.height"]: area.height,
                        ["wizard.width"]: area.width,
                        ["wizard.arrow"]: arrow,
                        ["wizard.tooltip"]: area.tips,
                        ["wizard.index"]: area.index
                    });
                } else {
                    if (this.data.template.length > 0) {
                        this.triggerEvent('wizardFinish', {});
                    }
                }
            }
        },


        //重画
        redraw: function () {
            if (this.data.promise == null) {
                this.data.promise = this.draw();
            } else {
                this.data.promise = this.data.promise.finally(() => {
                    return this.draw();
                });
            }
        },


        //画图
        draw: function () {
            if (this.data.drawer == null) {
                return app.func.resolve();
            }
            return this.data.card.draw(this.data.drawer);
        },


        changeText: function (text) {
            var value = this.data.data[text.field];
            var date = [];
            if (text.input == 'date') {
                console.log(value);
                date = this.slipDate(value);
            }
            var multiline = text.multiline;
            var tooltip = text.tooltip;
            this.setData({
                form: {
                    show: true,
                    field: text.field,
                    value: value,
                    multiline: multiline,
                    tooltip: tooltip,
                    input: text.input,
                    format: text.format,     // "format": "yyyy年MM月dd日",  模版里面给的
                    date: date
                }
            });
        },


        // 向导
        wizardNext: function (cb) {
            if (this.data.wizard.mode) {
                this.triggerEvent('wizardnext', {
                    index: this.data.wizard.index
                }, {});
            }
            cb();
        },


        //选择图片
        changeImage: function (image) {
            var field = image.field;
            var that = this;
            var toupdate = 'data.' + field;
            var actions = ["选择图片"];
            app.func.promise((resolve, reject) => {
                if (this.data.wizard.mode && image.option === "optional") {
                    actions.push("跳过这步");
                    wx.showActionSheet({
                        itemList: actions,
                        success(res) {
                            resolve(res.tapIndex);
                        },
                        fail: reject
                    });
                } else {
                    resolve(0);
                }
            }).then((tapIndex) => {
                return app.func.promise((resolve, reject) => {
                    switch (tapIndex) {
                        case 0:
                            wx.chooseImage({
                                count: 1,
                                success(res) {
                                    resolve(res.tempFilePaths[0]);
                                },
                                fail: reject
                            });
                            break;
                        case 1:
                            that.wizardNext(reject);
                            break;
                        default:
                            break;
                    }
                });
            }).then((filePath) => {
                that.setData({
                    [toupdate]: filePath,
                }, () => {
                    that.triggerEvent('dataChanged', {
                        field: field,
                        data: filePath,
                        toupload: field,
                        wizard: this.data.wizard.index
                    }, {});
                });
            });
        },



        //开始画矩形
        drawRect: function (ctx, left, top, width, height, color) {
            console.log('开始画矩形');


            if (color == null) {
                color = 'gray';
            }
            var maxWidth = this.data.width;
            // ctx.setLineDash([3, 3], 3);
            ctx.setStrokeStyle(color);
            ctx.setLineWidth(1);
            ctx.beginPath();
            ctx.moveTo(left, top);
            ctx.lineTo(Math.min(left + width, maxWidth), top);
            ctx.lineTo(Math.min(left + width, maxWidth), top + height);
            ctx.lineTo(left, top + height);
            ctx.lineTo(left, top);
            ctx.stroke();
        },


        //点击触发事件   //点击元素触发，这里没有用到
        onTap: function (e) {},
        onTouchStart: function (e) {
            console.log(123);
            console.log(e);
            console.log(456);
        },  //这里没有用到


        // bindlongtap="onLongTap"  bindlongtap 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动
        onLongTap: function (e) {
            if (this.data.wizard.mode) {  //如果此时是 引导图层存在的情况
                return;
            }
            var x = e.touches[0].x;   // 第一个触摸点 距离画布顶部的距离
            var y = e.touches[0].y;   // 第一个触摸点 距离画布左侧的距离
            this.data.card.onLongTap(x, y);
        },


        //bindtouchend="onTouchEnd"   手指触摸动作结束
        onTouchEnd: function (e) {
            var x = e.changedTouches[0].x; // 第一个触摸点 距离画布顶部的距离
            var y = e.changedTouches[0].y; // 第一个触摸点 距离画布左侧的距离
            // 如果向导模式存在,你的手指放的位置，不是当前需要触发的区域，什么都不处理。
            if (this.data.wizard.mode) {
                if (x < this.data.wizard.left || x > this.data.wizard.left + this.data.wizard.width) {
                    console.log('向导模式存在，手机不是在需要处理的区域，当前不需要处理');
                    return;
                }
                if (y < this.data.wizard.top || y > this.data.wizard.top + this.data.wizard.height) {
                    console.log('向导模式存在，手机不是在需要处理的区域，当前不需要处理');
                    return;
                }
            }

            if (this.data.drag.mode) {
                console.log('this.data.drag.mode');


                if (x < 0 || y > this.data.height || x > this.data.width || y < 0) {
                    var field = this.data.drag.product.field;
                    var product = this.data.data[field];
                    this.setData({
                        ["removeArea.show"]: true,
                        ["removeArea.product"]: product,
                        ["removeArea.field"]: field
                    });
                } else {
                    var dropables = this.data.dropable;
                    for (let i = 0; i < dropables.length; i++) {
                        var dropable = dropables[i];
                        if (x > dropable.left && x < dropable.left + dropable.width && y > dropable.top && y < dropable.top + dropable.height) {
                            dropable.cb(x, y, this.data.drag.product);
                            break;
                        }
                    }
                }
                this.setData({
                    ["drag.mode"]: false,
                    ["drag.over.drop"]: false
                })
            } else {
                this.data.card.onTap(x, y);
            }
        },


        //bindtouchmove="onTouchMove" 手指触摸后移动
        onTouchMove: function (e) {
            if (this.data.drag.mode) {
                var x = e.touches[0].x;
                var y = e.touches[0].y;

                // console.log('x:' + x);
                // console.log('y:' + y);
                //
                // console.log('this.data.drag.touch.x:' + this.data.drag.touch.x);
                // console.log('this.data.drag.touch.y:' + this.data.drag.touch.y);

                var dx = x - this.data.drag.touch.x;
                var dy = y - this.data.drag.touch.y;

                // console.log('dx:' + dx);
                // console.log('dy:' + dy);
                if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {   //如果x，y 轴上移动都小于10，不画图
                    return;
                }
                var that = this;
                var toset = {
                    ["drag.touch"]: {x: x, y: y},
                    ["drag.handle.left"]: this.data.drag.handle.left + dx,
                    ["drag.handle.top"]: this.data.drag.handle.top + dy
                };
                var dropables = this.data.dropable;
                for (var i = 0; i < dropables.length; i++) {
                    var dropable = dropables[i];
                    if (x > dropable.left && x < dropable.left + dropable.width && y > dropable.top && y < dropable.top + dropable.height) {
                        dropable.over = true;
                    } else {
                        dropable.over = false;
                    }
                }
                // toset["drag.over.drop"] = false;
                toset["dropable"] = dropables;
                this.setData(toset);
            }
        },


        formDateChange: function (res) {
            //处理时间，比如： res.detail.value 给的是 2020-09-01，   经过处理  value 为 2020年09月01日

            var index = res.currentTarget.dataset.index;
            var value = this.yymmdd(res.detail.value);
            this.setData({
                ['form.date[' + index + '].time']: value      //界面上，显示当前处理过的时间，2020年09月01日
            });

        },


        //年月日   传进来的 value 是  2020-09-01，  处理之后 value 是  2020年09月01日
        yymmdd: function (value) {
            var parts = value.split('-');
            var year = parts[0];
            var month = parts[1];
            var day = parts[2];
            var format = this.data.form.format;   // this.data.form.format 为  yyyy年MM月dd日
            if (format != null) {
                value = format.replace('yyyy', year).replace('MM', month).replace('dd', day);
            }
            return value;
        },


        //处理兑换有效期的数据
        dealDate: function (date) {
            var result = "";
            for (var i = 0; i < date.length; i++) {
                var item = date[i];
                if (date[0].title && date[0].time) {
                    if (item.title) {
                        if (item.time) {
                            result = result + item.title + '[color=#cb231c]' + item.time + '[/color]\n';
                        } else {
                            result = result + item.title + '\n';
                        }
                    }
                } else {
                    // app.func.toastPromise('礼品券兑换有效期不能为空');
                    // return;
                }
            }
            return result;
        },


        //解bbcode
        slipText: function (text) {
            var arr = [];
            var handle = {
                onText: function (text) {
                    arr.push(text);
                }
            };
            new BBCode(handle).parse(text);
            return arr;
        },


        // 兑换有效期
        slipDate: function (text) {
            if (!text) {
                return [{title: "1.礼品券兑换有效期至"}];
            }
            var lines = text.split('\n');
            var date = [];
            for (var i = 0; i < lines.length; i++) {
                var parts = this.slipText(lines[i]);
                date.push({title: parts[0], time: parts[1]});
            }
            return date;
        },


        //日期选择期开始时间   默认可以选择的开始日期 为30后之后
        dateStartTime:function () {
            // console.log('计算日期开始时间');
            var time = new Date().getTime() + 60 * 60 * 1000 * 24 * 30;
            var starttime = new Date(time).toISOString().split('T')[0];
            this.setData({ dateStartTime:starttime });
        },



    }
});
