import "babel-polyfill"
import Vue from 'vue';
//引用顺序不能乱
import App from './App';
import axios from 'npm-pansoft-base/lib/router/axios';
import VueAxios from 'vue-axios';
import router from 'npm-pansoft-base/lib/router/router';
import store from '@/utils/store';
import './permission'; // 权限
import './error'; // 日志
import { loadStyle } from 'npm-pansoft-base/lib/utils/util'
import * as urls from '@/config/env';
import Element from 'element-ui';
import i18n from './lang' // Internationalization
import './styles/common.scss';
import pansoft from 'npm-pansoft-base';
import pansoftPlugn from 'npm-pansoft-plugn';
//动态引入common下的所有组件
const requireComponent = require.context('@/components/common/', false, /\.vue$/);
requireComponent.keys().forEach(fileName=>{
    // 获取组件配置
    const componentConfig = requireComponent(fileName);
    var names = fileName.split("/").pop().replace(/\.\w+$/,"");//BaseBtn
    // 若该组件是通过"export default"导出的，优先使用".default"，
    // 否则退回到使用模块的根
    Vue.component(names,componentConfig.default || componentConfig);
});

Vue.use(pansoft);
Vue.use(pansoftPlugn);
//axios.defaults.baseURL = '/api';
// window.axios=axios;

Vue.use(router)
Vue.use(VueAxios, axios)
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(window.AVUE, {
    i18n: (key, value) => i18n.t(key, value)
})


// 加载相关url地址
Object.keys(urls).forEach(key => {
    Vue.prototype[key] = urls[key];
})

// 动态加载阿里云字体库
/*iconfontVersion.forEach(ele => {
    loadStyle(iconfontUrl.replace('$key', ele));
})*/
// import { TabPlugin } from "@syncfusion/ej2-vue-navigations";
// import { GridPlugin } from "@syncfusion/ej2-vue-grids";
// Vue.use(TabPlugin);
// Vue.use(GridPlugin);
Vue.config.productionTip = false;
//新建vue实例
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')