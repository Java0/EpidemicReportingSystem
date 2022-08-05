<template>
    <el-container>
        <el-main>
            <el-row>
                <div style="margin-bottom:2px;">
                    单位类型：
                    <el-select v-model="searchForm.deptType" @change="deptTypeChange" placeholder="请选择" style="width:100px;" size="mini">
                        <el-option
                            v-for="item in deptTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- 单位名称:
                    <el-input v-model="searchForm.dwmc" placeholder="请输入单位名称" maxlength="10" style="width:200px;" size="mini"></el-input> -->
                    用户姓名：
                    <el-input v-model="searchForm.yhxm" placeholder="请输入用户姓名" maxlength="10" style="width:200px;" size="mini"></el-input>
                    <el-button type="primary" @click="queryData" style="margin-left:5px" size="mini">查询</el-button>
                </div>

            </el-row>
            <el-row style="margin-top:5px;">
                <el-col :span="8">
                    <div style="overflow-y:auto;height:480px;">
                            <!-- node-key="key" -->
                        <el-tree :data="treeData" 
                            :props="defaultProps" 
                            :default-expanded-keys="['30315']"
                            @node-click="handleNodeClick"
                            empty-text="暂无数据"></el-tree>
                    </div>

                </el-col>
                <el-col :span="8">
                    <div style="overflow-y:auto;height:510px;border-left:1px solid #E4E7ED;">
                        <div style="width:100%;text-align:center;"><span style="font-weight:bold;">可选人员[{{keXuanTableData.length}}]</span></div>
                        <el-table
                        :data="keXuanTableData"
                        
                        height="450px"
                        style="width: 100%">
                            <el-table-column prop="yhxm" label="姓名" width="150"> </el-table-column>
                            <el-table-column prop="dwmc" label="单位" width="180" :show-overflow-tooltip="true"> </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini" @click="selectKeXuan(scope.row)">选择</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row style="text-align:center;">
                            <el-col>
                                <el-button type="primary" size="mini" style="text-align:center;" 
                                    @click="addAllKeXuan" :disabled="keXuanTableData.length==0">全部选择</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div style="overflow-y:auto;height:510px;border-left:1px solid #E4E7ED;">
                        <div style="width:100%;text-align:center;"><span style="font-weight:bold;">已选人员[{{selectedUsers.length}}]</span></div>
                        <el-table
                        :data="selectedUsers"
                        height="450px"
                        style="width: 100%">
                            <el-table-column prop="yhxm" label="姓名" width="150"> </el-table-column>
                            <el-table-column prop="dwmc" label="单位" width="180" :show-overflow-tooltip="true"> </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="danger" size="mini" @click="removeYiXuan(scope.row,scope.$index)">移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row>
                            <el-col :span="24" style="text-align:center;padding:0px 10px 0px;">
                                <el-button type="danger" size="mini"  @click="removeAllYiXuan" :disabled="selectedUsers.length==0">全部移除</el-button>
                            </el-col>
                            <!-- <el-col :span="12" style="text-align:left;">
                                <el-button type="primary" size="mini" @click="saveToGroup" :disabled="selectedUsers.length==0">保存为组</el-button>
                            </el-col> -->
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row style="bottom:5px;">
                <el-col style="text-align:center;">
                    <el-button  style="width:80px;" @click="onCancelHandel">取消</el-button>
                    <el-button type="primary" @click="onOkHandel" style="width:80px;" :disabled="selectedUsers.length==0">确定</el-button>
                </el-col>
            </el-row>
            <el-dialog
                title="保存为分组"
                :visible.sync="saveFenZuDlg.visible"
                width="30%"
                :modal-append-to-body="false"
                >
                <el-row>
                    <el-input v-model="saveFenZuDlg.groupName" style="width:200px;margin-right:10px;" placeholder="请输入分组名称"></el-input>
                    <el-button type="primary" @click="saveNewGroup">保存</el-button>
                </el-row>
            </el-dialog>
        </el-main>
    </el-container>
</template>
<script>
import {getTreeDwAndZdyAndBbm,getDwUser,queryUser,getAllYfws} from "@/api/xxwl/common";

export default {
    name:'SelectUser',
    props:{
        onOk:{
            type:[Function],
            default:()=>{}
        },
        onCancel:{
            type:[Function],
            default:()=>{}
        },
        selectedUsers:{
            type:[Array],
            default:()=>{return []}
        }
    },
    data(){
        return {
            deptTypes:[{label:'甲方',value:'A'},{label:'乙方',value:'Y'},{label:'其他',value:'Q'},{label:'乙方文书',value:'YFWS'}],
            searchForm:{
                dwmc:'',
                yhxm:'',
                deptType:'A',
                src:'tysq',
            },
            treeData:[],
            defaultProps:{
                children: 'children',
                label: 'name'
            },
            rootNodes:["30315","bbmrooot","zdyroot"],
            keXuanTableData:[],
            //yiXuanTableData:[],
            saveFenZuDlg:{
                visible:false,
                groupName:'',
            }
        }
    },
    methods:{
        saveNewGroup(){

        },
        deptTypeChange(val){
            if(val == 'YFWS'){
                //清空可选人员，
                this.keXuanTableData.splice(0);
                //清空单位树
                this.treeData.splice(0);
                //获取所有乙方文书
                getAllYfws({}).then(rep=>{
                    console.log(rep)
                    this.keXuanTableData = rep.data.data;
                })
            }else{
                this.searchForm.yfdw = this.searchForm.deptType;
                getTreeDwAndZdyAndBbm(this.searchForm).then(rep=>{
                    let data = rep.data;
                    if(data){
                        data = JSON.parse(data);
                        this.getRootNodes(data);
                    }
                });
            }
        },
        onOkHandel(){
            this.onOk(this.selectedUsers);
        },
        onCancelHandel(){
            this.onCancel();
        },
        queryData(){
            queryUser(this.searchForm).then(rep=>{
                if(rep.data.code == 1){
                    this.keXuanTableData = rep.data.data
                }
            });
        },
        saveToGroup(){
            this.saveFenZuDlg.visible = true;
        },
        removeAllYiXuan(){
            this.selectedUsers.splice(0);
        },
        removeYiXuan(row,index){
            this.selectedUsers.splice(index,1);
        },
        addAllKeXuan(){
            this.keXuanTableData.forEach(src=>{
                if(!this.selectedUsers.some(item=>item.yhid==src.yhid)){
                    this.selectedUsers.push(src);
                }
            });
        },
        selectKeXuan(row){
            if(this.selectedUsers.some(item=>item.yhid==row.yhid)){
                this.$message({
                    message: '请勿重复添加!',
                    type: 'warning'
                });
            }else{
                this.selectedUsers.push(row);
            }
        },
        handleNodeClick(data){
            if(data.dwbm == 'ZDY'){
                data.dwbm = data.key;
            }
            getDwUser(data).then(rep=>{
                if(rep.data.code == 1){
                    this.keXuanTableData = rep.data.data
                }
            });
        },
        getTreeData(){
            getTreeDwAndZdyAndBbm(this.searchForm).then(rep=>{
                let data = rep.data;
                if(data){
                    data = JSON.parse(data);
                    this.getRootNodes(data);
                    
                }
            });
        },
        //找到所有的根节点
        getRootNodes(data){
            this.treeData = this.buildTree(data);
        },
        buildTree(list){
            let treeData=[];
            list.forEach((item)=>{
                if(!this.hasParent(item,list)){
                    if(this.tree(list,item.key).length>0){
                        let children=this.tree(list,item.key);
                        item.children=children;
                    
                    }
                    treeData.push(item);
                }
            })
            return treeData;
        },
        hasParent(deptItem,list){
            let hasParent=false;
            if(deptItem.pkey==""){
                hasParent= false;
            }else{
                list.forEach((item)=>{
                    if(item.key===deptItem.pkey){
                        hasParent= true;
                    }
                });
            }
            return hasParent;
        },
        tree(data,key){
            let arr = [];
            data.filter((item) => {
                return item.pkey === key
            }).forEach((item) => {
                if(key == '20002'){
                    item.expand = true;
                }
                item.children = this.tree(data,item.key);
                arr.push(item);
            })
            return arr
        }
    },
    mounted(){
        this.getTreeData();
    }
}
</script>