<template>
  <div class="avue-sidebar left-box">
    <!--<logo></logo>-->
    <el-scrollbar style="height:100%">
        <div v-if="validatenull(menu)"
            class="avue-sidebar--tip">{{$t('menuTip')}}</div>
        <el-menu unique-opened
                :default-active="nowTagValue"
                mode="vertical"
                :show-timeout="200"
                :collapse="false">
          <sidebar-item :menu="menu"
                        :screen="screen"
                        first
                        :props="website.menu.props"
                        :collapse="false"></sidebar-item>
        </el-menu>

      <!--<el-drawer
          title="我是标题"
          :visible.sync="drawer"
          :with-header="false"
          direction="ltr">
        <span>我来啦!</span>
      </el-drawer>-->
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logo from "../logo";
import sidebarItem from "./sidebarItem";
import {Drawer} from 'element-ui';
export default {
  name: "sidebar",
  components: { sidebarItem, logo },
  data() {
    return { 
      drawer: false
    };
  },
  created() {
    this.$store.dispatch("GetMenu").then(res => {
        if (res.length === 0) return;
        this.$router.$avueRouter.formatRoutes(res, true);
    }).catch( err => {
        console.log(err);
    })
  },
  computed: {
    ...mapGetters(["website", "menu", "tag", "keyCollapse", "screen"]),
    nowTagValue: function() {
      return this.$router.$avueRouter.getValue(this.$route);
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.left-box{
  box-shadow:0px 0px 0px !important;
  padding-top: 20px !important;
}
</style>

