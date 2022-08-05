
import {baseUrl} from '@/config/env';
import menuUtil from "@/data/menu/sysmenuslistUtil"

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
    if(menu){
        //console.log(menu);
        newMenu.id=menu['id'];
        newMenu.parentId=menu['pid'];
        newMenu.label=menu['text'];
        newMenu.icon=menu['iconcls']||'el-icon-menu';
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
    if(menu){
        //console.log(menu);
        for(var i in menu){
            var newMenu={};
            newMenu.id=menu[i]['id'];
            newMenu.parentId=menu[i]['pid'];
            newMenu.label=menu[i]['text'];
            newMenu.icon=menu[i]['iconcls']||'el-icon-document';
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


