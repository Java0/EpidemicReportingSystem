/**axios封装
 * 请求拦截、响应拦截、错误统一处理
 * Auther: 何德虎
 * Create date: 2021/10/16
 */

 import Axios from 'axios'
 import Vue from 'vue'
 var _config = require('@/config/config');
 var _env = require('@/config/env');
 
 let axios = Axios.create({
     //baseURL: process.env.API_ROOT,
     baseURL: _env.baseUrl,//'http://10.79.91.212:8080',
     timeout: 1000 * 12,
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
 });

 // 请求拦截器
axios.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么(后期在这里加上token)
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);  
        config.headers.hhid='25732106212280486790129444706224';
        // if(config.url.indexOf('?')>-1){
        //     config.url += '&equipmentType=PC';
        // }else{
        //     config.url += '?equipmentType=PC';
        // }
        //config.data = config.data + '&equipmentType=PC';
        
          
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
)
//HTTPresponse拦截
_axios2.default.interceptors.response.use((rep)=> {
    if(rep.data.code == 401){

    }
});
 
 export default axios;
 