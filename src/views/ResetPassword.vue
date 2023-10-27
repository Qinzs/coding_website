<template>
  <div class="reset-password">
    <el-card class="box-card">
      <h1 style="height: 50%; margin-bottom: 4%; font-weight: bold; font-size: 24px;">Reset your password</h1>

      <el-form label-width="100px" style="max-width: 500px; margin: 0 0 0 10%;">

        <el-form-item label="Email">
          <el-input v-model="resetForm.email" placeholder="Enter your registered email" />           
          <el-button type="primary" style="background-color: #409eff;"  size="small" @click="handleSend">Send email code</el-button>

        </el-form-item>
        <el-form-item label="Email code">
          <el-input type="password" v-model="verfycode" placeholder="Enter your received code" />
        </el-form-item>
        <el-form-item label="">
          <el-input type="password" v-model="resetForm.newPassword" placeholder="Enter new password" />
        </el-form-item>

        <el-form-item label="">
          <el-input type="password" v-model="resetForm.confirmPassword" placeholder="Confirm new password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" @click="handleReset" style="background-color: #409eff;" >Reset Password</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive,ref} from 'vue'; // Removed the 'ref' import
  import { ElMessage } from 'element-plus'

  interface ResetForm {
    email: string;
    newPassword: string;
    confirmPassword: string;
  }
  const verfycode = ref('');
  const resetForm = reactive<ResetForm>({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });



  let currentstatus = ref(0);
  const handleSend = async () => {
    try {
        const response = await fetch('http://localhost:3000/forget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: resetForm.email })
        });

        const data = await response.text(); // 使用.text()方法来处理纯文本响应
        console.log(data); 

        if(data === "OK") {
            // 处理成功的情况
            open7();
            console.log("Email sent successfully.");
            currentstatus.value = 1;
        } else {
            // 处理用户不存在的情况
            open4();
            console.error("User not found.");
        }

    } catch (error) {
      open4();
        console.error('Error sending reset password request:', error);
    }
}
const handleReset = async () => {
    try {
        // 首先，验证邮箱验证码
        let response = await fetch('http://localhost:3000/digitCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Code: verfycode.value })
        });

        let data = await response.text();

        if (data !== "Right code") {
          open8();
            console.error("Wrong verification code.");
            return; // 如果验证码错误，中断函数执行
        }

        // 验证码正确，接着调用/resetPassword接口
        response = await fetch('http://localhost:3000/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Password: resetForm.newPassword })
        });

        data = await response.text();

        if (data === "OK") {
          open6( );
            console.log("Password reset successfully.");
        } else {
          open5();
            console.error("Failed to reset password.");
        }

    } catch (error) {
      open5();
        console.error('Error during the reset process:', error);
    }
}
const open4 = () => {
  ElMessage({
    showClose: true,
    message: 'Error sending reset password request',
    type: 'error',
  })
}
const open5 = () => {
  ElMessage({
    showClose: true,
    message: 'Error sending reset password request',
    type: 'error',
  })
}
const open8 = () => {
  ElMessage({
    showClose: true,
    message: 'Error sending code',
    type: 'error',
  })
}
const open6 = () => {
  ElMessage({
    showClose: true,
    message: 'reset success.',
    type: 'success',
  })
}
const open7 = () => {
  ElMessage({
    showClose: true,
    message: 'send success.',
    type: 'success',
  })
}
// 使用示例：
// handleSend('example@example.com');


// 使用示例：
// handleSend('example@example.com');

</script>


<style scoped>
  .reset-password {
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
