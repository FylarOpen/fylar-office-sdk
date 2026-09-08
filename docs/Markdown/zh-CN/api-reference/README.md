# API Reference

本文档基于当前 `office-sdk` 已暴露的公开 API 编写，面向浏览器端说明：

- `OfficeSdk.openfile(...)`、`OfficeSdk.createfile(...)` 的参数、返回值和生命周期
- `widget.render()` 返回的公开 `app` 组件
- `docx`、`xlsx`、`pptx` 的方法、参数、返回值、事件和示例

## 阅读顺序

1. 先看 [公共 API 约定](./common.md)，了解 `openfile(...)`、`createfile(...)`、`widget.mount(...).render()`、事件模型和颜色参数。
2. 再按文档类型阅读 [DOCX API](./docx.md)、[XLSX API](./xlsx.md)、[PPTX API](./pptx.md)。

## 组件范围

| 类型 | 当前公开组件 |
| --- | --- |
| DOCX | `Document`、`Paragraph`、`Table`、`Selection`、`Finder`、`UndoRedo` |
| XLSX | `Document`、`Workbook`、`Worksheet`、`Selection`、`Finder`、`Cursor`、`UndoRedo` |
| PPTX | `Document`、`Paragraph`、`TextBox`、`Player`、`Selection`、`Viewer`、`UndoRedo` |


## 基础示例

```ts
const { widget } = await OfficeSdk.openfile({
  docId: `local-${Date.now()}`,
  fileName: file.name,
  file
});

const app = await widget.mount("#office-container").render();

app.Document.setZoom(120);
app.UndoRedo.undo();
```

事件监听使用组件级 `addEventListener`。按事件归属选择组件，例如选区事件监听 `Selection`，撤销重做事件监听 `UndoRedo`，文档加载和导出事件监听 `Document`：

```ts
function onUndoRedoStateChange() {
  console.log("undo redo state changed");
}

const status = app.UndoRedo.addEventListener("UNDO_REDO_STATE_CHANGE", onUndoRedoStateChange);

if (status !== "ok") {
  console.warn(status);
}

// 解绑时传入同一个 handler
const removeStatus = app.UndoRedo.removeEventListener("UNDO_REDO_STATE_CHANGE", onUndoRedoStateChange);
```

## 文档目录

- [公共 API 约定](./common.md)
- [DOCX API](./docx.md)
- [XLSX API](./xlsx.md)
- [PPTX API](./pptx.md)
