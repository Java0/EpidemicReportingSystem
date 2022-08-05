<template>
<div>
  <avue-crud ref="crud" :option="option1" :data="data"></avue-crud>
  <el-button type="primary" @click="handleExcel">下载 excel</el-button>
    <el-button icon="el-icon-edit" type="primary" size="small" @click="showRy">选择人员</el-button>
  <basic-container>
    123321123
      
  </basic-container>
  <basicContainer>
  <IconListShow></IconListShow>
  </basicContainer>
  <SelTysqAnRyNSync 
        v-if="tysqShow" 
        class="form_test" 
        ref="syncSelTysqRy"
        :tysqShow.sync="tysqShow"  
        :dataOptions="dataOptions"
        :dwTreeParams="dwTreeParams"></SelTysqAnRyNSync>
  <!--<avue-form :option="option" v-model="obj">
  </avue-form>-->
  <el-button @click="test">获取菜单</el-button>
  <el-button @click="test1">根据id获取菜单</el-button>
</div>
</template>

<script>
import api from 'npm-pansoft-base/lib/router/axios' // 改成对应的路径

export default {
    data() {
      return {
        option:{
          "column": [],
          "labelPosition": "left",
          "labelSuffix": "：",
          "labelWidth": 120,
          "gutter": 0,
          "menuBtn": true,
          "submitBtn": true,
          "submitSize": "medium",
          "submitText": "提交",
          "emptyBtn": true,
          "emptySize": "medium",
          "emptyText": "清空",
          "menuPosition": "center",
          "group": [
            {
              "label": "分组",
              "prop": "1585563089385_57931",
              "column": [
                {
                  "type": "input",
                  "label": "单行文本",
                  "span": 12,
                  "display": true,
                  "prop": "1585563090096_6659"
                },
                {
                  "type": "input",
                  "label": "单行文本",
                  "span": 12,
                  "display": true,
                  "prop": "1585563092686_59836"
                },
                {
                  "type": "input",
                  "label": "单行文本",
                  "span": 12,
                  "display": true,
                  "prop": "1585563091430_71335"
                },
                {
                  "type": "input",
                  "label": "单行文本",
                  "span": 12,
                  "display": true,
                  "prop": "1585563094137_86297"
                }
              ]
            }
          ]
        },
        user: {},
        data: [{
          array: '1,2,3',
          href: 'https://www.baidu.com',
          img: 'http://demo.cssmoban.com/cssthemes5/twts_236_rage/assets/images/background/header.jpg,http://demo.cssmoban.com/cssthemes5/twts_236_rage/assets/images/background/header.jpg'
        }],
        option1: {
          align: 'center',
          menuAlign: 'center',
          border: true,
          column: [{
            label: '超链接',
            prop: 'href',
            type: 'url'
          }, {
            label: '图片',
            prop: 'img',
            dataType: 'string',
            type: 'img'
          }, {
            label: '数组',
            prop: 'array',
            dataType: 'number',
            type: 'array'
          }]
        },
        tysqShow: false,
        dataOptions:{
          retData:[]
        },
        dwTreeParams:{
            dwbm:"CNPC.PetroChina.TLM",
            maxdwjb:"100",
            mindwjb:"0",
            order:"DWBM",
            dwid:""
        }
      }
    },methods: {
      test(){
        var that=this;
        this.axios.apiPost({
          url:'/sysMenu/getChildrenSysMenu',
          data:{},
          call:function(res){
            console.log(JSON.stringify(res.data)+" "+JSON.stringify(that.$route.query));
          }
        });
      },
      test1(){
        //var that=this;
        this.axios.apiPost({
          url:'/sysMenu/getYwdyAndGn',
          data:{fbzxtbm:"LSJOA.GWGL"},
          call:function(res){
            console.log(JSON.stringify(res.data));
          }
        });
      },
      handleExcel() {
        let opt = {
          title: '文档标题',
          column: [{
            label: '标题',
            prop: 'title'
          },{
            label: '测试',
            prop: 'name'
          }],
          data: [{
            title: "测试数据1",
            name:"1"
          }, {
            title: "测试数据2",
            name:"2"
          }]
        }
        this.$export.excel({
          title: opt.title || new Date().getTime(),
          columns: opt.column,
          data: opt.data
        });
      },
      showRy() {
        this.tysqShow = true;
      }
    }
};
</script>

<style>

</style>