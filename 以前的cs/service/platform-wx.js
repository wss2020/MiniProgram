import events from "events";
import Promise from 'es6-promise.min.js';

class RecordManager {
    constructor() {

        //获取全局唯一的录音管理器 RecorderManager
        // 返回值   RecorderManager
        this.mgr = wx.getRecorderManager();


        this.event = new events.EventEmitter();
        this.onStop = (res) => {
            this.event.emit("record-stop", res);
        };
        this.onFrameRecorded = (res) => {
            console.log(res);
            this.event.emit("record-frame", res);
        };
        this.onError = (res) => {
            this.event.emit("record-error", res);
        };
        this.onStart = (res) => {
            this.event.emit("record-start", res);
        };
        this.mgr.onStop(this.onStop);
        this.mgr.onFrameRecorded(this.onFrameRecorded);
        this.mgr.onError(this.onError);
        this.mgr.onStart(this.onStart);
    }

    on(type, cb) {
        this.event.on(type, cb);
    }

    off(type, cb) {
        this.event.off(type, cb);
    }

    start(options) {
        this.mgr.start({
            duration: options.duration,
            sampleRate: options.sampleRate,
            numberOfChannels: options.numberOfChannels,
            encodeBitRate: options.encodeBitRate,
            format: options.format,
            frameSize: options.frameSize,
            audioSource: options.audioSource
        });
    }

    stop() {
        this.mgr.stop();
    }
}

class UpdateManager {
    constructor() {
        var mgr = wx.getUpdateManager();
        mgr.onUpdateReady(() => {
            wx.showModal({
                title: "发现新版本",
                content: "立即拥有更多好玩有用的功能",
                confirmText: "立即更新",
                showCancel: false,
                success: function (res) {
                    mgr.applyUpdate();
                }
            })
        });
        this.mgr = mgr;
    }
}

class BackgroundAudioManager {
    constructor() {
        this.mgr = wx.getBackgroundAudioManager();
        this.event = new events.EventEmitter();
        this.state = 'none';
        this.onWaiting = () => {

        };
        this.onPlay = () => {
            this.state = 'play';
            this.event.emit('audio-play', 'play');
        };
        this.onTimeUpdate = () => {
            this.event.emit('audio-update', {duration: this.mgr.duration, currentTime: this.mgr.currentTime});
        };
        this.onError = (res) => {
            this.state = 'error';
            this.event.emit('audio-error', res);
        };
        this.onCanplay = () => {
            this.event.emit('audio-canplay');
        };
        this.onEnded = () => {
            this.state = 'end';
            this.event.emit('audio-endded', 'end');
        };
        this.onStop = () => {
            this.state = 'stop';
            this.event.emit('audio-stop', 'stop');
        };
        this.onPause = () => {
            this.state = 'pause';
            this.event.emit('audio-pause', 'pause');
        };
        this.mgr.onWaiting(this.onWaiting);
        this.mgr.onPlay(this.onPlay);
        this.mgr.onTimeUpdate(this.onTimeUpdate);
        this.mgr.onError(this.onError);
        this.mgr.onCanplay(this.onCanplay);
        this.mgr.onEnded(this.onEnded);
        this.mgr.onStop(this.onStop);
        this.mgr.onPause(this.onPause);
    }

    on(type, cb) {
        this.event.on(type, cb);
    }

    off(type, cb) {
        this.event.off(type, cb);
    }

    setSrc(src) {
        this.mgr.src = src;
    }

    getSrc() {
        return this.mgr.src;
    }

    setTitle(title) {
        this.mgr.title = title;
    }

    getTitle() {
        return this.mgr.title;
    }

    play() {
        this.mgr.play();
    }

    pause() {
        this.mgr.pause();
    }

    stop() {
        this.mgr.stop();
    }

    seek(time) {
        this.mgr.seek(time);
    }
}


class Platform {
    constructor() {
        wx.setInnerAudioOption({
            obeyMuteSwitch: false
        });
        this.name = 'wx';
        this.recordManager = new RecordManager();
        this.updateManager = new UpdateManager();
        this.backgroundAudioManger = new BackgroundAudioManager();
        this.bookadid = null;
        this.unitadid = null;
    }

    showLoading(options) {
        wx.showLoading(options);
    }

    hideLoading() {
        wx.hideLoading();
    }

    stopPullDownRefresh() {
        wx.stopPullDownRefresh();
    }

    getSystemInfo(cb) {
        return this.promisify('getSystemInfo')
            .then((res) => {
                return {
                    windowHeight: res.windowHeight
                };
            });
    }

    promisify(functionName, params) {
        return new Promise((resolve, reject) => {
            wx[functionName]({
                ...params,
                success: res => resolve(res),
                fail: res => reject(res)
            });
        });
    }

    setStorageSync(name, value) {
        wx.setStorageSync(name, value);
    }

    getStorageSync(key) {
        return wx.getStorageSync(key);
    }

    login() {
        return this.promisify('login')
            .then((res) => {
                return {
                    code: res.code
                };
            });
    }

    request(options) {
        return this.promisify('request', {
            url: options.url,
            data: options.data,
            header: options.header,
            timeout: options.timeout,
            method: options.method,
            dataType: options.dataType,
            responseText: options.responseType
        });
    }

    getRecordManager() {
        return this.recordManager;
    }

    getBackgroundAudioManager() {
        return this.backgroundAudioManger;
    }

    switchTab(url) {
        wx.switchTab({
            url: url
        })
    }

    promisify(functionName, params) {
        return new Promise((resolve, reject) => {
            wx[functionName]({
                ...params,
                success: res => resolve(res),
                fail: res => reject(res)
            });
        });
    }

    /**
     * 0:all，1: file, 2:image,3:video
     * @param type
     */
    chooseFile(type, count) {
        if (count == null) {
            count = 1;
        }
        if (type == 1) {
            return this.addFromMessageFile(type, count);
        } else {
            return this.promisify("showActionSheet", {
                itemList: ["从相册导入", "拍摄", "导入聊天文件"]
            }).then((res) => {
                switch (res.tapIndex) {
                    case 0:
                        return this.addFromAlbum(type, count);
                        break;
                    case 1:
                        return this.addFromCamera(type, count);
                        break;
                    case 2:
                        return this.addFromMessageFile(type, count);
                        break;
                    default:
                        return this.reject();
                }
            });
        }
    }

    addFromCamera(type, count) {
        var mediaType = ['image', 'video'];
        switch (type) {
            case 2:
                mediaType = ['image'];
                break;
            case 3:
                mediaType = ['video'];
                break;
            default:
                break;
        }
        return this.promisify("chooseMedia", {
            count: count,
            sourceType: ['camera'],
            sizeType: ['original'],
            mediaType: mediaType
        }).then((res) => {
            let result = [];
            let files = res.tempFiles;
            for (let i = 0; i < files.length; i++) {
                var filePath = files[i].tempFilePath;
                var parts = filePath.split("/");
                var name = parts[parts.length - 1];
                result.push({name: name, path: filePath});
            }
            return result;
        });
    }

    addFromAlbum(type, count) {
        var mediaType = ['image', 'video'];
        switch (type) {
            case 2:
                mediaType = ['image'];
                break;
            case 3:
                mediaType = ['video'];
                break;
            default:
                break;
        }
        return this.promisify("chooseMedia", {
            count: count,
            sourceType: ['album'],
            sizeType: ['original'],
            mediaType: mediaType
        }).then((res) => {
            let result = [];
            let files = res.tempFiles;
            for (let i = 0; i < files.length; i++) {
                var filePath = files[i].tempFilePath;
                var parts = filePath.split("/");
                var name = parts[parts.length - 1];
                result.push({name: name, path: filePath});
            }
            return result;
        });
    }

    /**
     * 0:all，1: file, 2:image,3:video
     * @param type
     */
    addFromMessageFile(type, count) {
        var fileType = 'all';
        switch (type) {
            case 0:
                fileType = 'all';
                break;
            case 1:
                fileType = 'file';
                break;
            case 2:
                fileType = 'image';
                break;
            case 3:
                fileType = 'video';
                break;
            default:
                break;
        }
        return this.promisify("chooseMessageFile", {
            count: count,
            type: fileType
        }).then((res) => {
            let files = res.tempFiles;
            let result = [];
            for (let i = 0; i < files.length; i++) {
                var filePath = files[i].path;
                var name = files[i].name;
                result.push({name: name, path: filePath});
            }
            return result;
        });
        // var func = (result) => {
        //     return this.promisify("chooseMessageFile", {
        //         count: 1,
        //         type: fileType
        //     }).then((res) => {
        //         let files = res.tempFiles;
        //         var filePath = files[0].path;
        //         var name = files[0].name;
        //         result.push({name: name, path: filePath});
        //         return result;
        //     }).then((res) => {
        //         if (res.length >= count) {
        //             return res;
        //         } else {
        //             return this.confirm("继续添加", "是否继续添加？")
        //                 .then(() => {
        //                         return func(res);
        //                     },
        //                     () => {
        //                         return res;
        //                     })
        //         }
        //     })
        // };
        // return func([]);
    }

    confirm(title, msg) {
        return this.promisify("showModal",
            {
                title: title,
                content: msg,
                confirmText: "确认",
                cancelText: "取消"
            }
        ).then((res) => {
            if (res.confirm) {
                return this.resolve();
            } else {
                return this.reject();
            }
        });
    }

    resolve(value) {
        return new Promise(function (resolve, reject) {
            resolve(value);
        });
    }

    reject(value) {
        return new Promise(function (resolve, reject) {
            reject(value);
        });
    }
}

module.exports = Platform;
