import OfficeUI from "../../lib/UI.js";
import {
  ACCEPT_ATTR,
  CREATE_DOC_TYPES,
  classifyError,
  createOfficeController,
  getCreateDocType,
  isOpenCancelledError,
  isSupportedOfficeFile,
} from "../../shared/officeWidget.js";
import { SUPPORTED_LANGS, buildOpenOptions, createDefaultState } from "../../shared/ui-defaults.js";

const els = {};
let initialized = false;
let selectedFile = null;
let controller = null;
const state = createDefaultState();

function setStatus(text) {
  if (els.status) {
    els.status.textContent = text;
  }
}

function setError(info) {
  if (!els.error) {
    return;
  }

  if (!info) {
    els.error.hidden = true;
    els.errorTitle.textContent = "";
    els.errorDetail.textContent = "";
    return;
  }

  els.error.hidden = false;
  els.errorTitle.textContent = info.title;
  els.errorDetail.textContent = info.detail;
}

async function openSelectedFile() {
  if (!selectedFile) {
    setError({ title: "未选择文件", detail: "请先选择一个 Office 文档。" });
    return;
  }

  if (!isSupportedOfficeFile(selectedFile.name)) {
    setError({
      title: "不支持的文件类型",
      detail: `${selectedFile.name} 不是 SDK 支持的 Office 文档类型。`,
    });
    return;
  }

  setError(null);
  setStatus(`正在打开 ${selectedFile.name} ...`);

  try {
    await controller.open(
      els.viewer,
      {
        fileName: selectedFile.name,
        file: selectedFile,
      },
      buildOpenOptions(state, "html-demo"),
    );
    setStatus(`${selectedFile.name} 已加载`);
  } catch (caughtError) {
    if (isOpenCancelledError(caughtError)) {
      return;
    }
    console.error("[html-demo] open failed", caughtError);
    setStatus("打开失败");
    setError(classifyError(caughtError));
  }
}

async function createNewFile() {
  const item = getCreateDocType(els.createDocType?.value);
  if (!item) {
    setError({ title: "无法新建文件", detail: "请选择要新建的 Office 文档类型。" });
    return;
  }

  setError(null);
  setStatus(`正在新建 ${item.label} ...`);

  try {
    await controller.create(els.viewer, item.value, buildOpenOptions(state, "html-demo"));
    selectedFile = null;
    els.fileInput.value = "";
    els.fileName.textContent = item.fileName;
    setStatus(`${item.fileName} 已创建`);
  } catch (caughtError) {
    if (isOpenCancelledError(caughtError)) {
      return;
    }
    console.error("[html-demo] create failed", caughtError);
    setStatus("新建失败");
    setError(classifyError(caughtError));
  }
}

async function resetDemo() {
  await controller?.close();
  selectedFile = null;
  if (els.fileInput) {
    els.fileInput.value = "";
  }
  if (els.fileName) {
    els.fileName.textContent = "未选择文件";
  }
  setError(null);
  setStatus("已重置，可重新选择文件");
}

function setupLangOptions() {
  if (!els.lang) {
    return;
  }

  els.lang.innerHTML = "";
  for (const item of SUPPORTED_LANGS) {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    option.selected = item.value === state.lang;
    els.lang.appendChild(option);
  }
}

function setupCreateDocTypes() {
  els.createDocType.innerHTML = "";
  for (const item of CREATE_DOC_TYPES) {
    const option = document.createElement("option");
    option.value = String(item.value);
    option.textContent = item.label;
    els.createDocType.appendChild(option);
  }
}

function init() {
  if (initialized) {
    return;
  }

  Object.assign(els, {
    fileInput: document.querySelector("#file-input"),
    openButton: document.querySelector("#open-button"),
    createButton: document.querySelector("#create-button"),
    createDocType: document.querySelector("#create-doc-type"),
    resetButton: document.querySelector("#reset-button"),
    viewer: document.querySelector("#viewer"),
    fileName: document.querySelector("#filename"),
    status: document.querySelector("#status"),
    error: document.querySelector("#error"),
    errorTitle: document.querySelector("#error-title"),
    errorDetail: document.querySelector("#error-detail"),
    lang: document.querySelector("#opt-lang"),
    readonly: document.querySelector("#opt-readonly"),
    topbar: document.querySelector("#opt-topbar"),
    bottombar: document.querySelector("#opt-bottombar"),
  });

  if (
    !els.fileInput
    || !els.openButton
    || !els.createButton
    || !els.createDocType
    || !els.resetButton
    || !els.viewer
    || !els.fileName
  ) {
    console.error("html demo init failed: required dom nodes are missing");
    return;
  }

  initialized = true;
  controller = createOfficeController({ OfficeUI });
  els.fileInput.setAttribute("accept", ACCEPT_ATTR);
  setupLangOptions();
  setupCreateDocTypes();

  els.fileInput.addEventListener("change", event => {
    selectedFile = event.target.files?.[0] ?? null;
    els.fileName.textContent = selectedFile ? selectedFile.name : "未选择文件";

    if (selectedFile) {
      setError(null);
      setStatus("文件已选择，点击“打开文件”开始挂载");
    } else {
      setStatus("请选择一个 Office 文档");
    }
  });

  els.openButton.addEventListener("click", () => {
    void openSelectedFile();
  });

  els.createButton.addEventListener("click", () => {
    void createNewFile();
  });

  els.resetButton.addEventListener("click", () => {
    void resetDemo();
  });

  els.lang?.addEventListener("change", event => {
    state.lang = event.target.value;
  });
  els.readonly?.addEventListener("change", event => {
    state.readOnly = event.target.checked;
  });
  els.topbar?.addEventListener("change", event => {
    state.showTopBar = event.target.checked;
  });
  els.bottombar?.addEventListener("change", event => {
    state.showBottomBar = event.target.checked;
  });

  window.addEventListener("beforeunload", () => {
    void controller?.close();
  });

  void resetDemo();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
