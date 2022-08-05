<template>
  <el-container>
      <el-header height="35px">
          <div>
            <div style="margin:3px 0px;float:left">
                <el-input
                  style="width:180px;margin-right:5px;"
                  v-model="searchForm.wdbt"
                  size="mini"
                  placeholder="主题"
                  maxlength="30"
                />
                <el-input
                  style="width:180px;margin-right:5px;"
                  v-model="searchForm.fjr"
                  size="mini"
                  placeholder="发件人"
                  maxlength="5"
                />
                <el-date-picker
                  v-model="searchForm.startTime"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  placeholder="起始时间"
                  :editable="false"
                  :picker-options="{firstDayOfWeek:1}">
                </el-date-picker>
                <el-date-picker
                  v-model="searchForm.endTime"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  placeholder="截至时间"
                  :editable="false"
                  :picker-options="{firstDayOfWeek:1}"
                  style="margin-left:5px;">
                </el-date-picker>
                <el-button type="default" icon="el-icon-search"  size="mini" style="margin-left:5px;"
                  @click="getAllEmail">搜索</el-button>
                <el-button type="default" icon="el-icon-refresh"  size="mini" 
                    @click="clearSearch">清空</el-button>
            </div>
            <div style="float:right;margin:3px 0px;">
              <el-button type="warning" icon="el-icon-delete"  size="mini" style="margin-left:5px;"
                  @click="delEmail" :disabled="selectedRows.length==0">删除</el-button>
                <el-button type="danger" icon="el-icon-delete"  size="mini" 
                    @click="completeDelEmail" :disabled="selectedRows.length==0">彻底删除</el-button>
            </div>
        </div>
      </el-header>
      <el-main ref="inBoxMain">
        <div style="overflow-y:auto;">
          <el-table 
            ref="sjxListTable"
            id="sjxListTableId"
            :data="sjxList"
            style="width:100%;"
            border
            :row-class-name="tableRowClassName"
            :height="tableHeightx"
            @selection-change="selectedChange"
            :highlight-current-row="true"
            >
              <el-table-column 
                  type="selection"
                  width="55">
              </el-table-column>
              <el-table-column label="主题" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span v-if="scope.row.dqzt == '待查看'">
                      <img style="margin-right:2px;" src="img/newmail.gif" >
                      <strong><a href="#" style="color:#409EFF;" slot="reference" @click="showEmailInfo(scope.row)">{{scope.row.wdbt}}</a></strong>
                    </span>
                    <span v-else>
                      <img style="margin-right:2px;" src="img/hasread.gif" >
                      <a href="#" style="color:#409EFF;" slot="reference" @click="showEmailInfo(scope.row)">{{scope.row.wdbt}}</a>
                    </span>
                    
                </template>
              </el-table-column>
              <el-table-column label="发件人" prop="yhxm" width="160" :show-overflow-tooltip="true">

              </el-table-column>
              <el-table-column label="发件单位" prop="yhdwmc" width="200" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="状态" prop="dqzt" width="70"></el-table-column>
              <el-table-column label="发送时间" prop="firsttime" width="155"></el-table-column>
              <el-table-column label="操作" width="190">
                <template slot-scope="scope">
                  <span>
                    <el-button size="mini" type="success" icon="el-icon-document" @click="replyMessage(scope.row)">回复</el-button>
                    <el-button size="mini" type="primary" icon="el-icon-top-right" @click="forwardMessage(scope.row)">转发</el-button>
                    <!-- <el-button size="mini" type="warning" icon="el-icon-delete" @click="deleteMessage(scope.row)">删除</el-button>
                    <el-button size="mini" type="danger" icon="el-icon-circle-close" @click="deletePermanentlyMessage(scope.row)">永久删除</el-button> -->
                  </span>
                </template>
              </el-table-column>
            </el-table>
        </div>
      </el-main>
      <el-footer height="30px">
          <!-- <Pagination :page="page" :render="getAllEmail" :options="pageOption"></Pagination> -->
          <div style="float:right;">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageOption.currentPage"
              :page-sizes="pageOption.pageSizes"
              :page-size="pageOption.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
              >
            </el-pagination>
          </div>
      </el-footer>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <LookEmail v-if="showLookDlg.visible" :lookShow.sync="showLookDlg.visible" 
      :xxxh="showLookDlg.xxxh" :wdid="showLookDlg.wdid" actionSrc="inBox" :onClose="lookEmailDlgClose"></LookEmail>
  </el-container>
</template>

<script>
import {getSjxList,deleteSjxItem,completeDeleteSjxItem} from "@/api/xxwl/inBox";
import LookEmail from '@/components/xxwl/LookEmail';
export default {
  name:'inBox',
  components:{
    LookEmail
  },
 
  computed:{
    tableHeight(){
      return document.documentElement.clientHeight-120;
    }
  },
  watch:{
    sjxList:{
      //解决右侧滚动条出现时导致的表头错位https://www.cnblogs.com/flower-dance/p/13897025.html
      handler(newName,oldName){
        let _this = this;
        _this.$nextTick(()=>{
          if(_this.$refs.sjxListTable !=null){
            _this.$refs.sjxListTable.doLayout();
          }
        })
      },
      deep:true
    }
  },
  data() {
      return {
        sjxList:[],
        page:{
          total:0
        },
        pageOption: {
            currentPage: 1,
            pageSize: 15,
            pageSizes:[15, 20, 30, 50],

        },
        searchForm:{
          wdbt:'',
          startTime:'',
          endTime:''
        },
        dialogVisible:false,
        selectedRows:[],
        showLookDlg:{
            visible: false,
            xxxh:'',
            wdid:''
        },
        tableHeightx: '200px',
      }
  },
  methods:{
    handleCurrentChange(current){
      this.pageOption.currentPage = current;
      this.getAllEmail();
    },
    handleSizeChange(size){
      this.pageOption.pageSize = size;
      this.getAllEmail();
    },
    lookEmailDlgClose(){
      this.getAllEmail();
    },
    tableRowClassName({row, rowIndex}) {
      // if(row.dqzt == '待查看'){
      //   return  'unread-row';
      // }else{
      //   return '';
      // }
      if((rowIndex+1)%2==0){
        return  'double-row';
      }else{
        return  '';
      }
    },
    deletePermanentlyMessage(row){
      this.$confirm('彻底删除后无法恢复，确定要彻底删除该邮件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.completeDeleteSjxItemHandel([row.xxxh]);
      }).cancel(()=>{

      });
    },
    completeDeleteSjxItemHandel(ids){
      completeDeleteSjxItem(ids).then(rep=>{
          if(rep.data.code == 1){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAllEmail();
          }else{
            this.$message({
              type: 'error',
              message: '删除失败!'+rep.data.msg
            }); 
          }
        });
    },
    deleteMessage(row){
      this.$confirm('确定要删除该邮件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.delEmailHandel([row.xxxh]);
      }).cancel(()=>{

      });
    },
    delEmailHandel(ids){
      deleteSjxItem(ids).then(rep=>{
          if(rep.data.code == 1){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAllEmail();
          }else{
            this.$message({
              type: 'error',
              message: '删除失败!'+rep.data.msg
            });  
          }
        });
    },
    forwardMessage(row){
      this.$router.push({
          path:"/wel/index/edit?xxxh="+row.xxxh+"&wdid="+row.wdid+"&actionSrc=inBox&actionType=forward",
      });
    },
    replyMessage(row){
      this.$router.push({
          path:"/wel/index/edit?xxxh="+row.xxxh+"&wdid="+row.wdid+"&actionSrc=inBox&actionType=reply",
      });
    },
    clearSearch(){
      this.searchForm.wdbt = '';
      this.searchForm.startTime = '';
      this.searchForm.endTime = '';
      this.getAllEmail();
    },
    delEmail(){
      //删除邮件
      this.$confirm('确定要删除已选中的邮件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          
          let ids = [];
          this.selectedRows.forEach(val=>{
            ids.push(val.xxxh);
          });
          this.delEmailHandel(ids);
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    },
    completeDelEmail(){
      //彻底删除邮件
      this.$confirm('彻底删除后无法恢复，确定要彻底删除该邮件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          let ids = [];
          this.selectedRows.forEach(val=>{
            ids.push(val.xxxh);
          });
          this.completeDeleteSjxItemHandel(ids);
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    },
    selectRow(selection, row){
    },
    selectAll(selection){
    },
    selectedChange(selection){
      this.selectedRows = selection;
    },
    showEmailInfo(row){
      this.showLookDlg.xxxh = row.xxxh;
      this.showLookDlg.wdid = row.djid;
      this.showLookDlg.visible = true;
      
    },
    handleClose(){

    },
    getAllEmail(){
      this.page.current = this.pageOption.currentPage;
      this.page.size = this.pageOption.pageSize;
      
      
      for(let o in this.searchForm){
          this.page[o] = this.searchForm[o];
      }
      getSjxList(this.page).then(rep=>{
        if(rep.data.result){
          this.sjxList = rep.data.result;
          this.page.total = rep.data.totalCount;
        }
      }).catch(err=>{
      });
      //记忆分页信息
      localStorage.setItem('xxwlCommonPageSzie',this.page.size);
    },
    getAutoHeight() {
      let el = document.querySelector("#sjxListTableId");
       if(el){
            let  elParent = el.parentNode.parentNode;
                //let pt = this.getStyle(elParent, "paddingTop"),
                //let pb = this.getStyle(elParent, "paddingBottom");
            // 一定要使用 nextTick 来改变height 不然不会起作用
            this.$nextTick(() => {
                this.tableHeightx = elParent.clientHeight - (10) + "px";
            });
        }
      
    },
    // 获取样式 我们需要减掉 padding-top， padding-bottom的值
    getStyle(obj, attr) {
      // 兼容IE浏览器
      let result = obj.currentStyle
        ? obj.currentStyle[attr].replace("px", "")
        : document.defaultView
            .getComputedStyle(obj, null)[attr].replace("px", "");
      return Number(result);
    }
  },
  mounted(){
    if(localStorage.getItem('xxwlCommonPageSzie')){
        this.pageOption.pageSize = Number(localStorage.getItem('xxwlCommonPageSzie'));
    }
    this.getAllEmail();
    this.$parent.$parent.$parent.changeMenu(3);
    //console.log(this.$refs.inBoxMain.$el.offsetHeight);
    //从URL中获取参数，如果有待办信息直接打开
    let urlQuery = this.$route.query;
    //console.log('urlQuery',urlQuery);
    
    if(urlQuery.xxxh){
      setTimeout(()=>{
        for(let x=0;x<this.sjxList.length;x++){
          if(this.sjxList[x].xxxh == urlQuery.xxxh){
            this.showEmailInfo(this.sjxList[x]);
            break;
          }
        }
      },2000);
      
    }
    this.getAutoHeight();
    const that = this;
    window.addEventListener('resize',()=>{
      that.getAutoHeight();
    });
  },
  created(){
    //let that = this
    //let heightStyle = that.$refs.sjxListTable.offsetHeight
    //that.tableHeightx = heightStyle
  }
}
</script>

<style  scoped>
  
  .czBtns{
    margin-left: 5px;
  }
</style>
<style>
.el-table .unread-row {
    background: #e2faf9;
  }
.el-table .double-row{
   background: #f9f9f9;
}
.el-table td{
  padding: 2px 0px;
}
.el-table tr:hover td{
  background: #eef6f7 !important;
}
.el-main {
  overflow: hidden !important;
}
</style>