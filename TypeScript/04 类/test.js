function Person(name,age){
    this.name=name;  /*属性*/
    this.age=age;
    this.run=function(){  /*实例方法*/
        console.log(this.name+'在运动');
    }
}
Person.prototype.sex="男";
Person.prototype.work=function(){
    console.log(this.name+'在工作');
}
function Web(name,age){
    Person.call(this,name,age);   //对象冒充继承  可以继承构造函数里面的属性和方法、实例化子类可以给父类传参
}
Web.prototype=Person.prototype;
var w=new Web('赵四',20);   //实例化子类的时候没法给父类传参
w.run();
// w.work();
