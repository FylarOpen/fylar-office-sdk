# Office SDK 开发者文档

本文档面向接入 `office-sdk` 的前端开发者，聚焦浏览器端嵌入式 Office 组件的接入与使用。

## 文档目录

- [概述](./product-overview/office-sdk-overview.md)
- [开发指南：入门指南](./development-guide/getting-started.md)
- [开发指南：包结构](./development-guide/package-structure.md)
- [开发指南：使用指南](./development-guide/usage-guide.md)
- [开发指南：CSP 部署指南](./development-guide/csp.md)
- [API Reference：总览](./api-reference/README.md)
- [API Reference：公共约定](./api-reference/common.md)
- [API Reference：DOCX](./api-reference/docx.md)
- [API Reference：XLSX](./api-reference/xlsx.md)
- [API Reference：PPTX](./api-reference/pptx.md)

## 文档范围

当前文档主要覆盖以下内容：

- Office SDK 的产品定位与适用场景
- 浏览器环境下的基础接入方式
- 静态 `lib` 发布包的目录结构
- 企业 CSP 环境下的部署配置
- `openfile(...)` 打开流程和 `createfile(...)` 创建流程
- `widget.close()` 实例生命周期方法
- `docx`、`xlsx`、`pptx` 当前 public API 的组件与方法
