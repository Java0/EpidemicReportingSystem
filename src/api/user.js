import request from 'npm-pansoft-base/lib/router/axios';
import {baseUrl} from '@/config/env';

//post方法 使用data 
//get方法 使用params

export const loginByUsername = (domain, yhid, yhkl, type,url) => request({
  url:url,
  method: 'post',
  data: {
    domain,
    yhid,
    yhkl,
    type
  }
})

export const getButtons = () => request({
  url: '/api/blade-system/menu/buttons',
  method: 'get'
});

export const getUserInfo = () => request({
  url: baseUrl + '/user/getUserInfo',
  method: 'post'
});

export const refeshToken = () => request({
  url: baseUrl + '/user/refesh',
  method: 'post'
})

//获取Menu菜单需要根据不同的数据转不动的地址
export const getMenu = (id,url) => request({
  url: baseUrl + url,///user/getMenu  sysMenu/getYwdyAndGn /sysMenu/getChildrenSysMenu /sysMenu/getAllSysMenu
  method: 'post',
  data:{fbzxtbm:id}
});

export const getTopMenu = (url) => request({
  url: baseUrl + url,///user/getTopMenu  /sysMenu/getChildrenSysMenu
  method: 'post'
});

export const sendLogs = (list) => request({
  url: baseUrl + '/user/logout',
  method: 'post',
  data: list
})

export const logout = () => request({
  url: '/user/logout',
  method: 'get'
})
//获取配置文件
export const getConfig=()=>request({
  url:baseUrl +'/login/config',
  method:'post'
})

