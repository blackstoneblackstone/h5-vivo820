define("utils", function (t, n) {
    "use strict";
    n.trim = function (t, n) {
        return "string" != typeof t && (t = t.toString()), null == n || "" === n ? t.trim() : t.replace(new RegExp("^" + n + "+|" + n + "+$", "g"), "")
    }, n.inherits = function (t, n) {
        t.SUPER_CLASS = n, t.super_ = n.prototype, t.prototype = Object.create(n.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    }, n.defaults = function (t, n) {
        return n || (n = {}), t || (t = {}), Object.keys(n).forEach(function (e) {
            t.hasOwnProperty(e) || (t[e] = n[e])
        }), t
    }, n.random = function (t, n) {
        return null == n && (n = t, t = 0), t + Math.floor(Math.random() * (n - t + 1))
    };
    var e = 0;
    n.uniqueId = function (t) {
        var n = ++e + "";
        return t ? t + n : n
    }
}), define("url", function (t, n) {
    "use strict";
    function e(t, n) {
        return "string" != typeof n && (n = ""), null == t ? "" : /https?:\/\//.test(t) ? t : "" !== n && 0 === t.indexOf(n) ? t : 0 === t.indexOf("/") ? n + t : n + "/" + t
    }

    var i = t("utils"), o = t("config").baseUrl || "";
    o = i.trim(o, "/"), "" !== o && (o = "/" + o), n.format = function (t, n, i) {
        return "string" == typeof n && (i = n, n = null), n && "object" == typeof n && (n = Object.keys(n).map(function (t) {
            return encodeURIComponent(t) + "=" + encodeURIComponent(n[t])
        }), t += "?" + n.join("&")), e(t, i || o)
    }, n.absolute = function (t, n) {
        return e(t, n)
    }, n.fullUrl = function (t) {
        t = this.format(t);
        try {
            return null == t ? location.href : (t = t.toString(), /http[s]?:\/\//.test(t) ? t : "/" == t[0] ? location.protocol + "//" + location.host + t : location.protocol + "//" + location.host + "/" + t)
        } catch (n) {
            return t
        }
    }, n.timestamp = function (t) {
        return -1 !== t.indexOf("?") && (t = t.replace(/__=[^=&]*&?/, "").replace(/&$/, "")), t + "?__=" + Date.now()
    }
}), define("thread", function () {
    "use strict";
    function t(t) {
        n = n.filter(function (n) {
            return n != t
        })
    }

    var n = [];
    return function (e, i, o) {
        if (-1 !== n.indexOf(e))return new EmptyPromise;
        n.push(e);
        var a = i.call(o);
        return a.then(function () {
            t(e)
        })["catch"](function () {
            t(e)
        }), a
    }
}), define("loadImage", function (t, n, e) {
    "use strict";
    var i = t("url");
    e.exports = function (t, n) {
        return t = i.format(t), new Promise(function (e, o) {
            var a, r = 0, s = new Image;
            s.onload = function () {
                a && clearTimeout(a), e(t)
            }, s.onerror = s.onabort = function () {
                r > 1 ? (a && clearTimeout(a), o(new Error("图片加载失败"))) : (r++, t = i.timestamp(t), s.src = t)
            }, s.src = t, n = Number(n), n && n > 0 && (a = setTimeout(function () {
                s.onload = s.onerror = s.onabort = null, s = null, o(new Error("图片加载超时"))
            }, 1e3 * n))
        })
    }
}), define("timer", function (t, n) {
    "use strict";
    n.after = function (t) {
        return new Promise(function (n) {
            setTimeout(n, t)
        })
    }, n.countdown = function (t, e) {
        var i = new Promise(function (i, o) {
            var a = setInterval(function () {
                t > 0 && !isNaN(a) ? (t--, e && e(t)) : (clearInterval(a), i())
            }, 1e3);
            n.cancel = function () {
                clearInterval(a), o(new Error("Timer to be cancelled"))
            }, n.time = function () {
                return t
            }
        });
        return i
    }
}), define("music", function (t, n, e) {
    "use strict";
    function i(n, e) {
        o.call(this), e || (e = {});
        var i = this.audio = new Audio;
        i.autoplay = !!e.autoplay, i.loop = !!e.loop, i.preload = !!e.preload, i.src = t("url").format(n), this._readyPromise = new Promise(function (t) {
            if (e.autoplay) {
                var n = function () {
                    i.play(), t(), document.body.removeEventListener("touchstart", n, !1)
                };
                document.body.addEventListener("touchstart", n, !1), i.addEventListener("canplay", function () {
                    i.paused || (document.body.removeEventListener("touchstart", n, !1), t())
                }, !1)
            } else i.addEventListener("canplay", function () {
                i.paused || t()
            }, !1)
        })
    }

    var o = t("event");
    t("utils").inherits(i, o);
    var a = i.prototype;
    a.ready = function (t) {
        var n = this;
        this._readyPromise.then(function () {
            t && t.call(n)
        })
    }, a.play = function () {
        try {
            this.audio.play()
        } catch (t) {
        }
        this.emit("play")
    }, a.pause = function () {
        try {
            this.audio.pause()
        } catch (t) {
        }
        this.emit("pause")
    }, a.stop = function () {
        this.pause(), this.setTime(0), this.emit("stop")
    }, a.replay = function () {
        this.setTime(0), this.play()
    }, a.setTime = function () {
        try {
            this.audio.currentTime = 0
        } catch (t) {
        }
    }, a.toggle = function () {
        this.audio.paused ? this.play() : this.pause()
    }, e.exports = i
}), define("ajax", function (t, n) {
    "use strict";
    function e(t) {
        t || (t = {});
        var n = [];
        return Array.isArray(t) ? t.forEach(function (t) {
            if (t && null != t.name && "" !== t.name) {
                var e = t.value;
                null == e && (e = ""), n.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(e))
            }
        }) : Object.keys(t).forEach(function (e) {
            n.push(encodeURIComponent(e) + "=" + encodeURIComponent(t[e]))
        }), n.join("&")
    }

    function i(t, n) {
        return t.setRequestHeader("X-Requested-With", "XMLHttpRequest"), new Promise(function (i, o) {
            t.addEventListener("error", o), t.addEventListener("load", i), t.send(e(n))
        }).then(function () {
            return "" === t.responseText ? t.responseText : JSON.parse(t.responseText)
        }).then(function (t) {
            if ("object" == typeof t && null != t) {
                if (t.err) {
                    var n = new Error(t.err);
                    return n.code = t.code || 0, n.ret = t.ret, Promise.reject(n)
                }
                return t
            }
            return t
        })
    }

    function o(n) {
        return null == n || "" === n ? location.protocol + "//" + location.host + location.pathname + location.search : t("url").format(n)
    }

    n.post = function (t, n) {
        t = o(t);
        var e = new XMLHttpRequest;
        return e.open("POST", t, !0), e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), i(e, n)
    }, n.get = function (t, n) {
        t = o(t), n = e(n), n && (t += -1 != t.indexOf("?") ? "&" : "?" + n);
        var a = new XMLHttpRequest;
        return a.open("GET", t, !0), i(a)
    }, n.jsonp = function (t, n) {
    }
}), define("monitor", function (t) {
    "use strict";
    function n(n, e) {
        e || (e = {}), this.opts = t("utils").defaults(e, {waitTime: 0}), this.count = n, this.current = 0, this.notifyCallbacks = [], this.completeCallbacks = [], 0 === n && (this.count = 1, this.add(new Promise(function (t) {
            setTimeout(t, 16)
        }))), setTimeout(this._notify.bind(this), 0)
    }

    return n.prototype.complete = function (t) {
        this.current == this.count ? t && setTimeout(t, 0) : this.completeCallbacks.push(t)
    }, n.prototype.add = function (t) {
        var n = this;
        t.then(function () {
            n.current++, n._notify()
        })["catch"](function () {
            n.current++, n._notify()
        })
    }, n.prototype.progress = function (t) {
        this.notifyCallbacks.push(t)
    }, n.prototype._notify = function () {
        var t = Math.floor(100 * this.current / this.count);
        this.notifyCallbacks.forEach(function (n) {
            n && n(t, this.current, this.count)
        }, this), this.current == this.count && (this.completeCallbacks.forEach(function (t) {
            t && t()
        }), this.completeCallbacks = [])
    }, function (t, e) {
        return new n(t, e)
    }
}), define("event", function () {
    "use strict";
    function t() {
    }

    function n(t, n, e) {
        for (var i = t.length; i--;)if (t[i].listener === n && (null == e || t[i].context === e))return i;
        return -1
    }

    function e(t) {
        var n = t.toString().split(" ");
        return n = n.filter(function (t) {
            return "" !== t && null != t
        })
    }

    var i = t.prototype;
    return i.on = function (t, n, i) {
        if ("function" == typeof n) {
            var o = e(t);
            o.forEach(function (t) {
                this._bindEvent(t, n, i)
            }, this)
        }
        return this
    }, i.once = function (t, n, e) {
        return this.on(t, {listener: n, once: !0, context: e || this})
    }, i.off = function (t, n, i) {
        if ("string" == typeof t) {
            var o = e(t);
            o.forEach(function (t) {
                this._removeEvent(t, n, i)
            }, this)
        } else this._removeEvent(t, n, i);
        return this
    }, i._bindEvent = function (t, e, i) {
        var o, a = this.getListenersAsObject(t.toString()), r = "object" == typeof e;
        for (o in a)a.hasOwnProperty(o) && -1 === n(a[o], e, i) && a[o].push(r ? e : {
            listener: e,
            once: !1,
            context: i || this
        });
        return this
    }, i._removeEvent = function (t, n, e) {
        var i, o, a = this._getEvents();
        if (0 === arguments.length && delete this._events, "string" == typeof t)if (n || null != typeof e) {
            o = this.getListeners(t);
            for (var r = o.length; r--;) {
                var s = !(n && o[r].listener !== n || null != e && o[r].context !== e);
                s && o.splice(r, 1)
            }
        } else delete a[t]; else if (t instanceof RegExp)for (i in a)a.hasOwnProperty(i) && t.test(i) && this.off(i, n, e); else for (i in a)a.hasOwnProperty(i) && this.off(i, n, e);
        return this
    }, i.emit = function (t) {
        var n, e, i, o = Array.prototype.slice.call(arguments, 1), a = this.getListenersAsObject(t);
        for (i in a)if (a.hasOwnProperty(i))for (e = a[i].length; e--;)n = a[i][e], n.once === !0 && a[i].splice(e, 1), n.listener.apply(n.context, o || []);
        return this
    }, i.getListenersAsObject = function (t, n) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, i.getListeners = function (t, n) {
        var e, i, o = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (i in o)o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i])
        } else e = o[t] || (o[t] = []);
        return e
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, t
}), define("assets", function (t, n) {
    "use strict";
    var e = t("url"), i = t("config"), o = e.format(window.cdnUrl), a = i.manifest || [];
    n.cdn = function (n) {
        if (0 === n.indexOf(o)) {
            var i = new RegExp(o);
            n = n.replace(i, "")
        }
        return n = t("utils").trim(n, "/"), window.debug || !a[n] ? e.format(n, o) : e.format(a[n], o)
    }
}), function (t) {
    var n = modjs.require("config");
    t.app = {
        debug: n.debug,
        $loading: $(".container>.loading"),
        $root: $(".container"),
        pages: [],
        enableSwipe: !0,
        currentPage: -1,
        load: function (t, n, e) {
            if (t && 0 != t.length) {
                var i = modjs.require("monitor"), o = modjs.require("assets"), a = new i(t.length);
                t.forEach(function (t) {
                    a.add(modjs.require("loadImage")(o.cdn(t)))
                }), a.progress(function (t, n, i) {
                    e && e.call(app, t, n, i)
                }), a.complete(function () {
                    n.call(app)
                })
            } else n && n.call(this)
        },
        resize: function () {
            var n = $(t).height(), e = this.$root.find(".page-box");
            900 > n ? $("body").addClass("h900") : $("body").removeClass("h900"), e.show(), e.children().each(function (t) {
                $(this).css({width: "100%", height: n, position: "absolute", top: t * n, left: 0})
            }), app.jumpTo()
        },
        lastHeight: 0,
        jumpTo: function () {
            var n = $(t).height(), e = n * app.currentPage;
            this.lastHeight != n && (this.lastHeight = n, app.$root.find(".page-box").addClass("jump"), setTimeout(function () {
                app.$root.find(".page-box").removeClass("jump")
            }, 1e3), app.$root.find(".page-box").css({
                transform: "translate(0,-" + e + "px)",
                "-webkit-transform": "translate(0,-" + e + "px)"
            }).attr("data-distance", n * app.currentPage))
        },
        init: function (n) {
            var e = $(t).height(), i = navigator.userAgent.toLowerCase();
            -1 != i.indexOf("ios") || -1 != i.indexOf("iphone") || -1 != i.indexOf("ipad") ? (setInterval(function () {
                var n = $(t).height();
                Math.abs(e - n) > 10 && (e = n, $(".debug").append("<span>" + e + "</span><br />"), $(t).trigger("reset"))
            }, 200), $(t).on("reset", function () {
                "input" != document.activeElement.tagName.toLowerCase() && "textarea" != document.activeElement.tagName.toLowerCase() && (this.height = $(t).height(), this.height < 800 || (app.resizeTimeout && clearTimeout(app.resizeTimeout), app.resizeTimeout = setTimeout(function () {
                    app.resize()
                }, 200)))
            })) : $(t).on("resize", function () {
                "input" != document.activeElement.tagName.toLowerCase() && "textarea" != document.activeElement.tagName.toLowerCase() && (this.height = $(t).height(), this.height < 800 || (app.resizeTimeout && clearTimeout(app.resizeTimeout), app.resizeTimeout = setTimeout(function () {
                    app.resize()
                }, 200)))
            }), Weixin.init(), $("body, .container").height($(t).height()), this.bindEvents(), this.currentPage = n ? n : this.debug ? parseInt(localStorage.getItem("debug.page")) || 0 : 0, app.resize(), this.play(this.currentPage)
        },
        play: function (n) {
            var e = $(t).height();
            if (!(void 0 == this.pages[n] || 0 > n)) {
                var i = e * n;
                console.log(i), this.$root.find(".page-box").css({
                    transform: "translate(0,-" + i + "px)",
                    "-webkit-transform": "translate(0,-" + i + "px)"
                }).attr("data-distance", e * n), this.$root.find(".page-box").children().eq(n).css("z-index", 10 + Number(n)).find(".content").show(), 3 == n && this.$root.find(".page-box").children().eq(n).find(".content").delayClass("zoomIn", 0, .5), this.currentPage = n, localStorage.setItem("debug.page", n), this.pages[n]()
            }
        },
        bindEvents: function () {
            this.$root.find(".audio").on("tap", function () {
                t._hmt && _hmt.push(["_trackEvent", "playAudio", "bg"]), app.plugins.audio.toggle()
            }), $("body").on("tap", ".modal [dismiss]", function (t) {
                t.stopPropagation(), t.preventDefault();
                var n = $(this).parents(".modal");
                n.size() > 0 && n.addClass("hide")
            }), $("body").on("tap", "[data-modal]", function () {
                app.plugins.modal.show($(this).data("modal"))
            })
        },
        share: function (n) {
            Weixin.config(n || t.shareData), Weixin.share()
        },
        plugins: {
            audio: {
                init: function (t, n, e, i) {
                    var o = {
                        inited: !1, init: function (t, n, e, i) {
                            if (void 0 != t) {
                                this.handler = new Audio, this.handler.autoplay = !!n, this.handler.loop = !!e, this.handler.preload = !!i, this.handler.src = t, this.inited = !0;
                                var o = this;
                                if (this.handler.autoplay && this.handler.loop) {
                                    var a = function () {
                                        o.handler.play(), document.body.removeEventListener("touchstart", a, !1)
                                    };
                                    document.body.addEventListener("touchstart", a, !1), o.handler.addEventListener("canplay", function () {
                                        o.handler.paused || document.body.removeEventListener("touchstart", a, !1)
                                    }, !1), this.handler.addEventListener("play", function () {
                                        app.$root.find(".audio").addClass("active")
                                    }, !1), this.handler.addEventListener("pause", function () {
                                        app.$root.find(".audio").removeClass("active")
                                    }, !1)
                                }
                            }
                        }, toggle: function () {
                            this.inited && (this.handler.paused ? this.handler.play() : this.handler.pause())
                        }, pause: function () {
                            if (this.inited)try {
                                this.handler.pause()
                            } catch (t) {
                            }
                        }, play: function () {
                            if (this.inited)try {
                                this.handler.play()
                            } catch (t) {
                            }
                        }, stop: function () {
                            if (this.inited) {
                                this.handler.pause();
                                try {
                                    this.handler.currentTime = 0
                                } catch (t) {
                                }
                            }
                        }
                    };
                    return o.init(t, n, e, i), o
                }
            }, loading: {
                $modal: $(".loading-modal"), show: function () {
                    0 == this.$modal.length && (this.$modal = $('<div class="loading-modal modal"><div class="loading"><div class="spinner"><div class="cube1"></div><div class="cube2"></div></div> </div></div>'), app.$root.append(this.$modal)), this.$modal.show()
                }, hide: function () {
                    this.$modal.hide()
                }
            }, modal: {
                show: function (t) {
                    var n = $(".modal-" + t);
                    n.size() > 0 && n.removeClass("hide")
                }, hide: function (t) {
                    var n = $(".modal-" + t);
                    n.size() > 0 && n.addClass("hide")
                }
            }, dialog: {
                alert: function (t, n) {
                    var e = app.$root.find(".alert-modal");
                    0 == e.length && (e = $('<div class="alert-modal"><div class="alert"><div class="text">帐号不能为空</div><div class="btn">确定</div> </div></div>'), app.$root.append(e)), e.show().find(".text").html(t), e.find(".btn").off("tap").on("tap", function () {
                        e.hide(), "function" == typeof n && n()
                    })
                }, confirm: function (t, n) {
                    var e = app.$root.find(".confirm-modal");
                    0 == e.length && (e = $('<div class="confirm-modal"><div class="confirm"> <div class="text">确定操作吗?</div> <div class="operation"><div class="btn-cancel">取消</div> <div class="btn-ok">确定</div> </div> </div></div>'), app.$root.append(e)), e.show().find(".text").html(t), e.find(".btn-ok").off("tap").on("tap", function () {
                        e.hide(), "function" == typeof n[0] && n[0]()
                    }), e.find(".btn-cancel").off("tap").on("tap", function () {
                        e.hide(), "function" == typeof n[1] && n[1]()
                    })
                }
            }
        }
    }
}(window), define("app-src", ["images/no-winning-3eb5fb591d.png", "images/f-no-winning-k-a28f7fa7f1.png", "images/no-awarded-d62aca458e.png", "images/f-in-w-d730cb57cd.png", "images/f-winning-bg-469efb28ed.png", "images/f-phone-a9f5255a53.png", "images/f-doll-4f5e0b5fc7.png", "images/f-cup-1ad7600c58.png", "images/f-ticket-4c596e1d87.png", "images/f-buy-bt-5552c61e98.png", "images/banana-dc8481a72e.png", "images/banana1-a9199ba61c.png", "images/banana2-2fe17ffbb8.png", "images/f-gone-09681645c6.png", "images/f-successful-aa7719112c.png", "images/p0-bg-f81ec81628.jpg", "images/p0-f-bg-e28c66e081.jpg", "images/p0-bt-fbd473cdd3.png", "images/p0-up-38f36fd0be.png", "images/p0-iconL-1933271e36.png", "images/p0-iconR-cf43a7b5bc.png", "images/p0-w-lx-4ccd5b336e.png", "images/p0-line1-c6f76243ab.png", "images/p0-line2-ef3d8e85f2.png", "images/p0-line3-62139155d7.png", "images/p0-iconL-1933271e36.png", "images/p0-iconR-cf43a7b5bc.png", "images/p0-bt-fbd473cdd3.png", "images/p1-ts-1-008b2dc18b.png", "images/p1-ts-2-2782b80a10.png", "images/p0-f-bg-e28c66e081.jpg", "images/p1-yd-1cc514eead.png", "images/p2-bg-ecec8946e3.jpg", "images/p2-p1-t1-0e887b28b6.jpg", "images/p2-p1-b-814514b332.jpg", "images/p2-p2-t-c824e78320.jpg", "images/p2-bottom1-136cabae36.jpg", "images/p2-wx-icon-9a3d2fd85d.png", "images/p3-bg-33ebf86649.png", "images/p3-1-da87c80767.png", "images/p3-voice-sound-icon1-fac7bea4b2.png", "images/p3-voice-sound-icon2-2c66de6b84.png", "images/p3-voice-sound-icon3-1c0428cf53.png", "images/p3-2-f819046cac.png", "images/p3-3-23e64e3bc4.png", "images/p3-4-78542a37cf.png", "images/p3-5-52d3ead71d.png", "images/p3-6-a4bbc9c23e.png", "images/p3-7-0cc76bc463.png", "images/p4-round-2644dd1683.png", "images/p3-8-34577c03ef.png", "images/p3-bottom-a05806266f.jpg", "images/p4-yh-w-89f3bff1cd.png", "images/p4-ch-fde6b299a6.png", "images/p4-round-2644dd1683.png", "images/p4-keyboard-74c562c8cf.jpg", "images/p4-round-2644dd1683.png", "images/p3-bg-33ebf86649.png", "images/p4-yh-w-89f3bff1cd.png", "images/p4-ch-fde6b299a6.png", "images/p4-round-2644dd1683.png", "images/p4-keyboard-74c562c8cf.jpg", "images/p4-round-2644dd1683.png", "images/p5-bg-t-c7ac39aa63.jpg", "images/p5-bg-dca1f40c31.jpg", "images/p4-round-2644dd1683.png", "images/p6-bg-t-a25456f9eb.jpg", "images/Thumb-comments-fa29d4fb5e.png", "images/Thumb-comments-no-ac2685feb8.png", "images/Thumb-comments-icon-03775e4249.jpg", "images/p6Thumb-comments-jiao-86108785cd.png", "images/p6-line-xing-3cbc20f297.png", "images/Bob-hand-8eb49c2306.jpg", "images/Stuart-hand-c942aa522b.jpg", "images/Kevin-hand-0c94d33480.jpg", "images/vivo-p-img-9e046da7fd.jpg", "images/vivo-p-xq-c1c30bddc5.jpg", "images/p6-cj-icon-5fa0b0103e.png", "images/p6-cj-icon-bb5e035d3b.gif", "images/vivo-p-img-9e046da7fd.jpg", "images/p7-icon-b564716111.jpg"]), define("*", function (t) {
    "use strict";
    var n = $(".page-0"), e = 0, i = 0, o = $(".page-1"), a = $(".page-2"), r = $(".page-3"), s = 0, p = 0, c = 0;
    window.b3_v_b = !1;
    {
        var u = $(".page-4"), d = !1, l = $(".page-5"), f = $(".page-6");
        modjs.require("config")
    }
    $("[data-nickname]").html(window.user.nickname), $("[data-headimgurl]").attr("src", window.user.headimgurl),
    //    f.find(".p6-cj-icon").on("tap", function () {
    //    app.plugins.loading.show(), $.get(window.apiUrl + window.awardUrl, {}, function (t) {
    //        if (app.plugins.loading.hide(), t.error && -1 == t.code)return void app.plugins.dialog.confirm(t.error, [function () {
    //            window.location.href = "/vivo820/"
    //        }]);
    //        if (t.error && 0 == t.code)return void $(".f-gone").show();
    //        if (t.error && 1 == t.code)return void $(".f-awarded").show();
    //        if (t.error && 2 == t.code) {
    //            var n = ["", "ticket", "cup", "phone", "doll"];
    //            $("[data-f='" + n[t.type] + "']").show()
    //        }
    //        if (t.msg && 0 == t.id)return void $(".f-no-winning").show();
    //        if (t.msg && t.type) {
    //            var n = ["", "ticket", "cup", "phone", "doll"];
    //            $("[data-f='" + n[t.type] + "']").show()
    //        }
    //    }, "jsonp")
    //}),
        f.find("[data-preimg]").on("tap", function (t) {
        t.preventDefault();
        var n = ["images/posters1-1-66e5e12b12.jpg", "images/posters2-1-d42ee7172c.jpg", "images/posters3-1-575486b02f.jpg"], e = $(this).data("preimg");
        wx.previewImage({current: n[e], urls: n})
    }), f.find(".vivo-p-img").on("tap", function (t) {
        t.preventDefault();
        var n = ["images/vivo-p-img-d-db01f6a1f8.jpg"];
        wx.previewImage({current: n[0], urls: n})
    }), $(".f-winning-bottom").on("tap", function (t) {
        t.preventDefault(), window.location.hash = "#6", window.location.href = "http://shop.vivo.com.cn/wap/minions.html"
    }), $(".page-6").find(".p6-kaisa-cj").on("tap", function (t) {
        t.preventDefault(), window.location.hash = "#6", window.location.href = "http://weidian.com/s/858028890?wfr=c"
    }),$(".page-6").find(".p6-junda-cj").on("tap", function (t) {
        t.preventDefault(), window.location.hash = "#6", window.location.href = "http://weidian.com/s/858067351?wfr=c"
    }),$(".page-6").find(".p6-zihao-cj").on("tap", function (t) {
        t.preventDefault(), window.location.hash = "#6", window.location.href = "http://weidian.com/s/858010311?wfr=c"
    }),$(".page-6").find(".p6-mizhen-cj").on("tap", function (t) {
        t.preventDefault(), window.location.hash = "#6", window.location.href = "http://weidian.com/s/858066641?wfr=c"
    }),$(".page-6").find(".p6-yinfei-cj").on("tap", function (t) {
        t.preventDefault(), window.location.hash = "#6", window.location.href = "http://weidian.com/s/858067712?wfr=c"
    }),$(".page-6").find(".p6-sunchen-cj").on("tap", function (t) {
        t.preventDefault(), window.location.hash = "#6", window.location.href = "http://weidian.com/s/858068162?wfr=c"
    }),$(".page-6").find(".p6-zhouqi-cj").on("tap", function (t) {
        t.preventDefault(), window.location.hash = "#6", window.location.href = "http://weidian.com/s/858068806?wfr=c"
    }),$(".page-6").find(".p6-siyuan-cj").on("tap", function (t) {
        t.preventDefault(), window.location.hash = "#6", window.location.href = "http://weidian.com/s/858069333?wfr=c"
    }),
        f.find(".Thumb").on("tap", function (t) {
        t.preventDefault();
        var n = $(this).parents(".cont"), e = $(this).data("thumbool");
        if (e && "false" != e)$(this).find(".Thumb-cancel").hide(), n.find(".myThumb").remove(), e = "false"; else {
            $(this).find(".Thumb-cancel").show();
            var i = '<span class="Thumb-line myThumb">,' + window.user.nickname + "</span>";
            n.find(".Thumb-line_D").append(i), e = "true"
        }
        n.find(".Thumb-comments-icon").trigger("tap"), $(this).data("thumbool", e)
    }), f.find(".Thumb-comments-icon").on("tap", function (t) {
        t.preventDefault();
        var n = $(this).data("iconbool");
        if (n && "false" != n)$(this).prev(".Thumb-comments").css({
            transform: "rotateY(90deg)",
            "-webkit-transform": "rotateY(90deg)"
        }), n = "false"; else {
            $(this).prev(".Thumb-comments").css({
                transform: "rotateY(90deg)",
                "-webkit-transform": "rotateY(90deg)",
                "transform-origin": "right",
                "-webkit-transform-origin": "right"
            });
            var e = this;
            setTimeout(function () {
                $(e).prev(".Thumb-comments").show().css({
                    transform: "rotateY(0deg)",
                    "-webkit-transform": "rotateY(0deg)",
                    transition: "all 0.2s linear ",
                    "-webkit-transition": "all 0.2s linear "
                })
            }, 10), n = "true"
        }
        $(this).data("iconbool", n)
    }), l.find(".Circlefriends").on("tap", function (t) {
        t.preventDefault(), app.play(6)
    }), r.find(".p4-round").on("tap", function (t) {
        t.preventDefault(), r.find(".yue").hide(), r.find(".p3-bg").append(u.find(".p4-yh-w")), s += r.find(".p4-yh-w").height() + 20, r.find(".p3-bg").scrollTop(s), setTimeout(function () {
            r.find(".p3-bg").append(u.find(".p4-ch")), s += r.find(".p4-ch").height() + 40, r.find(".p3-bg").scrollTop(s), app.ts.play(), r.find(".p4-ch,.p4-round-1").on("tap", function (t) {
                t.preventDefault(), console.info("p4-ch"), d || (app.play(5), d = !0)
            })
        }, 1500), d = !1, setTimeout(function () {
            $(" .p4-round-1").show()
        }, 500), $(this).hide(), setTimeout(function () {
            d || (app.play(5), d = !0)
        }, 6e3)
    }), r.find(".envelope").on("tap", function (t) {
        t.preventDefault(), $(".f-banana").show(), $(".f-banana").find("[class^='banana']").hide();
        //var n = parseInt(3 * Math.random());
        //$(".f-banana").find(".banana" + n).delayClass("zoomIn", .1, .5), $(".envelope .p-3round").hide()
        $(".f-banana").find(".banana0").delayClass("zoomIn", .1, .5), $(".envelope .p-3round").hide()
    }), r.find(".vioce").on("tap", function (t) {
        t.preventDefault(), window.b3_v_b ? (app.voice.pause(), window.b3_v_b = !1) : (app.voice.play(), window.b3_v_b = !0), app.voice.handler.addEventListener("pause", function () {
            window.b3_v_b = !1
        })
    }), r.find(".p3-bg").on({
        touchstart: function (t) {
            t.preventDefault(), p = t.touches[0].clientY, c = r.find(".p3-bg").scrollTop()
        }, touchmove: function (t) {
            t.preventDefault();
            var n = t.touches[0].clientY, e = n - p;
            r.find(".p3-bg").scrollTop(c - e)
        }, touchend: function (t) {
            t.preventDefault()
        }
    }), a.find(".p2-bt").on("tap", function (t) {
        t.preventDefault(), app.play(3)
    }), a.find(".p2-p").on({
        touchmove: function (t) {
            t.preventDefault()
        }
    }), n.find(".p0-bt").on({
        touchstart: function (t) {
            t.preventDefault(), e = t.touches[0].clientY, i = t.touches[0].clientX, n.find(".p0-up").hide()
        }, touchmove: function (t) {
            var n = t.touches[0].clientY, i = (t.touches[0].clientX, n - e);
            i > -150 && $(this).css({
                transform: "translateY(" + i + "px )",
                "-webkit-transform": "translateY(" + i + "px )",
                transition: "all 0s",
                "-webkit-transition": "all 0s"
            })
        }, touchend: function (t) {
            var i = t.changedTouches[0].clientY, o = i - e;
            n.find(".p0-up").show(), $(this).attr("style", "").show(), -150 > o && app.play(1)
        }
    });
    var h = function () {
        r.find(".p4-bottom").delayClass("fadeInUp", 0, 1), r.find(".p3-bg").height($(window).height() - r.find(".p4-bottom").height());
        for (var t = r.find(".p3-bg>div"), n = 0; n < t.length; n++)s += t.eq(n).height();
        setTimeout(function () {
            r.find(".p3-bg").scrollTop(s)
        }, 1)
    };
    $("[data-Shut]").on("tap", function (t) {
        t.preventDefault(), $(this).parents("[data-f]").hide();
        var n = $(this).data("shut");
        "banana" == n && h()
    }), $(".f-gone").on("tap", function (t) {
        t.preventDefault(), $(this).hide()
    }), $(".f-successful").on("tap", function (t) {
        t.preventDefault(), $(this).hide()
    }), $(".phone-tj-bt").on("tap", function () {
        var t = ($(this).data("type"), {});
        t.name = $(this).parents(".f-winning").find(".input").find(".name").val(), t.mobile = $(this).parents(".f-winning").find(".input").find(".mobile").val(), t.address = $(this).parents(".f-winning").find(".input").find(".address").val();
        for (var n in t)if (null == t[n] || void 0 == t || "" == t[n])return void app.plugins.dialog.alert("请完整信息!");
        app.plugins.loading.show(), $.get(window.apiUrl + window.infoUrl, t, function (t) {
            return app.plugins.loading.hide(), t.error && "-1" == t.code ? void app.plugins.dialog.alert(t.error) : void(t.msg && "1" == t.code && ($(".f-successful").show(), setTimeout(function () {
                $(".f-successful").hide()
            }, 2e3)))
        }, "jsonp")
    }), $("[data-sm]").on("tap", function (t) {
        t.preventDefault();
        var n = this, e = .2;
        $(this).parents(".f-winning").find(".f-winning-k").css({
            transform: "rotateY(0deg)",
            "-webkit-transform": "rotateY(0deg)"
        }).show(), setTimeout(function () {
            $(n).parents(".f-winning").find(".f-winning-k").css({
                transform: "rotateY(-90deg)",
                "-webkit-transform": "rotateY(-90deg)",
                transition: "all " + e + "s linear",
                "-webkit-transition": "all " + e + "s linear"
            })
        }, 1), $(this).parents(".f-winning").find(".f-instructions").css({
            transform: "rotateY(-90deg)",
            "-webkit-transform": "rotateY(-90deg)"
        }).show(), setTimeout(function () {
            $(n).parents(".f-winning").find(".f-instructions").css({
                transform: "rotateY(0deg)",
                "-webkit-transform": "rotateY(0deg)",
                transition: "all " + e + "s linear",
                "-webkit-transition": "all " + e + "s linear"
            })
        }, 1e3 * e)
    }), $(".f-winning").find(".f-in-w").on("tap", function (t) {
        t.preventDefault();
        var n = this, e = .2;
        $(this).parents(".f-winning").find(".f-instructions").css({
            transform: "rotateY(-90deg)",
            "-webkit-transform": "rotateY(-90deg)"
        }).show(), setTimeout(function () {
            $(n).parents(".f-winning").find(".f-winning-k").css({
                transform: "rotateY(0deg)",
                "-webkit-transform": "rotateY(0deg)"
            })
        }, 1e3 * e)
    }), $(window).on("hashchange", function () {
        var t = window.location.hash.replace("#", "");
        t != app.currentPage && app.pages[t] && app.play(t)
    });
    var g = {
        $root: document.getElementById("mycanvas"),
        ctx: null,
        chooseType: 3,
        arr: [],
        restPoint: [],
        lastPoint: [],
        r: 0,
        touchFlag: !1,
        touchStart: !1,
        color: "#d5d3cf",
        width: 4.5,
        truedata: [6, 3, 0, 4, 2, 5, 8],
        Rcolor: "green",
        Fcolor: "red",
        TFunction: null,
        FFunction: null,
        init: function () {
            var t = this;
            t.createCircle(), t.BindEvent()
        },
        createCircle: function () {
            var t = this, n = t.chooseType;
            t.arr = [], t.restPoint = [], t.lastPoint = [], t.touchFlag = !1, t.ctx = t.$root.getContext("2d"), t.r = 32;
            for (var e = 5.55, i = 0; n > i; i++)for (var o = 0; n > o; o++)t.arr.push({
                x: o * e * t.r + t.r + 9,
                y: i * e * t.r + t.r + 9
            }), t.restPoint.push({x: o * e * t.r + t.r + 9, y: i * e * t.r + t.r + 9});
            for (var i = 0; i < this.arr.length; i++)t.drawCle(t.arr[i].x, t.arr[i].y, t.r, t.color);
            for (var i = 0; i < t.truedata.length; i++) {
                var o = t.truedata[i];
                t.drawCle(t.arr[o].x, t.arr[o].y, t.r), t.lastPoint.push(t.arr[o])
            }
            t.drawLine("", "rgba(255,255,255,0.3)"), t.drawPoint("rgba(255,255,255,0.5)")
        },
        drawCle: function (t, n, e, i) {
            var o = this;
            i = i ? i : o.color, e = e ? e : o.r, o.ctx.strokeStyle = i, o.ctx.lineWidth = o.width, o.ctx.beginPath(), o.ctx.arc(t, n, e, 0, 2 * Math.PI), o.ctx.closePath(), o.ctx.stroke()
        },
        drawPoint: function (t, n) {
            var e = this;
            t = t ? t : e.color, n = n ? n : e.r;
            for (var i = 0, o = e.lastPoint.length; o > i; i++)e.ctx.fillStyle = t, e.ctx.beginPath(), e.ctx.arc(e.lastPoint[i].x, e.lastPoint[i].y, n / 4, 0, 2 * Math.PI, !0), e.ctx.closePath(), e.ctx.fill()
        },
        drawLine: function (t, n) {
            var e = this;
            n = n ? n : e.color, e.ctx.beginPath(), e.ctx.lineWidth = e.width, e.ctx.strokeStyle = n, e.ctx.moveTo(e.lastPoint[0].x, e.lastPoint[0].y);
            for (var i = 1; i < e.lastPoint.length; i++)e.ctx.lineTo(e.lastPoint[i].x, e.lastPoint[i].y);
            t && e.ctx.lineTo(t.x, t.y), e.ctx.stroke(), e.ctx.closePath()
        },
        getPosition: function (t) {
            var n = t.currentTarget.getBoundingClientRect(), e = {
                x: t.touches[0].clientX - n.left,
                y: t.touches[0].clientY - n.top
            };
            return e
        },
        BindEvent: function () {
            var t = this;
            t.$root.addEventListener("touchstart", function (n) {
                n.preventDefault();
                var e = t.getPosition(n);
                t.touchStart = !0, t.createCircle(), t.lastPoint = [];
                for (var i = 0, o = t.arr.length; o > i; i++)Math.abs(e.x - t.arr[i].x) < t.r && Math.abs(e.y - t.arr[i].y) < t.r && (t.touchFlag = !0, t.lastPoint.push(t.arr[i]), t.restPoint.splice(i, 1))
            }, !1), t.$root.addEventListener("touchmove", function (n) {
                if (n.preventDefault(), t.touchFlag) {
                    var e = t.getPosition(n);
                    t.update(e, !1)
                }
            }, !1), t.$root.addEventListener("touchend", function (n) {
                n.preventDefault(), t.touchStart = !1, t.touchFlag && (t.update("", !1), t.Judge())
            }, !1)
        },
        update: function (t, n) {
            var e = this;
            n = n ? n : !1, e.ctx.clearRect(0, 0, e.ctx.canvas.width, e.ctx.canvas.height);
            for (var i = 0; i < e.arr.length; i++) {
                for (var o = e.color, a = 0; a < e.lastPoint.length; a++)e.lastPoint[a].x == e.arr[i].x && e.lastPoint[a].y == e.arr[i].y && (o = e.Rcolor);
                e.drawCle(e.arr[i].x, e.arr[i].y, e.r, o)
            }
            if (!n) {
                e.drawLine(t, e.Rcolor);
                for (var i = 0; i < e.restPoint.length; i++)if (Math.abs(t.x - e.restPoint[i].x) < e.r && Math.abs(t.y - e.restPoint[i].y) < e.r) {
                    e.drawPoint(), e.lastPoint.push(e.restPoint[i]), e.restPoint.splice(i, 1);
                    break
                }
            }
            e.drawPoint(e.Rcolor)
        },
        Judge: function () {
            var t = this, n = 0, e = !1;
            if (t.ctx.clearRect(0, 0, t.ctx.canvas.width, t.ctx.canvas.height), t.lastPoint.length == t.truedata.length) {
                for (var i = 0, o = t.lastPoint.length; o > i; i++)n = t.truedata[i], e || t.lastPoint[i].x != t.arr[n].x || t.lastPoint[i].y != t.arr[n].y ? (t.drawCle(t.lastPoint[i].x, t.lastPoint[i].y, t.r, t.Fcolor), e = !0) : (t.drawCle(t.lastPoint[i].x, t.lastPoint[i].y, t.r, t.Rcolor), t.drawPoint(t.Rcolor), t.drawLine("", t.Rcolor), app.unlock.play());
                e && (t.drawLine("", t.Fcolor), t.drawPoint(t.Fcolor))
            } else {
                e = !0;
                for (var i = 0, o = t.lastPoint.length; o > i; i++)t.drawCle(t.lastPoint[i].x, t.lastPoint[i].y, t.r, t.Fcolor);
                t.drawLine("", t.Fcolor), t.drawPoint(t.Fcolor)
            }
            e ? "function" == typeof t.FFunction && t.FFunction() : "function" == typeof t.TFunction && t.TFunction();
            var a = 3e3;
            e && (a = 1e3), setTimeout(function () {
                t.touchStart || (t.ctx.clearRect(0, 0, t.ctx.canvas.width, t.ctx.canvas.height), t.createCircle(), $(".p1-ts-2").hide())
            }, a)
        }
    };
    g.init(), g.TFunction = function () {
        o.find(".p1-ts-2").hide(), setTimeout(function () {
            app.play(2)
        }, 500)
    }, g.FFunction = function () {
        o.find(".p1-ts-2").show()
    }, setTimeout(function () {
        window.shareData.success = function () {
            app.play(7)
        }, wx.onMenuShareTimeline({
            title: window.shareData.desc,
            link: window.shareData.link,
            imgUrl: window.shareData.imgUrl,
            success: function () {
                app.play(7)
            },
            cancel: window.shareData.cancel
        })
    }, 2e3), window.hand_open = g
}), define("app", function (t) {
    "use strict";
    var n = function () {
        var t = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], n = new Date, e = n.getMonth() + 1, i = n.getDate(), o = n.getDay(), a = n.getHours() > 9 ? n.getHours() : "0" + n.getHours(), r = n.getMinutes() > 9 ? n.getMinutes() : "0" + n.getMinutes();
        return {h: a + ":" + r, date: e + "月 " + i + "日", week: t[o]}
    };
    app.pages[0] = function () {
        var t = $(".page-0");
        t.find("div").show(), t.find(".line").height($(window).height() - 250 - 450 + 70), t.find(".p0-f").hide();
        setInterval(function () {
            var e = n();
            t.find(".time-h").text(e.h), t.find(".time-date").text(e.date), t.find(".week").text(e.week)
        }, 1e3);
        setTimeout(function () {
            t.find(".p0-f").show();
            for (var n = t.find(".line").find("div"), e = 0, i = n.length; i > e; e++)n.eq(e).delayClass("fadeInRight", 1 * e), function (t) {
                setTimeout(function () {
                    app.ts.play()
                }, 1e3 * t)
            }(e)
        }, 1e3)
    }, app.pages[1] = function () {
        var t = $(".page-1");
        t.find("div").show(), t.find(".p1-ts-2").hide()
    }, app.pages[2] = function () {
        var t = $(".page-2");
        t.find("div").show(), t.find(".p2-p").height($(window).height() - 220)
    }, app.pages[3] = function () {
        var t = $(".page-3");
        t.find("div").show(), t.find("p3-bg").find("[class^='p3-']").show(), t.find(".voice-sound-icon1").hide(), t.find(".voice-sound-icon2").hide(), t.find(".p4-bottom").hide(), t.find(".p3-bg").height($(window).height() - 86);
        for (var n = t.find(".p3-bg").find("[class*='p3-']"), e = [], i = 0, o = 0, a = n.length; a > o; o++)e.push(n.eq(o)), n.eq(o).remove();
        var r = 0, s = 500, p = function () {
            i < e.length && (window.b3_v_b || app.ts.play(), t.find(".p3-bg").append(e[i][0]), r += t.find(".p3-bg").find("[class*='p3-']").eq(i).height(), t.find(".p3-bg").scrollTop(r), i++)
        };
        setTimeout(function () {
            p()
        }, s), s += 2e3;
        for (var o = 0; 2 > o; o++)setTimeout(function () {
            p()
        }, s), s += 1500;
        s += 200;
        for (var o = 0; 4 > o; o++)setTimeout(function () {
            p()
        }, s), s += 1e3;
        s += 800;
        for (var o = 0; 1 > o; o++)setTimeout(function () {
            p()
        }, s), s += 1e3;
        t.find(".p3-bg").scrollTop(r)
    }, app.pages[4] = function () {
        var t = $(".page-4");
        t.find("div").show(), t.find(".p4-yh-w").hide(), t.find(".p4-ch").hide(), t.find(".p4-round-1").hide(), t.find(".p4-bg").height($(window).height() - $(".p4-bottom").height()), t.find(".yue").show()
    }, app.pages[5] = function () {
        var t = $(".page-5");
        t.find("div").show()
    }, app.pages[6] = function () {
        var t = $(".page-6");
        t.find("div").show(), t.find(".Thumb-comments").hide(), t.find(".Thumb-cancel").hide()
        // t.find(".p6-line .picture-video").html('<iframe class="hr-sp" frameborder="0" width="355" height="211" src="http://v.qq.com/iframe/player.html?vid=l0164xai96q&tiny=0&auto=0" allowfullscreen></iframe>')
    }, app.pages[7] = function () {
        var t = $(".page-7");
        t.find("div").show()
    }, app.load(t("app-src"), function () {
        app.$loading.remove(), $(".unload").removeClass("unload");
        var t = window.location.hash.replace("#", "");
        t || (t = 0), app.init(t)
    }, function (t, n, e) {
        $(".loading").find(".text").html(n + "%")
    }), app.voice = app.plugins.audio.init("./public/music/voice3.mp3", !1, !1, !0), app.ts = app.plugins.audio.init("./public/music/whistle.mp3", !1, !1, !0), app.unlock = app.plugins.audio.init("./public/music/unlock.mp3", !1, !1, !0);
    var e;
    app.voice.handler.addEventListener("play", function () {
        var t = 0, n = $(".page-3").find(".vioce-sound").find("div");
        e = setInterval(function () {
            n.removeClass("at"), n.eq(t).addClass("at"), 2 > t ? t++ : t = 0
        }, 300)
    }), app.voice.handler.addEventListener("pause", function () {
        clearInterval(e);
        var t = $(".page-3").find(".vioce-sound").find("div");
        t.removeClass("at"), t.eq(2).addClass("at")
    }), $(".up").hide()
});