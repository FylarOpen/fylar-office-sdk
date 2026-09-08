# 开发指南：使用指南

本文档说明 `office-sdk` 的标准打开流程、参数、返回值和实例生命周期。组件级 API 请看 [API Reference](../api-reference/README.md)。

## 基本流程

下面示例假设运行在浏览器原生 ESM 页面，或已经按 [入门指南](./getting-started.md) 动态加载 `/office-sdk/UI.js`。如果在 Vite、Webpack 等业务源码中接入，推荐使用入门指南里的运行时动态加载写法。

```ts
import "/office-sdk/preload.js";
import OfficeSdk from "/office-sdk/UI.js";

const { docType, widget } = await OfficeSdk.openfile(
  {
    docId: "demo-001",
    fileName: "demo.docx",
    file
  },
  {
    userData: {
      userId: "u1",
      clientId: "web-001",
      nickName: "Alice",
      opts: { color: "#2F80ED" }
    },
    uiOptions: {
      showTopBar: true,
      showBottomBar: true
    },
    mode: {
      readOnly: false,
      lang: "zh-CN"
    }
  }
);

const app = await widget.mount("#office-container").render();
app.Document.setZoom(120);
```

## openfile 签名

```ts
function openfile(
  fileData: OfficeWidgetFileData,
  options?: OfficeSdkOpenOptions | null
): Promise<OfficeWidgetOpenResult>;
```

创建空白文档可调用 `OfficeSdk.createfile(1 | 2 | 3, options)`，其中 `1`、`2`、`3` 分别表示 DOCX、XLSX、PPTX；返回值和 widget 生命周期与 `openfile(...)` 相同。

## fileData 参数

```ts
type OfficeWidgetFileData = {
  docId?: string;
  fileName: string;
  file: File | Blob | ArrayBuffer | ArrayBufferView | string;
};
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `docId` | 否 | 文档 ID，用于缓存和实例生命周期标识。不传时 SDK 会根据文件信息生成。 |
| `fileName` | 是 | 文件名，用扩展名判断类型。当前 `openfile(...)` 支持 `doc`、`docx`、`xls`、`xlsx`、`pptx`。 |
| `file` | 是 | 文件内容或浏览器可访问的地址。支持 `File`/`Blob`、`ArrayBuffer`、`TypedArray`，以及 `blob:`、`data:`、`http(s):`、`file:`、以 `/` 开头的绝对路径、以 `./` 或 `../` 开头的相对路径。普通字符串（如 `files/a.docx`）不会被识别为 URL。不能传 `null` 或 `undefined`。 |

## options 参数

```ts
type OfficeSdkOpenOptions = {
  userData?: OfficeSdkUser | null;
  uiOptions?: OfficeSdkUiOptions;
  mode?: OfficeSdkOpenMode;
};

type OfficeSdkUser = {
  clientId?: string;
  userId?: string;
  nickName?: string;
  avatar?: string;
  opts?: Record<string, unknown>;
};

type OfficeSdkUiOptions = {
  showTopBar?: boolean;
  showBottomBar?: boolean;
};

type OfficeSdkOpenMode = {
  readOnly?: boolean;
  lang?: "zh-CN" | "en-US" | (string & {});
};
```

| 字段 | 说明 |
| --- | --- |
| `userData` | 当前用户信息。不传时会补默认用户：`nickName: "Local User"`、`avatar: ""`、`opts.color: "#2F80ED"`。 |
| `uiOptions.showTopBar` | 是否显示顶部工具栏。不传时使用 SDK 默认布局。 |
| `uiOptions.showBottomBar` | 是否显示底部状态栏。不传时使用 SDK 默认布局。 |
| `mode.readOnly` | 是否以只读模式打开。 |
| `mode.lang` | 文档语言，例如 `zh-CN`、`en-US`。不传时回退到 `window.lang`、`<html lang>`、浏览器语言。 |

## 返回值

```ts
type OfficeWidgetOpenResult = {
  docType: number;
  widget: OfficeWidgetApp;
};

type OfficeWidgetApp = {
  mount(target: string | HTMLElement): OfficeWidgetApp;
  render(): Promise<OfficeRenderedApp>;
  close(): Promise<void>;
  readonly docId: string;
  readonly docType: number;
  readonly docTypeName: string | null;
};
```

`docType`：

| 值 | 类型 |
| --- | --- |
| `1` | Word / DOCX |
| `2` | Excel / XLSX |
| `3` | PowerPoint / PPTX |

`widget.mount(target)` 支持 `HTMLElement` 和字符串。以 `#`、`.`、`[` 开头的字符串按 CSS 选择器处理，其他字符串按 DOM 元素 id 处理：

```ts
widget.mount("#office-container");
widget.mount("office-container");
widget.mount(document.getElementById("office-container")!);
```

`widget.render()` 会等待文档 ready，成功后返回公开 `app` API 对象。后续可以调用：

```ts
app.Document.setZoom(120);
app.UndoRedo.undo();
```

`widget.docTypeName` 在挂载完成后通常为 `"WORD"`、`"EXCEL"`、`"PPT"`；挂载前可能为 `null`。

## 实例生命周期

`widget.close()` 用于关闭当前文档实例并释放运行时资源。

| 方法 | 说明 | 推荐场景 |
| --- | --- | --- |
| `close()` | 关闭当前 widget，释放文档实例、内部事件监听和挂载资源。 | 页面卸载、业务组件卸载或重新打开文件前调用。 |

调用时机：

- 页面路由切换或业务组件卸载前
- 用户重新选择文件并准备打开新文件前
- 不再需要当前文档 viewer 时

示例：

```ts
let currentWidget: OfficeWidgetApp | null = null;

async function openFile(file: File) {
  await currentWidget?.close();

  const { widget } = await OfficeSdk.openfile({
    docId: `local-${Date.now()}`,
    fileName: file.name,
    file
  });

  currentWidget = widget;
  return widget.mount("#office-container").render();
}

async function disposeViewer() {
  await currentWidget?.close();
  currentWidget = null;
}
```

## URL 文件示例

```ts
const { widget } = await OfficeSdk.openfile({
  docId: "report-xlsx",
  fileName: "report.xlsx",
  file: "https://example.com/report.xlsx"
});

const app = await widget.mount("#office-container").render();
```

## 重新打开文件

重新打开前先销毁旧实例：

```ts
let currentWidget = null;

async function replaceFile(file) {
  await currentWidget?.close();

  const { widget } = await OfficeSdk.openfile({
    docId: `local-${Date.now()}`,
    fileName: file.name,
    file
  });

  const app = await widget.mount("#office-container").render();
  currentWidget = widget;
  return app;
}
```

## 事件示例

事件监听使用组件级 `addEventListener`。按事件归属选择组件：文档加载、导出、缩放事件监听 `Document`，选区事件监听 `Selection`，撤销重做事件监听 `UndoRedo`。

```ts
function onUndoRedoStateChange() {
  console.log("undo/redo changed");
}

const status = app.UndoRedo.addEventListener("UNDO_REDO_STATE_CHANGE", onUndoRedoStateChange);

if (status !== "ok") {
  console.warn(status);
}

app.UndoRedo.removeEventListener("UNDO_REDO_STATE_CHANGE", onUndoRedoStateChange);
```

各文档类型支持的事件名和 payload 见 [API Reference](../api-reference/README.md)。
