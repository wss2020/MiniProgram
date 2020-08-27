module.exports = {
    data: {
        data1: 'myMixin',
        data2: 'myMixin',
        data3: 'myMixin',
    },
    onLoad() {
        this.setData({        // mixin.js 中的  value.call(this, ...args);  就是用来处理这里 this 的
            num:5050
        });
        console.log('混入的数字555555');
    },

    go: function () {
        console.log('go0000000000');
    },
    go1: function () {
        console.log('go111111111');
    }

};
