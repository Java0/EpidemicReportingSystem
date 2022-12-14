/**
 * 全站权限配置
 *
 */
import router from 'npm-pansoft-base/lib/router/router'
import store from 'npm-pansoft-base/lib/store'
import { validatenull } from 'npm-pansoft-base/lib/utils/validate'
import { setStore, getStore } from 'npm-pansoft-base/lib/utils/store'
import { isEmpty } from 'npm-pansoft-base/lib/utils/util'
import config from '@/config/website';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import axios from 'npm-pansoft-base/lib/router/axios';

NProgress.configure({ showSpinner: false });
const lockPage = store.getters.website.lockPage; //锁屏页
router.beforeEach((to, from, next) => {
    //缓冲设置
    if (to.meta.keepAlive === true && store.state.tags.tagList.some(ele => {
        return ele.value === to.fullPath;
    })) {
        to.meta.$keepAlive = true;
    } else {
        NProgress.start()
        if (to.meta.keepAlive === true && validatenull(to.meta.$keepAlive)) {
            to.meta.$keepAlive = true;
        } else {
            to.meta.$keepAlive = false;
        }
    }
    //const meta = to.meta || {};
    var token=getStore({ name: 'token', type: 'session' });
    var jwt=getStore({ name: 'jwt', type: 'session' });
    //登陆有bug
    // console.log(token);
    // console.log(jwt);
    //判断是否需要认证，没有登录访问去登录页
    //meta.isAuth 之前代码是这么写的  meta是个传参对象 类似param
    //如何配置文件中导出写的是 export default 那么这里就要加default
    //const con=require("./config/website").default;
    if (store.getters.isLock && to.path != lockPage) { //如果系统激活锁屏，全部跳转到锁屏页
        next({ path: lockPage })
    } else if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
        store.dispatch('LogOut');
        //此处不能加地址 不然会无限循环
        next();
    }else if(!isEmpty(to.query["hhid"])){
        //验证hhid 如果会话id通过则把hhid放入store中
        store.commit("SET_INTEGRATEHHID",to.query["hhid"]);
        // console.log(store.getters.integrateHHid);
        axios.apiPost({
            url:"/login/hhidLogin",
            data:{
                hhid:to.query["hhid"]
            },
            call:function(data){
                if(data.data.flag){
                    store.commit('SET_TOKEN', data.headers["x-auth-token"]);
                    store.commit('SET_USERIFNO', data.data.data);
                    next();
                }else{
                    next({path:'/noLogin?msg='+data.data.msg});
                }
            }
        });
    }else if(!isEmpty(to.query["jwt"])){
        //验证hhid 如果会话id通过则把hhid放入store中
        store.commit("SET_JWT",to.query["jwt"]);
        // console.log(store.getters.integrateHHid);
        axios.apiPost({
            url:"/login/hhidLogin",
            data:{
                jwt:to.query["jwt"]
            },
            call:function(data){
                if(data.data.flag){
                    store.commit('SET_TOKEN', data.headers["x-auth-token"]);
                    store.commit('SET_USERIFNO', data.data.data);
                    next();
                }else{
                    next({ path: '/login' });
                }
            }
        });
    }else {
        //是否检验统一授权
        if (config.checkPower === false) {
            //这一段用来添加首页tags标签 如果不加这个标签就显示不出来  config中的label 对应的name 改成了label 不知道是否有影响  
            const value = to.query.src || to.fullPath;
            const label = to.query.name || to.name;
            const meta = to.meta || router.$avueRouter.meta || {};
            const i18n = to.query.i18n;
            if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
                store.commit('ADD_TAG', {
                    label: label,
                    value: value,
                    params: to.params,
                    query: to.query,
                    meta: (() => {
                        if (!i18n) {
                            return meta
                        }
                        return {
                            i18n: i18n
                        }
                    })(),
                    group: router.$avueRouter.group || []
                });
            }
            next();
            //hhidLogin 集成页面登陆 先判断是否有hhid
        }else {
            if(!isEmpty(token)){
                //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
                if (store.getters.token.length === 0) {
                    store.dispatch('FedLogOut').then(() => {
                        next({ path: '/noLogin?msg=未获取到用户信息' })
                    })
                } else {
                    const value = to.query.src || to.fullPath;
                    const label = to.query.name || to.name;
                    const meta = to.meta || router.$avueRouter.meta || {};
                    const i18n = to.query.i18n;
                    if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
                        store.commit('ADD_TAG', {
                            label: label,
                            value: value,
                            params: to.params,
                            query: to.query,
                            meta: (() => {
                                if (!i18n) {
                                    return meta
                                }
                                return {
                                    i18n: i18n
                                }
                            })(),
                            group: router.$avueRouter.group || []
                        });
                    }
                    next()
                }
            }else if (!isEmpty(jwt)){
                //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
                if (isEmpty(token)) {
                    store.dispatch('FedLogOut').then(() => {
                        next({ path: '/login' })
                    })
                } else {
                    const value = to.query.src || to.fullPath;
                    const label = to.query.name || to.name;
                    const meta = to.meta || router.$avueRouter.meta || {};
                    const i18n = to.query.i18n;
                    if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
                        store.commit('ADD_TAG', {
                            label: label,
                            value: value,
                            params: to.params,
                            query: to.query,
                            meta: (() => {
                                if (!i18n) {
                                    return meta
                                }
                                return {
                                    i18n: i18n
                                }
                            })(),
                            group: router.$avueRouter.group || []
                        });
                    }
                    next()
                }
            }else{
                //这里检测会话id有点问题
                console.log(store.getters.userInfo.hhid);
                if(isEmpty(store.getters.userInfo.hhid)){
                    store.dispatch('FedLogOut').then(() => {
                        next({ path: '/noLogin?msg=hhid无效' })
                    })
                }else{
                    const value = to.query.src || to.fullPath;
                    const label = to.query.name || to.name;
                    const meta = to.meta || router.$avueRouter.meta || {};
                    const i18n = to.query.i18n;
                    if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
                        store.commit('ADD_TAG', {
                            label: label,
                            value: value,
                            params: to.params,
                            query: to.query,
                            meta: (() => {
                                if (!i18n) {
                                    return meta
                                }
                                return {
                                    i18n: i18n
                                }
                            })(),
                            group: router.$avueRouter.group || []
                        });
                    }
                    next()
                }
            }
        }
    }
})

router.afterEach(() => {
    NProgress.done();
    let title = store.getters.tag.label;
    let i18n = store.getters.tag.meta.i18n;
    title = router.$avueRouter.generateTitle(title, i18n)
    //根据当前的标签也获取label的值动态设置浏览器标题
    router.$avueRouter.setTitle(title);
});
