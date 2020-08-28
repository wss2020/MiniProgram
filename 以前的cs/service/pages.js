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

        console.log( channel );

        channel.on('args', (args) => {
            console.log('触发监听 args');

            console.log('接收数据args');
            console.log(args);

            console.log('执行页面 onModal 函数');

            if (this.onModal != null) {
                this.onModal(args);

                console.log('---------------------------- 传入参数结束 --------------------------------');
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
            if (last._outEvent != null) {     // 上一个页面的 _outEvent 字段不为null

                console.log('先执行广播 ready');
                console.log('广播 ready，的参数');
                console.log(this._event);

                last._outEvent.emit('ready', this._event);    // 触发上一个页面的名为 ready, 参数是 this._event 的广播，
            }
        }
    },

    getEventChannel() {      // 获取当前页面，创建的 _eventChannel 的类，（类返回的结果是一个对象）
        return this._eventChannel;
    },


    closeModal(ret) {
        if (ret == null) {     // 执行closeModal函数，如果传入参数ret为 null, ret 赋值为 true.
            ret = true;
        }
        this.data._ret = ret;    // 把 ret 赋值给  this.data._ret

        console.log('用户执行closeModal函数，并且给了返回数据 this.data._ret,它的值为');
        console.log(this.data._ret);

        wx.navigateBack();       // 默认delta值为1，返回上一页面  这时候二级页面生命周期函数--监听页面卸载 onUnload() 被触发。
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
        let channel = this.getEventChannel();              // 获取当前页面创建的广播类，并把它赋值给 channel
        if (channel != null && channel.emit != null) {     // 如果 channel 不为null, 并且 channel.emit 不为null

            console.log('用户触发了 名为 user 的广播，广播的数据是一个对象，有 key ,data 两个字段');
            console.log('key的值：');
            console.log(eventName);
            console.log('data的值：');
            console.log(args);

            channel.emit("user", {key: eventName, data: args});   // 执行名为 user，参数为一个自定义对象的广播，
        }
    },




    navigateTo(url, _events) {          //  navigateTo 事件
        return getApp().func.promise((resolve, reject) => {
            this._outEvent = new events.EventEmitter();   // 创建了一个 EventEmitter 对象,赋值给 this._outEvent
            this._outEvent.on('ready', (e) => {

                console.log(`这里触发的是 ${this.data.value} 的广播 ready`);
                console.log('触发监听 ready');

                let childEvent = e;
                resolve({                                 // 指定成功的回调    childEvent 是二级页面创建的 eventEmitter 对象。
                    event: new _EventChannel(childEvent, this._outEvent)    // 把 ready 监听器的回调函数的参数，  再做一次处理。
                });
                childEvent.on('user', (e) => {            // e 创建一个名为 user 的广播。并指定回调函数
                    let key = e.key;
                    let data = e.data;

                    console.log('执行了，名为 user 的监听，并执行指定的回调函数');

                    if (_events != null && _events.hasOwnProperty(key)) {
                        let func = _events[key];
                        if (typeof func == 'function') {
                            func(data);
                            console.log('执行了func函数，函数名为');
                            console.log(func);
                        }
                    }
                });
            });
            wx.navigateTo({       // 执行跳转
                url: url,
                success:()=>{
                   console.log('跳转到2级页面');
                },
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

                console.log('接收数据args');
                console.log(args);

                console.log('执行广播 args');

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


/***
 *
 页面传参（不刷新页面，思路）
 1.传入数据，到下一页面
 2.从下一页面，返回数据到上一页面。
 准备工作：
 引入了 event、mixins  、promise
 基本思路，利用页面栈 、广播 、promise 的回调函数  、把函数作为参数传入并在指定时间执行（回调）
 思路：
 1.传入数据到下一页面，
 页面执行，
 //页面传参数
 param(){
    this.navigateModal("/pages/index/param/param", {
        amount: 13
    }).then((res) => {
        console.log('接收resolve,返回的值res为');
        console.log(res);
        return app.func.toastPromise("return:" + res);
    }).catch((res) => {
        console.log(res);
    })
}
 预先写好，promise 变为 resolve 状态下所执行的操作，也就是接收下一个页面传入的数据
 mixins，事先对，navigateModal 进行了处理，
 navigateModal 接收两个参数，第一个参数，页面跳转路径，第二个参数，传入下一页面的数据。
 返回一个 promise对象 ;
 .then(res)   是当promise对象变为 resolve 状态执行，res 为下一个页面传入的数据。
 promise对象中，执行默认的promise,函数中执行  this.navigateTo.

 navigateTo   接收两个参数，
 第一个参数url, 页面跳转路径，
 第二个参数 _event 是一个对象，有两个属性，onBack、onRet , 两个回调函数，分别对应 reject() 、resolve();
 返回一个promise对象。
 .then(res)  执行的是一个 res.event.emit(‘args’,agrs);     agrs 是 navigateModal 函数的第二个参数，就是页面传入的数据
 promise对象中，执行的是，创建一个 EventEmitter 对象赋值给 this._outEvent ,创建监听 this._outEvent.on(‘ready’,(e)={}); 指定回调函数，
 回调函数中，分为两部分，一个是执行 resolve
 let childEvent = e;
 resolve({                                 // 指定成功的回调    childEvent 是二级页面创建的 eventEmitter 对象。
    event: new _EventChannel(childEvent, this._outEvent)    // 把 ready 监听器的回调函数的参数，  再做一次处理。
});
 这一部分和接收上一个页面的传入的参数有关，resolve()正好对应，执行，
 接着执行了，二级页面，onLoad 中 args 的监听的回调函数。
 onLoad(options) {
   // channel 当前页面创建的 _EventChannel()类，返回的对象
    let channel = this.getEventChannel();
    channel.on('args', (args) => {
        if (this.onModal != null) {
            this.onModal(args);
        }
    });
},
 这时，传入数据结束。

 另一个是执行，监听
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
 内部回调函数，根据 传入的key 和 navigateTo 的第二个对象参数 判断执行， 第二个对象参数中的那个回调，触发 resolve(), 还是 reject( )，
 触发 resolve( data), 正好对应执行，

 closeModal(ret) {
    if (ret == null) {
        ret = true;
    }
    this.data._ret = ret;
    wx.navigateBack();
},
 // 生命周期函数--监听页面卸载
onUnload() {
    if (this.data._ret == null) {
        this.emitOpener('onBack')
    } else {
        this.emitOpener('onRet', this.data._ret);
    }
},
emitOpener: function (eventName, args) {
    let channel = this.getEventChannel();              // 获取当前页面创建的广播类，并把它赋值给 channel
    if (channel != null && channel.emit != null) {
        channel.emit("user", {key: eventName, data: args});
    }
},

如上，用户主动触发closeModal 函数，并且传入 需要传给上一个页面的数据，并调用 wx.navigateBack(),返回上一页面。
此时触发，页面生命周期 onUnload,  根据用户，有没有传给上一个页面数据，来判断，user 的广播，传入的数据 key 的值。
然后触发  user 的监听。

最后，关于页面栈哪一块，自己看代码。


*/










