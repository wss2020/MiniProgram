// function toRateTxt1(rate) {
//     return  Math.floor( 10 - rate * 10);
// }
//
// function toRateTxt2(rate) {
//     rate = Math.floor( 100 - rate * 100);
//     return Math.floor(rate % 10);
// }


// let coupon = {};
// coupon.ratetxt1 = toRateTxt1(88);
// coupon.ratetxt2 = toRateTxt2(88);
//
// console.log(coupon);


// function toFixed1(num1,num2){
//     var value = Math.floor((num1/num2)*100 );
//     if(value % 10 == 0){
//         return Math.floor((num1/num2)*10);
//     }else{
//         return value;
//     }
// }
//



function toFixed1(num1,num2){
    var value = Math.floor((num1/num2)*100 );
    // if(value < 10){
        return Math.floor( (num1/num2)*100 )/10;
    // }else if(value % 10 == 0){
    //     return Math.floor((num1/num2)*10);
    // }else{
    //     return value;
    // }
}
let resulet = toFixed1(5,120);
// let resulet = toFixed1(660,6900);
console.log( toFixed1(5,120) );
console.log( toFixed1(50,100) );
console.log( toFixed1(100,230) );


// const array1 = [1, 4, 9, 16];
//
// // pass a function to map
// const map1 = array1.map(x => x * 2);
//
// console.log(map1);
// // expected output: Array [2, 8, 18, 32]


//
// const array1 = [1, 2, 3, 4];
// const reducer = (accumulator, currentValue) => accumulator + currentValue;
//
// // 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer));
// // expected output: 10
//
// // 5 + 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer, 5));
// // expected output: 15


// let key = '0';
//
// console.log( key ? key : 'errop' );















