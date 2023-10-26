<template>
  <el-row :gutter="16">
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="98500" :value-style="{color: 'rgb(201, 214, 214)'}">
          <template #title>
            <div style="display: inline-flex; align-items: center; color: rgb(149, 160, 160);">
              AU Ranking
              <el-tooltip
                effect="dark"
                content="Number of users who logged into the product in one day"
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
      <!-- <div class="statistic-card">
        <el-statistic :value="693700" :value-style="{color: 'rgb(201, 214, 214)'}">
          <template #title>
            <div style="display: inline-flex; align-items: center; color: rgb(149, 160, 160);">
              Oceania Ranking
              <el-tooltip
                effect="dark"
                content="Number of users who logged into the product in one month"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div> -->
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="72000" :value-style="{color: 'rgb(201, 214, 214)'}">
          <template #title>
            <div style="display: inline-flex; align-items: center; color: rgb(149, 160, 160);">
              Skill
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Warning,
} from '@element-plus/icons-vue'
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
