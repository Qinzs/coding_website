<template>
  <div class = "login">
    <el-card class="box-card"	>
      <el-input placeholder="Please input">
      <template #prepend>Account name: </template>
    </el-input>
    <el-input placeholder="Please input">
      <template #prepend>Password: </template>
    </el-input>

  </el-card>
  </div>

</template>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.login {
  align-items: center;
  height: 100%;
}
.box-card {
  width: 50%;
  height: 80%;
  margin: 5% auto;

}
</style>