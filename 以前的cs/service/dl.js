var _apihost = null;
var _wshost = null;
var _userinfo = null;
import Promise from 'es6-promise.min.js';
import WSS from 'wss.js';

import Platform from 'platform-wx';



var events = require('events');

var event = new events.EventEmitter();

function buildPath(route, options) {
    if (options == null || options.length < 1) {
        return route;
    }
    var params = [];
    for (var key in options) {
        params.push(key + "=" + encodeURIComponent(options[key]));
    }
    return route + "?" + params.join('&');
}

var user_promise = null;

function mergePage(mixins, options) {
    const originProperties = ['data', 'properties', 'options'];
    const originMethods = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onTabItemTap'];

    mixins.forEach( (mixin) => {
        if (Object.prototype.toString.call(mixin) !== '[object Object]') {
            throw new Error('mixin 类型必须为对象！')
        }
        for (let [key, value] of Object.entries(mixin)) {
            if (originProperties.includes(key)) {
                options[key] = {...value, ...options[key]}

            } else if (originMethods.includes(key)) {

                const originFunc = options[key];
                options[key] = function (...args) {
                    value.call(this, ...args);
                    return originFunc && originFunc.call(this, ...args)
                }
            } else {

                options = {...mixin, ...options}
            }
        }
    });
    return options
};


const requestData = {
    page: function (options) {
        // console.log(1111111);
        // console.log(options.mixins);
        // console.log(2222222);
        //
        //
        // var mixins = options.mixins;
        // if (Array.isArray(mixins)) {
        //     delete options.mixins;
        //     options = mergePage(mixins, options)
        // }

        let mixins = require('pages');
        options = mergePage(mixins, options);   // mixins pages.js 里的全部内容      options 页面全部数据
        Page(options);
    },


    on: (type, cb) => {
        event.on(type, cb);
    },

    off: (type) => {
        event.removeAllListeners(type);
    },

    send: (type, msg) => {
        requestData.wss.send(type, msg);
    },

    registerApiHost: (host) => {
        _apihost = host;

        var getinfofunc = function () {
            return requestData.getPromise('/my/info')
                .then(([code, res]) => {
                    if (code == 200) {
                        return res.data;
                    } else {
                        return requestData.reject();
                    }
                });
        };
        user_promise = getinfofunc();
        var wss = host.replace('https', 'wss');
        _wshost = wss.replace('http', 'ws');

        wx.onNetworkStatusChange((res) => {
            if (res.isConnected) {
                user_promise = user_promise.then((user) => {
                    return user;
                }, () => {
                    return getinfofunc();
                });
            }
        });

        requestData.platform = new Platform();
    },

    startWebSocket: (sup_id) => {
        user_promise.then((user) => {
            console.log(user);
            var wss = WSS.start(_wshost + "/wss/");
            wss.on("AUTH", function (res) {
                wss.send("AUTH", {uid: user.userid, sup_id: sup_id});
            });
            wss.on("MSG", function (res) {
                var roomid = res.roomid;
                var type = "MSG_ROOM_" + roomid;
                event.emit(type, res);
                event.emit("MSG", res);
            });
            requestData.wss = wss;
        })
    },

    /**
     * url = String 请求地址
     * obj = Object 请求参数
     * success = function 成功回调
     * fail = function 成功回调
     */
    get: (url, data, success, fail, count = 0) => {
        var pages = getCurrentPages();
        var referer = "";
        if (pages.length > 1) {
            referer = pages[pages.length - 2].route;
        }
        var current = "";
        if (pages.length > 0) {
            current = buildPath(pages[pages.length - 1].route, pages[pages.length - 1].options);
        }
        if ((typeof data) == 'function') {
            if (success && (typeof success) == 'function') {
                fail = success;
            }
            success = data;
            data = '';
            // console.log(success, data, fail)
        }
        var parts = url.split('?');
        var newurl = url;
        if (parts.length == 1) {
            newurl = url + "?service_token=" + wx.getStorageSync('accesstoken');
        } else {
            newurl = url + "&service_token=" + wx.getStorageSync('accesstoken');
        }
        wx.request({
            url: newurl,
            data: data || '',
            header: {"X-PAGE": current, "X-REFERRER": referer},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success(res) {
                if (res.data.code === 200) {
                    success != null && success(res);
                } else if (res.data.code === 403 || res.data.code === 401) {
                    console.log('token过期，需要重新登录');
                    if (count == 3) {
                        fail(res);
                    } else {
                        requestData.wxlogin(function () {
                            requestData.get(url, data, success, fail, count + 1);
                        }, function () {
                            console.log('有问题')
                        });
                    }
                } else {
                    success != null && success(res);
                }
            },
            fail(res) {
                if (fail) {
                    console.log('请求失败')
                    fail(res);
                }
                wx.hideLoading();
                wx.showToast({
                    title: '请求超时',
                    icon: 'loading',
                    duration: 2000
                })
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    },
    getapi: (url, success, fail, attach) => {
        requestData.get(_apihost + url, {},
            res => {
                success != null && success(res.data.code, res.data, attach);
            },
            res => {
                fail != null && fail(res, attach)
            });
    },
    //没动
    post: (url, data, success, fail, count = 0) => {
        var pages = getCurrentPages();
        var referer = "";
        if (pages.length > 1) {
            referer = pages[pages.length - 2].route;
        }
        var current = "";
        if (pages.length > 0) {
            current = buildPath(pages[pages.length - 1].route, pages[pages.length - 1].options);
        }
        if ((typeof data) == 'function') {
            if (success && (typeof success) == 'function') {
                fail = success;
            }
            success = data;
            data = '';
            // console.log(success, data, fail)
        }
        var parts = url.split('?');
        var newurl = url;
        var url = parts.join('?');
        if (parts.length == 1) {
            newurl = url + "?service_token=" + wx.getStorageSync('accesstoken');
        } else {
            newurl = url + "&service_token=" + wx.getStorageSync('accesstoken');
        }
        wx.request({
            url: newurl,
            data: data || '',
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                "X-PAGE": current,
                "X-REFERRER": referer
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success(res) {
                if (res.data.code === 403 || res.data.code === 401) {
                    console.log('token过期，需要重新登录');
                    if (count == 3) {
                        fail(res);
                    } else {
                        requestData.wxlogin(function () {
                            requestData.post(url, data, success, fail, count + 1);
                        }, function () {
                            console.log('有问题')
                        });
                    }
                } else {
                    success(res);
                }
            },
            fail(res) {
                if (fail) {
                    console.log('提交失败');
                    fail(res);
                }
            }
        })
    },

    postapi: (url, data, success, fail, attach) => {
        requestData.post(_apihost + url, data,
            res => {
                success != null && success(res.data.code, res.data, attach);
            },
            res => {
                fail != null && fail(res, attach)
            })
    },


    //没动
    upload: (url, filepath, name, data, success, fail, count = 0) => {
        var pages = getCurrentPages();
        var referer = "";
        if (pages.length > 1) {
            referer = pages[pages.length - 2].route;
        }
        var current = "";
        if (pages.length > 0) {
            current = buildPath(pages[pages.length - 1].route, pages[pages.length - 1].options);
        }
        if ((typeof data) == 'function') {
            if (success && (typeof success) == 'function') {
                fail = success;
            }
            success = data;
            data = '';
            // console.log(success, data, fail)
        }
        var parts = url.split('?');
        var newurl = url;
        if (parts.length == 1) {
            newurl = url + "?service_token=" + wx.getStorageSync('accesstoken');
        } else {
            newurl = url + "&service_token" + wx.getStorageSync('accesstoken');
        }
        wx.uploadFile({
            url: newurl,
            filePath: filepath,
            name: name,
            formData: data,
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                "X-PAGE": current,
                "X-REFERRER": referer
            },
            success(res) {
                try {
                    var data = JSON.parse(res.data);
                    if (data.code === 403 || data.code === 401) {
                        console.log('token过期，需要重新登录');
                        if (count == 3) {
                            fail(res);
                        } else {
                            requestData.wxlogin(function () {
                                requestData.upload(url, filepath, name, success, fail, count + 1);
                            }, function () {
                                console.log('有问题')
                            });
                        }
                    } else {
                        success(data);
                    }
                } catch (e) {
                    console.log(e);
                    fail(res);
                }
            },
            fail(res) {
                if (fail) {
                    console.log('提交失败');
                    fail(res);
                }
            }
        })
    },

    uploadapi: (url, filePath, name, data, success, fail, attach) => {
        requestData.upload(_apihost + url, filePath, name, data,
            res => {
                success != null && success(res.code, res, attach);
            },
            res => {
                fail != null && fail(res, attach)
            })
    },

    wxlogin: (_success, _fail, _data) => {
        wx.login({
            success: res => {
                var code = res.code;
                if (code) {
                    wx.request({
                        url: _apihost + '/v2/user/login/' + code,
                        method: 'POST',
                        header: {
                            'content-type': 'application/json'
                        },
                        success: function (res) {
                            if (res.data.code === 200) {
                                console.log(res)
                                wx.setStorageSync('accesstoken', res.data.data.token);
                                user_promise = requestData.getPromise('/my/info')
                                    .then(([code, res]) => {
                                        return res.data;
                                    });
                                _success != null && _success(_data);
                            } else {
                                _fail != null && _fail(_data);
                            }
                        },
                    })

                } else {
                    _fail(data);
                }
            },
            fail(res) {
                console.log('wxlogin~~~!!!@###$!@@#');
                console.log(res);
            }

        });
        requestData.getuserinfo();
    },
    ongetuserinfo: (userInfo, _succ) => {
        _userinfo = userInfo;
        wx.login({

            success(res) {
                var code = res.code;
                wx.getUserInfo({
                    success(res) {
                        var userInfo = res.userInfo;
                        requestData.postapi('/auth/getuserinfo',
                            {
                                "code": code,
                                "iv": res.iv,
                                "encryptedData": res.encryptedData,
                                "nickname": userInfo.nickName,
                                "avator": userInfo.avatarUrl,
                                "gender": userInfo.gender,
                                "country": userInfo.country,
                                "province": userInfo.province,
                                "city": userInfo.city,
                                "language": userInfo.language
                            }, () => {
                                _succ != null && _succ();
                            }, () => {
                            }
                        );
                    }
                });
            }
        });
    },
    getuserinfo: (_succ, _fail) => {
        if (_userinfo != null) {
            _succ != null && _succ(_userinfo)
        } else {
            wx.getSetting({
                success(res) {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success(res) {
                                requestData.ongetuserinfo(res.userInfo);
                                _succ != null && _succ(res.userInfo);
                            },
                            fail(res) {
                                _fail != null && _fail();
                            }
                        })
                    } else {
                        _fail != null && _fail();
                    }
                },
                fail(res) {
                    _fail != null && _fail();
                }
            })
        }
    },
    authtab(route, _succ) {
        requestData.getuserinfo(_succ, () => {
            wx.redirectTo({
                url: "/pages/auth/auth?type=tab&route=" + route,
            })
        });
    },
    authpage(route, options, _succ) {
        requestData.getuserinfo(_succ, () => {
            wx.redirectTo({
                url: "/pages/auth/auth?type=page&route=" + route + "&options=" + JSON.stringify(options),
            })
        });
    },

    promise: function (cb) {
        return new Promise(cb);
    },

    promise_all: function (arr) {
        return Promise.all(arr);
    },

    resolve: function (value) {
        return new Promise(function (resolve, reject) {
            resolve(value);
        });
    },

    reject: function (value) {
        return new Promise(function (resolve, reject) {
            reject(value);
        });
    },

    getPromise: function (url, attach) {
        return new Promise(function (resolve, reject) {
            wx.getNetworkType({
                success(res) {
                    if (res.networkType == 'none') {
                        reject([res, attach]);
                    } else {
                        requestData.getapi(url,
                            (code, res) => {
                                resolve([code, res, attach]);
                            }, (res) => {
                                reject([res, attach]);
                            });
                    }
                }
            });
        });
    },

    postPromise: function (url, data, attach) {
        return new Promise(function (resolve, reject) {
            wx.getNetworkType({
                success(res) {
                    if (res.networkType == 'none') {
                        reject([res, attach]);
                    } else {
                        requestData.postapi(url, data,
                            (code, res) => {
                                resolve([code, res, attach]);
                            }, (res) => {
                                reject([res, attach]);
                            })
                    }
                }
            });
        });
    },

    uploadPromise: function (url, filepath, name, data, attach) {
        return new Promise(function (resolve, reject) {
            wx.getNetworkType({
                success(res) {
                    if (res.networkType == 'none') {
                        reject([res, attach]);
                    } else {
                        requestData.uploadapi(url, filepath, name, data,
                            (code, res) => {
                                resolve([code, res, attach]);
                            }, (res) => {
                                reject([res, attach]);
                            })
                    }
                }
            });
        })
    },

    toastPromise: function (title, icon = 'none', duration = 1500) {
        return new Promise(function (resolve, reject) {
            wx.showToast({
                title: title,
                icon: icon,
                duration: duration,
                success: function () {
                    setTimeout(function () {
                        resolve();
                    }, duration);
                }
            })
        });
    },

    loading: function (title) {
        return new Promise(function (resolve, reject) {
            wx.showLoading({
                title: title,
                complete(res) {
                    resolve();
                }
            });
        })
    },

    wxPromise: function (functionName, params) {
        return new Promise((resolve, reject) => {
            wx[functionName]({
                ...params,
                success: res => resolve(res),
                fail: res => reject(res)
            });
        });
    },

    onPageLoad: function (page, options) {
        console.log(options);
        if (options.channel != null) {
            requestData.postapi('/user/channel/' + options.channel, {});
        }
        if (options.uid != null) {
            requestData.postapi('/user/invitor/' + options.uid, {});
        }
        if (options.scene != null) {
            requestData.getPromise('/scene/' + options.scene)
                .then(([code, res]) => {
                    if (code == 200) {
                        console.log(res);
                        if (page.onSceneInfo != null) {
                            page.onSceneInfo(res.data, options.scene);
                        }
                        return res.data.id;
                    }
                })
        }
        user_promise.then((user) => {
            var _share = page.onShareAppMessage;
            if (_share != null) {
                page.onShareAppMessage = function (res) {
                    var ret = _share(res);
                    return requestData.__make_share_res(page, options, user.userid, ret);
                }
            }
            page.registerShareAppMessage = function (cb) {
                page.onShareAppMessage = function (res) {
                    var ret = cb(res);
                    return requestData.__make_share_res(page, options, user.userid, ret);
                }
            }
        });
    },

    __make_share_res: function (page, options, userid, res) {
        console.log("make res");
        console.log(res);
        var array = [];
        for (var item in options) {
            array.push(item + "=" + options[item]);
        }
        array.push("uid=" + userid);

        if (res == null) {
            return {path: page.route + "?" + array.join('&')}
        } else {
            if (res.path == null) {
                res.path = page.route + "?" + array.join('&');
                return res;
            } else {
                var parts = res.path.split('?');
                if (parts.length == 1) {
                    res.path = res.path + "?" + "uid=" + userid;
                    return res;
                } else {
                    var array = parts[1].split('&');
                    array.push("uid=" + userid);
                    res.path = parts[0] + "?" + array.join('&');
                    return res;
                }
            }
        }
    },


    // page: function (_page) {
    //     var onload = _page.onLoad;
    //     _page.onLoad = function (options) {
    //         requestData.onPageLoad(_page, options);
    //         if (onload == null) {
    //             onload(options);
    //         }
    //     }
    //     Page(_page);
    // },

    user: function () {
        return user_promise;
    },

    setModalResult: function (res) {
        this.modalResult = res;
    },

    getModalResult: function () {
        var result = this.modalResult;
        this.modalResult = null;
        return result;
    },


    //录音有关
    getPlatform: function() {
        return requestData.platform;
    },

    mpage(options) {
        var mixins = options.mixins;
        if (Array.isArray(mixins)) {
            delete options.mixins;
            options = mergePage(mixins, options)
        }
        mixins = require('pages');
        options = mergePage(mixins, options);
        Page(options)
    }

};

module.exports = requestData;

String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};
