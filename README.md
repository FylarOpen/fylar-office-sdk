# Fylar Office SDK Examples and Documentation

> **Version**: 1.0.0 | **Last updated**: 2026-09-08

English · [简体中文](./README.zh-CN.md)

## Install from npm

```bash
npm install @fylar/office-sdk
```

The package targets modern browsers and includes its workers, WebAssembly
modules, locale assets, and styles. Keep the package directory structure intact
when deploying it as static assets, or use a bundler that preserves the runtime
asset URLs.

```ts
import OfficeSdk from "@fylar/office-sdk";

const { widget } = await OfficeSdk.openfile({
  fileName: "demo.docx",
  file: fileBlob
});

const app = await widget.mount("#office-container").render();
```

Optional runtime preloading is available through:

```ts
import "@fylar/office-sdk/preload";
```

## Directory Overview

| Directory | Description |
| --- | --- |
| `lib/` | Office SDK runtime artifacts. Keep the directory structure unchanged when deploying. |
| `docs/HTML/` | Static HTML documentation. It opens the Chinese documentation by default; the English documentation is available under `docs/HTML/en-US/`. |
| `docs/Markdown/` | Bilingual Markdown source files for further editing or importing into an internal knowledge base. |
| `examples/full-evaluation/` | Full evaluation page for locally testing file opening, document creation, API calls, and event subscriptions. |
| `examples/html/` | Native HTML example that can be served directly from a static server. |
| `examples/vue/` | Vue 3 + Vite example demonstrating component-based integration. |
| `examples/react/` | React 18 + Vite example demonstrating component-based integration. |
| `shared/` | Shared helpers for file validation, open options, and the widget lifecycle across examples. |

## Documentation

The complete documentation is generated under `docs/HTML/`. It opens the Chinese documentation by default and lets you switch to English from within the documentation pages. Serve it over HTTP together with the examples:

```text
http://127.0.0.1:8000/docs/HTML/
```

You can also open the English documentation directly:

```text
http://127.0.0.1:8000/docs/HTML/en-US/
```

To view or synchronize the source documentation, use `docs/Markdown/zh-CN/` and `docs/Markdown/en-US/`.

## Start the HTML Examples

Start a static server from the SDK package root. Do not open the examples directly with `file://`:

```bash
python3 -m http.server 8000
```

Or:

```bash
npx http-server -p 8000
```

After the server starts, visit:

```text
http://127.0.0.1:8000/examples/html/
```

The HTML example includes file type validation, entry points for creating DOCX/XLSX/PPTX files, language/read-only/toolbar options, error messages, and logic for disposing of the previous instance before reopening a file. It can be used as a reference for native JavaScript integration.

Open the full evaluation example at:

```text
http://127.0.0.1:8000/examples/full-evaluation/
```

This page is a bundled static artifact suitable for evaluating document opening and creation, API calls, event subscriptions, and bilingual documentation access.

## Start the Vue / React Examples

Vue example:

```bash
cd examples/vue
npm install
npm run dev
```

The default development URL is `http://127.0.0.1:5173/`. To preview the production build, run `npm run build && npm run preview`; the default preview URL is `http://127.0.0.1:4173/`.

React example:

```bash
cd examples/react
npm install
npm run dev
```

The default development URL is `http://127.0.0.1:5174/`. To preview the production build, run `npm run build && npm run preview`; the default preview URL is `http://127.0.0.1:4174/`.

## Static Directory Integration

```ts
import OfficeSdk from "./lib/UI.js";

const { widget } = await OfficeSdk.openfile({
  fileName: "demo.docx",
  file: fileBlob
});

const app = await widget.mount("#office-container").render();

// Wait for the current instance to close before navigating away,
// unmounting the component, or reopening a file.
await widget.close();
```

`UI.js` automatically loads `style.css` from the same directory. To start downloading the styles earlier, you can additionally `import "./lib/style.css"` from your entry file.

To create a blank document, pass `1`, `2`, or `3` to create a DOCX, XLSX, or PPTX file, respectively:

```ts
const { widget } = await OfficeSdk.createfile(1, options);
const app = await widget.mount("#office-container").render();
```

You can also reuse the controller in `shared/officeWidget.js` to consistently handle instance disposal before reopening a file, viewport updates after the container is resized, and common error classification. See `shared/README.md` for details.

To begin opening a document immediately after the page loads, you can optionally preload the runtime:

```ts
import "./lib/preload.js";
```

`preload.js` only starts loading the SDK runtime, worker, and document application chunks early. Without it, `UI.js` still loads them on demand.

## API

### openfile API

#### Signature

`openfile(...)` creates an Office document widget that is ready to be mounted:

```ts
const result = await OfficeSdk.openfile(fileData, options);
```

| Parameter | Type | Description |
| --- | --- | --- |
| `fileData` | `OfficeWidgetFileData` | File information, including the file name and either file content or a file URL. |
| `options` | `OfficeSdkOpenOptions` | Optional open configuration for the user, interface, and open mode. |

#### Complete Example

```ts
import OfficeSdk from "./lib/UI.js";

const { widget } = await OfficeSdk.openfile(
  {
    fileName: "demo.docx",
    file
  },
  {
    userData: {
      userId: "u1",
      nickName: "Alice"
    },
    uiOptions: {
      showTopBar: true,
      showBottomBar: true
    },
    mode: {
      lang: "en-US",
      readOnly: false
    }
  }
);

const app = await widget.mount("#office-container").render();
```

#### fileData Parameter

The first parameter of `openfile(...)` is a file information object:

```ts
type OfficeWidgetFileData = {
  docId?: string;
  fileName: string;
  file: Blob | ArrayBuffer | ArrayBufferView | string | null | undefined;
};
```

| Field | Type | Description |
| --- | --- | --- |
| `docId` | `string` | Optional. Document ID used for caching, collaboration, and instance lifecycle identification. If omitted, the SDK generates a local ID from the file information. |
| `fileName` | `string` | Required. Used to identify the document type; explicitly providing it is always recommended. |
| `file` | <code>Blob \| ArrayBuffer \| ArrayBufferView \| string \| null \| undefined</code> | Required. Supports binary file data, typed arrays, and URLs provided as strings. |

#### options Parameter

The second parameter of `openfile(...)` is an optional configuration object:

```ts
type OfficeSdkOpenOptions = {
  userData?: OfficeSdkUser | null;
  uiOptions?: OfficeSdkUiOptions;
  mode?: OfficeSdkOpenMode;
};
```

| Field | Type | Description |
| --- | --- | --- |
| `userData` | `OfficeSdkUser \| null` | Optional. Information about the current user. If omitted, the SDK supplies a default local user. |
| `uiOptions` | `OfficeSdkUiOptions` | Optional. Controls the visibility of the top toolbar and bottom status bar. |
| `mode` | `OfficeSdkOpenMode` | Optional. Controls read-only state and the document language. |

#### userData Parameter

```ts
type OfficeSdkUser = {
  clientId?: string;
  userId?: string;
  nickName?: string;
  avatar?: string;
  opts?: Record<string, unknown>;
};
```

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` | Optional. Client identifier. |
| `userId` | `string` | Optional. User ID. |
| `nickName` | `string` | Optional. User display name. |
| `avatar` | `string` | Optional. User avatar URL. |
| `opts` | `Record<string, unknown>` | Optional. Custom fields for the integrating application. |

#### mode Parameter

`mode` specifies how the document is opened:

```ts
type OfficeSdkOpenMode = {
  readOnly?: boolean;
  lang?: "zh-CN" | "en-US" | (string & {});
};
```

| Field | Type | Description |
| --- | --- | --- |
| `readOnly` | `boolean` | Optional. When `true`, the SDK opens the document in read-only mode. The default is `false`. |
| `lang` | `"zh-CN" \| "en-US" \| string` | Optional. Specifies the document language. If omitted, the SDK falls back to `window.lang`, `<html lang>`, and then the browser language. |

#### uiOptions Parameter

`uiOptions` controls the SDK's top toolbar and bottom status bar:

```ts
type OfficeSdkUiOptions = {
  showTopBar?: boolean;
  showBottomBar?: boolean;
};
```

| Field | Type | Description |
| --- | --- | --- |
| `showTopBar` | `boolean` | Optional. Whether to show the top toolbar. The default is `true`. |
| `showBottomBar` | `boolean` | Optional. Whether to show the bottom status bar. The default is `true`. |

To provide only UI configuration, write:

```ts
const { widget } = await OfficeSdk.openfile(
  {
    fileName: "demo.xlsx",
    file
  },
  {
    uiOptions: {
      showTopBar: true,
      showBottomBar: false
    }
  }
);
```

### Return Value

`openfile(...)` returns:

```ts
type OfficeWidgetOpenResult = {
  docType: number;
  widget: OfficeWidgetApp;
};
```

| Field | Type | Description |
| --- | --- | --- |
| `docType` | `number` | Numeric document type identifier. |
| `widget` | `OfficeWidgetApp` | Mountable, renderable, and disposable widget instance. |

### Widget Instance

`widget` provides the following members:

| Member | Type | Description |
| --- | --- | --- |
| `mount(target)` | `(target: string \| HTMLElement) => OfficeWidgetApp` | Specifies the mount target. `target` can be a CSS selector string or an `HTMLElement`. |
| `render()` | `() => Promise<OfficeSdkRenderedApp>` | Renders the document and returns the document application instance. |
| `close()` | `() => Promise<void>` | Closes the current instance and releases runtime resources. |
| `docId` | `string` | Current document ID. |
| `docType` | `number` | Current document type. |
| `docTypeName` | `string` | Current document type name. |

### Instance Lifecycle

The recommended instance lifecycle is:

1. Call `openfile(...)` to create a widget that is ready to be mounted.
2. Call `widget.mount(...)` to specify the container.
3. Call `widget.render()` to render the document.
4. Call `widget.close()` before navigating away, unmounting the component, or reopening a file.

### Reopening a File

Close the previous instance before opening another file:

```ts
let currentWidget = null;

async function replaceFile(file) {
  await currentWidget?.close();

  const { widget } = await OfficeSdk.openfile({
    fileName: file.name,
    file
  });

  await widget.mount("#office-container").render();
  currentWidget = widget;
}
```

## Deployment Notes

- Serve the examples over HTTP/HTTPS. Opening them directly with `file://` is not supported.
- Deploy the complete `lib/` directory, including `worker/wasm/*.wasm`, `locale-assets/`, and `vendor/`.
- Configure the server to return `.wasm` files correctly. The recommended MIME type is `application/wasm`.
- `lib/manifest.json` lists the entry points, workers, WASM files, and internal chunks for deployment allowlist validation.
- `lib/package.json` records the static asset package name, version, entry points, type declarations, and stylesheet entry for delivery identification and tooling.
- When deploying to a CDN, preserve all relative paths within `lib/`.
