import { setToken, removeToken } from '../../utils/auth'
import { setStore, getStore,clearStore} from '../../utils/store'
import { isURL, validatenull } from '../../utils/validate'
import { deepClone,jsonTree,isEmpty } from '../../utils/util'
import { buildMenu,buildNewMenu } from '../../utils/menutils';
import webiste from '@/config/website'
import {baseUrl} from '@/config/env';
import { loginByUsername, getUserInfo, getMenu, getTopMenu, logout, refeshToken, getButtons,getConfig } from '@/api/user'
import { loginByUserNameForJwt,loginByJwt } from 'npm-pansoft-base/lib/api/user'
//循环遍历菜单
function addPath(ele, first) {
    const menu = webiste.menu;
    const propsConfig = menu.props;
    const propsDefault = {
        label: propsConfig.label || 'name',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children'
    }
    const icon = ele[propsDefault.icon];
    ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
    if (!isChild) ele[propsDefault.children] = [];
    if (!isChild && first && !isURL(ele[propsDefault.path])) {
        ele[propsDefault.path] = ele[propsDefault.path] + '/index'
    } else {
        ele[propsDefault.children].forEach(child => {
            addPath(child);
        })
    }

}
const user = {
    state: {
        userInfo: getStore({ name: 'userInfo' }) || {},
        permission: getStore({ name: 'permission' }) || {},
        jwt:getStore({ name: 'jwt' }) ||"",
        roles: [],
        menu: getStore({ name: 'menu' }) || [],
        menuAll: [],
        token: getStore({ name: 'token' }) || '',
        integrateHHid:getStore({ name: 'integrateHHid' }) || '',
        backConfig:getStore({ name: 'backconfig' }) || ''
    },
    actions: {
        //根据用户名登录service层
        LoginByUsername({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                var url='/user/login';
                if(webiste.checkPower){
                    url=baseUrl+(userInfo.url||'/login/ajaxLogin');
                }
                loginByUsername(userInfo.domain, userInfo.yhid, userInfo.yhkl, userInfo.type,url).then(res => {
                    // console.log(res.data);
                    if(res.data.flag){
                        //这里的x-auth-token和axios 拦截器里面的token对应
                        commit('SET_TOKEN', res.headers["x-auth-token"]);
                        if(webiste.checkPower){
                            const data = res.data.data;//用户信息
                            commit('SET_USERIFNO', data);
                            getConfig().then(res => {
                                commit('SET_BACK_CONFIG', res.data);
                            }).catch(error => {
                                reject(error);
                            });
                        }else{
                            commit('SET_USERIFNO', userInfo);
                        }
                        commit('DEL_ALL_TAG');
                        commit('CLEAR_LOCK');
                        resolve(res);
                    }else{
                        resolve(res);
                    }
                }).catch(error => {
                  reject(error);
                })
            })
        },
        LoginByUserNameForJwt({ commit },options){
            return new Promise((resolve, reject) => {
                loginByUserNameForJwt(options.url,options.yhid,options.domain,options.yhkl,options.jwtState).then(res => {
                    if(res.data.loginId){
                        //这里的x-auth-token和axios 拦截器里面的token对应
                        commit('SET_JWT', res.headers.authorization);
                        commit('DEL_ALL_TAG');
                        commit('CLEAR_LOCK');
                        resolve(res);
                    }else{
                        resolve(res);
                    }
                }).catch(error => {
                reject(error);
                })
            });
        },
        LoginByJwt({ commit },options){
            return new Promise((resolve, reject) => {
                loginByJwt(options.url,options.authorization).then(res=>{
                    if(!isEmpty(res.data.result)){
                        let userInfo = {yhxm:res.data.result.loginName, yhid:res.data.result.loginId};
                        setStore({
                            name: 'originalmenu',
                            content: res.data.result.menuList,
                            type: 'session'
                        });
                        commit('SET_USERIFNO', userInfo);
                        resolve(res);
                    }else{
                        resolve(res);
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        },
        LoginWithJwtByUserName({ commit },options){
            return new Promise((resolve, reject) => {
                loginByUserNameForJwt(options.url,options.yhid,options.domain,options.yhkl,options.jwtState).then(res => {
                    if(res.data.loginId){
                        //这里的x-auth-token和axios 拦截器里面的token对应
                        commit('SET_JWT', res.headers.authorization);
                        commit('DEL_ALL_TAG');
                        commit('CLEAR_LOCK');
                        loginByJwt(options.jwtUrl,res.headers.authorization).then(resUser=>{
                            if(!isEmpty(resUser.data.result)){
                                let userInfo = {yhxm:resUser.data.result.loginName, yhid:resUser.data.result.loginId};
                                setStore({
                                    name: 'originalmenu',
                                    content: resUser.data.result.menuList,
                                    type: 'session'
                                });
                                commit('SET_USERIFNO', userInfo);
                                resolve(resUser);
                            }else{
                                resolve(resUser);
                            }
                        }).catch(error => {
                            reject(error);
                        });
                    }else{
                        resolve(res);
                    }
                }).catch(error => {
                    reject(error);
                })
            });
        },
        GetButtons({ commit }) {
            return new Promise((resolve) => {
                getButtons().then(res => {
                    const data = res.data.data;
                    commit('SET_PERMISSION', data);
                    resolve();
                })
            })
        },
        //根据手机号登录
        LoginByPhone({ commit }, userInfo) {
            return new Promise((resolve) => {
                loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', res.headers["x-auth-token"]);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    resolve();
                })
            })
        },
        //需要自己写
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data.data;
                    commit('SET_ROLES', data.roles);
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        //刷新token 需要自己写后台
        RefeshToken({ state, commit }) {
            return new Promise((resolve, reject) => {
                refeshToken(state.refeshToken).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', res.headers["x-auth-token"]);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                //logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_MENU', [])
                    commit('SET_ROLES', [])
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    commit('SET_USERIFNO', {});
                    clearStore({ type: 'session' });
                    removeToken();
                    resolve();
                //}).catch(error => {
                    //reject()
                //})
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_MENU', [])
                commit('SET_ROLES', [])
                commit('DEL_ALL_TAG');
                commit('SET_USERIFNO', {});
                commit('CLEAR_LOCK');
                clearStore({ type: 'session' });
                removeToken()
                resolve()
            })
        },
        GetTopMenu() {
            return new Promise(resolve => {
                var url="/sysMenu/getChildrenSysMenu";
                if(webiste.loaclMenu){
                    url="/user/getTopMenu";
                }
                getTopMenu(url).then((res) => {
                    const data = res.data || []
                    var newData=data;
                    newData= buildMenu(data);
                    //首页必须有不然菜单出不来
                    newData.unshift(webiste.fistPage);
                    resolve(newData);
                })
            })
        },
        //获取系统菜单
        GetMenu({ commit, dispatch }, parentId) {
            return new Promise(resolve => {
                var url="/user/getMenu";
                if(parentId){
                    url="/sysMenu/getYwdyAndGn";
                }else{
                    //url="/sysMenu/getChildrenSysMenu";
                    url="/sysMenu/getAllSysMenu";
                }
                if(webiste.loaclMenu){
                    url="/user/getMenu";
                }
                getMenu(parentId,url).then((res) => {
                    const data = res.data;
                    var newData=data;
                    //用公司的统一授权菜单的话需要在这转换成所需要的格式
                    newData= buildMenu(data);
                    let menu = deepClone(newData);
                    menu.forEach(ele => {
                        addPath(ele, true);
                    });
                    //此处是 获取菜单的关键步骤 ，如果没有这个步骤菜单出不来
                    commit('SET_MENU', menu);
                    //dispatch('GetButtons');
                    resolve(menu);
                })
            })
        },
        //获取用户中心系统菜单
        GetNewMenu({ commit, dispatch }, parentId) {
            return new Promise(resolve => {
                let originalmenu = deepClone(getStore({name:"originalmenu"}));
                // console.log(originalmenu);
                let config = {id:"resourceId", pid:"resParentId"};
                let newMenu = jsonTree(originalmenu, config)
                // console.log(newMenu);

                let newmenu = buildNewMenu(newMenu)
                // console.log(newmenu);

                newmenu.forEach(ele => {
                    addPath(ele, true);
                });
                //此处是 获取菜单的关键步骤 ，如果没有这个步骤菜单出不来
                commit('SET_MENU', newmenu);
                //dispatch('GetButtons');
                resolve(newmenu);
            })
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            setToken(token)
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
            setStore({ name: 'userInfo', content: state.userInfo })
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
            setStore({ name: 'menu', content: state.menu, type: 'session' })
        },
        SET_MENU_ALL: (state, menuAll) => {
            state.menuAll = menuAll;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_JWT: (state, jwt) => {
            state.jwt = jwt;
            setStore({ name: 'jwt', content: state.jwt, type: 'session' })
        },
        SET_PERMISSION: (state, permission) => {
            let result = [];
            function getCode(list) {
                if(list){
                    list.forEach(ele => {
                        if (typeof (ele) === 'object') {
                            const chiildren = ele.children;
                            const code = ele.code;
                            if (chiildren) {
                                getCode(chiildren)
                            } else {
                                result.push(code);
                            }
                        }
    
                    })
                }
            }
            getCode(permission);
            state.permission = {};
            result.forEach(ele => {
                state.permission[ele] = true;
            });
            setStore({ name: 'permission', content: state.permission, type: 'session' })
        },
        SET_BACK_CONFIG: (state, backconfig) => {
            state.backconfig = backconfig;
            setStore({ name: 'backconfig', content: state.backconfig, type: 'session' });
        },
        SET_INTEGRATEHHID:(state, integrateHHid)=>{
            state.integrateHHid = integrateHHid;
            setStore({ name: 'integrateHHid', content: state.integrateHHid, type: 'session' });
        }
    }

}
export default user
