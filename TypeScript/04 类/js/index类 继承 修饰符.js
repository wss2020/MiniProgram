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
    4.5 抽象类 继承 多态


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
//1、ts中类的定义
// es5:
function Person(name) {
    this.name = name;
    this.run = function () {
        console.log(this.name);
    };
}
var p = new Person('张三');
p.run();
// ts中定义类：
var Person = /** @class */ (function () {
    function Person(n) {
        this.name = n;
    }
    Person.prototype.run = function () {
        alert(this.name);
    };
    return Person;
}());
var p = new Person('张三');
p.run();
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.setName = function (name) {
        this.name = name;
    };
    return Person;
}());
var p = new Person('张三');
alert(p.getName());
p.setName('李四');
alert(p.getName());
//2、ts中实现继承  extends、 super
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person;
}());
var p = new Person('王五');
alert(p.run());
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name) {
        return _super.call(this, name) || this;
    }
    return Web;
}(Person));
var w = new Web('李四');
alert(w.run());
//ts中继承的探讨  父类的方法和子类的方法一致
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person;
}());
var p = new Person('王五');
alert(p.run());
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name) {
        return _super.call(this, name) || this;
    }
    Web.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8-\u5B50\u7C7B";
    };
    Web.prototype.work = function () {
        alert(this.name + "\u5728\u5DE5\u4F5C");
    };
    return Web;
}(Person));
var w = new Web('李四');
alert(w.run());
w.work();
alert(w.run());
// 3 类里面的修饰符  typescript里面定义属性的时候给我们提供了 三种修饰符
/*
    public :公有          在当前类里面、 子类  、类外面都可以访问
    protected：保护类型    在当前类里面、子类里面可以访问 ，在类外部没法访问
    private ：私有        在当前类里面可以访问，子类、类外部都没法访问
    属性如果不加修饰符 默认就是 公有 （public）
*/
//public :公有          在类里面、子类、类外面都可以访问
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person;
}());
var p = new Person('王五');
alert(p.run());
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name) {
        return _super.call(this, name) || this;
    }
    Web.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8-\u5B50\u7C7B";
    };
    Web.prototype.work = function () {
        alert(this.name + "\u5728\u5DE5\u4F5C");
    };
    return Web;
}(Person));
var w = new Web('李四');
w.work();
//类外部访问公有属性
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person;
}());
var p = new Person('哈哈哈');
alert(p.name);
//protected：保护类型    在类里面、子类里面可以访问 ，在类外部没法访问
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person;
}());
var p = new Person('王五');
alert(p.run());
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name) {
        return _super.call(this, name) || this;
    }
    Web.prototype.work = function () {
        alert(this.name + "\u5728\u5DE5\u4F5C");
    };
    return Web;
}(Person));
var w = new Web('李四11');
w.work();
alert(w.run());
//类外外部没法访问保护类型的属性
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person;
}());
var p = new Person('哈哈哈');
alert(p.name);
// private ：私有        在类里面可以访问，子类、类外部都没法访问
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person;
}());
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name) {
        return _super.call(this, name) || this;
    }
    Web.prototype.work = function () {
        console.log(this.name + "\u5728\u5DE5\u4F5C");
    };
    return Web;
}(Person));
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person;
}());
var p = new Person('哈哈哈');
alert(p.run());
