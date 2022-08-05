//import request from '@/util/http';
import request from 'npm-pansoft-base/lib/router/axios';
var _env = require('@/config/env');
export function getTreeDwAndZdyAndBbm(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getTreeDwAndZdyAndBbm',
        method:'post',
        data:param,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
       }
    });
}
export function getDwUser(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getDwUser',
        method:'post',
        data:param,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
       }
    });
}
export function queryUser(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/queryUser',
        method:'post',
        data:param,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
       }
    });
}
export function getOutBoxItemInfo(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getFjxEmailInfo',
        method:'post',
        params:param,
    });
}
export function getInBoxItemInfo(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getSjxEmailInfo',
        method:'post',
        params:param,
    });
}
export function getDraftItemInfo(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getCgxItemInfo',
        method:'post',
        params:param,
    });
}
export function getAllYfws(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getAllYfws',
        method:'get',
        params:param
    });
}