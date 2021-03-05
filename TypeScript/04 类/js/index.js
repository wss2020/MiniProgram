"use strict";
/*
1、vscode配置自动编译

    1.第一步   tsc --inti 生成tsconfig.json   改 "outDir": "./js",


    2、第二步 任务 - 运行任务  监视tsconfig.json


2、typeScript中的数据类型

    typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验，在typescript中主要给我们提供了以下数据类型


        布尔类型（boolean）
        数字类型（number）
        字符串类型(string)
        数组类型（array）
        元组类型（tuple）
        枚举类型（enum）

        任意类型（any）
        null 和 undefined
        void类型
        never类型

3、typeScript中的函数

    3.1、函数的定义
    3.2、可选参数
    3.3、默认参数
    3.4、剩余参数
    3.5、函数重载
    3.6、箭头函数  es6
4、typeScript中的类

    4.1 类的定义
    4.2 继承
    4.3 类里面的修饰符

    4.4 静态属性 静态方法
    4.5 抽象类 多态


*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 静态属性 静态方法
// es5
function Person() {
    this.run1 = function () {
    };
}
Person.name = '哈哈哈';
Person.run2 = function () {
    静态方法;
};
var p = new Person();
Person.run2();
静态方法的调用;
function $(element) {
    return new Base(element);
}
$.get = function () { };
function Base(element) {
    this.element = 获取dom节点;
    this.css = function (arr, value) {
        this.element.style.arr = value;
    };
}
$('#box').css('color', 'red');
$.get('url', function () { });
var Per = /** @class */ (function () {
    function Per(name) {
        this.age = 20;
        this.name = name;
    }
    Per.prototype.run = function () {
        alert(this.name + "\u5728\u8FD0\u52A8");
    };
    Per.prototype.work = function () {
        alert(this.name + "\u5728\u5DE5\u4F5C");
    };
    Per.print = function () {
        alert('print方法' + Per.sex);
    };
    //静态属性
    Per.sex = "男";
    return Per;
}());
var p = new Per('张三');
p.run();
Per.print();
alert(Per.sex);
//多态:父类定义一个方法不去实现，让继承它的子类去实现  每一个子类有不同的表现
//多态属于继承
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.eat = function () {
        console.log('吃的方法');
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.eat = function () {
        return this.name + '吃粮食';
    };
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        return _super.call(this, name) || this;
    }
    Cat.prototype.eat = function () {
        return this.name + '吃老鼠';
    };
    return Cat;
}(Animal));
//typescript中的抽象类：它是提供其他类继承的基类，不能直接被实例化。
//用 abstract 关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
// abstract抽象方法只能放在抽象类里面
// 抽象类和抽象方法用来定义标准 。   标准：Animal 这个类要求它的子类必须包含eat方法
//标准:
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.run = function () {
        console.log('其他方法可以不实现');
    };
    return Animal;
}());
// var a=new Animal() /*错误的写法*/
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    //抽象类的子类必须实现抽象类里面的抽象方法
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.eat = function () {
        console.log(this.name + '吃粮食');
    };
    return Dog;
}(Animal));
var d = new Dog('小花花');
d.eat();
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    //抽象类的子类必须实现抽象类里面的抽象方法
    function Cat(name) {
        return _super.call(this, name) || this;
    }
    Cat.prototype.run = function () { };
    Cat.prototype.eat = function () {
        console.log(this.name + '吃老鼠');
    };
    return Cat;
}(Animal));
var c = new Cat('小花猫');
c.eat();
