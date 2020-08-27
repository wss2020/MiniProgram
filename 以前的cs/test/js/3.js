
function modifyAge(obj){
    obj.age = "25";
}

function test() {
     let obj = {
         name:'wss',
         age:'18'
     };
     modifyAge(obj);
     return obj;
}

console.log(test());
