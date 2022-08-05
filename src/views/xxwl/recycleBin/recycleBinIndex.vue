<template>
    <el-container>
        <el-header height="35px">
            <div>
                <div style="float:right;margin:3px 0px;">
                    <el-button type="primary" icon="el-icon-refresh-left"  size="mini" style="margin-left:5px;"
                        @click="reductionEmail" :disabled="selectedRows.length==0">还原</el-button>
                    <el-button type="warning" icon="el-icon-delete"  size="mini" style="margin-left:5px;"
                    @click="deletePermanentlyEmail" :disabled="selectedRows.length==0">永久删除</el-button>
                    <el-button type="danger" icon="el-icon-s-open"  size="mini" style="margin-left:5px;"
                    @click="emptyRecycleBin" :disabled="recycleBinList.length==0">清空</el-button>
                </div>
            </div>
        </el-header>
        <el-main>
            <div style="overflow-y:auto;">
                <el-table 
                    ref="recycleBinListTable"
                    id="recycleBinListTableId"
                    :data="recycleBinList"
                    style="width:100%"
                    border
                    size="medium"
                    :height="tableHeightx"
                    :row-class-name="tableRowClassName"
                    @selection-change="selectedChange"
                    >
                    <el-table-column 
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column label="主题" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                        <a href="#" style="color:#409EFF;" @click="showEmailInfo(scope.row)">{{scope.row.wdbt}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="删除时间" prop="lasttime" width="160"></el-table-column>
                    <el-table-column label="发件人" prop="yhxm" width="160" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="发件单位" prop="yhdwmc" width="200" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作" width="220">
                        <template slot-scope="scope">
                        <span>
                            <!-- <el-button size="mini" type="success" @click="forwardEmail(scope.row)">转发</el-button> -->
                            <el-button size="mini" icon="el-icon-refresh-left" type="primary" @click="reductionEmail(scope.row)">还原</el-button>
                            <el-button size="mini" icon="el-icon-delete" type="danger" @click="deletePermanentlyEmail(scope.row)">永久删除</el-button>
                        </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
        <el-footer height="30px">
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
        <LookEmail v-if="showLookDlg.visible" :lookShow.sync="showLookDlg.visible" :wdid="showLookDlg.wdid" actionSrc="recycleBin"></LookEmail>
    </el-container>
</template>
<script>
import {getRecycleBinList,reductionRecycleBinItem,deletePermanentlyRecycleBinItem,emptyRecycleBin} from "@/api/xxwl/recycleBin";
import LookEmail from '@/components/xxwl/LookEmail';
/**
 * 只有收件箱的删除后进回收站
 */
export default {
    name:'recycleBin',
    components:{
        LookEmail
    },
    computed:{
        tableHeight(){
            return document.documentElement.clientHeight-120;
        }
    },
    watch:{
        recycleBinList:{
            handler(newName,oldName){
                let _this = this;
                _this.$nextTick(()=>{
                    if(_this.$refs.recycleBinListTable !=null){
                        _this.$refs.recycleBinListTable.doLayout();
                    }
                })
            },
            deep:true
        }
    },
    data(){
        return {
            page:{
                total:0
            },
            pageOption: {
                currentPage: 1,
                pageSize: 15,
                pageSizes:[15, 20, 30, 50],
            },
            selectedRows:[],
            recycleBinList:[],
            searchForm:{

            },
            showLookDlg:{
                visible:false,
                wdid:''
            },
            tableHeightx:'200px'
        }
    },
    methods:{
        handleCurrentChange(current){
            this.pageOption.currentPage = current;
            this.getAllRecycleBin();
        },
        handleSizeChange(size){
            this.pageOption.pageSize = size;
            this.getAllRecycleBin();
        },
        tableRowClassName({row, rowIndex}) {
            if((rowIndex+1)%2==0){
                return  'double-row';
            }else{
                return  '';
            }
        },
        showEmailInfo(row){
            this.showLookDlg.wdid = row.djid;
            this.showLookDlg.visible = true;
        },
        emptyRecycleBin(){
            this.$confirm('确定要清空回收站吗？清空后无法恢复！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                emptyRecycleBin().then(rep=>{
                    if(rep.data.code){
                        this.$message({
                            message: '已成功清空回收站!',
                            type: 'success'
                        });
                        this.getAllRecycleBin();
                    }else{
                        this.$message({
                            message: '清空回收站失败!',
                            type: 'error'
                        });
                    }
                });
            }).cancel(()=>{

            });
        },
        reductionEmail(row){
            this.$confirm('确定要还原邮件吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(row.xxxh){
                    this.reductionEmailHandel([row.xxxh]);
                }else{
                    let ids = [];
                    this.selectedRows.forEach(item=>{
                        ids.push(item.xxxh);
                    });
                    this.reductionEmailHandel(ids);
                }
            }).cancel(()=>{

            });
        },
        reductionEmailHandel(ids){
            reductionRecycleBinItem(ids).then(rep=>{
                if(rep.data.code){
                    this.$message({
                        message: '已成功还原至收件箱!',
                        type: 'success'
                    });
                    this.getAllRecycleBin();
                }else{
                    this.$message({
                        message: '还原失败!'+rep.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        deletePermanentlyEmail(row){
            this.$confirm('删除后不能恢复该记录，是否执行删除操作？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(row.xxxh){
                    this.deletePermanentlyEmailHandel([row.xxxh]);
                }else{
                    let ids = [];
                    this.selectedRows.forEach(item=>{
                        ids.push(item.xxxh);
                    });
                    this.deletePermanentlyEmailHandel(ids);
                }
            }).cancel(()=>{

            });
        },
        deletePermanentlyEmailHandel(ids){
            deletePermanentlyRecycleBinItem(ids).then(rep=>{
                if(rep.data.code){
                    this.$message({
                        message: '已彻底删除邮件!',
                        type: 'success'
                    });
                    this.getAllRecycleBin();
                }else{
                    this.$message({
                        message: '删除失败!'+rep.data.msg,
                        type: 'error'
                    });
                }
            });
        },
        selectedChange(selection){
            this.selectedRows = selection;
        },
        getAllRecycleBin(){
            this.page.current = this.pageOption.currentPage;
            this.page.size = this.pageOption.pageSize;
            
            for(let o in this.searchForm){
                this.page[o] = this.searchForm[o];
            }
            getRecycleBinList(this.page).then(rep=>{
                if(rep.data.result){
                    this.recycleBinList = rep.data.result;
                    this.page.total = rep.data.totalCount;
                }
            });
            //记忆分页信息
            localStorage.setItem('xxwlCommonPageSzie',this.page.size);
        },
        getAutoHeight() {
            let el = document.querySelector("#recycleBinListTableId");
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
        this.getAllRecycleBin();
        this.getAutoHeight();
        const that = this;
        window.addEventListener('resize',()=>{
            that.getAutoHeight();
        });
    }
}
</script>