let Tapable = class {
    constructor(rect, cb) {
        this.rect = rect;
        this.cb = cb;
    }

    setLongTapCallback = function (cb) {
        this._longcb = cb;
    };

    onLongTap = function (x, y) {
        if (this.rect.contains(x, y)) {
            if (this._longcb != null) {
                this._longcb(x, y);
            }
        }
    };

    onTap = function (x, y) {
        if (this.rect.contains(x, y)) {
            this.cb(x, y);
        }
    }
};
module.exports = Tapable;