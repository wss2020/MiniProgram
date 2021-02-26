
import {MsSqlDb} from '../modules/db';

//定义数据库的映射
class ArticleClass{
    title:string | undefined;
    desc:string | undefined;
}


var ArticleModel=new MsSqlDb<ArticleClass>();
export {
    ArticleClass,ArticleModel
}





