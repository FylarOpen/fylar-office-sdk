# 开发指南：入门指南

本文档介绍如何在前端页面中快速接入 `office-sdk`，并完成最小可运行的文档打开和渲染。

## 接入前环境确认

请先确认接入页面运行在支持 ES Module、动态 `import()`、Web Worker、SharedWorker、WebAssembly、IndexedDB、`Promise`、`Blob` 和 `ArrayBuffer` 的浏览器环境中。

SharedWorker 和 IndexedDB 是当前打开流程的必需能力。除了检查 API 是否存在，还要确认无痕模式、企业策略、第三方上下文限制或 WebView 配置没有禁用它们。兼容性建议见 [Office SDK 概述](../product-overview/office-sdk-overview.md)。

## 第一步：部署静态资源包

请将发布产物中的整个 `lib/` 目录部署到静态资源目录中，建议映射为：

```text
/office-sdk/
```

部署时请保留完整目录结构，不要只拷贝单个入口文件。

典型部署后的访问路径示例：

```text
/office-sdk/UI.js
/office-sdk/preload.js
/office-sdk/style.css
/office-sdk/worker/index.js
```

## 第二步：准备挂载容器

在页面中准备一个容器节点，用于承载 Office 文档组件。

```html
<div id="office-container"></div>
```

建议为挂载容器设置明确的宽高，否则页面可能无法按预期展示文档区域。

```css
#office-container {
  width: 100%;
  height: 720px;
  overflow: hidden;
}
```

## 第三步：按需预加载

加载 `UI.js` 时 SDK 会自动插入 `/office-sdk/style.css`，通常不需要手动在页面中引入样式。

如果希望样式更早下载、减少首次渲染等待，也可以在页面头部提前声明：

```html
<link rel="stylesheet" href="/office-sdk/style.css" />
```

如果页面进入后大概率会马上打开文档，可以引入 `preload.js`，提前请求关键 JavaScript 运行时、worker 入口和文档应用模块：

```html
<script type="module">
  import "/office-sdk/preload.js";
</script>
```

如果是在 Vite、Webpack 等工程中，也可以运行时动态加载：

```ts
function preloadOfficeSdk() {
  const preloadEntry = new URL("/office-sdk/preload.js", window.location.origin).href;
  void import(/* @vite-ignore */ preloadEntry);
}
```

`preload.js` 不会预取全部 `.wasm` 二进制或所有语言部署文件，这些资源仍可能在首次打开文档时按需加载。它会请求较多运行时资源，更适合文档详情页、预览页或用户点击“立即打开”前后的场景；如果当前页面只是普通列表页，建议按需触发，不要无条件预加载。

## 第四步：加载 SDK 入口

`UI.js` 本身是标准 ES Module 文件，可以按接入环境选择两种方式。

### 方式一：原生 ESM 页面直接静态导入

如果页面本身就是浏览器原生 `type="module"` 环境，可以直接使用静态 `import`：

```html
<script type="module">
  import OfficeSdk from "/office-sdk/UI.js";

  // 后续可通过 OfficeSdk.openfile(...) 打开文档。
</script>
```

### 方式二：在现有前端工程中运行时动态加载

如果是在 Vite、Webpack 等现有前端工程中接入，通常更推荐通过运行时动态加载 `UI.js`，这样可以避免构建工具在编译阶段接管 `/office-sdk/UI.js` 的解析和打包。

示例：

```ts
async function getOfficeSdk() {
  const widgetUiEntry = new URL("/office-sdk/UI.js", window.location.origin).href;
  const module = await import(/* @vite-ignore */ widgetUiEntry);
  return module.default;
}
```

如果工程环境明确支持按 URL 直接导入模块，也可以使用：

```ts
import OfficeSdk from "/office-sdk/UI.js";
```

## 第五步：打开文件并渲染

下面的示例展示了最小可运行接入流程。

```ts
async function openOfficeFile(file) {
  const { widget } = await OfficeSdk.openfile(
    {
      docId: `local-${Date.now()}`,
      fileName: file.name,
      file
    },
    {
      uiOptions: {
        showTopBar: true,
        showBottomBar: true
      }
    }
  );

  const app = await widget.mount("#office-container").render();
  return { widget, app };
}
```

页面切换、组件卸载或重新打开文件前，需要关闭旧实例：

```ts
await widget.close();
```

`close()` 会关闭当前文档实例、卸载组件并释放 SDK 内部资源。推荐在业务组件的卸载钩子或重新打开文件前调用。

如果需要控制 SDK 的显示状态，可以通过第二个参数传入配置对象：

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

- `showTopBar`
  控制顶部工具栏显示和隐藏，不传时使用 SDK 默认布局
- `showBottomBar`
  控制底部状态栏显示和隐藏，不传时使用 SDK 默认布局
- `mode.readOnly`
  为 `true` 时，文档会以只读模式打开
- `mode.lang`
  指定文档打开时使用的语言，例如 `zh-CN`、`en-US`

如果还需要同时传用户信息，可以这样写：

```ts
const { widget } = await OfficeSdk.openfile(
  {
    fileName: file.name,
    file
  },
  {
    userData: {
      userId: "u1",
      nickName: "Alice"
    },
    uiOptions: {
      showTopBar: false,
      showBottomBar: true
    },
    mode: {
      readOnly: false,
      lang: "zh-CN"
    }
  }
);
```

## 常见问题

### 1. 为什么会提示挂载节点找不到？

`widget.mount(...)` 接收 `HTMLElement` 或字符串。以 `#`、`.`、`[` 开头的字符串按 CSS 选择器处理，其他字符串按 DOM 元素 id 处理。请确认：

- 传入的选择器在当前页面中存在
- 调用时页面 DOM 已经完成渲染
- 挂载容器没有被条件渲染隐藏或销毁

### 2. 为什么静态资源部署后仍然加载失败？

请重点检查以下内容：

- 是否部署了完整的 `lib/` 目录，而不是只部署 `UI.js`
- `style.css`、`worker/`、`worker/wasm/`、`locale-assets/`、`vendor/` 是否都可以通过浏览器访问
- `UI.js` 的访问路径是否与页面中实际引用路径一致
- 发布到服务器后是否改动了文件相对位置，导致运行时依赖无法按相对路径加载
- 如果页面配置了 CSP，请参考 [CSP 部署指南](./csp.md) 检查 `script-src`、`worker-src`、`style-src`、`img-src` 和 `connect-src`
- 页面和 `worker/` 是否同源；仅配置 CORS 不能保证跨域 SharedWorker 可用
- 浏览器是否允许 SharedWorker 和 IndexedDB
