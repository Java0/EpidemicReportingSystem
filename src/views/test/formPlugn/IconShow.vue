<template>
  <div>
     <el-dialog :center="data.center" title=""  :visible.sync="dialogFormVisible"  @close="$emit('update:show', false)">
       <el-form ref="form"  v-model="data.icon"  label-width="80px">
          <el-form-item label="图标">
            <avue-icon-select v-model="data.icon"
                              :icon-list="iconList"
                              placeholder="图标"></avue-icon-select>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>
<script>
import iconList from '@/config/iconList' 
export default {
  name: "config-group",
  data () {
    return {
      data:{
        icon:"el-icon-circle-plus",
        center : false
      },
      dialogFormVisible: this.show,
      iconList: iconList
    }
  },
  watch: {
      show () {
          this.dialogFormVisible = this.show;
      }
  },
  props: {
      show: {
          type: Boolean,
          default: false
      }
  }
}
</script>
<style lang="scss" scoped>
</style>
