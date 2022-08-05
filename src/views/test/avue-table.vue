<template>
    <avue-crud :data="data" :option="option2" v-model="obj" @date-change="dateChange">
    <template slot-scope="scope" slot="menu">
        <el-button type="text" size="small" @click.native="tip">自定义按钮</el-button>
    </template>
    </avue-crud>
</template>
<script>
export default {
 data() {
      return {
        obj:{},
        data: [
          {
            name:'张三',
            sex:'男',
            date:'1994-02-23 00:00:00'
          }, {
            name:'李四',
            sex:'女',
            date:'1994-02-23 00:00:00'
          }, {
            name:'王五',
            sex:'女',
            date:'1994-02-23 00:00:00'
          }, {
            name:'赵六',
            sex:'男',
            date:'1994-02-23 00:00:00'
          }
        ],
        option2:{
          title:'表格的标题',
          menuType:'text',
          page:false,
          align:'center',
          dateBtn:true,
          dateDefault:true,
          menuAlign:'center',
          column:[
             {
              label:'姓名',
              prop:'name'
            },
            {
              label:'性别',
              prop:'sex'
            },{
              label: "日期",
              prop: "date",
              type: "date",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
            }
          ]
        }
      }
    },
    methods: {
      dateChange(date){
        this.$message.success(date);
      },
      tip(){
        this.$message.success('自定义按钮');
      }
    }
  }
</script>