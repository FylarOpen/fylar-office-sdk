var CanvasKitInit = (() => {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
    return (
        function (moduleArg = {}) {

            var w = moduleArg, aa, ba;
            w.ready = new Promise((a, b) => {
                aa = a;
                ba = b
            });
            (function (a) {
                a.le = a.le || [];
                a.le.push(function () {
                    a.MakeSWCanvasSurface = function (b) {
                        var c = b, f = "undefined" !== typeof OffscreenCanvas && c instanceof OffscreenCanvas;
                        if (!("undefined" !== typeof HTMLCanvasElement && c instanceof HTMLCanvasElement || f || (c = document.getElementById(b), c))) throw "Canvas with id " + b + " was not found";
                        if (b = a.MakeSurface(c.width, c.height)) b.ge = c;
                        return b
                    };
                    a.MakeCanvasSurface || (a.MakeCanvasSurface = a.MakeSWCanvasSurface);
                    a.MakeSurface = function (b, c) {
                        var f = {
                            width: b, height: c, colorType: a.ColorType.RGBA_8888,
                            alphaType: a.AlphaType.Unpremul, colorSpace: a.ColorSpace.SRGB
                        }, h = b * c * 4, m = a._malloc(h);
                        if (f = a.Surface._makeRasterDirect(f, m, 4 * b)) f.ge = null, f.ag = b, f.Xf = c, f.Zf = h, f.Af = m, f.getCanvas().clear(a.TRANSPARENT);
                        return f
                    };
                    a.MakeRasterDirectSurface = function (b, c, f) {
                        return a.Surface._makeRasterDirect(b, c.byteOffset, f)
                    };
                    a.Surface.prototype.flush = function (b) {
                        a.he(this.fe);
                        this._flush();
                        if (this.ge) {
                            var c = new Uint8ClampedArray(a.HEAPU8.buffer, this.Af, this.Zf);
                            c = new ImageData(c, this.ag, this.Xf);
                            b ? this.ge.getContext("2d").putImageData(c,
                                0, 0, b[0], b[1], b[2] - b[0], b[3] - b[1]) : this.ge.getContext("2d").putImageData(c, 0, 0)
                        }
                    };
                    a.Surface.prototype.dispose = function () {
                        this.Af && a._free(this.Af);
                        this.delete()
                    };
                    a.he = a.he || function () {
                    };
                    a.rf = a.rf || function () {
                        return null
                    }
                })
            })(w);
            (function (a) {
                a.le = a.le || [];
                a.le.push(function () {
                    function b(n, p, v) {
                        return n && n.hasOwnProperty(p) ? n[p] : v
                    }

                    function c(n) {
                        var p = ca(da);
                        da[p] = n;
                        return p
                    }

                    function f(n) {
                        return n.naturalHeight || n.videoHeight || n.displayHeight || n.height
                    }

                    function h(n) {
                        return n.naturalWidth || n.videoWidth || n.displayWidth || n.width
                    }

                    function m(n, p, v, E) {
                        n.bindTexture(n.TEXTURE_2D, p);
                        E || v.alphaType !== a.AlphaType.Premul || n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
                        return p
                    }

                    function u(n, p, v) {
                        v || p.alphaType !== a.AlphaType.Premul ||
                        n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1);
                        n.bindTexture(n.TEXTURE_2D, null)
                    }

                    a.GetWebGLContext = function (n, p) {
                        if (!n) throw "null canvas passed into makeWebGLContext";
                        var v = {
                            alpha: b(p, "alpha", 1),
                            depth: b(p, "depth", 1),
                            stencil: b(p, "stencil", 8),
                            antialias: b(p, "antialias", 0),
                            premultipliedAlpha: b(p, "premultipliedAlpha", 1),
                            preserveDrawingBuffer: b(p, "preserveDrawingBuffer", 0),
                            preferLowPowerToHighPerformance: b(p, "preferLowPowerToHighPerformance", 0),
                            failIfMajorPerformanceCaveat: b(p, "failIfMajorPerformanceCaveat",
                                0),
                            enableExtensionsByDefault: b(p, "enableExtensionsByDefault", 1),
                            explicitSwapControl: b(p, "explicitSwapControl", 0),
                            renderViaOffscreenBackBuffer: b(p, "renderViaOffscreenBackBuffer", 0)
                        };
                        v.majorVersion = p && p.majorVersion ? p.majorVersion : "undefined" !== typeof WebGL2RenderingContext ? 2 : 1;
                        if (v.explicitSwapControl) throw "explicitSwapControl is not supported";
                        n = ea(n, v);
                        if (!n) return 0;
                        ja(n);
                        A.Be.getExtension("WEBGL_debug_renderer_info");
                        return n
                    };
                    a.deleteContext = function (n) {
                        A === ka[n] && (A = null);
                        "object" == typeof JSEvents &&
                        JSEvents.Tg(ka[n].Be.canvas);
                        ka[n] && ka[n].Be.canvas && (ka[n].Be.canvas.Vf = void 0);
                        ka[n] = null
                    };
                    a._setTextureCleanup({
                        deleteTexture: function (n, p) {
                            var v = da[p];
                            v && ka[n].Be.deleteTexture(v);
                            da[p] = null
                        }
                    });
                    a.MakeWebGLContext = function (n) {
                        if (!this.he(n)) return null;
                        var p = this._MakeGrContext();
                        if (!p) return null;
                        p.fe = n;
                        var v = p.delete.bind(p);
                        p["delete"] = function () {
                            a.he(this.fe);
                            v()
                        }.bind(p);
                        return A.Ef = p
                    };
                    a.MakeGrContext = a.MakeWebGLContext;
                    a.GrDirectContext.prototype.getResourceCacheLimitBytes = function () {
                        a.he(this.fe);
                        this._getResourceCacheLimitBytes()
                    };
                    a.GrDirectContext.prototype.getResourceCacheUsageBytes = function () {
                        a.he(this.fe);
                        this._getResourceCacheUsageBytes()
                    };
                    a.GrDirectContext.prototype.releaseResourcesAndAbandonContext = function () {
                        a.he(this.fe);
                        this._releaseResourcesAndAbandonContext()
                    };
                    a.GrDirectContext.prototype.setResourceCacheLimitBytes = function (n) {
                        a.he(this.fe);
                        this._setResourceCacheLimitBytes(n)
                    };
                    a.MakeOnScreenGLSurface = function (n, p, v, E, G, L) {
                        if (!this.he(n.fe)) return null;
                        p = void 0 === G || void 0 === L ?
                            this._MakeOnScreenGLSurface(n, p, v, E) : this._MakeOnScreenGLSurface(n, p, v, E, G, L);
                        if (!p) return null;
                        p.fe = n.fe;
                        return p
                    };
                    a.MakeRenderTarget = function () {
                        var n = arguments[0];
                        if (!this.he(n.fe)) return null;
                        if (3 === arguments.length) {
                            var p = this._MakeRenderTargetWH(n, arguments[1], arguments[2]);
                            if (!p) return null
                        } else if (2 === arguments.length) {
                            if (p = this._MakeRenderTargetII(n, arguments[1]), !p) return null
                        } else return null;
                        p.fe = n.fe;
                        return p
                    };
                    a.MakeWebGLCanvasSurface = function (n, p, v) {
                        p = p || null;
                        var E = n, G = "undefined" !==
                            typeof OffscreenCanvas && E instanceof OffscreenCanvas;
                        if (!("undefined" !== typeof HTMLCanvasElement && E instanceof HTMLCanvasElement || G || (E = document.getElementById(n), E))) throw "Canvas with id " + n + " was not found";
                        n = this.GetWebGLContext(E, v);
                        if (!n || 0 > n) throw "failed to create webgl context: err " + n;
                        n = this.MakeWebGLContext(n);
                        p = this.MakeOnScreenGLSurface(n, E.width, E.height, p);
                        return p ? p : (p = E.cloneNode(!0), E.parentNode.replaceChild(p, E), p.classList.add("ck-replaced"), a.MakeSWCanvasSurface(p))
                    };
                    a.MakeCanvasSurface =
                        a.MakeWebGLCanvasSurface;
                    a.Surface.prototype.makeImageFromTexture = function (n, p) {
                        a.he(this.fe);
                        n = c(n);
                        if (p = this._makeImageFromTexture(this.fe, n, p)) p.gf = n;
                        return p
                    };
                    a.Surface.prototype.makeImageFromTextureSource = function (n, p, v) {
                        p || (p = {
                            height: f(n),
                            width: h(n),
                            colorType: a.ColorType.RGBA_8888,
                            alphaType: v ? a.AlphaType.Premul : a.AlphaType.Unpremul
                        });
                        p.colorSpace || (p.colorSpace = a.ColorSpace.SRGB);
                        a.he(this.fe);
                        var E = A.Be;
                        v = m(E, E.createTexture(), p, v);
                        2 === A.version ? E.texImage2D(E.TEXTURE_2D, 0, E.RGBA, p.width, p.height,
                            0, E.RGBA, E.UNSIGNED_BYTE, n) : E.texImage2D(E.TEXTURE_2D, 0, E.RGBA, E.RGBA, E.UNSIGNED_BYTE, n);
                        u(E, p);
                        this._resetContext();
                        return this.makeImageFromTexture(v, p)
                    };
                    a.Surface.prototype.updateTextureFromSource = function (n, p, v) {
                        if (n.gf) {
                            a.he(this.fe);
                            var E = n.getImageInfo(), G = A.Be, L = m(G, da[n.gf], E, v);
                            2 === A.version ? G.texImage2D(G.TEXTURE_2D, 0, G.RGBA, h(p), f(p), 0, G.RGBA, G.UNSIGNED_BYTE, p) : G.texImage2D(G.TEXTURE_2D, 0, G.RGBA, G.RGBA, G.UNSIGNED_BYTE, p);
                            u(G, E, v);
                            this._resetContext();
                            da[n.gf] = null;
                            n.gf = c(L);
                            E.colorSpace =
                                n.getColorSpace();
                            p = this._makeImageFromTexture(this.fe, n.gf, E);
                            v = n.ee.ne;
                            G = n.ee.te;
                            n.ee.ne = p.ee.ne;
                            n.ee.te = p.ee.te;
                            p.ee.ne = v;
                            p.ee.te = G;
                            p.delete();
                            E.colorSpace.delete()
                        }
                    };
                    a.MakeLazyImageFromTextureSource = function (n, p, v) {
                        p || (p = {
                            height: f(n),
                            width: h(n),
                            colorType: a.ColorType.RGBA_8888,
                            alphaType: v ? a.AlphaType.Premul : a.AlphaType.Unpremul
                        });
                        p.colorSpace || (p.colorSpace = a.ColorSpace.SRGB);
                        var E = {
                            makeTexture: function () {
                                var G = A, L = G.Be, y = m(L, L.createTexture(), p, v);
                                2 === G.version ? L.texImage2D(L.TEXTURE_2D, 0, L.RGBA,
                                    p.width, p.height, 0, L.RGBA, L.UNSIGNED_BYTE, n) : L.texImage2D(L.TEXTURE_2D, 0, L.RGBA, L.RGBA, L.UNSIGNED_BYTE, n);
                                u(L, p, v);
                                return c(y)
                            }, freeSrc: function () {
                            }
                        };
                        "VideoFrame" === n.constructor.name && (E.freeSrc = function () {
                            n.close()
                        });
                        return a.Image._makeFromGenerator(p, E)
                    };
                    a.he = function (n) {
                        return n ? ja(n) : !1
                    };
                    a.rf = function () {
                        return A && A.Ef && !A.Ef.isDeleted() ? A.Ef : null
                    }
                })
            })(w);
            (function (a) {
                function b(e, d, g, l, r) {
                    for (var x = 0; x < e.length; x++) d[x * g + (x * r + l + g) % g] = e[x];
                    return d
                }

                function c(e) {
                    for (var d = e * e, g = Array(d); d--;) g[d] = 0 === d % (e + 1) ? 1 : 0;
                    return g
                }

                function f(e) {
                    return e ? e.constructor === Float32Array && 4 === e.length : !1
                }

                function h(e) {
                    return (n(255 * e[3]) << 24 | n(255 * e[0]) << 16 | n(255 * e[1]) << 8 | n(255 * e[2]) << 0) >>> 0
                }

                function m(e) {
                    if (e && e._ck) return e;
                    if (e instanceof Float32Array) {
                        for (var d = Math.floor(e.length / 4), g = new Uint32Array(d), l = 0; l < d; l++) g[l] = h(e.slice(4 * l, 4 * (l + 1)));
                        return g
                    }
                    if (e instanceof
                        Uint32Array) return e;
                    if (e instanceof Array && e[0] instanceof Float32Array) return e.map(h)
                }

                function u(e) {
                    if (void 0 === e) return 1;
                    var d = parseFloat(e);
                    return e && -1 !== e.indexOf("%") ? d / 100 : d
                }

                function n(e) {
                    return Math.round(Math.max(0, Math.min(e || 0, 255)))
                }

                function p(e, d) {
                    d && d._ck || a._free(e)
                }

                function v(e, d, g) {
                    if (!e || !e.length) return V;
                    if (e && e._ck) return e.byteOffset;
                    var l = a[d].BYTES_PER_ELEMENT;
                    g || (g = a._malloc(e.length * l));
                    a[d].set(e, g / l);
                    return g
                }

                function E(e) {
                    var d = {xe: V, count: e.length, colorType: a.ColorType.RGBA_F32};
                    if (e instanceof Float32Array) d.xe = v(e, "HEAPF32"), d.count = e.length / 4; else if (e instanceof Uint32Array) d.xe = v(e, "HEAPU32"), d.colorType = a.ColorType.RGBA_8888; else if (e instanceof Array) {
                        if (e && e.length) {
                            for (var g = a._malloc(16 * e.length), l = 0, r = g / 4, x = 0; x < e.length; x++) for (var C = 0; 4 > C; C++) a.HEAPF32[r + l] = e[x][C], l++;
                            e = g
                        } else e = V;
                        d.xe = e
                    } else throw "Invalid argument to copyFlexibleColorArray, Not a color array " + typeof e;
                    return d
                }

                function G(e) {
                    if (!e) return V;
                    var d = Yb.toTypedArray();
                    if (e.length) {
                        if (6 === e.length ||
                            9 === e.length) return v(e, "HEAPF32", Oa), 6 === e.length && a.HEAPF32.set(Hd, 6 + Oa / 4), Oa;
                        if (16 === e.length) return d[0] = e[0], d[1] = e[1], d[2] = e[3], d[3] = e[4], d[4] = e[5], d[5] = e[7], d[6] = e[12], d[7] = e[13], d[8] = e[15], Oa;
                        throw "invalid matrix size";
                    }
                    if (void 0 === e.m11) throw "invalid matrix argument";
                    d[0] = e.m11;
                    d[1] = e.m21;
                    d[2] = e.m41;
                    d[3] = e.m12;
                    d[4] = e.m22;
                    d[5] = e.m42;
                    d[6] = e.m14;
                    d[7] = e.m24;
                    d[8] = e.m44;
                    return Oa
                }

                function L(e) {
                    if (!e) return V;
                    var d = Zb.toTypedArray();
                    if (e.length) {
                        if (16 !== e.length && 6 !== e.length && 9 !== e.length) throw "invalid matrix size";
                        if (16 === e.length) return v(e, "HEAPF32", cb);
                        d.fill(0);
                        d[0] = e[0];
                        d[1] = e[1];
                        d[3] = e[2];
                        d[4] = e[3];
                        d[5] = e[4];
                        d[7] = e[5];
                        d[10] = 1;
                        d[12] = e[6];
                        d[13] = e[7];
                        d[15] = e[8];
                        6 === e.length && (d[12] = 0, d[13] = 0, d[15] = 1);
                        return cb
                    }
                    if (void 0 === e.m11) throw "invalid matrix argument";
                    d[0] = e.m11;
                    d[1] = e.m21;
                    d[2] = e.m31;
                    d[3] = e.m41;
                    d[4] = e.m12;
                    d[5] = e.m22;
                    d[6] = e.m32;
                    d[7] = e.m42;
                    d[8] = e.m13;
                    d[9] = e.m23;
                    d[10] = e.m33;
                    d[11] = e.m43;
                    d[12] = e.m14;
                    d[13] = e.m24;
                    d[14] = e.m34;
                    d[15] = e.m44;
                    return cb
                }

                function y(e, d) {
                    return v(e, "HEAPF32", d || Ka)
                }

                function M(e,
                           d, g, l) {
                    var r = $b.toTypedArray();
                    r[0] = e;
                    r[1] = d;
                    r[2] = g;
                    r[3] = l;
                    return Ka
                }

                function T(e) {
                    for (var d = new Float32Array(4), g = 0; 4 > g; g++) d[g] = a.HEAPF32[e / 4 + g];
                    return d
                }

                function R(e, d) {
                    return v(e, "HEAPF32", d || fa)
                }

                function ta(e, d) {
                    return v(e, "HEAPF32", d || ac)
                }

                function pa() {
                    for (var e = 0, d = 0; d < arguments.length - 1; d += 2) e += arguments[d] * arguments[d + 1];
                    return e
                }

                function kb(e, d, g) {
                    for (var l = Array(e.length), r = 0; r < g; r++) for (var x = 0; x < g; x++) {
                        for (var C = 0, K = 0; K < g; K++) C += e[g * r + K] * d[g * K + x];
                        l[r * g + x] = C
                    }
                    return l
                }

                function lb(e, d) {
                    for (var g =
                        kb(d[0], d[1], e), l = 2; l < d.length;) g = kb(g, d[l], e), l++;
                    return g
                }

                a.Color = function (e, d, g, l) {
                    void 0 === l && (l = 1);
                    return a.Color4f(n(e) / 255, n(d) / 255, n(g) / 255, l)
                };
                a.ColorAsInt = function (e, d, g, l) {
                    void 0 === l && (l = 255);
                    return (n(l) << 24 | n(e) << 16 | n(d) << 8 | n(g) << 0 & 268435455) >>> 0
                };
                a.Color4f = function (e, d, g, l) {
                    void 0 === l && (l = 1);
                    return Float32Array.of(e, d, g, l)
                };
                Object.defineProperty(a, "TRANSPARENT", {
                    get: function () {
                        return a.Color4f(0, 0, 0, 0)
                    }
                });
                Object.defineProperty(a, "BLACK", {
                    get: function () {
                        return a.Color4f(0, 0, 0, 1)
                    }
                });
                Object.defineProperty(a,
                    "WHITE", {
                        get: function () {
                            return a.Color4f(1, 1, 1, 1)
                        }
                    });
                Object.defineProperty(a, "RED", {
                    get: function () {
                        return a.Color4f(1, 0, 0, 1)
                    }
                });
                Object.defineProperty(a, "GREEN", {
                    get: function () {
                        return a.Color4f(0, 1, 0, 1)
                    }
                });
                Object.defineProperty(a, "BLUE", {
                    get: function () {
                        return a.Color4f(0, 0, 1, 1)
                    }
                });
                Object.defineProperty(a, "YELLOW", {
                    get: function () {
                        return a.Color4f(1, 1, 0, 1)
                    }
                });
                Object.defineProperty(a, "CYAN", {
                    get: function () {
                        return a.Color4f(0, 1, 1, 1)
                    }
                });
                Object.defineProperty(a, "MAGENTA", {
                    get: function () {
                        return a.Color4f(1,
                            0, 1, 1)
                    }
                });
                a.getColorComponents = function (e) {
                    return [Math.floor(255 * e[0]), Math.floor(255 * e[1]), Math.floor(255 * e[2]), e[3]]
                };
                a.parseColorString = function (e, d) {
                    e = e.toLowerCase();
                    if (e.startsWith("#")) {
                        d = 255;
                        switch (e.length) {
                            case 9:
                                d = parseInt(e.slice(7, 9), 16);
                            case 7:
                                var g = parseInt(e.slice(1, 3), 16);
                                var l = parseInt(e.slice(3, 5), 16);
                                var r = parseInt(e.slice(5, 7), 16);
                                break;
                            case 5:
                                d = 17 * parseInt(e.slice(4, 5), 16);
                            case 4:
                                g = 17 * parseInt(e.slice(1, 2), 16), l = 17 * parseInt(e.slice(2, 3), 16), r = 17 * parseInt(e.slice(3, 4), 16)
                        }
                        return a.Color(g,
                            l, r, d / 255)
                    }
                    return e.startsWith("rgba") ? (e = e.slice(5, -1), e = e.split(","), a.Color(+e[0], +e[1], +e[2], u(e[3]))) : e.startsWith("rgb") ? (e = e.slice(4, -1), e = e.split(","), a.Color(+e[0], +e[1], +e[2], u(e[3]))) : e.startsWith("gray(") || e.startsWith("hsl") || !d || (e = d[e], void 0 === e) ? a.BLACK : e
                };
                a.multiplyByAlpha = function (e, d) {
                    e = e.slice();
                    e[3] = Math.max(0, Math.min(e[3] * d, 1));
                    return e
                };
                a.Malloc = function (e, d) {
                    var g = a._malloc(d * e.BYTES_PER_ELEMENT);
                    return {
                        _ck: !0, length: d, byteOffset: g, Ne: null, subarray: function (l, r) {
                            l = this.toTypedArray().subarray(l,
                                r);
                            l._ck = !0;
                            return l
                        }, toTypedArray: function () {
                            if (this.Ne && this.Ne.length) return this.Ne;
                            this.Ne = new e(a.HEAPU8.buffer, g, d);
                            this.Ne._ck = !0;
                            return this.Ne
                        }
                    }
                };
                a.Free = function (e) {
                    a._free(e.byteOffset);
                    e.byteOffset = V;
                    e.toTypedArray = null;
                    e.Ne = null
                };
                var Oa = V, Yb, cb = V, Zb, Ka = V, $b, sa, fa = V, Ac, Pa = V, bc, db = V, Bc, cc = V, Bb, mb = V, Cc,
                    ac = V, Dc, Ec = V, Hd = Float32Array.of(0, 0, 1), V = 0;
                a.onRuntimeInitialized = function () {
                    function e(d, g, l, r, x, C, K) {
                        C || (C = 4 * r.width, r.colorType === a.ColorType.RGBA_F16 ? C *= 2 : r.colorType === a.ColorType.RGBA_F32 &&
                            (C *= 4));
                        var N = C * r.height;
                        var P = x ? x.byteOffset : a._malloc(N);
                        if (K ? !d._readPixels(r, P, C, g, l, K) : !d._readPixels(r, P, C, g, l)) return x || a._free(P), null;
                        if (x) return x.toTypedArray();
                        switch (r.colorType) {
                            case a.ColorType.RGBA_8888:
                            case a.ColorType.RGBA_F16:
                                d = (new Uint8Array(a.HEAPU8.buffer, P, N)).slice();
                                break;
                            case a.ColorType.RGBA_F32:
                                d = (new Float32Array(a.HEAPU8.buffer, P, N)).slice();
                                break;
                            default:
                                return null
                        }
                        a._free(P);
                        return d
                    }

                    $b = a.Malloc(Float32Array, 4);
                    Ka = $b.byteOffset;
                    Zb = a.Malloc(Float32Array, 16);
                    cb = Zb.byteOffset;
                    Yb = a.Malloc(Float32Array, 9);
                    Oa = Yb.byteOffset;
                    Cc = a.Malloc(Float32Array, 12);
                    ac = Cc.byteOffset;
                    Dc = a.Malloc(Float32Array, 12);
                    Ec = Dc.byteOffset;
                    sa = a.Malloc(Float32Array, 4);
                    fa = sa.byteOffset;
                    Ac = a.Malloc(Float32Array, 4);
                    Pa = Ac.byteOffset;
                    bc = a.Malloc(Float32Array, 3);
                    db = bc.byteOffset;
                    Bc = a.Malloc(Float32Array, 3);
                    cc = Bc.byteOffset;
                    Bb = a.Malloc(Int32Array, 4);
                    mb = Bb.byteOffset;
                    a.ColorSpace.SRGB = a.ColorSpace._MakeSRGB();
                    a.ColorSpace.DISPLAY_P3 = a.ColorSpace._MakeDisplayP3();
                    a.ColorSpace.ADOBE_RGB = a.ColorSpace._MakeAdobeRGB();
                    a.GlyphRunFlags = {IsWhiteSpace: a._GlyphRunFlags_isWhiteSpace};
                    a.Path.MakeFromCmds = function (d) {
                        var g = v(d, "HEAPF32"), l = a.Path._MakeFromCmds(g, d.length);
                        p(g, d);
                        return l
                    };
                    a.Path.MakeFromVerbsPointsWeights = function (d, g, l) {
                        var r = v(d, "HEAPU8"), x = v(g, "HEAPF32"), C = v(l, "HEAPF32"),
                            K = a.Path._MakeFromVerbsPointsWeights(r, d.length, x, g.length, C, l && l.length || 0);
                        p(r, d);
                        p(x, g);
                        p(C, l);
                        return K
                    };
                    a.Path.prototype.addArc = function (d, g, l) {
                        d = R(d);
                        this._addArc(d, g, l);
                        return this
                    };
                    a.Path.prototype.addCircle = function (d, g, l, r) {
                        this._addCircle(d,
                            g, l, !!r);
                        return this
                    };
                    a.Path.prototype.addOval = function (d, g, l) {
                        void 0 === l && (l = 1);
                        d = R(d);
                        this._addOval(d, !!g, l);
                        return this
                    };
                    a.Path.prototype.addPath = function () {
                        var d = Array.prototype.slice.call(arguments), g = d[0], l = !1;
                        "boolean" === typeof d[d.length - 1] && (l = d.pop());
                        if (1 === d.length) this._addPath(g, 1, 0, 0, 0, 1, 0, 0, 0, 1, l); else if (2 === d.length) d = d[1], this._addPath(g, d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1, l); else if (7 === d.length || 10 === d.length) this._addPath(g, d[1], d[2], d[3], d[4], d[5], d[6], d[7] ||
                            0, d[8] || 0, d[9] || 1, l); else return null;
                        return this
                    };
                    a.Path.prototype.addPoly = function (d, g) {
                        var l = v(d, "HEAPF32");
                        this._addPoly(l, d.length / 2, g);
                        p(l, d);
                        return this
                    };
                    a.Path.prototype.addRect = function (d, g) {
                        d = R(d);
                        this._addRect(d, !!g);
                        return this
                    };
                    a.Path.prototype.addRRect = function (d, g) {
                        d = ta(d);
                        this._addRRect(d, !!g);
                        return this
                    };
                    a.Path.prototype.addVerbsPointsWeights = function (d, g, l) {
                        var r = v(d, "HEAPU8"), x = v(g, "HEAPF32"), C = v(l, "HEAPF32");
                        this._addVerbsPointsWeights(r, d.length, x, g.length, C, l && l.length || 0);
                        p(r, d);
                        p(x, g);
                        p(C, l)
                    };
                    a.Path.prototype.arc = function (d, g, l, r, x, C) {
                        d = a.LTRBRect(d - l, g - l, d + l, g + l);
                        x = (x - r) / Math.PI * 180 - 360 * !!C;
                        C = new a.Path;
                        C.addArc(d, r / Math.PI * 180, x);
                        this.addPath(C, !0);
                        C.delete();
                        return this
                    };
                    a.Path.prototype.arcToOval = function (d, g, l, r) {
                        d = R(d);
                        this._arcToOval(d, g, l, r);
                        return this
                    };
                    a.Path.prototype.arcToRotated = function (d, g, l, r, x, C, K) {
                        this._arcToRotated(d, g, l, !!r, !!x, C, K);
                        return this
                    };
                    a.Path.prototype.arcToTangent = function (d, g, l, r, x) {
                        this._arcToTangent(d, g, l, r, x);
                        return this
                    };
                    a.Path.prototype.close =
                        function () {
                            this._close();
                            return this
                        };
                    a.Path.prototype.conicTo = function (d, g, l, r, x) {
                        this._conicTo(d, g, l, r, x);
                        return this
                    };
                    a.Path.prototype.computeTightBounds = function (d) {
                        this._computeTightBounds(fa);
                        var g = sa.toTypedArray();
                        return d ? (d.set(g), d) : g.slice()
                    };
                    a.Path.prototype.cubicTo = function (d, g, l, r, x, C) {
                        this._cubicTo(d, g, l, r, x, C);
                        return this
                    };
                    a.Path.prototype.dash = function (d, g, l) {
                        return this._dash(d, g, l) ? this : null
                    };
                    a.Path.prototype.getBounds = function (d) {
                        this._getBounds(fa);
                        var g = sa.toTypedArray();
                        return d ?
                            (d.set(g), d) : g.slice()
                    };
                    a.Path.prototype.lineTo = function (d, g) {
                        this._lineTo(d, g);
                        return this
                    };
                    a.Path.prototype.moveTo = function (d, g) {
                        this._moveTo(d, g);
                        return this
                    };
                    a.Path.prototype.offset = function (d, g) {
                        this._transform(1, 0, d, 0, 1, g, 0, 0, 1);
                        return this
                    };
                    a.Path.prototype.quadTo = function (d, g, l, r) {
                        this._quadTo(d, g, l, r);
                        return this
                    };
                    a.Path.prototype.rArcTo = function (d, g, l, r, x, C, K) {
                        this._rArcTo(d, g, l, r, x, C, K);
                        return this
                    };
                    a.Path.prototype.rConicTo = function (d, g, l, r, x) {
                        this._rConicTo(d, g, l, r, x);
                        return this
                    };
                    a.Path.prototype.rCubicTo =
                        function (d, g, l, r, x, C) {
                            this._rCubicTo(d, g, l, r, x, C);
                            return this
                        };
                    a.Path.prototype.rLineTo = function (d, g) {
                        this._rLineTo(d, g);
                        return this
                    };
                    a.Path.prototype.rMoveTo = function (d, g) {
                        this._rMoveTo(d, g);
                        return this
                    };
                    a.Path.prototype.rQuadTo = function (d, g, l, r) {
                        this._rQuadTo(d, g, l, r);
                        return this
                    };
                    a.Path.prototype.stroke = function (d) {
                        d = d || {};
                        d.width = d.width || 1;
                        d.miter_limit = d.miter_limit || 4;
                        d.cap = d.cap || a.StrokeCap.Butt;
                        d.join = d.join || a.StrokeJoin.Miter;
                        d.precision = d.precision || 1;
                        return this._stroke(d) ? this : null
                    };
                    a.Path.prototype.transform = function () {
                        if (1 === arguments.length) {
                            var d = arguments[0];
                            this._transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1)
                        } else if (6 === arguments.length || 9 === arguments.length) d = arguments, this._transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1); else throw "transform expected to take 1 or 9 arguments. Got " + arguments.length;
                        return this
                    };
                    a.Path.prototype.trim = function (d, g, l) {
                        return this._trim(d, g, !!l) ? this : null
                    };
                    a.Image.prototype.encodeToBytes = function (d, g) {
                        var l =
                            a.rf();
                        d = d || a.ImageFormat.PNG;
                        g = g || 100;
                        return l ? this._encodeToBytes(d, g, l) : this._encodeToBytes(d, g)
                    };
                    a.Image.prototype.makeShaderCubic = function (d, g, l, r, x) {
                        x = G(x);
                        return this._makeShaderCubic(d, g, l, r, x)
                    };
                    a.Image.prototype.makeShaderOptions = function (d, g, l, r, x) {
                        x = G(x);
                        return this._makeShaderOptions(d, g, l, r, x)
                    };
                    a.Image.prototype.readPixels = function (d, g, l, r, x) {
                        var C = a.rf();
                        return e(this, d, g, l, r, x, C)
                    };
                    a.Canvas.prototype.clear = function (d) {
                        a.he(this.fe);
                        d = y(d);
                        this._clear(d)
                    };
                    a.Canvas.prototype.clipRRect =
                        function (d, g, l) {
                            a.he(this.fe);
                            d = ta(d);
                            this._clipRRect(d, g, l)
                        };
                    a.Canvas.prototype.clipRect = function (d, g, l) {
                        a.he(this.fe);
                        d = R(d);
                        this._clipRect(d, g, l)
                    };
                    a.Canvas.prototype.concat = function (d) {
                        a.he(this.fe);
                        d = L(d);
                        this._concat(d)
                    };
                    a.Canvas.prototype.drawArc = function (d, g, l, r, x) {
                        a.he(this.fe);
                        d = R(d);
                        this._drawArc(d, g, l, r, x)
                    };
                    a.Canvas.prototype.drawAtlas = function (d, g, l, r, x, C, K) {
                        if (d && r && g && l && g.length === l.length) {
                            a.he(this.fe);
                            x || (x = a.BlendMode.SrcOver);
                            var N = v(g, "HEAPF32"), P = v(l, "HEAPF32"), Y = l.length / 4,
                                W = v(m(C), "HEAPU32");
                            if (K && "B" in K && "C" in K) this._drawAtlasCubic(d, P, N, W, Y, x, K.B, K.C, r); else {
                                let t = a.FilterMode.Linear, D = a.MipmapMode.None;
                                K && (t = K.filter, "mipmap" in K && (D = K.mipmap));
                                this._drawAtlasOptions(d, P, N, W, Y, x, t, D, r)
                            }
                            p(N, g);
                            p(P, l);
                            p(W, C)
                        }
                    };
                    a.Canvas.prototype.drawCircle = function (d, g, l, r) {
                        a.he(this.fe);
                        this._drawCircle(d, g, l, r)
                    };
                    a.Canvas.prototype.drawColor = function (d, g) {
                        a.he(this.fe);
                        d = y(d);
                        void 0 !== g ? this._drawColor(d, g) : this._drawColor(d)
                    };
                    a.Canvas.prototype.drawColorInt = function (d, g) {
                        a.he(this.fe);
                        this._drawColorInt(d, g || a.BlendMode.SrcOver)
                    };
                    a.Canvas.prototype.drawColorComponents = function (d, g, l, r, x) {
                        a.he(this.fe);
                        d = M(d, g, l, r);
                        void 0 !== x ? this._drawColor(d, x) : this._drawColor(d)
                    };
                    a.Canvas.prototype.drawDRRect = function (d, g, l) {
                        a.he(this.fe);
                        d = ta(d, ac);
                        g = ta(g, Ec);
                        this._drawDRRect(d, g, l)
                    };
                    a.Canvas.prototype.drawImage = function (d, g, l, r) {
                        a.he(this.fe);
                        this._drawImage(d, g, l, r || null)
                    };
                    a.Canvas.prototype.drawImageCubic = function (d, g, l, r, x, C) {
                        a.he(this.fe);
                        this._drawImageCubic(d, g, l, r, x, C || null)
                    };
                    a.Canvas.prototype.drawImageOptions =
                        function (d, g, l, r, x, C) {
                            a.he(this.fe);
                            this._drawImageOptions(d, g, l, r, x, C || null)
                        };
                    a.Canvas.prototype.drawImageNine = function (d, g, l, r, x) {
                        a.he(this.fe);
                        g = v(g, "HEAP32", mb);
                        l = R(l);
                        this._drawImageNine(d, g, l, r, x || null)
                    };
                    a.Canvas.prototype.drawImageRect = function (d, g, l, r, x) {
                        a.he(this.fe);
                        R(g, fa);
                        R(l, Pa);
                        this._drawImageRect(d, fa, Pa, r, !!x)
                    };
                    a.Canvas.prototype.drawImageRectCubic = function (d, g, l, r, x, C) {
                        a.he(this.fe);
                        R(g, fa);
                        R(l, Pa);
                        this._drawImageRectCubic(d, fa, Pa, r, x, C || null)
                    };
                    a.Canvas.prototype.drawImageRectOptions =
                        function (d, g, l, r, x, C) {
                            a.he(this.fe);
                            R(g, fa);
                            R(l, Pa);
                            this._drawImageRectOptions(d, fa, Pa, r, x, C || null)
                        };
                    a.Canvas.prototype.drawLine = function (d, g, l, r, x) {
                        a.he(this.fe);
                        this._drawLine(d, g, l, r, x)
                    };
                    a.Canvas.prototype.drawOval = function (d, g) {
                        a.he(this.fe);
                        d = R(d);
                        this._drawOval(d, g)
                    };
                    a.Canvas.prototype.drawPaint = function (d) {
                        a.he(this.fe);
                        this._drawPaint(d)
                    };
                    a.Canvas.prototype.drawParagraph = function (d, g, l) {
                        a.he(this.fe);
                        this._drawParagraph(d, g, l)
                    };
                    a.Canvas.prototype.drawPatch = function (d, g, l, r, x) {
                        if (24 > d.length) throw "Need 12 cubic points";
                        if (g && 4 > g.length) throw "Need 4 colors";
                        if (l && 8 > l.length) throw "Need 4 shader coordinates";
                        a.he(this.fe);
                        const C = v(d, "HEAPF32"), K = g ? v(m(g), "HEAPU32") : V, N = l ? v(l, "HEAPF32") : V;
                        r || (r = a.BlendMode.Modulate);
                        this._drawPatch(C, K, N, r, x);
                        p(N, l);
                        p(K, g);
                        p(C, d)
                    };
                    a.Canvas.prototype.drawPath = function (d, g) {
                        a.he(this.fe);
                        this._drawPath(d, g)
                    };
                    a.Canvas.prototype.drawPicture = function (d) {
                        a.he(this.fe);
                        this._drawPicture(d)
                    };
                    a.Canvas.prototype.drawPoints = function (d, g, l) {
                        a.he(this.fe);
                        var r = v(g, "HEAPF32");
                        this._drawPoints(d,
                            r, g.length / 2, l);
                        p(r, g)
                    };
                    a.Canvas.prototype.drawRRect = function (d, g) {
                        a.he(this.fe);
                        d = ta(d);
                        this._drawRRect(d, g)
                    };
                    a.Canvas.prototype.drawRect = function (d, g) {
                        a.he(this.fe);
                        d = R(d);
                        this._drawRect(d, g)
                    };
                    a.Canvas.prototype.drawRect4f = function (d, g, l, r, x) {
                        a.he(this.fe);
                        this._drawRect4f(d, g, l, r, x)
                    };
                    a.Canvas.prototype.drawShadow = function (d, g, l, r, x, C, K) {
                        a.he(this.fe);
                        var N = v(x, "HEAPF32"), P = v(C, "HEAPF32");
                        g = v(g, "HEAPF32", db);
                        l = v(l, "HEAPF32", cc);
                        this._drawShadow(d, g, l, r, N, P, K);
                        p(N, x);
                        p(P, C)
                    };
                    a.getShadowLocalBounds =
                        function (d, g, l, r, x, C, K) {
                            d = G(d);
                            l = v(l, "HEAPF32", db);
                            r = v(r, "HEAPF32", cc);
                            if (!this._getShadowLocalBounds(d, g, l, r, x, C, fa)) return null;
                            g = sa.toTypedArray();
                            return K ? (K.set(g), K) : g.slice()
                        };
                    a.Canvas.prototype.drawTextBlob = function (d, g, l, r) {
                        a.he(this.fe);
                        this._drawTextBlob(d, g, l, r)
                    };
                    a.Canvas.prototype.drawVertices = function (d, g, l) {
                        a.he(this.fe);
                        this._drawVertices(d, g, l)
                    };
                    a.Canvas.prototype.getDeviceClipBounds = function (d) {
                        this._getDeviceClipBounds(mb);
                        var g = Bb.toTypedArray();
                        d ? d.set(g) : d = g.slice();
                        return d
                    };
                    a.Canvas.prototype.quickReject = function (d) {
                        d = R(d);
                        return this._quickReject(d)
                    };
                    a.Canvas.prototype.getLocalToDevice = function () {
                        this._getLocalToDevice(cb);
                        for (var d = cb, g = Array(16), l = 0; 16 > l; l++) g[l] = a.HEAPF32[d / 4 + l];
                        return g
                    };
                    a.Canvas.prototype.getTotalMatrix = function () {
                        this._getTotalMatrix(Oa);
                        for (var d = Array(9), g = 0; 9 > g; g++) d[g] = a.HEAPF32[Oa / 4 + g];
                        return d
                    };
                    a.Canvas.prototype.makeSurface = function (d) {
                        d = this._makeSurface(d);
                        d.fe = this.fe;
                        return d
                    };
                    a.Canvas.prototype.readPixels = function (d, g, l, r, x) {
                        a.he(this.fe);
                        return e(this, d, g, l, r, x)
                    };
                    a.Canvas.prototype.saveLayer = function (d, g, l, r, x) {
                        g = R(g);
                        return this._saveLayer(d || null, g, l || null, r || 0, x || a.TileMode.Clamp)
                    };
                    a.Canvas.prototype.writePixels = function (d, g, l, r, x, C, K, N) {
                        if (d.byteLength % (g * l)) throw "pixels length must be a multiple of the srcWidth * srcHeight";
                        a.he(this.fe);
                        var P = d.byteLength / (g * l);
                        C = C || a.AlphaType.Unpremul;
                        K = K || a.ColorType.RGBA_8888;
                        N = N || a.ColorSpace.SRGB;
                        var Y = P * g;
                        P = v(d, "HEAPU8");
                        g = this._writePixels({width: g, height: l, colorType: K, alphaType: C, colorSpace: N},
                            P, Y, r, x);
                        p(P, d);
                        return g
                    };
                    a.ColorFilter.MakeBlend = function (d, g, l) {
                        d = y(d);
                        l = l || a.ColorSpace.SRGB;
                        return a.ColorFilter._MakeBlend(d, g, l)
                    };
                    a.ColorFilter.MakeMatrix = function (d) {
                        if (!d || 20 !== d.length) throw "invalid color matrix";
                        var g = v(d, "HEAPF32"), l = a.ColorFilter._makeMatrix(g);
                        p(g, d);
                        return l
                    };
                    a.ContourMeasure.prototype.getPosTan = function (d, g) {
                        this._getPosTan(d, fa);
                        d = sa.toTypedArray();
                        return g ? (g.set(d), g) : d.slice()
                    };
                    a.ImageFilter.prototype.getOutputBounds = function (d, g, l) {
                        d = R(d, fa);
                        g = G(g);
                        this._getOutputBounds(d,
                            g, mb);
                        g = Bb.toTypedArray();
                        return l ? (l.set(g), l) : g.slice()
                    };
                    a.ImageFilter.MakeDropShadow = function (d, g, l, r, x, C) {
                        x = y(x, Ka);
                        return a.ImageFilter._MakeDropShadow(d, g, l, r, x, C)
                    };
                    a.ImageFilter.MakeDropShadowOnly = function (d, g, l, r, x, C) {
                        x = y(x, Ka);
                        return a.ImageFilter._MakeDropShadowOnly(d, g, l, r, x, C)
                    };
                    a.ImageFilter.MakeImage = function (d, g, l, r) {
                        l = R(l, fa);
                        r = R(r, Pa);
                        if ("B" in g && "C" in g) return a.ImageFilter._MakeImageCubic(d, g.B, g.C, l, r);
                        const x = g.filter;
                        let C = a.MipmapMode.None;
                        "mipmap" in g && (C = g.mipmap);
                        return a.ImageFilter._MakeImageOptions(d,
                            x, C, l, r)
                    };
                    a.ImageFilter.MakeMatrixTransform = function (d, g, l) {
                        d = G(d);
                        if ("B" in g && "C" in g) return a.ImageFilter._MakeMatrixTransformCubic(d, g.B, g.C, l);
                        const r = g.filter;
                        let x = a.MipmapMode.None;
                        "mipmap" in g && (x = g.mipmap);
                        return a.ImageFilter._MakeMatrixTransformOptions(d, r, x, l)
                    };
                    a.Paint.prototype.getColor = function () {
                        this._getColor(Ka);
                        return T(Ka)
                    };
                    a.Paint.prototype.setColor = function (d, g) {
                        g = g || null;
                        d = y(d);
                        this._setColor(d, g)
                    };
                    a.Paint.prototype.setColorComponents = function (d, g, l, r, x) {
                        x = x || null;
                        d = M(d, g, l,
                            r);
                        this._setColor(d, x)
                    };
                    a.Path.prototype.getPoint = function (d, g) {
                        this._getPoint(d, fa);
                        d = sa.toTypedArray();
                        return g ? (g[0] = d[0], g[1] = d[1], g) : d.slice(0, 2)
                    };
                    a.Picture.prototype.makeShader = function (d, g, l, r, x) {
                        r = G(r);
                        x = R(x);
                        return this._makeShader(d, g, l, r, x)
                    };
                    a.Picture.prototype.cullRect = function (d) {
                        this._cullRect(fa);
                        var g = sa.toTypedArray();
                        return d ? (d.set(g), d) : g.slice()
                    };
                    a.PictureRecorder.prototype.beginRecording = function (d, g) {
                        d = R(d);
                        return this._beginRecording(d, !!g)
                    };
                    a.Surface.prototype.getCanvas = function () {
                        var d =
                            this._getCanvas();
                        d.fe = this.fe;
                        return d
                    };
                    a.Surface.prototype.makeImageSnapshot = function (d) {
                        a.he(this.fe);
                        d = v(d, "HEAP32", mb);
                        return this._makeImageSnapshot(d)
                    };
                    a.Surface.prototype.makeSurface = function (d) {
                        a.he(this.fe);
                        d = this._makeSurface(d);
                        d.fe = this.fe;
                        return d
                    };
                    a.Surface.prototype.$f = function (d, g) {
                        this.cf || (this.cf = this.getCanvas());
                        return requestAnimationFrame(function () {
                            a.he(this.fe);
                            d(this.cf);
                            this.flush(g)
                        }.bind(this))
                    };
                    a.Surface.prototype.requestAnimationFrame || (a.Surface.prototype.requestAnimationFrame =
                        a.Surface.prototype.$f);
                    a.Surface.prototype.Wf = function (d, g) {
                        this.cf || (this.cf = this.getCanvas());
                        requestAnimationFrame(function () {
                            a.he(this.fe);
                            d(this.cf);
                            this.flush(g);
                            this.dispose()
                        }.bind(this))
                    };
                    a.Surface.prototype.drawOnce || (a.Surface.prototype.drawOnce = a.Surface.prototype.Wf);
                    a.PathEffect.MakeDash = function (d, g) {
                        g || (g = 0);
                        if (!d.length || 1 === d.length % 2) throw "Intervals array must have even length";
                        var l = v(d, "HEAPF32");
                        g = a.PathEffect._MakeDash(l, d.length, g);
                        p(l, d);
                        return g
                    };
                    a.PathEffect.MakeLine2D =
                        function (d, g) {
                            g = G(g);
                            return a.PathEffect._MakeLine2D(d, g)
                        };
                    a.PathEffect.MakePath2D = function (d, g) {
                        d = G(d);
                        return a.PathEffect._MakePath2D(d, g)
                    };
                    a.Shader.MakeColor = function (d, g) {
                        g = g || null;
                        d = y(d);
                        return a.Shader._MakeColor(d, g)
                    };
                    a.Shader.Blend = a.Shader.MakeBlend;
                    a.Shader.Color = a.Shader.MakeColor;
                    a.Shader.MakeLinearGradient = function (d, g, l, r, x, C, K, N) {
                        N = N || null;
                        var P = E(l), Y = v(r, "HEAPF32");
                        K = K || 0;
                        C = G(C);
                        var W = sa.toTypedArray();
                        W.set(d);
                        W.set(g, 2);
                        d = a.Shader._MakeLinearGradient(fa, P.xe, P.colorType, Y, P.count,
                            x, K, C, N);
                        p(P.xe, l);
                        r && p(Y, r);
                        return d
                    };
                    a.Shader.MakeRadialGradient = function (d, g, l, r, x, C, K, N) {
                        N = N || null;
                        var P = E(l), Y = v(r, "HEAPF32");
                        K = K || 0;
                        C = G(C);
                        d = a.Shader._MakeRadialGradient(d[0], d[1], g, P.xe, P.colorType, Y, P.count, x, K, C, N);
                        p(P.xe, l);
                        r && p(Y, r);
                        return d
                    };
                    a.Shader.MakeSweepGradient = function (d, g, l, r, x, C, K, N, P, Y) {
                        Y = Y || null;
                        var W = E(l), t = v(r, "HEAPF32");
                        K = K || 0;
                        N = N || 0;
                        P = P || 360;
                        C = G(C);
                        d = a.Shader._MakeSweepGradient(d, g, W.xe, W.colorType, t, W.count, x, N, P, K, C, Y);
                        p(W.xe, l);
                        r && p(t, r);
                        return d
                    };
                    a.Shader.MakeTwoPointConicalGradient =
                        function (d, g, l, r, x, C, K, N, P, Y) {
                            Y = Y || null;
                            var W = E(x), t = v(C, "HEAPF32");
                            P = P || 0;
                            N = G(N);
                            var D = sa.toTypedArray();
                            D.set(d);
                            D.set(l, 2);
                            d = a.Shader._MakeTwoPointConicalGradient(fa, g, r, W.xe, W.colorType, t, W.count, K, P, N, Y);
                            p(W.xe, x);
                            C && p(t, C);
                            return d
                        };
                    a.Vertices.prototype.bounds = function (d) {
                        this._bounds(fa);
                        var g = sa.toTypedArray();
                        return d ? (d.set(g), d) : g.slice()
                    };
                    a.le && a.le.forEach(function (d) {
                        d()
                    })
                };
                a.computeTonalColors = function (e) {
                    var d = v(e.ambient, "HEAPF32"), g = v(e.spot, "HEAPF32");
                    this._computeTonalColors(d,
                        g);
                    var l = {ambient: T(d), spot: T(g)};
                    p(d, e.ambient);
                    p(g, e.spot);
                    return l
                };
                a.LTRBRect = function (e, d, g, l) {
                    return Float32Array.of(e, d, g, l)
                };
                a.XYWHRect = function (e, d, g, l) {
                    return Float32Array.of(e, d, e + g, d + l)
                };
                a.LTRBiRect = function (e, d, g, l) {
                    return Int32Array.of(e, d, g, l)
                };
                a.XYWHiRect = function (e, d, g, l) {
                    return Int32Array.of(e, d, e + g, d + l)
                };
                a.RRectXY = function (e, d, g) {
                    return Float32Array.of(e[0], e[1], e[2], e[3], d, g, d, g, d, g, d, g)
                };
                a.MakeAnimatedImageFromEncoded = function (e) {
                    e = new Uint8Array(e);
                    var d = a._malloc(e.byteLength);
                    a.HEAPU8.set(e, d);
                    return (e = a._decodeAnimatedImage(d, e.byteLength)) ? e : null
                };
                a.MakeImageFromEncoded = function (e) {
                    e = new Uint8Array(e);
                    var d = a._malloc(e.byteLength);
                    a.HEAPU8.set(e, d);
                    return (e = a._decodeImage(d, e.byteLength)) ? e : null
                };
                var nb = null;
                a.MakeImageFromCanvasImageSource = function (e) {
                    var d = e.width, g = e.height;
                    nb || (nb = document.createElement("canvas"));
                    nb.width = d;
                    nb.height = g;
                    var l = nb.getContext("2d", {willReadFrequently: !0});
                    l.drawImage(e, 0, 0);
                    e = l.getImageData(0, 0, d, g);
                    return a.MakeImage({
                        width: d, height: g,
                        alphaType: a.AlphaType.Unpremul, colorType: a.ColorType.RGBA_8888, colorSpace: a.ColorSpace.SRGB
                    }, e.data, 4 * d)
                };
                a.MakeImage = function (e, d, g) {
                    var l = a._malloc(d.length);
                    a.HEAPU8.set(d, l);
                    return a._MakeImage(e, l, d.length, g)
                };
                a.MakeVertices = function (e, d, g, l, r, x) {
                    var C = r && r.length || 0, K = 0;
                    g && g.length && (K |= 1);
                    l && l.length && (K |= 2);
                    void 0 === x || x || (K |= 4);
                    e = new a._VerticesBuilder(e, d.length / 2, C, K);
                    v(d, "HEAPF32", e.positions());
                    e.texCoords() && v(g, "HEAPF32", e.texCoords());
                    e.colors() && v(m(l), "HEAPU32", e.colors());
                    e.indices() &&
                    v(r, "HEAPU16", e.indices());
                    return e.detach()
                };
                a.Matrix = {};
                a.Matrix.identity = function () {
                    return c(3)
                };
                a.Matrix.invert = function (e) {
                    var d = e[0] * e[4] * e[8] + e[1] * e[5] * e[6] + e[2] * e[3] * e[7] - e[2] * e[4] * e[6] - e[1] * e[3] * e[8] - e[0] * e[5] * e[7];
                    return d ? [(e[4] * e[8] - e[5] * e[7]) / d, (e[2] * e[7] - e[1] * e[8]) / d, (e[1] * e[5] - e[2] * e[4]) / d, (e[5] * e[6] - e[3] * e[8]) / d, (e[0] * e[8] - e[2] * e[6]) / d, (e[2] * e[3] - e[0] * e[5]) / d, (e[3] * e[7] - e[4] * e[6]) / d, (e[1] * e[6] - e[0] * e[7]) / d, (e[0] * e[4] - e[1] * e[3]) / d] : null
                };
                a.Matrix.mapPoints = function (e, d) {
                    for (var g = 0; g <
                    d.length; g += 2) {
                        var l = d[g], r = d[g + 1], x = e[6] * l + e[7] * r + e[8], C = e[3] * l + e[4] * r + e[5];
                        d[g] = (e[0] * l + e[1] * r + e[2]) / x;
                        d[g + 1] = C / x
                    }
                    return d
                };
                a.Matrix.multiply = function () {
                    return lb(3, arguments)
                };
                a.Matrix.rotated = function (e, d, g) {
                    d = d || 0;
                    g = g || 0;
                    var l = Math.sin(e);
                    e = Math.cos(e);
                    return [e, -l, pa(l, g, 1 - e, d), l, e, pa(-l, d, 1 - e, g), 0, 0, 1]
                };
                a.Matrix.scaled = function (e, d, g, l) {
                    g = g || 0;
                    l = l || 0;
                    var r = b([e, d], c(3), 3, 0, 1);
                    return b([g - e * g, l - d * l], r, 3, 2, 0)
                };
                a.Matrix.skewed = function (e, d, g, l) {
                    g = g || 0;
                    l = l || 0;
                    var r = b([e, d], c(3), 3, 1, -1);
                    return b([-e *
                    g, -d * l], r, 3, 2, 0)
                };
                a.Matrix.translated = function (e, d) {
                    return b(arguments, c(3), 3, 2, 0)
                };
                a.Vector = {};
                a.Vector.dot = function (e, d) {
                    return e.map(function (g, l) {
                        return g * d[l]
                    }).reduce(function (g, l) {
                        return g + l
                    })
                };
                a.Vector.lengthSquared = function (e) {
                    return a.Vector.dot(e, e)
                };
                a.Vector.length = function (e) {
                    return Math.sqrt(a.Vector.lengthSquared(e))
                };
                a.Vector.mulScalar = function (e, d) {
                    return e.map(function (g) {
                        return g * d
                    })
                };
                a.Vector.add = function (e, d) {
                    return e.map(function (g, l) {
                        return g + d[l]
                    })
                };
                a.Vector.sub = function (e,
                                         d) {
                    return e.map(function (g, l) {
                        return g - d[l]
                    })
                };
                a.Vector.dist = function (e, d) {
                    return a.Vector.length(a.Vector.sub(e, d))
                };
                a.Vector.normalize = function (e) {
                    return a.Vector.mulScalar(e, 1 / a.Vector.length(e))
                };
                a.Vector.cross = function (e, d) {
                    return [e[1] * d[2] - e[2] * d[1], e[2] * d[0] - e[0] * d[2], e[0] * d[1] - e[1] * d[0]]
                };
                a.M44 = {};
                a.M44.identity = function () {
                    return c(4)
                };
                a.M44.translated = function (e) {
                    return b(e, c(4), 4, 3, 0)
                };
                a.M44.scaled = function (e) {
                    return b(e, c(4), 4, 0, 1)
                };
                a.M44.rotated = function (e, d) {
                    return a.M44.rotatedUnitSinCos(a.Vector.normalize(e),
                        Math.sin(d), Math.cos(d))
                };
                a.M44.rotatedUnitSinCos = function (e, d, g) {
                    var l = e[0], r = e[1];
                    e = e[2];
                    var x = 1 - g;
                    return [x * l * l + g, x * l * r - d * e, x * l * e + d * r, 0, x * l * r + d * e, x * r * r + g, x * r * e - d * l, 0, x * l * e - d * r, x * r * e + d * l, x * e * e + g, 0, 0, 0, 0, 1]
                };
                a.M44.lookat = function (e, d, g) {
                    d = a.Vector.normalize(a.Vector.sub(d, e));
                    g = a.Vector.normalize(g);
                    g = a.Vector.normalize(a.Vector.cross(d, g));
                    var l = a.M44.identity();
                    b(g, l, 4, 0, 0);
                    b(a.Vector.cross(g, d), l, 4, 1, 0);
                    b(a.Vector.mulScalar(d, -1), l, 4, 2, 0);
                    b(e, l, 4, 3, 0);
                    e = a.M44.invert(l);
                    return null === e ? a.M44.identity() :
                        e
                };
                a.M44.perspective = function (e, d, g) {
                    var l = 1 / (d - e);
                    g /= 2;
                    g = Math.cos(g) / Math.sin(g);
                    return [g, 0, 0, 0, 0, g, 0, 0, 0, 0, (d + e) * l, 2 * d * e * l, 0, 0, -1, 1]
                };
                a.M44.rc = function (e, d, g) {
                    return e[4 * d + g]
                };
                a.M44.multiply = function () {
                    return lb(4, arguments)
                };
                a.M44.invert = function (e) {
                    var d = e[0], g = e[4], l = e[8], r = e[12], x = e[1], C = e[5], K = e[9], N = e[13], P = e[2],
                        Y = e[6], W = e[10], t = e[14], D = e[3], U = e[7], ha = e[11];
                    e = e[15];
                    var la = d * C - g * x, ua = d * K - l * x, ya = d * N - r * x, Fa = g * K - l * C,
                        ia = g * N - r * C, I = l * N - r * K, k = P * U - Y * D, q = P * ha - W * D, z = P * e - t * D,
                        B = Y * ha - W * U, F = Y * e - t * U, H = W *
                            e - t * ha, O = la * H - ua * F + ya * B + Fa * z - ia * q + I * k, Z = 1 / O;
                    if (0 === O || Infinity === Z) return null;
                    la *= Z;
                    ua *= Z;
                    ya *= Z;
                    Fa *= Z;
                    ia *= Z;
                    I *= Z;
                    k *= Z;
                    q *= Z;
                    z *= Z;
                    B *= Z;
                    F *= Z;
                    H *= Z;
                    d = [C * H - K * F + N * B, K * z - x * H - N * q, x * F - C * z + N * k, C * q - x * B - K * k, l * F - g * H - r * B, d * H - l * z + r * q, g * z - d * F - r * k, d * B - g * q + l * k, U * I - ha * ia + e * Fa, ha * ya - D * I - e * ua, D * ia - U * ya + e * la, U * ua - D * Fa - ha * la, W * ia - Y * I - t * Fa, P * I - W * ya + t * ua, Y * ya - P * ia - t * la, P * Fa - Y * ua + W * la];
                    return d.every(function (qa) {
                        return !isNaN(qa) && Infinity !== qa && -Infinity !== qa
                    }) ? d : null
                };
                a.M44.transpose = function (e) {
                    return [e[0], e[4], e[8], e[12],
                        e[1], e[5], e[9], e[13], e[2], e[6], e[10], e[14], e[3], e[7], e[11], e[15]]
                };
                a.M44.mustInvert = function (e) {
                    e = a.M44.invert(e);
                    if (null === e) throw "Matrix not invertible";
                    return e
                };
                a.M44.setupCamera = function (e, d, g) {
                    var l = a.M44.lookat(g.eye, g.coa, g.up);
                    g = a.M44.perspective(g.near, g.far, g.angle);
                    d = [(e[2] - e[0]) / 2, (e[3] - e[1]) / 2, d];
                    e = a.M44.multiply(a.M44.translated([(e[0] + e[2]) / 2, (e[1] + e[3]) / 2, 0]), a.M44.scaled(d));
                    return a.M44.multiply(e, g, l, a.M44.mustInvert(e))
                };
                a.ColorMatrix = {};
                a.ColorMatrix.identity = function () {
                    var e =
                        new Float32Array(20);
                    e[0] = 1;
                    e[6] = 1;
                    e[12] = 1;
                    e[18] = 1;
                    return e
                };
                a.ColorMatrix.scaled = function (e, d, g, l) {
                    var r = new Float32Array(20);
                    r[0] = e;
                    r[6] = d;
                    r[12] = g;
                    r[18] = l;
                    return r
                };
                var Id = [[6, 7, 11, 12], [0, 10, 2, 12], [0, 1, 5, 6]];
                a.ColorMatrix.rotated = function (e, d, g) {
                    var l = a.ColorMatrix.identity();
                    e = Id[e];
                    l[e[0]] = g;
                    l[e[1]] = d;
                    l[e[2]] = -d;
                    l[e[3]] = g;
                    return l
                };
                a.ColorMatrix.postTranslate = function (e, d, g, l, r) {
                    e[4] += d;
                    e[9] += g;
                    e[14] += l;
                    e[19] += r;
                    return e
                };
                a.ColorMatrix.concat = function (e, d) {
                    for (var g = new Float32Array(20), l = 0, r =
                        0; 20 > r; r += 5) {
                        for (var x = 0; 4 > x; x++) g[l++] = e[r] * d[x] + e[r + 1] * d[x + 5] + e[r + 2] * d[x + 10] + e[r + 3] * d[x + 15];
                        g[l++] = e[r] * d[4] + e[r + 1] * d[9] + e[r + 2] * d[14] + e[r + 3] * d[19] + e[r + 4]
                    }
                    return g
                };
                (function (e) {
                    e.le = e.le || [];
                    e.le.push(function () {
                        function d(t) {
                            t && (t.dir = 0 === t.dir ? e.TextDirection.RTL : e.TextDirection.LTR);
                            return t
                        }

                        function g(t) {
                            if (!t || !t.length) return [];
                            for (var D = [], U = 0; U < t.length; U += 5) {
                                var ha = e.LTRBRect(t[U], t[U + 1], t[U + 2], t[U + 3]), la = e.TextDirection.LTR;
                                0 === t[U + 4] && (la = e.TextDirection.RTL);
                                D.push({rect: ha, dir: la})
                            }
                            e._free(t.byteOffset);
                            return D
                        }

                        function l(t) {
                            t = t || {};
                            void 0 === t.weight && (t.weight = e.FontWeight.Normal);
                            t.width = t.width || e.FontWidth.Normal;
                            t.slant = t.slant || e.FontSlant.Upright;
                            return t
                        }

                        function r(t) {
                            if (!t || !t.length) return V;
                            for (var D = [], U = 0; U < t.length; U++) {
                                var ha = x(t[U]);
                                D.push(ha)
                            }
                            return v(D, "HEAPU32")
                        }

                        function x(t) {
                            if (N[t]) return N[t];
                            var D = ma(t) + 1, U = e._malloc(D);
                            na(t, J, U, D);
                            return N[t] = U
                        }

                        function C(t) {
                            t._colorPtr = y(t.color);
                            t._foregroundColorPtr = V;
                            t._backgroundColorPtr = V;
                            t._decorationColorPtr = V;
                            t.foregroundColor &&
                            (t._foregroundColorPtr = y(t.foregroundColor, P));
                            t.backgroundColor && (t._backgroundColorPtr = y(t.backgroundColor, Y));
                            t.decorationColor && (t._decorationColorPtr = y(t.decorationColor, W));
                            Array.isArray(t.fontFamilies) && t.fontFamilies.length ? (t._fontFamiliesPtr = r(t.fontFamilies), t._fontFamiliesLen = t.fontFamilies.length) : (t._fontFamiliesPtr = V, t._fontFamiliesLen = 0);
                            if (t.locale) {
                                var D = t.locale;
                                t._localePtr = x(D);
                                t._localeLen = ma(D)
                            } else t._localePtr = V, t._localeLen = 0;
                            if (Array.isArray(t.shadows) && t.shadows.length) {
                                D =
                                    t.shadows;
                                var U = D.map(function (ia) {
                                    return ia.color || e.BLACK
                                }), ha = D.map(function (ia) {
                                    return ia.blurRadius || 0
                                });
                                t._shadowLen = D.length;
                                for (var la = e._malloc(8 * D.length), ua = la / 4, ya = 0; ya < D.length; ya++) {
                                    var Fa = D[ya].offset || [0, 0];
                                    e.HEAPF32[ua] = Fa[0];
                                    e.HEAPF32[ua + 1] = Fa[1];
                                    ua += 2
                                }
                                t._shadowColorsPtr = E(U).xe;
                                t._shadowOffsetsPtr = la;
                                t._shadowBlurRadiiPtr = v(ha, "HEAPF32")
                            } else t._shadowLen = 0, t._shadowColorsPtr = V, t._shadowOffsetsPtr = V, t._shadowBlurRadiiPtr = V;
                            Array.isArray(t.fontFeatures) && t.fontFeatures.length ? (D =
                                t.fontFeatures, U = D.map(function (ia) {
                                return ia.name
                            }), ha = D.map(function (ia) {
                                return ia.value
                            }), t._fontFeatureLen = D.length, t._fontFeatureNamesPtr = r(U), t._fontFeatureValuesPtr = v(ha, "HEAPU32")) : (t._fontFeatureLen = 0, t._fontFeatureNamesPtr = V, t._fontFeatureValuesPtr = V);
                            Array.isArray(t.fontVariations) && t.fontVariations.length ? (D = t.fontVariations, U = D.map(function (ia) {
                                return ia.axis
                            }), ha = D.map(function (ia) {
                                return ia.value
                            }), t._fontVariationLen = D.length, t._fontVariationAxesPtr = r(U), t._fontVariationValuesPtr =
                                v(ha, "HEAPF32")) : (t._fontVariationLen = 0, t._fontVariationAxesPtr = V, t._fontVariationValuesPtr = V)
                        }

                        function K(t) {
                            e._free(t._fontFamiliesPtr);
                            e._free(t._shadowColorsPtr);
                            e._free(t._shadowOffsetsPtr);
                            e._free(t._shadowBlurRadiiPtr);
                            e._free(t._fontFeatureNamesPtr);
                            e._free(t._fontFeatureValuesPtr);
                            e._free(t._fontVariationAxesPtr);
                            e._free(t._fontVariationValuesPtr)
                        }

                        e.Paragraph.prototype.getRectsForRange = function (t, D, U, ha) {
                            t = this._getRectsForRange(t, D, U, ha);
                            return g(t)
                        };
                        e.Paragraph.prototype.getRectsForPlaceholders =
                            function () {
                                var t = this._getRectsForPlaceholders();
                                return g(t)
                            };
                        e.Paragraph.prototype.getGlyphInfoAt = function (t) {
                            return d(this._getGlyphInfoAt(t))
                        };
                        e.Paragraph.prototype.getClosestGlyphInfoAtCoordinate = function (t, D) {
                            return d(this._getClosestGlyphInfoAtCoordinate(t, D))
                        };
                        e.TypefaceFontProvider.prototype.registerFont = function (t, D) {
                            t = e.Typeface.MakeTypefaceFromData(t);
                            if (!t) return null;
                            D = x(D);
                            this._registerFont(t, D);
                            t.delete()
                        };
                        e.ParagraphStyle = function (t) {
                            t.disableHinting = t.disableHinting || !1;
                            if (t.ellipsis) {
                                var D =
                                    t.ellipsis;
                                t._ellipsisPtr = x(D);
                                t._ellipsisLen = ma(D)
                            } else t._ellipsisPtr = V, t._ellipsisLen = 0;
                            null == t.heightMultiplier && (t.heightMultiplier = -1);
                            t.maxLines = t.maxLines || 0;
                            t.replaceTabCharacters = t.replaceTabCharacters || !1;
                            D = (D = t.strutStyle) || {};
                            D.strutEnabled = D.strutEnabled || !1;
                            D.strutEnabled && Array.isArray(D.fontFamilies) && D.fontFamilies.length ? (D._fontFamiliesPtr = r(D.fontFamilies), D._fontFamiliesLen = D.fontFamilies.length) : (D._fontFamiliesPtr = V, D._fontFamiliesLen = 0);
                            D.fontStyle = l(D.fontStyle);
                            null == D.fontSize &&
                            (D.fontSize = -1);
                            null == D.heightMultiplier && (D.heightMultiplier = -1);
                            D.halfLeading = D.halfLeading || !1;
                            D.leading = D.leading || 0;
                            D.forceStrutHeight = D.forceStrutHeight || !1;
                            t.strutStyle = D;
                            t.textAlign = t.textAlign || e.TextAlign.Start;
                            t.textDirection = t.textDirection || e.TextDirection.LTR;
                            t.textHeightBehavior = t.textHeightBehavior || e.TextHeightBehavior.All;
                            t.textStyle = e.TextStyle(t.textStyle);
                            t.applyRoundingHack = !1 !== t.applyRoundingHack;
                            return t
                        };
                        e.TextStyle = function (t) {
                            t.color || (t.color = e.BLACK);
                            t.decoration = t.decoration ||
                                0;
                            t.decorationThickness = t.decorationThickness || 0;
                            t.decorationStyle = t.decorationStyle || e.DecorationStyle.Solid;
                            t.textBaseline = t.textBaseline || e.TextBaseline.Alphabetic;
                            null == t.fontSize && (t.fontSize = -1);
                            t.letterSpacing = t.letterSpacing || 0;
                            t.wordSpacing = t.wordSpacing || 0;
                            null == t.heightMultiplier && (t.heightMultiplier = -1);
                            t.halfLeading = t.halfLeading || !1;
                            t.fontStyle = l(t.fontStyle);
                            return t
                        };
                        var N = {}, P = e._malloc(16), Y = e._malloc(16), W = e._malloc(16);
                        e.ParagraphBuilder.Make = function (t, D) {
                            C(t.textStyle);
                            D = e.ParagraphBuilder._Make(t,
                                D);
                            K(t.textStyle);
                            return D
                        };
                        e.ParagraphBuilder.MakeFromFontProvider = function (t, D) {
                            C(t.textStyle);
                            D = e.ParagraphBuilder._MakeFromFontProvider(t, D);
                            K(t.textStyle);
                            return D
                        };
                        e.ParagraphBuilder.MakeFromFontCollection = function (t, D) {
                            C(t.textStyle);
                            D = e.ParagraphBuilder._MakeFromFontCollection(t, D);
                            K(t.textStyle);
                            return D
                        };
                        e.ParagraphBuilder.ShapeText = function (t, D, U) {
                            let ha = 0;
                            for (const la of D) ha += la.length;
                            if (ha !== t.length) throw "Accumulated block lengths must equal text.length";
                            return e.ParagraphBuilder._ShapeText(t,
                                D, U)
                        };
                        e.ParagraphBuilder.prototype.pushStyle = function (t) {
                            C(t);
                            this._pushStyle(t);
                            K(t)
                        };
                        e.ParagraphBuilder.prototype.pushPaintStyle = function (t, D, U) {
                            C(t);
                            this._pushPaintStyle(t, D, U);
                            K(t)
                        };
                        e.ParagraphBuilder.prototype.addPlaceholder = function (t, D, U, ha, la) {
                            U = U || e.PlaceholderAlignment.Baseline;
                            ha = ha || e.TextBaseline.Alphabetic;
                            this._addPlaceholder(t || 0, D || 0, U, ha, la || 0)
                        };
                        e.ParagraphBuilder.prototype.setWordsUtf8 = function (t) {
                            var D = v(t, "HEAPU32");
                            this._setWordsUtf8(D, t && t.length || 0);
                            p(D, t)
                        };
                        e.ParagraphBuilder.prototype.setWordsUtf16 =
                            function (t) {
                                var D = v(t, "HEAPU32");
                                this._setWordsUtf16(D, t && t.length || 0);
                                p(D, t)
                            };
                        e.ParagraphBuilder.prototype.setGraphemeBreaksUtf8 = function (t) {
                            var D = v(t, "HEAPU32");
                            this._setGraphemeBreaksUtf8(D, t && t.length || 0);
                            p(D, t)
                        };
                        e.ParagraphBuilder.prototype.setGraphemeBreaksUtf16 = function (t) {
                            var D = v(t, "HEAPU32");
                            this._setGraphemeBreaksUtf16(D, t && t.length || 0);
                            p(D, t)
                        };
                        e.ParagraphBuilder.prototype.setLineBreaksUtf8 = function (t) {
                            var D = v(t, "HEAPU32");
                            this._setLineBreaksUtf8(D, t && t.length || 0);
                            p(D, t)
                        };
                        e.ParagraphBuilder.prototype.setLineBreaksUtf16 =
                            function (t) {
                                var D = v(t, "HEAPU32");
                                this._setLineBreaksUtf16(D, t && t.length || 0);
                                p(D, t)
                            }
                    })
                })(w);
                a.MakeManagedAnimation = function (e, d, g, l, r) {
                    if (!a._MakeManagedAnimation) throw "Not compiled with MakeManagedAnimation";
                    g || (g = "");
                    if (!d) return a._MakeManagedAnimation(e, 0, V, V, V, g, l, r);
                    for (var x = [], C = [], K = [], N = Object.keys(d || {}), P = 0; P < N.length; P++) {
                        var Y = N[P], W = new Uint8Array(d[Y]), t = a._malloc(W.byteLength);
                        a.HEAPU8.set(W, t);
                        C.push(t);
                        K.push(W.byteLength);
                        W = ma(Y) + 1;
                        t = a._malloc(W);
                        na(Y, J, t, W);
                        x.push(t)
                    }
                    d = v(x, "HEAPU32");
                    C = v(C, "HEAPU32");
                    K = v(K, "HEAPU32");
                    e = a._MakeManagedAnimation(e, N.length, d, C, K, g, l, r);
                    a._free(d);
                    a._free(C);
                    a._free(K);
                    return e
                };
                a.Og = function (e) {
                    e.text = e.text || "";
                    e.textSize = e.textSize || 0;
                    e.minTextSize = e.minTextSize || 0;
                    e.maxTextSize = e.maxTextSize || Number.MAX_VALUE;
                    e.strokeWidth = e.strokeWidth || 0;
                    e.lineHeight = e.lineHeight || 0;
                    e.lineShift = e.lineShift || 0;
                    e.ascent = e.ascent || 0;
                    e.maxLines = e.maxLines || 0;
                    e.horizAlign = e.horizAlign || a.TextAlign.Left;
                    e.vertAlign = e.vertAlign || a.Pg.Top;
                    e.strokeJoin = e.strokeJoin ||
                        a.StrokeJoin.Miter;
                    e.direction = e.direction || a.TextDirection.LTR;
                    e.linebreak = e.linebreak || a.LineBreakType.HardLineBreak;
                    e.resize = e.resize || a.Ng.None;
                    e.fillColor || (e.fillColor = a.TRANSPARENT);
                    e.strokeColor || (e.strokeColor = a.TRANSPARENT);
                    e.boundingBox || (e.boundingBox = [0, 0, 0, 0]);
                    return e
                };
                (function (e) {
                    e.le = e.le || [];
                    e.le.push(function () {
                        e.Animation.prototype.render = function (d, g) {
                            R(g, fa);
                            this._render(d, fa)
                        };
                        e.Animation.prototype.size = function (d) {
                            this._size(fa);
                            var g = sa.toTypedArray();
                            return d ? (d[0] = g[0],
                                d[1] = g[1], d) : g.slice(0, 2)
                        };
                        e.ManagedAnimation && (e.ManagedAnimation.prototype.render = function (d, g) {
                            R(g, fa);
                            this._render(d, fa)
                        }, e.ManagedAnimation.prototype.seek = function (d, g) {
                            this._seek(d, fa);
                            d = sa.toTypedArray();
                            return g ? (g.set(d), g) : d.slice()
                        }, e.ManagedAnimation.prototype.seekFrame = function (d, g) {
                            this._seekFrame(d, fa);
                            d = sa.toTypedArray();
                            return g ? (g.set(d), g) : d.slice()
                        }, e.ManagedAnimation.prototype.setColor = function (d, g) {
                            g = y(g);
                            return this._setColor(d, g)
                        }, e.ManagedAnimation.prototype.setColorSlot =
                            function (d, g) {
                                g = y(g);
                                return this._setColorSlot(d, g)
                            }, e.ManagedAnimation.prototype.getColorSlot = function (d) {
                            this._getColorSlot(d, Ka);
                            d = T(Ka);
                            return -1 == d[0] ? null : d
                        }, e.ManagedAnimation.prototype.setVec2Slot = function (d, g) {
                            v(g, "HEAPF32", db);
                            return this._setVec2Slot(d, db)
                        }, e.ManagedAnimation.prototype.getVec2Slot = function (d) {
                            this._getVec2Slot(d, db);
                            d = bc.toTypedArray();
                            return -1 === d[2] ? null : d.slice(0, 2)
                        }, e.ManagedAnimation.prototype.setTextSlot = function (d, g) {
                            var l = y(g.fillColor, Ka), r = y(g.strokeColor, fa),
                                x = R(g.boundingBox, Pa);
                            g._fillColorPtr = l;
                            g._strokeColorPtr = r;
                            g._boundingBoxPtr = x;
                            return this._setTextSlot(d, g)
                        }, e.ManagedAnimation.prototype.setTransform = function (d, g, l, r, x, C, K) {
                            g = v([g[0], g[1], l[0], l[1], r[0], r[1], x, C, K], "HEAPF32", Oa);
                            return this._setTransform(d, g)
                        }, e.ManagedAnimation.prototype.size = function (d) {
                            this._size(fa);
                            var g = sa.toTypedArray();
                            return d ? (d[0] = g[0], d[1] = g[1], d) : g.slice(0, 2)
                        })
                    })
                })(w);
                a.le = a.le || [];
                a.le.push(function () {
                    a.Path.prototype.op = function (e, d) {
                        return this._op(e, d) ? this : null
                    };
                    a.Path.prototype.simplify = function () {
                        return this._simplify() ? this : null
                    }
                });
                a.le = a.le || [];
                a.le.push(function () {
                    a.Canvas.prototype.drawText = function (e, d, g, l, r) {
                        var x = ma(e), C = a._malloc(x + 1);
                        na(e, J, C, x + 1);
                        this._drawSimpleText(C, x, d, g, r, l);
                        a._free(C)
                    };
                    a.Canvas.prototype.drawGlyphs = function (e, d, g, l, r, x) {
                        if (!(2 * e.length <= d.length)) throw "Not enough positions for the array of gyphs";
                        a.he(this.fe);
                        const C = v(e, "HEAPU16"), K = v(d, "HEAPF32");
                        this._drawGlyphs(e.length, C, K, g, l, r, x);
                        p(K, d);
                        p(C, e)
                    };
                    a.Font.prototype.getGlyphBounds =
                        function (e, d, g) {
                            var l = v(e, "HEAPU16"), r = a._malloc(16 * e.length);
                            this._getGlyphWidthBounds(l, e.length, V, r, d || null);
                            d = new Float32Array(a.HEAPU8.buffer, r, 4 * e.length);
                            p(l, e);
                            if (g) return g.set(d), a._free(r), g;
                            e = Float32Array.from(d);
                            a._free(r);
                            return e
                        };
                    a.Font.prototype.getGlyphIDs = function (e, d, g) {
                        d || (d = e.length);
                        var l = ma(e) + 1, r = a._malloc(l);
                        na(e, J, r, l);
                        e = a._malloc(2 * d);
                        d = this._getGlyphIDs(r, l - 1, d, e);
                        a._free(r);
                        if (0 > d) return a._free(e), null;
                        r = new Uint16Array(a.HEAPU8.buffer, e, d);
                        if (g) return g.set(r), a._free(e),
                            g;
                        g = Uint16Array.from(r);
                        a._free(e);
                        return g
                    };
                    a.Font.prototype.getGlyphIntercepts = function (e, d, g, l) {
                        var r = v(e, "HEAPU16"), x = v(d, "HEAPF32");
                        return this._getGlyphIntercepts(r, e.length, !(e && e._ck), x, d.length, !(d && d._ck), g, l)
                    };
                    a.Font.prototype.getGlyphWidths = function (e, d, g) {
                        var l = v(e, "HEAPU16"), r = a._malloc(4 * e.length);
                        this._getGlyphWidthBounds(l, e.length, r, V, d || null);
                        d = new Float32Array(a.HEAPU8.buffer, r, e.length);
                        p(l, e);
                        if (g) return g.set(d), a._free(r), g;
                        e = Float32Array.from(d);
                        a._free(r);
                        return e
                    };
                    a.FontMgr.FromData =
                        function () {
                            if (!arguments.length) return null;
                            var e = arguments;
                            1 === e.length && Array.isArray(e[0]) && (e = arguments[0]);
                            if (!e.length) return null;
                            for (var d = [], g = [], l = 0; l < e.length; l++) {
                                var r = new Uint8Array(e[l]), x = v(r, "HEAPU8");
                                d.push(x);
                                g.push(r.byteLength)
                            }
                            d = v(d, "HEAPU32");
                            g = v(g, "HEAPU32");
                            e = a.FontMgr._fromData(d, g, e.length);
                            a._free(d);
                            a._free(g);
                            return e
                        };
                    a.Typeface.MakeTypefaceFromData = function (e) {
                        e = new Uint8Array(e);
                        var d = v(e, "HEAPU8");
                        return (e = a.Typeface._MakeTypefaceFromData(d, e.byteLength)) ? e : null
                    };
                    a.Typeface.MakeFreeTypeFaceFromData = a.Typeface.MakeTypefaceFromData;
                    a.Typeface.prototype.getGlyphIDs = function (e, d, g) {
                        d || (d = e.length);
                        var l = ma(e) + 1, r = a._malloc(l);
                        na(e, J, r, l);
                        e = a._malloc(2 * d);
                        d = this._getGlyphIDs(r, l - 1, d, e);
                        a._free(r);
                        if (0 > d) return a._free(e), null;
                        r = new Uint16Array(a.HEAPU8.buffer, e, d);
                        if (g) return g.set(r), a._free(e), g;
                        g = Uint16Array.from(r);
                        a._free(e);
                        return g
                    };
                    a.TextBlob.MakeOnPath = function (e, d, g, l) {
                        if (e && e.length && d && d.countPoints()) {
                            if (1 === d.countPoints()) return this.MakeFromText(e,
                                g);
                            l || (l = 0);
                            var r = g.getGlyphIDs(e);
                            r = g.getGlyphWidths(r);
                            var x = [];
                            d = new a.ContourMeasureIter(d, !1, 1);
                            for (var C = d.next(), K = new Float32Array(4), N = 0; N < e.length && C; N++) {
                                var P = r[N];
                                l += P / 2;
                                if (l > C.length()) {
                                    C.delete();
                                    C = d.next();
                                    if (!C) {
                                        e = e.substring(0, N);
                                        break
                                    }
                                    l = P / 2
                                }
                                C.getPosTan(l, K);
                                var Y = K[2], W = K[3];
                                x.push(Y, W, K[0] - P / 2 * Y, K[1] - P / 2 * W);
                                l += P / 2
                            }
                            e = this.MakeFromRSXform(e, x, g);
                            C && C.delete();
                            d.delete();
                            return e
                        }
                    };
                    a.TextBlob.MakeFromRSXform = function (e, d, g) {
                        var l = ma(e) + 1, r = a._malloc(l);
                        na(e, J, r, l);
                        e = v(d, "HEAPF32");
                        g = a.TextBlob._MakeFromRSXform(r, l - 1, e, g);
                        a._free(r);
                        return g ? g : null
                    };
                    a.TextBlob.MakeFromRSXformGlyphs = function (e, d, g) {
                        var l = v(e, "HEAPU16");
                        d = v(d, "HEAPF32");
                        g = a.TextBlob._MakeFromRSXformGlyphs(l, 2 * e.length, d, g);
                        p(l, e);
                        return g ? g : null
                    };
                    a.TextBlob.MakeFromGlyphs = function (e, d) {
                        var g = v(e, "HEAPU16");
                        d = a.TextBlob._MakeFromGlyphs(g, 2 * e.length, d);
                        p(g, e);
                        return d ? d : null
                    };
                    a.TextBlob.MakeFromText = function (e, d) {
                        var g = ma(e) + 1, l = a._malloc(g);
                        na(e, J, l, g);
                        e = a.TextBlob._MakeFromText(l, g - 1, d);
                        a._free(l);
                        return e ? e :
                            null
                    };
                    a.MallocGlyphIDs = function (e) {
                        return a.Malloc(Uint16Array, e)
                    }
                });
                a.le = a.le || [];
                a.le.push(function () {
                    a.MakePicture = function (e) {
                        e = new Uint8Array(e);
                        var d = a._malloc(e.byteLength);
                        a.HEAPU8.set(e, d);
                        return (e = a._MakePicture(d, e.byteLength)) ? e : null
                    }
                });
                a.le = a.le || [];
                a.le.push(function () {
                    a.RuntimeEffect.Make = function (e, d) {
                        return a.RuntimeEffect._Make(e, {
                            onError: d || function (g) {
                                console.log("RuntimeEffect error", g)
                            }
                        })
                    };
                    a.RuntimeEffect.MakeForBlender = function (e, d) {
                        return a.RuntimeEffect._MakeForBlender(e,
                            {
                                onError: d || function (g) {
                                    console.log("RuntimeEffect error", g)
                                }
                            })
                    };
                    a.RuntimeEffect.prototype.makeShader = function (e, d) {
                        var g = !e._ck, l = v(e, "HEAPF32");
                        d = G(d);
                        return this._makeShader(l, 4 * e.length, g, d)
                    };
                    a.RuntimeEffect.prototype.makeShaderWithChildren = function (e, d, g) {
                        var l = !e._ck, r = v(e, "HEAPF32");
                        g = G(g);
                        for (var x = [], C = 0; C < d.length; C++) x.push(d[C].ee.ne);
                        d = v(x, "HEAPU32");
                        return this._makeShaderWithChildren(r, 4 * e.length, l, d, x.length, g)
                    };
                    a.RuntimeEffect.prototype.makeBlender = function (e) {
                        var d = !e._ck, g = v(e,
                            "HEAPF32");
                        return this._makeBlender(g, 4 * e.length, d)
                    }
                });
                (function () {
                    function e(I) {
                        for (var k = 0; k < I.length; k++) if (void 0 !== I[k] && !Number.isFinite(I[k])) return !1;
                        return !0
                    }

                    function d(I) {
                        var k = a.getColorComponents(I);
                        I = k[0];
                        var q = k[1], z = k[2];
                        k = k[3];
                        if (1 === k) return I = I.toString(16).toLowerCase(), q = q.toString(16).toLowerCase(), z = z.toString(16).toLowerCase(), I = 1 === I.length ? "0" + I : I, q = 1 === q.length ? "0" + q : q, z = 1 === z.length ? "0" + z : z, "#" + I + q + z;
                        k = 0 === k || 1 === k ? k : k.toFixed(8);
                        return "rgba(" + I + ", " + q + ", " + z + ", " + k + ")"
                    }

                    function g(I) {
                        return a.parseColorString(I, ya)
                    }

                    function l(I) {
                        I = Fa.exec(I);
                        if (!I) return null;
                        var k = parseFloat(I[4]), q = 16;
                        switch (I[5]) {
                            case "em":
                            case "rem":
                                q = 16 * k;
                                break;
                            case "pt":
                                q = 4 * k / 3;
                                break;
                            case "px":
                                q = k;
                                break;
                            case "pc":
                                q = 16 * k;
                                break;
                            case "in":
                                q = 96 * k;
                                break;
                            case "cm":
                                q = 96 * k / 2.54;
                                break;
                            case "mm":
                                q = 96 / 25.4 * k;
                                break;
                            case "q":
                                q = 96 / 25.4 / 4 * k;
                                break;
                            case "%":
                                q = 16 / 75 * k
                        }
                        return {style: I[1], variant: I[2], weight: I[3], sizePx: q, family: I[6].trim()}
                    }

                    function r() {
                        ia || (ia = {
                            "Noto Mono": {"*": a.Typeface.GetDefault()},
                            monospace: {"*": a.Typeface.GetDefault()}
                        })
                    }

                    function x(I) {
                        this.ge = I;
                        this.je = new a.Paint;
                        this.je.setAntiAlias(!0);
                        this.je.setStrokeMiter(10);
                        this.je.setStrokeCap(a.StrokeCap.Butt);
                        this.je.setStrokeJoin(a.StrokeJoin.Miter);
                        this.pf = "10px monospace";
                        this.Je = new a.Font(a.Typeface.GetDefault(), 10);
                        this.Je.setSubpixel(!0);
                        this.we = this.Ce = a.BLACK;
                        this.Se = 0;
                        this.ef = a.TRANSPARENT;
                        this.Ue = this.Te = 0;
                        this.ff = this.Fe = 1;
                        this.df = 0;
                        this.Re = [];
                        this.ie = a.BlendMode.SrcOver;
                        this.je.setStrokeWidth(this.ff);
                        this.je.setBlendMode(this.ie);
                        this.me = new a.Path;
                        this.oe =
                            a.Matrix.identity();
                        this.Jf = [];
                        this.Ye = [];
                        this.Ie = function () {
                            this.me.delete();
                            this.je.delete();
                            this.Je.delete();
                            this.Ye.forEach(function (k) {
                                k.Ie()
                            })
                        };
                        Object.defineProperty(this, "currentTransform", {
                            enumerable: !0, get: function () {
                                return {
                                    a: this.oe[0],
                                    c: this.oe[1],
                                    e: this.oe[2],
                                    b: this.oe[3],
                                    d: this.oe[4],
                                    f: this.oe[5]
                                }
                            }, set: function (k) {
                                k.a && this.setTransform(k.a, k.b, k.c, k.d, k.e, k.f)
                            }
                        });
                        Object.defineProperty(this, "fillStyle", {
                            enumerable: !0, get: function () {
                                return f(this.we) ? d(this.we) : this.we
                            }, set: function (k) {
                                "string" ===
                                typeof k ? this.we = g(k) : k.Qe && (this.we = k)
                            }
                        });
                        Object.defineProperty(this, "font", {
                            enumerable: !0, get: function () {
                                return this.pf
                            }, set: function (k) {
                                var q = l(k);
                                var z = (q.style || "normal") + "|" + (q.variant || "normal") + "|" + (q.weight || "normal");
                                var B = q.family;
                                r();
                                z = ia[B] ? ia[B][z] || ia[B]["*"] : a.Typeface.GetDefault();
                                q.typeface = z;
                                q && (this.Je.setSize(q.sizePx), this.Je.setTypeface(q.typeface), this.pf = k)
                            }
                        });
                        Object.defineProperty(this, "globalAlpha", {
                            enumerable: !0, get: function () {
                                return this.Fe
                            }, set: function (k) {
                                !isFinite(k) ||
                                0 > k || 1 < k || (this.Fe = k)
                            }
                        });
                        Object.defineProperty(this, "globalCompositeOperation", {
                            enumerable: !0, get: function () {
                                switch (this.ie) {
                                    case a.BlendMode.SrcOver:
                                        return "source-over";
                                    case a.BlendMode.DstOver:
                                        return "destination-over";
                                    case a.BlendMode.Src:
                                        return "copy";
                                    case a.BlendMode.Dst:
                                        return "destination";
                                    case a.BlendMode.Clear:
                                        return "clear";
                                    case a.BlendMode.SrcIn:
                                        return "source-in";
                                    case a.BlendMode.DstIn:
                                        return "destination-in";
                                    case a.BlendMode.SrcOut:
                                        return "source-out";
                                    case a.BlendMode.DstOut:
                                        return "destination-out";
                                    case a.BlendMode.SrcATop:
                                        return "source-atop";
                                    case a.BlendMode.DstATop:
                                        return "destination-atop";
                                    case a.BlendMode.Xor:
                                        return "xor";
                                    case a.BlendMode.Plus:
                                        return "lighter";
                                    case a.BlendMode.Multiply:
                                        return "multiply";
                                    case a.BlendMode.Screen:
                                        return "screen";
                                    case a.BlendMode.Overlay:
                                        return "overlay";
                                    case a.BlendMode.Darken:
                                        return "darken";
                                    case a.BlendMode.Lighten:
                                        return "lighten";
                                    case a.BlendMode.ColorDodge:
                                        return "color-dodge";
                                    case a.BlendMode.ColorBurn:
                                        return "color-burn";
                                    case a.BlendMode.HardLight:
                                        return "hard-light";
                                    case a.BlendMode.SoftLight:
                                        return "soft-light";
                                    case a.BlendMode.Difference:
                                        return "difference";
                                    case a.BlendMode.Exclusion:
                                        return "exclusion";
                                    case a.BlendMode.Hue:
                                        return "hue";
                                    case a.BlendMode.Saturation:
                                        return "saturation";
                                    case a.BlendMode.Color:
                                        return "color";
                                    case a.BlendMode.Luminosity:
                                        return "luminosity"
                                }
                            }, set: function (k) {
                                switch (k) {
                                    case "source-over":
                                        this.ie = a.BlendMode.SrcOver;
                                        break;
                                    case "destination-over":
                                        this.ie = a.BlendMode.DstOver;
                                        break;
                                    case "copy":
                                        this.ie = a.BlendMode.Src;
                                        break;
                                    case "destination":
                                        this.ie =
                                            a.BlendMode.Dst;
                                        break;
                                    case "clear":
                                        this.ie = a.BlendMode.Clear;
                                        break;
                                    case "source-in":
                                        this.ie = a.BlendMode.SrcIn;
                                        break;
                                    case "destination-in":
                                        this.ie = a.BlendMode.DstIn;
                                        break;
                                    case "source-out":
                                        this.ie = a.BlendMode.SrcOut;
                                        break;
                                    case "destination-out":
                                        this.ie = a.BlendMode.DstOut;
                                        break;
                                    case "source-atop":
                                        this.ie = a.BlendMode.SrcATop;
                                        break;
                                    case "destination-atop":
                                        this.ie = a.BlendMode.DstATop;
                                        break;
                                    case "xor":
                                        this.ie = a.BlendMode.Xor;
                                        break;
                                    case "lighter":
                                        this.ie = a.BlendMode.Plus;
                                        break;
                                    case "plus-lighter":
                                        this.ie =
                                            a.BlendMode.Plus;
                                        break;
                                    case "plus-darker":
                                        throw "plus-darker is not supported";
                                    case "multiply":
                                        this.ie = a.BlendMode.Multiply;
                                        break;
                                    case "screen":
                                        this.ie = a.BlendMode.Screen;
                                        break;
                                    case "overlay":
                                        this.ie = a.BlendMode.Overlay;
                                        break;
                                    case "darken":
                                        this.ie = a.BlendMode.Darken;
                                        break;
                                    case "lighten":
                                        this.ie = a.BlendMode.Lighten;
                                        break;
                                    case "color-dodge":
                                        this.ie = a.BlendMode.ColorDodge;
                                        break;
                                    case "color-burn":
                                        this.ie = a.BlendMode.ColorBurn;
                                        break;
                                    case "hard-light":
                                        this.ie = a.BlendMode.HardLight;
                                        break;
                                    case "soft-light":
                                        this.ie =
                                            a.BlendMode.SoftLight;
                                        break;
                                    case "difference":
                                        this.ie = a.BlendMode.Difference;
                                        break;
                                    case "exclusion":
                                        this.ie = a.BlendMode.Exclusion;
                                        break;
                                    case "hue":
                                        this.ie = a.BlendMode.Hue;
                                        break;
                                    case "saturation":
                                        this.ie = a.BlendMode.Saturation;
                                        break;
                                    case "color":
                                        this.ie = a.BlendMode.Color;
                                        break;
                                    case "luminosity":
                                        this.ie = a.BlendMode.Luminosity;
                                        break;
                                    default:
                                        return
                                }
                                this.je.setBlendMode(this.ie)
                            }
                        });
                        Object.defineProperty(this, "imageSmoothingEnabled", {
                            enumerable: !0, get: function () {
                                return !0
                            }, set: function () {
                            }
                        });
                        Object.defineProperty(this,
                            "imageSmoothingQuality", {
                                enumerable: !0, get: function () {
                                    return "high"
                                }, set: function () {
                                }
                            });
                        Object.defineProperty(this, "lineCap", {
                            enumerable: !0, get: function () {
                                switch (this.je.getStrokeCap()) {
                                    case a.StrokeCap.Butt:
                                        return "butt";
                                    case a.StrokeCap.Round:
                                        return "round";
                                    case a.StrokeCap.Square:
                                        return "square"
                                }
                            }, set: function (k) {
                                switch (k) {
                                    case "butt":
                                        this.je.setStrokeCap(a.StrokeCap.Butt);
                                        break;
                                    case "round":
                                        this.je.setStrokeCap(a.StrokeCap.Round);
                                        break;
                                    case "square":
                                        this.je.setStrokeCap(a.StrokeCap.Square)
                                }
                            }
                        });
                        Object.defineProperty(this,
                            "lineDashOffset", {
                                enumerable: !0, get: function () {
                                    return this.df
                                }, set: function (k) {
                                    isFinite(k) && (this.df = k)
                                }
                            });
                        Object.defineProperty(this, "lineJoin", {
                            enumerable: !0, get: function () {
                                switch (this.je.getStrokeJoin()) {
                                    case a.StrokeJoin.Miter:
                                        return "miter";
                                    case a.StrokeJoin.Round:
                                        return "round";
                                    case a.StrokeJoin.Bevel:
                                        return "bevel"
                                }
                            }, set: function (k) {
                                switch (k) {
                                    case "miter":
                                        this.je.setStrokeJoin(a.StrokeJoin.Miter);
                                        break;
                                    case "round":
                                        this.je.setStrokeJoin(a.StrokeJoin.Round);
                                        break;
                                    case "bevel":
                                        this.je.setStrokeJoin(a.StrokeJoin.Bevel)
                                }
                            }
                        });
                        Object.defineProperty(this, "lineWidth", {
                            enumerable: !0, get: function () {
                                return this.je.getStrokeWidth()
                            }, set: function (k) {
                                0 >= k || !k || (this.ff = k, this.je.setStrokeWidth(k))
                            }
                        });
                        Object.defineProperty(this, "miterLimit", {
                            enumerable: !0, get: function () {
                                return this.je.getStrokeMiter()
                            }, set: function (k) {
                                0 >= k || !k || this.je.setStrokeMiter(k)
                            }
                        });
                        Object.defineProperty(this, "shadowBlur", {
                            enumerable: !0, get: function () {
                                return this.Se
                            }, set: function (k) {
                                0 > k || !isFinite(k) || (this.Se = k)
                            }
                        });
                        Object.defineProperty(this, "shadowColor",
                            {
                                enumerable: !0, get: function () {
                                    return d(this.ef)
                                }, set: function (k) {
                                    this.ef = g(k)
                                }
                            });
                        Object.defineProperty(this, "shadowOffsetX", {
                            enumerable: !0, get: function () {
                                return this.Te
                            }, set: function (k) {
                                isFinite(k) && (this.Te = k)
                            }
                        });
                        Object.defineProperty(this, "shadowOffsetY", {
                            enumerable: !0, get: function () {
                                return this.Ue
                            }, set: function (k) {
                                isFinite(k) && (this.Ue = k)
                            }
                        });
                        Object.defineProperty(this, "strokeStyle", {
                            enumerable: !0, get: function () {
                                return d(this.Ce)
                            }, set: function (k) {
                                "string" === typeof k ? this.Ce = g(k) : k.Qe && (this.Ce =
                                    k)
                            }
                        });
                        this.arc = function (k, q, z, B, F, H) {
                            D(this.me, k, q, z, z, 0, B, F, H)
                        };
                        this.arcTo = function (k, q, z, B, F) {
                            Y(this.me, k, q, z, B, F)
                        };
                        this.beginPath = function () {
                            this.me.delete();
                            this.me = new a.Path
                        };
                        this.bezierCurveTo = function (k, q, z, B, F, H) {
                            var O = this.me;
                            e([k, q, z, B, F, H]) && (O.isEmpty() && O.moveTo(k, q), O.cubicTo(k, q, z, B, F, H))
                        };
                        this.clearRect = function (k, q, z, B) {
                            this.je.setStyle(a.PaintStyle.Fill);
                            this.je.setBlendMode(a.BlendMode.Clear);
                            this.ge.drawRect(a.XYWHRect(k, q, z, B), this.je);
                            this.je.setBlendMode(this.ie)
                        };
                        this.clip =
                            function (k, q) {
                                "string" === typeof k ? (q = k, k = this.me) : k && k.zf && (k = k.pe);
                                k || (k = this.me);
                                k = k.copy();
                                q && "evenodd" === q.toLowerCase() ? k.setFillType(a.FillType.EvenOdd) : k.setFillType(a.FillType.Winding);
                                this.ge.clipPath(k, a.ClipOp.Intersect, !0);
                                k.delete()
                            };
                        this.closePath = function () {
                            W(this.me)
                        };
                        this.createImageData = function () {
                            if (1 === arguments.length) {
                                var k = arguments[0];
                                return new N(new Uint8ClampedArray(4 * k.width * k.height), k.width, k.height)
                            }
                            if (2 === arguments.length) {
                                k = arguments[0];
                                var q = arguments[1];
                                return new N(new Uint8ClampedArray(4 *
                                    k * q), k, q)
                            }
                            throw "createImageData expects 1 or 2 arguments, got " + arguments.length;
                        };
                        this.createLinearGradient = function (k, q, z, B) {
                            if (e(arguments)) {
                                var F = new P(k, q, z, B);
                                this.Ye.push(F);
                                return F
                            }
                        };
                        this.createPattern = function (k, q) {
                            k = new la(k, q);
                            this.Ye.push(k);
                            return k
                        };
                        this.createRadialGradient = function (k, q, z, B, F, H) {
                            if (e(arguments)) {
                                var O = new ua(k, q, z, B, F, H);
                                this.Ye.push(O);
                                return O
                            }
                        };
                        this.drawImage = function (k) {
                            k instanceof K && (k = k.Pf());
                            var q = this.nf();
                            if (3 === arguments.length || 5 === arguments.length) var z =
                                    a.XYWHRect(arguments[1], arguments[2], arguments[3] || k.width(), arguments[4] || k.height()),
                                B = a.XYWHRect(0, 0, k.width(), k.height()); else if (9 === arguments.length) z = a.XYWHRect(arguments[5], arguments[6], arguments[7], arguments[8]), B = a.XYWHRect(arguments[1], arguments[2], arguments[3], arguments[4]); else throw "invalid number of args for drawImage, need 3, 5, or 9; got " + arguments.length;
                            this.ge.drawImageRect(k, B, z, q, !1);
                            q.dispose()
                        };
                        this.ellipse = function (k, q, z, B, F, H, O, Z) {
                            D(this.me, k, q, z, B, F, H, O, Z)
                        };
                        this.nf = function () {
                            var k =
                                this.je.copy();
                            k.setStyle(a.PaintStyle.Fill);
                            if (f(this.we)) {
                                var q = a.multiplyByAlpha(this.we, this.Fe);
                                k.setColor(q)
                            } else q = this.we.Qe(this.oe), k.setColor(a.Color(0, 0, 0, this.Fe)), k.setShader(q);
                            k.dispose = function () {
                                this.delete()
                            };
                            return k
                        };
                        this.fill = function (k, q) {
                            "string" === typeof k ? (q = k, k = this.me) : k && k.zf && (k = k.pe);
                            if ("evenodd" === q) this.me.setFillType(a.FillType.EvenOdd); else {
                                if ("nonzero" !== q && q) throw "invalid fill rule";
                                this.me.setFillType(a.FillType.Winding)
                            }
                            k || (k = this.me);
                            q = this.nf();
                            var z = this.Ve(q);
                            z && (this.ge.save(), this.Oe(), this.ge.drawPath(k, z), this.ge.restore(), z.dispose());
                            this.ge.drawPath(k, q);
                            q.dispose()
                        };
                        this.fillRect = function (k, q, z, B) {
                            var F = this.nf(), H = this.Ve(F);
                            H && (this.ge.save(), this.Oe(), this.ge.drawRect(a.XYWHRect(k, q, z, B), H), this.ge.restore(), H.dispose());
                            this.ge.drawRect(a.XYWHRect(k, q, z, B), F);
                            F.dispose()
                        };
                        this.fillText = function (k, q, z) {
                            var B = this.nf();
                            k = a.TextBlob.MakeFromText(k, this.Je);
                            var F = this.Ve(B);
                            F && (this.ge.save(), this.Oe(), this.ge.drawTextBlob(k, q, z, F), this.ge.restore(),
                                F.dispose());
                            this.ge.drawTextBlob(k, q, z, B);
                            k.delete();
                            B.dispose()
                        };
                        this.getImageData = function (k, q, z, B) {
                            return (k = this.ge.readPixels(k, q, {
                                width: z,
                                height: B,
                                colorType: a.ColorType.RGBA_8888,
                                alphaType: a.AlphaType.Unpremul,
                                colorSpace: a.ColorSpace.SRGB
                            })) ? new N(new Uint8ClampedArray(k.buffer), z, B) : null
                        };
                        this.getLineDash = function () {
                            return this.Re.slice()
                        };
                        this.Kf = function (k) {
                            var q = a.Matrix.invert(this.oe);
                            a.Matrix.mapPoints(q, k);
                            return k
                        };
                        this.isPointInPath = function (k, q, z) {
                            var B = arguments;
                            if (3 === B.length) var F =
                                this.me; else if (4 === B.length) F = B[0], k = B[1], q = B[2], z = B[3]; else throw "invalid arg count, need 3 or 4, got " + B.length;
                            if (!isFinite(k) || !isFinite(q)) return !1;
                            z = z || "nonzero";
                            if ("nonzero" !== z && "evenodd" !== z) return !1;
                            B = this.Kf([k, q]);
                            k = B[0];
                            q = B[1];
                            F.setFillType("nonzero" === z ? a.FillType.Winding : a.FillType.EvenOdd);
                            return F.contains(k, q)
                        };
                        this.isPointInStroke = function (k, q) {
                            var z = arguments;
                            if (2 === z.length) var B = this.me; else if (3 === z.length) B = z[0], k = z[1], q = z[2]; else throw "invalid arg count, need 2 or 3, got " +
                            z.length;
                            if (!isFinite(k) || !isFinite(q)) return !1;
                            z = this.Kf([k, q]);
                            k = z[0];
                            q = z[1];
                            B = B.copy();
                            B.setFillType(a.FillType.Winding);
                            B.stroke({
                                width: this.lineWidth,
                                miter_limit: this.miterLimit,
                                cap: this.je.getStrokeCap(),
                                join: this.je.getStrokeJoin(),
                                precision: .3
                            });
                            z = B.contains(k, q);
                            B.delete();
                            return z
                        };
                        this.lineTo = function (k, q) {
                            U(this.me, k, q)
                        };
                        this.measureText = function (k) {
                            k = this.Je.getGlyphIDs(k);
                            k = this.Je.getGlyphWidths(k);
                            let q = 0;
                            for (const z of k) q += z;
                            return {width: q}
                        };
                        this.moveTo = function (k, q) {
                            var z = this.me;
                            e([k, q]) && z.moveTo(k, q)
                        };
                        this.putImageData = function (k, q, z, B, F, H, O) {
                            if (e([q, z, B, F, H, O])) if (void 0 === B) this.ge.writePixels(k.data, k.width, k.height, q, z); else if (B = B || 0, F = F || 0, H = H || k.width, O = O || k.height, 0 > H && (B += H, H = Math.abs(H)), 0 > O && (F += O, O = Math.abs(O)), 0 > B && (H += B, B = 0), 0 > F && (O += F, F = 0), !(0 >= H || 0 >= O)) {
                                k = a.MakeImage({
                                    width: k.width,
                                    height: k.height,
                                    alphaType: a.AlphaType.Unpremul,
                                    colorType: a.ColorType.RGBA_8888,
                                    colorSpace: a.ColorSpace.SRGB
                                }, k.data, 4 * k.width);
                                var Z = a.XYWHRect(B, F, H, O);
                                q = a.XYWHRect(q + B, z + F,
                                    H, O);
                                z = a.Matrix.invert(this.oe);
                                this.ge.save();
                                this.ge.concat(z);
                                this.ge.drawImageRect(k, Z, q, null, !1);
                                this.ge.restore();
                                k.delete()
                            }
                        };
                        this.quadraticCurveTo = function (k, q, z, B) {
                            var F = this.me;
                            e([k, q, z, B]) && (F.isEmpty() && F.moveTo(k, q), F.quadTo(k, q, z, B))
                        };
                        this.rect = function (k, q, z, B) {
                            var F = this.me;
                            k = a.XYWHRect(k, q, z, B);
                            e(k) && F.addRect(k)
                        };
                        this.resetTransform = function () {
                            this.me.transform(this.oe);
                            var k = a.Matrix.invert(this.oe);
                            this.ge.concat(k);
                            this.oe = this.ge.getTotalMatrix()
                        };
                        this.restore = function () {
                            var k =
                                this.Jf.pop();
                            if (k) {
                                var q = a.Matrix.multiply(this.oe, a.Matrix.invert(k.cg));
                                this.me.transform(q);
                                this.je.delete();
                                this.je = k.wg;
                                this.Re = k.ug;
                                this.ff = k.Ig;
                                this.Ce = k.Hg;
                                this.we = k.fs;
                                this.Te = k.Fg;
                                this.Ue = k.Gg;
                                this.Se = k.sb;
                                this.ef = k.Eg;
                                this.Fe = k.ga;
                                this.ie = k.kg;
                                this.df = k.vg;
                                this.pf = k.jg;
                                this.ge.restore();
                                this.oe = this.ge.getTotalMatrix()
                            }
                        };
                        this.rotate = function (k) {
                            if (isFinite(k)) {
                                var q = a.Matrix.rotated(-k);
                                this.me.transform(q);
                                this.ge.rotate(k / Math.PI * 180, 0, 0);
                                this.oe = this.ge.getTotalMatrix()
                            }
                        };
                        this.save =
                            function () {
                                if (this.we.Pe) {
                                    var k = this.we.Pe();
                                    this.Ye.push(k)
                                } else k = this.we;
                                if (this.Ce.Pe) {
                                    var q = this.Ce.Pe();
                                    this.Ye.push(q)
                                } else q = this.Ce;
                                this.Jf.push({
                                    cg: this.oe.slice(),
                                    ug: this.Re.slice(),
                                    Ig: this.ff,
                                    Hg: q,
                                    fs: k,
                                    Fg: this.Te,
                                    Gg: this.Ue,
                                    sb: this.Se,
                                    Eg: this.ef,
                                    ga: this.Fe,
                                    vg: this.df,
                                    kg: this.ie,
                                    wg: this.je.copy(),
                                    jg: this.pf
                                });
                                this.ge.save()
                            };
                        this.scale = function (k, q) {
                            if (e(arguments)) {
                                var z = a.Matrix.scaled(1 / k, 1 / q);
                                this.me.transform(z);
                                this.ge.scale(k, q);
                                this.oe = this.ge.getTotalMatrix()
                            }
                        };
                        this.setLineDash =
                            function (k) {
                                for (var q = 0; q < k.length; q++) if (!isFinite(k[q]) || 0 > k[q]) return;
                                1 === k.length % 2 && Array.prototype.push.apply(k, k);
                                this.Re = k
                            };
                        this.setTransform = function (k, q, z, B, F, H) {
                            e(arguments) && (this.resetTransform(), this.transform(k, q, z, B, F, H))
                        };
                        this.Oe = function () {
                            var k = a.Matrix.invert(this.oe);
                            this.ge.concat(k);
                            this.ge.concat(a.Matrix.translated(this.Te, this.Ue));
                            this.ge.concat(this.oe)
                        };
                        this.Ve = function (k) {
                            var q = a.multiplyByAlpha(this.ef, this.Fe);
                            if (!a.getColorComponents(q)[3] || !(this.Se || this.Ue || this.Te)) return null;
                            k = k.copy();
                            k.setColor(q);
                            var z = a.MaskFilter.MakeBlur(a.BlurStyle.Normal, this.Se / 2, !1);
                            k.setMaskFilter(z);
                            k.dispose = function () {
                                z.delete();
                                this.delete()
                            };
                            return k
                        };
                        this.Bf = function () {
                            var k = this.je.copy();
                            k.setStyle(a.PaintStyle.Stroke);
                            if (f(this.Ce)) {
                                var q = a.multiplyByAlpha(this.Ce, this.Fe);
                                k.setColor(q)
                            } else q = this.Ce.Qe(this.oe), k.setColor(a.Color(0, 0, 0, this.Fe)), k.setShader(q);
                            k.setStrokeWidth(this.ff);
                            if (this.Re.length) {
                                var z = a.PathEffect.MakeDash(this.Re, this.df);
                                k.setPathEffect(z)
                            }
                            k.dispose = function () {
                                z &&
                                z.delete();
                                this.delete()
                            };
                            return k
                        };
                        this.stroke = function (k) {
                            k = k ? k.pe : this.me;
                            var q = this.Bf(), z = this.Ve(q);
                            z && (this.ge.save(), this.Oe(), this.ge.drawPath(k, z), this.ge.restore(), z.dispose());
                            this.ge.drawPath(k, q);
                            q.dispose()
                        };
                        this.strokeRect = function (k, q, z, B) {
                            var F = this.Bf(), H = this.Ve(F);
                            H && (this.ge.save(), this.Oe(), this.ge.drawRect(a.XYWHRect(k, q, z, B), H), this.ge.restore(), H.dispose());
                            this.ge.drawRect(a.XYWHRect(k, q, z, B), F);
                            F.dispose()
                        };
                        this.strokeText = function (k, q, z) {
                            var B = this.Bf();
                            k = a.TextBlob.MakeFromText(k,
                                this.Je);
                            var F = this.Ve(B);
                            F && (this.ge.save(), this.Oe(), this.ge.drawTextBlob(k, q, z, F), this.ge.restore(), F.dispose());
                            this.ge.drawTextBlob(k, q, z, B);
                            k.delete();
                            B.dispose()
                        };
                        this.translate = function (k, q) {
                            if (e(arguments)) {
                                var z = a.Matrix.translated(-k, -q);
                                this.me.transform(z);
                                this.ge.translate(k, q);
                                this.oe = this.ge.getTotalMatrix()
                            }
                        };
                        this.transform = function (k, q, z, B, F, H) {
                            k = [k, z, F, q, B, H, 0, 0, 1];
                            q = a.Matrix.invert(k);
                            this.me.transform(q);
                            this.ge.concat(k);
                            this.oe = this.ge.getTotalMatrix()
                        };
                        this.addHitRegion = function () {
                        };
                        this.clearHitRegions = function () {
                        };
                        this.drawFocusIfNeeded = function () {
                        };
                        this.removeHitRegion = function () {
                        };
                        this.scrollPathIntoView = function () {
                        };
                        Object.defineProperty(this, "canvas", {value: null, writable: !1})
                    }

                    function C(I) {
                        this.Cf = I;
                        this.fe = new x(I.getCanvas());
                        this.qf = [];
                        this.decodeImage = function (k) {
                            k = a.MakeImageFromEncoded(k);
                            if (!k) throw "Invalid input";
                            this.qf.push(k);
                            return new K(k)
                        };
                        this.loadFont = function (k, q) {
                            k = a.Typeface.MakeTypefaceFromData(k);
                            if (!k) return null;
                            this.qf.push(k);
                            var z = (q.style || "normal") +
                                "|" + (q.variant || "normal") + "|" + (q.weight || "normal");
                            q = q.family;
                            r();
                            ia[q] || (ia[q] = {"*": k});
                            ia[q][z] = k
                        };
                        this.makePath2D = function (k) {
                            k = new ha(k);
                            this.qf.push(k.pe);
                            return k
                        };
                        this.getContext = function (k) {
                            return "2d" === k ? this.fe : null
                        };
                        this.toDataURL = function (k, q) {
                            this.Cf.flush();
                            var z = this.Cf.makeImageSnapshot();
                            if (z) {
                                k = k || "image/png";
                                var B = a.ImageFormat.PNG;
                                "image/jpeg" === k && (B = a.ImageFormat.JPEG);
                                if (q = z.encodeToBytes(B, q || .92)) {
                                    z.delete();
                                    k = "data:" + k + ";base64,";
                                    if ("undefined" !== typeof Buffer) q = Buffer.from(q).toString("base64");
                                    else {
                                        z = 0;
                                        B = q.length;
                                        for (var F = "", H; z < B;) H = q.slice(z, Math.min(z + 32768, B)), F += String.fromCharCode.apply(null, H), z += 32768;
                                        q = btoa(F)
                                    }
                                    return k + q
                                }
                            }
                        };
                        this.dispose = function () {
                            this.fe.Ie();
                            this.qf.forEach(function (k) {
                                k.delete()
                            });
                            this.Cf.dispose()
                        }
                    }

                    function K(I) {
                        this.width = I.width();
                        this.height = I.height();
                        this.naturalWidth = this.width;
                        this.naturalHeight = this.height;
                        this.Pf = function () {
                            return I
                        }
                    }

                    function N(I, k, q) {
                        if (!k || 0 === q) throw new TypeError("invalid dimensions, width and height must be non-zero");
                        if (I.length %
                            4) throw new TypeError("arr must be a multiple of 4");
                        q = q || I.length / (4 * k);
                        Object.defineProperty(this, "data", {value: I, writable: !1});
                        Object.defineProperty(this, "height", {value: q, writable: !1});
                        Object.defineProperty(this, "width", {value: k, writable: !1})
                    }

                    function P(I, k, q, z) {
                        this.re = null;
                        this.ye = [];
                        this.ue = [];
                        this.addColorStop = function (B, F) {
                            if (0 > B || 1 < B || !isFinite(B)) throw "offset must be between 0 and 1 inclusively";
                            F = g(F);
                            var H = this.ue.indexOf(B);
                            if (-1 !== H) this.ye[H] = F; else {
                                for (H = 0; H < this.ue.length && !(this.ue[H] >
                                    B); H++) ;
                                this.ue.splice(H, 0, B);
                                this.ye.splice(H, 0, F)
                            }
                        };
                        this.Pe = function () {
                            var B = new P(I, k, q, z);
                            B.ye = this.ye.slice();
                            B.ue = this.ue.slice();
                            return B
                        };
                        this.Ie = function () {
                            this.re && (this.re.delete(), this.re = null)
                        };
                        this.Qe = function (B) {
                            var F = [I, k, q, z];
                            a.Matrix.mapPoints(B, F);
                            B = F[0];
                            var H = F[1], O = F[2];
                            F = F[3];
                            this.Ie();
                            return this.re = a.Shader.MakeLinearGradient([B, H], [O, F], this.ye, this.ue, a.TileMode.Clamp)
                        }
                    }

                    function Y(I, k, q, z, B, F) {
                        if (e([k, q, z, B, F])) {
                            if (0 > F) throw "radii cannot be negative";
                            I.isEmpty() && I.moveTo(k,
                                q);
                            I.arcToTangent(k, q, z, B, F)
                        }
                    }

                    function W(I) {
                        if (!I.isEmpty()) {
                            var k = I.getBounds();
                            (k[3] - k[1] || k[2] - k[0]) && I.close()
                        }
                    }

                    function t(I, k, q, z, B, F, H) {
                        H = (H - F) / Math.PI * 180;
                        F = F / Math.PI * 180;
                        k = a.LTRBRect(k - z, q - B, k + z, q + B);
                        1E-5 > Math.abs(Math.abs(H) - 360) ? (q = H / 2, I.arcToOval(k, F, q, !1), I.arcToOval(k, F + q, q, !1)) : I.arcToOval(k, F, H, !1)
                    }

                    function D(I, k, q, z, B, F, H, O, Z) {
                        if (e([k, q, z, B, F, H, O])) {
                            if (0 > z || 0 > B) throw "radii cannot be negative";
                            var qa = 2 * Math.PI, eb = H % qa;
                            0 > eb && (eb += qa);
                            var fb = eb - H;
                            H = eb;
                            O += fb;
                            !Z && O - H >= qa ? O = H + qa : Z && H - O >=
                            qa ? O = H - qa : !Z && H > O ? O = H + (qa - (H - O) % qa) : Z && H < O && (O = H - (qa - (O - H) % qa));
                            F ? (Z = a.Matrix.rotated(F, k, q), F = a.Matrix.rotated(-F, k, q), I.transform(F), t(I, k, q, z, B, H, O), I.transform(Z)) : t(I, k, q, z, B, H, O)
                        }
                    }

                    function U(I, k, q) {
                        e([k, q]) && (I.isEmpty() && I.moveTo(k, q), I.lineTo(k, q))
                    }

                    function ha(I) {
                        this.pe = null;
                        this.pe = "string" === typeof I ? a.Path.MakeFromSVGString(I) : I && I.zf ? I.pe.copy() : new a.Path;
                        this.zf = function () {
                            return this.pe
                        };
                        this.addPath = function (k, q) {
                            q || (q = {a: 1, c: 0, e: 0, b: 0, d: 1, f: 0});
                            this.pe.addPath(k.pe, [q.a, q.c, q.e,
                                q.b, q.d, q.f])
                        };
                        this.arc = function (k, q, z, B, F, H) {
                            D(this.pe, k, q, z, z, 0, B, F, H)
                        };
                        this.arcTo = function (k, q, z, B, F) {
                            Y(this.pe, k, q, z, B, F)
                        };
                        this.bezierCurveTo = function (k, q, z, B, F, H) {
                            var O = this.pe;
                            e([k, q, z, B, F, H]) && (O.isEmpty() && O.moveTo(k, q), O.cubicTo(k, q, z, B, F, H))
                        };
                        this.closePath = function () {
                            W(this.pe)
                        };
                        this.ellipse = function (k, q, z, B, F, H, O, Z) {
                            D(this.pe, k, q, z, B, F, H, O, Z)
                        };
                        this.lineTo = function (k, q) {
                            U(this.pe, k, q)
                        };
                        this.moveTo = function (k, q) {
                            var z = this.pe;
                            e([k, q]) && z.moveTo(k, q)
                        };
                        this.quadraticCurveTo = function (k, q, z,
                                                          B) {
                            var F = this.pe;
                            e([k, q, z, B]) && (F.isEmpty() && F.moveTo(k, q), F.quadTo(k, q, z, B))
                        };
                        this.rect = function (k, q, z, B) {
                            var F = this.pe;
                            k = a.XYWHRect(k, q, z, B);
                            e(k) && F.addRect(k)
                        }
                    }

                    function la(I, k) {
                        this.re = null;
                        I instanceof K && (I = I.Pf());
                        this.Yf = I;
                        this._transform = a.Matrix.identity();
                        "" === k && (k = "repeat");
                        switch (k) {
                            case "repeat-x":
                                this.We = a.TileMode.Repeat;
                                this.Xe = a.TileMode.Decal;
                                break;
                            case "repeat-y":
                                this.We = a.TileMode.Decal;
                                this.Xe = a.TileMode.Repeat;
                                break;
                            case "repeat":
                                this.Xe = this.We = a.TileMode.Repeat;
                                break;
                            case "no-repeat":
                                this.Xe =
                                    this.We = a.TileMode.Decal;
                                break;
                            default:
                                throw "invalid repetition mode " + k;
                        }
                        this.setTransform = function (q) {
                            q = [q.a, q.c, q.e, q.b, q.d, q.f, 0, 0, 1];
                            e(q) && (this._transform = q)
                        };
                        this.Pe = function () {
                            var q = new la;
                            q.We = this.We;
                            q.Xe = this.Xe;
                            return q
                        };
                        this.Ie = function () {
                            this.re && (this.re.delete(), this.re = null)
                        };
                        this.Qe = function () {
                            this.Ie();
                            return this.re = this.Yf.makeShaderCubic(this.We, this.Xe, 1 / 3, 1 / 3, this._transform)
                        }
                    }

                    function ua(I, k, q, z, B, F) {
                        this.re = null;
                        this.ye = [];
                        this.ue = [];
                        this.addColorStop = function (H, O) {
                            if (0 >
                                H || 1 < H || !isFinite(H)) throw "offset must be between 0 and 1 inclusively";
                            O = g(O);
                            var Z = this.ue.indexOf(H);
                            if (-1 !== Z) this.ye[Z] = O; else {
                                for (Z = 0; Z < this.ue.length && !(this.ue[Z] > H); Z++) ;
                                this.ue.splice(Z, 0, H);
                                this.ye.splice(Z, 0, O)
                            }
                        };
                        this.Pe = function () {
                            var H = new ua(I, k, q, z, B, F);
                            H.ye = this.ye.slice();
                            H.ue = this.ue.slice();
                            return H
                        };
                        this.Ie = function () {
                            this.re && (this.re.delete(), this.re = null)
                        };
                        this.Qe = function (H) {
                            var O = [I, k, z, B];
                            a.Matrix.mapPoints(H, O);
                            var Z = O[0], qa = O[1], eb = O[2];
                            O = O[3];
                            var fb = (Math.abs(H[0]) + Math.abs(H[4])) /
                                2;
                            H = q * fb;
                            fb *= F;
                            this.Ie();
                            return this.re = a.Shader.MakeTwoPointConicalGradient([Z, qa], H, [eb, O], fb, this.ye, this.ue, a.TileMode.Clamp)
                        }
                    }

                    a._testing = {};
                    var ya = {
                        aliceblue: Float32Array.of(.941, .973, 1, 1),
                        antiquewhite: Float32Array.of(.98, .922, .843, 1),
                        aqua: Float32Array.of(0, 1, 1, 1),
                        aquamarine: Float32Array.of(.498, 1, .831, 1),
                        azure: Float32Array.of(.941, 1, 1, 1),
                        beige: Float32Array.of(.961, .961, .863, 1),
                        bisque: Float32Array.of(1, .894, .769, 1),
                        black: Float32Array.of(0, 0, 0, 1),
                        blanchedalmond: Float32Array.of(1, .922, .804, 1),
                        blue: Float32Array.of(0, 0, 1, 1),
                        blueviolet: Float32Array.of(.541, .169, .886, 1),
                        brown: Float32Array.of(.647, .165, .165, 1),
                        burlywood: Float32Array.of(.871, .722, .529, 1),
                        cadetblue: Float32Array.of(.373, .62, .627, 1),
                        chartreuse: Float32Array.of(.498, 1, 0, 1),
                        chocolate: Float32Array.of(.824, .412, .118, 1),
                        coral: Float32Array.of(1, .498, .314, 1),
                        cornflowerblue: Float32Array.of(.392, .584, .929, 1),
                        cornsilk: Float32Array.of(1, .973, .863, 1),
                        crimson: Float32Array.of(.863, .078, .235, 1),
                        cyan: Float32Array.of(0, 1, 1, 1),
                        darkblue: Float32Array.of(0,
                            0, .545, 1),
                        darkcyan: Float32Array.of(0, .545, .545, 1),
                        darkgoldenrod: Float32Array.of(.722, .525, .043, 1),
                        darkgray: Float32Array.of(.663, .663, .663, 1),
                        darkgreen: Float32Array.of(0, .392, 0, 1),
                        darkgrey: Float32Array.of(.663, .663, .663, 1),
                        darkkhaki: Float32Array.of(.741, .718, .42, 1),
                        darkmagenta: Float32Array.of(.545, 0, .545, 1),
                        darkolivegreen: Float32Array.of(.333, .42, .184, 1),
                        darkorange: Float32Array.of(1, .549, 0, 1),
                        darkorchid: Float32Array.of(.6, .196, .8, 1),
                        darkred: Float32Array.of(.545, 0, 0, 1),
                        darksalmon: Float32Array.of(.914,
                            .588, .478, 1),
                        darkseagreen: Float32Array.of(.561, .737, .561, 1),
                        darkslateblue: Float32Array.of(.282, .239, .545, 1),
                        darkslategray: Float32Array.of(.184, .31, .31, 1),
                        darkslategrey: Float32Array.of(.184, .31, .31, 1),
                        darkturquoise: Float32Array.of(0, .808, .82, 1),
                        darkviolet: Float32Array.of(.58, 0, .827, 1),
                        deeppink: Float32Array.of(1, .078, .576, 1),
                        deepskyblue: Float32Array.of(0, .749, 1, 1),
                        dimgray: Float32Array.of(.412, .412, .412, 1),
                        dimgrey: Float32Array.of(.412, .412, .412, 1),
                        dodgerblue: Float32Array.of(.118, .565, 1, 1),
                        firebrick: Float32Array.of(.698,
                            .133, .133, 1),
                        floralwhite: Float32Array.of(1, .98, .941, 1),
                        forestgreen: Float32Array.of(.133, .545, .133, 1),
                        fuchsia: Float32Array.of(1, 0, 1, 1),
                        gainsboro: Float32Array.of(.863, .863, .863, 1),
                        ghostwhite: Float32Array.of(.973, .973, 1, 1),
                        gold: Float32Array.of(1, .843, 0, 1),
                        goldenrod: Float32Array.of(.855, .647, .125, 1),
                        gray: Float32Array.of(.502, .502, .502, 1),
                        green: Float32Array.of(0, .502, 0, 1),
                        greenyellow: Float32Array.of(.678, 1, .184, 1),
                        grey: Float32Array.of(.502, .502, .502, 1),
                        honeydew: Float32Array.of(.941, 1, .941, 1),
                        hotpink: Float32Array.of(1,
                            .412, .706, 1),
                        indianred: Float32Array.of(.804, .361, .361, 1),
                        indigo: Float32Array.of(.294, 0, .51, 1),
                        ivory: Float32Array.of(1, 1, .941, 1),
                        khaki: Float32Array.of(.941, .902, .549, 1),
                        lavender: Float32Array.of(.902, .902, .98, 1),
                        lavenderblush: Float32Array.of(1, .941, .961, 1),
                        lawngreen: Float32Array.of(.486, .988, 0, 1),
                        lemonchiffon: Float32Array.of(1, .98, .804, 1),
                        lightblue: Float32Array.of(.678, .847, .902, 1),
                        lightcoral: Float32Array.of(.941, .502, .502, 1),
                        lightcyan: Float32Array.of(.878, 1, 1, 1),
                        lightgoldenrodyellow: Float32Array.of(.98,
                            .98, .824, 1),
                        lightgray: Float32Array.of(.827, .827, .827, 1),
                        lightgreen: Float32Array.of(.565, .933, .565, 1),
                        lightgrey: Float32Array.of(.827, .827, .827, 1),
                        lightpink: Float32Array.of(1, .714, .757, 1),
                        lightsalmon: Float32Array.of(1, .627, .478, 1),
                        lightseagreen: Float32Array.of(.125, .698, .667, 1),
                        lightskyblue: Float32Array.of(.529, .808, .98, 1),
                        lightslategray: Float32Array.of(.467, .533, .6, 1),
                        lightslategrey: Float32Array.of(.467, .533, .6, 1),
                        lightsteelblue: Float32Array.of(.69, .769, .871, 1),
                        lightyellow: Float32Array.of(1, 1, .878,
                            1),
                        lime: Float32Array.of(0, 1, 0, 1),
                        limegreen: Float32Array.of(.196, .804, .196, 1),
                        linen: Float32Array.of(.98, .941, .902, 1),
                        magenta: Float32Array.of(1, 0, 1, 1),
                        maroon: Float32Array.of(.502, 0, 0, 1),
                        mediumaquamarine: Float32Array.of(.4, .804, .667, 1),
                        mediumblue: Float32Array.of(0, 0, .804, 1),
                        mediumorchid: Float32Array.of(.729, .333, .827, 1),
                        mediumpurple: Float32Array.of(.576, .439, .859, 1),
                        mediumseagreen: Float32Array.of(.235, .702, .443, 1),
                        mediumslateblue: Float32Array.of(.482, .408, .933, 1),
                        mediumspringgreen: Float32Array.of(0,
                            .98, .604, 1),
                        mediumturquoise: Float32Array.of(.282, .82, .8, 1),
                        mediumvioletred: Float32Array.of(.78, .082, .522, 1),
                        midnightblue: Float32Array.of(.098, .098, .439, 1),
                        mintcream: Float32Array.of(.961, 1, .98, 1),
                        mistyrose: Float32Array.of(1, .894, .882, 1),
                        moccasin: Float32Array.of(1, .894, .71, 1),
                        navajowhite: Float32Array.of(1, .871, .678, 1),
                        navy: Float32Array.of(0, 0, .502, 1),
                        oldlace: Float32Array.of(.992, .961, .902, 1),
                        olive: Float32Array.of(.502, .502, 0, 1),
                        olivedrab: Float32Array.of(.42, .557, .137, 1),
                        orange: Float32Array.of(1, .647,
                            0, 1),
                        orangered: Float32Array.of(1, .271, 0, 1),
                        orchid: Float32Array.of(.855, .439, .839, 1),
                        palegoldenrod: Float32Array.of(.933, .91, .667, 1),
                        palegreen: Float32Array.of(.596, .984, .596, 1),
                        paleturquoise: Float32Array.of(.686, .933, .933, 1),
                        palevioletred: Float32Array.of(.859, .439, .576, 1),
                        papayawhip: Float32Array.of(1, .937, .835, 1),
                        peachpuff: Float32Array.of(1, .855, .725, 1),
                        peru: Float32Array.of(.804, .522, .247, 1),
                        pink: Float32Array.of(1, .753, .796, 1),
                        plum: Float32Array.of(.867, .627, .867, 1),
                        powderblue: Float32Array.of(.69, .878,
                            .902, 1),
                        purple: Float32Array.of(.502, 0, .502, 1),
                        rebeccapurple: Float32Array.of(.4, .2, .6, 1),
                        red: Float32Array.of(1, 0, 0, 1),
                        rosybrown: Float32Array.of(.737, .561, .561, 1),
                        royalblue: Float32Array.of(.255, .412, .882, 1),
                        saddlebrown: Float32Array.of(.545, .271, .075, 1),
                        salmon: Float32Array.of(.98, .502, .447, 1),
                        sandybrown: Float32Array.of(.957, .643, .376, 1),
                        seagreen: Float32Array.of(.18, .545, .341, 1),
                        seashell: Float32Array.of(1, .961, .933, 1),
                        sienna: Float32Array.of(.627, .322, .176, 1),
                        silver: Float32Array.of(.753, .753, .753, 1),
                        skyblue: Float32Array.of(.529,
                            .808, .922, 1),
                        slateblue: Float32Array.of(.416, .353, .804, 1),
                        slategray: Float32Array.of(.439, .502, .565, 1),
                        slategrey: Float32Array.of(.439, .502, .565, 1),
                        snow: Float32Array.of(1, .98, .98, 1),
                        springgreen: Float32Array.of(0, 1, .498, 1),
                        steelblue: Float32Array.of(.275, .51, .706, 1),
                        tan: Float32Array.of(.824, .706, .549, 1),
                        teal: Float32Array.of(0, .502, .502, 1),
                        thistle: Float32Array.of(.847, .749, .847, 1),
                        tomato: Float32Array.of(1, .388, .278, 1),
                        transparent: Float32Array.of(0, 0, 0, 0),
                        turquoise: Float32Array.of(.251, .878, .816, 1),
                        violet: Float32Array.of(.933,
                            .51, .933, 1),
                        wheat: Float32Array.of(.961, .871, .702, 1),
                        white: Float32Array.of(1, 1, 1, 1),
                        whitesmoke: Float32Array.of(.961, .961, .961, 1),
                        yellow: Float32Array.of(1, 1, 0, 1),
                        yellowgreen: Float32Array.of(.604, .804, .196, 1)
                    };
                    a._testing.parseColor = g;
                    a._testing.colorToString = d;
                    var Fa = RegExp("(italic|oblique|normal|)\\s*(small-caps|normal|)\\s*(bold|bolder|lighter|[1-9]00|normal|)\\s*([\\d\\.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)(.+)"),
                        ia;
                    a._testing.parseFontString = l;
                    a.MakeCanvas = function (I, k) {
                        return (I = a.MakeSurface(I,
                            k)) ? new C(I) : null
                    };
                    a.ImageData = function () {
                        if (2 === arguments.length) {
                            var I = arguments[0], k = arguments[1];
                            return new N(new Uint8ClampedArray(4 * I * k), I, k)
                        }
                        if (3 === arguments.length) {
                            var q = arguments[0];
                            if (q.prototype.constructor !== Uint8ClampedArray) throw new TypeError("bytes must be given as a Uint8ClampedArray");
                            I = arguments[1];
                            k = arguments[2];
                            if (q % 4) throw new TypeError("bytes must be given in a multiple of 4");
                            if (q % I) throw new TypeError("bytes must divide evenly by width");
                            if (k && k !== q / (4 * I)) throw new TypeError("invalid height given");
                            return new N(q, I, q / (4 * I))
                        }
                        throw new TypeError("invalid number of arguments - takes 2 or 3, saw " + arguments.length);
                    }
                })();
                a.le = a.le || [];
                a.le.push(function () {
                    a.MakePDFDocument = function (e) {
                        e = e || {};
                        e.title = e.title || "";
                        e.author = e.author || "";
                        e.subject = e.subject || "";
                        e.keywords = e.keywords || "";
                        e.creator = e.creator || "";
                        e.producer = e.producer || "";
                        e.language = e.language || "";
                        e.rasterDPI = e.rasterDPI || 72;
                        e.PDFA = !!e.PDFA;
                        e.compressionLevel = e.compressionLevel || a.PDFCompressionLevel.Default;
                        return a._MakePDFDocument(e)
                    };
                    a.Document.prototype.beginPage = function (e, d) {
                        return this._beginPage(e, d)
                    }
                })
            })(w);
            var oa = Object.assign({}, w), ra = "./this.program", va = (a, b) => {
                    throw b;
                }, wa = "object" == typeof window, xa = "function" == typeof importScripts,
                za = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node,
                Aa = "", Ba, Ca, Da;
            if (za) {
                var fs = require("fs"), Ea = require("path");
                Aa = xa ? Ea.dirname(Aa) + "/" : __dirname + "/";
                Ba = (a, b) => {
                    a = a.startsWith("file://") ? new URL(a) : Ea.normalize(a);
                    return fs.readFileSync(a, b ? void 0 : "utf8")
                };
                Da = a => {
                    a = Ba(a, !0);
                    a.buffer || (a = new Uint8Array(a));
                    return a
                };
                Ca = (a, b, c, f = !0) => {
                    a = a.startsWith("file://") ? new URL(a) : Ea.normalize(a);
                    fs.readFile(a, f ? void 0 : "utf8", (h, m) => {
                        h ? c(h) : b(f ? m.buffer : m)
                    })
                };
                !w.thisProgram && 1 < process.argv.length && (ra = process.argv[1].replace(/\\/g, "/"));
                process.argv.slice(2);
                va = (a, b) => {
                    process.exitCode =
                        a;
                    throw b;
                };
                w.inspect = () => "[Emscripten Module object]"
            } else if (wa || xa) xa ? Aa = self.location.href : "undefined" != typeof document && document.currentScript && (Aa = document.currentScript.src), _scriptDir && (Aa = _scriptDir), 0 !== Aa.indexOf("blob:") ? Aa = Aa.substr(0, Aa.replace(/[?#].*/, "").lastIndexOf("/") + 1) : Aa = "", Ba = a => {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.send(null);
                return b.responseText
            }, xa && (Da = a => {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.responseType = "arraybuffer";
                b.send(null);
                return new Uint8Array(b.response)
            }),
                Ca = (a, b, c) => {
                    var f = new XMLHttpRequest;
                    f.open("GET", a, !0);
                    f.responseType = "arraybuffer";
                    f.onload = () => {
                        200 == f.status || 0 == f.status && f.response ? b(f.response) : c()
                    };
                    f.onerror = c;
                    f.send(null)
                };
            var Ga = w.print || console.log.bind(console), Ha = w.printErr || console.error.bind(console);
            Object.assign(w, oa);
            oa = null;
            w.thisProgram && (ra = w.thisProgram);
            w.quit && (va = w.quit);
            var Ia;
            w.wasmBinary && (Ia = w.wasmBinary);
            var noExitRuntime = w.noExitRuntime || !0;
            "object" != typeof WebAssembly && Ja("no native wasm support detected");
            var La, Ma, Na = !1, Qa, J, Ra, Sa, Q, Ta, S, Ua;

            function Va() {
                var a = La.buffer;
                w.HEAP8 = Qa = new Int8Array(a);
                w.HEAP16 = Ra = new Int16Array(a);
                w.HEAP32 = Q = new Int32Array(a);
                w.HEAPU8 = J = new Uint8Array(a);
                w.HEAPU16 = Sa = new Uint16Array(a);
                w.HEAPU32 = Ta = new Uint32Array(a);
                w.HEAPF32 = S = new Float32Array(a);
                w.HEAPF64 = Ua = new Float64Array(a)
            }

            var Wa, Xa = [], Ya = [], Za = [];

            function $a() {
                var a = w.preRun.shift();
                Xa.unshift(a)
            }

            var ab = 0, bb = null, gb = null;

            function Ja(a) {
                if (w.onAbort) w.onAbort(a);
                a = "Aborted(" + a + ")";
                Ha(a);
                Na = !0;
                a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
                ba(a);
                throw a;
            }

            function hb(a) {
                return a.startsWith("data:application/octet-stream;base64,")
            }

            var ib;
            ib = "canvaskit.wasm?version=1.0.0";
            if (!hb(ib)) {
                var jb = ib;
                ib = w.locateFile ? w.locateFile(jb, Aa) : Aa + jb
            }

            function ob(a) {
                if (a == ib && Ia) return new Uint8Array(Ia);
                if (Da) return Da(a);
                throw "both async and sync fetching of the wasm failed";
            }

            function pb(a) {
                if (!Ia && (wa || xa)) {
                    if ("function" == typeof fetch && !a.startsWith("file://")) return fetch(a, {credentials: "same-origin"}).then(b => {
                        if (!b.ok) throw "failed to load wasm binary file at '" + a + "'";
                        return b.arrayBuffer()
                    }).catch(() => ob(a));
                    if (Ca) return new Promise((b, c) => {
                        Ca(a, f => b(new Uint8Array(f)), c)
                    })
                }
                return Promise.resolve().then(() => ob(a))
            }

            function qb(a, b, c) {
                return pb(a).then(f => WebAssembly.instantiate(f, b)).then(f => f).then(c, f => {
                    Ha("failed to asynchronously prepare wasm: " + f);
                    Ja(f)
                })
            }

            function rb(a, b) {
                var c = ib;
                return Ia || "function" != typeof WebAssembly.instantiateStreaming || hb(c) || c.startsWith("file://") || za || "function" != typeof fetch ? qb(c, a, b) : fetch(c, {credentials: "same-origin"}).then(f => WebAssembly.instantiateStreaming(f, a).then(b, function (h) {
                    Ha("wasm streaming compile failed: " + h);
                    Ha("falling back to ArrayBuffer instantiation");
                    return qb(c, a, b)
                }))
            }

            function sb(a) {
                this.name = "ExitStatus";
                this.message = `Program terminated with exit(${a})`;
                this.status = a
            }

            var tb = a => {
                for (; 0 < a.length;) a.shift()(w)
            }, ub = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, vb = (a, b, c) => {
                var f = b + c;
                for (c = b; a[c] && !(c >= f);) ++c;
                if (16 < c - b && a.buffer && ub) return ub.decode(a.subarray(b, c));
                for (f = ""; b < c;) {
                    var h = a[b++];
                    if (h & 128) {
                        var m = a[b++] & 63;
                        if (192 == (h & 224)) f += String.fromCharCode((h & 31) << 6 | m); else {
                            var u = a[b++] & 63;
                            h = 224 == (h & 240) ? (h & 15) << 12 | m << 6 | u : (h & 7) << 18 | m << 12 | u << 6 | a[b++] & 63;
                            65536 > h ? f += String.fromCharCode(h) : (h -= 65536, f += String.fromCharCode(55296 | h >> 10, 56320 | h & 1023))
                        }
                    } else f +=
                        String.fromCharCode(h)
                }
                return f
            }, wb = {};

            function xb(a) {
                for (; a.length;) {
                    var b = a.pop();
                    a.pop()(b)
                }
            }

            function yb(a) {
                return this.fromWireType(Q[a >> 2])
            }

            var zb = {}, Ab = {}, Cb = {}, Db = void 0;

            function Eb(a) {
                throw new Db(a);
            }

            function Fb(a, b, c) {
                function f(n) {
                    n = c(n);
                    n.length !== a.length && Eb("Mismatched type converter count");
                    for (var p = 0; p < a.length; ++p) Gb(a[p], n[p])
                }

                a.forEach(function (n) {
                    Cb[n] = b
                });
                var h = Array(b.length), m = [], u = 0;
                b.forEach((n, p) => {
                    Ab.hasOwnProperty(n) ? h[p] = Ab[n] : (m.push(n), zb.hasOwnProperty(n) || (zb[n] = []), zb[n].push(() => {
                        h[p] = Ab[n];
                        ++u;
                        u === m.length && f(h)
                    }))
                });
                0 === m.length && f(h)
            }

            function Hb(a) {
                switch (a) {
                    case 1:
                        return 0;
                    case 2:
                        return 1;
                    case 4:
                        return 2;
                    case 8:
                        return 3;
                    default:
                        throw new TypeError(`Unknown type size: ${a}`);
                }
            }

            var Ib = void 0;

            function Jb(a) {
                for (var b = ""; J[a];) b += Ib[J[a++]];
                return b
            }

            var Kb = void 0;

            function Lb(a) {
                throw new Kb(a);
            }

            function Mb(a, b, c = {}) {
                var f = b.name;
                a || Lb(`type "${f}" must have a positive integer typeid pointer`);
                if (Ab.hasOwnProperty(a)) {
                    if (c.rg) return;
                    Lb(`Cannot register type '${f}' twice`)
                }
                Ab[a] = b;
                delete Cb[a];
                zb.hasOwnProperty(a) && (b = zb[a], delete zb[a], b.forEach(h => h()))
            }

            function Gb(a, b, c = {}) {
                if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
                Mb(a, b, c)
            }

            function Nb(a) {
                Lb(a.ee.qe.ke.name + " instance already deleted")
            }

            var Ob = !1;

            function Pb() {
            }

            function Qb(a) {
                --a.count.value;
                0 === a.count.value && (a.te ? a.Ae.He(a.te) : a.qe.ke.He(a.ne))
            }

            function Rb(a, b, c) {
                if (b === c) return a;
                if (void 0 === c.ve) return null;
                a = Rb(a, b, c.ve);
                return null === a ? null : c.fg(a)
            }

            var Sb = {}, Tb = [];

            function Ub() {
                for (; Tb.length;) {
                    var a = Tb.pop();
                    a.ee.af = !1;
                    a["delete"]()
                }
            }

            var Vb = void 0, Wb = {};

            function Xb(a, b) {
                for (void 0 === b && Lb("ptr should not be undefined"); a.ve;) b = a.lf(b), a = a.ve;
                return Wb[b]
            }

            function dc(a, b) {
                b.qe && b.ne || Eb("makeClassHandle requires ptr and ptrType");
                !!b.Ae !== !!b.te && Eb("Both smartPtrType and smartPtr must be specified");
                b.count = {value: 1};
                return ec(Object.create(a, {ee: {value: b}}))
            }

            function ec(a) {
                if ("undefined" === typeof FinalizationRegistry) return ec = b => b, a;
                Ob = new FinalizationRegistry(b => {
                    Qb(b.ee)
                });
                ec = b => {
                    var c = b.ee;
                    c.te && Ob.register(b, {ee: c}, b);
                    return b
                };
                Pb = b => {
                    Ob.unregister(b)
                };
                return ec(a)
            }

            function fc() {
            }

            function gc(a) {
                if (void 0 === a) return "_unknown";
                a = a.replace(/[^a-zA-Z0-9_]/g, "$");
                var b = a.charCodeAt(0);
                return 48 <= b && 57 >= b ? `_${a}` : a
            }

            function hc(a, b) {
                a = gc(a);
                return {
                    [a]: function () {
                        return b.apply(this, arguments)
                    }
                }[a]
            }

            function ic(a, b, c) {
                if (void 0 === a[b].se) {
                    var f = a[b];
                    a[b] = function () {
                        a[b].se.hasOwnProperty(arguments.length) || Lb(`Function '${c}' called with an invalid number of arguments (${arguments.length}) - expects one of (${a[b].se})!`);
                        return a[b].se[arguments.length].apply(this, arguments)
                    };
                    a[b].se = [];
                    a[b].se[f.Ze] = f
                }
            }

            function jc(a, b, c) {
                w.hasOwnProperty(a) ? ((void 0 === c || void 0 !== w[a].se && void 0 !== w[a].se[c]) && Lb(`Cannot register public name '${a}' twice`), ic(w, a, a), w.hasOwnProperty(c) && Lb(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`), w[a].se[c] = b) : (w[a] = b, void 0 !== c && (w[a].Sg = c))
            }

            function kc(a, b, c, f, h, m, u, n) {
                this.name = a;
                this.constructor = b;
                this.bf = c;
                this.He = f;
                this.ve = h;
                this.mg = m;
                this.lf = u;
                this.fg = n;
                this.yg = []
            }

            function lc(a, b, c) {
                for (; b !== c;) b.lf || Lb(`Expected null or instance of ${c.name}, got an instance of ${b.name}`), a = b.lf(a), b = b.ve;
                return a
            }

            function mc(a, b) {
                if (null === b) return this.Ff && Lb(`null is not a valid ${this.name}`), 0;
                b.ee || Lb(`Cannot pass "${nc(b)}" as a ${this.name}`);
                b.ee.ne || Lb(`Cannot pass deleted object as a pointer of type ${this.name}`);
                return lc(b.ee.ne, b.ee.qe.ke, this.ke)
            }

            function oc(a, b) {
                if (null === b) {
                    this.Ff && Lb(`null is not a valid ${this.name}`);
                    if (this.tf) {
                        var c = this.Gf();
                        null !== a && a.push(this.He, c);
                        return c
                    }
                    return 0
                }
                b.ee || Lb(`Cannot pass "${nc(b)}" as a ${this.name}`);
                b.ee.ne || Lb(`Cannot pass deleted object as a pointer of type ${this.name}`);
                !this.sf && b.ee.qe.sf && Lb(`Cannot convert argument of type ${b.ee.Ae ? b.ee.Ae.name : b.ee.qe.name} to parameter type ${this.name}`);
                c = lc(b.ee.ne, b.ee.qe.ke, this.ke);
                if (this.tf) switch (void 0 === b.ee.te && Lb("Passing raw pointer to smart pointer is illegal"),
                    this.Dg) {
                    case 0:
                        b.ee.Ae === this ? c = b.ee.te : Lb(`Cannot convert argument of type ${b.ee.Ae ? b.ee.Ae.name : b.ee.qe.name} to parameter type ${this.name}`);
                        break;
                    case 1:
                        c = b.ee.te;
                        break;
                    case 2:
                        if (b.ee.Ae === this) c = b.ee.te; else {
                            var f = b.clone();
                            c = this.zg(c, pc(function () {
                                f["delete"]()
                            }));
                            null !== a && a.push(this.He, c)
                        }
                        break;
                    default:
                        Lb("Unsupporting sharing policy")
                }
                return c
            }

            function qc(a, b) {
                if (null === b) return this.Ff && Lb(`null is not a valid ${this.name}`), 0;
                b.ee || Lb(`Cannot pass "${nc(b)}" as a ${this.name}`);
                b.ee.ne || Lb(`Cannot pass deleted object as a pointer of type ${this.name}`);
                b.ee.qe.sf && Lb(`Cannot convert argument of type ${b.ee.qe.name} to parameter type ${this.name}`);
                return lc(b.ee.ne, b.ee.qe.ke, this.ke)
            }

            function rc(a, b, c, f, h, m, u, n, p, v, E) {
                this.name = a;
                this.ke = b;
                this.Ff = c;
                this.sf = f;
                this.tf = h;
                this.xg = m;
                this.Dg = u;
                this.Rf = n;
                this.Gf = p;
                this.zg = v;
                this.He = E;
                h || void 0 !== b.ve ? this.toWireType = oc : (this.toWireType = f ? mc : qc, this.ze = null)
            }

            function sc(a, b, c) {
                w.hasOwnProperty(a) || Eb("Replacing nonexistant public symbol");
                void 0 !== w[a].se && void 0 !== c ? w[a].se[c] = b : (w[a] = b, w[a].Ze = c)
            }

            var tc = (a, b) => {
                var c = [];
                return function () {
                    c.length = 0;
                    Object.assign(c, arguments);
                    if (a.includes("j")) {
                        var f = w["dynCall_" + a];
                        f = c && c.length ? f.apply(null, [b].concat(c)) : f.call(null, b)
                    } else f = Wa.get(b).apply(null, c);
                    return f
                }
            };

            function uc(a, b) {
                a = Jb(a);
                var c = a.includes("j") ? tc(a, b) : Wa.get(b);
                "function" != typeof c && Lb(`unknown function pointer with signature ${a}: ${b}`);
                return c
            }

            var vc = void 0;

            function wc(a) {
                a = xc(a);
                var b = Jb(a);
                yc(a);
                return b
            }

            function zc(a, b) {
                function c(m) {
                    h[m] || Ab[m] || (Cb[m] ? Cb[m].forEach(c) : (f.push(m), h[m] = !0))
                }

                var f = [], h = {};
                b.forEach(c);
                throw new vc(`${a}: ` + f.map(wc).join([", "]));
            }

            function Fc(a, b, c, f, h) {
                var m = b.length;
                2 > m && Lb("argTypes array size mismatch! Must at least get return value and 'this' types!");
                var u = null !== b[1] && null !== c, n = !1;
                for (c = 1; c < b.length; ++c) if (null !== b[c] && void 0 === b[c].ze) {
                    n = !0;
                    break
                }
                var p = "void" !== b[0].name, v = m - 2, E = Array(v), G = [], L = [];
                return function () {
                    arguments.length !== v && Lb(`function ${a} called with ${arguments.length} arguments, expected ${v} args!`);
                    L.length = 0;
                    G.length = u ? 2 : 1;
                    G[0] = h;
                    if (u) {
                        var y = b[1].toWireType(L, this);
                        G[1] = y
                    }
                    for (var M = 0; M < v; ++M) E[M] =
                        b[M + 2].toWireType(L, arguments[M]), G.push(E[M]);
                    M = f.apply(null, G);
                    if (n) xb(L); else for (var T = u ? 1 : 2; T < b.length; T++) {
                        var R = 1 === T ? y : E[T - 2];
                        null !== b[T].ze && b[T].ze(R)
                    }
                    y = p ? b[0].fromWireType(M) : void 0;
                    return y
                }
            }

            function Gc(a, b) {
                for (var c = [], f = 0; f < a; f++) c.push(Ta[b + 4 * f >> 2]);
                return c
            }

            function Hc() {
                this.Ge = [void 0];
                this.Of = []
            }

            var Ic = new Hc;

            function Jc(a) {
                a >= Ic.hf && 0 === --Ic.get(a).Sf && Ic.lg(a)
            }

            var Kc = a => {
                a || Lb("Cannot use deleted val. handle = " + a);
                return Ic.get(a).value
            }, pc = a => {
                switch (a) {
                    case void 0:
                        return 1;
                    case null:
                        return 2;
                    case !0:
                        return 3;
                    case !1:
                        return 4;
                    default:
                        return Ic.hg({Sf: 1, value: a})
                }
            };

            function Lc(a, b, c) {
                switch (b) {
                    case 0:
                        return function (f) {
                            return this.fromWireType((c ? Qa : J)[f])
                        };
                    case 1:
                        return function (f) {
                            return this.fromWireType((c ? Ra : Sa)[f >> 1])
                        };
                    case 2:
                        return function (f) {
                            return this.fromWireType((c ? Q : Ta)[f >> 2])
                        };
                    default:
                        throw new TypeError("Unknown integer type: " + a);
                }
            }

            function Mc(a, b) {
                var c = Ab[a];
                void 0 === c && Lb(b + " has unknown type " + wc(a));
                return c
            }

            function nc(a) {
                if (null === a) return "null";
                var b = typeof a;
                return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a
            }

            function Nc(a, b) {
                switch (b) {
                    case 2:
                        return function (c) {
                            return this.fromWireType(S[c >> 2])
                        };
                    case 3:
                        return function (c) {
                            return this.fromWireType(Ua[c >> 3])
                        };
                    default:
                        throw new TypeError("Unknown float type: " + a);
                }
            }

            function Oc(a, b, c) {
                switch (b) {
                    case 0:
                        return c ? function (f) {
                            return Qa[f]
                        } : function (f) {
                            return J[f]
                        };
                    case 1:
                        return c ? function (f) {
                            return Ra[f >> 1]
                        } : function (f) {
                            return Sa[f >> 1]
                        };
                    case 2:
                        return c ? function (f) {
                            return Q[f >> 2]
                        } : function (f) {
                            return Ta[f >> 2]
                        };
                    default:
                        throw new TypeError("Unknown integer type: " + a);
                }
            }

            var na = (a, b, c, f) => {
                    if (!(0 < f)) return 0;
                    var h = c;
                    f = c + f - 1;
                    for (var m = 0; m < a.length; ++m) {
                        var u = a.charCodeAt(m);
                        if (55296 <= u && 57343 >= u) {
                            var n = a.charCodeAt(++m);
                            u = 65536 + ((u & 1023) << 10) | n & 1023
                        }
                        if (127 >= u) {
                            if (c >= f) break;
                            b[c++] = u
                        } else {
                            if (2047 >= u) {
                                if (c + 1 >= f) break;
                                b[c++] = 192 | u >> 6
                            } else {
                                if (65535 >= u) {
                                    if (c + 2 >= f) break;
                                    b[c++] = 224 | u >> 12
                                } else {
                                    if (c + 3 >= f) break;
                                    b[c++] = 240 | u >> 18;
                                    b[c++] = 128 | u >> 12 & 63
                                }
                                b[c++] = 128 | u >> 6 & 63
                            }
                            b[c++] = 128 | u & 63
                        }
                    }
                    b[c] = 0;
                    return c - h
                }, ma = a => {
                    for (var b = 0, c = 0; c < a.length; ++c) {
                        var f = a.charCodeAt(c);
                        127 >= f ? b++ : 2047 >=
                        f ? b += 2 : 55296 <= f && 57343 >= f ? (b += 4, ++c) : b += 3
                    }
                    return b
                }, Pc = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, Qc = (a, b) => {
                    var c = a >> 1;
                    for (var f = c + b / 2; !(c >= f) && Sa[c];) ++c;
                    c <<= 1;
                    if (32 < c - a && Pc) return Pc.decode(J.subarray(a, c));
                    c = "";
                    for (f = 0; !(f >= b / 2); ++f) {
                        var h = Ra[a + 2 * f >> 1];
                        if (0 == h) break;
                        c += String.fromCharCode(h)
                    }
                    return c
                }, Rc = (a, b, c) => {
                    void 0 === c && (c = 2147483647);
                    if (2 > c) return 0;
                    c -= 2;
                    var f = b;
                    c = c < 2 * a.length ? c / 2 : a.length;
                    for (var h = 0; h < c; ++h) Ra[b >> 1] = a.charCodeAt(h), b += 2;
                    Ra[b >> 1] = 0;
                    return b - f
                },
                Sc = a => 2 * a.length, Tc = (a, b) => {
                    for (var c = 0, f = ""; !(c >= b / 4);) {
                        var h = Q[a + 4 * c >> 2];
                        if (0 == h) break;
                        ++c;
                        65536 <= h ? (h -= 65536, f += String.fromCharCode(55296 | h >> 10, 56320 | h & 1023)) : f += String.fromCharCode(h)
                    }
                    return f
                }, Uc = (a, b, c) => {
                    void 0 === c && (c = 2147483647);
                    if (4 > c) return 0;
                    var f = b;
                    c = f + c - 4;
                    for (var h = 0; h < a.length; ++h) {
                        var m = a.charCodeAt(h);
                        if (55296 <= m && 57343 >= m) {
                            var u = a.charCodeAt(++h);
                            m = 65536 + ((m & 1023) << 10) | u & 1023
                        }
                        Q[b >> 2] = m;
                        b += 4;
                        if (b + 4 > c) break
                    }
                    Q[b >> 2] = 0;
                    return b - f
                }, Vc = a => {
                    for (var b = 0, c = 0; c < a.length; ++c) {
                        var f = a.charCodeAt(c);
                        55296 <= f && 57343 >= f && ++c;
                        b += 4
                    }
                    return b
                }, Wc = {};

            function Xc(a) {
                var b = Wc[a];
                return void 0 === b ? Jb(a) : b
            }

            var Yc = [];

            function Zc() {
                function a(b) {
                    b.$$$embind_global$$$ = b;
                    var c = "object" == typeof $$$embind_global$$$ && b.$$$embind_global$$$ == b;
                    c || delete b.$$$embind_global$$$;
                    return c
                }

                if ("object" == typeof globalThis) return globalThis;
                if ("object" == typeof $$$embind_global$$$) return $$$embind_global$$$;
                "object" == typeof global && a(global) ? $$$embind_global$$$ = global : "object" == typeof self && a(self) && ($$$embind_global$$$ = self);
                if ("object" == typeof $$$embind_global$$$) return $$$embind_global$$$;
                throw Error("unable to get global object.");
            }

            function $c(a) {
                var b = Yc.length;
                Yc.push(a);
                return b
            }

            function ad(a, b) {
                for (var c = Array(a), f = 0; f < a; ++f) c[f] = Mc(Ta[b + 4 * f >> 2], "parameter " + f);
                return c
            }

            var bd = [];

            function cd(a) {
                var b = Array(a + 1);
                return function (c, f, h) {
                    b[0] = c;
                    for (var m = 0; m < a; ++m) {
                        var u = Mc(Ta[f + 4 * m >> 2], "parameter " + m);
                        b[m + 1] = u.readValueFromPointer(h);
                        h += u.argPackAdvance
                    }
                    c = new (c.bind.apply(c, b));
                    return pc(c)
                }
            }

            var dd = {}, fd = a => {
                var b = ma(a) + 1, c = ed(b);
                c && na(a, J, c, b);
                return c
            };

            function gd(a) {
                var b = a.getExtension("ANGLE_instanced_arrays");
                b && (a.vertexAttribDivisor = function (c, f) {
                    b.vertexAttribDivisorANGLE(c, f)
                }, a.drawArraysInstanced = function (c, f, h, m) {
                    b.drawArraysInstancedANGLE(c, f, h, m)
                }, a.drawElementsInstanced = function (c, f, h, m, u) {
                    b.drawElementsInstancedANGLE(c, f, h, m, u)
                })
            }

            function hd(a) {
                var b = a.getExtension("OES_vertex_array_object");
                b && (a.createVertexArray = function () {
                    return b.createVertexArrayOES()
                }, a.deleteVertexArray = function (c) {
                    b.deleteVertexArrayOES(c)
                }, a.bindVertexArray = function (c) {
                    b.bindVertexArrayOES(c)
                }, a.isVertexArray = function (c) {
                    return b.isVertexArrayOES(c)
                })
            }

            function jd(a) {
                var b = a.getExtension("WEBGL_draw_buffers");
                b && (a.drawBuffers = function (c, f) {
                    b.drawBuffersWEBGL(c, f)
                })
            }

            var kd = 1, ld = [], md = [], nd = [], od = [], da = [], pd = [], qd = [], ka = [], rd = [], sd = [],
                td = [], ud = {}, vd = {}, wd = 4;

            function xd(a) {
                yd || (yd = a)
            }

            function ca(a) {
                for (var b = kd++, c = a.length; c < b; c++) a[c] = null;
                return b
            }

            function ea(a, b) {
                a.hf || (a.hf = a.getContext, a.getContext = function (f, h) {
                    h = a.hf(f, h);
                    return "webgl" == f == h instanceof WebGLRenderingContext ? h : null
                });
                var c = 1 < b.majorVersion ? a.getContext("webgl2", b) : a.getContext("webgl", b);
                return c ? zd(c, b) : 0
            }

            function zd(a, b) {
                var c = ca(ka), f = {handle: c, attributes: b, version: b.majorVersion, Be: a};
                a.canvas && (a.canvas.Vf = f);
                ka[c] = f;
                ("undefined" == typeof b.gg || b.gg) && Ad(f);
                return c
            }

            function ja(a) {
                A = ka[a];
                w.Qg = X = A && A.Be;
                return !(a && !X)
            }

            function Ad(a) {
                a || (a = A);
                if (!a.sg) {
                    a.sg = !0;
                    var b = a.Be;
                    gd(b);
                    hd(b);
                    jd(b);
                    b.Mf = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
                    b.Qf = b.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
                    2 <= a.version && (b.De = b.getExtension("EXT_disjoint_timer_query_webgl2"));
                    if (2 > a.version || !b.De) b.De = b.getExtension("EXT_disjoint_timer_query");
                    b.Rg = b.getExtension("WEBGL_multi_draw");
                    (b.getSupportedExtensions() || []).forEach(function (c) {
                        c.includes("lose_context") || c.includes("debug") || b.getExtension(c)
                    })
                }
            }

            var A, yd;

            function Bd(a, b) {
                X.bindFramebuffer(a, nd[b])
            }

            function Cd(a) {
                X.bindVertexArray(qd[a])
            }

            function Dd(a) {
                X.clear(a)
            }

            function Ed(a, b, c, f) {
                X.clearColor(a, b, c, f)
            }

            function Fd(a) {
                X.clearStencil(a)
            }

            function Gd(a, b) {
                for (var c = 0; c < a; c++) {
                    var f = Q[b + 4 * c >> 2];
                    X.deleteVertexArray(qd[f]);
                    qd[f] = null
                }
            }

            var Jd = [];

            function Kd(a, b, c, f) {
                X.drawElements(a, b, c, f)
            }

            function Ld(a, b, c, f) {
                for (var h = 0; h < a; h++) {
                    var m = X[c](), u = m && ca(f);
                    m ? (m.name = u, f[u] = m) : xd(1282);
                    Q[b + 4 * h >> 2] = u
                }
            }

            function Md(a, b) {
                Ld(a, b, "createVertexArray", qd)
            }

            function Nd(a, b) {
                Ta[a >> 2] = b;
                Ta[a + 4 >> 2] = (b - Ta[a >> 2]) / 4294967296
            }

            function Od(a, b, c) {
                if (b) {
                    var f = void 0;
                    switch (a) {
                        case 36346:
                            f = 1;
                            break;
                        case 36344:
                            0 != c && 1 != c && xd(1280);
                            return;
                        case 34814:
                        case 36345:
                            f = 0;
                            break;
                        case 34466:
                            var h = X.getParameter(34467);
                            f = h ? h.length : 0;
                            break;
                        case 33309:
                            if (2 > A.version) {
                                xd(1282);
                                return
                            }
                            f = 2 * (X.getSupportedExtensions() || []).length;
                            break;
                        case 33307:
                        case 33308:
                            if (2 > A.version) {
                                xd(1280);
                                return
                            }
                            f = 33307 == a ? 3 : 0
                    }
                    if (void 0 === f) switch (h = X.getParameter(a), typeof h) {
                        case "number":
                            f = h;
                            break;
                        case "boolean":
                            f = h ? 1 : 0;
                            break;
                        case "string":
                            xd(1280);
                            return;
                        case "object":
                            if (null ===
                                h) switch (a) {
                                case 34964:
                                case 35725:
                                case 34965:
                                case 36006:
                                case 36007:
                                case 32873:
                                case 34229:
                                case 36662:
                                case 36663:
                                case 35053:
                                case 35055:
                                case 36010:
                                case 35097:
                                case 35869:
                                case 32874:
                                case 36389:
                                case 35983:
                                case 35368:
                                case 34068:
                                    f = 0;
                                    break;
                                default:
                                    xd(1280);
                                    return
                            } else {
                                if (h instanceof Float32Array || h instanceof Uint32Array || h instanceof Int32Array || h instanceof Array) {
                                    for (a = 0; a < h.length; ++a) switch (c) {
                                        case 0:
                                            Q[b + 4 * a >> 2] = h[a];
                                            break;
                                        case 2:
                                            S[b + 4 * a >> 2] = h[a];
                                            break;
                                        case 4:
                                            Qa[b + a >> 0] = h[a] ? 1 : 0
                                    }
                                    return
                                }
                                try {
                                    f = h.name |
                                        0
                                } catch (m) {
                                    xd(1280);
                                    Ha("GL_INVALID_ENUM in glGet" + c + "v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + m + ")");
                                    return
                                }
                            }
                            break;
                        default:
                            xd(1280);
                            Ha("GL_INVALID_ENUM in glGet" + c + "v: Native code calling glGet" + c + "v(" + a + ") and it returns " + h + " of type " + typeof h + "!");
                            return
                    }
                    switch (c) {
                        case 1:
                            Nd(b, f);
                            break;
                        case 0:
                            Q[b >> 2] = f;
                            break;
                        case 2:
                            S[b >> 2] = f;
                            break;
                        case 4:
                            Qa[b >> 0] = f ? 1 : 0
                    }
                } else xd(1281)
            }

            function Pd(a, b) {
                Od(a, b, 0)
            }

            function Qd(a, b, c) {
                if (c) {
                    a = rd[a];
                    b = 2 > A.version ? X.De.getQueryObjectEXT(a, b) : X.getQueryParameter(a, b);
                    var f;
                    "boolean" == typeof b ? f = b ? 1 : 0 : f = b;
                    Nd(c, f)
                } else xd(1281)
            }

            function Rd(a) {
                var b = ud[a];
                if (!b) {
                    switch (a) {
                        case 7939:
                            b = X.getSupportedExtensions() || [];
                            b = b.concat(b.map(function (f) {
                                return "GL_" + f
                            }));
                            b = fd(b.join(" "));
                            break;
                        case 7936:
                        case 7937:
                        case 37445:
                        case 37446:
                            (b = X.getParameter(a)) || xd(1280);
                            b = b && fd(b);
                            break;
                        case 7938:
                            b = X.getParameter(7938);
                            b = 2 <= A.version ? "OpenGL ES 3.0 (" + b + ")" : "OpenGL ES 2.0 (" + b + ")";
                            b = fd(b);
                            break;
                        case 35724:
                            b = X.getParameter(35724);
                            var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                            null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " +
                                c[1] + " (" + b + ")");
                            b = fd(b);
                            break;
                        default:
                            xd(1280)
                    }
                    ud[a] = b
                }
                return b
            }

            function Sd(a, b) {
                if (2 > A.version) return xd(1282), 0;
                var c = vd[a];
                if (c) return 0 > b || b >= c.length ? (xd(1281), 0) : c[b];
                switch (a) {
                    case 7939:
                        return c = X.getSupportedExtensions() || [], c = c.concat(c.map(function (f) {
                            return "GL_" + f
                        })), c = c.map(function (f) {
                            return fd(f)
                        }), c = vd[a] = c, 0 > b || b >= c.length ? (xd(1281), 0) : c[b];
                    default:
                        return xd(1280), 0
                }
            }

            function Td(a) {
                return "]" == a.slice(-1) && a.lastIndexOf("[")
            }

            function Ud(a) {
                a -= 5120;
                return 0 == a ? Qa : 1 == a ? J : 2 == a ? Ra : 4 == a ? Q : 6 == a ? S : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? Ta : Sa
            }

            function Vd(a, b, c, f, h) {
                a = Ud(a);
                var m = 31 - Math.clz32(a.BYTES_PER_ELEMENT), u = wd;
                return a.subarray(h >> m, h + f * (c * ({
                    5: 3,
                    6: 4,
                    8: 2,
                    29502: 3,
                    29504: 4,
                    26917: 2,
                    26918: 2,
                    29846: 3,
                    29847: 4
                }[b - 6402] || 1) * (1 << m) + u - 1 & -u) >> m)
            }

            function Wd(a) {
                var b = X.dg;
                if (b) {
                    var c = b.kf[a];
                    "number" == typeof c && (b.kf[a] = c = X.getUniformLocation(b, b.Tf[a] + (0 < c ? "[" + c + "]" : "")));
                    return c
                }
                xd(1282)
            }

            var Xd = [], Yd = [], Zd = {}, ae = () => {
                    if (!$d) {
                        var a = {
                            USER: "web_user",
                            LOGNAME: "web_user",
                            PATH: "/",
                            PWD: "/",
                            HOME: "/home/web_user",
                            LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                            _: ra || "./this.program"
                        }, b;
                        for (b in Zd) void 0 === Zd[b] ? delete a[b] : a[b] = Zd[b];
                        var c = [];
                        for (b in a) c.push(`${b}=${a[b]}`);
                        $d = c
                    }
                    return $d
                }, $d, be = [null, [], []], ce = a => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400),
                de = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                ee = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            function fe(a) {
                var b = Array(ma(a) + 1);
                na(a, b, 0, b.length);
                return b
            }

            var ge = (a, b, c, f) => {
                function h(y, M, T) {
                    for (y = "number" == typeof y ? y.toString() : y || ""; y.length < M;) y = T[0] + y;
                    return y
                }

                function m(y, M) {
                    return h(y, M, "0")
                }

                function u(y, M) {
                    function T(ta) {
                        return 0 > ta ? -1 : 0 < ta ? 1 : 0
                    }

                    var R;
                    0 === (R = T(y.getFullYear() - M.getFullYear())) && 0 === (R = T(y.getMonth() - M.getMonth())) && (R = T(y.getDate() - M.getDate()));
                    return R
                }

                function n(y) {
                    switch (y.getDay()) {
                        case 0:
                            return new Date(y.getFullYear() - 1, 11, 29);
                        case 1:
                            return y;
                        case 2:
                            return new Date(y.getFullYear(), 0, 3);
                        case 3:
                            return new Date(y.getFullYear(),
                                0, 2);
                        case 4:
                            return new Date(y.getFullYear(), 0, 1);
                        case 5:
                            return new Date(y.getFullYear() - 1, 11, 31);
                        case 6:
                            return new Date(y.getFullYear() - 1, 11, 30)
                    }
                }

                function p(y) {
                    var M = y.Le;
                    for (y = new Date((new Date(y.Me + 1900, 0, 1)).getTime()); 0 < M;) {
                        var T = y.getMonth(), R = (ce(y.getFullYear()) ? de : ee)[T];
                        if (M > R - y.getDate()) M -= R - y.getDate() + 1, y.setDate(1), 11 > T ? y.setMonth(T + 1) : (y.setMonth(0), y.setFullYear(y.getFullYear() + 1)); else {
                            y.setDate(y.getDate() + M);
                            break
                        }
                    }
                    T = new Date(y.getFullYear() + 1, 0, 4);
                    M = n(new Date(y.getFullYear(),
                        0, 4));
                    T = n(T);
                    return 0 >= u(M, y) ? 0 >= u(T, y) ? y.getFullYear() + 1 : y.getFullYear() : y.getFullYear() - 1
                }

                var v = Q[f + 40 >> 2];
                f = {
                    Lg: Q[f >> 2],
                    Kg: Q[f + 4 >> 2],
                    xf: Q[f + 8 >> 2],
                    Hf: Q[f + 12 >> 2],
                    yf: Q[f + 16 >> 2],
                    Me: Q[f + 20 >> 2],
                    Ee: Q[f + 24 >> 2],
                    Le: Q[f + 28 >> 2],
                    Ug: Q[f + 32 >> 2],
                    Jg: Q[f + 36 >> 2],
                    Mg: v ? v ? vb(J, v) : "" : ""
                };
                c = c ? vb(J, c) : "";
                v = {
                    "%c": "%a %b %d %H:%M:%S %Y",
                    "%D": "%m/%d/%y",
                    "%F": "%Y-%m-%d",
                    "%h": "%b",
                    "%r": "%I:%M:%S %p",
                    "%R": "%H:%M",
                    "%T": "%H:%M:%S",
                    "%x": "%m/%d/%y",
                    "%X": "%H:%M:%S",
                    "%Ec": "%c",
                    "%EC": "%C",
                    "%Ex": "%m/%d/%y",
                    "%EX": "%H:%M:%S",
                    "%Ey": "%y",
                    "%EY": "%Y",
                    "%Od": "%d",
                    "%Oe": "%e",
                    "%OH": "%H",
                    "%OI": "%I",
                    "%Om": "%m",
                    "%OM": "%M",
                    "%OS": "%S",
                    "%Ou": "%u",
                    "%OU": "%U",
                    "%OV": "%V",
                    "%Ow": "%w",
                    "%OW": "%W",
                    "%Oy": "%y"
                };
                for (var E in v) c = c.replace(new RegExp(E, "g"), v[E]);
                var G = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    L = "January February March April May June July August September October November December".split(" ");
                v = {
                    "%a": y => G[y.Ee].substring(0, 3),
                    "%A": y => G[y.Ee],
                    "%b": y => L[y.yf].substring(0, 3),
                    "%B": y => L[y.yf],
                    "%C": y => m((y.Me + 1900) /
                        100 | 0, 2),
                    "%d": y => m(y.Hf, 2),
                    "%e": y => h(y.Hf, 2, " "),
                    "%g": y => p(y).toString().substring(2),
                    "%G": y => p(y),
                    "%H": y => m(y.xf, 2),
                    "%I": y => {
                        y = y.xf;
                        0 == y ? y = 12 : 12 < y && (y -= 12);
                        return m(y, 2)
                    },
                    "%j": y => {
                        for (var M = 0, T = 0; T <= y.yf - 1; M += (ce(y.Me + 1900) ? de : ee)[T++]) ;
                        return m(y.Hf + M, 3)
                    },
                    "%m": y => m(y.yf + 1, 2),
                    "%M": y => m(y.Kg, 2),
                    "%n": () => "\n",
                    "%p": y => 0 <= y.xf && 12 > y.xf ? "AM" : "PM",
                    "%S": y => m(y.Lg, 2),
                    "%t": () => "\t",
                    "%u": y => y.Ee || 7,
                    "%U": y => m(Math.floor((y.Le + 7 - y.Ee) / 7), 2),
                    "%V": y => {
                        var M = Math.floor((y.Le + 7 - (y.Ee + 6) % 7) / 7);
                        2 >= (y.Ee + 371 - y.Le -
                            2) % 7 && M++;
                        if (M) 53 == M && (T = (y.Ee + 371 - y.Le) % 7, 4 == T || 3 == T && ce(y.Me) || (M = 1)); else {
                            M = 52;
                            var T = (y.Ee + 7 - y.Le - 1) % 7;
                            (4 == T || 5 == T && ce(y.Me % 400 - 1)) && M++
                        }
                        return m(M, 2)
                    },
                    "%w": y => y.Ee,
                    "%W": y => m(Math.floor((y.Le + 7 - (y.Ee + 6) % 7) / 7), 2),
                    "%y": y => (y.Me + 1900).toString().substring(2),
                    "%Y": y => y.Me + 1900,
                    "%z": y => {
                        y = y.Jg;
                        var M = 0 <= y;
                        y = Math.abs(y) / 60;
                        return (M ? "+" : "-") + String("0000" + (y / 60 * 100 + y % 60)).slice(-4)
                    },
                    "%Z": y => y.Mg,
                    "%%": () => "%"
                };
                c = c.replace(/%%/g, "\x00\x00");
                for (E in v) c.includes(E) && (c = c.replace(new RegExp(E, "g"), v[E](f)));
                c = c.replace(/\0\0/g, "%");
                E = fe(c);
                if (E.length > b) return 0;
                Qa.set(E, a);
                return E.length - 1
            };
            Db = w.InternalError = class extends Error {
                constructor(a) {
                    super(a);
                    this.name = "InternalError"
                }
            };
            for (var he = Array(256), ie = 0; 256 > ie; ++ie) he[ie] = String.fromCharCode(ie);
            Ib = he;
            Kb = w.BindingError = class extends Error {
                constructor(a) {
                    super(a);
                    this.name = "BindingError"
                }
            };
            fc.prototype.isAliasOf = function (a) {
                if (!(this instanceof fc && a instanceof fc)) return !1;
                var b = this.ee.qe.ke, c = this.ee.ne, f = a.ee.qe.ke;
                for (a = a.ee.ne; b.ve;) c = b.lf(c), b = b.ve;
                for (; f.ve;) a = f.lf(a), f = f.ve;
                return b === f && c === a
            };
            fc.prototype.clone = function () {
                this.ee.ne || Nb(this);
                if (this.ee.jf) return this.ee.count.value += 1, this;
                var a = ec, b = Object, c = b.create, f = Object.getPrototypeOf(this), h = this.ee;
                a = a(c.call(b, f, {
                    ee: {
                        value: {
                            count: h.count,
                            af: h.af,
                            jf: h.jf,
                            ne: h.ne,
                            qe: h.qe,
                            te: h.te,
                            Ae: h.Ae
                        }
                    }
                }));
                a.ee.count.value += 1;
                a.ee.af = !1;
                return a
            };
            fc.prototype["delete"] = function () {
                this.ee.ne || Nb(this);
                this.ee.af && !this.ee.jf && Lb("Object already scheduled for deletion");
                Pb(this);
                Qb(this.ee);
                this.ee.jf || (this.ee.te = void 0, this.ee.ne = void 0)
            };
            fc.prototype.isDeleted = function () {
                return !this.ee.ne
            };
            fc.prototype.deleteLater = function () {
                this.ee.ne || Nb(this);
                this.ee.af && !this.ee.jf && Lb("Object already scheduled for deletion");
                Tb.push(this);
                1 === Tb.length && Vb && Vb(Ub);
                this.ee.af = !0;
                return this
            };
            w.getInheritedInstanceCount = function () {
                return Object.keys(Wb).length
            };
            w.getLiveInheritedInstances = function () {
                var a = [], b;
                for (b in Wb) Wb.hasOwnProperty(b) && a.push(Wb[b]);
                return a
            };
            w.flushPendingDeletes = Ub;
            w.setDelayFunction = function (a) {
                Vb = a;
                Tb.length && Vb && Vb(Ub)
            };
            rc.prototype.ng = function (a) {
                this.Rf && (a = this.Rf(a));
                return a
            };
            rc.prototype.Lf = function (a) {
                this.He && this.He(a)
            };
            rc.prototype.argPackAdvance = 8;
            rc.prototype.readValueFromPointer = yb;
            rc.prototype.deleteObject = function (a) {
                if (null !== a) a["delete"]()
            };
            rc.prototype.fromWireType = function (a) {
                function b() {
                    return this.tf ? dc(this.ke.bf, {qe: this.xg, ne: c, Ae: this, te: a}) : dc(this.ke.bf, {
                        qe: this,
                        ne: a
                    })
                }

                var c = this.ng(a);
                if (!c) return this.Lf(a), null;
                var f = Xb(this.ke, c);
                if (void 0 !== f) {
                    if (0 === f.ee.count.value) return f.ee.ne = c, f.ee.te = a, f.clone();
                    f = f.clone();
                    this.Lf(a);
                    return f
                }
                f = this.ke.mg(c);
                f = Sb[f];
                if (!f) return b.call(this);
                f = this.sf ? f.bg : f.pointerType;
                var h = Rb(c, this.ke, f.ke);
                return null === h ? b.call(this) : this.tf ? dc(f.ke.bf, {qe: f, ne: h, Ae: this, te: a}) : dc(f.ke.bf,
                    {qe: f, ne: h})
            };
            vc = w.UnboundTypeError = function (a, b) {
                var c = hc(b, function (f) {
                    this.name = b;
                    this.message = f;
                    f = Error(f).stack;
                    void 0 !== f && (this.stack = this.toString() + "\n" + f.replace(/^Error(:[^\n]*)?\n/, ""))
                });
                c.prototype = Object.create(a.prototype);
                c.prototype.constructor = c;
                c.prototype.toString = function () {
                    return void 0 === this.message ? this.name : `${this.name}: ${this.message}`
                };
                return c
            }(Error, "UnboundTypeError");
            Object.assign(Hc.prototype, {
                get(a) {
                    return this.Ge[a]
                }, has(a) {
                    return void 0 !== this.Ge[a]
                }, hg(a) {
                    var b = this.Of.pop() || this.Ge.length;
                    this.Ge[b] = a;
                    return b
                }, lg(a) {
                    this.Ge[a] = void 0;
                    this.Of.push(a)
                }
            });
            Ic.Ge.push({value: void 0}, {value: null}, {value: !0}, {value: !1});
            Ic.hf = Ic.Ge.length;
            w.count_emval_handles = function () {
                for (var a = 0, b = Ic.hf; b < Ic.Ge.length; ++b) void 0 !== Ic.Ge[b] && ++a;
                return a
            };
            for (var X, je = 0; 32 > je; ++je) Jd.push(Array(je));
            var ke = new Float32Array(288);
            for (je = 0; 288 > je; ++je) Xd[je] = ke.subarray(0, je + 1);
            var le = new Int32Array(288);
            for (je = 0; 288 > je; ++je) Yd[je] = le.subarray(0, je + 1);
            var De = {
                S: function () {
                    return 0
                },
                qb: () => {
                },
                sb: function () {
                    return 0
                },
                nb: () => {
                },
                ob: () => {
                },
                T: function () {
                },
                pb: () => {
                },
                D: function (a) {
                    var b = wb[a];
                    delete wb[a];
                    var c = b.Gf, f = b.He, h = b.Nf, m = h.map(u => u.qg).concat(h.map(u => u.Bg));
                    Fb([a], m, u => {
                        var n = {};
                        h.forEach((p, v) => {
                            var E = u[v], G = p.og, L = p.pg, y = u[v + h.length], M = p.Ag, T = p.Cg;
                            n[p.ig] = {
                                read: R => E.fromWireType(G(L, R)), write: (R, ta) => {
                                    var pa = [];
                                    M(T, R, y.toWireType(pa, ta));
                                    xb(pa)
                                }
                            }
                        });
                        return [{
                            name: b.name, fromWireType: function (p) {
                                var v = {}, E;
                                for (E in n) v[E] = n[E].read(p);
                                f(p);
                                return v
                            }, toWireType: function (p, v) {
                                for (var E in n) if (!(E in v)) throw new TypeError(`Missing field: "${E}"`);
                                var G = c();
                                for (E in n) n[E].write(G, v[E]);
                                null !== p && p.push(f, G);
                                return G
                            }, argPackAdvance: 8, readValueFromPointer: yb, ze: f
                        }]
                    })
                },
                gb: function () {
                },
                xb: function (a, b, c, f, h) {
                    var m = Hb(c);
                    b = Jb(b);
                    Gb(a, {
                        name: b, fromWireType: function (u) {
                            return !!u
                        }, toWireType: function (u, n) {
                            return n ? f : h
                        }, argPackAdvance: 8, readValueFromPointer: function (u) {
                            if (1 === c) var n = Qa; else if (2 === c) n = Ra; else if (4 === c) n = Q; else throw new TypeError("Unknown boolean type size: " +
                                b);
                            return this.fromWireType(n[u >> m])
                        }, ze: null
                    })
                },
                o: function (a, b, c, f, h, m, u, n, p, v, E, G, L) {
                    E = Jb(E);
                    m = uc(h, m);
                    n && (n = uc(u, n));
                    v && (v = uc(p, v));
                    L = uc(G, L);
                    var y = gc(E);
                    jc(y, function () {
                        zc(`Cannot construct ${E} due to unbound types`, [f])
                    });
                    Fb([a, b, c], f ? [f] : [], function (M) {
                        M = M[0];
                        if (f) {
                            var T = M.ke;
                            var R = T.bf
                        } else R = fc.prototype;
                        M = hc(y, function () {
                            if (Object.getPrototypeOf(this) !== ta) throw new Kb("Use 'new' to construct " + E);
                            if (void 0 === pa.Ke) throw new Kb(E + " has no accessible constructor");
                            var lb = pa.Ke[arguments.length];
                            if (void 0 === lb) throw new Kb(`Tried to invoke ctor of ${E} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(pa.Ke).toString()}) parameters instead!`);
                            return lb.apply(this, arguments)
                        });
                        var ta = Object.create(R, {constructor: {value: M}});
                        M.prototype = ta;
                        var pa = new kc(E, M, ta, L, T, m, n, v);
                        pa.ve && (void 0 === pa.ve.mf && (pa.ve.mf = []), pa.ve.mf.push(pa));
                        T = new rc(E, pa, !0, !1, !1);
                        R = new rc(E + "*", pa, !1, !1, !1);
                        var kb = new rc(E + " const*", pa, !1, !0, !1);
                        Sb[a] = {pointerType: R, bg: kb};
                        sc(y, M);
                        return [T,
                            R, kb]
                    })
                },
                i: function (a, b, c, f, h, m, u) {
                    var n = Gc(c, f);
                    b = Jb(b);
                    m = uc(h, m);
                    Fb([], [a], function (p) {
                        function v() {
                            zc(`Cannot call ${E} due to unbound types`, n)
                        }

                        p = p[0];
                        var E = `${p.name}.${b}`;
                        b.startsWith("@@") && (b = Symbol[b.substring(2)]);
                        var G = p.ke.constructor;
                        void 0 === G[b] ? (v.Ze = c - 1, G[b] = v) : (ic(G, b, E), G[b].se[c - 1] = v);
                        Fb([], n, function (L) {
                            L = [L[0], null].concat(L.slice(1));
                            L = Fc(E, L, null, m, u);
                            void 0 === G[b].se ? (L.Ze = c - 1, G[b] = L) : G[b].se[c - 1] = L;
                            if (p.ke.mf) for (const y of p.ke.mf) y.constructor.hasOwnProperty(b) || (y.constructor[b] =
                                L);
                            return []
                        });
                        return []
                    })
                },
                H: function (a, b, c, f, h, m) {
                    var u = Gc(b, c);
                    h = uc(f, h);
                    Fb([], [a], function (n) {
                        n = n[0];
                        var p = `constructor ${n.name}`;
                        void 0 === n.ke.Ke && (n.ke.Ke = []);
                        if (void 0 !== n.ke.Ke[b - 1]) throw new Kb(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${n.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
                        n.ke.Ke[b - 1] = () => {
                            zc(`Cannot construct ${n.name} due to unbound types`, u)
                        };
                        Fb([], u, function (v) {
                            v.splice(1,
                                0, null);
                            n.ke.Ke[b - 1] = Fc(p, v, null, h, m);
                            return []
                        });
                        return []
                    })
                },
                b: function (a, b, c, f, h, m, u, n) {
                    var p = Gc(c, f);
                    b = Jb(b);
                    m = uc(h, m);
                    Fb([], [a], function (v) {
                        function E() {
                            zc(`Cannot call ${G} due to unbound types`, p)
                        }

                        v = v[0];
                        var G = `${v.name}.${b}`;
                        b.startsWith("@@") && (b = Symbol[b.substring(2)]);
                        n && v.ke.yg.push(b);
                        var L = v.ke.bf, y = L[b];
                        void 0 === y || void 0 === y.se && y.className !== v.name && y.Ze === c - 2 ? (E.Ze = c - 2, E.className = v.name, L[b] = E) : (ic(L, b, G), L[b].se[c - 2] = E);
                        Fb([], p, function (M) {
                            M = Fc(G, M, v, m, u);
                            void 0 === L[b].se ? (M.Ze =
                                c - 2, L[b] = M) : L[b].se[c - 2] = M;
                            return []
                        });
                        return []
                    })
                },
                u: function (a, b, c) {
                    a = Jb(a);
                    Fb([], [b], function (f) {
                        f = f[0];
                        w[a] = f.fromWireType(c);
                        return []
                    })
                },
                wb: function (a, b) {
                    b = Jb(b);
                    Gb(a, {
                        name: b, fromWireType: function (c) {
                            var f = Kc(c);
                            Jc(c);
                            return f
                        }, toWireType: function (c, f) {
                            return pc(f)
                        }, argPackAdvance: 8, readValueFromPointer: yb, ze: null
                    })
                },
                m: function (a, b, c, f) {
                    function h() {
                    }

                    c = Hb(c);
                    b = Jb(b);
                    h.values = {};
                    Gb(a, {
                        name: b, constructor: h, fromWireType: function (m) {
                            return this.constructor.values[m]
                        }, toWireType: function (m, u) {
                            return u.value
                        },
                        argPackAdvance: 8, readValueFromPointer: Lc(b, c, f), ze: null
                    });
                    jc(b, h)
                },
                d: function (a, b, c) {
                    var f = Mc(a, "enum");
                    b = Jb(b);
                    a = f.constructor;
                    f = Object.create(f.constructor.prototype, {
                        value: {value: c},
                        constructor: {
                            value: hc(`${f.name}_${b}`, function () {
                            })
                        }
                    });
                    a.values[c] = f;
                    a[b] = f
                },
                V: function (a, b, c) {
                    c = Hb(c);
                    b = Jb(b);
                    Gb(a, {
                        name: b, fromWireType: function (f) {
                            return f
                        }, toWireType: function (f, h) {
                            return h
                        }, argPackAdvance: 8, readValueFromPointer: Nc(b, c), ze: null
                    })
                },
                x: function (a, b, c, f, h, m) {
                    var u = Gc(b, c);
                    a = Jb(a);
                    h = uc(f, h);
                    jc(a, function () {
                        zc(`Cannot call ${a} due to unbound types`,
                            u)
                    }, b - 1);
                    Fb([], u, function (n) {
                        n = [n[0], null].concat(n.slice(1));
                        sc(a, Fc(a, n, null, h, m), b - 1);
                        return []
                    })
                },
                I: function (a, b, c, f, h) {
                    b = Jb(b);
                    -1 === h && (h = 4294967295);
                    h = Hb(c);
                    var m = n => n;
                    if (0 === f) {
                        var u = 32 - 8 * c;
                        m = n => n << u >>> u
                    }
                    c = b.includes("unsigned") ? function (n, p) {
                        return p >>> 0
                    } : function (n, p) {
                        return p
                    };
                    Gb(a, {
                        name: b,
                        fromWireType: m,
                        toWireType: c,
                        argPackAdvance: 8,
                        readValueFromPointer: Oc(b, h, 0 !== f),
                        ze: null
                    })
                },
                w: function (a, b, c) {
                    function f(m) {
                        m >>= 2;
                        var u = Ta;
                        return new h(u.buffer, u[m + 1], u[m])
                    }

                    var h = [Int8Array, Uint8Array,
                        Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
                    c = Jb(c);
                    Gb(a, {name: c, fromWireType: f, argPackAdvance: 8, readValueFromPointer: f}, {rg: !0})
                },
                s: function (a, b, c, f, h, m, u, n, p, v, E, G) {
                    c = Jb(c);
                    m = uc(h, m);
                    n = uc(u, n);
                    v = uc(p, v);
                    G = uc(E, G);
                    Fb([a], [b], function (L) {
                        L = L[0];
                        return [new rc(c, L.ke, !1, !1, !0, L, f, m, n, v, G)]
                    })
                },
                U: function (a, b) {
                    b = Jb(b);
                    var c = "std::string" === b;
                    Gb(a, {
                        name: b, fromWireType: function (f) {
                            var h = Ta[f >> 2], m = f + 4;
                            if (c) for (var u = m, n = 0; n <= h; ++n) {
                                var p = m + n;
                                if (n == h || 0 == J[p]) {
                                    u = u ? vb(J, u,
                                        p - u) : "";
                                    if (void 0 === v) var v = u; else v += String.fromCharCode(0), v += u;
                                    u = p + 1
                                }
                            } else {
                                v = Array(h);
                                for (n = 0; n < h; ++n) v[n] = String.fromCharCode(J[m + n]);
                                v = v.join("")
                            }
                            yc(f);
                            return v
                        }, toWireType: function (f, h) {
                            h instanceof ArrayBuffer && (h = new Uint8Array(h));
                            var m = "string" == typeof h;
                            m || h instanceof Uint8Array || h instanceof Uint8ClampedArray || h instanceof Int8Array || Lb("Cannot pass non-string to std::string");
                            var u = c && m ? ma(h) : h.length;
                            var n = ed(4 + u + 1), p = n + 4;
                            Ta[n >> 2] = u;
                            if (c && m) na(h, J, p, u + 1); else if (m) for (m = 0; m < u; ++m) {
                                var v =
                                    h.charCodeAt(m);
                                255 < v && (yc(p), Lb("String has UTF-16 code units that do not fit in 8 bits"));
                                J[p + m] = v
                            } else for (m = 0; m < u; ++m) J[p + m] = h[m];
                            null !== f && f.push(yc, n);
                            return n
                        }, argPackAdvance: 8, readValueFromPointer: yb, ze: function (f) {
                            yc(f)
                        }
                    })
                },
                P: function (a, b, c) {
                    c = Jb(c);
                    if (2 === b) {
                        var f = Qc;
                        var h = Rc;
                        var m = Sc;
                        var u = () => Sa;
                        var n = 1
                    } else 4 === b && (f = Tc, h = Uc, m = Vc, u = () => Ta, n = 2);
                    Gb(a, {
                        name: c, fromWireType: function (p) {
                            for (var v = Ta[p >> 2], E = u(), G, L = p + 4, y = 0; y <= v; ++y) {
                                var M = p + 4 + y * b;
                                if (y == v || 0 == E[M >> n]) L = f(L, M - L), void 0 === G ? G =
                                    L : (G += String.fromCharCode(0), G += L), L = M + b
                            }
                            yc(p);
                            return G
                        }, toWireType: function (p, v) {
                            "string" != typeof v && Lb(`Cannot pass non-string to C++ string type ${c}`);
                            var E = m(v), G = ed(4 + E + b);
                            Ta[G >> 2] = E >> n;
                            h(v, G + 4, E + b);
                            null !== p && p.push(yc, G);
                            return G
                        }, argPackAdvance: 8, readValueFromPointer: yb, ze: function (p) {
                            yc(p)
                        }
                    })
                },
                E: function (a, b, c, f, h, m) {
                    wb[a] = {name: Jb(b), Gf: uc(c, f), He: uc(h, m), Nf: []}
                },
                f: function (a, b, c, f, h, m, u, n, p, v) {
                    wb[a].Nf.push({ig: Jb(b), qg: c, og: uc(f, h), pg: m, Bg: u, Ag: uc(n, p), Cg: v})
                },
                yb: function (a, b) {
                    b = Jb(b);
                    Gb(a, {
                        tg: !0, name: b, argPackAdvance: 0, fromWireType: function () {
                        }, toWireType: function () {
                        }
                    })
                },
                ub: () => !0,
                ib: () => {
                    throw Infinity;
                },
                C: function (a, b, c) {
                    a = Kc(a);
                    b = Mc(b, "emval::as");
                    var f = [], h = pc(f);
                    Ta[c >> 2] = h;
                    return b.toWireType(f, a)
                },
                L: function (a, b, c, f, h) {
                    a = Yc[a];
                    b = Kc(b);
                    c = Xc(c);
                    var m = [];
                    Ta[f >> 2] = pc(m);
                    return a(b, c, m, h)
                },
                r: function (a, b, c, f) {
                    a = Yc[a];
                    b = Kc(b);
                    c = Xc(c);
                    a(b, c, null, f)
                },
                c: Jc,
                K: function (a) {
                    if (0 === a) return pc(Zc());
                    a = Xc(a);
                    return pc(Zc()[a])
                },
                p: function (a, b) {
                    var c = ad(a, b), f = c[0];
                    b = f.name + "_$" + c.slice(1).map(function (u) {
                            return u.name
                        }).join("_") +
                        "$";
                    var h = bd[b];
                    if (void 0 !== h) return h;
                    var m = Array(a - 1);
                    h = $c((u, n, p, v) => {
                        for (var E = 0, G = 0; G < a - 1; ++G) m[G] = c[G + 1].readValueFromPointer(v + E), E += c[G + 1].argPackAdvance;
                        u = u[n].apply(u, m);
                        for (G = 0; G < a - 1; ++G) c[G + 1].eg && c[G + 1].eg(m[G]);
                        if (!f.tg) return f.toWireType(p, u)
                    });
                    return bd[b] = h
                },
                B: function (a, b) {
                    a = Kc(a);
                    b = Kc(b);
                    return pc(a[b])
                },
                n: function (a) {
                    4 < a && (Ic.get(a).Sf += 1)
                },
                M: function (a, b, c, f) {
                    a = Kc(a);
                    var h = dd[b];
                    h || (h = cd(b), dd[b] = h);
                    return h(a, c, f)
                },
                G: function () {
                    return pc([])
                },
                e: function (a) {
                    return pc(Xc(a))
                },
                z: function () {
                    return pc({})
                },
                _a: function (a) {
                    a = Kc(a);
                    return !a
                },
                A: function (a) {
                    var b = Kc(a);
                    xb(b);
                    Jc(a)
                },
                h: function (a, b, c) {
                    a = Kc(a);
                    b = Kc(b);
                    c = Kc(c);
                    a[b] = c
                },
                g: function (a, b) {
                    a = Mc(a, "_emval_take_value");
                    a = a.readValueFromPointer(b);
                    return pc(a)
                },
                eb: function (a, b, c) {
                    a = new Date(1E3 * (b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN));
                    Q[c >> 2] = a.getUTCSeconds();
                    Q[c + 4 >> 2] = a.getUTCMinutes();
                    Q[c + 8 >> 2] = a.getUTCHours();
                    Q[c + 12 >> 2] = a.getUTCDate();
                    Q[c + 16 >> 2] = a.getUTCMonth();
                    Q[c + 20 >> 2] = a.getUTCFullYear() - 1900;
                    Q[c + 24 >> 2] =
                        a.getUTCDay();
                    Q[c + 28 >> 2] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864E5 | 0
                },
                cb: function () {
                    return -52
                },
                db: function () {
                },
                kb: (a, b, c) => {
                    function f(p) {
                        return (p = p.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? p[1] : "GMT"
                    }

                    var h = (new Date).getFullYear(), m = new Date(h, 0, 1), u = new Date(h, 6, 1);
                    h = m.getTimezoneOffset();
                    var n = u.getTimezoneOffset();
                    Ta[a >> 2] = 60 * Math.max(h, n);
                    Q[b >> 2] = Number(h != n);
                    a = f(m);
                    b = f(u);
                    a = fd(a);
                    b = fd(b);
                    n < h ? (Ta[c >> 2] = a, Ta[c + 4 >> 2] = b) : (Ta[c >> 2] = b, Ta[c + 4 >> 2] = a)
                },
                a: () => {
                    Ja("")
                },
                vb: function () {
                    return Date.now()
                },
                tb: () => performance.now(),
                id: function (a) {
                    X.activeTexture(a)
                },
                jd: function (a, b) {
                    X.attachShader(md[a], pd[b])
                },
                Ob: function (a, b) {
                    X.beginQuery(a, rd[b])
                },
                Ib: function (a, b) {
                    X.De.beginQueryEXT(a, rd[b])
                },
                kd: function (a, b, c) {
                    X.bindAttribLocation(md[a], b, c ? vb(J, c) : "")
                },
                ld: function (a, b) {
                    35051 == a ? X.Df = b : 35052 == a && (X.$e = b);
                    X.bindBuffer(a, ld[b])
                },
                kc: Bd,
                lc: function (a, b) {
                    X.bindRenderbuffer(a, od[b])
                },
                Ub: function (a, b) {
                    X.bindSampler(a, sd[b])
                },
                md: function (a, b) {
                    X.bindTexture(a, da[b])
                },
                Fc: Cd,
                Jc: Cd,
                nd: function (a, b, c, f) {
                    X.blendColor(a,
                        b, c, f)
                },
                od: function (a) {
                    X.blendEquation(a)
                },
                pd: function (a, b) {
                    X.blendFunc(a, b)
                },
                ec: function (a, b, c, f, h, m, u, n, p, v) {
                    X.blitFramebuffer(a, b, c, f, h, m, u, n, p, v)
                },
                qd: function (a, b, c, f) {
                    2 <= A.version ? c && b ? X.bufferData(a, J, f, c, b) : X.bufferData(a, b, f) : X.bufferData(a, c ? J.subarray(c, c + b) : b, f)
                },
                rd: function (a, b, c, f) {
                    2 <= A.version ? c && X.bufferSubData(a, b, J, f, c) : X.bufferSubData(a, b, J.subarray(f, f + c))
                },
                mc: function (a) {
                    return X.checkFramebufferStatus(a)
                },
                sd: Dd,
                td: Ed,
                ud: Fd,
                bc: function (a, b, c, f) {
                    return X.clientWaitSync(td[a], b,
                        (c >>> 0) + 4294967296 * f)
                },
                vd: function (a, b, c, f) {
                    X.colorMask(!!a, !!b, !!c, !!f)
                },
                wd: function (a) {
                    X.compileShader(pd[a])
                },
                xd: function (a, b, c, f, h, m, u, n) {
                    2 <= A.version ? X.$e || !u ? X.compressedTexImage2D(a, b, c, f, h, m, u, n) : X.compressedTexImage2D(a, b, c, f, h, m, J, n, u) : X.compressedTexImage2D(a, b, c, f, h, m, n ? J.subarray(n, n + u) : null)
                },
                yd: function (a, b, c, f, h, m, u, n, p) {
                    2 <= A.version ? X.$e || !n ? X.compressedTexSubImage2D(a, b, c, f, h, m, u, n, p) : X.compressedTexSubImage2D(a, b, c, f, h, m, u, J, p, n) : X.compressedTexSubImage2D(a, b, c, f, h, m, u, p ? J.subarray(p,
                        p + n) : null)
                },
                dc: function (a, b, c, f, h) {
                    X.copyBufferSubData(a, b, c, f, h)
                },
                zd: function (a, b, c, f, h, m, u, n) {
                    X.copyTexSubImage2D(a, b, c, f, h, m, u, n)
                },
                Z: function () {
                    var a = ca(md), b = X.createProgram();
                    b.name = a;
                    b.wf = b.uf = b.vf = 0;
                    b.If = 1;
                    md[a] = b;
                    return a
                },
                _: function (a) {
                    var b = ca(pd);
                    pd[b] = X.createShader(a);
                    return b
                },
                $: function (a) {
                    X.cullFace(a)
                },
                aa: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = Q[b + 4 * c >> 2], h = ld[f];
                        h && (X.deleteBuffer(h), h.name = 0, ld[f] = null, f == X.Df && (X.Df = 0), f == X.$e && (X.$e = 0))
                    }
                },
                nc: function (a, b) {
                    for (var c = 0; c < a; ++c) {
                        var f =
                            Q[b + 4 * c >> 2], h = nd[f];
                        h && (X.deleteFramebuffer(h), h.name = 0, nd[f] = null)
                    }
                },
                ba: function (a) {
                    if (a) {
                        var b = md[a];
                        b ? (X.deleteProgram(b), b.name = 0, md[a] = null) : xd(1281)
                    }
                },
                Pb: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = Q[b + 4 * c >> 2], h = rd[f];
                        h && (X.deleteQuery(h), rd[f] = null)
                    }
                },
                Jb: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = Q[b + 4 * c >> 2], h = rd[f];
                        h && (X.De.deleteQueryEXT(h), rd[f] = null)
                    }
                },
                oc: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = Q[b + 4 * c >> 2], h = od[f];
                        h && (X.deleteRenderbuffer(h), h.name = 0, od[f] = null)
                    }
                },
                Vb: function (a, b) {
                    for (var c =
                        0; c < a; c++) {
                        var f = Q[b + 4 * c >> 2], h = sd[f];
                        h && (X.deleteSampler(h), h.name = 0, sd[f] = null)
                    }
                },
                ca: function (a) {
                    if (a) {
                        var b = pd[a];
                        b ? (X.deleteShader(b), pd[a] = null) : xd(1281)
                    }
                },
                cc: function (a) {
                    if (a) {
                        var b = td[a];
                        b ? (X.deleteSync(b), b.name = 0, td[a] = null) : xd(1281)
                    }
                },
                da: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = Q[b + 4 * c >> 2], h = da[f];
                        h && (X.deleteTexture(h), h.name = 0, da[f] = null)
                    }
                },
                Gc: Gd,
                Kc: Gd,
                ea: function (a) {
                    X.depthMask(!!a)
                },
                fa: function (a) {
                    X.disable(a)
                },
                ga: function (a) {
                    X.disableVertexAttribArray(a)
                },
                ha: function (a, b, c) {
                    X.drawArrays(a,
                        b, c)
                },
                Dc: function (a, b, c, f) {
                    X.drawArraysInstanced(a, b, c, f)
                },
                Bc: function (a, b, c, f, h) {
                    X.Mf.drawArraysInstancedBaseInstanceWEBGL(a, b, c, f, h)
                },
                zc: function (a, b) {
                    for (var c = Jd[a], f = 0; f < a; f++) c[f] = Q[b + 4 * f >> 2];
                    X.drawBuffers(c)
                },
                ia: Kd,
                Ec: function (a, b, c, f, h) {
                    X.drawElementsInstanced(a, b, c, f, h)
                },
                Cc: function (a, b, c, f, h, m, u) {
                    X.Mf.drawElementsInstancedBaseVertexBaseInstanceWEBGL(a, b, c, f, h, m, u)
                },
                tc: function (a, b, c, f, h, m) {
                    Kd(a, f, h, m)
                },
                ja: function (a) {
                    X.enable(a)
                },
                ka: function (a) {
                    X.enableVertexAttribArray(a)
                },
                Qb: function (a) {
                    X.endQuery(a)
                },
                Kb: function (a) {
                    X.De.endQueryEXT(a)
                },
                _b: function (a, b) {
                    return (a = X.fenceSync(a, b)) ? (b = ca(td), a.name = b, td[b] = a, b) : 0
                },
                la: function () {
                    X.finish()
                },
                ma: function () {
                    X.flush()
                },
                pc: function (a, b, c, f) {
                    X.framebufferRenderbuffer(a, b, c, od[f])
                },
                qc: function (a, b, c, f, h) {
                    X.framebufferTexture2D(a, b, c, da[f], h)
                },
                na: function (a) {
                    X.frontFace(a)
                },
                oa: function (a, b) {
                    Ld(a, b, "createBuffer", ld)
                },
                rc: function (a, b) {
                    Ld(a, b, "createFramebuffer", nd)
                },
                Rb: function (a, b) {
                    Ld(a, b, "createQuery", rd)
                },
                Lb: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = X.De.createQueryEXT();
                        if (!f) {
                            for (xd(1282); c < a;) Q[b + 4 * c++ >> 2] = 0;
                            break
                        }
                        var h = ca(rd);
                        f.name = h;
                        rd[h] = f;
                        Q[b + 4 * c >> 2] = h
                    }
                },
                sc: function (a, b) {
                    Ld(a, b, "createRenderbuffer", od)
                },
                Wb: function (a, b) {
                    Ld(a, b, "createSampler", sd)
                },
                pa: function (a, b) {
                    Ld(a, b, "createTexture", da)
                },
                Hc: Md,
                Lc: Md,
                gc: function (a) {
                    X.generateMipmap(a)
                },
                qa: function (a, b, c) {
                    c ? Q[c >> 2] = X.getBufferParameter(a, b) : xd(1281)
                },
                ra: function () {
                    var a = X.getError() || yd;
                    yd = 0;
                    return a
                },
                sa: function (a, b) {
                    Od(a, b, 2)
                },
                hc: function (a, b, c, f) {
                    a = X.getFramebufferAttachmentParameter(a, b, c);
                    if (a instanceof
                        WebGLRenderbuffer || a instanceof WebGLTexture) a = a.name | 0;
                    Q[f >> 2] = a
                },
                ta: Pd,
                ua: function (a, b, c, f) {
                    a = X.getProgramInfoLog(md[a]);
                    null === a && (a = "(unknown error)");
                    b = 0 < b && f ? na(a, J, f, b) : 0;
                    c && (Q[c >> 2] = b)
                },
                va: function (a, b, c) {
                    if (c) if (a >= kd) xd(1281); else if (a = md[a], 35716 == b) a = X.getProgramInfoLog(a), null === a && (a = "(unknown error)"), Q[c >> 2] = a.length + 1; else if (35719 == b) {
                        if (!a.wf) for (b = 0; b < X.getProgramParameter(a, 35718); ++b) a.wf = Math.max(a.wf, X.getActiveUniform(a, b).name.length + 1);
                        Q[c >> 2] = a.wf
                    } else if (35722 == b) {
                        if (!a.uf) for (b =
                                            0; b < X.getProgramParameter(a, 35721); ++b) a.uf = Math.max(a.uf, X.getActiveAttrib(a, b).name.length + 1);
                        Q[c >> 2] = a.uf
                    } else if (35381 == b) {
                        if (!a.vf) for (b = 0; b < X.getProgramParameter(a, 35382); ++b) a.vf = Math.max(a.vf, X.getActiveUniformBlockName(a, b).length + 1);
                        Q[c >> 2] = a.vf
                    } else Q[c >> 2] = X.getProgramParameter(a, b); else xd(1281)
                },
                Eb: Qd,
                Fb: Qd,
                Sb: function (a, b, c) {
                    if (c) {
                        a = X.getQueryParameter(rd[a], b);
                        var f;
                        "boolean" == typeof a ? f = a ? 1 : 0 : f = a;
                        Q[c >> 2] = f
                    } else xd(1281)
                },
                Mb: function (a, b, c) {
                    if (c) {
                        a = X.De.getQueryObjectEXT(rd[a], b);
                        var f;
                        "boolean" == typeof a ? f = a ? 1 : 0 : f = a;
                        Q[c >> 2] = f
                    } else xd(1281)
                },
                Tb: function (a, b, c) {
                    c ? Q[c >> 2] = X.getQuery(a, b) : xd(1281)
                },
                Nb: function (a, b, c) {
                    c ? Q[c >> 2] = X.De.getQueryEXT(a, b) : xd(1281)
                },
                ic: function (a, b, c) {
                    c ? Q[c >> 2] = X.getRenderbufferParameter(a, b) : xd(1281)
                },
                wa: function (a, b, c, f) {
                    a = X.getShaderInfoLog(pd[a]);
                    null === a && (a = "(unknown error)");
                    b = 0 < b && f ? na(a, J, f, b) : 0;
                    c && (Q[c >> 2] = b)
                },
                Bb: function (a, b, c, f) {
                    a = X.getShaderPrecisionFormat(a, b);
                    Q[c >> 2] = a.rangeMin;
                    Q[c + 4 >> 2] = a.rangeMax;
                    Q[f >> 2] = a.precision
                },
                xa: function (a, b,
                              c) {
                    c ? 35716 == b ? (a = X.getShaderInfoLog(pd[a]), null === a && (a = "(unknown error)"), Q[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = X.getShaderSource(pd[a]), Q[c >> 2] = a ? a.length + 1 : 0) : Q[c >> 2] = X.getShaderParameter(pd[a], b) : xd(1281)
                },
                ya: Rd,
                Ic: Sd,
                za: function (a, b) {
                    b = b ? vb(J, b) : "";
                    if (a = md[a]) {
                        var c = a, f = c.kf, h = c.Uf, m;
                        if (!f) for (c.kf = f = {}, c.Tf = {}, m = 0; m < X.getProgramParameter(c, 35718); ++m) {
                            var u = X.getActiveUniform(c, m);
                            var n = u.name;
                            u = u.size;
                            var p = Td(n);
                            p = 0 < p ? n.slice(0, p) : n;
                            var v = c.If;
                            c.If += u;
                            h[p] = [u, v];
                            for (n = 0; n < u; ++n) f[v] = n, c.Tf[v++] =
                                p
                        }
                        c = a.kf;
                        f = 0;
                        h = b;
                        m = Td(b);
                        0 < m && (f = parseInt(b.slice(m + 1)) >>> 0, h = b.slice(0, m));
                        if ((h = a.Uf[h]) && f < h[0] && (f += h[1], c[f] = c[f] || X.getUniformLocation(a, b))) return f
                    } else xd(1281);
                    return -1
                },
                Cb: function (a, b, c) {
                    for (var f = Jd[b], h = 0; h < b; h++) f[h] = Q[c + 4 * h >> 2];
                    X.invalidateFramebuffer(a, f)
                },
                Db: function (a, b, c, f, h, m, u) {
                    for (var n = Jd[b], p = 0; p < b; p++) n[p] = Q[c + 4 * p >> 2];
                    X.invalidateSubFramebuffer(a, n, f, h, m, u)
                },
                $b: function (a) {
                    return X.isSync(td[a])
                },
                Aa: function (a) {
                    return (a = da[a]) ? X.isTexture(a) : 0
                },
                Ba: function (a) {
                    X.lineWidth(a)
                },
                Ca: function (a) {
                    a = md[a];
                    X.linkProgram(a);
                    a.kf = 0;
                    a.Uf = {}
                },
                xc: function (a, b, c, f, h, m) {
                    X.Qf.multiDrawArraysInstancedBaseInstanceWEBGL(a, Q, b >> 2, Q, c >> 2, Q, f >> 2, Ta, h >> 2, m)
                },
                yc: function (a, b, c, f, h, m, u, n) {
                    X.Qf.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, Q, b >> 2, c, Q, f >> 2, Q, h >> 2, Q, m >> 2, Ta, u >> 2, n)
                },
                Da: function (a, b) {
                    3317 == a && (wd = b);
                    X.pixelStorei(a, b)
                },
                Gb: function (a, b) {
                    X.De.queryCounterEXT(rd[a], b)
                },
                Ac: function (a) {
                    X.readBuffer(a)
                },
                Ea: function (a, b, c, f, h, m, u) {
                    if (2 <= A.version) if (X.Df) X.readPixels(a, b, c, f, h,
                        m, u); else {
                        var n = Ud(m);
                        X.readPixels(a, b, c, f, h, m, n, u >> 31 - Math.clz32(n.BYTES_PER_ELEMENT))
                    } else (u = Vd(m, h, c, f, u)) ? X.readPixels(a, b, c, f, h, m, u) : xd(1280)
                },
                jc: function (a, b, c, f) {
                    X.renderbufferStorage(a, b, c, f)
                },
                fc: function (a, b, c, f, h) {
                    X.renderbufferStorageMultisample(a, b, c, f, h)
                },
                Xb: function (a, b, c) {
                    X.samplerParameterf(sd[a], b, c)
                },
                Yb: function (a, b, c) {
                    X.samplerParameteri(sd[a], b, c)
                },
                Zb: function (a, b, c) {
                    X.samplerParameteri(sd[a], b, Q[c >> 2])
                },
                Fa: function (a, b, c, f) {
                    X.scissor(a, b, c, f)
                },
                Ga: function (a, b, c, f) {
                    for (var h = "",
                             m = 0; m < b; ++m) {
                        var u = f ? Q[f + 4 * m >> 2] : -1, n = Q[c + 4 * m >> 2];
                        u = n ? vb(J, n, 0 > u ? void 0 : u) : "";
                        h += u
                    }
                    X.shaderSource(pd[a], h)
                },
                Ha: function (a, b, c) {
                    X.stencilFunc(a, b, c)
                },
                Ia: function (a, b, c, f) {
                    X.stencilFuncSeparate(a, b, c, f)
                },
                Ja: function (a) {
                    X.stencilMask(a)
                },
                Ka: function (a, b) {
                    X.stencilMaskSeparate(a, b)
                },
                La: function (a, b, c) {
                    X.stencilOp(a, b, c)
                },
                Ma: function (a, b, c, f) {
                    X.stencilOpSeparate(a, b, c, f)
                },
                Na: function (a, b, c, f, h, m, u, n, p) {
                    if (2 <= A.version) if (X.$e) X.texImage2D(a, b, c, f, h, m, u, n, p); else if (p) {
                        var v = Ud(n);
                        X.texImage2D(a, b, c, f,
                            h, m, u, n, v, p >> 31 - Math.clz32(v.BYTES_PER_ELEMENT))
                    } else X.texImage2D(a, b, c, f, h, m, u, n, null); else X.texImage2D(a, b, c, f, h, m, u, n, p ? Vd(n, u, f, h, p) : null)
                },
                Oa: function (a, b, c) {
                    X.texParameterf(a, b, c)
                },
                Pa: function (a, b, c) {
                    X.texParameterf(a, b, S[c >> 2])
                },
                Qa: function (a, b, c) {
                    X.texParameteri(a, b, c)
                },
                Ra: function (a, b, c) {
                    X.texParameteri(a, b, Q[c >> 2])
                },
                uc: function (a, b, c, f, h) {
                    X.texStorage2D(a, b, c, f, h)
                },
                Sa: function (a, b, c, f, h, m, u, n, p) {
                    if (2 <= A.version) if (X.$e) X.texSubImage2D(a, b, c, f, h, m, u, n, p); else if (p) {
                        var v = Ud(n);
                        X.texSubImage2D(a,
                            b, c, f, h, m, u, n, v, p >> 31 - Math.clz32(v.BYTES_PER_ELEMENT))
                    } else X.texSubImage2D(a, b, c, f, h, m, u, n, null); else v = null, p && (v = Vd(n, u, h, m, p)), X.texSubImage2D(a, b, c, f, h, m, u, n, v)
                },
                Ta: function (a, b) {
                    X.uniform1f(Wd(a), b)
                },
                Ua: function (a, b, c) {
                    if (2 <= A.version) b && X.uniform1fv(Wd(a), S, c >> 2, b); else {
                        if (288 >= b) for (var f = Xd[b - 1], h = 0; h < b; ++h) f[h] = S[c + 4 * h >> 2]; else f = S.subarray(c >> 2, c + 4 * b >> 2);
                        X.uniform1fv(Wd(a), f)
                    }
                },
                ed: function (a, b) {
                    X.uniform1i(Wd(a), b)
                },
                fd: function (a, b, c) {
                    if (2 <= A.version) b && X.uniform1iv(Wd(a), Q, c >> 2, b); else {
                        if (288 >=
                            b) for (var f = Yd[b - 1], h = 0; h < b; ++h) f[h] = Q[c + 4 * h >> 2]; else f = Q.subarray(c >> 2, c + 4 * b >> 2);
                        X.uniform1iv(Wd(a), f)
                    }
                },
                gd: function (a, b, c) {
                    X.uniform2f(Wd(a), b, c)
                },
                hd: function (a, b, c) {
                    if (2 <= A.version) b && X.uniform2fv(Wd(a), S, c >> 2, 2 * b); else {
                        if (144 >= b) for (var f = Xd[2 * b - 1], h = 0; h < 2 * b; h += 2) f[h] = S[c + 4 * h >> 2], f[h + 1] = S[c + (4 * h + 4) >> 2]; else f = S.subarray(c >> 2, c + 8 * b >> 2);
                        X.uniform2fv(Wd(a), f)
                    }
                },
                dd: function (a, b, c) {
                    X.uniform2i(Wd(a), b, c)
                },
                cd: function (a, b, c) {
                    if (2 <= A.version) b && X.uniform2iv(Wd(a), Q, c >> 2, 2 * b); else {
                        if (144 >= b) for (var f =
                            Yd[2 * b - 1], h = 0; h < 2 * b; h += 2) f[h] = Q[c + 4 * h >> 2], f[h + 1] = Q[c + (4 * h + 4) >> 2]; else f = Q.subarray(c >> 2, c + 8 * b >> 2);
                        X.uniform2iv(Wd(a), f)
                    }
                },
                bd: function (a, b, c, f) {
                    X.uniform3f(Wd(a), b, c, f)
                },
                ad: function (a, b, c) {
                    if (2 <= A.version) b && X.uniform3fv(Wd(a), S, c >> 2, 3 * b); else {
                        if (96 >= b) for (var f = Xd[3 * b - 1], h = 0; h < 3 * b; h += 3) f[h] = S[c + 4 * h >> 2], f[h + 1] = S[c + (4 * h + 4) >> 2], f[h + 2] = S[c + (4 * h + 8) >> 2]; else f = S.subarray(c >> 2, c + 12 * b >> 2);
                        X.uniform3fv(Wd(a), f)
                    }
                },
                $c: function (a, b, c, f) {
                    X.uniform3i(Wd(a), b, c, f)
                },
                _c: function (a, b, c) {
                    if (2 <= A.version) b && X.uniform3iv(Wd(a),
                        Q, c >> 2, 3 * b); else {
                        if (96 >= b) for (var f = Yd[3 * b - 1], h = 0; h < 3 * b; h += 3) f[h] = Q[c + 4 * h >> 2], f[h + 1] = Q[c + (4 * h + 4) >> 2], f[h + 2] = Q[c + (4 * h + 8) >> 2]; else f = Q.subarray(c >> 2, c + 12 * b >> 2);
                        X.uniform3iv(Wd(a), f)
                    }
                },
                Zc: function (a, b, c, f, h) {
                    X.uniform4f(Wd(a), b, c, f, h)
                },
                Yc: function (a, b, c) {
                    if (2 <= A.version) b && X.uniform4fv(Wd(a), S, c >> 2, 4 * b); else {
                        if (72 >= b) {
                            var f = Xd[4 * b - 1], h = S;
                            c >>= 2;
                            for (var m = 0; m < 4 * b; m += 4) {
                                var u = c + m;
                                f[m] = h[u];
                                f[m + 1] = h[u + 1];
                                f[m + 2] = h[u + 2];
                                f[m + 3] = h[u + 3]
                            }
                        } else f = S.subarray(c >> 2, c + 16 * b >> 2);
                        X.uniform4fv(Wd(a), f)
                    }
                },
                Mc: function (a,
                              b, c, f, h) {
                    X.uniform4i(Wd(a), b, c, f, h)
                },
                Nc: function (a, b, c) {
                    if (2 <= A.version) b && X.uniform4iv(Wd(a), Q, c >> 2, 4 * b); else {
                        if (72 >= b) for (var f = Yd[4 * b - 1], h = 0; h < 4 * b; h += 4) f[h] = Q[c + 4 * h >> 2], f[h + 1] = Q[c + (4 * h + 4) >> 2], f[h + 2] = Q[c + (4 * h + 8) >> 2], f[h + 3] = Q[c + (4 * h + 12) >> 2]; else f = Q.subarray(c >> 2, c + 16 * b >> 2);
                        X.uniform4iv(Wd(a), f)
                    }
                },
                Oc: function (a, b, c, f) {
                    if (2 <= A.version) b && X.uniformMatrix2fv(Wd(a), !!c, S, f >> 2, 4 * b); else {
                        if (72 >= b) for (var h = Xd[4 * b - 1], m = 0; m < 4 * b; m += 4) h[m] = S[f + 4 * m >> 2], h[m + 1] = S[f + (4 * m + 4) >> 2], h[m + 2] = S[f + (4 * m + 8) >> 2], h[m + 3] = S[f +
                        (4 * m + 12) >> 2]; else h = S.subarray(f >> 2, f + 16 * b >> 2);
                        X.uniformMatrix2fv(Wd(a), !!c, h)
                    }
                },
                Pc: function (a, b, c, f) {
                    if (2 <= A.version) b && X.uniformMatrix3fv(Wd(a), !!c, S, f >> 2, 9 * b); else {
                        if (32 >= b) for (var h = Xd[9 * b - 1], m = 0; m < 9 * b; m += 9) h[m] = S[f + 4 * m >> 2], h[m + 1] = S[f + (4 * m + 4) >> 2], h[m + 2] = S[f + (4 * m + 8) >> 2], h[m + 3] = S[f + (4 * m + 12) >> 2], h[m + 4] = S[f + (4 * m + 16) >> 2], h[m + 5] = S[f + (4 * m + 20) >> 2], h[m + 6] = S[f + (4 * m + 24) >> 2], h[m + 7] = S[f + (4 * m + 28) >> 2], h[m + 8] = S[f + (4 * m + 32) >> 2]; else h = S.subarray(f >> 2, f + 36 * b >> 2);
                        X.uniformMatrix3fv(Wd(a), !!c, h)
                    }
                },
                Qc: function (a, b,
                              c, f) {
                    if (2 <= A.version) b && X.uniformMatrix4fv(Wd(a), !!c, S, f >> 2, 16 * b); else {
                        if (18 >= b) {
                            var h = Xd[16 * b - 1], m = S;
                            f >>= 2;
                            for (var u = 0; u < 16 * b; u += 16) {
                                var n = f + u;
                                h[u] = m[n];
                                h[u + 1] = m[n + 1];
                                h[u + 2] = m[n + 2];
                                h[u + 3] = m[n + 3];
                                h[u + 4] = m[n + 4];
                                h[u + 5] = m[n + 5];
                                h[u + 6] = m[n + 6];
                                h[u + 7] = m[n + 7];
                                h[u + 8] = m[n + 8];
                                h[u + 9] = m[n + 9];
                                h[u + 10] = m[n + 10];
                                h[u + 11] = m[n + 11];
                                h[u + 12] = m[n + 12];
                                h[u + 13] = m[n + 13];
                                h[u + 14] = m[n + 14];
                                h[u + 15] = m[n + 15]
                            }
                        } else h = S.subarray(f >> 2, f + 64 * b >> 2);
                        X.uniformMatrix4fv(Wd(a), !!c, h)
                    }
                },
                Rc: function (a) {
                    a = md[a];
                    X.useProgram(a);
                    X.dg = a
                },
                Sc: function (a,
                              b) {
                    X.vertexAttrib1f(a, b)
                },
                Tc: function (a, b) {
                    X.vertexAttrib2f(a, S[b >> 2], S[b + 4 >> 2])
                },
                Uc: function (a, b) {
                    X.vertexAttrib3f(a, S[b >> 2], S[b + 4 >> 2], S[b + 8 >> 2])
                },
                Vc: function (a, b) {
                    X.vertexAttrib4f(a, S[b >> 2], S[b + 4 >> 2], S[b + 8 >> 2], S[b + 12 >> 2])
                },
                vc: function (a, b) {
                    X.vertexAttribDivisor(a, b)
                },
                wc: function (a, b, c, f, h) {
                    X.vertexAttribIPointer(a, b, c, f, h)
                },
                Wc: function (a, b, c, f, h, m) {
                    X.vertexAttribPointer(a, b, c, !!f, h, m)
                },
                Xc: function (a, b, c, f) {
                    X.viewport(a, b, c, f)
                },
                ac: function (a, b, c, f) {
                    X.waitSync(td[a], b, (c >>> 0) + 4294967296 * f)
                },
                jb: a => {
                    var b = J.length;
                    a >>>= 0;
                    if (2147483648 < a) return !1;
                    for (var c = 1; 4 >= c; c *= 2) {
                        var f = b * (1 + .2 / c);
                        f = Math.min(f, a + 100663296);
                        var h = Math;
                        f = Math.max(a, f);
                        a:{
                            h = h.min.call(h, 2147483648, f + (65536 - f % 65536) % 65536) - La.buffer.byteLength + 65535 >>> 16;
                            try {
                                La.grow(h);
                                Va();
                                var m = 1;
                                break a
                            } catch (u) {
                            }
                            m = void 0
                        }
                        if (m) return !0
                    }
                    return !1
                },
                $a: function () {
                    return A ? A.handle : 0
                },
                lb: (a, b) => {
                    var c = 0;
                    ae().forEach(function (f, h) {
                        var m = b + c;
                        h = Ta[a + 4 * h >> 2] = m;
                        for (m = 0; m < f.length; ++m) Qa[h++ >> 0] = f.charCodeAt(m);
                        Qa[h >> 0] = 0;
                        c += f.length + 1
                    });
                    return 0
                },
                mb: (a, b) => {
                    var c = ae();
                    Ta[a >> 2] = c.length;
                    var f = 0;
                    c.forEach(function (h) {
                        f += h.length + 1
                    });
                    Ta[b >> 2] = f;
                    return 0
                },
                zb: a => {
                    if (!noExitRuntime) {
                        if (w.onExit) w.onExit(a);
                        Na = !0
                    }
                    va(a, new sb(a))
                },
                O: () => 52,
                bb: function () {
                    return 52
                },
                rb: () => 52,
                fb: function () {
                    return 70
                },
                R: (a, b, c, f) => {
                    for (var h = 0, m = 0; m < c; m++) {
                        var u = Ta[b >> 2], n = Ta[b + 4 >> 2];
                        b += 8;
                        for (var p = 0; p < n; p++) {
                            var v = J[u + p], E = be[a];
                            0 === v || 10 === v ? ((1 === a ? Ga : Ha)(vb(E, 0)), E.length = 0) : E.push(v)
                        }
                        h += n
                    }
                    Ta[f >> 2] = h;
                    return 0
                },
                Bd,
                ab: Dd,
                Ad: Ed,
                Hb: Fd,
                N: Pd,
                Q: Rd,
                Va: Sd,
                Wa: me,
                j: ne,
                q: oe,
                l: pe,
                F: qe,
                Ab: re,
                Y: se,
                X: te,
                W: ue,
                J: ve,
                k: we,
                y: xe,
                v: ye,
                t: ze,
                Za: Ae,
                Xa: Be,
                Ya: Ce,
                hb: (a, b, c, f) => ge(a, b, c, f)
            };
            (function () {
                function a(c) {
                    Ma = c = c.exports;
                    La = Ma.Cd;
                    Va();
                    Wa = Ma.Fd;
                    Ya.unshift(Ma.Dd);
                    ab--;
                    w.monitorRunDependencies && w.monitorRunDependencies(ab);
                    if (0 == ab && (null !== bb && (clearInterval(bb), bb = null), gb)) {
                        var f = gb;
                        gb = null;
                        f()
                    }
                    return c
                }

                var b = {a: De};
                ab++;
                w.monitorRunDependencies && w.monitorRunDependencies(ab);
                if (w.instantiateWasm) try {
                    return w.instantiateWasm(b, a)
                } catch (c) {
                    Ha("Module.instantiateWasm callback failed with error: " + c), ba(c)
                }
                rb(b, function (c) {
                    a(c.instance)
                }).catch(ba);
                return {}
            })();
            var ed = w._malloc = a => (ed = w._malloc = Ma.Ed)(a), yc = w._free = a => (yc = w._free = Ma.Gd)(a),
                xc = a => (xc = Ma.Hd)(a);
            w.__embind_initialize_bindings = () => (w.__embind_initialize_bindings = Ma.Id)();
            var Ee = (a, b) => (Ee = Ma.Jd)(a, b), Fe = () => (Fe = Ma.Kd)(), Ge = a => (Ge = Ma.Ld)(a);
            w.dynCall_viji = (a, b, c, f, h) => (w.dynCall_viji = Ma.Md)(a, b, c, f, h);
            w.dynCall_vijiii = (a, b, c, f, h, m, u) => (w.dynCall_vijiii = Ma.Nd)(a, b, c, f, h, m, u);
            w.dynCall_viiiiij = (a, b, c, f, h, m, u, n) => (w.dynCall_viiiiij = Ma.Od)(a, b, c, f, h, m, u, n);
            w.dynCall_vij = (a, b, c, f) => (w.dynCall_vij = Ma.Pd)(a, b, c, f);
            w.dynCall_jii = (a, b, c) => (w.dynCall_jii = Ma.Qd)(a, b, c);
            w.dynCall_jiiiii = (a, b, c, f, h, m) => (w.dynCall_jiiiii = Ma.Rd)(a, b, c, f, h, m);
            w.dynCall_jiiiiii = (a, b, c, f, h, m, u) => (w.dynCall_jiiiiii = Ma.Sd)(a, b, c, f, h, m, u);
            w.dynCall_jiiiiji = (a, b, c, f, h, m, u, n) => (w.dynCall_jiiiiji = Ma.Td)(a, b, c, f, h, m, u, n);
            w.dynCall_ji = (a, b) => (w.dynCall_ji = Ma.Ud)(a, b);
            w.dynCall_iijj = (a, b, c, f, h, m) => (w.dynCall_iijj = Ma.Vd)(a, b, c, f, h, m);
            w.dynCall_iiiji = (a, b, c, f, h, m) => (w.dynCall_iiiji = Ma.Wd)(a, b, c, f, h, m);
            w.dynCall_iiji = (a, b, c, f, h) => (w.dynCall_iiji = Ma.Xd)(a, b, c, f, h);
            w.dynCall_iijjiii = (a, b, c, f, h, m, u, n, p) => (w.dynCall_iijjiii = Ma.Yd)(a, b, c, f, h, m, u, n, p);
            w.dynCall_iij = (a, b, c, f) => (w.dynCall_iij = Ma.Zd)(a, b, c, f);
            w.dynCall_vijjjii = (a, b, c, f, h, m, u, n, p, v) => (w.dynCall_vijjjii = Ma._d)(a, b, c, f, h, m, u, n, p, v);
            w.dynCall_jiji = (a, b, c, f, h) => (w.dynCall_jiji = Ma.$d)(a, b, c, f, h);
            w.dynCall_viijii = (a, b, c, f, h, m, u) => (w.dynCall_viijii = Ma.ae)(a, b, c, f, h, m, u);
            w.dynCall_iiiiij = (a, b, c, f, h, m, u) => (w.dynCall_iiiiij = Ma.be)(a, b, c, f, h, m, u);
            w.dynCall_iiiiijj = (a, b, c, f, h, m, u, n, p) => (w.dynCall_iiiiijj = Ma.ce)(a, b, c, f, h, m, u, n, p);
            w.dynCall_iiiiiijj = (a, b, c, f, h, m, u, n, p, v) => (w.dynCall_iiiiiijj = Ma.de)(a, b, c, f, h, m, u, n, p, v);

            function pe(a, b, c, f) {
                var h = Fe();
                try {
                    return Wa.get(a)(b, c, f)
                } catch (m) {
                    Ge(h);
                    if (m !== m + 0) throw m;
                    Ee(1, 0)
                }
            }

            function Ae(a, b, c, f, h, m) {
                var u = Fe();
                try {
                    Wa.get(a)(b, c, f, h, m)
                } catch (n) {
                    Ge(u);
                    if (n !== n + 0) throw n;
                    Ee(1, 0)
                }
            }

            function ze(a, b, c, f, h) {
                var m = Fe();
                try {
                    Wa.get(a)(b, c, f, h)
                } catch (u) {
                    Ge(m);
                    if (u !== u + 0) throw u;
                    Ee(1, 0)
                }
            }

            function xe(a, b, c) {
                var f = Fe();
                try {
                    Wa.get(a)(b, c)
                } catch (h) {
                    Ge(f);
                    if (h !== h + 0) throw h;
                    Ee(1, 0)
                }
            }

            function qe(a, b, c, f, h) {
                var m = Fe();
                try {
                    return Wa.get(a)(b, c, f, h)
                } catch (u) {
                    Ge(m);
                    if (u !== u + 0) throw u;
                    Ee(1, 0)
                }
            }

            function ne(a, b) {
                var c = Fe();
                try {
                    return Wa.get(a)(b)
                } catch (f) {
                    Ge(c);
                    if (f !== f + 0) throw f;
                    Ee(1, 0)
                }
            }

            function ye(a, b, c, f) {
                var h = Fe();
                try {
                    Wa.get(a)(b, c, f)
                } catch (m) {
                    Ge(h);
                    if (m !== m + 0) throw m;
                    Ee(1, 0)
                }
            }

            function we(a, b) {
                var c = Fe();
                try {
                    Wa.get(a)(b)
                } catch (f) {
                    Ge(c);
                    if (f !== f + 0) throw f;
                    Ee(1, 0)
                }
            }

            function Ce(a, b, c, f, h, m, u, n, p, v) {
                var E = Fe();
                try {
                    Wa.get(a)(b, c, f, h, m, u, n, p, v)
                } catch (G) {
                    Ge(E);
                    if (G !== G + 0) throw G;
                    Ee(1, 0)
                }
            }

            function ve(a) {
                var b = Fe();
                try {
                    Wa.get(a)()
                } catch (c) {
                    Ge(b);
                    if (c !== c + 0) throw c;
                    Ee(1, 0)
                }
            }

            function oe(a, b, c) {
                var f = Fe();
                try {
                    return Wa.get(a)(b, c)
                } catch (h) {
                    Ge(f);
                    if (h !== h + 0) throw h;
                    Ee(1, 0)
                }
            }

            function Be(a, b, c, f, h, m, u) {
                var n = Fe();
                try {
                    Wa.get(a)(b, c, f, h, m, u)
                } catch (p) {
                    Ge(n);
                    if (p !== p + 0) throw p;
                    Ee(1, 0)
                }
            }

            function me(a) {
                var b = Fe();
                try {
                    return Wa.get(a)()
                } catch (c) {
                    Ge(b);
                    if (c !== c + 0) throw c;
                    Ee(1, 0)
                }
            }

            function se(a, b, c, f, h, m, u) {
                var n = Fe();
                try {
                    return Wa.get(a)(b, c, f, h, m, u)
                } catch (p) {
                    Ge(n);
                    if (p !== p + 0) throw p;
                    Ee(1, 0)
                }
            }

            function re(a, b, c, f, h, m) {
                var u = Fe();
                try {
                    return Wa.get(a)(b, c, f, h, m)
                } catch (n) {
                    Ge(u);
                    if (n !== n + 0) throw n;
                    Ee(1, 0)
                }
            }

            function te(a, b, c, f, h, m, u, n) {
                var p = Fe();
                try {
                    return Wa.get(a)(b, c, f, h, m, u, n)
                } catch (v) {
                    Ge(p);
                    if (v !== v + 0) throw v;
                    Ee(1, 0)
                }
            }

            function ue(a, b, c, f, h, m, u, n, p, v) {
                var E = Fe();
                try {
                    return Wa.get(a)(b, c, f, h, m, u, n, p, v)
                } catch (G) {
                    Ge(E);
                    if (G !== G + 0) throw G;
                    Ee(1, 0)
                }
            }

            var He;
            gb = function Ie() {
                He || Je();
                He || (gb = Ie)
            };

            function Je() {
                function a() {
                    if (!He && (He = !0, w.calledRun = !0, !Na)) {
                        tb(Ya);
                        aa(w);
                        if (w.onRuntimeInitialized) w.onRuntimeInitialized();
                        if (w.postRun) for ("function" == typeof w.postRun && (w.postRun = [w.postRun]); w.postRun.length;) {
                            var b = w.postRun.shift();
                            Za.unshift(b)
                        }
                        tb(Za)
                    }
                }

                if (!(0 < ab)) {
                    if (w.preRun) for ("function" == typeof w.preRun && (w.preRun = [w.preRun]); w.preRun.length;) $a();
                    tb(Xa);
                    0 < ab || (w.setStatus ? (w.setStatus("Running..."), setTimeout(function () {
                        setTimeout(function () {
                            w.setStatus("")
                        }, 1);
                        a()
                    }, 1)) : a())
                }
            }

            if (w.preInit) for ("function" == typeof w.preInit && (w.preInit = [w.preInit]); 0 < w.preInit.length;) w.preInit.pop()();
            Je();


            return moduleArg.ready
        }

    );
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = CanvasKitInit;
else if (typeof define === 'function' && define['amd'])
    define([], () => CanvasKitInit);

export default CanvasKitInit;

