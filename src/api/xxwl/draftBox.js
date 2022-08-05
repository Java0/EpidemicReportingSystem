//import request from '@/util/http';
import request from 'npm-pansoft-base/lib/router/axios';
var _env = require('@/config/env');
//获取草稿箱列表
export function getCgxList(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getCgxList',
        method:'post',
        data:param,
    });
}
//删除草稿
export function delCgx(ids){
    return request({
        url:_env.baseUrl+'/xxwlPcService/deleteCgxItem/'+ids,
        method:'delete',
    });
}