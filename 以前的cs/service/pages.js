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
        channel.on('args', (args) => {
            if (this.onModal != null) {
                this.onModal(args);
            }
        });
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    // last._outEvent  是上一页面的EventEmitter 对象
    onReady() {
        let currentPages = getCurrentPages();
        if (currentPages.length > 1) {
            let last = currentPages[currentPages.length - 2];
            if (last._outEvent != null) {
                last._outEvent.emit('ready', this._event);
            }
        }
    },

    getEventChannel() {
        return this._eventChannel;
    },


    closeModal(ret) {
        if (ret == null) {
            ret = true;
        }
        this.data._ret = ret;
        wx.navigateBack();
    },
    /*** 生命周期函数--监听页面卸载  */
    onUnload() {
        console.log('二级页面卸载');
        if (this.data._ret == null) {
            this.emitOpener('onBack')
        } else {
            this.emitOpener('onRet', this.data._ret);
        }
    },
    emitOpener: function (eventName, args) {
        let channel = this.getEventChannel();
        if (channel != null && channel.emit != null) {
            channel.emit("user", {key: eventName, data: args});
        }
    },




    navigateTo(url, _events) {
        return getApp().func.promise((resolve, reject) => {
            this._outEvent = new events.EventEmitter();
            this._outEvent.on('ready', (e) => {

                console.log(`这里触发的是 ${this.data.value} 的广播 ready`);
                console.log('触发监听 ready');

                let childEvent = e;
                resolve({
                    event: new _EventChannel(childEvent, this._outEvent)
                });
                childEvent.on('user', (e) => {
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
            wx.navigateTo({
                url: url,
                success:()=>{
                   console.log('跳转到2级页面');
                },
                fail: () => {
                    reject();
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











