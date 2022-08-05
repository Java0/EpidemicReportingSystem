<template>
 <el-container>
   <el-main>
    <avue-crud
    v-if="showDg"
    ref="singleTable"
    :data="tempData"
    :option="option"
    v-model="obj"
    @current-row-change="handleCurrentRowChange"
    >
    </avue-crud>
    <template>
    </template>
   </el-main>
    <!-- <el-footer>
      <PageinationPlugin 
      :page="page"
      :render="getList" 
      :options="pageOption"></PageinationPlugin>
    </el-footer> -->
  </el-container>
</template>
<script>
 export default { 
    components: {
        
    },
    data() {
      return {
        obj:{},
        tempData:this.data,
        timer:false,
        showDg: this.show,
        option: {
          addBtn:false,
          menu:false,
          align: 'center',
          height:'100%',
          menuAlign: 'center',
          highlightCurrentRow:true,
          menuPosition: "center",
          column: this.columnArray
        }
      }
    },
    created() {
      
    },
    mounted() {
     
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        data:{
            type: Array,
            default: ()=>{}
        },
        columnArray:{
          type: Array,
          default:() => []
        },
        options: {// 分页发生变化赋值给options
            type:[Object],
            default:() =>{}
        }
    },
    watch:{
        
    },
    computed: {
        
    },
    methods: {
        handleCurrentRowChange(val,oldval){
            this.options.data=val;
        }
    }
  }
</script>