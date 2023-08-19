<template>
  <div class = "container">
    <el-row :gutter="20">
    <el-col :span="8">
      <el-card shadow="always"> Search Rank </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover"> Friend Pk </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="never"> Practice </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script lang="ts">
</script>
<style scoped>
.container {
  margin-top: 20px;
  width: auto;
  height: 100%;
}
/* 修改el-row的高度 */
.el-row {
  height: 100%;
}
.el-card {
  margin-top: 10%;
  height: 30%;
}
</style>