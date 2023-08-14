<template>
  <div class="e-box">
    <div id="codeEditBox"></div>
    <el-button type="primary" @click="submit">submit</el-button>
  </div>
</template>

<script lang="ts" setup>
import * as monaco from 'monaco-editor';
import { nextTick, ref, onBeforeUnmount } from 'vue';

const text = ref('');

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
const submit = () => {
  console.log(text.value);
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
</style>
