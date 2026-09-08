# 公共 API 约定

本文说明 `office-sdk` 的入口、实例生命周期、通用类型、事件模型和颜色参数。各产品组件方法见 [DOCX](./docx.md)、[XLSX](./xlsx.md)、[PPTX](./pptx.md)。

## 入口

公开入口位于部署后的静态资源目录。以下示例假设 `lib/` 被映射为 `/office-sdk/`：

```html
<script type="module">
  import "/office-sdk/preload.js";
  import OfficeSdk from "/office-sdk/UI.js";
</script>
```

`UI.js` 会自动加载同目录的 `style.css`。如需让样式更早下载，也可以在页面头部额外声明 `<link rel="stylesheet" href="/office-sdk/style.css" />`。

`preload` 是可选入口，用来提前请求关键 JavaScript 运行时、worker 入口和文档应用模块。它不会预取全部 `.wasm` 二进制或所有语言部署文件；这些资源仍可能在首次打开文档时按需加载。页面会马上打开文档时推荐引入；普通列表页可以等用户点击打开后再加载。

## 运行环境前置条件

打开文档依赖以下浏览器能力：

- ES Module 和动态 `import()`
- Web Worker、SharedWorker 和 WebAssembly
- IndexedDB
- `Promise`、`Blob`、`ArrayBuffer`

SharedWorker 和 IndexedDB 是当前打开流程的必需能力，缺少任意一项都可能导致 `render()` 失败。还应确认浏览器隐私策略、无痕模式、企业安全策略或 WebView 容器没有禁用这些能力。

SDK worker 默认通过 `new SharedWorker(workerUrl)` 直接创建，因此建议将完整 `lib/` 与宿主页面同源部署。仅配置 CORS 不能保证跨域 SharedWorker 可用，详见 [CSP 部署指南](../development-guide/csp.md)。

## openfile

签名：

```ts
function openfile(
  fileData: OfficeWidgetFileData,
  options?: OfficeSdkOpenOptions | null
): Promise<OfficeWidgetOpenResult>;
```

最小示例：

```ts
const { docType, widget } = await OfficeSdk.openfile({
  docId: `local-${Date.now()}`,
  fileName: file.name,
  file
});

const app = await widget.mount("#office-container").render();
```

带用户、UI 和打开模式：

```ts
const { widget } = await OfficeSdk.openfile(
  {
    docId: "contract-001",
    fileName: "contract.docx",
    file
  },
  {
    userData: {
      userId: "u1",
      clientId: "web-001",
      nickName: "Alice",
      avatar: "https://example.com/avatar.png",
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

const app = await widget.mount(document.getElementById("office-container")!).render();
```

## createfile

创建新的 Office 文件：

```ts
type OfficeWidgetCreateDocType = 1 | 2 | 3;

function createfile(
  docType: OfficeWidgetCreateDocType,
  options?: OfficeSdkOpenOptions | null
): Promise<OfficeWidgetOpenResult>;
```

参数说明：

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `docType` | `OfficeWidgetCreateDocType` | 是 | 需要创建的 Office 文档类型标识。 |
| `options` | `OfficeSdkOpenOptions \| null` | 否 | 用户信息、界面配置、语言及只读模式等创建选项。 |

文档类型标识：

| 标识值 | 文档类别 | 文件格式 | 扩展名 |
| --- | --- | --- | --- |
| `1` | Word 文档 | Office Open XML Wordprocessing Document | `.docx` |
| `2` | Excel 工作簿 | Office Open XML Spreadsheet | `.xlsx` |
| `3` | PowerPoint 演示文稿 | Office Open XML Presentation | `.pptx` |

```ts
const { widget } = await OfficeSdk.createfile(1, {
  mode: { lang: "zh-CN" }
});

const app = await widget.mount("#office-container").render();
```

每次调用都会生成独立的 `docId`。`options`、返回值和 widget 生命周期与 `openfile(...)` 相同。

## fileData

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
| `fileName` | 是 | 文件名，用扩展名识别文档类型。当前 `openfile(...)` 支持 `doc`、`docx`、`xls`、`xlsx`、`pptx`。 |
| `file` | 是 | 文件内容或浏览器可访问的文件地址。支持 `File`/`Blob`、`ArrayBuffer`、`TypedArray`，以及 `blob:`、`data:`、`http(s):`、`file:`、以 `/` 开头的绝对路径、以 `./` 或 `../` 开头的相对路径。普通字符串（如 `files/a.docx`）不会被识别为 URL。不能传 `null` 或 `undefined`。 |

URL 打开示例：

```ts
const { widget } = await OfficeSdk.openfile({
  docId: "report-xlsx",
  fileName: "report.xlsx",
  file: "https://example.com/files/report.xlsx"
});

await widget.mount("#office-container").render();
```

## options

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
| `mode.readOnly` | 是否以只读模式打开。`true` 时 SDK 会在文档加载后设置只读状态。 |
| `mode.lang` | 语言，例如 `zh-CN`、`en-US`。不传时依次回退到 `window.lang`、`<html lang>`、浏览器语言。 |

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

`docType` 取值：

| 值 | 类型 |
| --- | --- |
| `1` | Word / DOCX |
| `2` | Excel / XLSX |
| `3` | PowerPoint / PPTX |

`widget.mount(target)` 支持：

```ts
widget.mount("#office-container");
widget.mount("office-container");
widget.mount(document.getElementById("office-container")!);
```

字符串以 `#`、`.` 或 `[` 开头时按 CSS 选择器处理；其他字符串按 DOM `id` 处理。不要传入以标签名或复杂组合开头的选择器，例如 `"main .office-container"`。

`widget.render()` 会等待文档 ready，成功后返回当前文档的公开 `app` API 对象。后续 API 均按 `app.Component.method(...)` 调用。

`widget.docTypeName` 在挂载完成后通常为 `"WORD"`、`"EXCEL"`、`"PPT"`；挂载前可能为 `null`。

### widget 生命周期

`widget.close()` 用于关闭当前文档实例并释放运行时资源。

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `close` | `close(): Promise<void>` | 关闭当前 widget，释放文档实例、内部事件监听和挂载资源。 |

建议在以下场景调用：

- 页面路由切换或业务组件卸载前
- 用户重新打开另一个文件前
- 不再需要当前文档 viewer 时

`close()` 返回 `Promise<void>`，调用方应 `await` 完成后再复用同一个容器打开新文档。

关闭示例：

```ts
let currentWidget: Awaited<ReturnType<typeof OfficeSdk.openfile>>["widget"] | null = null;

async function openFile(file: File) {
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

## 错误处理与排查

`openfile(...)` 和 `widget.render()` 是异步方法；`widget.mount(...)` 是同步链式调用。建议使用 `try...catch` 包住打开与渲染流程，并把原始错误记录到日志中。

```ts
try {
  const { widget } = await OfficeSdk.openfile({
    fileName: file.name,
    file
  });

  await widget.mount("#office-container").render();
} catch (error) {
  console.error("[office-sdk] open failed", error);
}
```

外部示例中的 `shared/officeWidget.js` 提供了 `classifyError(error)`，用于把常见打开失败转换成适合页面展示的 `kind`、`title` 和 `detail`。它是示例 helper，不是 `UI.js` 的公开导出；可以直接复用，也可以按同样规则在业务工程中实现。

常见错误分类：

| `kind` | 常见触发原因 | 排查建议 |
| --- | --- | --- |
| `no-file` | 未传入文件内容，或用户尚未选择文件。 | 确认 `fileData.file` 是有效的 `File`、`Blob`、`ArrayBuffer`、`TypedArray` 或 URL 字符串。 |
| `missing-file-name` | 缺少 `fileName`。 | 传入带扩展名的 `fileName`，SDK 会根据扩展名识别文档类型。 |
| `no-container` | 挂载容器不存在或尚未渲染。 | 确认 `mount(...)` 传入的选择器或 `HTMLElement` 有效，并在 DOM 挂载后调用。 |
| `unsupported` | 文件扩展名不在支持范围内。 | 当前主流程支持 `doc`、`docx`、`xls`、`xlsx`、`pptx`。 |
| `asset` | `worker`、`wasm`、语言包或运行时 chunk 加载失败。 | 确认完整部署 `lib/`，服务器能访问 `worker/`、`worker/wasm/`、`locale-assets/`、`vendor/`，并正确返回 `.wasm` MIME。 |
| `open-failed` | SDK 未返回可挂载的 `widget`。 | 记录原始错误和 `fileData`，检查文件是否损坏或运行时资源是否完整。 |
| `cancelled` | 新的打开请求接管了当前 viewer。 | 通常无需展示为失败；重新打开文件时可忽略该错误。 |
| `unknown` | 未匹配到上述分类的错误。 | 展示通用失败提示，同时上报原始错误信息便于定位。 |

## app 组件

`render()` 返回的 `app` 是当前文档类型的公开 API 对象。常见组件：

| 文档类型 | 组件 |
| --- | --- |
| DOCX | `Document`、`Paragraph`、`Table`、`Selection`、`Finder`、`UndoRedo` |
| XLSX | `Document`、`Workbook`、`Worksheet`、`Selection`、`Finder`、`Cursor`、`UndoRedo` |
| PPTX | `Document`、`Paragraph`、`TextBox`、`Player`、`Selection`、`Viewer`、`UndoRedo` |

示例：

```ts
app.Document.setZoom(120);
app.UndoRedo.undo();
```

## 事件模型

公开 API 使用组件级事件入口。

### 组件事件

`Document`、`Selection`、`Finder`、`UndoRedo` 等组件继承通用事件方法：

```ts
type EventStatus =
  | "ok"
  | "no such event"
  | "duplicated event callback"
  | "no such callback";

component.addEventListener(eventName, handler): EventStatus;
component.removeEventListener(eventName, handler): EventStatus;
```

使用方式：

```ts
function onSelectionChange(info) {
  console.log(info);
}

const status = app.Selection.addEventListener("SELECTION_CHANGE", onSelectionChange);

if (status !== "ok") {
  console.warn("listen failed:", status);
}

// 解绑时必须传入同一个 handler 函数
const removeStatus = app.Selection.removeEventListener("SELECTION_CHANGE", onSelectionChange);
```

事件属于哪个组件，以各产品页的“组件事件”表为准。常见归属如下：

| 场景 | 组件 | 示例事件 |
| --- | --- | --- |
| 文档加载、导出、缩放、页码变化 | `app.Document` | `DOCUMENT_EXPORT_READY`、`DOCX_END_LOADING`、`XLSX_WORKSHEET_CHANGE`、`PPTX_SLIDES_CHANGED` |
| 选区变化 | `app.Selection` | `SELECTION_CHANGE` |
| 查找面板请求 | `app.Finder` | `DOCX_OPEN_FIND_UI`、`XLSX_OPEN_FIND_UI` |
| 撤销重做状态变化 | `app.UndoRedo` | `UNDO_REDO_STATE_CHANGE` |

传入不属于当前组件的事件名会返回 `"no such event"`。组件事件不接收 `options` 参数；如果只需要触发一次，可以在回调中主动解绑：

```ts
function onExportReady() {
  app.Document.removeEventListener("DOCUMENT_EXPORT_READY", onExportReady);
  console.log("export ready");
}

app.Document.addEventListener("DOCUMENT_EXPORT_READY", onExportReady);
```




## 颜色参数

DOCX 和 XLSX 常用 RGB 对象：

```ts
{ r: 255, g: 0, b: 0 }
```

RGB 对象只接收 `r`、`g`、`b` 三个通道，当前不支持 `a`/alpha 字段。

DOCX 还支持主题色对象：

```ts
{ name: "accent1", theme: 4, tint: 0, shade: 0 }
```

XLSX `Selection.setFontColor`、`Selection.setFillColor` 和边框颜色直接接收 RGB、主题色、索引色或 `rgbHex` 对象：

```ts
{ r: 255, g: 0, b: 0 }
{ theme: 4, tint: 0 }
{ indexed: 10 }
{ rgbHex: "FFFF0000" }
```

`rgbHex` 可使用 6 位 `RRGGBB` 或 8 位 `AARRGGBB`；只有 8 位 `rgbHex` 可以携带 alpha。它与不支持透明度的 RGB 对象不是同一种参数形式。

如果业务层使用的是色盘 UI 原始值，例如 `{ hex: "#FF0000", type: "standard", name: "red" }`，需要先转换成上面的 RGB 或主题色对象再传给 XLSX `Selection.*` 样式 API。

PPTX 字体颜色支持字符串或带 `hex` 的对象：

```ts
"#4472C4"
"rgb(68, 114, 196)"
{ hex: "#4472C4", type: "theme", name: "accent1" }
```

新接入建议统一使用 `{ hex: "#RRGGBB" }` 对象；字符串形式保留兼容，不建议作为业务侧首选入参。

PPTX 对象形式必须提供 `hex`；`type`、`name`、`theme`、`tint` 等字段仅作为色盘元数据随对象携带，当前不支持仅传 `{ name, theme }` 形式的主题色。

调色板类 API 通常返回：

```ts
{
  theme: unknown[];
  standard: unknown[];
}
```

## 常见约束

- 样式类 API 多数依赖当前选区。没有有效选区时可能无效果。
- 导出方法是异步方法，建议始终 `await`。
- `exportPdf(...)` 需要安全上下文（通常为 HTTPS 或 localhost）、`window.queryLocalFonts` 能力和本地字体访问权限。不满足条件时当前实现会直接结束，不执行 PDF 导出。
- DOCX 的 `Table.*` 需要当前光标或选区位于表格上下文中。
- XLSX 的 `Selection.*` 面向当前活动单元格或选区。
- PPTX 的 `Paragraph.*` 与 `TextBox.*` 依赖当前选中的文本框或文本选区。
