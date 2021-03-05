"use strict";
/*
    装饰器:装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性或参数上，可以修改类的行为。
    通俗的讲装饰器就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。
    常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器
    装饰器的写法：普通装饰器（无法传参） 、 装饰器工厂（可传参）
    装饰器是过去几年中js最大的成就之一，已是Es7的标准特性之一
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
//1、类装饰器：类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 传入一个参数
//1.1 类装饰器:普通装饰器（无法传参）
/*
    function logClass(params:any){

        console.log(params);
        // params 就是当前类
        params.prototype.apiUrl='动态扩展的属性';
        params.prototype.run=function(){
            console.log('我是一个run方法');
        }

    }

    @logClass
    class HttpClient{
        constructor(){
        }
        getData(){

        }
    }
    let http:any=new HttpClient();
    console.log(http.apiUrl);
    http.run();
*/
//1.2 类装饰器:装饰器工厂（可传参）
function logClass(params) {
    return function (target) {
        console.log(target);
        console.log(params);
        target.prototype.apiUrl = params;
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
    };
    HttpClient = __decorate([
        logClass('http://www.itying.com/api')
    ], HttpClient);
    return HttpClient;
}());
var http = new HttpClient();
console.log(http.apiUrl);
/*

1、类装饰器
     下面是一个重载构造函数的例子。
     类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
     如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
*/
function logClass(target) {
    console.log(target);
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.apiUrl = '我是修改后的数据';
            return _this;
        }
        class_1.prototype.getData = function () {
            this.apiUrl = this.apiUrl + '----';
            console.log(this.apiUrl);
        };
        return class_1;
    }(target));
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
        this.apiUrl = '我是构造函数里面的apiUrl';
    }
    HttpClient.prototype.getData = function () {
        console.log(this.apiUrl);
    };
    HttpClient = __decorate([
        logClass
    ], HttpClient);
    return HttpClient;
}());
var http = new HttpClient();
http.getData();
/*
   2、属性装饰器
        属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
            1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
            2、成员的名字。
*/
/*
    //类装饰器
        function logClass(params:string){
            return function(target:any){
                // console.log(target);
                // console.log(params);

            }
        }
    //属性装饰器
        function logProperty(params:any){
            return function(target:any,attr:any){
                console.log(target);
                console.log(attr);
                target[attr]=params;
            }
        }
        @logClass('xxxx')
        class HttpClient{
            @logProperty('http://itying.com')
            public url:any |undefined;
            constructor(){
            }
            getData(){
                console.log(this.url);
            }
        }
        let http=new HttpClient();
        http.getData();
*/
/*
    3、方法装饰器
        它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。

        方法装饰会在运行时传入下列3个参数：
            1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
            2、成员的名字。
            3、成员的属性描述符。
*/
//方法装饰器一
function get(params) {
    return function (target, methodName, desc) {
        console.log(target);
        console.log(methodName);
        console.log(desc);
        target.apiUrl = 'xxxx';
        target.run = function () {
            console.log('run');
        };
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
        console.log(this.url);
    };
    __decorate([
        get('http://www.itying,com')
    ], HttpClient.prototype, "getData", null);
    return HttpClient;
}());
var http = new HttpClient();
console.log(http.apiUrl);
http.run();
//方法装饰器二
function get(params) {
    return function (target, methodName, desc) {
        console.log(target);
        console.log(methodName);
        console.log(desc.value);
        //修改装饰器的方法  把装饰器方法里面传入的所有参数改为string类型
        //1、保存当前的方法
        var oMethod = desc.value;
        desc.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (value) {
                return String(value);
            });
            oMethod.apply(this, args);
        };
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
        console.log('我是getData里面的方法');
    };
    __decorate([
        get('http://www.itying,com')
    ], HttpClient.prototype, "getData", null);
    return HttpClient;
}());
var http = new HttpClient();
http.getData(123, 'xxx');
/*
    4、方法参数装饰器
        参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据 ，传入下列3个参数：
            1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
            2、方法的名字。
            3、参数在函数参数列表中的索引。
*/
function logParams(params) {
    return function (target, methodName, paramsIndex) {
        console.log(params);
        console.log(target);
        console.log(methodName);
        console.log(paramsIndex);
        target.apiUrl = params;
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function (uuid) {
        console.log(uuid);
    };
    __decorate([
        __param(0, logParams('xxxxx'))
    ], HttpClient.prototype, "getData", null);
    return HttpClient;
}());
var http = new HttpClient();
http.getData(123456);
console.log(http.apiUrl);
//装饰器执行顺序
//属性 》方法 》方法参数 》类
// 如果有多个同样的装饰器，它会先执行后面的
function logClass1(params) {
    return function (target) {
        console.log('类装饰器1');
    };
}
function logClass2(params) {
    return function (target) {
        console.log('类装饰器2');
    };
}
function logAttribute1(params) {
    return function (target, attrName) {
        console.log('属性装饰器1');
    };
}
function logAttribute2(params) {
    return function (target, attrName) {
        console.log('属性装饰器2');
    };
}
function logMethod1(params) {
    return function (target, attrName, desc) {
        console.log('方法装饰器1');
    };
}
function logMethod2(params) {
    return function (target, attrName, desc) {
        console.log('方法装饰器2');
    };
}
function logParams1(params) {
    return function (target, attrName, desc) {
        console.log('方法参数装饰器1');
    };
}
function logParams2(params) {
    return function (target, attrName, desc) {
        console.log('方法参数装饰器2');
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
        return true;
    };
    HttpClient.prototype.setData = function (attr1, attr2) {
    };
    __decorate([
        logAttribute1(),
        logAttribute2()
    ], HttpClient.prototype, "apiUrl", void 0);
    __decorate([
        logMethod1(),
        logMethod2()
    ], HttpClient.prototype, "getData", null);
    __decorate([
        __param(0, logParams1()), __param(1, logParams2())
    ], HttpClient.prototype, "setData", null);
    HttpClient = __decorate([
        logClass1('http://www.itying.com/api'),
        logClass2('xxxx')
    ], HttpClient);
    return HttpClient;
}());
var http = new HttpClient();
