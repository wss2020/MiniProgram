var ClassName = function () {//类名


    // A：加 _ 下划线前缀
    let _FieldName = "Test Field";//私有变量
    this.PropertyName = "Test Property Name"; //属性
    let functionName = function () {   //私有方法
        return "";
    };


    // C:大写开头                        //  D：加小写p前缀
    this.PublicFunctionName = function (pTestName) {//公有方法 pTestName:参数
        let condition = "condition";//局部变量
        if (condition) {//判断
            return functionName();
        } else {

        }



        //B：小写开头
        let nameCol = ["a", "b"]; //数组
        let nameItem = nameCol[0]; //数组项
        for (let i = 0; i < nameCol.length; i++) {//循环

        }




        let selectName = "item";
        switch (selectName) {//选择
            case "item":
                break;
        }
    }
};
