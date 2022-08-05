<template>
    <el-dialog 
        v-if="dialogTysqVisible" 
        append-to-body 
        width="90%" 
        top="5vh"   
        :center="dialogOp.center" 
        title="选择人员(多选)"  
        :visible.sync="dialogTysqVisible"  
        @close="distroy">
        <!--父组件传过来的formData 赋值给新值newFormData 如果不赋值控制台会报错 经过努力 avue的方式传值有问题 js会报错 其实没有错 官方插件bug-->
            <el-container style="height: 500px; border: 1px solid #eee">
                <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
                        <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
                        <el-tree ref="tree"  
                        class="filter-tree"
                        :data="treeData" 
                        :props="treeProps"
                        @node-click="handleNodeClick" 
                        :filter-node-method="filterNode"
                        :expand-on-click-node="false"
                        accordion></el-tree>
                </el-aside>
                <el-container>
                     <el-header style="height: auto; font-size: 12px">
                        <div style="text-align: left;float:left">
                            <el-tag type="success"> 可选人员</el-tag>
                        </div>
                        <div style="text-align: right;">
                            <el-input class="el_input_search" v-model="treeNode.dlid" size="mini" placeholder="请输入登陆id"/>
                            <el-input class="el_input_search" v-model="treeNode.yhxm"  size="mini" placeholder="请输入用户姓名"/>
                            <el-tooltip class="item" effect="dark" content="搜索" placement="top">
                                <el-button type="default" icon="el-icon-search" circle size="mini" @click="gteRyByXm()"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="清除" placement="top">
                                <el-button type="default" icon="el-icon-refresh-right" circle size="mini" @click="clear()"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="全部选择" placement="top">
                                <el-button type="default" icon="el-icon-d-arrow-right" circle size="mini" @click="choseAll()"></el-button>
                            </el-tooltip>
                        </div>
                    </el-header >
                    <el-main>
                         <el-table :data="data" style="width: 100%" @row-dblclick="selRy"> 
                             <el-table-column
                                label="序号"
                                type="index"
                                width="50">
                            </el-table-column>
                             <el-table-column
                                prop="yhxm"
                                label="姓名"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="dwmc"
                                label="单位名称"
                                width="160">
                            </el-table-column>
                        </el-table>
                    </el-main>
                </el-container>
                 <el-container>
                    <el-header style="height: auto;text-align: right; font-size: 12px">
                         <div style="text-align: left;float:left">
                            <el-tag> 已选人员</el-tag>
                        </div>
                        <div style="text-align: right;">
                           <el-button type="default" icon="el-icon-d-arrow-left" circle size="mini" @click="clearAll()"></el-button>
                        </div>
                    </el-header >
                    <el-main>
                        <el-table :row-class-name="tableRowClassName" :data="data1" style="width: 100%" @row-dblclick="unSelRy"> 
                            <el-table-column
                                label="序号"
                                type="index"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                prop="yhxm"
                                label="姓名"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="dwmc"
                                label="单位名称"
                                width="160">
                            </el-table-column>
                        </el-table>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer>
                 <div style="text-align:center;padding: 10px 0">
                    <el-button type="primary" @click="doSave">保 存</el-button>
                    <el-button  @click="distroy">取 消</el-button>
                </div>
            </el-footer>
    </el-dialog>
</template>

<script>
import {mapGetters} from "vuex";
import {deepClone,isEmpty,jsonTree,mergeArray} from "@/util/util";
import api from 'npm-pansoft-base/lib/router/axios' // 改成对应的路径
 export default {
    name:"SelTysqAnyRy",
    data() {
      return {
        filterText: '',
        dialogTysqVisible: this.tysqShow,
        dialogOp:{
            center : false
        },
        obj:{},
        obj1:{},
        form:{},
        dwTreeParams:{
            dwbm:"CNPC.PetroChina.TLM",
            maxdwjb:"100",
            mindwjb:"0",
            order:"DWPWSX"
        },
        treeNode:{
            yhxm:"",
            dlid:""
        },
        data:[],
        data1:[],
        tempFile:{
            label:"",
            value:""
        },
        treeData:[],
        treeProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created() {
        if(this.backConfig.tysqversion=="1.0"){
            this.dwTreeParams.dwbm="CNPC.PetroChina.TLM";
        }else{
            this.dwTreeParams.dwid="";
        }
        this.getDwtree();
    },
    mounted(){
        
    },
    computed:{
        ...mapGetters(["backConfig"])
    },
    props: {
        tysqShow: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        tysqShow () {
            //此处是关键
            this.dialogTysqVisible = this.tysqShow;
        },
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        getDwtree(){
            var that=this;
            this.axios.apiPost({
              url:'/tysq/queryDwTree',
              data:this.dwTreeParams,
              call:function(res){
                  let tree=jsonTree(res.data,{
                        id: 'id',
                        pid: 'pid',
                        children: 'children'
                    });
                  that.treeData=tree;
              }
            });
        },getRyByDw(){
            var that=this;
            this.axios.apiPost({
              url:'/tysq/queryYhByDw',
              data:this.treeNode,
              call:function(res){
                  that.data=res.data.rows;
              }
            });
        },
        gteRyByXm(){
            var that=this;
            this.axios.apiPost({
              url:'/tysq/queryYhByDw',
              data:this.treeNode,
              call:function(res){
                  that.data=res.data.rows;
              }
            });
        },
        clear(){
            this.treeNode.yhxm="";
            this.treeNode.dlid="";
            this.gteRyByXm();
        },
        canel(){
            this.dialogTysqVisible=false;
            //重置数据无效 this.$refs.avueForm.resetForm();
        },
        distroy(){
            this.$emit('update:tysqShow', false);
            //关闭的时候重置
            this.data1 = [];
            this.data = [];
        }, 
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleNodeClick(data){
            if(this.backConfig.tysqversion=="1.0"){
                this.treeNode.dwbm=data.dwbm;
            }else{
                this.treeNode.dwid=data.dwid;
            }
            this.getRyByDw();
        },
        choseAll(){
            //先置空
            //this.data1=[];
            //this.data1=deepClone(this.data);
            this.data1=mergeArray(deepClone(this.data1),deepClone(this.data),"yhid");
        },
        clearAll(){
            this.data1=[];
        },
        selRy(row, event){
            let rows=this.data1;
            for(var x in rows){
                if(rows[x].yhid == row.yhid){
                    this.$message.error("请勿重复添加！");
                    return;
                }
            }
            this.data1.push(row);
        },
        unSelRy(row, event){
            this.data1.splice(row.index,1);
        },
        doSave(){
            if(this.data1.length==0){
                this.$message.error("请选择人员！");
            }else{
                this.$emit("sendData", this.data1);
                this.distroy();
            }
        },
        tableRowClassName({row, rowIndex}) {
            row.index=rowIndex;
        }
    }
  }
  //显示组件不要用avue 来封装
</script>
<style scoped>
  .el_input_search {
    width: 120px !important;
  }
  .el-header{
      padding:0 5px
  }
</style>
