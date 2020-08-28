//代码注释版本     具体实现，看 印象笔记，这里只注释了，核心代码。
// 保存原生的 Page 函数
const originPage = Page;

// 小程序加载的时候，就开始执行。    顺序是执行一次app.js,  然后每个页面执行一次。  执行每个页面的时候，这个函数也会执行一次。
Page = (options) => {           // 对页面中的 Page 中的option 进行再处理。
    const mixins = options.mixins;
    // mixins 必须为数组
    if (Array.isArray(mixins)) {
        delete options.mixins;
        // mixins 注入并执行相应逻辑
        options = merge(mixins, options);
    }
    // 释放原生 Page 函数
    originPage(options);
};

// 定义小程序内置的属性/方法
const originProperties = ['data', 'properties', 'options'];
const originMethods = [
    'onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh',
    'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onTabItemTap'];
function merge(mixins, options) {
    var count = 1;
    mixins.forEach((mixin) => {
        if (Object.prototype.toString.call(mixin) !== '[object Object]') {
            throw new Error('mixin 类型必须为对象！')
        }
        // 遍历 mixin 里面的所有属性
        for (let [key, value] of Object.entries(mixin)) {
            if (originProperties.includes(key)) {
                //console.log(value);           // 例如：{data1: "myMixin", data2: "myMixin", data3: "myMixin"}
                //console.log(options[key]);    // 例如：{index1: "123", index2: "123"}
                // 内置对象属性混入
                options[key] = {...value, ...options[key]};  // {data1: "myMixin", data2: "myMixin", data3: "myMixin", index1: "123", index2: "123"}
            } else if (originMethods.includes(key)) {
                // 内置方法属性混入，优先执行混入的部分
                const originFunc = options[key];
                options[key] = function (...args) {
                    value.call(this,...args);   //把混入的代码，写在页面内置方法中的代码上面，  用来处理混入代码中方法写的 this，使其 this 指向的是当前页面, 可以调用传进来的参数
                    // originFunc.call(this, ...args);
                    return originFunc && originFunc.call(this, ...args)   // 内置方法的代码如果存在，显示代码，并且 this 指向当前页面，可以调用传进来的参数
                }
            } else {
                // 自定义方法混入,重复的话,执行的是 页面中写的。    底部有写例子
                options = {...mixin, ...options};
            }
        }
    });
    return options;   // 把处理好的 options 输出出去
}
