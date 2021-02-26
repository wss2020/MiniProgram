"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A;
(function (A) {
    var Dog = /** @class */ (function () {
        function Dog(theName) {
            this.name = theName;
        }
        Dog.prototype.eat = function () {
            console.log(this.name + " \u5728\u5403\u72D7\u7CAE\u3002");
        };
        return Dog;
    }());
    A.Dog = Dog;
    var Cat = /** @class */ (function () {
        function Cat(theName) {
            this.name = theName;
        }
        Cat.prototype.eat = function () {
            console.log(this.name + " \u5403\u732B\u7CAE\u3002");
        };
        return Cat;
    }());
    A.Cat = Cat;
})(A = exports.A || (exports.A = {}));
var B;
(function (B) {
    var Dog = /** @class */ (function () {
        function Dog(theName) {
            this.name = theName;
        }
        Dog.prototype.eat = function () {
            console.log(this.name + " \u5728\u5403\u72D7\u7CAE\u3002");
        };
        return Dog;
    }());
    B.Dog = Dog;
    var Cat = /** @class */ (function () {
        function Cat(theName) {
            this.name = theName;
        }
        Cat.prototype.eat = function () {
            console.log(this.name + " \u5728\u5403\u732B\u7CAE\u3002");
        };
        return Cat;
    }());
    B.Cat = Cat;
})(B = exports.B || (exports.B = {}));
