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
        <span>Code Question</span>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as monaco from 'monaco-editor';
import { nextTick, ref, onBeforeUnmount } from 'vue';
import axios from 'axios';

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
</style>
