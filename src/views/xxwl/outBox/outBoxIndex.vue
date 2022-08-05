<template>
    <!--sjx-->
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
                </div>
            </div>
        </el-header>
        <el-main>
            <div style="overflow-y:auto;">
                <el-table 
                    ref="fjxListTable"
                    id="fjxListTableId"
                    :data="fjxList"
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
                    <el-table-column label="发送时间" prop="firsttime" width="160"></el-table-column>
                    <el-table-column label="操作" width="245">
                        <template slot-scope="scope">
                        <span>
                            <!-- <el-button size="mini" type="success" @click="forwardEmail(scope.row)">转发</el-button> -->
                            <el-button size="mini" type="primary" icon="el-icon-top-right" @click="forwardMessage(scope.row)">转发</el-button>
                            <el-button size="mini" icon="el-icon-view" type="success" @click="showSendRecord(scope.row)">查看发送记录</el-button>
                            <!-- <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteEmail(scope.row)">删除</el-button> -->
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
        <!-- <el-footer height="200px" >
            
        </el-footer> -->
        <el-dialog
            title="发送记录"
            :visible.sync="sendRecordDlg.visible"
            width="55%"
            :close-on-click-modal="false"
            @close="sendRecordDlgClose">
            <div>
                <el-button size="mini" type="warning" @click="withdrawAllMessage()" 
                    :disabled="sjrList.length==0"
                    style="margin-bottom:5px;">全部收回</el-button>
                <el-table border
                    :data="sjrList"
                    height="400"
                    size="mini"
                    :highlight-current-row="true"
                    style="width:100%">
                    <el-table-column label="状态" prop="dqzt" width="60">
                    
                    </el-table-column>
                    <el-table-column label="收件人" :show-overflow-tooltip="true" prop="jyhxm" width="140"></el-table-column>
                    <el-table-column label="收件人单位" prop="jyhdwmc" :show-overflow-tooltip="true" width="300"></el-table-column>
                    <el-table-column label="发送时间" prop="firsttime" width="140"></el-table-column>
                    <el-table-column label="查看时间" prop="xxclrq" width="140"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- <el-button size="mini" type="warning" @click="forwardMessage(scope.row)" v-if="scope.row.dqzt=='待查看'">收回</el-button> -->
                            <el-button size="mini" type="warning" @click="withdrawMessage(scope.row)" v-if="scope.row.dqzt!='已收回'">收回</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination :page="sjrPage" :render="getSjrList" :options="pageOptionSjr"></Pagination>
            </div>
        </el-dialog>
        <LookEmail v-if="showLookDlg.visible" :lookShow.sync="showLookDlg.visible" :wdid="showLookDlg.wdid" actionSrc="outBox"></LookEmail>
    </el-container>
</template>
<script>
import {getFjxList,getSjrList,delFjxItem,deleteMsg} from "@/api/xxwl/outBox";
import website from "@/config/website";
import LookEmail from '@/components/xxwl/LookEmail';
export default {
    name:'outBox',
    components:{
        LookEmail,
    },
    computed:{
        tableHeight(){
            return document.documentElement.clientHeight-120;
        }
    },
    watch:{
        fjxList:{
            handler(newName,oldName){
                let _this = this;
                _this.$nextTick(()=>{
                    if(_this.$refs.fjxListTable !=null){
                        _this.$refs.fjxListTable.doLayout();
                    }
                })
            },
            deep:true
        }
    },
    data(){
        return {
            name:"发件箱",
            dialogVisible:false,
            fjxList:[],
            sjrList:[],
            sjrPage:JSON.parse(JSON.stringify(website.page)),
            page:{
                total:0
            },
            pageOption: {
                currentPage: 1,
                pageSize: 15,
                pageSizes:[15, 20, 30, 50],
            },
            pageOptionSjr:{
                pageNumber: 1,
                currentPage: 1,
                pageSize: 10
            },
            searchForm:{
                wdbt:'',
                startTime:'',
                endTime:''
            },
            selectedRows:[],
            selectedRow:{},
            drawer:false,
            sendRecordDlg:{
                visible:false
            },
            lookDlg:{
                visible:false
            },
            showLookDlg:{
                visible: false,
                wdid:''
            },
            tableHeightx:'200px'
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
        tableRowClassName({row, rowIndex}) {
            if((rowIndex+1)%2==0){
                return  'double-row';
            }else{
                return  '';
            }
        },
        forwardMessage(row){
            this.$router.push({
                path:"/wel/index/edit?wdid="+row.wdid+"&actionSrc=outBox&actionType=forward",
            });
        },
        showSendRecord(row){
            this.selectedRow = row;
            this.getSjrList();
            this.sendRecordDlg.visible = true;
        },
        sendRecordDlgClose(){
            this.sjrList = [];
        },
        rowClick(row){
            this.selectedRow = row;
            this.getSjrList();
            this.sendRecordDlg.visible = true;
        },
        getSjrList(){
            if (this.pageOptionSjr.pageNumber) {
                this.sjrPage.current = this.pageOptionSjr.pageNumber;
            }
            if (this.pageOptionSjr.pageSize) {
                this.sjrPage.size = this.pageOptionSjr.pageSize;
            }
            this.sjrPage.djid = this.selectedRow.wdid;

            getSjrList(this.sjrPage).then(rep=>{
                if(rep.data.result){
                    this.sjrList = rep.data.result;
                    this.sjrPage.total = rep.data.totalCount;
                }
            });
        },
        handleClose(){

        },
        delEmail(){
            let ids = [];
            this.selectedRows.forEach(item=>{
                ids.push(item.wdid);
            });
            this.$confirm('删除后不能恢复该记录，是否执行删除操作？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteOutBoxHandel(ids);
            }).cancel(()=>{

            });
        },
        selectedChange(selection){
            this.selectedRows = selection;
        },
        showEmailInfo(row){
            this.showLookDlg.wdid=row.wdid;
            this.showLookDlg.visible = true;
        },
        deleteEmail(row){
            
            this.$confirm('删除后不能恢复该记录，是否执行删除操作？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = [row.wdid];
                this.deleteOutBoxHandel(ids);
            }).cancel(()=>{

            });
        },
        deleteOutBoxHandel(ids){
            const loading = this.$loading({
                lock: true,
                text: '正在删除邮件...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            delFjxItem(ids).then(rep=>{
                loading.close();
                if(rep.data.code){
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.getAllEmail();
                }else{
                    this.$message({
                        message: '删除失败！'+rep.data.msg,
                        type: 'error'
                    });
                }
            });
        },

        withdrawAllMessage(){
            this.$confirm('执行该操作会收回所有接收人的待查看消息，你确定要收回吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                let djid = this.sjrList[0].djid;
                deleteMsg([1],{djid:djid}).then(rep=>{
                    if(rep.data.code){
                        this.getSjrList();
                        //有已读的消息
                        if(rep.data.data.reads){
                            this.$confirm('部分接收人已经查看过该信息，是否仍收回所有信息？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                deleteMsg([1],{djid:djid,deleteModel:'all'}).then(rep2=>{
                                    if(rep2.data.code){
                                        this.$message({
                                            message: '收回成功！',
                                            type: 'success'
                                        });
                                        this.getSjrList();
                                    }else{
                                        this.$message({
                                            message: '收回失败！'+rep2.data.msg,
                                            type: 'error'
                                        });
                                    }
                                });
                            }).cancel(()=>{

                            });
                        }else{
                            this.$message({
                                message: '全部收回成功！',
                                type: 'success'
                            });
                        }
                    }else{
                        this.$message({
                            message: '全部收回失败！'+rep.data.msg,
                            type: 'error'
                        });
                    }
                })
            }).cancel(()=>{

            });
        },
        deleteHandel(ids,param){
            deleteMsg(ids,param).then(rep=>{
                if(rep.data.code){
                    this.$message({
                        message: '收回成功！',
                        type: 'success'
                    });
                    this.getSjrList();
                }else{
                    this.$message({
                        message: '收回失败！'+rep.data.msg,
                        type: 'error'
                    });
                }
            });
        },
        withdrawMessage(row){
            let ids = []
            let param = {};
            this.$confirm('确定要收回消息吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                if(row.dqzt != '待查看'){
                    this.$confirm('接收人已经查看过该信息，确定要收回消息吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        ids.push(row.xxxh);
                        param = {deleteModel:'all'};
                        this.deleteHandel(ids,param);
                    }).cancel(()=>{

                    });
                }else{
                    ids.push(row.xxxh);
                    this.deleteHandel(ids,param);
                }
            });
        },
        getAllEmail(){
            this.sjrList = [];
            this.page.current = this.pageOption.currentPage;
            this.page.size = this.pageOption.pageSize;
            
            for(let o in this.searchForm){
                this.page[o] = this.searchForm[o];
            }
            getFjxList(this.page).then(rep=>{
                if(rep.data.result){
                    this.fjxList = rep.data.result;
                    this.page.total = rep.data.totalCount;
                }

            });
            //记忆分页信息
            localStorage.setItem('xxwlCommonPageSzie',this.page.size);
        },
        clearSearch(){
            this.searchForm.wdbt = '';
            this.searchForm.startTime = '';
            this.searchForm.endTime = '';
            this.getAllEmail();
        },
        getAutoHeight() {
            let el = document.querySelector("#fjxListTableId");
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
        this.$parent.$parent.$parent.changeMenu(5);
        this.getAutoHeight();
        const that = this;
        window.addEventListener('resize',()=>{
            that.getAutoHeight();
        });
    }
}
</script>


<style scoped>
::v-deep .el-main{
    overflow: hidden;
    position: relative;
}
</style>