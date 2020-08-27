import Promise from "es6-promise.min";

const storage = {
    _req: null,
    _promise: null,

    load: function (req) {
        this._req = req;
        var loadfunc = () => {
            return req.getPromise('/storage/all', this)
                .then(([code, res, that]) => {
                    var data = [];
                    if (code == 200) {
                        for (var item in res.data) {
                            var value = res.data[item];
                            data[value.name] = value.value;
                        }
                        return data;
                    }
                    return req.reject();
                }, () => {
                    return req.reject();
                });
        };
        this._promise = loadfunc().then((data) => {
            return data;
        }, () => {
            var _data = null;
            return new Promise((resolve, reject) => {
               wx.onNetworkStatusChange((res) => {
                   if(res.isConnected && _data == null) {
                       loadfunc().then((data) => {
                           _data = data;
                            resolve(data);
                       });
                   }
               })
            });
        });
        // this._promise = this._req.getPromise('/storage/all?access_token={{access_token}}', this)
        //     .then(([code, res, that]) => {
        //         var data = [];
        //         if (code == 200) {
        //             for (var item in res.data) {
        //                 var value = res.data[item];
        //                 data[value.name] = value.value;
        //             }
        //         }
        //         return data;
        //     }, () => {
        //         return [];
        //     });
    },

    set: function (key, value) {
        this._promise = this._promise.then((data) => {
            data[key] = value;
            return data;
        }).then((data) => {
            return this._req.postPromise('/storage/set', {name: key, value: value})
                .then(() => {
                        return data;
                    },
                    () => {
                        return data;
                    });
        });
        return this._promise;
    },

    get: function (key) {
        return this._promise.then((data) => {
            console.log(data);
            return data[key];
        });
    },

    remove: function (key) {
        this._promise = this._promise.then((data) => {
            data[key] = null;
            return data;
        });
        this._req.getPromise('/storage/remove/' + key);
    },

    clear: function () {
        this._promise = this._promise.then(() => {
            return this._req.getPromise('/storage/clear')
                .then(() => {
                    return [];
                }, () => {
                    return [];
                });
        });
    }
};

module.exports = storage;