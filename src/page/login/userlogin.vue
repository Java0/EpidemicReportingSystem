<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="yhid">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.yhid"
                auto-complete="off"
                :placeholder="yhid">
        <i slot="prefix"
           class="icon-yonghu"></i>
      </el-input>
    </el-form-item>

    <el-form-item prop="yhkl">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="loginForm.yhkl"
                auto-complete="off"
                :placeholder="yhkl">
        <i class="el-icon-view el-input__icon"
           slot="suffix"
           @click="showPassword"></i>
        <i slot="prefix"
           class="icon-mima"></i>
      </el-input>
    </el-form-item>

    <el-form-item >
      <el-select size="small" v-model="loginForm.domain" auto-complete="off" placeholder="请选择" style="width:100%">
          <i slot="prefix" class="icon-yonghu"></i>
          <el-option
            v-for="item in options"
            :key="item.domain"
            :label="item.label"
            :value="item.domain">
          </el-option>
        </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin"
                 class="login-submit">{{$t('login.submit')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapGetters } from "vuex";
  import website from '@/config/website';
 
  const pbkey = process.env.VUE_APP_PUBKEYHEX;
  export default {
    name: "userlogin",
    data() {
      return {
        options: [{
          domain: 'tlm',
          label: '塔里木'
        }, {
          domain: 'txn',
          label: '塔西南'
        }, {
          domain: 'ptr',
          label: '乙方单位'
        }],
       
        yhid:"请输入用户名",
        yhkl:"请输入密码",
        tenantMode: website.tenantMode,
        loginForm: {
          yhid: "admin",
          yhkl: "123qwe",
          domain:"tlm",//下拉默认值
          type: "account"
        },
        loginRules: {
          yhid: [
            { required: true, message: "请输入用户名", trigger: "blur" }
          ],
          yhkl: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 1, message: "密码长度最少为6位", trigger: "blur" }
          ],
          domain: [
            { required: true, message: "请选择域代码", trigger: "blur" }
          ],
        },
        passwordType: "password",
        //私钥用于后台解密 写后台时加上 privateKey: "56C5DCE830CA2BF0591DD44E19054BA16434F159ECFB3AE2351251749E1C3413"
        //公钥可以从env中获取
        pubkeyHex:"042930E8F81C22F17ECD5A2332922448DD626F49D8A2B365BD45B97EF233A6180E6DCA15CDC9FD0321415AD0FCB848F940B1CA867ACEC6CC3E0EC2B70D95BCDEF6"
      };
    },
    created() {},
    mounted() {},
    computed: {
      ...mapGetters(["tagWel"])
    },
    props: [],
    methods: {
      showPassword() {
        this.passwordType == ""
          ? (this.passwordType = "password")
          : (this.passwordType = "");
      },
      handleLogin() {
        console.log('ssss');
        this.$router.push({ path: '/wel/index' });
        return;
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '登录中,请稍后。。。',
              spinner: "el-icon-loading"
            });
            let loginObj = JSON.parse(JSON.stringify(this.loginForm));
            var smutil = new SMutil();
            loginObj.yhid = smutil.sm2encrypt(Hex.utf8StrToHex(this.loginForm.yhid), this.pubkeyHex);
            loginObj.yhkl = smutil.sm2encrypt(Hex.utf8StrToHex(this.loginForm.yhkl), this.pubkeyHex);
            this.$store.dispatch("LoginByUsername", loginObj).then((res) => {
              if(res.data.msg=="succeed"){
                this.$router.push({ path: this.tagWel.value });
              }else{
                  this.$message({
                    type: "error",
                    message: "登陆出错 "+res.data.msg
                });
              }
              loading.close();
            }).catch(() => {
              loading.close();
            });
          }
        });
      },
      test(){
        var that=this;
        this.axios.apiPost({
            url:'/api/blade-user/update',
            data:{},
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
      }
    }
  };
</script>

<style>
.domain_class{
  width:100% !important;
}
</style>
