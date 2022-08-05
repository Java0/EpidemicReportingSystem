import Mock from 'mockjs'

import sysrootmenu from "@/data/menu/childrensyslist"
import {baseUrl} from '@/config/env';

export default ({mock}) => {
  if (!mock) return;
  Mock.mock(baseUrl+'/user/getTopMenu', 'post', () => {
    console.log(sysrootmenu);
    return sysrootmenu;
  });
  Mock.mock(RegExp(baseUrl+'/user/getMenu'+".*"), 'post', (options) => {
    if(options.body.split("=")[1]!="undefined"){
        let json = require('@/data/menu/sysmenuslist'+options.body.split("=")[1]+'.json');
        return json;
    }else{
        return sysrootmenu;
    }
  })
}
