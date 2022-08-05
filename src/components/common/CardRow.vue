<template>
  <el-row :gutter="12" class="main-el-row">
      <draggable v-model="compArray" group="people" @start="drag=true" @end="drag=false"  
        :options="{
          animation: 150,
          group: 'description',
          handle:'.card-header',
        }">
          <el-col 
            v-for="(obj, index) in compArray" 
            :span="obj.span"
            :key="obj.id" 
            ref="card">
            <el-card class="box-card" shadow="hover"  :style="obj.style">
                <div slot="header" class="card-header" >
                    <!-- 占位符 -->
                    <span>&nbsp;{{obj.title}}</span>
                    <el-dropdown trigger="click" style="float: right;" @command="handleCommand">
                        <el-button class="iconfont iconicon_setting" style="float: right; padding: 3px 0" type="text"></el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item icon="el-icon-plus"  :command="beforeHandleCommand('selComp',obj.id)">选择组件</el-dropdown-item>
                          <el-dropdown-item icon="el-icon-circle-plus" :command="beforeHandleCommand('changeCard',obj.id)">组件样式</el-dropdown-item>
                          <el-dropdown-item icon="el-icon-circle-check" :command="beforeHandleCommand('delComp',obj.id)">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="card-body" :style="obj.bodystyle">
                  <component :is="obj.compName"  :page="{page:{currentPage:1}}"  />
                </div>
            </el-card>
            <div class="resize-handle resize-horizontal"><i class="icon icon-resize-h"></i></div>
            <div class="resize-handle resize-vertical"><i class="icon icon-resize-v"></i></div>
          </el-col>
        </draggable>
          <template>
            <el-dialog 
                title="选择组件"
                :visible.sync="dialogVisible"
                width="30%"
                center>
                <commonDg :show="dialogVisible" :data="compList" :columnArray="columnArray" :options="options"></commonDg>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="choseComp">确 定</el-button>
                  <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
        </template>
    </el-row>
</template>
<script>
  import {mapGetters} from "vuex";
  import draggable from 'vuedraggable'
  import testTable from '@/views/test/testTable'
  import {deepClone,isEmpty} from "@/util/util";
  export default {
    name: "CardRow",
    components: {
        draggable,
        testTable
    },
    data() {
      return {
        cardStyle:{
          width:"30px",
        },
        dialogVisible:false,
        tempid:-1,
        compArray:[{
            id:1,
            title:"测试窗口",
            compName:'Test3',
            span:12,
            style:'height:400px',
            bodystyle:'height:350px'
          },{
            id:2,
            title:"iframe窗口",
            compName:'Test1',
            span:12
          },{
            id:3,
            title:"测试窗口",
            compName:'Test3',
            span:24
          },{
            id:4,
            title:"测试窗口",
            compName:'Test4',
            span:8
          },{
            id:5,
            title:"分页窗口",
            compName:'PageinationPlugin',
            span:8
          },{
            id:6,
            compName:'PageinationPlugin',
            span:8
          },{
            id:9,
            title:"图表展示组件",
            compName:'Test2',
            span:24,
            style:'height:700px',
            bodystyle:'height:650px'
          }
        ],
        compList:[{
            title:'测试组件1',
            compName:"Test1",
            span:12
          },{
            title:'测试组件2',
            compName:"Test2",
            span:12
          },{
            title:'测试组件3',
            compName:"Test3",
            span:12
          },{
            title:'测试组件4',
            compName:"Test4",
            span:12
          },{
            title:'轮播组件',
            compName:"carousel",
            span:12
          }
        ],
        columnArray:[{
            label: '组件名称',
            prop: 'title',
            span: 24,
            align:'left',
            width:375
          }
        ],
        options:{
          data:{}
        }
      };
    },
    computed: {
     
    },
    created() {
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      changeOption(){
         console.log(this);
      },
      handleCommand(ret){
        switch (ret.command) {
          case "selComp":
            this.tempid=ret.id;
            this.dialogVisible=true;
        　　break;
          case "changeCard":
            var temp= this.compArray.filter(function(item){
                return item.id == ret.id; 
            })
            this.$set(temp[0], 'span',12);
        　　break;
          case "delComp":
            this.$nextTick(() => {
               this.compArray.splice(this.compArray.findIndex( item => item.id == ret.id), 1);
            });
        　　break;
        }
      },
      beforeHandleCommand(item,id){
        return {
          'command': item,
          'id': id
        }
      },
      choseComp(){
        if(!isEmpty(this.options.data)){
          var that=this;
          var temp= this.compArray.filter(function(item){
                return item.id == that.tempid; 
          })
          this.$set(temp[0], 'compName',this.options.data.compName);
          this.$set(temp[0], 'title',this.options.data.title);
          this.dialogVisible = false
        }else{
          this.$message({
            message: '请选择一个组件',
            type: 'warning'
          });
        }
      }
    }
  };
</script>
<style>
.main-el-row .el-col .resize-handle {
    position: absolute;
    top: 0;
    right: 4px;
    bottom: 0px;
    width: 12px;
    cursor: e-resize;
    filter: alpha(opacity=0);
    border-radius: 0;
    opacity: 0;
    -webkit-transition: opacity .5s cubic-bezier(.175,.885,.32,1);
    -o-transition: opacity .5s cubic-bezier(.175,.885,.32,1);
    transition: opacity .5s cubic-bezier(.175,.885,.32,1);
}

.main-el-row .el-col{
  position:relative;
}

.main-el-row .el-col .resize-handle.resize-vertical {
    top: auto;
    right: 10px;
    bottom: 0px;
    left: 0px;
    width: auto;
    height: 12px;
    cursor: n-resize;
}

.main-el-row .el-col .resize-handle > .icon {
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    line-height: 20px;
    color: #1a4f85;
    text-align: center;
    background-color: rgba(26,79,133,.2);
    -webkit-transition: left .5s cubic-bezier(.175,.885,.32,1),top .5s cubic-bezier(.175,.885,.32,1);
    -o-transition: left .5s cubic-bezier(.175,.885,.32,1),top .5s cubic-bezier(.175,.885,.32,1);
    transition: left .5s cubic-bezier(.175,.885,.32,1),top .5s cubic-bezier(.175,.885,.32,1);
}

.main-el-row .card-body{
  height:350px;
  overflow:auto;
}
.main-el-row .card-header{
  height:22px;
  cursor:move;
}
.main-el-row .box-card .el-card__header{
  padding:10px 15px;
}
</style>