//import request from '@/util/http';
import request from 'npm-pansoft-base/lib/router/axios';
var _env = require('@/config/env');
//发送邮件
export function sendEmail(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/sendEmail',
        method:'post',
        data:param,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
       }
    });
}
//转发邮件
export function forwardEmail(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/forwardEmail',
        method:'post',
        data:param,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
       }
    });
}
//附件上传
export function uploadFile(hhid,file){
    let form = new FormData();
    form.append('file',file);
    return request({
        url:'http://10.79.3.21:12005/commonFileService/uploadFile?hhid='+hhid+'&ywxtbm=xxwl',
        method:'post',
        data:form,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}
//存草稿
export function saveCgx(data){
    return request({
        url:_env.baseUrl+'/xxwlPcService/saveCgx',
        method:'post',
        data:data,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
       }
    });
}
export function getRightTreeData(param){
    return request({
        url:_env.baseUrl+'/xxwlPcService/getRightTreeData',
        method:'get',
        params:param,
    });
}