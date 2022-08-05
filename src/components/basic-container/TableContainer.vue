<template>
  <div class="table-container">
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TableContainer"
};
</script>

<style lang="scss">
.table-container {
  padding: 10px 6px;
  border-radius: 10px;
  height:100%;
  box-sizing: border-box;
  .el-card {
    width: 100%;
    height:100%;
  }
  .el-card__body {
    height:100%;
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>
