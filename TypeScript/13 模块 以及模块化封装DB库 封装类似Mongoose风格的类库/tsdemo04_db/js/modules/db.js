"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsSqlDb = exports.MysqlDb = void 0;
//定义一个操作mysql数据库的类       注意：要实现泛型接口 这个类也应该是一个泛型类
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
        console.log('数据库建立连接');
    }
    MysqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MysqlDb.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype.get = function (id) {
        var list = [
            {
                title: 'xxxx',
                desc: 'xxxxxxxxxx'
            },
            {
                title: 'xxxx',
                desc: 'xxxxxxxxxx'
            }
        ];
        return list;
    };
    return MysqlDb;
}());
exports.MysqlDb = MysqlDb;
//定义一个操作mssql数据库的类  
var MsSqlDb = /** @class */ (function () {
    function MsSqlDb() {
        console.log('数据库建立连接');
    }
    MsSqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MsSqlDb.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MsSqlDb.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    MsSqlDb.prototype.get = function (id) {
        var list = [
            {
                title: 'xxxx',
                desc: 'xxxxxxxxxx'
            },
            {
                title: 'xxxx',
                desc: 'xxxxxxxxxx'
            }
        ];
        return list;
    };
    return MsSqlDb;
}());
exports.MsSqlDb = MsSqlDb;
