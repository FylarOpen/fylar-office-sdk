# Fylar Office SDK 示例与文档

> **版本**: 1.0.0 | **最后更新**: 2026-09-08

[English](./README.md) · 简体中文

## 目录说明

| 目录 | 说明 |
| --- | --- |
| `lib/` | Office SDK 运行时产物，部署时需要保持目录结构不变。 |
| `docs/HTML/` | 静态 HTML 文档，默认打开中文文档；英文文档保留在 `docs/HTML/en-US/`。 |
| `docs/Markdown/` | 双语原始 Markdown 文档，便于二次整理或导入内部知识库。 |
| `examples/full-evaluation/` | 完整验证页面，可用于客户本地测试打开、新建、API 调用和事件订阅。 |
| `examples/html/` | 原生 HTML 示例，可直接通过静态服务器访问。 |
| `examples/vue/` | Vue 3 + Vite 示例，演示组件化接入方式。 |
| `examples/react/` | React 18 + Vite 示例，演示组件化接入方式。 |
| `shared/` | 跨示例复用的文件校验、打开参数和 widget 生命周期 helper。 |

## 文档入口

完整文档已经生成在 `docs/HTML/`，默认进入中文文档，并可在文档页面内切换英文。建议和示例一起通过 HTTP 静态服务访问：

```text
http://127.0.0.1:8000/docs/HTML/
```

英文文档也可以直接访问：

```text
http://127.0.0.1:8000/docs/HTML/en-US/
```

如果需要查看或同步源文档，可以使用 `docs/Markdown/zh-CN/` 和 `docs/Markdown/en-US/`。

## 启动 HTML 示例

需要在 SDK 包根目录 启动静态服务器，不能直接用 `file://` 打开：

```bash
python3 -m http.server 8000
```

或：

```bash
npx http-server -p 8000
```

服务启动后访问：

```text
http://127.0.0.1:8000/examples/html/
```

HTML 示例内置了文件类型校验、DOCX/XLSX/PPTX 新建入口、语言/只读/工具栏选项、失败提示和重新打开前的实例销毁逻辑，可作为原生 JS 接入参考。

完整验证示例访问：

```text
http://127.0.0.1:8000/examples/full-evaluation/
```

该页面是打包后的静态产物，适合用来验证 SDK 打开/新建文档、API 调用、事件订阅和双语文档读取。

## 启动 Vue / React 示例

Vue 示例：

```bash
cd examples/vue
npm install
npm run dev
```

默认开发地址 `http://127.0.0.1:5173/`。如需预览构建产物，可运行 `npm run build && npm run preview`，默认预览地址为 `http://127.0.0.1:4173/`。

React 示例：

```bash
cd examples/react
npm install
npm run dev
```

默认开发地址 `http://127.0.0.1:5174/`。如需预览构建产物，可运行 `npm run build && npm run preview`，默认预览地址为 `http://127.0.0.1:4174/`。

## 静态目录接入

```ts
import OfficeSdk from "./lib/UI.js";

const { widget } = await OfficeSdk.openfile({
  fileName: "demo.docx",
  file: fileBlob
});

const app = await widget.mount("#office-container").render();

// 页面切换、组件销毁或重新打开文件前建议等待实例关闭完成。
await widget.close();
```

`UI.js` 会自动加载同目录的 `style.css`。如果希望样式更早下载，可以在入口文件里额外 `import "./lib/style.css"`。

新建空白文档时，传入 `1`、`2`、`3` 分别创建 DOCX、XLSX、PPTX：

```ts
const { widget } = await OfficeSdk.createfile(1, options);
const app = await widget.mount("#office-container").render();
```

也可以复用 `shared/officeWidget.js` 中的 controller，统一处理重新打开文件前的实例关闭、容器 resize 后的可视区域刷新，以及常见错误提示分类。更多说明见 `shared/README.md`。

如果页面进入后需要马上打开文档，可以额外预加载：

```ts
import "./lib/preload.js";
```

`preload.js` 只是提前加载 SDK runtime、worker 和文档应用 chunk；不引入它时，`UI.js` 仍会按需加载。

## API

### openfile 接口

#### 方法签名

`openfile(...)` 用于创建一个待挂载的 Office 文档 widget：

```ts
const result = await OfficeSdk.openfile(fileData, options);
```

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fileData` | `OfficeWidgetFileData` | 文件信息对象，包含文件名、文件内容或文件 URL。 |
| `options` | `OfficeSdkOpenOptions` | 可选打开配置，包含用户、界面和打开模式。 |

#### 完整示例

```ts
import OfficeSdk from "./lib/UI.js";

const { widget } = await OfficeSdk.openfile(
  {
    fileName: "demo.docx",
    file
  },
  {
    userData: {
      userId: "u1",
      nickName: "Alice"
    },
    uiOptions: {
      showTopBar: true,
      showBottomBar: true
    },
    mode: {
      lang: "zh-CN",
      readOnly: false
    }
  }
);

const app = await widget.mount("#office-container").render();
```

#### fileData 参数

`openfile(...)` 的第一个参数为文件信息对象：

```ts
type OfficeWidgetFileData = {
  docId?: string;
  fileName: string;
  file: Blob | ArrayBuffer | ArrayBufferView | string | null | undefined;
};
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `docId` | `string` | 可选。文档 ID，用于缓存、协同和实例生命周期标识；不传时 SDK 会根据文件信息自动生成本地 ID。 |
| `fileName` | `string` | 必填。用于识别文档类型，建议始终显式传入。 |
| `file` | <code>Blob \| ArrayBuffer \| ArrayBufferView \| string \| null \| undefined</code> | 必填。支持二进制文件数据、TypedArray 和字符串形式的 URL。 |

#### options 参数

`openfile(...)` 的第二个参数为可选配置对象：

```ts
type OfficeSdkOpenOptions = {
  userData?: OfficeSdkUser | null;
  uiOptions?: OfficeSdkUiOptions;
  mode?: OfficeSdkOpenMode;
};
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `userData` | `OfficeSdkUser \| null` | 可选。当前用户信息；不传时 SDK 会自动补充一个默认本地用户。 |
| `uiOptions` | `OfficeSdkUiOptions` | 可选。控制顶部工具栏和底部状态栏显示。 |
| `mode` | `OfficeSdkOpenMode` | 可选。控制只读状态和打开语言。 |

#### userData 参数

```ts
type OfficeSdkUser = {
  clientId?: string;
  userId?: string;
  nickName?: string;
  avatar?: string;
  opts?: Record<string, unknown>;
};
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `clientId` | `string` | 可选。客户端标识。 |
| `userId` | `string` | 可选。用户 ID。 |
| `nickName` | `string` | 可选。用户昵称。 |
| `avatar` | `string` | 可选。用户头像地址。 |
| `opts` | `Record<string, unknown>` | 可选。业务侧扩展字段。 |

#### mode 参数

`mode` 用于传递文档打开模式配置：

```ts
type OfficeSdkOpenMode = {
  readOnly?: boolean;
  lang?: "zh-CN" | "en-US" | (string & {});
};
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `readOnly` | `boolean` | 可选。为 `true` 时，SDK 会以只读模式打开文档，默认 `false`。 |
| `lang` | `"zh-CN" \| "en-US" \| string` | 可选。指定文档打开语言；不传时会依次回退到 `window.lang`、`<html lang>`、浏览器语言。 |

#### uiOptions 参数

`uiOptions` 用于控制 SDK 自带的顶部工具栏和底部状态栏：

```ts
type OfficeSdkUiOptions = {
  showTopBar?: boolean;
  showBottomBar?: boolean;
};
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `showTopBar` | `boolean` | 可选。是否显示顶部工具栏，默认 `true`。 |
| `showBottomBar` | `boolean` | 可选。是否显示底部状态栏，默认 `true`。 |

如果只想传 UI 配置，可以直接写：

```ts
const { widget } = await OfficeSdk.openfile(
  {
    fileName: "demo.xlsx",
    file
  },
  {
    uiOptions: {
      showTopBar: true,
      showBottomBar: false
    }
  }
);
```

### 返回值

`openfile(...)` 返回：

```ts
type OfficeWidgetOpenResult = {
  docType: number;
  widget: OfficeWidgetApp;
};
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `docType` | `number` | 数字类型的文档类型标识。 |
| `widget` | `OfficeWidgetApp` | 可挂载、可渲染、可关闭的实例对象。 |

### widget 实例

`widget` 提供以下能力：

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `mount(target)` | `(target: string \| HTMLElement) => OfficeWidgetApp` | 指定挂载节点，`target` 支持 CSS 选择器字符串或 `HTMLElement`。 |
| `render()` | `() => Promise<OfficeSdkRenderedApp>` | 执行渲染，返回文档应用实例。 |
| `close()` | `() => Promise<void>` | 关闭当前实例并释放运行时资源。 |
| `docId` | `string` | 当前文档 ID。 |
| `docType` | `number` | 当前文档类型。 |
| `docTypeName` | `string` | 当前文档类型名。 |

### 实例生命周期

推荐的实例生命周期如下：

1. 调用 `openfile(...)` 创建待挂载实例
2. 调用 `widget.mount(...)` 指定容器
3. 调用 `widget.render()` 执行渲染
4. 在页面切换、组件销毁或重新打开文件前调用 `widget.close()`

### 重新打开文件

在重新打开文件前，建议先关闭旧实例：

```ts
let currentWidget = null;

async function replaceFile(file) {
  await currentWidget?.close();

  const { widget } = await OfficeSdk.openfile({
    fileName: file.name,
    file
  });

  await widget.mount("#office-container").render();
  currentWidget = widget;
}
```

## 部署注意事项

- 需要通过 HTTP/HTTPS 静态服务访问，不支持直接 `file://` 打开示例。
- 部署时需要完整复制 `lib/`，包括 `worker/wasm/*.wasm`、`locale-assets/` 和 `vendor/`。
- 服务器需要能正确返回 `.wasm` 文件；推荐 MIME 为 `application/wasm`。
- `lib/manifest.json` 记录了入口、worker、wasm 和内部 chunk，可用于部署侧白名单校验。
- `lib/package.json` 记录了静态资源包的名称、版本、入口、类型声明和样式入口，便于交付识别和工具侧读取元信息。
- 如果部署到 CDN，请保持 `lib` 内部文件的相对路径关系不变。
