 <template>
  <el-header style="height: auto; font-size: 12px">
      <div style="text-align: left;float:left">
          <slot name="left"></slot>
      </div>
      <div style="text-align: right;">
          <slot name="right"></slot>
      </div>
  </el-header>
 </template>
 <script>
 export default {
    name: "LayoutHeader",
    components: {
    },
    data() {
      return {
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
