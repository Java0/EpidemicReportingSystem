<template>
    <el-dialog :center="dialogOp.center" title="测试"  :visible.sync="dialogFormVisible"  @close="distroy">
        <!--父组件传过来的formData 赋值给新值newFormData 如果不赋值控制台会报错 经过努力 avue的方式传值有问题 js会报错 其实没有错 官方插件bug-->
        <avue-form ref="avueForm" v-model="avueFormData" :option="option" :upload-preview="uploadPreview" :upload-before="uploadBefore" >
            <template slot="menuForm">
                <el-button type="primary" @click="submit">提 交</el-button>
                <el-button  @click="canel">取 消</el-button>
            </template>
        </avue-form>
    </el-dialog>
</template>
<script>

 import {downLoadFile,validateFileType} from "@/util/util";
 export default {
    data() {
      return {
        avueFormData:this.formData,
        dialogFormVisible: this.avueShow,
        dialogOp:{
            center : false
        },
        tempFile:{
            label:"",
            value:""
        },
        option:{
            emptyBtn:false,
            submitBtn:false,
            column: [{
                    type: "input",
                    label: "姓名",
                    span: 24,
                    display: true,
                    prop: "yhmc",
                    rules: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },{ 
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur' 
                    }]
                },{
                    type: "input",
                    label: "单位名称",
                    span: 24,
                    display: true,
                    prop: "dwmc"
                },{
                    type: "input",
                    label: "单位编码",
                    span: 24,
                    display: true,
                    prop: "dwbm"
                },{
                    type: "date",
                    label: "时间",
                    span: 24,
                    display: true,
                    prop: "firsttime",
                    format:'yyyy-MM-dd',
                    valueFormat:'yyyy-MM-dd'
                },{
                    type: "upload",
                    label: "上传",
                    tip: '请上传文件',
                    action: "/api/ieasy/fileStoreManagement/uploadfile",
                    span: 24,
                    multiple: true,
                    limit: 1,
                    prop: "upload",
                    propsHttp:{
                        url:"fileUrl",
                        name:"fileName",
                    }
                }
            ],
            labelSuffix: "："
        }
      }
    },
    created() {
       this.initForm();
    },
    mounted(){
         
    },
    props: {
        avueShow: {
            type: Boolean,
            default: false
        },
        formData:{
            type: Object,
            //props default 数组／对象的默认值应当由一个工厂函数返回 意思是如果是一个对象或者数组必须由一个方法返回返回值
            default: ()=>{}
        },
        reFresh:{
            type:Function
        }
    },
    watch: {
        avueShow () {
            //此处是关键
            this.dialogFormVisible = this.avueShow;
        },
        formData(){
            //此处是关键
            this.avueFormData= this.formData;
        }
    },
    methods: {
        uploadBefore(file, done, loading,column){
            let params={};
            params.fileType=file.name.substring(file.name.lastIndexOf('.')+1);
            params.valiDataType=['xls','xlsx','doc'];
            this.tempFile.label=file.name;
            console.log(file,column);
            // let flag=validateFileType(params,this);
            // if(flag){
            //     done(); 
            // }else{
            //     loading();
            // }
            done(); 
        },
        uploadDelete(column,file) {
            console.log(column,file)
            console.log(arguments);
            return this.$confirm(`是否确定移除该选项？`);
        },
        uploadPreview(file,column,done){//预览/下载
            //let url = '/ieasy/fileStoreManagement/vueDownfilebyId';
            downLoadFile("",this.formData.localtable,"N",this.formData.fjid);
            done();//默认执行打开方法
        },
        canel(){
            this.dialogFormVisible=false;
        },
        submit(){
            var that=this;
            this.$refs.avueForm.validate((valid) => {
                if (valid) {
                    this.axios.apiPost({
                        url:'/test/saveData',
                        data:this.avueFormData,
                        call:function(res){
                            if(res.data.flag){
                                that.dialogFormVisible=false;
                                //调用父组件的方法  父组件需要两层
                                that.$message.success(res.data.msg);
                                that.reFresh();
                                that.distroy();
                            }else{
                                that.$message.error(res.data.msg);
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        distroy(){
            //此方法是给父组件传值 如果不初始化则数据打开则为空
            this.$emit('update:avueShow', false);
            //关闭的时候重置
            this.$refs.avueForm.resetFields();
            this.reFresh();
        },
        initForm(){
            this.avueFormData={
                yhmc:"",
                dwmc:"",
                dwbm:"",
                firsttime:"",
                upload:""
            };
            //this.$refs.avueForm.resetFields();
        }
    }
  }
</script>
