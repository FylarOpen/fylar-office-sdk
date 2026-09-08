# shared

本目录提供 HTML / Vue / React 示例可复用的轻量 helper。

## 文件

| 文件 | 用途 |
| --- | --- |
| `officeWidget.js` | 封装文件类型校验、SDK 打开/新建/挂载/关闭、容器 resize 刷新和错误分类。 |
| `ui-defaults.js` | 提供语言列表、默认打开选项和 `buildOpenOptions(state, demoTag)`。 |

## 使用示例

```js
import OfficeUI from "../lib/UI.js";
import { createOfficeController, classifyError } from "./officeWidget.js";
import { buildOpenOptions, createDefaultState } from "./ui-defaults.js";

const controller = createOfficeController({ OfficeUI });
const state = createDefaultState();

try {
  await controller.open(
    container,
    { fileName: file.name, file },
    buildOpenOptions(state, "html-demo"),
  );
} catch (error) {
  const info = classifyError(error);
  console.warn(info.title, info.detail);
}

// 1 / 2 / 3 分别新建 DOCX、XLSX、PPTX。
await controller.create(
  container,
  1,
  buildOpenOptions(state, "html-demo"),
);
```

页面切换、重新打开文件或组件销毁前，建议调用：

```js
await controller.close();
```

`controller.close()` 会调用 widget 的 `close()`。

## 错误分类

`classifyError(error)` 会返回 `{ kind, title, detail }`，便于示例页面展示统一错误提示。

| `kind` | 含义 |
| --- | --- |
| `no-file` | 未选择文件或未传入 `fileData.file`。 |
| `missing-file-name` | 缺少带扩展名的 `fileName`。 |
| `no-container` | viewer 容器尚未挂载或无效。 |
| `unsupported` | 文件类型不在 `doc`、`docx`、`xls`、`xlsx`、`pptx` 支持范围内。 |
| `invalid-create-type` | 新建文件时传入的文档类型不是 `1`、`2`、`3`。 |
| `create-unsupported` | 当前 SDK 未提供 `createfile` 接口。 |
| `asset` | `lib/` 静态资源、worker、wasm、语言包或 vendor 资源加载失败。 |
| `open-failed` | SDK 未返回可挂载的 widget 实例。 |
| `create-failed` | SDK 的 `createfile` 调用失败。 |
| `cancelled` | 新打开请求接管当前 viewer，通常无需展示为失败。 |
| `unknown` | 未匹配到已知分类的错误。 |
