<template>
  <div class="error-page">
    <div class="img"
         style=" background-image: url('img/bg/403.svg');"></div>
    <div class="content">
      <h1>403</h1>
      <div class="desc">{{msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error-403",
  data(){
      return {
          msg:''
      }
  },
  mounted(){
      this.msg = this.$route.query.msg
      if(!this.msg){
          this.msg = "无访问权限";
      }
  }
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
