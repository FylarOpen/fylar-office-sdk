# Development Guide: Usage Guide

This guide describes the standard `office-sdk` open flow, parameters, return values, and instance lifecycle. For component-level APIs, see the [API Reference](../api-reference/README.md).

## Basic Flow

The example below assumes a native browser ESM page, or that `/office-sdk/UI.js` has already been dynamically loaded as described in [Getting Started](./getting-started.md). When integrating with a Vite, Webpack, or similar application project, use the runtime dynamic import pattern from the getting started guide.

```ts
import "/office-sdk/preload.js";
import OfficeSdk from "/office-sdk/UI.js";

const { docType, widget } = await OfficeSdk.openfile(
  {
    docId: "demo-001",
    fileName: "demo.docx",
    file
  },
  {
    userData: {
      userId: "u1",
      clientId: "web-001",
      nickName: "Alice",
      opts: { color: "#2F80ED" }
    },
    uiOptions: {
      showTopBar: true,
      showBottomBar: true
    },
    mode: {
      readOnly: false,
      lang: "en-US"
    }
  }
);

const app = await widget.mount("#office-container").render();
app.Document.setZoom(120);
```

## openfile Signature

```ts
function openfile(
  fileData: OfficeWidgetFileData,
  options?: OfficeSdkOpenOptions | null
): Promise<OfficeWidgetOpenResult>;
```

To create a blank document, call `OfficeSdk.createfile(1 | 2 | 3, options)`, where `1`, `2`, and `3` represent DOCX, XLSX, and PPTX. Its return value and widget lifecycle match `openfile(...)`.

## fileData Parameter

```ts
type OfficeWidgetFileData = {
  docId?: string;
  fileName: string;
  file: File | Blob | ArrayBuffer | ArrayBufferView | string;
};
```

| Field | Required | Description |
| --- | --- | --- |
| `docId` | No | Document ID used for caching and instance lifecycle identification. If omitted, the SDK generates one from file information. |
| `fileName` | Yes | File name. The extension is used to identify the document type. `openfile(...)` currently supports `doc`, `docx`, `xls`, `xlsx`, and `pptx`. |
| `file` | Yes | File content or a browser-accessible file URL. Supports `File`/`Blob`, `ArrayBuffer`, `TypedArray`, plus `blob:`, `data:`, `http(s):`, `file:`, absolute paths beginning with `/`, and relative paths beginning with `./` or `../`. A plain string such as `files/a.docx` is not recognized as a URL. Do not pass `null` or `undefined`. |

## options Parameter

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

| Field | Description |
| --- | --- |
| `userData` | Current user information. If omitted, a default user is filled in: `nickName: "Local User"`, `avatar: ""`, and `opts.color: "#2F80ED"`. |
| `uiOptions.showTopBar` | Whether to show the top toolbar. If omitted, the SDK default layout is used. |
| `uiOptions.showBottomBar` | Whether to show the bottom status bar. If omitted, the SDK default layout is used. |
| `mode.readOnly` | Whether to open in read-only mode. |
| `mode.lang` | Document language, such as `zh-CN` or `en-US`. If omitted, the SDK falls back to `window.lang`, `<html lang>`, and then browser language. |

## Return Value

```ts
type OfficeWidgetOpenResult = {
  docType: number;
  widget: OfficeWidgetApp;
};

type OfficeWidgetApp = {
  mount(target: string | HTMLElement): OfficeWidgetApp;
  render(): Promise<OfficeRenderedApp>;
  close(): Promise<void>;
  readonly docId: string;
  readonly docType: number;
  readonly docTypeName: string | null;
};
```

`docType` values:

| Value | Type |
| --- | --- |
| `1` | Word / DOCX |
| `2` | Excel / XLSX |
| `3` | PowerPoint / PPTX |

`widget.mount(target)` accepts `HTMLElement` and strings. Strings beginning with `#`, `.`, or `[` are treated as CSS selectors; other strings are treated as DOM element IDs:

```ts
widget.mount("#office-container");
widget.mount("office-container");
widget.mount(document.getElementById("office-container")!);
```

`widget.render()` waits until the document is ready and returns the public `app` API object. You can then call:

```ts
app.Document.setZoom(120);
app.UndoRedo.undo();
```

`widget.docTypeName` is usually `"WORD"`, `"EXCEL"`, or `"PPT"` after mounting; it may be `null` before mount completes.

## Instance Lifecycle

`widget.close()` closes the current document instance and releases runtime resources.

| Method | Description | Recommended Timing |
| --- | --- | --- |
| `close()` | Closes the current widget and releases the document instance, internal event listeners, and mount resources. | Call before page unload, before the host component unmounts, or before opening another file. |

Call it:

- Before route changes or before the host component unmounts
- Before the user selects and opens a new file
- When the current document viewer is no longer needed

Example:

```ts
let currentWidget: OfficeWidgetApp | null = null;

async function openFile(file: File) {
  await currentWidget?.close();

  const { widget } = await OfficeSdk.openfile({
    docId: `local-${Date.now()}`,
    fileName: file.name,
    file
  });

  currentWidget = widget;
  return widget.mount("#office-container").render();
}

async function disposeViewer() {
  await currentWidget?.close();
  currentWidget = null;
}
```

## URL File Example

```ts
const { widget } = await OfficeSdk.openfile({
  docId: "report-xlsx",
  fileName: "report.xlsx",
  file: "https://example.com/report.xlsx"
});

const app = await widget.mount("#office-container").render();
```

## Reopening Files

Destroy the old instance before reopening:

```ts
let currentWidget = null;

async function replaceFile(file) {
  await currentWidget?.close();

  const { widget } = await OfficeSdk.openfile({
    docId: `local-${Date.now()}`,
    fileName: file.name,
    file
  });

  const app = await widget.mount("#office-container").render();
  currentWidget = widget;
  return app;
}
```

## Event Example

Events are registered through component-level `addEventListener`. Choose the component by event ownership: document loading, export, and zoom events belong to `Document`; selection events belong to `Selection`; undo/redo events belong to `UndoRedo`.

```ts
function onUndoRedoStateChange() {
  console.log("undo/redo changed");
}

const status = app.UndoRedo.addEventListener("UNDO_REDO_STATE_CHANGE", onUndoRedoStateChange);

if (status !== "ok") {
  console.warn(status);
}

app.UndoRedo.removeEventListener("UNDO_REDO_STATE_CHANGE", onUndoRedoStateChange);
```

Supported event names and payloads for each document type are listed in the [API Reference](../api-reference/README.md).
