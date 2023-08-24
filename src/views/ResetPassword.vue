<template>
  <div class="reset-password">
    <el-card class="box-card">
      <h1 style="height: 50%; margin-bottom: 4%; font-weight: bold; font-size: 24px;">Reset your password</h1>

      <el-form label-width="100px" style="max-width: 460px; margin: 0 0 0 10%;">

        <el-form-item label="Email">
          <el-input v-model="resetForm.email" placeholder="Enter your registered email" />
        </el-form-item>

        <el-form-item label="New Password">
          <el-input type="password" v-model="resetForm.newPassword" placeholder="Enter new password" />
        </el-form-item>

        <el-form-item label="Confirm Password">
          <el-input type="password" v-model="resetForm.confirmPassword" placeholder="Confirm new password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" @click="handleReset">Reset Password</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'; // Removed the 'ref' import

  interface ResetForm {
    email: string;
    newPassword: string;
    confirmPassword: string;
  }

  const resetForm = reactive<ResetForm>({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleReset = () => {
    // TODO: Implement the logic for resetting the password
    // For now, it just logs the form data
    console.log(resetForm);
  }
</script>


<style scoped>
  .reset-password {
    align-items: center;
    height: 100%;
    overflow: hidden;
  }

  .box-card {
    width: 50%;
    height: 60%;
    margin: 3% auto;
    border-radius: 15px;
  }
</style>
