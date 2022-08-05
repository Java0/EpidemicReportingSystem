//import request from '@/util/http';
import request from 'npm-pansoft-base/lib/router/axios';
var _env = require('@/config/env');
export function getFjxList(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getFjxList',
        method:'post',
        data:param,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
       }
    });
}
export function getSjrList(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getSjrList',
        method:'post',
        data:param,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
       }
    });
}
//删除发件箱
export function delFjxItem(ids){
    return request({
        url:_env.baseUrl+'/xxwlPcService/deleteFjxItem/'+ids,
        method:'delete',
    });
}
//收回消息
export function deleteMsg(ids,params){
    return request({
        url:_env.baseUrl+'/xxwlPcService/deleteMsg/'+ids,
        method:'delete',
        params:params
    });
}
