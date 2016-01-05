var Zepto = function () {
    function t(t) {
        return null == t ? String(t) : X[Y.call(t)] || "object"
    }

    function e(e) {
        return "function" == t(e)
    }

    function n(t) {
        return null != t && t == t.window
    }

    function r(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
    }

    function i(e) {
        return "object" == t(e)
    }

    function o(t) {
        return i(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
    }

    function s(t) {
        return "number" == typeof t.length
    }

    function a(t) {
        return N.call(t, function (t) {
            return null != t
        })
    }

    function u(t) {
        return t.length > 0 ? T.fn.concat.apply([], t) : t
    }

    function c(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function l(t) {
        return t in k ? k[t] : k[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
    }

    function f(t, e) {
        return "number" != typeof e || M[c(t)] ? e : e + "px"
    }

    function h(t) {
        var e, n;
        return A[t] || (e = O.createElement(t), O.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), A[t] = n), A[t]
    }

    function p(t) {
        return "children"in t ? P.call(t.children) : T.map(t.childNodes, function (t) {
            return 1 == t.nodeType ? t : void 0
        })
    }

    function d(t, e, n) {
        for (E in e)n && (o(e[E]) || G(e[E])) ? (o(e[E]) && !o(t[E]) && (t[E] = {}), G(e[E]) && !G(t[E]) && (t[E] = []), d(t[E], e[E], n)) : e[E] !== x && (t[E] = e[E])
    }

    function m(t, e) {
        return null == e ? T(t) : T(t).filter(e)
    }

    function v(t, n, r, i) {
        return e(n) ? n.call(t, r, i) : n
    }

    function g(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
    }

    function y(t, e) {
        var n = t.className || "", r = n && n.baseVal !== x;
        return e === x ? r ? n.baseVal : n : void(r ? n.baseVal = e : t.className = e)
    }

    function w(t) {
        try {
            return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? T.parseJSON(t) : t) : t
        } catch (e) {
            return t
        }
    }

    function b(t, e) {
        e(t);
        for (var n = 0, r = t.childNodes.length; r > n; n++)b(t.childNodes[n], e)
    }

    var x, E, T, _, j, S, C = [], P = C.slice, N = C.filter, O = window.document, A = {}, k = {}, M = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    }, D = /^\s*<(\w+|!)[^>]*>/, $ = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, L = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, I = /^(?:body|html)$/i, R = /([A-Z])/g, Z = ["val", "css", "html", "text", "data", "width", "height", "offset"], z = ["after", "prepend", "before", "append"], F = O.createElement("table"), U = O.createElement("tr"), q = {
        tr: O.createElement("tbody"),
        tbody: F,
        thead: F,
        tfoot: F,
        td: U,
        th: U,
        "*": O.createElement("div")
    }, H = /complete|loaded|interactive/, B = /^[\w-]*$/, X = {}, Y = X.toString, V = {}, W = O.createElement("div"), J = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    }, G = Array.isArray || function (t) {
            return t instanceof Array
        };
    return V.matches = function (t, e) {
        if (!e || !t || 1 !== t.nodeType)return !1;
        var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (n)return n.call(t, e);
        var r, i = t.parentNode, o = !i;
        return o && (i = W).appendChild(t), r = ~V.qsa(i, e).indexOf(t), o && W.removeChild(t), r
    }, j = function (t) {
        return t.replace(/-+(.)?/g, function (t, e) {
            return e ? e.toUpperCase() : ""
        })
    }, S = function (t) {
        return N.call(t, function (e, n) {
            return t.indexOf(e) == n
        })
    }, V.fragment = function (t, e, n) {
        var r, i, s;
        return $.test(t) && (r = T(O.createElement(RegExp.$1))), r || (t.replace && (t = t.replace(L, "<$1></$2>")), e === x && (e = D.test(t) && RegExp.$1), e in q || (e = "*"), s = q[e], s.innerHTML = "" + t, r = T.each(P.call(s.childNodes), function () {
            s.removeChild(this)
        })), o(n) && (i = T(r), T.each(n, function (t, e) {
            Z.indexOf(t) > -1 ? i[t](e) : i.attr(t, e)
        })), r
    }, V.Z = function (t, e) {
        return t = t || [], t.__proto__ = T.fn, t.selector = e || "", t
    }, V.isZ = function (t) {
        return t instanceof V.Z
    }, V.init = function (t, n) {
        var r;
        if (!t)return V.Z();
        if ("string" == typeof t)if (t = t.trim(), "<" == t[0] && D.test(t))r = V.fragment(t, RegExp.$1, n), t = null; else {
            if (n !== x)return T(n).find(t);
            r = V.qsa(O, t)
        } else {
            if (e(t))return T(O).ready(t);
            if (V.isZ(t))return t;
            if (G(t))r = a(t); else if (i(t))r = [t], t = null; else if (D.test(t))r = V.fragment(t.trim(), RegExp.$1, n), t = null; else {
                if (n !== x)return T(n).find(t);
                r = V.qsa(O, t)
            }
        }
        return V.Z(r, t)
    }, T = function (t, e) {
        return V.init(t, e)
    }, T.extend = function (t) {
        var e, n = P.call(arguments, 1);
        return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
            d(t, n, e)
        }), t
    }, V.qsa = function (t, e) {
        var n, i = "#" == e[0], o = !i && "." == e[0], s = i || o ? e.slice(1) : e, a = B.test(s);
        return r(t) && a && i ? (n = t.getElementById(s)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : P.call(a && !i ? o ? t.getElementsByClassName(s) : t.getElementsByTagName(e) : t.querySelectorAll(e))
    }, T.contains = O.documentElement.contains ? function (t, e) {
        return t !== e && t.contains(e)
    } : function (t, e) {
        for (; e && (e = e.parentNode);)if (e === t)return !0;
        return !1
    }, T.type = t, T.isFunction = e, T.isWindow = n, T.isArray = G, T.isPlainObject = o, T.isEmptyObject = function (t) {
        var e;
        for (e in t)return !1;
        return !0
    }, T.inArray = function (t, e, n) {
        return C.indexOf.call(e, t, n)
    }, T.camelCase = j, T.trim = function (t) {
        return null == t ? "" : String.prototype.trim.call(t)
    }, T.uuid = 0, T.support = {}, T.expr = {}, T.map = function (t, e) {
        var n, r, i, o = [];
        if (s(t))for (r = 0; r < t.length; r++)n = e(t[r], r), null != n && o.push(n); else for (i in t)n = e(t[i], i), null != n && o.push(n);
        return u(o)
    }, T.each = function (t, e) {
        var n, r;
        if (s(t)) {
            for (n = 0; n < t.length; n++)if (e.call(t[n], n, t[n]) === !1)return t
        } else for (r in t)if (e.call(t[r], r, t[r]) === !1)return t;
        return t
    }, T.grep = function (t, e) {
        return N.call(t, e)
    }, window.JSON && (T.parseJSON = JSON.parse), T.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
        X["[object " + e + "]"] = e.toLowerCase()
    }), T.fn = {
        forEach: C.forEach,
        reduce: C.reduce,
        push: C.push,
        sort: C.sort,
        indexOf: C.indexOf,
        concat: C.concat,
        map: function (t) {
            return T(T.map(this, function (e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function () {
            return T(P.apply(this, arguments))
        },
        ready: function (t) {
            return H.test(O.readyState) && O.body ? t(T) : O.addEventListener("DOMContentLoaded", function () {
                t(T)
            }, !1), this
        },
        get: function (t) {
            return t === x ? P.call(this) : this[t >= 0 ? t : t + this.length]
        },
        toArray: function () {
            return this.get()
        },
        size: function () {
            return this.length
        },
        remove: function () {
            return this.each(function () {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function (t) {
            return C.every.call(this, function (e, n) {
                return t.call(e, n, e) !== !1
            }), this
        },
        filter: function (t) {
            return e(t) ? this.not(this.not(t)) : T(N.call(this, function (e) {
                return V.matches(e, t)
            }))
        },
        add: function (t, e) {
            return T(S(this.concat(T(t, e))))
        },
        is: function (t) {
            return this.length > 0 && V.matches(this[0], t)
        },
        not: function (t) {
            var n = [];
            if (e(t) && t.call !== x)this.each(function (e) {
                t.call(this, e) || n.push(this)
            }); else {
                var r = "string" == typeof t ? this.filter(t) : s(t) && e(t.item) ? P.call(t) : T(t);
                this.forEach(function (t) {
                    r.indexOf(t) < 0 && n.push(t)
                })
            }
            return T(n)
        },
        has: function (t) {
            return this.filter(function () {
                return i(t) ? T.contains(this, t) : T(this).find(t).size()
            })
        },
        eq: function (t) {
            return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
        },
        first: function () {
            var t = this[0];
            return t && !i(t) ? t : T(t)
        },
        last: function () {
            var t = this[this.length - 1];
            return t && !i(t) ? t : T(t)
        },
        find: function (t) {
            var e, n = this;
            return e = t ? "object" == typeof t ? T(t).filter(function () {
                var t = this;
                return C.some.call(n, function (e) {
                    return T.contains(e, t)
                })
            }) : 1 == this.length ? T(V.qsa(this[0], t)) : this.map(function () {
                return V.qsa(this, t)
            }) : T()
        },
        closest: function (t, e) {
            var n = this[0], i = !1;
            for ("object" == typeof t && (i = T(t)); n && !(i ? i.indexOf(n) >= 0 : V.matches(n, t));)n = n !== e && !r(n) && n.parentNode;
            return T(n)
        },
        parents: function (t) {
            for (var e = [], n = this; n.length > 0;)n = T.map(n, function (t) {
                return (t = t.parentNode) && !r(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
            });
            return m(e, t)
        },
        parent: function (t) {
            return m(S(this.pluck("parentNode")), t)
        },
        children: function (t) {
            return m(this.map(function () {
                return p(this)
            }), t)
        },
        contents: function () {
            return this.map(function () {
                return P.call(this.childNodes)
            })
        },
        siblings: function (t) {
            return m(this.map(function (t, e) {
                return N.call(p(e.parentNode), function (t) {
                    return t !== e
                })
            }), t)
        },
        empty: function () {
            return this.each(function () {
                this.innerHTML = ""
            })
        },
        pluck: function (t) {
            return T.map(this, function (e) {
                return e[t]
            })
        },
        show: function () {
            return this.each(function () {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
            })
        },
        replaceWith: function (t) {
            return this.before(t).remove()
        },
        wrap: function (t) {
            var n = e(t);
            if (this[0] && !n)var r = T(t).get(0), i = r.parentNode || this.length > 1;
            return this.each(function (e) {
                T(this).wrapAll(n ? t.call(this, e) : i ? r.cloneNode(!0) : r)
            })
        },
        wrapAll: function (t) {
            if (this[0]) {
                T(this[0]).before(t = T(t));
                for (var e; (e = t.children()).length;)t = e.first();
                T(t).append(this)
            }
            return this
        },
        wrapInner: function (t) {
            var n = e(t);
            return this.each(function (e) {
                var r = T(this), i = r.contents(), o = n ? t.call(this, e) : t;
                i.length ? i.wrapAll(o) : r.append(o)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                T(this).replaceWith(T(this).children())
            }), this
        },
        clone: function () {
            return this.map(function () {
                return this.cloneNode(!0)
            })
        },
        hide: function () {
            return this.css("display", "none")
        },
        toggle: function (t) {
            return this.each(function () {
                var e = T(this);
                (t === x ? "none" == e.css("display") : t) ? e.show() : e.hide()
            })
        },
        prev: function (t) {
            return T(this.pluck("previousElementSibling")).filter(t || "*")
        },
        next: function (t) {
            return T(this.pluck("nextElementSibling")).filter(t || "*")
        },
        html: function (t) {
            return 0 in arguments ? this.each(function (e) {
                var n = this.innerHTML;
                T(this).empty().append(v(this, t, e, n))
            }) : 0 in this ? this[0].innerHTML : null
        },
        text: function (t) {
            return 0 in arguments ? this.each(function (e) {
                var n = v(this, t, e, this.textContent);
                this.textContent = null == n ? "" : "" + n
            }) : 0 in this ? this[0].textContent : null
        },
        attr: function (t, e) {
            var n;
            return "string" != typeof t || 1 in arguments ? this.each(function (n) {
                if (1 === this.nodeType)if (i(t))for (E in t)g(this, E, t[E]); else g(this, t, v(this, e, n, this.getAttribute(t)))
            }) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : x
        },
        removeAttr: function (t) {
            return this.each(function () {
                1 === this.nodeType && t.split(" ").forEach(function (t) {
                    g(this, t)
                }, this)
            })
        },
        prop: function (t, e) {
            return t = J[t] || t, 1 in arguments ? this.each(function (n) {
                this[t] = v(this, e, n, this[t])
            }) : this[0] && this[0][t]
        },
        data: function (t, e) {
            var n = "data-" + t.replace(R, "-$1").toLowerCase(), r = 1 in arguments ? this.attr(n, e) : this.attr(n);
            return null !== r ? w(r) : x
        },
        val: function (t) {
            return 0 in arguments ? this.each(function (e) {
                this.value = v(this, t, e, this.value)
            }) : this[0] && (this[0].multiple ? T(this[0]).find("option").filter(function () {
                return this.selected
            }).pluck("value") : this[0].value)
        },
        offset: function (t) {
            if (t)return this.each(function (e) {
                var n = T(this), r = v(this, t, e, n.offset()), i = n.offsetParent().offset(), o = {
                    top: r.top - i.top,
                    left: r.left - i.left
                };
                "static" == n.css("position") && (o.position = "relative"), n.css(o)
            });
            if (!this.length)return null;
            var e = this[0].getBoundingClientRect();
            return {
                left: e.left + window.pageXOffset,
                top: e.top + window.pageYOffset,
                width: Math.round(e.width),
                height: Math.round(e.height)
            }
        },
        css: function (e, n) {
            if (arguments.length < 2) {
                var r, i = this[0];
                if (!i)return;
                if (r = getComputedStyle(i, ""), "string" == typeof e)return i.style[j(e)] || r.getPropertyValue(e);
                if (G(e)) {
                    var o = {};
                    return T.each(e, function (t, e) {
                        o[e] = i.style[j(e)] || r.getPropertyValue(e)
                    }), o
                }
            }
            var s = "";
            if ("string" == t(e))n || 0 === n ? s = c(e) + ":" + f(e, n) : this.each(function () {
                this.style.removeProperty(c(e))
            }); else for (E in e)e[E] || 0 === e[E] ? s += c(E) + ":" + f(E, e[E]) + ";" : this.each(function () {
                this.style.removeProperty(c(E))
            });
            return this.each(function () {
                this.style.cssText += ";" + s
            })
        },
        index: function (t) {
            return t ? this.indexOf(T(t)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function (t) {
            return t ? C.some.call(this, function (t) {
                return this.test(y(t))
            }, l(t)) : !1
        },
        addClass: function (t) {
            return t ? this.each(function (e) {
                if ("className"in this) {
                    _ = [];
                    var n = y(this), r = v(this, t, e, n);
                    r.split(/\s+/g).forEach(function (t) {
                        T(this).hasClass(t) || _.push(t)
                    }, this), _.length && y(this, n + (n ? " " : "") + _.join(" "))
                }
            }) : this
        },
        removeClass: function (t) {
            return this.each(function (e) {
                if ("className"in this) {
                    if (t === x)return y(this, "");
                    _ = y(this), v(this, t, e, _).split(/\s+/g).forEach(function (t) {
                        _ = _.replace(l(t), " ")
                    }), y(this, _.trim())
                }
            })
        },
        toggleClass: function (t, e) {
            return t ? this.each(function (n) {
                var r = T(this), i = v(this, t, n, y(this));
                i.split(/\s+/g).forEach(function (t) {
                    (e === x ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t)
                })
            }) : this
        },
        scrollTop: function (t) {
            if (this.length) {
                var e = "scrollTop"in this[0];
                return t === x ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function () {
                    this.scrollTop = t
                } : function () {
                    this.scrollTo(this.scrollX, t)
                })
            }
        },
        scrollLeft: function (t) {
            if (this.length) {
                var e = "scrollLeft"in this[0];
                return t === x ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function () {
                    this.scrollLeft = t
                } : function () {
                    this.scrollTo(t, this.scrollY)
                })
            }
        },
        position: function () {
            if (this.length) {
                var t = this[0], e = this.offsetParent(), n = this.offset(), r = I.test(e[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : e.offset();
                return n.top -= parseFloat(T(t).css("margin-top")) || 0, n.left -= parseFloat(T(t).css("margin-left")) || 0, r.top += parseFloat(T(e[0]).css("border-top-width")) || 0, r.left += parseFloat(T(e[0]).css("border-left-width")) || 0, {
                    top: n.top - r.top,
                    left: n.left - r.left
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var t = this.offsetParent || O.body; t && !I.test(t.nodeName) && "static" == T(t).css("position");)t = t.offsetParent;
                return t
            })
        }
    }, T.fn.detach = T.fn.remove, ["width", "height"].forEach(function (t) {
        var e = t.replace(/./, function (t) {
            return t[0].toUpperCase()
        });
        T.fn[t] = function (i) {
            var o, s = this[0];
            return i === x ? n(s) ? s["inner" + e] : r(s) ? s.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function (e) {
                s = T(this), s.css(t, v(this, i, e, s[t]()))
            })
        }
    }), z.forEach(function (e, n) {
        var r = n % 2;
        T.fn[e] = function () {
            var e, i, o = T.map(arguments, function (n) {
                return e = t(n), "object" == e || "array" == e || null == n ? n : V.fragment(n)
            }), s = this.length > 1;
            return o.length < 1 ? this : this.each(function (t, e) {
                i = r ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null;
                var a = T.contains(O.documentElement, i);
                o.forEach(function (t) {
                    if (s)t = t.cloneNode(!0); else if (!i)return T(t).remove();
                    i.insertBefore(t, e), a && b(t, function (t) {
                        null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                    })
                })
            })
        }, T.fn[r ? e + "To" : "insert" + (n ? "Before" : "After")] = function (t) {
            return T(t)[e](this), this
        }
    }), V.Z.prototype = T.fn, V.uniq = S, V.deserializeValue = w, T.zepto = V, T
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function (t) {
    function e(t) {
        return t._zid || (t._zid = h++)
    }

    function n(t, n, o, s) {
        if (n = r(n), n.ns)var a = i(n.ns);
        return (v[e(t)] || []).filter(function (t) {
            return !(!t || n.e && t.e != n.e || n.ns && !a.test(t.ns) || o && e(t.fn) !== e(o) || s && t.sel != s)
        })
    }

    function r(t) {
        var e = ("" + t).split(".");
        return {e: e[0], ns: e.slice(1).sort().join(" ")}
    }

    function i(t) {
        return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
    }

    function o(t, e) {
        return t.del && !y && t.e in w || !!e
    }

    function s(t) {
        return b[t] || y && w[t] || t
    }

    function a(n, i, a, u, l, h, p) {
        var d = e(n), m = v[d] || (v[d] = []);
        i.split(/\s/).forEach(function (e) {
            if ("ready" == e)return t(document).ready(a);
            var i = r(e);
            i.fn = a, i.sel = l, i.e in b && (a = function (e) {
                var n = e.relatedTarget;
                return !n || n !== this && !t.contains(this, n) ? i.fn.apply(this, arguments) : void 0
            }), i.del = h;
            var d = h || a;
            i.proxy = function (t) {
                if (t = c(t), !t.isImmediatePropagationStopped()) {
                    t.data = u;
                    var e = d.apply(n, t._args == f ? [t] : [t].concat(t._args));
                    return e === !1 && (t.preventDefault(), t.stopPropagation()), e
                }
            }, i.i = m.length, m.push(i), "addEventListener"in n && n.addEventListener(s(i.e), i.proxy, o(i, p))
        })
    }

    function u(t, r, i, a, u) {
        var c = e(t);
        (r || "").split(/\s/).forEach(function (e) {
            n(t, e, i, a).forEach(function (e) {
                delete v[c][e.i], "removeEventListener"in t && t.removeEventListener(s(e.e), e.proxy, o(e, u))
            })
        })
    }

    function c(e, n) {
        return (n || !e.isDefaultPrevented) && (n || (n = e), t.each(_, function (t, r) {
            var i = n[t];
            e[t] = function () {
                return this[r] = x, i && i.apply(n, arguments)
            }, e[r] = E
        }), (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue"in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = x)), e
    }

    function l(t) {
        var e, n = {originalEvent: t};
        for (e in t)T.test(e) || t[e] === f || (n[e] = t[e]);
        return c(n, t)
    }

    var f, h = 1, p = Array.prototype.slice, d = t.isFunction, m = function (t) {
        return "string" == typeof t
    }, v = {}, g = {}, y = "onfocusin"in window, w = {focus: "focusin", blur: "focusout"}, b = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents", t.event = {
        add: a,
        remove: u
    }, t.proxy = function (n, r) {
        var i = 2 in arguments && p.call(arguments, 2);
        if (d(n)) {
            var o = function () {
                return n.apply(r, i ? i.concat(p.call(arguments)) : arguments)
            };
            return o._zid = e(n), o
        }
        if (m(r))return i ? (i.unshift(n[r], n), t.proxy.apply(null, i)) : t.proxy(n[r], n);
        throw new TypeError("expected function")
    }, t.fn.bind = function (t, e, n) {
        return this.on(t, e, n)
    }, t.fn.unbind = function (t, e) {
        return this.off(t, e)
    }, t.fn.one = function (t, e, n, r) {
        return this.on(t, e, n, r, 1)
    };
    var x = function () {
        return !0
    }, E = function () {
        return !1
    }, T = /^([A-Z]|returnValue$|layer[XY]$)/, _ = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    t.fn.delegate = function (t, e, n) {
        return this.on(e, t, n)
    }, t.fn.undelegate = function (t, e, n) {
        return this.off(e, t, n)
    }, t.fn.live = function (e, n) {
        return t(document.body).delegate(this.selector, e, n), this
    }, t.fn.die = function (e, n) {
        return t(document.body).undelegate(this.selector, e, n), this
    }, t.fn.on = function (e, n, r, i, o) {
        var s, c, h = this;
        return e && !m(e) ? (t.each(e, function (t, e) {
            h.on(t, n, r, e, o)
        }), h) : (m(n) || d(i) || i === !1 || (i = r, r = n, n = f), (d(r) || r === !1) && (i = r, r = f), i === !1 && (i = E), h.each(function (f, h) {
            o && (s = function (t) {
                return u(h, t.type, i), i.apply(this, arguments)
            }), n && (c = function (e) {
                var r, o = t(e.target).closest(n, h).get(0);
                return o && o !== h ? (r = t.extend(l(e), {
                    currentTarget: o,
                    liveFired: h
                }), (s || i).apply(o, [r].concat(p.call(arguments, 1)))) : void 0
            }), a(h, e, i, r, n, c || s)
        }))
    }, t.fn.off = function (e, n, r) {
        var i = this;
        return e && !m(e) ? (t.each(e, function (t, e) {
            i.off(t, n, e)
        }), i) : (m(n) || d(r) || r === !1 || (r = n, n = f), r === !1 && (r = E), i.each(function () {
            u(this, e, r, n)
        }))
    }, t.fn.trigger = function (e, n) {
        return e = m(e) || t.isPlainObject(e) ? t.Event(e) : c(e), e._args = n, this.each(function () {
            e.type in w && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent"in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
        })
    }, t.fn.triggerHandler = function (e, r) {
        var i, o;
        return this.each(function (s, a) {
            i = l(m(e) ? t.Event(e) : e), i._args = r, i.target = a, t.each(n(a, e.type || e), function (t, e) {
                return o = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), o
    }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
        t.fn[e] = function (t) {
            return 0 in arguments ? this.bind(e, t) : this.trigger(e)
        }
    }), t.Event = function (t, e) {
        m(t) || (e = t, t = e.type);
        var n = document.createEvent(g[t] || "Events"), r = !0;
        if (e)for (var i in e)"bubbles" == i ? r = !!e[i] : n[i] = e[i];
        return n.initEvent(t, r, !0), c(n)
    }
}(Zepto), function (t) {
    function e(e, n, r) {
        var i = t.Event(n);
        return t(e).trigger(i, r), !i.isDefaultPrevented()
    }

    function n(t, n, r, i) {
        return t.global ? e(n || y, r, i) : void 0
    }

    function r(e) {
        e.global && 0 === t.active++ && n(e, null, "ajaxStart")
    }

    function i(e) {
        e.global && !--t.active && n(e, null, "ajaxStop")
    }

    function o(t, e) {
        var r = e.context;
        return e.beforeSend.call(r, t, e) === !1 || n(e, r, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void n(e, r, "ajaxSend", [t, e])
    }

    function s(t, e, r, i) {
        var o = r.context, s = "success";
        r.success.call(o, t, s, e), i && i.resolveWith(o, [t, s, e]), n(r, o, "ajaxSuccess", [e, r, t]), u(s, e, r)
    }

    function a(t, e, r, i, o) {
        var s = i.context;
        i.error.call(s, r, e, t), o && o.rejectWith(s, [r, e, t]), n(i, s, "ajaxError", [r, i, t || e]), u(e, r, i)
    }

    function u(t, e, r) {
        var o = r.context;
        r.complete.call(o, e, t), n(r, o, "ajaxComplete", [e, r]), i(r)
    }

    function c() {
    }

    function l(t) {
        return t && (t = t.split(";", 2)[0]), t && (t == T ? "html" : t == E ? "json" : b.test(t) ? "script" : x.test(t) && "xml") || "text"
    }

    function f(t, e) {
        return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
    }

    function h(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data), e.data = void 0)
    }

    function p(e, n, r, i) {
        return t.isFunction(n) && (i = r, r = n, n = void 0), t.isFunction(r) || (i = r, r = void 0), {
            url: e,
            data: n,
            success: r,
            dataType: i
        }
    }

    function d(e, n, r, i) {
        var o, s = t.isArray(n), a = t.isPlainObject(n);
        t.each(n, function (n, u) {
            o = t.type(u), i && (n = r ? i : i + "[" + (a || "object" == o || "array" == o ? n : "") + "]"), !i && s ? e.add(u.name, u.value) : "array" == o || !r && "object" == o ? d(e, u, r, n) : e.add(n, u)
        })
    }

    var m, v, g = 0, y = window.document, w = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, b = /^(?:text|application)\/javascript/i, x = /^(?:text|application)\/xml/i, E = "application/json", T = "text/html", _ = /^\s*$/, j = y.createElement("a");
    j.href = window.location.href, t.active = 0, t.ajaxJSONP = function (e, n) {
        if (!("type"in e))return t.ajax(e);
        var r, i, u = e.jsonpCallback, c = (t.isFunction(u) ? u() : u) || "jsonp" + ++g, l = y.createElement("script"), f = window[c], h = function (e) {
            t(l).triggerHandler("error", e || "abort")
        }, p = {abort: h};
        return n && n.promise(p), t(l).on("load error", function (o, u) {
            clearTimeout(i), t(l).off().remove(), "error" != o.type && r ? s(r[0], p, e, n) : a(null, u || "error", p, e, n), window[c] = f, r && t.isFunction(f) && f(r[0]), f = r = void 0
        }), o(p, e) === !1 ? (h("abort"), p) : (window[c] = function () {
            r = arguments
        }, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + c), y.head.appendChild(l), e.timeout > 0 && (i = setTimeout(function () {
            h("timeout")
        }, e.timeout)), p)
    }, t.ajaxSettings = {
        type: "GET",
        beforeSend: c,
        success: c,
        error: c,
        complete: c,
        context: null,
        global: !0,
        xhr: function () {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: E,
            xml: "application/xml, text/xml",
            html: T,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, t.ajax = function (e) {
        var n, i = t.extend({}, e || {}), u = t.Deferred && t.Deferred();
        for (m in t.ajaxSettings)void 0 === i[m] && (i[m] = t.ajaxSettings[m]);
        r(i), i.crossDomain || (n = y.createElement("a"), n.href = i.url, n.href = n.href, i.crossDomain = j.protocol + "//" + j.host != n.protocol + "//" + n.host), i.url || (i.url = window.location.toString()), h(i);
        var p = i.dataType, d = /\?.+=\?/.test(i.url);
        if (d && (p = "jsonp"), i.cache !== !1 && (e && e.cache === !0 || "script" != p && "jsonp" != p) || (i.url = f(i.url, "_=" + Date.now())), "jsonp" == p)return d || (i.url = f(i.url, i.jsonp ? i.jsonp + "=?" : i.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(i, u);
        var g, w = i.accepts[p], b = {}, x = function (t, e) {
            b[t.toLowerCase()] = [t, e]
        }, E = /^([\w-]+:)\/\//.test(i.url) ? RegExp.$1 : window.location.protocol, T = i.xhr(), S = T.setRequestHeader;
        if (u && u.promise(T), i.crossDomain || x("X-Requested-With", "XMLHttpRequest"), x("Accept", w || "*/*"), (w = i.mimeType || w) && (w.indexOf(",") > -1 && (w = w.split(",", 2)[0]), T.overrideMimeType && T.overrideMimeType(w)), (i.contentType || i.contentType !== !1 && i.data && "GET" != i.type.toUpperCase()) && x("Content-Type", i.contentType || "application/x-www-form-urlencoded"), i.headers)for (v in i.headers)x(v, i.headers[v]);
        if (T.setRequestHeader = x, T.onreadystatechange = function () {
                if (4 == T.readyState) {
                    T.onreadystatechange = c, clearTimeout(g);
                    var e, n = !1;
                    if (T.status >= 200 && T.status < 300 || 304 == T.status || 0 == T.status && "file:" == E) {
                        p = p || l(i.mimeType || T.getResponseHeader("content-type")), e = T.responseText;
                        try {
                            "script" == p ? (1, eval)(e) : "xml" == p ? e = T.responseXML : "json" == p && (e = _.test(e) ? null : t.parseJSON(e))
                        } catch (r) {
                            n = r
                        }
                        n ? a(n, "parsererror", T, i, u) : s(e, T, i, u)
                    } else a(T.statusText || null, T.status ? "error" : "abort", T, i, u)
                }
            }, o(T, i) === !1)return T.abort(), a(null, "abort", T, i, u), T;
        if (i.xhrFields)for (v in i.xhrFields)T[v] = i.xhrFields[v];
        var C = "async"in i ? i.async : !0;
        T.open(i.type, i.url, C, i.username, i.password);
        for (v in b)S.apply(T, b[v]);
        return i.timeout > 0 && (g = setTimeout(function () {
            T.onreadystatechange = c, T.abort(), a(null, "timeout", T, i, u)
        }, i.timeout)), T.send(i.data ? i.data : null), T
    }, t.get = function () {
        return t.ajax(p.apply(null, arguments))
    }, t.post = function () {
        var e = p.apply(null, arguments);
        return e.type = "POST", t.ajax(e)
    }, t.getJSON = function () {
        var e = p.apply(null, arguments);
        return e.dataType = "json", t.ajax(e)
    }, t.fn.load = function (e, n, r) {
        if (!this.length)return this;
        var i, o = this, s = e.split(/\s/), a = p(e, n, r), u = a.success;
        return s.length > 1 && (a.url = s[0], i = s[1]), a.success = function (e) {
            o.html(i ? t("<div>").html(e.replace(w, "")).find(i) : e), u && u.apply(o, arguments)
        }, t.ajax(a), this
    };
    var S = encodeURIComponent;
    t.param = function (e, n) {
        var r = [];
        return r.add = function (e, n) {
            t.isFunction(n) && (n = n()), null == n && (n = ""), this.push(S(e) + "=" + S(n))
        }, d(r, e, n), r.join("&").replace(/%20/g, "+")
    }
}(Zepto), function (t) {
    t.fn.serializeArray = function () {
        var e, n, r = [], i = function (t) {
            return t.forEach ? t.forEach(i) : void r.push({name: e, value: t})
        };
        return this[0] && t.each(this[0].elements, function (r, o) {
            n = o.type, e = o.name, e && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || o.checked) && i(t(o).val())
        }), r
    }, t.fn.serialize = function () {
        var t = [];
        return this.serializeArray().forEach(function (e) {
            t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
        }), t.join("&")
    }, t.fn.submit = function (e) {
        if (0 in arguments)this.bind("submit", e); else if (this.length) {
            var n = t.Event("submit");
            this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function (t) {
    "__proto__"in{} || t.extend(t.zepto, {
        Z: function (e, n) {
            return e = e || [], t.extend(e, t.fn), e.selector = n || "", e.__Z = !0, e
        }, isZ: function (e) {
            return "array" === t.type(e) && "__Z"in e
        }
    });
    try {
        getComputedStyle(void 0)
    } catch (e) {
        var n = getComputedStyle;
        window.getComputedStyle = function (t) {
            try {
                return n(t)
            } catch (e) {
                return null
            }
        }
    }
}(Zepto), function () {
    "use strict";
    function t(t) {
        return "function" == typeof t || "object" == typeof t && null !== t
    }

    function e(t) {
        return "function" == typeof t
    }

    function n(t) {
        return "object" == typeof t && null !== t
    }

    function r() {
    }

    function i() {
        return function () {
            process.nextTick(u)
        }
    }

    function o() {
        var t = 0, e = new I(u), n = document.createTextNode("");
        return e.observe(n, {characterData: !0}), function () {
            n.data = t = ++t % 2
        }
    }

    function s() {
        var t = new MessageChannel;
        return t.port1.onmessage = u, function () {
            t.port2.postMessage(0)
        }
    }

    function a() {
        return function () {
            setTimeout(u, 1)
        }
    }

    function u() {
        for (var t = 0; D > t; t += 2) {
            var e = Z[t], n = Z[t + 1];
            e(n), Z[t] = void 0, Z[t + 1] = void 0
        }
        D = 0
    }

    function c() {
    }

    function l() {
        return new TypeError("You cannot resolve a promise with itself")
    }

    function f() {
        return new TypeError("A promises callback cannot return that same promise.")
    }

    function h(t) {
        try {
            return t.then
        } catch (e) {
            return q.error = e, q
        }
    }

    function p(t, e, n, r) {
        try {
            t.call(e, n, r)
        } catch (i) {
            return i
        }
    }

    function d(t, e, n) {
        $(function (t) {
            var r = !1, i = p(n, e, function (n) {
                r || (r = !0, e !== n ? g(t, n) : w(t, n))
            }, function (e) {
                r || (r = !0, b(t, e))
            }, "Settle: " + (t._label || " unknown promise"));
            !r && i && (r = !0, b(t, i))
        }, t)
    }

    function m(t, e) {
        e._state === F ? w(t, e._result) : t._state === U ? b(t, e._result) : x(e, void 0, function (e) {
            g(t, e)
        }, function (e) {
            b(t, e)
        })
    }

    function v(t, n) {
        if (n.constructor === t.constructor)m(t, n); else {
            var r = h(n);
            r === q ? b(t, q.error) : void 0 === r ? w(t, n) : e(r) ? d(t, n, r) : w(t, n)
        }
    }

    function g(e, n) {
        e === n ? b(e, l()) : t(n) ? v(e, n) : w(e, n)
    }

    function y(t) {
        t._onerror && t._onerror(t._result), E(t)
    }

    function w(t, e) {
        t._state === z && (t._result = e, t._state = F, 0 === t._subscribers.length || $(E, t))
    }

    function b(t, e) {
        t._state === z && (t._state = U, t._result = e, $(y, t))
    }

    function x(t, e, n, r) {
        var i = t._subscribers, o = i.length;
        t._onerror = null, i[o] = e, i[o + F] = n, i[o + U] = r, 0 === o && t._state && $(E, t)
    }

    function E(t) {
        var e = t._subscribers, n = t._state;
        if (0 !== e.length) {
            for (var r, i, o = t._result, s = 0; s < e.length; s += 3)r = e[s], i = e[s + n], r ? j(n, r, i, o) : i(o);
            t._subscribers.length = 0
        }
    }

    function T() {
        this.error = null
    }

    function _(t, e) {
        try {
            return t(e)
        } catch (n) {
            return H.error = n, H
        }
    }

    function j(t, n, r, i) {
        var o, s, a, u, c = e(r);
        if (c) {
            if (o = _(r, i), o === H ? (u = !0, s = o.error, o = null) : a = !0, n === o)return void b(n, f())
        } else o = i, a = !0;
        n._state !== z || (c && a ? g(n, o) : u ? b(n, s) : t === F ? w(n, o) : t === U && b(n, o))
    }

    function S(t, e) {
        try {
            e(function (e) {
                g(t, e)
            }, function (e) {
                b(t, e)
            })
        } catch (n) {
            b(t, n)
        }
    }

    function C(t, e, n, r) {
        this._instanceConstructor = t, this.promise = new t(c, r), this._abortOnReject = n, this._validateInput(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._init(), 0 === this.length ? w(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && w(this.promise, this._result))) : b(this.promise, this._validationError())
    }

    function P() {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
    }

    function N() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
    }

    function O(t) {
        this._id = J++, this._state = void 0, this._result = void 0, this._subscribers = [], c !== t && (e(t) || P(), this instanceof O || N(), S(this, t))
    }

    var A;
    A = Array.isArray ? Array.isArray : function (t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    };
    var k, M = A, D = (Date.now || function () {
        return (new Date).getTime()
    }, Object.create || function (t) {
        if (arguments.length > 1)throw new Error("Second argument not supported");
        if ("object" != typeof t)throw new TypeError("Argument must be an object");
        return r.prototype = t, new r
    }, 0), $ = function (t, e) {
        Z[D] = t, Z[D + 1] = e, D += 2, 2 === D && k()
    }, L = "undefined" != typeof window ? window : {}, I = L.MutationObserver || L.WebKitMutationObserver, R = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, Z = new Array(1e3);
    k = "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? i() : I ? o() : R ? s() : a();
    var z = void 0, F = 1, U = 2, q = new T, H = new T;
    C.prototype._validateInput = function (t) {
        return M(t)
    }, C.prototype._validationError = function () {
        return new Error("Array Methods must be provided an Array")
    }, C.prototype._init = function () {
        this._result = new Array(this.length)
    };
    var B = C;
    C.prototype._enumerate = function () {
        for (var t = this.length, e = this.promise, n = this._input, r = 0; e._state === z && t > r; r++)this._eachEntry(n[r], r)
    }, C.prototype._eachEntry = function (t, e) {
        var r = this._instanceConstructor;
        n(t) ? t.constructor === r && t._state !== z ? (t._onerror = null, this._settledAt(t._state, e, t._result)) : this._willSettleAt(r.resolve(t), e) : (this._remaining--, this._result[e] = this._makeResult(F, e, t))
    }, C.prototype._settledAt = function (t, e, n) {
        var r = this.promise;
        r._state === z && (this._remaining--, this._abortOnReject && t === U ? b(r, n) : this._result[e] = this._makeResult(t, e, n)), 0 === this._remaining && w(r, this._result)
    }, C.prototype._makeResult = function (t, e, n) {
        return n
    }, C.prototype._willSettleAt = function (t, e) {
        var n = this;
        x(t, void 0, function (t) {
            n._settledAt(F, e, t)
        }, function (t) {
            n._settledAt(U, e, t)
        })
    };
    var X = function (t, e) {
        return new B(this, t, !0, e).promise
    }, Y = function (t, e) {
        function n(t) {
            g(o, t)
        }

        function r(t) {
            b(o, t)
        }

        var i = this, o = new i(c, e);
        if (!M(t))return b(o, new TypeError("You must pass an array to race.")), o;
        for (var s = t.length, a = 0; o._state === z && s > a; a++)x(i.resolve(t[a]), void 0, n, r);
        return o
    }, V = function (t, e) {
        var n = this;
        if (t && "object" == typeof t && t.constructor === n)return t;
        var r = new n(c, e);
        return g(r, t), r
    }, W = function (t, e) {
        var n = this, r = new n(c, e);
        return b(r, t), r
    }, J = 0, G = O;
    O.all = X, O.race = Y, O.resolve = V, O.reject = W, O.prototype = {
        constructor: O, then: function (t, e) {
            var n = this, r = n._state;
            if (r === F && !t || r === U && !e)return this;
            var i = new this.constructor(c), o = n._result;
            if (r) {
                var s = arguments[r - 1];
                $(function () {
                    j(r, i, s, o)
                })
            } else x(n, i, t, e);
            return i
        }, "catch": function (t) {
            return this.then(null, t)
        }
    };
    var K = function () {
        var t;
        t = "undefined" != typeof global ? global : "undefined" != typeof window && window.document ? window : self;
        var n = "Promise"in t && "resolve"in t.Promise && "reject"in t.Promise && "all"in t.Promise && "race"in t.Promise && function () {
                var n;
                return new t.Promise(function (t) {
                    n = t
                }), e(n)
            }();
        n || (t.Promise = G)
    }, Q = {Promise: G, polyfill: K};
    "function" == typeof define && define.amd ? define(function () {
        return Q
    }) : "undefined" != typeof module && module.exports ? module.exports = Q : "undefined" != typeof this && (this.ES6Promise = Q)
}.call(this);
var modjs = function (t) {
    "use strict";
    var e = {}, n = function (t, n) {
        3 === arguments.length && (n = arguments[2]), e[t] = "function" == typeof n ? n : {exports: n}
    }, r = function (t, n) {
        setTimeout(function () {
            if (e.hasOwnProperty(t)) {
                var r = i(t);
                n && n(r)
            }
        }, 0)
    }, i = function (t) {
        if (e.hasOwnProperty(t)) {
            if ("function" == typeof e[t]) {
                var n = {};
                n.exports = {};
                var r = e[t](i, n.exports, n);
                void 0 !== r && (n.exports = r), e[t] = n
            }
            return e[t].exports
        }
        throw new Error("module[" + t + "] not defined")
    };
    return t.define = n, {define: n, use: r, require: i}
}(window);
!function (t) {
    "use strict";
    function e(t) {
        return "function" == typeof t
    }

    function n(n) {
        var r = t.shareData || {};
        n.success != r.success && e(n.success) && (c.normal = n.success), n.cancel != r.success && e(n.cancel) && (l.normal = n.cancel)
    }

    function r(t) {
        return function () {
            Object.keys(t).forEach(function (e) {
                t[e] && t[e]()
            })
        }
    }

    function i(t, e) {
        e || (e = {}), u._fieldList.forEach(function (n) {
            e.hasOwnProperty(n) && (t[n] = "link" == n || "imgUrl" == n || "dataUrl" == n ? o(e[n]) : e[n])
        })
    }

    function o(t) {
        try {
            return null == t ? location.href : (t = t.toString(), /http[s]?:\/\//.test(t) ? t : "/" == t[0] ? location.protocol + "//" + location.host + t : location.protocol + "//" + location.host + "/" + t)
        } catch (e) {
            return ""
        }
    }

    var s, a, u = {}, c = {}, l = {}, f = {
        shareImg: "http://appmcdn.m0.hk/share.png",
        browerImg: "http://appmcdn.m0.hk/share-brower.png",
        favoriteImg: "http://appmcdn.m0.hk/share-favorite.png"
    };
    u.settings = f, u._fieldList = ["title", "desc", "link", "imgUrl", "type", "dataUrl"];
    var h = Object.create({
        listeners: [], on: function (t, e, n) {
            this.listeners.push({trigger: t, name: e, callback: n})
        }, once: function (t, e, n) {
            this.listeners.push({
                trigger: t, name: e, callback: function () {
                    h.off(t, e), n()
                }
            })
        }, off: function (t, e) {
            this.listeners = this.listeners.filter(function (n) {
                return !(n.trigger == t && n.name == e)
            })
        }, emit: function (t, e) {
            var n = this.listeners.filter(function (n) {
                return n.trigger == t && n.name == e
            });
            n.length > 0 && n.forEach(function (t) {
                t.callback()
            })
        }
    });
    u.init = function (t) {
        this._inited || (this._inited = !0, this.config(t))
    }, u.check = function () {
        s = t.wx, a = t.WeixinApi
    }, u.ready = function (t) {
        t = t && t.bind(this), this.check(), s ? s.ready(t) : a && a.ready(t)
    }, u.error = function (t) {
        this.check(), s && s.error(t.bind(this))
    }, u.api = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        this.check(), s ? s.checkJsApi({
            jsApiList: [t], success: function () {
                u.ready(function () {
                    s[t].apply(s, e)
                })
            }
        }) : a && ("previewImage" == t ? a.ready(function (t) {
            var n = e[0];
            n && t.imagePreview(n.current, n.urls)
        }) : "function" == typeof a[t] && a.ready(function (n) {
            n[t].apply(a, e)
        }))
    }, u.config = function (e, o) {
        var s = t.shareData || {};
        if (0 == arguments.length)return s;
        if (1 == arguments.length && "string" == typeof e)return s[e];
        var a = {};
        "object" != typeof e ? a[e] = o : a = e, i(s, a), n(a || {}), s.success = r(c), s.cancel = r(l), t.shareData = s
    }, u.success = function (t) {
        c.normal = t
    }, u.cancel = function (t) {
        l.normal = t
    }, u.complete = function (t) {
        c.complete = t, l.complete = t
    }, u._fieldList.forEach(function (t) {
        u[t] = function (e) {
            return 0 === arguments.length ? this.config(t) : void this.config(t, e)
        }
    }), u.popupElement = function (t) {
        return t || (t = "popup"), t = "wx-" + t, document.getElementById(t)
    }, u.popup = function (t, e, n) {
        t || (t = "popup");
        var r = this.popupElement(t);
        if (!r) {
            t = "wx-" + t, r = document.createElement("div"), r.id = t;
            var i = {
                position: "fixed",
                zIndex: 999999,
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                textAlign: "right",
                backgroundColor: "rgba(0, 0, 0, 0.7)"
            };
            for (var o in i)i.hasOwnProperty(o) && (r.style[o] = i[o]);
            var s = document.createElement("img");
            s.src = e, i = {
                maxWidth: .95 * document.body.offsetWidth + "px",
                padding: "5px 5%",
                verticalAlign: "bottom"
            };
            for (o in i)i.hasOwnProperty(o) && (s.style[o] = i[o]);
            if (r.appendChild(s), document.body.appendChild(r), n || void 0 === n) {
                var a = function () {
                    r.removeEventListener("touchend", a, !1), setTimeout(function () {
                        r.parentNode && r.parentNode.removeChild(r)
                    }, 300)
                };
                r.addEventListener("touchend", a, !1)
            }
        }
        return r
    }, u.openbybrowser = function () {
        u.popup("openByBrowser", f.browerImg)
    }, u.share = function (t, e) {
        var n = this.popup("share", f.shareImg, !e), r = {
            close: t || function () {
            }
        }, i = function () {
            n.parentNode && n.parentNode.removeChild(n), c.close = l.close = null, c.once = l.once = null, delete c.close, delete l.close, delete c.once, delete l.once, r.close && r.close()
        };
        c.once = r.success, l.once = r.cancel, c.close = l.close = i, e || n.addEventListener("touchend", i, !1)
    }, u.favorite = function () {
        u.popup("favorite", f.favoriteImg)
    }, c.solution = function () {
        setTimeout(function () {
            var t = document.body.scrollTop;
            document.body.scrollTop = t + 1, setTimeout(function () {
                document.body.scrollTop = t
            }, 16)
        }, 100)
    }, t.Weixin = u, "function" == typeof define ? define("weixin", [], u) : "undefined" != typeof module && module.exports && (module.exports = u)
}(window), function () {
    function t(t) {
        this.frames = [], this.current = -1, this.$root = t, this.fps = 60
    }

    function e(t, e) {
        var n = e[0];
        return e = Array.prototype.slice.call(e, 1), t && t[n] ? t[n].apply(t, e) : void 0
    }

    var n = "SPRITE_INSTANCE", r = [];
    $.fn.sprite = function (i, o, s) {
        var a = arguments;
        return $(this).each(function () {
            var u = r[$(this).data(n)], c = ["destroy", "play", "stop", "pause", "change"];
            if (-1 != c.indexOf(i))e(u, a), "destroy" == i && $(this).data(n, null); else if (!u) {
                s || (s = {
                    x: !0,
                    y: !1
                }), "number" == typeof i && (o = i, i = ""), i || (i = $(this).data("sprite-src")), o = Number(o) || 1, u = new t($(this));
                for (var l = $(this), f = 0; o > f; f++) {
                    var h = $("<img />", {src: i});
                    h.css({
                        position: "absolute",
                        left: s.x ? -100 * f + "%" : 0,
                        top: s.y ? -100 * f + "%" : 0
                    }).appendTo(l), u.add(h)
                }
                u.init(), r.push(u), $(this).data(n, r.length - 1)
            }
        }), this
    }, t.prototype.init = function () {
        this.show(0)
    }, t.prototype.add = function (t) {
        t.hide(), this.frames.push(t)
    }, t.prototype.show = function (t) {
        this.frames[t] && t != this.current && (this.frames[this.current] && this.frames[this.current].hide(), this.frames[t].show(), this.current = t, this.$root.trigger("sprite:change_frame", t))
    }, t.prototype.play = function (t) {
        var e = this, n = this.fps / 20;
        this.timer && clearInterval(this.timer);
        var r = 200 * this.frames.length / (n * this.frames.length);
        this.timer = setInterval(function () {
            var n = (e.current + 1) % e.frames.length;
            t && e.current + 1 == e.frames.length ? (e.show(n), e.pause()) : e.show(n)
        }, r)
    }, t.prototype.change = function (t) {
        var e = this;
        this.$root.on("sprite:change_frame", function () {
            t && t.call(e.$root.get(0), e.current)
        })
    }, t.prototype.stop = function () {
        this.timer && clearInterval(this.timer), this.show(0)
    }, t.prototype.destroy = function () {
        this.timer && clearInterval(this.timer), this.frames = [], this.current = -1, this.off("sprite:change_frame")
    }, t.prototype.pause = function () {
        this.timer && clearInterval(this.timer)
    }, $(function () {
        $("[data-sprite]").each(function () {
            $(this).sprite()
        })
    })
}(window.jQuery || window.Zepto), function (t) {
    function e(t, e, n, r) {
        return Math.abs(t - e) >= Math.abs(n - r) ? t - e > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down"
    }

    function n() {
        l = null, h.last && (h.el.trigger("longTap"), h = {})
    }

    function r() {
        l && clearTimeout(l), l = null
    }

    function i() {
        a && clearTimeout(a), u && clearTimeout(u), c && clearTimeout(c), l && clearTimeout(l), a = u = c = l = null, h = {}
    }

    function o(t) {
        return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
    }

    function s(t, e) {
        return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
    }

    var a, u, c, l, f, h = {}, p = 750;
    t(document).ready(function () {
        var d, m, v, g, y = 0, w = 0;
        "MSGesture"in window && (f = new MSGesture, f.target = document.body), t(document).bind("MSGestureEnd", function (t) {
            var e = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
            e && (h.el.trigger("swipe"), h.el.trigger("swipe" + e))
        }).on("touchstart MSPointerDown pointerdown", function (e) {
            (!(g = s(e, "down")) || o(e)) && (v = g ? e : e.touches[0], e.touches && 1 === e.touches.length && h.x2 && (h.x2 = void 0, h.y2 = void 0), d = Date.now(), m = d - (h.last || d), h.el = t("tagName"in v.target ? v.target : v.target.parentNode), a && clearTimeout(a), h.x1 = v.pageX, h.y1 = v.pageY, m > 0 && 250 >= m && (h.isDoubleTap = !0), h.last = d, l = setTimeout(n, p), f && g && f.addPointer(e.pointerId))
        }).on("touchmove MSPointerMove pointermove", function (t) {
            (!(g = s(t, "move")) || o(t)) && (v = g ? t : t.touches[0], r(), h.x2 = v.pageX, h.y2 = v.pageY, y += Math.abs(h.x1 - h.x2), w += Math.abs(h.y1 - h.y2))
        }).on("touchend MSPointerUp pointerup", function (n) {
            (!(g = s(n, "up")) || o(n)) && (r(), h.x2 && Math.abs(h.x1 - h.x2) > 200 || h.y2 && Math.abs(h.y1 - h.y2) > 200 ? c = setTimeout(function () {
                h.el.trigger("swipe"), h.el.trigger("swipe" + e(h.x1, h.x2, h.y1, h.y2)), h = {}
            }, 0) : "last"in h && (200 > y && 200 > w ? u = setTimeout(function () {
                var e = t.Event("tap");
                e.cancelTouch = i, h.el.trigger(e), h.isDoubleTap ? (h.el && h.el.trigger("doubleTap"), h = {}) : a = setTimeout(function () {
                    a = null, h.el && h.el.trigger("singleTap"), h = {}
                }, 250)
            }, 0) : h = {}), y = w = 0)
        }).on("touchcancel MSPointerCancel pointercancel", i), t(window).on("scroll", i)
    }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (e) {
        t.fn[e] = function (t) {
            return this.on(e, t)
        }
    })
}(Zepto), function (t) {
    "use strict";
    function e(t) {
        var e = t.toString().match(/translate3d\(([^\,]*)\,([^\,]*)\,([^\,]*)\)/);
        if (e) {
            var n = e[1] || 0, r = e[2] || 0, i = e[3] || 0, o = [n, r, i].map(function (t) {
                return Number(parseFloat(t.trim())) || 0
            });
            return {x: o[0], y: o[1], z: o[2]}
        }
        return {x: 0, y: 0, z: 0}
    }

    t.fn.transition = function (e, n) {
        if (e === !1)this.each(function () {
            t(this).transitionend(!1), t(this).css({
                "-ms-transition-property": "none",
                "-webkit-transition-property": "none",
                "transition-property": "none"
            })
        }); else {
            n || (n = {}), e = Number(e) || 1e3, n.delay = Number(n.delay) || 0;
            var r = ["all", e + "ms", n.delay + "ms", n.ease || "ease-in"].join(" ");
            this.each(function () {
                t(this).css({
                    "-ms-transition": r,
                    "-webkit-transition": r,
                    transition: r
                }), t(this).data("transitionTime", e + n.delay)
            })
        }
        return this
    }, t.fn.transitionend = function (e) {
        var n = "webkitTransitionEnd msTransitionEnd transitionend";
        return this.each(function () {
            var r = t(this).data("transitionendtimer");
            if (r && clearTimeout(r), t(this).off(n), "function" == typeof e) {
                var i, o = Date.now(), s = t(this).data("transitionTime") || 0, a = function () {
                    t(this).off(n), i && clearTimeout(i);
                    var r = this;
                    i = setTimeout(function () {
                        e && e.call(r)
                    }, 50)
                };
                t(this).on(n, function (t) {
                    Date.now() - o >= 10 && (r && clearTimeout(r), a.apply(this, arguments))
                }), r = setTimeout(a.bind(this), s + 100), t(this).data("transitionendtimer", r)
            }
        }), this
    }, t.fn.animation = function (e, n, r, i) {
        var o = "webkitAnimationEnd MSAnimationEnd animationend";
        if (this.each(function () {
                var e = t(this).data("animationendtimer");
                e && clearTimeout(e), t(this).off(o);
                var n = ["alternate", "infinite", t(this).data("animation") || ""];
                t(this).removeClass(n.join(" ")).css({
                    "-ms-animation-duration": null,
                    "-ms-animation-delay": null,
                    "-webkit-animation-duration": null,
                    "-webkit-animation-delay": null,
                    "animation-duration": null,
                    "animation-delay": null
                })
            }), e === !1)return this;
        "function" == typeof r && (i = r, r = null), "object" != typeof r && (r = {delay: r}), r || (r = {}), t(this).data("animation", e), t(this).addClass(e + " animated"), n = Number(n) || 1e3;
        var s = Number(r.delay) || 0;
        return this.each(function () {
            var e;
            t(this).css({
                "-ms-animation-duration": n + "ms",
                "-ms-animation-delay": s + "ms",
                "-webkit-animation-duration": n + "ms",
                "-webkit-animation-delay": s + "ms",
                "animation-duration": n + "ms",
                "animation-delay": s + "ms"
            }), r.loop && t(this).addClass("infinite"), r.alternate && t(this).addClass("alternate");
            var a = Date.now(), u = function () {
                t(this).off(o), i && i.call(this)
            };
            t(this).on(o, function (t) {
                Date.now() - a >= 10 && (e && clearTimeout(e), u.apply(this, arguments))
            }), e = setTimeout(u.bind(this), n + s), t(this).data("animationendtimer", e)
        }), this
    }, t.fn.transform = function (e, n) {
        e || (e = {});
        var r = e;
        if ("object" == typeof e) {
            var i = function (t) {
                return e.hasOwnProperty(t) && null != e[t]
            }, o = function (t) {
                return "number" == typeof t ? t + "px" : t
            };
            if (i("x") || i("y") || i("z")) {
                var s = [e.x, e.y, e.z];
                s = s.map(function (t) {
                    return o(t || 0)
                }), e.translate3d = s.join(", ")
            }
            var a = ["translate", "translate3d", "rotate", "scale", "skew", "matrix"];
            r = [], Object.keys(e).forEach(function (t) {
                if (-1 != a.indexOf(t)) {
                    var n = o(e[t]);
                    r.push(t + "(" + n + ")")
                }
            })
        }
        var u = function () {
            r.length > 0 ? (r = r.join(" "), t(this).css("-ms-transform", r), t(this).css("-webkit-transform", r), t(this).css("transform", r)) : (t(this).css("-ms-transform", "none"), t(this).css("-webkit-transform", "none"), t(this).css("transform", "none"))
        };
        return void 0 === n ? u.call(this) : setTimeout(u.bind(this), n), this
    }, t.fn.delayClass = function (e, n, r, i) {
        if (t(this).length > 1)return void t(this).each(function () {
            t(this).delayClass(e, n, r, i)
        });
        n = n || 0, r = r || 1;
        var o = t(this), s = o.data("animation");
        return s && o.removeClass(s).attr("style", ""), o.css({"-webkit-animation-delay": n + "s !important"}), o.addClass("animated " + e).attr("data-animation", e).show(), setTimeout(function () {
            "function" == typeof i && i()
        }, 1e3 * (n + r)), this
    }, t.fn.x = function (n, r) {
        if (0 == arguments.length) {
            var i = t(this).css("transform") || t(this).css("-webkit-transform") || t(this).css("-ms-transform") || "", o = e(i);
            return o.x
        }
        return t(this).transform({x: n}, r), this
    }, t.fn.y = function (n, r) {
        if (0 == arguments.length) {
            var i = t(this).css("transform") || t(this).css("-webkit-transform") || t(this).css("-ms-transform") || "", o = e(i);
            return o.y
        }
        return t(this).transform({y: n}, r), this
    }, t.fn.clip = function (e, n, r, i, o) {
        null == e && (e = 0), null == n && (n = t(this).width()), null == r && (r = t(this).height()), null == i && (i = 0);
        var s = [e, n, r, i];
        s = s.map(function (t) {
            return null == t ? "auto" : t + "px"
        });
        var a = function () {
            t(this).css("clip", "rect(" + s.join(" ") + ")")
        };
        return void 0 === o ? a.call(this) : setTimeout(a.bind(this), o), this
    }
}(window.Zepto), ES6Promise.polyfill();