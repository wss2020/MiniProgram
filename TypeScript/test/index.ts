

class User{
    username:string | undefined;
    password:string | undefined;
}

class ArticleCate{
    title:string | undefined;
    desc:string | undefined;
    status:number | undefined;

    constructor(params:{ title:string, desc:string, status?:number}){
        this.title=params.title;
        this.desc=params.desc;
        this.status=params.status;
    }
}
class MysqlDb<T>{
    add(info:T):boolean{
        console.log(info);
        return true;
    }
    updated(info:T,id:number):boolean {
        console.log(info);
        console.log(id);
        return true;
    }
}


let a = new ArticleCate({title:'分类', desc:'1111', status:1});
//类当做参数的泛型类
let Db = new MysqlDb<ArticleCate>();
Db.add(a);


//修改数据
let a1=new ArticleCate({ title:'分类111', desc:'2222' });
a1.status=0;

let Db1=new MysqlDb<ArticleCate>();
Db1.updated(a1,12);

