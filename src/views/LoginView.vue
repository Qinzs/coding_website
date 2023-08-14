<template>
  <div class = "login">
  <el-card class="box-card">
    <div style="height: 50%; margin-bottom: 20%; font-weight: bold; font-size: 24px;">Login to your account</div>
    <svg t="1691998345324" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2426" width="32" height="32"><path d="M5.500256 64.110386m172.778403 0l614.32321 0q172.778403 0 172.778402 172.778403l0 614.32321q0 172.778403-172.778402 172.778402l-614.32321 0q-172.778403 0-172.778403-172.778402l0-614.32321q0-172.778403 172.778403-172.778403Z" fill="#FFFFFF" p-id="2427"></path><path d="M651.211543 624.488339L484.681959 940.96078a394.107537 394.107537 0 0 1-331.158605-607.60405l172.461642 305.414624z" fill="#539E55" p-id="2428"></path><path d="M493.461375 363.63137L844.824269 383.200553C933.339923 582.009967 840.270198 813.858663 641.460784 902.374317A451.978703 451.978703 0 0 1 479.908332 941.067846l170.689916-316.327115z" fill="#F1BF45" p-id="2429"></path><path d="M328.279109 643.561155l-174.842145-310.146832c118.525984-182.521185 364.08249-237.5991 546.594076-119.073116a394.510686 394.510686 0 0 1 144.893888 169.034871l-351.028121-19.648744z" fill="#D44F3E" p-id="2430"></path><path d="M485.440264 544.050394m-182.377203 0a182.377203 182.377203 0 1 0 364.754406 0 182.377203 182.377203 0 1 0-364.754406 0Z" fill="#FFFFFF" p-id="2431"></path><path d="M351.057062 548.849794a139.182602 134.383202 90 1 0 268.766404 0 139.182602 134.383202 90 1 0-268.766404 0Z" fill="#467EE6" p-id="2432"></path></svg>  <el-form
    label-width="100px"
    
    style="max-width: 460px"
  >
    <el-form-item label="Email">
      <el-input  />
    </el-form-item>
    <el-form-item label="Password">
      <el-input  />
    </el-form-item>
    <el-form-item prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="Remember me" name="type" />
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</el-card>
  </div>

</template>
<script lang="ts" setup>
import { reactive } from 'vue'
interface RuleForm {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
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
}
.box-card {
  width: 50%;
  height: 80%;
  margin: 5% auto;

}
</style>