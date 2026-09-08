# @fylar/office-sdk

Commercial browser SDK for viewing and editing DOCX, XLSX, and PPTX documents.

## Installation

```bash
npm install @fylar/office-sdk
```

## Usage

```ts
import OfficeSdk from "@fylar/office-sdk";

const { widget } = await OfficeSdk.openfile({
  fileName: "demo.docx",
  file: fileBlob
});

const app = await widget.mount("#office-container").render();

// Close the current document before navigating away or opening another file.
await widget.close();
```

To create a blank DOCX, XLSX, or PPTX document, pass `1`, `2`, or `3`:

```ts
const { widget } = await OfficeSdk.createfile(1, options);
const app = await widget.mount("#office-container").render();
```

Optional runtime preloading is available through:

```ts
import "@fylar/office-sdk/preload";
```

`UI.js` loads `style.css` automatically. The stylesheet can also be imported
explicitly when early loading is preferred:

```ts
import "@fylar/office-sdk/style.css";
```

## Runtime requirements

The SDK is browser-only and requires a modern environment with ES modules,
dynamic imports, Web Workers, Shared Workers, WebAssembly, IndexedDB, `Blob`,
and `ArrayBuffer` support.

The runtime resolves its workers, WebAssembly modules, locale data, and styles
relative to the SDK module URL. Do not copy only `UI.js`; preserve the complete
package directory structure when serving the package as static assets. When
using a bundler, confirm that those runtime asset URLs and files are emitted.

## Documentation

Full documentation, examples, and bilingual guides are available in the
[GitHub repository](https://github.com/FylarOpen/fylar-office-sdk).

## License

This is proprietary commercial software with a limited free-use allowance.
See [legal.txt](./legal.txt) and
[THIRD_PARTY_NOTICES](./THIRD_PARTY_NOTICES) for the applicable terms and
third-party notices.
