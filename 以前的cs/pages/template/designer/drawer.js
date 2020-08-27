import Promise from '../../../service/es6-promise.min.js';   //引入了  promise

var events = require('../../../service/events');   //引入了 events
import BBCode from "./bbcode"                      //引入了 bbcode

var blank_image = "/image/blank.jpg";          //商品图片不存在时，用这张图片代替

String.prototype.startWith = function (str) {     // String 的原型链上，添加了 方法 startWith
    var reg = new RegExp("^" + str);
    return reg.test(this);
}

function promise_resolve(val) {
    return new Promise(function (resolve, reject) {
        resolve(val);
    });
}

function drawFieldBorder(drawer, options) {      //画文件边框
    var color = options.borderColor;
    if (color == null) {
        color = 'gray';
    }
    if (options.option !== 'readonly') {
        drawer.drawRect(color, options.left, options.top, options.width, options.height);
    }
    return 0;
}


//设置 rgb 的值
function rbg2hex(rgb) {
    var parts = rgb.split(',');
    return "rgb(" + parts[0] + "," + parts[1] + "," + parts[2] + ")";
}

var Card = class {    //创建一个类   类名叫Card
    constructor(options) {
        this.options = options;  // options 页面的每一个区域组成的数据集合， 比如：A面 二折页 就是 2 个区域组成的数据集合，  B面16个产品，3折页，也是3个区域数据组成的集合
        this.areas = [];
        for (let i = 0; i < options.length; i++) {
            this.add(   new Area(options[i], this)   );       //this 指当前的 Card
            // console.log( 'this.areas:' +  this.areas );
        }

        this.maxproductid = this.getMaxProductId();    //获取当前商品数量
        this.event = new events.EventEmitter();        // 创建 eventEmitter 对象  指向  this.event
    }


    // 把处理过的 area 的数据，放到 this.areas 中
    add(area) {
        this.areas.push(area);
    }


    //选择商品  判断当前data数据中，存不存在 product
    selectProductids() {
        let keys = Object.keys(this.data);
        var ids = [];
        for (var key of keys) {
            if (key.startWith("product")) {
                ids.push(this.data[key].id);
            }
        }
        return ids;
    }


    //获取产品数量
    getProductSize() {
        let count = 0;
        let keys = Object.keys(this.data);
        for (var key of keys) {
            if (key.startWith("product")) {
                count++;
            }
        }
        return count;
    }


    //获取当前商品中的 数量
    getMaxProductId() {
        // console.log('获取getMaxProductId');
        // console.log(this.areas);

        var result = 0;
        for (let area of this.areas) {
            // console.log(area);

            var id = area.getMaxProductId();
            // console.log('id:' + id);
            if (id > result) {
                result = id;
            }
        }
        return result;
    }


    //画图
    draw(drawer) {
        var promise = promise_resolve(0);
        for (let area of this.areas) {
            promise = promise.then(() => {
                return area.draw(drawer);
            });
        }
        return promise.then(() => {
            return drawer.finish();
        });
    }


    //引导层
    wizard(index) {
        let wizardarea = null;
        for (let area of this.areas) {
            let _area = area.wizard(index);
            if (_area != null) {
                if (wizardarea == null) {
                    wizardarea = _area;
                } else {
                    if (_area.index < wizardarea.index) {
                        wizardarea = _area;
                    }
                }
            }
        }
        return wizardarea;
    }


    //申请数据
    applyData(data) {
        this.data = data;
        for (let area of this.areas) {
            area.applyData(data);
        }
    }


    //创建，监听器
    on(event, cb) {
        this.event.on(event, cb);
    }


    //
    onTap(x, y) {
        for (let area of this.areas) {
            if (y >= area.options.top && y < area.options.top + area.options.height) {
                area.onTap(x, y);
            }
        }
    }


    //广播数据
    fire(event, detail) {
        this.event.emit(event, detail);
    }

    //长按触发
    onLongTap(x, y) {
        for (let area of this.areas) {
            // console.log(  `x:${x},y:${y}`  );
            // console.log(  'this.areas:'  );
            // console.log(  this.areas  );
            // console.log(  'this.areas:'  );

            if (y >= area.options.top && y < area.options.top + area.options.height) {
                // console.log('手指长按了,并且按在了，area 的区域内');
                area.onLongTap(x, y);
            }
        }
    }

    getDropables() {
        var result = [];
        for (let area of this.areas) {
            var dropables = result.concat(area.getDropables());
            for(let dropable of dropables) {
                result.push(dropable);
            }
        }
        return result;
    }
};

var Area = class {            //创建一个类   类名叫Area
    constructor(options, parent) {    // options 一个区域的数据集合    parent 指的是类 Card
        this.options = options;
        this.children = [];
        this.parent = parent;
        if (options.texts != null) {          //一个区域内，所有的文本数据的集合
            for (let i = 0; i < options.texts.length; i++) {
                this.add(new Text(options.texts[i], this));     // this指的是 Area
            }
        }
        if (options.images != null) {         //一个区域内，所有的图片数据的集合
            for (let i = 0; i < options.images.length; i++) {
                this.add(new Image(options.images[i], this));
            }
        }
        if (options.products != null) {        //一个区域内，所有的产品数据的集合
            for (let i = 0; i < options.products.length; i++) {
                this.add(new Product(options.products[i], this));
            }
        }
    }

    add(element) {
        this.children.push(element);
    }

    draw(drawer) {
        var promise = promise_resolve(0);
        promise = promise.then(() => {
            return drawer.drawImage(this.options.background, 0, this.options.top, this.options.width, this.options.height);
        });
        promise = promise.then(() => {
            drawer.translate(0, this.options.top);
        });
        for (let child of this.children) {
            promise = promise.then(() => {
                return drawFieldBorder(drawer, child.options);
            }).then(() => {
                return child.draw(drawer);
            });
        }
        return promise.finally(() => {
            drawer.restore();
        });
    }

    wizard(index) {
        let wizardarea = null;
        for (let child of this.children) {
            let option = child.options;
            if (option.wizardindex <= index) {
                continue;
            }
            if (option.option === 'readonly') {
                continue;
            }
            if (child.wizardable != null) {
                if (!child.wizardable()) {
                    continue;
                }
            }
            let _area = {
                left: option.left,
                top: option.top + this.options.top,
                width: option.width,
                height: option.height,
                index: option.wizardindex,
                tips: child.getWizardTips()
            };
            if (wizardarea == null) {
                wizardarea = _area;
            } else {
                if (_area.index < wizardarea.index) {
                    wizardarea = _area;
                }
            }
        }
        return wizardarea;
    }

    applyData(data) {
        this.data = data;
        for (let child of this.children) {
            if (child.applyData != null) {
                child.applyData(data[child.options.field]);
            } else {
                if (data[child.options.field] != null) {
                    child.data = data[child.options.field];
                } else {
                    if (child.data != null) {
                        delete child.data;
                    }
                }
            }
        }
    }

    onTap(x, y) {
        y = y - this.options.top;
        for (let child of this.children) {
            if (y < child.options.top || y >= child.options.top + child.options.height) {
                continue;
            }
            if (x < child.options.left || x >= child.options.left + child.options.width) {
                continue;
            }
            child.onTap(x, y);
        }
    }

    getLeft() {
        return this.options.left;
    }

    getTop() {
        return this.options.top;
    }


    //长按触发
    onLongTap(x, y) {     //x,y 当前触摸点距离 画布，左侧，上侧的距离
        // console.log(this);    // 这里的 this 数 this.area 引用的这个函数， 所以this 指向当前的 Area，
        // console.log(y);
        // console.log(this.options.top);  //this.options.top 指的是，当前的 Area 距离画布顶部的距离
        y = y - this.options.top;

        // console.log(this);
        //for 循环的前两个 if 判断，在当前的 child 中，比如，在B面，child 为 B1,4个商品中的第一个商品区域，如果当前点击区域，不在第一个商品点击区域内，
        //跳到这次循环，执行下一个。
        for (let child of this.children) {
            if (y < child.options.top || y >= child.options.top + child.options.height) {
                continue;       //continue只是终止本次循环，接着还执行后面的循环
            }
            if (x < child.options.left || x >= child.options.left + child.options.width) {
                continue;
            }
            if (child.onLongTap != null) {   //如果 child 下的 onLongTap 存在
                child.onLongTap(x, y + this.options.top);
            }
        }
    }

    fire(event, detail) {
        this.parent.fire(event, detail);
    }


    //获取当前数据中，最大的商品数据数量， 比如 product4 获取的是4
    getMaxProductId() {
        // console.log('调用 Area 下 getMaxProductId');

        var result = 0;
        for (let child of this.children) {

            // console.log('child:' + child);

            if (child.options.field.startWith("product")) {
                var id = parseInt(child.options.field.substr(7));
                child.productid = id;
                if (id > result) {
                    result = id;
                }
            }
        }
        return result;
    }

    getDropables() {
        var result = [];
        for (let child of this.children) {
            if (child.getDropable != null) {
                let dropable = child.getDropable();
                if(dropable != null) {
                    result.push(dropable);
                }
            }
        }
        return result;
    }
};

var Text = class {            // 创建一个类  类名叫 Test
    constructor(options, parent) {       // 一个区域内，文字 文本集合下的 一组数据，   parent  指的是 类 Area
        this.options = options;
        this.parent = parent;
    }

    //获取 向导 提示文字和下标
    getWizardTips() {
        if (this.options.wizardtip != null) {
            return this.options.wizardindex + "." + this.options.wizardtip;
        } else {
            return this.options.wizardindex + ".点击编辑" + this.options.tooltip;
        }
    }


    // 画图
    draw(drawer) {
        var that = this;
        var text = this.options;
        var value = this.data;
        if (value != null && value.length > 0) {
            drawer.setFont(text.font);
            if (text.color) {
                drawer.setFontColor(rbg2hex(text.color));
            }
            if (text.multiline) {
                let lines = value.split('\n');
                let base = text.top;
                let linebreak = text.font;
                if (text.linebreak != null) {
                    linebreak = text.linebreak;
                }
                let totalheight = lines.length * text.font + linebreak * (lines.length - 1);
                if (totalheight < text.height) {
                    if (text.valign === 'bottom') {
                        base = base + text.height - totalheight;
                    }
                    if (text.valign === 'middle') {
                        base = base + (text.height - totalheight) / 2;
                    }
                }
                for (let i in lines) {
                    var line = lines[i];
                    if (base + text.font > text.top + text.height) {
                        break;
                    }
                    let m = drawer.measureText(line);
                    let left = text.left;
                    if (text.align === "right") {
                        left = left + Math.max(text.width - m.width, 0);
                    }
                    if (text.align === "center") {
                        left = left + Math.max((text.width - m.width) / 2, 0);
                    }
                    drawer.drawText(line, left, base, text.width);
                    base = base + linebreak + text.font;
                }
            } else {
                let m = drawer.measureText(value);
                let left = text.left;
                if (text.align === "right") {
                    left = left + Math.max(text.width - m.width, 0);
                }
                if (text.align === "center") {
                    left = left + Math.max((text.width - m.width) / 2, 0);
                }
                drawer.drawText(value, left, text.top, text.width);
            }
        }
    }

    onTap(x, y) {
        this.parent.fire('taptext', this.options);
    }
};

var Image = class {
    constructor(options, parent) {
        this.options = options;
        this.parent = parent;
    }

    getWizardTips() {
        if (this.options.wizardtip != null) {
            return this.options.wizardindex + "." + this.options.wizardtip;
        } else {
            return this.options.wizardindex + ".点击上传" + this.options.tooltip;
        }
    }

    draw(drawer) {
        if (this.data != null) {
            return drawer.drawImage(this.data, this.options.left, this.options.top, this.options.width, this.options.height);
        }
    }

    onTap(x, y) {
        this.parent.fire('tapimage', this.options);
    }
};

var Product = class {
    constructor(options, parent) {  //options 一个产品的数据集合    parent 指的是类 Area
        // console.log(123);
        // console.log(options);
        // console.log(parent);
        // console.log(456);

        this.options = options;
        this.parent = parent;
        this.children = [];
        if (options.texts != null) {
            for (let i = 0; i < options.texts.length; i++) {
                this.add(new Text(options.texts[i], this));
            }
        }
        if (options.images != null) {
            for (let i = 0; i < options.images.length; i++) {
                this.add(new Image(options.images[i], this));
            }
        }
    }

    getWizardTips() {
        if (this.options.wizardtip != null) {
            return this.options.wizardindex + "." + this.options.wizardtip;
        } else {
            return this.options.wizardindex + ".点击选择产品";
        }
    }

    add(element) {
        this.children.push(element);
    }

    draw(drawer) {
        if (this.data != null) {
            var promise = promise_resolve(0);
            promise = promise.then(() => {
                drawer.translate(this.options.left, this.options.top);
            });
            for (let child of this.children) {
                promise = promise.then(() => {
                    return child.draw(drawer);
                });
            }
            return promise.finally(() => {
                drawer.restore();
            });
        }
    }

    onTap(x, y) {
        if (this.data != null) {
            return;
        }
        this.parent.fire('tapaddproduct', this.productid);
    }

    wizardable() {
        return this.data == null;
    }

    getDropable() {
        if (this.data == null) {
            return null;
        }
        return {
            left: this.options.left,
            top: this.options.top + this.parent.getTop(),
            width: this.options.width,
            height: this.options.height,
            over: false,
            cb: (x, y, target) => {
                let drag = target.field;
                let drop = this.options.field;
                this.parent.fire('swapproduct', {product1: drag, product2: drop});
            }
        }
    }

    applyData(data) {
        if (data != null) {
            this.data = data;
            for (let child of this.children) {
                if (child.applyData != null) {
                    child.applyData(data);
                } else {
                    if (data[child.options.field] != null) {
                        child.data = data[child.options.field];
                    } else {
                        if (child.data != null) {
                            delete child.data;
                        }
                    }
                }
            }
        } else {
            if (this.data != null) {
                delete this.data;
            }
        }
    }


    //触发B面点击长按时间
    onLongTap(x, y) {
        // console.log('进入 product 的 onLongTap');
        // console.log(this);  //指的是，当前的 product 区域。

        if (this.data != null) {   //当前区域有产品数据填进去了。
            this.parent.fire('startdrag',
                {
                    target: this,
                    touch: {x: x, y: y},
                    rect: {
                        left: this.options.left,
                        top: this.options.top + this.parent.getTop(),
                        width: this.options.width,
                        height: this.options.height
                    }
                });
        }
    }
};

var Drawer = class {
    constructor(ctx, listener) {
        this.ctx = ctx;
        this.image_buffer = [];
        this.listener = listener;
    }

    finish() {
        return new Promise((resolve, reject) => {
            this.ctx.draw(false, () => {
                if (this.listener != null && this.listener.onFinish != null) {
                    this.listener.onFinish()
                }
                resolve();
            });
        });
    }

    forareaDirect(left, top, cb) {
        this.ctx.save();
        this.ctx.translate(left, top);
        cb();
        this.ctx.restore();
    }

    setFont(size) {
        this.ctx.font = size + "px cursive";
        this.ctx.setTextBaseline("top");
    }

    setFontColor(color) {
        this.ctx.setFillStyle(color);
    }

    translate(left, top) {
        this.ctx.save();
        this.ctx.translate(left, top);
    }

    restore() {
        this.ctx.restore();
    }


    // 画矩形框框
    drawRect(color, left, top, width, height) {
        var that = this;
        that.ctx.setStrokeStyle(color);
        that.ctx.setLineWidth(1);
        that.ctx.beginPath();
        that.ctx.moveTo(left, top);
        that.ctx.lineTo(left + width, top);
        that.ctx.lineTo(left + width, top + height);
        that.ctx.lineTo(left, top + height);
        that.ctx.lineTo(left, top);
        that.ctx.stroke();
    }


    //测量文本宽度
    measureText(text) {
        var _total = 0;
        var that = this;
        var handle = {
            onText: function (_text) {
                _total = _total + that.ctx.measureText(_text).width;
            }
        };
        new BBCode(handle).parse(text);
        return {width: _total};
    }


    //画文字
    drawText(text, left, top, width) {
        var _left = 0;
        var _state = 0;
        var that = this;
        var handle = {
            onCodeStart: function (name, value) {
                if (name === 'color') {
                    _state = _state + 1;
                    that.ctx.save();
                    that.ctx.setFillStyle(value);
                }
            },
            onCodeEnd: function () {
                if (_state > 0) {
                    _state = _state - 1;
                    that.ctx.restore();
                }
            },
            onText: function (_text) {
                if (_left >= width) {
                    return;
                }
                var measure = that.ctx.measureText(_text);
                that.ctx.fillText(_text, left + _left, top, width - _left);
                _left = _left + measure.width;
            }
        };
        new BBCode(handle).parse(text);
        for (var i = 0; i < _state; i++) {
            that.ctx.restore();
        }
    }


    //画图片
    drawImage(src, left, top, width, height) {
        var that = this;
        if (src.startWith("http://tmp/") || src.startWith("wxfile://") || src.startWith("/")) {
            return that.ctx.drawImage(src, left, top, width, height);
        } else {
            if (that.image_buffer[src] != null) {
                return that.ctx.drawImage(that.image_buffer[src], left, top, width, height);
            } else {
                return new Promise((resolve, reject) => {
                    wx.downloadFile({
                        url: src,
                        success(res) {
                            var tempFilePath = res.tempFilePath;
                            wx.getImageInfo({
                                src: tempFilePath,
                                success(res) {
                                    resolve(tempFilePath);
                                },
                                fail(res) {
                                    reject();
                                }
                            });
                        },
                        fail(res) {
                            reject();
                        }
                    });
                }).then((filepath) => {
                    return filepath;
                }, () => {
                    return blank_image;
                }).then((filepath) => {
                    that.image_buffer[src] = filepath;
                    return that.ctx.drawImage(filepath, left, top, width, height);
                });
            }
        }
    }
}

module.exports = {Card: Card, Drawer: Drawer};
