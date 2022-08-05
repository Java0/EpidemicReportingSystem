//import request from '@/util/http';
import request from 'npm-pansoft-base/lib/router/axios';
var _env = require('@/config/env');
export function getRecycleBinList(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getRecycleBinList',
        method:'post',
        data:param,
    });
}
//还原
export function reductionRecycleBinItem(ids){
    return request({
        url:_env.baseUrl+'/xxwlPcService/reductionRecycleBinItem/'+ids,
        method:'put',
    });
}
//彻底删除
export function deletePermanentlyRecycleBinItem(ids){
    return request({
        url:_env.baseUrl+'/xxwlPcService/deletePermanentlyRecycleBinItem/'+ids,
        method:'delete',
    });
}
//清空
export function emptyRecycleBin(){
    return request({
        url:_env.baseUrl+'/xxwlPcService/emptyRecycleBin',
        method:'get',
    });
}
