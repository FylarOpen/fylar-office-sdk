function o(e, r = !1) {
  const l = import.meta.url, n = new URL(e, l);
  return r && n.searchParams.set("version", "1788858636272"), n.href;
}
const c = [
  {
    fileName: "UI.js",
    href: o("./UI.js?version=1788858640169"),
    rel: "modulepreload"
  },
  {
    fileName: "UI.runtime.js",
    href: o("./UI.runtime.js?version=1788858640169"),
    rel: "modulepreload"
  },
  {
    fileName: "ApiBase.js",
    href: o("./ApiBase.js?version=1788858640169"),
    rel: "modulepreload"
  },
  {
    fileName: "index_browser.js",
    href: o("./index_browser.js?version=1788858640169"),
    rel: "modulepreload"
  },
  {
    fileName: "office.core.js",
    href: o("./office.core.js?version=1788858640169", !0),
    rel: "modulepreload"
  },
  {
    fileName: "office.locale.js",
    href: o("./office.locale.js?version=1788858640169", !0),
    rel: "modulepreload"
  },
  {
    fileName: "compat-globals.js",
    href: o("./compat-globals.js?version=1788858640169"),
    rel: "modulepreload"
  },
  {
    fileName: "locale-assets/locale.js",
    href: o("./locale-assets/locale.js?version=1788858640169"),
    rel: "modulepreload"
  },
  {
    fileName: "worker/index.js",
    href: o("./worker/index.js"),
    rel: "modulepreload"
  },
  {
    fileName: "worker/wasm/bootloader.js",
    href: o("./worker/wasm/bootloader.js"),
    rel: "modulepreload"
  },
  {
    fileName: "vendor/zepto.min.js",
    href: o("./vendor/zepto.min.js?version=1788858640169"),
    rel: "preload",
    as: "script"
  },
  {
    fileName: "vendor/xregexp-all-min.js",
    href: o("./vendor/xregexp-all-min.js?version=1788858640169"),
    rel: "preload",
    as: "script"
  },
  {
    fileName: "style.css",
    href: o("./style.css?version=1788858640169"),
    rel: "preload",
    as: "style"
  }
], m = [
  {
    fileName: "mountDocxApp.js",
    href: o("./mountDocxApp.js?version=1788858640169"),
    rel: "modulepreload"
  },
  {
    fileName: "mountXlsxApp.js",
    href: o("./mountXlsxApp.js?version=1788858640169"),
    rel: "modulepreload"
  },
  {
    fileName: "mountPptxApp.js",
    href: o("./mountPptxApp.js?version=1788858640169"),
    rel: "modulepreload"
  }
], i = /* @__PURE__ */ new Map();
let t = null, s = null;
function f() {
  return typeof document < "u";
}
function p() {
  var r, l;
  return t ?? (f() ? (t = !!((l = (r = document.createElement("link").relList) == null ? void 0 : r.supports) != null && l.call(r, "modulepreload")), t) : (t = !1, t));
}
function h(e) {
  return Array.from(document.querySelectorAll("link")).some((r) => r.href !== e ? !1 : r.rel === "modulepreload" || r.rel === "preload" || r.rel === "stylesheet");
}
function j(e) {
  return Array.from(document.scripts).some((r) => r.src === e);
}
function w(e, r) {
  return !!(h(r) || e.as === "script" && j(r));
}
function k(e, r) {
  return w(e, r) ? Promise.resolve() : new Promise((l, n) => {
    const a = document.createElement("link");
    a.rel = e.rel, a.href = r, a.dataset.officeSdkPreload = e.fileName, e.as && (a.as = e.as), e.rel === "modulepreload" && (a.crossOrigin = "anonymous"), a.addEventListener("load", () => l(), { once: !0 }), a.addEventListener(
      "error",
      () => n(new Error(`failed to preload ${e.fileName}`)),
      { once: !0 }
    ), (document.head ?? document.documentElement).appendChild(a);
  });
}
async function d(e) {
  if (typeof fetch != "function")
    return;
  const r = await fetch(e, {
    mode: "cors",
    credentials: "same-origin"
  });
  if (!r.ok && r.status !== 0)
    throw new Error(`failed to preload ${e}: ${r.status}`);
}
function y(e) {
  const r = `${e.rel}:${e.href}`;
  if (i.has(r))
    return i.get(r);
  const l = (async () => {
    if (f()) {
      if (e.rel === "modulepreload" && !p()) {
        await d(e.href);
        return;
      }
      try {
        await k(e, e.href);
      } catch {
        await d(e.href);
      }
    }
  })().catch((n) => {
    `${e.fileName}`;
  });
  return i.set(r, l), l;
}
async function u(e) {
  await Promise.all(e.map((r) => y(r)));
}
function N(e) {
  return new Promise((r) => {
    if (typeof window < "u" && "requestIdleCallback" in window) {
      window.requestIdleCallback(
        () => {
          e().finally(r);
        },
        { timeout: 1200 }
      );
      return;
    }
    setTimeout(() => {
      e().finally(r);
    }, 150);
  });
}
function A() {
  return s || (s = (async () => {
    await u(c), f() && await N(() => u(m));
  })()), s;
}
const x = A();
export {
  x as default,
  A as preloadOfficeSdk,
  x as preloadTask
};
