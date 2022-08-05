// 配置编译环境和线上环境之间的切换
const env = process.env;
let baseUrl = env.VUE_APP_BaseProxyUri;
let iconfontVersion = ['567566_pwc3oottzol', '1066523_v8rsbcusj5q'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
let codeUrl = `${baseUrl}/code`
export {
    baseUrl,
    iconfontUrl,
    iconfontVersion,
    codeUrl,
    env
}
