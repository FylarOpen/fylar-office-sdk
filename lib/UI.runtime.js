var ue = Object.defineProperty;
var fe = (e, n, t) => n in e ? ue(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var y = (e, n, t) => fe(e, typeof n != "symbol" ? n + "" : n, t);
const L = {
  WORD: 1,
  EXCEL: 2,
  PPT: 3
}, de = "FILE_READ_ERROR", Ee = "FILE_TYPE_ERROR", me = "FILE_UNKNOWN_ERROR", V = "ASK_FILE_PASSWORD", q = "FILE_PASSWORD_ERROR", z = "FILE_PASSWORD_OK", _e = "LE", T = "DOCUMENT_EXPORT_READY", A = "UNDO_REDO_STATE_CHANGE", b = "DOCUMENT_EDITING_ENABLED", U = "DOCUMENT_EDITING_DISABLED", F = "SEE", ye = "DOCX_PAGE_POSITION_CHANGE", De = "DOCX_FIRST_PART_LOADING", Oe = "DOCX_PART_LOADING", he = "DOCX_END_LOADING", Se = "DOCX_ZOOM_CHANGE", we = "DOCX_OPEN_FIND_UI", Ce = "XLSX_WORKSHEET_LOADED", Re = "XLSX_WORKSHEET_CHANGE", Ie = "XLSX_END_LOADING", Le = "XLSX_EDITING_STATUS_CHANGE", Ne = "XLSX_ZOOM_CHANGE", ge = "XLSX_OPEN_FIND_UI", Pe = "XLSX_WORKSHEET_LOADING_RATIO", Te = "XLSX_FIRST_PART_LOADING", Ae = "ASK_XLSX_SHEET_DELETE", k = "SELECTION_CHANGE", be = "DOCUMENT_READY", Ue = "PPTX_SLIDES_CHANGED", Fe = "PPTX_ZOOM_CHANGE", ke = "PPTX_START_LOADING", Xe = "PPTX_FIRST_PAGE_LOADED";
function Me(e, n) {
  const t = [], o = (c, s, f) => {
    c.addEventListener(s, f), t.push(() => c.removeEventListener(s, f));
  };
  let r = e.Document;
  o(r, T, () => {
    u("ExportReady", void 0, n);
  }), o(r, ye, () => {
    u("PagePositionChange", void 0, n);
  }), o(r, De, () => {
    u("DocumentReady", void 0, n);
  }), o(r, he, (c) => {
    u("LoadAllPageEnd", { count: c }, n);
  }), o(r, Se, () => {
    u("ZoomChange", void 0, n);
  }), o(r, Oe, (c, s) => {
    const f = Math.trunc(s * 100);
    u("DocumentLoading", { pageIndex: c, formatRatio: f }, n);
  }), o(r, b, () => {
    u("EditorEnable", void 0, n);
  }), o(r, U, () => {
    u("EditorDisable", void 0, n);
  }), o(r, F, (c) => {
    u("SecurityError", { action: c }, n);
  });
  let l = e.Finder;
  o(l, we, () => {
    u("OpenFindDialog", void 0, n);
  });
  let a = e.Selection;
  o(a, k, (c) => {
    u("SelectionChange", c, n);
  });
  let i = e.UndoRedo;
  return o(i, A, () => {
    u("UndoRedoChange", void 0, n);
  }), () => t.forEach((c) => c());
}
function ve(e, n) {
  const t = [], o = (i, c, s) => {
    i.addEventListener(c, s), t.push(() => i.removeEventListener(c, s));
  };
  let r = e.Document;
  o(r, be, () => {
    u("DocumentReady", void 0, n);
  }), o(r, T, () => {
    u("ExportReady", void 0, n);
  }), o(r, Fe, (i) => {
    u("ZoomChange", void 0, n);
  }), o(r, Ue, (i, c) => {
    u("CurrentPage", { currentPage: i }, n), u("PageCount", { totalPages: c }, n);
  }), o(r, ke, () => {
  }), o(r, Xe, () => {
    u("FirstPageLoaded", void 0, n);
  }), o(r, b, () => {
    u("EditorEnable", void 0, n);
  }), o(r, U, () => {
    u("EditorDisable", void 0, n);
  }), o(r, F, (i) => {
    u("SecurityError", { action: i }, n);
  });
  let l = e.UndoRedo;
  o(l, A, () => {
    u("UndoRedoChange", void 0, n);
  });
  let a = e.Selection;
  return o(a, k, (i) => {
    u("SelectionChange", i, n);
  }), () => t.forEach((i) => i());
}
function Be(e, n) {
  const t = [], o = (c, s, f) => {
    c.addEventListener(s, f), t.push(() => c.removeEventListener(s, f));
  };
  let r = e.Document;
  o(r, T, () => {
    u("ExportReady", void 0, n);
  }), o(r, Ce, () => {
    u("WorksheetLoaded", void 0, n);
  }), o(r, Ie, () => {
    u("EndLoading", void 0, n);
  }), o(r, Le, (c) => {
    u("EditingStatusChange", { status: c }, n);
  }), o(r, Ne, () => {
    u("ZoomChange", void 0, n);
  }), o(r, Pe, (c) => {
    const s = Math.trunc(c * 100);
    u("DocumentLoading", { formatRatio: s }, n);
  }), o(r, Te, () => {
    u("DocumentReady", void 0, n);
  }), o(r, Re, (c) => {
    u("SheetChange", c, n);
  }), o(r, b, () => {
    u("EditorEnable", void 0, n);
  }), o(r, U, () => {
    u("EditorDisable", void 0, n);
  }), o(r, F, (c) => {
    u("SecurityError", { action: c }, n);
  }), o(r, Ae, (c) => new Promise((s) => {
    u("AskDeleteSheet", { resolve: s }, n);
  }));
  let l = e.Selection;
  o(l, k, (c) => {
    u("SelectionChange", c, n);
  });
  let a = e.UndoRedo;
  o(a, A, () => {
    u("UndoRedoChange", void 0, n);
  });
  let i = e.Finder;
  return o(i, ge, () => {
    u("OpenFindDialog", void 0, n);
  }), () => t.forEach((c) => c());
}
const M = {
  VerifyOverload: 1,
  VerifyUnsupported: 2,
  VerifyAuthError: 3,
  VerifyExpire: 4,
  VerifyHostError: 5,
  VerifyArgError: 6,
  VerifyLicenseError: 7,
  VerifyComponentError: 8,
  VerifyOverloadMax: 9,
  VerifyOverloadClosed: 10
}, Ge = /* @__PURE__ */ new Set([2, 3, 4, 5, 6, 7, 8, 9, 10]), $e = /* @__PURE__ */ new Set([2, 3, 4, 5, 6, 7, 8, 10]);
function v(e) {
  if (typeof e == "string" && M[e] !== void 0)
    return M[e];
  if (typeof e != "string" && typeof e != "number")
    return null;
  const n = Number(e);
  return Number.isInteger(n) && n >= 1 && n <= 10 ? n : null;
}
function Z(e) {
  const n = v(e);
  if (n !== null || !e || typeof e != "object")
    return n;
  const t = e, o = [
    t.status,
    t.licenseStatus,
    t.code,
    t.error
  ];
  for (const r of o) {
    const l = v(r);
    if (l !== null)
      return l;
  }
  return null;
}
function Ot(e) {
  return e !== null && Ge.has(e);
}
function We(e) {
  return e !== null && $e.has(e);
}
function ht(e) {
  const n = Z(e);
  if (n !== null)
    return String(n);
  if (typeof e == "number")
    return String(e);
  if (!e || typeof e != "object" || Array.isArray(e))
    return "";
  const t = e, o = t.code ?? t.status ?? t.licenseStatus;
  return typeof o == "string" || typeof o == "number" ? String(o) : "";
}
function He(e) {
  return e ?? window;
}
function u(e, n, t) {
  let o = new CustomEvent(e, {
    detail: {
      ...n
    }
  });
  He(t).dispatchEvent(o);
}
function pe(e, n, t) {
  let o = e.Document, r = e.License;
  const l = [], a = (i, c, s) => {
    i.addEventListener(c, s), l.push(() => i.removeEventListener(c, s));
  };
  return a(o, V, (i) => new Promise((c, s) => {
    u("AskFilePassword", { resolve: c, reject: s }, t);
  })), a(o, q, (i) => new Promise((c, s) => {
    u("FilePassWordError", { resolve: c, reject: s }, t);
  })), a(o, z, (i) => {
    u("FilePassWordOK", null, t);
  }), a(r, _e, (i) => {
    var f;
    const c = Z(i);
    let s;
    We(c) ? s = () => {
      const d = typeof e.destroy == "function" ? e.destroy : e.dispose;
      return d == null ? void 0 : d.call(e);
    } : Promise.resolve((f = e.setReadOnly) == null ? void 0 : f.call(e, !0)).catch((d) => {
    }), u("LicenseVerifyError", { error: i, onConfirm: s }, t);
  }), () => l.forEach((i) => i());
}
function xe(e, n, t, o) {
  switch (t && typeof t.dispatchEvent == "function" && !o && (o = t, t = void 0), e) {
    case Ee:
    case de:
    case me:
      u("FileError", { callback: n, type: e }, o);
      break;
    case V:
      u("AskFilePassWord", { callback: n, cancel: t, type: e }, o);
      break;
    case q:
      u("FilePassWordError", { callback: n, cancel: t, type: e }, o);
      break;
    case z:
      u("FilePassWordOK", void 0, o);
      break;
  }
}
const h = {
  addInitEvent: pe,
  addXLSEvent: Be,
  addDocEvent: Me,
  addPPTEvent: ve,
  beforeMiddleware: xe
}, Ke = {
  loadBrowser: () => import("./office.core.js?version=1788858640169"),
  loadLocale: () => import("./locale-assets/locale.js?version=1788858640169")
};
let I = { ...Ke };
async function j(e) {
  const n = await e();
  return {
    ...n,
    default: await (n.default ?? n)
  };
}
function Ve(e = {}) {
  I = {
    ...I,
    ...e
  };
}
function qe() {
  return j(I.loadBrowser);
}
function ze() {
  return j(I.loadLocale);
}
async function Y(e = {}) {
  const [n, t] = await Promise.all([
    ze(),
    qe()
  ]), o = n.default, r = t.default, l = Ze(e.user), a = await Ye(e), i = je(e.coreExt), { app: c, docType: s } = await r.openFile(a, l, o, i, (f, d, _) => {
    h.beforeMiddleware(f, d, _, e.eventTarget);
  });
  return (e.title ?? a.fileName) && (document.title = e.title ?? a.fileName), {
    app: c,
    docType: s,
    docId: a.docId,
    fileData: a,
    userData: l
  };
}
function Ze(e) {
  return {
    ...e,
    nickName: (e == null ? void 0 : e.nickName) ?? "Local User",
    avatar: (e == null ? void 0 : e.avatar) ?? "",
    opts: (e == null ? void 0 : e.opts) ?? { color: "#2F80ED" }
  };
}
function je(e) {
  let n = {};
  !e || !e.coediting ? n = {
    enableCoEditing: !1
  } : n = {
    ...e.coediting,
    enableCoEditing: !0
  };
  let t = (e == null ? void 0 : e.license) || {};
  return {
    coediting: n,
    license: t,
    watermark: e == null ? void 0 : e.watermark
  };
}
async function Ye(e = {}) {
  const n = e.fileName;
  if (!n)
    throw new Error("bootup requires fileName");
  if (!e.docId)
    throw new Error("bootup requires docId");
  const t = e.file ?? e.fileUrl;
  if (!t)
    throw new Error("bootup requires file/fileUrl");
  const o = typeof t.arrayBuffer == "function" ? await t.arrayBuffer() : t;
  return {
    docId: e.docId,
    fileName: n,
    file: o,
    opts: {
      isLocal: !0
    }
  };
}
const J = "__documentModeController";
function B(e) {
  return !!e && typeof e.then == "function";
}
function Je(e) {
  if (!e || typeof e != "object")
    return !1;
  const n = e;
  return typeof n.setReadOnly == "function" && typeof n.isReadOnly == "function" && typeof n.onChange == "function";
}
class Qe {
  constructor(n) {
    y(this, "app");
    y(this, "readOnly", !1);
    y(this, "operationId", 0);
    y(this, "listeners", /* @__PURE__ */ new Set());
    y(this, "setReadOnlyAlias", (n) => this.setReadOnly(n));
    y(this, "isReadOnlyAlias", () => this.isReadOnly());
    this.app = n, this.installAliases(n), this.readOnly = this.readFromCore(!1);
  }
  onChange(n) {
    return this.listeners.add(n), () => {
      this.listeners.delete(n);
    };
  }
  isReadOnly() {
    return this.readOnly = this.readFromCore(this.readOnly), this.readOnly;
  }
  async setReadOnly(n) {
    const t = ++this.operationId, o = this.readOnly, r = !!n, l = this.getDocumentCallFun();
    if (!l)
      return this.readOnly;
    const a = l(r ? "startReadOnly" : "endReadOnly");
    return B(a) && await a, t !== this.operationId ? this.readOnly : (this.readOnly = this.readFromCore(r), this.readOnly !== o && this.emitChange(), this.readOnly);
  }
  installAliases(n) {
    try {
      Object.defineProperty(n, J, {
        value: this,
        enumerable: !1,
        configurable: !0
      }), n.setReadOnly = this.setReadOnlyAlias, n.isReadOnly = this.isReadOnlyAlias;
    } catch {
    }
  }
  getDocumentCallFun() {
    var t, o, r;
    const n = (o = (t = this.app) == null ? void 0 : t.Document) == null ? void 0 : o.callFun;
    return typeof n == "function" ? n.bind((r = this.app) == null ? void 0 : r.Document) : null;
  }
  readFromCore(n = this.readOnly) {
    const t = this.getDocumentCallFun();
    if (!t)
      return n;
    const o = t("isReadOnly");
    return typeof o == "boolean" ? o : (B(o), n);
  }
  emitChange() {
    this.listeners.forEach((n) => {
      try {
        n(this.readOnly);
      } catch {
      }
    });
  }
}
function en(e) {
  if (!e || typeof e != "object")
    return null;
  const n = e, t = n[J];
  return Je(t) ? t : new Qe(n);
}
const nn = Symbol(), S = /* @__PURE__ */ new Map(), O = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new WeakMap();
function tn(e) {
  return e ?? window;
}
function g(e) {
  const n = N.get(e);
  n && (n(), N.delete(e));
}
function on(e) {
  if (!e || e.__officeSdkDocumentEventsDisposePatched)
    return;
  const n = e.dispose, t = e.destroy;
  typeof n == "function" && (e.dispose = function(...o) {
    return g(e), n.apply(this, o);
  }), typeof t == "function" && t !== n && (e.destroy = function(...o) {
    return g(e), t.apply(this, o);
  }), Object.defineProperty(e, "__officeSdkDocumentEventsDisposePatched", {
    value: !0,
    enumerable: !1,
    configurable: !1,
    writable: !1
  });
}
function C(e) {
  var n, t, o;
  return !!((n = e == null ? void 0 : e.isDisposed) != null && n.call(e) || (o = (t = e == null ? void 0 : e.__internalApp) == null ? void 0 : t.isDisposed) != null && o.call(t));
}
function rn(e) {
  if (document.visibilityState === "hidden" || C(e))
    return;
  const n = e.Document || e.Viewer;
  typeof (n == null ? void 0 : n.updateVisibleArea) == "function" && requestAnimationFrame(() => {
    if (!(document.visibilityState === "hidden" || C(e)))
      try {
        Promise.resolve(n.updateVisibleArea()).catch((t) => {
          C(e);
        });
      } catch (t) {
        C(e);
      }
  });
}
function sn(e, n, t, o) {
  g(e);
  const r = [], l = (i) => {
    typeof i == "function" && r.push(i);
  };
  switch (l(h.addInitEvent(e, t, o)), n) {
    case L.WORD: {
      l(h.addDocEvent(e, o));
      break;
    }
    case L.EXCEL: {
      l(h.addXLSEvent(e, o));
      break;
    }
    case L.PPT: {
      l(h.addPPTEvent(e, o));
      break;
    }
  }
  const a = () => {
    rn(e);
  };
  document.addEventListener("visibilitychange", a), N.set(e, () => {
    document.removeEventListener("visibilitychange", a), r.forEach((i) => {
      try {
        i();
      } catch (c) {
      }
    });
  }), on(e);
}
function cn(e = {}) {
  return {
    docId: e.docId,
    mainDom: e.mainDom,
    eventTarget: tn(e.eventTarget)
  };
}
function ln(e) {
  e != null && e.docId && S.set(e.docId, e);
}
function an(e, n) {
  !e || !n || (O.set(e, n), n.finally(() => {
    O.get(e) === n && O.delete(e);
  }).catch(() => {
  }));
}
function un(e) {
  if (!e || !S.has(e))
    return null;
  const n = S.get(e);
  return S.delete(e), n;
}
async function fn(e) {
  if (!e || !O.has(e))
    return null;
  const n = O.get(e);
  try {
    const t = await n;
    return t != null && t.docId && S.delete(t.docId), t;
  } catch {
    return null;
  }
}
function Q(e = {}) {
  return {
    docId: e.docId,
    eventTarget: e.eventTarget,
    title: e.title,
    user: e.user,
    file: e.file,
    fileUrl: e.fileUrl,
    fileName: e.fileName,
    coreExt: e.coreExt
  };
}
async function dn(e, n) {
  !e || !n || !Object.prototype.hasOwnProperty.call(n, "readOnly") || await e.setReadOnly(!!n.readOnly);
}
function En(e) {
  return e == null ? void 0 : e[nn];
}
async function mn(e = {}) {
  const n = O.get(e.docId);
  if (n)
    return n;
  const t = Y(Q(e)).then((o) => (ln(o), o));
  return an(e.docId, t), t;
}
async function ee(e = {}) {
  const { docId: n, mainDom: t, eventTarget: o } = cn(e);
  if (e.probeOnly) {
    const s = await mn({
      ...e,
      eventTarget: o
    });
    return {
      docId: s.docId,
      docType: s.docType
    };
  }
  if (!t)
    throw new Error("OpenDocument requires a mount element");
  let r = un(n);
  r || (r = await fn(n)), r || (r = await Y(Q({
    ...e,
    docId: n,
    eventTarget: o
  })));
  const { app: l, docType: a } = r, i = en(l);
  l.mount(t), sn(l, a, t, o);
  const c = En(e);
  return typeof (c == null ? void 0 : c.beforeRender) == "function" && await c.beforeRender(l, {
    docId: r.docId ?? n,
    docType: a
  }), await dn(i, e.widgetMode), await l.render(), {
    docId: r.docId ?? n,
    docType: a,
    app: l
  };
}
const E = {
  WORD: 1,
  EXCEL: 2,
  PPT: 3,
  PDF: 4,
  OFD: 5,
  TXT: 6
};
function _n() {
  return {
    docx: () => import("./mountDocxApp.js?version=1788858640169"),
    xlsx: () => import("./mountXlsxApp.js?version=1788858640169"),
    pptx: () => import("./mountPptxApp.js?version=1788858640169")
  };
}
function yn(e) {
  return {
    ..._n(),
    ...e
  };
}
function Dn(e) {
  switch (e) {
    case E.WORD:
      return "docx";
    case E.EXCEL:
      return "xlsx";
    case E.PPT:
      return "pptx";
    default:
      throw new Error(`office sdk does not support docType ${e}`);
  }
}
async function On(e, n, t, o, r) {
  const l = Dn(e), a = o[l];
  if (typeof a != "function")
    throw new Error(`office sdk app loader is not configured for ${l}`);
  const i = await a();
  if (typeof i.mount != "function")
    throw new Error(`office sdk app module for ${l} does not export mount(...)`);
  return i.mount(n, t, r);
}
const hn = "Local User", Sn = "#2F80ED";
function ne(e) {
  return {
    ...e,
    nickName: (e == null ? void 0 : e.nickName) ?? hn,
    avatar: (e == null ? void 0 : e.avatar) ?? "",
    opts: (e == null ? void 0 : e.opts) ?? { color: Sn }
  };
}
let P = null, m = null;
function te(e) {
  return e.replace(/\/$/, "");
}
function wn(e) {
  const n = new URL(e, window.location.href), t = new URL("./sharedWorkerStorage.worker.js", n);
  return t.search = n.search, t.href;
}
function oe() {
  if (!P)
    throw new Error(
      "Office SDK runtime is not ready. Please verify the SDK assets are deployed correctly and retry opening the document."
    );
  return P;
}
function Cn(e) {
  const n = oe();
  return {
    ...e,
    user: ne(e.user),
    lang: e.lang ?? n.lang,
    assetBaseUrl: e.assetBaseUrl ?? n.assetBaseUrl,
    workerUrl: e.workerUrl ?? n.workerUrl,
    localeAssetRoot: e.localeAssetRoot ?? n.localeAssetRoot
  };
}
function Rn(e) {
  P = {
    ...e,
    appLoaders: yn(e.appLoaders)
  }, Ve({
    loadBrowser: async () => ({ default: e.core }),
    loadLocale: async () => ({ default: e.locale })
  });
}
function In(e) {
  return {
    core: e.core,
    locale: e.locale,
    mount(n) {
      return Rn(e), Jn(n);
    }
  };
}
function Ln(e) {
  if (e.target instanceof HTMLElement)
    return e.target;
  if (typeof e.target == "string") {
    const n = document.querySelector(e.target);
    if (!n)
      throw new Error(`mount target "${e.target}" not found`);
    return n;
  }
  if (e.domId) {
    const n = document.getElementById(e.domId);
    if (!n)
      throw new Error(`mount target #${e.domId} not found`);
    return n;
  }
  throw new Error("mount target is required");
}
function Nn(e) {
  e.replaceChildren();
  const n = document.createElement("div");
  return n.className = "office-sdk-root", e.appendChild(n), n;
}
function gn(e) {
  const n = import.meta.url;
  return new URL(e, n).href;
}
function Pn() {
  return te(gn("./"));
}
function Tn(e) {
  const n = te(e.assetBaseUrl ?? Pn());
  return {
    apibase: e.apibase ?? window.location.origin,
    uriprefix: e.uriprefix ?? "",
    lang: e.lang ?? window.navigator.language,
    assetBaseUrl: n,
    localeAssetRoot: e.localeAssetRoot ?? `${n}/locale-assets`,
    workerUrl: e.workerUrl ?? `${n}/worker/index.js`
  };
}
function re(e, n) {
  const t = window;
  wn(e.workerUrl), t.apibase = e.apibase, t.uriprefix = e.uriprefix, t.lang = e.lang, t.__OFFICE_SDK_RUNTIME__ = {
    // assetBaseUrl: config.assetBaseUrl,
    // localeAssetRoot: config.localeAssetRoot,
    // workerUrl: config.workerUrl,
    // storageWorkerUrl
  }, t.__OFFICE_SDK_MOUNT__ = !0, t.__OFFICE_SDK_MOUNT_COUNT__ = (m == null ? void 0 : m.mountCount) ?? 0, n && (document.title = n);
}
function An(e, n) {
  return e.apibase === n.apibase && e.uriprefix === n.uriprefix && e.lang === n.lang && e.assetBaseUrl === n.assetBaseUrl && e.localeAssetRoot === n.localeAssetRoot && e.workerUrl === n.workerUrl;
}
function bn(e, n) {
  const t = Tn(n);
  if (m) {
    if (m.core !== e.core || m.locale !== e.locale || !An(m.config, t))
      throw new Error(
        "office sdk can mount multiple active instances only when they share the same runtime and page-level config (apibase, uriprefix, lang, worker and asset roots)"
      );
  } else
    m = {
      config: t,
      core: e.core,
      locale: e.locale,
      mountCount: 0
    };
  m.mountCount += 1, re(t, n.title);
}
function G() {
  if (!m)
    return;
  if (m.mountCount -= 1, m.mountCount > 0) {
    re(m.config);
    return;
  }
  const e = window;
  delete e.__OFFICE_SDK_RUNTIME__, delete e.__OFFICE_SDK_MOUNT__, delete e.__OFFICE_SDK_MOUNT_COUNT__, m = null;
}
function Un(e) {
  var t;
  const n = e.includes(".") ? ((t = e.split(".").pop()) == null ? void 0 : t.toLowerCase()) ?? "" : "";
  if (["xls", "xlsx"].includes(n))
    return "xlsx";
  if (["pptx"].includes(n))
    return "pptx";
  if (["doc", "docx"].includes(n))
    return "docx";
}
function Fn(e) {
  switch (e) {
    case "docx":
      return E.WORD;
    case "xlsx":
      return E.EXCEL;
    case "pptx":
      return E.PPT;
    default:
      return null;
  }
}
function kn(e) {
  let n = 0;
  for (let t = 0; t < e.length; t += 1)
    n = (n << 5) - n + e.charCodeAt(t), n |= 0;
  return `widget-${Math.abs(n)}`;
}
function Xn(e, n, t) {
  return typeof t == "string" && t ? `${e}:${t}` : typeof File < "u" && n instanceof File ? `${e}:${n.size}:${n.lastModified}:${n.type}` : typeof Blob < "u" && n instanceof Blob ? `${e}:${n.size}:${n.type}` : n instanceof ArrayBuffer ? `${e}:${n.byteLength}:arraybuffer` : ArrayBuffer.isView(n) ? `${e}:${n.byteLength}:view` : typeof n == "string" ? `${e}:${n}` : `${e}:local`;
}
function Mn(e) {
  return e instanceof ArrayBuffer ? e.slice(0) : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength).slice().buffer : e;
}
function vn(e, n, t) {
  ee({
    probeOnly: !0,
    docId: t.docId,
    file: Mn(t.file),
    fileUrl: t.fileUrl,
    fileName: t.fileName,
    user: e.user,
    eventTarget: n == null ? void 0 : n.eventTarget,
    title: e.title,
    coreExt: e.coreExt
  }).catch((o) => {
  });
}
async function Bn(e, n) {
  var i;
  if (!e.fileUrl && !e.file)
    throw new Error('mount option "file" or "fileUrl" is required');
  const t = e.fileUrl ? new URL(e.fileUrl, window.location.href).href : void 0, o = (i = e.fileName) == null ? void 0 : i.trim();
  if (!o)
    throw new Error('mount option "fileName" is required');
  const r = Un(o), l = Fn(r), a = e.docId ?? kn(Xn(o, e.file, t));
  return l ? (vn(e, n, {
    docId: a,
    file: e.file,
    fileUrl: t,
    fileName: o
  }), {
    docId: a,
    docType: l,
    file: e.file,
    fileUrl: t,
    fileName: o
  }) : ee({
    probeOnly: !0,
    docId: a,
    file: e.file,
    fileUrl: t,
    fileName: o,
    user: e.user,
    eventTarget: n == null ? void 0 : n.eventTarget,
    title: e.title
  });
}
async function Gn(e, n, t, o, r) {
  if ([E.PDF, E.OFD, E.TXT].includes(e))
    throw new Error(`office sdk does not support docType ${e}`);
  return On(e, n, t, o, r);
}
function $n(e) {
  const n = Object.entries(E).find(([, t]) => t === e);
  return n ? n[0] : null;
}
function Wn(e, n) {
  var t, o;
  return ((o = (t = e.store.state.file) == null ? void 0 : t.fileInfo) == null ? void 0 : o.docId) ?? n.docId ?? "";
}
const $ = /* @__PURE__ */ new WeakMap();
function Hn(e) {
  return !!(e && typeof e.then == "function");
}
function pn(e) {
  return !!(e && typeof e == "object" && (typeof e.callFun == "function" || typeof e.addEventListener == "function"));
}
function W(e, n, t) {
  var o, r;
  try {
    (r = (o = e.store) == null ? void 0 : o.commit) == null || r.call(o, n, t);
  } catch {
  }
}
function xn(e, n) {
  var t, o;
  try {
    (o = (t = e.commandService) == null ? void 0 : t.refreshSome) == null || o.call(t, n);
  } catch {
  }
}
function Kn(e, n) {
  var o, r;
  const t = (r = (o = e.store) == null ? void 0 : o.getters) == null ? void 0 : r["command/getVal"];
  return typeof t == "function" ? t(n) : void 0;
}
function X(e, n, t) {
  W(e, "command/setState", {
    cmd: n,
    ui: { value: t }
  }), W(e, "command/setEnabled", {
    cmd: n,
    enabled: !0
  });
}
function Vn(e, n) {
  return e === "callFun" && typeof n[0] == "string" ? {
    methodName: n[0],
    args: n.slice(1)
  } : {
    methodName: String(e),
    args: n
  };
}
function H(e, n) {
  var o, r;
  const t = (r = (o = e == null ? void 0 : e.Document) == null ? void 0 : o.getZoom) == null ? void 0 : r.call(o);
  if (typeof t == "number" && Number.isFinite(t)) {
    X(n, "zoom", Math.round(t));
    return;
  }
  xn(n, ["zoom"]);
}
function qn(e, n) {
  var l, a, i;
  const t = e == null ? void 0 : e.Document, o = Kn(n, "paraSymbol"), r = {
    ...o && typeof o == "object" ? o : {},
    ParagraphMarks: !!((l = t == null ? void 0 : t.getShowParagraphMarks) != null && l.call(t)),
    PageBreak: !!((a = t == null ? void 0 : t.getShowPageBreak) != null && a.call(t)),
    SectionBreak: !!((i = t == null ? void 0 : t.getShowSectionBreak) != null && i.call(t))
  };
  X(n, "paraSymbol", r);
}
function zn(e, n, t, o, r, l) {
  const { methodName: a, args: i } = Vn(r, l), c = n;
  if (o === "Document")
    switch (a) {
      case "setZoom":
        H(c, t);
        break;
      case "setPageView": {
        if (e !== E.WORD)
          break;
        const s = i[0];
        (s === "single" || s === "multi" || s === "wide") && X(t, "pageViewSwitch", s), H(c, t);
        break;
      }
      case "setShowParagraphMarks":
      case "setShowPageBreak":
      case "setShowSectionBreak":
        e === E.WORD && qn(c, t);
        break;
    }
}
function p(e, n, t, o, r, l) {
  var i;
  const a = () => zn(
    e,
    n,
    t,
    o,
    r,
    l
  );
  a(), typeof queueMicrotask == "function" ? queueMicrotask(a) : Promise.resolve().then(a), (i = window.requestAnimationFrame) == null || i.call(window, a), window.setTimeout(a, 0);
}
function Zn(e, n, t, o) {
  return new Proxy(
    {},
    {
      get(r, l) {
        const a = n == null ? void 0 : n[o], i = a == null ? void 0 : a[l];
        return typeof i != "function" ? i : (...c) => {
          const s = n == null ? void 0 : n[o], f = s == null ? void 0 : s[l];
          if (typeof f != "function")
            throw new Error(`component method ${String(l)} is not available`);
          const d = Reflect.apply(f, s, c);
          return Hn(d) ? Promise.resolve(d).finally(() => {
            p(e, n, t, o, l, c);
          }) : (p(e, n, t, o, l, c), d);
        };
      },
      has(r, l) {
        return l in ((n == null ? void 0 : n[o]) ?? {});
      }
    }
  );
}
function jn(e, n, t) {
  const o = $.get(t);
  if ((o == null ? void 0 : o.rawApp) === n)
    return o.facade;
  if (!n || typeof n != "object")
    return n ?? null;
  const r = /* @__PURE__ */ new Map(), l = new Proxy(n, {
    get(a, i, c) {
      const s = Reflect.get(a, i, c);
      return pn(s) ? (r.has(i) || r.set(
        i,
        Zn(e, a, t, i)
      ), r.get(i)) : s;
    }
  });
  return $.set(t, { rawApp: n, facade: l }), l;
}
function Yn(e, n) {
  var t;
  return jn(n, (t = e.api) == null ? void 0 : t.docApp, e);
}
async function Jn(e) {
  const n = Cn(e), t = oe(), o = {
    eventTarget: new EventTarget(),
    uiOptions: n.uiOptions,
    widgetMode: n.widgetMode,
    coreExt: n.coreExt
  };
  bn(t, n);
  const r = Ln(n), l = Nn(r);
  let a = null, i = null;
  function c() {
    return i || (i = (async () => {
      try {
        if (a) {
          const s = a.destroy ?? a.close ?? a.unmount;
          await (s == null ? void 0 : s.call(a));
        }
      } finally {
        l.replaceChildren(), l.remove(), G();
      }
    })(), i);
  }
  o.requestClose = async () => {
    try {
      await c();
    } finally {
      r.dispatchEvent(
        new CustomEvent("office-sdk-closed", {
          bubbles: !0,
          detail: { reason: "license-error" }
        })
      );
    }
  };
  try {
    const s = await Bn(n, o), f = (s == null ? void 0 : s.docId) ?? n.docId;
    o.docId = f, o.file = n.file, o.user = n.user, o.fileUrl = s && "fileUrl" in s ? s.fileUrl : n.fileUrl, o.fileName = s && "fileName" in s ? s.fileName : n.fileName, o.widgetMode = n.widgetMode;
    const { docType: d } = s, _ = await Gn(
      d,
      l,
      n.lang,
      t.appLoaders,
      o
    );
    return a = _, {
      get docId() {
        return Wn(_, {
          ...n,
          docId: f
        });
      },
      docType: d,
      docTypeName: $n(d),
      root: l,
      core: t.core,
      get app() {
        return Yn(_, d);
      },
      api: _.api,
      eventTarget: o.eventTarget,
      ready: _.ready,
      destroy: c,
      close: c,
      unmount: c
    };
  } catch (s) {
    throw l.replaceChildren(), l.remove(), G(), s;
  }
}
function Qn(e) {
  return e ? {
    ...e
  } : null;
}
function et(e) {
  var o;
  const n = e != null && e.mode ? { ...e.mode } : void 0, t = ((o = n == null ? void 0 : n.lang) == null ? void 0 : o.trim()) || void 0;
  return n && delete n.lang, {
    userData: ne(e == null ? void 0 : e.userData),
    uiOptions: e == null ? void 0 : e.uiOptions,
    mode: n && Object.keys(n).length > 0 ? n : void 0,
    lang: t,
    coreExt: Qn(e == null ? void 0 : e.coreExt)
  };
}
let R = null, D = null, x = 0;
function nt() {
  return typeof document < "u";
}
function tt(e) {
  const n = import.meta.url, t = new URL(`./${e}`, n);
  return t.searchParams.set("version", "1788858636272"), t.href;
}
function ot(e) {
  return Array.from(document.querySelectorAll("link")).some((n) => n.href === e && n.relList.contains("stylesheet"));
}
function ie() {
  if (!nt())
    return Promise.resolve();
  if (D)
    return D;
  const e = tt("style.css");
  return ot(e) ? (D = Promise.resolve(), D) : (D = new Promise((n, t) => {
    const o = document.createElement("link");
    o.rel = "stylesheet", o.href = e, o.dataset.officeSdkStyle = "true", o.onload = n, o.onerror = t, (document.head ?? document.documentElement).appendChild(o);
  }), D);
}
ie();
function se(e) {
  var t;
  const n = (t = e.fileName) == null ? void 0 : t.trim();
  if (n)
    return n;
  throw new Error("office sdk openfile requires fileData.fileName");
}
function rt(e) {
  let n = 0;
  for (let t = 0; t < e.length; t += 1)
    n = (n << 5) - n + e.charCodeAt(t), n |= 0;
  return `widget-${Math.abs(n)}`;
}
function it(e, n) {
  return typeof File < "u" && n instanceof File ? `${e}:${n.size}:${n.lastModified}:${n.type}` : typeof Blob < "u" && n instanceof Blob ? `${e}:${n.size}:${n.type}` : n instanceof ArrayBuffer ? `${e}:${n.byteLength}:arraybuffer` : ArrayBuffer.isView(n) ? `${e}:${n.byteLength}:view` : typeof n == "string" ? `${e}:${n}` : `${e}:local`;
}
function st(e, n) {
  var o;
  const t = (o = e.docId) == null ? void 0 : o.trim();
  return t || rt(it(n, e.file));
}
function ct(e) {
  var t;
  switch (e.includes(".") ? ((t = e.split(".").pop()) == null ? void 0 : t.toLowerCase()) ?? "" : "") {
    case "doc":
    case "wps":
    case "docx":
      return E.WORD;
    case "xls":
    case "es":
    case "xlsx":
      return E.EXCEL;
    case "ppt":
    case "pptx":
      return E.PPT;
    default:
      throw new Error(`office sdk openfile does not support file "${e || "(unknown)"}"`);
  }
}
function lt(e) {
  switch (e) {
    case E.WORD:
      return "blank.docx";
    case E.EXCEL:
      return "blank.xlsx";
    case E.PPT:
      return "blank.pptx";
    default:
      throw new Error(`office sdk createfile does not support docType ${e}`);
  }
}
function at(e) {
  return x += 1, `new-${e}-${Date.now()}-${x}`;
}
function ut(e = { fallback: "zh-CN", onlyMain: !1 }) {
  var r;
  const { fallback: n = "zh-CN", onlyMain: t = !1 } = e;
  let o = ((r = navigator.languages) == null ? void 0 : r[0]) || navigator.language || n;
  return typeof o != "string" ? n : (o = o.trim(), t ? o.split(/[-_]/)[0] || n : o.replace(/^([a-z]{2})-([a-z]{2})$/i, (l, a, i) => a.toLowerCase() + "-" + i.toUpperCase()));
}
function ft(e) {
  return /^(blob:|data:|https?:\/\/|file:|\/|\.\/|\.\.\/)/i.test(e);
}
function dt(e) {
  return typeof Blob < "u" && e instanceof Blob ? e : e instanceof ArrayBuffer ? new Blob([e]) : ArrayBuffer.isView(e) ? new Blob([e]) : typeof e == "string" ? new Blob([e]) : null;
}
function Et(e) {
  if (typeof e == "string" && ft(e))
    return {
      fileUrl: e,
      file: void 0,
      revoke: null
    };
  if (typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer || ArrayBuffer.isView(e))
    return {
      file: e,
      fileUrl: void 0,
      revoke: null
    };
  const n = typeof e == "string" ? new Blob([e]) : dt(e);
  if (!n)
    throw new Error("office sdk openfile requires fileData.file to be a URL, Blob, ArrayBuffer, or TypedArray");
  return {
    file: n,
    fileUrl: void 0,
    revoke: null
  };
}
function mt(e) {
  if (typeof HTMLElement < "u" && e instanceof HTMLElement)
    return { target: e };
  if (typeof e != "string" || !e.trim())
    throw new Error("office sdk widget.mount(...) requires a target dom id or HTMLElement");
  const n = e.trim();
  return n.startsWith("#") || n.startsWith(".") || n.startsWith("[") ? { target: n } : { domId: n };
}
async function K(e) {
  return e.default ?? e;
}
async function ce() {
  return R || (R = Promise.all([
    import("./office.core.js?version=1788858640169"),
    import("./locale-assets/locale.js?version=1788858640169")
  ]).then(async ([e, n]) => ({
    core: await K(e),
    locale: await K(n)
  })).catch((e) => {
    throw R = null, e;
  })), R;
}
function _t(e, n, t, o, r, l, a) {
  const i = {
    handle: null,
    handlePromise: null,
    mountTarget: null,
    revokeFileUrl: null
  };
  async function c() {
    const s = i.handle ?? (i.handlePromise ? await i.handlePromise.catch(() => null) : null);
    i.handle = null, i.handlePromise = null;
    try {
      const f = (s == null ? void 0 : s.destroy) ?? (s == null ? void 0 : s.close) ?? (s == null ? void 0 : s.unmount);
      await (f == null ? void 0 : f.call(s));
    } finally {
      i.revokeFileUrl && (i.revokeFileUrl(), i.revokeFileUrl = null);
    }
  }
  return {
    mount(s) {
      return i.mountTarget = s, this;
    },
    async render() {
      if (!i.mountTarget)
        throw new Error("office sdk widget.render() requires widget.mount(...) to be called first");
      if (await ie(), !i.handlePromise) {
        const f = se(n), { file: d, fileUrl: _, revoke: ae } = Et(n.file);
        i.revokeFileUrl = ae, i.handlePromise = e.mount({
          ...mt(i.mountTarget),
          docId: n.docId,
          file: d,
          fileUrl: _,
          fileName: f,
          user: t,
          coreExt: a,
          uiOptions: r,
          widgetMode: l
        }).then((w) => (i.handle = w, w)).catch((w) => {
          throw i.handlePromise = null, i.revokeFileUrl && (i.revokeFileUrl(), i.revokeFileUrl = null), w;
        });
      }
      const s = await i.handlePromise;
      return await s.ready, s.app;
    },
    async destroy() {
      await c();
    },
    async close() {
      await c();
    },
    async unmount() {
      await c();
    },
    get docId() {
      var s;
      return ((s = i.handle) == null ? void 0 : s.docId) ?? n.docId ?? "";
    },
    get docType() {
      var s;
      return ((s = i.handle) == null ? void 0 : s.docType) ?? o;
    },
    get docTypeName() {
      var s;
      return ((s = i.handle) == null ? void 0 : s.docTypeName) ?? null;
    }
  };
}
async function le(e, n) {
  const t = se(e), o = st(e, t), { core: r, locale: l } = await ce(), {
    userData: a,
    uiOptions: i,
    mode: c,
    lang: s,
    coreExt: f
  } = et(n), d = In({
    core: r,
    locale: l,
    lang: s ?? ut()
  }), _ = ct(t);
  return {
    docType: _,
    widget: _t(
      d,
      { ...e, docId: o, fileName: t },
      a,
      _,
      i,
      c,
      f
    )
  };
}
async function yt(e, n) {
  const t = lt(e), { locale: o } = await ce(), r = o == null ? void 0 : o.loadSample;
  if (typeof r != "function")
    throw new Error("office sdk createfile requires locale.loadSample(docType)");
  const l = await r.call(o, e);
  if (typeof l != "string" || !l.trim())
    throw new Error(`office sdk createfile did not receive a sample URL for docType ${e}`);
  return le(
    {
      docId: at(e),
      fileName: t,
      file: l.trim()
    },
    n
  );
}
const St = {
  openfile: le,
  createfile: yt
};
export {
  ee as O,
  en as a,
  ht as b,
  nn as c,
  u as d,
  yt as e,
  le as f,
  Ot as i,
  St as o,
  Z as r
};
