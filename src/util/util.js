import { validatenull } from './validate'
import {baseUrl} from '@/config/env';
//表单序列化
export const serialize = data => {
    let list = [];
    Object.keys(data).forEach(ele => {
        if((typeof data[ele])==="object"){
            list.push(`${ele}=${JSON.stringify(data[ele])}`);
        }else{
            list.push(`${ele}=${data[ele]}`);
        }
    })
    return list.join('&');
};
export const getObjType = obj => {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
};
/**
 * 对象深拷贝
 */
export const deepClone = data => {
    var type = getObjType(data);
    var obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
};
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
    if (status) {
        document.body.className = document.body.className + ' grayMode';
    } else {
        document.body.className = document.body.className.replace(' grayMode', '');
    }
};
/**
 * 设置主题
 */
export const setTheme = (name) => {
    document.body.className = name;
}

/**
 * 加密处理
 */
export const encryption = (params) => {
    let {
        data,
        type,
        param,
        key
    } = params;
    let result = JSON.parse(JSON.stringify(data));
    if (type == 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele]);
        })
    } else if (type == 'Aes') {
        param.forEach(ele => {
            result[ele] = window.CryptoJS.AES.encrypt(result[ele], key).toString();
        })

    }
    return result;
};


/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
    if (fullscreenEnable()) {
        exitFullScreen();
    } else {
        reqFullScreen();
    }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
    function listen() {
        callback()
    }
    document.addEventListener("fullscreenchange", function () {
        listen();
    });
    document.addEventListener("mozfullscreenchange", function () {
        listen();
    });
    document.addEventListener("webkitfullscreenchange", function () {
        listen();
    });
    document.addEventListener("msfullscreenchange", function () {
        listen();
    });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
    var isFullscreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
    return isFullscreen;
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
};
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].children.length != 0) {
            for (let j = 0; j < menu[i].children.length; j++) {
                if (menu[i].children[j].id == id) {
                    return menu[i];
                } else {
                    if (menu[i].children[j].children.length != 0) {
                        return findParent(menu[i].children[j].children, id);
                    }
                }
            }
        }
    }
};
/**
 * 判断2个对象属性和值是否相等
 */

/**
 * 动态插入css
 */

export const loadStyle = url => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
};
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
    delete obj1.close;
    var o1 = obj1 instanceof Object;
    var o2 = obj2 instanceof Object;
    if (!o1 || !o2) { /*  判断不是对象  */
        return obj1 === obj2;
    }

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
        //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    }

    for (var attr in obj1) {
        var t1 = obj1[attr] instanceof Object;
        var t2 = obj2[attr] instanceof Object;
        if (t1 && t2) {
            return diff(obj1[attr], obj2[attr]);
        } else if (obj1[attr] !== obj2[attr]) {
            return false;
        }
    }
    return true;
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
    let result = '';
    if (validatenull(dic)) return value;
    if (typeof (value) == 'string' || typeof (value) == 'number' || typeof (value) == 'boolean') {
        let index = 0;
        index = findArray(dic, value);
        if (index != -1) {
            result = dic[index].label;
        } else {
            result = value;
        }
    } else if (value instanceof Array) {
        result = [];
        let index = 0;
        value.forEach(ele => {
            index = findArray(dic, ele);
            if (index != -1) {
                result.push(dic[index].label);
            } else {
                result.push(value);
            }
        });
        result = result.toString();
    }
    return result;
};
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
    for (let i = 0; i < dic.length; i++) {
        if (dic[i].value == value) {
            return i;
        }
    }
    return -1;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = '';
    random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
    if (date) random = random + Date.now();
    return random;
};
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
    // Fixes dual-screen position                            Most browsers       Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

    const left = ((width / 2) - (w / 2)) + dualScreenLeft
    const top = ((height / 2) - (h / 2)) + dualScreenTop
    const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus()
    }
}

/**
 * 获取get请求后面的参数   返回一个对象
 * @param {*} url 
 */
export const getRequestParamObj = function(url){
    //url截取？号后的参数
    url=url.substring(url.indexOf('?'),url.length);
    var theRequest = new Object();
    if (url.indexOf("?") != -1) { //判断是否有参数
        var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
        // alert(str);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            // theRequest[strs[i].split(“=”)[0]] = decodeURI(strs[i].split("=")[1]);
            var sTemp = strs[i].split("=");
            //querystring.unescape 解码中文参数  这里中文解码用不了 需要其他方式
            theRequest[sTemp[0]]=decodeURIComponent(sTemp[1]);
        }
    }
    return theRequest;
};

/**
 * 判断为空
 * @param {*} data 
 */
export const isEmpty= function (data){
	var dataType = typeof(data);//typeof 返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined";
    var flag=false;
    switch(dataType){
		case "number"://数字
            flag = false;
			break;
		case "string"://字符串
			if(data == ""){//为空
				flag =  true;
			}else if(data == "undefined"){
				flag =  true;
			}else{
				flag =  false;
			}
			break;
		case "boolean"://布尔值
            flag =  data;
			break;
		case "object"://对象
			if(!data && typeof(data) != "undefined" && data != 0){//为null
				flag =  true;
			}else{
				flag =  true;
				for(var key in data){//非空对象
					flag =  false;
				}
			}
			break;
		case "function"://函数
            flag =  false;
			break;
		case "undefined"://undefined
            flag =  true;
			break;
    }
    return flag;
}

//获取array中对应字符串中的值a=1;b=2;c=3;d=4
export const getArrayStrValue = function(arrayStr,aimStr){
    var retStr=""; 
    var array=arrayStr.split(";");
    for(var str in array){
        if(array[str].indexOf(aimStr)>-1){//a=1
            retStr=decodeURI(array[str].split("=")[1].replace(/"/g,""));
        }
    }
    return retStr;
};

//下载文件
export const downLoadFile = function(url,loacltable,islocal,fjid){
    url = url||'/ieasy/fileStoreManagement/vueShowFilebyId';
    if(url){
        loacltable=encodeURIComponent(loacltable);
        var uri=baseUrl+url+"?_t="+new Date().getTime()+"&loacltable="+loacltable+"&islocal="+islocal+"&fjid="+fjid;
        //window.location.href=uri;
        window.open(uri);
    }
};



//将后台的json转成jsonTree格式
export const jsonTree = function (data,config) {
    //1.声明了变量，拿到传参过来的值，注意这里拿到的是string类型，不是对应的值
    var id = config.id || 'id',
        pid = config.pid || 'pid',
        children = config.children || 'children';
        var idMap = [],
        newIdMap = [],
        jsonTree = [];
   /*2.v[id]==v[“id”]==v.id
      idMap数组的下标对应着id为下标的相应json数据
      a[1]对应着id为1的json数据，以此类推*/
    data.forEach(function(v){
        idMap[v[id]] = v;
    });
    //3拿到当前遍历的父元素id
  /*			根据父元素id，判断数组里是否存在这样一条数据
              存在，就判断父元素是否有子元素数组，若没有就添加一个children数组（传参过来的） 
              把当前元素添加父元素的children数组里
              不存在，就直接添加到jsonTree里*/
    data.forEach(function(v){
        var parent = idMap[v[pid]];
        //定义一个newIdMap
        delete v.parent;//删除{v}的parent和id
        v.label=v.text;
        //delete v.id;
        if(parent) {
            !parent[children] && (parent[children] = []);
            parent[children].push(v);
        } else {
            jsonTree.push(v);
        }
    });
    return jsonTree;
};

//交集数据
export const mergeArray=function (aimArr,srcArr,param){
    var length1 = aimArr.length;
    var length2 = srcArr.length;
    for (var i = 0; i < length1; i++) {
        for (var j = 0; j < length2; j++){
            //判断添加的数组是否为空了
            if (aimArr.length > 0) {
                if (aimArr[i][param] === srcArr[j][param]) {
                    aimArr.splice(i, 1); //利用splice函数删除元素，从第i个位置，截取长度为1的元素
                    length1--;
                }
            }
        }
    }
    for (var n = 0; n < srcArr.length; n++) {
        aimArr.push(srcArr[n]);
    }
    return aimArr;
}

//取交集以外的数据
export const distArray=function (aimArr,srcArr,param){
    var length1 = aimArr.length;
    var length2 = srcArr.length;
    for (var i = 0; i < length1; i++) {
        for (var j = 0; j < length2; j++){
            //判断添加的数组是否为空了
            if (aimArr.length > 0) {
                if (aimArr[i][param] === srcArr[j][param]) {
                    aimArr.splice(i, 1); //利用splice函数删除元素，从第i个位置，截取长度为1的元素
                    length1--;
                }
            }
        }
    }
    return aimArr;
}

//目前支持验证上传文件类型 后续可加其他
export const validateFileType=function(params,obj){
    let flag=false;
    if(!validatenull(params)){
        if(params.valiDataType.length>0){
            if(params.valiDataType.indexOf(params.fileType)==-1){
                obj.$message({
                    message: '上传文件只能是 '+params.valiDataType.join("、")+'格式!',
                    type: 'warning'
                });
            }else{
                flag=true;
            }
        }
    }else{
        console.log("传参为空");
    }
    return flag;
}

/**
 * 根据数组对象中的一个参数 寻找对象
 * @param {数组对象} array 
 * @param {*} param 
 */
export const getObjFromArray=function(array,param){
    var temp= array.filter(function(item){
        return item[param.code] == param.value; 
    })
    return temp;
}

/**
 * 通过一个对象参数 寻找数组对象中的下标
 * @param {数组对象} array 
 * @param {*} param 
 */
export  const findIndexFromArrayObj=function(array,param){
    return array.findIndex( item => item[param.code] == param.value);
}