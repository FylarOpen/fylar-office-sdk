# Office SDK Overview

`office-sdk` is an embeddable Office document component SDK for web pages. It loads and renders Office documents directly in the browser.

Integrators can load the SDK in their own pages, choose a DOM container as the mount target, then open and render files through a unified API.

## Use Cases

Office SDK is suitable for:

- Embedding an Office document preview area in a host application
- Opening a local file for viewing immediately after file selection
- Quickly embedding Word, Excel, and PowerPoint document components into existing pages
- Integrating a unified document viewing entry point into an existing frontend system

## Audience

This documentation is intended for:

- Developers responsible for frontend page integration
- Project teams that need Office document capabilities in web applications
- Engineers responsible for customer delivery and static asset deployment

## Core Capabilities

Office SDK currently provides these core capabilities:

- Open local Office files or files from browser-accessible URLs
- Create new DOCX, XLSX, or PPTX files
- Detect the document type and load the matching component automatically
- Mount the document instance into a specified DOM node for rendering
- Destroy the instance and release resources when a page changes or a component is unmounted
- Control the top toolbar and bottom status bar with `uiOptions`
- Open documents in read-only mode with `mode.readOnly`
- Specify the document language with `mode.lang`
- Expose a public application API object for further integration

## Supported File Types

The main document-opening flow currently supports:

- Word: `.doc`, `.docx`
- Excel: `.xls`, `.xlsx`
- PowerPoint: `.pptx`

## Integration Model

Office SDK is integrated as an embedded static asset package. A typical flow is:

1. Obtain and deploy the `office-sdk/lib/` static asset directory
2. Load `UI.js` from the static path; the SDK automatically loads `style.css`
3. Optionally import `preload.js` to request key runtime assets ahead of time
4. Call `openfile(...)` to open a file, or `createfile(...)` to create one
5. Mount the returned `widget` to the target container and render it
6. Call `close()` when the instance is no longer needed

## Runtime Recommendations

Use Office SDK in a modern web application that supports static asset deployment and ES Modules.

Recommended environment:

- A modern browser, preferably the latest stable Chrome or Chromium Edge
- Frontend runtime support for ES Modules, dynamic `import()`, Web Workers, SharedWorkers, WebAssembly, IndexedDB, `Promise`, `Blob`, and `ArrayBuffer`
- A page application that can mount DOM nodes normally
- A static asset service that can deploy the complete `office-sdk/lib/` directory

### Browser Compatibility

Office SDK should preferably run in the latest stable Chrome or Chromium Edge. Compatibility is capability-based rather than determined only by a browser version:

| Runtime | Guidance |
| --- | --- |
| Chrome / Chromium Edge | Primary supported environment. Use the latest stable release and verify SharedWorker, IndexedDB, and WebAssembly. |
| Firefox / Safari | Perform dedicated testing on the target version, especially for SharedWorker and IndexedDB under the active privacy policy. |
| iOS Safari / iOS WKWebView | Validate in the actual host container. WebView configuration, third-party context, and storage policy may restrict SharedWorker or IndexedDB. |
| Android WebView | Validate the actual system WebView version and host configuration. |

Internet Explorer, legacy EdgeHTML Edge, Android Browser, and browsers or WebViews without ES Modules, dynamic `import()`, SharedWorker, IndexedDB, or WebAssembly are not supported. Private browsing, enterprise policy, or security containers may disable a capability even when its API is present.

### PDF Export Requirements

`Document.exportPdf(...)` also requires a secure context (normally HTTPS or localhost), `window.queryLocalFonts`, and permission to access local fonts. If these requirements are not met, the current implementation does not perform the PDF export.
