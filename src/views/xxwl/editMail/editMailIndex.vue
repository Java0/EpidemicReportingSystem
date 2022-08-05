<template>
    <el-container>
        <el-header height="100%">
            <el-row  style="height:100%;">
                <el-col :span="21" style="height:100%;">
                    <table style="width:99.7%;">
                        <tr>
                            <td width="20px;" style="text-align:right;font-weight:bold;"><el-button type="text" @click="selectUser" style="font-size:16px;font-weight:bold;">收件人：</el-button></td>
                            <td>
                                <div>
                                    <el-tag size="mini" 
                                        style="margin-left:5px;" 
                                        closable v-for="(item,index) in msgForm.address.slice(0,10)" 
                                        :key="item.yhid"
                                        @close="removeaddress(item,index)">{{item.yhxm}}</el-tag>
                                    <span v-if="msgForm.address.length>10" style="margin-left:10px;">等{{msgForm.address.length}}人</span>
                                    <el-button v-if="msgForm.address.length>10" type="text" @click="showAllUser" style="margin-left:5px;">更多...</el-button>
                                    <span v-if="msgForm.address.length==0" style="color:#C0C4CC;font-size:small;" @click="selectUser">点击收件人添加人员</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right;font-weight:bold;">主题：</td>
                            <td style="position: relative;padding-right:192px;">
                                <el-input
                                    type="textarea"
                                    :rows="1"
                                    :maxlength="245"
                                    show-word-limit
                                    placeholder="请输入内容"
                                    v-model="msgForm.subject"
                                    style=""></el-input>
                                    <el-button type="primary" icon="el-icon-document" size="small" @click="saveDraft"  style="position:absolute;right:0px; bottom:3px;">存草稿</el-button>
                                    <el-button type="success" icon="el-icon-s-promotion" size="small" @click="sendEmail"  style="position:absolute;right:100px; bottom:3px;">发送</el-button>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right; line-height:40px;font-weight:bold;" valign="top">附件：</td>
                            <td style="padding-bottom:10px;">
                                <div style="height:40px;  overflow:hidden;">
                                    <div class="container" style="float:left;">
                                        <div class="filePicker el-icon-upload" @click="selectFileBtn">
                                            <label style="padding-left:5px; cursor: pointer;">点击选择文件</label>
                                            
                                        </div>
                                    </div>
                                    <div style="display:inline;float:left;margin-left:10px; margin-top:3px; line-height:33px;">附件大小不超过100MB</div>
                                </div>
                                <div class="fileListDiv" v-if="msgForm.fjList.length>0">
                                    <el-tag size="small" closable v-for="(item,index) in msgForm.fjList" 
                                        :key="item.fileid" style="margin:2px 2px;" @close="removeFj(item,index)">
                                        {{item.filename?item.filename:item.fjbt}}
                                    </el-tag>
                                    <!-- <ul>
                                        <li v-for="(item,index) in msgForm.fjList" :key="item.fileid">
                                            <b>{{item.filename?item.filename:item.fjbt}}</b>
                                            <span style="margin-left:5px;color:#409BFF;cursor: pointer;" @click="removeFj(item,index)">移除</span>
                                        </li>
                                    </ul> -->
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right;font-weight:bold" valign="top">正文：</td>
                            <td>
                                <tinymce v-model="msgForm.content" :toolbar="tinymceOptions.toolbar" :menubar="tinymceOptions.menubar" :height="editHeight"></tinymce>
                            </td>
                        </tr>
                    </table>
                </el-col>
                <el-col :span="3" style="height:100%;">
                    <div style="overflow-x:hidden;border-left:0px solid #000; height:100%; background-color:#ebe7e7;">
                        <el-tree :data="rightTreeData" :props="rightTreeProps" 
                        @node-click="handleRightTreeNodeClick"
                        :default-expanded-keys="['zjlxr','cylxr']"
                        node-key="id"
                        @node-contextmenu="rightTreeContextMenu">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            
                                <span v-if="data.yhid" style="font-size:14px; background:url(img/bg/user.png) no-repeat left center; padding-left:20px;">
                                    <el-tooltip effect="light" :content="data.dwmc" placement="top" :open-delay="600">
                                        <span>{{ node.label }}</span>
                                    </el-tooltip>
                                </span>
                                <span v-else>{{ node.label }}</span>
                            
                        </span>
                        </el-tree>
                    </div>
                    <div id="contextmenu" v-show="rightClick.menuVisible" class="menu">
                        <div class="contextmenu__item" @click="rightClick.children.forEach(child=>handleRightTreeNodeClick(child))">全选此分组</div>
                    </div>
                </el-col>
            </el-row>
            
        </el-header>
        <!--http://tinymce.ax-z.cn/general/basic-setup.php#toolbarconfiguration-->
        <!-- <el-main>
            <div style="padding-left:100px;padding-right:10px;">

                
            </div>
        </el-main> -->
        <el-dialog
            title="选择收件人"
            :visible.sync="showSelectUserDlg"
            width="70%"
            :destroy-on-close="true"
            v-if="showSelectUserDlg"
            :close-on-click-modal="false"
            >
            <div style="height:610px">

                <SelectUser :onOk="selectUserOk" :onCancel="selectUserCancel" :selectedUsers="msgForm.address"></SelectUser>
            </div>
        </el-dialog>
        <el-dialog
            title="全部收件人"
            :visible.sync="allAddressDlg.visible"
            width="50%"
            :destroy-on-close="true"
            :close-on-click-modal="false"
            >
            <div>
                <el-table
                    :data="msgForm.address"
                    border
                    size="mini"
                    height="500"
                    style="width: 100%">
                    <el-table-column type="index" width="50"> </el-table-column>
                    <el-table-column prop="yhxm" label="姓名" width="180"> </el-table-column>
                    <el-table-column prop="dwmc" label="单位" :show-overflow-tooltip="true"> </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeAddressByDlg(scope.row,scope.$index)">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <input type="file" ref="file" multiple="multiple" size="104857600" @change="fileChange" style="display:none;"/>
    </el-container>
</template>
<script>
import Tinymce from '@/components/Tinymce';
import SelectUser from '@/components/xxwl/SelectUser';
import {sendEmail,forwardEmail,uploadFile,saveCgx,getRightTreeData} from '@/api/xxwl/editMail';
import {getInBoxItemInfo,getDraftItemInfo} from "@/api/xxwl/common";

export default {
    name:'editMail',
    components:{
        Tinymce,
        SelectUser
    },
    computed:{
        editHeight(){
            return document.documentElement.clientHeight-400;
        }
    },
    data(){
        return {
            name:'写信息',
            content:'',
            msgForm:{
                subject:'',
                content:'',
                address:[],
                fjList:[]
            },
            tinymceOptions:{
                toolbar:['bold | alignleft aligncenter alignright | fontselect fontsizeselect'],
                menubar:'',
            },
            showSelectUserDlg:false,
            fileList:[],
            actionType:'',
            actionSrc:'',
            maxFileUploadSize:104857600,
            allAddressDlg:{
                visible:false,
            },
            userInfo:{},
            rightTreeData:[],
            rightTreeProps:{
                children: 'children',
                label: 'name'
            },
            rightClick:{
                menuVisible: false,
                children:[]
            }
        }
    },
    created(){
        this.userInfo = JSON.parse(localStorage.getItem('vuebase-userInfo')).content;
    },
    methods:{
        selectFileBtn(){
            this.$refs.file.value="";
            this.$refs.file.click();
        },
        rightTreeContextMenu(event,data,node,nodeElement){
            if(!data.children||['zjlxr','cylxr'].includes(data.id))return//叶子节点不展示,最近联系人/常用联系人不展示
            this.rightClick.children=data.children
            this.rightClick.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
            this.rightClick.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
            event.preventDefault() //关闭浏览器右键默认事件
            const menuEle = document.querySelector('.menu')
            
            menuEle.style.left = event.clientX -150 + 'px'
            menuEle.style.top = event.clientY -50+ 'px'
            document.addEventListener('click', this.foo) // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
        },
        foo() {
            // 取消鼠标监听事件 菜单栏
            this.rightClick.menuVisible = false
            document.removeEventListener('click', this.foo) // 关掉监听，
        },
        handleRightTreeNodeClick(data,node,nodeElement){
            //console.log(data);
            //console.log(node);
            //console.log(nodeElement);
            if(!data.yhid){
                return;
            }
            let index = -1;
            this.msgForm.address.forEach(user=>{
                if(user.yhid == data.yhid){
                    index = 1;
                }
            });
            if(index == -1){
                this.msgForm.address.push(data);
            }
        },
        getRightTreeData(){
            getRightTreeData({}).then(rep=>{
                console.log(rep);
                if(rep.data.code){
                    this.rightTreeData = rep.data.data;
                }
            });
        },
        fileChange(e){
            //选择文件结束回调函数，文件名相同视为重复
            let fileCount = this.$refs.file.files.length;
            const loading = this.$loading({
                lock: true,
                text: '文件上传中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            for(let file of this.$refs.file.files){
                //去重,参考3.12，重复文件暂时不处理
                /*for(let fj of this.msgForm.fjList){
                    if(fj.filename == file.name){
                        //有重复
                        fileCount--;
                        if(fileCount==0){
                            loading.close();
                        }
                        continue a;注意这里的a，使用时要修正语法
                    }
                }*/
                if(file.size>this.maxFileUploadSize){
                    this.$message({
                        message: file.name+' 超过'+(this.maxFileUploadSize/1024/1024)+'M，上传失败！',
                        type: 'error',
                        duration:7000,
                        showClose:true
                    });
                    fileCount--;
                    if(fileCount==0){
                        loading.close();
                    }
                    continue;
                }
                uploadFile(this.userInfo.hhid,file).then(rep=>{
                    fileCount--;
                    if(fileCount==0){
                        loading.close();
                    }
                    if(rep.data.flag){
                        this.msgForm.fjList.push(rep.data.data);
                    }
                })
            }
        },
        showAllUser(){
            this.allAddressDlg.visible = true;
        },
        removeFj(item,index){
            this.msgForm.fjList.splice(index,1);
        },
        fileUploadSuccess(reponse,file,fileList){
            if(reponse.flag){
                this.msgForm.fjList.push(reponse.data);
            }
        },
        handleChange(file, fileList){
            this.fileList = fileList.slice(-3);
        },
        selectUser(){
            this.showSelectUserDlg = true;
        },
        selectUserOk(data){
            this.msgForm.address = data;
            this.showSelectUserDlg = false;
        },
        selectUserCancel(){
            this.showSelectUserDlg = false;
        },
        saveDraft(){
            
            //主题、正文、附件均为空时不允许保存
            if(!this.msgForm.subject){
                this.$message({
                    message: '主题不能为空！',
                    type: 'error'
                });
                return;
            }
            const loading = this.$loading({
                lock: true,
                text: '正在保存草稿...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            saveCgx(this.msgForm).then(rep=>{
                loading.close();
                if(rep.data.code){
                    //保存成功！
                    this.$message({
                        message: '已成功保存至草稿箱!',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: '草稿保存失败!'+rep.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        sendEmail(){
            //发件规则，收件人不能为空，主题不能为空，附件或正文必有其一
            if(this.msgForm.address.length==0){
                this.$alert('收件人不能为空！', '提示', {
                    confirmButtonText: '确定'
                });
                return;
            }
            if(!this.msgForm.subject){
                this.$alert('主题不能为空！', '提示', {
                    confirmButtonText: '确定'
                });
                return;
            }
            if(this.msgForm.fjList.length==0&&!this.msgForm.content){
                this.$alert('发送的邮件内容不能为空！', '提示', {
                    confirmButtonText: '确定'
                });
                return;
            }
            const loading = this.$loading({
                lock: true,
                text: '正在发送邮件...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            //如果是转发，则调用转发的API
            if(this.actionType == 'forward'){
                forwardEmail(this.msgForm).then(rep=>{
                    loading.close();
                    this.sendEmailCallBack(rep);
                });
            }else{
                sendEmail(this.msgForm).then(rep=>{
                    loading.close();
                    this.sendEmailCallBack(rep);
                });
            }
        },
        sendEmailCallBack(rep){
            if(rep.data.code){
                this.$alert('信息发送成功!', '提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    showClose:'showClose',
                    callback: action => {
                        this.$router.push({
                            path:'/wel/index/outBox',
                        });
                    }
                });
            }else{
                this.$notify.error({
                    title: '信息发送失败',
                    message: rep.data.msg,
                    duration: 0
                });
            }
        },
        removeaddress(item,index){
            this.msgForm.address.splice(index,1);
        },
        removeAddressByDlg(row,index){
            this.msgForm.address.splice(index,1);
        },
        getInBoxItemInfo(xxxh){
            getInBoxItemInfo({xxxh:xxxh}).then(rep=>{
                if(rep.data.code){
                    let repdata = rep.data.data;
                    if(this.actionType == "reply"){
                        //回复邮件，自动填写收件人、和主题，注意主题中重复出现回复的问题
                        this.msgForm.address.push({
                            yhid:repdata.xxcl.yhid,
                            yhxm:repdata.xxcl.yhxm,
                            yhdwbm:repdata.xxcl.yhdwbm,
                            yhdwmc:repdata.xxcl.yhdwmc,
                        });
                        if(repdata.jbxx.wdbt.substring(0,2) == "回复"){
                            this.msgForm.subject = repdata.jbxx.wdbt;
                        }else{
                            this.msgForm.subject = '回复：'+repdata.jbxx.wdbt;
                        }
                    }else if(this.actionType == 'forward'){
                        //转发邮件，自动填写主题、附件、正文，注意重复出现转发的问题和正文为空的情况
                        if(repdata.jbxx.wdbt.substring(0,2) == '转发'){
                            this.msgForm.subject = repdata.jbxx.wdbt;
                        }else{
                            this.msgForm.subject = "转发："+repdata.jbxx.wdbt;
                        }
                        this.msgForm.content = repdata.jbxx.zw;
                        this.msgForm.fjList = repdata.fjList;
                    }
                }
            });
        },
        //收件箱转发与草稿箱编辑功能公用此方法
        //两者的共同特点是只有wdid没有xxxh
        getDraftItemInfoHandel(wdid){
            getDraftItemInfo({wdid:wdid}).then(rep=>{
                if(rep.data.code){
                    let repdata = rep.data.data;
                    if(this.actionType == "forward"){
                        //转发邮件，自动填写主题、附件、正文，注意重复出现转发的问题和正文为空的情况
                        if(repdata.jbxx.wdbt.substring(0,2) == '转发'){
                            this.msgForm.subject = repdata.jbxx.wdbt;
                        }else{
                            this.msgForm.subject = "转发："+repdata.jbxx.wdbt;
                        }
                        this.msgForm.content = repdata.jbxx.zw;
                        this.msgForm.fjList = repdata.fjList;
                    }else{
                        this.msgForm.subject = repdata.jbxx.wdbt;
                        this.msgForm.content = repdata.jbxx.zw;
                        this.msgForm.fjList = repdata.fjList;
                        this.msgForm.wdid = wdid;
                    }
                    
                }else{
                    this.$message({
                        message: '获取基本信息失败！'+rep.data.msg,
                        type: 'error'
                    });
                }
            });
        }
    },
    mounted(){
        this.actionSrc = this.$route.query.actionSrc;
        this.actionType = this.$route.query.actionType;
        let xxxh = this.$route.query.xxxh;
        
        if(this.actionSrc == "inBox" && xxxh){
            //发件箱 outBox
            //草稿箱 draftBox
            //收件箱 inBox
            //回收站 recycleBin
            //目前只有收件箱的操作会跳转到此页面，可能的动作是回复reply  转发forward
            this.getInBoxItemInfo(xxxh);
        }else if(this.actionSrc == 'draftBox'){
            //草稿箱进入
            let wdid = this.$route.query.wdid;
            this.getDraftItemInfoHandel(wdid);
        }else if(this.actionSrc == 'outBox'){
            //
            let wdid = this.$route.query.wdid;
            this.getDraftItemInfoHandel(wdid);
        }
        this.$parent.$parent.$parent.changeMenu(2);
        //加载右侧树
        this.getRightTreeData();
    },
    activated(){
    }
}
</script>
<style  scoped>
.fileListDiv{
    overflow-y: auto;
    height: 100px;
    margin-top: 3px;
    border: 1px solid #DCDFE6;
    border-radius:5px;
}
.container{
    
    margin: 3px auto;
    display:inline;
}
.filePicker{
    width: 140px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    color: #fff;
    background: #00b7ee;  
    border-radius: 5px; 
    cursor: pointer;     
}
.filePicker input[type="file"] {
    position: relative;
    top: -24px;
    left: 0px;
    width: 110px;
    height: 24px;
    opacity: 0;
    cursor: pointer;
    overflow: hidden;
    z-index: 0;
}
.el-tree {
    background-color: transparent !important;
}
.el-header{
    padding-right: 0px !important;
}
</style>
<style>
#mceu_15{
    display: none;
}
.el-dialog__body{
    padding: 10px 20px 5px 20px;
}
</style>
<style scoped>
.contextmenu__item {
  display: block;
  line-height: 34px;
  text-align: center;
}
.contextmenu__item:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.menu {
  position: absolute;
  background-color: #fff;
  width: 100px;
  /*height: 106px;*/
  font-size: 12px;
  color: #444040;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  white-space: nowrap;
  z-index: 1000;
}
.contextmenu__item:hover {
  cursor: pointer;
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
</style>