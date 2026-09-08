<template>
  <div class="office-sdk-demo">
    <aside class="office-sdk-demo-panel">
      <div>
        <p class="office-sdk-demo-eyebrow">Vue Demo</p>
        <h1>Office SDK · Vue 3 集成</h1>
        <p class="office-sdk-demo-muted">
          演示如何把 Office SDK 封装成 Vue 组件，并复用 /shared 中的打开、新建与生命周期 helper。
        </p>
      </div>

      <section class="office-sdk-demo-block">
        <h2>1. 打开或新建文件</h2>
        <div class="office-sdk-demo-controls">
          <label class="office-sdk-demo-file-picker" for="vue-file">
            <span>选择文件</span>
            <input
              id="vue-file"
              ref="fileInputRef"
              type="file"
              :accept="ACCEPT_ATTR"
              @change="handleFileChange"
            />
          </label>
          <button type="button" @click="openSelectedFile">打开文件</button>
          <button type="button" class="office-sdk-demo-secondary" @click="reset">重置</button>
        </div>
        <div class="office-sdk-demo-controls">
          <select v-model.number="createDocType" class="office-sdk-demo-create-select" aria-label="新建文件类型">
            <option v-for="item in CREATE_DOC_TYPES" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
          <button type="button" @click="createNewFile">新建文件</button>
        </div>
        <div class="office-sdk-demo-meta">
          <span>当前文件：</span>
          <strong>{{ fileName }}</strong>
        </div>
      </section>

      <section class="office-sdk-demo-block">
        <h2>2. 打开选项</h2>
        <div class="office-sdk-demo-form-grid">
          <label>
            <span>语言</span>
            <select v-model="state.lang">
              <option v-for="item in SUPPORTED_LANGS" :key="item.value" :value="item.value">
                {{ item.label }}
              </option>
            </select>
          </label>
          <label class="office-sdk-demo-inline">
            <input v-model="state.readOnly" type="checkbox" />
            <span>只读模式</span>
          </label>
          <label class="office-sdk-demo-inline">
            <input v-model="state.showTopBar" type="checkbox" />
            <span>显示顶部工具栏</span>
          </label>
          <label class="office-sdk-demo-inline">
            <input v-model="state.showBottomBar" type="checkbox" />
            <span>显示底部状态栏</span>
          </label>
        </div>
      </section>

      <section class="office-sdk-demo-block">
        <h2>3. 状态</h2>
        <p class="office-sdk-demo-status">{{ statusText }}</p>
        <div v-if="errorInfo" class="office-sdk-demo-error">
          <strong>{{ errorInfo.title }}</strong>
          <p>{{ errorInfo.detail }}</p>
        </div>
        <p class="office-sdk-demo-hint">如果资源加载失败，请确认 /lib 已完整保留，并通过 HTTP 服务访问。</p>
      </section>
    </aside>

    <section class="office-sdk-demo-viewer-shell">
      <OfficeViewer
        :file="fileToOpen"
        :create-doc-type="docTypeToCreate"
        :request-id="openRequestId"
        :open-options="openOptions"
        @status="onStatus"
        @error="onError"
      />
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import OfficeViewer from "./components/OfficeViewer.vue";
import {
  ACCEPT_ATTR,
  CREATE_DOC_TYPES,
  getCreateDocType,
  isSupportedOfficeFile,
} from "@office-sdk-shared/officeWidget.js";
import { SUPPORTED_LANGS, buildOpenOptions, createDefaultState } from "@office-sdk-shared/ui-defaults.js";

const fileInputRef = ref(null);
const selectedFile = ref(null);
const fileToOpen = ref(null);
const docTypeToCreate = ref(null);
const createDocType = ref(CREATE_DOC_TYPES[0].value);
const openRequestId = ref(0);
const fileName = ref("未选择文件");
const statusText = ref("请选择文件");
const errorInfo = ref(null);
const state = reactive(createDefaultState());

const openOptions = computed(() => buildOpenOptions(state, "vue-demo"));

function handleFileChange(event) {
  const file = event.target.files?.[0] ?? null;
  selectedFile.value = file;
  fileName.value = file ? file.name : "未选择文件";
  errorInfo.value = null;
  statusText.value = file ? "文件已选择，点击“打开文件”开始挂载" : "请选择文件";
}

function openSelectedFile() {
  if (!selectedFile.value) {
    errorInfo.value = { title: "未选择文件", detail: "请先选择一个 Office 文档。" };
    return;
  }
  if (!isSupportedOfficeFile(selectedFile.value.name)) {
    errorInfo.value = {
      title: "不支持的文件类型",
      detail: `${selectedFile.value.name} 不是 SDK 支持的 Office 文档类型。`,
    };
    return;
  }

  errorInfo.value = null;
  fileToOpen.value = selectedFile.value;
  docTypeToCreate.value = null;
  openRequestId.value += 1;
}

function createNewFile() {
  const item = getCreateDocType(createDocType.value);
  if (!item) {
    errorInfo.value = { title: "无法新建文件", detail: "请选择要新建的 Office 文档类型。" };
    return;
  }

  selectedFile.value = null;
  fileToOpen.value = null;
  docTypeToCreate.value = item.value;
  fileName.value = item.fileName;
  errorInfo.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
  openRequestId.value += 1;
}

function reset() {
  selectedFile.value = null;
  fileToOpen.value = null;
  docTypeToCreate.value = null;
  openRequestId.value += 1;
  fileName.value = "未选择文件";
  errorInfo.value = null;
  statusText.value = "已重置，可重新选择文件";
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
}

function onStatus(text) {
  statusText.value = text;
}

function onError(info) {
  errorInfo.value = info;
}
</script>
