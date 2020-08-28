//获取应用实例
const app = getApp();

let page = {

    data:{
       value:'一级页面',
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
    },


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


};

app.func.mpage(page);
