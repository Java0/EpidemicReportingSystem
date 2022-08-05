<template>
  <ContentMain :footerHeight="footerHeight">
    <template slot="topLeft" >
      <el-button icon="el-icon-edit" type="primary" size="small" @click="addAvue">Avue新增</el-button>
      <el-button icon="el-icon-edit" type="primary" size="small" @click="editAvue">Avue修改</el-button>
      <el-button icon="el-icon-edit" type="primary" size="small" @click="removeData">删除</el-button>
      <el-button v-show="false" icon="el-icon-edit" type="primary" size="small" @click="remove">取消选中</el-button>
      <el-button icon="el-icon-edit" type="primary" size="small" @click="showIcon">图标展示</el-button>
      <el-button icon="el-icon-edit" type="primary" size="small" @click="showRy">选择人员</el-button>
      <el-button icon="el-icon-edit" type="primary" size="small" @click="openDw">选择单位</el-button>
    </template>
    <template slot="topRight">
      <el-input
        class="el_input_search"
        v-model="searchForm.yhmc"
        size="mini"
        placeholder="请输入用户姓名"
      />
      <el-input
        class="el_input_search"
        v-model="searchForm.dwmc"
        size="mini"
        placeholder="请输入单位名称"
      />
      <el-tooltip class="item" effect="dark" content="搜索" placement="top">
        <el-button type="default" icon="el-icon-search" circle size="small" @click="refreshData"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button type="default" icon="el-icon-refresh" circle size="small" @click="refreshChange"></el-button>
      </el-tooltip>
    </template>
    <template>
      <avue-crud
        ref="singleTable"
        :data="data"
        :option="option"
        v-model="obj"
        @row-click="getRow"
        @current-row-change="handleCurrentRowChange"
        @row-save="handleRowSave"
        @refresh-change="refreshChange"
        @sort-change="sortChange"
        style="height:100%"
      ></avue-crud>
    </template>
    <template slot="footer" >
      <Pagination :page="page" :render="getList" :options="pageOption"></Pagination>
    </template>
    <div>
      <TestTableAvueAddForm
        class="form_test"
        :avueAddShow.sync="avueAddShow"
        :reFresh="refreshChange"
      ></TestTableAvueAddForm>
      <!--只有在一开始不需要渲染dom元素的组件父标签上加v-if v-if消耗浏览器加载速度  v-if控制dom元素是否加载 如果不加v-if那么一渲染浏览器 标签内的dom元素就开始渲染 -->
      <TestTableAvueForm
        v-if="avueShow"
        class="form_test"
        :formData="rowdata"
        :avueShow.sync="avueShow"
        :reFresh="refreshChange"
      ></TestTableAvueForm>
      <SelTysqAnRyNSync 
        v-if="tysqShow" 
        class="form_test" 
        ref="syncSelTysqRy"
        :tysqShow.sync="tysqShow"  
        :dataOptions="dataOptions"
        :dwTreeParams="dwTreeParams"></SelTysqAnRyNSync>
        <SeltysqDw 
            ref="SeltysqDw"
            v-if="showDw"
            :tysqDwShow.sync="showDw" 
            :dataOptions="dwData"
            :dwTreeParams="dwTreeParams"></SeltysqDw>
    </div>
    <div>
      <iconShow class="form_test" :show.sync="show"></iconShow>
    </div>
  </ContentMain>
</template>

<script>
import testForm from "./TestForm";
import iconShow from "./IconShow";
import TestTableAvueForm from "./TestTableAvueForm";
import TestTableAvueAddForm from "./TestTableAvueAddForm";
import {
  deepClone,
  isEmpty,
  getArrayStrValue,
  downLoadFile
} from "@/util/util";
import website from "@/config/website";

export default {
  components: {
    TestTableAvueForm,
    iconShow,
    TestTableAvueAddForm
  },
  data() {
    var that = this;
    var validatePass = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入单位"));
      } else {
        callback();
      }
    };
    /*var validatePass2 = function(rule, value, callback)  {
        if (value === '') {
          callback(new Error('请再次输入'));
        } else if (value !== that.obj.sex) {
          callback(new Error('两次输入不一致!'));
        } else {
          callback();
        }
      };*/
    return {
      obj: {},
      activeName: "first",
      rowdata: {},
      tempData: {},
      searchForm: {
        yhmc: "",
        dwmc: ""
      },
      timer: false,
      tysqShow: false,
      showDw:false,
      dwData:{
        retData:[]
      },
      show: false,
      avueAddShow: false,
      avueShow: false,
      page: JSON.parse(JSON.stringify(website.page)),
      pageOption: {
        pageNumber: 1,
        currentPage: 1,
        pageSize: 10
      },
      data: [],
      screenHeight: window.innerHeight,
      option: {
        menu: false,
        columnBtn: false,
        refreshBtn: false,
        saveBtn: false,
        updateBtn: false,
        cancelBtn: false,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        page: false,
        align: "center",
        height: "100%",
        menuAlign: "center",
        highlightCurrentRow: true,
        menuPosition: "center",
        column: [
          {
            label: "序号",
            prop: "rownum_",
            span: 24,
            align: "center",
            width: 80
          },
          {
            sortable: "custom",
            label: "用户姓名",
            prop: "yhmc",
            span: 24,
            align: "left",
            width: 160,
            rules: [
              {
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              },
              {
                min: 3,
                max: 5,
                message: "长度在 3 到 5 个字符",
                trigger: "blur"
              }
            ]
          },
          {
            label: "单位名称",
            prop: "dwmc",
            align: "left",
            width: 200,
            span: 24
          },
          {
            label: "单位编码",
            prop: "dwbm",
            align: "left",
            span: 24,
            width: 160,
            rules: [
              {
                validator: validatePass,
                trigger: "blur"
              }
            ]
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          },
          {
            sortable: "custom",
            type: "date",
            label: "时间",
            prop: "firsttime",
            width: 100,
            span: 24
          }
        ]
      },
      dataOptions:{
         retData:[]
      },
      dwTreeParams:{
          dwbm:"CNPC.PetroChina.TLM",
          maxdwjb:"100",
          mindwjb:"0",
          order:"DWBM",
          dwid:""
      },
      footerHeight:"40px"
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  watch: {},
  computed: {
    vshow: function() {
      return this.avueShow && !isEmpty(this.tempData);
    }
  },
  methods: {
    getList() {
      if (this.pageOption.pageNumber) {
        this.page.pageNumber = this.pageOption.pageNumber;
      }
      if (this.pageOption.pageSize) {
        this.page.pageSize = this.pageOption.pageSize;
      }
      var that = this;
      this.axios.apiPost({
        url: "/test/queryData",
        data: this.page,
        call: function(res) {
          that.data = res.data.rows;
          //设置总条数
          that.page.total = (typeof(res.data.total) == "undefined"?0:res.data.total);
        }
      });
    },
    getRow(row, event, column) {
      //this.$message.success(JSON.stringify(row));
    },
    edit() {
      //elementui编辑方法
      if (!isEmpty(this.tempData)) {
        this.show = true;
        this.$nextTick(() => {
          this.rowdata = this.tempData;
        });
      } else {
        this.$message.warning("请选择至少一条数据");
      }
    },
    addAvue() {
      this.avueAddShow = true;
    },
    editAvue() {
      //avue的编辑方法
      if (!isEmpty(this.tempData)) {
        this.avueShow = true;
        //nextTick函数用于下次dom渲染之后进行加载 为了避免修改时数据直接进入子组件 重置不起作用
        //nextTick等于是window.onload
        this.$nextTick(() => {
          this.rowdata = this.tempData;
        });
      } else {
        this.$message.warning("请选择至少一条数据");
      }
    },
    removeData() {
      //删除方法
      var that = this;
      if (!isEmpty(this.tempData)) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.axios.apiPost({
              url: "/test/deleteData",
              data: { id: this.tempData.id },
              call: function(res) {
                if (res.data.flag) {
                  that.$message.success(res.data.msg);
                  that.refreshChange();
                } else {
                  that.$message.error(res.data.msg);
                }
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message.warning("请选择至少一条数据");
      }
    },
    handleCurrentRowChange(val, oldval) {
      //行选中
      this.tempData = deepClone(val);
    },
    remove() {
      //清除选中状态
      this.$refs.singleTable.setCurrentRow();
    },
    handleRowSave(row, done, loading) {
      //新增保存
      var that = this;
      this.axios.apiPost({
        url: "/test/saveData",
        data: row,
        call: function(res) {
          if (res.data.flag) {
            that.$message.success(res.data.msg);
            that.refreshChange();
            done(); //关闭
          } else {
            that.$message.error(res.data.msg);
          }
        }
      });
    },
    refreshData() {
      //查询
      this.page.dwmc = this.searchForm.dwmc;
      this.page.yhmc = this.searchForm.yhmc;
      this.initPage();
      this.getList();
      this.remove();
    },
    refreshChange() {
      //刷新页面
      //alert(JSON.stringify(this.page)+" "+JSON.stringify(this.searchForm));
      this.init();
      this.getList();
      this.remove();
    },
    init() {
      //初始化数据
      this.searchForm.dwmc = "";
      this.searchForm.yhmc = "";
      delete this.page.dwmc;
      delete this.page.yhmc;
      this.initPage();
    },
    initPage() {
      //初始化page页面必须
      this.pageOption.pageNumber = 1;
      //this.page.currentPage=1;
      //如果要监听数组对象 必须要用这两种方法
      this.page = Object.assign({}, this.page, { currentPage: 1 });
      //this.$set(this.page, 'currentPage', 1)
    },
    showIcon() {
      this.show = true;
    },
    sortChange(column) {
      //自定义排序
      this.page.orderColumn = column.prop;
      this.page.order =
        column.order == null
          ? ""
          : column.order == "ascending"
          ? "asc"
          : "desc";
      this.refreshData();
    },
    download() {
      let url = "/ieasy/fileStoreManagement/downfilebyId";
      let fjid = "5e8653d060444181a8689101477c4114";
      let islocal = "N";
      let loacltable = "4+E6h5AEVLUBWn77VnDSXg==";
      downLoadFile(url, loacltable, islocal, fjid);
    },
    showRy() {
      this.tysqShow = true;
    },
    test(data) {
      alert(JSON.stringify(data));
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    openDw(){
      this.showDw=true;
    }
  }
};
</script>

<style>
.mainDg .avue-crud__menu {
  display: none !important;
}
</style>