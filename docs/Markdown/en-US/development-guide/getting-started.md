# Development Guide: Getting Started

This guide explains how to integrate `office-sdk` into a frontend page and complete the smallest working flow for opening and rendering a document.

## Check the Environment

First confirm that the integrating page runs in a browser environment that supports ES Modules, dynamic `import()`, Web Workers, SharedWorkers, WebAssembly, IndexedDB, `Promise`, `Blob`, and `ArrayBuffer`.

SharedWorker and IndexedDB are required by the current open flow. In addition to checking that the APIs exist, verify that private browsing, enterprise policy, third-party context restrictions, or WebView configuration does not disable them. See [Office SDK Overview](../product-overview/office-sdk-overview.md) for compatibility guidance.

## Step 1: Deploy the Static Asset Package

Deploy the complete `lib/` directory from the release package to your static asset location. A recommended mapping is:

```text
/office-sdk/
```

Keep the complete directory structure during deployment. Do not copy only a single entry file.

Example paths after deployment:

```text
/office-sdk/UI.js
/office-sdk/preload.js
/office-sdk/style.css
/office-sdk/worker/index.js
```

## Step 2: Prepare a Mount Container

Prepare a container node in the page to host the Office document component.

```html
<div id="office-container"></div>
```

Give the mount container an explicit width and height. Otherwise the document area may not display as expected.

```css
#office-container {
  width: 100%;
  height: 720px;
  overflow: hidden;
}
```

## Step 3: Preload When Needed

When `UI.js` is loaded, the SDK automatically inserts `/office-sdk/style.css`. In most integrations, you do not need to add the stylesheet manually.

If you want the stylesheet to start downloading earlier and reduce the first render wait, you can still declare it in the page head:

```html
<link rel="stylesheet" href="/office-sdk/style.css" />
```

If the page is likely to open a document immediately, import `preload.js` to request key JavaScript runtime files, worker entries, and document app modules ahead of time:

```html
<script type="module">
  import "/office-sdk/preload.js";
</script>
```

In Vite, Webpack, or another frontend project, you can also preload dynamically at runtime:

```ts
function preloadOfficeSdk() {
  const preloadEntry = new URL("/office-sdk/preload.js", window.location.origin).href;
  void import(/* @vite-ignore */ preloadEntry);
}
```

`preload.js` does not preload every `.wasm` binary or all deployed locale files; those resources may still load on demand when the first document opens. It requests multiple runtime resources, so it is best suited to document detail pages, preview pages, or when the user is about to open a document. On ordinary list pages, trigger it on demand instead of loading it unconditionally.

## Step 4: Load the SDK Entry

`UI.js` is a standard ES Module file. Choose one of the following approaches based on your integration environment.

### Option 1: Static Import in a Native ESM Page

If the page itself runs in a native browser `type="module"` environment, import it directly:

```html
<script type="module">
  import OfficeSdk from "/office-sdk/UI.js";

  // Later, open documents through OfficeSdk.openfile(...).
</script>
```

### Option 2: Runtime Dynamic Import in an Existing Frontend Project

When integrating into an existing Vite, Webpack, or similar project, runtime dynamic loading is usually preferred. This prevents the build tool from taking over parsing and bundling `/office-sdk/UI.js` at compile time.

Example:

```ts
async function getOfficeSdk() {
  const widgetUiEntry = new URL("/office-sdk/UI.js", window.location.origin).href;
  const module = await import(/* @vite-ignore */ widgetUiEntry);
  return module.default;
}
```

If your project environment explicitly supports direct module imports by URL, you can also use:

```ts
import OfficeSdk from "/office-sdk/UI.js";
```

## Step 5: Open and Render a File

The following example shows the smallest working integration flow.

```ts
async function openOfficeFile(file) {
  const { widget } = await OfficeSdk.openfile(
    {
      docId: `local-${Date.now()}`,
      fileName: file.name,
      file
    },
    {
      uiOptions: {
        showTopBar: true,
        showBottomBar: true
      }
    }
  );

  const app = await widget.mount("#office-container").render();
  return { widget, app };
}
```

Close the old instance before page changes, component unmount, or opening another file:

```ts
await widget.close();
```

`close()` closes the current document instance, unmounts the component, and releases SDK internal resources. Call it from the host component's unmount hook or before opening a new file.

To control SDK display state, pass an options object as the second argument:

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

- `showTopBar`
  Shows or hides the top toolbar. If omitted, the SDK default layout is used.
- `showBottomBar`
  Shows or hides the bottom status bar. If omitted, the SDK default layout is used.
- `mode.readOnly`
  Opens the document in read-only mode when set to `true`.
- `mode.lang`
  Specifies the language used when opening the document, such as `zh-CN` or `en-US`.

To pass user information at the same time:

```ts
const { widget } = await OfficeSdk.openfile(
  {
    fileName: file.name,
    file
  },
  {
    userData: {
      userId: "u1",
      nickName: "Alice"
    },
    uiOptions: {
      showTopBar: false,
      showBottomBar: true
    },
    mode: {
      readOnly: false,
      lang: "en-US"
    }
  }
);
```

## FAQ

### 1. Why does it say the mount node cannot be found?

`widget.mount(...)` accepts an `HTMLElement` or a string. Strings beginning with `#`, `.`, or `[` are treated as CSS selectors; other strings are treated as DOM element IDs. Check that:

- The selector exists in the current page
- The page DOM has finished rendering when you call it
- The mount container has not been hidden or destroyed by conditional rendering

### 2. Why do static assets still fail to load after deployment?

Check the following:

- The complete `lib/` directory is deployed, not only `UI.js`
- `style.css`, `worker/`, `worker/wasm/`, `locale-assets/`, and `vendor/` are all accessible in the browser
- The `UI.js` access path matches the path referenced by the page
- File relative locations were not changed after publishing to the server
- If the page uses CSP, see [CSP Deployment Guide](./csp.md) and check `script-src`, `worker-src`, `style-src`, `img-src`, and `connect-src`
- The page and `worker/` assets are same-origin; CORS alone does not guarantee cross-origin SharedWorker support
- The browser allows both SharedWorker and IndexedDB
