<template>
  <div class="avue-top padding-top">
    <!--<div class="top-bar__left">
      <div class="avue-breadcrumb"
           :class="[{ 'avue-breadcrumb--active': isCollapse }]"
           v-if="showCollapse">
        <i class="icon-navicon"
           @click="setCollapse"></i>
      </div>
    </div>-->
    <div class="top-bar__title peding-left">
      <!--<div class="top-bar__item top-bar__item--show"
           v-if="showMenu">
        <top-menu></top-menu>
      </div>-->
      <span class="top-bar__item">
          <toTitle></toTitle>
      </span>
      <!-- <span class="top-bar__item"
            v-if="showSearch">
       <topSearch></topSearch>
      </span>-->
    </div>
    <div class="top-bar__right">
       <!-- <el-tooltip v-if="showSearch"
                  effect="dark"
                  :content="$t('navbar.search')"
                  placement="bottom">
        <div class="top-bar__item">
          <topSearch></topSearch>
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip v-if="showColor"
                  effect="dark"
                  :content="$t('navbar.color')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-color></top-color>
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip v-if="showDebug"
                  effect="dark"
                  :content="logsFlag?$t('navbar.bug'):logsLen+$t('navbar.bugs')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-logs></top-logs>
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip v-if="showLock"
                  effect="dark"
                  :content="$t('navbar.lock')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-lock></top-lock>
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip v-if="showTheme"
                  effect="dark"
                  :content="$t('navbar.theme')"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme></top-theme>
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip effect="dark"
                  :content="$t('navbar.language')"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-lang></top-lang>
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip v-if="showFullScren"
                  effect="dark"
                  :content="isFullScren?$t('navbar.screenfullF'):$t('navbar.screenfull')"
                  placement="bottom">
        <div class="top-bar__item">
          <i :class="isFullScren?'icon-tuichuquanping':'icon-quanping'"
             @click="handleScreen"></i>
        </div>
      </el-tooltip> -->
      <!-- <img class="top-bar__img" src="favicon.png"> -->
      <div style="height:50px;padding-right:5px;">
          <i class="el-icon-user-solid" style="display: block;margin: 0 auto;width: 30px;line-height: 30px;"></i>
        <div style="font-size: 14px;">
          {{userInfo.yhxm}}

        </div>
      </div>
      <!-- 头像 <img class="top-bar__img" :src="userInfo.avatar">-->
      
    </div>

  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/util/util";
import topLock from "./top-lock";
import topMenu from "./top-menu";
import topSearch from "./top-search";
import topTheme from "./top-theme";
import topLogs from "./top-logs";
import topColor from "./top-color";
import topLang from "./top-lang";
import toTitle from "./top-title";
//自定义标签中 camelCased (驼峰式) 命名与 kebab-case（短横线明明） 上述标签中 topSearch======>top-search
export default {
  components: {
    topLock,
    topMenu,
    topSearch,
    topTheme,
    topLogs,
    topColor,
    topLang,
    toTitle
  },
  name: "top",
  data() {
    return {};
  },
  filters: {},
  created() {},
  mounted() {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapState({
      showDebug: state => state.common.showDebug,
      showTheme: state => state.common.showTheme,
      showLock: state => state.common.showLock,
      showFullScren: state => state.common.showFullScren,
      showCollapse: state => state.common.showCollapse,
      showSearch: state => state.common.showSearch,
      showMenu: state => state.common.showMenu,
      showColor: state => state.common.showColor
    }),
    ...mapGetters([
      "userInfo",
      "isFullScren",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag",
      "website"
    ])
  },
  methods: {
    handleScreen() {
      fullscreenToggel();
    },
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    logout() {
      this.$confirm(this.$t("logoutTip"), this.$t("tip"), {
        confirmButtonText: this.$t("submitText"),
        cancelButtonText: this.$t("cancelText"),
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.top-bar__item{
  float: left;
}
.peding-left{
  padding: 0 0px;
}
.padding-top{
   padding: 0 0px;
}
</style>
