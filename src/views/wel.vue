<template>
  <div style="height:100%">
    <el-container>
      <el-aside width="130px" style="border-right:2px solid #D2DCE6;">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          >
          <el-menu-item index="2" @click="handleOpen('/wel/index/epidemic_audit')">
            <i class="el-icon-edit"></i>
            <span slot="title" >报备审批</span>
          </el-menu-item>
          <el-menu-item index="3" @click="handleOpen('/wel/index/nucleic_acid')">
            <i class="el-icon-message"></i>
            <span slot="title" >核酸安排</span>
          </el-menu-item>
          <el-menu-item index="4" @click="handleOpen('/wel/index/user_management')">
            <i class="el-icon-tickets"></i>
            <span slot="title" >用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
          <keep-alive :exclude="blackList">
            <router-view name="xxwl"></router-view>
          </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import carousel from "../components/common/carousel";
  import { setStore } from "@/util/store.js";
  export default {
    components: {
      carousel
    },
    name: "wel",
    data() {
      return {
        activeNames: ['1', '2', '3', '5'],
        logActiveNames: ['13'],
        cardStyle:{
          width:"30px"
        },
        blackList:'inBox,outBox,recycleBin,userGroup,draftBox,editMail',
        defaultActive:"2"
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    props:
      ["showHead"]
    ,
    created() {
      this.$nextTick(()=>{
        console.log(this.showHead)
      })
    },
    methods: {
      changeMenu(index){
        this.defaultActive = index+"";
      },
      selectMenuItem(index,path){
      },
      handleChange(val) {
      },
      changeOption(){
      },
      handleOpen(url){
          this.$router.push({
            path:url,
          });
      },
    },
    mounted(){
      /*let src = this.$route.query.src;
      if(src && src =='bgpt'){
        //setStore({name:"showHead",content:false});
        //this.$store.state.showHead = false;
        this.$store.commit("SET_SHOW_HEAD",false);
      }else{
        //setStore({name:"showHead",content:true});
        //this.$store.state.showHead = true;
        this.$store.commit("SET_SHOW_HEAD",true);
      }*/
      let path = this.$route.path;
      if(path == '/wel/index'){
        this.$router.push({
          path:"/wel/index/epidemic_audit",
        });
      }else{
        this.$router.push(this.$route.path);
      }
    }
  };
</script>
<style scoped>
.el-main{
  overflow: hidden;
}
</style>