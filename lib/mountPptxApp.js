var Fe = Object.defineProperty;
var Oe = (t, e, n) => e in t ? Fe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var k = (t, e, n) => Oe(t, typeof e != "symbol" ? e + "" : e, n);
import { d as L, u as H, i as Q, W as ie, j as se, k as Ae, l as Ee, m as Ne, o as v, c as I, n as te, a as A, b as l, p as Se, g as N, r as B, q as Qe, h as b, s as Ve, I as Pe, x as Z, v as He, T as Te, e as F, z as ze, _ as j, w as ae, B as U, t as oe, aZ as ke, X as ge, Y as pe, a0 as xe, E as Xe, F as X, a3 as Y, C as x, G as We, y as Ge, H as Ue, J as je, K as Be, L as qe, M as Ye, N as Me, P as Ze, O as Ke, R as J, Q as Je, a1 as _e, a2 as $e, a4 as et, a5 as tt, A as re, D as nt, U as at, V as ot, f as rt, a6 as lt, a7 as it, a8 as st, a9 as At, aa as dt, ab as ct, ac as ut, ad as mt, ae as gt, af as pt, ag as ft, ah as ht, ai as vt, aj as bt, ak as yt, al as Ct, am as wt, an as Et, ao as St, ap as Pt, aq as Bt, ar as It, as as Rt, at as Dt, au as Lt, av as Ft, aw as Ot, ax as Nt, ay as Qt, az as Vt, aA as Ht, aB as Tt, aC as zt, aD as kt, aE as xt, aF as Xt, aG as Wt, aH as Gt, aI as Ut, aJ as jt, aK as qt, aL as fe, aM as Yt, aN as Mt, aO as Zt, aP as Kt, aQ as Jt, aR as _t, aS as $t, aT as en, aV as tn, aW as _ } from "./ApiBase.js?version=1788858640169";
import { a as nn, O as he, c as ve, d as be, r as an, i as on } from "./UI.runtime.js?version=1788858640169";
const D = {
  Init: "init",
  // 文档初始化时
  SelectionChange: "selectionChange",
  // selection改变时
  UndoRedoChange: "UndoRedoChange",
  // undo redo 操作列表发生改变时
  ExportReady: "ExportReady",
  // 文档准备好导出时
  ZoomChange: "ZoomChange"
  // zoom 改变
}, o = {
  //styles
  Bold: "bold",
  Underline: "underline",
  Strikeout: "strikeout",
  Italic: "italic",
  FontSize: "fontSize",
  FontColor: "fontColor",
  FontName: "fontName",
  Color: "color",
  AlignHorizontal: "alignHorizontal",
  AlignVertical: "alignVertical",
  // editor
  Undo: "undo",
  Redo: "redo",
  Copy: "copy",
  Paste: "paste",
  NewSlide: "newSlide",
  Zoom: "zoom",
  AutoZoom: "autoZoom",
  Export: "export",
  ExportPDF: "exportPDF",
  Open: "open",
  Play: "play",
  GoToPage: "goToPage",
  GetLayoutList: "getLayoutList",
  // dropdown
  SlideOptions: "slideOptions"
}, le = /* @__PURE__ */ new Set([
  o.Open,
  o.Export,
  o.ExportPDF,
  o.Copy,
  o.Play,
  o.GoToPage,
  o.GetLayoutList,
  o.Zoom,
  o.AutoZoom
]);
function rn(t, e, n = window) {
  let a = null;
  const r = () => {
    a && (clearInterval(a), a = null);
  }, i = (E) => {
    t.dispatch("file/onError", E);
  };
  n.addEventListener("FileError", i);
  const s = (E) => {
    t.dispatch("file/onReady", E), t.dispatch("file/onLoadPageEnd", E), t.commit("command/setLoadEnd", !0), e.refresh(D.Init);
  };
  n.addEventListener("DocumentReady", s);
  const u = (E) => {
    e.refresh(D.ZoomChange);
  };
  n.addEventListener("ZoomChange", u);
  const c = (E) => {
    t.dispatch("file/onExportReady", E), e.refresh(D.ExportReady);
  };
  n.addEventListener("ExportReady", c);
  const d = (E) => {
    e.refresh(D.UndoRedoChange);
  };
  n.addEventListener("UndoRedoChange", d);
  const p = (E) => {
    const { currentPage: V } = (E == null ? void 0 : E.detail) || {};
    t.commit("file/setCurrentPage", V);
  };
  n.addEventListener("CurrentPage", p);
  const f = (E) => {
    const { totalPages: V } = (E == null ? void 0 : E.detail) || {};
    t.commit("file/setPageCount", V), t.commit("command/setEnabled", {
      cmd: o.Play,
      enabled: V > 0
    }), e.refresh(D.SelectionChange);
  };
  n.addEventListener("PageCount", f);
  const R = (E) => {
    ln(t, E.detail), e.refresh(D.SelectionChange);
  };
  n.addEventListener("SelectionChange", R);
  const y = (E) => {
    t.dispatch("file/onReady", E), r();
    function V(S, z) {
      return Math.floor(Math.random() * (z - S + 1)) + S;
    }
    let G = 0, W = 50;
    const m = () => {
      const S = V(G, W);
      t.commit("file/setLoadingStepTime", S), G = W, W = Math.min(W + V(20, 50), 100), G >= 100 && (G = 0, W = 50);
    };
    a = window.setInterval(() => {
      if ((t == null ? void 0 : t.getters["file/loadingRatio"]) === 100) {
        r(), t.commit("file/setLoadingStepTime", 1e3);
        return;
      }
      m();
    }, 3e3), m();
  };
  n.addEventListener("FirstPageLoaded", y);
  const C = () => {
    e.enableEditor();
  };
  n.addEventListener("EditorEnable", C);
  const O = () => {
    e.disableEditor();
  };
  n.addEventListener("EditorDisable", O);
  const q = (E) => {
    var V;
    e.notifySecurityError(((V = E.detail) == null ? void 0 : V.action) || "");
  };
  return n.addEventListener("SecurityError", q), () => {
    n.removeEventListener("FileError", i), n.removeEventListener("DocumentReady", s), n.removeEventListener("ZOOM_CHANGED", u), n.removeEventListener("ExportReady", c), n.removeEventListener("UndoRedoChange", d), n.removeEventListener("CurrentPage", p), n.removeEventListener("PageCount", f), n.removeEventListener("FirstPageLoaded", y), n.removeEventListener("EditorEnable", C), n.removeEventListener("EditorDisable", O), n.removeEventListener("SecurityError", q), r();
  };
}
function ln(t, e) {
  if (!e) return;
  const n = [
    { cmd: o.Bold, key: "bold" },
    { cmd: o.FontColor, key: "fontColor" },
    { cmd: o.FontName, key: "fontName" },
    {
      cmd: o.FontSize,
      key: "fontSize",
      getVal: (r) => {
        const i = r ? String(r) : "";
        return i != "0" ? i : "";
      }
    },
    { cmd: o.Italic, key: "italic" },
    { cmd: o.Underline, key: "underline" },
    { cmd: o.Strikeout, key: "strikeout" },
    { cmd: o.AlignHorizontal, key: "alignHorizontal" },
    { cmd: o.AlignVertical, key: "alignVertical" }
  ], a = [o.Paste];
  t.commit("command/setEnabled", {
    cmd: o.Copy,
    enabled: e.canCopy === !0
  }), Number(e.selectType) === 6 || Number(e.selectType) === 4 ? (n.forEach(({ cmd: r, key: i, getVal: s }) => {
    t.commit("command/setEnabled", {
      cmd: r,
      enabled: !0
    });
    let u;
    s ? u = s(e[i]) : u = e[i], t.commit("command/setState", {
      cmd: r,
      ui: {
        value: u
      }
    });
  }), a.forEach((r) => {
    t.commit("command/setEnabled", {
      cmd: r,
      enabled: !0
    });
  })) : (n.forEach(({ cmd: r }) => {
    t.commit("command/setEnabled", {
      cmd: r,
      enabled: !1
    }), t.commit("command/clearState", {
      cmd: r
    });
  }), a.forEach((r) => {
    t.commit("command/setEnabled", {
      cmd: r,
      enabled: !1
    }), t.commit("command/clearState", {
      cmd: r
    });
  }));
}
const T = Symbol("CommandService");
class sn {
  constructor(e) {
    k(this, "store");
    k(this, "api");
    k(this, "pptReady");
    k(this, "eventTarget");
    k(this, "removeListeners");
    k(this, "handlers");
    k(this, "refreshers");
    k(this, "securityErrorHandler");
    k(this, "modeController");
    k(this, "removeModeListener");
    this.store = e.store, this.api = e.api, this.pptReady = !1, this.eventTarget = e.eventTarget ?? window, this.removeListeners = () => {
    }, this.handlers = {}, this.refreshers = {}, this.securityErrorHandler = () => {
    }, this.modeController = null, this.removeModeListener = () => {
    };
  }
  initApi(e) {
    var n, a;
    this.pptReady = !1, this.store.commit("command/resetCommandState"), (n = this.removeListeners) == null || n.call(this), (a = this.removeModeListener) == null || a.call(this), this.api.initApi(e), this.bindDocumentMode(e), this.syncReadOnlyState(), this.removeListeners = rn(this.store, this, this.eventTarget);
  }
  initApp(e) {
    this.initApi(e);
  }
  destroy() {
    var e, n;
    (e = this.removeListeners) == null || e.call(this), (n = this.removeModeListener) == null || n.call(this), this.modeController = null, this.removeListeners = () => {
    }, this.removeModeListener = () => {
    };
  }
  dispose() {
    this.destroy();
  }
  setSecurityErrorHandler(e) {
    this.securityErrorHandler = e || (() => {
    });
  }
  notifySecurityError(e) {
    this.securityErrorHandler(e);
  }
  enableEditor() {
    this.pptReady = !0, this.refresh(D.Init);
  }
  disableEditor() {
    this.pptReady = !1, this.refresh(D.Init);
  }
  canRefreshCommand(e) {
    return this.pptReady ? !0 : this.isReadOnly() && this.store.getters["command/loadEnd"] === !0 && le.has(e);
  }
  //refresheres
  registerHandler(e, n) {
    this.handlers[e], this.handlers[e] = n;
  }
  registerRefresher(e, n) {
    this.refreshers[e] = n;
  }
  refreshAll() {
    this.syncReadOnlyState(), this.refreshSome(Object.values(o));
  }
  refresh(e) {
    var a, r, i;
    this.syncReadOnlyState();
    const n = Object.values(o);
    for (const s of n) {
      const u = this.handlers[s];
      u && ((a = u.refresh) != null && a.has(e)) && ((i = (r = this.refreshers)[s]) == null || i.call(r, this));
    }
  }
  refreshSome(e) {
    var n, a;
    this.syncReadOnlyState();
    for (const r of e)
      (a = (n = this.refreshers)[r]) == null || a.call(n, this);
  }
  bindDocumentMode(e) {
    var n;
    this.modeController = nn(e), this.removeModeListener = ((n = this.modeController) == null ? void 0 : n.onChange((a) => {
      this.store.commit("command/setReadOnly", a), a && this.disableEditor();
    })) ?? (() => {
    });
  }
  isReadOnly() {
    var e;
    return ((e = this.modeController) == null ? void 0 : e.isReadOnly()) ?? !1;
  }
  syncReadOnlyState() {
    this.store.commit("command/setReadOnly", this.isReadOnly());
  }
  canRunInReadOnly(e) {
    return le.has(e);
  }
  /** 执行命令：统一入口 */
  async run(e, n) {
    this.syncReadOnlyState();
    const a = this.handlers[e];
    if (!a) {
      console.error(`[CommandService] no handler registered for "${e}"`);
      return;
    }
    this.isReadOnly() && !this.canRunInReadOnly(e) || await this.store.dispatch("command/run", {
      cmd: e,
      param: n,
      fn: async (r) => {
        await a.run(this.api, r);
      }
    });
  }
}
const ye = ".pptx", An = /* @__PURE__ */ L({
  __name: "edit",
  setup(t) {
    const e = H(), n = Q(T), a = Q(ie, null), r = B(null), { t: i } = se(), s = Ae(), u = [
      { label: i("dropDown.slide.new"), key: "newSlide" },
      { label: i("dropDown.slide.delete"), key: "deleteSlide" }
    ], c = [
      { label: i("dropDown.slide.new"), key: "newSlide" }
    ], d = B(!1), p = B(0), f = B(0), R = b(() => {
      var g;
      return ((g = e.state.command) == null ? void 0 : g.readOnly) === !0;
    }), y = b(() => {
      var g;
      return ((g = e.state.command) == null ? void 0 : g.loadEnd) === !0;
    });
    function C() {
      var g, h;
      try {
        (h = (g = n.api.docApp) == null ? void 0 : g.destroy) == null || h.call(g);
      } catch {
      }
    }
    let O = [];
    function q(g, h) {
      return g.map((P) => P.type === "divider" ? P : {
        ...P,
        disabled: h
      });
    }
    function E(g) {
      d.value = !1;
      const h = {
        value: {
          action: g
        }
      };
      switch (g) {
        case "newSlide":
        case "deleteSlide":
          n.run(o.SlideOptions, h);
          break;
      }
    }
    function V(g) {
      if (y.value === !0) {
        switch (g.preventDefault(), d.value = !1, n.api.getCursorTargetType()) {
          case "Thumbnail":
            O = q(u, R.value);
            break;
          case "ThumbnailGapLine":
            O = q(c, R.value);
            break;
          default:
            O = [];
            break;
        }
        O && O.length > 0 && Qe(() => {
          d.value = !0, p.value = g.clientX, f.value = g.clientY;
        });
      }
    }
    function G() {
      d.value = !1;
    }
    function W(g) {
      const h = {
        copy: "C",
        paste: "V",
        cut: "X"
      };
      return `${/Mac|iPhone|iPad|iPod/i.test(navigator.platform) ? "Command" : "Ctrl"}+${h[g] || "C/V/X"}`;
    }
    function m(g) {
      if (g === "https") {
        s.warning(i("common.httpsOnly"));
        return;
      }
      (g === "copy" || g === "paste" || g === "cut") && s.warning(
        i("common.clipboardShortcutTip", {
          shortcut: W(g)
        })
      );
    }
    function S() {
      return new Promise((g) => {
        const h = document.createElement("input");
        h.type = "file", h.accept = ye, h.style.display = "none", h.addEventListener(
          "change",
          () => {
            var M;
            const P = ((M = h.files) == null ? void 0 : M[0]) || null;
            if (h.remove(), P && !Ve(P, ye)) {
              s.warning(i("common.unsupportedFileType")), g(null);
              return;
            }
            if (P && P.size <= 0) {
              s.warning(i("common.emptyFileUnsupported")), g(null);
              return;
            }
            g(P);
          },
          { once: !0 }
        ), h.addEventListener(
          "cancel",
          () => {
            h.remove(), g(null);
          },
          { once: !0 }
        ), document.body.appendChild(h), h.click();
      });
    }
    async function z() {
      var h;
      const g = await S();
      if (!(!g || !r.value))
        try {
          e.dispatch("file/onOpening"), C(), (h = n.destroy) == null || h.call(n), r.value.innerHTML = "";
          const P = await he({
            docId: `local-${Date.now()}`,
            file: g,
            fileName: g.name,
            user: a == null ? void 0 : a.user,
            widgetMode: a == null ? void 0 : a.widgetMode,
            mainDom: r.value,
            eventTarget: a == null ? void 0 : a.eventTarget,
            [ve]: {
              beforeRender: (M) => {
                n.initApi(M);
              }
            }
          });
          e.dispatch("file/onConnected", {
            title: document.title,
            docId: P.docId
          });
        } catch (P) {
          console.error("OpenDocument failed:", P), e.commit("file/setReady"), be(
            "OpenDocumentFailed",
            void 0,
            a == null ? void 0 : a.eventTarget
          );
        }
    }
    return Ee(() => {
      n.setSecurityErrorHandler(m), n.api.setOpenFileHandler(z), a != null && a.mainDom && (a.mainDom.value = r.value), he({
        docId: a == null ? void 0 : a.docId,
        file: a == null ? void 0 : a.file,
        fileUrl: a == null ? void 0 : a.fileUrl,
        fileName: a == null ? void 0 : a.fileName,
        user: a == null ? void 0 : a.user,
        widgetMode: a == null ? void 0 : a.widgetMode,
        mainDom: r.value,
        eventTarget: a == null ? void 0 : a.eventTarget,
        [ve]: {
          beforeRender: (g) => {
            n.initApi(g);
          }
        }
      }).then(({ docId: g }) => {
        e.dispatch("file/onConnected", {
          title: document.title,
          docId: g
        });
      }).catch((g) => {
        console.error("OpenDocument failed:", g), e.dispatch("file/onError", g), be(
          "OpenDocumentFailed",
          void 0,
          a == null ? void 0 : a.eventTarget
        );
      });
    }), Ne(() => {
      n.setSecurityErrorHandler(null);
    }), (g, h) => (v(), I("div", {
      class: "main-container",
      onContextmenu: te(V, ["prevent"])
    }, [
      A(l(Se), {
        trigger: "manual",
        show: d.value,
        x: p.value,
        y: f.value,
        options: l(O),
        onSelect: E,
        onClickoutside: G
      }, null, 8, ["show", "x", "y", "options"]),
      N("div", {
        ref_key: "mainRef",
        ref: r,
        class: "main"
      }, null, 512)
    ], 32));
  }
}), Ie = Symbol("LayoutRefs");
function dn() {
  const t = Q(Ie);
  if (!t) throw new Error("LayoutRefs not provided");
  return t;
}
const cn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAq9JREFUeAHFV01oE0EUfrOGkKZNmygi25M2YA/tQd3cVGhBb41HkVzqRXIUwfZok5uUCj0aT3rpQW+NtxYq6DEVLxUqNC2IyaHYTU1/Qii7vrdhwzY7s38t3Q82WWZ35vvem/czywCxPaM815lWwNskXAx2GLD3N+a/F9n27J05HfQChADkfSHhz1MICeiFOQn/r0N4SEoQMiK9AwNKFiKpYeGEVrWC1zr4RWwkA7G0Ao2VkrOAE7UGVx8XhQtpxzn4/XoKtFYT3ECGxMcmoB8vEtCub7oLIOtaWxVUm+EuKvUlYPB+zraQSRgbUSA6PGqQ9nrycOOLfQ6PRF0tgcwRQFbvf12Cf9+WumNkWUKZgvj4JEixBIhAnuWK5r1MXmhWypDIZE+N7X58hQvVDaLUwzwM3ss5klrJ66Vn3GcR0aS9zwvQPz5hEJBHTPVDSJpEci/EhH30Fs0VxYxQgHbccTepP1gvG4TXpt8YLveCdm0T/pYXXDMm4vSwsdqxmoJJzr9zTE+bAIx4CkbaqpO9Gux+KoBvAUHJCQPKI7w692q1JHzPtRIGIbdCFP2eBKQe5M9EThBFv6sAIqZoPwsoeyhtAwk4D3In15vgBiFZn1CyEBSUftZq6VsA1fMgoJxXV9766pZcAfGxSQhK7LVCOgroS7t7gIKrWVnung+s/UHFvQ+8BVH5ptAKIjrcWIMjvMzo5jUmSt8DbGaezgy2gcun897agq0L0smJuiWvNzidGWzv9g5E5dHuPVn8Z/GJ0RN6raFa79SYhu7mMJtk8C3ArHyUx1TFRIWkXftltFrhwuiFK9mX4AbbFhz9XMP2u+wplcgzl1yinrzgVA1Zdfa2DiEi9O8CEtCA8LAj6ZpehJCg6/oHRjdbM7cKjLFpuLjvxAZ+FBfT8z8W/wMSbCotUS3t0QAAAABJRU5ErkJggg==", un = "data:image/png;base64,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", w = {
  width: 705,
  image: un
}, K = /* @__PURE__ */ L({
  __name: "CommandBigIconTextButton",
  props: {
    cmd: {},
    label: {},
    showArrow: { type: Boolean },
    x: {},
    y: {},
    resourceImage: {},
    imageWidth: {}
  },
  setup(t) {
    const e = H(), n = t, a = b(() => e == null ? void 0 : e.getters["command/can"](n.cmd)), r = Q(T);
    function i() {
      r.run(n.cmd, void 0);
    }
    return (s, u) => (v(), I("div", {
      onClick: te(i, ["stop"])
    }, [
      A(l(Pe), {
        label: t.label,
        "resource-image": t.resourceImage ?? l(w).image,
        disabled: !a.value,
        showArrow: t.showArrow,
        x: t.x,
        y: t.y,
        "image-width": t.imageWidth ?? l(w).width
      }, null, 8, ["label", "resource-image", "disabled", "showArrow", "x", "y", "image-width"])
    ]));
  }
}), mn = { style: { display: "flex", gap: "8px" } }, gn = /* @__PURE__ */ L({
  __name: "FileButtonGroup",
  setup(t) {
    Ae();
    const { t: e } = se();
    return (n, a) => (v(), I("div", mn, [
      A(K, {
        cmd: l(o).Open,
        label: n.$t("toolbar.file.open"),
        x: 0,
        y: -30
      }, null, 8, ["cmd", "label"]),
      A(l(Z), {
        vertical: !0,
        height: 65,
        margin: "0px"
      }),
      A(K, {
        cmd: l(o).Export,
        label: n.$t("toolbar.file.exportDocument"),
        x: -24,
        y: -30
      }, null, 8, ["cmd", "label"])
    ]));
  }
}), pn = { style: { display: "flex", gap: "8px" } }, fn = /* @__PURE__ */ L({
  __name: "UndoRedoGroup",
  setup(t) {
    return (e, n) => (v(), I("div", pn, [
      A(K, {
        cmd: l(o).Undo,
        label: e.$t("toolbar.start.undo"),
        x: -120,
        y: -30
      }, null, 8, ["cmd", "label"]),
      A(K, {
        cmd: l(o).Redo,
        label: e.$t("toolbar.start.redo"),
        x: -96,
        y: -30
      }, null, 8, ["cmd", "label"])
    ]));
  }
}), hn = { style: { display: "flex", gap: "8px" } }, vn = /* @__PURE__ */ L({
  __name: "ClipboardGroup",
  setup(t) {
    const e = Ae(), { t: n } = se(), a = {
      width: 737,
      image: He
    };
    function r(i) {
      location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1" || (i.preventDefault(), i.stopPropagation(), i.stopImmediatePropagation(), e.warning(n("common.httpsOnly")));
    }
    return (i, s) => (v(), I("div", hn, [
      A(K, {
        cmd: l(o).Copy,
        label: i.$t("toolbar.start.copy"),
        "resource-image": a.image,
        "image-width": a.width,
        x: -96,
        y: -30
      }, null, 8, ["cmd", "label", "resource-image", "image-width"]),
      A(K, {
        cmd: l(o).Paste,
        label: i.$t("toolbar.start.paste"),
        "resource-image": a.image,
        "image-width": a.width,
        x: -72,
        y: -30,
        onClickCapture: r
      }, null, 8, ["cmd", "label", "resource-image", "image-width"])
    ]));
  }
}), bn = { class: "trigger-wrapper" }, yn = /* @__PURE__ */ L({
  __name: "CommandBigIconPopoverButton",
  props: {
    show: { type: Boolean },
    cmd: {},
    label: {},
    x: {},
    y: {},
    placement: { default: "bottom" }
  },
  emits: ["update:show"],
  setup(t, { emit: e }) {
    const n = H(), a = t, r = b(() => n == null ? void 0 : n.getters["command/can"](a.cmd)), i = b(() => n == null ? void 0 : n.getters["command/active"](a.cmd)), s = Q(T), u = e;
    function c(p) {
      const f = { value: p };
      s.run(a.cmd, f);
    }
    function d(p) {
      u("update:show", p);
    }
    return (p, f) => (v(), I("div", null, [
      A(l(Te), {
        show: t.show,
        trigger: "click",
        placement: t.placement,
        "onUpdate:show": d
      }, {
        trigger: F(() => [
          N("div", bn, [
            A(l(Pe), {
              label: t.label,
              "resource-image": l(w).image,
              disabled: !r.value,
              active: i.value,
              showArrow: !0,
              x: t.x,
              y: t.y,
              "image-width": l(w).width
            }, null, 8, ["label", "resource-image", "disabled", "active", "x", "y", "image-width"])
          ])
        ]),
        default: F(() => [
          ze(p.$slots, "popover", { runCommand: c }, void 0, !0)
        ]),
        _: 3
      }, 8, ["show", "placement"])
    ]));
  }
}), Cn = /* @__PURE__ */ j(yn, [["__scopeId", "data-v-bc023c3a"]]), wn = { class: "global-basic-display-text panel-title" }, En = ["onClick"], Sn = ["src"], Pn = /* @__PURE__ */ L({
  __name: "CommandBigIconNewSlidePopover",
  setup(t) {
    const e = H(), n = Q(T), a = B(!1), r = b(() => e == null ? void 0 : e.getters["file/slideLayoutList"]), i = b(() => ({
      gridTemplateColumns: "repeat(4, 1fr)"
      // 每行4模板
    }));
    function s(c, d) {
      a.value = !1;
      let p = {};
      p.masterIndex = d, p.layoutIndex = c.layoutIndex, n.run(o.NewSlide, { value: p });
    }
    function u(c, d) {
      return d < 1 ? !1 : c < d - 1;
    }
    return ae(a, (c) => {
      c && n.run(o.GetLayoutList, void 0);
    }), (c, d) => {
      const p = U("n-ellipsis");
      return v(), I("div", null, [
        A(Cn, {
          cmd: l(o).NewSlide,
          label: c.$t("toolbar.start.new"),
          x: -72,
          y: -32,
          placement: "bottom-start",
          show: a.value,
          "onUpdate:show": d[0] || (d[0] = (f) => a.value = f)
        }, {
          popover: F(() => [
            N("div", null, [
              N("div", wn, oe(c.$t("toolbar.start.newFromLayout")), 1),
              A(l(ke), { "max-height": 400 }, {
                default: F(() => [
                  (v(!0), I(ge, null, pe(r.value, (f, R) => (v(), I("div", { key: R }, [
                    N("div", {
                      class: "grid",
                      style: xe(i.value)
                    }, [
                      (v(!0), I(ge, null, pe(f, (y) => (v(), I("div", {
                        key: y.id,
                        class: "layout",
                        onClick: (C) => s(y, R)
                      }, [
                        N("img", {
                          src: y.img,
                          class: "layout-img"
                        }, null, 8, Sn),
                        A(p, {
                          class: "global-basic-display-text",
                          style: {
                            color: "var(--primary-text)",
                            lineHeight: "normal",
                            maxWidth: "70px"
                          }
                        }, {
                          default: F(() => [
                            Xe(oe(y.name || ""), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ], 8, En))), 128))
                    ], 4),
                    u(Number(R), r.value.length) ? (v(), X(l(Z), {
                      key: 0,
                      margin: "15px 0px"
                    })) : Y("", !0)
                  ]))), 128))
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["cmd", "label", "show"])
      ]);
    };
  }
}), Bn = /* @__PURE__ */ j(Pn, [["__scopeId", "data-v-255a5336"]]), In = { style: { display: "flex", gap: "8px" } }, Rn = /* @__PURE__ */ L({
  __name: "SlidesGroup",
  setup(t) {
    return (e, n) => (v(), I("div", In, [
      A(Bn)
    ]));
  }
}), Dn = /* @__PURE__ */ L({
  __name: "CommandAlignHorizontalGroup",
  props: {
    cmd: {}
  },
  setup(t) {
    const e = H(), n = t, a = b(() => e == null ? void 0 : e.getters["command/can"](n.cmd)), r = b(() => e == null ? void 0 : e.getters["command/getVal"](n.cmd)), i = Q(T), s = {
      Right: 0,
      // 右对齐
      Left: 1,
      // 左对齐
      Center: 2,
      // 居中
      Justify: 3,
      // 两端对齐
      Distribute: 4
      // 分散对齐
    };
    function u(c) {
      const d = { value: c };
      i.run(n.cmd, d);
    }
    return (c, d) => {
      const p = U("n-space");
      return v(), X(p, null, {
        default: F(() => [
          A(l(x), {
            active: r.value === "left",
            disabled: !a.value,
            onClick: d[0] || (d[0] = (f) => u(s.Left)),
            "resource-image": l(w).image,
            x: -192,
            y: -56,
            "image-width": l(w).width,
            tooltip: c.$t("toolbar.start.horizontalAlignLeft"),
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"]),
          A(l(x), {
            active: r.value === "center",
            disabled: !a.value,
            onClick: d[1] || (d[1] = (f) => u(s.Center)),
            "resource-image": l(w).image,
            x: -208,
            y: -56,
            "image-width": l(w).width,
            tooltip: c.$t("toolbar.start.horizontalAlignCenter"),
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"]),
          A(l(x), {
            active: r.value === "right",
            disabled: !a.value,
            onClick: d[2] || (d[2] = (f) => u(s.Right)),
            "resource-image": l(w).image,
            x: -224,
            y: -56,
            "image-width": l(w).width,
            tooltip: c.$t("toolbar.start.horizontalAlignRight"),
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"]),
          A(l(x), {
            active: r.value === "justify",
            disabled: !a.value,
            onClick: d[3] || (d[3] = (f) => u(s.Justify)),
            "resource-image": l(w).image,
            x: -240,
            y: -56,
            "image-width": l(w).width,
            tooltip: c.$t("toolbar.start.horizontalAlignJustify"),
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"]),
          A(l(x), {
            active: r.value === "distribute",
            disabled: !a.value,
            onClick: d[4] || (d[4] = (f) => u(s.Distribute)),
            "resource-image": l(w).image,
            x: -336,
            y: -56,
            "image-width": l(w).width,
            tooltip: c.$t("toolbar.start.horizontalAlignDistribute"),
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"])
        ]),
        _: 1
      });
    };
  }
}), Ln = /* @__PURE__ */ L({
  __name: "CommandAlignVerticalGroup",
  props: {
    cmd: {}
  },
  setup(t) {
    const e = H(), n = t, a = b(() => e == null ? void 0 : e.getters["command/can"](n.cmd)), r = b(() => e == null ? void 0 : e.getters["command/getVal"](n.cmd)), i = Q(T), s = {
      Top: 0,
      //0
      Center: 1,
      //1
      Bottom: 2,
      //2
      Justified: 3,
      //3
      Distributed: 4
      //4
    };
    function u(c) {
      const d = { value: c };
      i.run(n.cmd, d);
    }
    return (c, d) => {
      const p = U("n-space");
      return v(), X(p, null, {
        default: F(() => [
          A(l(x), {
            active: r.value === "top",
            disabled: !a.value,
            onClick: d[0] || (d[0] = (f) => u(s.Top)),
            "resource-image": l(w).image,
            x: -144,
            y: -56,
            "image-width": l(w).width,
            tooltip: c.$t("toolbar.start.verticalAlignTop"),
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"]),
          A(l(x), {
            active: r.value === "center",
            disabled: !a.value,
            onClick: d[1] || (d[1] = (f) => u(s.Center)),
            "resource-image": l(w).image,
            x: -160,
            y: -56,
            "image-width": l(w).width,
            tooltip: c.$t("toolbar.start.verticalAlignCenter"),
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"]),
          A(l(x), {
            active: r.value === "bottom",
            disabled: !a.value,
            onClick: d[2] || (d[2] = (f) => u(s.Bottom)),
            "resource-image": l(w).image,
            x: -176,
            y: -56,
            "image-width": l(w).width,
            tooltip: c.$t("toolbar.start.verticalAlignBottom"),
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"])
        ]),
        _: 1
      });
    };
  }
}), Fn = { class: "toolbar-group" }, On = /* @__PURE__ */ L({
  __name: "ParaStyleGroup",
  setup(t) {
    return (e, n) => {
      const a = U("n-space");
      return v(), I("div", Fn, [
        A(a, { vertical: "" }, {
          default: F(() => [
            A(Ln, {
              cmd: l(o).AlignVertical
            }, null, 8, ["cmd"]),
            A(Dn, {
              cmd: l(o).AlignHorizontal
            }, null, 8, ["cmd"])
          ]),
          _: 1
        })
      ]);
    };
  }
}), Nn = /* @__PURE__ */ j(On, [["__scopeId", "data-v-304fc9a3"]]), $ = /* @__PURE__ */ L({
  __name: "CommandSmallButton",
  props: {
    cmd: {},
    x: {},
    y: {},
    tooltip: {}
  },
  setup(t) {
    const e = H(), n = t, a = b(() => e == null ? void 0 : e.getters["command/can"](n.cmd)), r = b(() => e == null ? void 0 : e.getters["command/active"](n.cmd)), i = Q(T);
    function s() {
      const c = { value: !r.value };
      i.run(n.cmd, c);
    }
    return (u, c) => (v(), X(l(x), {
      onClick: s,
      "resource-image": l(w).image,
      disabled: !a.value,
      x: t.x,
      y: t.y,
      "image-width": l(w).width,
      tooltip: t.tooltip,
      active: r.value
    }, null, 8, ["resource-image", "disabled", "x", "y", "image-width", "tooltip", "active"]));
  }
}), Ce = /* @__PURE__ */ L({
  __name: "CommandEditableSelect",
  props: {
    cmd: {},
    options: {},
    width: {},
    type: {},
    validateInput: { type: Function }
  },
  setup(t) {
    const e = H(), n = t, a = b(() => e == null ? void 0 : e.getters["command/can"](n.cmd)), r = b(() => e == null ? void 0 : e.getters["command/getVal"](n.cmd)), i = Q(T);
    function s(u) {
      const c = { value: u };
      i.run(n.cmd, c), e.commit("command/setState", {
        cmd: n.cmd,
        ui: { value: u }
      });
    }
    return (u, c) => (v(), X(l(We), {
      "model-value": r.value,
      "onUpdate:modelValue": s,
      options: t.options,
      disabled: !a.value,
      width: t.width,
      "validate-input": t.validateInput,
      type: t.type
    }, null, 8, ["model-value", "options", "disabled", "width", "validate-input", "type"]));
  }
}), Qn = /* @__PURE__ */ L({
  __name: "CommandColorPaletteSmallButton",
  props: {
    cmd: {},
    tooltip: {},
    x: {},
    y: {},
    showFill: { type: Boolean }
  },
  setup(t) {
    const e = H(), n = Q(T);
    let a = B([]), r = B([]);
    const i = B(!1), s = t, u = b(() => e == null ? void 0 : e.getters["command/can"](s.cmd)), c = b(() => e == null ? void 0 : e.getters["command/getVal"](s.cmd)), d = b(() => e == null ? void 0 : e.getters["file/recentColors"]);
    function p(R) {
      const y = { value: R };
      n.run(s.cmd, y), e.commit("file/addRecentColors", R);
    }
    function f(R) {
      var y;
      if (i.value = R, R) {
        let C = e == null ? void 0 : e.getters["file/colorPalette"];
        if (!C) {
          const O = (y = n.api) == null ? void 0 : y.getPalette();
          O && (C = je(O), e.commit("file/setColorPalette", C));
        }
        a.value = C == null ? void 0 : C.standardColors, r.value = C == null ? void 0 : C.themeColors;
      }
    }
    return (R, y) => (v(), X(l(Ue), {
      val: c.value,
      "standard-colors": l(a),
      "theme-colors": l(r),
      "recent-colors": d.value,
      showFill: t.showFill,
      onSelect: p,
      onShow: f
    }, {
      default: F(() => [
        A(l(Ge), {
          "resource-image": l(w).image,
          disabled: !u.value,
          x: t.x,
          y: t.y,
          "image-width": l(w).width,
          tooltip: t.tooltip,
          "sub-showing": i.value,
          "show-color-cube": !0,
          color: t.showFill ? c.value || "" : c.value || "rgb(0, 0, 0)",
          onClick: y[0] || (y[0] = te(() => {
          }, ["stop"]))
        }, null, 8, ["resource-image", "disabled", "x", "y", "image-width", "tooltip", "sub-showing", "color"])
      ]),
      _: 1
    }, 8, ["val", "standard-colors", "theme-colors", "recent-colors", "showFill"]));
  }
}), Vn = {
  common: {
    httpsOnly: "Please use this feature in an HTTPS environment",
    clipboardShortcutTip: "Browser security restrictions blocked this button action. Please use the {shortcut} keyboard shortcut.",
    emptyFileUnsupported: "Opening 0KB empty files is not supported."
  },
  toolbar: {
    file: {
      title: "FILE",
      export: "Export",
      exportDocument: "Export",
      exportPDF: "Export PDF",
      open: "Open"
    },
    start: {
      title: "START",
      undo: "Undo",
      redo: "Redo",
      copy: "Copy",
      paste: "Paste",
      new: "New",
      newFromLayout: "New from Layout",
      bold: "Bold",
      italic: "Italic",
      underline: "Underline",
      strikeout: "Strikeout",
      fontClolor: "Font Clolor",
      verticalAlignTop: "Align Top",
      verticalAlignCenter: "Align Center",
      verticalAlignBottom: "Align Bottom",
      horizontalAlignLeft: "Align Left",
      horizontalAlignCenter: "Align Center",
      horizontalAlignRight: "Align Right",
      horizontalAlignJustify: "Align Justify",
      horizontalAlignDistribute: "Align Distribute"
    }
  },
  statusBar: {
    fullscreen: "Full Screen",
    play: "Play",
    playFromStart: "Play From Start",
    playFromCurrent: "Play From Current",
    autoZoom: "Auto Zoom",
    slides: "Slides"
  },
  dropDown: {
    slide: {
      new: "New Slide",
      delete: "Delete Slide"
    }
  },
  dialogs: {
    pageSelector: {
      title: "Jump To",
      jumpTo: "Jump to the specified page",
      pageCountError: "Page number is incorrect, please re-enter it."
    }
  }
}, Hn = Be(qe, Vn), Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hn
}, Symbol.toStringTag, { value: "Module" })), Tn = {
  common: {
    httpsOnly: "请在https环境下使用该功能",
    clipboardShortcutTip: "受浏览器安全限制，无法通过按钮完成该操作，请使用快捷键 {shortcut}。",
    emptyFileUnsupported: "不支持打开 0KB 的空文件"
  },
  toolbar: {
    file: {
      title: "文件",
      export: "导出",
      exportDocument: "导出",
      exportPDF: "导出PDF",
      open: "打开"
    },
    start: {
      title: "开始",
      undo: "撤销",
      redo: "重做",
      copy: "复制",
      paste: "粘贴",
      new: "新建",
      newFromLayout: "从版式新建",
      bold: "粗体",
      italic: "斜体",
      underline: "下划线",
      strikeout: "删除线",
      fontClolor: "字体颜色",
      verticalAlignTop: "顶端对齐",
      verticalAlignCenter: "垂直居中",
      verticalAlignBottom: "底部对齐",
      horizontalAlignLeft: "左对齐",
      horizontalAlignCenter: "居中对齐",
      horizontalAlignRight: "右对齐",
      horizontalAlignJustify: "两端对齐",
      horizontalAlignDistribute: "分散对齐"
    }
  },
  statusBar: {
    fullscreen: "全屏",
    play: "播放",
    playFromStart: "从首页开始",
    playFromCurrent: "从当前页开始",
    autoZoom: "最佳显示比例",
    slides: "幻灯片"
  },
  dropDown: {
    slide: {
      new: "新建幻灯片",
      delete: "删除幻灯片"
    }
  },
  dialogs: {
    pageSelector: {
      title: "跳转",
      jumpTo: "跳转到指定页码",
      pageCountError: "当前页码有误，请重新输入"
    }
  }
}, zn = Be(Ye, Tn), De = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zn
}, Symbol.toStringTag, { value: "Module" })), kn = /* @__PURE__ */ Object.assign({ "./en-US.ts": Re, "./zh-CN.ts": De }), xn = /* @__PURE__ */ Object.assign({ "./en-US.ts": Re, "./zh-CN.ts": De });
function Xn() {
  let t = {};
  return we(kn, t), we(xn, t), t;
}
function we(t, e) {
  for (let n in t)
    if (t[n].default) {
      let a = n.substr(n.lastIndexOf("/") + 1, 5);
      e[a] ? e[a] = {
        ...t[a],
        ...t[n].default
      } : e[a] = t[n].default;
    }
}
let ee = "zh-CN";
function Wn(t) {
  return ee = t || ee, Me({
    legacy: !1,
    locale: ee,
    messages: Xn(),
    globalInjection: !0
  });
}
const Gn = { class: "toolbar-group" }, Un = /* @__PURE__ */ L({
  __name: "TextStyleGroup",
  setup(t) {
    const e = B([]), n = Ze("pptx", ee);
    async function a() {
      (J == null || J.length == 0) && await Je(), J && J.length !== e.value.length && (e.value = J.map(({ fullName: r }) => ({
        label: r,
        value: r
      })));
    }
    return (r, i) => {
      const s = U("n-space");
      return v(), I("div", Gn, [
        A(s, { vertical: "" }, {
          default: F(() => [
            A(s, null, {
              default: F(() => [
                N("span", { onClick: a }, [
                  A(Ce, {
                    cmd: l(o).FontName,
                    options: e.value,
                    width: 140,
                    type: "font"
                  }, null, 8, ["cmd", "options"])
                ]),
                A(Ce, {
                  cmd: l(o).FontSize,
                  options: l(n),
                  width: 70,
                  "validate-input": l(Ke)
                }, null, 8, ["cmd", "options", "validate-input"])
              ]),
              _: 1
            }),
            A(s, null, {
              default: F(() => [
                A($, {
                  cmd: l(o).Bold,
                  x: -256,
                  y: -56,
                  tooltip: r.$t("toolbar.start.bold"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                A($, {
                  cmd: l(o).Italic,
                  x: -272,
                  y: -56,
                  tooltip: r.$t("toolbar.start.italic"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                A($, {
                  cmd: l(o).Underline,
                  x: -289,
                  y: -56,
                  tooltip: r.$t("toolbar.start.underline"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                A($, {
                  cmd: l(o).Strikeout,
                  x: -304,
                  y: -56,
                  tooltip: r.$t("toolbar.start.strikeout"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                A(Qn, {
                  cmd: l(o).FontColor,
                  x: -320.5,
                  y: -56,
                  tooltip: r.$t("toolbar.start.fontClolor"),
                  class: "global-small-icon-dropdown-button"
                }, null, 8, ["cmd", "tooltip"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]);
    };
  }
}), jn = /* @__PURE__ */ j(Un, [["__scopeId", "data-v-edd2908d"]]), qn = { class: "toolbar-container" }, Yn = {
  key: 0,
  class: "ribbon-content"
}, Mn = {
  key: 1,
  class: "ribbon-content"
}, Zn = /* @__PURE__ */ L({
  __name: "PptRibbon",
  setup(t) {
    const e = H(), n = b(() => e == null ? void 0 : e.getters["file/title"]), a = B("start");
    return (r, i) => (v(), I("div", null, [
      N("div", qn, [
        A(l(_e), {
          documentTitle: n.value,
          logoSrc: l(cn),
          class: "toolbar-prefix"
        }, null, 8, ["documentTitle", "logoSrc"]),
        A(l($e), {
          modelValue: a.value,
          "onUpdate:modelValue": i[0] || (i[0] = (s) => a.value = s),
          tabs: [
            { name: "file", label: r.$t("toolbar.file.title") },
            { name: "start", label: r.$t("toolbar.start.title") }
          ]
        }, null, 8, ["modelValue", "tabs"]),
        i[1] || (i[1] = N("div", { class: "toolbar-suffix" }, null, -1))
      ]),
      N("div", null, [
        a.value == "file" ? (v(), I("div", Yn, [
          A(l(gn))
        ])) : Y("", !0),
        a.value == "start" ? (v(), I("div", Mn, [
          A(l(fn)),
          A(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          A(l(vn)),
          A(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          A(l(Rn)),
          A(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          A(l(jn)),
          A(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          A(l(Nn))
        ])) : Y("", !0)
      ])
    ]));
  }
}), Kn = /* @__PURE__ */ j(Zn, [["__scopeId", "data-v-6951307e"]]), Jn = { class: "zoom-wrapper" }, _n = /* @__PURE__ */ L({
  __name: "CommandZoom",
  props: {
    cmd: {},
    modelValue: {},
    min: { default: 10 },
    max: { default: 400 },
    step: {},
    disabled: { type: Boolean },
    width: { default: 200 }
  },
  setup(t) {
    const e = H(), n = t, a = b(() => e == null ? void 0 : e.getters["command/can"](n.cmd)), r = b(() => e == null ? void 0 : e.getters["command/getVal"](n.cmd)), i = Q(T);
    function s(u) {
      const c = { value: u };
      i.run(n.cmd, c), e.commit("command/setState", {
        cmd: o.Zoom,
        ui: {
          value: u
        }
      });
    }
    return (u, c) => (v(), I("div", Jn, [
      A(l(et), {
        modelValue: r.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => r.value = d),
        onChange: s,
        min: t.min,
        max: t.max,
        width: t.width,
        disabled: !a.value
      }, null, 8, ["modelValue", "min", "max", "width", "disabled"]),
      A(l(tt), {
        modelValue: r.value,
        "onUpdate:modelValue": [
          c[1] || (c[1] = (d) => r.value = d),
          s
        ],
        disabled: !a.value,
        min: t.min,
        max: t.max
      }, null, 8, ["modelValue", "disabled", "min", "max"])
    ]));
  }
}), $n = /* @__PURE__ */ j(_n, [["__scopeId", "data-v-71256b21"]]), ea = /* @__PURE__ */ L({
  __name: "CommandPageSelectorButton",
  props: {
    disabled: { type: Boolean },
    cmd: {}
  },
  emits: ["open"],
  setup(t, { emit: e }) {
    const n = H(), a = t, r = b(() => n == null ? void 0 : n.getters["file/currentPage"]), i = b(() => n == null ? void 0 : n.getters["file/pageCount"]), s = b(() => n == null ? void 0 : n.getters["command/can"](a.cmd)), u = Q(T), c = e;
    function d(f) {
      const R = { value: f };
      u.run(a.cmd, R);
    }
    function p() {
      c("open", {
        callback: d,
        info: { currentPage: r.value, maxPage: i.value }
      });
    }
    return (f, R) => (v(), I("div", null, [
      A(l(re), {
        type: "quaternary",
        disabled: !s.value,
        onClickButton: p,
        class: "page-info-label",
        label: f.$t("statusBar.slides") + (i.value > 0 ? " : " + r.value + "/" + i.value : "")
      }, null, 8, ["disabled", "label"])
    ]));
  }
}), ta = /* @__PURE__ */ j(ea, [["__scopeId", "data-v-9e010b91"]]), na = /* @__PURE__ */ L({
  __name: "CommandSmallIconDropDownButton",
  props: {
    cmd: {},
    tooltip: {},
    placement: {},
    x: {},
    y: {},
    dropdownOptions: {}
  },
  setup(t) {
    const e = H(), n = t, a = b(() => e == null ? void 0 : e.getters["command/can"](n.cmd)), r = Q(T);
    function i(u) {
      s(u);
    }
    function s(u) {
      const c = { value: u };
      r.run(n.cmd, c);
    }
    return (u, c) => (v(), I("div", null, [
      A(l(Se), {
        trigger: "click",
        placement: t.placement,
        options: t.dropdownOptions,
        onSelect: i
      }, {
        default: F(() => [
          N("span", null, [
            A(l(x), {
              tooltip: t.tooltip,
              "resource-image": l(w).image,
              disabled: !a.value,
              showArrow: !0,
              x: t.x,
              y: t.y,
              "image-width": l(w).width
            }, null, 8, ["tooltip", "resource-image", "disabled", "x", "y", "image-width"])
          ])
        ]),
        _: 1
      }, 8, ["placement", "options"])
    ]));
  }
}), aa = { class: "custom-panel" }, oa = { class: "global-basic-display-text text" }, ra = /* @__PURE__ */ L({
  __name: "PageSelectorDialog",
  setup(t, { expose: e }) {
    const n = B(!1), a = B(!1), r = B(""), i = B(0), s = B(0), u = B(0);
    let c = null;
    function d(y) {
      const C = Number(y);
      if (y === "") {
        a.value = !1, r.value = "";
        return;
      }
      !isNaN(C) && C > 0 && C <= s.value ? (a.value = !1, r.value = "") : (a.value = !0, r.value = "error");
    }
    function p(y, C) {
      y && (i.value = y.currentPage, s.value = y.maxPage, u.value = y.currentPage), a.value = !1, r.value = "", c = C, n.value = !0;
    }
    function f() {
      u.value && (c && c({
        jumpePage: u.value
      }), n.value = !1);
    }
    function R() {
      n.value = !1;
    }
    return e({
      openPopover: p
    }), (y, C) => (v(), I("div", null, [
      A(l(nt), {
        show: n.value,
        "onUpdate:show": C[1] || (C[1] = (O) => n.value = O),
        title: y.$t("dialogs.pageSelector.title"),
        width: 240
      }, {
        action: F(() => [
          A(l(re), {
            label: y.$t("common.cancel"),
            onClickButton: R,
            type: "standard"
          }, null, 8, ["label"]),
          A(l(re), {
            label: y.$t("common.confirm"),
            onClickButton: f
          }, null, 8, ["label"])
        ]),
        default: F(() => [
          N("div", aa, [
            N("div", oa, oe(y.$t("dialogs.pageSelector.jumpTo")), 1),
            A(l(at), {
              "validation-status": r.value,
              feedback: a.value ? y.$t("dialogs.pageSelector.pageCountError") : ""
            }, {
              default: F(() => [
                A(l(ot), {
                  value: u.value,
                  "onUpdate:value": C[0] || (C[0] = (O) => u.value = O),
                  class: "custom-input-num",
                  precision: 0,
                  max: s.value,
                  onInput: d,
                  onKeydown: rt(te(f, ["prevent"]), ["enter"])
                }, null, 8, ["value", "max", "onKeydown"])
              ]),
              _: 1
            }, 8, ["validation-status", "feedback"])
          ])
        ]),
        _: 1
      }, 8, ["show", "title"])
    ]));
  }
}), la = /* @__PURE__ */ j(ra, [["__scopeId", "data-v-03de094c"]]), ia = { class: "status-bar" }, sa = { class: "left" }, Aa = { class: "spacer" }, da = { class: "right" }, ca = /* @__PURE__ */ L({
  __name: "StatusBar",
  setup(t) {
    const e = H(), n = b(() => e == null ? void 0 : e.getters["file/loadingRatio"]), a = b(() => e == null ? void 0 : e.getters["file/loadingStepTime"]), r = b(
      () => e == null ? void 0 : e.getters["file/showLoadingProgressBar"]
    ), i = B(null), s = b(() => e == null ? void 0 : e.getters["command/loadEnd"]);
    function u(d) {
      var p;
      (p = i == null ? void 0 : i.value) == null || p.openPopover(
        {
          currentPage: d.info.currentPage,
          maxPage: d.info.maxPage
        },
        (f) => {
          d.callback(f.jumpePage);
        }
      );
    }
    function c() {
      it(document.getElementById("main"));
    }
    return (d, p) => (v(), I("div", ia, [
      N("div", sa, [
        A(ta, {
          cmd: l(o).GoToPage,
          onOpen: u
        }, null, 8, ["cmd"])
      ]),
      N("div", Aa, [
        r.value ? (v(), X(l(lt), {
          key: 0,
          percentage: n.value,
          loadingStepTime: a.value,
          class: "progress-bar"
        }, null, 8, ["percentage", "loadingStepTime"])) : Y("", !0)
      ]),
      N("div", da, [
        A($, {
          cmd: l(o).AutoZoom,
          tooltip: d.$t("statusBar.autoZoom"),
          x: -96.5,
          y: -56,
          class: "global-medium-icon-button"
        }, null, 8, ["cmd", "tooltip"]),
        A(na, {
          cmd: l(o).Play,
          tooltip: d.$t("statusBar.play"),
          x: -80.5,
          y: -56,
          placement: "top",
          class: "global-medium-icon-button",
          "dropdown-options": [
            {
              key: "playFromStart",
              label: d.$t("statusBar.playFromStart")
            },
            {
              key: "playFromCurrent",
              label: d.$t("statusBar.playFromCurrent")
            }
          ]
        }, null, 8, ["cmd", "tooltip", "dropdown-options"]),
        A(l(Z), {
          vertical: !0,
          height: 12,
          margin: "0px"
        }),
        A($n, {
          cmd: l(o).Zoom,
          step: 1
        }, null, 8, ["cmd"]),
        A(l(x), {
          onClick: c,
          "resource-image": l(w).image,
          x: -32,
          y: -56,
          "button-size": 24,
          "image-width": l(w).width,
          tooltip: d.$t("statusBar.fullscreen"),
          class: "global-medium-icon-button",
          disabled: !s.value
        }, null, 8, ["resource-image", "image-width", "tooltip", "disabled"])
      ]),
      A(la, {
        ref_key: "PageSelectorDialogRef",
        ref: i
      }, null, 512)
    ]));
  }
}), ua = /* @__PURE__ */ j(ca, [["__scopeId", "data-v-32cd9d82"]]), ma = st({
  components: [
    At,
    dt,
    ct,
    ut,
    mt,
    gt,
    pt,
    ft,
    ht,
    vt,
    bt,
    yt,
    Ct,
    wt,
    Et,
    St,
    Pt,
    Bt,
    It,
    Rt,
    Dt,
    Lt,
    Ft,
    Ot,
    Nt,
    Qt,
    Vt,
    Ht,
    Tt,
    zt,
    kt,
    xt,
    Xt,
    Wt,
    Gt,
    Ut,
    jt
  ]
});
function ga(t) {
  t.use(ma);
}
function pa() {
  switch (ee) {
    case "zh-CN":
      return fe;
    case "en-US":
      return qt;
  }
  return fe;
}
function fa() {
  return {
    common: {
      primaryColor: "#D1560D",
      // 主色
      primaryColorHover: "#D1560D",
      // hover 主色
      primaryColorPressed: "#D1560D",
      // 按下色
      primaryColorSuppl: "#D1560D"
      // 补充主色
    }
  };
}
function ha(t) {
  t.registerHandler(o.Export, {
    run: async (e, n) => {
      await e.doExport("exportDocument");
    },
    refresh: /* @__PURE__ */ new Set([D.Init, D.ExportReady])
  }), t.registerHandler(o.ExportPDF, {
    run: async (e, n) => {
      await e.doExport("exportPDF");
    },
    refresh: /* @__PURE__ */ new Set([D.ExportReady])
  }), t.registerRefresher(o.Export, (e) => {
    e.canRefreshCommand(o.Export) && e.store.commit("command/setEnabled", {
      cmd: o.Export,
      enabled: !0
    });
  }), t.registerRefresher(o.ExportPDF, (e) => {
    e.canRefreshCommand(o.ExportPDF) && e.store.commit("command/setEnabled", {
      cmd: o.ExportPDF,
      enabled: !1
    });
  });
}
function va(t) {
  t.registerHandler(o.Open, {
    run: (e, n) => e.openFile(),
    refresh: /* @__PURE__ */ new Set([D.Init])
  }), t.registerRefresher(o.Open, (e) => {
    e.canRefreshCommand(o.Open) && e.store.commit("command/setEnabled", {
      cmd: o.Open,
      enabled: !0
    });
  });
}
function ba(t) {
  t.registerHandler(o.Zoom, {
    run: (e, n) => e.setZoom(n.value),
    refresh: /* @__PURE__ */ new Set([D.Init, D.ZoomChange])
  }), t.registerRefresher(o.Zoom, (e) => {
    e.canRefreshCommand(o.Zoom) && (e.store.commit("command/setState", {
      cmd: o.Zoom,
      ui: {
        value: e.api.getZoom()
      }
    }), e.store.commit("command/setEnabled", {
      cmd: o.Zoom,
      enabled: !0
    }));
  });
}
function ya(t) {
  t.registerHandler(o.AutoZoom, {
    run: (e, n) => e.autoZoom(),
    refresh: /* @__PURE__ */ new Set([D.Init])
  }), t.registerRefresher(o.AutoZoom, (e) => {
    e.canRefreshCommand(o.AutoZoom) && e.store.commit("command/setEnabled", {
      cmd: o.AutoZoom,
      enabled: !0
    });
  });
}
function Ca(t) {
  t.registerHandler(o.Play, {
    run: (e, n) => e.doPlay(n.value),
    refresh: /* @__PURE__ */ new Set([D.Init])
  });
}
function wa(t) {
  t.registerHandler(o.GoToPage, {
    run: (e, n) => e.goToPage(n.value),
    refresh: /* @__PURE__ */ new Set([D.Init])
  }), t.registerRefresher(o.GoToPage, (e) => {
    e.canRefreshCommand(o.GoToPage) && e.store.commit("command/setEnabled", {
      cmd: o.GoToPage,
      enabled: !0
    });
  });
}
function Ea(t) {
  t.registerHandler(o.NewSlide, {
    run: (e, n) => e.newSlide(n.value),
    refresh: /* @__PURE__ */ new Set([D.Init])
  }), t.registerRefresher(o.NewSlide, (e) => {
    e.pptReady && e.store.commit("command/setEnabled", {
      cmd: o.NewSlide,
      enabled: !0
    });
  });
}
function Sa(t) {
  t.registerHandler(o.Bold, {
    run: (e, n) => e.setBold(n.value),
    refresh: /* @__PURE__ */ new Set([])
  });
}
function Pa(t) {
  t.registerHandler(o.Underline, {
    run: (e, n) => e.setUnderline(n.value),
    refresh: /* @__PURE__ */ new Set([])
  });
}
function Ba(t) {
  t.registerHandler(o.Strikeout, {
    run: (e, n) => e.setStrikeout(n.value),
    refresh: /* @__PURE__ */ new Set([])
  });
}
function Ia(t) {
  t.registerHandler(o.Italic, {
    run: (e, n) => e.setItalic(n.value),
    refresh: /* @__PURE__ */ new Set([])
  });
}
function Ra(t) {
  t.registerHandler(o.FontSize, {
    run: (e, n) => e.setFontSize(n.value),
    refresh: /* @__PURE__ */ new Set([])
  });
}
function Da(t) {
  t.registerHandler(o.FontColor, {
    run: (e, n) => e.setFontColor(n.value),
    refresh: /* @__PURE__ */ new Set([])
  });
}
function La(t) {
  t.registerHandler(o.AlignHorizontal, {
    run: (e, n) => e.setAlignHorizontalUI(n.value),
    refresh: /* @__PURE__ */ new Set([])
  });
}
function Fa(t) {
  t.registerHandler(o.AlignVertical, {
    run: (e, n) => e.setAlignVerticalUI(n.value),
    refresh: /* @__PURE__ */ new Set([])
  });
}
function Oa(t) {
  t.registerHandler(o.FontName, {
    run: (e, n) => e.setFontName(n.value),
    refresh: /* @__PURE__ */ new Set([])
  });
}
function Na(t) {
  t.registerHandler(o.Undo, {
    run: (e) => e.undo(),
    refresh: /* @__PURE__ */ new Set([D.UndoRedoChange])
  }), t.registerRefresher(o.Undo, (e) => {
    e.pptReady && e.store.commit("command/setEnabled", {
      cmd: o.Undo,
      enabled: e.api.canUndo()
    });
  });
}
function Qa(t) {
  t.registerHandler(o.Redo, {
    run: (e) => e.redo(),
    refresh: /* @__PURE__ */ new Set([D.UndoRedoChange])
  }), t.registerRefresher(o.Redo, (e) => {
    e.pptReady && e.store.commit("command/setEnabled", {
      cmd: o.Redo,
      enabled: e.api.canRedo()
    });
  });
}
function Va(t) {
  t.registerHandler(o.GetLayoutList, {
    run: (e, n) => {
      Ha(t);
    },
    refresh: /* @__PURE__ */ new Set([D.Init])
  }), t.registerRefresher(o.GetLayoutList, (e) => {
    e.canRefreshCommand(o.GetLayoutList) && e.store.commit("command/setEnabled", {
      cmd: o.GetLayoutList,
      enabled: !0
    });
  });
}
function Ha(t) {
  const e = t.api.getLayoutList();
  t.store.commit("file/setSlideLayoutList", e);
}
function Ta(t) {
  t.registerHandler(o.SlideOptions, {
    run: (e, n) => e.doSlideOperations(n.value),
    refresh: /* @__PURE__ */ new Set([D.Init])
  }), t.registerRefresher(o.SlideOptions, (e) => {
    e.pptReady && e.store.commit("command/setEnabled", {
      cmd: o.SlideOptions,
      enabled: !0
    });
  });
}
function za(t) {
  t.registerHandler(o.Copy, {
    run: (e) => e.copy()
  }), t.registerHandler(o.Paste, {
    run: (e) => e.paste()
  });
}
function ka() {
  const t = Q(T);
  va(t), ha(t), ba(t), ya(t), Ca(t), wa(t), Ea(t), Na(t), Qa(t), za(t), Sa(t), Pa(t), Ba(t), Ia(t), Ra(t), Da(t), La(t), Fa(t), Oa(t), Va(t), Ta(t);
}
const xa = { class: "app-shell" }, Xa = { class: "app-stage" }, Wa = { id: "appContainer" }, Ga = /* @__PURE__ */ L({
  __name: "App",
  setup(t) {
    const e = H(), n = B(null), a = B(null), r = B(!0), i = B(null), s = B(null), u = B(null), c = B(!1), d = B(null), p = Q(ie, null), f = b(
      () => {
        var m;
        return ((m = p == null ? void 0 : p.uiOptions) == null ? void 0 : m.showTopBar) !== !1;
      }
    ), R = b(
      () => {
        var m;
        return ((m = p == null ? void 0 : p.uiOptions) == null ? void 0 : m.showBottomBar) !== !1;
      }
    ), y = b(() => e.state.file.isReady);
    ae(y, (m) => {
      var S;
      r.value = !m, m || (c.value = !1, d.value = null, (S = u.value) == null || S.closePopover());
    });
    const C = b(() => e == null ? void 0 : e.state.file.hasError);
    ae(C, (m) => {
      m && (r.value = !1);
    });
    const O = b(
      () => (e == null ? void 0 : e.getters["command/isRunning"](o.Export)) || (e == null ? void 0 : e.getters["command/isRunning"](o.ExportPDF))
    ), q = (m) => {
      var g, h, P;
      let S = (g = m == null ? void 0 : m.detail) == null ? void 0 : g.resolve, z = (h = m == null ? void 0 : m.detail) == null ? void 0 : h.reject;
      S && ((P = i == null ? void 0 : i.value) != null && P.openPopover) && i.value.openPopover(S, z, !0);
    }, E = (m) => {
      var S;
      (S = i == null ? void 0 : i.value) == null || S.closePopover();
    }, V = () => {
      var m;
      (m = s == null ? void 0 : s.value) == null || m.openPopover();
    }, G = (m) => {
      var M, de, ce, ue;
      const S = ((M = m == null ? void 0 : m.detail) == null ? void 0 : M.error) ?? (m == null ? void 0 : m.detail) ?? m, z = an(S);
      if (!on(z)) {
        (de = u.value) == null || de.closePopover(), d.value = S, c.value = !0;
        return;
      }
      const g = z === 9;
      c.value = g, d.value = g ? S : null;
      const h = (ce = m == null ? void 0 : m.detail) == null ? void 0 : ce.onConfirm, P = typeof h == "function" ? async () => {
        e.commit("file/setError", {
          message: "LICENSE_VERIFY_ERROR"
        });
        const me = p == null ? void 0 : p.requestClose;
        if (typeof me == "function") {
          await me();
          return;
        }
        await h();
      } : void 0;
      (ue = u.value) == null || ue.openPopover(S, P);
    }, W = (m) => {
      var g, h, P;
      let S = (g = m == null ? void 0 : m.detail) == null ? void 0 : g.resolve, z = (h = m == null ? void 0 : m.detail) == null ? void 0 : h.reject;
      S && ((P = i == null ? void 0 : i.value) != null && P.openPopover) && i.value.openPopover(S, z);
    };
    return Yt(() => {
      const m = (p == null ? void 0 : p.eventTarget) ?? window;
      ka(), m.addEventListener("FilePassWordError", q), m.addEventListener("FilePassWordOK", E), m.addEventListener("OpenDocumentFailed", V), m.addEventListener("LicenseVerifyError", G), m.addEventListener("AskFilePassword", W);
    }), Mt(() => {
      const m = (p == null ? void 0 : p.eventTarget) ?? window;
      e.commit("file/clearError"), m.removeEventListener(
        "FilePassWordError",
        q
      ), m.removeEventListener("FilePassWordOK", E), m.removeEventListener(
        "OpenDocumentFailed",
        V
      ), m.removeEventListener(
        "LicenseVerifyError",
        G
      ), m.removeEventListener(
        "AskFilePassword",
        W
      );
    }), Ee(() => {
      const { toolBarElm: m, editorElm: S } = dn();
      m.value = n.value, S.value = a.value;
    }), (m, S) => {
      const z = U("n-spin"), g = U("n-message-provider"), h = U("n-modal-provider"), P = U("n-config-provider");
      return v(), I("div", xa, [
        A(P, {
          class: "app-provider",
          locale: l(pa)(),
          "theme-overrides": l(fa)()
        }, {
          default: F(() => [
            A(h, null, {
              default: F(() => [
                A(g, null, {
                  default: F(() => [
                    A(l(Zt), {
                      ref_key: "dialogOpenFailedRef",
                      ref: s
                    }, null, 512),
                    A(l(Kt), {
                      ref_key: "dialogCypherRef",
                      ref: i
                    }, null, 512),
                    A(l(Jt), {
                      ref_key: "dialogLicenseVerifyErrorRef",
                      ref: u
                    }, null, 512),
                    N("div", Xa, [
                      A(z, {
                        class: "app-spin",
                        show: r.value || O.value,
                        fullscreen: "",
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.5)"
                        }
                      }, {
                        default: F(() => [
                          N("div", Wa, [
                            f.value ? (v(), X(Kn, {
                              key: 0,
                              ref_key: "toolbarRef",
                              ref: n
                            }, null, 512)) : Y("", !0),
                            c.value ? (v(), X(l(_t), {
                              key: 1,
                              error: d.value
                            }, null, 8, ["error"])) : Y("", !0),
                            C.value ? Y("", !0) : (v(), X(An, {
                              key: 2,
                              ref_key: "editorRef",
                              ref: a,
                              class: "editor"
                            }, null, 512)),
                            R.value ? (v(), X(l(ua), {
                              key: 3,
                              class: "status-bar"
                            })) : Y("", !0)
                          ])
                        ]),
                        _: 1
                      }, 8, ["show"])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["locale", "theme-overrides"])
      ]);
    };
  }
});
function Ua(t) {
  let e = Wn(t);
  const n = $t(Ga);
  return n.use(e), { app: n };
}
class ja extends en {
  get Document() {
    return this.getAPIComponent("Document");
  }
  get Player() {
    return this.getAPIComponent("Player");
  }
  get UndoRedo() {
    return this.getAPIComponent("UndoRedo");
  }
  get Selection() {
    return this.getAPIComponent("Selection");
  }
  get Paragraph() {
    return this.getAPIComponent("Paragraph");
  }
  get TextBox() {
    return this.getAPIComponent("TextBox");
  }
  get Cursor() {
    return this.getAPIComponent("Cursor");
  }
  get Viewer() {
    return this.getAPIComponent("Viewer");
  }
}
class qa extends ja {
}
class Ya extends qa {
  constructor() {
    super();
    k(this, "openFileHandler");
  }
  setOpenFileHandler(n) {
    this.openFileHandler = n;
  }
  openFile() {
    var n;
    return (n = this.openFileHandler) == null ? void 0 : n.call(this);
  }
  newSlide(n) {
    this.Document.callFun("addSlide", n);
  }
  getLayoutList() {
    return this.Document.callFun("getSlideLayouts");
  }
  async doExport(n) {
    switch (n) {
      case "exportDocument":
        await this.Document.callFun("exportDocument");
        break;
      case "exportPDF":
        console.error("missing api");
        break;
    }
  }
  doExportPDF() {
    return this.Document.callFun("exportPdf");
  }
  doPlay(n) {
    n == "playFromStart" ? this.Player.callFun("play", 1) : n == "playFromCurrent" && this.Player.callFun("play", 2);
  }
  setZoom(n) {
    this.Document.callFun("setZoom", n);
  }
  getZoom() {
    return Math.round(this.Document.callFun("getZoom") || 100);
  }
  autoZoom() {
    this.Document.callFun("autoZoom");
  }
  goToPage(n) {
    return this.Document.callFun("goToSlide", n || 1);
  }
  undo() {
    return this.UndoRedo.callFun("undo");
  }
  redo() {
    return this.UndoRedo.callFun("redo");
  }
  copy() {
    return this.Document.callFun("copy");
  }
  paste() {
    return this.Document.callFun("paste");
  }
  canUndo() {
    return this.UndoRedo.callFun("canUndo");
  }
  canRedo() {
    return this.UndoRedo.callFun("canRedo");
  }
  setUnderline(n = !0) {
    return this.Paragraph.callFun("setUnderline", n);
  }
  setStrikeout(n = !0) {
    return this.Paragraph.callFun("setStrikeThrough", n);
  }
  setBold(n = !0) {
    return this.Paragraph.callFun("setBold", n);
  }
  setItalic(n = !0) {
    return this.Paragraph.callFun("setItalic", n);
  }
  setFontSize(n) {
    return this.Paragraph.callFun("setFontSize", n);
  }
  setAlignHorizontalUI(n) {
    this.Paragraph.callFun("setAlignment", n);
  }
  setAlignVerticalUI(n) {
    this.TextBox.callFun("setVerticalAlignment", n);
  }
  setFontColor(n) {
    return this.Paragraph.callFun("setFontColor", n);
  }
  setFontName(n) {
    return this.Paragraph.callFun("setFontName", n);
  }
  getPalette() {
    return this.Document.callFun("getColorPalette");
  }
  doSlideOperations(n) {
    const { action: a } = n;
    switch (a) {
      case "newSlide":
        this.Document.callFun("addSlide");
        break;
      case "deleteSlide":
        this.Document.callFun("deleteSlides");
        break;
    }
  }
  getCursorTargetType() {
    return this.Viewer.callFun("getActiveZoom");
  }
}
const Ma = {
  namespaced: !0,
  state: () => ({
    hasError: !1,
    isReady: !1,
    connected: !1,
    message: null,
    rawEvent: null,
    fileInfo: { title: "", docId: "" },
    currentPage: 0,
    pageCount: 0,
    colorPalette: null,
    recentColors: [],
    slideLayoutList: [],
    loadingRatio: 0,
    loadingStepTime: 1e3,
    showLoadingProgressBar: !0
  }),
  getters: {
    title: (t) => t.fileInfo.title,
    currentPage: (t) => t.currentPage,
    pageCount: (t) => t.pageCount,
    colorPalette: (t) => t.colorPalette,
    recentColors: (t) => t.recentColors,
    slideLayoutList: (t) => t.slideLayoutList,
    loadingRatio: (t) => t.loadingRatio,
    loadingStepTime: (t) => t.loadingStepTime,
    showLoadingProgressBar: (t) => t.showLoadingProgressBar
  },
  mutations: {
    setError(t, e) {
      t.hasError = !0, t.message = e.message, t.rawEvent = e.event ?? null;
    },
    clearError(t) {
      t.hasError = !1, t.message = null, t.rawEvent = null;
    },
    setReady(t, e = !0) {
      t.isReady = e;
    },
    setConnected(t, e) {
      t.connected = e;
    },
    setFileInfo(t, e) {
      t.fileInfo.title = e.title, t.fileInfo.docId = e.docId;
    },
    setCurrentPage(t, e) {
      t.currentPage = e;
    },
    setPageCount(t, e) {
      t.pageCount = e;
    },
    setColorPalette(t, e) {
      t.colorPalette = e;
    },
    addRecentColors(t, e) {
      function n(i) {
        return typeof i == "string" ? i : i == null ? void 0 : i.hex;
      }
      const a = n(e), r = t.recentColors.findIndex(
        (i) => n(i) === a
      );
      r !== -1 && t.recentColors.splice(r, 1), t.recentColors.unshift(e), t.recentColors.length > 10 && (t.recentColors.length = 10);
    },
    setSlideLayoutList(t, e) {
      t.slideLayoutList = e;
    },
    setLoadingRatio(t, e) {
      t.loadingRatio = e;
    },
    setLoadingStepTime(t, e) {
      t.loadingStepTime = e;
    },
    setShowLoadingProgressBar(t, e) {
      t.showLoadingProgressBar = e;
    }
  },
  actions: {
    onError({ commit: t }, e) {
      t("setError", {
        message: "文件处理失败",
        event: e
      });
    },
    onOpening({ commit: t }) {
      t("clearError"), t("setReady", !1), t("setConnected", !1), t("setLoadingRatio", 0), t("setShowLoadingProgressBar", !0);
    },
    onReady({ commit: t }, e) {
      t("setReady");
    },
    onConnected({ commit: t }, e) {
      t("setConnected", !0), t("setFileInfo", e);
    },
    onLoadPageEnd({ commit: t }, e) {
      t("setLoadingRatio", 100), setTimeout(() => {
        t("setShowLoadingProgressBar", !1);
      }, 1e3);
    },
    onExportReady({ commit: t }, e) {
    },
    onFilePassWord({ commit: t }, e) {
    }
  }
};
function ne() {
  return {
    [o.Undo]: { enabled: !1, running: !1 },
    [o.Redo]: { enabled: !1, running: !1 },
    [o.Copy]: { enabled: !1, running: !1 },
    [o.Paste]: { enabled: !1, running: !1 },
    [o.Bold]: {
      enabled: !1,
      running: !1,
      ui: {
        value: !1
      }
    },
    [o.Underline]: {
      enabled: !1,
      running: !1,
      ui: {
        value: !1
      }
    },
    [o.Strikeout]: {
      enabled: !1,
      running: !1,
      ui: {
        value: !1
      }
    },
    [o.Italic]: {
      enabled: !1,
      running: !1,
      ui: {
        value: !1
      }
    },
    [o.FontSize]: {
      enabled: !1,
      running: !1,
      ui: {
        value: ""
      }
    },
    [o.FontColor]: {
      enabled: !1,
      running: !1,
      ui: {
        value: ""
      }
    },
    [o.FontName]: {
      enabled: !1,
      running: !1,
      ui: {
        value: ""
      }
    },
    [o.AlignHorizontal]: {
      enabled: !1,
      running: !1,
      ui: {
        value: ""
      }
    },
    [o.AlignVertical]: {
      enabled: !1,
      running: !1,
      ui: {
        value: ""
      }
    },
    [o.Color]: {
      enabled: !1,
      running: !1,
      ui: {
        value: "0xFFFFFF"
      }
    },
    [o.Zoom]: {
      enabled: !1,
      running: !1,
      ui: {
        value: 100
      }
    },
    [o.AutoZoom]: {
      enabled: !1,
      running: !1
    },
    [o.Export]: {
      enabled: !1,
      running: !1
    },
    [o.ExportPDF]: {
      enabled: !1,
      running: !1
    },
    [o.Open]: {
      enabled: !1,
      running: !1
    },
    [o.Play]: {
      enabled: !1,
      running: !1
    },
    [o.NewSlide]: {
      enabled: !1,
      running: !1
    },
    [o.GoToPage]: {
      enabled: !1,
      running: !1
    },
    [o.GetLayoutList]: {
      running: !1,
      enabled: !1
    },
    [o.SlideOptions]: {
      running: !1,
      enabled: !1
    }
  };
}
const Za = {
  namespaced: !0,
  state: () => ({
    map: ne(),
    readOnly: !1,
    loadEnd: !1
  }),
  getters: {
    can: (t) => (e) => {
      var n;
      return ((n = t.map[e]) == null ? void 0 : n.enabled) !== !0 ? !1 : t.readOnly ? t.loadEnd && le.has(e) : !0;
    },
    isRunning: (t) => (e) => {
      var n;
      return ((n = t.map[e]) == null ? void 0 : n.running) === !0;
    },
    active: (t) => (e) => {
      var a;
      const n = (a = t.map[e]) == null ? void 0 : a.ui;
      return !!n && n.value === !0;
    },
    getVal: (t) => (e) => {
      var a;
      const n = (a = t.map[e]) == null ? void 0 : a.ui;
      return !!n && n.value;
    },
    loadEnd: (t) => t.loadEnd
  },
  mutations: {
    resetCommandState(t) {
      t.map = ne(), t.readOnly = !1, t.loadEnd = !1;
    },
    setLoadEnd(t, e) {
      t.loadEnd = e;
    },
    setReadOnly(t, e) {
      t.readOnly = e;
    },
    setEnabled(t, e) {
      t.loadEnd == !1 && (e.enabled = !1), t.map[e.cmd].enabled = e.enabled;
    },
    setRunning(t, e) {
      t.map[e.cmd].running = e.running;
    },
    setState(t, e) {
      const n = t.map[e.cmd];
      if (!n) return;
      const a = e.ui;
      if (a === void 0) {
        n.ui = void 0;
        return;
      }
      n.ui = { ...n.ui ?? {}, ...a };
    },
    clearState(t, e) {
      const n = ne()[e.cmd];
      n && (t.map[e.cmd] = JSON.parse(JSON.stringify(n)));
    }
  },
  actions: {
    async run({ commit: t, getters: e }, n) {
      const { cmd: a, fn: r, param: i } = n;
      if (e.can(a)) {
        t("setRunning", { cmd: a, running: !0 });
        try {
          await r(i);
        } finally {
          t("setRunning", { cmd: a, running: !1 });
        }
      }
    }
  }
};
function Le() {
  return tn({
    modules: {
      file: Ma,
      command: Za
    }
  });
}
Le();
function Ka(t) {
  return typeof t == "object" && t !== null && typeof t.addEventListener == "function" && typeof t.removeEventListener == "function" && typeof t.dispatchEvent == "function";
}
function Ja(t) {
  var n;
  const e = (n = t.widgetMountContext) == null ? void 0 : n.eventTarget;
  return t.eventTarget ?? (Ka(e) ? e : void 0);
}
function _a(t) {
  const e = Le(), { app: n } = Ua(t.lang);
  ga(n), n.use(e);
  const a = new Ya(), r = new sn({
    store: e,
    api: a,
    eventTarget: Ja(t)
  });
  return n.provide(T, r), n.provide(Ie, {
    toolBarElm: _(null),
    navigateBarElm: _(null),
    editorElm: _(null),
    bottomBarElm: _(null)
  }), t.widgetMountContext && n.provide(ie, t.widgetMountContext), {
    app: n,
    api: a,
    commandService: r,
    store: e
  };
}
function $a(t) {
  return t ?? window.lang ?? window.navigator.language;
}
function eo(t) {
  return new Promise((e, n) => {
    var i;
    const a = (i = t.state) == null ? void 0 : i.file;
    if (a != null && a.isReady) {
      e();
      return;
    }
    if (a != null && a.hasError) {
      n(new Error(a.message ?? "document load failed"));
      return;
    }
    const r = t.watch(
      (s) => {
        var u, c, d;
        return {
          isReady: !!((u = s.file) != null && u.isReady),
          hasError: !!((c = s.file) != null && c.hasError),
          message: ((d = s.file) == null ? void 0 : d.message) ?? null
        };
      },
      (s) => {
        if (s.isReady) {
          r(), e();
          return;
        }
        s.hasError && (r(), n(new Error(s.message ?? "document load failed")));
      }
    );
  });
}
function to(t, e, n) {
  const a = {
    docId: (n == null ? void 0 : n.docId) ?? "",
    file: n == null ? void 0 : n.file,
    fileUrl: n == null ? void 0 : n.fileUrl,
    fileName: n == null ? void 0 : n.fileName,
    user: n == null ? void 0 : n.user,
    uiOptions: n == null ? void 0 : n.uiOptions,
    widgetMode: n == null ? void 0 : n.widgetMode,
    mainDom: _(null),
    eventTarget: (n == null ? void 0 : n.eventTarget) ?? window,
    requestClose: n == null ? void 0 : n.requestClose
  }, { app: r, api: i, commandService: s, store: u } = _a({
    lang: $a(e),
    eventTarget: n == null ? void 0 : n.eventTarget,
    widgetMountContext: a
  }), c = eo(u);
  r.mount(t);
  async function d() {
    var p, f;
    try {
      await ((f = (p = i.docApp) == null ? void 0 : p.destroy) == null ? void 0 : f.call(p));
    } finally {
      try {
        s.destroy();
      } finally {
        r.unmount();
      }
    }
  }
  return {
    app: r,
    api: i,
    commandService: s,
    store: u,
    ready: c,
    destroy: d,
    close: d,
    unmount: d
  };
}
const ro = to;
export {
  to as default,
  ro as mount,
  to as mountPptxApp
};
