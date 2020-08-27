//获取应用实例
// const app = getApp();

Page({
    mixins: [require('../../mixins/common.js')],

    data:{
       index1:'123',
       index2:'123',
    },

    onLoad: function (options) {
        this.setData({ page:'index'});
        console.log('实例中定义的数字');
    },

    audio(){
       wx.navigateTo({
           url:"/pages/index/audio/audio"
       })
    }



})
