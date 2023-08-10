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
        <router-link :to="{name: 'home'}">LOGO</router-link>

        </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="1">
        <router-link :to="{name: 'home'}">Home</router-link>
        </el-menu-item>
      <el-menu-item index="2">
        <router-link  :to="{name: 'community'}" >Community</router-link>     
        </el-menu-item>
  
      <el-menu-item index="3">
        <router-link  :to="{name: 'community'}" > Match History</router-link>     
      </el-menu-item>
  
      <el-menu-item index="4">
        <router-link  :to="{name: 'sign'}" > Sign Up</router-link>     
      </el-menu-item>
      <el-menu-item index="5">
        <router-link  :to="{name: 'login'}" > Login</router-link>
      </el-menu-item>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
// import { useStore } from "vuex";

  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
        // const store = useStore();

        // const logout = () => {
        //     store.dispatch("logout");
        // }


  </script>
  
  <style>
  .flex-grow {
    flex-grow: 1;
  }
 a, a.-webkit-any-link 
 {
  text-decoration: none;
}

  </style>
  