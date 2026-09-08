# Development Guide: Package Structure

This document describes the static `lib` release package structure for `office-sdk` and explains the role of each directory and file during integration.

## Directory Structure

`lib/` is the static asset directory used at deployment time. A typical structure is:

```text
lib/
├── UI.js
├── preload.js
├── UI.d.ts
├── style.css
├── office.core.js
├── office.locale.js
├── index_browser.js
├── compat-globals.js
├── manifest.json
├── package.json
├── ApiBase.js
├── UI.runtime.js
├── mountDocxApp.js
├── mountXlsxApp.js
├── mountPptxApp.js
├── DropdownPopoverList.js
├── worker/
│   ├── index.js
│   ├── sharedWorkerStorage.worker.js
│   └── wasm/
├── locale-assets/
│   ├── locale.js
│   └── deploy/
│       └── i18n/
└── vendor/
    ├── xregexp-all-min.js
    └── zepto.min.js
```

## Entry Files

- `UI.js`
  Main public entry. Use it to call `openfile(...)` or `createfile(...)`.
- `preload.js`
  Optional preload entry. Importing it requests key JavaScript runtime files, worker entries, and document app modules to reduce part of the first-open loading latency. It does not preload every `.wasm` binary or all deployed locale files.
- `style.css`
  SDK page styles. The integrating page must load it explicitly.
- `UI.d.ts`
  TypeScript declaration file. It provides type hints in TypeScript projects and is not loaded by the browser.
  It includes public types such as `OfficeSdkOpenOptions`, `OfficeSdkUiOptions`, and `OfficeSdkOpenMode`.

## Runtime Core Files

- `office.core.js`
  Office core runtime code.
- `office.locale.js`
  Runtime code related to language and localization.
- `worker/`
  Worker runtime resource directory. Document loading depends on scripts and `wasm/` resources in this directory.
- `locale-assets/`
  Multilingual resource directory. Language resources are under `locale-assets/deploy/i18n/`.
- `vendor/`
  Third-party scripts required by the runtime.

## Split Runtime Modules

The following files are split runtime modules of the SDK:

- `UI.runtime.js`
- `ApiBase.js`
- `index_browser.js`
- `compat-globals.js`
- `mountDocxApp.js`
- `mountXlsxApp.js`
- `mountPptxApp.js`
- `DropdownPopoverList.js`

You do not need to import these files manually, but they must remain deployed together with the rest of the assets. Otherwise `UI.js` may fail to load runtime dependencies by relative path.

## Supporting Files

- `manifest.json`
  Release manifest. It can be used to inspect asset integrity and entry mappings.
- `package.json`
  Metadata for the static asset package, including package name, version, entries, type declarations, and style entry. It is used for delivery identification and tooling.

## Deployment Recommendations

Keep the complete directory structure when deploying. Avoid:

- Copying only `UI.js`
- Changing the relative locations of `worker/`, `locale-assets/`, or `vendor/`
- Manually deleting runtime modules that do not appear to be directly referenced

Map the complete `lib/` directory to one static path, for example:

```text
/office-sdk/
```
