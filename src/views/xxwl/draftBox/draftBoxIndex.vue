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
                        @click="getAllCgxList">搜索</el-button>
                    <el-button type="default" icon="el-icon-refresh"  size="mini" 
                        @click="clearSearch">清空</el-button>
                </div>
                <div style="float:right;margin:3px 0px;">
                    <el-button type="danger" icon="el-icon-delete"  size="mini" style="margin-left:5px;"
                        @click="delDraft" :disabled="selectedRows.length==0">删除</el-button>
                </div>
            </div>
        </el-header>
        <el-main>
            <div style="overflow-y:auto;">
                <el-table 
                    ref="cgxListTable"
                    id="cgxListTableId"
                    :data="cgxList"
                    style="width:100%"
                    border
                    size="medium"
                    :height="tableHeight"
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
                    <el-table-column label="保存时间" prop="firsttime" width="160"></el-table-column>
                    <el-table-column label="操作" width="190">
                        <template slot-scope="scope">
                        <span>
                            <el-button size="mini" icon="el-icon-edit" type="success" @click="editDraft(scope.row)">编辑</el-button>
                            <!-- <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteDraft(scope.row)">删除</el-button> -->
                        </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
        <el-footer height="30px">
                <!-- <Pagination :page="page" :render="getAllCgxList" :options="pageOption"></Pagination> -->
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
        <LookEmail v-if="showLookDlg.visible" :lookShow.sync="showLookDlg.visible" :wdid="showLookDlg.wdid" actionSrc="draftBox"></LookEmail>
    </el-container>
</template>
<script>
import {getCgxList,delCgx} from '@/api/xxwl/draftBox';
import LookEmail from '@/components/xxwl/LookEmail';
export default {
    name:'draftBox',
    components:{
        LookEmail,
    },
    computed:{
        tableHeight(){
            return document.documentElement.clientHeight-120;
        }
    },
    watch:{
        cgxList:{
            handler(newName,oldName){
                let _this = this;
                _this.$nextTick(()=>{
                    if(_this.$refs.cgxListTable !=null){
                        _this.$refs.cgxListTable.doLayout();
                    }
                })
            },
            deep:true
        }
    },
    data(){
        return {
            name:'草稿箱',
            cgxList:[],
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
            selectedRows:[],
            showLookDlg:{
                visible: false,
                xxxh:'',
                wdid:''
            }
        }
    },
    methods:{
        handleCurrentChange(current){
            this.pageOption.currentPage = current;
            this.getAllCgxList();
        },
        handleSizeChange(size){
            this.pageOption.pageSize = size;
            this.getAllCgxList();
        },
        tableRowClassName({row, rowIndex}) {
            if((rowIndex+1)%2==0){
                return  'double-row';
            }else{
                return  '';
            }
        },
        showEmailInfo(row){
            this.showLookDlg.wdid = row.wdid;
            this.showLookDlg.visible = true;
        },
        delDraft(){
            let ids = [];
            this.selectedRows.forEach(item=>{
                ids.push(item.wdid);
            });
            this.$confirm('删除后不能恢复该记录，是否执行删除操作？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteDraftHandel(ids);
            }).cancel(()=>{

            });
        },
        deleteDraftHandel(ids){
            delCgx(ids).then(rep=>{
                if(rep.data.code){
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.getAllCgxList();
                }else{
                    this.$message({
                        message: '删除失败！'+rep.data.msg,
                        type: 'error'
                    });
                }
            });
        },
        deleteDraft(row){
            this.$confirm('删除后不能恢复该记录，是否执行删除操作？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = [];
                ids.push(row.wdid);
                this.deleteDraftHandel(ids);
            }).cancel(()=>{

            });
        },
        editDraft(row){
            this.$router.push({
                path:"/wel/index/edit?wdid="+row.wdid+"&actionSrc=draftBox&actionType=edit",
            });
        },
        selectedChange(selection){
            this.selectedRows = selection;
        },
        getAllCgxList(){
            this.page.current = this.pageOption.currentPage;
            this.page.size = this.pageOption.pageSize;
            
            for(let o in this.searchForm){
                this.page[o] = this.searchForm[o];
            }
            getCgxList(this.page).then(rep=>{
                if(rep.data.code){
                    this.cgxList = rep.data.data.result;
                    this.page.total = rep.data.data.totalCount;
                }
            });
            //记忆分页信息
            localStorage.setItem('xxwlCommonPageSzie',this.page.size);
        },
        clearSearch(){
            this.searchForm.wdbt = '';
            this.searchForm.startTime = '';
            this.searchForm.endTime = '';
            this.getAllCgxList();
        },
        getAutoHeight() {
            let el = document.querySelector("#cgxListTableId");
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
        this.getAllCgxList();
        this.getAutoHeight();
        const that = this;
        window.addEventListener('resize',()=>{
            that.getAutoHeight();
        });
    }
}
</script>