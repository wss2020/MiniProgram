"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbUrl = 'xxxxxx';
exports.dbUrl = dbUrl;
function getData() {
    console.log('获取数据库的数据111');
    return [
        {
            title: '121312'
        },
        {
            title: '121312'
        }
    ];
}
exports.getData = getData;
function save() {
    console.log('保存数据成功');
}
exports.save = save;
