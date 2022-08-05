//import request from '@/util/http';
import request from 'npm-pansoft-base/lib/router/axios';
var _env = require('@/config/env');

export function getSjxList(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getSjxList',
        method:'post',
        data:param,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
       }
    });
}
export function deleteSjxItem(ids){
    return request({
        url:_env.baseUrl+'/xxwlPcService/deleteSjxItem/'+ids,
        method:'delete',
    });
}
export function completeDeleteSjxItem(ids){
    return request({
        url:_env.baseUrl+'/xxwlPcService/completeDeleteSjxItem/'+ids,
        method:'delete',
    });
}