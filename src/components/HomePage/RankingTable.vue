<template>
  <div class="header">
    <h1><el-icon :size="34">
        <Trophy />
      </el-icon>
      Global Ranking
    </h1>
  </div>
  <el-table :data="tableData" height="500" style="width: 100%" class="edit-background">
    <el-table-column type="index" width="80" :index="indexMethod" />
    <el-table-column width="120" >
      <template #default="scope">
        <el-avatar shape="circle" :size="60" :src="scope.row.avatar" />
      </template>
      <!-- <template #default="scope">
        <img :src="scope.row.avatar" alt="Avatar" class="avatar-img"/>
      </template> -->
    </el-table-column>
    <el-table-column prop="name" width="80"/>
    <el-table-column prop="score" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import {
  Trophy
} from '@element-plus/icons-vue'

const indexMethod = (index: number) => {
  return index + 1
}

const tableData = ref([]); // 使用ref来创建响应式引用

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/points/leaderboard/top15');
    tableData.value = response.data.map(player => ({
      name: player.username, // 从后端接收的 'username'
      score: player.points, // 从后端接收的 'points'
      // avatar: 'url_here' // 头像URL在这里添加
    }));
  } catch (error) {
    console.error('There was an error!', error);
  }
});
// const tableData = [
//   {
//     avatar: 'https://gravatar.com/avatar/96678feee074dc97418c54cbb3c56d05?s=400&d=robohash&r=x',
//     name: 'Tom',
//     score: '80000'
//   },
//   {
//     avatar: 'https://robohash.org/96678feee074dc97418c54cbb3c56d05?set=set4&bgset=&size=400x400',
//     name: 'Tom',
//     score: '79000'
//   },
//   {
//     avatar: 'https://avatars.dicebear.com/v2/female/96678feee074dc97418c54cbb3c56d05.svg',
//     name: 'Tom',
//     score: '78800'
//   },
//   {
//     avatar: 'https://robohash.org/96678feee074dc97418c54cbb3c56d05?set=set4&bgset=&size=400x400',
//     name: 'Tom',
//     score: '77300'
//   },
//   {
//     avatar: 'https://gravatar.com/avatar/96678feee074dc97418c54cbb3c56d05?s=400&d=robohash&r=x',
//     name: 'Tom',
//     score: '77105'
//   },
//   {
//     avatar: 'https://avatars.dicebear.com/v2/female/96678feee074dc97418c54cbb3c56d05.svg',
//     name: 'Tom',
//     score: '76135'
//   },
//   {
//     avatar: 'https://robohash.org/96678feee074dc97418c54cbb3c56d05?set=set4&bgset=&size=400x400',
//     name: 'Tom',
//     score: '68355'
//   },
//   {
//     avatar: 'https://gravatar.com/avatar/96678feee074dc97418c54cbb3c56d05?s=400&d=robohash&r=x',
//     name: 'Tom',
//     score: '48922'
//   },
// ]
</script>

<style>
  .header h1 {
  margin-right: 50%;
  color: #dddcdc;
}

.edit-background .el-table__cell {
  background-color: #323133;
  color: #ffffff;
}

.edit-background .el-table__body,
.edit-background .el-table__body-wrapper,
.edit-background .el-table__header,
.edit-background .el-table__footer,
.edit-background .el-table__row {
  background-color: #323133;
}
</style>
