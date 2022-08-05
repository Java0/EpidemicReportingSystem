<template>
    <el-dialog :center="dialogOp.center" title="测试"  :visible.sync="dialogFormVisible"  @close="distroy">
        <!--父组件传过来的formData 赋值给新值newFormData 如果不赋值控制台会报错 经过努力 avue的方式传值有问题 js会报错 其实没有错 官方插件bug-->
        <avue-form ref="avueForm" v-model="form" :option="option" :upload-preview="uploadPreview"  :upload-before="uploadBefore" >
            <template slot="menuForm">
                <el-button type="primary" @click="submit">提 交</el-button>
                <el-button  @click="canel">取 消</el-button>
            </template>
        </avue-form>
    </el-dialog>
</template>
<script>

 import {validateFileType} from "@/util/util";
 export default {
    name:"avueTestAddForm",
    data() {
      return {
        dialogFormVisible: this.avueAddShow,
        dialogOp:{
            center : false
        },
        form:{
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
    },
    mounted(){
        
    },
    props: {
        avueAddShow: {
            type: Boolean,
            default: false
        },
        reFresh:{
            type:Function
        }
    },
    watch: {
        avueAddShow () {
            //此处是关键
            this.dialogFormVisible = this.avueAddShow;
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
        uploadPreview(file,column,done){//预览
            console.log("file",file)
            done();//默认执行打开方法
            this.$message.success('自定义查看方法,查看控制台')
        },
        canel(){
            this.dialogFormVisible=false;
            //重置数据无效 this.$refs.avueForm.resetForm();
        },
        submit(){
            var that=this;
            this.$refs.avueForm.validate((valid) => {
                if (valid) {
                    this.axios.apiPost({
                        url:'/test/saveData',
                        data:that.$refs.avueForm.form,
                        call:function(res){
                            if(res.data.flag){
                                that.dialogFormVisible=false;
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
            //此方法是给父组件传值
            this.$emit('update:avueAddShow', false);
            //关闭的时候重置
            this.$refs.avueForm.resetFields();
        }
    }
  }
</script>
