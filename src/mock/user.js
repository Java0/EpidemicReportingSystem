import Mock from 'mockjs'
import userInfo from "@/data/user/userInfo"
import {getRequestParamObj} from "@/util/util"
import {baseUrl} from '@/config/env';

export default ({ mock }) => {
    if (!mock) return;
    // 用户登录
    Mock.mock('/user/login', 'post', function(options){
        return {"msg":"succeed","success":true};
    });
    //用户退出
    Mock.mock('/user/logout', 'get', {
        data: true,
    });
    //刷新token
    Mock.mock('/user/refesh', 'post', {
        data: new Date().getTime() + ''
    });

    //获取表格数据
    Mock.mock('/user/getTable', 'get', () => {
        let list = []
        for (let i = 0; i < 5; i++) {
            list.push(Mock.mock({
                id: '@increment',
                name: Mock.mock('@cname'),
                username: Mock.mock('@last'),
                type: [0, 2],
                checkbox: [0, 1],
                'number|0-100': 0,
                datetime: 1532932422071,
                'sex|0-1': 0,
                moreselect: [0, 1],
                "grade": 0,
                address: Mock.mock('@cparagraph(1, 3)'),
                check: [1, 3, 4]
            }))
        }
        return {
            data: {
                total: 11,
                pageSize: 10,
                tableData: list
            }
        }
    });

    //模拟上传
    Mock.mock('/api/blade-resource/oss/endpoint/put-file', 'post', {
        data: new Date().getTime() + ''
    });

    //模拟获取userinfo
    Mock.mock('/api/blade-user/info', 'post', {
        data: userInfo
    });

     //模拟获取userinfo
     Mock.mock('/user/getUserInfo', 'post', {
        data: userInfo
    });
        
    //模拟更新
    Mock.mock('/api/blade-user/update', 'post', function(options){
        //let item=JSON.parse(options.body);
        console.log(options.body);
        return {"msg":"修改成功","success":true};
    }); 

    //模拟更新
    Mock.mock(RegExp('/api/ceshi/updatefirst'+".*"), 'get', function(options){
        //let item=JSON.parse(options.body);
        console.log(JSON.stringify(options));
        var ret=getRequestParamObj(options.url);
        console.log(JSON.stringify(ret));
        return {"msg":"修改成功","success":true};
    }); 
}
