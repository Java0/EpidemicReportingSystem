<template>
  <div>
    <basic-container>
      <avue-tabs :option="option"
                 v-model="form"
                 @change="handleChange"
                 @submit="handleSubmit"
                 :upload-preview="uploadPreview">
     
     </avue-tabs>
    </basic-container>
     <el-button @click="test">自定义按钮</el-button>
  </div>
</template>

<script>
  import option from "@/data/user/info";
  import {update, updatePassword} from "@/api/system/user";
 
 //import $ from 'jquery' ;

  export default {
    data() {
      return {
        type: "info",
        option: option,
        form: {}
      };
    },
    created() {
      this.handleWitch();
    },
    methods: {
      handleSubmit() {
        if (this.type === "info") {
          update(this.form).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "修改信息成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
        } else {
          updatePassword(this.form.oldPassword, this.form.newPassword, this.form.newPassword1).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "修改密码成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
        }
      },
      handleWitch() {
        if (this.type === "info") {
            //用户姓名存在store中
            const user=this.$store.getters.userInfo;
            this.form = {
              id:user.yhid,
              name: user.yhxm,
              realName:  user.yhxm,
              email:user.email
            }
        }
      },
      handleChange(item) {
        this.type = item.prop;
        this.handleWitch();
      },
      uploadPreview(file,column){
        console.log(file,column);
        this.$message.success('自定义查看方法,查看控制台')
      },
      test(){
        var that=this;
        this.axios.apiPost({
            url:'/api/blade-user/update',
            data:{page: 1},
            call:function(res){
                if (res.data.status === 200) {
                  that.form ={
                        id: res.data.msg,
                        avatar: res.data.msg,
                        name: res.data.msg,
                        realName: res.data.msg,
                        phone: res.data.msg,
                        email: res.data.msg
                    };
                }
            }
        });
        //如果需要队表单进行赋值需要在外面进行 或者把this只想其他对象
        /*var data_str={};
        var that=this;
        $.ajax({
          url:'/api/blade-user/update',//地址
          data:{id:'11',name:"123123"},
          dataType:'json',//数据类型
          type:'post',//类型
          timeout:2000,//超时
          success:function(data,status){
            that.form ={
                  id: data.msg,
                  avatar: data.msg,
                  name: data.msg,
                  realName: data.msg,
                  phone: data.msg,
                  email: data.msg
            };
          }
        });
        */
      }
    }
  };
</script>

<style>
</style>
