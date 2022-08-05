 <template>
    <TableContainer>
        <el-container >
            <!-- 判断是否存在传过来的组件slot aside -->
            <el-aside width="200px" v-if="$slots.aside">
                 <slot name="aside"></slot>
            </el-aside>
            <el-main>
                <el-container >
                    <el-header style="height: auto; font-size: 12px">
                        <div style="text-align: left;float:left">
                            <slot name="left"></slot>
                        </div>
                        <div style="text-align: right;">
                            <slot name="right"></slot>
                        </div>
                    </el-header>
                    <el-main class="mainDg">
                        <slot name="main"></slot>
                    </el-main>
                    <el-footer>
                        <slot name="footer"></slot>
                    </el-footer>
                </el-container>
            </el-main>
        </el-container>
  </TableContainer>
 </template>
 <script>
 export default {
    name: "LayoutMain",
    components: {
    },
    data() {
      return {
        
      };
    },
    computed: {
     
    },
    prop:{
       
    },
    created() {
    },
    methods: {

    }
  };
</script>
