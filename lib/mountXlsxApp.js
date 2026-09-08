var te = Object.defineProperty;
var ne = (e, A, t) => A in e ? te(e, A, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[A] = t;
var M = (e, A, t) => ne(e, typeof A != "symbol" ? A + "" : A, t);
import { d as H, o as D, F as j, e as P, a as s, b as r, S as PA, f as pA, A as J, D as rA, r as b, U as BA, V as VA, E as sA, t as Z, i as I, u as B, w as tA, c as R, g as L, h as C, _ as G, j as vA, k as CA, W as DA, l as UA, m as oe, n as xA, p as QA, q as ae, s as le, I as re, x as eA, v as se, B as Q, C as K, y as SA, H as YA, J as MA, G as ie, T as ue, z as ZA, aX as EA, Z as GA, aY as XA, a0 as hA, aZ as de, X as ce, Y as me, K as qA, L as fe, M as he, N as pe, P as ve, O as ge, R as oA, Q as be, a_ as OA, a$ as HA, b0 as we, b1 as ye, $ as Pe, a3 as _, a1 as Ce, a2 as De, a4 as xe, a5 as Se, a6 as Ee, a7 as Fe, a8 as Xe, a9 as Oe, aa as He, ab as Ne, ac as Le, ad as ke, ae as ze, af as Re, ag as Te, ah as Ie, ai as We, aj as je, ak as Be, al as Ve, am as Ue, an as Qe, ao as Ye, ap as Me, aq as Ze, ar as Ge, as as qe, at as Ke, au as Je, av as _e, aw as $e, ax as At, ay as et, az as tt, aA as nt, aB as ot, aC as at, aD as lt, aE as rt, aF as st, aG as it, aH as ut, aI as dt, aJ as ct, aK as mt, aL as NA, aM as ft, aN as ht, aO as pt, aP as vt, aQ as gt, aR as bt, aS as wt, aT as yt, aU as gA, aV as Pt, aW as aA } from "./ApiBase.js?version=1788858640169";
import { a as Ct, O as LA, c as kA, d as zA, r as Dt, i as xt } from "./UI.runtime.js?version=1788858640169";
import { _ as KA } from "./DropdownPopoverList.js?version=1788858640169";
const E = {
  Init: "init",
  // 文档初始化时
  SelectionChange: "selectionChange",
  // selection改变时
  UndoRedoChange: "UndoRedoChange",
  // undo redo 操作列表发生改变时
  ExportReady: "ExportReady",
  // 文档准备好导出时
  ZoomChange: "zoomChange"
  // 页面zoom改变
}, o = {
  //styles
  Accounting: "accounting",
  Bold: "bold",
  DecCellDigits: "decCellDigits",
  Underline: "underline",
  Border: "border",
  Strikeout: "strikeout",
  IncCellDigits: "incCellDigits",
  Italic: "italic",
  FontSize: "fontSize",
  FontColor: "fontColor",
  FillColor: "fillColor",
  FontName: "fontName",
  Color: "color",
  AlignHorizontal: "alignHorizontal",
  AlignVertical: "alignVertical",
  Percent: "percent",
  // editor
  Copy: "copy",
  Cut: "cut",
  Paste: "paste",
  Undo: "undo",
  Redo: "redo",
  Zoom: "zoom",
  Export: "export",
  ExportPDF: "exportPDF",
  Open: "open",
  NumFormat: "numFormat",
  Search: "search",
  // dropdown
  PaneOperations: "paneOperations",
  ColumnOperations: "columnOperations",
  RowOperations: "rowOperations",
  SheetOperations: "sheetOperations",
  AskDeleteSheet: "askDeleteSheet"
}, yA = /* @__PURE__ */ new Set([
  o.Open,
  o.Export,
  o.ExportPDF,
  o.Copy,
  o.Zoom,
  o.Search
]), St = /* @__PURE__ */ new Set([
  o.Open,
  o.Export,
  o.ExportPDF,
  o.Copy,
  o.Undo,
  o.Redo,
  o.Zoom,
  o.Search,
  o.SheetOperations,
  o.AskDeleteSheet
]);
function Et(e, A, t = window) {
  const n = (g) => {
    e.dispatch("file/onError", g);
  };
  t.addEventListener("FileError", n);
  const a = (g) => {
    e.dispatch("file/onReady", g);
  };
  t.addEventListener("DocumentReady", a);
  const l = () => {
    A.enableEditor();
    const g = A.api.isWorksheetProtected() || !1;
    e.commit("command/refreshProtectedSheetMode", g), e.commit("file/setSheetProtected", g);
  };
  t.addEventListener("EditorEnable", l);
  const i = () => {
    A.disableEditor();
  };
  t.addEventListener("EditorDisable", i);
  const d = (g) => {
  };
  t.addEventListener("WorksheetLoaded", d);
  const u = (g) => {
    e.dispatch("file/onLoadPageEnd", g), e.commit("command/setLoadEnd", !0), A.refresh(E.Init);
    const O = A.api.isWorksheetProtected() || !1;
    RA(e, O);
  };
  t.addEventListener("EndLoading", u);
  const h = (g) => {
    e.dispatch("file/onExportReady", g), A.refresh(E.ExportReady);
  };
  t.addEventListener("ExportReady", h);
  const m = (g) => {
    Xt(e, g.detail), A.refresh(E.SelectionChange);
  };
  t.addEventListener("SelectionChange", m);
  const w = (g) => {
    A.refresh(E.UndoRedoChange);
  };
  t.addEventListener("UndoRedoChange", w);
  const X = (g) => {
    Ft(e, g.detail.status);
  };
  t.addEventListener("EditingStatusChange", X);
  const f = (g) => {
    A.refresh(E.ZoomChange);
  };
  t.addEventListener("ZoomChange", f);
  const v = (g) => {
    e.commit("file/setShowFindDialog", !0);
  };
  t.addEventListener("OpenFindDialog", v);
  const y = (g) => {
    var c;
    let O = ((c = g.detail) == null ? void 0 : c.formatRatio) || 0;
    O = O == 100 ? 99 : O, e.commit("file/setLoadingRatio", O);
  };
  t.addEventListener("DocumentLoading", y);
  const T = (g) => {
    var c;
    const O = ((c = g.detail) == null ? void 0 : c.sheetProtected) || !1;
    RA(e, O);
  };
  t.addEventListener("SheetChange", T);
  const N = (g) => {
    var O;
    e.commit("command/setAsk", { cmd: o.AskDeleteSheet, resolve: (O = g.detail) == null ? void 0 : O.resolve });
  };
  t.addEventListener("AskDeleteSheet", N);
  const F = (g) => {
    var O;
    A.notifySecurityError(((O = g.detail) == null ? void 0 : O.action) || "");
  };
  return t.addEventListener("SecurityError", F), () => {
    t.removeEventListener("FileError", n), t.removeEventListener("DocumentReady", a), t.removeEventListener("EditorEnable", l), t.removeEventListener("EditorDisable", i), t.removeEventListener("WorksheetLoaded", d), t.removeEventListener("EndLoading", u), t.removeEventListener("ExportReady", h), t.removeEventListener("SelectionChange", m), t.removeEventListener("UndoRedoChange", w), t.removeEventListener("EditingStatusChange", X), t.removeEventListener("ZoomChange", f), t.removeEventListener("OpenFindDialog", v), t.removeEventListener("DocumentLoading", y), t.removeEventListener("SheetChange", T), t.removeEventListener("SecurityError", F);
  };
}
function RA(e, A) {
  const t = e.getters["file/sheetProtected"];
  A != t && (e.commit("command/refreshProtectedSheetMode", A), e.commit("file/setSheetProtected", A));
}
function Ft(e, A) {
  e.commit("command/setEnabled", {
    cmd: o.Zoom,
    enabled: !A
  }), A && e.commit("command/setEnabled", {
    cmd: o.Copy,
    enabled: !1
  });
}
function Xt(e, A) {
  if (!A) return;
  e.commit("command/setEnabled", {
    cmd: o.Copy,
    enabled: A.canCopy === !0
  }), e.commit("command/setSelectAll", A.bSelectAll === !0), [
    { cmd: o.Bold, key: "bold" },
    {
      cmd: o.FillColor,
      key: "fillColor",
      getEnabled: (n) => n.isText !== !0
    },
    { cmd: o.FontColor, key: "fontColor" },
    { cmd: o.FontName, key: "fontName" },
    { cmd: o.FontSize, key: "fontSize", getVal: (n) => n ? String(n) : "" },
    { cmd: o.Italic, key: "italic" },
    { cmd: o.Underline, key: "underline", getVal: (n) => n === "single" },
    { cmd: o.Strikeout, key: "strikeout" },
    {
      cmd: o.AlignHorizontal,
      key: "alignHorizontal",
      getEnabled: (n) => n.isText !== !0
    },
    {
      cmd: o.AlignVertical,
      key: "alignVertical",
      getEnabled: (n) => n.isText !== !0
    },
    {
      cmd: o.NumFormat,
      key: "numFormatType",
      getVal: (n) => {
        const a = e == null ? void 0 : e.getters["file/numFormatListValues"], l = Number(n) || 0;
        return a == null ? void 0 : a[l];
      },
      getEnabled: (n) => n.isText !== !0
    },
    {
      cmd: o.Percent,
      key: "",
      getEnabled: (n) => n.isText !== !0
    },
    {
      cmd: o.Accounting,
      key: "",
      getEnabled: (n) => n.isText !== !0
    },
    {
      cmd: o.IncCellDigits,
      key: "",
      getEnabled: (n) => n.isText !== !0
    },
    {
      cmd: o.DecCellDigits,
      key: "",
      getEnabled: (n) => n.isText !== !0
    },
    {
      cmd: o.Border,
      key: "",
      getEnabled: (n) => n.isText !== !0
    }
  ].forEach(({ cmd: n, key: a, getVal: l, getEnabled: i }) => {
    if (i && !i(A)) {
      e.commit("command/setEnabled", {
        cmd: n,
        enabled: !1
      }), e.commit("command/clearState", {
        cmd: n
      });
      return;
    }
    if (a != "") {
      let u;
      l ? u = l(A[a]) : u = A[a], e.commit("command/setState", {
        cmd: n,
        ui: {
          value: u
        }
      });
    }
    e.getters["file/sheetProtected"] || e.commit("command/setEnabled", {
      cmd: n,
      enabled: !0
    });
  });
}
const V = Symbol("CommandService");
class Ot {
  constructor(A) {
    M(this, "store");
    M(this, "api");
    M(this, "xlsReady");
    M(this, "eventTarget");
    M(this, "removeListeners");
    M(this, "handlers");
    M(this, "refreshers");
    M(this, "securityErrorHandler");
    M(this, "modeController");
    M(this, "removeModeListener");
    this.store = A.store, this.api = A.api, this.xlsReady = !1, this.eventTarget = A.eventTarget ?? window, this.removeListeners = () => {
    }, this.handlers = {}, this.refreshers = {}, this.securityErrorHandler = () => {
    }, this.modeController = null, this.removeModeListener = () => {
    };
  }
  initApi(A) {
    var t, n;
    this.xlsReady = !1, this.store.commit("command/resetCommandState"), (t = this.removeListeners) == null || t.call(this), (n = this.removeModeListener) == null || n.call(this), this.api.initApi(A), this.bindDocumentMode(A), this.syncReadOnlyState(), this.removeListeners = Et(this.store, this, this.eventTarget);
  }
  initApp(A) {
    this.initApi(A);
  }
  destroy() {
    var A, t;
    (A = this.removeListeners) == null || A.call(this), (t = this.removeModeListener) == null || t.call(this), this.modeController = null, this.removeListeners = () => {
    }, this.removeModeListener = () => {
    };
  }
  dispose() {
    this.destroy();
  }
  setSecurityErrorHandler(A) {
    this.securityErrorHandler = A || (() => {
    });
  }
  notifySecurityError(A) {
    this.securityErrorHandler(A);
  }
  enableEditor() {
    this.xlsReady = !0, this.refresh(E.Init);
  }
  disableEditor() {
    this.xlsReady = !1, this.refresh(E.Init);
  }
  canRefreshCommand(A) {
    return this.xlsReady ? !0 : this.isReadOnly() && this.store.getters["command/loadEnd"] === !0 && yA.has(A);
  }
  //refresheres
  registerHandler(A, t) {
    this.handlers[A], this.handlers[A] = t;
  }
  registerRefresher(A, t) {
    this.refreshers[A] = t;
  }
  refreshAll() {
    this.syncReadOnlyState(), this.refreshSome(Object.values(o));
  }
  refresh(A) {
    var n, a, l;
    this.syncReadOnlyState();
    const t = Object.values(o);
    for (const i of t) {
      const d = this.handlers[i];
      d && ((n = d.refresh) != null && n.has(A)) && ((l = (a = this.refreshers)[i]) == null || l.call(a, this));
    }
  }
  refreshSome(A) {
    var t, n;
    this.syncReadOnlyState();
    for (const a of A)
      (n = (t = this.refreshers)[a]) == null || n.call(t, this);
  }
  bindDocumentMode(A) {
    var t;
    this.modeController = Ct(A), this.removeModeListener = ((t = this.modeController) == null ? void 0 : t.onChange((n) => {
      this.store.commit("command/setReadOnly", n), n && this.disableEditor();
    })) ?? (() => {
    });
  }
  isReadOnly() {
    var A;
    return ((A = this.modeController) == null ? void 0 : A.isReadOnly()) ?? !1;
  }
  syncReadOnlyState() {
    this.store.commit("command/setReadOnly", this.isReadOnly());
  }
  canRunInReadOnly(A) {
    return !!yA.has(A);
  }
  /** 执行命令：统一入口 */
  async run(A, t) {
    this.syncReadOnlyState();
    const n = this.handlers[A];
    if (!n) {
      console.error(`[CommandService] no handler registered for "${A}"`);
      return;
    }
    this.isReadOnly() && !this.canRunInReadOnly(A) || await this.store.dispatch("command/run", {
      cmd: A,
      param: t,
      fn: async (a) => {
        await n.run(this.api, a);
      }
    });
  }
}
const Ht = /* @__PURE__ */ H({
  __name: "RenameSheetDialog",
  setup(e, { expose: A }) {
    const t = b(!1), n = b("");
    let a = null;
    function l(u, h) {
      n.value = u, a = h, t.value = !0;
    }
    function i() {
      n.value && (a && a(n.value), t.value = !1);
    }
    function d() {
      t.value = !1;
    }
    return A({
      openPopover: l
    }), (u, h) => (D(), j(r(rA), {
      show: t.value,
      "onUpdate:show": h[1] || (h[1] = (m) => t.value = m),
      title: u.$t("dialog.sheetRename.title"),
      width: 250
    }, {
      action: P(() => [
        s(r(J), {
          label: u.$t("common.cancel"),
          onClickButton: d,
          type: "standard"
        }, null, 8, ["label"]),
        s(r(J), {
          label: u.$t("common.confirm"),
          onClickButton: i
        }, null, 8, ["label"])
      ]),
      default: P(() => [
        s(r(PA), {
          value: n.value,
          "onUpdate:value": h[0] || (h[0] = (m) => n.value = m),
          onKeydown: pA(i, ["enter"])
        }, null, 8, ["value"])
      ]),
      _: 1
    }, 8, ["show", "title"]));
  }
}), Nt = /* @__PURE__ */ H({
  __name: "SetColumnWidthDialog",
  setup(e, { expose: A }) {
    const t = b(!1), n = b(!1), a = b(""), l = b(0), i = b(255), d = b(0);
    let u = null;
    function h(f) {
      const v = Number(f);
      if (f === "") {
        n.value = !1, a.value = "";
        return;
      }
      !isNaN(v) && v >= d.value && v <= i.value ? (n.value = !1, a.value = "") : (n.value = !0, a.value = "error");
    }
    function m(f, v) {
      l.value = f, n.value = !1, a.value = "", u = v, t.value = !0;
    }
    function w() {
      l.value < d.value || l.value > i.value || (u && u(l.value), t.value = !1);
    }
    function X() {
      t.value = !1;
    }
    return A({
      openPopover: m
    }), (f, v) => (D(), j(r(rA), {
      show: t.value,
      "onUpdate:show": v[1] || (v[1] = (y) => t.value = y),
      title: f.$t("dialog.columnWidthSet.title"),
      width: 250
    }, {
      action: P(() => [
        s(r(J), {
          label: f.$t("common.cancel"),
          onClickButton: X,
          type: "standard"
        }, null, 8, ["label"]),
        s(r(J), {
          label: f.$t("common.confirm"),
          onClickButton: w
        }, null, 8, ["label"])
      ]),
      default: P(() => [
        s(r(BA), {
          "validation-status": a.value,
          feedback: n.value ? f.$t("dialog.columnWidthSet.errorMessageNum") : ""
        }, {
          default: P(() => [
            s(r(VA), {
              value: l.value,
              "onUpdate:value": v[0] || (v[0] = (y) => l.value = y),
              onKeydown: pA(w, ["enter"]),
              min: d.value,
              max: i.value,
              "show-step-button": !0,
              "step-fixed": 2,
              onInput: h,
              style: { width: "220px" }
            }, {
              suffix: P(() => [
                sA(Z(f.$t("dialog.columnWidthSet.unit")), 1)
              ]),
              _: 1
            }, 8, ["value", "min", "max"])
          ]),
          _: 1
        }, 8, ["validation-status", "feedback"])
      ]),
      _: 1
    }, 8, ["show", "title"]));
  }
}), Lt = /* @__PURE__ */ H({
  __name: "SetRowHeightDialog",
  setup(e, { expose: A }) {
    const t = b(!1), n = b(!1), a = b(""), l = b(0), i = b(409), d = b(0);
    let u = null;
    function h(f) {
      const v = Number(f);
      if (f === "") {
        n.value = !1, a.value = "";
        return;
      }
      !isNaN(v) && v >= d.value && v <= i.value ? (n.value = !1, a.value = "") : (n.value = !0, a.value = "error");
    }
    function m(f, v) {
      l.value = f, n.value = !1, a.value = "", u = v, t.value = !0;
    }
    function w() {
      l.value < d.value || l.value > i.value || (u && u(l.value), t.value = !1);
    }
    function X() {
      t.value = !1;
    }
    return A({
      openPopover: m
    }), (f, v) => (D(), j(r(rA), {
      show: t.value,
      "onUpdate:show": v[1] || (v[1] = (y) => t.value = y),
      title: f.$t("dialog.rowHeightSet.title"),
      width: 250
    }, {
      action: P(() => [
        s(r(J), {
          label: f.$t("common.cancel"),
          onClickButton: X,
          type: "standard"
        }, null, 8, ["label"]),
        s(r(J), {
          label: f.$t("common.confirm"),
          onClickButton: w
        }, null, 8, ["label"])
      ]),
      default: P(() => [
        s(r(BA), {
          "validation-status": a.value,
          feedback: n.value ? f.$t("dialog.rowHeightSet.errorMessageNum") : ""
        }, {
          default: P(() => [
            s(r(VA), {
              value: l.value,
              "onUpdate:value": v[0] || (v[0] = (y) => l.value = y),
              onKeydown: pA(w, ["enter"]),
              min: d.value,
              max: i.value,
              "show-step-button": !0,
              "step-fixed": 1,
              onInput: h,
              style: { width: "220px" }
            }, {
              suffix: P(() => [
                sA(Z(f.$t("dialog.rowHeightSet.unit")), 1)
              ]),
              _: 1
            }, 8, ["value", "min", "max"])
          ]),
          _: 1
        }, 8, ["validation-status", "feedback"])
      ]),
      _: 1
    }, 8, ["show", "title"]));
  }
}), kt = { class: "global-basic-display-text count" }, zt = /* @__PURE__ */ H({
  __name: "SearchContentDialog",
  emits: ["update:show"],
  setup(e, { emit: A }) {
    const t = I(V), n = B(), a = b(""), l = C(
      () => {
        var F;
        return ((F = n == null ? void 0 : n.getters["command/getVal"](o.Search)) == null ? void 0 : F.countNum) || 0;
      }
    ), i = C(
      () => {
        var F;
        return ((F = n == null ? void 0 : n.getters["command/getVal"](o.Search)) == null ? void 0 : F.totalCount) || 0;
      }
    ), d = b(null), u = C(() => n == null ? void 0 : n.getters["file/showFindDialog"]);
    tA(u, (F) => {
      F && f();
    });
    function h(F) {
      const g = { value: F };
      t.run(o.Search, g);
    }
    function m() {
      if (!a.value) {
        N();
        return;
      }
      h({
        action: "search",
        val: a.value
      });
    }
    function w() {
      h({
        action: "next"
      });
    }
    function X() {
      h({
        action: "prev"
      });
    }
    function f() {
      setTimeout(y, 100);
    }
    function v() {
      a.value = "", N(), n.commit("file/setShowFindDialog", !1);
    }
    function y() {
      var F;
      (F = d == null ? void 0 : d.value) == null || F.focus();
    }
    function T(F) {
      F || v();
    }
    function N() {
      n.commit("command/setState", {
        cmd: o.Search,
        ui: {
          value: {
            countNum: 0,
            totalCount: 0
          }
        }
      });
    }
    return (F, g) => (D(), R("div", null, [
      s(r(rA), {
        show: u.value,
        "onUpdate:show": T,
        title: F.$t("toolbar.start.search"),
        width: 300,
        "show-mask": !1,
        draggable: !0
      }, {
        action: P(() => [
          s(r(J), {
            label: F.$t("toolbar.start.prev"),
            onClickButton: g[2] || (g[2] = (O) => X()),
            type: "standard"
          }, null, 8, ["label"]),
          s(r(J), {
            label: F.$t("toolbar.start.next"),
            onClickButton: g[3] || (g[3] = (O) => w())
          }, null, 8, ["label"])
        ]),
        default: P(() => [
          s(r(PA), {
            value: a.value,
            "onUpdate:value": g[0] || (g[0] = (O) => a.value = O),
            placeholder: F.$t("toolbar.start.findPlaceHolder"),
            onInput: g[1] || (g[1] = (O) => m()),
            onKeydown: pA(w, ["enter"]),
            ref_key: "inputInstRef",
            ref: d
          }, {
            suffix: P(() => [
              L("span", kt, Z(l.value) + "/" + Z(i.value), 1)
            ]),
            _: 1
          }, 8, ["value", "placeholder"])
        ]),
        _: 1
      }, 8, ["show", "title"])
    ]));
  }
}), Rt = /* @__PURE__ */ G(zt, [["__scopeId", "data-v-663f0651"]]), Tt = { style: { "font-size": "12px", margin: "20px" } }, It = /* @__PURE__ */ H({
  __name: "RemoveSheetDialog",
  setup(e, { expose: A }) {
    const t = b(!1);
    let n = null;
    function a(d) {
      n = d, t.value = !0;
    }
    function l() {
      n && n(!0), t.value = !1;
    }
    function i() {
      n && n(!1), t.value = !1;
    }
    return A({
      openPopover: a
    }), (d, u) => (D(), j(r(rA), {
      show: t.value,
      "onUpdate:show": u[0] || (u[0] = (h) => t.value = h),
      title: d.$t("dialog.sheetDelete.title"),
      width: 300
    }, {
      action: P(() => [
        s(r(J), {
          label: d.$t("common.cancel"),
          onClickButton: i,
          type: "standard"
        }, null, 8, ["label"]),
        s(r(J), {
          label: d.$t("common.confirm"),
          onClickButton: l
        }, null, 8, ["label"])
      ]),
      default: P(() => [
        L("div", Tt, Z(d.$t("dialog.sheetDelete.info")), 1)
      ]),
      _: 1
    }, 8, ["show", "title"]));
  }
}), TA = ".xls,.xlsx", Wt = /* @__PURE__ */ H({
  __name: "edit",
  setup(e) {
    const { t: A } = vA(), t = CA(), n = B(), a = I(V), l = I(DA, null), i = b(null), d = C(() => n == null ? void 0 : n.getters["command/getAsk"](o.AskDeleteSheet)), u = b(!1), h = b(0), m = b(0), w = C(() => {
      var p;
      return ((p = n.state.command) == null ? void 0 : p.readOnly) === !0;
    }), X = C(() => {
      var p;
      return ((p = n.state.command) == null ? void 0 : p.loadEnd) === !0;
    }), f = C(
      () => {
        var p;
        return ((p = n.state.file) == null ? void 0 : p.sheetProtected) === !0;
      }
    ), v = C(() => {
      var p;
      return ((p = n.state.command) == null ? void 0 : p.selectAll) === !0;
    });
    function y() {
      var p, x;
      try {
        (x = (p = a.api.docApp) == null ? void 0 : p.destroy) == null || x.call(p);
      } catch {
      }
    }
    const T = [
      { label: A("dropDown.row.insert"), key: "insertRow" },
      { label: A("dropDown.row.setHeight"), key: "setRowHeight" },
      { type: "divider", key: "d1" },
      { label: A("dropDown.row.hide"), key: "hideRow" },
      { label: A("dropDown.row.unhide"), key: "unhideRow" },
      { type: "divider", key: "d2" },
      { label: A("dropDown.row.clearContent"), key: "clearRowContent" },
      { type: "divider", key: "d3" },
      { label: A("dropDown.row.del"), key: "delRow" }
    ], N = [
      { label: A("dropDown.column.insert"), key: "insertColumn" },
      { label: A("dropDown.column.setWidth"), key: "setColumnWidth" },
      { type: "divider", key: "d1" },
      { label: A("dropDown.column.hide"), key: "hideColumn" },
      { label: A("dropDown.column.unhide"), key: "unhideColumn" },
      { type: "divider", key: "d2" },
      { label: A("dropDown.column.clearContent"), key: "clearColContent" },
      { type: "divider", key: "d3" },
      { label: A("dropDown.column.del"), key: "delColumn" }
    ], F = [
      { label: A("dropDown.sheet.insert"), key: "insertSheet" },
      { label: A("dropDown.sheet.rename"), key: "renameSheet" },
      { type: "divider", key: "d1" },
      { label: A("dropDown.sheet.delCurrent"), key: "delCurrentSheet" }
    ], g = b(null), O = b(null), c = b(null), k = b(null);
    tA(d, (p) => {
      var x;
      p && ((x = O.value) == null || x.openPopover(d.value));
    });
    let W = [];
    function Y(p) {
      return v.value !== !0 ? !1 : p === "insertRow" || p === "insertColumn";
    }
    function U(p, x) {
      return p.map((z) => z.type === "divider" ? z : {
        ...z,
        disabled: x || Y(z.key) || z.disabled === !0
      });
    }
    function q(p) {
      var z, AA, FA;
      u.value = !1;
      const x = {
        value: {
          action: p
        }
      };
      switch (p) {
        case "freezePane":
        case "unfreezePane":
        case "cleanText":
          a.run(o.PaneOperations, x);
          break;
        case "insertRow":
        case "hideRow":
        case "unhideRow":
        case "delRow":
        case "clearRowContent":
          a.run(o.RowOperations, x);
          break;
        case "setRowHeight":
          (z = k == null ? void 0 : k.value) == null || z.openPopover(
            a.api.getRowHeight(),
            (nA) => {
              x.value.val = nA, a.run(o.RowOperations, x);
            }
          );
          break;
        case "insertColumn":
        case "hideColumn":
        case "unhideColumn":
        case "delColumn":
        case "clearColContent":
          a.run(o.ColumnOperations, x);
          break;
        case "setColumnWidth":
          (AA = c == null ? void 0 : c.value) == null || AA.openPopover(
            a.api.getColumnWidth(),
            (nA) => {
              x.value.val = nA, a.run(o.ColumnOperations, x);
            }
          );
          break;
        case "insertSheet":
        case "delCurrentSheet":
          a.run(o.SheetOperations, x);
          break;
        case "renameSheet":
          (FA = g == null ? void 0 : g.value) == null || FA.openPopover(
            a.api.getSheetName(),
            (nA) => {
              x.value.val = nA, a.run(o.SheetOperations, x);
            }
          );
          break;
      }
    }
    function iA(p) {
      if (X.value === !0) {
        switch (p.preventDefault(), u.value = !1, a.api.getCursorTargetType()) {
          case "columnHeader":
            W = U(
              N,
              w.value || f.value
            );
            break;
          case "rowHeader":
            W = U(
              T,
              w.value || f.value
            );
            break;
          case "cells":
            let x = [
              { label: A("dropDown.pane.clearContent"), key: "cleanText" },
              { type: "divider", key: "d1" }
            ], z;
            a.api.isFrozenPane() ? z = {
              label: A("dropDown.pane.unfreeze"),
              key: "unfreezePane"
            } : z = { label: A("dropDown.pane.freeze"), key: "freezePane" }, x.push(z), W = U(
              x,
              w.value || f.value
            );
            break;
          case "navBar":
            W = U(F, w.value);
            break;
          default:
            W = [];
            break;
        }
        W && W.length > 0 && ae(() => {
          u.value = !0, h.value = p.clientX, m.value = p.clientY;
        });
      }
    }
    function uA() {
      u.value = !1;
    }
    function dA(p) {
      const x = {
        copy: "C",
        paste: "V",
        cut: "X"
      };
      return `${/Mac|iPhone|iPad|iPod/i.test(navigator.platform) ? "Command" : "Ctrl"}+${x[p] || "C/V/X"}`;
    }
    function cA(p) {
      if (p === "https") {
        t.warning(A("common.httpsOnly"));
        return;
      }
      (p === "copy" || p === "paste" || p === "cut") && t.warning(
        A("common.clipboardShortcutTip", {
          shortcut: dA(p)
        })
      );
    }
    function mA() {
      return new Promise((p) => {
        const x = document.createElement("input");
        x.type = "file", x.accept = TA, x.style.display = "none", x.addEventListener(
          "change",
          () => {
            var AA;
            const z = ((AA = x.files) == null ? void 0 : AA[0]) || null;
            if (x.remove(), z && !le(z, TA)) {
              t.warning(A("common.unsupportedFileType")), p(null);
              return;
            }
            if (z && z.size <= 0) {
              t.warning(A("common.emptyFileUnsupported")), p(null);
              return;
            }
            p(z);
          },
          { once: !0 }
        ), x.addEventListener(
          "cancel",
          () => {
            x.remove(), p(null);
          },
          { once: !0 }
        ), document.body.appendChild(x), x.click();
      });
    }
    async function ee() {
      var x;
      const p = await mA();
      if (!(!p || !i.value))
        try {
          n.dispatch("file/onOpening"), y(), (x = a.destroy) == null || x.call(a), i.value.innerHTML = "";
          const z = await LA({
            docId: `local-${Date.now()}`,
            file: p,
            fileName: p.name,
            user: l == null ? void 0 : l.user,
            widgetMode: l == null ? void 0 : l.widgetMode,
            mainDom: i.value,
            eventTarget: l == null ? void 0 : l.eventTarget,
            [kA]: {
              beforeRender: (AA) => {
                a.initApi(AA);
              }
            }
          });
          n.dispatch("file/onConnected", {
            title: document.title,
            docId: z.docId
          });
        } catch (z) {
          console.error("OpenDocument failed:", z), n.commit("file/setReady"), zA(
            "OpenDocumentFailed",
            void 0,
            l == null ? void 0 : l.eventTarget
          );
        }
    }
    return UA(() => {
      a.setSecurityErrorHandler(cA), a.api.setOpenFileHandler(ee), l != null && l.mainDom && (l.mainDom.value = i.value), LA({
        docId: l == null ? void 0 : l.docId,
        file: l == null ? void 0 : l.file,
        fileUrl: l == null ? void 0 : l.fileUrl,
        fileName: l == null ? void 0 : l.fileName,
        user: l == null ? void 0 : l.user,
        widgetMode: l == null ? void 0 : l.widgetMode,
        mainDom: i.value,
        eventTarget: l == null ? void 0 : l.eventTarget,
        [kA]: {
          beforeRender: (p) => {
            a.initApi(p);
          }
        }
      }).then(({ docId: p }) => {
        n.dispatch("file/onConnected", {
          title: document.title,
          docId: p
        });
      }).catch((p) => {
        console.error("OpenDocument failed:", p), n.dispatch("file/onError", p), zA(
          "OpenDocumentFailed",
          void 0,
          l == null ? void 0 : l.eventTarget
        );
      });
    }), oe(() => {
      a.setSecurityErrorHandler(null);
    }), (p, x) => (D(), R("div", {
      class: "main-container",
      onContextmenu: xA(iA, ["prevent"])
    }, [
      s(r(QA), {
        trigger: "manual",
        show: u.value,
        x: h.value,
        y: m.value,
        options: r(W),
        onSelect: q,
        onClickoutside: uA
      }, null, 8, ["show", "x", "y", "options"]),
      s(Ht, {
        ref_key: "RenameSheetDialogRef",
        ref: g
      }, null, 512),
      s(It, {
        ref_key: "RemoveSheetDialogRef",
        ref: O
      }, null, 512),
      s(Nt, {
        ref_key: "SetColumnWidthDialogRef",
        ref: c
      }, null, 512),
      s(Lt, {
        ref_key: "SetRowHeightDialogRef",
        ref: k
      }, null, 512),
      s(Rt),
      L("div", {
        ref_key: "mainRef",
        ref: i,
        class: "main"
      }, null, 512)
    ], 32));
  }
}), JA = Symbol("LayoutRefs");
function jt() {
  const e = I(JA);
  if (!e) throw new Error("LayoutRefs not provided");
  return e;
}
const Bt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAspJREFUeAHFVz9oE1EY/90ZVCykHUynJhRUiEQcEhcTHRQ02kXikoJYXFo3g9IMFmotggrJ5Ga6WCVgOpixjQ4K1dTBVpDEOlTQnFPSwQQsdvF838mF8+7dnyS094NA8nLv/X7ve9/v++4JYPBlx1KAfFcABrAbkPENgvCkPvl0VhjMjs0QOVyAIOOmCFm+BpcgC5gRIWAY7mFAhMvw6AeSodPwew+aTij/WEdZ+oJOER0KIuY/isxK0VqA1Grg0YVx04Wa23GcmLuF1vYW7EAbuXg4wj5hRBl5tf7dXgDt7h37xPxB7qL9+w7gejhuWEglJKJjgwGFWB/JxY01wxwPjyS78oIJmDKMt37/wuOPL5FbK7XHKLR0bCNHIvAycWaQmg2uaK4AisLz6jJG2cLasRtLOXZEmwpR+mQCE5G4JamWPLHwgPufx2zSndd5jBwKw7u/D9lysa1+Inwe6ehlR8QEilaGzTfLGVMBTTaBwk3qC9W3CuH8pZRyxk5QYQk3/SZv6xhWiq/KsAElUzE5ZWlPPQrsCCv1muKAWnMTqdIc9zmP3ULdkBMoMZOhf9/LUtH0OdtK2A25FmbZ70jAZDTREznBLPttBRAxWa0XkHvItl0JSEd7J7cKvQpuEtLuk5oi1CnIfrnVkqNnuQKcel0P8nyGlfFOuiVXAHm3W2KnFdJSQGwoCDtQclG/KEvrbWK1P1Dp1TasjgSEfAGl/vNARIsbH5S2qmY3rzGRfUmck3cGg4BAv++/3+0WzJJKuyAl6WjoFDdfrN4Z9DDYkCKggnZ89tm0Yin9bujtxipZx1lEnBQxgwB1EpEmFu6bFpJKo2Z5zhSFe2euwA6GI1j6uorC52VHViKR3r3WWU8bsqqGjtrxTsL1e4HItv8TboFdUkVZxixcgzy/Z+vVp/d9546zm7kwzO6Ju3I9p6iL8p/b9XT+4V/kpCewChFx3wAAAABJRU5ErkJggg==", Vt = "data:image/png;base64,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", S = {
  width: 4215,
  image: Vt
}, $ = /* @__PURE__ */ H({
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
  setup(e) {
    const A = B(), t = e, n = C(() => A == null ? void 0 : A.getters["command/can"](t.cmd)), a = I(V);
    function l() {
      a.run(t.cmd, void 0);
    }
    return (i, d) => (D(), R("div", {
      onClick: xA(l, ["stop"])
    }, [
      s(r(re), {
        label: e.label,
        "resource-image": e.resourceImage ?? r(S).image,
        disabled: !n.value,
        showArrow: e.showArrow,
        x: e.x,
        y: e.y,
        "image-width": e.imageWidth ?? r(S).width
      }, null, 8, ["label", "resource-image", "disabled", "showArrow", "x", "y", "image-width"])
    ]));
  }
}), Ut = { style: { display: "flex", gap: "8px" } }, Qt = /* @__PURE__ */ H({
  __name: "FileButtonGroup",
  setup(e) {
    const A = CA(), { t } = vA();
    function n(a) {
      location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1" || (a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), A.warning(t("common.httpsOnly")));
    }
    return (a, l) => (D(), R("div", Ut, [
      s($, {
        cmd: r(o).Open,
        label: a.$t("toolbar.file.open"),
        x: 0,
        y: -30
      }, null, 8, ["cmd", "label"]),
      s(r(eA), {
        vertical: !0,
        height: 65,
        margin: "0px"
      }),
      s($, {
        cmd: r(o).Export,
        label: a.$t("toolbar.file.exportDocument"),
        x: -24,
        y: -30
      }, null, 8, ["cmd", "label"]),
      s($, {
        cmd: r(o).ExportPDF,
        label: a.$t("toolbar.file.exportPDF"),
        x: -48,
        y: -30,
        onClickCapture: n
      }, null, 8, ["cmd", "label"])
    ]));
  }
}), Yt = { style: { display: "flex", gap: "8px" } }, Mt = /* @__PURE__ */ H({
  __name: "ClipboardGroup",
  setup(e) {
    const A = CA(), { t } = vA(), n = {
      width: 737,
      image: se
    };
    function a(l) {
      location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1" || (l.preventDefault(), l.stopPropagation(), l.stopImmediatePropagation(), A.warning(t("common.httpsOnly")));
    }
    return (l, i) => (D(), R("div", Yt, [
      s($, {
        cmd: r(o).Copy,
        label: l.$t("toolbar.start.copy"),
        "resource-image": n.image,
        "image-width": n.width,
        x: -96,
        y: -30
      }, null, 8, ["cmd", "label", "resource-image", "image-width"]),
      s($, {
        cmd: r(o).Paste,
        label: l.$t("toolbar.start.paste"),
        "resource-image": n.image,
        "image-width": n.width,
        x: -72,
        y: -30,
        onClickCapture: a
      }, null, 8, ["cmd", "label", "resource-image", "image-width"])
    ]));
  }
}), Zt = /* @__PURE__ */ H({
  __name: "CommandAlignHorizontalGroup",
  props: {
    cmd: {}
  },
  setup(e) {
    const A = B(), t = e, n = C(() => A == null ? void 0 : A.getters["command/can"](t.cmd)), a = C(() => A == null ? void 0 : A.getters["command/getVal"](t.cmd)), l = I(V);
    function i(d) {
      const u = { value: d };
      l.run(t.cmd, u);
    }
    return (d, u) => {
      const h = Q("n-space");
      return D(), j(h, null, {
        default: P(() => [
          s(r(K), {
            active: a.value === "left",
            disabled: !n.value,
            onClick: u[0] || (u[0] = (m) => i("left")),
            "resource-image": r(S).image,
            x: -368,
            y: -56,
            tooltip: d.$t("toolbar.start.horizontalAlignLeft"),
            "image-width": r(S).width,
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"]),
          s(r(K), {
            active: a.value === "center",
            disabled: !n.value,
            onClick: u[1] || (u[1] = (m) => i("center")),
            "resource-image": r(S).image,
            x: -384,
            y: -56,
            tooltip: d.$t("toolbar.start.horizontalAlignCenter"),
            "image-width": r(S).width,
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"]),
          s(r(K), {
            active: a.value === "right",
            disabled: !n.value,
            onClick: u[2] || (u[2] = (m) => i("right")),
            "resource-image": r(S).image,
            x: -400,
            y: -56,
            tooltip: d.$t("toolbar.start.horizontalAlignRight"),
            "image-width": r(S).width,
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"]),
          s(r(K), {
            active: a.value === "justify",
            disabled: !n.value,
            onClick: u[3] || (u[3] = (m) => i("justify")),
            "resource-image": r(S).image,
            x: -416,
            y: -56,
            tooltip: d.$t("toolbar.start.horizontalAlignJustify"),
            "image-width": r(S).width,
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"]),
          s(r(K), {
            active: a.value === "distributed",
            disabled: !n.value,
            onClick: u[4] || (u[4] = (m) => i("distributed")),
            "resource-image": r(S).image,
            x: -860,
            y: -56,
            "image-width": r(S).width,
            tooltip: d.$t("toolbar.start.horizontalAlignDistribute"),
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "image-width", "tooltip"])
        ]),
        _: 1
      });
    };
  }
}), Gt = /* @__PURE__ */ H({
  __name: "CommandAlignVerticalGroup",
  props: {
    cmd: {}
  },
  setup(e) {
    const A = B(), t = e, n = C(() => A == null ? void 0 : A.getters["command/can"](t.cmd)), a = C(() => A == null ? void 0 : A.getters["command/getVal"](t.cmd)), l = I(V);
    function i(d) {
      const u = { value: d };
      l.run(t.cmd, u);
    }
    return (d, u) => {
      const h = Q("n-space");
      return D(), j(h, null, {
        default: P(() => [
          s(r(K), {
            active: a.value === "top",
            disabled: !n.value,
            onClick: u[0] || (u[0] = (m) => i("top")),
            "resource-image": r(S).image,
            x: -208,
            y: -56,
            tooltip: d.$t("toolbar.start.verticalAlignTop"),
            "image-width": r(S).width,
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"]),
          s(r(K), {
            active: a.value === "center",
            disabled: !n.value,
            onClick: u[1] || (u[1] = (m) => i("center")),
            "resource-image": r(S).image,
            x: -224,
            y: -56,
            tooltip: d.$t("toolbar.start.verticalAlignCenter"),
            "image-width": r(S).width,
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"]),
          s(r(K), {
            active: a.value === "bottom",
            disabled: !n.value,
            onClick: u[2] || (u[2] = (m) => i("bottom")),
            "resource-image": r(S).image,
            x: -240,
            y: -56,
            tooltip: d.$t("toolbar.start.verticalAlignBottom"),
            "image-width": r(S).width,
            class: "global-small-icon-button"
          }, null, 8, ["active", "disabled", "resource-image", "tooltip", "image-width"])
        ]),
        _: 1
      });
    };
  }
}), qt = { class: "toolbar-group" }, Kt = /* @__PURE__ */ H({
  __name: "ParaStyleGroup",
  setup(e) {
    return (A, t) => {
      const n = Q("n-space");
      return D(), R("div", qt, [
        s(n, { vertical: "" }, {
          default: P(() => [
            s(Gt, {
              cmd: r(o).AlignVertical
            }, null, 8, ["cmd"]),
            s(Zt, {
              cmd: r(o).AlignHorizontal
            }, null, 8, ["cmd"])
          ]),
          _: 1
        })
      ]);
    };
  }
}), Jt = /* @__PURE__ */ G(Kt, [["__scopeId", "data-v-53574e54"]]), fA = /* @__PURE__ */ H({
  __name: "CommandSmallButton",
  props: {
    cmd: {},
    x: {},
    y: {},
    tooltip: {}
  },
  setup(e) {
    const A = B(), t = e, n = C(() => A == null ? void 0 : A.getters["command/can"](t.cmd)), a = C(() => A == null ? void 0 : A.getters["command/active"](t.cmd)), l = I(V);
    function i() {
      const u = { value: !a.value };
      l.run(t.cmd, u);
    }
    return (d, u) => (D(), j(r(K), {
      onClick: i,
      "resource-image": r(S).image,
      disabled: !n.value,
      x: e.x,
      y: e.y,
      "image-width": r(S).width,
      tooltip: e.tooltip,
      active: a.value
    }, null, 8, ["resource-image", "disabled", "x", "y", "image-width", "tooltip", "active"]));
  }
}), IA = /* @__PURE__ */ H({
  __name: "CommandColorPaletteSmallButton",
  props: {
    cmd: {},
    tooltip: {},
    x: {},
    y: {},
    showFill: { type: Boolean }
  },
  setup(e) {
    const A = B(), t = I(V);
    let n = b([]), a = b([]);
    const l = b(!1), i = e, d = C(() => A == null ? void 0 : A.getters["command/can"](i.cmd)), u = C(() => A == null ? void 0 : A.getters["command/getVal"](i.cmd)), h = C(() => A == null ? void 0 : A.getters["file/recentColors"]);
    function m(f) {
      const v = { value: f };
      t.run(i.cmd, v), A.commit("file/addRecentColors", f);
    }
    function w(f) {
      var v;
      if (l.value = f, f) {
        let y = A == null ? void 0 : A.getters["file/colorPalette"];
        if (!y) {
          const T = (v = t.api) == null ? void 0 : v.getPalette();
          T && (y = MA(T), A.commit("file/setColorPalette", y));
        }
        n.value = y == null ? void 0 : y.standardColors, a.value = y == null ? void 0 : y.themeColors;
      }
    }
    function X() {
      if (!i.showFill) return;
      const f = { value: null };
      t.run(i.cmd, f);
    }
    return (f, v) => (D(), j(r(YA), {
      val: u.value,
      "standard-colors": r(n),
      "theme-colors": r(a),
      "recent-colors": h.value,
      showFill: e.showFill,
      onSelect: m,
      onShow: w,
      onClearFill: X
    }, {
      default: P(() => [
        s(r(SA), {
          "resource-image": r(S).image,
          disabled: !d.value,
          x: e.x,
          y: e.y,
          "image-width": r(S).width,
          tooltip: e.tooltip,
          "sub-showing": l.value,
          "show-color-cube": !0,
          color: e.showFill ? u.value || "" : u.value || "rgb(0, 0, 0)",
          onClick: v[0] || (v[0] = xA(() => {
          }, ["stop"]))
        }, null, 8, ["resource-image", "disabled", "x", "y", "image-width", "tooltip", "sub-showing", "color"])
      ]),
      _: 1
    }, 8, ["val", "standard-colors", "theme-colors", "recent-colors", "showFill"]));
  }
}), WA = /* @__PURE__ */ H({
  __name: "CommandEditableSelect",
  props: {
    cmd: {},
    options: {},
    width: {},
    type: {},
    validateInput: { type: Function }
  },
  setup(e) {
    const A = B(), t = e, n = C(() => A == null ? void 0 : A.getters["command/can"](t.cmd)), a = C(() => A == null ? void 0 : A.getters["command/getVal"](t.cmd)), l = I(V);
    function i(d) {
      const u = { value: d };
      l.run(t.cmd, u), A.commit("command/setState", {
        cmd: t.cmd,
        ui: { value: d }
      });
    }
    return (d, u) => (D(), j(r(ie), {
      "model-value": a.value,
      "onUpdate:modelValue": i,
      options: e.options,
      disabled: !n.value,
      width: e.width,
      "validate-input": e.validateInput,
      type: e.type
    }, null, 8, ["model-value", "options", "disabled", "width", "validate-input", "type"]));
  }
}), _t = { class: "trigger-wrapper" }, $t = /* @__PURE__ */ H({
  __name: "CommandSmallIconPopoverButton",
  props: {
    cmd: {},
    tooltip: {},
    x: {},
    y: {}
  },
  emits: ["close", "open", "clickoutside"],
  setup(e, { emit: A }) {
    const t = B(), n = e, a = C(() => t == null ? void 0 : t.getters["command/can"](n.cmd)), l = I(V), i = b(!1), d = b(!1), u = A;
    tA(i, (X) => {
      d.value = X, u(X ? "open" : "close", m);
    });
    function h() {
      u("clickoutside", w);
    }
    function m(X) {
      const f = { value: X };
      l.run(n.cmd, f);
    }
    function w() {
      i.value = !1;
    }
    return (X, f) => (D(), R("div", null, [
      s(r(ue), {
        trigger: "manual",
        show: i.value,
        "onUpdate:show": f[1] || (f[1] = (v) => i.value = v),
        onClickoutside: h
      }, {
        trigger: P(() => [
          L("div", _t, [
            s(r(SA), {
              "resource-image": r(S).image,
              disabled: !a.value,
              x: e.x,
              y: e.y,
              "image-width": r(S).width,
              tooltip: e.tooltip,
              "sub-showing": d.value,
              onClick: f[0] || (f[0] = (v) => i.value = !i.value)
            }, null, 8, ["resource-image", "disabled", "x", "y", "image-width", "tooltip", "sub-showing"])
          ])
        ]),
        default: P(() => [
          ZA(X.$slots, "popover", {
            runCommand: m,
            close: w
          }, void 0, !0)
        ]),
        _: 3
      }, 8, ["show"])
    ]));
  }
}), An = /* @__PURE__ */ G($t, [["__scopeId", "data-v-afb10e11"]]), en = { class: "menu-item" }, tn = { class: "menu-item-label" }, nn = /* @__PURE__ */ H({
  __name: "CommandColorPaletteMenuText",
  props: {
    text: {},
    val: {},
    space: {},
    x: {},
    y: {}
  },
  emits: ["select", "show"],
  setup(e, { emit: A }) {
    const t = B(), n = C(() => t == null ? void 0 : t.getters["file/recentColors"]), a = I(V);
    let l = b([]), i = b([]);
    const u = b(e.val), h = C(() => u.value ? u.value.hex ? XA(u.value.hex) : u.value : "rgb(0, 0, 0)"), m = A;
    function w(f) {
      typeof f != "string" && f.hex ? u.value = XA(f.hex) : u.value = f, m("select", f), t.commit("file/addRecentColors", f);
    }
    function X(f) {
      var v;
      if (m("show", f), f) {
        let y = t == null ? void 0 : t.getters["file/colorPalette"];
        if (!y) {
          const T = (v = a.api) == null ? void 0 : v.getPalette();
          T && (y = MA(T), t.commit("file/setColorPalette", y));
        }
        l.value = y == null ? void 0 : y.standardColors, i.value = y == null ? void 0 : y.themeColors;
      }
    }
    return (f, v) => {
      const y = Q("n-icon");
      return D(), j(r(YA), {
        val: h.value,
        "standard-colors": r(l),
        "theme-colors": r(i),
        "recent-colors": n.value,
        placement: "right",
        onSelect: w,
        onShow: X,
        space: e.space
      }, {
        default: P(() => [
          L("div", en, [
            L("span", tn, [
              s(r(EA), {
                x: e.x,
                y: e.y,
                size: 16,
                source: r(S).image,
                "image-width": r(S).width,
                "show-color-cube": !0,
                color: h.value,
                style: { "margin-right": "10px" }
              }, null, 8, ["x", "y", "source", "image-width", "color"]),
              sA(" " + Z(e.text), 1)
            ]),
            s(y, { size: "12" }, {
              default: P(() => [
                s(r(GA))
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }, 8, ["val", "standard-colors", "theme-colors", "recent-colors", "space"]);
    };
  }
}), on = /* @__PURE__ */ G(nn, [["__scopeId", "data-v-aa943fad"]]), an = { class: "menu-item" }, ln = { class: "menu-item-label" }, rn = { class: "border-style-sample" }, sn = /* @__PURE__ */ H({
  __name: "BorderStylesMenuText",
  props: {
    text: {},
    val: {},
    space: {}
  },
  emits: ["show", "select"],
  setup(e, { emit: A }) {
    const t = b(!1), n = A;
    tA(t, (d) => {
      n("show", d);
    });
    const a = [
      {
        value: "hair",
        sampleX: 0,
        sampleY: -185
      },
      {
        value: "dashDotDot",
        sampleX: -160,
        sampleY: -185
      },
      {
        value: "dashDot",
        sampleX: -323,
        sampleY: -185
      },
      {
        value: "dotted",
        sampleX: -486,
        sampleY: -185
      },
      {
        value: "dashed",
        sampleX: -649,
        sampleY: -185
      },
      {
        value: "thin",
        sampleX: -812,
        sampleY: -185
      },
      {
        value: "mediumDashDotDot",
        sampleX: -972.5,
        sampleY: -185
      },
      {
        value: "slantDashDot",
        sampleX: -1135,
        sampleY: -185
      },
      {
        value: "mediumDashDot",
        sampleX: -1298,
        sampleY: -185
      },
      {
        value: "mediumDashed",
        sampleX: -1461,
        sampleY: -185
      },
      {
        value: "medium",
        sampleX: -1624,
        sampleY: -185
      },
      {
        value: "thick",
        sampleX: -1784.5,
        sampleY: -185
      },
      {
        value: "double",
        sampleX: -1945,
        sampleY: -185
      }
    ];
    function l(d, u) {
      return {
        backgroundRepeat: "no-repeat",
        display: "inline-block",
        backgroundImage: `url("${S.image}")`,
        backgroundPosition: `${d * 2}px ${u * 2}px`,
        backgroundSize: `${S.width}px auto`,
        transform: "scale(0.5)",
        transformOrigin: "top left",
        width: "320px",
        height: "6px"
      };
    }
    function i(d) {
      n("select", d), t.value = !1;
    }
    return (d, u) => {
      const h = Q("n-icon");
      return D(), R("div", null, [
        s(r(KA), {
          show: t.value,
          "onUpdate:show": u[0] || (u[0] = (m) => t.value = m),
          options: a,
          onSelect: i,
          placement: "right-start",
          "max-height": 400,
          space: e.space
        }, {
          option: P(({ item: m }) => [
            L("div", rn, [
              L("span", {
                style: hA(l(m.sampleX, m.sampleY))
              }, null, 4)
            ])
          ]),
          default: P(() => [
            L("div", an, [
              L("span", ln, [
                s(r(EA), {
                  x: -788,
                  y: -56,
                  "image-width": r(S).width,
                  source: r(S).image,
                  size: 16,
                  style: { "margin-right": "10px" }
                }, null, 8, ["image-width", "source"]),
                sA(" " + Z(e.text), 1)
              ]),
              s(h, { size: "12" }, {
                default: P(() => [
                  s(r(GA))
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["show", "space"])
      ]);
    };
  }
}), un = /* @__PURE__ */ G(sn, [["__scopeId", "data-v-78667d20"]]), dn = { class: "global-basic-display-text border-panel-label" }, cn = ["onClick"], mn = { class: "content" }, fn = { class: "global-basic-display-text border-panel-label" }, hn = /* @__PURE__ */ H({
  __name: "BorderDropdownMenu",
  setup(e) {
    const A = b(!1);
    function t(w) {
      A.value != !0 && w && w();
    }
    const n = b(""), a = b(""), l = [
      {
        // 所有框线
        key: "all",
        x: -548,
        y: -56
      },
      {
        // 无框线
        key: "none",
        x: -628,
        y: -56
      },
      {
        // 内框线
        key: "inner",
        x: -528,
        y: -56
      },
      {
        // 外侧框线
        key: "outer",
        x: -568,
        y: -56
      },
      {
        // 对角线上边框
        key: "diagonalUp",
        x: -588,
        y: -56
      },
      {
        // 对角线下边框
        key: "diagonalDown",
        x: -608,
        y: -56
      },
      {
        // 左边框
        key: "left",
        x: -728,
        y: -56
      },
      {
        // 垂直内线
        key: "verticalInner",
        x: -748,
        y: -56
      },
      {
        // 右边框
        key: "right",
        x: -708,
        y: -56
      },
      {
        // 上边框
        key: "top",
        x: -668,
        y: -56
      },
      {
        // 水平内线
        key: "horizontalInner",
        x: -648,
        y: -56
      },
      {
        // 下边框
        key: "bottom",
        x: -688,
        y: -56
      }
    ];
    function i() {
      n.value || (n.value = "rgb(0, 0, 0)"), a.value = "thin";
    }
    function d(w, X, f) {
      w.key === "none" && (a.value = "none", n.value = ""), X({
        position: w.key,
        color: n.value,
        style: a.value
      }), f();
    }
    function u(w) {
      n.value = w;
    }
    function h(w) {
      a.value = w;
    }
    function m(w) {
      setTimeout(() => {
        A.value = w;
      }, 200);
    }
    return (w, X) => (D(), j(An, {
      cmd: r(o).Border,
      x: -548,
      y: -56,
      tooltip: w.$t("toolbar.start.border.title"),
      onOpen: i,
      onClickoutside: t
    }, {
      popover: P(({ runCommand: f, close: v }) => [
        s(r(de), { "max-height": 600 }, {
          default: P(() => [
            L("div", dn, Z(w.$t("toolbar.start.border.title")), 1),
            (D(), R(ce, null, me(l, (y) => L("div", {
              key: y.key,
              class: "global-menu-list-item menu-text",
              onClick: (T) => d(y, f, v)
            }, [
              L("span", mn, [
                s(r(EA), {
                  x: y.x,
                  y: y.y,
                  source: r(S).image,
                  size: 16,
                  "image-width": r(S).width,
                  style: { "margin-right": "10px" }
                }, null, 8, ["x", "y", "source", "image-width"]),
                L("span", null, Z(w.$t("toolbar.start.border.type." + y.key)), 1)
              ])
            ], 8, cn)), 64)),
            s(r(eA), { margin: "8px 0" }),
            L("div", fn, Z(w.$t("toolbar.start.border.style")), 1),
            s(on, {
              text: w.$t("toolbar.start.border.borderColor"),
              onSelect: u,
              x: -768.5,
              y: -56,
              onShow: m,
              val: n.value,
              class: "global-menu-list-item menu-text",
              space: 23
            }, null, 8, ["text", "val"]),
            s(un, {
              text: w.$t("toolbar.start.border.borderStyle"),
              onSelect: h,
              onShow: m,
              class: "global-menu-list-item menu-text",
              space: 23
            }, null, 8, ["text"])
          ]),
          _: 2
        }, 1024)
      ]),
      _: 1
    }, 8, ["cmd", "tooltip"]));
  }
}), pn = /* @__PURE__ */ G(hn, [["__scopeId", "data-v-99d27a5f"]]), vn = {
  common: {
    confirm: "Confirm",
    cancel: "Cancel",
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
      cut: "Cut",
      paste: "Paste",
      bold: "Bold",
      italic: "Italic",
      underline: "Underline",
      strikeout: "Strikeout",
      fontClolor: "Font Clolor",
      fillClolor: "Fill Clolor",
      verticalAlignTop: "Align Top",
      verticalAlignCenter: "Align Center",
      verticalAlignBottom: "Align Bottom",
      horizontalAlignLeft: "Align Left",
      horizontalAlignCenter: "Align Center",
      horizontalAlignRight: "Align Right",
      horizontalAlignJustify: "Align Justify",
      horizontalAlignDistribute: "Align Distribute",
      numFormat: {
        general: "General",
        num: "Num",
        scientificNotation: "Scientific Notation",
        accounting: "Accounting",
        currency: "Currency",
        date: "Date",
        time: "Time",
        percentage: "Percentage",
        fraction: "Fraction",
        text: "Text",
        decimalIncrease: "Increase Decimal",
        decimalDecrease: "Decrease Decimal",
        currencyList: {
          RMB: "RMB",
          Dollar: "Dollar",
          EUR: "EUR",
          GBP: "GBP",
          JPY: "JPY",
          none: "None"
        }
      },
      border: {
        title: "BORDER",
        type: {
          all: "All",
          none: "None",
          inner: "Inner",
          outer: "Outer",
          diagonalUp: "Diagonal Up",
          diagonalDown: "Diagonal Down",
          left: "Left",
          verticalInner: "Vertical Inner",
          right: "Right",
          top: "Top",
          horizontalInner: "Horizontal Inner",
          bottom: "Bottom"
        },
        style: "STYLE",
        borderColor: "Border Color",
        borderStyle: "Border Style"
      },
      search: "Search",
      findPlaceHolder: "Please input search content",
      next: "Next",
      prev: "Prev"
    }
  },
  statusBar: {
    fullscreen: "Full Screen"
  },
  dropDown: {
    pane: {
      freeze: "Freeze Panes",
      unfreeze: "Unfreeze Panes",
      clearContent: "Clear Content"
    },
    row: {
      insert: "Insert Row",
      del: "Delete Row",
      hide: "Hide Row",
      unhide: "Unhide Row",
      setHeight: "Set Row Height",
      clearContent: "Clear Content"
    },
    column: {
      insert: "Insert Column",
      del: "Delete Column",
      hide: "Hide Column",
      unhide: "Unhide Column",
      setWidth: "Set Column Width",
      clearContent: "Clear Content"
    },
    sheet: {
      insert: "Insert Worksheet",
      rename: "Rename Worksheet",
      delCurrent: "Delete Current Worksheet"
    }
  },
  dialog: {
    sheetRename: {
      title: "Rename Sheet"
    },
    sheetDelete: {
      title: "Delete Sheet",
      info: "Are you sure you want to delete this worksheet?"
    },
    columnWidthSet: {
      title: "Set Column Width",
      unit: "CHAR",
      errorMessageNum: "Column width must be between 0 and 255 characters"
    },
    rowHeightSet: {
      title: "Set Row Height",
      unit: "PT",
      errorMessageNum: "Row height must be between 0 and 409"
    }
  }
}, gn = qA(fe, vn), _A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gn
}, Symbol.toStringTag, { value: "Module" })), bn = {
  common: {
    confirm: "确定",
    cancel: "取消",
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
      cut: "剪切",
      paste: "粘贴",
      bold: "粗体",
      italic: "斜体",
      underline: "下划线",
      strikeout: "删除线",
      fontClolor: "字体颜色",
      fillClolor: "填充颜色",
      verticalAlignTop: "顶端对齐",
      verticalAlignCenter: "垂直居中",
      verticalAlignBottom: "底部对齐",
      horizontalAlignLeft: "左对齐",
      horizontalAlignCenter: "居中对齐",
      horizontalAlignRight: "右对齐",
      horizontalAlignJustify: "两端对齐",
      horizontalAlignDistribute: "分散对齐",
      numFormat: {
        general: "常规",
        num: "数值",
        scientificNotation: "科学计数法",
        accounting: "会计",
        currency: "货币",
        date: "日期",
        time: "时间",
        percentage: "百分比",
        fraction: "分数",
        text: "文本",
        decimalIncrease: "增加小数位",
        decimalDecrease: "减少小数位",
        currencyList: {
          RMB: "人民币",
          Dollar: "美元",
          EUR: "欧元",
          GBP: "英镑",
          JPY: "日元",
          none: "无"
        }
      },
      border: {
        title: "边框",
        type: {
          all: "所有框线",
          none: "无框线",
          inner: "内框线",
          outer: "外侧框线",
          diagonalUp: "对角线上边框",
          diagonalDown: "对角线下边框",
          left: "左边框",
          verticalInner: "垂直内线",
          right: "右边框",
          top: "上边框",
          horizontalInner: "水平内线",
          bottom: "下边框"
        },
        style: "样式",
        borderColor: "边框颜色",
        borderStyle: "边框样式"
      },
      search: "搜索",
      findPlaceHolder: "请输入查找内容",
      next: "下一个",
      prev: "上一个"
    }
  },
  statusBar: {
    fullscreen: "全屏"
  },
  dropDown: {
    pane: {
      freeze: "冻结窗格",
      unfreeze: "取消冻结窗格",
      clearContent: "清除内容"
    },
    row: {
      insert: "插入行",
      del: "删除行",
      hide: "隐藏行",
      unhide: "取消隐藏行",
      setHeight: "设置行高",
      clearContent: "清除内容"
    },
    column: {
      insert: "插入列",
      del: "删除列",
      hide: "隐藏列",
      unhide: "取消隐藏列",
      setWidth: "设置列宽",
      clearContent: "清除内容"
    },
    sheet: {
      insert: "插入工作簿",
      rename: "重命名工作簿",
      delCurrent: "删除当前工作簿"
    }
  },
  dialog: {
    sheetRename: {
      title: "重命名工作簿"
    },
    sheetDelete: {
      title: "删除工作簿",
      info: "永久删除此工作簿。是否继续?"
    },
    columnWidthSet: {
      title: "设置列宽",
      unit: "字符",
      errorMessageNum: "列宽必须在0至255字符之间"
    },
    rowHeightSet: {
      title: "设置行高",
      unit: "磅",
      errorMessageNum: "行高必须在0至409之间"
    }
  }
}, wn = qA(he, bn), $A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wn
}, Symbol.toStringTag, { value: "Module" })), yn = /* @__PURE__ */ Object.assign({ "./en-US.ts": _A, "./zh-CN.ts": $A }), Pn = /* @__PURE__ */ Object.assign({ "./en-US.ts": _A, "./zh-CN.ts": $A });
function Cn() {
  let e = {};
  return jA(yn, e), jA(Pn, e), e;
}
function jA(e, A) {
  for (let t in e)
    if (e[t].default) {
      let n = t.substr(t.lastIndexOf("/") + 1, 5);
      A[n] ? A[n] = {
        ...e[n],
        ...e[t].default
      } : A[n] = e[t].default;
    }
}
let lA = "zh-CN";
function Dn(e) {
  return lA = e || lA, pe({
    legacy: !1,
    locale: lA,
    messages: Cn(),
    globalInjection: !0
  });
}
const xn = { class: "toolbar-group" }, Sn = /* @__PURE__ */ H({
  __name: "TextStyleGroup",
  setup(e) {
    const A = b([]), t = ve("xlsx", lA);
    async function n() {
      (oA == null || oA.length == 0) && await be(), oA && oA.length !== A.value.length && (A.value = oA.map(({ fullName: a }) => ({
        label: a,
        value: a
      })));
    }
    return (a, l) => {
      const i = Q("n-space");
      return D(), R("div", xn, [
        s(i, { vertical: "" }, {
          default: P(() => [
            s(i, null, {
              default: P(() => [
                L("span", { onClick: n }, [
                  s(WA, {
                    cmd: r(o).FontName,
                    options: A.value,
                    width: 140,
                    type: "font"
                  }, null, 8, ["cmd", "options"])
                ]),
                s(WA, {
                  cmd: r(o).FontSize,
                  options: r(t),
                  width: 70,
                  "validate-input": r(ge)
                }, null, 8, ["cmd", "options", "validate-input"])
              ]),
              _: 1
            }),
            s(i, null, {
              default: P(() => [
                s(fA, {
                  cmd: r(o).Bold,
                  x: -432,
                  y: -56,
                  tooltip: a.$t("toolbar.start.bold"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                s(fA, {
                  cmd: r(o).Italic,
                  x: -448,
                  y: -56,
                  tooltip: a.$t("toolbar.start.italic"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                s(fA, {
                  cmd: r(o).Underline,
                  x: -464,
                  y: -56,
                  tooltip: a.$t("toolbar.start.underline"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                s(fA, {
                  cmd: r(o).Strikeout,
                  x: -480,
                  y: -56,
                  tooltip: a.$t("toolbar.start.strikeout"),
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                s(pn),
                s(IA, {
                  cmd: r(o).FontColor,
                  x: -496,
                  y: -56,
                  tooltip: a.$t("toolbar.start.fontClolor"),
                  class: "global-small-icon-dropdown-button"
                }, null, 8, ["cmd", "tooltip"]),
                s(IA, {
                  cmd: r(o).FillColor,
                  x: -320,
                  y: -56,
                  tooltip: a.$t("toolbar.start.fillClolor"),
                  "show-fill": !0,
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
}), En = /* @__PURE__ */ G(Sn, [["__scopeId", "data-v-21386e0d"]]), Fn = { style: { display: "flex", gap: "8px" } }, Xn = /* @__PURE__ */ H({
  __name: "UndoRedoGroup",
  setup(e) {
    return (A, t) => (D(), R("div", Fn, [
      s($, {
        cmd: r(o).Undo,
        label: A.$t("toolbar.start.undo"),
        x: -96,
        y: -30
      }, null, 8, ["cmd", "label"]),
      s($, {
        cmd: r(o).Redo,
        label: A.$t("toolbar.start.redo"),
        x: -72,
        y: -30
      }, null, 8, ["cmd", "label"])
    ]));
  }
}), bA = /* @__PURE__ */ H({
  __name: "CommandSmallButtonNonActive",
  props: {
    cmd: {},
    tooltip: {},
    x: {},
    y: {},
    val: {}
  },
  setup(e) {
    const A = B(), t = e, n = C(() => A == null ? void 0 : A.getters["command/can"](t.cmd)), a = I(V);
    function l() {
      const i = { value: t.val };
      a.run(t.cmd, i);
    }
    return (i, d) => (D(), j(r(K), {
      onClick: l,
      "resource-image": r(S).image,
      disabled: !n.value,
      x: e.x,
      y: e.y,
      tooltip: e.tooltip,
      "image-width": r(S).width
    }, null, 8, ["resource-image", "disabled", "x", "y", "tooltip", "image-width"]));
  }
}), On = /* @__PURE__ */ H({
  __name: "CommandSmallDropDownButton",
  props: {
    cmd: {},
    tooltip: {},
    x: {},
    y: {},
    imageWidth: {},
    dropdownOptions: {}
  },
  setup(e) {
    const A = B(), t = e, n = C(() => A == null ? void 0 : A.getters["command/can"](t.cmd)), a = I(V), l = b(!1);
    function i(u) {
      d(u);
    }
    function d(u) {
      const h = { value: u };
      a.run(t.cmd, h);
    }
    return (u, h) => (D(), R("div", null, [
      s(r(QA), {
        trigger: "click",
        placement: "bottom-start",
        options: e.dropdownOptions,
        onSelect: i,
        "onUpdate:show": h[0] || (h[0] = (m) => l.value = m)
      }, {
        default: P(() => [
          L("span", null, [
            s(r(SA), {
              "resource-image": r(S).image,
              disabled: !n.value,
              x: e.x,
              y: e.y,
              "image-width": r(S).width,
              tooltip: e.tooltip,
              "sub-showing": l.value
            }, null, 8, ["resource-image", "disabled", "x", "y", "image-width", "tooltip", "sub-showing"])
          ])
        ]),
        _: 1
      }, 8, ["options"])
    ]));
  }
}), Hn = /* @__PURE__ */ H({
  __name: "CommandSelectNumFormat",
  props: {
    show: { type: Boolean },
    cmd: {}
  },
  emits: ["update:show"],
  setup(e, { emit: A }) {
    const { t } = vA(), n = B(), a = e, l = A, i = I(V), d = C(() => a.show == !0 ? {
      backgroundColor: "var(--disable-button-border)"
    } : {
      backgroundColor: "transparent"
    }), u = C(() => n == null ? void 0 : n.getters["command/can"](a.cmd)), h = C(
      () => (n == null ? void 0 : n.getters["file/numFormatListValues"]) || []
    ), m = C(() => {
      let N = n == null ? void 0 : n.getters["command/getVal"](a.cmd);
      return N || (N = h.value[0]), N && !h.value.includes(N) && (N = h.value[0]), N;
    }), w = C(() => {
      const N = f.value.find((F) => F.value == m.value);
      return N ? N.label : "";
    }), X = b(!1);
    let f = v();
    function v() {
      const N = X.value ? i.api.getNumformatExamples(h.value) : [];
      return C(
        () => [
          "general",
          "num",
          "scientificNotation",
          "accounting",
          "currency",
          "date",
          "time",
          "percentage",
          "fraction",
          "text"
        ].map((F, g) => {
          var O, c;
          return {
            label: t("toolbar.start.numFormat." + F),
            value: ((O = h.value) == null ? void 0 : O[g]) || "",
            example: X.value ? N[g] || "" : void 0,
            checked: m.value == ((c = h.value) == null ? void 0 : c[g])
          };
        })
      );
    }
    function y(N) {
      l("update:show", N), N && (X.value = !0, f = v());
    }
    function T(N) {
      const F = { value: N };
      i.run(a.cmd, F);
    }
    return (N, F) => {
      const g = Q("n-icon");
      return D(), R("div", null, [
        s(r(KA), {
          show: e.show,
          options: r(f),
          disabled: !u.value,
          currentVal: m.value,
          onSelect: T,
          "onUpdate:show": y,
          showChecked: !0
        }, {
          option: P(({ item: O, checked: c }) => [
            ZA(N.$slots, "option", {
              item: O,
              checked: c
            }, void 0, !0)
          ]),
          default: P(() => [
            L("span", null, [
              s(r(PA), {
                readonly: !0,
                placeholder: "",
                value: w.value,
                disabled: !u.value
              }, {
                suffix: P(() => [
                  s(g, {
                    class: "arrow",
                    size: "12",
                    style: hA(d.value)
                  }, {
                    default: P(() => [
                      OA(s(r(we), null, null, 512), [
                        [HA, e.show]
                      ]),
                      OA(s(r(ye), null, null, 512), [
                        [HA, !e.show]
                      ])
                    ]),
                    _: 1
                  }, 8, ["style"])
                ]),
                _: 1
              }, 8, ["value", "disabled"])
            ])
          ]),
          _: 3
        }, 8, ["show", "options", "disabled", "currentVal"])
      ]);
    };
  }
}), Nn = /* @__PURE__ */ G(Hn, [["__scopeId", "data-v-fb88dfd8"]]), Ln = { class: "toolbar-group" }, kn = { class: "num-size-option" }, zn = /* @__PURE__ */ H({
  __name: "NumFormatGroup",
  setup(e) {
    const A = b(!1);
    return (t, n) => {
      const a = Q("n-ellipsis"), l = Q("n-space");
      return D(), R("div", Ln, [
        s(l, { vertical: "" }, {
          default: P(() => [
            s(l, null, {
              default: P(() => [
                s(Nn, {
                  cmd: r(o).NumFormat,
                  class: "num-format-select",
                  show: A.value,
                  "onUpdate:show": n[0] || (n[0] = (i) => A.value = i)
                }, {
                  option: P(({ item: i, checked: d }) => [
                    L("div", kn, [
                      L("div", {
                        class: Pe(["global-basic-display-text num-label", i.example != "" ? "bolder-label" : ""]),
                        style: hA(d ? { color: "white" } : {})
                      }, Z(i.label), 7),
                      i.example ? (D(), R("div", {
                        key: 0,
                        class: "global-basic-display-text num-desp",
                        style: hA(d ? { color: "white" } : {})
                      }, [
                        s(a, { style: { "max-width": "200px" } }, {
                          default: P(() => [
                            sA(Z(i.example), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ], 4)) : _("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["cmd", "show"])
              ]),
              _: 1
            }),
            s(l, null, {
              default: P(() => [
                s(bA, {
                  cmd: r(o).Percent,
                  x: -272,
                  y: -56,
                  tooltip: t.$t("toolbar.start.numFormat.percentage"),
                  val: "percentage",
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                s(On, {
                  class: "global-small-icon-dropdown-button",
                  cmd: r(o).Accounting,
                  x: -256,
                  y: -56,
                  tooltip: t.$t("toolbar.start.numFormat.currency"),
                  dropdownOptions: [
                    {
                      key: "RMB",
                      label: t.$t("toolbar.start.numFormat.currencyList.RMB")
                    },
                    {
                      key: "Dollar",
                      label: t.$t("toolbar.start.numFormat.currencyList.Dollar")
                    },
                    {
                      key: "EUR",
                      label: t.$t("toolbar.start.numFormat.currencyList.EUR")
                    },
                    {
                      key: "GBP",
                      label: t.$t("toolbar.start.numFormat.currencyList.GBP")
                    },
                    {
                      key: "JPY",
                      label: t.$t("toolbar.start.numFormat.currencyList.JPY")
                    },
                    {
                      key: "none",
                      label: t.$t("toolbar.start.numFormat.currencyList.none")
                    }
                  ]
                }, null, 8, ["cmd", "tooltip", "dropdownOptions"]),
                s(bA, {
                  cmd: r(o).IncCellDigits,
                  x: -288,
                  y: -56,
                  tooltip: t.$t("toolbar.start.numFormat.decimalIncrease"),
                  val: "decimalIncrease",
                  class: "global-small-icon-button"
                }, null, 8, ["cmd", "tooltip"]),
                s(bA, {
                  cmd: r(o).DecCellDigits,
                  x: -304,
                  y: -56,
                  tooltip: t.$t("toolbar.start.numFormat.decimalDecrease"),
                  val: "decimalDecrease",
                  class: "global-small-icon-button"
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
}), Rn = /* @__PURE__ */ G(zn, [["__scopeId", "data-v-e8d5843e"]]), Tn = { style: { display: "flex", gap: "8px" } }, In = /* @__PURE__ */ H({
  __name: "SearchWordButton",
  setup(e) {
    return (A, t) => (D(), R("div", Tn, [
      s($, {
        cmd: r(o).Search,
        label: A.$t("toolbar.start.search"),
        x: -120,
        y: -30
      }, null, 8, ["cmd", "label"])
    ]));
  }
}), Wn = { class: "toolbar-container" }, jn = {
  key: 0,
  class: "ribbon-content"
}, Bn = {
  key: 1,
  class: "ribbon-content"
}, Vn = /* @__PURE__ */ H({
  __name: "ExcelRibbon",
  setup(e) {
    const A = B(), t = C(() => A == null ? void 0 : A.getters["file/title"]), n = b("start");
    return (a, l) => (D(), R("div", null, [
      L("div", Wn, [
        s(r(Ce), {
          documentTitle: t.value,
          logoSrc: r(Bt),
          class: "toolbar-prefix"
        }, null, 8, ["documentTitle", "logoSrc"]),
        s(r(De), {
          modelValue: n.value,
          "onUpdate:modelValue": l[0] || (l[0] = (i) => n.value = i),
          tabs: [
            { name: "file", label: a.$t("toolbar.file.title") },
            { name: "start", label: a.$t("toolbar.start.title") }
          ]
        }, null, 8, ["modelValue", "tabs"]),
        l[1] || (l[1] = L("div", { class: "toolbar-suffix" }, null, -1))
      ]),
      L("div", null, [
        n.value == "file" ? (D(), R("div", jn, [
          s(r(Qt))
        ])) : _("", !0),
        n.value == "start" ? (D(), R("div", Bn, [
          s(r(Xn)),
          s(r(eA), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(r(Mt)),
          s(r(eA), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(r(En)),
          s(r(eA), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(r(Jt)),
          s(r(eA), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(r(Rn)),
          s(r(eA), {
            vertical: !0,
            height: 65,
            margin: "0px 8px"
          }),
          s(r(In))
        ])) : _("", !0)
      ])
    ]));
  }
}), Un = /* @__PURE__ */ G(Vn, [["__scopeId", "data-v-ed6a2b57"]]), Qn = { class: "zoom-wrapper" }, Yn = /* @__PURE__ */ H({
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
  setup(e) {
    const A = B(), t = e, n = C(() => A == null ? void 0 : A.getters["command/can"](t.cmd)), a = C(() => A == null ? void 0 : A.getters["command/getVal"](t.cmd)), l = I(V);
    function i(d) {
      const u = { value: d };
      l.run(t.cmd, u), A.commit("command/setState", {
        cmd: o.Zoom,
        ui: {
          value: d
        }
      });
    }
    return (d, u) => (D(), R("div", Qn, [
      s(r(xe), {
        modelValue: a.value,
        "onUpdate:modelValue": u[0] || (u[0] = (h) => a.value = h),
        onChange: i,
        min: e.min,
        max: e.max,
        width: e.width,
        disabled: !n.value
      }, null, 8, ["modelValue", "min", "max", "width", "disabled"]),
      s(r(Se), {
        modelValue: a.value,
        "onUpdate:modelValue": [
          u[1] || (u[1] = (h) => a.value = h),
          i
        ],
        disabled: !n.value,
        min: e.min,
        max: e.max
      }, null, 8, ["modelValue", "disabled", "min", "max"])
    ]));
  }
}), Mn = /* @__PURE__ */ G(Yn, [["__scopeId", "data-v-4279db35"]]), Zn = { class: "status-bar" }, Gn = { class: "left" }, qn = { class: "right" }, Kn = /* @__PURE__ */ H({
  __name: "StatusBar",
  setup(e) {
    const A = B(), t = C(() => A == null ? void 0 : A.getters["file/loadingRatio"]), n = C(
      () => A == null ? void 0 : A.getters["file/showLoadingProgressBar"]
    ), a = C(() => A == null ? void 0 : A.getters["command/loadEnd"]);
    function l() {
      Fe(document.getElementById("main"), !0);
    }
    return (i, d) => (D(), R("div", Zn, [
      L("div", Gn, [
        n.value ? (D(), j(r(Ee), {
          key: 0,
          percentage: t.value,
          class: "progress-bar"
        }, null, 8, ["percentage"])) : _("", !0)
      ]),
      d[0] || (d[0] = L("div", { class: "spacer" }, null, -1)),
      L("div", qn, [
        s(Mn, {
          cmd: r(o).Zoom,
          step: 1
        }, null, 8, ["cmd"]),
        s(r(K), {
          onClick: l,
          "resource-image": r(S).image,
          x: -32,
          y: -56,
          "button-size": 24,
          "image-width": r(S).width,
          tooltip: i.$t("statusBar.fullscreen"),
          class: "global-medium-icon-button",
          disabled: !a.value
        }, null, 8, ["resource-image", "image-width", "tooltip", "disabled"])
      ])
    ]));
  }
}), Jn = /* @__PURE__ */ G(Kn, [["__scopeId", "data-v-a2d52542"]]), _n = Xe({
  components: [
    Oe,
    He,
    Ne,
    Le,
    ke,
    ze,
    Re,
    Te,
    Ie,
    We,
    je,
    Be,
    Ve,
    Ue,
    Qe,
    Ye,
    Me,
    Ze,
    Ge,
    qe,
    Ke,
    Je,
    _e,
    $e,
    At,
    et,
    tt,
    nt,
    ot,
    at,
    lt,
    rt,
    st,
    it,
    ut,
    dt,
    ct
  ]
});
function $n(e) {
  e.use(_n);
}
function Ao() {
  switch (lA) {
    case "zh-CN":
      return NA;
    case "en-US":
      return mt;
  }
  return NA;
}
function eo() {
  return {
    common: {
      primaryColor: "#007F50",
      // 主色
      primaryColorHo55r: "#007F50",
      // hover 主色
      primaryColorPressed: "#007F50",
      // 按下色
      primaryColorSuppl: "#007F50"
      // 补充主色
    }
  };
}
function to(e) {
  e.registerHandler(o.Bold, {
    run: (A, t) => A.setBold(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.Bold, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.Bold,
      enabled: !0
    });
  });
}
function no(e) {
  e.registerHandler(o.Underline, {
    run: (A, t) => A.setUnderline(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.Underline, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.Underline,
      enabled: !0
    });
  });
}
function oo(e) {
  e.registerHandler(o.Border, {
    run: (A, t) => A.setBorder(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.Border, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.Border,
      enabled: !0
    });
  });
}
function ao(e) {
  e.registerHandler(o.Strikeout, {
    run: (A, t) => A.setStrikeout(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.Strikeout, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.Strikeout,
      enabled: !0
    });
  });
}
function lo(e) {
  e.registerHandler(o.Italic, {
    run: (A, t) => A.setItalic(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.Italic, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.Italic,
      enabled: !0
    });
  });
}
function ro(e) {
  e.registerHandler(o.FontSize, {
    run: (A, t) => A.setFontSize(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.FontSize, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.FontSize,
      enabled: !0
    });
  });
}
function so(e) {
  e.registerHandler(o.FontColor, {
    run: (A, t) => A.setFontColor(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.FontColor, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.FontColor,
      enabled: !0
    });
  });
}
function io(e) {
  e.registerHandler(o.FillColor, {
    run: (A, t) => A.setFillColor(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.FillColor, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.FillColor,
      enabled: !0
    });
  });
}
function uo(e) {
  e.registerHandler(o.AlignHorizontal, {
    run: (A, t) => A.setAlignHorizontalUI(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.AlignHorizontal, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.AlignHorizontal,
      enabled: !0
    });
  });
}
function co(e) {
  e.registerHandler(o.AlignVertical, {
    run: (A, t) => A.setAlignVerticalUI(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.AlignVertical, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.AlignVertical,
      enabled: !0
    });
  });
}
function mo(e) {
  e.registerHandler(o.FontName, {
    run: (A, t) => A.setFontName(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.FontName, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.FontName,
      enabled: !0
    });
  });
}
function fo(e) {
  e.registerHandler(o.Undo, {
    run: (A) => A.undo(),
    refresh: /* @__PURE__ */ new Set([E.UndoRedoChange])
  }), e.registerRefresher(o.Undo, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.Undo,
      enabled: A.api.canUndo()
    });
  });
}
function ho(e) {
  e.registerHandler(o.Redo, {
    run: (A) => A.redo(),
    refresh: /* @__PURE__ */ new Set([E.UndoRedoChange])
  }), e.registerRefresher(o.Redo, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.Redo,
      enabled: A.api.canRedo()
    });
  });
}
function po(e) {
  const A = /* @__PURE__ */ new Set([E.Init]);
  e.registerHandler(o.Copy, {
    run: (t) => t.copy()
  }), e.registerHandler(o.Cut, {
    run: (t) => t.cut(),
    refresh: A
  }), e.registerHandler(o.Paste, {
    run: (t) => t.paste(),
    refresh: A
  }), [o.Cut, o.Paste].forEach((t) => {
    e.registerRefresher(t, (n) => {
      n.canRefreshCommand(t) && n.store.commit("command/setEnabled", {
        cmd: t,
        enabled: !0
      });
    });
  });
}
function vo(e) {
  e.registerHandler(o.Zoom, {
    run: (A, t) => A.setZoom(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init, E.ZoomChange])
  }), e.registerRefresher(o.Zoom, (A) => {
    A.canRefreshCommand(o.Zoom) && (A.store.commit("command/setState", {
      cmd: o.Zoom,
      ui: {
        value: A.api.getZoom()
      }
    }), A.store.commit("command/setEnabled", {
      cmd: o.Zoom,
      enabled: !0
    }));
  });
}
function go(e) {
  e.registerHandler(o.Export, {
    run: async (A, t) => {
      await A.doExport("exportDocument");
    },
    refresh: /* @__PURE__ */ new Set([E.ExportReady])
  }), e.registerHandler(o.ExportPDF, {
    run: async (A, t) => {
      await A.doExport("exportPDF");
    },
    refresh: /* @__PURE__ */ new Set([E.ExportReady])
  }), e.registerRefresher(o.Export, (A) => {
    A.canRefreshCommand(o.Export) && A.store.commit("command/setEnabled", {
      cmd: o.Export,
      enabled: !0
    });
  }), e.registerRefresher(o.ExportPDF, (A) => {
    A.canRefreshCommand(o.ExportPDF) && A.store.commit("command/setEnabled", {
      cmd: o.ExportPDF,
      enabled: !0
    });
  });
}
function bo(e) {
  e.registerHandler(o.Open, {
    run: (A, t) => A.openFile(),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.Open, (A) => {
    A.canRefreshCommand(o.Open) && A.store.commit("command/setEnabled", {
      cmd: o.Open,
      enabled: !0
    });
  });
}
function wo(e) {
  e.registerHandler(o.NumFormat, {
    run: (A, t) => A.setNumFormat(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.NumFormat, (A) => {
    var n;
    if (!A.xlsReady) return;
    let t = (n = A.store) == null ? void 0 : n.getters["file/numFormatListValues"];
    (!t || t.length == 0) && (t = A.api.getCellAllFormats(), A.store.commit("file/setNumFormatListValues", t)), A.store.commit("command/setEnabled", {
      cmd: o.NumFormat,
      enabled: !0
    });
  });
}
function yo(e) {
  e.registerHandler(o.Accounting, {
    run: (A, t) => A.setAccounting(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.Accounting, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.Accounting,
      enabled: !0
    });
  });
}
function Po(e) {
  e.registerHandler(o.Percent, {
    run: (A, t) => A.setPercent(),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.Percent, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.Percent,
      enabled: !0
    });
  });
}
function Co(e) {
  e.registerHandler(o.IncCellDigits, {
    run: (A, t) => A.incCellDigits(),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.IncCellDigits, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.IncCellDigits,
      enabled: !0
    });
  }), e.registerHandler(o.DecCellDigits, {
    run: (A, t) => A.decCellDigits(),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.DecCellDigits, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.DecCellDigits,
      enabled: !0
    });
  });
}
function Do(e) {
  e.registerHandler(o.PaneOperations, {
    run: (A, t) => A.doPaneOperations(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.PaneOperations, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.PaneOperations,
      enabled: !0
    });
  });
}
function xo(e) {
  e.registerHandler(o.RowOperations, {
    run: (A, t) => A.doRowOperations(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.RowOperations, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.RowOperations,
      enabled: !0
    });
  });
}
function So(e) {
  e.registerHandler(o.ColumnOperations, {
    run: (A, t) => A.doColumnOperations(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.ColumnOperations, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.ColumnOperations,
      enabled: !0
    });
  });
}
function Eo(e) {
  e.registerHandler(o.SheetOperations, {
    run: (A, t) => A.doSheetOperations(t.value),
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.SheetOperations, (A) => {
    A.xlsReady && A.store.commit("command/setEnabled", {
      cmd: o.SheetOperations,
      enabled: !0
    });
  });
}
function Fo(e) {
  e.registerHandler(o.Search, {
    run: (A, t) => {
      if (!t) {
        e.store.commit("file/setShowFindDialog", !0);
        return;
      }
      const n = t.value;
      if (!n) return;
      switch (n.action) {
        case "search":
          A.searchWord(n.val, () => {
            a();
          });
          break;
        case "next":
          A.searchNext(), a();
          break;
        case "prev":
          A.searchPrevious(), a();
          break;
      }
      function a() {
        const l = A.searchStatusInfo();
        e.store.commit("command/setState", {
          cmd: o.Search,
          ui: {
            value: {
              countNum: l.countNum,
              totalCount: l.totalCount
            }
          }
        });
      }
    },
    refresh: /* @__PURE__ */ new Set([E.Init])
  }), e.registerRefresher(o.Search, (A) => {
    A.canRefreshCommand(o.Search) && A.store.commit("command/setEnabled", {
      cmd: o.Search,
      enabled: !0
    });
  });
}
function Xo() {
  const e = I(V);
  yo(e), to(e), no(e), oo(e), ao(e), lo(e), po(e), fo(e), ho(e), ro(e), so(e), io(e), mo(e), uo(e), co(e), vo(e), go(e), bo(e), wo(e), Po(e), Co(e), Do(e), xo(e), So(e), Eo(e), Fo(e);
}
const Oo = { class: "app-shell" }, Ho = { class: "app-stage" }, No = { id: "appContainer" }, Lo = /* @__PURE__ */ H({
  __name: "App",
  setup(e) {
    const A = B(), t = b(null), n = b(null), a = b(!0), l = b(null), i = b(null), d = b(null), u = b(!1), h = b(null), m = I(DA, null), w = C(
      () => {
        var c;
        return ((c = m == null ? void 0 : m.uiOptions) == null ? void 0 : c.showTopBar) !== !1;
      }
    ), X = C(
      () => {
        var c;
        return ((c = m == null ? void 0 : m.uiOptions) == null ? void 0 : c.showBottomBar) !== !1;
      }
    ), f = C(() => A.state.file.isReady);
    tA(f, (c) => {
      var k;
      a.value = !c, c || (u.value = !1, h.value = null, (k = d.value) == null || k.closePopover());
    });
    const v = C(() => A == null ? void 0 : A.state.file.hasError);
    tA(v, (c) => {
      c && (a.value = !1);
    });
    const y = C(
      () => (A == null ? void 0 : A.getters["command/isRunning"](o.Export)) || (A == null ? void 0 : A.getters["command/isRunning"](o.ExportPDF))
    ), T = (c) => {
      var Y, U, q;
      let k = (Y = c == null ? void 0 : c.detail) == null ? void 0 : Y.resolve, W = (U = c == null ? void 0 : c.detail) == null ? void 0 : U.reject;
      k && ((q = l == null ? void 0 : l.value) != null && q.openPopover) && l.value.openPopover(k, W, !0);
    }, N = (c) => {
      var k;
      (k = l == null ? void 0 : l.value) == null || k.closePopover();
    }, F = () => {
      var c;
      (c = i == null ? void 0 : i.value) == null || c.openPopover();
    }, g = (c) => {
      var iA, uA, dA, cA;
      const k = ((iA = c == null ? void 0 : c.detail) == null ? void 0 : iA.error) ?? (c == null ? void 0 : c.detail) ?? c, W = Dt(k);
      if (!xt(W)) {
        (uA = d.value) == null || uA.closePopover(), h.value = k, u.value = !0;
        return;
      }
      const Y = W === 9;
      u.value = Y, h.value = Y ? k : null;
      const U = (dA = c == null ? void 0 : c.detail) == null ? void 0 : dA.onConfirm, q = typeof U == "function" ? async () => {
        A.commit("file/setError", {
          message: "LICENSE_VERIFY_ERROR"
        });
        const mA = m == null ? void 0 : m.requestClose;
        if (typeof mA == "function") {
          await mA();
          return;
        }
        await U();
      } : void 0;
      (cA = d.value) == null || cA.openPopover(k, q);
    }, O = (c) => {
      var Y, U, q;
      let k = (Y = c == null ? void 0 : c.detail) == null ? void 0 : Y.resolve, W = (U = c == null ? void 0 : c.detail) == null ? void 0 : U.reject;
      k && ((q = l == null ? void 0 : l.value) != null && q.openPopover) && l.value.openPopover(k, W);
    };
    return ft(() => {
      const c = (m == null ? void 0 : m.eventTarget) ?? window;
      Xo(), c.addEventListener("FilePassWordError", T), c.addEventListener("FilePassWordOK", N), c.addEventListener("OpenDocumentFailed", F), c.addEventListener("LicenseVerifyError", g), c.addEventListener("AskFilePassword", O);
    }), ht(() => {
      const c = (m == null ? void 0 : m.eventTarget) ?? window;
      A.commit("file/clearError"), c.removeEventListener(
        "FilePassWordError",
        T
      ), c.removeEventListener("FilePassWordOK", N), c.removeEventListener(
        "OpenDocumentFailed",
        F
      ), c.removeEventListener(
        "LicenseVerifyError",
        g
      ), c.removeEventListener(
        "AskFilePassword",
        O
      );
    }), UA(() => {
      const { toolBarElm: c, editorElm: k } = jt();
      c.value = t.value, k.value = n.value;
    }), (c, k) => {
      const W = Q("n-spin"), Y = Q("n-message-provider"), U = Q("n-modal-provider"), q = Q("n-config-provider");
      return D(), R("div", Oo, [
        s(q, {
          class: "app-provider",
          locale: r(Ao)(),
          "theme-overrides": r(eo)()
        }, {
          default: P(() => [
            s(U, null, {
              default: P(() => [
                s(Y, null, {
                  default: P(() => [
                    s(r(pt), {
                      ref_key: "dialogOpenFailedRef",
                      ref: i
                    }, null, 512),
                    s(r(vt), {
                      ref_key: "dialogCypherRef",
                      ref: l
                    }, null, 512),
                    s(r(gt), {
                      ref_key: "dialogLicenseVerifyErrorRef",
                      ref: d
                    }, null, 512),
                    L("div", Ho, [
                      s(W, {
                        class: "app-spin",
                        show: a.value || y.value,
                        fullscreen: "",
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.5)"
                        }
                      }, {
                        default: P(() => [
                          L("div", No, [
                            w.value ? (D(), j(Un, {
                              key: 0,
                              ref_key: "toolbarRef",
                              ref: t
                            }, null, 512)) : _("", !0),
                            u.value ? (D(), j(r(bt), {
                              key: 1,
                              error: h.value
                            }, null, 8, ["error"])) : _("", !0),
                            v.value ? _("", !0) : (D(), j(Wt, {
                              key: 2,
                              ref_key: "editorRef",
                              ref: n,
                              class: "editor"
                            }, null, 512)),
                            X.value ? (D(), j(r(Jn), {
                              key: 3,
                              class: "status-bar"
                            })) : _("", !0)
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
function ko(e) {
  let A = Dn(e);
  const t = wt(Lo);
  return t.use(A), { app: t };
}
class zo extends yt {
  get Document() {
    return this.getAPIComponent("Document");
  }
  get UndoRedo() {
    return this.getAPIComponent("UndoRedo");
  }
  get Workbook() {
    return this.getAPIComponent("Workbook");
  }
  get Worksheet() {
    return this.getAPIComponent("Worksheet");
  }
  get Selection() {
    return this.getAPIComponent("Selection");
  }
  get Cursor() {
    return this.getAPIComponent("Cursor");
  }
  get Finder() {
    return this.getAPIComponent("Finder");
  }
}
class Ro extends zo {
}
class To extends Ro {
  constructor() {
    super();
    M(this, "openFileHandler");
  }
  setOpenFileHandler(t) {
    this.openFileHandler = t;
  }
  openFile() {
    var t;
    return (t = this.openFileHandler) == null ? void 0 : t.call(this);
  }
  copy() {
    return this.Document.callFun("copy");
  }
  cut() {
    return this.Document.callFun("cut");
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
  setAccounting(t) {
    this.Selection.callFun("setAccountingFormat", t);
  }
  setUnderline(t = !0) {
    const n = t ? "single" : "none";
    this.Selection.callFun("setUnderline", n);
  }
  setBorder(t) {
    this.Selection.callFun("setBorder", {
      color: gA(t.color),
      position: t.position,
      style: t.style
    });
  }
  setStrikeout(t = !0) {
    this.Selection.callFun("setStrikeThrough", t);
  }
  setBold(t = !0) {
    this.Selection.callFun("setBold", t);
  }
  setItalic(t = !0) {
    this.Selection.callFun("setItalic", t);
  }
  setFontSize(t) {
    this.Selection.callFun("setFontSize", t);
  }
  setAlignHorizontalUI(t) {
    this.Selection.callFun("setHorizontalAlignment", t);
  }
  setAlignVerticalUI(t) {
    this.Selection.callFun("setVerticalAlignment", t);
  }
  setFontColor(t) {
    const n = gA(t);
    this.Selection.callFun("setFontColor", n);
  }
  setFillColor(t) {
    const n = gA(t);
    this.Selection.callFun("setFillColor", n);
  }
  setFontName(t) {
    this.Selection.callFun("setFontName", t);
  }
  setCellStyle(t) {
    this.Selection.callFun("setCellStyle", t);
  }
  setPercent() {
    this.Selection.callFun("setPercentFormat");
  }
  setNumFormat(t) {
    this.Selection.callFun("setNumberFormat", t);
  }
  incCellDigits() {
    this.Selection.callFun("increaseDecimalPlaces");
  }
  decCellDigits() {
    this.Selection.callFun("decreaseDecimalPlaces");
  }
  isEditing() {
    return this.Document.callFun("isEditing");
  }
  setZoom(t) {
    this.Document.callFun("setZoom", t);
  }
  getZoom() {
    return Math.round(this.Document.callFun("getZoom") || 100);
  }
  async doExport(t) {
    switch (t) {
      case "exportDocument":
        await this.Document.callFun("exportDocument");
        break;
      case "exportPDF":
        await this.Document.callFun("exportPdf");
        break;
    }
  }
  /**获取调色盘 
   * @returns {"theme":[],"standard":[]}
   * 
  */
  getPalette() {
    return this.Workbook.callFun("getColorPalette");
  }
  /**
   * 获取所有单元格内容的所有数字格式
   * @returns {string[]} ["常规","数字","货币","会计",..."文本"]
   */
  getCellAllFormats() {
    return this.Workbook.callFun("getCellNumberFormats");
  }
  /**
   * 配合getCellAllFormats 使用，获取当前单元格内容所以的数字格式结果
   * @param formats 
   * @param lcid 
   * @returns 
   */
  getNumformatExamples(t, n = null) {
    return this.Workbook.callFun("getNumberFormatExamples", t, null, n);
  }
  /**
   * 
   * @param format
   * @param value 
   * @param lcid
   * @returns 
   */
  getNumformatExample(t, n = null, a = null) {
    return this.Workbook.callFun("getNumberFormatExample", t, n, a);
  }
  getCursorTargetType() {
    return this.Cursor.callFun("getTargetType");
  }
  isFrozenPane() {
    return this.Worksheet.callFun("isFrozenPane");
  }
  doPaneOperations(t) {
    const { action: n } = t;
    switch (n) {
      case "freezePane":
      case "unfreezePane":
        this.Worksheet.callFun("toggleFreezePanes");
        break;
      case "cleanText":
        this.Selection.callFun("clearContents");
        break;
    }
  }
  doRowOperations(t) {
    const { action: n } = t;
    switch (n) {
      case "setRowHeight":
        const { val: a } = t;
        this.Worksheet.callFun("setRowHeight", Number(a));
        break;
      case "insertRow":
        this.Worksheet.callFun("insertRows");
        break;
      case "hideRow":
        this.Worksheet.callFun("hideRows");
        break;
      case "unhideRow":
        this.Worksheet.callFun("unhideRows");
        break;
      case "delRow":
        this.Worksheet.callFun("deleteRows");
        break;
      case "clearRowContent":
        this.Selection.callFun("clearContents");
        break;
    }
  }
  doColumnOperations(t) {
    const { action: n } = t;
    switch (n) {
      case "insertColumn":
        this.Worksheet.callFun("insertColumns");
        break;
      case "setColumnWidth":
        const { val: a } = t;
        this.Worksheet.callFun("setColumnWidth", Number(a));
        break;
      case "hideColumn":
        this.Worksheet.callFun("hideColumns");
        break;
      case "unhideColumn":
        this.Worksheet.callFun("unhideColumns");
        break;
      case "delColumn":
        this.Worksheet.callFun("deleteColumns");
        break;
      case "clearColContent":
        this.Selection.callFun("clearContents");
        break;
    }
  }
  doSheetOperations(t) {
    const { action: n } = t;
    switch (n) {
      case "insertSheet":
        this.Workbook.callFun("addWorksheet");
        break;
      case "renameSheet":
        const { val: a } = t;
        this.Workbook.callFun("setWorksheetName", a);
        break;
      case "delCurrentSheet":
        this.Workbook.callFun("deleteWorksheet");
        break;
    }
  }
  getRowHeight() {
    const t = Number(this.Worksheet.callFun("getRowHeight")) || 0;
    return Number(t.toFixed(1));
  }
  getColumnWidth() {
    const t = Number(this.Worksheet.callFun("getColumnWidth")) || 0;
    return Number(t.toFixed(2));
  }
  getSheetName() {
    return this.Workbook.callFun("getWorksheetName");
  }
  searchWord(t, n) {
    this.Finder.callFun("search", t, n);
  }
  searchFirst() {
    this.Finder.callFun("selectFirst");
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
  isWorksheetProtected() {
    return this.Workbook.callFun("isWorksheetProtected");
  }
}
const Io = {
  namespaced: !0,
  state: () => ({
    hasError: !1,
    isReady: !1,
    connected: !1,
    message: null,
    rawEvent: null,
    fileInfo: { title: "", docId: "" },
    numFormatListValues: [],
    colorPalette: null,
    recentColors: [],
    showFindDialog: !1,
    loadingRatio: 0,
    showLoadingProgressBar: !0,
    sheetProtected: !1
  }),
  getters: {
    title: (e) => e.fileInfo.title,
    numFormatListValues: (e) => e.numFormatListValues,
    colorPalette: (e) => e.colorPalette,
    recentColors: (e) => e.recentColors,
    showFindDialog: (e) => e.showFindDialog,
    loadingRatio: (e) => e.loadingRatio,
    showLoadingProgressBar: (e) => e.showLoadingProgressBar,
    sheetProtected: (e) => e.sheetProtected
  },
  mutations: {
    setError(e, A) {
      e.hasError = !0, e.message = A.message, e.rawEvent = A.event ?? null;
    },
    clearError(e) {
      e.hasError = !1, e.message = null, e.rawEvent = null;
    },
    setReady(e, A = !0) {
      e.isReady = A;
    },
    setConnected(e, A) {
      e.connected = A;
    },
    setFileInfo(e, A) {
      e.fileInfo.title = A.title, e.fileInfo.docId = A.docId;
    },
    setNumFormatListValues(e, A) {
      e.numFormatListValues = A;
    },
    setColorPalette(e, A) {
      e.colorPalette = A;
    },
    addRecentColors(e, A) {
      function t(l) {
        return typeof l == "string" ? l : l == null ? void 0 : l.hex;
      }
      const n = t(A), a = e.recentColors.findIndex(
        (l) => t(l) === n
      );
      a !== -1 && e.recentColors.splice(a, 1), e.recentColors.unshift(A), e.recentColors.length > 10 && (e.recentColors.length = 10);
    },
    setShowFindDialog(e, A) {
      e.showFindDialog = A;
    },
    setLoadingRatio(e, A) {
      e.loadingRatio = A;
    },
    setShowLoadingProgressBar(e, A) {
      e.showLoadingProgressBar = A;
    },
    setSheetProtected(e, A) {
      e.sheetProtected = A;
    }
  },
  actions: {
    onError({ commit: e }, A) {
      e("setError", {
        message: "文件处理失败",
        event: A
      });
    },
    onOpening({ commit: e }) {
      e("clearError"), e("setReady", !1), e("setConnected", !1), e("setLoadingRatio", 0), e("setShowLoadingProgressBar", !0);
    },
    onReady({ commit: e }, A) {
      e("setReady");
    },
    onConnected({ commit: e }, A) {
      e("setConnected", !0), e("setFileInfo", A);
    },
    onLoadPageEnd({ commit: e }, A) {
      e("setLoadingRatio", 100), setTimeout(() => {
        e("setShowLoadingProgressBar", !1);
      }, 1e3);
    },
    onExportReady({ commit: e }, A) {
    },
    onFilePassWord({ commit: e }, A) {
    }
  }
};
function wA() {
  return {
    [o.Copy]: { enabled: !1, running: !1 },
    [o.Cut]: { enabled: !1, running: !1 },
    [o.Paste]: { enabled: !1, running: !1 },
    [o.Undo]: { enabled: !1, running: !1 },
    [o.Redo]: { enabled: !1, running: !1 },
    [o.Accounting]: {
      enabled: !1,
      running: !1,
      ui: {
        value: ""
      }
    },
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
    [o.Border]: { enabled: !1, running: !1 },
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
    [o.FillColor]: {
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
    [o.Percent]: {
      enabled: !1,
      running: !1,
      ui: {
        value: ""
      }
    },
    [o.IncCellDigits]: {
      enabled: !1,
      running: !1
    },
    [o.DecCellDigits]: {
      enabled: !1,
      running: !1
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
    [o.NumFormat]: {
      enabled: !1,
      running: !1,
      ui: {
        value: ""
      }
    },
    [o.PaneOperations]: {
      enabled: !1,
      running: !1
    },
    [o.ColumnOperations]: {
      enabled: !1,
      running: !1
    },
    [o.RowOperations]: {
      enabled: !1,
      running: !1
    },
    [o.SheetOperations]: {
      enabled: !1,
      running: !1
    },
    [o.Search]: {
      enabled: !1,
      running: !1,
      ui: {
        value: null
      }
    },
    [o.AskDeleteSheet]: {
      enabled: !1,
      running: !1
    }
  };
}
const Wo = {
  namespaced: !0,
  state: () => ({
    map: wA(),
    readOnly: !1,
    loadEnd: !1,
    selectAll: !1
  }),
  getters: {
    can: (e) => (A) => {
      var t;
      return ((t = e.map[A]) == null ? void 0 : t.enabled) !== !0 ? !1 : e.readOnly ? e.loadEnd && yA.has(A) : !0;
    },
    isRunning: (e) => (A) => {
      var t;
      return ((t = e.map[A]) == null ? void 0 : t.running) === !0;
    },
    active: (e) => (A) => {
      var n;
      const t = (n = e.map[A]) == null ? void 0 : n.ui;
      return !!t && t.value === !0;
    },
    getVal: (e) => (A) => {
      var n;
      const t = (n = e.map[A]) == null ? void 0 : n.ui;
      return !!t && t.value;
    },
    loadEnd: (e) => e.loadEnd,
    getAsk: (e) => (A) => {
      var t;
      return (t = e.map[A]) == null ? void 0 : t.ask;
    }
  },
  mutations: {
    resetCommandState(e) {
      e.map = wA(), e.readOnly = !1, e.loadEnd = !1, e.selectAll = !1;
    },
    setLoadEnd(e, A) {
      e.loadEnd = A;
    },
    setReadOnly(e, A) {
      e.readOnly = A;
    },
    setSelectAll(e, A) {
      e.selectAll = A;
    },
    setEnabled(e, A) {
      e.loadEnd == !1 && (A.enabled = !1), e.map[A.cmd].enabled = A.enabled;
    },
    refreshProtectedSheetMode(e, A) {
      e.readOnly || (A ? Object.values(o).forEach((t) => {
        St.has(t) || (e.map[t].enabled = !1);
      }) : Object.values(o).forEach((t) => {
        t != o.Undo && t != o.Redo && (e.map[t].enabled = !0);
      }));
    },
    setRunning(e, A) {
      e.map[A.cmd].running = A.running;
    },
    setState(e, A) {
      const t = e.map[A.cmd];
      if (!t) return;
      const n = A.ui;
      if (n === void 0) {
        t.ui = void 0;
        return;
      }
      t.ui = { ...t.ui ?? {}, ...n };
    },
    clearState(e, A) {
      const t = wA()[A.cmd];
      t && (e.map[A.cmd] = JSON.parse(JSON.stringify(t)));
    },
    setAsk(e, A) {
      e.map[A.cmd].ask = A.resolve;
    }
  },
  actions: {
    async run({ commit: e, getters: A }, t) {
      const { cmd: n, fn: a, param: l } = t;
      if (A.can(n)) {
        e("setRunning", { cmd: n, running: !0 });
        try {
          await a(l);
        } finally {
          e("setRunning", { cmd: n, running: !1 });
        }
      }
    }
  }
};
function Ae() {
  return Pt({
    modules: {
      file: Io,
      command: Wo
    }
  });
}
Ae();
function jo(e) {
  return typeof e == "object" && e !== null && typeof e.addEventListener == "function" && typeof e.removeEventListener == "function" && typeof e.dispatchEvent == "function";
}
function Bo(e) {
  var t;
  const A = (t = e.widgetMountContext) == null ? void 0 : t.eventTarget;
  return e.eventTarget ?? (jo(A) ? A : void 0);
}
function Vo(e) {
  const A = Ae(), { app: t } = ko(e.lang);
  $n(t), t.use(A);
  const n = new To(), a = new Ot({
    store: A,
    api: n,
    eventTarget: Bo(e)
  });
  return t.provide(V, a), t.provide(JA, {
    toolBarElm: aA(null),
    navigateBarElm: aA(null),
    editorElm: aA(null),
    bottomBarElm: aA(null)
  }), e.widgetMountContext && t.provide(DA, e.widgetMountContext), {
    app: t,
    api: n,
    commandService: a,
    store: A
  };
}
function Uo(e) {
  return e ?? window.lang ?? window.navigator.language;
}
function Qo(e) {
  return new Promise((A, t) => {
    var l;
    const n = (l = e.state) == null ? void 0 : l.file;
    if (n != null && n.isReady) {
      A();
      return;
    }
    if (n != null && n.hasError) {
      t(new Error(n.message ?? "document load failed"));
      return;
    }
    const a = e.watch(
      (i) => {
        var d, u, h;
        return {
          isReady: !!((d = i.file) != null && d.isReady),
          hasError: !!((u = i.file) != null && u.hasError),
          message: ((h = i.file) == null ? void 0 : h.message) ?? null
        };
      },
      (i) => {
        if (i.isReady) {
          a(), A();
          return;
        }
        i.hasError && (a(), t(new Error(i.message ?? "document load failed")));
      }
    );
  });
}
function Yo(e, A, t) {
  const n = {
    docId: (t == null ? void 0 : t.docId) ?? "",
    file: t == null ? void 0 : t.file,
    fileUrl: t == null ? void 0 : t.fileUrl,
    fileName: t == null ? void 0 : t.fileName,
    user: t == null ? void 0 : t.user,
    uiOptions: t == null ? void 0 : t.uiOptions,
    widgetMode: t == null ? void 0 : t.widgetMode,
    mainDom: aA(null),
    eventTarget: (t == null ? void 0 : t.eventTarget) ?? window,
    requestClose: t == null ? void 0 : t.requestClose
  }, { app: a, api: l, commandService: i, store: d } = Vo({
    lang: Uo(A),
    eventTarget: t == null ? void 0 : t.eventTarget,
    widgetMountContext: n
  }), u = Qo(d);
  a.mount(e);
  async function h() {
    var m, w;
    try {
      await ((w = (m = l.docApp) == null ? void 0 : m.destroy) == null ? void 0 : w.call(m));
    } finally {
      try {
        i.destroy();
      } finally {
        a.unmount();
      }
    }
  }
  return {
    app: a,
    api: l,
    commandService: i,
    store: d,
    ready: u,
    destroy: h,
    close: h,
    unmount: h
  };
}
const Ko = Yo;
export {
  Yo as default,
  Ko as mount,
  Yo as mountXlsxApp
};
