"use strict";
/*
    装饰器:装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性或参数上，可以修改类的行为。


    通俗的讲装饰器就是一个方法，可以注入到类、方法、属性参数上，来扩展类、属性、方法、参数的功能。
    

    常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器


    装饰器的写法：普通装饰器（无法传参） 、 装饰器工厂（可传参）


*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function logClass(params) {
    return function (target) {
        console.log(target);
        !target.prototype.pathName && (target.prototype.pathName = {});
        target.prototype.pathName = params;
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient = __decorate([
        logClass('/hello') //注意不要加;
    ], HttpClient);
    return HttpClient;
}());
console.log(HttpClient.prototype.pathName);
var p = new HttpClient();
console.log(p.pathName);
