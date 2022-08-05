<template>
  <LayoutMain>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card" >
        <el-tab-pane label="用户管理" name="first">
           <mainContent></mainContent>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
           <mainContent></mainContent>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">
          <mainContent></mainContent>
        </el-tab-pane>
      </el-tabs>
    </template>
  </LayoutMain>
</template>
<script>
import mainContent from "./formPlugn/main-content";
export default {
  components: {
    mainContent
  },
  data() {
    return {
      activeName: "first"
    }
  },
  created() {
    
  },
  mounted() {
   
  },
  watch: {
   
  },
  computed: {
   
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
.el-tabs,.el-tabs__content,.el-tab-pane{
  height: 95%;
}
</style>