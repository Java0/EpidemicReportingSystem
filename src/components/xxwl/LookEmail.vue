<template>
  <el-dialog title="信息详情" :visible.sync="lookEmailDlgVisible" v-if="lookEmailDlgVisible" @close="distroy" append-to-body top="5vh" :center="dialogOp.center" :close-on-click-modal="false">
    <div style="border-bottom:1px solid #f1f1f1;display:flex;">
      <div style="display:flex;justify-content:center;align-items:center;padding-right:10px">
        <div style="display:flex;justify-content:center;align-items:center;border-radius:50%;background-color:grey;width:40px;height:40px">
          <div style="color:white">{{emailInfo.sendUser.yhxm.length>=2?emailInfo.sendUser.yhxm.substring(emailInfo.sendUser.yhxm.length-2):''}}</div>
        </div>
      </div>
      <div style="flex:auto;margin:5px">
        <div style="display:flex;justify-content:space-between;color:#323233;font-size: 16px;line-height: 30px;">
            <div>{{emailInfo.sendUser.yhxm}}<span style="color:#969799;margin-left:10px;font-size: 14px;">({{emailInfo.sendOrg.dwmc}})</span></div>
          <!-- <el-tooltip class="item" :content="emailInfo.sendOrg.dwmc" placement="top-start">
          </el-tooltip> -->
          <div style="color:#969799;text-align:right;">{{emailInfo.sendTime}}</div>
        </div>
        <!-- <div style="color: #969799;font-size: 14px;line-height: 22px;">
          <span style="color:#969799">{{emailInfo.sendOrg.dwmc}}</span>
        </div> -->
        <!-- <div style="color: #969799;font-size: 14px;line-height: 22px;">
          <el-tag size="small" color="#f3f3f3" text-color="#1989fa" 
            v-for="(reciever, index) in recievers.slice(0,8)" :key="index" style="margin:1px 3px;">{{reciever.jyhxm}}</el-tag>
          <span v-if="recievers.length>8" style="margin-left:10px;">等{{recievers.length}}人</span>
          <el-button v-if="recievers.length>8" type="text" @click="showAllRecieverUser" style="margin-left:5px;">更多...</el-button>
        </div> -->
        <div>
          <span v-for="item in emailInfo.fjList" :key="item.fjid">
            <i class="el-icon-paperclip"></i>
            <el-popover :disabled="!showViewBtn(item.fjbt)" placement="top-start" trigger="hover">
                <p>您也可以点击预览按钮在线查看此文档</p>
                <div style="text-align: right; margin: 0">
                    <el-button type="primary" size="mini" @click="viewFile(item)">预览</el-button>
                </div>
              <el-link slot="reference" type="primary" style="margin:1px 3px;" @click="downloadFile(item)">{{item.fjbt}}</el-link>
            </el-popover>
          </span>
        </div>
      </div>
    </div>
    <div style="padding:16px;height:400px;overflow-y:auto;">
      <div style="font-weight:600;font-size:14pt;line-height:1.5;margin-bottom:16px">{{emailInfo.subject}}</div>
      <div style="font-size:16px;width:100%;overflow-y:auto;" v-html="emailInfo.content"></div>
    </div>
    <el-footer>
      <div style="text-align:center;padding: 10px 0">
        <!-- <el-button type="primary" @click="doSave">保 存</el-button> -->
        <el-button @click="distroy">关 闭</el-button>
        <el-button @click="replyEmail" type="success" v-if="btns.replyVisible">回 复</el-button>
        <el-button @click="forwardEmail" type="primary" v-if="btns.forwardVisible">转 发</el-button>
        <el-button @click="deleteEmail" type="danger" v-if="btns.deleteVisible">删 除</el-button>
      </div>
    </el-footer>
    <el-dialog
      title="所有收件人"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="40%"
      v-if="dialogVisible"
      :destroy-on-close="true">
      <div>
        <el-table
          :data="allRecieverTableData"
          style="width: 100%"
          height="400"
          >
          <el-table-column
            prop="jyhxm"
            label="姓名"
            width="200">
          </el-table-column>
          <el-table-column
            prop="jyhdwmc"
            label="单位名称">
          </el-table-column>
        </el-table>
        <Pagination :page="sjrPage" :render="getSjrListPage" :options="pageOptionSjr"></Pagination>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>
<script>
/**
 * 打开此页面的有三种情况，收件箱、发件箱、草稿箱、回收站
 * 收件箱：展示回复、转发、删除等快捷操作
 * 发件箱：展示转发快捷操作
 * 草稿箱：不展示任何快捷操作
 * 回收站：不展示任何快捷操作
 */
import {
  getOutBoxItemInfo,
  getInBoxItemInfo,
  getDraftItemInfo,
} from "@/api/xxwl/common";
import { deleteSjxItem } from "@/api/xxwl/inBox";
import { getSjrList } from "@/api/xxwl/outBox";
import config from "@/config/config";
import website from "@/config/website";
export default {
  computed: {
    showViewBtn() {
      //判断是否可以显示预览按钮
      return function (filename) {
        let ret = false;
        this.viewType.forEach((item) => {
          if (this.endWith(filename, item)) {
            ret = true;
          }
        });
        return ret;
      };
    },
  },
  props: {
    lookShow: {
      type: Boolean,
      default: false,
    },
    wdid: {
      type: String,
      default: "",
    },
    actionSrc: {
      type: String,
      default: "",
    },
    xxxh: {
      type: String,
      default: "",
    },
    onClose:{
      type: Function,
      default:()=>{}
    }
  },
  watch: {
    lookShow() {
      this.lookEmailDlgVisible = this.lookShow;
    },
    wdid() {
    },
    actionSrc() {
    },
  },
  data() {
    return {
      lookEmailDlgVisible: this.lookShow,
      dialogOp: {
        center: false,
      },
      emailInfo: {
        sendUser: {
          yhxm: "",
          yhid: "",
        },
        sendOrg: {},
        subject: "",
        fjList: [],
        content: "",
        sendTime: "",
      },
      btns: {
        replyVisible: false,
        forwardVisible: false,
        deleteVisible: false,
      },
      viewType: [
        'doc','docx','docm','dot','dotx','dotm','odt','fodt','ott','rtf','txt',
        'html','htm','mht','pdf','djvu','fb2','epub','xpsxls','xlsx','xls','xlsm','xlt',
        'xltx','xltm','ods','fods',' ots','csvpps','ppsx','ppsm','ppt','pptx',
        'pptm','pot',' potx','potm','odp','fodp','otp'
      ],
      userInfo: {},
      recievers:[],
      dialogVisible:false,
      allRecieverTableData:[],
      sjrPage:JSON.parse(JSON.stringify(website.page)),
      pageOptionSjr:{
          pageNumber: 1,
          currentPage: 1,
          pageSize: 15
      },
    };
  },
  methods: {
    getSjrListPage(){
      if (this.pageOptionSjr.pageNumber) {
          this.sjrPage.current = this.pageOptionSjr.pageNumber;
      }
      if (this.pageOptionSjr.pageSize) {
          this.sjrPage.size = this.pageOptionSjr.pageSize;
      }
      this.sjrPage.djid = this.wdid;
      getSjrList(this.sjrPage).then(rep=>{
        console.log(rep.data.result);
        this.allRecieverTableData = rep.data.result;
        this.sjrPage.total = rep.data.totalCount;
      });
    },
    showAllRecieverUser(){
      this.dialogVisible = true;
      this.getSjrListPage();
    },
    getAllRecieversHandel(djid){
      //只有收件箱或者发件箱才需要显示收件人
      let tempPage = {};
      tempPage.current = 1;
      tempPage.size = 10000;
      tempPage.djid = djid;
      getSjrList(tempPage).then(rep=>{
        console.log(rep.data.result);
        this.recievers = rep.data.result;
      });
    },
    downloadFile(fileinfo) {
      if (fileinfo.minio_file_id) {
        let url =
          config.newFileServer +
          "/commonFileService/downloadFile?fileid=" +
          fileinfo.minio_file_id +
          "&hhid=" +
          this.userInfo.hhid +
          "&ywxtbm=xxwl";
        window.open(url, "_blank");
      } else {
        //let url = this.oldFileServer+"/bgpt/common/common_downxxwlfilebyfjid_ydbg.jsp?fjid="+fileinfo.fjid+"&hhid="+this.hhid;
        let url =
          config.devProxUrl +
          "/xxwlPcService/fileDownloadEx?id=" +
          fileinfo.fjid +
          "&hhid=" +
          this.userInfo.hhid;
        window.open(url, "_blank");
      }
    },
    viewFile(fileinfo) {
      if (fileinfo.minio_file_id) {
        //新文件
        let url =
          config.newFileServer +
          "/commonFileService/preview?ywxtbm=xxwl&fileid=" +
          fileinfo.minio_file_id +
          "&hhid=" +
          this.userInfo.hhid;
        window.open(url, "_blank");
      } else {
        //老文件
        var fileUrl =
          "http://10.79.3.12/bgpt/common/common_downxxwlfilebyfjid_ydbg.jsp?fjid=" +
          fileinfo.fjid;
        let url =
          config.newFileServer +
          "/commonFileService/previewByUrl?device=desktop&url=" +
          encodeURIComponent(Base64.encode(fileUrl)) +
          "&fullfilename=" +
          encodeURIComponent(Base64.encode(fileinfo.fjbt)) +
          "&hhid=" +
          this.userInfo.hhid;
        window.open(url, "_blank");
      }
    },
    endWith(src, str) {
      let d = src.length - str.length;
      return d >= 0 && src.lastIndexOf(str) == d;
    },
    getEmailInfo() {
      if (this.actionSrc == "outBox" || this.actionSrc == "recycleBin") {
        getOutBoxItemInfo({ wdid: this.wdid }).then((rep) => {
          let repData = rep.data.data;
          
          this.emailInfo.sendUser = {
            yhxm: repData.jbxx.yhxm,
            yhid: repData.jbxx.yhid,
          };
          this.emailInfo.sendOrg = {
            dwmc: repData.jbxx.yhdwmc,
            dwbm: repData.jbxx.yhdwbm,
          };
          this.emailInfo.subject = repData.jbxx.wdbt;
          this.emailInfo.fjList = repData.fjList;
          this.emailInfo.content = repData.jbxx.zw;
          this.emailInfo.sendTime = repData.jbxx.firsttime;
        });
        //如果时发件箱，获取收件人信息
        if(this.actionSrc == 'outBox'){
          this.getAllRecieversHandel(this.wdid);
        }
      } else if (this.actionSrc == "inBox") {
        getInBoxItemInfo({ xxxh: this.xxxh }).then((rep) => {
          let repData = rep.data.data;
          this.emailInfo.sendUser = {
            yhxm: repData.jbxx.yhxm,
            yhid: repData.jbxx.yhid,
          };
          this.emailInfo.sendOrg = {
            dwmc: repData.jbxx.yhdwmc,
            dwbm: repData.jbxx.yhdwbm,
          };
          this.emailInfo.subject = repData.jbxx.wdbt;
          this.emailInfo.fjList = repData.fjList;
          this.emailInfo.content = repData.jbxx.zw;
          this.emailInfo.sendTime = repData.xxcl.firsttime;
        });
        //获取收件人信息
        this.getAllRecieversHandel(this.wdid);
      } else if (this.actionSrc == "draftBox") {
        getDraftItemInfo({ wdid: this.wdid }).then((rep) => {
          if (rep.data.code) {
            let repData = rep.data.data;
            
            this.emailInfo.subject = repData.jbxx.wdbt;
            this.emailInfo.fjList = repData.fjList;
            this.emailInfo.content = repData.jbxx.zw;
          } else {
            this.$message({
              message: "获取基本信息失败！" + rep.data.msg,
              type: "error",
            });
          }
        });
      }
    },
    distroy() {
      this.onClose();
      this.$emit("update:lookShow", false);
    },
    replyEmail() {
      //this.$emit("sendData", this.data1);
      this.$router.push({
        path:
          "/wel/index/edit?xxxh=" +
          this.xxxh +
          "&wdid=" +
          this.wdid +
          "&actionSrc=" +
          this.actionSrc +
          "&actionType=reply",
      });
    },
    forwardEmail() {
      this.$router.push({
        path:
          "/wel/index/edit?xxxh=" +
          this.xxxh +
          "&wdid=" +
          this.wdid +
          "&actionSrc=" +
          this.actionSrc +
          "&actionType=forward",
      });
    },
    deleteEmail() {
      this.$confirm("确定要删除该邮件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          deleteSjxItem([this.xxxh]).then((rep) => {
            if (rep.data.code == 1) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.distroy();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!" + rep.data.msg,
              });
            }
          });
        })
        .cancel(() => {});
    },
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("vuebase-userInfo")).content;
    if (this.actionSrc == "inBox") {
      this.btns.replyVisible = true;
      this.btns.forwardVisible = true;
      this.btns.deleteVisible = true;
    }else if(this.actionSrc == 'outBox'){
      this.btns.forwardVisible = true;
    }
    this.getEmailInfo();
  },
};
</script>

<style lang="scss" scoped>
.fjListDiv {
  overflow-y: auto;
  height: 100px;
  margin-top: 3px;
}

.el-dialog__footer{
  text-align: center;
}
</style>