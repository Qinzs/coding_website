<template>
  <div style=" overflow:auto; height:100%">
    <el-dialog v-model="dialogVisible" title="Ask Question">
      <el-input
        v-model="addTitle"
        :rows="1"
        type="textarea"
        placeholder="Please input your title"
      />
      <el-input
        v-model="addContent"
        :rows="5"
        type="textarea"
        placeholder="Please input your question"
      />
      <el-button
        style="background-color: #409eff; color: white; margin-top: 50px"
        size="large"
        type="primary"
        @click="addNew"
        >Submit</el-button
      >
      <el-button
        style="background-color: red; color: white; margin-top: 50px"
        size="large"
        type="danger"
        >Cancel</el-button
      >
    </el-dialog>
    <el-row style="margin-top: 20px; margin-left: 50px" class="tac">
      <el-col :span="3">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <p style="float: left; margin-top: 20px; margin-left: 20px">PUBLIC</p>
          <el-menu-item style="clear: both" index="1">
            <template #title>
              <el-icon><ChatLineSquare /></el-icon>
              <span>Questions</span>
            </template>
          </el-menu-item>
          <div style="width: 100%; height: 350px"></div>
        </el-menu>
      </el-col>
      <el-col style="background-color: white; margin-left: 20px" :span="15">
        <span
          style="
            text-align: left;
            margin-left: 30px;
            float: left;
            font-size: 30px;
            margin-top: 20px;
          "
          >Top Questions</span
        >

        <el-button
          size="large"
          style="
            background-color: #409eff;
            color: white;
            float: right;
            margin-top: 20px;
            margin-right: 40px;
          "
          @click="dialogVisible = true"
          >Ask Questions</el-button
        >

        <el-button-group
          style="
            margin-top: 10px;
            float: right;
            color: #2c3e50;
            clear: both;
            margin-right: 40px;
          "
          class="ml-4"
        >
          <el-button disabled>Interesting</el-button>
          <el-button>
            <el-tag class="mx-1" effect="dark">211</el-tag
            >&nbsp;&nbsp;&nbsp;Bountied</el-button
          >
          <el-button>Hot</el-button>
        </el-button-group>
        <el-divider style="margin-top: 20px; float: right" />

        <!--  列表组件 -->
        <div
          style="width: 100%; float: left"
          v-for="(item, index) in publish"
          :key="index"
        >
          <el-row>
            <el-col
              style="font-size: 15px; color: #9c9c9c; text-align: right"
              :span="4"
            >
              <a style="float: right; margin-top: 5px">0 &nbsp;&nbsp; votes</a
              ><br />
              <a style="clear: both; float: right; margin-top: 10px"
                >1&nbsp;&nbsp; answer</a
              ><br />
              <a style="clear: both; float: right; margin-top: 10px"
                >{{ item.Views }} &nbsp; &nbsp;views</a
              >
            </el-col>
            <el-col style="margin-left: 20px" :span="18">
              <a
                style="float: left; font-size: 20px; color: #409eff"
                @click="showDetail(item)"
                >{{ item.Title }}</a
              ><br />
              <el-tag
                style="
                  clear: both;
                  float: left;
                  margin-top: 10px;
                  background-color: #e4eaf5;
                  color: #87a0b6;
                "
                >python</el-tag
              >
              <el-tag
                style="
                  float: left;
                  margin-top: 10px;
                  margin-left: 10px;
                  background-color: #e4eaf5;
                  color: #87a0b6;
                "
                >django</el-tag
              >
              <el-tag
                style="
                  float: left;
                  margin-top: 10px;
                  margin-left: 10px;
                  background-color: #e4eaf5;
                  color: #87a0b6;
                "
                >logic</el-tag
              >
              <span style="float: right; margin-top: 10px">{{
                item.AnswerLatest
              }}</span>
              <span style="float: right; margin-top: 10px; font-weight: bold"
                >{{ item.AnswerNumber }}&nbsp;post&nbsp;&nbsp;</span
              >
              <span style="float: right; margin-top: 10px; color: #409eff"
                >{{ item.AuthorName }} &nbsp;&nbsp;</span
              >
            </el-col>

            <el-dialog
              :model-value="detailDialogVisible"
              @update:model-value="detailDialogVisible = false"
              width="50%"
              center
              :modal="false"
            >
              <template v-slot:title>
                <h3>Details</h3>
              </template>

              <span style="text-decoration: underline; font-size: large">{{
                detail.title
              }}</span>

              <el-card style="height: 100px">
                <h1>{{ detail.Content }}</h1>
              </el-card>

              <div style="float: right">{{ detail.AnswerLatest }}</div>

              <br />
              <br />

              <div class="block">
                <el-timeline>
                  <div v-for="(item, index) in communities" :key="index">
                    <el-timeline-item timestamp="" placement="top">
                      <el-card>
                        <h4>{{ item.Content }}</h4>
                        <br />
                        <br />
                        <p style="float: right">
                          {{ item.AuthorName }}&nbsp; &nbsp; {{ item.DateTime }}
                        </p>
                      </el-card>
                    </el-timeline-item>
                  </div>
                </el-timeline>
              </div>

              <br />

              <span style="font-size: large">answer</span>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10 }"
                placeholder="Please write your answer"
                v-model="addAnswerContent"
              >
              </el-input>

              <template v-slot:footer>
                <el-button
                  style="background-color: #409eff; color: white"
                  @click="addAnswer"
                  >submit</el-button
                >
                <el-button @click="detailDialogVisible = false"
                  >cancel</el-button
                >
              </template>
            </el-dialog>
            <el-divider style="margin-top: 20px; float: right" />
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
      
      <script>
import { ChatLineSquare } from "@element-plus/icons-vue";
import {
  getCommunity,
  addNew,
  getCommunityAnswers,
  addAnswer,
} from "@/api/community";
//import {ref} from'vue'
export default {
  components: {
    ChatLineSquare,
  },
  data() {
    return {
      dialogVisible: false,
      detailDialogVisible: false,
      title: "",
      addTitle: "",
      addContent: "",
      publish: [],
      communityDatas: [
        {
          title: "xxx",
          authorName: "yyy",
          content: "hello",
          answerNumber: "10",
          views: "100",
          answerLatest: "10:20",
          uid: 11001,
        },
        {
          title: "xxx",
          authorName: "yyy",
          content: "hello",
          answerNumber: "10",
          views: "100",
          answerLatest: "10:20",
          uid: 11001,
        },
      ],

      // 列表详情
      detail: {},
      UserID: 0,
      Username: "",
      // 回答列表
      communities: [],
      // 新增回答
      addAnswerContent: "",
    };
  },

  created() {
    this.getCommunityList();
    // 读取id
    this.UserID = localStorage.getItem("id");
    this.Username = localStorage.getItem("name");
    console.log("当前登录用户的id为:" + this.UserID);
    console.log("当前登录用户的name为:" + this.Username);
  },

  methods: {
    //  获取提问列表
    getCommunityList() {
      getCommunity().then((response) => {
        console.log(response);
        if (response) {
          this.publish = response.data;
        }
      });
    },

    // 显示详情
    showDetail(item) {
      console.log(1111);
      console.log(item);
      this.detail = item;
      this.detailDialogVisible = true; // Show the dialog when the link is clicked

      this.getCommunityAnswerList(item.PublishID);
    },

    // 获取所有的的回答
    getCommunityAnswerList(publishID) {
      getCommunityAnswers(publishID).then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.communities = response.data;
          console.log(this.communities);
        }
      });
    },

    // 新增提问
    addNew() {
      // 新增提问
      addNew({
        Title: this.addTitle,
        Content: this.addContent,
        UserID: this.UserID,
      }).then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.$message({
            message: "public success",
            type: "success",
          });
          this.addTitle = "";
          this.addContent = "";
          this.getCommunityList();
          this.dialogVisible = false;
        } else {
          this.$message({
            message: "public fail",
            type: "error",
          });
        }
      });
    },

    // 新增回答
    addAnswer() {
      addAnswer(this.detail.PublishID, {
        UserID: this.UserID,
        AuthorName: this.Username,
        Content: this.addAnswerContent,
        PublishID: this.detail.PublishID,
      }).then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.$message({
            message: "addAnswer success",
            type: "success",
          });
          this.addAnswerContent = "";
          this.getCommunityAnswerList(this.detail.PublishID);
        } else {
          this.$message({
            message: "addAnswer fail",
            type: "error",
          });
        }
      });
    },
  },
};

//const dialogVisible = ref(false)
//const textarea = ref("")

// const communityDatas = ref([
//         {
//                 title: 'xxx',
//                 authorName: 'yyy',
//                 content: 'hello',
//                 answerNumber: '10',
//                 views: '100',
//                 answerLatest: '10:20',
//                 uid: 11001
//         },
//         {
//                 title: 'xxx',
//                 authorName: 'yyy',
//                 content: 'hello',
//                 answerNumber: '10',
//                 views: '100',
//                 answerLatest: '10:20',
//                 uid: 11001
//         }
// ])
// const answerData = ref([
//         {
//                 content: 'xxx',
//                 authorName: 'yyy',
//                 uid: 11001,
//                 datetime: '10:20',
//         },
//         {
//                 content: 'xxx',
//                 authorName: 'yyy',
//                 uid: 11001,
//                 datetime: '10:20',
//         },
// ])
</script>
      
      
<style scoped>
.community {
  width: 100%;
  height: 100%;
  overflow:auto;
}
  </style>
      