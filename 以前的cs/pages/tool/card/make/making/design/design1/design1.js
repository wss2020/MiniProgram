// pages/tool/card/make/making/design/design/design.js
const app = getApp();

const csdata = {
    "service_time": "( 工作时间9:00-16:00 国定节假日休息 )",
    "exchange": "1.本券4款商品中任意选择一款您喜欢的礼品进行兑换\n2.刮开礼品券上方银色覆盖区域密码，需完成刮开\n3.本券由上海点礼网络科技有限公司发行",
    "exchange1": "1.如因产品断货换季，请耐心等待或改换其他商品\n2.部分商品若因厂家或不可抗力造成缺货，我们将以其他等价值商品予以调换\n3.因填写姓名、地址、联系方式等收货信息不准确而造成的损失，我司概不负责\n4.本券售出不退换、不记名、不挂失、不找零、不兑换现金\n5.购券时已开具发票，发货时不在提供",
    "companyimg": "http://tmp/wxb9f007ffa632f98e.o6zAJs85dzQKLak6fKnXgc7nWS0U.62ejFhS1uKIn059f70546c48ce81f70ce9282b991a7c.jpg",
    "title": "123",
    "tel": "18856891034",
    "product1": {
        "id": 3019,
        "pro_id": 3019,
        "brand": "欧蕾、纪伊、自然味良品、韩之炫、帕克大叔、OKF",
        "title": "日韩进口食品E型",
        "image": "https://files.dianlinet.com/uploads/product/200x200/20190628826f7eabfebdb38806182b11eaf24646.jpg",
        "name": "日韩进口食品E型",
        "price": "139.10",
        "description": "秋山乳味什锦水果棒棒糖55gX1袋 纪伊曲奇饼干80.7gX1盒 自然味良品饼干83gX2袋 韩之炫 调味海苔12gX2袋\r\n韩之炫 炒海苔40gX1袋 纪伊酿造酱油150mLX1瓶 帕克大叔棒棒糖45gX1袋 三佳利茶饮料340gX1瓶 OKF苏打饮料250mLX1瓶 欧蕾特级初榨橄榄油500mLX1瓶"
    },
    "product2": {
        "id": 4037,
        "pro_id": 4037,
        "brand": "果王佳园",
        "title": "泰国新鲜大椰青4个 净重8斤左右",
        "image": "https://files.dianlinet.com/uploads/product/200x200/20191009aeed37c3bc44638555c286623e695f59.jpg",
        "name": "泰国新鲜大椰青4个 净重8斤左右",
        "price": "59.90",
        "description": "新鲜个大 充沛椰汁  清新椰香 入口甘甜"
    },
    "product3": {
        "id": 3843,
        "pro_id": 3843,
        "brand": "果王佳园",
        "title": "越南红心火龙果5个 1900g左右",
        "image": "https://files.dianlinet.com/uploads/product/200x200/201908195031b69eccb90f0b944459299ca2de56.jpg",
        "name": "越南红心火龙果5个 1900g左右",
        "price": "49.90",
        "description": "富含花青素  女神钟爱"
    },
    "product4": {
        "id": 1189,
        "pro_id": 1189,
        "brand": "统牌",
        "title": "一统进口海鲜礼盒VIII",
        "image": "https://files.dianlinet.com/uploads/product/200x200/20181116a20e90f64b8db785629bee059ac20470.jpg",
        "name": "一统进口海鲜礼盒VIII",
        "price": "410.00",
        "description": "  "
    },
    "product5": {
        "id": 3012,
        "pro_id": 3012,
        "brand": "无品牌名",
        "title": "日本朝日禾玲（原装进口）2019日化套装K型   ",
        "image": "https://files.dianlinet.com/uploads/product/200x200/2019062768a593d548a36c06aa77ba076c695d96.jpg",
        "name": "日本朝日禾玲（原装进口）2019日化套装K型   ",
        "price": "247.00",
        "description": "①睿缇盈彩闪耀洗发水 ②朝日禾玲 修复洗发水 ③朝日禾玲 修复护发素 ④爱敬 沐浴伴侣玫瑰和樱桃花沐浴液 ⑤唯齿康 牙刷（敏感护理型）⑥唯齿康闪耀牙膏（直立型）⑦嘟嘟脸纱布面巾⑧施姈 可仁水蜜桃滋润保湿身体乳液"
    },
    "product6": {
        "id": 4064,
        "pro_id": 4064,
        "brand": "wemge sabre ",
        "title": "瑞士军刀双肩包W-0079",
        "image": "https://files.dianlinet.com/uploads/product/200x200/201910168d72f704df0c033dabdff2a801eb70ce.jpg",
        "name": "瑞士军刀双肩包W-0079",
        "price": "91.80",
        "description": "精选尼龙-高弹发泡面料，防水耐磨性比较优越。大容量多口袋设计，实用性极佳，商务的外观更适合出差旅行。一款好的双肩包是一个好的生活伴侣"
    },
    "product7": {
        "id": 3271,
        "pro_id": 3271,
        "brand": "anello",
        "title": "anello日本ins潮风乐天双肩离家出走包（下单请备注颜色）",
        "image": "https://files.dianlinet.com/uploads/product/200x200/201907047a8e852c60a58940960e68d8104fb564.jpg",
        "name": "anello日本ins潮风乐天双肩离家出走包（下单请备注颜色）",
        "price": "225.00",
        "description": "型号：AT-B0193A\r\n名称：提包涤纶中号双肩背包\r\n材质：涤纶\r\n尺寸：27*17*40cm\r\n重量：0.61kg\r\n容量：15L\r\n口袋数：5个（外侧3/内侧2）\r\n下单前请备注颜色\r\n颜色：海军蓝，酒红，黑色，深橙色，深迷彩，卡其色等"
    },
    "product8": {
        "id": 4077,
        "pro_id": 4077,
        "brand": "水星",
        "title": "水星繁花梦语200*230cm 5X0029 ",
        "image": "https://files.dianlinet.com/uploads/product/200x200/20191017777f404f23764f745323db2eaf955781.jpg",
        "name": "水星繁花梦语200*230cm 5X0029 ",
        "price": "276.42",
        "description": "产品净重：1950g 产品毛重：2200g"
    },
    "product9": {
        "id": 31,
        "pro_id": 31,
        "brand": "水星家纺",
        "title": "水星家纺  清朗净醛抗菌羽丝绒被200*230cm  115318R",
        "image": "https://files.dianlinet.com/uploads/product/200x200/2018112179ac52443d4f714c48d08d2cf238fb6f.jpg",
        "name": "水星家纺  清朗净醛抗菌羽丝绒被200*230cm  115318R",
        "price": "223.38",
        "description": "水星家纺  清朗净醛抗菌羽丝绒被200*230cm  115318R"
    },
    "product10": {
        "id": 4041,
        "pro_id": 4041,
        "brand": "欧姆龙",
        "title": "欧姆龙3D美腿舒缓仪HM-252-BW",
        "image": "https://files.dianlinet.com/uploads/product/200x200/20191011e5dd9c72f99aca8b1d7faa5a1f076db6.jpg",
        "name": "欧姆龙3D美腿舒缓仪HM-252-BW",
        "price": "214.20",
        "description": "随时随地 缓解疲劳"
    },
    "product11": {
        "id": 4040,
        "pro_id": 4040,
        "brand": "欧姆龙",
        "title": "欧姆龙体重身体脂肪测量器HBF-214",
        "image": "https://files.dianlinet.com/uploads/product/200x200/20191011dddac5d773fc0156fa1fefb8432253d2.jpg",
        "name": "欧姆龙体重身体脂肪测量器HBF-214",
        "price": "244.80",
        "description": "简单测量 功能充实"
    },
    "product12": {
        "id": 876,
        "pro_id": 876,
        "brand": "SEMOO",
        "title": "SEMOO波斯顿双人休闲帐篷",
        "image": "https://files.dianlinet.com/uploads/product/200x200/201905246236ce12421b7fa46644ce628604b0ed.jpg",
        "name": "SEMOO波斯顿双人休闲帐篷",
        "price": "86.70",
        "description": "采用高韧性玻璃钢材质，柔韧性强，重量轻，减轻露营负重\r\n优质防雨材料，能放小到中雨，防水密度安全可靠\r\n双重门帘设计，内门采用纱网制作，透气防蚊，保护隐私又防雨。"
    },
    "product13": {
        "id": 3762,
        "pro_id": 3762,
        "brand": "babycare",
        "title": "babyare婴儿背带9821",
        "image": "https://files.dianlinet.com/uploads/product/200x200/201908065de3c0b6e89a130d15185714604d48bc.jpg",
        "name": "babyare婴儿背带9821",
        "price": "147.39",
        "description": "颜色可选：粉色、红色、薄荷蓝 ，如要指定颜色请备注 否则将随机发货！！！ \r\n"
    },
    "product14": {
        "id": 3745,
        "pro_id": 3745,
        "brand": "babycare",
        "title": "babycare7306管道积木",
        "image": "https://files.dianlinet.com/uploads/product/200x200/20190806810cab0c982081967001e28100f6b6c4.png",
        "name": "babycare7306管道积木",
        "price": "66.81",
        "description": "包装规格：33*20*18.5\r\n颜色：绿色 \r\n"
    },
    "product15": {
        "id": 3777,
        "pro_id": 3777,
        "brand": "babycare",
        "title": "babycare3062 硅胶指套牙刷",
        "image": "https://files.dianlinet.com/uploads/product/200x200/201908069e926cb0ee84732162128552e8783715.jpg",
        "name": "babycare3062 硅胶指套牙刷",
        "price": "16.32",
        "description": "白色\r\n"
    },
    "product16": {
        "id": 4036,
        "pro_id": 4036,
        "brand": "芭芭瑞拉",
        "title": "芭芭瑞拉 花样礼盒 ",
        "image": "https://files.dianlinet.com/uploads/product/200x200/20190926e895487c7b8c311c6a58d5cb19a8d8df.jpg",
        "name": "芭芭瑞拉 花样礼盒 ",
        "price": "51.00",
        "description": "芭芭瑞拉 花样护手霜60ml*3"
    },
    "time": "1.礼品券兑换有效期至[color=#cb231c]2020年08月31日[/color]\n"
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: [],            //画图的数据
        current: 1,          //默认显示 A 面
        designerWidth: 0,    // canvas 的宽度
        designerHeight1: 0,  // A 面高度
        designerHeight2: 0,  // B 面高度
        showbox: true,       // 默认加载组件
        toupload: {},        //
        addpro: '',          //
        areas1: [],          // A面模版文件数据
        areas2: [],          // B面模版文件数据
        wizarda: false,      // 默认 隐藏 B 面向导蒙层
        wizardb: true,       // 默认 显示 A 面向导蒙层
        wizardindexa: 0,     // 默认显示A面 第0个向导
        wizardindexb: 0,     // 默认显示B面 第0个向导
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        this.setData({
            data:csdata,
        }, () => {
            wx.getSystemInfo({       // 获取系统信息
                success(res) {
                    var width = res.windowWidth - 20;
                    that.setData({   designerWidth: width  });
                    //dataA A面模版数据   dataB  B面模版数据
                    let dataA = [
                        {
                            "height": 174.0,
                            "width": 355.0,
                            "background": "https://files.dianlinet.com/dianli/images/2019-11-22/14-29-12.jpg",
                            "texts": [{
                                "height": 30.0,
                                "width": 90.0,
                                "field": "title",
                                "left": 185.0,
                                "top": 138.0,
                                "tooltip": "型号",
                                "option": "normal",
                                "wizardindex": 1,
                                "borderColor": "rgb(0,244,255)",
                                "font": 18.0,
                                "fontFamily": "FZCuQian-M17S",
                                "color": "232,198,115",
                                "align": "right",
                                "multiline": "false"
                            }],
                            "rotate": 0
                        },
                        {
                            "height": 172.0,
                            "width": 355.0,
                            "background": "https://files.dianlinet.com/dianli/images/2019-11-22/14-31-26.jpg",
                            "texts": [
                                {
                                    "height": 24.0,
                                    "width": 36.0,
                                    "field": "tel",
                                    "left": 44.0,
                                    "top": 89.0,
                                    "tooltip": "电话",
                                    "option": "normal",
                                    "wizardindex": 3,
                                    "borderColor": "rgb(0,255,255)",
                                    "font": 6.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "BOLD",
                                    "color": "120,119,119",
                                    "align": "left",
                                    "multiline": "false"
                                },
                                {
                                    "height": 36.0,
                                    "width": 141.0,
                                    "field": "exchange",
                                    "left": 16.0,
                                    "top": 129.0,
                                    "tooltip": "兑换须知",
                                    "option": "normal",
                                    "wizardindex": 5,
                                    "borderColor": "rgb(0,255,255)",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 3,
                                    "valign": "top"
                                },
                                {
                                    "height": 75.0,
                                    "width": 156.0,
                                    "field": "exchange1",
                                    "left": 187.0,
                                    "top": 27.0,
                                    "tooltip": "友情提示",
                                    "option": "normal",
                                    "wizardindex": 2,
                                    "borderColor": "rgb(0,255,255)",
                                    "font": 6.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 3,
                                    "valign": "top"
                                },
                                {
                                    "height": 36.0,
                                    "width": 108.0,
                                    "field": "time",
                                    "left": 187.0,
                                    "top": 126.0,
                                    "tooltip": "使用有效期",
                                    "option": "normal",
                                    "wizardindex": 6,
                                    "borderColor": "rgb(0,255,255)",
                                    "font": 6.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 1,
                                    "input": "date",
                                    "format": "yyyy年MM月dd日",
                                    "valign": "top"
                                }
                            ],
                            "images": [{
                                "height": 41.0,
                                "width": 41.0,
                                "field": "companyimg",
                                "left": 299.0,
                                "top": 120.0,
                                "tooltip": "公司印章",
                                "option": "normal",
                                "wizardindex": 4,
                                "borderColor": "rgb(0,255,255)"
                            }],
                            "rotate": 0
                        }
                    ];
                    let dataB = [
                        {
                            "height": 173.0,
                            "width": 355.0,
                            "background": "https://files.dianlinet.com/dianli/images/2019-12-24/11-39-22.jpg",
                            "products": [
                                {
                                    "height": 66.0,
                                    "width": 105.0,
                                    "texts": [
                                        {
                                            "height": 9.0,
                                            "width": 42.0,
                                            "field": "brand",
                                            "left": 0.0,
                                            "top": 0.0,
                                            "tooltip": "品牌",
                                            "option": "normal",
                                            "font": 5.0,
                                            "fontFamily": "Microsoft YaHei",
                                            "fontStyle": "REGULAR",
                                            "color": "255,255,255",
                                            "align": "center",
                                            "multiline": "false"
                                        },
                                        {
                                            "height": 9.0,
                                            "width": 44.0,
                                            "field": "title",
                                            "left": 3.0,
                                            "top": 11.0,
                                            "tooltip": "商品名",
                                            "option": "normal",
                                            "font": 4.0,
                                            "fontFamily": "Microsoft YaHei",
                                            "fontStyle": "REGULAR",
                                            "color": "0,0,0",
                                            "align": "left",
                                            "multiline": "true",
                                            "linebreak": 0,
                                            "valign": "bottom"
                                        },
                                        {
                                            "height": 54.0,
                                            "width": 54.0,
                                            "field": "description",
                                            "left": 3.0,
                                            "top": 23.0,
                                            "tooltip": "简介",
                                            "option": "normal",
                                            "font": 4.0,
                                            "fontFamily": "Microsoft YaHei",
                                            "fontStyle": "REGULAR",
                                            "color": "102,102,102",
                                            "align": "left",
                                            "multiline": "true",
                                            "linebreak": 0,
                                            "valign": "top"
                                        }],
                                    "images": [{
                                        "height": 48.0,
                                        "width": 48.0,
                                        "field": "image",
                                        "left": 53.0,
                                        "top": 12.0,
                                        "tooltip": "商品图",
                                        "option": "normal"
                                    }],
                                    "field": "product1",
                                    "left": 58.0,
                                    "top": 19.0,
                                    "tooltip": "产品2",
                                    "wizardindex": 1,
                                    "borderColor": "rgb(0,159,255)"
                                },
                                {
                                    "height": 66.0,
                                    "width": 105.0,
                                    "texts": [
                                        {
                                            "height": 9.0,
                                            "width": 42.0,
                                            "field": "brand",
                                            "left": 0.0,
                                            "top": 0.0,
                                            "tooltip": "品牌",
                                            "option": "normal",
                                            "font": 5.0,
                                            "fontFamily": "Microsoft YaHei",
                                            "fontStyle": "REGULAR",
                                            "color": "255,255,255",
                                            "align": "center",
                                            "multiline": "false"
                                        },
                                        {
                                            "height": 9.0,
                                            "width": 44.0,
                                            "field": "title",
                                            "left": 3.0,
                                            "top": 11.0,
                                            "tooltip": "商品名",
                                            "option": "normal",
                                            "font": 4.0,
                                            "fontFamily": "Microsoft YaHei",
                                            "fontStyle": "REGULAR",
                                            "color": "0,0,0",
                                            "align": "left",
                                            "multiline": "true",
                                            "linebreak": 0,
                                            "valign": "bottom"
                                        },
                                        {
                                            "height": 54.0,
                                            "width": 54.0,
                                            "field": "description",
                                            "left": 3.0,
                                            "top": 23.0,
                                            "tooltip": "简介",
                                            "option": "normal",
                                            "font": 4.0,
                                            "fontFamily": "Microsoft YaHei",
                                            "fontStyle": "REGULAR",
                                            "color": "102,102,102",
                                            "align": "left",
                                            "multiline": "true",
                                            "linebreak": 0,
                                            "valign": "top"
                                        }],
                                    "images": [{
                                        "height": 48.0,
                                        "width": 48.0,
                                        "field": "image",
                                        "left": 53.0,
                                        "top": 12.0,
                                        "tooltip": "商品图",
                                        "option": "normal"
                                    }],
                                    "field": "product2",
                                    "left": 192.0,
                                    "top": 19.0,
                                    "tooltip": "产品2",
                                    "wizardindex": 2,
                                    "borderColor": "rgb(0,255,255)"
                                },
                                {
                                    "height": 66.0,
                                    "width": 105.0,
                                    "texts": [{
                                        "height": 9.0,
                                        "width": 42.0,
                                        "field": "brand",
                                        "left": 0.0,
                                        "top": 0.0,
                                        "tooltip": "品牌",
                                        "option": "normal",
                                        "font": 5.0,
                                        "fontFamily": "Microsoft YaHei",
                                        "fontStyle": "REGULAR",
                                        "color": "255,255,255",
                                        "align": "center",
                                        "multiline": "false"
                                    }, {
                                        "height": 9.0,
                                        "width": 44.0,
                                        "field": "title",
                                        "left": 3.0,
                                        "top": 11.0,
                                        "tooltip": "商品名",
                                        "option": "normal",
                                        "font": 4.0,
                                        "fontFamily": "Microsoft YaHei",
                                        "fontStyle": "REGULAR",
                                        "color": "0,0,0",
                                        "align": "left",
                                        "multiline": "true",
                                        "linebreak": 0,
                                        "valign": "bottom"
                                    }, {
                                        "height": 54.0,
                                        "width": 54.0,
                                        "field": "description",
                                        "left": 3.0,
                                        "top": 23.0,
                                        "tooltip": "简介",
                                        "option": "normal",
                                        "font": 4.0,
                                        "fontFamily": "Microsoft YaHei",
                                        "fontStyle": "REGULAR",
                                        "color": "102,102,102",
                                        "align": "left",
                                        "multiline": "true",
                                        "linebreak": 0,
                                        "valign": "top"
                                    }],
                                    "images": [{
                                        "height": 48.0,
                                        "width": 48.0,
                                        "field": "image",
                                        "left": 53.0,
                                        "top": 12.0,
                                        "tooltip": "商品图",
                                        "option": "normal"
                                    }],
                                    "field": "product3",
                                    "left": 58.0,
                                    "top": 95.0,
                                    "tooltip": "产品2",
                                    "wizardindex": 3,
                                    "borderColor": "rgb(0,255,255)"
                                },
                                {
                                    "height": 66.0,
                                    "width": 105.0,
                                    "texts": [{
                                        "height": 9.0,
                                        "width": 42.0,
                                        "field": "brand",
                                        "left": 0.0,
                                        "top": 0.0,
                                        "tooltip": "品牌",
                                        "option": "normal",
                                        "font": 5.0,
                                        "fontFamily": "Microsoft YaHei",
                                        "fontStyle": "REGULAR",
                                        "color": "255,255,255",
                                        "align": "center",
                                        "multiline": "false"
                                    }, {
                                        "height": 9.0,
                                        "width": 44.0,
                                        "field": "title",
                                        "left": 3.0,
                                        "top": 11.0,
                                        "tooltip": "商品名",
                                        "option": "normal",
                                        "font": 4.0,
                                        "fontFamily": "Microsoft YaHei",
                                        "fontStyle": "REGULAR",
                                        "color": "0,0,0",
                                        "align": "left",
                                        "multiline": "true",
                                        "linebreak": 0,
                                        "valign": "bottom"
                                    }, {
                                        "height": 54.0,
                                        "width": 54.0,
                                        "field": "description",
                                        "left": 3.0,
                                        "top": 23.0,
                                        "tooltip": "简介",
                                        "option": "normal",
                                        "font": 4.0,
                                        "fontFamily": "Microsoft YaHei",
                                        "fontStyle": "REGULAR",
                                        "color": "102,102,102",
                                        "align": "left",
                                        "multiline": "true",
                                        "linebreak": 0,
                                        "valign": "top"
                                    }],
                                    "images": [{
                                        "height": 48.0,
                                        "width": 48.0,
                                        "field": "image",
                                        "left": 53.0,
                                        "top": 12.0,
                                        "tooltip": "商品图",
                                        "option": "normal"
                                    }],
                                    "field": "product4",
                                    "left": 192.0,
                                    "top": 95.0,
                                    "tooltip": "产品2",
                                    "wizardindex": 4,
                                    "borderColor": "rgb(0,159,255)"
                                }],
                            "rotate": 0
                        },
                        {
                            "height": 168.0,
                            "width": 355.0,
                            "background": "https://files.dianlinet.com/dianli/images/2019-12-24/11-39-35.jpg",
                            "products": [{
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product5",
                                "left": 12.0,
                                "top": 13.0,
                                "tooltip": "产品2",
                                "wizardindex": 5,
                                "borderColor": "rgb(0,255,255)"
                            }, {
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product6",
                                "left": 125.0,
                                "top": 13.0,
                                "tooltip": "产品2",
                                "wizardindex": 6,
                                "borderColor": "rgb(0,127,255)"
                            }, {
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product7",
                                "left": 238.0,
                                "top": 13.0,
                                "tooltip": "产品2",
                                "wizardindex": 7,
                                "borderColor": "rgb(0,255,255)"
                            }, {
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product8",
                                "left": 12.0,
                                "top": 91.0,
                                "tooltip": "产品2",
                                "wizardindex": 8,
                                "borderColor": "rgb(0,102,255)"
                            }, {
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product9",
                                "left": 125.0,
                                "top": 91.0,
                                "tooltip": "产品2",
                                "wizardindex": 9,
                                "borderColor": "rgb(0,255,255)"
                            }, {
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product10",
                                "left": 238.0,
                                "top": 91.0,
                                "tooltip": "产品2",
                                "wizardindex": 10,
                                "borderColor": "rgb(0,102,255)"
                            }],
                            "rotate": 0
                        },
                        {
                            "height": 173.0,
                            "width": 355.0,
                            "background": "https://files.dianlinet.com/dianli/images/2019-12-24/11-40-42.jpg",
                            "products": [{
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product11",
                                "left": 12.0,
                                "top": 12.0,
                                "tooltip": "产品2",
                                "wizardindex": 11,
                                "borderColor": "rgb(0,255,255)"
                            }, {
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product12",
                                "left": 125.0,
                                "top": 12.0,
                                "tooltip": "产品2",
                                "wizardindex": 12,
                                "borderColor": "rgb(0,109,255)"
                            }, {
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product13",
                                "left": 238.0,
                                "top": 12.0,
                                "tooltip": "产品2",
                                "wizardindex": 13,
                                "borderColor": "rgb(0,255,255)"
                            }, {
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product14",
                                "left": 12.0,
                                "top": 90.0,
                                "tooltip": "产品2",
                                "wizardindex": 14,
                                "borderColor": "rgb(0,152,255)"
                            }, {
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product15",
                                "left": 125.0,
                                "top": 90.0,
                                "tooltip": "产品2",
                                "wizardindex": 15,
                                "borderColor": "rgb(0,255,255)"
                            }, {
                                "height": 66.0,
                                "width": 105.0,
                                "texts": [{
                                    "height": 9.0,
                                    "width": 42.0,
                                    "field": "brand",
                                    "left": 0.0,
                                    "top": 0.0,
                                    "tooltip": "品牌",
                                    "option": "normal",
                                    "font": 5.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "255,255,255",
                                    "align": "center",
                                    "multiline": "false"
                                }, {
                                    "height": 9.0,
                                    "width": 44.0,
                                    "field": "title",
                                    "left": 3.0,
                                    "top": 11.0,
                                    "tooltip": "商品名",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "0,0,0",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "bottom"
                                }, {
                                    "height": 54.0,
                                    "width": 54.0,
                                    "field": "description",
                                    "left": 3.0,
                                    "top": 23.0,
                                    "tooltip": "简介",
                                    "option": "normal",
                                    "font": 4.0,
                                    "fontFamily": "Microsoft YaHei",
                                    "fontStyle": "REGULAR",
                                    "color": "102,102,102",
                                    "align": "left",
                                    "multiline": "true",
                                    "linebreak": 0,
                                    "valign": "top"
                                }],
                                "images": [{
                                    "height": 48.0,
                                    "width": 48.0,
                                    "field": "image",
                                    "left": 53.0,
                                    "top": 12.0,
                                    "tooltip": "商品图",
                                    "option": "normal"
                                }],
                                "field": "product16",
                                "left": 238.0,
                                "top": 90.0,
                                "tooltip": "产品2",
                                "wizardindex": 16,
                                "borderColor": "rgb(0,102,255)"
                            }],
                            "rotate": 0
                        }
                    ];
                    that.processTemplate(dataA, 1);
                    that.processTemplate(dataB, 2);
                }
            });

        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (res) {
        let result = app.func.getModalResult();     //经典传数据的方法    获取，商品库页面，选中的商品
        if(result != null) {
            this.setData({
                addpro: result
            }, () => {
                this.setData({
                    addpro: []
                });
            });
        }
    },

    processTemplate(template, index) {
        // let areas = JSON.parse(template);
        let areas = template;
        let height = 0;
        var that = this;
        for (let i = 0; i < areas.length; i++) {      //对每个区域做不同的处理  A面两个区域  B面三个区域
            let area = areas[i];
            area.top = height;
            height = height + area.height;
        }
        var areaname = "areas" + index;
        var desingerHeight = "designerHeight" + index;
        that.setData({
            [areaname]: areas,
            [desingerHeight]: height
        });
    },



    //选择A面  B面
    choosetype: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({current: index});
    },


    //A面向导蒙层 引导结束，显示 B面
    wizardFinishA: function(e) {
        this.setData({wizarda:false}, () => {
            if(this.data.wizardb) {
                this.setData({current: 2});
            }
        });
    },

    //B面向导蒙层 引导结束，显示 A面
    wizardFinishB: function(e) {
        this.setData({wizardb:false}, () => {
            if(this.data.wizarda) {
                this.setData({current: 1});
            } else {
                console.log("wizard finish");
            }
        });
    },


    //当前点击A面第几个向导
    wizardNextA: function(e) {
        this.setData({
            wizardindexa: e.detail.index
        });
    },

    //当前点击B面第几个向导
    wizardNextB: function(e) {
        this.setData({
            wizardindexb: e.detail.index
        });
    },


    selfstyle: function () {
        this.setData({
            showbox: true
        });
    },



    //添加商品
    addproduct: function () {
        var length = Object.keys(this.data.data).length - 5;
        wx.navigateTo({
            url: "/pages/tool/card/make/addproduck/addproduct?id=null&length=" + length
        })
    },

    // 数据发生变化
    onDataChangeda: function (res) {
        console.log(res);
        var toupdate = 'data.' + res.detail.field;
        var that = this;
        var toset = [];
        if(res.detail.wizard != null) {
            toset["wizardindexa"] = res.detail.wizard;
        }
        if (res.detail.data != null) {
            toset[toupdate] = res.detail.data ? res.detail.data : null;
            this.setData(toset, () => {
                if (res.detail.toupload != null) {
                    var toupload = "toupload." + res.detail.toupload;
                    that.setData({
                        [toupload]: true,
                    })
                }
            });
        } else {
            var data = this.data.data;
            delete data[res.detail.field];
            that.setData({"data": data});
        }
    },


    // 数据发生变化
    onDataChangedb: function (res) {
        console.log(res);
        var toupdate = 'data.' + res.detail.field;
        var that = this;
        var toset = [];
        if(res.detail.wizard != null) {
            toset["wizardindexb"] = res.detail.wizard;
        }
        if (res.detail.data != null) {
            toset[toupdate] = res.detail.data ? res.detail.data : null;
            this.setData(toset, () => {
                if (res.detail.toupload != null) {
                    var toupload = "toupload." + res.detail.toupload;
                    that.setData({
                        [toupload]: true,
                    })
                }
            });
        } else {
            var data = this.data.data;
            delete data[res.detail.field];
            that.setData({"data": data});
        }
    },


    //上传图片
    upload: function () {
        let toupload = this.data.toupload;
        let data = this.data.data;
        var promises = [];
        var i = 0;
        for (let key in toupload) {
            let suffix = i++;
            let value = toupload[key];
            if (value) {
                let src = data[key];
                promises.push(
                    app.func.uploadPromise("/v2/image/upload", src, 'file', {suffix:suffix}).then(function ([code, res]) {
                        if (code == 3102 || code == 3103) {
                            return app.func.toastPromise('图片内容违规').then((resolve, reject) => {
                                reject();
                            });
                        } else {
                            data[key] = res.data;
                            toupload[key] = false;
                        }
                    })
                );
            }
        }
        return app.func.promise_all(promises).then(() => {
            return app.func.promise((resolve, reject) => {
                this.setData({
                    data: data,
                    toupload: toupload
                }, resolve);
            });
        })
    },


    //预览
    preview: function (res) {
        console.log(JSON.stringify(this.data.data));
        this.upload()
            .then(() => {
                var data = this.data.data;
                var urls = [];
                app.func.postPromise("/v2/test/card/preview/1", data)
                    .then(([code, res]) => {
                        urls.push(res.data);
                        return app.func.postPromise("/v2/test/card/preview/2", data);
                    })
                    .then(([code, res]) => {
                        urls.push(res.data);
                    })
                    .then(() => {
                        wx.previewImage({
                            current: urls[0],
                            urls: urls
                        })
                    })
            });
    },

    //提交信息
    submit_info: function () {
        var data = this.data.data;
        if (data.title.length == 0) {
            app.func.toastPromise('面值不能为空');
            return;
        } else if (data.time.length == 0) {
            app.func.toastPromise('卡券有效期不能为空');
            return;
        } else if (!data.product1) {
            app.func.toastPromise('产品不能为空');
            return;
        }

        this.upload()
            .then(() => {
                // var atemplate = JSON.stringify(this.data.areas1);
                // var btemplate = JSON.stringify(this.data.areas2);
                var params = JSON.stringify(this.data.data);
                app.func.postPromise('/card/template', {
                    a_template: '',
                    b_template: '',
                    params: params,
                }).then(([code, res]) => {
                    if (code == 200) {
                        app.func.toastPromise('提交成功')
                            .then(() => {
                                wx.redirectTo({
                                    url: '/pages/tool/card/make/making/design/submit/submit?id=' + res.data.id + '&title=' + res.data.title,
                                })
                            })
                    } else {
                        app.func.toastPromise(res.message);
                    }
                })
            });
    }
})

























// // pages/tool/card/make/making/design/design/design.js
// const app = getApp();
//
// const csdata = {
//     "service_time": "( 工作时间9:00-16:00 国定节假日休息 )",
//     "exchange": "1.本券4款商品中任意选择一款您喜欢的礼品进行兑换\n2.刮开礼品券上方银色覆盖区域密码，需完成刮开\n3.本券由上海点礼网络科技有限公司发行",
//     "exchange1": "1.如因产品断货换季，请耐心等待或改换其他商品\n2.部分商品若因厂家或不可抗力造成缺货，我们将以其他等价值商品予以调换\n3.因填写姓名、地址、联系方式等收货信息不准确而造成的损失，我司概不负责\n4.本券售出不退换、不记名、不挂失、不找零、不兑换现金\n5.购券时已开具发票，发货时不在提供",
//     "companyimg": "http://tmp/wxb9f007ffa632f98e.o6zAJs85dzQKLak6fKnXgc7nWS0U.62ejFhS1uKIn059f70546c48ce81f70ce9282b991a7c.jpg",
//     "title": "123",
//     "tel": "18856891034",
//     "product1": {
//         "id": 3019,
//         "pro_id": 3019,
//         "brand": "欧蕾、纪伊、自然味良品、韩之炫、帕克大叔、OKF",
//         "title": "日韩进口食品E型",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/20190628826f7eabfebdb38806182b11eaf24646.jpg",
//         "name": "日韩进口食品E型",
//         "price": "139.10",
//         "description": "秋山乳味什锦水果棒棒糖55gX1袋 纪伊曲奇饼干80.7gX1盒 自然味良品饼干83gX2袋 韩之炫 调味海苔12gX2袋\r\n韩之炫 炒海苔40gX1袋 纪伊酿造酱油150mLX1瓶 帕克大叔棒棒糖45gX1袋 三佳利茶饮料340gX1瓶 OKF苏打饮料250mLX1瓶 欧蕾特级初榨橄榄油500mLX1瓶"
//     },
//     "product2": {
//         "id": 4037,
//         "pro_id": 4037,
//         "brand": "果王佳园",
//         "title": "泰国新鲜大椰青4个 净重8斤左右",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/20191009aeed37c3bc44638555c286623e695f59.jpg",
//         "name": "泰国新鲜大椰青4个 净重8斤左右",
//         "price": "59.90",
//         "description": "新鲜个大 充沛椰汁  清新椰香 入口甘甜"
//     },
//     "product3": {
//         "id": 3843,
//         "pro_id": 3843,
//         "brand": "果王佳园",
//         "title": "越南红心火龙果5个 1900g左右",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/201908195031b69eccb90f0b944459299ca2de56.jpg",
//         "name": "越南红心火龙果5个 1900g左右",
//         "price": "49.90",
//         "description": "富含花青素  女神钟爱"
//     },
//     "product4": {
//         "id": 1189,
//         "pro_id": 1189,
//         "brand": "统牌",
//         "title": "一统进口海鲜礼盒VIII",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/20181116a20e90f64b8db785629bee059ac20470.jpg",
//         "name": "一统进口海鲜礼盒VIII",
//         "price": "410.00",
//         "description": "  "
//     },
//     "product5": {
//         "id": 3012,
//         "pro_id": 3012,
//         "brand": "无品牌名",
//         "title": "日本朝日禾玲（原装进口）2019日化套装K型   ",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/2019062768a593d548a36c06aa77ba076c695d96.jpg",
//         "name": "日本朝日禾玲（原装进口）2019日化套装K型   ",
//         "price": "247.00",
//         "description": "①睿缇盈彩闪耀洗发水 ②朝日禾玲 修复洗发水 ③朝日禾玲 修复护发素 ④爱敬 沐浴伴侣玫瑰和樱桃花沐浴液 ⑤唯齿康 牙刷（敏感护理型）⑥唯齿康闪耀牙膏（直立型）⑦嘟嘟脸纱布面巾⑧施姈 可仁水蜜桃滋润保湿身体乳液"
//     },
//     "product6": {
//         "id": 4064,
//         "pro_id": 4064,
//         "brand": "wemge sabre ",
//         "title": "瑞士军刀双肩包W-0079",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/201910168d72f704df0c033dabdff2a801eb70ce.jpg",
//         "name": "瑞士军刀双肩包W-0079",
//         "price": "91.80",
//         "description": "精选尼龙-高弹发泡面料，防水耐磨性比较优越。大容量多口袋设计，实用性极佳，商务的外观更适合出差旅行。一款好的双肩包是一个好的生活伴侣"
//     },
//     "product7": {
//         "id": 3271,
//         "pro_id": 3271,
//         "brand": "anello",
//         "title": "anello日本ins潮风乐天双肩离家出走包（下单请备注颜色）",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/201907047a8e852c60a58940960e68d8104fb564.jpg",
//         "name": "anello日本ins潮风乐天双肩离家出走包（下单请备注颜色）",
//         "price": "225.00",
//         "description": "型号：AT-B0193A\r\n名称：提包涤纶中号双肩背包\r\n材质：涤纶\r\n尺寸：27*17*40cm\r\n重量：0.61kg\r\n容量：15L\r\n口袋数：5个（外侧3/内侧2）\r\n下单前请备注颜色\r\n颜色：海军蓝，酒红，黑色，深橙色，深迷彩，卡其色等"
//     },
//     "product8": {
//         "id": 4077,
//         "pro_id": 4077,
//         "brand": "水星",
//         "title": "水星繁花梦语200*230cm 5X0029 ",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/20191017777f404f23764f745323db2eaf955781.jpg",
//         "name": "水星繁花梦语200*230cm 5X0029 ",
//         "price": "276.42",
//         "description": "产品净重：1950g 产品毛重：2200g"
//     },
//     "product9": {
//         "id": 31,
//         "pro_id": 31,
//         "brand": "水星家纺",
//         "title": "水星家纺  清朗净醛抗菌羽丝绒被200*230cm  115318R",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/2018112179ac52443d4f714c48d08d2cf238fb6f.jpg",
//         "name": "水星家纺  清朗净醛抗菌羽丝绒被200*230cm  115318R",
//         "price": "223.38",
//         "description": "水星家纺  清朗净醛抗菌羽丝绒被200*230cm  115318R"
//     },
//     "product10": {
//         "id": 4041,
//         "pro_id": 4041,
//         "brand": "欧姆龙",
//         "title": "欧姆龙3D美腿舒缓仪HM-252-BW",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/20191011e5dd9c72f99aca8b1d7faa5a1f076db6.jpg",
//         "name": "欧姆龙3D美腿舒缓仪HM-252-BW",
//         "price": "214.20",
//         "description": "随时随地 缓解疲劳"
//     },
//     "product11": {
//         "id": 4040,
//         "pro_id": 4040,
//         "brand": "欧姆龙",
//         "title": "欧姆龙体重身体脂肪测量器HBF-214",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/20191011dddac5d773fc0156fa1fefb8432253d2.jpg",
//         "name": "欧姆龙体重身体脂肪测量器HBF-214",
//         "price": "244.80",
//         "description": "简单测量 功能充实"
//     },
//     "product12": {
//         "id": 876,
//         "pro_id": 876,
//         "brand": "SEMOO",
//         "title": "SEMOO波斯顿双人休闲帐篷",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/201905246236ce12421b7fa46644ce628604b0ed.jpg",
//         "name": "SEMOO波斯顿双人休闲帐篷",
//         "price": "86.70",
//         "description": "采用高韧性玻璃钢材质，柔韧性强，重量轻，减轻露营负重\r\n优质防雨材料，能放小到中雨，防水密度安全可靠\r\n双重门帘设计，内门采用纱网制作，透气防蚊，保护隐私又防雨。"
//     },
//     "product13": {
//         "id": 3762,
//         "pro_id": 3762,
//         "brand": "babycare",
//         "title": "babyare婴儿背带9821",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/201908065de3c0b6e89a130d15185714604d48bc.jpg",
//         "name": "babyare婴儿背带9821",
//         "price": "147.39",
//         "description": "颜色可选：粉色、红色、薄荷蓝 ，如要指定颜色请备注 否则将随机发货！！！ \r\n"
//     },
//     "product14": {
//         "id": 3745,
//         "pro_id": 3745,
//         "brand": "babycare",
//         "title": "babycare7306管道积木",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/20190806810cab0c982081967001e28100f6b6c4.png",
//         "name": "babycare7306管道积木",
//         "price": "66.81",
//         "description": "包装规格：33*20*18.5\r\n颜色：绿色 \r\n"
//     },
//     "product15": {
//         "id": 3777,
//         "pro_id": 3777,
//         "brand": "babycare",
//         "title": "babycare3062 硅胶指套牙刷",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/201908069e926cb0ee84732162128552e8783715.jpg",
//         "name": "babycare3062 硅胶指套牙刷",
//         "price": "16.32",
//         "description": "白色\r\n"
//     },
//     "product16": {
//         "id": 4036,
//         "pro_id": 4036,
//         "brand": "芭芭瑞拉",
//         "title": "芭芭瑞拉 花样礼盒 ",
//         "image": "https://files.dianlinet.com/uploads/product/200x200/20190926e895487c7b8c311c6a58d5cb19a8d8df.jpg",
//         "name": "芭芭瑞拉 花样礼盒 ",
//         "price": "51.00",
//         "description": "芭芭瑞拉 花样护手霜60ml*3"
//     },
//     "time": "1.礼品券兑换有效期至[color=#cb231c]2020年08月31日[/color]\n"
// }
//
// Page({
//
//     /**
//      * 页面的初始数据
//      */
//     data: {
//         current: 1,
//         data: [],
//         designerWidth: 0,
//         designerHeight1: 0,
//         designerHeight2: 0,
//         showbox: true,
//         toupload: {},
//         addpro: '',
//         areas1: [],
//         areas2: [],
//         wizarda: true,
//         wizardb: true,
//         wizardindexa: 0,
//         wizardindexb: 0,
//     },
//
//     /**
//      * 生命周期函数--监听页面加载
//      */
//     onLoad: function (options) {
//         var that = this;
//         this.setData({
//             data:csdata,
//
//             // data: {
//             //     "service_time": "( 工作时间9:00-16:00 国定节假日休息 )",
//             //     "exchange": "1.本券4款商品中任意选择一款您喜欢的礼品进行兑换\n2.刮开礼品券上方银色覆盖区域密码，需完成刮开\n3.本券由上海点礼网络科技有限公司发行",
//             //     "exchange1": "1.如因产品断货换季，请耐心等待或改换其他商品\n2.部分商品若因厂家或不可抗力造成缺货，我们将以其他等价值商品予以调换\n3.因填写姓名、地址、联系方式等收货信息不准确而造成的损失，我司概不负责\n4.本券售出不退换、不记名、不挂失、不找零、不兑换现金\n5.购券时已开具发票，发货时不在提供",
//             // }
//         }, () => {
//             wx.getSystemInfo({
//                 success(res) {
//                     var width = res.windowWidth - 20;
//                     that.setData({
//                         designerWidth: width
//                     });
//                     app.func.getPromise('/v2/test/card/1/' + width)
//                         .then(([code, res]) => {
//
//                             // that.processTemplate(res.data, 1);
//                             let data = [
//                                 {
//                                     "height": 174.0,
//                                     "width": 355.0,
//                                     "background": "https://files.dianlinet.com/dianli/images/2019-11-22/14-29-12.jpg",
//                                     "texts": [{
//                                         "height": 30.0,
//                                         "width": 90.0,
//                                         "field": "title",
//                                         "left": 185.0,
//                                         "top": 138.0,
//                                         "tooltip": "型号",
//                                         "option": "normal",
//                                         "wizardindex": 1,
//                                         "borderColor": "rgb(0,244,255)",
//                                         "font": 18.0,
//                                         "fontFamily": "FZCuQian-M17S",
//                                         "color": "232,198,115",
//                                         "align": "right",
//                                         "multiline": "false"
//                                     }],
//                                     "rotate": 0
//                                 },
//                                 {
//                                     "height": 172.0,
//                                     "width": 355.0,
//                                     "background": "https://files.dianlinet.com/dianli/images/2019-11-22/14-31-26.jpg",
//                                     "texts": [
//                                         {
//                                             "height": 24.0,
//                                             "width": 36.0,
//                                             "field": "tel",
//                                             "left": 44.0,
//                                             "top": 89.0,
//                                             "tooltip": "电话",
//                                             "option": "normal",
//                                             "wizardindex": 3,
//                                             "borderColor": "rgb(0,255,255)",
//                                             "font": 6.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "BOLD",
//                                             "color": "120,119,119",
//                                             "align": "left",
//                                             "multiline": "false"
//                                         },
//                                         {
//                                             "height": 36.0,
//                                             "width": 141.0,
//                                             "field": "exchange",
//                                             "left": 16.0,
//                                             "top": 129.0,
//                                             "tooltip": "兑换须知",
//                                             "option": "normal",
//                                             "wizardindex": 5,
//                                             "borderColor": "rgb(0,255,255)",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 3,
//                                             "valign": "top"
//                                         },
//                                         {
//                                             "height": 75.0,
//                                             "width": 156.0,
//                                             "field": "exchange1",
//                                             "left": 187.0,
//                                             "top": 27.0,
//                                             "tooltip": "友情提示",
//                                             "option": "normal",
//                                             "wizardindex": 2,
//                                             "borderColor": "rgb(0,255,255)",
//                                             "font": 6.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 3,
//                                             "valign": "top"
//                                         },
//                                         {
//                                             "height": 36.0,
//                                             "width": 108.0,
//                                             "field": "time",
//                                             "left": 187.0,
//                                             "top": 126.0,
//                                             "tooltip": "使用有效期",
//                                             "option": "normal",
//                                             "wizardindex": 6,
//                                             "borderColor": "rgb(0,255,255)",
//                                             "font": 6.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 1,
//                                             "input": "date",
//                                             "format": "yyyy年MM月dd日",
//                                             "valign": "top"
//                                         }
//                                     ],
//                                     "images": [{
//                                         "height": 41.0,
//                                         "width": 41.0,
//                                         "field": "companyimg",
//                                         "left": 299.0,
//                                         "top": 120.0,
//                                         "tooltip": "公司印章",
//                                         "option": "normal",
//                                         "wizardindex": 4,
//                                         "borderColor": "rgb(0,255,255)"
//                                     }],
//                                     "rotate": 0
//                                 }
//                             ];
//
//                             that.processTemplate(data, 1);
//                         });
//                     app.func.getPromise('/v2/test/card/2/' + width)
//                         .then(([code, res]) => {
//                             // that.processTemplate(res.data, 2);
//                             let data = [
//                                 {
//                                     "height": 173.0,
//                                     "width": 355.0,
//                                     "background": "https://files.dianlinet.com/dianli/images/2019-12-24/11-39-22.jpg",
//                                     "products": [
//                                         {
//                                             "height": 66.0,
//                                             "width": 105.0,
//                                             "texts": [
//                                                 {
//                                                     "height": 9.0,
//                                                     "width": 42.0,
//                                                     "field": "brand",
//                                                     "left": 0.0,
//                                                     "top": 0.0,
//                                                     "tooltip": "品牌",
//                                                     "option": "normal",
//                                                     "font": 5.0,
//                                                     "fontFamily": "Microsoft YaHei",
//                                                     "fontStyle": "REGULAR",
//                                                     "color": "255,255,255",
//                                                     "align": "center",
//                                                     "multiline": "false"
//                                                 },
//                                                 {
//                                                     "height": 9.0,
//                                                     "width": 44.0,
//                                                     "field": "title",
//                                                     "left": 3.0,
//                                                     "top": 11.0,
//                                                     "tooltip": "商品名",
//                                                     "option": "normal",
//                                                     "font": 4.0,
//                                                     "fontFamily": "Microsoft YaHei",
//                                                     "fontStyle": "REGULAR",
//                                                     "color": "0,0,0",
//                                                     "align": "left",
//                                                     "multiline": "true",
//                                                     "linebreak": 0,
//                                                     "valign": "bottom"
//                                                 },
//                                                 {
//                                                     "height": 54.0,
//                                                     "width": 54.0,
//                                                     "field": "description",
//                                                     "left": 3.0,
//                                                     "top": 23.0,
//                                                     "tooltip": "简介",
//                                                     "option": "normal",
//                                                     "font": 4.0,
//                                                     "fontFamily": "Microsoft YaHei",
//                                                     "fontStyle": "REGULAR",
//                                                     "color": "102,102,102",
//                                                     "align": "left",
//                                                     "multiline": "true",
//                                                     "linebreak": 0,
//                                                     "valign": "top"
//                                                 }],
//                                             "images": [{
//                                                 "height": 48.0,
//                                                 "width": 48.0,
//                                                 "field": "image",
//                                                 "left": 53.0,
//                                                 "top": 12.0,
//                                                 "tooltip": "商品图",
//                                                 "option": "normal"
//                                             }],
//                                             "field": "product1",
//                                             "left": 58.0,
//                                             "top": 19.0,
//                                             "tooltip": "产品2",
//                                             "wizardindex": 1,
//                                             "borderColor": "rgb(0,159,255)"
//                                         },
//                                         {
//                                             "height": 66.0,
//                                             "width": 105.0,
//                                             "texts": [
//                                                 {
//                                                     "height": 9.0,
//                                                     "width": 42.0,
//                                                     "field": "brand",
//                                                     "left": 0.0,
//                                                     "top": 0.0,
//                                                     "tooltip": "品牌",
//                                                     "option": "normal",
//                                                     "font": 5.0,
//                                                     "fontFamily": "Microsoft YaHei",
//                                                     "fontStyle": "REGULAR",
//                                                     "color": "255,255,255",
//                                                     "align": "center",
//                                                     "multiline": "false"
//                                                 },
//                                                 {
//                                                     "height": 9.0,
//                                                     "width": 44.0,
//                                                     "field": "title",
//                                                     "left": 3.0,
//                                                     "top": 11.0,
//                                                     "tooltip": "商品名",
//                                                     "option": "normal",
//                                                     "font": 4.0,
//                                                     "fontFamily": "Microsoft YaHei",
//                                                     "fontStyle": "REGULAR",
//                                                     "color": "0,0,0",
//                                                     "align": "left",
//                                                     "multiline": "true",
//                                                     "linebreak": 0,
//                                                     "valign": "bottom"
//                                                 },
//                                                 {
//                                                     "height": 54.0,
//                                                     "width": 54.0,
//                                                     "field": "description",
//                                                     "left": 3.0,
//                                                     "top": 23.0,
//                                                     "tooltip": "简介",
//                                                     "option": "normal",
//                                                     "font": 4.0,
//                                                     "fontFamily": "Microsoft YaHei",
//                                                     "fontStyle": "REGULAR",
//                                                     "color": "102,102,102",
//                                                     "align": "left",
//                                                     "multiline": "true",
//                                                     "linebreak": 0,
//                                                     "valign": "top"
//                                                 }],
//                                             "images": [{
//                                                 "height": 48.0,
//                                                 "width": 48.0,
//                                                 "field": "image",
//                                                 "left": 53.0,
//                                                 "top": 12.0,
//                                                 "tooltip": "商品图",
//                                                 "option": "normal"
//                                             }],
//                                             "field": "product2",
//                                             "left": 192.0,
//                                             "top": 19.0,
//                                             "tooltip": "产品2",
//                                             "wizardindex": 2,
//                                             "borderColor": "rgb(0,255,255)"
//                                         },
//                                         {
//                                             "height": 66.0,
//                                             "width": 105.0,
//                                             "texts": [{
//                                                 "height": 9.0,
//                                                 "width": 42.0,
//                                                 "field": "brand",
//                                                 "left": 0.0,
//                                                 "top": 0.0,
//                                                 "tooltip": "品牌",
//                                                 "option": "normal",
//                                                 "font": 5.0,
//                                                 "fontFamily": "Microsoft YaHei",
//                                                 "fontStyle": "REGULAR",
//                                                 "color": "255,255,255",
//                                                 "align": "center",
//                                                 "multiline": "false"
//                                             }, {
//                                                 "height": 9.0,
//                                                 "width": 44.0,
//                                                 "field": "title",
//                                                 "left": 3.0,
//                                                 "top": 11.0,
//                                                 "tooltip": "商品名",
//                                                 "option": "normal",
//                                                 "font": 4.0,
//                                                 "fontFamily": "Microsoft YaHei",
//                                                 "fontStyle": "REGULAR",
//                                                 "color": "0,0,0",
//                                                 "align": "left",
//                                                 "multiline": "true",
//                                                 "linebreak": 0,
//                                                 "valign": "bottom"
//                                             }, {
//                                                 "height": 54.0,
//                                                 "width": 54.0,
//                                                 "field": "description",
//                                                 "left": 3.0,
//                                                 "top": 23.0,
//                                                 "tooltip": "简介",
//                                                 "option": "normal",
//                                                 "font": 4.0,
//                                                 "fontFamily": "Microsoft YaHei",
//                                                 "fontStyle": "REGULAR",
//                                                 "color": "102,102,102",
//                                                 "align": "left",
//                                                 "multiline": "true",
//                                                 "linebreak": 0,
//                                                 "valign": "top"
//                                             }],
//                                             "images": [{
//                                                 "height": 48.0,
//                                                 "width": 48.0,
//                                                 "field": "image",
//                                                 "left": 53.0,
//                                                 "top": 12.0,
//                                                 "tooltip": "商品图",
//                                                 "option": "normal"
//                                             }],
//                                             "field": "product3",
//                                             "left": 58.0,
//                                             "top": 95.0,
//                                             "tooltip": "产品2",
//                                             "wizardindex": 3,
//                                             "borderColor": "rgb(0,255,255)"
//                                         },
//                                         {
//                                             "height": 66.0,
//                                             "width": 105.0,
//                                             "texts": [{
//                                                 "height": 9.0,
//                                                 "width": 42.0,
//                                                 "field": "brand",
//                                                 "left": 0.0,
//                                                 "top": 0.0,
//                                                 "tooltip": "品牌",
//                                                 "option": "normal",
//                                                 "font": 5.0,
//                                                 "fontFamily": "Microsoft YaHei",
//                                                 "fontStyle": "REGULAR",
//                                                 "color": "255,255,255",
//                                                 "align": "center",
//                                                 "multiline": "false"
//                                             }, {
//                                                 "height": 9.0,
//                                                 "width": 44.0,
//                                                 "field": "title",
//                                                 "left": 3.0,
//                                                 "top": 11.0,
//                                                 "tooltip": "商品名",
//                                                 "option": "normal",
//                                                 "font": 4.0,
//                                                 "fontFamily": "Microsoft YaHei",
//                                                 "fontStyle": "REGULAR",
//                                                 "color": "0,0,0",
//                                                 "align": "left",
//                                                 "multiline": "true",
//                                                 "linebreak": 0,
//                                                 "valign": "bottom"
//                                             }, {
//                                                 "height": 54.0,
//                                                 "width": 54.0,
//                                                 "field": "description",
//                                                 "left": 3.0,
//                                                 "top": 23.0,
//                                                 "tooltip": "简介",
//                                                 "option": "normal",
//                                                 "font": 4.0,
//                                                 "fontFamily": "Microsoft YaHei",
//                                                 "fontStyle": "REGULAR",
//                                                 "color": "102,102,102",
//                                                 "align": "left",
//                                                 "multiline": "true",
//                                                 "linebreak": 0,
//                                                 "valign": "top"
//                                             }],
//                                             "images": [{
//                                                 "height": 48.0,
//                                                 "width": 48.0,
//                                                 "field": "image",
//                                                 "left": 53.0,
//                                                 "top": 12.0,
//                                                 "tooltip": "商品图",
//                                                 "option": "normal"
//                                             }],
//                                             "field": "product4",
//                                             "left": 192.0,
//                                             "top": 95.0,
//                                             "tooltip": "产品2",
//                                             "wizardindex": 4,
//                                             "borderColor": "rgb(0,159,255)"
//                                         }],
//                                     "rotate": 0
//                                 },
//                                 {
//                                     "height": 168.0,
//                                     "width": 355.0,
//                                     "background": "https://files.dianlinet.com/dianli/images/2019-12-24/11-39-35.jpg",
//                                     "products": [{
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product5",
//                                         "left": 12.0,
//                                         "top": 13.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 5,
//                                         "borderColor": "rgb(0,255,255)"
//                                     }, {
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product6",
//                                         "left": 125.0,
//                                         "top": 13.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 6,
//                                         "borderColor": "rgb(0,127,255)"
//                                     }, {
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product7",
//                                         "left": 238.0,
//                                         "top": 13.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 7,
//                                         "borderColor": "rgb(0,255,255)"
//                                     }, {
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product8",
//                                         "left": 12.0,
//                                         "top": 91.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 8,
//                                         "borderColor": "rgb(0,102,255)"
//                                     }, {
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product9",
//                                         "left": 125.0,
//                                         "top": 91.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 9,
//                                         "borderColor": "rgb(0,255,255)"
//                                     }, {
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product10",
//                                         "left": 238.0,
//                                         "top": 91.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 10,
//                                         "borderColor": "rgb(0,102,255)"
//                                     }],
//                                     "rotate": 0
//                                 },
//                                 {
//                                     "height": 173.0,
//                                     "width": 355.0,
//                                     "background": "https://files.dianlinet.com/dianli/images/2019-12-24/11-40-42.jpg",
//                                     "products": [{
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product11",
//                                         "left": 12.0,
//                                         "top": 12.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 11,
//                                         "borderColor": "rgb(0,255,255)"
//                                     }, {
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product12",
//                                         "left": 125.0,
//                                         "top": 12.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 12,
//                                         "borderColor": "rgb(0,109,255)"
//                                     }, {
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product13",
//                                         "left": 238.0,
//                                         "top": 12.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 13,
//                                         "borderColor": "rgb(0,255,255)"
//                                     }, {
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product14",
//                                         "left": 12.0,
//                                         "top": 90.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 14,
//                                         "borderColor": "rgb(0,152,255)"
//                                     }, {
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product15",
//                                         "left": 125.0,
//                                         "top": 90.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 15,
//                                         "borderColor": "rgb(0,255,255)"
//                                     }, {
//                                         "height": 66.0,
//                                         "width": 105.0,
//                                         "texts": [{
//                                             "height": 9.0,
//                                             "width": 42.0,
//                                             "field": "brand",
//                                             "left": 0.0,
//                                             "top": 0.0,
//                                             "tooltip": "品牌",
//                                             "option": "normal",
//                                             "font": 5.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "255,255,255",
//                                             "align": "center",
//                                             "multiline": "false"
//                                         }, {
//                                             "height": 9.0,
//                                             "width": 44.0,
//                                             "field": "title",
//                                             "left": 3.0,
//                                             "top": 11.0,
//                                             "tooltip": "商品名",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "0,0,0",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "bottom"
//                                         }, {
//                                             "height": 54.0,
//                                             "width": 54.0,
//                                             "field": "description",
//                                             "left": 3.0,
//                                             "top": 23.0,
//                                             "tooltip": "简介",
//                                             "option": "normal",
//                                             "font": 4.0,
//                                             "fontFamily": "Microsoft YaHei",
//                                             "fontStyle": "REGULAR",
//                                             "color": "102,102,102",
//                                             "align": "left",
//                                             "multiline": "true",
//                                             "linebreak": 0,
//                                             "valign": "top"
//                                         }],
//                                         "images": [{
//                                             "height": 48.0,
//                                             "width": 48.0,
//                                             "field": "image",
//                                             "left": 53.0,
//                                             "top": 12.0,
//                                             "tooltip": "商品图",
//                                             "option": "normal"
//                                         }],
//                                         "field": "product16",
//                                         "left": 238.0,
//                                         "top": 90.0,
//                                         "tooltip": "产品2",
//                                         "wizardindex": 16,
//                                         "borderColor": "rgb(0,102,255)"
//                                     }],
//                                     "rotate": 0
//                                 }
//                             ];
//                             that.processTemplate(data, 2);
//                         });
//                 }
//             });
//                      //下面一部分是获取公司章的图片
//             app.func.getPromise('/v2/customer/seal/my')
//                 .then(([code, res]) => {
//                     if (code == 200) {
//                         return res.data;
//                     } else {
//                         return app.func.reject();
//                     }
//                 })
//                 .then((url) => {
//                     return app.func.promise((resolve, reject) => {
//                         wx.downloadFile({
//                             url: url,
//                             success(res) {
//                                 resolve(res.tempFilePath);
//                             },
//                             fail(res) {
//                             	reject();
// 							},
//                         })
//                     });
//                 })
//                 .then((tempFilePath) => {
//                     return app.func.promise((resolve, reject) => {
//                         wx.getImageInfo({
//                             src: tempFilePath,
//                             success(res) {
//                                 resolve(tempFilePath);
//                             },
//                             fail(res) {
//                             	reject();
// 							}
//                         })
//                     });
//                 })
//                 .then((tempFilePath) => {
//                     that.setData({
//                         ["data.companyimg"]: tempFilePath,
//                         ["toupload.companyimg"]: true
//                     })
//                 }, () => {
//                     // that.setData({
//                     // 	["data.companyimg"]: "https://files.dianlinet.com/dianli/images/2019-11-09/18-03-23.jpg"
//                     // })
//                 });
//         });
//     },
//
//     /**
//      * 生命周期函数--监听页面显示
//      */
//     onShow: function (res) {
//         let result = app.func.getModalResult();
//         if(result != null) {
//             this.setData({
//                 addpro: result
//             }, () => {
//                 this.setData({
//                     addpro: []
//                 });
//             });
//         }
//     },
//
//     processTemplate(template, index) {
//         // let areas = JSON.parse(template);
//         let areas = template;
//         let height = 0;
//         var that = this;
//         for (let i = 0; i < areas.length; i++) {
//             let area = areas[i];
//             area.top = height;
//             height = height + area.height;
//         }
//         var areaname = "areas" + index;
//         var desingerHeight = "designerHeight" + index;
//         that.setData({
//             [areaname]: areas,
//             [desingerHeight]: height
//         });
//     },
//
//     selfmake: function (e) {
//         wx.navigateTo({
//             url: '/pages/tool/card/make/making/selfmake/selfmake'
//         })
//     },
//
//     //选择A面  B面
//     choosetype: function (e) {
//         var index = e.currentTarget.dataset.index;
//         this.setData({current: index});
//     },
//
//     wizardFinishA: function(e) {
//         this.setData({wizarda:false}, () => {
//             if(this.data.wizardb) {
//                 this.setData({current: 2});
//             }
//         });
//     },
//
//     wizardFinishB: function(e) {
//         this.setData({wizardb:false}, () => {
//             if(this.data.wizarda) {
//                 this.setData({current: 1});
//             } else {
//                 console.log("wizard finish");
//             }
//         });
//     },
//
//     wizardNextA: function(e) {
//         this.setData({
//             wizardindexa: e.detail.index
//         });
//     },
//
//     wizardNextB: function(e) {
//         this.setData({
//             wizardindexb: e.detail.index
//         });
//     },
//
//     selfstyle: function () {
//         this.setData({
//             showbox: true
//         });
//     },
//
//     addproduct: function () {
//         var length = Object.keys(this.data.data).length - 5;
//         wx.navigateTo({
//             url: "/pages/tool/card/make/addproduck/addproduct?id=null&length=" + length
//         })
//     },
//
//     onDataChangeda: function (res) {
//         console.log(res);
//         var toupdate = 'data.' + res.detail.field;
//         var that = this;
//         var toset = [];
//         if(res.detail.wizard != null) {
//             toset["wizardindexa"] = res.detail.wizard;
//         }
//         if (res.detail.data != null) {
//             toset[toupdate] = res.detail.data ? res.detail.data : null;
//             this.setData(toset, () => {
//                 if (res.detail.toupload != null) {
//                     var toupload = "toupload." + res.detail.toupload;
//                     that.setData({
//                         [toupload]: true,
//                     })
//                 }
//             });
//         } else {
//             var data = this.data.data;
//             delete data[res.detail.field];
//             that.setData({"data": data});
//         }
//     },
//
//     onDataChangedb: function (res) {
//         console.log(res);
//         var toupdate = 'data.' + res.detail.field;
//         var that = this;
//         var toset = [];
//         if(res.detail.wizard != null) {
//             toset["wizardindexb"] = res.detail.wizard;
//         }
//         if (res.detail.data != null) {
//             toset[toupdate] = res.detail.data ? res.detail.data : null;
//             this.setData(toset, () => {
//                 if (res.detail.toupload != null) {
//                     var toupload = "toupload." + res.detail.toupload;
//                     that.setData({
//                         [toupload]: true,
//                     })
//                 }
//             });
//         } else {
//             var data = this.data.data;
//             delete data[res.detail.field];
//             that.setData({"data": data});
//         }
//     },
//
//     upload: function () {
//         let toupload = this.data.toupload;
//         let data = this.data.data;
//         var promises = [];
//         var i = 0;
//         for (let key in toupload) {
//             let suffix = i++;
//             let value = toupload[key];
//             if (value) {
//                 let src = data[key];
//                 promises.push(
//                     app.func.uploadPromise("/v2/image/upload", src, 'file', {suffix:suffix}).then(function ([code, res]) {
//                         if (code == 3102 || code == 3103) {
//                             return app.func.toastPromise('图片内容违规').then((resolve, reject) => {
//                                 reject();
//                             });
//                         } else {
//                             data[key] = res.data;
//                             toupload[key] = false;
//                         }
//                     })
//                 );
//             }
//         }
//         return app.func.promise_all(promises).then(() => {
//             return app.func.promise((resolve, reject) => {
//                 this.setData({
//                     data: data,
//                     toupload: toupload
//                 }, resolve);
//             });
//         })
//     },
//
//     preview: function (res) {
//         console.log(JSON.stringify(this.data.data));
//         this.upload()
//             .then(() => {
//                 var data = this.data.data;
//                 var urls = [];
//                 app.func.postPromise("/v2/test/card/preview/1", data)
//                     .then(([code, res]) => {
//                         urls.push(res.data);
//                         return app.func.postPromise("/v2/test/card/preview/2", data);
//                     })
//                     .then(([code, res]) => {
//                         urls.push(res.data);
//                     })
//                     .then(() => {
//                         wx.previewImage({
//                             current: urls[0],
//                             urls: urls
//                         })
//                     })
//             });
//     },
//
//     //提交信息
//     submit_info: function () {
//         var data = this.data.data;
//         if (data.title.length == 0) {
//             app.func.toastPromise('面值不能为空');
//             return;
//         } else if (data.time.length == 0) {
//             app.func.toastPromise('卡券有效期不能为空');
//             return;
//         } else if (!data.product1) {
//             app.func.toastPromise('产品不能为空');
//             return;
//         }
//
//         this.upload()
//             .then(() => {
//                 // var atemplate = JSON.stringify(this.data.areas1);
//                 // var btemplate = JSON.stringify(this.data.areas2);
//                 var params = JSON.stringify(this.data.data);
//                 app.func.postPromise('/card/template', {
//                     a_template: '',
//                     b_template: '',
//                     params: params,
//                 }).then(([code, res]) => {
//                     if (code == 200) {
//                         app.func.toastPromise('提交成功')
//                             .then(() => {
//                                 wx.redirectTo({
//                                     url: '/pages/tool/card/make/making/design/submit/submit?id=' + res.data.id + '&title=' + res.data.title,
//                                 })
//                             })
//                     } else {
//                         app.func.toastPromise(res.message);
//                     }
//                 })
//             });
//     }
// })
