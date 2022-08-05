<template>
  <div>
    <HttpIframe :routerPath="routerPath"></HttpIframe>
  </div>
</template>
<script>
 export default {
    name: "test1",
    components: {
    },
    data() {
      return {
        routerPath:'http://10.79.0.207/pc/niaosu-sc.html?stylef=sA11&orgid=Jv5kIQXJTU&gnbm=YQSCFXJC.LXFX.nsrscfx'
      };
    },
    computed: {
     
    },
    created() {
    },
    methods: {

    }
  };
</script>