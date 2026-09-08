const SUPPORTED_EXTENSIONS = [
  "doc",
  "docx",
  "xls",
  "xlsx",
  "pptx",
];

export const ACCEPT_ATTR = SUPPORTED_EXTENSIONS.map((ext) => `.${ext}`).join(",");

export const CREATE_DOC_TYPES = [
  { value: 1, key: "docx", label: "Word (DOCX)", fileName: "blank.docx" },
  { value: 2, key: "xlsx", label: "Excel (XLSX)", fileName: "blank.xlsx" },
  { value: 3, key: "pptx", label: "PowerPoint (PPTX)", fileName: "blank.pptx" },
];

export function getCreateDocType(docType) {
  return CREATE_DOC_TYPES.find((item) => item.value === Number(docType)) ?? null;
}

export function getFileExtension(name = "") {
  const idx = name.lastIndexOf(".");
  return idx >= 0 ? name.slice(idx + 1).toLowerCase() : "";
}

export function isSupportedOfficeFile(fileOrName) {
  const name = typeof fileOrName === "string" ? fileOrName : fileOrName?.name;
  return SUPPORTED_EXTENSIONS.includes(getFileExtension(name ?? ""));
}

function getVisibleAreaTarget(rawApp) {
  return rawApp?.Document ?? rawApp?.getBSViewer?.() ?? rawApp ?? null;
}

function assertFileData(fileData) {
  if (!fileData?.file) {
    throw new Error("MISSING_FILE: please choose an Office document first");
  }
  if (!fileData.fileName) {
    throw new Error("MISSING_FILE_NAME: fileName is required");
  }
  if (!isSupportedOfficeFile(fileData.fileName)) {
    throw new Error(`UNSUPPORTED_FILE: ${fileData.fileName}`);
  }
}

function assertCreateDocType(docType) {
  const item = getCreateDocType(docType);
  if (!item) {
    throw new Error(`INVALID_CREATE_DOC_TYPE: ${docType}`);
  }
  return item;
}

async function closeOfficeWidget(targetWidget) {
  await targetWidget?.close?.();
}

export function createOfficeController({ OfficeUI } = {}) {
  if (!OfficeUI || typeof OfficeUI.openfile !== "function") {
    throw new Error("OfficeUI is required and must expose openfile");
  }

  let widget = null;
  let rawApp = null;
  let resizeObserver = null;
  let timers = [];
  let animationFrames = [];
  let mountedTo = null;
  let openGeneration = 0;
  let operationQueue = Promise.resolve();

  function clearTimers() {
    const clearTimer = typeof window === "undefined" ? clearTimeout : window.clearTimeout.bind(window);
    for (const timer of timers) {
      clearTimer(timer);
    }
    timers = [];
    if (typeof window !== "undefined") {
      for (const frame of animationFrames) {
        window.cancelAnimationFrame?.(frame);
      }
    }
    animationFrames = [];
  }

  function refresh() {
    const target = getVisibleAreaTarget(rawApp);
    target?.updateVisibleArea?.();
  }

  function scheduleRefresh() {
    if (typeof window === "undefined") {
      return;
    }

    const run = () => refresh();

    if (typeof window.requestAnimationFrame === "function") {
      animationFrames.push(window.requestAnimationFrame(run));
      animationFrames.push(window.requestAnimationFrame(() => {
        animationFrames.push(window.requestAnimationFrame(run));
      }));
    }
    timers.push(window.setTimeout(run, 80));
    timers.push(window.setTimeout(run, 220));
  }

  function observeContainer(container) {
    resizeObserver?.disconnect();
    resizeObserver = null;

    if (typeof ResizeObserver === "undefined" || !container) {
      return;
    }

    resizeObserver = new ResizeObserver(() => refresh());
    resizeObserver.observe(container);
  }

  async function cleanupCurrentWidget() {
    clearTimers();
    resizeObserver?.disconnect();
    resizeObserver = null;

    const currentWidget = widget;
    widget = null;
    rawApp = null;

    try {
      await closeOfficeWidget(currentWidget);
    } catch (caughtError) {
      console.warn("[office-sdk] widget cleanup failed", caughtError);
    } finally {
      if (mountedTo && typeof mountedTo.replaceChildren === "function") {
        mountedTo.replaceChildren();
      }
      mountedTo = null;
    }
  }

  function enqueue(operation) {
    const result = operationQueue.then(operation, operation);
    operationQueue = result.catch(() => {});
    return result;
  }

  async function close() {
    const generation = openGeneration + 1;
    openGeneration = generation;
    return enqueue(async () => {
      if (generation !== openGeneration) {
        return;
      }
      await cleanupCurrentWidget();
    });
  }

  async function mountWidget(container, createWidget, failureCode = "OPEN_FAILED") {
    if (!container) {
      throw new Error("MISSING_CONTAINER: viewer container is required");
    }

    const generation = openGeneration + 1;
    openGeneration = generation;
    return enqueue(async () => {
      if (generation !== openGeneration) {
        throw new Error("OPEN_CANCELLED: a newer open request has started");
      }
      await cleanupCurrentWidget();
      if (generation !== openGeneration) {
        throw new Error("OPEN_CANCELLED: a newer open request has started");
      }
      mountedTo = container;

      const result = await createWidget();
      const openedWidget = result?.widget ?? null;
      if (generation !== openGeneration) {
        await closeOfficeWidget(openedWidget);
        throw new Error("OPEN_CANCELLED: a newer open request has started");
      }

      if (!openedWidget) {
        throw new Error(`${failureCode}: SDK did not return a widget instance`);
      }

      const renderedApp = await openedWidget.mount(container).render();
      if (generation !== openGeneration) {
        await closeOfficeWidget(openedWidget);
        throw new Error("OPEN_CANCELLED: a newer open request has started");
      }

      widget = openedWidget;
      rawApp = renderedApp;
      observeContainer(container);
      scheduleRefresh();

      return {
        widget: openedWidget,
        rawApp: renderedApp,
        docType: result?.docType ?? null,
      };
    });
  }

  async function open(container, fileData, options) {
    assertFileData(fileData);
    return mountWidget(container, () => OfficeUI.openfile(fileData, options ?? {}));
  }

  async function create(container, docType, options) {
    const item = assertCreateDocType(docType);
    if (typeof OfficeUI.createfile !== "function") {
      throw new Error("CREATE_UNSUPPORTED: OfficeUI.createfile is not available");
    }
    return mountWidget(
      container,
      () => OfficeUI.createfile(item.value, options ?? {}),
      "CREATE_FAILED",
    );
  }

  return {
    open,
    create,
    refresh,
    close,
    get widget() {
      return widget;
    },
    get rawApp() {
      return rawApp;
    },
  };
}

export function isOpenCancelledError(err) {
  const msg = err instanceof Error ? err.message : String(err ?? "");
  return /OPEN_CANCELLED/i.test(msg);
}

export function classifyError(err) {
  const msg = err instanceof Error ? err.message : String(err ?? "");

  if (/MISSING_FILE/i.test(msg)) {
    return { kind: "no-file", title: "未选择文件", detail: "请先选择一个 Office 文档。" };
  }
  if (/MISSING_FILE_NAME/i.test(msg)) {
    return { kind: "missing-file-name", title: "缺少 fileName", detail: "打开文件时需要传入包含扩展名的 fileName。" };
  }
  if (/MISSING_CONTAINER/i.test(msg)) {
    return { kind: "no-container", title: "容器无效", detail: "viewer 容器尚未挂载，请稍后再试。" };
  }
  if (/UNSUPPORTED_FILE/i.test(msg)) {
    return { kind: "unsupported", title: "不支持的文件类型", detail: "请选择 Word、Excel 或 PowerPoint 文档。" };
  }
  if (/INVALID_CREATE_DOC_TYPE/i.test(msg)) {
    return { kind: "invalid-create-type", title: "无法新建文件", detail: "请选择 Word、Excel 或 PowerPoint 文档类型。" };
  }
  if (/CREATE_UNSUPPORTED/i.test(msg)) {
    return { kind: "create-unsupported", title: "无法新建文件", detail: "当前 SDK 版本未提供 createfile 接口。" };
  }
  if (/network|fetch|wasm|worker|404|cors|mime/i.test(msg)) {
    return {
      kind: "asset",
      title: "资源加载失败",
      detail: "请确认 /lib 已完整部署，且服务器能正确返回 worker、wasm 与静态资源。",
    };
  }
  if (/OPEN_FAILED/i.test(msg)) {
    return { kind: "open-failed", title: "打开失败", detail: "SDK 未返回可挂载的 widget 实例。" };
  }
  if (/CREATE_FAILED|createfile/i.test(msg)) {
    return { kind: "create-failed", title: "新建失败", detail: msg || "SDK 新建文件失败。" };
  }
  if (isOpenCancelledError(err)) {
    return { kind: "cancelled", title: "打开已取消", detail: "已有新的打开请求接管当前 viewer。" };
  }

  return { kind: "unknown", title: "打开失败", detail: msg || "未知错误" };
}
