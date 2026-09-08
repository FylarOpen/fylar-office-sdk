# Common API Conventions

This document describes the `office-sdk` entry points, instance lifecycle, common types, event model, and color parameters. Product-specific component methods are documented in [DOCX](./docx.md), [XLSX](./xlsx.md), and [PPTX](./pptx.md).

## Entry Points

Public entries live in the deployed static asset directory. The examples below assume `lib/` is mapped to `/office-sdk/`:

```html
<script type="module">
  import "/office-sdk/preload.js";
  import OfficeSdk from "/office-sdk/UI.js";
</script>
```

`UI.js` automatically loads `style.css` from the same directory. If you want the stylesheet to download earlier, you can still add `<link rel="stylesheet" href="/office-sdk/style.css" />` in the page head.

`preload` is an optional entry that requests key JavaScript runtime files, worker entries, and document app modules ahead of time. It does not preload every `.wasm` binary or all deployed locale files; those resources may still load on demand when the first document opens. Use it when the page will open a document immediately. On ordinary list pages, defer loading until the user initiates opening a document.

## Runtime Prerequisites

Opening a document requires:

- ES Modules and dynamic `import()`
- Web Workers, SharedWorkers, and WebAssembly
- IndexedDB
- `Promise`, `Blob`, and `ArrayBuffer`

SharedWorker and IndexedDB are required by the current open flow. If either is unavailable, `render()` may fail. Also verify that browser privacy settings, private browsing, enterprise policy, or the host WebView does not disable these capabilities.

The SDK creates its worker directly with `new SharedWorker(workerUrl)`, so deploy the complete `lib/` directory on the same origin as the host page. CORS alone does not guarantee that a cross-origin SharedWorker can be created. See the [CSP Deployment Guide](../development-guide/csp.md).

## openfile

Signature:

```ts
function openfile(
  fileData: OfficeWidgetFileData,
  options?: OfficeSdkOpenOptions | null
): Promise<OfficeWidgetOpenResult>;
```

Minimal example:

```ts
const { docType, widget } = await OfficeSdk.openfile({
  docId: `local-${Date.now()}`,
  fileName: file.name,
  file
});

const app = await widget.mount("#office-container").render();
```

With user data, UI options, and open mode:

```ts
const { widget } = await OfficeSdk.openfile(
  {
    docId: "contract-001",
    fileName: "contract.docx",
    file
  },
  {
    userData: {
      userId: "u1",
      clientId: "web-001",
      nickName: "Alice",
      avatar: "https://example.com/avatar.png",
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

const app = await widget.mount(document.getElementById("office-container")!).render();
```

## createfile

Create a new Office file:

```ts
type OfficeWidgetCreateDocType = 1 | 2 | 3;

function createfile(
  docType: OfficeWidgetCreateDocType,
  options?: OfficeSdkOpenOptions | null
): Promise<OfficeWidgetOpenResult>;
```

Parameters:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `docType` | `OfficeWidgetCreateDocType` | Yes | Identifies the type of Office document to create. |
| `options` | `OfficeSdkOpenOptions \| null` | No | Creation options including user information, UI configuration, language, and read-only mode. |

Document type identifiers:

| Identifier | Document category | File format | Extension |
| --- | --- | --- | --- |
| `1` | Word document | Office Open XML Wordprocessing Document | `.docx` |
| `2` | Excel workbook | Office Open XML Spreadsheet | `.xlsx` |
| `3` | PowerPoint presentation | Office Open XML Presentation | `.pptx` |

```ts
const { widget } = await OfficeSdk.createfile(1, {
  mode: { lang: "en-US" }
});

const app = await widget.mount("#office-container").render();
```

Each call gets an independent `docId`. The options, return value, and widget lifecycle are the same as `openfile(...)`.

## fileData

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
| `fileName` | Yes | File name. The extension identifies the document type. `openfile(...)` currently supports `doc`, `docx`, `xls`, `xlsx`, and `pptx`. |
| `file` | Yes | File content or a browser-accessible file URL. Supports `File`/`Blob`, `ArrayBuffer`, `TypedArray`, plus `blob:`, `data:`, `http(s):`, `file:`, absolute paths beginning with `/`, and relative paths beginning with `./` or `../`. A plain string such as `files/a.docx` is not recognized as a URL. Do not pass `null` or `undefined`. |

URL example:

```ts
const { widget } = await OfficeSdk.openfile({
  docId: "report-xlsx",
  fileName: "report.xlsx",
  file: "https://example.com/files/report.xlsx"
});

await widget.mount("#office-container").render();
```

## options

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
| `mode.readOnly` | Whether to open in read-only mode. When `true`, the SDK sets read-only state after the document loads. |
| `mode.lang` | Language, such as `zh-CN` or `en-US`. If omitted, the SDK falls back to `window.lang`, `<html lang>`, and then browser language. |

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

`widget.mount(target)` supports:

```ts
widget.mount("#office-container");
widget.mount("office-container");
widget.mount(document.getElementById("office-container")!);
```

Strings beginning with `#`, `.`, or `[` are treated as CSS selectors. Other strings are treated as DOM element IDs. Do not pass selectors that begin with a tag name or a compound prefix, such as `"main .office-container"`.

`widget.render()` waits until the document is ready and returns the public `app` API object for the current document. Later APIs are called as `app.Component.method(...)`.

`widget.docTypeName` is usually `"WORD"`, `"EXCEL"`, or `"PPT"` after mounting; it may be `null` before mount completes.

### widget Lifecycle

`widget.close()` closes the current document instance and releases runtime resources.

| Method | Signature | Description |
| --- | --- | --- |
| `close` | `close(): Promise<void>` | Closes the current widget and releases the document instance, internal event listeners, and mount resources. |

Recommended timing:

- Before route changes or before the host component unmounts
- Before the user opens another file
- When the current document viewer is no longer needed

`close()` returns `Promise<void>`. Await it before reusing the same container for a new document.

Close example:

```ts
let currentWidget: Awaited<ReturnType<typeof OfficeSdk.openfile>>["widget"] | null = null;

async function openFile(file: File) {
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

## Error Handling and Troubleshooting

`openfile(...)` and `widget.render()` are asynchronous; `widget.mount(...)` is a synchronous chainable call. Wrap the open and render flow in `try...catch` and record the original error in logs.

```ts
try {
  const { widget } = await OfficeSdk.openfile({
    fileName: file.name,
    file
  });

  await widget.mount("#office-container").render();
} catch (error) {
  console.error("[office-sdk] open failed", error);
}
```

The external examples include `shared/officeWidget.js`, which provides `classifyError(error)` to map common open failures to page-friendly `kind`, `title`, and `detail` values. It is an example helper, not a public API exported by `UI.js`. You can reuse it directly or implement the same rules in your host project.

Common error categories:

| `kind` | Common Cause | Troubleshooting |
| --- | --- | --- |
| `no-file` | File content was not passed, or the user has not selected a file. | Ensure `fileData.file` is a valid `File`, `Blob`, `ArrayBuffer`, `TypedArray`, or URL string. |
| `missing-file-name` | `fileName` is missing. | Pass a `fileName` with an extension. The SDK identifies document type by extension. |
| `no-container` | The mount container does not exist or has not rendered yet. | Ensure the selector or `HTMLElement` passed to `mount(...)` is valid and call it after DOM mount. |
| `unsupported` | The file extension is not supported. | The main document-opening flow currently supports `doc`, `docx`, `xls`, `xlsx`, and `pptx`. |
| `asset` | `worker`, `wasm`, language package, or runtime chunk failed to load. | Confirm the complete `lib/` directory is deployed, `worker/`, `worker/wasm/`, `locale-assets/`, and `vendor/` are accessible, and `.wasm` MIME is correct. |
| `open-failed` | The SDK did not return a mountable `widget`. | Record the original error and `fileData`; check whether the file is corrupt or runtime assets are incomplete. |
| `cancelled` | A newer open request took over the current viewer. | Usually no failure UI is needed; ignore it when reopening files. |
| `unknown` | The error does not match the above categories. | Show a generic failure message and report the original error for diagnosis. |

## app Components

The `app` returned by `render()` is the public API object for the current document type. Common components:

| Document Type | Components |
| --- | --- |
| DOCX | `Document`, `Paragraph`, `Table`, `Selection`, `Finder`, `UndoRedo` |
| XLSX | `Document`, `Workbook`, `Worksheet`, `Selection`, `Finder`, `Cursor`, `UndoRedo` |
| PPTX | `Document`, `Paragraph`, `TextBox`, `Player`, `Selection`, `Viewer`, `UndoRedo` |

Example:

```ts
app.Document.setZoom(120);
app.UndoRedo.undo();
```

## Event Model

Public APIs use component-level event entry points.

### Component Events

Components such as `Document`, `Selection`, `Finder`, and `UndoRedo` inherit common event methods:

```ts
type EventStatus =
  | "ok"
  | "no such event"
  | "duplicated event callback"
  | "no such callback";

component.addEventListener(eventName, handler): EventStatus;
component.removeEventListener(eventName, handler): EventStatus;
```

Usage:

```ts
function onSelectionChange(info) {
  console.log(info);
}

const status = app.Selection.addEventListener("SELECTION_CHANGE", onSelectionChange);

if (status !== "ok") {
  console.warn("listen failed:", status);
}

// Pass the same handler function when removing the listener.
const removeStatus = app.Selection.removeEventListener("SELECTION_CHANGE", onSelectionChange);
```

Use the "Component Events" tables in each product page to determine which component owns an event. Common ownership:

| Scenario | Component | Example Events |
| --- | --- | --- |
| Document loading, export, zoom, page changes | `app.Document` | `DOCUMENT_EXPORT_READY`, `DOCX_END_LOADING`, `XLSX_WORKSHEET_CHANGE`, `PPTX_SLIDES_CHANGED` |
| Selection changes | `app.Selection` | `SELECTION_CHANGE` |
| Find panel requests | `app.Finder` | `DOCX_OPEN_FIND_UI`, `XLSX_OPEN_FIND_UI` |
| Undo/redo state changes | `app.UndoRedo` | `UNDO_REDO_STATE_CHANGE` |

Passing an event name that does not belong to the current component returns `"no such event"`. Component events do not accept an `options` parameter. If you only need to handle an event once, remove the listener inside the callback:

```ts
function onExportReady() {
  app.Document.removeEventListener("DOCUMENT_EXPORT_READY", onExportReady);
  console.log("export ready");
}

app.Document.addEventListener("DOCUMENT_EXPORT_READY", onExportReady);
```

## Color Parameters

DOCX and XLSX commonly use RGB objects:

```ts
{ r: 255, g: 0, b: 0 }
```

RGB objects accept only the `r`, `g`, and `b` channels. The current implementation does not support an `a`/alpha field.

DOCX also supports theme color objects:

```ts
{ name: "accent1", theme: 4, tint: 0, shade: 0 }
```

XLSX `Selection.setFontColor`, `Selection.setFillColor`, and border colors accept RGB, theme color, indexed color, or `rgbHex` objects directly:

```ts
{ r: 255, g: 0, b: 0 }
{ theme: 4, tint: 0 }
{ indexed: 10 }
{ rgbHex: "FFFF0000" }
```

`rgbHex` may use either 6-digit `RRGGBB` or 8-digit `AARRGGBB`. Only the 8-digit `rgbHex` form can carry alpha; it is distinct from the RGB object form, which does not support transparency.

If your business layer uses raw palette UI values such as `{ hex: "#FF0000", type: "standard", name: "red" }`, convert them to the RGB or theme color objects above before passing them to XLSX `Selection.*` style APIs.

PPTX font colors support strings or objects with `hex`:

```ts
"#4472C4"
"rgb(68, 114, 196)"
{ hex: "#4472C4", type: "theme", name: "accent1" }
```

For new integrations, use the `{ hex: "#RRGGBB" }` object form. String values remain accepted for compatibility, but they should not be the preferred input form in business code.

PPTX object values must include `hex`; fields such as `type`, `name`, `theme`, and `tint` are palette metadata carried with the object, and theme-only objects such as `{ name, theme }` are not supported.

Palette APIs usually return:

```ts
{
  theme: unknown[];
  standard: unknown[];
}
```

## Common Constraints

- Most style APIs depend on the current selection. They may have no effect without a valid selection.
- Export methods are asynchronous; always `await` them.
- `exportPdf(...)` requires a secure context (normally HTTPS or localhost), `window.queryLocalFonts`, and permission to access local fonts. If these requirements are not met, the current implementation exits without exporting a PDF.
- DOCX `Table.*` requires the current cursor or selection to be inside a table context.
- XLSX `Selection.*` targets the current active cell or selection.
- PPTX `Paragraph.*` and `TextBox.*` depend on the currently selected text box or text selection.
