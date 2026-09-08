# Changelog

## 1.0.0

### Changed

- SDK source, demo, documentation and release ownership moved to the standalone
  `bamboo.sdk` repository.
- Runtime, locale, worker and WASM assets are resolved relative to the SDK
  package and no longer require `bamboo.server`.
- The source development host reports an explicit
  `NATIVE_FONT_TOOLING_UNAVAILABLE` response when optional native font tooling
  is not installed.
- Added standalone `lib` and `external.zip` delivery.

## 1.0.0

### Features

- 首次公开发布。
- 支持在浏览器中打开和渲染 `.docx`、`.xlsx`、`.pptx` 文档。
- 提供 `configureLicense()` 授权配置接口。
- 提供 `openfile()` 打开文件并获取 widget 实例。
- 支持 `widget.mount()` / `render()` / `close()` 实例生命周期管理。
- 支持顶部工具栏和底部状态栏显示控制 (`uiOptions`)。
- 支持只读模式 (`mode.readOnly`) 和多语言切换 (`mode.lang`)。
- DOCX API：Document、Paragraph、Table、Selection、Finder、UndoRedo。
- XLSX API：Document、Workbook、Worksheet、Selection、Finder、Cursor、UndoRedo。
- PPTX API：Document、Paragraph、TextBox、Player、Selection、Viewer、UndoRedo。
- 提供 HTML、Vue 3、React 18 三种示例工程。
- 提供 TypeScript 类型声明文件 (`UI.d.ts`)。
- 提供 `preload.js` 可选预加载入口。
- 提供完整开发者文档（Markdown + HTML 双格式）。
