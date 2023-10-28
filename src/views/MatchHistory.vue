<template>
  <el-table
    :data="refreshMachesList"
    @filter-change="handleFilter"
    style="width: 80%; height: 80%; margin: 5% auto; overflow: none"
  >
    <el-table-column label="Date" prop="startTime" />
    <el-table-column label="Match id" prop="matchId" />
    <el-table-column
      prop="tag"
      label="Tag"
      width="100"
      column-key="filterTag"
      :filters="[
        { text: 'win', value: 'Win' },
        { text: 'lose', value: 'Lose' },
        {text:'unknown',value:'unknown'},
      ]"
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
        <div class="block">
        <el-date-picker type="date" :clearabl="true" v-model="selectedDate" @change="handleDateChange" value-format="YYYY-MM-DD"  placeholder="select date"></el-date-picker>
        </div>
        <!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
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
      selectedDate:null,
      Username: "",
      // 我的匹配列表
      myMatchesList: [],
      refreshMachesList:[],
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
        //console.log(response);
        if (response.status == 200) {
          this.myMatchesList = response.data;
          this.refreshMachesList = response.data;
          //console.log(this.myMatchesList);

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

    handleDateChange(time) {
      this.selectedDate = time;
      console.log(time);
      if (time != null)
      {
        this.refreshMachesList = this.filterJsonByEndTime(this.myMatchesList, this.selectedDate);
      } else {
        this.refreshMachesList = this.myMatchesList;
      }
    },

    filterJsonByEndTime(jsonList, targetDate) {
      console.log(jsonList);
      const filteredList = jsonList.filter((item) => {
        const startTime = item.startTime.split(" ")[0];
        return startTime === targetDate;
      });
      console.log(filteredList);
      return filteredList;
    },

    handleFilter(filterObj) {
      //console.log(filterObj.filterTag);
      if (filterObj.filterTag.length > 0) {
        this.refreshMachesList = this.myMatchesList.filter(match => filterObj.filterTag.includes(match.tag));
      } else {
        this.refreshMachesList = this.myMatchesList;
        console.log("点击重置")
      }

    },

    // detail button 
    handleDetail(item) {
      console.log(item);
      this.detailDialogVisible = true;
      this.getCodeDetail(item.problemId);

      this.pkDate = item.startTime;
      this.problemName = item.problemName;
    },

    // get detail 
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
