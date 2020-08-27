let Dropable = class {
    constructor(rect, cb) {
        this.rect = rect;
        this.cb = cb;
    }

    isOver = function (x, y) {
        return this.rect.contains(x, y);
    };

    getRect = function(rect) {
        return this.rect;
    };

    onDrop = function (x, y) {
        if (this.rect.contains(x, y)) {
            this.cb(x, y);
        }
    }
};
module.exports = Dropable;