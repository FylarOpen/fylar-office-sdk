# Office SDK 概述

`office-sdk` 是一个可嵌入 Web 页面中的 Office 文档组件 SDK，用于在浏览器中加载、渲染并承载 Office 文档查看能力。

集成方可以在自己的页面中引入 SDK，选择一个 DOM 容器作为挂载点，然后通过统一的接口打开文件并完成渲染。

## 适用场景

Office SDK 适用于以下场景：

- 在业务系统中内嵌 Office 文档预览区域
- 在本地文件选择后直接打开文档进行查看
- 在已有页面中快速嵌入 Word、Excel、PowerPoint 文档组件
- 在现有前端系统中集成统一的文档查看入口

## 目标读者

本文档面向以下读者：

- 负责前端页面集成的开发者
- 需要在 Web 应用中接入 Office 文档能力的项目团队
- 负责客户交付和静态资源部署的工程师

## 核心能力

Office SDK 当前提供以下基础能力：

- 打开本地文件或浏览器可访问地址中的 Office 文件
- 创建新的 DOCX、XLSX 或 PPTX 文件
- 自动识别文档类型并加载对应组件
- 将文档实例挂载到指定 DOM 节点渲染
- 在页面切换或组件销毁时销毁实例并释放资源
- 通过 `uiOptions` 控制顶部工具栏和底部状态栏显示
- 通过 `mode.readOnly` 控制文档以只读模式打开
- 通过 `mode.lang` 指定文档打开时使用的语言
- 暴露公开应用 API 对象用于进一步扩展

## 支持范围

当前主流程支持以下文档类型：

- Word：`.doc`、`.docx`
- Excel：`.xls`、`.xlsx`
- PowerPoint：`.pptx`

## 集成方式

Office SDK 采用静态资源包内嵌集成方式，典型流程如下：

1. 获取并部署 `office-sdk/lib/` 静态资源目录
2. 通过静态路径加载 `UI.js`，SDK 会自动加载 `style.css`
3. 按需引入 `preload.js` 提前请求关键运行时资源
4. 调用 `openfile(...)` 打开文件，或调用 `createfile(...)` 创建文件
5. 将返回的 `widget` 挂载到目标容器并执行渲染
6. 在不再使用时调用 `close()` 关闭实例

## 运行环境建议

建议在支持静态资源部署和 ES Module 的现代 Web 应用中集成 Office SDK。

推荐接入环境：

- 使用最新稳定版 Chrome 或 Chromium Edge 的现代浏览器环境
- 支持 ES Module、动态 `import()`、Web Worker、SharedWorker、WebAssembly、IndexedDB、`Promise`、`Blob`、`ArrayBuffer` 的前端运行环境
- 可正常挂载 DOM 节点的页面应用
- 可部署完整 `office-sdk/lib/` 目录的静态资源服务

### 浏览器兼容性

Office SDK 建议优先使用最新稳定版 Chrome 或 Chromium Edge。当前兼容性以能力检测为准，而不是仅按浏览器版本判断：

| 运行环境 | 建议 |
| --- | --- |
| Chrome / Chromium Edge | 主要支持环境；使用最新稳定版并验证 SharedWorker、IndexedDB 和 WebAssembly。 |
| Firefox / Safari | 上线前在目标版本完成专项验证，尤其确认 SharedWorker 和 IndexedDB 在当前隐私策略下可用。 |
| iOS Safari / iOS WKWebView | 必须在实际容器中验证。WebView 配置、第三方上下文和存储策略可能限制 SharedWorker 或 IndexedDB。 |
| Android WebView | 必须在实际系统 WebView 版本和宿主配置中验证。 |

不支持 Internet Explorer、旧版 EdgeHTML Edge、Android Browser，以及缺少 ES Module、动态 `import()`、SharedWorker、IndexedDB 或 WebAssembly 的浏览器和 WebView。即使相关 API 存在，无痕模式、企业策略或安全容器也可能禁用实际能力。

### PDF 导出要求

`Document.exportPdf(...)` 还要求安全上下文（通常为 HTTPS 或 localhost）、`window.queryLocalFonts` 和本地字体访问权限。不满足这些条件时当前实现不会执行 PDF 导出。
