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
  
    <!-- Show when NOT logged in -->
    <el-menu-item v-if="!isLogged" index="sign">Sign</el-menu-item>
    <el-menu-item v-if="!isLogged" index="login">Login</el-menu-item>

    <!-- Show when logged in -->
    <el-menu-item v-if="isLogged" index="chat">Chat</el-menu-item>
    <el-menu-item v-if="isLogged" index="profile">Profile</el-menu-item>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref,watch } from 'vue'
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
  const activeIndex = ref('1')
  const $router = useRouter();
  const store = useStore();
  const isLogged = ref(store.getters.isUserLoggedIn);  // 初始化为 Vuex store 中的状态

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

// 监听 Vuex store 中的登录状态，并同步更新到 isLogged
watch(() => store.getters.isUserLoggedIn, newValue => {
  isLogged.value = newValue;
});
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
  