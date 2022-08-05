<template>
  <div class="error-page">
    <div class="img">
         <img :src='`img/bg/404.svg`'></img>
    </div>
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在</div>
      <div class="actions">
        <router-link :to="{path:'/'}">
          <el-button type="primary">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error-404",
  data(){
    return{
      publicPath:process.env.BASE_URL
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
