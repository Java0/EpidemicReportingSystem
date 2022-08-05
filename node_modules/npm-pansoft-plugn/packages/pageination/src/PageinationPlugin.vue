<template>
<div style="text-align:right">
  <el-pagination
    background
    v-if="page"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="nowCurrentPage"
    :page-sizes="page.pageSizes"
    :page-size="page.pageSize"
    :layout="layout"
    :total="page.total">
  </el-pagination>
</div>
</template>
<script>
  export default {
    name: 'Pagination',
    data(){
      return{
        nowCurrentPage: this.page.currentPage
      }
    },
    props: {
      page:{
        pageSizes:{
          type: [Number,Array],
          default:() => [10,20,30,40]
        },
        pageSize: {
          type: [Number, String],
          default:10
        },
        currentPage: {
          type:[Number, String],
          default:1
        },
        total: {
          type:[Number, String],
          default:0
        }
      },
      options: {// 分页发生变化赋值给options
          type:[Object],
          default:() =>{}
      },  
      render: [Function], // 跳转触发的请求
      layout: {
        type: String,
        default: 'total,sizes,prev,pager,next,jumper'
      }
    },
    watch: {
        'page.currentPage': {//监听对象方法
          handler (newVal) {
            this.nowCurrentPage = newVal;
          },
          deep: true,
          immediate: true
        }
    },
    methods: {
      handleSizeChange(val) {
        if(this.options){
          this.options.pageNumber = 1;
          this.options.currentPage = 1;
          this.options.pageSize = val;
          this.$emit('update:options', this.options);
        }
        this.render();
      },
      handleCurrentChange(val) {
        if(this.options){
          this.options.pageNumber = val;
          this.options.currentPage = val;
          this.$emit('update:options', this.options);
        }
        this.render();
      }
    }
  };
</script>