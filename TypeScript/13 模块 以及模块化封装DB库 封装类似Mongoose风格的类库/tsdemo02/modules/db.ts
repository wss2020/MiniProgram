
var dbUrl='xxxxxx';


function getData():any[]{

    console.log('获取数据库的数据111');

    return [

        {

            title:'121312'
        },
        {

            title:'121312'
        }
    ]
}



function save(){

    console.log('保存数据成功');
}


export {dbUrl,getData,save};