"use strict";
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var ArticleCate = /** @class */ (function () {
    function ArticleCate(params) {
        this.title = params.title;
        this.desc = params.desc;
        this.status = params.status;
    }
    return ArticleCate;
}());
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    MysqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MysqlDb.prototype.updated = function (info, id) {
        console.log(info);
        console.log(id);
        return true;
    };
    return MysqlDb;
}());
var a = new ArticleCate({ title: '分类', desc: '1111', status: 1 });
//类当做参数的泛型类
var Db = new MysqlDb();
Db.add(a);
//修改数据
var a1 = new ArticleCate({ title: '分类111', desc: '2222' });
a1.status = 0;
var Db1 = new MysqlDb();
Db1.updated(a1, 12);
