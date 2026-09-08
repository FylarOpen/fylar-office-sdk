# Development Guide: CSP Deployment Guide

This guide is for integrating `office-sdk` behind enterprise intranets, portal systems, or security gateways. It describes the minimum deployment requirements and common adjustments under `Content-Security-Policy`.

## Use Cases

If the integrating page uses CSP, confirm before release that the SDK static asset directory, document file sources, and page script policy are all allowlisted. The SDK loads ES Modules, styles, Workers, SharedWorkers, WebAssembly, images, fonts, and other resources. An overly narrow CSP can cause documents to fail to open or render a blank area.

## Recommended Starting Policy

The policy below assumes:

- The complete SDK `lib/` directory is deployed on the same origin as the integrating page, for example `/office-sdk/`
- Document files are loaded from the same origin or from explicitly allowlisted file-hosting domains
- The integrating page loads the SDK through an external `type="module"` script or dynamic `import()`, and does not rely on inline script

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'wasm-unsafe-eval' 'unsafe-eval';
  script-src-elem 'self';
  worker-src 'self';
  child-src 'self';
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
  img-src 'self' data: blob:;
  connect-src 'self' https://<file-host>;
  object-src 'none';
  base-uri 'self';
```

Replace `https://<file-host>` with the actual domain for document files, images, or authentication APIs. If all files are same-origin, you can remove the placeholder domain.

## Directive Notes

| Directive | Usually Required | Description |
| --- | --- | --- |
| `script-src 'self'` | Yes | Allows loading `UI.js`, `preload.js`, split runtime modules, and wasm JS glue files. |
| `'wasm-unsafe-eval'` | Yes | Allows the browser to compile and instantiate WebAssembly. |
| `'unsafe-eval'` | Compatibility | Used for compatibility with browsers or security policies that classify WebAssembly runtime differently. If enterprise security rules disallow it, validate CSP in target browsers first. |
| `script-src-elem 'self'` | Recommended | If the enterprise policy explicitly sets `script-src-elem`, same-origin module scripts must be allowed. |
| `worker-src 'self'` | Yes | The SDK loads module Workers and SharedWorkers from the static `worker/` directory by default. |
| `child-src 'self'` | Recommended | Fallback for some older browsers or CSP implementations that apply `child-src` to Workers. |
| `style-src 'self' 'unsafe-inline'` | Yes | The SDK loads `style.css`, and runtime components write necessary inline styles. |
| `font-src 'self' data:` | Recommended | Allows SDK and document rendering fonts, including embedded font data. |
| `img-src 'self' data: blob:` | Yes | Document images, previews, exported images, and temporary object URLs may use `data:` or `blob:`. |
| `connect-src` | Application-specific | Add the corresponding domains when opening remote document URLs, requesting authentication APIs, or loading cross-origin resources. |
| `object-src 'none'` | Recommended | The SDK does not depend on `<object>`; disabling it is recommended. |
| `base-uri 'self'` | Recommended | Limits the risk of injected `<base>` tags. |

## When `blob:` Is Needed

The SDK uses static Worker URLs by default, so `worker-src 'self'` is enough for the basic configuration. Add `blob:` to `worker-src` and `child-src` only when:

- The integrator rewrites Worker URLs to `blob:` URLs
- The host page or micro-frontend framework wraps Workers as Blob Workers
- An enterprise proxy or security container requires Worker scripts to be injected through Blob URLs

Example:

```http
worker-src 'self' blob:;
child-src 'self' blob:;
```

## Inline Script Recommendations

The SDK itself does not require `script-src 'unsafe-inline'`. If the integrating page needs inline bootstrap script, prefer `nonce` or `hash`:

```http
script-src 'self' 'wasm-unsafe-eval' 'unsafe-eval' 'nonce-<random>';
```

Example page script:

```html
<script type="module" nonce="<random>">
  import OfficeSdk from "/office-sdk/UI.js";
</script>
```

If enterprise security rules forbid inline script, put the integration code in a separate `.js` file and load it as a same-origin module script.

## Cross-Origin Deployment Notes

The current SDK creates its SharedWorker directly with `new SharedWorker(workerUrl)`. SharedWorkers apply strict same-origin rules to their script URL, so CSP and CORS configuration alone cannot guarantee that the complete SDK will run cross-origin.

Recommended deployment:

- Deploy the complete `lib/` directory on the same origin as the host page
- Or reverse-proxy the SDK assets through the host origin so `/office-sdk/worker/` appears same-origin to the page
- Keep the complete `worker/`, `worker/wasm/`, `locale-assets/`, and `vendor/` directory structure
- Serve `.wasm` files with the `application/wasm` MIME type

ES Modules, styles, or document URLs may be configured for cross-origin access according to browser rules, but that does not make a cross-origin SharedWorker valid. Test an actual document open on the final domain with the final CSP and target browser before release.

## Common CSP Troubleshooting

| Symptom | Possible Cause | Fix |
| --- | --- | --- |
| `Refused to load the script` | `script-src` or `script-src-elem` does not allow the SDK asset domain. | Add the SDK static asset domain and confirm that `UI.js` and runtime chunks are accessible. |
| `Refused to create a worker` | `worker-src` does not allow the source, or the SharedWorker script is cross-origin. | Allow same-origin Workers and deploy or reverse-proxy `worker/` through the host origin. If using Blob Workers, also add `blob:`. |
| `Refused to compile or instantiate WebAssembly` | Missing `'wasm-unsafe-eval'`, or the browser only recognizes `'unsafe-eval'`. | Add `'wasm-unsafe-eval'` to `script-src`; keep `'unsafe-eval'` if needed. |
| Document images are missing | `img-src` does not allow `data:` or `blob:`. | Add `data:` and `blob:` to `img-src`. |
| Styles are broken | `style-src` does not allow `style.css` or inline styles. | Allow the SDK style domain and keep `'unsafe-inline'`. |
| Remote documents fail to open | `connect-src` does not allow the file-hosting domain or authentication API domain. | Add the required file-hosting and authentication API domains to `connect-src`. |

## Release Checklist

- The complete `lib/` directory is deployed, not only `UI.js`
- `style.css`, `worker/`, `worker/wasm/`, `locale-assets/`, and `vendor/` are directly accessible
- CSP allows the SDK static asset domain
- CSP allows the directives required by Workers and WebAssembly
- The SharedWorker script is same-origin with the host page
- The target browser allows SharedWorker and IndexedDB
- The server returns `application/wasm` for `.wasm` files
- Remote document URLs, auth APIs, and image domains are added to `connect-src` / `img-src`
- The browser DevTools Console has no CSP violations
