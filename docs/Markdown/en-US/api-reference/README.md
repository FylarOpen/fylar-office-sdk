# API Reference

This reference documents the current public APIs exposed by `office-sdk` for browser integration:

- Parameters, return values, and lifecycle for `OfficeSdk.openfile(...)` and `OfficeSdk.createfile(...)`
- Public `app` components returned by `widget.render()`
- Methods, parameters, return values, events, and examples for `docx`, `xlsx`, and `pptx`

## Reading Order

1. Start with [Common API Conventions](./common.md) to understand `openfile(...)`, `createfile(...)`, `widget.mount(...).render()`, the event model, and color parameters.
2. Then read the document-type pages: [DOCX API](./docx.md), [XLSX API](./xlsx.md), and [PPTX API](./pptx.md).

## Component Scope

| Type | Public Components |
| --- | --- |
| DOCX | `Document`, `Paragraph`, `Table`, `Selection`, `Finder`, `UndoRedo` |
| XLSX | `Document`, `Workbook`, `Worksheet`, `Selection`, `Finder`, `Cursor`, `UndoRedo` |
| PPTX | `Document`, `Paragraph`, `TextBox`, `Player`, `Selection`, `Viewer`, `UndoRedo` |

## Basic Example

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

Events are registered through component-level `addEventListener`. Choose the component by event ownership. For example, selection events belong to `Selection`, undo/redo events belong to `UndoRedo`, and document loading or export events belong to `Document`:

```ts
function onUndoRedoStateChange() {
  console.log("undo redo state changed");
}

const status = app.UndoRedo.addEventListener("UNDO_REDO_STATE_CHANGE", onUndoRedoStateChange);

if (status !== "ok") {
  console.warn(status);
}

// Pass the same handler when removing the listener.
const removeStatus = app.UndoRedo.removeEventListener("UNDO_REDO_STATE_CHANGE", onUndoRedoStateChange);
```

## Contents

- [Common API Conventions](./common.md)
- [DOCX API](./docx.md)
- [XLSX API](./xlsx.md)
- [PPTX API](./pptx.md)
