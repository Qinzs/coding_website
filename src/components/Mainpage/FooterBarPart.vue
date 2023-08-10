<template>
    <div class="footer-container">
      <!-- 第一部分 -->
      <div class="part-one">
        <el-icon><Cpu /></el-icon>
        <div class="column1">
            <!-- 倒入一个叫做masaike的图片,size调整为这个column的80px -->
            <div class = "logo_picture">
            <img src="../../assets/masaike.jpeg" alt="masaike" width="200px" height="80px">
            </div>
        </div>
        <div class="column">
            <h3>For users</h3>
            <p>Users Item</p>
            <p>Privacy Policy</p>
            <p>Bug Bounty</p>
        </div>
        <div class="column">
            <h3>For Commerces</h3>
            <p>Commerce Cooperation</p>
            <p>Product Promotion</p>
        </div>
        <div class="column">
            <h3>King of Code</h3>
            <p>community</p>
        </div>
      </div>
      <!-- 第二部分 -->
      <div class="part-two">
        2023 king of Code. All right reserved      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'FooterComponent',
  });
  </script>
  
  <style scoped>
  .footer-container {
    display: flex;
    flex-direction: column; /* 使子元素沿垂直方向排列 */
    height: 100%; /* 使 footer 占满其父元素的高度 */
  }
  
  .part-one {
    flex: 0 0 85%; /* 占据 85% 的高度 */
    display: flex; /* 使用 flexbox 布局来创建四列 */
  }
  
  .part-two {
    flex: 0 0 10%; /* 占据 10% 的高度 */
  }
  
  /* 第一列占 40% 的宽度 */
  .column1 {
    flex: 0 0 40%;
  }
  
  /* 其他列各占 20% 的宽度 */
  .column {
    flex: 0 0 20%;
  }
  /* logo_picture有margin top */
    .logo_picture{
        margin-top: 7%;
    }
  </style>
  