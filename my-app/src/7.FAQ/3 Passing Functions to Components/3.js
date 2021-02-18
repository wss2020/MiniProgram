/**
 3.可以在 render 方法中使用箭头函数吗？
 一般来说是可以的，并且使用箭头函数是向回调函数传递参数的最简单的办法。
 但是如果遇到了性能问题，一定要进行优化！


 4.为什么绑定是必要的？
 在JavaScript中，以下两种写法是不等价的：
     obj.method();

     var method = obj.method;
     method();

 bind 方法确保了第二种写法与第一种写法相同。

    使用 React，通常只需要绑定传递给其他组件的方法。例如，<button onClick={this.handleClick}> 是在传递 this.handleClick ，所以需要绑定
 它。但是，没有必要绑定 render 方法或生命周期方法：我们并没有将它们传递给其他的组件。

 Yehuda Katz 的文章详细解释了什么是绑定，以及函数在 JavaScript 中怎么起作用。



 */

var person = {
    name: "Brendan Eich",
    hello: function(thing) {
        console.log(this.name + " says hello " + thing);
    }
}

var bind = function(func, thisValue) {
    return function() {
        return func.apply(thisValue, arguments);
    }
}

var boundHello = bind(person.hello, person);
boundHello("world") // "Brendan Eich says hello world"
