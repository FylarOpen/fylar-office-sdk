# Full Evaluation

这是用于完整验证 Office SDK API / 事件的浏览器页面。

> 本目录下的 `index.html` 和 `assets/` 由 `packages/office-sdk/dev-app` 构建生成，不纳入 git 管理。
> 修改页面、样式或交互时，请改内部 dev-app，然后运行 `npm run package:external` 重新生成客户包。

## 功能

- 本地上传 DOC / DOCX / XLS / XLSX / PPTX 并打开
- 可直接新建 DOCX / XLSX / PPTX 空白文件
- 顶部支持中文 / English 切换，会同步界面、下次打开文档的 `mode.lang` 和右侧文档驱动面板
- 支持语言、只读、顶部工具栏、底部状态栏等打开选项
- 右侧 API 面板可从 `docs/Markdown/<locale>/api-reference/*.md` 动态读取 API 方法
- 事件订阅下拉同样从 Markdown 的事件表动态读取
- 点击“刷新文档”后会重新读取 Markdown，适合 SDK API 持续新增时验证
- API 调用结果、错误、事件 payload 统一记录在底部日志中

## 使用

在 SDK 根目录启动本地静态服务：

```bash
python3 -m http.server 8010
```

访问：

```text
http://127.0.0.1:8010/examples/full-evaluation/
```

> 注意：请通过 HTTP 服务访问，不要直接用 `file://` 打开页面。

## 动态读取文档

当前页面根据界面语言和打开的文档类型读取：

```text
docs/Markdown/zh-CN/api-reference/docx.md
docs/Markdown/zh-CN/api-reference/xlsx.md
docs/Markdown/zh-CN/api-reference/pptx.md
docs/Markdown/en-US/api-reference/docx.md
docs/Markdown/en-US/api-reference/xlsx.md
docs/Markdown/en-US/api-reference/pptx.md
```

新增 API 或事件后，只要更新对应 Markdown 表格，再点击右侧“刷新文档”，下拉列表就会重新生成。
