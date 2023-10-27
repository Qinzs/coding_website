<template>
  <el-table
    :data="myMatchesList"
    style="width: 80%; height: 80%; margin: 5% auto; overflow: none"
  >
    <el-table-column label="Date" prop="startTime" />
    <el-table-column label="Match id" prop="matchId" />
    <el-table-column
      prop="tag"
      label="Tag"
      width="100"
      :filters="[
        { text: 'Win', value: 'Win' },
        { text: 'Lose', value: 'Lose' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.tag == 'Win' ? 'success' : ''"
          disable-transitions
          >{{ scope.row.tag }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button
          size="small"
          @click="handleDetail(scope.row)"
          style="background-color: #409eff; color: white"
          >Details</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 详情弹窗 -->
  <el-dialog
    :model-value="detailDialogVisible"
    @update:model-value="detailDialogVisible = false"
    width="50%"
    center
    :modal="false"
    title="Detail"
  >
    <div class="demo-input-suffix">
      <div>
        <span style="font-size: large"><el-tag size="large">PK Date:</el-tag> {{ pkDate }}</span>
      </div>
      <br>
      <div>
        <span style="font-size: large"><el-tag size="large">Problem:</el-tag>: {{ problemName }}</span>
      </div>
      <br />
      <el-input
        v-model="codeDetail.submittedCode"
        :autosize="{ minRows: 4, maxRows: 15 }"
        type="textarea"
        placeholder="Please input"
      />
      <br />
      <div>
        <span style="font-size: large"><el-tag size="large">Result:</el-tag> {{ codeDetail.result }}</span>
      </div>
      <br>
      <div>
        <span style="font-size: large"
          ><el-tag size="large">ExecutionTime:</el-tag> {{ codeDetail.executionTime }}</span
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getMyMatches, codeDetail } from "@/api/community";
//import {ref} from'vue'
export default {
  components: {},
  data() {
    return {
      UserID: "",
      Username: "",
      // 我的匹配列表
      myMatchesList: [],
      // 详情弹窗
      detailDialogVisible: false,

      // pk相关
      pkDate: "",
      problemName: "",
      codeDetail: {},
    };
  },

  created() {
    // 读取id
    this.UserID = localStorage.getItem("id");
    this.Username = localStorage.getItem("name");
    console.log("当前登录用户的id为:" + this.UserID);
    console.log("当前登录用户的name为:" + this.Username);

    this.myMatches();
  },

  methods: {
    // 获取我自己的匹配列表
    myMatches() {
      getMyMatches(this.UserID).then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.myMatchesList = response.data;

          // 判断输赢
          for (var item of this.myMatchesList) {
            if (item.winnerId == this.UserID) {
              item.tag = "Win";
            } else {
              item.tag = "Lose";
            }
            if (item.winnerId == null) {
              item.tag = "unknown";
            }
          }
        }
      });
    },

    // 详情按钮
    handleDetail(item) {
      console.log(item);
      this.detailDialogVisible = true;
      this.getCodeDetail(item.problemId);

      this.pkDate = item.startTime;
      this.problemName = item.problemName;
    },

    // 获取详情
    getCodeDetail(problemId) {
      codeDetail(this.UserID, problemId).then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.codeDetail = response.data;
        }
      });
    },
  },
};
</script>
