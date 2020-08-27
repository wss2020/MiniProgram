Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authoried: false,
    canshare: false,
    minprice: '',
    maxprice: '',
    activityid: null,
    mingprice: null,
    maxgprice: null,
    detail: '',
    dot: false,  //判断是否显示圆点，提示购买
    range: '',
    specs: [],
    skuid: null,
    img: "",
    count: 1, //购买数量,
    target: null, //目标0直接购买2购物车3开团4参团
    groupid: null,
    showrange: false, //显示配送区域
    specialgift_tips: false,
    choice: 0,  //当前选择规格下标
    selectgroupid: null,
    groups: [],
    groupcount: null,
    minusers: 0, //最小开团人数
    apitime: 0,//API调用时间
    send_tips: false,
    giftbag_tips: false,
    sale: '',  // 1正常  2代表下架
    choose_view: 1,
    prodList: [[], [], []],
    rushshop: 0,
    rushshopdetail: '',
    rushspecs: {},
    showaddon: 0,
    allfalse: '',
    buyaddonshop: false,
    addonshopskuid: '',
    addonshopprice: ''
  },


  onLoad: function (options) {

  },


})
