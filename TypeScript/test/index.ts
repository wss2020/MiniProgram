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
属性装饰器2
属性装饰器1
方法装饰器2
方法装饰器1
方法参数装饰器2
方法参数装饰器1
类装饰器2
类装饰器1
