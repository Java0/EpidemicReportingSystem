/**
 * 全局配置文件
 */
export default {
  title: "疫情报备系统",
  info:"疫情报备系统",
  topTitle: '疫情报备系统',
  clientId: 'vuebase', // 客户端id
  clientSecret: 'vuebase_secret', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  logo: "S",
  key: 'vuebase',//配置主键,目前用于存储
  lockPage: '/lock',
  loaclMenu:true,
  checkPower:false,//验证token
  tokenTime: 6000,
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [],
  //配置首页不可关闭
  isFirstPage: false,
  //用来展示首个tag
  fistPage: {
    label: "首页",
    value: "/",
    params: {},
    query: {},
    meta: {
      i18n: 'dashboard'
    },
    group: [],
    close: false
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'label',
      path: 'path',
      icon: 'icon',
      children: 'children'
    }
  },
  //分页信息
  page:{
    pageSizes: [15,20, 30, 50],//默认
    currentPage: 1,
    pageNumber:1,
    total: 0,
    pageSize: 15
  }
}
