<template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <NavBarPart></NavBarPart>
        </el-header>
        <el-main>
          <router-view></router-view> <!-- 这里嵌套路由视图 -->
        </el-main>
       <el-footer>
           <footerpart></footerpart>
       </el-footer>
      </el-container>
    </div>
  </template>
  <script lang="ts">
  import NavBarPart from './NavBarPart.vue';  
  import footerpart from './FooterBarPart.vue';
    export default {
        components: {
        NavBarPart,
        footerpart
        }
    }
    </script>
    <style >
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.common-layout {
  height: 100%;
}
.common-layout .el-container {
    height: 100%;
    }
    .common-layout .el-header {
    padding: 0;
    height: 8%;  
}

.common-layout .el-main {
    background-color: #eef1f6;
    height: 72%;  
    padding: 0;
    overflow: hidden;
}

.common-layout .el-footer {
    height: 20%;  
    padding: 0;
}
    </style>

  