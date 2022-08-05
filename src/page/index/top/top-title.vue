<template>
    <div class="top-bar__toptitle">
        <img src="img/bg/icon-tantu-white.png"
        width="50" style="vertical-align: middle;margin:6px 10px 0px 18px;"
        alt="">
        
        <span class="top_title">{{website.topTitle}}</span>
    </div>  
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "topTitle",
  data() {
    return {};
  },
  computed: {
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
};
</script>
<style lang="scss" scoped>
.top-bar__toptitle{
    position: relative;
    height: 50px;
    //line-height:50px;
    margin: 0px 100px 0px 0px;
    font-size: 20px;
    font-family: 微软雅黑;
    color: rgb(252, 252, 252);
    font-weight: 600;
}
.top_title{
    align-self:center;
    //font-size:30px;
    display: inline-block;
    vertical-align: middle;
    margin-top:12px;
}
</style>
