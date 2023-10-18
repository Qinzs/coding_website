<template>
    <div class="container">
      <div class="e-box">
        <div id="codeEditBox"></div>
        <el-button type="primary" @click="submit">submit</el-button>
      </div>
      <div class="description">
        <el-card class="box-card">
        <template #header>
            <div class="card-header">
            <span>Code Quesstions</span>
            </div>
        </template>
            <el-row :gutter="16">
            <el-col :span="8">
            <div class="statistic-card">
                <el-statistic :value="98500">
                <template #title>
                    <div style="display: inline-flex; align-items: center">
                    Runtime
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
                <div class="statistic-footer">
                <div class="footer-item">
                    <span class="green">
                    Beats 24% 
                    <el-icon>
                        <CaretTop />
                    </el-icon>
                    </span>

                    <span>of user using java</span>
                </div>
                </div>
            </div>
            </el-col>
            <el-col :span="6"></el-col>

            <el-col :span="8">
            <div class="statistic-card">
                <el-statistic :value="693700">
                <template #title>
                    <div style="display: inline-flex; align-items: center">
                    Memory
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
                <div class="statistic-footer">
                <div class="footer-item">
                    
                    <span class="red">
                        Beats 12%
                    <el-icon>
                        <CaretBottom />
                    </el-icon>
                    </span>
                    <span>of user using java</span>
                </div>
                </div>
            </div>
            </el-col>
        </el-row>


        <div class="status-card"></div>

        <el-table :data="tableData" height="250" style="width: 100%">
            <el-table-column prop="Status" label="Status" width="160" />
            <el-table-column prop="Language" label="Language" width="160" />
            <el-table-column prop="Runtime" label="Runtime" width="160" />
            <el-table-column prop="Memory" label="Memory" width="160" />
            <el-table-column prop="Title" label="Title" />
        </el-table>
    </el-card>
    </div>
</div> 
</template>
  
  <script lang="ts" setup>
  import * as monaco from 'monaco-editor';
  import { nextTick, ref, onBeforeUnmount } from 'vue';
  import {
    CaretBottom,
    CaretTop,
    Warning,
  } from '@element-plus/icons-vue'
  import axios from 'axios';

//   import CodeStatus from "../components/CodingPage/CodeStatus.vue";
  
  
  const text = ref('');
  const result = ref('');
  
  let editor: monaco.editor.IStandaloneCodeEditor;
  
  const editorInit = () => {
    nextTick(() => {
      !editor ? editor = monaco.editor.create(document.getElementById('codeEditBox') as HTMLElement, {
        value: text.value,
        language: 'python',
        automaticLayout: true,
        theme: 'vs-dark',
        readOnly: false,
        fontSize: 16,
        scrollBeyondLastLine: false,
        overviewRulerBorder: false,
      }) : editor.setValue("");
  
      editor.onDidChangeModelContent(() => {
        text.value = editor.getValue();
      });
    });
  }
  
  editorInit();
  
  onBeforeUnmount(() => {
    editor.dispose();
  });
  
  const submit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/pk/coderesult', {
        source_code: text.value
      });
      console.log(response.data);
      result.value = response.data.status.description;
    } catch (error) {
      console.error('Error submitting code:', error);
    }
  }

  const tableData = [
  {
    Status: 'Accepted',
    Language: 'Tom',
    Runtime: 'No. 189, Grove St, Los Angeles',
    Memory: '24mb',
    Title: 'Hello World',
  },
  {
    Status: 'Accepted',
    Language: 'Tom',
    Runtime: 'No. 189, Grove St, Los Angeles',
    Memory: '21mb',
    Title: 'Hello World',
  },
  {
    Status: 'Not Accept',
    Language: 'Tom',
    Runtime: 'No. 189, Grove St, Los Angeles',
    Memory: '39mb',
    Title: 'Hello World',
  },
  {
    Status: 'Accepted',
    Language: 'Tom',
    Runtime: 'No. 189, Grove St, Los Angeles',
    Memory: '29mb',
    Title: 'Hello World',
  },
  {
    Status: 'Not Accept',
    Language: 'Tom',
    Runtime: 'No. 189, Grove St, Los Angeles',
    Memory: '24mb',
    Title: 'Hello World',
  },
  {
    Status: 'Not Accept',
    Language: 'Tom',
    Runtime: 'No. 189, Grove St, Los Angeles',
    Memory: '14mb',
    Title: 'Hello World',
  },
  {
    Status: 'Accepted',
    Language: 'Tom',
    Runtime: 'No. 189, Grove St, Los Angeles',
    Memory: '38mb',
    Title: 'Hello World',
  },
]
  </script>
  
  <style scoped lang="scss">
  #codeEditBox {
    height: 100%;
    width: auto;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    text-align: left;
  }
  
  .e-box {
    width: 50%;
    padding: 10px;
    box-sizing: border-box;
    height: 90%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    flex-direction: column;
  }
  
  .result {
    margin-top: 20px;
    font-size: 16px;
    color: #333;
  }
  
  .container {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  
  .description {
    width: 50%;
    padding: 0px;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    flex-direction: column;
  }
  .box-card{
    width: 100%;
    height: 100%;
    margin: 3% auto;
    border-radius: 15px;
    padding: 0;
  }

  :global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
  }
  
  .el-statistic {
    --el-statistic-content-font-size: 28px;
  }
  
  .statistic-card {
    height: 80%;
    padding: 10px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
  }
  
  .statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
  }
  
  .statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
  }
  
  .green {
    color: var(--el-color-success);
  }
  .red {
    color: var(--el-color-error);
  }

  .status-card {
    // height: 30%;
    padding: 20px;
    // // border-radius: 4px;
    // background-color:  #cacfd4;;
  }
  </style>
  