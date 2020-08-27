let Rect = class{
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }

    contains = function (x, y) {
        if(x < this.left || x > this.left + this.width) {
            return false;
        }
        if(y < this.top || y > this.top + this.height) {
            return false;
        }
        return true;
    }
};
module.exports=Rect;