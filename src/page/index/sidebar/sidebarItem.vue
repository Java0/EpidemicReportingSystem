<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <!--没有子菜单-->
      <el-menu-item v-if="validatenull(item[childrenKey]) && vaildRoles(item)"
                    :index="item[idKey]+''"
                    @click="open(item)"
                    :key="item[labelKey]"
                    :class="{'is-active':vaildAvtive(item)}">
        <i :class="item[iconKey]"></i>
        <!-- <SvgIcon :iconClass="item[iconKey]"></SvgIcon> -->
        <span slot="title"
              :alt="item[pathKey]" >{{generateTitle(item)}}</span>
      </el-menu-item>
       <!--有子菜单-->
      <el-submenu v-else-if="!validatenull(item[childrenKey])&&vaildRoles(item)"
                  :index="item[idKey]+''"
                  :key="item[labelKey]">
        <template slot="title">
          <i :class="item[iconKey]"></i>
          <!-- <SvgIcon :iconClass="item[iconKey]"></SvgIcon> -->
          <span slot="title"
                :class="{'el-menu--display':collapse && first}">{{generateTitle(item)}}</span>
        </template>
        <template v-for="(child,cindex) in item[childrenKey]">
           <!--此处循环子目录的根目录-->
          <el-menu-item :index="child[idKey]+'',cindex"
                        @click="open(child)"
                        :class="{'is-active':vaildAvtive(child)}"
                        v-if="validatenull(child[childrenKey])"
                        :key="child[labelKey]">
            <i :class="child[iconKey]"></i>
            <!-- <SvgIcon :iconClass="child[iconKey]"></SvgIcon> -->
            <span slot="title">{{generateTitle(child)}}</span>
          </el-menu-item>
          <!--此处相当于递归-->
          <sidebar-item v-else
                        :menu="[child]"
                        :key="cindex"
                        :props="props"
                        :screen="screen"
                        :collapse="false"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { validatenull } from "@/util/validate";
import config from "./config.js";
export default {
  name: "sidebarItem",
  data() {
    return {
      config: config
    };
  },
  props: {
    menu: {
      type: Array
    },
    screen: {
      type: Number
    },
    first: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => {
        return {};
      }
    },
    collapse: {
      type: Boolean,
      default:false
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["roles"]),
    idKey() {
      return this.props.id || this.config.propsDefault.id;
    },
    labelKey() {
      return this.props.label || this.config.propsDefault.label;
    },
    pathKey() {
      return this.props.path || this.config.propsDefault.path;
    },
    iconKey() {
      return this.props.icon || this.config.propsDefault.icon;
    },
    childrenKey() {
      return this.props.children || this.config.propsDefault.children;
    },
    nowTagValue() {
      return this.$router.$avueRouter.getValue(this.$route);
    }
  },
  methods: {
    generateTitle(item) {
      return this.$router.$avueRouter.generateTitle(
         item.label,
        (item.meta || {}).i18n
      );
    },
    vaildAvtive(item) {
      const groupFlag = (item["group"] || []).some(ele =>
        this.$route.path.includes(ele)
      );
      return this.nowTagValue === item[this.pathKey] || groupFlag;
    },
    vaildRoles(item) {
      item.meta = item.meta || {};
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true;
    },
    validatenull(val) {
      return validatenull(val);
    },
    open(item) {
      if (this.screen <= 1) this.$store.commit("SET_COLLAPSE");
      this.$router.$avueRouter.group = item.group;
      this.$router.$avueRouter.meta = item.meta;
      this.$router.push({
          path: this.$router.$avueRouter.getPath({
            name: item[this.labelKey],
            src: item[this.pathKey],
            i18n: (item.meta || {}).i18n
          }),
          query: item.query
      });
    },
    openMenu(item) {
      this.$store.dispatch("GetMenu", item.id).then(data => {
        if (data.length !== 0) {
          //这里逻辑需要修改一下 查找到的data 经过处理后 直接往item的children中设置 就可以达到动态路由
          this.$router.$avueRouter.formatRoutes(data, false);
        }
      });
    }
  }
};
</script>

