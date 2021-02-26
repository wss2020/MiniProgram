"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../modules/db");
//定义数据库的映射
var UserClass = /** @class */ (function () {
    function UserClass() {
    }
    return UserClass;
}());
exports.UserClass = UserClass;
var UserModel = new db_1.MsSqlDb();
exports.UserModel = UserModel;
