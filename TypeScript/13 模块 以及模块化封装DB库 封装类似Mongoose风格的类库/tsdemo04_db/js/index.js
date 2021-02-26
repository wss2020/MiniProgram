"use strict";
/*

功能：定义一个操作数据库的库  支持 Mysql Mssql  MongoDb

要求1：Mysql MsSql  MongoDb功能一样  都有 add  update  delete  get方法

注意：约束统一的规范、以及代码重用

解决方案：需要约束规范所以要定义接口 ，需要代码重用所以用到泛型

    1、接口：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范

    2、泛型 通俗理解：泛型就是解决 类 接口 方法的复用性、


*/
Object.defineProperty(exports, "__esModule", { value: true });
//操作用户表   定义一个User类和数据表做映射
var db_1 = require("./modules/db");
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var u = new User();
u.username = '张三2222';
u.password = '123456';
var oMssql = new db_1.MsSqlDb();
oMssql.add(u);
