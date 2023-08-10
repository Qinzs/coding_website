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
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">Homer</el-menu-item>
    <el-menu-item index="2">Community</el-menu-item>

    <el-menu-item index="3">Match History</el-menu-item>

    <el-menu-item index="4">
      Sign Up
    </el-menu-item>
    <el-menu-item index="5">Login</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import { ElMenu,ElMenuItem,ElSubMenu} from 'element-plus'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
