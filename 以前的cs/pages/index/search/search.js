// pages/index/search/search.js
const app = getApp();
Page({
  data: {
    keyword: [],
    input: "",
    hots: [],
    suggest: [],
    showCancel:false
  },


  onLoad: function (options) {

  },

  onShow:function(){
        if(this.data.input){
          this.setData({ showCancel:true });
        }
  },



  onsearchresult: function (e) {
    // var formid = e.detail.formId;
          console.log(e);
          var keyword = e.detail.value.keyword;
          if (keyword.length != 0) {
              wx.navigateTo({
                  url:'/pages/index/search/result/result?name=' + keyword
              })
          }
  },

  clearInput:function(){
    this.setData({
      input: "",
      suggest: [],
      showCancel:false
    });
  },

  input: function (e) {
    if(e.detail.cursor > 0){
      this.setData({showCancel:true});
    }else{
      this.setData({showCancel:false});
    }
    var keyword = e.detail.value;
    if (keyword == "" || keyword.startWith("#")) {
      this.setData({
        suggest: []
      });
    }
  }
})
