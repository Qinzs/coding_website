<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <!-- <router-link :to="{name: 'home'}">LOGO</router-link> -->
logo
        </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="home">
        Home
        </el-menu-item>
      <el-menu-item index="community">
        Community
        </el-menu-item>
  
      <el-menu-item index="matchhistory">
        Match History
      </el-menu-item>
  
      <el-menu-item index="sign">
        Sign
      </el-menu-item>
      <el-menu-item index="login">
        Login
      </el-menu-item>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
// import { useStore } from "vuex";
import { useRouter } from 'vue-router';
  const activeIndex = ref('1')
  const $router = useRouter();
  const handleSelect = (key: string, keyPath: string[]) => {
    //跳转到对应的页面
    //如果key是0，也跳转到home页面
    if (key === '0') {
      key = 'home'
    }
    console.log(key, keyPath)
    $router.push({ name: key });
  }
        // const store = useStore();

        // const logout = () => {
        //     store.dispatch("logout");
        // }


  </script>
  
  <style>
  /*  */
  .flex-grow {
    flex-grow: 1;
  }
 a, a.-webkit-any-link 
 {
  text-decoration: none;
}
/* 让el-menu-demo的height为100% */
.el-menu-demo {
  height: 100%;
}

  </style>
  