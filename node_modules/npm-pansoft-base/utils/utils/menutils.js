
import {baseUrl} from '@/config/env';
import defaultMenuIcon from '@/config/defaultMenuIcon';
import {getObjFromArray,isEmpty} from './util';
export function instMainMenus(isLocalMenus,menusPostion) {
    if(menusPostion == 'left'){
        return "";
    }else{
        return "";
    }
}

export function loadLeftMenus(isLocalMenus){
    var navMenuUrl = baseUrl+"/sysMenu/getChildrenSysMenu?_s="+new Date().getTime();
    if(isLocalMenus=='Y')
        navMenuUrl = '/localmenus/childrensyslist.json?_s='+new Date().getTime();
}

export function loadTopMenus(isLocalMenus){
    var navMenuUrl = baseUrl+"/sysMenu/getChildrenSysMenu?_s="+new Date().getTime();
    if(isLocalMenus=='Y')
        navMenuUrl = '/localmenus/childrensyslist.json?_s='+new Date().getTime();
    
}

export function buildMenu(menu){
    var newMenu_list=[];
    if(menu){
        for(var i in menu){
            var temp_menu=exchangeMenu(menu[i]);
            newMenu_list.push(temp_menu);
        }
    }
    //newMenu_list[newMenu_list.length-1].children.push(menuUtil);
    return newMenu_list;
}

export function exchangeMenu(menu){
    var newMenu={};
    var defaultIcon = getObjFromArray(defaultMenuIcon,{code:"id",value:"default"});
    if(menu){
        //console.log(menu);
        newMenu.id=menu['id'];
        newMenu.parentId=menu['pid'];
        newMenu.label=menu['text'];
        var iconObj = getObjFromArray(defaultMenuIcon,{code:"id",value:newMenu.id});
        if(!isEmpty(iconObj)){
            newMenu.icon=iconObj[0]['iconcls']||(isEmpty(defaultIcon)?"el-icon-menu":defaultIcon[0]['iconcls']);
        }else{
            newMenu.icon=menu['iconcls']||(isEmpty(defaultIcon)?"el-icon-menu":defaultIcon[0]['iconcls']);
        }
        newMenu.path="";//给个空值
        newMenu.meta={};
        if(menu['attributes']){
            newMenu.path=menu['attributes'].href==null?"":menu['attributes'].href;
        }
        if(menu['children']){
            newMenu.children=exchangeChildMenu(menu['children']);
        }
    }
    return newMenu;
}

export function exchangeChildMenu(menu){
    var child_List=[];
    var defaultChildIcon = getObjFromArray(defaultMenuIcon,{code:"id",value:"defaultChild"});
    if(menu){
        //console.log(menu);
        for(var i in menu){
            var newMenu={};
            newMenu.id=menu[i]['id'];
            newMenu.parentId=menu[i]['pid'];
            newMenu.label=menu[i]['text'];
            var iconObj = getObjFromArray(defaultMenuIcon,{code:"id",value:newMenu.id});
            if(!isEmpty(iconObj)){
                newMenu.icon=iconObj[0]['iconcls']||(isEmpty(defaultChildIcon)?'el-icon-document':defaultChildIcon[0]['iconcls']);
            }else{
                newMenu.icon=menu[i]['iconcls']||(isEmpty(defaultChildIcon)?'el-icon-document':defaultChildIcon[0]['iconcls']);
            }
            newMenu.meta={};
            newMenu.query={gnbm:menu[i]['id'],gnmc:menu[i]['text']};
            newMenu.path="";//给个空值
            if(menu[i]['attributes']){
                newMenu.path=menu[i]['attributes'].href==null?"":menu[i]['attributes'].href; //https://form.avuejs.com/
            }
            if(menu[i]['children']){
                newMenu.children=exchangeChildMenu(menu[i]['children']);
            }
            child_List.push(newMenu);
        }
    }
    return child_List;
}

export function buildNewMenu(menu){
    var newMenu_list=[];
    if(menu){
        for(var i in menu){
            if(menu[i].resType == "menu")
            {
                var temp_menu=exchangeNewMenu(menu[i]);
                newMenu_list.push(temp_menu);
            }
        }
    }
    //newMenu_list[newMenu_list.length-1].children.push(menuUtil);
    return newMenu_list;
}

export function exchangeNewMenu(menu){
    var newMenu={};
    var defaultIcon = getObjFromArray(defaultMenuIcon,{code:"id",value:"default"});
    if(menu){
        //console.log(menu);
        newMenu.id=menu['resourceId'];
        newMenu.parentId=menu['resParentId'];
        newMenu.label=menu['resName'];
        var iconObj = getObjFromArray(defaultMenuIcon,{code:"id",value:newMenu.id});
        if(!isEmpty(iconObj)){
            newMenu.icon=iconObj[0]['iconcls']||(isEmpty(defaultIcon)?"el-icon-menu":defaultIcon[0]['iconcls']);
        }else{
            newMenu.icon=menu['iconcls']||(isEmpty(defaultIcon)?"el-icon-menu":defaultIcon[0]['iconcls']);
        }
        // newMenu.icon=menu['iconcls']||'el-icon-menu';
        newMenu.path="";//给个空值
        newMenu.meta={};
        if(menu['pageUrl']){
            newMenu.path=menu['pageUrl']==null?"":menu['pageUrl'];
        }
        if(menu['children']){
            newMenu.children=exchangeChildNewMenu(menu['children']);
        }
    }
    return newMenu;
}

export function exchangeChildNewMenu(menu){
    var child_List=[];
    var defaultChildIcon = getObjFromArray(defaultMenuIcon,{code:"id",value:"defaultChild"});
    if(menu){
        //console.log(menu);
        for(var i in menu){
            var newMenu={};
            newMenu.id=menu[i]['resourceId'];
            newMenu.parentId=menu[i]['resParentId'];
            newMenu.label=menu[i]['resName'];
            var iconObj = getObjFromArray(defaultMenuIcon,{code:"id",value:newMenu.id});
            if(!isEmpty(iconObj)){
                newMenu.icon=iconObj[0]['iconcls']||(isEmpty(defaultChildIcon)?'el-icon-document':defaultChildIcon[0]['iconcls']);
            }else{
                newMenu.icon=menu[i]['iconcls']||(isEmpty(defaultChildIcon)?'el-icon-document':defaultChildIcon[0]['iconcls']);
            }
            // newMenu.icon=menu[i]['iconcls']||'el-icon-document';
            newMenu.meta={};
            newMenu.query={gnbm:menu[i]['resourceId'],gnmc:menu[i]['resName']};
            newMenu.path="";//给个空值
            if(menu[i]['pageUrl']){
                newMenu.path=menu[i]['pageUrl']==null?"":menu[i]['pageUrl']; //https://form.avuejs.com/
            }
            if(menu[i]['children']){
                newMenu.children=exchangeChildNewMenu(menu[i]['children']);
            }
            child_List.push(newMenu);
        }
    }
    return child_List;
}

