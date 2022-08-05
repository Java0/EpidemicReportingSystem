
export default {
  install (Vue, options) {
    /** 当前地址ip
     * @method $path
     * @param {}
    */
    Vue.prototype.$path = process.env.VUE_APP_BaseProxyUri

    /** 当前地址ip
     * @method $getPath
     * @param {url: 路径}
    */
    Vue.prototype.$getPath = function (url) {
      const base = process.env.VUE_APP_BaseProxyUri
      if (/^http/.test(url)) return url
      return base + url
    }
  }
}
