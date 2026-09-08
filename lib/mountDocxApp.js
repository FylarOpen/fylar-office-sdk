var Ge = Object.defineProperty;
var Ze = (t, e, a) => e in t ? Ge(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[e] = a;
var G = (t, e, a) => Ze(t, typeof e != "symbol" ? e + "" : e, a);
import { d as A, i as N, u as U, w as pe, o as k, c as I, a as s, b as l, D as ie, e as y, S as je, f as Y, g as F, t as x, A as Q, r as b, h as R, _ as H, j as se, k as he, W as fe, l as Te, m as Ke, n as ue, p as Oe, q as Je, s as Qe, v as Xe, I as ce, x as Z, y as De, z as le, B as W, C as j, E as q, F as K, G as qe, H as Ye, J as et, K as xe, L as tt, M as at, N as nt, O as ot, P as rt, Q as lt, R as ee, T as it, U as ne, V as oe, X as Pe, Y as Ce, Z as Ne, $ as st, a0 as Ee, a1 as ut, a2 as ct, a3 as J, a4 as dt, a5 as mt, a6 as pt, a7 as gt, a8 as ht, a9 as ft, aa as bt, ab as vt, ac as wt, ad as yt, ae as St, af as Pt, ag as Ct, ah as Et, ai as kt, aj as Rt, ak as _t, al as Ft, am as Lt, an as $t, ao as It, ap as Bt, aq as At, ar as Tt, as as Ot, at as Dt, au as xt, av as Nt, aw as zt, ax as Ut, ay as Vt, az as Ht, aA as Mt, aB as Wt, aC as Gt, aD as Zt, aE as jt, aF as Kt, aG as Jt, aH as Qt, aI as Xt, aJ as qt, aK as Yt, aL as ke, aM as ea, aN as ta, aO as aa, aP as na, aQ as oa, aR as ra, aS as la, aT as ia, aU as sa, aV as ua, aW as te } from "./ApiBase.js?version=1788858640169";
import { a as ca, O as Re, c as _e, d as Fe, r as da, i as ma } from "./UI.runtime.js?version=1788858640169";
import { _ as ze } from "./DropdownPopoverList.js?version=1788858640169";
const S = {
  Init: "init",
  // 文档初始化时
  SelectionChange: "selectionChange",
  // selection改变时
  UndoRedoChange: "UndoRedoChange",
  // undo redo 操作列表发生改变时
  ExportReady: "ExportReady",
  // 文档准备好导出时
  PagePositionChange: "pagePositionChange",
  // 页面位置改变
  LoadPageEnd: "loadPageEnd",
  // 页面load结束
  ZoomChange: "zoomChange"
  // 页面zoom改变
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
  ParaAlignHorizontal: "paraAlignHorizontal",
  ParaListType: "paraListType",
  LineSpace: "lineSpace",
  ParaSymbol: "paraSymbol",
  // editor
  Undo: "undo",
  Redo: "redo",
  Zoom: "zoom",
  Export: "export",
  ExportPDF: "exportPDF",
  Open: "open",
  Copy: "copy",
  Paste: "paste",
  GoToPage: "goToPage",
  PagePositionChange: "pagePositionChange",
  PageViewSwitch: "pageViewSwitch",
  InsertTable: "insertTable",
  InsertSeparator: "insertSeparator",
  SearchReplaceWord: "searchReplaceWord",
  TableOperations: "tableOperations",
  TableCellOperations: "tableCellOperations",
  PaperOrientation: "paperOrientation",
  PaperSize: "paperSize"
}, ge = /* @__PURE__ */ new Set([
  o.Open,
  o.Export,
  o.ExportPDF,
  o.Copy,
  o.GoToPage,
  o.PagePositionChange,
  o.PageViewSwitch,
  o.Zoom,
  o.ParaSymbol,
  o.SearchReplaceWord
]);
function pa(t, e, a = window) {
  const n = (E) => {
    t.dispatch("file/onError", E);
  };
  a.addEventListener("FileError", n);
  const r = (E) => {
    t.dispatch("file/onReady", E);
  };
  a.addEventListener("DocumentReady", r);
  const i = () => {
    e.enableEditor();
  };
  a.addEventListener("EditorEnable", i);
  const u = () => {
    e.disableEditor();
  };
  a.addEventListener("EditorDisable", u);
  const c = (E) => {
    t.commit("command/setLoadEnd", !0), e.refresh(S.Init), e.refresh(S.LoadPageEnd), t.dispatch("file/onLoadPageEnd", E);
  };
  a.addEventListener("LoadAllPageEnd", c);
  const d = (E) => {
    t.dispatch("file/onExportReady", E), e.refresh(S.ExportReady);
  };
  a.addEventListener("ExportReady", d);
  const p = (E) => {
    ga(t, E.detail), e.refresh(S.SelectionChange);
  };
  a.addEventListener("SelectionChange", p);
  const m = (E) => {
    e.refresh(S.UndoRedoChange);
  };
  a.addEventListener("UndoRedoChange", m);
  const f = (E) => {
    e.refresh(S.PagePositionChange);
  };
  a.addEventListener("PagePositionChange", f);
  const w = (E) => {
    e.refresh(S.ZoomChange);
  };
  a.addEventListener("ZoomChange", w);
  const h = (E) => {
    t.commit("file/setShowFindDialog", !0);
  };
  a.addEventListener("OpenFindDialog", h);
  const C = (E) => {
    var B, _;
    let z = ((B = E.detail) == null ? void 0 : B.formatRatio) || 0;
    z = z == 100 ? 99 : z;
    const P = ((_ = E.detail) == null ? void 0 : _.pageIndex) || 0;
    t.commit("file/setLoadingRatio", z), t.commit("file/setPageCount", P);
  };
  a.addEventListener("DocumentLoading", C);
  const D = (E) => {
    var z;
    e.notifySecurityError(((z = E.detail) == null ? void 0 : z.action) || "");
  };
  return a.addEventListener("SecurityError", D), () => {
    a.removeEventListener("FileError", n), a.removeEventListener("DocumentReady", r), a.removeEventListener("EditorEnable", i), a.removeEventListener("EditorDisable", u), a.removeEventListener("LoadAllPageEnd", c), a.removeEventListener("ExportReady", d), a.removeEventListener("SelectionChange", p), a.removeEventListener("UndoRedoChange", m), a.removeEventListener("PagePositionChange", f), a.removeEventListener("ZoomChange", w), a.removeEventListener("OpenFindDialog", h), a.removeEventListener("DocumentLoading", C), a.removeEventListener("SecurityError", D);
  };
}
function ga(t, e) {
  if (!e) return;
  t.commit("command/setEnabled", {
    cmd: o.Copy,
    enabled: e.canCopy === !0
  }), [
    { cmd: o.Bold, key: "bold" },
    { cmd: o.FontColor, key: "fontColor" },
    { cmd: o.FontName, key: "fontName" },
    { cmd: o.FontSize, key: "fontSize", getVal: (n) => n ? String(n) : "" },
    { cmd: o.Italic, key: "italic" },
    { cmd: o.Underline, key: "underline" },
    { cmd: o.Strikeout, key: "strikeout" },
    { cmd: o.ParaAlignHorizontal, key: "paraAlignHorizontal" }
  ].forEach(({ cmd: n, key: r, getVal: i }) => {
    let u;
    i ? u = i(e[r]) : u = e[r], t.commit("command/setState", {
      cmd: n,
      ui: {
        value: u
      }
    });
  });
}
const V = Symbol("CommandService");
class ha {
  constructor(e) {
    G(this, "store");
    G(this, "api");
    G(this, "docReady");
    G(this, "eventTarget");
    G(this, "removeListeners");
    G(this, "handlers");
    G(this, "refreshers");
    G(this, "securityErrorHandler");
    G(this, "modeController");
    G(this, "removeModeListener");
    this.store = e.store, this.api = e.api, this.docReady = !1, this.eventTarget = e.eventTarget ?? window, this.removeListeners = () => {
    }, this.handlers = {}, this.refreshers = {}, this.securityErrorHandler = () => {
    }, this.modeController = null, this.removeModeListener = () => {
    };
  }
  initApi(e) {
    var a, n;
    this.docReady = !1, this.store.commit("command/resetCommandState"), (a = this.removeListeners) == null || a.call(this), (n = this.removeModeListener) == null || n.call(this), this.api.initApi(e), this.bindDocumentMode(e), this.syncReadOnlyState(), this.removeListeners = pa(this.store, this, this.eventTarget);
  }
  initApp(e) {
    this.initApi(e);
  }
  destroy() {
    var e, a;
    (e = this.removeListeners) == null || e.call(this), (a = this.removeModeListener) == null || a.call(this), this.modeController = null, this.removeListeners = () => {
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
    this.docReady = !0, this.refresh(S.Init);
  }
  disableEditor() {
    this.docReady = !1, this.refresh(S.Init);
  }
  canRefreshCommand(e) {
    return this.docReady ? !0 : this.isReadOnly() && this.store.getters["command/loadEnd"] === !0 && ge.has(e);
  }
  //refresheres
  registerHandler(e, a) {
    this.handlers[e], this.handlers[e] = a;
  }
  registerRefresher(e, a) {
    this.refreshers[e] = a;
  }
  refreshAll() {
    this.syncReadOnlyState(), this.refreshSome(Object.values(o));
  }
  refresh(e) {
    var n, r, i;
    this.syncReadOnlyState();
    const a = Object.values(o);
    for (const u of a) {
      const c = this.handlers[u];
      c && ((n = c.refresh) != null && n.has(e)) && ((i = (r = this.refreshers)[u]) == null || i.call(r, this));
    }
  }
  refreshSome(e) {
    var a, n;
    this.syncReadOnlyState();
    for (const r of e)
      (n = (a = this.refreshers)[r]) == null || n.call(a, this);
  }
  bindDocumentMode(e) {
    var a;
    this.modeController = ca(e), this.removeModeListener = ((a = this.modeController) == null ? void 0 : a.onChange((n) => {
      this.store.commit("command/setReadOnly", n), n && this.disableEditor();
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
  canRunInReadOnly(e, a) {
    var r;
    if (!ge.has(e))
      return !1;
    if (e !== o.SearchReplaceWord || !a)
      return !0;
    const n = (r = a == null ? void 0 : a.value) == null ? void 0 : r.action;
    return n === "search" || n === "next" || n === "prev" || n === "focusEditor";
  }
  /** 执行命令：统一入口 */
  async run(e, a) {
    this.syncReadOnlyState();
    const n = this.handlers[e];
    if (!n) {
      console.error(`[CommandService] no handler registered for "${e}"`);
      return;
    }
    this.isReadOnly() && !this.canRunInReadOnly(e, a) || await this.store.dispatch("command/run", {
      cmd: e,
      param: a,
      fn: async (r) => {
        await n.run(this.api, r);
      }
    });
  }
}
const fa = { class: "global-basic-display-text count" }, ba = /* @__PURE__ */ A({
  __name: "SearchContentDialog",
  emits: ["update:show"],
  setup(t, { emit: e }) {
    const a = N(V), n = U(), r = b(""), i = b(0), u = b(0), c = b(null), d = R(() => n == null ? void 0 : n.getters["file/showFindDialog"]);
    pe(d, (P) => {
      P && C();
    });
    function p(P) {
      const B = { value: P };
      a.run(o.SearchReplaceWord, B);
    }
    function m() {
      if (!r.value) {
        u.value = 0, i.value = 0;
        return;
      }
      p({
        action: "search",
        val: r.value
      }), h();
    }
    function f() {
      p({
        action: "next"
      }), h();
    }
    function w() {
      p({
        action: "prev"
      }), h();
    }
    function h() {
      var P, B;
      i.value = ((P = n == null ? void 0 : n.getters["command/getVal"](o.SearchReplaceWord)) == null ? void 0 : P.countNum) || 0, u.value = ((B = n == null ? void 0 : n.getters["command/getVal"](o.SearchReplaceWord)) == null ? void 0 : B.totalCount) || 0;
    }
    function C() {
      r.value = a.api.getSearchSelectedWord() || "", setTimeout(E, 100), m();
    }
    function D() {
      p({
        action: "focusEditor"
      }), r.value = "", u.value = 0, i.value = 0, n.commit("file/setShowFindDialog", !1);
    }
    function E() {
      var P;
      (P = c == null ? void 0 : c.value) == null || P.focus();
    }
    function z(P) {
      P || D();
    }
    return (P, B) => (k(), I("div", null, [
      s(l(ie), {
        show: d.value,
        "onUpdate:show": z,
        title: P.$t("toolbar.start.search"),
        width: 300,
        "show-mask": !1,
        draggable: !0
      }, {
        action: y(() => [
          s(l(Q), {
            label: P.$t("toolbar.start.prev"),
            onClickButton: B[2] || (B[2] = (_) => w()),
            type: "standard"
          }, null, 8, ["label"]),
          s(l(Q), {
            label: P.$t("toolbar.start.next"),
            onClickButton: B[3] || (B[3] = (_) => f())
          }, null, 8, ["label"])
        ]),
        default: y(() => [
          s(l(je), {
            value: r.value,
            "onUpdate:value": B[0] || (B[0] = (_) => r.value = _),
            placeholder: P.$t("toolbar.start.findPlaceHolder"),
            onInput: B[1] || (B[1] = (_) => m()),
            onKeydown: Y(f, ["enter"]),
            ref_key: "inputInstRef",
            ref: c
          }, {
            suffix: y(() => [
              F("span", fa, x(i.value) + "/" + x(u.value), 1)
            ]),
            _: 1
          }, 8, ["value", "placeholder"])
        ]),
        _: 1
      }, 8, ["show", "title"])
    ]));
  }
}), va = /* @__PURE__ */ H(ba, [["__scopeId", "data-v-c6f85f1e"]]), Le = ".doc,.docx", wa = /* @__PURE__ */ A({
  __name: "edit",
  setup(t) {
    const e = U(), { t: a } = se(), n = he(), r = N(V), i = N(fe, null), u = b(null), c = b(!1), d = b(0), p = b(0), m = R(() => {
      var v;
      return ((v = e.state.command) == null ? void 0 : v.readOnly) === !0;
    }), f = R(() => {
      var v;
      return ((v = e.state.command) == null ? void 0 : v.loadEnd) === !0;
    }), w = [
      { label: a("dropDown.table.mergeCell"), key: "mergeCell" },
      { label: a("dropDown.table.unmergeCell"), key: "unmergeCell" },
      { type: "divider", key: "d1" },
      { label: a("dropDown.table.insertRow"), key: "insRow" },
      { label: a("dropDown.table.insertCol"), key: "insCol" },
      { type: "divider", key: "d2" },
      { label: a("dropDown.table.deleteRow"), key: "delRow" },
      { label: a("dropDown.table.deleteCol"), key: "delCol" },
      { type: "divider", key: "d3" },
      { label: a("dropDown.table.deleteTable"), key: "delTable" }
    ];
    let h = [];
    function C() {
      var v, $;
      try {
        ($ = (v = r.api.docApp) == null ? void 0 : v.destroy) == null || $.call(v);
      } catch {
      }
    }
    function D(v, $) {
      return v.map((O) => O.type === "divider" ? O : {
        ...O,
        disabled: $
      });
    }
    function E(v) {
      c.value = !1;
      const $ = {
        value: {
          action: v
        }
      };
      switch (v) {
        case "insRow":
        case "insCol":
        case "delRow":
        case "delCol":
        case "delTable":
          r.run(o.TableOperations, $);
          break;
        case "mergeCell":
        case "unmergeCell":
          r.run(o.TableCellOperations, $);
          break;
      }
    }
    function z(v) {
      f.value === !0 && (v.preventDefault(), c.value = !1, r.api.isTable() && (h = D(w, m.value), Je(() => {
        c.value = !0, d.value = v.clientX, p.value = v.clientY;
      })));
    }
    function P() {
      c.value = !1;
    }
    function B(v) {
      const $ = {
        copy: "C",
        paste: "V",
        cut: "X"
      };
      return `${/Mac|iPhone|iPad|iPod/i.test(navigator.platform) ? "Command" : "Ctrl"}+${$[v] || "C/V/X"}`;
    }
    function _(v) {
      if (v === "https") {
        n.warning(a("common.httpsOnly"));
        return;
      }
      (v === "copy" || v === "paste" || v === "cut") && n.warning(
        a("common.clipboardShortcutTip", {
          shortcut: B(v)
        })
      );
    }
    function g() {
      return new Promise((v) => {
        const $ = document.createElement("input");
        $.type = "file", $.accept = Le, $.style.display = "none", $.addEventListener(
          "change",
          () => {
            var M;
            const O = ((M = $.files) == null ? void 0 : M[0]) || null;
            if ($.remove(), O && !Qe(O, Le)) {
              n.warning(a("common.unsupportedFileType")), v(null);
              return;
            }
            if (O && O.size <= 0) {
              n.warning(a("common.emptyFileUnsupported")), v(null);
              return;
            }
            v(O);
          },
          { once: !0 }
        ), $.addEventListener(
          "cancel",
          () => {
            $.remove(), v(null);
          },
          { once: !0 }
        ), document.body.appendChild($), $.click();
      });
    }
    async function T() {
      var $;
      const v = await g();
      if (!(!v || !u.value))
        try {
          e.dispatch("file/onOpening"), C(), ($ = r.destroy) == null || $.call(r), u.value.innerHTML = "";
          const O = await Re({
            docId: `local-${Date.now()}`,
            file: v,
            fileName: v.name,
            user: i == null ? void 0 : i.user,
            widgetMode: i == null ? void 0 : i.widgetMode,
            mainDom: u.value,
            eventTarget: i == null ? void 0 : i.eventTarget,
            [_e]: {
              beforeRender: (M) => {
                r.initApi(M);
              }
            }
          });
          e.dispatch("file/onConnected", {
            title: document.title,
            docId: O.docId
          });
        } catch (O) {
          console.error("OpenDocument failed:", O), e.commit("file/setReady"), Fe(
            "OpenDocumentFailed",
            void 0,
            i == null ? void 0 : i.eventTarget
          );
        }
    }
    return Te(() => {
      r.setSecurityErrorHandler(_), r.api.setOpenFileHandler(T), i != null && i.mainDom && (i.mainDom.value = u.value), Re({
        docId: i == null ? void 0 : i.docId,
        file: i == null ? void 0 : i.file,
        fileUrl: i == null ? void 0 : i.fileUrl,
        fileName: i == null ? void 0 : i.fileName,
        user: i == null ? void 0 : i.user,
        widgetMode: i == null ? void 0 : i.widgetMode,
        mainDom: u.value,
        eventTarget: i == null ? void 0 : i.eventTarget,
        [_e]: {
          beforeRender: (v) => {
            r.initApi(v);
          }
        }
      }).then(({ docId: v }) => {
        e.dispatch("file/onConnected", {
          title: document.title,
          docId: v
        });
      }).catch((v) => {
        console.error("OpenDocument failed:", v), e.dispatch("file/onError", v), Fe(
          "OpenDocumentFailed",
          void 0,
          i == null ? void 0 : i.eventTarget
        );
      });
    }), Ke(() => {
      r.setSecurityErrorHandler(null);
    }), (v, $) => (k(), I("div", {
      class: "main-container",
      onContextmenu: ue(z, ["prevent"])
    }, [
      s(l(Oe), {
        trigger: "manual",
        show: c.value,
        x: d.value,
        y: p.value,
        options: l(h),
        onSelect: E,
        onClickoutside: P
      }, null, 8, ["show", "x", "y", "options"]),
      s(va),
      F("div", {
        ref_key: "mainRef",
        ref: u,
        class: "main"
      }, null, 512)
    ], 32));
  }
}), Ue = Symbol("LayoutRefs");
function ya() {
  const t = N(Ue);
  if (!t) throw new Error("LayoutRefs not provided");
  return t;
}
const Sa = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAnlJREFUeAHFV79rFEEUfrOuGDEXFkFU7oojGoidlabTQsVStBEtPP8BxSaVcHuijVVIZedZpFRSClqk1M7KBE7lCg+iiByXhPzeyXxLBia782N382M/WO52l5nve9+8eW+WkcBo6+dTFkWh+BvQkYB1OeftXy/GWmw07DQZp5BKAI+2n3nEWYNKAvOONT1GvE7lIfCoZPjJB3cvV6gWHDcO+Npdja+8uFo/GV/Tc//tAnr9LXp956xxosFaRNemurQkfl2oBT7dGB+mm+OnYvL5xXW3ABkhBugwMuTR44kgNZEkvCLGXTp3QpAOx/cqPi2spMb4OhJMPtOopp4j6rdf+vElAaH3xLIhUogzodff1IrWCoAD778NxMQje55Nzv6Jl6giiJ5cP00N4YSNVCV/0O5p3/mmQa8+/qNbIiqQQblUD1KQZyEG4BbGmnLGKGCwazcihhsQ8ub+eWNuJIGEeymCcO0Y3/ZSRl0VyTTTqKWSyobvQgCSEW5hCSZn/+YXUJQcUPNnes7sgnMhi5CrMGV/JgGwbz/kgCn7nQJgPQTsB4gcSVxIwEGQ26yX0PqL6NUkygtsv7ZSLXMLyLrXk8CeR9R5uqVWABpJUeLKUL4jhlbARAYHfovk+iAqpOyean+AmMJLgOpligJEaKmfF5ZjAYCuMeEe5TvLmSElILnv1RasToiTExJVly+2M4NTAByQUFtwEvOLG9ZkhSNwIXcdqO6eB6H+oahipgnQ7WzrDBee3z5DLqQcwPrK5HIBIl3nAtQUmwvsQrPDqUSU/l0AAdk27KGAd8WnGbWoJLCIvWP4czHshBHnjxixOh0N+gj8R2tsagchpS3M0pXVDQAAAABJRU5ErkJggg==", L = {
  width: 737,
  image: Xe
}, X = /* @__PURE__ */ A({
  __name: "CommandBigIconTextButton",
  props: {
    cmd: {},
    label: {},
    showArrow: { type: Boolean },
    x: {},
    y: {}
  },
  setup(t) {
    const e = U(), a = t, n = R(() => e == null ? void 0 : e.getters["command/can"](a.cmd)), r = N(V);
    function i() {
      r.run(a.cmd, void 0);
    }
    return (u, c) => (k(), I("div", {
      onClick: ue(i, ["stop"])
    }, [
      s(l(ce), {
        label: t.label,
        "resource-image": l(L).image,
        disabled: !n.value,
        showArrow: t.showArrow,
        x: t.x,
        y: t.y,
        "image-width": l(L).width
      }, null, 8, ["label", "resource-image", "disabled", "showArrow", "x", "y", "image-width"])
    ]));
  }
}), Pa = { style: { display: "flex", gap: "8px" } }, Ca = /* @__PURE__ */ A({
  __name: "ClipboardGroup",
  setup(t) {
    const e = he(), { t: a } = se();
    function n(r) {
      location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1" || (r.preventDefault(), r.stopPropagation(), r.stopImmediatePropagation(), e.warning(a("common.httpsOnly")));
    }
    return (r, i) => (k(), I("div", Pa, [
      s(X, {
        cmd: l(o).Copy,
        label: r.$t("toolbar.start.copy"),
        x: -96,
        y: -30
      }, null, 8, ["cmd", "label"]),
      s(X, {
        cmd: l(o).Paste,
        label: r.$t("toolbar.start.paste"),
        x: -72,
        y: -30,
        onClickCapture: n
      }, null, 8, ["cmd", "label"])
    ]));
  }
}), Ea = { style: { display: "flex", gap: "8px" } }, ka = /* @__PURE__ */ A({
  __name: "FileButtonGroup",
  setup(t) {
    const e = he(), { t: a } = se();
    function n(r) {
      location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1" || (r.preventDefault(), r.stopPropagation(), r.stopImmediatePropagation(), e.warning(a("common.httpsOnly")));
    }
    return (r, i) => (k(), I("div", Ea, [
      s(X, {
        cmd: l(o).Open,
        label: r.$t("toolbar.file.open"),
        x: 0,
        y: -30
      }, null, 8, ["cmd", "label"]),
      s(l(Z), {
        vertical: !0,
        height: 65,
        margin: "0px"
      }),
      s(X, {
        cmd: l(o).Export,
        label: r.$t("toolbar.file.exportDocument"),
        x: -24,
        y: -30
      }, null, 8, ["cmd", "label"]),
      s(X, {
        cmd: l(o).ExportPDF,
        label: r.$t("toolbar.file.exportPDF"),
        x: -48,
        y: -30,
        onClickCapture: n
      }, null, 8, ["cmd", "label"])
    ]));
  }
}), $e = /* @__PURE__ */ A({
  __name: "CommandDropdownPopoverSmallButton",
  props: {
    show: { type: Boolean },
    cmd: {},
    tooltip: {},
    x: {},
    y: {},
    dropdownOptions: {},
    showChecked: { type: Boolean }
  },
  emits: ["update:show"],
  setup(t, { emit: e }) {
    const a = U(), n = t, r = e, i = R(() => a == null ? void 0 : a.getters["command/can"](n.cmd)), u = N(V), c = b(!1);
    function d(f) {
      p(f);
    }
    function p(f) {
      const w = { value: f };
      u.run(n.cmd, w);
    }
    function m(f) {
      r("update:show", f);
    }
    return (f, w) => (k(), I("div", null, [
      s(l(ze), {
        show: t.show,
        options: t.dropdownOptions,
        disabled: !i.value,
        onSelect: d,
        "onUpdate:show": m,
        "show-checked": t.showChecked
      }, {
        option: y(({ item: h }) => [
          le(f.$slots, "option", { item: h })
        ]),
        default: y(() => [
          F("span", null, [
            s(l(De), {
              "resource-image": l(L).image,
              disabled: !i.value,
              x: t.x,
              y: t.y,
              "image-width": l(L).width,
              tooltip: t.tooltip,
              "sub-showing": c.value
            }, null, 8, ["resource-image", "disabled", "x", "y", "image-width", "tooltip", "sub-showing"])
          ])
        ]),
        _: 3
      }, 8, ["show", "options", "disabled", "show-checked"])
    ]));
  }
}), Ra = /* @__PURE__ */ A({
  __name: "CommandAlignParaGroup",
  props: {
    cmd: {}
  },
  setup(t) {
    const e = U(), a = t, n = R(() => e == null ? void 0 : e.getters["command/can"](a.cmd)), r = R(() => e == null ? void 0 : e.getters["command/getVal"](a.cmd)), i = N(V);
    function u(w) {
      const h = { value: w };
      i.run(a.cmd, h);
    }
    const { t: c } = se(), d = b(!1), p = b(!1), m = R(
      () => e == null ? void 0 : e.getters["command/getVal"](o.ParaSymbol)
    ), f = R(() => {
      var w, h, C;
      return [
        {
          value: "ParagraphMarks",
          label: c("toolbar.start.paraSymbolParagraphMarks"),
          checked: ((w = m == null ? void 0 : m.value) == null ? void 0 : w.ParagraphMarks) || !1,
          multiCheck: !0
        },
        {
          value: "PageBreak",
          label: c("toolbar.start.paraSymbolPageBreak"),
          checked: ((h = m == null ? void 0 : m.value) == null ? void 0 : h.PageBreak) || !1,
          multiCheck: !0
        },
        {
          value: "SectionBreak",
          label: c("toolbar.start.paraSymbolSectionBreak"),
          checked: ((C = m == null ? void 0 : m.value) == null ? void 0 : C.SectionBreak) || !1,
          multiCheck: !0
        }
      ];
    });
    return (w, h) => {
      const C = W("n-space"), D = W("n-ellipsis");
      return k(), I("div", null, [
        s(C, { vertical: "" }, {
          default: y(() => [
            s(C, null, {
              default: y(() => [
                s(l(j), {
                  active: r.value === "left",
                  disabled: !n.value,
                  onClick: h[0] || (h[0] = (E) => u("left")),
                  "resource-image": l(L).image,
                  x: -224,
                  y: -56,
                  tooltip: w.$t("toolbar.start.horizontalAlignLeft"),
                  "image-width": l(L).width,
                  class: "global-small-icon-button"
                }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"]),
                s(l(j), {
                  active: r.value === "center",
                  disabled: !n.value,
                  onClick: h[1] || (h[1] = (E) => u("center")),
                  "resource-image": l(L).image,
                  x: -240,
                  y: -56,
                  tooltip: w.$t("toolbar.start.horizontalAlignCenter"),
                  "image-width": l(L).width,
                  class: "global-small-icon-button"
                }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"]),
                s(l(j), {
                  active: r.value === "right",
                  disabled: !n.value,
                  onClick: h[2] || (h[2] = (E) => u("right")),
                  "resource-image": l(L).image,
                  x: -256,
                  y: -56,
                  tooltip: w.$t("toolbar.start.horizontalAlignRight"),
                  "image-width": l(L).width,
                  class: "global-small-icon-button"
                }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"]),
                s(l(j), {
                  active: r.value === "justify",
                  disabled: !n.value,
                  onClick: h[3] || (h[3] = (E) => u("justify")),
                  "resource-image": l(L).image,
                  x: -272,
                  y: -56,
                  tooltip: w.$t("toolbar.start.horizontalAlignJustify"),
                  "image-width": l(L).width,
                  class: "global-small-icon-button"
                }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"])
              ]),
              _: 1
            }),
            s(C, null, {
              default: y(() => [
                s(l(j), {
                  active: r.value === "distribute",
                  disabled: !n.value,
                  onClick: h[4] || (h[4] = (E) => u("distribute")),
                  "resource-image": l(L).image,
                  x: -288,
                  y: -56,
                  tooltip: w.$t("toolbar.start.horizontalAlignDistribute"),
                  "image-width": l(L).width,
                  class: "global-small-icon-button"
                }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"]),
                s($e, {
                  show: d.value,
                  "onUpdate:show": h[5] || (h[5] = (E) => d.value = E),
                  cmd: l(o).LineSpace,
                  x: -304,
                  y: -56,
                  tooltip: w.$t("toolbar.start.lineSpace"),
                  class: "global-small-icon-dropdown-button",
                  dropdownOptions: [
                    {
                      value: "1.0",
                      label: "1.0"
                    },
                    {
                      value: "1.15",
                      label: "1.15"
                    },
                    {
                      value: "1.5",
                      label: "1.5"
                    },
                    {
                      value: "2.0",
                      label: "2.0"
                    },
                    {
                      value: "2.5",
                      label: "2.5"
                    },
                    {
                      value: "3.0",
                      label: "3.0"
                    }
                  ]
                }, {
                  option: y(({ item: E }) => [
                    s(D, { style: { "max-width": "200px" } }, {
                      default: y(() => [
                        q(x(E.label), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 1
                }, 8, ["show", "cmd", "tooltip"]),
                s($e, {
                  show: p.value,
                  "onUpdate:show": h[6] || (h[6] = (E) => p.value = E),
                  cmd: l(o).ParaSymbol,
                  x: -352,
                  y: -56,
                  tooltip: w.$t("toolbar.start.paraSymbol"),
                  dropdownOptions: f.value,
                  "show-checked": !0,
                  class: "global-small-icon-dropdown-button"
                }, {
                  option: y(({ item: E }) => [
                    s(D, { style: { "max-width": "200px" } }, {
                      default: y(() => [
                        q(x(E.label), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 1
                }, 8, ["show", "cmd", "tooltip", "dropdownOptions"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]);
    };
  }
}), _a = { class: "toolbar-group" }, Fa = /* @__PURE__ */ A({
  __name: "ParaStyleGroup",
  setup(t) {
    return (e, a) => (k(), I("div", _a, [
      s(Ra, {
        cmd: l(o).ParaAlignHorizontal
      }, null, 8, ["cmd"])
    ]));
  }
}), La = /* @__PURE__ */ H(Fa, [["__scopeId", "data-v-43eb86e6"]]), re = /* @__PURE__ */ A({
  __name: "CommandSmallButton",
  props: {
    cmd: {},
    x: {},
    y: {},
    tooltip: {}
  },
  setup(t) {
    const e = U(), a = t, n = R(() => e == null ? void 0 : e.getters["command/can"](a.cmd)), r = R(() => e == null ? void 0 : e.getters["command/active"](a.cmd)), i = N(V);
    function u() {
      const d = { value: !r.value };
      i.run(a.cmd, d);
    }
    return (c, d) => (k(), K(l(j), {
      onClick: u,
      "resource-image": l(L).image,
      disabled: !n.value,
      x: t.x,
      y: t.y,
      "image-width": l(L).width,
      tooltip: t.tooltip,
      active: r.value
    }, null, 8, ["resource-image", "disabled", "x", "y", "image-width", "tooltip", "active"]));
  }
}), Ie = /* @__PURE__ */ A({
  __name: "CommandEditableSelect",
  props: {
    cmd: {},
    options: {},
    width: {},
    type: {},
    validateInput: { type: Function }
  },
  setup(t) {
    const e = U(), a = t, n = R(() => e == null ? void 0 : e.getters["command/can"](a.cmd)), r = R(() => e == null ? void 0 : e.getters["command/getVal"](a.cmd)), i = N(V);
    function u(c) {
      const d = { value: c };
      i.run(a.cmd, d), e.commit("command/setState", {
        cmd: a.cmd,
        ui: { value: c }
      });
    }
    return (c, d) => (k(), K(l(qe), {
      "model-value": r.value,
      "onUpdate:modelValue": u,
      options: t.options,
      disabled: !n.value,
      width: t.width,
      "validate-input": t.validateInput,
      type: t.type
    }, null, 8, ["model-value", "options", "disabled", "width", "validate-input", "type"]));
  }
}), $a = /* @__PURE__ */ A({
  __name: "CommandColorPaletteSmallButton",
  props: {
    cmd: {},
    tooltip: {},
    x: {},
    y: {},
    showFill: { type: Boolean }
  },
  setup(t) {
    const e = U(), a = N(V);
    let n = b([]), r = b([]);
    const i = b(!1), u = t, c = R(() => e == null ? void 0 : e.getters["command/can"](u.cmd)), d = R(() => e == null ? void 0 : e.getters["command/getVal"](u.cmd)), p = R(() => e == null ? void 0 : e.getters["file/recentColors"]);
    function m(w) {
      const h = { value: w };
      a.run(u.cmd, h), e.commit("file/addRecentColors", w);
    }
    function f(w) {
      var h;
      if (i.value = w, w) {
        let C = e == null ? void 0 : e.getters["file/colorPalette"];
        if (!C) {
          const D = (h = a.api) == null ? void 0 : h.getPalette();
          D && (C = et(D), e.commit("file/setColorPalette", C));
        }
        n.value = C == null ? void 0 : C.standardColors, r.value = C == null ? void 0 : C.themeColors;
      }
    }
    return (w, h) => (k(), K(l(Ye), {
      val: d.value,
      "standard-colors": l(n),
      "theme-colors": l(r),
      "recent-colors": p.value,
      showFill: t.showFill,
      onSelect: m,
      onShow: f
    }, {
      default: y(() => [
        s(l(De), {
          "resource-image": l(L).image,
          disabled: !c.value,
          x: t.x,
          y: t.y,
          "image-width": l(L).width,
          tooltip: t.tooltip,
          "sub-showing": i.value,
          "show-color-cube": !0,
          color: t.showFill ? d.value || "" : d.value || "rgb(0, 0, 0)",
          onClick: h[0] || (h[0] = ue(() => {
          }, ["stop"]))
        }, null, 8, ["resource-image", "disabled", "x", "y", "image-width", "tooltip", "sub-showing", "color"])
      ]),
      _: 1
    }, 8, ["val", "standard-colors", "theme-colors", "recent-colors", "showFill"]));
  }
}), Ia = {
  common: {
    confirm: "Confirm",
    cancel: "Cancel",
    unit: {
      CM: "CM"
    },
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
      bold: "Bold",
      italic: "Italic",
      underline: "Underline",
      strikeout: "Strikeout",
      fontClolor: "Font Clolor",
      horizontalAlignLeft: "Align Left",
      horizontalAlignCenter: "Align Center",
      horizontalAlignRight: "Align Right",
      horizontalAlignJustify: "Align Justify",
      horizontalAlignDistribute: "Align Distribute",
      listTypeBullet: "Item",
      listTypeNum: "Number",
      lineSpace: "Line Space",
      paraSymbol: "Show/Hide Edit Symbol",
      paraSymbolParagraphMarks: "Show/Hide Paragraph marks",
      paraSymbolPageBreak: "Show/Hide Page break",
      paraSymbolSectionBreak: "Show/Hide Section break",
      search: "Search",
      findPlaceHolder: "Please input search content",
      next: "Next",
      prev: "Prev"
    },
    insert: {
      title: "INSERT",
      separator: "Separator",
      insertPageSeparator: "Insert Page Separator",
      insertSectionSeparator: "Insert Section Separator",
      nextPage: "Next Page",
      continuousPage: "Continuous Page",
      evenPage: "Even Page",
      oddPage: "Odd Page",
      table: "Table",
      row: "Row",
      column: "Column",
      moreRowColumn: "More Row and Column",
      insertTable: "Insert Table"
    },
    layout: {
      title: "LAYOUT",
      paperOrientation: "Paper Orientation",
      paperHorizontal: "Horizontal",
      paperVertical: "Vertical",
      paperSize: "Paper Size",
      paperSizeLabel: {
        a4: "A4",
        a3: "A3",
        kai8: "8 Kai",
        kai16: "16 Kai",
        kai16Large: "Large 16 Kai",
        kai32: "32 Kai",
        kai32Large: "Large 32 Kai",
        letter3: "Size 3 envelope",
        letter5: "Size 5 envelope",
        letter6: "Size 6 envelope",
        letter7: "Size 7 envelope",
        letter9: "Size 7 envelope"
      },
      paperSetting: "Paper Setting"
    }
  },
  statusBar: {
    fullscreen: "Full Screen",
    pageNum: "Page Num",
    pages: "Pages",
    pageViewSingle: "Single",
    pageViewMulti: "Multi",
    pageViewWide: "Wide"
  },
  dropDown: {
    table: {
      mergeCell: "Merge Cell",
      unmergeCell: "Unmerge Cell",
      insertRow: "Insert Row",
      insertCol: "Insert Col",
      deleteRow: "Delete Row",
      deleteCol: "Delete Col",
      deleteTable: "Delete Table"
    }
  },
  dialogs: {
    paperSizeSet: {
      title: "Paper Setting",
      width: "Width",
      height: "Height",
      errorMessage: "The measurement must be between 0.26 cm and 55.87 cm"
    },
    insertTable: {
      title: "Insert Table",
      row: "Row",
      column: "Column",
      rowErrorMessage: "The number must be between 1 and 32767",
      columnErrorMessage: "The number must be between 1 and 63"
    },
    pageSelector: {
      title: "Jump To",
      jumpTo: "Jump to the specified page",
      pageCountError: "Page number is incorrect, please re-enter it."
    }
  }
}, Ba = xe(tt, Ia), Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ba
}, Symbol.toStringTag, { value: "Module" })), Aa = {
  common: {
    confirm: "确定",
    cancel: "取消",
    unit: {
      CM: "厘米"
    },
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
      bold: "粗体",
      italic: "斜体",
      underline: "下划线",
      strikeout: "删除线",
      fontClolor: "字体颜色",
      horizontalAlignLeft: "左对齐",
      horizontalAlignCenter: "居中对齐",
      horizontalAlignRight: "右对齐",
      horizontalAlignJustify: "两端对齐",
      horizontalAlignDistribute: "分散对齐",
      listTypeBullet: "项目符号",
      listTypeNum: "编号",
      lineSpace: "行间距",
      paraSymbol: "显示/隐藏编辑标记",
      paraSymbolParagraphMarks: "显示/隐藏段落标记",
      paraSymbolPageBreak: "显示/隐藏分页符",
      paraSymbolSectionBreak: "显示/隐藏分节符",
      search: "搜索",
      findPlaceHolder: "请输入查找内容",
      next: "下一个",
      prev: "上一个"
    },
    insert: {
      title: "插入",
      separator: "分页符",
      insertPageSeparator: "插入分页符",
      insertSectionSeparator: "插入分节符",
      nextPage: "下一页",
      continuousPage: "连续页",
      evenPage: "偶数页",
      oddPage: "奇数页",
      table: "表格",
      row: "行",
      column: "列",
      moreRowColumn: "更多行列",
      insertTable: "插入表格"
    },
    layout: {
      title: "布局",
      paperOrientation: "纸张方向",
      paperHorizontal: "横向",
      paperVertical: "纵向",
      paperSize: "纸张大小",
      paperSizeLabel: {
        a4: "A4",
        a3: "A3",
        kai8: "8开",
        kai16: "16开",
        kai16Large: "大16开",
        kai32: "32开",
        kai32Large: "大32开",
        letter3: "3号信封",
        letter5: "5号信封",
        letter6: "6号信封",
        letter7: "7号信封",
        letter9: "9号信封"
      },
      paperSetting: "页面设置"
    }
  },
  statusBar: {
    fullscreen: "全屏",
    pageNum: "页码",
    pages: "页面",
    pageViewSingle: "单页",
    pageViewMulti: "多页",
    pageViewWide: "宽页"
  },
  dropDown: {
    table: {
      mergeCell: "合并单元格",
      unmergeCell: "取消合并单元格",
      insertRow: "插入行",
      insertCol: "插入列",
      deleteRow: "删除行",
      deleteCol: "删除列",
      deleteTable: "删除表格"
    }
  },
  dialogs: {
    paperSizeSet: {
      title: "页面设置",
      width: "宽度",
      height: "高度",
      errorMessage: "度量值必须介于0.26厘米和55.87厘米之间"
    },
    insertTable: {
      title: "插入表格",
      row: "行",
      column: "列",
      rowErrorMessage: "数字必须介于1和32767之间",
      columnErrorMessage: "数字必须介于1和63之间"
    },
    pageSelector: {
      title: "跳转",
      jumpTo: "跳转到指定页码",
      pageCountError: "当前页码有误，请重新输入"
    }
  }
}, Ta = xe(at, Aa), He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ta
}, Symbol.toStringTag, { value: "Module" })), Oa = /* @__PURE__ */ Object.assign({ "./en-US.ts": Ve, "./zh-CN.ts": He }), Da = /* @__PURE__ */ Object.assign({ "./en-US.ts": Ve, "./zh-CN.ts": He });
function xa() {
  let t = {};
  return Be(Oa, t), Be(Da, t), t;
}
function Be(t, e) {
  for (let a in t)
    if (t[a].default) {
      let n = a.substr(a.lastIndexOf("/") + 1, 5);
      e[n] ? e[n] = {
        ...t[n],
        ...t[a].default
      } : e[n] = t[a].default;
    }
}
let ae = "zh-CN";
function Na(t) {
  return ae = t || ae, nt({
    legacy: !1,
    locale: ae,
    messages: xa(),
    globalInjection: !0
  });
}
const za = { class: "toolbar-group" }, Ua = /* @__PURE__ */ A({
  __name: "TextStyleGroup",
  setup(t) {
    const e = b([]), a = rt("docx", ae);
    async function n() {
      (ee == null || ee.length == 0) && await lt(), ee && ee.length !== e.value.length && (e.value = ee.map(({ fullName: r }) => ({
        label: r,
        value: r
      })));
    }
    return (r, i) => {
      const u = W("n-space");
      return k(), I("div", za, [
        s(u, { vertical: "" }, {
          default: y(() => [
            s(u, null, {
              default: y(() => [
                F("span", { onClick: n }, [
                  s(Ie, {
                    cmd: l(o).FontName,
                    options: e.value,
                    width: 140,
                    type: "font"
                  }, null, 8, ["cmd", "options"])
                ]),
                s(Ie, {
                  cmd: l(o).FontSize,
                  options: l(a),
                  width: 70,
                  "validate-input": l(ot)
                }, null, 8, ["cmd", "options", "validate-input"])
              ]),
              _: 1
            }),
            s(u, null, {
              default: y(() => [
                s(re, {
                  cmd: l(o).Bold,
                  x: -112,
                  y: -56,
                  tooltip: r.$t("toolbar.start.bold"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                s(re, {
                  cmd: l(o).Italic,
                  x: -128,
                  y: -56,
                  tooltip: r.$t("toolbar.start.italic"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                s(re, {
                  cmd: l(o).Underline,
                  x: -144,
                  y: -56,
                  tooltip: r.$t("toolbar.start.underline"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                s(re, {
                  cmd: l(o).Strikeout,
                  x: -160,
                  y: -56,
                  tooltip: r.$t("toolbar.start.strikeout"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                s($a, {
                  cmd: l(o).FontColor,
                  x: -176,
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
}), Va = /* @__PURE__ */ H(Ua, [["__scopeId", "data-v-b3896bd1"]]), Ha = { style: { display: "flex", gap: "8px" } }, de = /* @__PURE__ */ A({
  __name: "UndoRedoGroup",
  setup(t) {
    return (e, a) => (k(), I("div", Ha, [
      s(X, {
        cmd: l(o).Undo,
        label: e.$t("toolbar.start.undo"),
        x: -168,
        y: -30
      }, null, 8, ["cmd", "label"]),
      s(X, {
        cmd: l(o).Redo,
        label: e.$t("toolbar.start.redo"),
        x: -144,
        y: -30
      }, null, 8, ["cmd", "label"])
    ]));
  }
}), Ma = /* @__PURE__ */ A({
  __name: "CommandBigIconDropDownButton",
  props: {
    cmd: {},
    label: {},
    x: {},
    y: {},
    dropdownOptions: {}
  },
  setup(t) {
    const e = U(), a = t, n = R(() => e == null ? void 0 : e.getters["command/can"](a.cmd)), r = R(() => e == null ? void 0 : e.getters["command/active"](a.cmd)), i = N(V);
    function u(d) {
      c(d);
    }
    function c(d) {
      const p = { value: d };
      i.run(a.cmd, p);
    }
    return (d, p) => (k(), I("div", null, [
      s(l(Oe), {
        trigger: "click",
        placement: "bottom-start",
        options: t.dropdownOptions,
        onSelect: u
      }, {
        default: y(() => [
          F("span", null, [
            s(l(ce), {
              label: t.label,
              "resource-image": l(L).image,
              disabled: !n.value,
              active: r.value,
              showArrow: !0,
              x: t.x,
              y: t.y,
              "image-width": l(L).width
            }, null, 8, ["label", "resource-image", "disabled", "active", "x", "y", "image-width"])
          ])
        ]),
        _: 1
      }, 8, ["options"])
    ]));
  }
}), Wa = { style: { display: "flex", gap: "8px" } }, Ga = /* @__PURE__ */ A({
  __name: "InsertSeparatorGroup",
  setup(t) {
    return (e, a) => (k(), I("div", Wa, [
      s(Ma, {
        cmd: l(o).InsertSeparator,
        label: e.$t("toolbar.insert.separator"),
        x: -192,
        y: -30,
        "dropdown-options": [
          { key: "pageSeparator", label: e.$t("toolbar.insert.insertPageSeparator") },
          {
            key: "sectionSeparator",
            label: e.$t("toolbar.insert.insertSectionSeparator"),
            children: [
              {
                label: e.$t("toolbar.insert.nextPage"),
                key: "nextPage"
              },
              {
                label: e.$t("toolbar.insert.continuousPage"),
                key: "continuousPage"
              },
              {
                label: e.$t("toolbar.insert.evenPage"),
                key: "evenPage"
              },
              {
                label: e.$t("toolbar.insert.oddPage"),
                key: "oddPage"
              }
            ]
          }
        ]
      }, null, 8, ["cmd", "label", "dropdown-options"])
    ]));
  }
}), Za = { class: "trigger-wrapper" }, ja = /* @__PURE__ */ A({
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
    const a = U(), n = t, r = R(() => a == null ? void 0 : a.getters["command/can"](n.cmd)), i = R(() => a == null ? void 0 : a.getters["command/active"](n.cmd)), u = N(V), c = e;
    function d(m) {
      const f = { value: m };
      u.run(n.cmd, f);
    }
    function p(m) {
      c("update:show", m);
    }
    return (m, f) => (k(), I("div", null, [
      s(l(it), {
        show: t.show,
        trigger: "click",
        placement: t.placement,
        "onUpdate:show": p
      }, {
        trigger: y(() => [
          F("div", Za, [
            s(l(ce), {
              label: t.label,
              "resource-image": l(L).image,
              disabled: !r.value,
              active: i.value,
              showArrow: !0,
              x: t.x,
              y: t.y,
              "image-width": l(L).width
            }, null, 8, ["label", "resource-image", "disabled", "active", "x", "y", "image-width"])
          ])
        ]),
        default: y(() => [
          le(m.$slots, "popover", { runCommand: d }, void 0, !0)
        ]),
        _: 3
      }, 8, ["show", "placement"])
    ]));
  }
}), Ka = /* @__PURE__ */ H(ja, [["__scopeId", "data-v-1511ee22"]]), Ja = { class: "custom-panel" }, Qa = { class: "custom-row" }, Xa = { class: "global-basic-display-text text" }, qa = { class: "custom-row" }, Ya = { class: "global-basic-display-text text" }, en = /* @__PURE__ */ A({
  __name: "InsertTableDialog",
  setup(t, { expose: e }) {
    const a = b(!1), n = b(!1), r = b(""), i = b(1), u = b(32767), c = b(!1), d = b(""), p = b(1), m = b(63), f = b(0), w = b(0);
    let h = null;
    function C(_) {
      E(_, i.value, u.value) ? (n.value = !1, r.value = "") : (n.value = !0, r.value = "error");
    }
    function D(_) {
      E(_, p.value, m.value) ? (c.value = !1, d.value = "") : (c.value = !0, d.value = "error");
    }
    function E(_, g, T) {
      const v = Number(_);
      return _ === "" || !isNaN(v) && v >= g && v <= T;
    }
    function z(_, g) {
      _ && (f.value = _.row, w.value = _.column), n.value = !1, r.value = "", c.value = !1, d.value = "", h = g, a.value = !0;
    }
    function P() {
      f.value < i.value || f.value > u.value || w.value < p.value || w.value > m.value || (h && h({
        rows: f.value,
        cols: w.value
      }), a.value = !1);
    }
    function B() {
      a.value = !1;
    }
    return e({
      openPopover: z
    }), (_, g) => (k(), I("div", null, [
      s(l(ie), {
        show: a.value,
        "onUpdate:show": g[2] || (g[2] = (T) => a.value = T),
        title: _.$t("dialogs.insertTable.title"),
        width: 240
      }, {
        action: y(() => [
          s(l(Q), {
            label: _.$t("common.cancel"),
            onClickButton: B,
            type: "standard"
          }, null, 8, ["label"]),
          s(l(Q), {
            label: _.$t("common.confirm"),
            onClickButton: P
          }, null, 8, ["label"])
        ]),
        default: y(() => [
          F("div", Ja, [
            F("div", Qa, [
              F("span", Xa, x(_.$t("dialogs.insertTable.row")), 1),
              s(l(ne), {
                "validation-status": r.value,
                feedback: n.value ? _.$t("dialogs.insertTable.rowErrorMessage") : ""
              }, {
                default: y(() => [
                  s(l(oe), {
                    value: f.value,
                    "onUpdate:value": g[0] || (g[0] = (T) => f.value = T),
                    class: "custom-input-num",
                    "show-step-button": !0,
                    precision: 0,
                    min: i.value,
                    max: u.value,
                    onKeydown: Y(P, ["enter"]),
                    onInput: C
                  }, null, 8, ["value", "min", "max"])
                ]),
                _: 1
              }, 8, ["validation-status", "feedback"])
            ]),
            F("div", qa, [
              F("span", Ya, x(_.$t("dialogs.insertTable.column")), 1),
              s(l(ne), {
                "validation-status": d.value,
                feedback: c.value ? _.$t("dialogs.insertTable.columnErrorMessage") : ""
              }, {
                default: y(() => [
                  s(l(oe), {
                    value: w.value,
                    "onUpdate:value": g[1] || (g[1] = (T) => w.value = T),
                    class: "custom-input-num",
                    "show-step-button": !0,
                    precision: 0,
                    min: p.value,
                    max: m.value,
                    onKeydown: Y(P, ["enter"]),
                    onInput: D
                  }, null, 8, ["value", "min", "max"])
                ]),
                _: 1
              }, 8, ["validation-status", "feedback"])
            ])
          ])
        ]),
        _: 1
      }, 8, ["show", "title"])
    ]));
  }
}), tn = /* @__PURE__ */ H(en, [["__scopeId", "data-v-648bce50"]]), an = { style: { display: "flex", gap: "8px" } }, nn = { class: "insert-table-popover" }, on = { class: "global-basic-display-text grid-label" }, rn = { key: 0 }, ln = { key: 1 }, sn = ["onMouseenter", "onClick"], un = 10, cn = 10, dn = /* @__PURE__ */ A({
  __name: "InsertTableButton",
  setup(t) {
    const e = b(!1), a = b(null), n = b(0), r = b(0);
    function i(c) {
      var d;
      e.value = !1, (d = a == null ? void 0 : a.value) == null || d.openPopover(
        {
          row: 3,
          column: 4
        },
        (p) => {
          c(p);
        }
      );
    }
    function u() {
      n.value = 0, r.value = 0;
    }
    return (c, d) => {
      const p = W("n-icon"), m = W("n-button");
      return k(), I("div", an, [
        s(Ka, {
          cmd: l(o).InsertTable,
          label: c.$t("toolbar.insert.table"),
          x: -216,
          y: -30,
          show: e.value,
          "onUpdate:show": d[0] || (d[0] = (f) => e.value = f)
        }, {
          popover: y(({ runCommand: f }) => [
            F("div", nn, [
              F("div", on, [
                n.value + r.value != 0 ? (k(), I("span", rn, x(n.value + c.$t("toolbar.insert.row")) + " * " + x(r.value + c.$t("toolbar.insert.column")), 1)) : (k(), I("span", ln, x(c.$t("toolbar.insert.insertTable")), 1))
              ]),
              F("div", {
                class: "table-grid",
                onMouseleave: u
              }, [
                (k(), I(Pe, null, Ce(un, (w) => F("div", {
                  key: "row-" + w,
                  class: "grid-row"
                }, [
                  (k(), I(Pe, null, Ce(cn, (h) => F("div", {
                    key: "col-" + h,
                    class: st(["grid-cell", { selected: w <= n.value && h <= r.value }]),
                    onMouseenter: (C) => {
                      n.value = w, r.value = h;
                    },
                    onClick: () => {
                      f({ rows: w, cols: h }), e.value = !1;
                    }
                  }, null, 42, sn)), 64))
                ])), 64))
              ], 32),
              s(m, {
                text: "",
                onClick: (w) => i(f),
                class: "global-basic-display-text action-text more-button",
                "icon-placement": "right",
                color: "#131313"
              }, {
                icon: y(() => [
                  s(p, { size: "12" }, {
                    default: y(() => [
                      s(l(Ne))
                    ]),
                    _: 1
                  })
                ]),
                default: y(() => [
                  q(" " + x(c.$t("toolbar.insert.moreRowColumn")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ]),
          _: 1
        }, 8, ["cmd", "label", "show"]),
        s(tn, {
          ref_key: "InsertTableDialogRef",
          ref: a
        }, null, 512)
      ]);
    };
  }
}), mn = /* @__PURE__ */ H(dn, [["__scopeId", "data-v-4816f8d5"]]), pn = { style: { display: "flex", gap: "8px" } }, gn = /* @__PURE__ */ A({
  __name: "SearchWordButton",
  setup(t) {
    return (e, a) => (k(), I("div", pn, [
      s(X, {
        cmd: l(o).SearchReplaceWord,
        label: e.$t("toolbar.start.search"),
        x: -120,
        y: -30
      }, null, 8, ["cmd", "label"])
    ]));
  }
}), hn = { class: "custom-panel" }, fn = { class: "custom-row" }, bn = { class: "global-basic-display-text text" }, vn = { class: "custom-row" }, wn = { class: "global-basic-display-text text" }, yn = /* @__PURE__ */ A({
  __name: "PaperSizeSettingDialog",
  setup(t, { expose: e }) {
    const a = b(!1), n = b(!1), r = b(""), i = b(!1), u = b(""), c = b(0.26), d = b(55.87), p = b(0), m = b(0);
    let f = null;
    function w(P) {
      C(P, c.value, d.value) ? (n.value = !1, r.value = "") : (n.value = !0, r.value = "error");
    }
    function h(P) {
      C(P, c.value, d.value) ? (i.value = !1, u.value = "") : (i.value = !0, u.value = "error");
    }
    function C(P, B, _) {
      const g = Number(P);
      return P === "" || !isNaN(g) && g >= B && g <= _;
    }
    function D(P, B) {
      P && (p.value = P.width, m.value = P.height), n.value = !1, r.value = "", i.value = !1, u.value = "", f = B, a.value = !0;
    }
    function E() {
      p.value < c.value || p.value > d.value || m.value < c.value || m.value > d.value || (f && f({
        width: p.value,
        height: m.value
      }), a.value = !1);
    }
    function z() {
      a.value = !1;
    }
    return e({
      openPopover: D
    }), (P, B) => (k(), I("div", null, [
      s(l(ie), {
        show: a.value,
        "onUpdate:show": B[2] || (B[2] = (_) => a.value = _),
        title: P.$t("dialogs.paperSizeSet.title"),
        width: 260
      }, {
        action: y(() => [
          s(l(Q), {
            label: P.$t("common.cancel"),
            onClickButton: z,
            type: "standard"
          }, null, 8, ["label"]),
          s(l(Q), {
            label: P.$t("common.confirm"),
            onClickButton: E
          }, null, 8, ["label"])
        ]),
        default: y(() => [
          F("div", hn, [
            F("div", fn, [
              F("span", bn, x(P.$t("dialogs.paperSizeSet.width")), 1),
              s(l(ne), {
                "validation-status": r.value,
                feedback: n.value ? P.$t("dialogs.paperSizeSet.errorMessage") : "",
                class: "custom-input-num"
              }, {
                default: y(() => [
                  s(l(oe), {
                    value: p.value,
                    "onUpdate:value": B[0] || (B[0] = (_) => p.value = _),
                    min: c.value,
                    max: d.value,
                    onKeydown: Y(E, ["enter"]),
                    onInput: w
                  }, {
                    suffix: y(() => [
                      q(x(P.$t("common.unit.CM")), 1)
                    ]),
                    _: 1
                  }, 8, ["value", "min", "max"])
                ]),
                _: 1
              }, 8, ["validation-status", "feedback"])
            ]),
            F("div", vn, [
              F("span", wn, x(P.$t("dialogs.paperSizeSet.height")), 1),
              s(l(ne), {
                "validation-status": u.value,
                feedback: i.value ? P.$t("dialogs.paperSizeSet.errorMessage") : "",
                class: "custom-input-num"
              }, {
                default: y(() => [
                  s(l(oe), {
                    value: m.value,
                    "onUpdate:value": B[1] || (B[1] = (_) => m.value = _),
                    min: c.value,
                    max: d.value,
                    onKeydown: Y(E, ["enter"]),
                    onInput: h
                  }, {
                    suffix: y(() => [
                      q(x(P.$t("common.unit.CM")), 1)
                    ]),
                    _: 1
                  }, 8, ["value", "min", "max"])
                ]),
                _: 1
              }, 8, ["validation-status", "feedback"])
            ])
          ])
        ]),
        _: 1
      }, 8, ["show", "title"])
    ]));
  }
}), Sn = /* @__PURE__ */ H(yn, [["__scopeId", "data-v-573783a2"]]), Ae = /* @__PURE__ */ A({
  __name: "CommandDropdownPopoverBigButton",
  props: {
    show: { type: Boolean },
    cmd: {},
    label: {},
    x: {},
    y: {},
    dropdownOptions: {}
  },
  emits: ["update:show"],
  setup(t, { emit: e }) {
    const a = U(), n = t, r = e, i = R(() => a == null ? void 0 : a.getters["command/can"](n.cmd)), u = R(() => a == null ? void 0 : a.getters["command/active"](n.cmd)), c = N(V);
    function d(f) {
      p(f);
    }
    function p(f) {
      const w = { value: f };
      c.run(n.cmd, w);
    }
    function m(f) {
      r("update:show", f);
    }
    return (f, w) => (k(), I("div", null, [
      s(l(ze), {
        show: t.show,
        options: t.dropdownOptions,
        disabled: !i.value,
        onSelect: d,
        "onUpdate:show": m
      }, {
        option: y(({ item: h, checked: C }) => [
          le(f.$slots, "option", {
            item: h,
            checked: C
          })
        ]),
        footer: y(() => [
          le(f.$slots, "footer", { runCommand: p })
        ]),
        default: y(() => [
          F("span", null, [
            s(l(ce), {
              label: t.label,
              "resource-image": l(L).image,
              disabled: !i.value,
              active: u.value,
              showArrow: !0,
              x: t.x,
              y: t.y,
              "image-width": l(L).width
            }, null, 8, ["label", "resource-image", "disabled", "active", "x", "y", "image-width"])
          ])
        ]),
        _: 3
      }, 8, ["show", "options", "disabled"])
    ]));
  }
}), Me = [
  {
    value: "a4",
    width: 21,
    height: 29.7
  },
  {
    value: "a3",
    width: 29.7,
    height: 42
  },
  {
    value: "kai8",
    width: 25.9,
    height: 36.7
  },
  {
    value: "kai16",
    width: 18.3,
    height: 25.9
  },
  {
    value: "kai16Large",
    width: 20.9,
    height: 28.4
  },
  {
    value: "kai32",
    width: 12.9,
    height: 18.3
  },
  {
    value: "kai32Large",
    width: 13.9,
    height: 20.2
  },
  {
    value: "letter3",
    width: 12.4,
    height: 17.5
  },
  {
    value: "letter5",
    width: 10.9,
    height: 21.9
  },
  {
    value: "letter6",
    width: 11.9,
    height: 22.9
  },
  {
    value: "letter7",
    width: 16.1,
    height: 22.8
  },
  {
    value: "letter9",
    width: 22.8,
    height: 32.3
  }
];
function Pn(t) {
  const e = Me.find((a) => a.value === t);
  return e ? {
    width: e.width,
    height: e.height
  } : null;
}
const Cn = { style: { display: "flex", gap: "8px" } }, En = { class: "paper-size-option" }, kn = { style: { padding: "0px 5px" } }, Rn = /* @__PURE__ */ A({
  __name: "PageSettingGroup",
  setup(t) {
    const e = b(null), a = b(!1), n = b(!1);
    function r(i) {
      var u;
      n.value = !1, (u = e == null ? void 0 : e.value) == null || u.openPopover(
        {
          width: 21,
          height: 29.7
        },
        (c) => {
          i(c);
        }
      );
    }
    return (i, u) => {
      const c = W("n-ellipsis"), d = W("n-icon"), p = W("n-button");
      return k(), I("div", Cn, [
        s(Ae, {
          show: a.value,
          "onUpdate:show": u[0] || (u[0] = (m) => a.value = m),
          cmd: l(o).PaperOrientation,
          label: i.$t("toolbar.layout.paperOrientation"),
          x: -240,
          y: -30,
          "dropdown-options": [
            {
              value: "paperHorizontal",
              label: i.$t("toolbar.layout.paperHorizontal")
            },
            { value: "paperVertical", label: i.$t("toolbar.layout.paperVertical") }
          ]
        }, {
          option: y(({ item: m }) => [
            s(c, { style: { "max-width": "200px" } }, {
              default: y(() => [
                q(x(m.label), 1)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 1
        }, 8, ["show", "cmd", "label", "dropdown-options"]),
        s(l(Z), {
          vertical: !0,
          height: 65,
          margin: "0px"
        }),
        s(Ae, {
          cmd: l(o).PaperSize,
          label: i.$t("toolbar.layout.paperSize"),
          x: -264,
          y: -30,
          "dropdown-options": l(Me),
          show: n.value,
          "onUpdate:show": u[1] || (u[1] = (m) => n.value = m)
        }, {
          option: y(({ item: m, checked: f }) => [
            F("div", En, [
              F("div", {
                class: "global-basic-display-text paper-label",
                style: Ee(f ? { color: "white" } : {})
              }, x(i.$t("toolbar.layout.paperSizeLabel." + m.value)), 5),
              F("div", {
                class: "global-basic-display-text paper-desp",
                style: Ee(f ? { color: "white" } : {})
              }, x(m.width + i.$t("common.unit.CM")) + " x " + x(m.height + i.$t("common.unit.CM")), 5)
            ])
          ]),
          footer: y(({ runCommand: m }) => [
            s(l(Z), { margin: 5 }),
            F("div", kn, [
              s(p, {
                text: "",
                class: "global-basic-display-text action-text paper-setting-button",
                "icon-placement": "right",
                onClick: (f) => r(m),
                color: "#131313"
              }, {
                icon: y(() => [
                  s(d, { size: "12" }, {
                    default: y(() => [
                      s(l(Ne))
                    ]),
                    _: 1
                  })
                ]),
                default: y(() => [
                  q(" " + x(i.$t("toolbar.layout.paperSetting")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ]),
          _: 1
        }, 8, ["cmd", "label", "dropdown-options", "show"]),
        s(Sn, {
          ref_key: "PaperSizeSettingDialogRef",
          ref: e
        }, null, 512)
      ]);
    };
  }
}), _n = /* @__PURE__ */ H(Rn, [["__scopeId", "data-v-05dc5bf3"]]), Fn = /* @__PURE__ */ A({
  __name: "CommandListParaTypeGroup",
  props: {
    cmd: {}
  },
  setup(t) {
    const e = U(), a = t, n = R(() => e == null ? void 0 : e.getters["command/can"](a.cmd)), r = R(() => e == null ? void 0 : e.getters["command/getVal"](a.cmd)), i = N(V);
    function u(c) {
      const d = { value: c };
      i.run(a.cmd, d);
    }
    return (c, d) => {
      const p = W("n-space");
      return k(), K(p, { vertical: "" }, {
        default: y(() => [
          s(l(j), {
            active: r.value === "bullet",
            disabled: !n.value,
            onClick: d[0] || (d[0] = (m) => u("bullet")),
            "resource-image": l(L).image,
            x: -192,
            y: -56,
            tooltip: c.$t("toolbar.start.listTypeBullet"),
            "image-width": l(L).width,
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"]),
          s(l(j), {
            active: r.value === "num",
            disabled: !n.value,
            onClick: d[1] || (d[1] = (m) => u("num")),
            "resource-image": l(L).image,
            x: -208,
            y: -56,
            tooltip: c.$t("toolbar.start.listTypeNum"),
            "image-width": l(L).width,
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"])
        ]),
        _: 1
      });
    };
  }
}), Ln = { class: "toolbar-group" }, $n = /* @__PURE__ */ A({
  __name: "ListStyleGroup",
  setup(t) {
    return (e, a) => (k(), I("div", Ln, [
      s(Fn, {
        cmd: l(o).ParaListType
      }, null, 8, ["cmd"])
    ]));
  }
}), In = /* @__PURE__ */ H($n, [["__scopeId", "data-v-91b7474d"]]), Bn = { class: "toolbar-container" }, An = {
  key: 0,
  class: "ribbon-content"
}, Tn = {
  key: 1,
  class: "ribbon-content"
}, On = {
  key: 2,
  class: "ribbon-content"
}, Dn = {
  key: 3,
  class: "ribbon-content"
}, xn = /* @__PURE__ */ A({
  __name: "WordRibbon",
  setup(t) {
    const e = U(), a = R(() => e == null ? void 0 : e.getters["file/title"]), n = b("start");
    return (r, i) => (k(), I("div", null, [
      F("div", Bn, [
        s(l(ut), {
          documentTitle: a.value,
          logoSrc: l(Sa),
          class: "toolbar-prefix"
        }, null, 8, ["documentTitle", "logoSrc"]),
        s(l(ct), {
          modelValue: n.value,
          "onUpdate:modelValue": i[0] || (i[0] = (u) => n.value = u),
          tabs: [
            { name: "file", label: r.$t("toolbar.file.title") },
            { name: "start", label: r.$t("toolbar.start.title") },
            { name: "insert", label: r.$t("toolbar.insert.title") },
            { name: "layout", label: r.$t("toolbar.layout.title") }
          ]
        }, null, 8, ["modelValue", "tabs"]),
        i[1] || (i[1] = F("div", { class: "toolbar-suffix" }, null, -1))
      ]),
      F("div", null, [
        n.value == "file" ? (k(), I("div", An, [
          s(l(ka))
        ])) : J("", !0),
        n.value == "start" ? (k(), I("div", Tn, [
          s(l(de)),
          s(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(l(Ca)),
          s(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(l(Va)),
          s(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(l(In)),
          s(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(l(La)),
          s(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(l(gn))
        ])) : J("", !0),
        n.value == "insert" ? (k(), I("div", On, [
          s(l(de)),
          s(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(l(Ga)),
          s(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(l(mn))
        ])) : J("", !0),
        n.value == "layout" ? (k(), I("div", Dn, [
          s(l(de)),
          s(l(Z), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(l(_n))
        ])) : J("", !0)
      ])
    ]));
  }
}), Nn = /* @__PURE__ */ H(xn, [["__scopeId", "data-v-1e1c90bf"]]), zn = { class: "zoom-wrapper" }, Un = /* @__PURE__ */ A({
  __name: "CommandZoom",
  props: {
    cmd: {},
    modelValue: {},
    min: { default: 10 },
    max: { default: 500 },
    step: {},
    disabled: { type: Boolean },
    width: { default: 200 }
  },
  setup(t) {
    const e = U(), a = t, n = R(() => e == null ? void 0 : e.getters["command/can"](a.cmd)), r = R(() => e == null ? void 0 : e.getters["command/getVal"](a.cmd)), i = N(V);
    function u(c) {
      const d = { value: c };
      i.run(a.cmd, d), e.commit("command/setState", {
        cmd: o.Zoom,
        ui: {
          value: c
        }
      });
    }
    return (c, d) => (k(), I("div", zn, [
      s(l(dt), {
        modelValue: r.value,
        "onUpdate:modelValue": d[0] || (d[0] = (p) => r.value = p),
        onChange: u,
        min: t.min,
        max: t.max,
        width: t.width,
        disabled: !n.value
      }, null, 8, ["modelValue", "min", "max", "width", "disabled"]),
      s(l(mt), {
        modelValue: r.value,
        "onUpdate:modelValue": [
          d[1] || (d[1] = (p) => r.value = p),
          u
        ],
        disabled: !n.value,
        min: t.min,
        max: t.max
      }, null, 8, ["modelValue", "disabled", "min", "max"])
    ]));
  }
}), Vn = /* @__PURE__ */ H(Un, [["__scopeId", "data-v-59c756ed"]]), Hn = /* @__PURE__ */ A({
  __name: "CommandPageSelectorButton",
  props: {
    disabled: { type: Boolean },
    cmd: {}
  },
  emits: ["open"],
  setup(t, { emit: e }) {
    const a = U(), n = t, r = R(() => a == null ? void 0 : a.getters["file/currentPageCnt"]), i = R(() => a == null ? void 0 : a.getters["file/pageCount"]), u = R(() => a == null ? void 0 : a.getters["command/can"](n.cmd)), c = N(V), d = e;
    function p(f) {
      const w = { value: f };
      c.run(n.cmd, w);
    }
    function m() {
      d("open", {
        callback: p,
        info: { currentPage: r.value, maxPage: i.value }
      });
    }
    return (f, w) => (k(), I("div", null, [
      s(l(Q), {
        type: "quaternary",
        disabled: !u.value,
        onClickButton: m,
        class: "page-info-label",
        label: f.$t("statusBar.pages") + " : " + r.value + "/" + i.value
      }, null, 8, ["disabled", "label"])
    ]));
  }
}), Mn = /* @__PURE__ */ H(Hn, [["__scopeId", "data-v-0675a315"]]), Wn = { class: "switchGroup" }, Gn = /* @__PURE__ */ A({
  __name: "CommandPageViewSwitchGroup",
  props: {
    cmd: {}
  },
  setup(t) {
    const e = U(), a = t, n = R(() => e == null ? void 0 : e.getters["command/can"](a.cmd)), r = R(() => e == null ? void 0 : e.getters["command/getVal"](a.cmd)), i = N(V);
    function u(c) {
      const d = { value: c };
      i.run(a.cmd, d);
    }
    return (c, d) => (k(), I("div", Wn, [
      s(l(j), {
        active: r.value === "single",
        disabled: !n.value,
        onClick: d[0] || (d[0] = (p) => u("single")),
        "resource-image": l(L).image,
        x: -48,
        y: -56,
        "button-size": 24,
        "image-width": l(L).width,
        tooltip: c.$t("statusBar.pageViewSingle"),
        class: "global-medium-icon-button"
      }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"]),
      s(l(j), {
        active: r.value === "multi",
        disabled: !n.value,
        onClick: d[1] || (d[1] = (p) => u("multi")),
        "resource-image": l(L).image,
        x: -64,
        y: -56,
        "button-size": 24,
        "image-width": l(L).width,
        tooltip: c.$t("statusBar.pageViewMulti"),
        class: "global-medium-icon-button"
      }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"]),
      s(l(j), {
        active: r.value === "wide",
        disabled: !n.value,
        onClick: d[2] || (d[2] = (p) => u("wide")),
        "resource-image": l(L).image,
        x: -80,
        y: -56,
        "button-size": 24,
        "image-width": l(L).width,
        tooltip: c.$t("statusBar.pageViewWide"),
        class: "global-medium-icon-button"
      }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"])
    ]));
  }
}), Zn = /* @__PURE__ */ H(Gn, [["__scopeId", "data-v-889f9fd6"]]), jn = { class: "custom-panel" }, Kn = { class: "global-basic-display-text text" }, Jn = /* @__PURE__ */ A({
  __name: "PageSelectorDialog",
  setup(t, { expose: e }) {
    const a = b(!1), n = b(!1), r = b(""), i = b(0), u = b(0), c = b(0);
    let d = null;
    function p(h) {
      const C = Number(h);
      if (h === "") {
        n.value = !1, r.value = "";
        return;
      }
      !isNaN(C) && C > 0 && C <= u.value ? (n.value = !1, r.value = "") : (n.value = !0, r.value = "error");
    }
    function m(h, C) {
      h && (i.value = h.currentPage, u.value = h.maxPage, c.value = h.currentPage), n.value = !1, r.value = "", d = C, a.value = !0;
    }
    function f() {
      c.value && (d && d({
        jumpePage: c.value
      }), a.value = !1);
    }
    function w() {
      a.value = !1;
    }
    return e({
      openPopover: m
    }), (h, C) => (k(), I("div", null, [
      s(l(ie), {
        show: a.value,
        "onUpdate:show": C[1] || (C[1] = (D) => a.value = D),
        title: h.$t("dialogs.pageSelector.title"),
        width: 240
      }, {
        action: y(() => [
          s(l(Q), {
            label: h.$t("common.cancel"),
            onClickButton: w,
            type: "standard"
          }, null, 8, ["label"]),
          s(l(Q), {
            label: h.$t("common.confirm"),
            onClickButton: f
          }, null, 8, ["label"])
        ]),
        default: y(() => [
          F("div", jn, [
            F("div", Kn, x(h.$t("dialogs.pageSelector.jumpTo")), 1),
            s(l(ne), {
              "validation-status": r.value,
              feedback: n.value ? h.$t("dialogs.pageSelector.pageCountError") : ""
            }, {
              default: y(() => [
                s(l(oe), {
                  value: c.value,
                  "onUpdate:value": C[0] || (C[0] = (D) => c.value = D),
                  class: "custom-input-num",
                  precision: 0,
                  max: u.value,
                  onInput: p,
                  onKeydown: Y(ue(f, ["prevent"]), ["enter"])
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
}), Qn = /* @__PURE__ */ H(Jn, [["__scopeId", "data-v-ed4a536e"]]), Xn = { class: "status-bar" }, qn = { class: "left" }, Yn = { class: "global-basic-display-text page-info-label" }, eo = { class: "spacer" }, to = { class: "right" }, ao = /* @__PURE__ */ A({
  __name: "StatusBar",
  setup(t) {
    const e = U(), a = R(() => e == null ? void 0 : e.getters["file/currentPageNum"]), n = R(() => e == null ? void 0 : e.getters["file/loadingRatio"]), r = R(
      () => e == null ? void 0 : e.getters["file/showLoadingProgressBar"]
    ), i = b(null), u = R(() => e == null ? void 0 : e.getters["command/loadEnd"]);
    function c(p) {
      var m;
      (m = i == null ? void 0 : i.value) == null || m.openPopover(
        {
          currentPage: p.info.currentPage,
          maxPage: p.info.maxPage
        },
        (f) => {
          p.callback(f.jumpePage);
        }
      );
    }
    function d() {
      gt(document.getElementById("main"), !0);
    }
    return (p, m) => (k(), I("div", Xn, [
      F("div", qn, [
        F("div", Yn, x(p.$t("statusBar.pageNum")) + " : " + x(a.value), 1),
        s(l(Z), {
          vertical: !0,
          height: 12,
          margin: "0px"
        }),
        s(Mn, {
          cmd: l(o).GoToPage,
          onOpen: c
        }, null, 8, ["cmd"])
      ]),
      F("div", eo, [
        r.value ? (k(), K(l(pt), {
          key: 0,
          percentage: n.value,
          class: "progress-bar"
        }, null, 8, ["percentage"])) : J("", !0)
      ]),
      F("div", to, [
        s(Zn, {
          cmd: l(o).PageViewSwitch
        }, null, 8, ["cmd"]),
        s(Vn, {
          cmd: l(o).Zoom,
          step: 1
        }, null, 8, ["cmd"]),
        s(l(j), {
          onClick: d,
          "resource-image": l(L).image,
          x: -32,
          y: -56,
          "button-size": 24,
          "image-width": l(L).width,
          tooltip: p.$t("statusBar.fullscreen"),
          class: "global-medium-icon-button",
          disabled: !u.value
        }, null, 8, ["resource-image", "image-width", "tooltip", "disabled"])
      ]),
      s(Qn, {
        ref_key: "PageSelectorDialogRef",
        ref: i
      }, null, 512)
    ]));
  }
}), no = /* @__PURE__ */ H(ao, [["__scopeId", "data-v-44172797"]]), oo = ht({
  components: [
    ft,
    bt,
    vt,
    wt,
    yt,
    St,
    Pt,
    Ct,
    Et,
    kt,
    Rt,
    _t,
    Ft,
    Lt,
    $t,
    It,
    Bt,
    At,
    Tt,
    Ot,
    Dt,
    xt,
    Nt,
    zt,
    Ut,
    Vt,
    Ht,
    Mt,
    Wt,
    Gt,
    Zt,
    jt,
    Kt,
    Jt,
    Qt,
    Xt,
    qt
  ]
});
function ro(t) {
  t.use(oo);
}
function lo() {
  switch (ae) {
    case "zh-CN":
      return ke;
    case "en-US":
      return Yt;
  }
  return ke;
}
function io() {
  return {
    common: {
      primaryColor: "#0061CE",
      // 主色
      primaryColorHover: "#0061CE",
      // hover 主色
      primaryColorPressed: "#0061CE",
      // 按下色
      primaryColorSuppl: "#0061CE"
      // 补充主色
    }
  };
}
function so(t) {
  t.registerHandler(o.Bold, {
    run: (e, a) => e.setBold(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init, S.SelectionChange])
  }), t.registerRefresher(o.Bold, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.Bold,
      enabled: !0
    });
  });
}
function uo(t) {
  t.registerHandler(o.Italic, {
    run: (e, a) => e.setItalic(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init, S.SelectionChange])
  }), t.registerRefresher(o.Italic, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.Italic,
      enabled: !0
    });
  });
}
function co(t) {
  t.registerHandler(o.Underline, {
    run: (e, a) => e.setUnderline(),
    refresh: /* @__PURE__ */ new Set([S.Init, S.SelectionChange])
  }), t.registerRefresher(o.Underline, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.Underline,
      enabled: !0
    });
  });
}
function mo(t) {
  t.registerHandler(o.Undo, {
    run: (e) => e.undo(),
    refresh: /* @__PURE__ */ new Set([S.Init, S.UndoRedoChange])
  }), t.registerRefresher(o.Undo, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.Undo,
      enabled: e.api.canUndo()
    });
  });
}
function po(t) {
  t.registerHandler(o.Redo, {
    run: (e) => e.redo(),
    refresh: /* @__PURE__ */ new Set([S.UndoRedoChange])
  }), t.registerRefresher(o.Redo, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.Redo,
      enabled: e.api.canRedo()
    });
  });
}
function go(t) {
  t.registerHandler(o.PagePositionChange, {
    run: (e, a) => {
    },
    refresh: /* @__PURE__ */ new Set([S.LoadPageEnd, S.PagePositionChange])
  }), t.registerRefresher(o.PagePositionChange, (e) => {
    if (!e.canRefreshCommand(o.PagePositionChange)) return;
    e.store.commit("command/setEnabled", {
      cmd: o.PagePositionChange,
      enabled: !0
    });
    const { pageNum: a, pageCnt: n, total: r } = e.api.getCurrentPagePosition();
    e.store.commit("file/setCurrentPageNum", a || 0), e.store.commit("file/setCurrentPageCnt", n || 0), e.store.commit("file/setPageCount", r || 0);
  });
}
function ho(t) {
  t.registerHandler(o.GoToPage, {
    run: (e, a) => e.goToPage(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.GoToPage, (e) => {
    e.canRefreshCommand(o.GoToPage) && e.store.commit("command/setEnabled", {
      cmd: o.GoToPage,
      enabled: !0
    });
  });
}
function fo(t) {
  t.registerHandler(o.PageViewSwitch, {
    run: (e, a) => {
      e.switchPageView(a.value), t.store.commit("command/setState", {
        cmd: o.PageViewSwitch,
        ui: {
          value: a.value
        }
      });
    },
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.PageViewSwitch, (e) => {
    e.canRefreshCommand(o.PageViewSwitch) && (e.store.commit("command/setState", {
      cmd: o.PageViewSwitch,
      ui: {
        value: "single"
      }
    }), e.store.commit("command/setEnabled", {
      cmd: o.PageViewSwitch,
      enabled: !0
    }));
  });
}
function bo(t) {
  t.registerHandler(o.Zoom, {
    run: (e, a) => e.setZoom(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init, S.ZoomChange])
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
function vo(t) {
  t.registerHandler(o.Export, {
    run: async (e, a) => {
      await e.doExport("exportDocument");
    },
    refresh: /* @__PURE__ */ new Set([S.ExportReady])
  }), t.registerHandler(o.ExportPDF, {
    run: async (e, a) => {
      await e.doExport("exportPDF");
    },
    refresh: /* @__PURE__ */ new Set([S.ExportReady])
  }), t.registerRefresher(o.Export, (e) => {
    e.canRefreshCommand(o.Export) && e.store.commit("command/setEnabled", {
      cmd: o.Export,
      enabled: !0
    });
  }), t.registerRefresher(o.ExportPDF, (e) => {
    e.canRefreshCommand(o.ExportPDF) && e.store.commit("command/setEnabled", {
      cmd: o.ExportPDF,
      enabled: !0
    });
  });
}
function wo(t) {
  t.registerHandler(o.Open, {
    run: (e, a) => e.openFile(),
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.Open, (e) => {
    e.canRefreshCommand(o.Open) && e.store.commit("command/setEnabled", {
      cmd: o.Open,
      enabled: !0
    });
  });
}
function yo(t) {
  t.registerHandler(o.Copy, {
    run: (e) => e.copy()
  });
}
function So(t) {
  t.registerHandler(o.Paste, {
    run: (e) => e.paste(),
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.Paste, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.Paste,
      enabled: !0
    });
  });
}
function Po(t) {
  t.registerHandler(o.Strikeout, {
    run: (e, a) => e.setStrikeout(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init, S.SelectionChange])
  }), t.registerRefresher(o.Strikeout, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.Strikeout,
      enabled: !0
    });
  });
}
function Co(t) {
  t.registerHandler(o.FontColor, {
    run: (e, a) => e.setFontColor(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init, S.SelectionChange])
  }), t.registerRefresher(o.FontColor, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.FontColor,
      enabled: !0
    });
  });
}
function Eo(t) {
  t.registerHandler(o.FontName, {
    run: (e, a) => e.setFontName(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init, S.SelectionChange])
  }), t.registerRefresher(o.FontName, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.FontName,
      enabled: !0
    });
  });
}
function ko(t) {
  t.registerHandler(o.FontSize, {
    run: (e, a) => e.setFontSize(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init, S.SelectionChange])
  }), t.registerRefresher(o.FontSize, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.FontSize,
      enabled: !0
    });
  });
}
function Ro(t) {
  t.registerHandler(o.ParaAlignHorizontal, {
    run: (e, a) => e.setParaAlignHorizontal(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init, S.SelectionChange])
  }), t.registerRefresher(o.ParaAlignHorizontal, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.ParaAlignHorizontal,
      enabled: !0
    });
  });
}
function _o(t) {
  t.registerHandler(o.ParaListType, {
    run: (e, a) => e.setParaListType(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init, S.SelectionChange])
  }), t.registerRefresher(o.ParaListType, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.ParaListType,
      enabled: !0
    });
  });
}
function Fo(t) {
  t.registerHandler(o.InsertTable, {
    run: (e, a) => e.insertTable(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.InsertTable, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.InsertTable,
      enabled: !0
    });
  });
}
function Lo(t) {
  t.registerHandler(o.InsertSeparator, {
    run: (e, a) => e.insertSeparator(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.InsertSeparator, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.InsertSeparator,
      enabled: !0
    });
  });
}
function $o(t) {
  t.registerHandler(o.SearchReplaceWord, {
    run: (e, a) => {
      if (!a) {
        t.store.commit("file/setShowFindDialog", !0);
        return;
      }
      const n = a.value;
      if (!n) return;
      switch (n.action) {
        case "search":
          e.searchWord(n.val), e.searchNext();
          break;
        case "next":
          e.searchNext();
          break;
        case "prev":
          e.searchPrevious();
          break;
        case "focusEditor":
          e.focusEditor();
          break;
      }
      const r = e.searchStatusInfo();
      t.store.commit("command/setState", {
        cmd: o.SearchReplaceWord,
        ui: {
          value: {
            countNum: r.countNum,
            totalCount: r.totalCount
          }
        }
      });
    },
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.SearchReplaceWord, (e) => {
    e.canRefreshCommand(o.SearchReplaceWord) && e.store.commit("command/setEnabled", {
      cmd: o.SearchReplaceWord,
      enabled: !0
    });
  });
}
function Io(t) {
  t.registerHandler(o.TableCellOperations, {
    run: (e, a) => e.doTableCellOperation(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.TableCellOperations, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.TableCellOperations,
      enabled: !0
    });
  });
}
function Bo(t) {
  t.registerHandler(o.TableOperations, {
    run: (e, a) => e.doTableOperation(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.TableOperations, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.TableOperations,
      enabled: !0
    });
  });
}
function Ao(t) {
  t.registerHandler(o.PaperOrientation, {
    run: (e, a) => e.doPaperOrientationAction(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.PaperOrientation, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.PaperOrientation,
      enabled: !0
    });
  });
}
function To(t) {
  t.registerHandler(o.PaperSize, {
    run: (e, a) => e.doPaperSizeAction(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.PaperSize, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.PaperSize,
      enabled: !0
    });
  });
}
function Oo(t) {
  t.registerHandler(o.LineSpace, {
    run: (e, a) => e.setLineSpace(a.value),
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.LineSpace, (e) => {
    e.docReady && e.store.commit("command/setEnabled", {
      cmd: o.LineSpace,
      enabled: !0
    });
  });
}
function Do(t) {
  t.registerHandler(o.ParaSymbol, {
    run: (e, a) => {
      const n = t.store.getters["command/getVal"](o.ParaSymbol);
      switch (a.value) {
        case "ParagraphMarks":
          e.setParaSymbolParagraphMarks(!(n != null && n.ParagraphMarks)), n.ParagraphMarks = !(n != null && n.ParagraphMarks);
          break;
        case "PageBreak":
          e.setParaSymbolPageBreak(!(n != null && n.PageBreak)), n.PageBreak = !(n != null && n.PageBreak);
          break;
        case "SectionBreak":
          e.setParaSymbolSectionBreak(!(n != null && n.SectionBreak)), n.SectionBreak = !(n != null && n.SectionBreak);
          break;
      }
      t.store.commit("command/setState", {
        cmd: o.ParaSymbol,
        ui: {
          value: n
        }
      });
    },
    refresh: /* @__PURE__ */ new Set([S.Init])
  }), t.registerRefresher(o.ParaSymbol, (e) => {
    e.canRefreshCommand(o.ParaSymbol) && (e.store.commit("command/setState", {
      cmd: o.ParaSymbol,
      ui: {
        value: {
          ParagraphMarks: e.api.getParaSymbolParagraphMarks(),
          PageBreak: e.api.getParaSymbolPageBreak(),
          SectionBreak: e.api.getParaSymbolSectionBreak()
        }
      }
    }), e.store.commit("command/setEnabled", {
      cmd: o.ParaSymbol,
      enabled: !0
    }));
  });
}
function xo() {
  const t = N(V);
  so(t), uo(t), co(t), mo(t), po(t), go(t), ho(t), fo(t), bo(t), vo(t), wo(t), yo(t), So(t), Po(t), Co(t), Eo(t), ko(t), Ro(t), _o(t), Fo(t), Lo(t), $o(t), Bo(t), Io(t), Ao(t), To(t), Oo(t), Do(t);
}
const No = { class: "app-shell" }, zo = { class: "app-stage" }, Uo = { id: "appContainer" }, Vo = /* @__PURE__ */ A({
  __name: "App",
  setup(t) {
    const e = U(), a = b(null), n = b(null), r = b(!0), i = b(null), u = b(null), c = b(null), d = b(!1), p = b(null), m = N(fe, null), f = R(() => {
      var g;
      return ((g = m == null ? void 0 : m.uiOptions) == null ? void 0 : g.showTopBar) !== !1;
    }), w = R(() => {
      var g;
      return ((g = m == null ? void 0 : m.uiOptions) == null ? void 0 : g.showBottomBar) !== !1;
    }), h = R(() => e.state.file.isReady);
    pe(h, (g) => {
      var T;
      r.value = !g, g || (d.value = !1, p.value = null, (T = c.value) == null || T.closePopover());
    });
    const C = R(() => e == null ? void 0 : e.state.file.hasError);
    pe(C, (g) => {
      g && (r.value = !1);
    });
    const D = R(
      () => (e == null ? void 0 : e.getters["command/isRunning"](o.Export)) || (e == null ? void 0 : e.getters["command/isRunning"](o.ExportPDF))
    ), E = (g) => {
      var $, O, M;
      let T = ($ = g == null ? void 0 : g.detail) == null ? void 0 : $.resolve, v = (O = g == null ? void 0 : g.detail) == null ? void 0 : O.reject;
      T && ((M = i == null ? void 0 : i.value) != null && M.openPopover) && i.value.openPopover(T, v, !0);
    }, z = (g) => {
      var T;
      (T = i == null ? void 0 : i.value) == null || T.closePopover();
    }, P = () => {
      var g;
      (g = u == null ? void 0 : u.value) == null || g.openPopover();
    }, B = (g) => {
      var be, ve, we, ye;
      const T = ((be = g == null ? void 0 : g.detail) == null ? void 0 : be.error) ?? (g == null ? void 0 : g.detail) ?? g, v = da(T);
      if (!ma(v)) {
        (ve = c.value) == null || ve.closePopover(), p.value = T, d.value = !0;
        return;
      }
      const $ = v === 9;
      d.value = $, p.value = $ ? T : null;
      const O = (we = g == null ? void 0 : g.detail) == null ? void 0 : we.onConfirm, M = typeof O == "function" ? async () => {
        e.commit("file/setError", {
          message: "LICENSE_VERIFY_ERROR"
        });
        const Se = m == null ? void 0 : m.requestClose;
        if (typeof Se == "function") {
          await Se();
          return;
        }
        await O();
      } : void 0;
      (ye = c.value) == null || ye.openPopover(T, M);
    }, _ = (g) => {
      var $, O, M;
      let T = ($ = g == null ? void 0 : g.detail) == null ? void 0 : $.resolve, v = (O = g == null ? void 0 : g.detail) == null ? void 0 : O.reject;
      T && ((M = i == null ? void 0 : i.value) != null && M.openPopover) && i.value.openPopover(T, v);
    };
    return ea(() => {
      const g = (m == null ? void 0 : m.eventTarget) ?? window;
      xo(), g.addEventListener("FilePassWordError", E), g.addEventListener("FilePassWordOK", z), g.addEventListener("OpenDocumentFailed", P), g.addEventListener("LicenseVerifyError", B), g.addEventListener("AskFilePassword", _);
    }), ta(() => {
      const g = (m == null ? void 0 : m.eventTarget) ?? window;
      e.commit("file/clearError"), g.removeEventListener(
        "FilePassWordError",
        E
      ), g.removeEventListener("FilePassWordOK", z), g.removeEventListener(
        "OpenDocumentFailed",
        P
      ), g.removeEventListener(
        "LicenseVerifyError",
        B
      ), g.removeEventListener(
        "AskFilePassword",
        _
      );
    }), Te(() => {
      const { toolBarElm: g, editorElm: T } = ya();
      g.value = a.value, T.value = n.value;
    }), (g, T) => {
      const v = W("n-spin"), $ = W("n-message-provider"), O = W("n-modal-provider"), M = W("n-config-provider");
      return k(), I("div", No, [
        s(M, {
          class: "app-provider",
          locale: l(lo)(),
          "theme-overrides": l(io)()
        }, {
          default: y(() => [
            s(O, null, {
              default: y(() => [
                s($, null, {
                  default: y(() => [
                    s(l(aa), {
                      ref_key: "dialogOpenFailedRef",
                      ref: u
                    }, null, 512),
                    s(l(na), {
                      ref_key: "dialogCypherRef",
                      ref: i
                    }, null, 512),
                    s(l(oa), {
                      ref_key: "dialogLicenseVerifyErrorRef",
                      ref: c
                    }, null, 512),
                    F("div", zo, [
                      s(v, {
                        class: "app-spin",
                        show: r.value || D.value,
                        fullscreen: "",
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.5)"
                        }
                      }, {
                        default: y(() => [
                          F("div", Uo, [
                            f.value ? (k(), K(Nn, {
                              key: 0,
                              ref_key: "toolbarRef",
                              ref: a
                            }, null, 512)) : J("", !0),
                            d.value ? (k(), K(l(ra), {
                              key: 1,
                              error: p.value
                            }, null, 8, ["error"])) : J("", !0),
                            C.value ? J("", !0) : (k(), K(wa, {
                              key: 2,
                              ref_key: "editorRef",
                              ref: n,
                              class: "editor"
                            }, null, 512)),
                            w.value ? (k(), K(l(no), {
                              key: 3,
                              class: "status-bar"
                            })) : J("", !0)
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
function Ho(t) {
  let e = Na(t);
  const a = la(Vo);
  return a.use(e), { app: a };
}
class Mo extends ia {
  get Document() {
    return this.getAPIComponent("Document");
  }
  get Paragraph() {
    return this.getAPIComponent("Paragraph");
  }
  get Table() {
    return this.getAPIComponent("Table");
  }
  get UndoRedo() {
    return this.getAPIComponent("UndoRedo");
  }
  get Selection() {
    return this.getAPIComponent("Selection");
  }
  get Finder() {
    return this.getAPIComponent("Finder");
  }
}
class Wo extends Mo {
}
class Go extends Wo {
  constructor() {
    super();
    G(this, "openFileHandler");
  }
  setOpenFileHandler(a) {
    this.openFileHandler = a;
  }
  openFile() {
    var a;
    return (a = this.openFileHandler) == null ? void 0 : a.call(this);
  }
  async doExport(a) {
    switch (a) {
      case "exportDocument":
        await this.Document.callFun("exportDocument");
        break;
      case "exportPDF":
        await this.Document.callFun("exportPdf");
        break;
    }
  }
  copy() {
    return this.Document.callFun("copy");
  }
  paste() {
    return this.Document.callFun("paste");
  }
  undo() {
    this.UndoRedo.callFun("undo");
  }
  redo() {
    this.UndoRedo.callFun("redo");
  }
  canUndo() {
    return this.UndoRedo.callFun("canUndo");
  }
  canRedo() {
    return this.UndoRedo.callFun("canRedo");
  }
  setBold(a = !0) {
    this.Paragraph.callFun("setBold", a);
  }
  setItalic(a = !0) {
    this.Paragraph.callFun("setItalic", a);
  }
  setUnderline() {
    this.Paragraph.callFun("setUnderline");
  }
  setStrikeout(a = !0) {
    this.Paragraph.callFun("setStrikeThrough", a);
  }
  setFontSize(a) {
    this.Paragraph.callFun("setFontSize", a), this.focusEditor();
  }
  setFontColor(a) {
    const n = sa(a);
    this.Paragraph.callFun("setFontColor", n);
  }
  setFontName(a) {
    this.Paragraph.callFun("setFontName", a), this.focusEditor();
  }
  getPalette() {
    return this.Paragraph.callFun("getColorPalette");
  }
  toParagraphAlignment(a) {
    switch (a) {
      case "left":
        return "Left";
      case "center":
        return "Centered";
      case "right":
        return "Right";
      case "justify":
        return "Justified";
      case "distribute":
        return "Distributed";
      default:
        return a;
    }
  }
  setParaAlignHorizontal(a) {
    this.Paragraph.callFun("setAlignment", this.toParagraphAlignment(a));
  }
  setParaListType(a) {
    switch (a) {
      case "bullet":
        this.Paragraph.callFun("setBulletList");
        break;
      case "num":
        this.Paragraph.callFun("setNumberedList");
        break;
    }
  }
  insertTable(a) {
    const { rows: n, cols: r } = a;
    this.Table.callFun("insertTable", n, r);
  }
  toBreakType(a) {
    switch (a) {
      case "pageSeparator":
        return "Page";
      case "nextPage":
        return "SectionNext";
      case "continuousPage":
        return "SectionContinuous";
      case "evenPage":
        return "SectionEven";
      case "oddPage":
        return "SectionOdd";
      case "columnSeparator":
        return "Column";
      default:
        return a;
    }
  }
  insertSeparator(a) {
    return this.Selection.callFun("insertBreak", this.toBreakType(a));
  }
  getCurrentPagePosition() {
    return this.Document.callFun("getCurrentPagePosition");
  }
  goToPage(a) {
    return this.Document.callFun("goToPage", a || 1);
  }
  switchPageView(a) {
    return this.Document.callFun("setPageView", a || "single");
  }
  setZoom(a) {
    this.Document.callFun("setZoom", a);
  }
  getZoom() {
    return this.Document.callFun("getZoom");
  }
  setParaSymbolParagraphMarks(a) {
    this.Document.callFun("setShowParagraphMarks", a);
  }
  getParaSymbolParagraphMarks() {
    return this.Document.callFun("getShowParagraphMarks");
  }
  setParaSymbolPageBreak(a) {
    this.Document.callFun("setShowPageBreak", a);
  }
  getParaSymbolPageBreak() {
    return this.Document.callFun("getShowPageBreak");
  }
  setParaSymbolSectionBreak(a) {
    this.Document.callFun("setShowSectionBreak", a);
  }
  getParaSymbolSectionBreak() {
    return this.Document.callFun("getShowSectionBreak");
  }
  getSearchSelectedWord() {
    return this.Finder.callFun("getSelectText");
  }
  searchWord(a) {
    this.Finder.callFun("search", a);
  }
  searchNext() {
    this.Finder.callFun("selectNext");
  }
  searchPrevious() {
    this.Finder.callFun("selectPrevious");
  }
  searchStatusInfo() {
    return this.Finder.callFun("getSearchStatus");
  }
  focusEditor() {
    return this.Document.callFun("focusEditor");
  }
  isTable() {
    return this.Table.callFun("isInTable");
  }
  doTableOperation(a) {
    const { action: n } = a;
    switch (n) {
      case "delTable":
        this.Table.callFun("delete");
        break;
      case "insRow":
        this.Table.callFun("addRows");
        break;
      case "insCol":
        this.Table.callFun("addColumns");
        break;
      case "delRow":
        this.Table.callFun("deleteRows");
        break;
      case "delCol":
        this.Table.callFun("deleteColumns");
        break;
    }
  }
  doTableCellOperation(a) {
    const { action: n } = a;
    switch (n) {
      case "mergeCell":
        this.Table.callFun("mergeCells");
        break;
      case "unmergeCell":
        this.Table.callFun("unmergeCells");
        break;
    }
  }
  doPaperOrientationAction(a) {
    this.Document.callFun("setPageOrientation", a === "paperHorizontal" ? "Landscape" : "Portrait");
  }
  doPaperSizeAction(a) {
    typeof a == "string" && (a = Pn(a)), a && this.Document.callFun("setPageSize", a.width, a.height);
  }
  setLineSpace(a) {
    let n = 1;
    switch (a) {
      case "1.0":
        n = 1;
        break;
      case "1.15":
        n = 1.15;
        break;
      case "1.5":
        n = 1.5;
        break;
      case "2.0":
        n = 2;
        break;
      case "2.5":
        n = 2.5;
        break;
      case "3.0":
        n = 3;
        break;
    }
    this.Paragraph.callFun("setLineSpacing", n);
  }
}
const Zo = {
  namespaced: !0,
  state: () => ({
    hasError: !1,
    isReady: !1,
    connected: !1,
    message: null,
    rawEvent: null,
    fileInfo: { title: "", docId: "" },
    currentPageNum: 0,
    currentPageCnt: 0,
    pageCount: 0,
    colorPalette: null,
    recentColors: [],
    showFindDialog: !1,
    loadingRatio: 0,
    showLoadingProgressBar: !0
  }),
  getters: {
    title: (t) => t.fileInfo.title,
    currentPageNum: (t) => t.currentPageNum,
    currentPageCnt: (t) => t.currentPageCnt,
    pageCount: (t) => t.pageCount,
    colorPalette: (t) => t.colorPalette,
    recentColors: (t) => t.recentColors,
    showFindDialog: (t) => t.showFindDialog,
    loadingRatio: (t) => t.loadingRatio,
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
    setCurrentPageNum(t, e) {
      t.currentPageNum = e;
    },
    setCurrentPageCnt(t, e) {
      t.currentPageCnt = e;
    },
    setPageCount(t, e) {
      t.pageCount = e;
    },
    setColorPalette(t, e) {
      t.colorPalette = e;
    },
    addRecentColors(t, e) {
      function a(i) {
        return typeof i == "string" ? i : i == null ? void 0 : i.hex;
      }
      const n = a(e), r = t.recentColors.findIndex(
        (i) => a(i) === n
      );
      r !== -1 && t.recentColors.splice(r, 1), t.recentColors.unshift(e), t.recentColors.length > 10 && (t.recentColors.length = 10);
    },
    setShowFindDialog(t, e) {
      t.showFindDialog = e;
    },
    setLoadingRatio(t, e) {
      t.loadingRatio = e;
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
function me() {
  return {
    [o.Copy]: { enabled: !1, running: !1 },
    [o.Paste]: { enabled: !1, running: !1 },
    [o.Undo]: { enabled: !1, running: !1 },
    [o.Redo]: { enabled: !1, running: !1 },
    [o.Bold]: {
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
    [o.ParaAlignHorizontal]: {
      enabled: !1,
      running: !1,
      ui: {
        value: ""
      }
    },
    [o.ParaListType]: {
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
    [o.GoToPage]: {
      enabled: !1,
      running: !1
    },
    [o.PagePositionChange]: {
      enabled: !1,
      running: !1
    },
    [o.PageViewSwitch]: {
      enabled: !1,
      running: !1,
      ui: {
        value: ""
      }
    },
    [o.InsertTable]: {
      enabled: !1,
      running: !1
    },
    [o.InsertSeparator]: {
      enabled: !1,
      running: !1
    },
    [o.SearchReplaceWord]: {
      enabled: !1,
      running: !1,
      ui: {
        value: null
      }
    },
    [o.TableOperations]: {
      enabled: !1,
      running: !1
    },
    [o.TableCellOperations]: {
      enabled: !1,
      running: !1
    },
    [o.PaperOrientation]: {
      enabled: !1,
      running: !1
    },
    [o.PaperSize]: {
      enabled: !1,
      running: !1
    },
    [o.LineSpace]: {
      enabled: !1,
      running: !1
    },
    [o.ParaSymbol]: {
      enabled: !1,
      running: !1,
      ui: {
        value: null
      }
    }
  };
}
const jo = {
  namespaced: !0,
  state: () => ({
    map: me(),
    readOnly: !1,
    loadEnd: !1
  }),
  getters: {
    can: (t) => (e) => {
      var a;
      return ((a = t.map[e]) == null ? void 0 : a.enabled) !== !0 ? !1 : t.readOnly ? t.loadEnd && ge.has(e) : !0;
    },
    isRunning: (t) => (e) => {
      var a;
      return ((a = t.map[e]) == null ? void 0 : a.running) === !0;
    },
    active: (t) => (e) => {
      var n;
      const a = (n = t.map[e]) == null ? void 0 : n.ui;
      return !!a && a.value === !0;
    },
    getVal: (t) => (e) => {
      var n;
      const a = (n = t.map[e]) == null ? void 0 : n.ui;
      return !!a && a.value;
    },
    loadEnd: (t) => t.loadEnd
  },
  mutations: {
    resetCommandState(t) {
      t.map = me(), t.readOnly = !1, t.loadEnd = !1;
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
      const a = t.map[e.cmd];
      if (!a) return;
      const n = e.ui;
      if (n === void 0) {
        a.ui = void 0;
        return;
      }
      a.ui = { ...a.ui ?? {}, ...n };
    },
    clearState(t, e) {
      const a = me()[e.cmd];
      a && (t.map[e.cmd] = JSON.parse(JSON.stringify(a)));
    }
  },
  actions: {
    async run({ commit: t, getters: e }, a) {
      const { cmd: n, fn: r, param: i } = a;
      if (e.can(n)) {
        t("setRunning", { cmd: n, running: !0 });
        try {
          await r(i);
        } finally {
          t("setRunning", { cmd: n, running: !1 });
        }
      }
    }
  }
};
function We() {
  return ua({
    modules: {
      file: Zo,
      command: jo
    }
  });
}
We();
function Ko(t) {
  return typeof t == "object" && t !== null && typeof t.addEventListener == "function" && typeof t.removeEventListener == "function" && typeof t.dispatchEvent == "function";
}
function Jo(t) {
  var a;
  const e = (a = t.widgetMountContext) == null ? void 0 : a.eventTarget;
  return t.eventTarget ?? (Ko(e) ? e : void 0);
}
function Qo(t) {
  const e = We(), { app: a } = Ho(t.lang);
  ro(a), a.use(e);
  const n = new Go(), r = new ha({
    store: e,
    api: n,
    eventTarget: Jo(t)
  });
  return a.provide(V, r), a.provide(Ue, {
    toolBarElm: te(null),
    navigateBarElm: te(null),
    editorElm: te(null),
    bottomBarElm: te(null)
  }), t.widgetMountContext && a.provide(fe, t.widgetMountContext), {
    app: a,
    api: n,
    commandService: r,
    store: e
  };
}
function Xo(t) {
  return t ?? window.lang ?? window.navigator.language;
}
function qo(t) {
  return new Promise((e, a) => {
    var i;
    const n = (i = t.state) == null ? void 0 : i.file;
    if (n != null && n.isReady) {
      e();
      return;
    }
    if (n != null && n.hasError) {
      a(new Error(n.message ?? "document load failed"));
      return;
    }
    const r = t.watch(
      (u) => {
        var c, d, p;
        return {
          isReady: !!((c = u.file) != null && c.isReady),
          hasError: !!((d = u.file) != null && d.hasError),
          message: ((p = u.file) == null ? void 0 : p.message) ?? null
        };
      },
      (u) => {
        if (u.isReady) {
          r(), e();
          return;
        }
        u.hasError && (r(), a(new Error(u.message ?? "document load failed")));
      }
    );
  });
}
function Yo(t, e, a) {
  const n = {
    docId: (a == null ? void 0 : a.docId) ?? "",
    file: a == null ? void 0 : a.file,
    fileUrl: a == null ? void 0 : a.fileUrl,
    fileName: a == null ? void 0 : a.fileName,
    user: a == null ? void 0 : a.user,
    uiOptions: a == null ? void 0 : a.uiOptions,
    widgetMode: a == null ? void 0 : a.widgetMode,
    mainDom: te(null),
    eventTarget: (a == null ? void 0 : a.eventTarget) ?? window,
    requestClose: a == null ? void 0 : a.requestClose
  }, { app: r, api: i, commandService: u, store: c } = Qo({
    lang: Xo(e),
    eventTarget: a == null ? void 0 : a.eventTarget,
    widgetMountContext: n
  }), d = qo(c);
  r.mount(t);
  async function p() {
    var m, f;
    try {
      await ((f = (m = i.docApp) == null ? void 0 : m.destroy) == null ? void 0 : f.call(m));
    } finally {
      try {
        u.destroy();
      } finally {
        r.unmount();
      }
    }
  }
  return {
    app: r,
    api: i,
    commandService: u,
    store: c,
    ready: d,
    destroy: p,
    close: p,
    unmount: p
  };
}
const or = Yo;
export {
  Yo as default,
  or as mount,
  Yo as mountDocxApp
};
