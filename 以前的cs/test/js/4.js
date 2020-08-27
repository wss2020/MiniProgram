

// function multiply2(num) {
//     // return num * 2;
//    // return multiply2(num,false);
//     return num * 2;
// }
//
// function multiply2(num,boolen){
//     if(boolen ===true || boolen === false){
//
//     }else{
//         console.error('boolen没有写');
//     }
//     return num * 2;
// }
//
//
//
// let result = multiply2(3,false);
// console.log(result);

if (!Array.prototype.filter){
    Array.prototype.filter = function(func, thisArg) {
        'use strict';
        if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
            throw new TypeError();

        var len = this.length >>> 0,
            res = new Array(len), // preallocate array
            t = this, c = 0, i = -1;
        if (thisArg === undefined){
            while (++i !== len){
                // checks to see if the key was set
                if (i in this){
                    if (func(t[i], i, t)){
                        res[c++] = t[i];
                    }
                }
            }
        }
        else{
            while (++i !== len){
                // checks to see if the key was set
                if (i in this){
                    if (func.call(thisArg, t[i], i, t)){
                        res[c++] = t[i];
                    }
                }
            }
        }
        res.length = c; // shrink down array to proper size
        return res;
    };
}


const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
