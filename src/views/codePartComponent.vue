<template>
  <div class="container" v-if="codingProblem"> <!-- 添加 v-if 条件 -->
    <div class="e-box">
      <div id="codeEditBox"></div>
      <el-button type="primary" @click="submit">submit</el-button>
    </div>
    <div class="description">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>{{ codingProblem.title }}</span>
          </div>
        </template>
        <div class="text item">{{ codingProblem.description }}</div>
        <div class="text item" style="font-weight: bold;">Example:</div>
        <div class="text item">
          Input: {{ codingProblem.inputFormat }}<br>
          Output: {{ codingProblem.outputFormat }}<br>
          Explanation: {{ codingProblem.sampleInput }}
        </div>

        <div class="text item" style="font-weight: bold;">Sample C++ Code:</div>
        <div class="code-sample-container">
          <pre class="code-sample">{{ cppSampleCode }}</pre>
        </div>
      </el-card>
    </div>
  </div>
  
  <div v-else> <!-- 当 codingProblem 不存在时显示的内容 -->
    Loading problem...
  </div>
</template>

<script lang="ts" setup>
import * as monaco from 'monaco-editor';
import { nextTick, ref, onBeforeUnmount, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const codingProblem = computed(() => store.state.codingProblem);

const text = ref('');
const result = ref('');

const userId = ref(store.state.user?.id);
const matchId = computed(() => store.state.matchId);

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

const router = useRouter();

const submit = async () => {
  console.log("userId: ", userId.value);
  console.log("matchId: ", matchId.value);
  console.log("problemId: ", codingProblem.value.problemID);
  console.log("inputFormat: ", codingProblem.value.inputFormat);
  console.log("outputFormat: ", codingProblem.value.outputFormat);
  console.log("problemSolutions: ", text.value);

  try {
    const payload = {
      userId: userId.value,
      matchId: matchId.value,
      problemId: codingProblem.value.problemID,
      inputFormat: codingProblem.value.inputFormat,
      outputFormat: codingProblem.value.outputFormat,
      problemSolutions: text.value
    };

    const response = await axios.post('http://localhost:3000/submitCode', JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // 直接使用 response.data 而不是尝试解析它
    const responseData = response.data;
    console.log(responseData); 
    result.value = responseData.result;

    // 将结果存储到store中
    store.commit('SET_CODE_SUBMIT_RESULT', responseData);

    // 导航到 codesubmitview
    router.push('/codesubmit');
  } catch (error) {
    console.error('Error submitting code:', error);
  }
}

const cppSampleCode = ref(`#include <iostream>

using namespace std;

int compute_gcd(int a, int b) {
    while (b != 0) {
        int remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}

int main() {
    int a, b;
    scanf("a = %d, b = %d", &a, &b);
    int result = compute_gcd(a, b);
    cout << result << endl;
    return 0;
}`);
</script>

<style scoped lang="scss">
#codeEditBox {
  height: 500px;  // 设置一个明确的高度
  width: 100%;    // 设置宽度为100%
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
  height: 90%;
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

.code-sample-container {
  max-height: 200px;
  overflow-y: auto;   // 当内容超出时，显示垂直滚动条
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
}

.code-sample {
  background-color: #f5f5f5;
  padding: 10px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  white-space: pre-wrap; // 保持格式
}
</style>
