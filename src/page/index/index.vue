<template>
  <div class="avue-contail"
       :class="{'avue--collapse':isCollapse}">
       <!-- <screenshot></screenshot> -->
       
    <div class="avue-header left-top" ref="headerDiv" v-if="showHead">
        <!-- 顶部导航栏 -->
        <top />
        <!-- 顶部标签卡 -->
        <!-- <tags /> -->
      </div>

    <div class="avue-layout">
      
      <!-- <div class="avue-left menu-left"> -->
        <!-- 左侧导航栏 左侧导航栏 放大缩小有问题 要调试一下-->
        <!-- <sidebar /> -->
        
      <!-- </div> -->
      <div class="avue-main">
        
        <!-- 主体视图层 -->
        <el-scrollbar style="height:100%">
          <keep-alive>
            <router-view class="avue-view"
                         v-if="$route.meta.keepAlive"  />
          </keep-alive>
          <router-view class="avue-view"
                       v-if="!$route.meta.keepAlive" />
        </el-scrollbar>

      </div>
    </div>
    <!-- <el-footer class="avue-footer">
      <img src="/svg/logo.svg"
           alt=""
           class="logo">
      <p class="copyright">© 2018 Avue designed by smallwei</p>
    </el-footer> -->
    <div class="avue-shade"
         @click="showCollapse"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tags from "./tags";
import top from "./top/";
import sidebar from "./sidebar/";
import admin from "@/util/admin";
import screenshot from './screenshot';
// import { validatenull } from "@/util/validate";
// import { calcDate } from "@/util/date.js";
import { getStore } from "@/util/store.js";
export default {
  components: {
    top,
    tags,
    sidebar,
    screenshot
  },
  name: "index",
  data() {
    return {
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: "",
      
    };
  },
  created() {
    //实时检测刷新token
    this.refreshToken();
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters(["isLock", "isCollapse", "website","showHead"]),
    
  },
  methods: {
    showCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    // 屏幕检测
    init() {
      this.$store.commit("SET_SCREEN", admin.getScreen());
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit("SET_SCREEN", admin.getScreen());
        }, 0);
      };
    },
    // 10分钟检测一次token
    refreshToken() {
      /*this.refreshTime = setInterval(() => {
        const token = getStore({
          name: "token",
          debug: true
        });
        const date = calcDate(token.datetime, new Date().getTime());
        if (validatenull(date)) return;
        if (!(date.seconds >= this.website.tokenTime) && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch("RefeshToken")
            .then(() => {
              this.refreshLock = false;
            })
            .catch(() => {
              this.refreshLock = false;
            });
        }
      }, 10000);*/
    }
  }
};
</script>
<style scoped>
.menu-left{
  top: 104px;
  position:absolute !important;
  bottom: -10px;
}
.left-top{
  padding-left: 0px !important;
}
</style>
