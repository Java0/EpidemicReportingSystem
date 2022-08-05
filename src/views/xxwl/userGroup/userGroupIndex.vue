<template>
    <el-container>
        <el-header height="35px">
            <div>
                <div style="margin:3px 0px;float:left;">
                    <el-select size="mini" v-model="selectedGroup" placeholder="请选择分组" >
                        <el-option
                        v-for="item in groups"
                        :key="item.dyzid"
                        :label="item.zmc"
                        :value="item.dyzid">
                        </el-option>
                    </el-select>
                    <el-input
                        style="width:180px;margin-left:5px;"
                        v-model="searchForm.zyhxm"
                        size="mini"
                        placeholder="联系人姓名"
                        maxlength="5"
                        />
                    <el-button type="default" icon="el-icon-search"  size="mini" style="margin-left:5px;"
                        @click="getAllGroupUsers">搜索</el-button>
                    <el-button type="default" icon="el-icon-refresh"  size="mini" 
                        @click="clearSearch">清空</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="success" icon="el-icon-plus"  size="mini" style="margin-left:5px;"
                        @click="createGroup">新建组</el-button>
                    <el-button type="primary" icon="el-icon-edit"  size="mini" style="margin-left:5px;"
                        @click="renameGroup" :disabled="systemGroup">修改组名</el-button>
                    <el-button type="danger" icon="el-icon-delete"  size="mini" style="margin-left:5px;"
                        @click="deleteGroupHandel" :disabled="systemGroup">删除分组</el-button>
                    <el-button icon="el-icon-user"  size="mini" style="margin-left:5px;"
                        @click="addUser" :disabled="disabledAddUserBtn">添加联系人</el-button>
                </div>
                <div style="float:right;margin:3px 0px">
                    <el-button type="warning" icon="el-icon-delete"  size="mini" style="margin-left:5px;"
                        @click="removeUser" :disabled="selectedRows.length==0">批量删除用户</el-button>
                </div>
            </div>
        </el-header>
        <el-main>
            <div style="overflow-y:auto;">
                <el-table 
                    ref="userGroupListTable"
                    id="userGroupListTableId"
                    :data="groupUsers"
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
                    <el-table-column label="联系人姓名" prop="zyhxm" width="180" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="联系人单位" prop="zdwmc" width="260" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作" >
                        <template slot-scope="scope">
                        <span>
                            <el-button size="mini" icon="el-icon-delete" type="danger" @click="removeUser(scope.row)">删除</el-button>
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
        <el-dialog
            :title="editGroupDlg.title"
            :visible.sync="editGroupDlg.visible"
            width="30%"
            :close-on-click-modal="false"
            @close="renameGroupDlgClose"
            >
            <span>
                <el-input v-model="editGroupDlg.group.zmc" placeholder="请输入分组名称" 
                    @input="renameGroupDlgInput"
                    maxlength="80" show-word-limit></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editGroupDlg.visible = false">取 消</el-button>
                <el-button type="primary" @click="renameGroupHandel" :disabled="!editGroupDlg.change">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="选择联系人"
            :visible.sync="showSelectUserDlg"
            width="70%"
            :destroy-on-close="true"
            v-if="showSelectUserDlg"
            :close-on-click-modal="false"
            >
            <div style="height:610px">

                <SelectUser :onOk="selectUserOk" :onCancel="selectUserCancel" :selectedUsers="selectedUsers" v-if="showSelectUserDlg"></SelectUser>
            </div>
        </el-dialog>
    </el-container>
</template>
<script>
import SelectUser from '@/components/xxwl/SelectUser';
import {getGroupList,getGoupUserList,renameOrCreateGroup,deleteGroupUser,deleteGroup,addUserToGroup} from "@/api/xxwl/userGroup";
export default {
    name:'userGroup',
    components:{
        SelectUser
    },
    computed:{
        systemGroup(){
            if(this.selectedGroup == 'zjlxr' || this.selectedGroup == 'cylxr'){
                return true;
            }else{
                return false;
            }
        },
        disabledAddUserBtn(){
            if(this.selectedGroup == 'zjlxr'){
                return true;
            }else{
                return false;
            }
        },
        tableHeight(){
            return document.documentElement.clientHeight-120;
        }
    },
    watch:{
        selectedGroup(val){
            this.getAllGroupUsers();
        },
        groupUsers:{
            handler(newName,oldName){
                let _this = this;
                _this.$nextTick(()=>{
                    if(_this.$refs.userGroupListTable !=null){
                        _this.$refs.userGroupListTable.doLayout();
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
            searchForm:{
                zyhxm:''
            },
            groupUsers:[],
            groups:[],
            selectedGroup:'',
            editGroupDlg:{
                visible:false,
                oldName:'',
                group:{},
                change:false,
                title:''
            },
            showSelectUserDlg:false,
            selectedUsers:[],
            tableHeightx:'200px'
        }
    },
    methods:{
        handleCurrentChange(current){
            this.pageOption.currentPage = current;
            this.getAllGroupUsers();
        },
        handleSizeChange(size){
            this.pageOption.pageSize = size;
            this.getAllGroupUsers();
        },
        tableRowClassName({row, rowIndex}) {
            if((rowIndex+1)%2==0){
                return  'double-row';
            }else{
                return  '';
            }
        },
        selectUserOk(data){
            addUserToGroup({dyzid:this.selectedGroup},data).then(rep=>{
                if(rep.data.code){
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.selectedUsers.splice(0);
                    this.getAllGroupUsers();
                    this.showSelectUserDlg = false;
                }else{
                    this.$message({
                        message: '添加失败！'+rep.data.msg,
                        type: 'error'
                    });
                }
            });
        },
        selectUserCancel(){
            this.showSelectUserDlg = false;
        },
        addUser(){
            this.showSelectUserDlg = true;
        },
        renameGroupDlgClose(){
            this.editGroupDlg.oldName = '';
            this.editGroupDlg.group = {},
            this.title = '';
        },
        renameGroupDlgInput(value){
            if(value && this.editGroupDlg.oldName != value){
                this.editGroupDlg.change = true;
            }else{
                this.editGroupDlg.change = false;
            }
        },
        createGroup(){
            this.editGroupDlg.title = '新建分组';
            this.editGroupDlg.visible = true;
        },
        renameGroupHandel(){
            renameOrCreateGroup(this.editGroupDlg.group).then(rep=>{
                let type = this.editGroupDlg.group.dyzid?'修改':'创建';
                if(rep.data.code){
                    this.$message({
                        message: '分组'+type+'成功！',
                        type: 'success'
                    });
                    this.getAllGroup();
                    this.editGroupDlg.visible = false;
                }else{
                    this.$message({
                        message: '分组'+type+'失败！'+rep.data.msg,
                        type: 'error'
                    });
                }
            });
        },
        renameGroup(){
            for(let g of this.groups){
                if(g.dyzid == this.selectedGroup){
                    this.editGroupDlg.group = JSON.parse(JSON.stringify(g));
                    this.editGroupDlg.oldName = g.zmc;
                }
            }
            this.editGroupDlg.title = '修改组名';
            this.editGroupDlg.visible = true;
        },
        deleteGroupHandel(){
            let grp = {};
            for(let g of this.groups){
                if(g.dyzid == this.selectedGroup){
                    grp = JSON.parse(JSON.stringify(g));
                }
            }
            this.$confirm('确定要删除 ['+grp.zmc+'] 分组吗？删除分组后，分组中的人员也同时会删除！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteGroup(grp.dyzid).then(rep=>{
                    if(rep.data.code){
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.getAllGroup();
                    }else{
                        this.$message({
                            message: '删除失败！'+rep.data.msg,
                            type: 'error'
                        });
                    }
                });
            }).cancel(()=>{

            });
        },
        clearSearch(){
            this.searchForm.zyhxm = '';
            this.getAllGroupUsers();
        },
        removeUser(row){
            let ids = [];
            if(row.pid){
                ids.push(row.pid);
            }else{
                this.selectedRows.forEach(user=>{
                    ids.push(user.pid);
                });
            }
            if(ids.length>0){
                 this.$confirm('确定要从分组中删除已选择的用户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteGroupUser({ids:ids,params:{dyzid:this.selectedGroup}}).then(rep=>{
                        if(rep.data.code){
                            this.$message({
                                message: '删除成功！',
                                type: 'success'
                            });
                            this.getAllGroupUsers();
                        }else{
                            this.$message({
                                message: '删除失败！'+rep.data.msg,
                                type: 'error'
                            });
                        }
                    })
                }).cancel(()=>{

                });
            }
        },
        selectedChange(selection){
            this.selectedRows = selection;
        },
        getAllGroupUsers(){
            this.page.current = this.pageOption.currentPage;
            this.page.size = this.pageOption.pageSize;
            
            for(let o in this.searchForm){
                this.page[o] = this.searchForm[o];
            }
            this.page.dyzid = this.selectedGroup;
            getGoupUserList(this.page).then(rep=>{
                if(rep.data.code){
                    this.groupUsers = rep.data.data.result;
                    this.page.total = rep.data.data.totalCount;
                }
            });
            //记忆分页信息
            localStorage.setItem('xxwlCommonPageSzie',this.page.size);
        },
        getAllGroup(){
            getGroupList({}).then(rep=>{
                if(rep.data.code){
                    this.initGroup();
                    rep.data.data.forEach(item=>{
                        this.groups.push(item);
                    });
                    this.selectedGroup = this.groups[0].dyzid;
                }
            })
        },
        initGroup(){
            this.groups = [{
                zmc:'最近联系人',
                dyzid:'zjlxr'
            },{
                zmc:'常用联系人',
                dyzid:'cylxr'
            }];
        },
        getAutoHeight() {
            let el = document.querySelector("#userGroupListTableId");
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
        this.getAllGroup();
        //this.getAllGroupUsers();
        this.getAutoHeight();
        const that = this;
        window.addEventListener('resize',()=>{
            that.getAutoHeight();
        });
    }
}
</script>