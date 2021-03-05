/*
    装饰器:装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性或参数上，可以修改类的行为。
    通俗的讲装饰器就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。
    常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器
    装饰器的写法：普通装饰器（无法传参） 、 装饰器工厂（可传参）
    装饰器是过去几年中js最大的成就之一，已是Es7的标准特性之一
*/

//1、类装饰器：类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 传入一个参数


//1.1 类装饰器:普通装饰器（无法传参）
    /*
        function logClass(params:any){

            console.log(params);
            // params 就是当前类
            params.prototype.apiUrl='动态扩展的属性';
            params.prototype.run=function(){
                console.log('我是一个run方法');
            }

        }

        @logClass
        class HttpClient{
            constructor(){
            }
            getData(){

            }
        }
        let http:any=new HttpClient();
        console.log(http.apiUrl);
        http.run();
    */


//1.2 类装饰器:装饰器工厂（可传参）



        function logClass(params:string){
            return function(target:any){
                console.log(target);
                console.log(params);
                target.prototype.apiUrl=params;
            }
        }
        @logClass('http://www.itying.com/api')
        class HttpClient{
            constructor(){
            }
            getData(){

            }
        }
        let http:any=new HttpClient();
        console.log(http.apiUrl);



/*

1、类装饰器
     下面是一个重载构造函数的例子。
     类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
     如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
*/

        function logClass(target:any){
            console.log(target);
            return class extends target{
                apiUrl:any='我是修改后的数据';
                getData(){
                    this.apiUrl=this.apiUrl+'----';
                    console.log(this.apiUrl);
                }
            }
        }
        @logClass
        class HttpClient{
            public apiUrl:string | undefined;
            constructor(){
                this.apiUrl='我是构造函数里面的apiUrl';
            }
            getData(){
                console.log(this.apiUrl);
            }
        }
        let http=new HttpClient();
        http.getData();


/*
   2、属性装饰器
        属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
            1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
            2、成员的名字。
*/
/*
    //类装饰器
        function logClass(params:string){
            return function(target:any){
                // console.log(target);
                // console.log(params);

            }
        }
    //属性装饰器
        function logProperty(params:any){
            return function(target:any,attr:any){
                console.log(target);
                console.log(attr);
                target[attr]=params;
            }
        }
        @logClass('xxxx')
        class HttpClient{
            @logProperty('http://itying.com')
            public url:any |undefined;
            constructor(){
            }
            getData(){
                console.log(this.url);
            }
        }
        let http=new HttpClient();
        http.getData();
*/









/*
    3、方法装饰器
        它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。

        方法装饰会在运行时传入下列3个参数：
            1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
            2、成员的名字。
            3、成员的属性描述符。
*/

    //方法装饰器一
    function get(params:any){
        return function(target:any,methodName:any,desc:any){
            console.log(target);
            console.log(methodName);
            console.log(desc);
            target.apiUrl='xxxx';
            target.run=function(){
                console.log('run');
            }
        }
    }
    class HttpClient{
        public url:any |undefined;
        constructor(){
        }
        @get('http://www.itying,com')
        getData(){
            console.log(this.url);
        }
    }
    let http:any=new HttpClient();
    console.log(http.apiUrl);
    http.run();


//方法装饰器二
    function get(params:any){
        return function(target:any,methodName:any,desc:any){
            console.log(target);
            console.log(methodName);
            console.log(desc.value);
            //修改装饰器的方法  把装饰器方法里面传入的所有参数改为string类型
            //1、保存当前的方法
            let oMethod=desc.value;
            desc.value=function(...args:any[]){
                args=args.map((value)=>{
                    return String(value);
                })
                oMethod.apply(this,args);
            }

        }
    }
    class HttpClient{
        public url:any |undefined;
        constructor(){
        }
        @get('http://www.itying,com')
        getData(...args:any[]){
            console.log(args);
            console.log('我是getData里面的方法');
        }
    }
    let http=new HttpClient();
    http.getData(123,'xxx');


/*
    4、方法参数装饰器
        参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据 ，传入下列3个参数：
            1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
            2、方法的名字。
            3、参数在函数参数列表中的索引。
*/

 function logParams(params:any){
     return function(target:any,methodName:any,paramsIndex:any){
         console.log(params);
         console.log(target);
         console.log(methodName);
         console.log(paramsIndex);
         target.apiUrl=params;
     }
 }
 class HttpClient{
             public url:any |undefined;
             constructor(){
             }
             getData(@logParams('xxxxx') uuid:any){
                 console.log(uuid);
             }
  }
  let http:any = new HttpClient();
  http.getData(123456);
  console.log( http.apiUrl);










//装饰器执行顺序
//属性 》方法 》方法参数 》类
// 如果有多个同样的装饰器，它会先执行后面的

function logClass1(params:string){
    return function(target:any){
      console.log('类装饰器1')
    }
}

function logClass2(params:string){
    return function(target:any){
      console.log('类装饰器2')
    }
}

function logAttribute1(params?:string){
    return function(target:any,attrName:any){
      console.log('属性装饰器1')
    }
}

function logAttribute2(params?:string){
    return function(target:any,attrName:any){
      console.log('属性装饰器2')
    }
}

function logMethod1(params?:string){
    return function(target:any,attrName:any,desc:any){
      console.log('方法装饰器1')
    }
}
function logMethod2(params?:string){
    return function(target:any,attrName:any,desc:any){
      console.log('方法装饰器2')
    }
}



function logParams1(params?:string){
    return function(target:any,attrName:any,desc:any){
      console.log('方法参数装饰器1')
    }
}

function logParams2(params?:string){
    return function(target:any,attrName:any,desc:any){
      console.log('方法参数装饰器2')
    }
}



@logClass1('http://www.itying.com/api')
@logClass2('xxxx')
class HttpClient{
    @logAttribute1()
    @logAttribute2()
    public apiUrl:string | undefined;
    constructor(){
    }

    @logMethod1()
    @logMethod2()
    getData(){
        return true;
    }

    setData(@logParams1() attr1:any,@logParams2() attr2:any,){

    }
}

let http:any=new HttpClient();
