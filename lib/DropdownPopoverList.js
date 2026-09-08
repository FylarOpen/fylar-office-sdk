import { d as w, o as n, c as i, g as k, B as m, a as r, e as s, b as c, T as y, a0 as B, aZ as $, X as S, Y as z, z as d, n as M, $ as L, F as h, a3 as f } from "./ApiBase.js?version=1788858640169";
const N = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 512 512"
}, V = w({
  name: "Checkmark",
  render: function(u, a) {
    return n(), i(
      "svg",
      N,
      a[0] || (a[0] = [
        k(
          "path",
          {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "32",
            d: "M416 128L192 384l-96-96"
          },
          null,
          -1
          /* HOISTED */
        )
      ])
    );
  }
}), W = ["onMousedown"], U = /* @__PURE__ */ w({
  __name: "DropdownPopoverList",
  props: {
    options: {},
    disabled: { type: Boolean, default: !1 },
    show: { type: Boolean },
    placement: { default: "bottom-start" },
    trigger: { default: "click" },
    to: { type: [Boolean, String], default: "body" },
    maxHeight: { default: 300 },
    maxWidth: { default: 200 },
    showChecked: { type: Boolean, default: !1 },
    space: {}
  },
  emits: ["update:show", "select", "clickoutside"],
  setup(e, { emit: u }) {
    const a = e, l = u, g = {
      Scrollbar: {
        scrollbarColor: "var(--active-bg)"
      }
    };
    function p(t) {
      a.disabled || l("update:show", t);
    }
    function v() {
      a.disabled || l("clickoutside");
    }
    function x(t) {
      a.disabled || (l("select", t.value), l("update:show", !1));
    }
    return (t, F) => {
      const b = m("n-icon"), C = m("n-config-provider");
      return n(), i("div", null, [
        r(C, { "theme-overrides": g }, {
          default: s(() => [
            r(c(y), {
              show: e.show && !e.disabled,
              trigger: e.trigger,
              placement: e.placement,
              "show-arrow": !1,
              style: B({ maxWidth: e.maxWidth + "px" }),
              "onUpdate:show": p,
              onClickoutside: v,
              to: e.to,
              space: e.space
            }, {
              trigger: s(() => [
                d(t.$slots, "default")
              ]),
              default: s(() => [
                r(c($), { "max-height": e.maxHeight }, {
                  default: s(() => [
                    (n(!0), i(S, null, z(e.options, (o) => (n(), i("div", {
                      key: o.value,
                      class: L(["global-basic-display-text global-menu-list-item", { active: o.checked && !o.multiCheck }]),
                      onMousedown: M((H) => x(o), ["prevent"])
                    }, [
                      e.showChecked ? (n(), h(b, {
                        key: 0,
                        size: "16"
                      }, {
                        default: s(() => [
                          o.checked ? (n(), h(c(V), { key: 0 })) : f("", !0)
                        ]),
                        _: 2
                      }, 1024)) : f("", !0),
                      k("span", null, [
                        d(t.$slots, "option", {
                          item: o,
                          checked: o.checked
                        })
                      ])
                    ], 42, W))), 128))
                  ]),
                  _: 3
                }, 8, ["max-height"]),
                d(t.$slots, "footer")
              ]),
              _: 3
            }, 8, ["show", "trigger", "placement", "style", "to", "space"])
          ]),
          _: 3
        })
      ]);
    };
  }
});
export {
  U as _
};
