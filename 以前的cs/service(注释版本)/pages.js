var events = require('events');        //引入 events  模块
const app = getApp();

class _EventChannel {                 // 类 _EventChannel
    constructor(_in, _out) {
        this._in = _in;
        this._out = _out;
    }

    on(eventName, func) {         // 监听
        if (this._in != null) {
            this._in.on(eventName, func);
        }
    }

    off(eventName, func) {       //关闭
        if (this._in != null) {
            this._in.off(eventName, func);
        }
    }

    emit(eventName, args) {       //广播
        if (this._out != null) {
            this._out.emit(eventName, args);
        }
    }

    once(eventName, func) {     //广播一次
        if (this._in != null) {
            this._in.once(eventName, func);
        }
    }
}

let mpages = {
    data: {
        userinfomation: null,
        authoried: false,
        _ret: null
    },

    onLoad(options) {
        let currentPages = getCurrentPages();       //获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。
        if (currentPages.length > 1) {               // 如果页面栈里面的页面，大于一，也就是说，除了首页，还有其他页面。
            let last = currentPages[currentPages.length - 2];     //在当前页面，获取上一个页面的信息。
            this._event = new events.EventEmitter();              // 创建 eventEmitter 对象
            this._eventChannel = new _EventChannel(last._outEvent, this._event);  // last._outEvent, 上一个页面的信息
        } else {
            this._event = new events.EventEmitter();
            this._eventChannel = new _EventChannel(null, this._event);
        }
        let channel = this.getEventChannel();    // channel 当前页面创建的 _EventChannel()类，返回的对象
        channel.on('args', (args) => {           // 创建名为 args 的监听，如果收到广播，并且 this.onMoadl 不为不为null，执行
            if (this.onModal != null) {          // 函数 onModal(args)
                this.onModal(args);
            }
        });
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        let currentPages = getCurrentPages();
        if (currentPages.length > 1) {
            let last = currentPages[currentPages.length - 2];
            if (last._outEvent != null) {     // 上一个页面的 _outEvent 字段不为null
                last._outEvent.emit('ready', this._event);    // 触发上一个页面的名为 ready, 参数是 this._event 的广播，
            }
        }
    },

    getEventChannel() {      // 获取当前页面，创建的 _eventChannel 的类，（类返回的结果是一个对象）
        return this._eventChannel;
    },


    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        if (this.data._ret == null) {        //如果 this.data._ret 为 null，执行emitOpener函数。
            this.emitOpener('onBack')
        } else {                              //如果 this.data._ret 不为 null，执行emitOpener函数。
            this.emitOpener('onRet', this.data._ret);
        }
    },

    closeModal(ret) {
        if (ret == null) {     // 页面触发，closeModal事件，如果传入参数ret为 null, ret 赋值为 true.
            ret = true;
        }
        this.data._ret = ret;    // 把 ret 赋值给  this.data._ret
        wx.navigateBack();       // 默认delta值为1，返回上一页面
    },


    emitOpener: function (eventName, args) {
        let channel = this.getEventChannel();        // 获取当前页面创建的广播类，并把它赋值给 channel
        if (channel != null && channel.emit != null) {     // 如果 channel 不为null, 并且 channel.emit 不为null
            channel.emit("user", {key: eventName, data: args});   // 执行名为 user，参数为一个自定义对象的广播，
        }
    },

    navigateTo(url, _events) {        //  当页面执行，navigateTo 函数时
        return getApp().func.promise((resolve, reject) => {
            this._outEvent = new events.EventEmitter();   // 创建一个 EventEmitter 对象,赋值给 this._outEvent
            this._outEvent.on('ready', (e) => {           // 注册一个名为 ready 的监听器，并指定回调函数
                let childEvent = e;                       // 回调函数，接受的参数，  赋值给 childEvent
                resolve({                                 // 指定成功的回调
                    event: new _EventChannel(childEvent, this._outEvent)    // 把 ready 监听器的回调函数的参数，  再做一次处理。
                });
                childEvent.on('user', (e) => {            // e 创建一个名为 user 的广播。并指定回调函数
                    let key = e.key;
                    let data = e.data;
                    if (_events != null && _events.hasOwnProperty(key)) {
                        let func = _events[key];
                        if (typeof func == 'function') {
                            func(data);
                        }
                    }
                });
            });
            wx.navigateTo({       // 执行跳转
                url: url,
                fail: () => {
                    reject();            // 指定失败的回调
                }
            });
        });
    },

    navigateModal(url, args) {
        return getApp().func.promise((resolve, reject) => {
            this.navigateTo(url,
                {
                    "onBack": (e) => {
                        reject(e);
                    },
                    "onRet": (e) => {
                        resolve(e);
                    }
                }
            ).then((res) => {
                res.event.emit('args', args);
            }).catch(console.error);
        });
    },

    checkPermission(scope, title) {
        return getApp().func.wxPromisify("getSetting")
            .then((res) => {
                console.log(res);
                if (res.authSetting[scope]) {
                    return true;
                }
                if (res.authSetting[scope] === false) {
                    return this.navigateModal("/pages/common/auth/auth?scope=" + scope + "&title=" + title)
                        .then((grant) => {
                            console.log("!!!!!!!!!!!!!");
                            console.log(grant);
                            if (grant) {
                                return true;
                            } else {
                                return getApp().func.reject();
                            }
                        });
                }
                return false;
            });
    },

    authorize(scope, title) {
        return getApp().func.wxPromise("authorize", {scope: scope})
            .catch(() => {
                return this.checkPermission(scope, title);
            });
    },

    getuserinfo() {
        app.func.getuserinfo((userInfo) => {
            this.setData({userinfomation: userInfo, authoried: true});
        }, () => {
            console.log('未授权');
            this.setData({authoried: false});
        });
    }
};

module.exports = [mpages];
