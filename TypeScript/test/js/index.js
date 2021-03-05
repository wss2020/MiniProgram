"use strict";
//装饰器执行顺序
//属性 》方法 》方法参数 》类
// 如果有多个同样的装饰器，它会先执行后面的
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
属性装饰器2;
属性装饰器1;
方法装饰器2;
方法装饰器1;
方法参数装饰器2;
方法参数装饰器1;
类装饰器2;
类装饰器1;
