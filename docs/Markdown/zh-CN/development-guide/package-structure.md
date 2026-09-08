# 开发指南：包结构

本文档介绍 `office-sdk` 静态 `lib` 发布包的目录结构，以及各目录和文件在接入中的作用。

## 目录结构

`lib/` 是部署时使用的静态资源目录。一个典型目录结构如下：

```text
lib/
├── UI.js
├── preload.js
├── UI.d.ts
├── style.css
├── office.core.js
├── office.locale.js
├── index_browser.js
├── compat-globals.js
├── manifest.json
├── package.json
├── ApiBase.js
├── UI.runtime.js
├── mountDocxApp.js
├── mountXlsxApp.js
├── mountPptxApp.js
├── DropdownPopoverList.js
├── worker/
│   ├── index.js
│   ├── sharedWorkerStorage.worker.js
│   └── wasm/
├── locale-assets/
│   ├── locale.js
│   └── deploy/
│       └── i18n/
└── vendor/
    ├── xregexp-all-min.js
    └── zepto.min.js
```

## 入口文件

- `UI.js`
  对外主入口文件。通过它调用 `openfile(...)` 或 `createfile(...)`。
- `preload.js`
  可选预加载入口。导入后会提前请求关键 JavaScript 运行时、worker 入口和文档应用模块，用于降低首次打开文档的部分加载延迟；它不会预取全部 `.wasm` 二进制或所有语言部署文件。
- `style.css`
  SDK 页面样式文件，接入页面时需要显式引入。
- `UI.d.ts`
  TypeScript 类型声明文件，仅在 TS 工程中提供类型提示，不参与浏览器运行。
  其中包含 `OfficeSdkOpenOptions`、`OfficeSdkUiOptions`、`OfficeSdkOpenMode` 等公开类型。

## 运行时核心文件

- `office.core.js`
  Office 核心运行时代码。
- `office.locale.js`
  语言和本地化相关运行时代码。
- `worker/`
  Worker 运行时资源目录，文档加载过程中会依赖其中脚本和 `wasm/` 资源。
- `locale-assets/`
  多语言资源目录，当前语言资源位于 `locale-assets/deploy/i18n/`。
- `vendor/`
  运行时依赖的第三方脚本目录。

## 运行时拆分模块

下面这些文件属于 SDK 拆分后的运行时模块：

- `UI.runtime.js`
- `ApiBase.js`
- `index_browser.js`
- `compat-globals.js`
- `mountDocxApp.js`
- `mountXlsxApp.js`
- `mountPptxApp.js`
- `DropdownPopoverList.js`

这些文件不需要手动引入，但部署时必须和其余资源一起保留，否则 `UI.js` 在运行时可能无法按相对路径加载依赖模块。

## 辅助文件

- `manifest.json`
  发布产物清单，可用于排查资源完整性和入口映射。
- `package.json`
  静态资源包的元数据文件，记录包名、版本、入口、类型声明和样式入口。它用于交付识别和工具侧读取元信息。

## 部署建议

部署时请保留完整目录结构，不建议：

- 只拷贝 `UI.js`
- 改动 `worker/`、`locale-assets/`、`vendor/` 的相对位置
- 手动删除看起来没有直接引用的运行时模块

建议将整个 `lib/` 目录映射为统一静态路径，例如：

```text
/office-sdk/
```
