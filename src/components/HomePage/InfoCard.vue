<template>
  <el-row :gutter="16">
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="percentile" :value-style="{color: 'rgb(201, 214, 214)'}">
          <template #title>
            <div style="display: inline-flex; align-items: center; color: rgb(149, 160, 160);">
              Ranking Percentile
              <el-tooltip
                effect="dark"
                content="Number of users percentile you have beaten"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="points" :value-style="{color: 'rgb(201, 214, 214)'}">
          <template #title>
            <div style="display: inline-flex; align-items: center; color: rgb(149, 160, 160);">
              Skill Points
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

import {
  Warning,
} from '@element-plus/icons-vue'


export default {
  components: {
    Warning
  },
  setup() {
    const points = ref(0);
    const percentile = ref(0.0);

    const store = useStore();
    const userId = store.state.user?.id;

    onMounted(async () => {
      try {
        const pointsResponse = await axios.get(`http://localhost:3000/api/points/user/${userId}`);
        points.value = pointsResponse.data;

        const percentileResponse = await axios.get(`http://localhost:3000/api/points/percentile/${userId}`);
        percentile.value = percentileResponse.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    return {
      points,
      percentile
    };
  }
}
</script>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
  
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
}

</style>
