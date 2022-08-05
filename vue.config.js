const proxUrl= require('./src/config/config');
const webpack = require('webpack');
const env = process.env;
let proxUrlStr="";
console.log("====NODE_ENV "+env.NODE_ENV);
//注意如果生产环境(打包到服务器上运行) 前台和本机在一个ip下 则需要用proxUrl 如果是不同的服务器则用/api 此时还需要配置ngnix
if (env.NODE_ENV == 'development') {
    proxUrlStr=proxUrl.devProxUrl;
} else if (env.NODE_ENV == 'production') {
    proxUrlStr=proxUrl.proProxUrl;
} else if (env.NODE_ENV == 'test') {
    proxUrlStr=proxUrl.testProxUrl;
}
//解决baseproxyurl获取不到的问题
module.exports = {
  // 基本路径
  publicPath:"./", // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
  outputDir:"dist",  //打包时生成的生产环境构建文件的目录
  assetsDir: 'public',  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  //configureWebpack 是Vue CLI3.0 中用于配置 webpack 插件参数的地方，你在这里设置，会新建或者覆盖 webpack 默认配置。
  //webpack ProvidePlugin 的含义是创建一个全局的变量，使这个变量在 webpack 各个模块内都可以使用。这里的配置含义是创建 '$'、'jQuery'、'window.jQuery' 三个变量指向 jquery 依赖，创建 'Popper' 变量指向 popper.js 依赖。
  css:{
  
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
  },
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    })
    //注册附加组件 链式配置
    const entry = config.entry('app')
    //（模拟ES2015以上的环境，主要用于对ES6新语法不支持的浏览器）
    entry
      .add('babel-polyfill')
      .end()
    //解决兼容性问题
    entry
      .add('classlist-polyfill')
      .end()
    //引入mock
    entry
      .add('@/mock')
      .end()
  },
  devServer: {
    // 端口配置
    port: 3000,
    // 反向代理配置
    proxy: {
      [env.VUE_APP_BaseProxyUri]: {
        target: proxUrlStr,
        ws:true,
        changeOrigin: true, //是否开启跨域
        pathRewrite: {
            ['^'+env.VUE_APP_BaseProxyUri]: '' //规定请求地址以什么作为开头
        }
      }
    }
  }
}
