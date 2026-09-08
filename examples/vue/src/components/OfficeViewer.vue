<template>
  <div ref="viewerRef" class="office-sdk-demo-office-viewer" />
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import OfficeUI from "@office-sdk/UI.js";
import {
  classifyError,
  createOfficeController,
  getCreateDocType,
  isOpenCancelledError,
  isSupportedOfficeFile,
} from "@office-sdk-shared/officeWidget.js";

const props = defineProps({
  file: { type: Object, default: null },
  createDocType: { type: Number, default: null },
  requestId: { type: Number, default: 0 },
  openOptions: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["status", "error"]);

const viewerRef = ref(null);
const controller = createOfficeController({ OfficeUI });
let activeRequestId = 0;

async function openCurrentFile() {
  const requestId = props.requestId;
  activeRequestId = requestId;

  const createItem = getCreateDocType(props.createDocType);

  if (!props.file && !props.createDocType) {
    await controller.close();
    return;
  }
  if (!props.file && !createItem) {
    emit("error", {
      kind: "invalid-create-type",
      title: "无法新建文件",
      detail: "请选择 Word、Excel 或 PowerPoint 文档类型。",
    });
    return;
  }
  if (props.file && !isSupportedOfficeFile(props.file.name)) {
    emit("error", {
      kind: "unsupported",
      title: "不支持的文件类型",
      detail: `${props.file.name} 不是 SDK 支持的 Office 文档类型。`,
    });
    return;
  }

  emit("error", null);
  emit("status", props.file ? `正在打开 ${props.file.name} ...` : `正在新建 ${createItem.label} ...`);

  try {
    if (props.file) {
      await controller.open(
        viewerRef.value,
        {
          fileName: props.file.name,
          file: props.file,
        },
        props.openOptions,
      );
    } else {
      await controller.create(viewerRef.value, createItem.value, props.openOptions);
    }
    if (activeRequestId === requestId && props.requestId === requestId) {
      emit("status", props.file ? `${props.file.name} 已加载` : `${createItem.fileName} 已创建`);
    }
  } catch (error) {
    if (isOpenCancelledError(error)) {
      return;
    }
    console.error("[vue-demo] open/create failed", error);
    if (activeRequestId === requestId && props.requestId === requestId) {
      emit("status", props.file ? "打开失败" : "新建失败");
      emit("error", classifyError(error));
    }
  }
}

watch(
  () => props.requestId,
  () => {
    void openCurrentFile();
  },
);

onBeforeUnmount(() => {
  void controller.close();
});
</script>

<style scoped>
.office-sdk-demo-office-viewer {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.office-sdk-demo-office-viewer > * {
  flex: 1 1 auto;
  min-height: 0;
}
</style>
