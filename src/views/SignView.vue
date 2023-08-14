<template>
  <div class = "login">
  <el-card class="box-card">
    <div style="height: 50%; margin-bottom: 3.5%; font-weight: bold; font-size: 24px;">Create an account</div>

    <el-form
    label-width="100px"
    style="max-width: 460px; margin: 0 0 0 10%;"
    
  >
    <el-form-item>
      <el-input placeholder="Enter you Username"  />
    </el-form-item>
    <el-form-item>
      <el-input placeholder="Enter you email" />
    </el-form-item>
    <el-form-item >
      <el-input  placeholder="Enter you phone number"/>
    </el-form-item>
    <el-form-item>
      <el-input     v-model="input1"
    type="password" placeholder="Enter you password"     show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size = "large" style="margin: auto
      ;">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        Sign up
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </el-button>
    </el-form-item>
  </el-form>
  <el-divider border-style="dashed"> </el-divider>  
  <el-button type="">
    <el-icon class="is-loading">
      <ChromeFilled />
    </el-icon>
    &nbsp;&nbsp;Sign in with Google</el-button>
    <div style="margin-top: 10px; margin-bottom: 10px;">
    <el-text tag="ins" class="custom-link">
      Already have account? 
      <a @click="goToLogin">
        Login now
      </a>
     
    </el-text>
    </div>
</el-card>
  </div>

</template>
<script lang="ts" setup>
import { ChromeFilled } from '@element-plus/icons-vue'
import {  ref} from 'vue'
import { useRouter } from 'vue-router';
  const $router = useRouter();
const input1 = ref('')
//点击后转到login页,创建一个函数
const goToLogin = () => {
  $router.push({ name: 'login' })
}
</script>
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
  overflow: hidden;
}
.box-card {
  width: 50%;
  height: 80%;
  margin: 3% auto;
  border-radius: 15px; 

}
.custom-link  {
  /* 下划线 */
  text-decoration  : none;

    color: inherit; /* 使用默认颜色，或者你可以设置为你想要的颜色 */
    cursor: pointer; /* 鼠标悬浮时显示为手指形状 */
}

.custom-link a {
    text-decoration: none; /* 去掉下划线 */
    color: #409eff
}

</style>