<template>
  <div class = "login">
  <el-card class="box-card">
    <div style="height: 50%; margin-bottom: 4%; font-weight: bold; font-size: 24px; text-align: center;">Login to your account</div>
    <div style=" margin-bottom: 0%;">

  </div>
  <el-divider border-style="dashed"> </el-divider>  
  <!-- 让el-form居中 -->
    <el-form
    label-width="100px"
    style="max-width: 460px; margin: 0 0 0 10%;"
    
  >
    <el-form-item label="username">
      <el-input v-model="loginForm.username" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="loginForm.password" type="password" />
    </el-form-item>
    <el-form-item prop="type">
      <div style="margin-right: auto;">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="Remember me" name="type" />
      </el-checkbox-group>
      </div>
      <el-button key="plain"
      type="" text @click = "resetpass">Forget password</el-button>

    </el-form-item>
    <el-form-item>
      <el-button type="primary"  style="background-color: #409eff;" size = "large" @click="handleLogin">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>

    </el-form-item>
  </el-form>
</el-card>
  </div>

</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

  const $router = useRouter();
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
const resetpass = () => {
  $router.push({ name: 'findpass' })
}
const store = useStore();

// 添加登录表单的接口
interface LoginForm {
    username: string
    password: string
}

const loginForm = reactive<LoginForm>({
    username: '',
    password: ''
});

// 修改handleLogin函数，让其实现真正的登录逻辑
const handleLogin = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: loginForm.username,
                password: loginForm.password
            })
        });

        if (response.ok) {
            const data = await response.json();
            // 如果登录成功，调用Vuex action来保存用户信息
            store.dispatch('loginUser', {
                id: data.id,
                name: data.username.trim(),
                email: data.email.trim(),
                lastLoginDate: data.lastLoginDate
            });
            
            $router.push({ name: 'profile' }); // 假设登录成功后要跳转到dashboard路由
        } else {
            console.error('Login failed:', await response.text());
        }
    } catch (error) {
        console.error('Failed to login:', error);
    }
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
</style>