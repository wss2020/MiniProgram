var events = require('events');
import Promise from "es6-promise.min";

let WSS = class {
    constructor(host) {
        this._host = host;
        this._emit = new events.EventEmitter();
        this._stopped = false;
    }

    restart = () => {
        var host = this._host;
        var that = this;
        wx.getNetworkType({
            success: function (res) {
                if (res.networkType != "none") {
                    wx.connectSocket({
                        url: that._host,
                        fail: that.restart
                    });
                }
            }
        });
    }

    start() {
        this.restart();
        wx.onSocketMessage((res) => {
            var msg = JSON.parse(res.data);
            this._emit.emit(msg.type, msg.msg);
        });
        this.on("PING", () => {
            this.send("PONG", {})
        });
    }

    stop(cb) {
        this._stopped = true;
        wx.closeSocket()
    }

    send(type, message) {
        var msg = {type: type, msg: message}
        wx.sendSocketMessage({
            data: JSON.stringify(msg)
        })
    }

    on(type, cb) {
        this._emit.on(type, cb);
    }
}

var _instance = null;

function start(host) {
    if(_instance != null) {
        _instance.stop();
    }
    _instance = new WSS(host);
    _instance.start();
    return _instance;
}

function restart() {
    if(_instance != null) {
        _instance.restart();
    }
}

wx.onNetworkStatusChange(restart);
wx.onSocketError(restart);
wx.onSocketClose(restart);

module.exports = {start:start};

