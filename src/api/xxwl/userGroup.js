//import request from '@/util/http';
import request from 'npm-pansoft-base/lib/router/axios';
var _env = require('@/config/env');
export function getGroupList(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getGroupList',
        method:'post',
        params:param,
    });
}
export function getGoupUserList(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getGoupUserList',
        method:'post',
        params:param,
    });
}
export function renameOrCreateGroup(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/renameOrCreateGroup',
        method:'post',
        data:param,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
       }
    });
}
export function deleteGroupUser(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/deleteGroupUser/'+param.ids,
        method:'delete',
        params:param.params
    });
}
export function deleteGroup(id){
    return request({
        url:_env.baseUrl+'/xxwlPcService/deleteGroup/'+id,
        method:'delete',
    });
}
export function addUserToGroup(param,data){
    return request({
        url:_env.baseUrl+'/xxwlPcService/addUserToGroup',
        method:'post',
        params:param,
        data:data,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
       }
    });
}