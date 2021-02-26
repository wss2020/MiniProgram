
import {MsSqlDb} from '../modules/db';

//定义数据库的映射
class UserClass{
    username:string | undefined;
    password:string | undefined;
}


var UserModel=new MsSqlDb<UserClass>();
export {
    UserClass,UserModel
}




