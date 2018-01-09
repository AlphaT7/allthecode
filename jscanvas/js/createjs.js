/* createjs-com 2017-12-20 */
!function(a) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = a();
    else {
        if ("function" == typeof define && define.amd)
            return define([], a);
        this.CodeMirror = a()
    }
}(function() {
    "use strict";
    function a(c, d) {
        if (!(this instanceof a))
            return new a(c,d);
        this.options = d = d || {},
        oe(Ff, d, !1),
        o(d);
        var e = d.value;
        "string" == typeof e && (e = new bg(e,d.mode)),
        this.doc = e;
        var f = this.display = new b(c,e);
        f.wrapper.CodeMirror = this,
        k(this),
        i(this),
        d.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"),
        d.autofocus && !hf && yb(this),
        this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: !1,
            cutIncoming: !1,
            draggingText: !1,
            highlight: new he
        },
        Ye && 11 > Ze && setTimeout(pe(xb, this, !0), 20),
        Bb(this),
        De();
        var g = this;
        hb(this, function() {
            g.curOp.forceUpdate = !0,
            Cd(g, e),
            d.autofocus && !hf || xe() == f.input ? setTimeout(pe(Yb, g), 20) : Zb(g);
            for (var a in Gf)
                Gf.hasOwnProperty(a) && Gf[a](g, d[a], Hf);
            u(g);
            for (var b = 0; b < Lf.length; ++b)
                Lf[b](g)
        })
    }
    function b(a, b) {
        var c = this
          , d = c.input = te("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
        $e ? d.style.width = "1000px" : d.setAttribute("wrap", "off"),
        gf && (d.style.border = "1px solid black"),
        d.setAttribute("autocorrect", "off"),
        d.setAttribute("autocapitalize", "off"),
        d.setAttribute("spellcheck", "false"),
        c.inputDiv = te("div", [d], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"),
        c.scrollbarH = te("div", [te("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar"),
        c.scrollbarV = te("div", [te("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
        c.scrollbarFiller = te("div", null, "CodeMirror-scrollbar-filler"),
        c.gutterFiller = te("div", null, "CodeMirror-gutter-filler"),
        c.lineDiv = te("div", null, "CodeMirror-code"),
        c.selectionDiv = te("div", null, null, "position: relative; z-index: 1"),
        c.cursorDiv = te("div", null, "CodeMirror-cursors"),
        c.measure = te("div", null, "CodeMirror-measure"),
        c.lineMeasure = te("div", null, "CodeMirror-measure"),
        c.lineSpace = te("div", [c.measure, c.lineMeasure, c.selectionDiv, c.cursorDiv, c.lineDiv], null, "position: relative; outline: none"),
        c.mover = te("div", [te("div", [c.lineSpace], "CodeMirror-lines")], null, "position: relative"),
        c.sizer = te("div", [c.mover], "CodeMirror-sizer"),
        c.heightForcer = te("div", null, null, "position: absolute; height: " + lg + "px; width: 1px;"),
        c.gutters = te("div", null, "CodeMirror-gutters"),
        c.lineGutter = null,
        c.scroller = te("div", [c.sizer, c.heightForcer, c.gutters], "CodeMirror-scroll"),
        c.scroller.setAttribute("tabIndex", "-1"),
        c.wrapper = te("div", [c.inputDiv, c.scrollbarH, c.scrollbarV, c.scrollbarFiller, c.gutterFiller, c.scroller], "CodeMirror"),
        Ye && 8 > Ze && (c.gutters.style.zIndex = -1,
        c.scroller.style.paddingRight = 0),
        gf && (d.style.width = "0px"),
        $e || (c.scroller.draggable = !0),
        df && (c.inputDiv.style.height = "1px",
        c.inputDiv.style.position = "absolute"),
        Ye && 8 > Ze && (c.scrollbarH.style.minHeight = c.scrollbarV.style.minWidth = "18px"),
        a.appendChild ? a.appendChild(c.wrapper) : a(c.wrapper),
        c.viewFrom = c.viewTo = b.first,
        c.view = [],
        c.externalMeasured = null,
        c.viewOffset = 0,
        c.lastSizeC = 0,
        c.updateLineNumbers = null,
        c.lineNumWidth = c.lineNumInnerWidth = c.lineNumChars = null,
        c.prevInput = "",
        c.alignWidgets = !1,
        c.pollingFast = !1,
        c.poll = new he,
        c.cachedCharWidth = c.cachedTextHeight = c.cachedPaddingH = null,
        c.inaccurateSelection = !1,
        c.maxLine = null,
        c.maxLineLength = 0,
        c.maxLineChanged = !1,
        c.wheelDX = c.wheelDY = c.wheelStartX = c.wheelStartY = null,
        c.shift = !1,
        c.selForContextMenu = null
    }
    function c(b) {
        b.doc.mode = a.getMode(b.options, b.doc.modeOption),
        d(b)
    }
    function d(a) {
        a.doc.iter(function(a) {
            a.stateAfter && (a.stateAfter = null),
            a.styles && (a.styles = null)
        }),
        a.doc.frontier = a.doc.first,
        va(a, 100),
        a.state.modeGen++,
        a.curOp && nb(a)
    }
    function e(a) {
        a.options.lineWrapping ? (Ae(a.display.wrapper, "CodeMirror-wrap"),
        a.display.sizer.style.minWidth = "") : (ze(a.display.wrapper, "CodeMirror-wrap"),
        n(a)),
        g(a),
        nb(a),
        Na(a),
        setTimeout(function() {
            r(a)
        }, 100)
    }
    function f(a) {
        var b = Ya(a.display)
          , c = a.options.lineWrapping
          , d = c && Math.max(5, a.display.scroller.clientWidth / Za(a.display) - 3);
        return function(e) {
            if (bd(a.doc, e))
                return 0;
            var f = 0;
            if (e.widgets)
                for (var g = 0; g < e.widgets.length; g++)
                    e.widgets[g].height && (f += e.widgets[g].height);
            return c ? f + (Math.ceil(e.text.length / d) || 1) * b : f + b
        }
    }
    function g(a) {
        var b = a.doc
          , c = f(a);
        b.iter(function(a) {
            var b = c(a);
            b != a.height && Gd(a, b)
        })
    }
    function h(a) {
        var b = Qf[a.options.keyMap]
          , c = b.style;
        a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (c ? " cm-keymap-" + c : "")
    }
    function i(a) {
        a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + a.options.theme.replace(/(^|\s)\s*/g, " cm-s-"),
        Na(a)
    }
    function j(a) {
        k(a),
        nb(a),
        setTimeout(function() {
            t(a)
        }, 20)
    }
    function k(a) {
        var b = a.display.gutters
          , c = a.options.gutters;
        ue(b);
        for (var d = 0; d < c.length; ++d) {
            var e = c[d]
              , f = b.appendChild(te("div", null, "CodeMirror-gutter " + e));
            "CodeMirror-linenumbers" == e && (a.display.lineGutter = f,
            f.style.width = (a.display.lineNumWidth || 1) + "px")
        }
        b.style.display = d ? "" : "none",
        l(a)
    }
    function l(a) {
        var b = a.display.gutters.offsetWidth;
        a.display.sizer.style.marginLeft = b + "px",
        a.display.scrollbarH.style.left = a.options.fixedGutter ? b + "px" : 0
    }
    function m(a) {
        if (0 == a.height)
            return 0;
        for (var b, c = a.text.length, d = a; b = Wc(d); ) {
            var e = b.find(0, !0);
            d = e.from.line,
            c += e.from.ch - e.to.ch
        }
        for (d = a; b = Xc(d); ) {
            var e = b.find(0, !0);
            c -= d.text.length - e.from.ch,
            d = e.to.line,
            c += d.text.length - e.to.ch
        }
        return c
    }
    function n(a) {
        var b = a.display
          , c = a.doc;
        b.maxLine = Dd(c, c.first),
        b.maxLineLength = m(b.maxLine),
        b.maxLineChanged = !0,
        c.iter(function(a) {
            var c = m(a);
            c > b.maxLineLength && (b.maxLineLength = c,
            b.maxLine = a)
        })
    }
    function o(a) {
        var b = le(a.gutters, "CodeMirror-linenumbers");
        -1 == b && a.lineNumbers ? a.gutters = a.gutters.concat(["CodeMirror-linenumbers"]) : b > -1 && !a.lineNumbers && (a.gutters = a.gutters.slice(0),
        a.gutters.splice(b, 1))
    }
    function p(a) {
        return a.display.scroller.clientHeight - a.display.wrapper.clientHeight < lg - 3
    }
    function q(a) {
        var b = a.display.scroller;
        return {
            clientHeight: b.clientHeight,
            barHeight: a.display.scrollbarV.clientHeight,
            scrollWidth: b.scrollWidth,
            clientWidth: b.clientWidth,
            hScrollbarTakesSpace: p(a),
            barWidth: a.display.scrollbarH.clientWidth,
            docHeight: Math.round(a.doc.height + Aa(a.display))
        }
    }
    function r(a, b) {
        b || (b = q(a));
        var c = a.display
          , d = Fe(c.measure)
          , e = b.docHeight + lg
          , f = b.scrollWidth > b.clientWidth;
        f && b.scrollWidth <= b.clientWidth + 1 && d > 0 && !b.hScrollbarTakesSpace && (f = !1);
        var g = e > b.clientHeight;
        if (g ? (c.scrollbarV.style.display = "block",
        c.scrollbarV.style.bottom = f ? d + "px" : "0",
        c.scrollbarV.firstChild.style.height = Math.max(0, e - b.clientHeight + (b.barHeight || c.scrollbarV.clientHeight)) + "px") : (c.scrollbarV.style.display = "",
        c.scrollbarV.firstChild.style.height = "0"),
        f ? (c.scrollbarH.style.display = "block",
        c.scrollbarH.style.right = g ? d + "px" : "0",
        c.scrollbarH.firstChild.style.width = b.scrollWidth - b.clientWidth + (b.barWidth || c.scrollbarH.clientWidth) + "px") : (c.scrollbarH.style.display = "",
        c.scrollbarH.firstChild.style.width = "0"),
        f && g ? (c.scrollbarFiller.style.display = "block",
        c.scrollbarFiller.style.height = c.scrollbarFiller.style.width = d + "px") : c.scrollbarFiller.style.display = "",
        f && a.options.coverGutterNextToScrollbar && a.options.fixedGutter ? (c.gutterFiller.style.display = "block",
        c.gutterFiller.style.height = d + "px",
        c.gutterFiller.style.width = c.gutters.offsetWidth + "px") : c.gutterFiller.style.display = "",
        !a.state.checkedOverlayScrollbar && b.clientHeight > 0) {
            if (0 === d) {
                var h = jf && !ef ? "12px" : "18px";
                c.scrollbarV.style.minWidth = c.scrollbarH.style.minHeight = h;
                var i = function(b) {
                    _d(b) != c.scrollbarV && _d(b) != c.scrollbarH && ib(a, Fb)(b)
                };
                hg(c.scrollbarV, "mousedown", i),
                hg(c.scrollbarH, "mousedown", i)
            }
            a.state.checkedOverlayScrollbar = !0
        }
    }
    function s(a, b, c) {
        var d = c && null != c.top ? Math.max(0, c.top) : a.scroller.scrollTop;
        d = Math.floor(d - za(a));
        var e = c && null != c.bottom ? c.bottom : d + a.wrapper.clientHeight
          , f = Id(b, d)
          , g = Id(b, e);
        if (c && c.ensure) {
            var h = c.ensure.from.line
              , i = c.ensure.to.line;
            if (f > h)
                return {
                    from: h,
                    to: Id(b, Jd(Dd(b, h)) + a.wrapper.clientHeight)
                };
            if (Math.min(i, b.lastLine()) >= g)
                return {
                    from: Id(b, Jd(Dd(b, i)) - a.wrapper.clientHeight),
                    to: i
                }
        }
        return {
            from: f,
            to: Math.max(g, f + 1)
        }
    }
    function t(a) {
        var b = a.display
          , c = b.view;
        if (b.alignWidgets || b.gutters.firstChild && a.options.fixedGutter) {
            for (var d = w(b) - b.scroller.scrollLeft + a.doc.scrollLeft, e = b.gutters.offsetWidth, f = d + "px", g = 0; g < c.length; g++)
                if (!c[g].hidden) {
                    a.options.fixedGutter && c[g].gutter && (c[g].gutter.style.left = f);
                    var h = c[g].alignable;
                    if (h)
                        for (var i = 0; i < h.length; i++)
                            h[i].style.left = f
                }
            a.options.fixedGutter && (b.gutters.style.left = d + e + "px")
        }
    }
    function u(a) {
        if (!a.options.lineNumbers)
            return !1;
        var b = a.doc
          , c = v(a.options, b.first + b.size - 1)
          , d = a.display;
        if (c.length != d.lineNumChars) {
            var e = d.measure.appendChild(te("div", [te("div", c)], "CodeMirror-linenumber CodeMirror-gutter-elt"))
              , f = e.firstChild.offsetWidth
              , g = e.offsetWidth - f;
            return d.lineGutter.style.width = "",
            d.lineNumInnerWidth = Math.max(f, d.lineGutter.offsetWidth - g),
            d.lineNumWidth = d.lineNumInnerWidth + g,
            d.lineNumChars = d.lineNumInnerWidth ? c.length : -1,
            d.lineGutter.style.width = d.lineNumWidth + "px",
            l(a),
            !0
        }
        return !1
    }
    function v(a, b) {
        return String(a.lineNumberFormatter(b + a.firstLineNumber))
    }
    function w(a) {
        return a.scroller.getBoundingClientRect().left - a.sizer.getBoundingClientRect().left
    }
    function x(a, b, c) {
        var d = a.display;
        this.viewport = b,
        this.visible = s(d, a.doc, b),
        this.editorIsHidden = !d.wrapper.offsetWidth,
        this.wrapperHeight = d.wrapper.clientHeight,
        this.oldViewFrom = d.viewFrom,
        this.oldViewTo = d.viewTo,
        this.oldScrollerWidth = d.scroller.clientWidth,
        this.force = c,
        this.dims = F(a)
    }
    function y(a, b) {
        var c = a.display
          , d = a.doc;
        if (b.editorIsHidden)
            return pb(a),
            !1;
        if (!b.force && b.visible.from >= c.viewFrom && b.visible.to <= c.viewTo && (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo) && 0 == tb(a))
            return !1;
        u(a) && (pb(a),
        b.dims = F(a));
        var e = d.first + d.size
          , f = Math.max(b.visible.from - a.options.viewportMargin, d.first)
          , g = Math.min(e, b.visible.to + a.options.viewportMargin);
        c.viewFrom < f && f - c.viewFrom < 20 && (f = Math.max(d.first, c.viewFrom)),
        c.viewTo > g && c.viewTo - g < 20 && (g = Math.min(e, c.viewTo)),
        pf && (f = _c(a.doc, f),
        g = ad(a.doc, g));
        var h = f != c.viewFrom || g != c.viewTo || c.lastSizeC != b.wrapperHeight;
        sb(a, f, g),
        c.viewOffset = Jd(Dd(a.doc, c.viewFrom)),
        a.display.mover.style.top = c.viewOffset + "px";
        var i = tb(a);
        if (!h && 0 == i && !b.force && (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo))
            return !1;
        var j = xe();
        return i > 4 && (c.lineDiv.style.display = "none"),
        G(a, c.updateLineNumbers, b.dims),
        i > 4 && (c.lineDiv.style.display = ""),
        j && xe() != j && j.offsetHeight && j.focus(),
        ue(c.cursorDiv),
        ue(c.selectionDiv),
        h && (c.lastSizeC = b.wrapperHeight,
        va(a, 400)),
        c.updateLineNumbers = null,
        !0
    }
    function z(a, b) {
        for (var c = b.force, d = b.viewport, e = !0; ; e = !1) {
            if (e && a.options.lineWrapping && b.oldScrollerWidth != a.display.scroller.clientWidth)
                c = !0;
            else if (c = !1,
            d && null != d.top && (d = {
                top: Math.min(a.doc.height + Aa(a.display) - lg - a.display.scroller.clientHeight, d.top)
            }),
            b.visible = s(a.display, a.doc, d),
            b.visible.from >= a.display.viewFrom && b.visible.to <= a.display.viewTo)
                break;
            if (!y(a, b))
                break;
            D(a);
            var f = q(a);
            ra(a),
            B(a, f),
            r(a, f)
        }
        be(a, "update", a),
        (a.display.viewFrom != b.oldViewFrom || a.display.viewTo != b.oldViewTo) && be(a, "viewportChange", a, a.display.viewFrom, a.display.viewTo)
    }
    function A(a, b) {
        var c = new x(a,b);
        if (y(a, c)) {
            z(a, c);
            var d = q(a);
            ra(a),
            B(a, d),
            r(a, d)
        }
    }
    function B(a, b) {
        a.display.sizer.style.minHeight = a.display.heightForcer.style.top = b.docHeight + "px",
        a.display.gutters.style.height = Math.max(b.docHeight, b.clientHeight - lg) + "px"
    }
    function C(a, b) {
        a.display.sizer.offsetWidth + a.display.gutters.offsetWidth < a.display.scroller.clientWidth - 1 && (a.display.sizer.style.minHeight = a.display.heightForcer.style.top = "0px",
        a.display.gutters.style.height = b.docHeight + "px")
    }
    function D(a) {
        for (var b = a.display, c = b.lineDiv.offsetTop, d = 0; d < b.view.length; d++) {
            var e, f = b.view[d];
            if (!f.hidden) {
                if (Ye && 8 > Ze) {
                    var g = f.node.offsetTop + f.node.offsetHeight;
                    e = g - c,
                    c = g
                } else {
                    var h = f.node.getBoundingClientRect();
                    e = h.bottom - h.top
                }
                var i = f.line.height - e;
                if (2 > e && (e = Ya(b)),
                (i > .001 || -.001 > i) && (Gd(f.line, e),
                E(f.line),
                f.rest))
                    for (var j = 0; j < f.rest.length; j++)
                        E(f.rest[j])
            }
        }
    }
    function E(a) {
        if (a.widgets)
            for (var b = 0; b < a.widgets.length; ++b)
                a.widgets[b].height = a.widgets[b].node.offsetHeight
    }
    function F(a) {
        for (var b = a.display, c = {}, d = {}, e = b.gutters.firstChild, f = 0; e; e = e.nextSibling,
        ++f)
            c[a.options.gutters[f]] = e.offsetLeft,
            d[a.options.gutters[f]] = e.offsetWidth;
        return {
            fixedPos: w(b),
            gutterTotalWidth: b.gutters.offsetWidth,
            gutterLeft: c,
            gutterWidth: d,
            wrapperWidth: b.wrapper.clientWidth
        }
    }
    function G(a, b, c) {
        function d(b) {
            var c = b.nextSibling;
            return $e && jf && a.display.currentWheelTarget == b ? b.style.display = "none" : b.parentNode.removeChild(b),
            c
        }
        for (var e = a.display, f = a.options.lineNumbers, g = e.lineDiv, h = g.firstChild, i = e.view, j = e.viewFrom, k = 0; k < i.length; k++) {
            var l = i[k];
            if (l.hidden)
                ;
            else if (l.node) {
                for (; h != l.node; )
                    h = d(h);
                var m = f && null != b && j >= b && l.lineNumber;
                l.changes && (le(l.changes, "gutter") > -1 && (m = !1),
                H(a, l, j, c)),
                m && (ue(l.lineNumber),
                l.lineNumber.appendChild(document.createTextNode(v(a.options, j)))),
                h = l.node.nextSibling
            } else {
                var n = P(a, l, j, c);
                g.insertBefore(n, h)
            }
            j += l.size
        }
        for (; h; )
            h = d(h)
    }
    function H(a, b, c, d) {
        for (var e = 0; e < b.changes.length; e++) {
            var f = b.changes[e];
            "text" == f ? L(a, b) : "gutter" == f ? N(a, b, c, d) : "class" == f ? M(b) : "widget" == f && O(b, d)
        }
        b.changes = null
    }
    function I(a) {
        return a.node == a.text && (a.node = te("div", null, null, "position: relative"),
        a.text.parentNode && a.text.parentNode.replaceChild(a.node, a.text),
        a.node.appendChild(a.text),
        Ye && 8 > Ze && (a.node.style.zIndex = 2)),
        a.node
    }
    function J(a) {
        var b = a.bgClass ? a.bgClass + " " + (a.line.bgClass || "") : a.line.bgClass;
        if (b && (b += " CodeMirror-linebackground"),
        a.background)
            b ? a.background.className = b : (a.background.parentNode.removeChild(a.background),
            a.background = null);
        else if (b) {
            var c = I(a);
            a.background = c.insertBefore(te("div", null, b), c.firstChild)
        }
    }
    function K(a, b) {
        var c = a.display.externalMeasured;
        return c && c.line == b.line ? (a.display.externalMeasured = null,
        b.measure = c.measure,
        c.built) : qd(a, b)
    }
    function L(a, b) {
        var c = b.text.className
          , d = K(a, b);
        b.text == b.node && (b.node = d.pre),
        b.text.parentNode.replaceChild(d.pre, b.text),
        b.text = d.pre,
        d.bgClass != b.bgClass || d.textClass != b.textClass ? (b.bgClass = d.bgClass,
        b.textClass = d.textClass,
        M(b)) : c && (b.text.className = c)
    }
    function M(a) {
        J(a),
        a.line.wrapClass ? I(a).className = a.line.wrapClass : a.node != a.text && (a.node.className = "");
        var b = a.textClass ? a.textClass + " " + (a.line.textClass || "") : a.line.textClass;
        a.text.className = b || ""
    }
    function N(a, b, c, d) {
        b.gutter && (b.node.removeChild(b.gutter),
        b.gutter = null);
        var e = b.line.gutterMarkers;
        if (a.options.lineNumbers || e) {
            var f = I(b)
              , g = b.gutter = f.insertBefore(te("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " + (a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth) + "px"), b.text);
            if (!a.options.lineNumbers || e && e["CodeMirror-linenumbers"] || (b.lineNumber = g.appendChild(te("div", v(a.options, c), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + d.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + a.display.lineNumInnerWidth + "px"))),
            e)
                for (var h = 0; h < a.options.gutters.length; ++h) {
                    var i = a.options.gutters[h]
                      , j = e.hasOwnProperty(i) && e[i];
                    j && g.appendChild(te("div", [j], "CodeMirror-gutter-elt", "left: " + d.gutterLeft[i] + "px; width: " + d.gutterWidth[i] + "px"))
                }
        }
    }
    function O(a, b) {
        a.alignable && (a.alignable = null);
        for (var c, d = a.node.firstChild; d; d = c) {
            var c = d.nextSibling;
            "CodeMirror-linewidget" == d.className && a.node.removeChild(d)
        }
        Q(a, b)
    }
    function P(a, b, c, d) {
        var e = K(a, b);
        return b.text = b.node = e.pre,
        e.bgClass && (b.bgClass = e.bgClass),
        e.textClass && (b.textClass = e.textClass),
        M(b),
        N(a, b, c, d),
        Q(b, d),
        b.node
    }
    function Q(a, b) {
        if (R(a.line, a, b, !0),
        a.rest)
            for (var c = 0; c < a.rest.length; c++)
                R(a.rest[c], a, b, !1)
    }
    function R(a, b, c, d) {
        if (a.widgets)
            for (var e = I(b), f = 0, g = a.widgets; f < g.length; ++f) {
                var h = g[f]
                  , i = te("div", [h.node], "CodeMirror-linewidget");
                h.handleMouseEvents || (i.ignoreEvents = !0),
                S(h, i, b, c),
                d && h.above ? e.insertBefore(i, b.gutter || b.text) : e.appendChild(i),
                be(h, "redraw")
            }
    }
    function S(a, b, c, d) {
        if (a.noHScroll) {
            (c.alignable || (c.alignable = [])).push(b);
            var e = d.wrapperWidth;
            b.style.left = d.fixedPos + "px",
            a.coverGutter || (e -= d.gutterTotalWidth,
            b.style.paddingLeft = d.gutterTotalWidth + "px"),
            b.style.width = e + "px"
        }
        a.coverGutter && (b.style.zIndex = 5,
        b.style.position = "relative",
        a.noHScroll || (b.style.marginLeft = -d.gutterTotalWidth + "px"))
    }
    function T(a) {
        return qf(a.line, a.ch)
    }
    function U(a, b) {
        return rf(a, b) < 0 ? b : a
    }
    function V(a, b) {
        return rf(a, b) < 0 ? a : b
    }
    function W(a, b) {
        this.ranges = a,
        this.primIndex = b
    }
    function X(a, b) {
        this.anchor = a,
        this.head = b
    }
    function Y(a, b) {
        var c = a[b];
        a.sort(function(a, b) {
            return rf(a.from(), b.from())
        }),
        b = le(a, c);
        for (var d = 1; d < a.length; d++) {
            var e = a[d]
              , f = a[d - 1];
            if (rf(f.to(), e.from()) >= 0) {
                var g = V(f.from(), e.from())
                  , h = U(f.to(), e.to())
                  , i = f.empty() ? e.from() == e.head : f.from() == f.head;
                b >= d && --b,
                a.splice(--d, 2, new X(i ? h : g,i ? g : h))
            }
        }
        return new W(a,b)
    }
    function Z(a, b) {
        return new W([new X(a,b || a)],0)
    }
    function $(a, b) {
        return Math.max(a.first, Math.min(b, a.first + a.size - 1))
    }
    function _(a, b) {
        if (b.line < a.first)
            return qf(a.first, 0);
        var c = a.first + a.size - 1;
        return b.line > c ? qf(c, Dd(a, c).text.length) : aa(b, Dd(a, b.line).text.length)
    }
    function aa(a, b) {
        var c = a.ch;
        return null == c || c > b ? qf(a.line, b) : 0 > c ? qf(a.line, 0) : a
    }
    function ba(a, b) {
        return b >= a.first && b < a.first + a.size
    }
    function ca(a, b) {
        for (var c = [], d = 0; d < b.length; d++)
            c[d] = _(a, b[d]);
        return c
    }
    function da(a, b, c, d) {
        if (a.cm && a.cm.display.shift || a.extend) {
            var e = b.anchor;
            if (d) {
                var f = rf(c, e) < 0;
                f != rf(d, e) < 0 ? (e = c,
                c = d) : f != rf(c, d) < 0 && (c = d)
            }
            return new X(e,c)
        }
        return new X(d || c,c)
    }
    function ea(a, b, c, d) {
        ka(a, new W([da(a, a.sel.primary(), b, c)],0), d)
    }
    function fa(a, b, c) {
        for (var d = [], e = 0; e < a.sel.ranges.length; e++)
            d[e] = da(a, a.sel.ranges[e], b[e], null);
        var f = Y(d, a.sel.primIndex);
        ka(a, f, c)
    }
    function ga(a, b, c, d) {
        var e = a.sel.ranges.slice(0);
        e[b] = c,
        ka(a, Y(e, a.sel.primIndex), d)
    }
    function ha(a, b, c, d) {
        ka(a, Z(b, c), d)
    }
    function ia(a, b) {
        var c = {
            ranges: b.ranges,
            update: function(b) {
                this.ranges = [];
                for (var c = 0; c < b.length; c++)
                    this.ranges[c] = new X(_(a, b[c].anchor),_(a, b[c].head))
            }
        };
        return jg(a, "beforeSelectionChange", a, c),
        a.cm && jg(a.cm, "beforeSelectionChange", a.cm, c),
        c.ranges != b.ranges ? Y(c.ranges, c.ranges.length - 1) : b
    }
    function ja(a, b, c) {
        var d = a.history.done
          , e = ke(d);
        e && e.ranges ? (d[d.length - 1] = b,
        la(a, b, c)) : ka(a, b, c)
    }
    function ka(a, b, c) {
        la(a, b, c),
        Rd(a, a.sel, a.cm ? a.cm.curOp.id : NaN, c)
    }
    function la(a, b, c) {
        (fe(a, "beforeSelectionChange") || a.cm && fe(a.cm, "beforeSelectionChange")) && (b = ia(a, b));
        var d = c && c.bias || (rf(b.primary().head, a.sel.primary().head) < 0 ? -1 : 1);
        ma(a, oa(a, b, d, !0)),
        c && c.scroll === !1 || !a.cm || rc(a.cm)
    }
    function ma(a, b) {
        b.equals(a.sel) || (a.sel = b,
        a.cm && (a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = !0,
        ee(a.cm)),
        be(a, "cursorActivity", a))
    }
    function na(a) {
        ma(a, oa(a, a.sel, null, !1), ng)
    }
    function oa(a, b, c, d) {
        for (var e, f = 0; f < b.ranges.length; f++) {
            var g = b.ranges[f]
              , h = pa(a, g.anchor, c, d)
              , i = pa(a, g.head, c, d);
            (e || h != g.anchor || i != g.head) && (e || (e = b.ranges.slice(0, f)),
            e[f] = new X(h,i))
        }
        return e ? Y(e, b.primIndex) : b
    }
    function pa(a, b, c, d) {
        var e = !1
          , f = b
          , g = c || 1;
        a.cantEdit = !1;
        a: for (; ; ) {
            var h = Dd(a, f.line);
            if (h.markedSpans)
                for (var i = 0; i < h.markedSpans.length; ++i) {
                    var j = h.markedSpans[i]
                      , k = j.marker;
                    if ((null == j.from || (k.inclusiveLeft ? j.from <= f.ch : j.from < f.ch)) && (null == j.to || (k.inclusiveRight ? j.to >= f.ch : j.to > f.ch))) {
                        if (d && (jg(k, "beforeCursorEnter"),
                        k.explicitlyCleared)) {
                            if (h.markedSpans) {
                                --i;
                                continue
                            }
                            break
                        }
                        if (!k.atomic)
                            continue;
                        var l = k.find(0 > g ? -1 : 1);
                        if (0 == rf(l, f) && (l.ch += g,
                        l.ch < 0 ? l = l.line > a.first ? _(a, qf(l.line - 1)) : null : l.ch > h.text.length && (l = l.line < a.first + a.size - 1 ? qf(l.line + 1, 0) : null),
                        !l)) {
                            if (e)
                                return d ? (a.cantEdit = !0,
                                qf(a.first, 0)) : pa(a, b, c, !0);
                            e = !0,
                            l = b,
                            g = -g
                        }
                        f = l;
                        continue a
                    }
                }
            return f
        }
    }
    function qa(a) {
        for (var b = a.display, c = a.doc, d = {}, e = d.cursors = document.createDocumentFragment(), f = d.selection = document.createDocumentFragment(), g = 0; g < c.sel.ranges.length; g++) {
            var h = c.sel.ranges[g]
              , i = h.empty();
            (i || a.options.showCursorWhenSelecting) && sa(a, h, e),
            i || ta(a, h, f)
        }
        if (a.options.moveInputWithCursor) {
            var j = Ta(a, c.sel.primary().head, "div")
              , k = b.wrapper.getBoundingClientRect()
              , l = b.lineDiv.getBoundingClientRect();
            d.teTop = Math.max(0, Math.min(b.wrapper.clientHeight - 10, j.top + l.top - k.top)),
            d.teLeft = Math.max(0, Math.min(b.wrapper.clientWidth - 10, j.left + l.left - k.left))
        }
        return d
    }
    function ra(a, b) {
        b || (b = qa(a)),
        ve(a.display.cursorDiv, b.cursors),
        ve(a.display.selectionDiv, b.selection),
        null != b.teTop && (a.display.inputDiv.style.top = b.teTop + "px",
        a.display.inputDiv.style.left = b.teLeft + "px")
    }
    function sa(a, b, c) {
        var d = Ta(a, b.head, "div", null, null, !a.options.singleCursorHeightPerLine)
          , e = c.appendChild(te("div", " ", "CodeMirror-cursor"));
        if (e.style.left = d.left + "px",
        e.style.top = d.top + "px",
        e.style.height = Math.max(0, d.bottom - d.top) * a.options.cursorHeight + "px",
        d.other) {
            var f = c.appendChild(te("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
            f.style.display = "",
            f.style.left = d.other.left + "px",
            f.style.top = d.other.top + "px",
            f.style.height = .85 * (d.other.bottom - d.other.top) + "px"
        }
    }
    function ta(a, b, c) {
        function d(a, b, c, d) {
            0 > b && (b = 0),
            b = Math.round(b),
            d = Math.round(d),
            h.appendChild(te("div", null, "CodeMirror-selected", "position: absolute; left: " + a + "px; top: " + b + "px; width: " + (null == c ? k - a : c) + "px; height: " + (d - b) + "px"))
        }
        function e(b, c, e) {
            function f(c, d) {
                return Sa(a, qf(b, c), "div", l, d)
            }
            var h, i, l = Dd(g, b), m = l.text.length;
            return Je(Kd(l), c || 0, null == e ? m : e, function(a, b, g) {
                var l, n, o, p = f(a, "left");
                if (a == b)
                    l = p,
                    n = o = p.left;
                else {
                    if (l = f(b - 1, "right"),
                    "rtl" == g) {
                        var q = p;
                        p = l,
                        l = q
                    }
                    n = p.left,
                    o = l.right
                }
                null == c && 0 == a && (n = j),
                l.top - p.top > 3 && (d(n, p.top, null, p.bottom),
                n = j,
                p.bottom < l.top && d(n, p.bottom, null, l.top)),
                null == e && b == m && (o = k),
                (!h || p.top < h.top || p.top == h.top && p.left < h.left) && (h = p),
                (!i || l.bottom > i.bottom || l.bottom == i.bottom && l.right > i.right) && (i = l),
                j + 1 > n && (n = j),
                d(n, l.top, o - n, l.bottom)
            }),
            {
                start: h,
                end: i
            }
        }
        var f = a.display
          , g = a.doc
          , h = document.createDocumentFragment()
          , i = Ba(a.display)
          , j = i.left
          , k = f.lineSpace.offsetWidth - i.right
          , l = b.from()
          , m = b.to();
        if (l.line == m.line)
            e(l.line, l.ch, m.ch);
        else {
            var n = Dd(g, l.line)
              , o = Dd(g, m.line)
              , p = Zc(n) == Zc(o)
              , q = e(l.line, l.ch, p ? n.text.length + 1 : null).end
              , r = e(m.line, p ? 0 : null, m.ch).start;
            p && (q.top < r.top - 2 ? (d(q.right, q.top, null, q.bottom),
            d(j, r.top, r.left, r.bottom)) : d(q.right, q.top, r.left - q.right, q.bottom)),
            q.bottom < r.top && d(j, q.bottom, null, r.top)
        }
        c.appendChild(h)
    }
    function ua(a) {
        if (a.state.focused) {
            var b = a.display;
            clearInterval(b.blinker);
            var c = !0;
            b.cursorDiv.style.visibility = "",
            a.options.cursorBlinkRate > 0 ? b.blinker = setInterval(function() {
                b.cursorDiv.style.visibility = (c = !c) ? "" : "hidden"
            }, a.options.cursorBlinkRate) : a.options.cursorBlinkRate < 0 && (b.cursorDiv.style.visibility = "hidden")
        }
    }
    function va(a, b) {
        a.doc.mode.startState && a.doc.frontier < a.display.viewTo && a.state.highlight.set(b, pe(wa, a))
    }
    function wa(a) {
        var b = a.doc;
        if (b.frontier < b.first && (b.frontier = b.first),
        !(b.frontier >= a.display.viewTo)) {
            var c = +new Date + a.options.workTime
              , d = Nf(b.mode, ya(a, b.frontier))
              , e = [];
            b.iter(b.frontier, Math.min(b.first + b.size, a.display.viewTo + 500), function(f) {
                if (b.frontier >= a.display.viewFrom) {
                    var g = f.styles
                      , h = md(a, f, d, !0);
                    f.styles = h.styles;
                    var i = f.styleClasses
                      , j = h.classes;
                    j ? f.styleClasses = j : i && (f.styleClasses = null);
                    for (var k = !g || g.length != f.styles.length || i != j && (!i || !j || i.bgClass != j.bgClass || i.textClass != j.textClass), l = 0; !k && l < g.length; ++l)
                        k = g[l] != f.styles[l];
                    k && e.push(b.frontier),
                    f.stateAfter = Nf(b.mode, d)
                } else
                    od(a, f.text, d),
                    f.stateAfter = b.frontier % 5 == 0 ? Nf(b.mode, d) : null;
                return ++b.frontier,
                +new Date > c ? (va(a, a.options.workDelay),
                !0) : void 0
            }),
            e.length && hb(a, function() {
                for (var b = 0; b < e.length; b++)
                    ob(a, e[b], "text")
            })
        }
    }
    function xa(a, b, c) {
        for (var d, e, f = a.doc, g = c ? -1 : b - (a.doc.mode.innerMode ? 1e3 : 100), h = b; h > g; --h) {
            if (h <= f.first)
                return f.first;
            var i = Dd(f, h - 1);
            if (i.stateAfter && (!c || h <= f.frontier))
                return h;
            var j = qg(i.text, null, a.options.tabSize);
            (null == e || d > j) && (e = h - 1,
            d = j)
        }
        return e
    }
    function ya(a, b, c) {
        var d = a.doc
          , e = a.display;
        if (!d.mode.startState)
            return !0;
        var f = xa(a, b, c)
          , g = f > d.first && Dd(d, f - 1).stateAfter;
        return g = g ? Nf(d.mode, g) : Of(d.mode),
        d.iter(f, b, function(c) {
            od(a, c.text, g);
            var h = f == b - 1 || f % 5 == 0 || f >= e.viewFrom && f < e.viewTo;
            c.stateAfter = h ? Nf(d.mode, g) : null,
            ++f
        }),
        c && (d.frontier = f),
        g
    }
    function za(a) {
        return a.lineSpace.offsetTop
    }
    function Aa(a) {
        return a.mover.offsetHeight - a.lineSpace.offsetHeight
    }
    function Ba(a) {
        if (a.cachedPaddingH)
            return a.cachedPaddingH;
        var b = ve(a.measure, te("pre", "x"))
          , c = window.getComputedStyle ? window.getComputedStyle(b) : b.currentStyle
          , d = {
            left: parseInt(c.paddingLeft),
            right: parseInt(c.paddingRight)
        };
        return isNaN(d.left) || isNaN(d.right) || (a.cachedPaddingH = d),
        d
    }
    function Ca(a, b, c) {
        var d = a.options.lineWrapping
          , e = d && a.display.scroller.clientWidth;
        if (!b.measure.heights || d && b.measure.width != e) {
            var f = b.measure.heights = [];
            if (d) {
                b.measure.width = e;
                for (var g = b.text.firstChild.getClientRects(), h = 0; h < g.length - 1; h++) {
                    var i = g[h]
                      , j = g[h + 1];
                    Math.abs(i.bottom - j.bottom) > 2 && f.push((i.bottom + j.top) / 2 - c.top)
                }
            }
            f.push(c.bottom - c.top)
        }
    }
    function Da(a, b, c) {
        if (a.line == b)
            return {
                map: a.measure.map,
                cache: a.measure.cache
            };
        for (var d = 0; d < a.rest.length; d++)
            if (a.rest[d] == b)
                return {
                    map: a.measure.maps[d],
                    cache: a.measure.caches[d]
                };
        for (var d = 0; d < a.rest.length; d++)
            if (Hd(a.rest[d]) > c)
                return {
                    map: a.measure.maps[d],
                    cache: a.measure.caches[d],
                    before: !0
                }
    }
    function Ea(a, b) {
        b = Zc(b);
        var c = Hd(b)
          , d = a.display.externalMeasured = new lb(a.doc,b,c);
        d.lineN = c;
        var e = d.built = qd(a, d);
        return d.text = e.pre,
        ve(a.display.lineMeasure, e.pre),
        d
    }
    function Fa(a, b, c, d) {
        return Ia(a, Ha(a, b), c, d)
    }
    function Ga(a, b) {
        if (b >= a.display.viewFrom && b < a.display.viewTo)
            return a.display.view[qb(a, b)];
        var c = a.display.externalMeasured;
        return c && b >= c.lineN && b < c.lineN + c.size ? c : void 0
    }
    function Ha(a, b) {
        var c = Hd(b)
          , d = Ga(a, c);
        d && !d.text ? d = null : d && d.changes && H(a, d, c, F(a)),
        d || (d = Ea(a, b));
        var e = Da(d, b, c);
        return {
            line: b,
            view: d,
            rect: null,
            map: e.map,
            cache: e.cache,
            before: e.before,
            hasHeights: !1
        }
    }
    function Ia(a, b, c, d, e) {
        b.before && (c = -1);
        var f, g = c + (d || "");
        return b.cache.hasOwnProperty(g) ? f = b.cache[g] : (b.rect || (b.rect = b.view.text.getBoundingClientRect()),
        b.hasHeights || (Ca(a, b.view, b.rect),
        b.hasHeights = !0),
        f = Ja(a, b, c, d),
        f.bogus || (b.cache[g] = f)),
        {
            left: f.left,
            right: f.right,
            top: e ? f.rtop : f.top,
            bottom: e ? f.rbottom : f.bottom
        }
    }
    function Ja(a, b, c, d) {
        for (var e, f, g, h, i = b.map, j = 0; j < i.length; j += 3) {
            var k = i[j]
              , l = i[j + 1];
            if (k > c ? (f = 0,
            g = 1,
            h = "left") : l > c ? (f = c - k,
            g = f + 1) : (j == i.length - 3 || c == l && i[j + 3] > c) && (g = l - k,
            f = g - 1,
            c >= l && (h = "right")),
            null != f) {
                if (e = i[j + 2],
                k == l && d == (e.insertLeft ? "left" : "right") && (h = d),
                "left" == d && 0 == f)
                    for (; j && i[j - 2] == i[j - 3] && i[j - 1].insertLeft; )
                        e = i[(j -= 3) + 2],
                        h = "left";
                if ("right" == d && f == l - k)
                    for (; j < i.length - 3 && i[j + 3] == i[j + 4] && !i[j + 5].insertLeft; )
                        e = i[(j += 3) + 2],
                        h = "right";
                break
            }
        }
        var m;
        if (3 == e.nodeType) {
            for (; f && se(b.line.text.charAt(k + f)); )
                --f;
            for (; l > k + g && se(b.line.text.charAt(k + g)); )
                ++g;
            if (Ye && 9 > Ze && 0 == f && g == l - k)
                m = e.parentNode.getBoundingClientRect();
            else if (Ye && a.options.lineWrapping) {
                var n = tg(e, f, g).getClientRects();
                m = n.length ? n["right" == d ? n.length - 1 : 0] : vf
            } else
                m = tg(e, f, g).getBoundingClientRect() || vf
        } else {
            f > 0 && (h = d = "right");
            var n;
            m = a.options.lineWrapping && (n = e.getClientRects()).length > 1 ? n["right" == d ? n.length - 1 : 0] : e.getBoundingClientRect()
        }
        if (Ye && 9 > Ze && !f && (!m || !m.left && !m.right)) {
            var o = e.parentNode.getClientRects()[0];
            m = o ? {
                left: o.left,
                right: o.left + Za(a.display),
                top: o.top,
                bottom: o.bottom
            } : vf
        }
        Ye && 11 > Ze && (m = Ka(a.display.measure, m));
        for (var p = m.top - b.rect.top, q = m.bottom - b.rect.top, r = (p + q) / 2, s = b.view.measure.heights, j = 0; j < s.length - 1 && !(r < s[j]); j++)
            ;
        var t = j ? s[j - 1] : 0
          , u = s[j]
          , v = {
            left: ("right" == h ? m.right : m.left) - b.rect.left,
            right: ("left" == h ? m.left : m.right) - b.rect.left,
            top: t,
            bottom: u
        };
        return m.left || m.right || (v.bogus = !0),
        a.options.singleCursorHeightPerLine || (v.rtop = p,
        v.rbottom = q),
        v
    }
    function Ka(a, b) {
        if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Ie(a))
            return b;
        var c = screen.logicalXDPI / screen.deviceXDPI
          , d = screen.logicalYDPI / screen.deviceYDPI;
        return {
            left: b.left * c,
            right: b.right * c,
            top: b.top * d,
            bottom: b.bottom * d
        }
    }
    function La(a) {
        if (a.measure && (a.measure.cache = {},
        a.measure.heights = null,
        a.rest))
            for (var b = 0; b < a.rest.length; b++)
                a.measure.caches[b] = {}
    }
    function Ma(a) {
        a.display.externalMeasure = null,
        ue(a.display.lineMeasure);
        for (var b = 0; b < a.display.view.length; b++)
            La(a.display.view[b])
    }
    function Na(a) {
        Ma(a),
        a.display.cachedCharWidth = a.display.cachedTextHeight = a.display.cachedPaddingH = null,
        a.options.lineWrapping || (a.display.maxLineChanged = !0),
        a.display.lineNumChars = null
    }
    function Oa() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }
    function Pa() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
    }
    function Qa(a, b, c, d) {
        if (b.widgets)
            for (var e = 0; e < b.widgets.length; ++e)
                if (b.widgets[e].above) {
                    var f = ed(b.widgets[e]);
                    c.top += f,
                    c.bottom += f
                }
        if ("line" == d)
            return c;
        d || (d = "local");
        var g = Jd(b);
        if ("local" == d ? g += za(a.display) : g -= a.display.viewOffset,
        "page" == d || "window" == d) {
            var h = a.display.lineSpace.getBoundingClientRect();
            g += h.top + ("window" == d ? 0 : Pa());
            var i = h.left + ("window" == d ? 0 : Oa());
            c.left += i,
            c.right += i
        }
        return c.top += g,
        c.bottom += g,
        c
    }
    function Ra(a, b, c) {
        if ("div" == c)
            return b;
        var d = b.left
          , e = b.top;
        if ("page" == c)
            d -= Oa(),
            e -= Pa();
        else if ("local" == c || !c) {
            var f = a.display.sizer.getBoundingClientRect();
            d += f.left,
            e += f.top
        }
        var g = a.display.lineSpace.getBoundingClientRect();
        return {
            left: d - g.left,
            top: e - g.top
        }
    }
    function Sa(a, b, c, d, e) {
        return d || (d = Dd(a.doc, b.line)),
        Qa(a, d, Fa(a, d, b.ch, e), c)
    }
    function Ta(a, b, c, d, e, f) {
        function g(b, g) {
            var h = Ia(a, e, b, g ? "right" : "left", f);
            return g ? h.left = h.right : h.right = h.left,
            Qa(a, d, h, c)
        }
        function h(a, b) {
            var c = i[b]
              , d = c.level % 2;
            return a == Ke(c) && b && c.level < i[b - 1].level ? (c = i[--b],
            a = Le(c) - (c.level % 2 ? 0 : 1),
            d = !0) : a == Le(c) && b < i.length - 1 && c.level < i[b + 1].level && (c = i[++b],
            a = Ke(c) - c.level % 2,
            d = !1),
            d && a == c.to && a > c.from ? g(a - 1) : g(a, d)
        }
        d = d || Dd(a.doc, b.line),
        e || (e = Ha(a, d));
        var i = Kd(d)
          , j = b.ch;
        if (!i)
            return g(j);
        var k = Re(i, j)
          , l = h(j, k);
        return null != Hg && (l.other = h(j, Hg)),
        l
    }
    function Ua(a, b) {
        var c = 0
          , b = _(a.doc, b);
        a.options.lineWrapping || (c = Za(a.display) * b.ch);
        var d = Dd(a.doc, b.line)
          , e = Jd(d) + za(a.display);
        return {
            left: c,
            right: c,
            top: e,
            bottom: e + d.height
        }
    }
    function Va(a, b, c, d) {
        var e = qf(a, b);
        return e.xRel = d,
        c && (e.outside = !0),
        e
    }
    function Wa(a, b, c) {
        var d = a.doc;
        if (c += a.display.viewOffset,
        0 > c)
            return Va(d.first, 0, !0, -1);
        var e = Id(d, c)
          , f = d.first + d.size - 1;
        if (e > f)
            return Va(d.first + d.size - 1, Dd(d, f).text.length, !0, 1);
        0 > b && (b = 0);
        for (var g = Dd(d, e); ; ) {
            var h = Xa(a, g, e, b, c)
              , i = Xc(g)
              , j = i && i.find(0, !0);
            if (!i || !(h.ch > j.from.ch || h.ch == j.from.ch && h.xRel > 0))
                return h;
            e = Hd(g = j.to.line)
        }
    }
    function Xa(a, b, c, d, e) {
        function f(d) {
            var e = Ta(a, qf(c, d), "line", b, j);
            return h = !0,
            g > e.bottom ? e.left - i : g < e.top ? e.left + i : (h = !1,
            e.left)
        }
        var g = e - Jd(b)
          , h = !1
          , i = 2 * a.display.wrapper.clientWidth
          , j = Ha(a, b)
          , k = Kd(b)
          , l = b.text.length
          , m = Me(b)
          , n = Ne(b)
          , o = f(m)
          , p = h
          , q = f(n)
          , r = h;
        if (d > q)
            return Va(c, n, r, 1);
        for (; ; ) {
            if (k ? n == m || n == Te(b, m, 1) : 1 >= n - m) {
                for (var s = o > d || q - d >= d - o ? m : n, t = d - (s == m ? o : q); se(b.text.charAt(s)); )
                    ++s;
                var u = Va(c, s, s == m ? p : r, -1 > t ? -1 : t > 1 ? 1 : 0);
                return u
            }
            var v = Math.ceil(l / 2)
              , w = m + v;
            if (k) {
                w = m;
                for (var x = 0; v > x; ++x)
                    w = Te(b, w, 1)
            }
            var y = f(w);
            y > d ? (n = w,
            q = y,
            (r = h) && (q += 1e3),
            l = v) : (m = w,
            o = y,
            p = h,
            l -= v)
        }
    }
    function Ya(a) {
        if (null != a.cachedTextHeight)
            return a.cachedTextHeight;
        if (null == sf) {
            sf = te("pre");
            for (var b = 0; 49 > b; ++b)
                sf.appendChild(document.createTextNode("x")),
                sf.appendChild(te("br"));
            sf.appendChild(document.createTextNode("x"))
        }
        ve(a.measure, sf);
        var c = sf.offsetHeight / 50;
        return c > 3 && (a.cachedTextHeight = c),
        ue(a.measure),
        c || 1
    }
    function Za(a) {
        if (null != a.cachedCharWidth)
            return a.cachedCharWidth;
        var b = te("span", "xxxxxxxxxx")
          , c = te("pre", [b]);
        ve(a.measure, c);
        var d = b.getBoundingClientRect()
          , e = (d.right - d.left) / 10;
        return e > 2 && (a.cachedCharWidth = e),
        e || 10
    }
    function $a(a) {
        a.curOp = {
            cm: a,
            viewChanged: !1,
            startHeight: a.doc.height,
            forceUpdate: !1,
            updateInput: null,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            id: ++xf
        },
        wf ? wf.ops.push(a.curOp) : a.curOp.ownsGroup = wf = {
            ops: [a.curOp],
            delayedCallbacks: []
        }
    }
    function _a(a) {
        var b = a.delayedCallbacks
          , c = 0;
        do {
            for (; c < b.length; c++)
                b[c]();
            for (var d = 0; d < a.ops.length; d++) {
                var e = a.ops[d];
                if (e.cursorActivityHandlers)
                    for (; e.cursorActivityCalled < e.cursorActivityHandlers.length; )
                        e.cursorActivityHandlers[e.cursorActivityCalled++](e.cm)
            }
        } while (c < b.length)
    }
    function ab(a) {
        var b = a.curOp
          , c = b.ownsGroup;
        if (c)
            try {
                _a(c)
            } finally {
                wf = null;
                for (var d = 0; d < c.ops.length; d++)
                    c.ops[d].cm.curOp = null;
                bb(c)
            }
    }
    function bb(a) {
        for (var b = a.ops, c = 0; c < b.length; c++)
            cb(b[c]);
        for (var c = 0; c < b.length; c++)
            db(b[c]);
        for (var c = 0; c < b.length; c++)
            eb(b[c]);
        for (var c = 0; c < b.length; c++)
            fb(b[c]);
        for (var c = 0; c < b.length; c++)
            gb(b[c])
    }
    function cb(a) {
        var b = a.cm
          , c = b.display;
        a.updateMaxLine && n(b),
        a.mustUpdate = a.viewChanged || a.forceUpdate || null != a.scrollTop || a.scrollToPos && (a.scrollToPos.from.line < c.viewFrom || a.scrollToPos.to.line >= c.viewTo) || c.maxLineChanged && b.options.lineWrapping,
        a.update = a.mustUpdate && new x(b,a.mustUpdate && {
            top: a.scrollTop,
            ensure: a.scrollToPos
        },a.forceUpdate)
    }
    function db(a) {
        a.updatedDisplay = a.mustUpdate && y(a.cm, a.update)
    }
    function eb(a) {
        var b = a.cm
          , c = b.display;
        a.updatedDisplay && D(b),
        c.maxLineChanged && !b.options.lineWrapping && (a.adjustWidthTo = Fa(b, c.maxLine, c.maxLine.text.length).left,
        a.maxScrollLeft = Math.max(0, c.sizer.offsetLeft + a.adjustWidthTo + lg - c.scroller.clientWidth)),
        a.barMeasure = q(b),
        (a.updatedDisplay || a.selectionChanged) && (a.newSelectionNodes = qa(b))
    }
    function fb(a) {
        var b = a.cm;
        null != a.adjustWidthTo && (b.display.sizer.style.minWidth = a.adjustWidthTo + "px",
        a.maxScrollLeft < b.doc.scrollLeft && Ob(b, Math.min(b.display.scroller.scrollLeft, a.maxScrollLeft), !0)),
        a.newSelectionNodes && ra(b, a.newSelectionNodes),
        a.updatedDisplay && B(b, a.barMeasure),
        (a.updatedDisplay || a.startHeight != b.doc.height) && r(b, a.barMeasure),
        a.selectionChanged && ua(b),
        b.state.focused && a.updateInput && xb(b, a.typing)
    }
    function gb(a) {
        var b = a.cm
          , c = b.display
          , d = b.doc;
        if (a.updatedDisplay && z(b, a.update),
        null == c.wheelStartX || null == a.scrollTop && null == a.scrollLeft && !a.scrollToPos || (c.wheelStartX = c.wheelStartY = null),
        null != a.scrollTop && c.scroller.scrollTop != a.scrollTop) {
            var e = Math.max(0, Math.min(c.scroller.scrollHeight - c.scroller.clientHeight, a.scrollTop));
            c.scroller.scrollTop = c.scrollbarV.scrollTop = d.scrollTop = e
        }
        if (null != a.scrollLeft && c.scroller.scrollLeft != a.scrollLeft) {
            var f = Math.max(0, Math.min(c.scroller.scrollWidth - c.scroller.clientWidth, a.scrollLeft));
            c.scroller.scrollLeft = c.scrollbarH.scrollLeft = d.scrollLeft = f,
            t(b)
        }
        if (a.scrollToPos) {
            var g = nc(b, _(d, a.scrollToPos.from), _(d, a.scrollToPos.to), a.scrollToPos.margin);
            a.scrollToPos.isCursor && b.state.focused && mc(b, g)
        }
        var h = a.maybeHiddenMarkers
          , i = a.maybeUnhiddenMarkers;
        if (h)
            for (var j = 0; j < h.length; ++j)
                h[j].lines.length || jg(h[j], "hide");
        if (i)
            for (var j = 0; j < i.length; ++j)
                i[j].lines.length && jg(i[j], "unhide");
        c.wrapper.offsetHeight && (d.scrollTop = b.display.scroller.scrollTop),
        a.updatedDisplay && $e && (b.options.lineWrapping && C(b, a.barMeasure),
        a.barMeasure.scrollWidth > a.barMeasure.clientWidth && a.barMeasure.scrollWidth < a.barMeasure.clientWidth + 1 && !p(b) && r(b)),
        a.changeObjs && jg(b, "changes", b, a.changeObjs)
    }
    function hb(a, b) {
        if (a.curOp)
            return b();
        $a(a);
        try {
            return b()
        } finally {
            ab(a)
        }
    }
    function ib(a, b) {
        return function() {
            if (a.curOp)
                return b.apply(a, arguments);
            $a(a);
            try {
                return b.apply(a, arguments)
            } finally {
                ab(a)
            }
        }
    }
    function jb(a) {
        return function() {
            if (this.curOp)
                return a.apply(this, arguments);
            $a(this);
            try {
                return a.apply(this, arguments)
            } finally {
                ab(this)
            }
        }
    }
    function kb(a) {
        return function() {
            var b = this.cm;
            if (!b || b.curOp)
                return a.apply(this, arguments);
            $a(b);
            try {
                return a.apply(this, arguments)
            } finally {
                ab(b)
            }
        }
    }
    function lb(a, b, c) {
        this.line = b,
        this.rest = $c(b),
        this.size = this.rest ? Hd(ke(this.rest)) - c + 1 : 1,
        this.node = this.text = null,
        this.hidden = bd(a, b)
    }
    function mb(a, b, c) {
        for (var d, e = [], f = b; c > f; f = d) {
            var g = new lb(a.doc,Dd(a.doc, f),f);
            d = f + g.size,
            e.push(g)
        }
        return e
    }
    function nb(a, b, c, d) {
        null == b && (b = a.doc.first),
        null == c && (c = a.doc.first + a.doc.size),
        d || (d = 0);
        var e = a.display;
        if (d && c < e.viewTo && (null == e.updateLineNumbers || e.updateLineNumbers > b) && (e.updateLineNumbers = b),
        a.curOp.viewChanged = !0,
        b >= e.viewTo)
            pf && _c(a.doc, b) < e.viewTo && pb(a);
        else if (c <= e.viewFrom)
            pf && ad(a.doc, c + d) > e.viewFrom ? pb(a) : (e.viewFrom += d,
            e.viewTo += d);
        else if (b <= e.viewFrom && c >= e.viewTo)
            pb(a);
        else if (b <= e.viewFrom) {
            var f = rb(a, c, c + d, 1);
            f ? (e.view = e.view.slice(f.index),
            e.viewFrom = f.lineN,
            e.viewTo += d) : pb(a)
        } else if (c >= e.viewTo) {
            var f = rb(a, b, b, -1);
            f ? (e.view = e.view.slice(0, f.index),
            e.viewTo = f.lineN) : pb(a)
        } else {
            var g = rb(a, b, b, -1)
              , h = rb(a, c, c + d, 1);
            g && h ? (e.view = e.view.slice(0, g.index).concat(mb(a, g.lineN, h.lineN)).concat(e.view.slice(h.index)),
            e.viewTo += d) : pb(a)
        }
        var i = e.externalMeasured;
        i && (c < i.lineN ? i.lineN += d : b < i.lineN + i.size && (e.externalMeasured = null))
    }
    function ob(a, b, c) {
        a.curOp.viewChanged = !0;
        var d = a.display
          , e = a.display.externalMeasured;
        if (e && b >= e.lineN && b < e.lineN + e.size && (d.externalMeasured = null),
        !(b < d.viewFrom || b >= d.viewTo)) {
            var f = d.view[qb(a, b)];
            if (null != f.node) {
                var g = f.changes || (f.changes = []);
                -1 == le(g, c) && g.push(c)
            }
        }
    }
    function pb(a) {
        a.display.viewFrom = a.display.viewTo = a.doc.first,
        a.display.view = [],
        a.display.viewOffset = 0
    }
    function qb(a, b) {
        if (b >= a.display.viewTo)
            return null;
        if (b -= a.display.viewFrom,
        0 > b)
            return null;
        for (var c = a.display.view, d = 0; d < c.length; d++)
            if (b -= c[d].size,
            0 > b)
                return d
    }
    function rb(a, b, c, d) {
        var e, f = qb(a, b), g = a.display.view;
        if (!pf || c == a.doc.first + a.doc.size)
            return {
                index: f,
                lineN: c
            };
        for (var h = 0, i = a.display.viewFrom; f > h; h++)
            i += g[h].size;
        if (i != b) {
            if (d > 0) {
                if (f == g.length - 1)
                    return null;
                e = i + g[f].size - b,
                f++
            } else
                e = i - b;
            b += e,
            c += e
        }
        for (; _c(a.doc, c) != c; ) {
            if (f == (0 > d ? 0 : g.length - 1))
                return null;
            c += d * g[f - (0 > d ? 1 : 0)].size,
            f += d
        }
        return {
            index: f,
            lineN: c
        }
    }
    function sb(a, b, c) {
        var d = a.display
          , e = d.view;
        0 == e.length || b >= d.viewTo || c <= d.viewFrom ? (d.view = mb(a, b, c),
        d.viewFrom = b) : (d.viewFrom > b ? d.view = mb(a, b, d.viewFrom).concat(d.view) : d.viewFrom < b && (d.view = d.view.slice(qb(a, b))),
        d.viewFrom = b,
        d.viewTo < c ? d.view = d.view.concat(mb(a, d.viewTo, c)) : d.viewTo > c && (d.view = d.view.slice(0, qb(a, c)))),
        d.viewTo = c
    }
    function tb(a) {
        for (var b = a.display.view, c = 0, d = 0; d < b.length; d++) {
            var e = b[d];
            e.hidden || e.node && !e.changes || ++c
        }
        return c
    }
    function ub(a) {
        a.display.pollingFast || a.display.poll.set(a.options.pollInterval, function() {
            wb(a),
            a.state.focused && ub(a)
        })
    }
    function vb(a) {
        function b() {
            var d = wb(a);
            d || c ? (a.display.pollingFast = !1,
            ub(a)) : (c = !0,
            a.display.poll.set(60, b))
        }
        var c = !1;
        a.display.pollingFast = !0,
        a.display.poll.set(20, b)
    }
    function wb(a) {
        var b = a.display.input
          , c = a.display.prevInput
          , d = a.doc;
        if (!a.state.focused || Dg(b) && !c || Ab(a) || a.options.disableInput)
            return !1;
        a.state.pasteIncoming && a.state.fakedLastChar && (b.value = b.value.substring(0, b.value.length - 1),
        a.state.fakedLastChar = !1);
        var e = b.value;
        if (e == c && !a.somethingSelected())
            return !1;
        if (Ye && Ze >= 9 && a.display.inputHasSelection === e || jf && /[\uf700-\uf7ff]/.test(e))
            return xb(a),
            !1;
        var f = !a.curOp;
        f && $a(a),
        a.display.shift = !1,
        8203 != e.charCodeAt(0) || d.sel != a.display.selForContextMenu || c || (c = "​");
        for (var g = 0, h = Math.min(c.length, e.length); h > g && c.charCodeAt(g) == e.charCodeAt(g); )
            ++g;
        var i = e.slice(g)
          , j = Cg(i)
          , k = null;
        a.state.pasteIncoming && d.sel.ranges.length > 1 && (yf && yf.join("\n") == i ? k = d.sel.ranges.length % yf.length == 0 && me(yf, Cg) : j.length == d.sel.ranges.length && (k = me(j, function(a) {
            return [a]
        })));
        for (var l = d.sel.ranges.length - 1; l >= 0; l--) {
            var m = d.sel.ranges[l]
              , n = m.from()
              , o = m.to();
            g < c.length ? n = qf(n.line, n.ch - (c.length - g)) : a.state.overwrite && m.empty() && !a.state.pasteIncoming && (o = qf(o.line, Math.min(Dd(d, o.line).text.length, o.ch + ke(j).length)));
            var p = a.curOp.updateInput
              , q = {
                from: n,
                to: o,
                text: k ? k[l % k.length] : j,
                origin: a.state.pasteIncoming ? "paste" : a.state.cutIncoming ? "cut" : "+input"
            };
            if (fc(a.doc, q),
            be(a, "inputRead", a, q),
            i && !a.state.pasteIncoming && a.options.electricChars && a.options.smartIndent && m.head.ch < 100 && (!l || d.sel.ranges[l - 1].head.line != m.head.line)) {
                var r = a.getModeAt(m.head);
                if (r.electricChars) {
                    for (var s = 0; s < r.electricChars.length; s++)
                        if (i.indexOf(r.electricChars.charAt(s)) > -1) {
                            tc(a, m.head.line, "smart");
                            break
                        }
                } else if (r.electricInput) {
                    var t = Ef(q);
                    r.electricInput.test(Dd(d, t.line).text.slice(0, t.ch)) && tc(a, m.head.line, "smart")
                }
            }
        }
        return rc(a),
        a.curOp.updateInput = p,
        a.curOp.typing = !0,
        e.length > 1e3 || e.indexOf("\n") > -1 ? b.value = a.display.prevInput = "" : a.display.prevInput = e,
        f && ab(a),
        a.state.pasteIncoming = a.state.cutIncoming = !1,
        !0
    }
    function xb(a, b) {
        var c, d, e = a.doc;
        if (a.somethingSelected()) {
            a.display.prevInput = "";
            var f = e.sel.primary();
            c = Eg && (f.to().line - f.from().line > 100 || (d = a.getSelection()).length > 1e3);
            var g = c ? "-" : d || a.getSelection();
            a.display.input.value = g,
            a.state.focused && sg(a.display.input),
            Ye && Ze >= 9 && (a.display.inputHasSelection = g)
        } else
            b || (a.display.prevInput = a.display.input.value = "",
            Ye && Ze >= 9 && (a.display.inputHasSelection = null));
        a.display.inaccurateSelection = c
    }
    function yb(a) {
        "nocursor" == a.options.readOnly || hf && xe() == a.display.input || a.display.input.focus()
    }
    function zb(a) {
        a.state.focused || (yb(a),
        Yb(a))
    }
    function Ab(a) {
        return a.options.readOnly || a.doc.cantEdit
    }
    function Bb(a) {
        function b() {
            a.state.focused && setTimeout(pe(yb, a), 0)
        }
        function c(b) {
            de(a, b) || gg(b)
        }
        function d(b) {
            if (a.somethingSelected())
                yf = a.getSelections(),
                e.inaccurateSelection && (e.prevInput = "",
                e.inaccurateSelection = !1,
                e.input.value = yf.join("\n"),
                sg(e.input));
            else {
                for (var c = [], d = [], f = 0; f < a.doc.sel.ranges.length; f++) {
                    var g = a.doc.sel.ranges[f].head.line
                      , h = {
                        anchor: qf(g, 0),
                        head: qf(g + 1, 0)
                    };
                    d.push(h),
                    c.push(a.getRange(h.anchor, h.head))
                }
                "cut" == b.type ? a.setSelections(d, null, ng) : (e.prevInput = "",
                e.input.value = c.join("\n"),
                sg(e.input)),
                yf = c
            }
            "cut" == b.type && (a.state.cutIncoming = !0)
        }
        var e = a.display;
        hg(e.scroller, "mousedown", ib(a, Fb)),
        Ye && 11 > Ze ? hg(e.scroller, "dblclick", ib(a, function(b) {
            if (!de(a, b)) {
                var c = Eb(a, b);
                if (c && !Kb(a, b) && !Db(a.display, b)) {
                    eg(b);
                    var d = yc(a, c);
                    ea(a.doc, d.anchor, d.head)
                }
            }
        })) : hg(e.scroller, "dblclick", function(b) {
            de(a, b) || eg(b)
        }),
        hg(e.lineSpace, "selectstart", function(a) {
            Db(e, a) || eg(a)
        }),
        nf || hg(e.scroller, "contextmenu", function(b) {
            $b(a, b)
        }),
        hg(e.scroller, "scroll", function() {
            e.scroller.clientHeight && (Nb(a, e.scroller.scrollTop),
            Ob(a, e.scroller.scrollLeft, !0),
            jg(a, "scroll", a))
        }),
        hg(e.scrollbarV, "scroll", function() {
            e.scroller.clientHeight && Nb(a, e.scrollbarV.scrollTop)
        }),
        hg(e.scrollbarH, "scroll", function() {
            e.scroller.clientHeight && Ob(a, e.scrollbarH.scrollLeft)
        }),
        hg(e.scroller, "mousewheel", function(b) {
            Pb(a, b)
        }),
        hg(e.scroller, "DOMMouseScroll", function(b) {
            Pb(a, b)
        }),
        hg(e.scrollbarH, "mousedown", b),
        hg(e.scrollbarV, "mousedown", b),
        hg(e.wrapper, "scroll", function() {
            e.wrapper.scrollTop = e.wrapper.scrollLeft = 0
        }),
        hg(e.input, "keyup", function(b) {
            Wb.call(a, b)
        }),
        hg(e.input, "input", function() {
            Ye && Ze >= 9 && a.display.inputHasSelection && (a.display.inputHasSelection = null),
            vb(a)
        }),
        hg(e.input, "keydown", ib(a, Ub)),
        hg(e.input, "keypress", ib(a, Xb)),
        hg(e.input, "focus", pe(Yb, a)),
        hg(e.input, "blur", pe(Zb, a)),
        a.options.dragDrop && (hg(e.scroller, "dragstart", function(b) {
            Mb(a, b)
        }),
        hg(e.scroller, "dragenter", c),
        hg(e.scroller, "dragover", c),
        hg(e.scroller, "drop", ib(a, Lb))),
        hg(e.scroller, "paste", function(b) {
            Db(e, b) || (a.state.pasteIncoming = !0,
            yb(a),
            vb(a))
        }),
        hg(e.input, "paste", function() {
            if ($e && !a.state.fakedLastChar && !(new Date - a.state.lastMiddleDown < 200)) {
                var b = e.input.selectionStart
                  , c = e.input.selectionEnd;
                e.input.value += "$",
                e.input.selectionEnd = c,
                e.input.selectionStart = b,
                a.state.fakedLastChar = !0
            }
            a.state.pasteIncoming = !0,
            vb(a)
        }),
        hg(e.input, "cut", d),
        hg(e.input, "copy", d),
        df && hg(e.sizer, "mouseup", function() {
            xe() == e.input && e.input.blur(),
            yb(a)
        })
    }
    function Cb(a) {
        var b = a.display;
        b.cachedCharWidth = b.cachedTextHeight = b.cachedPaddingH = null,
        a.setSize()
    }
    function Db(a, b) {
        for (var c = _d(b); c != a.wrapper; c = c.parentNode)
            if (!c || c.ignoreEvents || c.parentNode == a.sizer && c != a.mover)
                return !0
    }
    function Eb(a, b, c, d) {
        var e = a.display;
        if (!c) {
            var f = _d(b);
            if (f == e.scrollbarH || f == e.scrollbarV || f == e.scrollbarFiller || f == e.gutterFiller)
                return null
        }
        var g, h, i = e.lineSpace.getBoundingClientRect();
        try {
            g = b.clientX - i.left,
            h = b.clientY - i.top
        } catch (b) {
            return null
        }
        var j, k = Wa(a, g, h);
        if (d && 1 == k.xRel && (j = Dd(a.doc, k.line).text).length == k.ch) {
            var l = qg(j, j.length, a.options.tabSize) - j.length;
            k = qf(k.line, Math.max(0, Math.round((g - Ba(a.display).left) / Za(a.display)) - l))
        }
        return k
    }
    function Fb(a) {
        if (!de(this, a)) {
            var b = this
              , c = b.display;
            if (c.shift = a.shiftKey,
            Db(c, a))
                return void ($e || (c.scroller.draggable = !1,
                setTimeout(function() {
                    c.scroller.draggable = !0
                }, 100)));
            if (!Kb(b, a)) {
                var d = Eb(b, a);
                switch (window.focus(),
                ae(a)) {
                case 1:
                    d ? Gb(b, a, d) : _d(a) == c.scroller && eg(a);
                    break;
                case 2:
                    $e && (b.state.lastMiddleDown = +new Date),
                    d && ea(b.doc, d),
                    setTimeout(pe(yb, b), 20),
                    eg(a);
                    break;
                case 3:
                    nf && $b(b, a)
                }
            }
        }
    }
    function Gb(a, b, c) {
        setTimeout(pe(zb, a), 0);
        var d, e = +new Date;
        uf && uf.time > e - 400 && 0 == rf(uf.pos, c) ? d = "triple" : tf && tf.time > e - 400 && 0 == rf(tf.pos, c) ? (d = "double",
        uf = {
            time: e,
            pos: c
        }) : (d = "single",
        tf = {
            time: e,
            pos: c
        });
        var f = a.doc.sel
          , g = jf ? b.metaKey : b.ctrlKey;
        a.options.dragDrop && Bg && !Ab(a) && "single" == d && f.contains(c) > -1 && f.somethingSelected() ? Hb(a, b, c, g) : Ib(a, b, c, d, g)
    }
    function Hb(a, b, c, d) {
        var e = a.display
          , f = ib(a, function(g) {
            $e && (e.scroller.draggable = !1),
            a.state.draggingText = !1,
            ig(document, "mouseup", f),
            ig(e.scroller, "drop", f),
            Math.abs(b.clientX - g.clientX) + Math.abs(b.clientY - g.clientY) < 10 && (eg(g),
            d || ea(a.doc, c),
            yb(a),
            Ye && 9 == Ze && setTimeout(function() {
                document.body.focus(),
                yb(a)
            }, 20))
        });
        $e && (e.scroller.draggable = !0),
        a.state.draggingText = f,
        e.scroller.dragDrop && e.scroller.dragDrop(),
        hg(document, "mouseup", f),
        hg(e.scroller, "drop", f)
    }
    function Ib(a, b, c, d, e) {
        function f(b) {
            if (0 != rf(p, b))
                if (p = b,
                "rect" == d) {
                    for (var e = [], f = a.options.tabSize, g = qg(Dd(j, c.line).text, c.ch, f), h = qg(Dd(j, b.line).text, b.ch, f), i = Math.min(g, h), n = Math.max(g, h), o = Math.min(c.line, b.line), q = Math.min(a.lastLine(), Math.max(c.line, b.line)); q >= o; o++) {
                        var r = Dd(j, o).text
                          , s = ie(r, i, f);
                        i == n ? e.push(new X(qf(o, s),qf(o, s))) : r.length > s && e.push(new X(qf(o, s),qf(o, ie(r, n, f))))
                    }
                    e.length || e.push(new X(c,c)),
                    ka(j, Y(m.ranges.slice(0, l).concat(e), l), {
                        origin: "*mouse",
                        scroll: !1
                    }),
                    a.scrollIntoView(b)
                } else {
                    var t = k
                      , u = t.anchor
                      , v = b;
                    if ("single" != d) {
                        if ("double" == d)
                            var w = yc(a, b);
                        else
                            var w = new X(qf(b.line, 0),_(j, qf(b.line + 1, 0)));
                        rf(w.anchor, u) > 0 ? (v = w.head,
                        u = V(t.from(), w.anchor)) : (v = w.anchor,
                        u = U(t.to(), w.head))
                    }
                    var e = m.ranges.slice(0);
                    e[l] = new X(_(j, u),v),
                    ka(j, Y(e, l), og)
                }
        }
        function g(b) {
            var c = ++r
              , e = Eb(a, b, !0, "rect" == d);
            if (e)
                if (0 != rf(e, p)) {
                    zb(a),
                    f(e);
                    var h = s(i, j);
                    (e.line >= h.to || e.line < h.from) && setTimeout(ib(a, function() {
                        r == c && g(b)
                    }), 150)
                } else {
                    var k = b.clientY < q.top ? -20 : b.clientY > q.bottom ? 20 : 0;
                    k && setTimeout(ib(a, function() {
                        r == c && (i.scroller.scrollTop += k,
                        g(b))
                    }), 50)
                }
        }
        function h(b) {
            r = 1 / 0,
            eg(b),
            yb(a),
            ig(document, "mousemove", t),
            ig(document, "mouseup", u),
            j.history.lastSelOrigin = null
        }
        var i = a.display
          , j = a.doc;
        eg(b);
        var k, l, m = j.sel;
        if (e && !b.shiftKey ? (l = j.sel.contains(c),
        k = l > -1 ? j.sel.ranges[l] : new X(c,c)) : k = j.sel.primary(),
        b.altKey)
            d = "rect",
            e || (k = new X(c,c)),
            c = Eb(a, b, !0, !0),
            l = -1;
        else if ("double" == d) {
            var n = yc(a, c);
            k = a.display.shift || j.extend ? da(j, k, n.anchor, n.head) : n
        } else if ("triple" == d) {
            var o = new X(qf(c.line, 0),_(j, qf(c.line + 1, 0)));
            k = a.display.shift || j.extend ? da(j, k, o.anchor, o.head) : o
        } else
            k = da(j, k, c);
        e ? l > -1 ? ga(j, l, k, og) : (l = j.sel.ranges.length,
        ka(j, Y(j.sel.ranges.concat([k]), l), {
            scroll: !1,
            origin: "*mouse"
        })) : (l = 0,
        ka(j, new W([k],0), og),
        m = j.sel);
        var p = c
          , q = i.wrapper.getBoundingClientRect()
          , r = 0
          , t = ib(a, function(a) {
            ae(a) ? g(a) : h(a)
        })
          , u = ib(a, h);
        hg(document, "mousemove", t),
        hg(document, "mouseup", u)
    }
    function Jb(a, b, c, d, e) {
        try {
            var f = b.clientX
              , g = b.clientY
        } catch (b) {
            return !1
        }
        if (f >= Math.floor(a.display.gutters.getBoundingClientRect().right))
            return !1;
        d && eg(b);
        var h = a.display
          , i = h.lineDiv.getBoundingClientRect();
        if (g > i.bottom || !fe(a, c))
            return $d(b);
        g -= i.top - h.viewOffset;
        for (var j = 0; j < a.options.gutters.length; ++j) {
            var k = h.gutters.childNodes[j];
            if (k && k.getBoundingClientRect().right >= f) {
                var l = Id(a.doc, g)
                  , m = a.options.gutters[j];
                return e(a, c, a, l, m, b),
                $d(b)
            }
        }
    }
    function Kb(a, b) {
        return Jb(a, b, "gutterClick", !0, be)
    }
    function Lb(a) {
        var b = this;
        if (!de(b, a) && !Db(b.display, a)) {
            eg(a),
            Ye && (zf = +new Date);
            var c = Eb(b, a, !0)
              , d = a.dataTransfer.files;
            if (c && !Ab(b))
                if (d && d.length && window.FileReader && window.File)
                    for (var e = d.length, f = Array(e), g = 0, h = function(a, d) {
                        var h = new FileReader;
                        h.onload = ib(b, function() {
                            if (f[d] = h.result,
                            ++g == e) {
                                c = _(b.doc, c);
                                var a = {
                                    from: c,
                                    to: c,
                                    text: Cg(f.join("\n")),
                                    origin: "paste"
                                };
                                fc(b.doc, a),
                                ja(b.doc, Z(c, Ef(a)))
                            }
                        }),
                        h.readAsText(a)
                    }, i = 0; e > i; ++i)
                        h(d[i], i);
                else {
                    if (b.state.draggingText && b.doc.sel.contains(c) > -1)
                        return b.state.draggingText(a),
                        void setTimeout(pe(yb, b), 20);
                    try {
                        var f = a.dataTransfer.getData("Text");
                        if (f) {
                            if (b.state.draggingText && !(jf ? a.metaKey : a.ctrlKey))
                                var j = b.listSelections();
                            if (la(b.doc, Z(c, c)),
                            j)
                                for (var i = 0; i < j.length; ++i)
                                    lc(b.doc, "", j[i].anchor, j[i].head, "drag");
                            b.replaceSelection(f, "around", "paste"),
                            yb(b)
                        }
                    } catch (a) {}
                }
        }
    }
    function Mb(a, b) {
        if (Ye && (!a.state.draggingText || +new Date - zf < 100))
            return void gg(b);
        if (!de(a, b) && !Db(a.display, b) && (b.dataTransfer.setData("Text", a.getSelection()),
        b.dataTransfer.setDragImage && !cf)) {
            var c = te("img", null, null, "position: fixed; left: 0; top: 0;");
            c.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            bf && (c.width = c.height = 1,
            a.display.wrapper.appendChild(c),
            c._top = c.offsetTop),
            b.dataTransfer.setDragImage(c, 0, 0),
            bf && c.parentNode.removeChild(c)
        }
    }
    function Nb(a, b) {
        Math.abs(a.doc.scrollTop - b) < 2 || (a.doc.scrollTop = b,
        Ve || A(a, {
            top: b
        }),
        a.display.scroller.scrollTop != b && (a.display.scroller.scrollTop = b),
        a.display.scrollbarV.scrollTop != b && (a.display.scrollbarV.scrollTop = b),
        Ve && A(a),
        va(a, 100))
    }
    function Ob(a, b, c) {
        (c ? b == a.doc.scrollLeft : Math.abs(a.doc.scrollLeft - b) < 2) || (b = Math.min(b, a.display.scroller.scrollWidth - a.display.scroller.clientWidth),
        a.doc.scrollLeft = b,
        t(a),
        a.display.scroller.scrollLeft != b && (a.display.scroller.scrollLeft = b),
        a.display.scrollbarH.scrollLeft != b && (a.display.scrollbarH.scrollLeft = b))
    }
    function Pb(a, b) {
        var c = b.wheelDeltaX
          , d = b.wheelDeltaY;
        null == c && b.detail && b.axis == b.HORIZONTAL_AXIS && (c = b.detail),
        null == d && b.detail && b.axis == b.VERTICAL_AXIS ? d = b.detail : null == d && (d = b.wheelDelta);
        var e = a.display
          , f = e.scroller;
        if (c && f.scrollWidth > f.clientWidth || d && f.scrollHeight > f.clientHeight) {
            if (d && jf && $e)
                a: for (var g = b.target, h = e.view; g != f; g = g.parentNode)
                    for (var i = 0; i < h.length; i++)
                        if (h[i].node == g) {
                            a.display.currentWheelTarget = g;
                            break a
                        }
            if (c && !Ve && !bf && null != Bf)
                return d && Nb(a, Math.max(0, Math.min(f.scrollTop + d * Bf, f.scrollHeight - f.clientHeight))),
                Ob(a, Math.max(0, Math.min(f.scrollLeft + c * Bf, f.scrollWidth - f.clientWidth))),
                eg(b),
                void (e.wheelStartX = null);
            if (d && null != Bf) {
                var j = d * Bf
                  , k = a.doc.scrollTop
                  , l = k + e.wrapper.clientHeight;
                0 > j ? k = Math.max(0, k + j - 50) : l = Math.min(a.doc.height, l + j + 50),
                A(a, {
                    top: k,
                    bottom: l
                })
            }
            20 > Af && (null == e.wheelStartX ? (e.wheelStartX = f.scrollLeft,
            e.wheelStartY = f.scrollTop,
            e.wheelDX = c,
            e.wheelDY = d,
            setTimeout(function() {
                if (null != e.wheelStartX) {
                    var a = f.scrollLeft - e.wheelStartX
                      , b = f.scrollTop - e.wheelStartY
                      , c = b && e.wheelDY && b / e.wheelDY || a && e.wheelDX && a / e.wheelDX;
                    e.wheelStartX = e.wheelStartY = null,
                    c && (Bf = (Bf * Af + c) / (Af + 1),
                    ++Af)
                }
            }, 200)) : (e.wheelDX += c,
            e.wheelDY += d))
        }
    }
    function Qb(a, b, c) {
        if ("string" == typeof b && (b = Pf[b],
        !b))
            return !1;
        a.display.pollingFast && wb(a) && (a.display.pollingFast = !1);
        var d = a.display.shift
          , e = !1;
        try {
            Ab(a) && (a.state.suppressEdits = !0),
            c && (a.display.shift = !1),
            e = b(a) != mg
        } finally {
            a.display.shift = d,
            a.state.suppressEdits = !1
        }
        return e
    }
    function Rb(a) {
        var b = a.state.keyMaps.slice(0);
        return a.options.extraKeys && b.push(a.options.extraKeys),
        b.push(a.options.keyMap),
        b
    }
    function Sb(a, b) {
        var c = Ac(a.options.keyMap)
          , d = c.auto;
        clearTimeout(Cf),
        d && !Sf(b) && (Cf = setTimeout(function() {
            Ac(a.options.keyMap) == c && (a.options.keyMap = d.call ? d.call(null, a) : d,
            h(a))
        }, 50));
        var e = Tf(b, !0)
          , f = !1;
        if (!e)
            return !1;
        var g = Rb(a);
        return f = b.shiftKey ? Rf("Shift-" + e, g, function(b) {
            return Qb(a, b, !0)
        }) || Rf(e, g, function(b) {
            return ("string" == typeof b ? /^go[A-Z]/.test(b) : b.motion) ? Qb(a, b) : void 0
        }) : Rf(e, g, function(b) {
            return Qb(a, b)
        }),
        f && (eg(b),
        ua(a),
        be(a, "keyHandled", a, e, b)),
        f
    }
    function Tb(a, b, c) {
        var d = Rf("'" + c + "'", Rb(a), function(b) {
            return Qb(a, b, !0)
        });
        return d && (eg(b),
        ua(a),
        be(a, "keyHandled", a, "'" + c + "'", b)),
        d
    }
    function Ub(a) {
        var b = this;
        if (zb(b),
        !de(b, a)) {
            Ye && 11 > Ze && 27 == a.keyCode && (a.returnValue = !1);
            var c = a.keyCode;
            b.display.shift = 16 == c || a.shiftKey;
            var d = Sb(b, a);
            bf && (Df = d ? c : null,
            !d && 88 == c && !Eg && (jf ? a.metaKey : a.ctrlKey) && b.replaceSelection("", null, "cut")),
            18 != c || /\bCodeMirror-crosshair\b/.test(b.display.lineDiv.className) || Vb(b)
        }
    }
    function Vb(a) {
        function b(a) {
            18 != a.keyCode && a.altKey || (ze(c, "CodeMirror-crosshair"),
            ig(document, "keyup", b),
            ig(document, "mouseover", b))
        }
        var c = a.display.lineDiv;
        Ae(c, "CodeMirror-crosshair"),
        hg(document, "keyup", b),
        hg(document, "mouseover", b)
    }
    function Wb(a) {
        16 == a.keyCode && (this.doc.sel.shift = !1),
        de(this, a)
    }
    function Xb(a) {
        var b = this;
        if (!(de(b, a) || a.ctrlKey && !a.altKey || jf && a.metaKey)) {
            var c = a.keyCode
              , d = a.charCode;
            if (bf && c == Df)
                return Df = null,
                void eg(a);
            if (!(bf && (!a.which || a.which < 10) || df) || !Sb(b, a)) {
                var e = String.fromCharCode(null == d ? c : d);
                Tb(b, a, e) || (Ye && Ze >= 9 && (b.display.inputHasSelection = null),
                vb(b))
            }
        }
    }
    function Yb(a) {
        "nocursor" != a.options.readOnly && (a.state.focused || (jg(a, "focus", a),
        a.state.focused = !0,
        Ae(a.display.wrapper, "CodeMirror-focused"),
        a.curOp || a.display.selForContextMenu == a.doc.sel || (xb(a),
        $e && setTimeout(pe(xb, a, !0), 0))),
        ub(a),
        ua(a))
    }
    function Zb(a) {
        a.state.focused && (jg(a, "blur", a),
        a.state.focused = !1,
        ze(a.display.wrapper, "CodeMirror-focused")),
        clearInterval(a.display.blinker),
        setTimeout(function() {
            a.state.focused || (a.display.shift = !1)
        }, 150)
    }
    function $b(a, b) {
        function c() {
            if (null != e.input.selectionStart) {
                var b = a.somethingSelected()
                  , c = e.input.value = "​" + (b ? e.input.value : "");
                e.prevInput = b ? "" : "​",
                e.input.selectionStart = 1,
                e.input.selectionEnd = c.length,
                e.selForContextMenu = a.doc.sel
            }
        }
        function d() {
            if (e.inputDiv.style.position = "relative",
            e.input.style.cssText = i,
            Ye && 9 > Ze && (e.scrollbarV.scrollTop = e.scroller.scrollTop = g),
            ub(a),
            null != e.input.selectionStart) {
                (!Ye || Ye && 9 > Ze) && c();
                var b = 0
                  , d = function() {
                    e.selForContextMenu == a.doc.sel && 0 == e.input.selectionStart ? ib(a, Pf.selectAll)(a) : b++ < 10 ? e.detectingSelectAll = setTimeout(d, 500) : xb(a)
                };
                e.detectingSelectAll = setTimeout(d, 200)
            }
        }
        if (!de(a, b, "contextmenu")) {
            var e = a.display;
            if (!Db(e, b) && !_b(a, b)) {
                var f = Eb(a, b)
                  , g = e.scroller.scrollTop;
                if (f && !bf) {
                    var h = a.options.resetSelectionOnContextMenu;
                    h && -1 == a.doc.sel.contains(f) && ib(a, ka)(a.doc, Z(f), ng);
                    var i = e.input.style.cssText;
                    if (e.inputDiv.style.position = "absolute",
                    e.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (b.clientY - 5) + "px; left: " + (b.clientX - 5) + "px; z-index: 1000; background: " + (Ye ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",
                    $e)
                        var j = window.scrollY;
                    if (yb(a),
                    $e && window.scrollTo(null, j),
                    xb(a),
                    a.somethingSelected() || (e.input.value = e.prevInput = " "),
                    e.selForContextMenu = a.doc.sel,
                    clearTimeout(e.detectingSelectAll),
                    Ye && Ze >= 9 && c(),
                    nf) {
                        gg(b);
                        var k = function() {
                            ig(window, "mouseup", k),
                            setTimeout(d, 20)
                        };
                        hg(window, "mouseup", k)
                    } else
                        setTimeout(d, 50)
                }
            }
        }
    }
    function _b(a, b) {
        return fe(a, "gutterContextMenu") ? Jb(a, b, "gutterContextMenu", !1, jg) : !1
    }
    function ac(a, b) {
        if (rf(a, b.from) < 0)
            return a;
        if (rf(a, b.to) <= 0)
            return Ef(b);
        var c = a.line + b.text.length - (b.to.line - b.from.line) - 1
          , d = a.ch;
        return a.line == b.to.line && (d += Ef(b).ch - b.to.ch),
        qf(c, d)
    }
    function bc(a, b) {
        for (var c = [], d = 0; d < a.sel.ranges.length; d++) {
            var e = a.sel.ranges[d];
            c.push(new X(ac(e.anchor, b),ac(e.head, b)))
        }
        return Y(c, a.sel.primIndex)
    }
    function cc(a, b, c) {
        return a.line == b.line ? qf(c.line, a.ch - b.ch + c.ch) : qf(c.line + (a.line - b.line), a.ch)
    }
    function dc(a, b, c) {
        for (var d = [], e = qf(a.first, 0), f = e, g = 0; g < b.length; g++) {
            var h = b[g]
              , i = cc(h.from, e, f)
              , j = cc(Ef(h), e, f);
            if (e = h.to,
            f = j,
            "around" == c) {
                var k = a.sel.ranges[g]
                  , l = rf(k.head, k.anchor) < 0;
                d[g] = new X(l ? j : i,l ? i : j)
            } else
                d[g] = new X(i,i)
        }
        return new W(d,a.sel.primIndex)
    }
    function ec(a, b, c) {
        var d = {
            canceled: !1,
            from: b.from,
            to: b.to,
            text: b.text,
            origin: b.origin,
            cancel: function() {
                this.canceled = !0
            }
        };
        return c && (d.update = function(b, c, d, e) {
            b && (this.from = _(a, b)),
            c && (this.to = _(a, c)),
            d && (this.text = d),
            void 0 !== e && (this.origin = e)
        }
        ),
        jg(a, "beforeChange", a, d),
        a.cm && jg(a.cm, "beforeChange", a.cm, d),
        d.canceled ? null : {
            from: d.from,
            to: d.to,
            text: d.text,
            origin: d.origin
        }
    }
    function fc(a, b, c) {
        if (a.cm) {
            if (!a.cm.curOp)
                return ib(a.cm, fc)(a, b, c);
            if (a.cm.state.suppressEdits)
                return
        }
        if (!(fe(a, "beforeChange") || a.cm && fe(a.cm, "beforeChange")) || (b = ec(a, b, !0))) {
            var d = of && !c && Pc(a, b.from, b.to);
            if (d)
                for (var e = d.length - 1; e >= 0; --e)
                    gc(a, {
                        from: d[e].from,
                        to: d[e].to,
                        text: e ? [""] : b.text
                    });
            else
                gc(a, b)
        }
    }
    function gc(a, b) {
        if (1 != b.text.length || "" != b.text[0] || 0 != rf(b.from, b.to)) {
            var c = bc(a, b);
            Pd(a, b, c, a.cm ? a.cm.curOp.id : NaN),
            jc(a, b, c, Mc(a, b));
            var d = [];
            Bd(a, function(a, c) {
                c || -1 != le(d, a.history) || (Zd(a.history, b),
                d.push(a.history)),
                jc(a, b, null, Mc(a, b))
            })
        }
    }
    function hc(a, b, c) {
        if (!a.cm || !a.cm.state.suppressEdits) {
            for (var d, e = a.history, f = a.sel, g = "undo" == b ? e.done : e.undone, h = "undo" == b ? e.undone : e.done, i = 0; i < g.length && (d = g[i],
            c ? !d.ranges || d.equals(a.sel) : d.ranges); i++)
                ;
            if (i != g.length) {
                for (e.lastOrigin = e.lastSelOrigin = null; d = g.pop(),
                d.ranges; ) {
                    if (Sd(d, h),
                    c && !d.equals(a.sel))
                        return void ka(a, d, {
                            clearRedo: !1
                        });
                    f = d
                }
                var j = [];
                Sd(f, h),
                h.push({
                    changes: j,
                    generation: e.generation
                }),
                e.generation = d.generation || ++e.maxGeneration;
                for (var k = fe(a, "beforeChange") || a.cm && fe(a.cm, "beforeChange"), i = d.changes.length - 1; i >= 0; --i) {
                    var l = d.changes[i];
                    if (l.origin = b,
                    k && !ec(a, l, !1))
                        return void (g.length = 0);
                    j.push(Md(a, l));
                    var m = i ? bc(a, l) : ke(g);
                    jc(a, l, m, Oc(a, l)),
                    !i && a.cm && a.cm.scrollIntoView(l);
                    var n = [];
                    Bd(a, function(a, b) {
                        b || -1 != le(n, a.history) || (Zd(a.history, l),
                        n.push(a.history)),
                        jc(a, l, null, Oc(a, l))
                    })
                }
            }
        }
    }
    function ic(a, b) {
        if (0 != b && (a.first += b,
        a.sel = new W(me(a.sel.ranges, function(a) {
            return new X(qf(a.anchor.line + b, a.anchor.ch),qf(a.head.line + b, a.head.ch))
        }),a.sel.primIndex),
        a.cm)) {
            nb(a.cm, a.first, a.first - b, b);
            for (var c = a.cm.display, d = c.viewFrom; d < c.viewTo; d++)
                ob(a.cm, d, "gutter")
        }
    }
    function jc(a, b, c, d) {
        if (a.cm && !a.cm.curOp)
            return ib(a.cm, jc)(a, b, c, d);
        if (b.to.line < a.first)
            return void ic(a, b.text.length - 1 - (b.to.line - b.from.line));
        if (!(b.from.line > a.lastLine())) {
            if (b.from.line < a.first) {
                var e = b.text.length - 1 - (a.first - b.from.line);
                ic(a, e),
                b = {
                    from: qf(a.first, 0),
                    to: qf(b.to.line + e, b.to.ch),
                    text: [ke(b.text)],
                    origin: b.origin
                }
            }
            var f = a.lastLine();
            b.to.line > f && (b = {
                from: b.from,
                to: qf(f, Dd(a, f).text.length),
                text: [b.text[0]],
                origin: b.origin
            }),
            b.removed = Ed(a, b.from, b.to),
            c || (c = bc(a, b)),
            a.cm ? kc(a.cm, b, d) : yd(a, b, d),
            la(a, c, ng)
        }
    }
    function kc(a, b, c) {
        var d = a.doc
          , e = a.display
          , g = b.from
          , h = b.to
          , i = !1
          , j = g.line;
        a.options.lineWrapping || (j = Hd(Zc(Dd(d, g.line))),
        d.iter(j, h.line + 1, function(a) {
            return a == e.maxLine ? (i = !0,
            !0) : void 0
        })),
        d.sel.contains(b.from, b.to) > -1 && ee(a),
        yd(d, b, c, f(a)),
        a.options.lineWrapping || (d.iter(j, g.line + b.text.length, function(a) {
            var b = m(a);
            b > e.maxLineLength && (e.maxLine = a,
            e.maxLineLength = b,
            e.maxLineChanged = !0,
            i = !1)
        }),
        i && (a.curOp.updateMaxLine = !0)),
        d.frontier = Math.min(d.frontier, g.line),
        va(a, 400);
        var k = b.text.length - (h.line - g.line) - 1;
        g.line != h.line || 1 != b.text.length || xd(a.doc, b) ? nb(a, g.line, h.line + 1, k) : ob(a, g.line, "text");
        var l = fe(a, "changes")
          , n = fe(a, "change");
        if (n || l) {
            var o = {
                from: g,
                to: h,
                text: b.text,
                removed: b.removed,
                origin: b.origin
            };
            n && be(a, "change", a, o),
            l && (a.curOp.changeObjs || (a.curOp.changeObjs = [])).push(o)
        }
        a.display.selForContextMenu = null
    }
    function lc(a, b, c, d, e) {
        if (d || (d = c),
        rf(d, c) < 0) {
            var f = d;
            d = c,
            c = f
        }
        "string" == typeof b && (b = Cg(b)),
        fc(a, {
            from: c,
            to: d,
            text: b,
            origin: e
        })
    }
    function mc(a, b) {
        var c = a.display
          , d = c.sizer.getBoundingClientRect()
          , e = null;
        if (b.top + d.top < 0 ? e = !0 : b.bottom + d.top > (window.innerHeight || document.documentElement.clientHeight) && (e = !1),
        null != e && !ff) {
            var f = te("div", "​", null, "position: absolute; top: " + (b.top - c.viewOffset - za(a.display)) + "px; height: " + (b.bottom - b.top + lg) + "px; left: " + b.left + "px; width: 2px;");
            a.display.lineSpace.appendChild(f),
            f.scrollIntoView(e),
            a.display.lineSpace.removeChild(f)
        }
    }
    function nc(a, b, c, d) {
        for (null == d && (d = 0); ; ) {
            var e = !1
              , f = Ta(a, b)
              , g = c && c != b ? Ta(a, c) : f
              , h = pc(a, Math.min(f.left, g.left), Math.min(f.top, g.top) - d, Math.max(f.left, g.left), Math.max(f.bottom, g.bottom) + d)
              , i = a.doc.scrollTop
              , j = a.doc.scrollLeft;
            if (null != h.scrollTop && (Nb(a, h.scrollTop),
            Math.abs(a.doc.scrollTop - i) > 1 && (e = !0)),
            null != h.scrollLeft && (Ob(a, h.scrollLeft),
            Math.abs(a.doc.scrollLeft - j) > 1 && (e = !0)),
            !e)
                return f
        }
    }
    function oc(a, b, c, d, e) {
        var f = pc(a, b, c, d, e);
        null != f.scrollTop && Nb(a, f.scrollTop),
        null != f.scrollLeft && Ob(a, f.scrollLeft)
    }
    function pc(a, b, c, d, e) {
        var f = a.display
          , g = Ya(a.display);
        0 > c && (c = 0);
        var h = a.curOp && null != a.curOp.scrollTop ? a.curOp.scrollTop : f.scroller.scrollTop
          , i = f.scroller.clientHeight - lg
          , j = {}
          , k = a.doc.height + Aa(f)
          , l = g > c
          , m = e > k - g;
        if (h > c)
            j.scrollTop = l ? 0 : c;
        else if (e > h + i) {
            var n = Math.min(c, (m ? k : e) - i);
            n != h && (j.scrollTop = n)
        }
        var o = a.curOp && null != a.curOp.scrollLeft ? a.curOp.scrollLeft : f.scroller.scrollLeft
          , p = f.scroller.clientWidth - lg;
        b += f.gutters.offsetWidth,
        d += f.gutters.offsetWidth;
        var q = f.gutters.offsetWidth
          , r = q + 10 > b;
        return o + q > b || r ? (r && (b = 0),
        j.scrollLeft = Math.max(0, b - 10 - q)) : d > p + o - 3 && (j.scrollLeft = d + 10 - p),
        j
    }
    function qc(a, b, c) {
        (null != b || null != c) && sc(a),
        null != b && (a.curOp.scrollLeft = (null == a.curOp.scrollLeft ? a.doc.scrollLeft : a.curOp.scrollLeft) + b),
        null != c && (a.curOp.scrollTop = (null == a.curOp.scrollTop ? a.doc.scrollTop : a.curOp.scrollTop) + c)
    }
    function rc(a) {
        sc(a);
        var b = a.getCursor()
          , c = b
          , d = b;
        a.options.lineWrapping || (c = b.ch ? qf(b.line, b.ch - 1) : b,
        d = qf(b.line, b.ch + 1)),
        a.curOp.scrollToPos = {
            from: c,
            to: d,
            margin: a.options.cursorScrollMargin,
            isCursor: !0
        }
    }
    function sc(a) {
        var b = a.curOp.scrollToPos;
        if (b) {
            a.curOp.scrollToPos = null;
            var c = Ua(a, b.from)
              , d = Ua(a, b.to)
              , e = pc(a, Math.min(c.left, d.left), Math.min(c.top, d.top) - b.margin, Math.max(c.right, d.right), Math.max(c.bottom, d.bottom) + b.margin);
            a.scrollTo(e.scrollLeft, e.scrollTop)
        }
    }
    function tc(a, b, c, d) {
        var e, f = a.doc;
        null == c && (c = "add"),
        "smart" == c && (f.mode.indent ? e = ya(a, b) : c = "prev");
        var g = a.options.tabSize
          , h = Dd(f, b)
          , i = qg(h.text, null, g);
        h.stateAfter && (h.stateAfter = null);
        var j, k = h.text.match(/^\s*/)[0];
        if (d || /\S/.test(h.text)) {
            if ("smart" == c && (j = f.mode.indent(e, h.text.slice(k.length), h.text),
            j == mg || j > 150)) {
                if (!d)
                    return;
                c = "prev"
            }
        } else
            j = 0,
            c = "not";
        "prev" == c ? j = b > f.first ? qg(Dd(f, b - 1).text, null, g) : 0 : "add" == c ? j = i + a.options.indentUnit : "subtract" == c ? j = i - a.options.indentUnit : "number" == typeof c && (j = i + c),
        j = Math.max(0, j);
        var l = ""
          , m = 0;
        if (a.options.indentWithTabs)
            for (var n = Math.floor(j / g); n; --n)
                m += g,
                l += "	";
        if (j > m && (l += je(j - m)),
        l != k)
            lc(f, l, qf(b, 0), qf(b, k.length), "+input");
        else
            for (var n = 0; n < f.sel.ranges.length; n++) {
                var o = f.sel.ranges[n];
                if (o.head.line == b && o.head.ch < k.length) {
                    var m = qf(b, k.length);
                    ga(f, n, new X(m,m));
                    break
                }
            }
        h.stateAfter = null
    }
    function uc(a, b, c, d) {
        var e = b
          , f = b;
        return "number" == typeof b ? f = Dd(a, $(a, b)) : e = Hd(b),
        null == e ? null : (d(f, e) && a.cm && ob(a.cm, e, c),
        f)
    }
    function vc(a, b) {
        for (var c = a.doc.sel.ranges, d = [], e = 0; e < c.length; e++) {
            for (var f = b(c[e]); d.length && rf(f.from, ke(d).to) <= 0; ) {
                var g = d.pop();
                if (rf(g.from, f.from) < 0) {
                    f.from = g.from;
                    break
                }
            }
            d.push(f)
        }
        hb(a, function() {
            for (var b = d.length - 1; b >= 0; b--)
                lc(a.doc, "", d[b].from, d[b].to, "+delete");
            rc(a)
        })
    }
    function wc(a, b, c, d, e) {
        function f() {
            var b = h + c;
            return b < a.first || b >= a.first + a.size ? l = !1 : (h = b,
            k = Dd(a, b))
        }
        function g(a) {
            var b = (e ? Te : Ue)(k, i, c, !0);
            if (null == b) {
                if (a || !f())
                    return l = !1;
                i = e ? (0 > c ? Ne : Me)(k) : 0 > c ? k.text.length : 0
            } else
                i = b;
            return !0
        }
        var h = b.line
          , i = b.ch
          , j = c
          , k = Dd(a, h)
          , l = !0;
        if ("char" == d)
            g();
        else if ("column" == d)
            g(!0);
        else if ("word" == d || "group" == d)
            for (var m = null, n = "group" == d, o = a.cm && a.cm.getHelper(b, "wordChars"), p = !0; !(0 > c) || g(!p); p = !1) {
                var q = k.text.charAt(i) || "\n"
                  , r = qe(q, o) ? "w" : n && "\n" == q ? "n" : !n || /\s/.test(q) ? null : "p";
                if (!n || p || r || (r = "s"),
                m && m != r) {
                    0 > c && (c = 1,
                    g());
                    break
                }
                if (r && (m = r),
                c > 0 && !g(!p))
                    break
            }
        var s = pa(a, qf(h, i), j, !0);
        return l || (s.hitSide = !0),
        s
    }
    function xc(a, b, c, d) {
        var e, f = a.doc, g = b.left;
        if ("page" == d) {
            var h = Math.min(a.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            e = b.top + c * (h - (0 > c ? 1.5 : .5) * Ya(a.display))
        } else
            "line" == d && (e = c > 0 ? b.bottom + 3 : b.top - 3);
        for (; ; ) {
            var i = Wa(a, g, e);
            if (!i.outside)
                break;
            if (0 > c ? 0 >= e : e >= f.height) {
                i.hitSide = !0;
                break
            }
            e += 5 * c
        }
        return i
    }
    function yc(a, b) {
        var c = a.doc
          , d = Dd(c, b.line).text
          , e = b.ch
          , f = b.ch;
        if (d) {
            var g = a.getHelper(b, "wordChars");
            (b.xRel < 0 || f == d.length) && e ? --e : ++f;
            for (var h = d.charAt(e), i = qe(h, g) ? function(a) {
                return qe(a, g)
            }
            : /\s/.test(h) ? function(a) {
                return /\s/.test(a)
            }
            : function(a) {
                return !/\s/.test(a) && !qe(a)
            }
            ; e > 0 && i(d.charAt(e - 1)); )
                --e;
            for (; f < d.length && i(d.charAt(f)); )
                ++f
        }
        return new X(qf(b.line, e),qf(b.line, f))
    }
    function zc(b, c, d, e) {
        a.defaults[b] = c,
        d && (Gf[b] = e ? function(a, b, c) {
            c != Hf && d(a, b, c)
        }
        : d)
    }
    function Ac(a) {
        return "string" == typeof a ? Qf[a] : a
    }
    function Bc(a, b, c, d, e) {
        if (d && d.shared)
            return Cc(a, b, c, d, e);
        if (a.cm && !a.cm.curOp)
            return ib(a.cm, Bc)(a, b, c, d, e);
        var f = new Vf(a,e)
          , g = rf(b, c);
        if (d && oe(d, f, !1),
        g > 0 || 0 == g && f.clearWhenEmpty !== !1)
            return f;
        if (f.replacedWith && (f.collapsed = !0,
        f.widgetNode = te("span", [f.replacedWith], "CodeMirror-widget"),
        d.handleMouseEvents || (f.widgetNode.ignoreEvents = !0),
        d.insertLeft && (f.widgetNode.insertLeft = !0)),
        f.collapsed) {
            if (Yc(a, b.line, b, c, f) || b.line != c.line && Yc(a, c.line, b, c, f))
                throw new Error("Inserting collapsed marker partially overlapping an existing one");
            pf = !0
        }
        f.addToHistory && Pd(a, {
            from: b,
            to: c,
            origin: "markText"
        }, a.sel, NaN);
        var h, i = b.line, j = a.cm;
        if (a.iter(i, c.line + 1, function(a) {
            j && f.collapsed && !j.options.lineWrapping && Zc(a) == j.display.maxLine && (h = !0),
            f.collapsed && i != b.line && Gd(a, 0),
            Jc(a, new Gc(f,i == b.line ? b.ch : null,i == c.line ? c.ch : null)),
            ++i
        }),
        f.collapsed && a.iter(b.line, c.line + 1, function(b) {
            bd(a, b) && Gd(b, 0)
        }),
        f.clearOnEnter && hg(f, "beforeCursorEnter", function() {
            f.clear()
        }),
        f.readOnly && (of = !0,
        (a.history.done.length || a.history.undone.length) && a.clearHistory()),
        f.collapsed && (f.id = ++Wf,
        f.atomic = !0),
        j) {
            if (h && (j.curOp.updateMaxLine = !0),
            f.collapsed)
                nb(j, b.line, c.line + 1);
            else if (f.className || f.title || f.startStyle || f.endStyle)
                for (var k = b.line; k <= c.line; k++)
                    ob(j, k, "text");
            f.atomic && na(j.doc),
            be(j, "markerAdded", j, f)
        }
        return f
    }
    function Cc(a, b, c, d, e) {
        d = oe(d),
        d.shared = !1;
        var f = [Bc(a, b, c, d, e)]
          , g = f[0]
          , h = d.widgetNode;
        return Bd(a, function(a) {
            h && (d.widgetNode = h.cloneNode(!0)),
            f.push(Bc(a, _(a, b), _(a, c), d, e));
            for (var i = 0; i < a.linked.length; ++i)
                if (a.linked[i].isParent)
                    return;
            g = ke(f)
        }),
        new Xf(f,g)
    }
    function Dc(a) {
        return a.findMarks(qf(a.first, 0), a.clipPos(qf(a.lastLine())), function(a) {
            return a.parent
        })
    }
    function Ec(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c]
              , e = d.find()
              , f = a.clipPos(e.from)
              , g = a.clipPos(e.to);
            if (rf(f, g)) {
                var h = Bc(a, f, g, d.primary, d.primary.type);
                d.markers.push(h),
                h.parent = d
            }
        }
    }
    function Fc(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b]
              , d = [c.primary.doc];
            Bd(c.primary.doc, function(a) {
                d.push(a)
            });
            for (var e = 0; e < c.markers.length; e++) {
                var f = c.markers[e];
                -1 == le(d, f.doc) && (f.parent = null,
                c.markers.splice(e--, 1))
            }
        }
    }
    function Gc(a, b, c) {
        this.marker = a,
        this.from = b,
        this.to = c
    }
    function Hc(a, b) {
        if (a)
            for (var c = 0; c < a.length; ++c) {
                var d = a[c];
                if (d.marker == b)
                    return d
            }
    }
    function Ic(a, b) {
        for (var c, d = 0; d < a.length; ++d)
            a[d] != b && (c || (c = [])).push(a[d]);
        return c
    }
    function Jc(a, b) {
        a.markedSpans = a.markedSpans ? a.markedSpans.concat([b]) : [b],
        b.marker.attachLine(a)
    }
    function Kc(a, b, c) {
        if (a)
            for (var d, e = 0; e < a.length; ++e) {
                var f = a[e]
                  , g = f.marker
                  , h = null == f.from || (g.inclusiveLeft ? f.from <= b : f.from < b);
                if (h || f.from == b && "bookmark" == g.type && (!c || !f.marker.insertLeft)) {
                    var i = null == f.to || (g.inclusiveRight ? f.to >= b : f.to > b);
                    (d || (d = [])).push(new Gc(g,f.from,i ? null : f.to))
                }
            }
        return d
    }
    function Lc(a, b, c) {
        if (a)
            for (var d, e = 0; e < a.length; ++e) {
                var f = a[e]
                  , g = f.marker
                  , h = null == f.to || (g.inclusiveRight ? f.to >= b : f.to > b);
                if (h || f.from == b && "bookmark" == g.type && (!c || f.marker.insertLeft)) {
                    var i = null == f.from || (g.inclusiveLeft ? f.from <= b : f.from < b);
                    (d || (d = [])).push(new Gc(g,i ? null : f.from - b,null == f.to ? null : f.to - b))
                }
            }
        return d
    }
    function Mc(a, b) {
        var c = ba(a, b.from.line) && Dd(a, b.from.line).markedSpans
          , d = ba(a, b.to.line) && Dd(a, b.to.line).markedSpans;
        if (!c && !d)
            return null;
        var e = b.from.ch
          , f = b.to.ch
          , g = 0 == rf(b.from, b.to)
          , h = Kc(c, e, g)
          , i = Lc(d, f, g)
          , j = 1 == b.text.length
          , k = ke(b.text).length + (j ? e : 0);
        if (h)
            for (var l = 0; l < h.length; ++l) {
                var m = h[l];
                if (null == m.to) {
                    var n = Hc(i, m.marker);
                    n ? j && (m.to = null == n.to ? null : n.to + k) : m.to = e
                }
            }
        if (i)
            for (var l = 0; l < i.length; ++l) {
                var m = i[l];
                if (null != m.to && (m.to += k),
                null == m.from) {
                    var n = Hc(h, m.marker);
                    n || (m.from = k,
                    j && (h || (h = [])).push(m))
                } else
                    m.from += k,
                    j && (h || (h = [])).push(m)
            }
        h && (h = Nc(h)),
        i && i != h && (i = Nc(i));
        var o = [h];
        if (!j) {
            var p, q = b.text.length - 2;
            if (q > 0 && h)
                for (var l = 0; l < h.length; ++l)
                    null == h[l].to && (p || (p = [])).push(new Gc(h[l].marker,null,null));
            for (var l = 0; q > l; ++l)
                o.push(p);
            o.push(i)
        }
        return o
    }
    function Nc(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            null != c.from && c.from == c.to && c.marker.clearWhenEmpty !== !1 && a.splice(b--, 1)
        }
        return a.length ? a : null
    }
    function Oc(a, b) {
        var c = Vd(a, b)
          , d = Mc(a, b);
        if (!c)
            return d;
        if (!d)
            return c;
        for (var e = 0; e < c.length; ++e) {
            var f = c[e]
              , g = d[e];
            if (f && g)
                a: for (var h = 0; h < g.length; ++h) {
                    for (var i = g[h], j = 0; j < f.length; ++j)
                        if (f[j].marker == i.marker)
                            continue a;
                    f.push(i)
                }
            else
                g && (c[e] = g)
        }
        return c
    }
    function Pc(a, b, c) {
        var d = null;
        if (a.iter(b.line, c.line + 1, function(a) {
            if (a.markedSpans)
                for (var b = 0; b < a.markedSpans.length; ++b) {
                    var c = a.markedSpans[b].marker;
                    !c.readOnly || d && -1 != le(d, c) || (d || (d = [])).push(c)
                }
        }),
        !d)
            return null;
        for (var e = [{
            from: b,
            to: c
        }], f = 0; f < d.length; ++f)
            for (var g = d[f], h = g.find(0), i = 0; i < e.length; ++i) {
                var j = e[i];
                if (!(rf(j.to, h.from) < 0 || rf(j.from, h.to) > 0)) {
                    var k = [i, 1]
                      , l = rf(j.from, h.from)
                      , m = rf(j.to, h.to);
                    (0 > l || !g.inclusiveLeft && !l) && k.push({
                        from: j.from,
                        to: h.from
                    }),
                    (m > 0 || !g.inclusiveRight && !m) && k.push({
                        from: h.to,
                        to: j.to
                    }),
                    e.splice.apply(e, k),
                    i += k.length - 1
                }
            }
        return e
    }
    function Qc(a) {
        var b = a.markedSpans;
        if (b) {
            for (var c = 0; c < b.length; ++c)
                b[c].marker.detachLine(a);
            a.markedSpans = null
        }
    }
    function Rc(a, b) {
        if (b) {
            for (var c = 0; c < b.length; ++c)
                b[c].marker.attachLine(a);
            a.markedSpans = b
        }
    }
    function Sc(a) {
        return a.inclusiveLeft ? -1 : 0
    }
    function Tc(a) {
        return a.inclusiveRight ? 1 : 0
    }
    function Uc(a, b) {
        var c = a.lines.length - b.lines.length;
        if (0 != c)
            return c;
        var d = a.find()
          , e = b.find()
          , f = rf(d.from, e.from) || Sc(a) - Sc(b);
        if (f)
            return -f;
        var g = rf(d.to, e.to) || Tc(a) - Tc(b);
        return g ? g : b.id - a.id
    }
    function Vc(a, b) {
        var c, d = pf && a.markedSpans;
        if (d)
            for (var e, f = 0; f < d.length; ++f)
                e = d[f],
                e.marker.collapsed && null == (b ? e.from : e.to) && (!c || Uc(c, e.marker) < 0) && (c = e.marker);
        return c
    }
    function Wc(a) {
        return Vc(a, !0)
    }
    function Xc(a) {
        return Vc(a, !1)
    }
    function Yc(a, b, c, d, e) {
        var f = Dd(a, b)
          , g = pf && f.markedSpans;
        if (g)
            for (var h = 0; h < g.length; ++h) {
                var i = g[h];
                if (i.marker.collapsed) {
                    var j = i.marker.find(0)
                      , k = rf(j.from, c) || Sc(i.marker) - Sc(e)
                      , l = rf(j.to, d) || Tc(i.marker) - Tc(e);
                    if (!(k >= 0 && 0 >= l || 0 >= k && l >= 0) && (0 >= k && (rf(j.to, c) > 0 || i.marker.inclusiveRight && e.inclusiveLeft) || k >= 0 && (rf(j.from, d) < 0 || i.marker.inclusiveLeft && e.inclusiveRight)))
                        return !0
                }
            }
    }
    function Zc(a) {
        for (var b; b = Wc(a); )
            a = b.find(-1, !0).line;
        return a
    }
    function $c(a) {
        for (var b, c; b = Xc(a); )
            a = b.find(1, !0).line,
            (c || (c = [])).push(a);
        return c
    }
    function _c(a, b) {
        var c = Dd(a, b)
          , d = Zc(c);
        return c == d ? b : Hd(d)
    }
    function ad(a, b) {
        if (b > a.lastLine())
            return b;
        var c, d = Dd(a, b);
        if (!bd(a, d))
            return b;
        for (; c = Xc(d); )
            d = c.find(1, !0).line;
        return Hd(d) + 1
    }
    function bd(a, b) {
        var c = pf && b.markedSpans;
        if (c)
            for (var d, e = 0; e < c.length; ++e)
                if (d = c[e],
                d.marker.collapsed) {
                    if (null == d.from)
                        return !0;
                    if (!d.marker.widgetNode && 0 == d.from && d.marker.inclusiveLeft && cd(a, b, d))
                        return !0
                }
    }
    function cd(a, b, c) {
        if (null == c.to) {
            var d = c.marker.find(1, !0);
            return cd(a, d.line, Hc(d.line.markedSpans, c.marker))
        }
        if (c.marker.inclusiveRight && c.to == b.text.length)
            return !0;
        for (var e, f = 0; f < b.markedSpans.length; ++f)
            if (e = b.markedSpans[f],
            e.marker.collapsed && !e.marker.widgetNode && e.from == c.to && (null == e.to || e.to != c.from) && (e.marker.inclusiveLeft || c.marker.inclusiveRight) && cd(a, b, e))
                return !0
    }
    function dd(a, b, c) {
        Jd(b) < (a.curOp && a.curOp.scrollTop || a.doc.scrollTop) && qc(a, null, c)
    }
    function ed(a) {
        if (null != a.height)
            return a.height;
        if (!we(document.body, a.node)) {
            var b = "position: relative;";
            a.coverGutter && (b += "margin-left: -" + a.cm.getGutterElement().offsetWidth + "px;"),
            ve(a.cm.display.measure, te("div", [a.node], null, b))
        }
        return a.height = a.node.offsetHeight
    }
    function fd(a, b, c, d) {
        var e = new Yf(a,c,d);
        return e.noHScroll && (a.display.alignWidgets = !0),
        uc(a.doc, b, "widget", function(b) {
            var c = b.widgets || (b.widgets = []);
            if (null == e.insertAt ? c.push(e) : c.splice(Math.min(c.length - 1, Math.max(0, e.insertAt)), 0, e),
            e.line = b,
            !bd(a.doc, b)) {
                var d = Jd(b) < a.doc.scrollTop;
                Gd(b, b.height + ed(e)),
                d && qc(a, null, e.height),
                a.curOp.forceUpdate = !0
            }
            return !0
        }),
        e
    }
    function gd(a, b, c, d) {
        a.text = b,
        a.stateAfter && (a.stateAfter = null),
        a.styles && (a.styles = null),
        null != a.order && (a.order = null),
        Qc(a),
        Rc(a, c);
        var e = d ? d(a) : 1;
        e != a.height && Gd(a, e)
    }
    function hd(a) {
        a.parent = null,
        Qc(a)
    }
    function id(a, b) {
        if (a)
            for (; ; ) {
                var c = a.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!c)
                    break;
                a = a.slice(0, c.index) + a.slice(c.index + c[0].length);
                var d = c[1] ? "bgClass" : "textClass";
                null == b[d] ? b[d] = c[2] : new RegExp("(?:^|s)" + c[2] + "(?:$|s)").test(b[d]) || (b[d] += " " + c[2])
            }
        return a
    }
    function jd(b, c) {
        if (b.blankLine)
            return b.blankLine(c);
        if (b.innerMode) {
            var d = a.innerMode(b, c);
            return d.mode.blankLine ? d.mode.blankLine(d.state) : void 0
        }
    }
    function kd(a, b, c) {
        for (var d = 0; 10 > d; d++) {
            var e = a.token(b, c);
            if (b.pos > b.start)
                return e
        }
        throw new Error("Mode " + a.name + " failed to advance stream.")
    }
    function ld(b, c, d, e, f, g, h) {
        var i = d.flattenSpans;
        null == i && (i = b.options.flattenSpans);
        var j, k = 0, l = null, m = new Uf(c,b.options.tabSize);
        for ("" == c && id(jd(d, e), g); !m.eol(); ) {
            if (m.pos > b.options.maxHighlightLength ? (i = !1,
            h && od(b, c, e, m.pos),
            m.pos = c.length,
            j = null) : j = id(kd(d, m, e), g),
            b.options.addModeClass) {
                var n = a.innerMode(d, e).mode.name;
                n && (j = "m-" + (j ? n + " " + j : n))
            }
            i && l == j || (k < m.start && f(m.start, l),
            k = m.start,
            l = j),
            m.start = m.pos
        }
        for (; k < m.pos; ) {
            var o = Math.min(m.pos, k + 5e4);
            f(o, l),
            k = o
        }
    }
    function md(a, b, c, d) {
        var e = [a.state.modeGen]
          , f = {};
        ld(a, b.text, a.doc.mode, c, function(a, b) {
            e.push(a, b)
        }, f, d);
        for (var g = 0; g < a.state.overlays.length; ++g) {
            var h = a.state.overlays[g]
              , i = 1
              , j = 0;
            ld(a, b.text, h.mode, !0, function(a, b) {
                for (var c = i; a > j; ) {
                    var d = e[i];
                    d > a && e.splice(i, 1, a, e[i + 1], d),
                    i += 2,
                    j = Math.min(a, d)
                }
                if (b)
                    if (h.opaque)
                        e.splice(c, i - c, a, "cm-overlay " + b),
                        i = c + 2;
                    else
                        for (; i > c; c += 2) {
                            var f = e[c + 1];
                            e[c + 1] = (f ? f + " " : "") + "cm-overlay " + b
                        }
            }, f)
        }
        return {
            styles: e,
            classes: f.bgClass || f.textClass ? f : null
        }
    }
    function nd(a, b) {
        if (!b.styles || b.styles[0] != a.state.modeGen) {
            var c = md(a, b, b.stateAfter = ya(a, Hd(b)));
            b.styles = c.styles,
            c.classes ? b.styleClasses = c.classes : b.styleClasses && (b.styleClasses = null)
        }
        return b.styles
    }
    function od(a, b, c, d) {
        var e = a.doc.mode
          , f = new Uf(b,a.options.tabSize);
        for (f.start = f.pos = d || 0,
        "" == b && jd(e, c); !f.eol() && f.pos <= a.options.maxHighlightLength; )
            kd(e, f, c),
            f.start = f.pos
    }
    function pd(a, b) {
        if (!a || /^\s*$/.test(a))
            return null;
        var c = b.addModeClass ? _f : $f;
        return c[a] || (c[a] = a.replace(/\S+/g, "cm-$&"))
    }
    function qd(a, b) {
        var c = te("span", null, null, $e ? "padding-right: .1px" : null)
          , d = {
            pre: te("pre", [c]),
            content: c,
            col: 0,
            pos: 0,
            cm: a
        };
        b.measure = {};
        for (var e = 0; e <= (b.rest ? b.rest.length : 0); e++) {
            var f, g = e ? b.rest[e - 1] : b.line;
            d.pos = 0,
            d.addToken = sd,
            (Ye || $e) && a.getOption("lineWrapping") && (d.addToken = td(d.addToken)),
            He(a.display.measure) && (f = Kd(g)) && (d.addToken = ud(d.addToken, f)),
            d.map = [],
            wd(g, d, nd(a, g)),
            g.styleClasses && (g.styleClasses.bgClass && (d.bgClass = Be(g.styleClasses.bgClass, d.bgClass || "")),
            g.styleClasses.textClass && (d.textClass = Be(g.styleClasses.textClass, d.textClass || ""))),
            0 == d.map.length && d.map.push(0, 0, d.content.appendChild(Ge(a.display.measure))),
            0 == e ? (b.measure.map = d.map,
            b.measure.cache = {}) : ((b.measure.maps || (b.measure.maps = [])).push(d.map),
            (b.measure.caches || (b.measure.caches = [])).push({}))
        }
        return jg(a, "renderLine", a, b.line, d.pre),
        d.pre.className && (d.textClass = Be(d.pre.className, d.textClass || "")),
        d
    }
    function rd(a) {
        var b = te("span", "•", "cm-invalidchar");
        return b.title = "\\u" + a.charCodeAt(0).toString(16),
        b
    }
    function sd(a, b, c, d, e, f) {
        if (b) {
            var g = a.cm.options.specialChars
              , h = !1;
            if (g.test(b))
                for (var i = document.createDocumentFragment(), j = 0; ; ) {
                    g.lastIndex = j;
                    var k = g.exec(b)
                      , l = k ? k.index - j : b.length - j;
                    if (l) {
                        var m = document.createTextNode(b.slice(j, j + l));
                        Ye && 9 > Ze ? i.appendChild(te("span", [m])) : i.appendChild(m),
                        a.map.push(a.pos, a.pos + l, m),
                        a.col += l,
                        a.pos += l
                    }
                    if (!k)
                        break;
                    if (j += l + 1,
                    "	" == k[0]) {
                        var n = a.cm.options.tabSize
                          , o = n - a.col % n
                          , m = i.appendChild(te("span", je(o), "cm-tab"));
                        a.col += o
                    } else {
                        var m = a.cm.options.specialCharPlaceholder(k[0]);
                        Ye && 9 > Ze ? i.appendChild(te("span", [m])) : i.appendChild(m),
                        a.col += 1
                    }
                    a.map.push(a.pos, a.pos + 1, m),
                    a.pos++
                }
            else {
                a.col += b.length;
                var i = document.createTextNode(b);
                a.map.push(a.pos, a.pos + b.length, i),
                Ye && 9 > Ze && (h = !0),
                a.pos += b.length
            }
            if (c || d || e || h) {
                var p = c || "";
                d && (p += d),
                e && (p += e);
                var q = te("span", [i], p);
                return f && (q.title = f),
                a.content.appendChild(q)
            }
            a.content.appendChild(i)
        }
    }
    function td(a) {
        function b(a) {
            for (var b = " ", c = 0; c < a.length - 2; ++c)
                b += c % 2 ? " " : " ";
            return b += " "
        }
        return function(c, d, e, f, g, h) {
            a(c, d.replace(/ {3,}/g, b), e, f, g, h)
        }
    }
    function ud(a, b) {
        return function(c, d, e, f, g, h) {
            e = e ? e + " cm-force-border" : "cm-force-border";
            for (var i = c.pos, j = i + d.length; ; ) {
                for (var k = 0; k < b.length; k++) {
                    var l = b[k];
                    if (l.to > i && l.from <= i)
                        break
                }
                if (l.to >= j)
                    return a(c, d, e, f, g, h);
                a(c, d.slice(0, l.to - i), e, f, null, h),
                f = null,
                d = d.slice(l.to - i),
                i = l.to
            }
        }
    }
    function vd(a, b, c, d) {
        var e = !d && c.widgetNode;
        e && (a.map.push(a.pos, a.pos + b, e),
        a.content.appendChild(e)),
        a.pos += b
    }
    function wd(a, b, c) {
        var d = a.markedSpans
          , e = a.text
          , f = 0;
        if (d)
            for (var g, h, i, j, k, l, m = e.length, n = 0, o = 1, p = "", q = 0; ; ) {
                if (q == n) {
                    h = i = j = k = "",
                    l = null,
                    q = 1 / 0;
                    for (var r = [], s = 0; s < d.length; ++s) {
                        var t = d[s]
                          , u = t.marker;
                        t.from <= n && (null == t.to || t.to > n) ? (null != t.to && q > t.to && (q = t.to,
                        i = ""),
                        u.className && (h += " " + u.className),
                        u.startStyle && t.from == n && (j += " " + u.startStyle),
                        u.endStyle && t.to == q && (i += " " + u.endStyle),
                        u.title && !k && (k = u.title),
                        u.collapsed && (!l || Uc(l.marker, u) < 0) && (l = t)) : t.from > n && q > t.from && (q = t.from),
                        "bookmark" == u.type && t.from == n && u.widgetNode && r.push(u)
                    }
                    if (l && (l.from || 0) == n && (vd(b, (null == l.to ? m + 1 : l.to) - n, l.marker, null == l.from),
                    null == l.to))
                        return;
                    if (!l && r.length)
                        for (var s = 0; s < r.length; ++s)
                            vd(b, 0, r[s])
                }
                if (n >= m)
                    break;
                for (var v = Math.min(m, q); ; ) {
                    if (p) {
                        var w = n + p.length;
                        if (!l) {
                            var x = w > v ? p.slice(0, v - n) : p;
                            b.addToken(b, x, g ? g + h : h, j, n + x.length == q ? i : "", k)
                        }
                        if (w >= v) {
                            p = p.slice(v - n),
                            n = v;
                            break
                        }
                        n = w,
                        j = ""
                    }
                    p = e.slice(f, f = c[o++]),
                    g = pd(c[o++], b.cm.options)
                }
            }
        else
            for (var o = 1; o < c.length; o += 2)
                b.addToken(b, e.slice(f, f = c[o]), pd(c[o + 1], b.cm.options))
    }
    function xd(a, b) {
        return 0 == b.from.ch && 0 == b.to.ch && "" == ke(b.text) && (!a.cm || a.cm.options.wholeLineUpdateBefore)
    }
    function yd(a, b, c, d) {
        function e(a) {
            return c ? c[a] : null
        }
        function f(a, c, e) {
            gd(a, c, e, d),
            be(a, "change", a, b)
        }
        var g = b.from
          , h = b.to
          , i = b.text
          , j = Dd(a, g.line)
          , k = Dd(a, h.line)
          , l = ke(i)
          , m = e(i.length - 1)
          , n = h.line - g.line;
        if (xd(a, b)) {
            for (var o = 0, p = []; o < i.length - 1; ++o)
                p.push(new Zf(i[o],e(o),d));
            f(k, k.text, m),
            n && a.remove(g.line, n),
            p.length && a.insert(g.line, p)
        } else if (j == k)
            if (1 == i.length)
                f(j, j.text.slice(0, g.ch) + l + j.text.slice(h.ch), m);
            else {
                for (var p = [], o = 1; o < i.length - 1; ++o)
                    p.push(new Zf(i[o],e(o),d));
                p.push(new Zf(l + j.text.slice(h.ch),m,d)),
                f(j, j.text.slice(0, g.ch) + i[0], e(0)),
                a.insert(g.line + 1, p)
            }
        else if (1 == i.length)
            f(j, j.text.slice(0, g.ch) + i[0] + k.text.slice(h.ch), e(0)),
            a.remove(g.line + 1, n);
        else {
            f(j, j.text.slice(0, g.ch) + i[0], e(0)),
            f(k, l + k.text.slice(h.ch), m);
            for (var o = 1, p = []; o < i.length - 1; ++o)
                p.push(new Zf(i[o],e(o),d));
            n > 1 && a.remove(g.line + 1, n - 1),
            a.insert(g.line + 1, p)
        }
        be(a, "change", a, b)
    }
    function zd(a) {
        this.lines = a,
        this.parent = null;
        for (var b = 0, c = 0; b < a.length; ++b)
            a[b].parent = this,
            c += a[b].height;
        this.height = c
    }
    function Ad(a) {
        this.children = a;
        for (var b = 0, c = 0, d = 0; d < a.length; ++d) {
            var e = a[d];
            b += e.chunkSize(),
            c += e.height,
            e.parent = this
        }
        this.size = b,
        this.height = c,
        this.parent = null
    }
    function Bd(a, b, c) {
        function d(a, e, f) {
            if (a.linked)
                for (var g = 0; g < a.linked.length; ++g) {
                    var h = a.linked[g];
                    if (h.doc != e) {
                        var i = f && h.sharedHist;
                        (!c || i) && (b(h.doc, i),
                        d(h.doc, a, i))
                    }
                }
        }
        d(a, null, !0)
    }
    function Cd(a, b) {
        if (b.cm)
            throw new Error("This document is already in use.");
        a.doc = b,
        b.cm = a,
        g(a),
        c(a),
        a.options.lineWrapping || n(a),
        a.options.mode = b.modeOption,
        nb(a)
    }
    function Dd(a, b) {
        if (b -= a.first,
        0 > b || b >= a.size)
            throw new Error("There is no line " + (b + a.first) + " in the document.");
        for (var c = a; !c.lines; )
            for (var d = 0; ; ++d) {
                var e = c.children[d]
                  , f = e.chunkSize();
                if (f > b) {
                    c = e;
                    break
                }
                b -= f
            }
        return c.lines[b]
    }
    function Ed(a, b, c) {
        var d = []
          , e = b.line;
        return a.iter(b.line, c.line + 1, function(a) {
            var f = a.text;
            e == c.line && (f = f.slice(0, c.ch)),
            e == b.line && (f = f.slice(b.ch)),
            d.push(f),
            ++e
        }),
        d
    }
    function Fd(a, b, c) {
        var d = [];
        return a.iter(b, c, function(a) {
            d.push(a.text)
        }),
        d
    }
    function Gd(a, b) {
        var c = b - a.height;
        if (c)
            for (var d = a; d; d = d.parent)
                d.height += c
    }
    function Hd(a) {
        if (null == a.parent)
            return null;
        for (var b = a.parent, c = le(b.lines, a), d = b.parent; d; b = d,
        d = d.parent)
            for (var e = 0; d.children[e] != b; ++e)
                c += d.children[e].chunkSize();
        return c + b.first
    }
    function Id(a, b) {
        var c = a.first;
        a: do {
            for (var d = 0; d < a.children.length; ++d) {
                var e = a.children[d]
                  , f = e.height;
                if (f > b) {
                    a = e;
                    continue a
                }
                b -= f,
                c += e.chunkSize()
            }
            return c
        } while (!a.lines);for (var d = 0; d < a.lines.length; ++d) {
            var g = a.lines[d]
              , h = g.height;
            if (h > b)
                break;
            b -= h
        }
        return c + d
    }
    function Jd(a) {
        a = Zc(a);
        for (var b = 0, c = a.parent, d = 0; d < c.lines.length; ++d) {
            var e = c.lines[d];
            if (e == a)
                break;
            b += e.height
        }
        for (var f = c.parent; f; c = f,
        f = c.parent)
            for (var d = 0; d < f.children.length; ++d) {
                var g = f.children[d];
                if (g == c)
                    break;
                b += g.height
            }
        return b
    }
    function Kd(a) {
        var b = a.order;
        return null == b && (b = a.order = Ig(a.text)),
        b
    }
    function Ld(a) {
        this.done = [],
        this.undone = [],
        this.undoDepth = 1 / 0,
        this.lastModTime = this.lastSelTime = 0,
        this.lastOp = null,
        this.lastOrigin = this.lastSelOrigin = null,
        this.generation = this.maxGeneration = a || 1
    }
    function Md(a, b) {
        var c = {
            from: T(b.from),
            to: Ef(b),
            text: Ed(a, b.from, b.to)
        };
        return Td(a, c, b.from.line, b.to.line + 1),
        Bd(a, function(a) {
            Td(a, c, b.from.line, b.to.line + 1)
        }, !0),
        c
    }
    function Nd(a) {
        for (; a.length; ) {
            var b = ke(a);
            if (!b.ranges)
                break;
            a.pop()
        }
    }
    function Od(a, b) {
        return b ? (Nd(a.done),
        ke(a.done)) : a.done.length && !ke(a.done).ranges ? ke(a.done) : a.done.length > 1 && !a.done[a.done.length - 2].ranges ? (a.done.pop(),
        ke(a.done)) : void 0
    }
    function Pd(a, b, c, d) {
        var e = a.history;
        e.undone.length = 0;
        var f, g = +new Date;
        if ((e.lastOp == d || e.lastOrigin == b.origin && b.origin && ("+" == b.origin.charAt(0) && a.cm && e.lastModTime > g - a.cm.options.historyEventDelay || "*" == b.origin.charAt(0))) && (f = Od(e, e.lastOp == d))) {
            var h = ke(f.changes);
            0 == rf(b.from, b.to) && 0 == rf(b.from, h.to) ? h.to = Ef(b) : f.changes.push(Md(a, b))
        } else {
            var i = ke(e.done);
            for (i && i.ranges || Sd(a.sel, e.done),
            f = {
                changes: [Md(a, b)],
                generation: e.generation
            },
            e.done.push(f); e.done.length > e.undoDepth; )
                e.done.shift(),
                e.done[0].ranges || e.done.shift()
        }
        e.done.push(c),
        e.generation = ++e.maxGeneration,
        e.lastModTime = e.lastSelTime = g,
        e.lastOp = d,
        e.lastOrigin = e.lastSelOrigin = b.origin,
        h || jg(a, "historyAdded")
    }
    function Qd(a, b, c, d) {
        var e = b.charAt(0);
        return "*" == e || "+" == e && c.ranges.length == d.ranges.length && c.somethingSelected() == d.somethingSelected() && new Date - a.history.lastSelTime <= (a.cm ? a.cm.options.historyEventDelay : 500)
    }
    function Rd(a, b, c, d) {
        var e = a.history
          , f = d && d.origin;
        c == e.lastOp || f && e.lastSelOrigin == f && (e.lastModTime == e.lastSelTime && e.lastOrigin == f || Qd(a, f, ke(e.done), b)) ? e.done[e.done.length - 1] = b : Sd(b, e.done),
        e.lastSelTime = +new Date,
        e.lastSelOrigin = f,
        e.lastOp = c,
        d && d.clearRedo !== !1 && Nd(e.undone)
    }
    function Sd(a, b) {
        var c = ke(b);
        c && c.ranges && c.equals(a) || b.push(a)
    }
    function Td(a, b, c, d) {
        var e = b["spans_" + a.id]
          , f = 0;
        a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function(c) {
            c.markedSpans && ((e || (e = b["spans_" + a.id] = {}))[f] = c.markedSpans),
            ++f
        })
    }
    function Ud(a) {
        if (!a)
            return null;
        for (var b, c = 0; c < a.length; ++c)
            a[c].marker.explicitlyCleared ? b || (b = a.slice(0, c)) : b && b.push(a[c]);
        return b ? b.length ? b : null : a
    }
    function Vd(a, b) {
        var c = b["spans_" + a.id];
        if (!c)
            return null;
        for (var d = 0, e = []; d < b.text.length; ++d)
            e.push(Ud(c[d]));
        return e
    }
    function Wd(a, b, c) {
        for (var d = 0, e = []; d < a.length; ++d) {
            var f = a[d];
            if (f.ranges)
                e.push(c ? W.prototype.deepCopy.call(f) : f);
            else {
                var g = f.changes
                  , h = [];
                e.push({
                    changes: h
                });
                for (var i = 0; i < g.length; ++i) {
                    var j, k = g[i];
                    if (h.push({
                        from: k.from,
                        to: k.to,
                        text: k.text
                    }),
                    b)
                        for (var l in k)
                            (j = l.match(/^spans_(\d+)$/)) && le(b, Number(j[1])) > -1 && (ke(h)[l] = k[l],
                            delete k[l])
                }
            }
        }
        return e
    }
    function Xd(a, b, c, d) {
        c < a.line ? a.line += d : b < a.line && (a.line = b,
        a.ch = 0)
    }
    function Yd(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e]
              , g = !0;
            if (f.ranges) {
                f.copied || (f = a[e] = f.deepCopy(),
                f.copied = !0);
                for (var h = 0; h < f.ranges.length; h++)
                    Xd(f.ranges[h].anchor, b, c, d),
                    Xd(f.ranges[h].head, b, c, d)
            } else {
                for (var h = 0; h < f.changes.length; ++h) {
                    var i = f.changes[h];
                    if (c < i.from.line)
                        i.from = qf(i.from.line + d, i.from.ch),
                        i.to = qf(i.to.line + d, i.to.ch);
                    else if (b <= i.to.line) {
                        g = !1;
                        break
                    }
                }
                g || (a.splice(0, e + 1),
                e = 0)
            }
        }
    }
    function Zd(a, b) {
        var c = b.from.line
          , d = b.to.line
          , e = b.text.length - (d - c) - 1;
        Yd(a.done, c, d, e),
        Yd(a.undone, c, d, e)
    }
    function $d(a) {
        return null != a.defaultPrevented ? a.defaultPrevented : 0 == a.returnValue
    }
    function _d(a) {
        return a.target || a.srcElement
    }
    function ae(a) {
        var b = a.which;
        return null == b && (1 & a.button ? b = 1 : 2 & a.button ? b = 3 : 4 & a.button && (b = 2)),
        jf && a.ctrlKey && 1 == b && (b = 3),
        b
    }
    function be(a, b) {
        function c(a) {
            return function() {
                a.apply(null, f)
            }
        }
        var d = a._handlers && a._handlers[b];
        if (d) {
            var e, f = Array.prototype.slice.call(arguments, 2);
            wf ? e = wf.delayedCallbacks : kg ? e = kg : (e = kg = [],
            setTimeout(ce, 0));
            for (var g = 0; g < d.length; ++g)
                e.push(c(d[g]))
        }
    }
    function ce() {
        var a = kg;
        kg = null;
        for (var b = 0; b < a.length; ++b)
            a[b]()
    }
    function de(a, b, c) {
        return jg(a, c || b.type, a, b),
        $d(b) || b.codemirrorIgnore
    }
    function ee(a) {
        var b = a._handlers && a._handlers.cursorActivity;
        if (b)
            for (var c = a.curOp.cursorActivityHandlers || (a.curOp.cursorActivityHandlers = []), d = 0; d < b.length; ++d)
                -1 == le(c, b[d]) && c.push(b[d])
    }
    function fe(a, b) {
        var c = a._handlers && a._handlers[b];
        return c && c.length > 0
    }
    function ge(a) {
        a.prototype.on = function(a, b) {
            hg(this, a, b)
        }
        ,
        a.prototype.off = function(a, b) {
            ig(this, a, b)
        }
    }
    function he() {
        this.id = null
    }
    function ie(a, b, c) {
        for (var d = 0, e = 0; ; ) {
            var f = a.indexOf("	", d);
            -1 == f && (f = a.length);
            var g = f - d;
            if (f == a.length || e + g >= b)
                return d + Math.min(g, b - e);
            if (e += f - d,
            e += c - e % c,
            d = f + 1,
            e >= b)
                return d
        }
    }
    function je(a) {
        for (; rg.length <= a; )
            rg.push(ke(rg) + " ");
        return rg[a]
    }
    function ke(a) {
        return a[a.length - 1]
    }
    function le(a, b) {
        for (var c = 0; c < a.length; ++c)
            if (a[c] == b)
                return c;
        return -1
    }
    function me(a, b) {
        for (var c = [], d = 0; d < a.length; d++)
            c[d] = b(a[d], d);
        return c
    }
    function ne(a, b) {
        var c;
        if (Object.create)
            c = Object.create(a);
        else {
            var d = function() {};
            d.prototype = a,
            c = new d
        }
        return b && oe(b, c),
        c
    }
    function oe(a, b, c) {
        b || (b = {});
        for (var d in a)
            !a.hasOwnProperty(d) || c === !1 && b.hasOwnProperty(d) || (b[d] = a[d]);
        return b
    }
    function pe(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return function() {
            return a.apply(null, b)
        }
    }
    function qe(a, b) {
        return b ? b.source.indexOf("\\w") > -1 && vg(a) ? !0 : b.test(a) : vg(a)
    }
    function re(a) {
        for (var b in a)
            if (a.hasOwnProperty(b) && a[b])
                return !1;
        return !0
    }
    function se(a) {
        return a.charCodeAt(0) >= 768 && wg.test(a)
    }
    function te(a, b, c, d) {
        var e = document.createElement(a);
        if (c && (e.className = c),
        d && (e.style.cssText = d),
        "string" == typeof b)
            e.appendChild(document.createTextNode(b));
        else if (b)
            for (var f = 0; f < b.length; ++f)
                e.appendChild(b[f]);
        return e
    }
    function ue(a) {
        for (var b = a.childNodes.length; b > 0; --b)
            a.removeChild(a.firstChild);
        return a
    }
    function ve(a, b) {
        return ue(a).appendChild(b)
    }
    function we(a, b) {
        if (a.contains)
            return a.contains(b);
        for (; b = b.parentNode; )
            if (b == a)
                return !0
    }
    function xe() {
        return document.activeElement
    }
    function ye(a) {
        return new RegExp("\\b" + a + "\\b\\s*")
    }
    function ze(a, b) {
        var c = ye(b);
        c.test(a.className) && (a.className = a.className.replace(c, ""))
    }
    function Ae(a, b) {
        ye(b).test(a.className) || (a.className += " " + b)
    }
    function Be(a, b) {
        for (var c = a.split(" "), d = 0; d < c.length; d++)
            c[d] && !ye(c[d]).test(b) && (b += " " + c[d]);
        return b
    }
    function Ce(a) {
        if (document.body.getElementsByClassName)
            for (var b = document.body.getElementsByClassName("CodeMirror"), c = 0; c < b.length; c++) {
                var d = b[c].CodeMirror;
                d && a(d)
            }
    }
    function De() {
        Ag || (Ee(),
        Ag = !0)
    }
    function Ee() {
        var a;
        hg(window, "resize", function() {
            null == a && (a = setTimeout(function() {
                a = null,
                xg = null,
                Ce(Cb)
            }, 100))
        }),
        hg(window, "blur", function() {
            Ce(Zb)
        })
    }
    function Fe(a) {
        if (null != xg)
            return xg;
        var b = te("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
        return ve(a, b),
        b.offsetWidth && (xg = b.offsetHeight - b.clientHeight),
        xg || 0
    }
    function Ge(a) {
        if (null == yg) {
            var b = te("span", "​");
            ve(a, te("span", [b, document.createTextNode("x")])),
            0 != a.firstChild.offsetHeight && (yg = b.offsetWidth <= 1 && b.offsetHeight > 2 && !(Ye && 8 > Ze))
        }
        return yg ? te("span", "​") : te("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px")
    }
    function He(a) {
        if (null != zg)
            return zg;
        var b = ve(a, document.createTextNode("AخA"))
          , c = tg(b, 0, 1).getBoundingClientRect();
        if (c.left == c.right)
            return !1;
        var d = tg(b, 1, 2).getBoundingClientRect();
        return zg = d.right - c.right < 3
    }
    function Ie(a) {
        if (null != Fg)
            return Fg;
        var b = ve(a, te("span", "x"))
          , c = b.getBoundingClientRect()
          , d = tg(b, 0, 1).getBoundingClientRect();
        return Fg = Math.abs(c.left - d.left) > 1
    }
    function Je(a, b, c, d) {
        if (!a)
            return d(b, c, "ltr");
        for (var e = !1, f = 0; f < a.length; ++f) {
            var g = a[f];
            (g.from < c && g.to > b || b == c && g.to == b) && (d(Math.max(g.from, b), Math.min(g.to, c), 1 == g.level ? "rtl" : "ltr"),
            e = !0)
        }
        e || d(b, c, "ltr")
    }
    function Ke(a) {
        return a.level % 2 ? a.to : a.from
    }
    function Le(a) {
        return a.level % 2 ? a.from : a.to
    }
    function Me(a) {
        var b = Kd(a);
        return b ? Ke(b[0]) : 0
    }
    function Ne(a) {
        var b = Kd(a);
        return b ? Le(ke(b)) : a.text.length
    }
    function Oe(a, b) {
        var c = Dd(a.doc, b)
          , d = Zc(c);
        d != c && (b = Hd(d));
        var e = Kd(d)
          , f = e ? e[0].level % 2 ? Ne(d) : Me(d) : 0;
        return qf(b, f)
    }
    function Pe(a, b) {
        for (var c, d = Dd(a.doc, b); c = Xc(d); )
            d = c.find(1, !0).line,
            b = null;
        var e = Kd(d)
          , f = e ? e[0].level % 2 ? Me(d) : Ne(d) : d.text.length;
        return qf(null == b ? Hd(d) : b, f)
    }
    function Qe(a, b, c) {
        var d = a[0].level;
        return b == d ? !0 : c == d ? !1 : c > b
    }
    function Re(a, b) {
        Hg = null;
        for (var c, d = 0; d < a.length; ++d) {
            var e = a[d];
            if (e.from < b && e.to > b)
                return d;
            if (e.from == b || e.to == b) {
                if (null != c)
                    return Qe(a, e.level, a[c].level) ? (e.from != e.to && (Hg = c),
                    d) : (e.from != e.to && (Hg = d),
                    c);
                c = d
            }
        }
        return c
    }
    function Se(a, b, c, d) {
        if (!d)
            return b + c;
        do
            b += c;
        while (b > 0 && se(a.text.charAt(b)));return b
    }
    function Te(a, b, c, d) {
        var e = Kd(a);
        if (!e)
            return Ue(a, b, c, d);
        for (var f = Re(e, b), g = e[f], h = Se(a, b, g.level % 2 ? -c : c, d); ; ) {
            if (h > g.from && h < g.to)
                return h;
            if (h == g.from || h == g.to)
                return Re(e, h) == f ? h : (g = e[f += c],
                c > 0 == g.level % 2 ? g.to : g.from);
            if (g = e[f += c],
            !g)
                return null;
            h = c > 0 == g.level % 2 ? Se(a, g.to, -1, d) : Se(a, g.from, 1, d)
        }
    }
    function Ue(a, b, c, d) {
        var e = b + c;
        if (d)
            for (; e > 0 && se(a.text.charAt(e)); )
                e += c;
        return 0 > e || e > a.text.length ? null : e
    }
    var Ve = /gecko\/\d/i.test(navigator.userAgent)
      , We = /MSIE \d/.test(navigator.userAgent)
      , Xe = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent)
      , Ye = We || Xe
      , Ze = Ye && (We ? document.documentMode || 6 : Xe[1])
      , $e = /WebKit\//.test(navigator.userAgent)
      , _e = $e && /Qt\/\d+\.\d+/.test(navigator.userAgent)
      , af = /Chrome\//.test(navigator.userAgent)
      , bf = /Opera\//.test(navigator.userAgent)
      , cf = /Apple Computer/.test(navigator.vendor)
      , df = /KHTML\//.test(navigator.userAgent)
      , ef = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent)
      , ff = /PhantomJS/.test(navigator.userAgent)
      , gf = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent)
      , hf = gf || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent)
      , jf = gf || /Mac/.test(navigator.platform)
      , kf = /win/i.test(navigator.platform)
      , lf = bf && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
    lf && (lf = Number(lf[1])),
    lf && lf >= 15 && (bf = !1,
    $e = !0);
    var mf = jf && (_e || bf && (null == lf || 12.11 > lf))
      , nf = Ve || Ye && Ze >= 9
      , of = !1
      , pf = !1
      , qf = a.Pos = function(a, b) {
        return this instanceof qf ? (this.line = a,
        void (this.ch = b)) : new qf(a,b)
    }
      , rf = a.cmpPos = function(a, b) {
        return a.line - b.line || a.ch - b.ch
    }
    ;
    W.prototype = {
        primary: function() {
            return this.ranges[this.primIndex]
        },
        equals: function(a) {
            if (a == this)
                return !0;
            if (a.primIndex != this.primIndex || a.ranges.length != this.ranges.length)
                return !1;
            for (var b = 0; b < this.ranges.length; b++) {
                var c = this.ranges[b]
                  , d = a.ranges[b];
                if (0 != rf(c.anchor, d.anchor) || 0 != rf(c.head, d.head))
                    return !1
            }
            return !0
        },
        deepCopy: function() {
            for (var a = [], b = 0; b < this.ranges.length; b++)
                a[b] = new X(T(this.ranges[b].anchor),T(this.ranges[b].head));
            return new W(a,this.primIndex)
        },
        somethingSelected: function() {
            for (var a = 0; a < this.ranges.length; a++)
                if (!this.ranges[a].empty())
                    return !0;
            return !1
        },
        contains: function(a, b) {
            b || (b = a);
            for (var c = 0; c < this.ranges.length; c++) {
                var d = this.ranges[c];
                if (rf(b, d.from()) >= 0 && rf(a, d.to()) <= 0)
                    return c
            }
            return -1
        }
    },
    X.prototype = {
        from: function() {
            return V(this.anchor, this.head)
        },
        to: function() {
            return U(this.anchor, this.head)
        },
        empty: function() {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        }
    };
    var sf, tf, uf, vf = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }, wf = null, xf = 0, yf = null, zf = 0, Af = 0, Bf = null;
    Ye ? Bf = -.53 : Ve ? Bf = 15 : af ? Bf = -.7 : cf && (Bf = -1 / 3);
    var Cf, Df = null, Ef = a.changeEnd = function(a) {
        return a.text ? qf(a.from.line + a.text.length - 1, ke(a.text).length + (1 == a.text.length ? a.from.ch : 0)) : a.to
    }
    ;
    a.prototype = {
        constructor: a,
        focus: function() {
            window.focus(),
            yb(this),
            vb(this)
        },
        setOption: function(a, b) {
            var c = this.options
              , d = c[a];
            (c[a] != b || "mode" == a) && (c[a] = b,
            Gf.hasOwnProperty(a) && ib(this, Gf[a])(this, b, d))
        },
        getOption: function(a) {
            return this.options[a]
        },
        getDoc: function() {
            return this.doc
        },
        addKeyMap: function(a, b) {
            this.state.keyMaps[b ? "push" : "unshift"](a)
        },
        removeKeyMap: function(a) {
            for (var b = this.state.keyMaps, c = 0; c < b.length; ++c)
                if (b[c] == a || "string" != typeof b[c] && b[c].name == a)
                    return b.splice(c, 1),
                    !0
        },
        addOverlay: jb(function(b, c) {
            var d = b.token ? b : a.getMode(this.options, b);
            if (d.startState)
                throw new Error("Overlays may not be stateful.");
            this.state.overlays.push({
                mode: d,
                modeSpec: b,
                opaque: c && c.opaque
            }),
            this.state.modeGen++,
            nb(this)
        }),
        removeOverlay: jb(function(a) {
            for (var b = this.state.overlays, c = 0; c < b.length; ++c) {
                var d = b[c].modeSpec;
                if (d == a || "string" == typeof a && d.name == a)
                    return b.splice(c, 1),
                    this.state.modeGen++,
                    void nb(this)
            }
        }),
        indentLine: jb(function(a, b, c) {
            "string" != typeof b && "number" != typeof b && (b = null == b ? this.options.smartIndent ? "smart" : "prev" : b ? "add" : "subtract"),
            ba(this.doc, a) && tc(this, a, b, c)
        }),
        indentSelection: jb(function(a) {
            for (var b = this.doc.sel.ranges, c = -1, d = 0; d < b.length; d++) {
                var e = b[d];
                if (e.empty())
                    e.head.line > c && (tc(this, e.head.line, a, !0),
                    c = e.head.line,
                    d == this.doc.sel.primIndex && rc(this));
                else {
                    var f = Math.max(c, e.from().line)
                      , g = e.to();
                    c = Math.min(this.lastLine(), g.line - (g.ch ? 0 : 1)) + 1;
                    for (var h = f; c > h; ++h)
                        tc(this, h, a)
                }
            }
        }),
        getTokenAt: function(a, b) {
            var c = this.doc;
            a = _(c, a);
            for (var d = ya(this, a.line, b), e = this.doc.mode, f = Dd(c, a.line), g = new Uf(f.text,this.options.tabSize); g.pos < a.ch && !g.eol(); ) {
                g.start = g.pos;
                var h = kd(e, g, d)
            }
            return {
                start: g.start,
                end: g.pos,
                string: g.current(),
                type: h || null,
                state: d
            }
        },
        getTokenTypeAt: function(a) {
            a = _(this.doc, a);
            var b, c = nd(this, Dd(this.doc, a.line)), d = 0, e = (c.length - 1) / 2, f = a.ch;
            if (0 == f)
                b = c[2];
            else
                for (; ; ) {
                    var g = d + e >> 1;
                    if ((g ? c[2 * g - 1] : 0) >= f)
                        e = g;
                    else {
                        if (!(c[2 * g + 1] < f)) {
                            b = c[2 * g + 2];
                            break
                        }
                        d = g + 1
                    }
                }
            var h = b ? b.indexOf("cm-overlay ") : -1;
            return 0 > h ? b : 0 == h ? null : b.slice(0, h - 1)
        },
        getModeAt: function(b) {
            var c = this.doc.mode;
            return c.innerMode ? a.innerMode(c, this.getTokenAt(b).state).mode : c
        },
        getHelper: function(a, b) {
            return this.getHelpers(a, b)[0]
        },
        getHelpers: function(a, b) {
            var c = [];
            if (!Mf.hasOwnProperty(b))
                return Mf;
            var d = Mf[b]
              , e = this.getModeAt(a);
            if ("string" == typeof e[b])
                d[e[b]] && c.push(d[e[b]]);
            else if (e[b])
                for (var f = 0; f < e[b].length; f++) {
                    var g = d[e[b][f]];
                    g && c.push(g)
                }
            else
                e.helperType && d[e.helperType] ? c.push(d[e.helperType]) : d[e.name] && c.push(d[e.name]);
            for (var f = 0; f < d._global.length; f++) {
                var h = d._global[f];
                h.pred(e, this) && -1 == le(c, h.val) && c.push(h.val)
            }
            return c
        },
        getStateAfter: function(a, b) {
            var c = this.doc;
            return a = $(c, null == a ? c.first + c.size - 1 : a),
            ya(this, a + 1, b)
        },
        cursorCoords: function(a, b) {
            var c, d = this.doc.sel.primary();
            return c = null == a ? d.head : "object" == typeof a ? _(this.doc, a) : a ? d.from() : d.to(),
            Ta(this, c, b || "page")
        },
        charCoords: function(a, b) {
            return Sa(this, _(this.doc, a), b || "page")
        },
        coordsChar: function(a, b) {
            return a = Ra(this, a, b || "page"),
            Wa(this, a.left, a.top)
        },
        lineAtHeight: function(a, b) {
            return a = Ra(this, {
                top: a,
                left: 0
            }, b || "page").top,
            Id(this.doc, a + this.display.viewOffset)
        },
        heightAtLine: function(a, b) {
            var c = !1
              , d = this.doc.first + this.doc.size - 1;
            a < this.doc.first ? a = this.doc.first : a > d && (a = d,
            c = !0);
            var e = Dd(this.doc, a);
            return Qa(this, e, {
                top: 0,
                left: 0
            }, b || "page").top + (c ? this.doc.height - Jd(e) : 0)
        },
        defaultTextHeight: function() {
            return Ya(this.display)
        },
        defaultCharWidth: function() {
            return Za(this.display)
        },
        setGutterMarker: jb(function(a, b, c) {
            return uc(this.doc, a, "gutter", function(a) {
                var d = a.gutterMarkers || (a.gutterMarkers = {});
                return d[b] = c,
                !c && re(d) && (a.gutterMarkers = null),
                !0
            })
        }),
        clearGutter: jb(function(a) {
            var b = this
              , c = b.doc
              , d = c.first;
            c.iter(function(c) {
                c.gutterMarkers && c.gutterMarkers[a] && (c.gutterMarkers[a] = null,
                ob(b, d, "gutter"),
                re(c.gutterMarkers) && (c.gutterMarkers = null)),
                ++d
            })
        }),
        addLineWidget: jb(function(a, b, c) {
            return fd(this, a, b, c)
        }),
        removeLineWidget: function(a) {
            a.clear()
        },
        lineInfo: function(a) {
            if ("number" == typeof a) {
                if (!ba(this.doc, a))
                    return null;
                var b = a;
                if (a = Dd(this.doc, a),
                !a)
                    return null
            } else {
                var b = Hd(a);
                if (null == b)
                    return null
            }
            return {
                line: b,
                handle: a,
                text: a.text,
                gutterMarkers: a.gutterMarkers,
                textClass: a.textClass,
                bgClass: a.bgClass,
                wrapClass: a.wrapClass,
                widgets: a.widgets
            }
        },
        getViewport: function() {
            return {
                from: this.display.viewFrom,
                to: this.display.viewTo
            }
        },
        addWidget: function(a, b, c, d, e) {
            var f = this.display;
            a = Ta(this, _(this.doc, a));
            var g = a.bottom
              , h = a.left;
            if (b.style.position = "absolute",
            f.sizer.appendChild(b),
            "over" == d)
                g = a.top;
            else if ("above" == d || "near" == d) {
                var i = Math.max(f.wrapper.clientHeight, this.doc.height)
                  , j = Math.max(f.sizer.clientWidth, f.lineSpace.clientWidth);
                ("above" == d || a.bottom + b.offsetHeight > i) && a.top > b.offsetHeight ? g = a.top - b.offsetHeight : a.bottom + b.offsetHeight <= i && (g = a.bottom),
                h + b.offsetWidth > j && (h = j - b.offsetWidth)
            }
            b.style.top = g + "px",
            b.style.left = b.style.right = "",
            "right" == e ? (h = f.sizer.clientWidth - b.offsetWidth,
            b.style.right = "0px") : ("left" == e ? h = 0 : "middle" == e && (h = (f.sizer.clientWidth - b.offsetWidth) / 2),
            b.style.left = h + "px"),
            c && oc(this, h, g, h + b.offsetWidth, g + b.offsetHeight)
        },
        triggerOnKeyDown: jb(Ub),
        triggerOnKeyPress: jb(Xb),
        triggerOnKeyUp: Wb,
        execCommand: function(a) {
            return Pf.hasOwnProperty(a) ? Pf[a](this) : void 0
        },
        findPosH: function(a, b, c, d) {
            var e = 1;
            0 > b && (e = -1,
            b = -b);
            for (var f = 0, g = _(this.doc, a); b > f && (g = wc(this.doc, g, e, c, d),
            !g.hitSide); ++f)
                ;
            return g
        },
        moveH: jb(function(a, b) {
            var c = this;
            c.extendSelectionsBy(function(d) {
                return c.display.shift || c.doc.extend || d.empty() ? wc(c.doc, d.head, a, b, c.options.rtlMoveVisually) : 0 > a ? d.from() : d.to()
            }, pg)
        }),
        deleteH: jb(function(a, b) {
            var c = this.doc.sel
              , d = this.doc;
            c.somethingSelected() ? d.replaceSelection("", null, "+delete") : vc(this, function(c) {
                var e = wc(d, c.head, a, b, !1);
                return 0 > a ? {
                    from: e,
                    to: c.head
                } : {
                    from: c.head,
                    to: e
                }
            })
        }),
        findPosV: function(a, b, c, d) {
            var e = 1
              , f = d;
            0 > b && (e = -1,
            b = -b);
            for (var g = 0, h = _(this.doc, a); b > g; ++g) {
                var i = Ta(this, h, "div");
                if (null == f ? f = i.left : i.left = f,
                h = xc(this, i, e, c),
                h.hitSide)
                    break
            }
            return h
        },
        moveV: jb(function(a, b) {
            var c = this
              , d = this.doc
              , e = []
              , f = !c.display.shift && !d.extend && d.sel.somethingSelected();
            if (d.extendSelectionsBy(function(g) {
                if (f)
                    return 0 > a ? g.from() : g.to();
                var h = Ta(c, g.head, "div");
                null != g.goalColumn && (h.left = g.goalColumn),
                e.push(h.left);
                var i = xc(c, h, a, b);
                return "page" == b && g == d.sel.primary() && qc(c, null, Sa(c, i, "div").top - h.top),
                i
            }, pg),
            e.length)
                for (var g = 0; g < d.sel.ranges.length; g++)
                    d.sel.ranges[g].goalColumn = e[g]
        }),
        toggleOverwrite: function(a) {
            (null == a || a != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? Ae(this.display.cursorDiv, "CodeMirror-overwrite") : ze(this.display.cursorDiv, "CodeMirror-overwrite"),
            jg(this, "overwriteToggle", this, this.state.overwrite))
        },
        hasFocus: function() {
            return xe() == this.display.input
        },
        scrollTo: jb(function(a, b) {
            (null != a || null != b) && sc(this),
            null != a && (this.curOp.scrollLeft = a),
            null != b && (this.curOp.scrollTop = b)
        }),
        getScrollInfo: function() {
            var a = this.display.scroller
              , b = lg;
            return {
                left: a.scrollLeft,
                top: a.scrollTop,
                height: a.scrollHeight - b,
                width: a.scrollWidth - b,
                clientHeight: a.clientHeight - b,
                clientWidth: a.clientWidth - b
            }
        },
        scrollIntoView: jb(function(a, b) {
            if (null == a ? (a = {
                from: this.doc.sel.primary().head,
                to: null
            },
            null == b && (b = this.options.cursorScrollMargin)) : "number" == typeof a ? a = {
                from: qf(a, 0),
                to: null
            } : null == a.from && (a = {
                from: a,
                to: null
            }),
            a.to || (a.to = a.from),
            a.margin = b || 0,
            null != a.from.line)
                sc(this),
                this.curOp.scrollToPos = a;
            else {
                var c = pc(this, Math.min(a.from.left, a.to.left), Math.min(a.from.top, a.to.top) - a.margin, Math.max(a.from.right, a.to.right), Math.max(a.from.bottom, a.to.bottom) + a.margin);
                this.scrollTo(c.scrollLeft, c.scrollTop)
            }
        }),
        setSize: jb(function(a, b) {
            function c(a) {
                return "number" == typeof a || /^\d+$/.test(String(a)) ? a + "px" : a
            }
            var d = this;
            null != a && (d.display.wrapper.style.width = c(a)),
            null != b && (d.display.wrapper.style.height = c(b)),
            d.options.lineWrapping && Ma(this);
            var e = d.display.viewFrom;
            d.doc.iter(e, d.display.viewTo, function(a) {
                if (a.widgets)
                    for (var b = 0; b < a.widgets.length; b++)
                        if (a.widgets[b].noHScroll) {
                            ob(d, e, "widget");
                            break
                        }
                ++e
            }),
            d.curOp.forceUpdate = !0,
            jg(d, "refresh", this)
        }),
        operation: function(a) {
            return hb(this, a)
        },
        refresh: jb(function() {
            var a = this.display.cachedTextHeight;
            nb(this),
            this.curOp.forceUpdate = !0,
            Na(this),
            this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop),
            l(this),
            (null == a || Math.abs(a - Ya(this.display)) > .5) && g(this),
            jg(this, "refresh", this)
        }),
        swapDoc: jb(function(a) {
            var b = this.doc;
            return b.cm = null,
            Cd(this, a),
            Na(this),
            xb(this),
            this.scrollTo(a.scrollLeft, a.scrollTop),
            be(this, "swapDoc", this, b),
            b
        }),
        getInputField: function() {
            return this.display.input
        },
        getWrapperElement: function() {
            return this.display.wrapper
        },
        getScrollerElement: function() {
            return this.display.scroller
        },
        getGutterElement: function() {
            return this.display.gutters
        }
    },
    ge(a);
    var Ff = a.defaults = {}
      , Gf = a.optionHandlers = {}
      , Hf = a.Init = {
        toString: function() {
            return "CodeMirror.Init"
        }
    };
    zc("value", "", function(a, b) {
        a.setValue(b)
    }, !0),
    zc("mode", null, function(a, b) {
        a.doc.modeOption = b,
        c(a)
    }, !0),
    zc("indentUnit", 2, c, !0),
    zc("indentWithTabs", !1),
    zc("smartIndent", !0),
    zc("tabSize", 4, function(a) {
        d(a),
        Na(a),
        nb(a)
    }, !0),
    zc("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, function(a, b) {
        a.options.specialChars = new RegExp(b.source + (b.test("	") ? "" : "|	"),"g"),
        a.refresh()
    }, !0),
    zc("specialCharPlaceholder", rd, function(a) {
        a.refresh()
    }, !0),
    zc("electricChars", !0),
    zc("rtlMoveVisually", !kf),
    zc("wholeLineUpdateBefore", !0),
    zc("theme", "default", function(a) {
        i(a),
        j(a)
    }, !0),
    zc("keyMap", "default", h),
    zc("extraKeys", null),
    zc("lineWrapping", !1, e, !0),
    zc("gutters", [], function(a) {
        o(a.options),
        j(a)
    }, !0),
    zc("fixedGutter", !0, function(a, b) {
        a.display.gutters.style.left = b ? w(a.display) + "px" : "0",
        a.refresh()
    }, !0),
    zc("coverGutterNextToScrollbar", !1, r, !0),
    zc("lineNumbers", !1, function(a) {
        o(a.options),
        j(a)
    }, !0),
    zc("firstLineNumber", 1, j, !0),
    zc("lineNumberFormatter", function(a) {
        return a
    }, j, !0),
    zc("showCursorWhenSelecting", !1, ra, !0),
    zc("resetSelectionOnContextMenu", !0),
    zc("readOnly", !1, function(a, b) {
        "nocursor" == b ? (Zb(a),
        a.display.input.blur(),
        a.display.disabled = !0) : (a.display.disabled = !1,
        b || xb(a))
    }),
    zc("disableInput", !1, function(a, b) {
        b || xb(a)
    }, !0),
    zc("dragDrop", !0),
    zc("cursorBlinkRate", 530),
    zc("cursorScrollMargin", 0),
    zc("cursorHeight", 1, ra, !0),
    zc("singleCursorHeightPerLine", !0, ra, !0),
    zc("workTime", 100),
    zc("workDelay", 100),
    zc("flattenSpans", !0, d, !0),
    zc("addModeClass", !1, d, !0),
    zc("pollInterval", 100),
    zc("undoDepth", 200, function(a, b) {
        a.doc.history.undoDepth = b
    }),
    zc("historyEventDelay", 1250),
    zc("viewportMargin", 10, function(a) {
        a.refresh()
    }, !0),
    zc("maxHighlightLength", 1e4, d, !0),
    zc("moveInputWithCursor", !0, function(a, b) {
        b || (a.display.inputDiv.style.top = a.display.inputDiv.style.left = 0)
    }),
    zc("tabindex", null, function(a, b) {
        a.display.input.tabIndex = b || ""
    }),
    zc("autofocus", null);
    var If = a.modes = {}
      , Jf = a.mimeModes = {};
    a.defineMode = function(b, c) {
        if (a.defaults.mode || "null" == b || (a.defaults.mode = b),
        arguments.length > 2) {
            c.dependencies = [];
            for (var d = 2; d < arguments.length; ++d)
                c.dependencies.push(arguments[d])
        }
        If[b] = c
    }
    ,
    a.defineMIME = function(a, b) {
        Jf[a] = b
    }
    ,
    a.resolveMode = function(b) {
        if ("string" == typeof b && Jf.hasOwnProperty(b))
            b = Jf[b];
        else if (b && "string" == typeof b.name && Jf.hasOwnProperty(b.name)) {
            var c = Jf[b.name];
            "string" == typeof c && (c = {
                name: c
            }),
            b = ne(c, b),
            b.name = c.name
        } else if ("string" == typeof b && /^[\w\-]+\/[\w\-]+\+xml$/.test(b))
            return a.resolveMode("application/xml");
        return "string" == typeof b ? {
            name: b
        } : b || {
            name: "null"
        }
    }
    ,
    a.getMode = function(b, c) {
        var c = a.resolveMode(c)
          , d = If[c.name];
        if (!d)
            return a.getMode(b, "text/plain");
        var e = d(b, c);
        if (Kf.hasOwnProperty(c.name)) {
            var f = Kf[c.name];
            for (var g in f)
                f.hasOwnProperty(g) && (e.hasOwnProperty(g) && (e["_" + g] = e[g]),
                e[g] = f[g])
        }
        if (e.name = c.name,
        c.helperType && (e.helperType = c.helperType),
        c.modeProps)
            for (var g in c.modeProps)
                e[g] = c.modeProps[g];
        return e
    }
    ,
    a.defineMode("null", function() {
        return {
            token: function(a) {
                a.skipToEnd()
            }
        }
    }),
    a.defineMIME("text/plain", "null");
    var Kf = a.modeExtensions = {};
    a.extendMode = function(a, b) {
        var c = Kf.hasOwnProperty(a) ? Kf[a] : Kf[a] = {};
        oe(b, c)
    }
    ,
    a.defineExtension = function(b, c) {
        a.prototype[b] = c
    }
    ,
    a.defineDocExtension = function(a, b) {
        bg.prototype[a] = b
    }
    ,
    a.defineOption = zc;
    var Lf = [];
    a.defineInitHook = function(a) {
        Lf.push(a)
    }
    ;
    var Mf = a.helpers = {};
    a.registerHelper = function(b, c, d) {
        Mf.hasOwnProperty(b) || (Mf[b] = a[b] = {
            _global: []
        }),
        Mf[b][c] = d
    }
    ,
    a.registerGlobalHelper = function(b, c, d, e) {
        a.registerHelper(b, c, e),
        Mf[b]._global.push({
            pred: d,
            val: e
        })
    }
    ;
    var Nf = a.copyState = function(a, b) {
        if (b === !0)
            return b;
        if (a.copyState)
            return a.copyState(b);
        var c = {};
        for (var d in b) {
            var e = b[d];
            e instanceof Array && (e = e.concat([])),
            c[d] = e
        }
        return c
    }
      , Of = a.startState = function(a, b, c) {
        return a.startState ? a.startState(b, c) : !0
    }
    ;
    a.innerMode = function(a, b) {
        for (; a.innerMode; ) {
            var c = a.innerMode(b);
            if (!c || c.mode == a)
                break;
            b = c.state,
            a = c.mode
        }
        return c || {
            mode: a,
            state: b
        }
    }
    ;
    var Pf = a.commands = {
        selectAll: function(a) {
            a.setSelection(qf(a.firstLine(), 0), qf(a.lastLine()), ng)
        },
        singleSelection: function(a) {
            a.setSelection(a.getCursor("anchor"), a.getCursor("head"), ng)
        },
        killLine: function(a) {
            vc(a, function(b) {
                if (b.empty()) {
                    var c = Dd(a.doc, b.head.line).text.length;
                    return b.head.ch == c && b.head.line < a.lastLine() ? {
                        from: b.head,
                        to: qf(b.head.line + 1, 0)
                    } : {
                        from: b.head,
                        to: qf(b.head.line, c)
                    }
                }
                return {
                    from: b.from(),
                    to: b.to()
                }
            })
        },
        deleteLine: function(a) {
            vc(a, function(b) {
                return {
                    from: qf(b.from().line, 0),
                    to: _(a.doc, qf(b.to().line + 1, 0))
                }
            })
        },
        delLineLeft: function(a) {
            vc(a, function(a) {
                return {
                    from: qf(a.from().line, 0),
                    to: a.from()
                }
            })
        },
        delWrappedLineLeft: function(a) {
            vc(a, function(b) {
                var c = a.charCoords(b.head, "div").top + 5
                  , d = a.coordsChar({
                    left: 0,
                    top: c
                }, "div");
                return {
                    from: d,
                    to: b.from()
                }
            })
        },
        delWrappedLineRight: function(a) {
            vc(a, function(b) {
                var c = a.charCoords(b.head, "div").top + 5
                  , d = a.coordsChar({
                    left: a.display.lineDiv.offsetWidth + 100,
                    top: c
                }, "div");
                return {
                    from: b.from(),
                    to: d
                }
            })
        },
        undo: function(a) {
            a.undo()
        },
        redo: function(a) {
            a.redo()
        },
        undoSelection: function(a) {
            a.undoSelection()
        },
        redoSelection: function(a) {
            a.redoSelection()
        },
        goDocStart: function(a) {
            a.extendSelection(qf(a.firstLine(), 0))
        },
        goDocEnd: function(a) {
            a.extendSelection(qf(a.lastLine()))
        },
        goLineStart: function(a) {
            a.extendSelectionsBy(function(b) {
                return Oe(a, b.head.line)
            }, {
                origin: "+move",
                bias: 1
            })
        },
        goLineStartSmart: function(a) {
            a.extendSelectionsBy(function(b) {
                var c = Oe(a, b.head.line)
                  , d = a.getLineHandle(c.line)
                  , e = Kd(d);
                if (!e || 0 == e[0].level) {
                    var f = Math.max(0, d.text.search(/\S/))
                      , g = b.head.line == c.line && b.head.ch <= f && b.head.ch;
                    return qf(c.line, g ? 0 : f)
                }
                return c
            }, {
                origin: "+move",
                bias: 1
            })
        },
        goLineEnd: function(a) {
            a.extendSelectionsBy(function(b) {
                return Pe(a, b.head.line)
            }, {
                origin: "+move",
                bias: -1
            })
        },
        goLineRight: function(a) {
            a.extendSelectionsBy(function(b) {
                var c = a.charCoords(b.head, "div").top + 5;
                return a.coordsChar({
                    left: a.display.lineDiv.offsetWidth + 100,
                    top: c
                }, "div")
            }, pg)
        },
        goLineLeft: function(a) {
            a.extendSelectionsBy(function(b) {
                var c = a.charCoords(b.head, "div").top + 5;
                return a.coordsChar({
                    left: 0,
                    top: c
                }, "div")
            }, pg)
        },
        goLineUp: function(a) {
            a.moveV(-1, "line")
        },
        goLineDown: function(a) {
            a.moveV(1, "line")
        },
        goPageUp: function(a) {
            a.moveV(-1, "page")
        },
        goPageDown: function(a) {
            a.moveV(1, "page")
        },
        goCharLeft: function(a) {
            a.moveH(-1, "char")
        },
        goCharRight: function(a) {
            a.moveH(1, "char")
        },
        goColumnLeft: function(a) {
            a.moveH(-1, "column")
        },
        goColumnRight: function(a) {
            a.moveH(1, "column")
        },
        goWordLeft: function(a) {
            a.moveH(-1, "word")
        },
        goGroupRight: function(a) {
            a.moveH(1, "group")
        },
        goGroupLeft: function(a) {
            a.moveH(-1, "group")
        },
        goWordRight: function(a) {
            a.moveH(1, "word")
        },
        delCharBefore: function(a) {
            a.deleteH(-1, "char")
        },
        delCharAfter: function(a) {
            a.deleteH(1, "char")
        },
        delWordBefore: function(a) {
            a.deleteH(-1, "word")
        },
        delWordAfter: function(a) {
            a.deleteH(1, "word")
        },
        delGroupBefore: function(a) {
            a.deleteH(-1, "group")
        },
        delGroupAfter: function(a) {
            a.deleteH(1, "group")
        },
        indentAuto: function(a) {
            a.indentSelection("smart")
        },
        indentMore: function(a) {
            a.indentSelection("add")
        },
        indentLess: function(a) {
            a.indentSelection("subtract")
        },
        insertTab: function(a) {
            a.replaceSelection("	")
        },
        insertSoftTab: function(a) {
            for (var b = [], c = a.listSelections(), d = a.options.tabSize, e = 0; e < c.length; e++) {
                var f = c[e].from()
                  , g = qg(a.getLine(f.line), f.ch, d);
                b.push(new Array(d - g % d + 1).join(" "))
            }
            a.replaceSelections(b)
        },
        defaultTab: function(a) {
            a.somethingSelected() ? a.indentSelection("add") : a.execCommand("insertTab")
        },
        transposeChars: function(a) {
            hb(a, function() {
                for (var b = a.listSelections(), c = [], d = 0; d < b.length; d++) {
                    var e = b[d].head
                      , f = Dd(a.doc, e.line).text;
                    if (f)
                        if (e.ch == f.length && (e = new qf(e.line,e.ch - 1)),
                        e.ch > 0)
                            e = new qf(e.line,e.ch + 1),
                            a.replaceRange(f.charAt(e.ch - 1) + f.charAt(e.ch - 2), qf(e.line, e.ch - 2), e, "+transpose");
                        else if (e.line > a.doc.first) {
                            var g = Dd(a.doc, e.line - 1).text;
                            g && a.replaceRange(f.charAt(0) + "\n" + g.charAt(g.length - 1), qf(e.line - 1, g.length - 1), qf(e.line, 1), "+transpose")
                        }
                    c.push(new X(e,e))
                }
                a.setSelections(c)
            })
        },
        newlineAndIndent: function(a) {
            hb(a, function() {
                for (var b = a.listSelections().length, c = 0; b > c; c++) {
                    var d = a.listSelections()[c];
                    a.replaceRange("\n", d.anchor, d.head, "+input"),
                    a.indentLine(d.from().line + 1, null, !0),
                    rc(a)
                }
            })
        },
        toggleOverwrite: function(a) {
            a.toggleOverwrite()
        }
    }
      , Qf = a.keyMap = {};
    Qf.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
    },
    Qf.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
    },
    Qf.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        fallthrough: ["basic", "emacsy"]
    },
    Qf.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    },
    Qf["default"] = jf ? Qf.macDefault : Qf.pcDefault;
    var Rf = a.lookupKey = function(a, b, c) {
        function d(b) {
            b = Ac(b);
            var e = b[a];
            if (e === !1)
                return "stop";
            if (null != e && c(e))
                return !0;
            if (b.nofallthrough)
                return "stop";
            var f = b.fallthrough;
            if (null == f)
                return !1;
            if ("[object Array]" != Object.prototype.toString.call(f))
                return d(f);
            for (var g = 0; g < f.length; ++g) {
                var h = d(f[g]);
                if (h)
                    return h
            }
            return !1
        }
        for (var e = 0; e < b.length; ++e) {
            var f = d(b[e]);
            if (f)
                return "stop" != f
        }
    }
      , Sf = a.isModifierKey = function(a) {
        var b = Gg[a.keyCode];
        return "Ctrl" == b || "Alt" == b || "Shift" == b || "Mod" == b
    }
      , Tf = a.keyName = function(a, b) {
        if (bf && 34 == a.keyCode && a["char"])
            return !1;
        var c = Gg[a.keyCode];
        return null == c || a.altGraphKey ? !1 : (a.altKey && (c = "Alt-" + c),
        (mf ? a.metaKey : a.ctrlKey) && (c = "Ctrl-" + c),
        (mf ? a.ctrlKey : a.metaKey) && (c = "Cmd-" + c),
        !b && a.shiftKey && (c = "Shift-" + c),
        c)
    }
    ;
    a.fromTextArea = function(b, c) {
        function d() {
            b.value = j.getValue()
        }
        if (c || (c = {}),
        c.value = b.value,
        !c.tabindex && b.tabindex && (c.tabindex = b.tabindex),
        !c.placeholder && b.placeholder && (c.placeholder = b.placeholder),
        null == c.autofocus) {
            var e = xe();
            c.autofocus = e == b || null != b.getAttribute("autofocus") && e == document.body
        }
        if (b.form && (hg(b.form, "submit", d),
        !c.leaveSubmitMethodAlone)) {
            var f = b.form
              , g = f.submit;
            try {
                var h = f.submit = function() {
                    d(),
                    f.submit = g,
                    f.submit(),
                    f.submit = h
                }
            } catch (i) {}
        }
        b.style.display = "none";
        var j = a(function(a) {
            b.parentNode.insertBefore(a, b.nextSibling)
        }, c);
        return j.save = d,
        j.getTextArea = function() {
            return b
        }
        ,
        j.toTextArea = function() {
            d(),
            b.parentNode.removeChild(j.getWrapperElement()),
            b.style.display = "",
            b.form && (ig(b.form, "submit", d),
            "function" == typeof b.form.submit && (b.form.submit = g))
        }
        ,
        j
    }
    ;
    var Uf = a.StringStream = function(a, b) {
        this.pos = this.start = 0,
        this.string = a,
        this.tabSize = b || 8,
        this.lastColumnPos = this.lastColumnValue = 0,
        this.lineStart = 0
    }
    ;
    Uf.prototype = {
        eol: function() {
            return this.pos >= this.string.length
        },
        sol: function() {
            return this.pos == this.lineStart
        },
        peek: function() {
            return this.string.charAt(this.pos) || void 0
        },
        next: function() {
            return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0
        },
        eat: function(a) {
            var b = this.string.charAt(this.pos);
            if ("string" == typeof a)
                var c = b == a;
            else
                var c = b && (a.test ? a.test(b) : a(b));
            return c ? (++this.pos,
            b) : void 0
        },
        eatWhile: function(a) {
            for (var b = this.pos; this.eat(a); )
                ;
            return this.pos > b
        },
        eatSpace: function() {
            for (var a = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
                ++this.pos;
            return this.pos > a
        },
        skipToEnd: function() {
            this.pos = this.string.length
        },
        skipTo: function(a) {
            var b = this.string.indexOf(a, this.pos);
            return b > -1 ? (this.pos = b,
            !0) : void 0
        },
        backUp: function(a) {
            this.pos -= a
        },
        column: function() {
            return this.lastColumnPos < this.start && (this.lastColumnValue = qg(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue),
            this.lastColumnPos = this.start),
            this.lastColumnValue - (this.lineStart ? qg(this.string, this.lineStart, this.tabSize) : 0)
        },
        indentation: function() {
            return qg(this.string, null, this.tabSize) - (this.lineStart ? qg(this.string, this.lineStart, this.tabSize) : 0)
        },
        match: function(a, b, c) {
            if ("string" != typeof a) {
                var d = this.string.slice(this.pos).match(a);
                return d && d.index > 0 ? null : (d && b !== !1 && (this.pos += d[0].length),
                d)
            }
            var e = function(a) {
                return c ? a.toLowerCase() : a
            }
              , f = this.string.substr(this.pos, a.length);
            return e(f) == e(a) ? (b !== !1 && (this.pos += a.length),
            !0) : void 0
        },
        current: function() {
            return this.string.slice(this.start, this.pos)
        },
        hideFirstChars: function(a, b) {
            this.lineStart += a;
            try {
                return b()
            } finally {
                this.lineStart -= a
            }
        }
    };
    var Vf = a.TextMarker = function(a, b) {
        this.lines = [],
        this.type = b,
        this.doc = a
    }
    ;
    ge(Vf),
    Vf.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            var a = this.doc.cm
              , b = a && !a.curOp;
            if (b && $a(a),
            fe(this, "clear")) {
                var c = this.find();
                c && be(this, "clear", c.from, c.to)
            }
            for (var d = null, e = null, f = 0; f < this.lines.length; ++f) {
                var g = this.lines[f]
                  , h = Hc(g.markedSpans, this);
                a && !this.collapsed ? ob(a, Hd(g), "text") : a && (null != h.to && (e = Hd(g)),
                null != h.from && (d = Hd(g))),
                g.markedSpans = Ic(g.markedSpans, h),
                null == h.from && this.collapsed && !bd(this.doc, g) && a && Gd(g, Ya(a.display))
            }
            if (a && this.collapsed && !a.options.lineWrapping)
                for (var f = 0; f < this.lines.length; ++f) {
                    var i = Zc(this.lines[f])
                      , j = m(i);
                    j > a.display.maxLineLength && (a.display.maxLine = i,
                    a.display.maxLineLength = j,
                    a.display.maxLineChanged = !0)
                }
            null != d && a && this.collapsed && nb(a, d, e + 1),
            this.lines.length = 0,
            this.explicitlyCleared = !0,
            this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1,
            a && na(a.doc)),
            a && be(a, "markerCleared", a, this),
            b && ab(a),
            this.parent && this.parent.clear()
        }
    }
    ,
    Vf.prototype.find = function(a, b) {
        null == a && "bookmark" == this.type && (a = 1);
        for (var c, d, e = 0; e < this.lines.length; ++e) {
            var f = this.lines[e]
              , g = Hc(f.markedSpans, this);
            if (null != g.from && (c = qf(b ? f : Hd(f), g.from),
            -1 == a))
                return c;
            if (null != g.to && (d = qf(b ? f : Hd(f), g.to),
            1 == a))
                return d
        }
        return c && {
            from: c,
            to: d
        }
    }
    ,
    Vf.prototype.changed = function() {
        var a = this.find(-1, !0)
          , b = this
          , c = this.doc.cm;
        a && c && hb(c, function() {
            var d = a.line
              , e = Hd(a.line)
              , f = Ga(c, e);
            if (f && (La(f),
            c.curOp.selectionChanged = c.curOp.forceUpdate = !0),
            c.curOp.updateMaxLine = !0,
            !bd(b.doc, d) && null != b.height) {
                var g = b.height;
                b.height = null;
                var h = ed(b) - g;
                h && Gd(d, d.height + h)
            }
        })
    }
    ,
    Vf.prototype.attachLine = function(a) {
        if (!this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            b.maybeHiddenMarkers && -1 != le(b.maybeHiddenMarkers, this) || (b.maybeUnhiddenMarkers || (b.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(a)
    }
    ,
    Vf.prototype.detachLine = function(a) {
        if (this.lines.splice(le(this.lines, a), 1),
        !this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            (b.maybeHiddenMarkers || (b.maybeHiddenMarkers = [])).push(this)
        }
    }
    ;
    var Wf = 0
      , Xf = a.SharedTextMarker = function(a, b) {
        this.markers = a,
        this.primary = b;
        for (var c = 0; c < a.length; ++c)
            a[c].parent = this
    }
    ;
    ge(Xf),
    Xf.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var a = 0; a < this.markers.length; ++a)
                this.markers[a].clear();
            be(this, "clear")
        }
    }
    ,
    Xf.prototype.find = function(a, b) {
        return this.primary.find(a, b)
    }
    ;
    var Yf = a.LineWidget = function(a, b, c) {
        if (c)
            for (var d in c)
                c.hasOwnProperty(d) && (this[d] = c[d]);
        this.cm = a,
        this.node = b
    }
    ;
    ge(Yf),
    Yf.prototype.clear = function() {
        var a = this.cm
          , b = this.line.widgets
          , c = this.line
          , d = Hd(c);
        if (null != d && b) {
            for (var e = 0; e < b.length; ++e)
                b[e] == this && b.splice(e--, 1);
            b.length || (c.widgets = null);
            var f = ed(this);
            hb(a, function() {
                dd(a, c, -f),
                ob(a, d, "widget"),
                Gd(c, Math.max(0, c.height - f))
            })
        }
    }
    ,
    Yf.prototype.changed = function() {
        var a = this.height
          , b = this.cm
          , c = this.line;
        this.height = null;
        var d = ed(this) - a;
        d && hb(b, function() {
            b.curOp.forceUpdate = !0,
            dd(b, c, d),
            Gd(c, c.height + d)
        })
    }
    ;
    var Zf = a.Line = function(a, b, c) {
        this.text = a,
        Rc(this, b),
        this.height = c ? c(this) : 1
    }
    ;
    ge(Zf),
    Zf.prototype.lineNo = function() {
        return Hd(this)
    }
    ;
    var $f = {}
      , _f = {};
    zd.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(a, b) {
            for (var c = a, d = a + b; d > c; ++c) {
                var e = this.lines[c];
                this.height -= e.height,
                hd(e),
                be(e, "delete")
            }
            this.lines.splice(a, b)
        },
        collapse: function(a) {
            a.push.apply(a, this.lines)
        },
        insertInner: function(a, b, c) {
            this.height += c,
            this.lines = this.lines.slice(0, a).concat(b).concat(this.lines.slice(a));
            for (var d = 0; d < b.length; ++d)
                b[d].parent = this
        },
        iterN: function(a, b, c) {
            for (var d = a + b; d > a; ++a)
                if (c(this.lines[a]))
                    return !0
        }
    },
    Ad.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(a, b) {
            this.size -= b;
            for (var c = 0; c < this.children.length; ++c) {
                var d = this.children[c]
                  , e = d.chunkSize();
                if (e > a) {
                    var f = Math.min(b, e - a)
                      , g = d.height;
                    if (d.removeInner(a, f),
                    this.height -= g - d.height,
                    e == f && (this.children.splice(c--, 1),
                    d.parent = null),
                    0 == (b -= f))
                        break;
                    a = 0
                } else
                    a -= e
            }
            if (this.size - b < 25 && (this.children.length > 1 || !(this.children[0]instanceof zd))) {
                var h = [];
                this.collapse(h),
                this.children = [new zd(h)],
                this.children[0].parent = this
            }
        },
        collapse: function(a) {
            for (var b = 0; b < this.children.length; ++b)
                this.children[b].collapse(a)
        },
        insertInner: function(a, b, c) {
            this.size += b.length,
            this.height += c;
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d]
                  , f = e.chunkSize();
                if (f >= a) {
                    if (e.insertInner(a, b, c),
                    e.lines && e.lines.length > 50) {
                        for (; e.lines.length > 50; ) {
                            var g = e.lines.splice(e.lines.length - 25, 25)
                              , h = new zd(g);
                            e.height -= h.height,
                            this.children.splice(d + 1, 0, h),
                            h.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                a -= f
            }
        },
        maybeSpill: function() {
            if (!(this.children.length <= 10)) {
                var a = this;
                do {
                    var b = a.children.splice(a.children.length - 5, 5)
                      , c = new Ad(b);
                    if (a.parent) {
                        a.size -= c.size,
                        a.height -= c.height;
                        var d = le(a.parent.children, a);
                        a.parent.children.splice(d + 1, 0, c)
                    } else {
                        var e = new Ad(a.children);
                        e.parent = a,
                        a.children = [e, c],
                        a = e
                    }
                    c.parent = a.parent
                } while (a.children.length > 10);a.parent.maybeSpill()
            }
        },
        iterN: function(a, b, c) {
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d]
                  , f = e.chunkSize();
                if (f > a) {
                    var g = Math.min(b, f - a);
                    if (e.iterN(a, g, c))
                        return !0;
                    if (0 == (b -= g))
                        break;
                    a = 0
                } else
                    a -= f
            }
        }
    };
    var ag = 0
      , bg = a.Doc = function(a, b, c) {
        if (!(this instanceof bg))
            return new bg(a,b,c);
        null == c && (c = 0),
        Ad.call(this, [new zd([new Zf("",null)])]),
        this.first = c,
        this.scrollTop = this.scrollLeft = 0,
        this.cantEdit = !1,
        this.cleanGeneration = 1,
        this.frontier = c;
        var d = qf(c, 0);
        this.sel = Z(d),
        this.history = new Ld(null),
        this.id = ++ag,
        this.modeOption = b,
        "string" == typeof a && (a = Cg(a)),
        yd(this, {
            from: d,
            to: d,
            text: a
        }),
        ka(this, Z(d), ng)
    }
    ;
    bg.prototype = ne(Ad.prototype, {
        constructor: bg,
        iter: function(a, b, c) {
            c ? this.iterN(a - this.first, b - a, c) : this.iterN(this.first, this.first + this.size, a)
        },
        insert: function(a, b) {
            for (var c = 0, d = 0; d < b.length; ++d)
                c += b[d].height;
            this.insertInner(a - this.first, b, c)
        },
        remove: function(a, b) {
            this.removeInner(a - this.first, b)
        },
        getValue: function(a) {
            var b = Fd(this, this.first, this.first + this.size);
            return a === !1 ? b : b.join(a || "\n")
        },
        setValue: kb(function(a) {
            var b = qf(this.first, 0)
              , c = this.first + this.size - 1;
            fc(this, {
                from: b,
                to: qf(c, Dd(this, c).text.length),
                text: Cg(a),
                origin: "setValue"
            }, !0),
            ka(this, Z(b))
        }),
        replaceRange: function(a, b, c, d) {
            b = _(this, b),
            c = c ? _(this, c) : b,
            lc(this, a, b, c, d)
        },
        getRange: function(a, b, c) {
            var d = Ed(this, _(this, a), _(this, b));
            return c === !1 ? d : d.join(c || "\n")
        },
        getLine: function(a) {
            var b = this.getLineHandle(a);
            return b && b.text
        },
        getLineHandle: function(a) {
            return ba(this, a) ? Dd(this, a) : void 0
        },
        getLineNumber: function(a) {
            return Hd(a)
        },
        getLineHandleVisualStart: function(a) {
            return "number" == typeof a && (a = Dd(this, a)),
            Zc(a)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(a) {
            return _(this, a)
        },
        getCursor: function(a) {
            var b, c = this.sel.primary();
            return b = null == a || "head" == a ? c.head : "anchor" == a ? c.anchor : "end" == a || "to" == a || a === !1 ? c.to() : c.from()
        },
        listSelections: function() {
            return this.sel.ranges
        },
        somethingSelected: function() {
            return this.sel.somethingSelected()
        },
        setCursor: kb(function(a, b, c) {
            ha(this, _(this, "number" == typeof a ? qf(a, b || 0) : a), null, c)
        }),
        setSelection: kb(function(a, b, c) {
            ha(this, _(this, a), _(this, b || a), c)
        }),
        extendSelection: kb(function(a, b, c) {
            ea(this, _(this, a), b && _(this, b), c)
        }),
        extendSelections: kb(function(a, b) {
            fa(this, ca(this, a, b))
        }),
        extendSelectionsBy: kb(function(a, b) {
            fa(this, me(this.sel.ranges, a), b)
        }),
        setSelections: kb(function(a, b, c) {
            if (a.length) {
                for (var d = 0, e = []; d < a.length; d++)
                    e[d] = new X(_(this, a[d].anchor),_(this, a[d].head));
                null == b && (b = Math.min(a.length - 1, this.sel.primIndex)),
                ka(this, Y(e, b), c)
            }
        }),
        addSelection: kb(function(a, b, c) {
            var d = this.sel.ranges.slice(0);
            d.push(new X(_(this, a),_(this, b || a))),
            ka(this, Y(d, d.length - 1), c)
        }),
        getSelection: function(a) {
            for (var b, c = this.sel.ranges, d = 0; d < c.length; d++) {
                var e = Ed(this, c[d].from(), c[d].to());
                b = b ? b.concat(e) : e
            }
            return a === !1 ? b : b.join(a || "\n")
        },
        getSelections: function(a) {
            for (var b = [], c = this.sel.ranges, d = 0; d < c.length; d++) {
                var e = Ed(this, c[d].from(), c[d].to());
                a !== !1 && (e = e.join(a || "\n")),
                b[d] = e
            }
            return b
        },
        replaceSelection: function(a, b, c) {
            for (var d = [], e = 0; e < this.sel.ranges.length; e++)
                d[e] = a;
            this.replaceSelections(d, b, c || "+input")
        },
        replaceSelections: kb(function(a, b, c) {
            for (var d = [], e = this.sel, f = 0; f < e.ranges.length; f++) {
                var g = e.ranges[f];
                d[f] = {
                    from: g.from(),
                    to: g.to(),
                    text: Cg(a[f]),
                    origin: c
                }
            }
            for (var h = b && "end" != b && dc(this, d, b), f = d.length - 1; f >= 0; f--)
                fc(this, d[f]);
            h ? ja(this, h) : this.cm && rc(this.cm)
        }),
        undo: kb(function() {
            hc(this, "undo")
        }),
        redo: kb(function() {
            hc(this, "redo")
        }),
        undoSelection: kb(function() {
            hc(this, "undo", !0)
        }),
        redoSelection: kb(function() {
            hc(this, "redo", !0)
        }),
        setExtending: function(a) {
            this.extend = a
        },
        getExtending: function() {
            return this.extend
        },
        historySize: function() {
            for (var a = this.history, b = 0, c = 0, d = 0; d < a.done.length; d++)
                a.done[d].ranges || ++b;
            for (var d = 0; d < a.undone.length; d++)
                a.undone[d].ranges || ++c;
            return {
                undo: b,
                redo: c
            }
        },
        clearHistory: function() {
            this.history = new Ld(this.history.maxGeneration)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(!0)
        },
        changeGeneration: function(a) {
            return a && (this.history.lastOp = this.history.lastOrigin = null),
            this.history.generation
        },
        isClean: function(a) {
            return this.history.generation == (a || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: Wd(this.history.done),
                undone: Wd(this.history.undone)
            }
        },
        setHistory: function(a) {
            var b = this.history = new Ld(this.history.maxGeneration);
            b.done = Wd(a.done.slice(0), null, !0),
            b.undone = Wd(a.undone.slice(0), null, !0)
        },
        addLineClass: kb(function(a, b, c) {
            return uc(this, a, "class", function(a) {
                var d = "text" == b ? "textClass" : "background" == b ? "bgClass" : "wrapClass";
                if (a[d]) {
                    if (new RegExp("(?:^|\\s)" + c + "(?:$|\\s)").test(a[d]))
                        return !1;
                    a[d] += " " + c
                } else
                    a[d] = c;
                return !0
            })
        }),
        removeLineClass: kb(function(a, b, c) {
            return uc(this, a, "class", function(a) {
                var d = "text" == b ? "textClass" : "background" == b ? "bgClass" : "wrapClass"
                  , e = a[d];
                if (!e)
                    return !1;
                if (null == c)
                    a[d] = null;
                else {
                    var f = e.match(new RegExp("(?:^|\\s+)" + c + "(?:$|\\s+)"));
                    if (!f)
                        return !1;
                    var g = f.index + f[0].length;
                    a[d] = e.slice(0, f.index) + (f.index && g != e.length ? " " : "") + e.slice(g) || null
                }
                return !0
            })
        }),
        markText: function(a, b, c) {
            return Bc(this, _(this, a), _(this, b), c, "range")
        },
        setBookmark: function(a, b) {
            var c = {
                replacedWith: b && (null == b.nodeType ? b.widget : b),
                insertLeft: b && b.insertLeft,
                clearWhenEmpty: !1,
                shared: b && b.shared
            };
            return a = _(this, a),
            Bc(this, a, a, c, "bookmark")
        },
        findMarksAt: function(a) {
            a = _(this, a);
            var b = []
              , c = Dd(this, a.line).markedSpans;
            if (c)
                for (var d = 0; d < c.length; ++d) {
                    var e = c[d];
                    (null == e.from || e.from <= a.ch) && (null == e.to || e.to >= a.ch) && b.push(e.marker.parent || e.marker)
                }
            return b
        },
        findMarks: function(a, b, c) {
            a = _(this, a),
            b = _(this, b);
            var d = []
              , e = a.line;
            return this.iter(a.line, b.line + 1, function(f) {
                var g = f.markedSpans;
                if (g)
                    for (var h = 0; h < g.length; h++) {
                        var i = g[h];
                        e == a.line && a.ch > i.to || null == i.from && e != a.line || e == b.line && i.from > b.ch || c && !c(i.marker) || d.push(i.marker.parent || i.marker)
                    }
                ++e
            }),
            d
        },
        getAllMarks: function() {
            var a = [];
            return this.iter(function(b) {
                var c = b.markedSpans;
                if (c)
                    for (var d = 0; d < c.length; ++d)
                        null != c[d].from && a.push(c[d].marker)
            }),
            a
        },
        posFromIndex: function(a) {
            var b, c = this.first;
            return this.iter(function(d) {
                var e = d.text.length + 1;
                return e > a ? (b = a,
                !0) : (a -= e,
                void ++c)
            }),
            _(this, qf(c, b))
        },
        indexFromPos: function(a) {
            a = _(this, a);
            var b = a.ch;
            return a.line < this.first || a.ch < 0 ? 0 : (this.iter(this.first, a.line, function(a) {
                b += a.text.length + 1
            }),
            b)
        },
        copy: function(a) {
            var b = new bg(Fd(this, this.first, this.first + this.size),this.modeOption,this.first);
            return b.scrollTop = this.scrollTop,
            b.scrollLeft = this.scrollLeft,
            b.sel = this.sel,
            b.extend = !1,
            a && (b.history.undoDepth = this.history.undoDepth,
            b.setHistory(this.getHistory())),
            b
        },
        linkedDoc: function(a) {
            a || (a = {});
            var b = this.first
              , c = this.first + this.size;
            null != a.from && a.from > b && (b = a.from),
            null != a.to && a.to < c && (c = a.to);
            var d = new bg(Fd(this, b, c),a.mode || this.modeOption,b);
            return a.sharedHist && (d.history = this.history),
            (this.linked || (this.linked = [])).push({
                doc: d,
                sharedHist: a.sharedHist
            }),
            d.linked = [{
                doc: this,
                isParent: !0,
                sharedHist: a.sharedHist
            }],
            Ec(d, Dc(this)),
            d
        },
        unlinkDoc: function(b) {
            if (b instanceof a && (b = b.doc),
            this.linked)
                for (var c = 0; c < this.linked.length; ++c) {
                    var d = this.linked[c];
                    if (d.doc == b) {
                        this.linked.splice(c, 1),
                        b.unlinkDoc(this),
                        Fc(Dc(this));
                        break
                    }
                }
            if (b.history == this.history) {
                var e = [b.id];
                Bd(b, function(a) {
                    e.push(a.id)
                }, !0),
                b.history = new Ld(null),
                b.history.done = Wd(this.history.done, e),
                b.history.undone = Wd(this.history.undone, e)
            }
        },
        iterLinkedDocs: function(a) {
            Bd(this, a)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        }
    }),
    bg.prototype.eachLine = bg.prototype.iter;
    var cg = "iter insert remove copy getEditor".split(" ");
    for (var dg in bg.prototype)
        bg.prototype.hasOwnProperty(dg) && le(cg, dg) < 0 && (a.prototype[dg] = function(a) {
            return function() {
                return a.apply(this.doc, arguments)
            }
        }(bg.prototype[dg]));
    ge(bg);
    var eg = a.e_preventDefault = function(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }
      , fg = a.e_stopPropagation = function(a) {
        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
    }
      , gg = a.e_stop = function(a) {
        eg(a),
        fg(a)
    }
      , hg = a.on = function(a, b, c) {
        if (a.addEventListener)
            a.addEventListener(b, c, !1);
        else if (a.attachEvent)
            a.attachEvent("on" + b, c);
        else {
            var d = a._handlers || (a._handlers = {})
              , e = d[b] || (d[b] = []);
            e.push(c)
        }
    }
      , ig = a.off = function(a, b, c) {
        if (a.removeEventListener)
            a.removeEventListener(b, c, !1);
        else if (a.detachEvent)
            a.detachEvent("on" + b, c);
        else {
            var d = a._handlers && a._handlers[b];
            if (!d)
                return;
            for (var e = 0; e < d.length; ++e)
                if (d[e] == c) {
                    d.splice(e, 1);
                    break
                }
        }
    }
      , jg = a.signal = function(a, b) {
        var c = a._handlers && a._handlers[b];
        if (c)
            for (var d = Array.prototype.slice.call(arguments, 2), e = 0; e < c.length; ++e)
                c[e].apply(null, d)
    }
      , kg = null
      , lg = 30
      , mg = a.Pass = {
        toString: function() {
            return "CodeMirror.Pass"
        }
    }
      , ng = {
        scroll: !1
    }
      , og = {
        origin: "*mouse"
    }
      , pg = {
        origin: "+move"
    };
    he.prototype.set = function(a, b) {
        clearTimeout(this.id),
        this.id = setTimeout(b, a)
    }
    ;
    var qg = a.countColumn = function(a, b, c, d, e) {
        null == b && (b = a.search(/[^\s\u00a0]/),
        -1 == b && (b = a.length));
        for (var f = d || 0, g = e || 0; ; ) {
            var h = a.indexOf("	", f);
            if (0 > h || h >= b)
                return g + (b - f);
            g += h - f,
            g += c - g % c,
            f = h + 1
        }
    }
      , rg = [""]
      , sg = function(a) {
        a.select()
    };
    gf ? sg = function(a) {
        a.selectionStart = 0,
        a.selectionEnd = a.value.length
    }
    : Ye && (sg = function(a) {
        try {
            a.select()
        } catch (b) {}
    }
    ),
    [].indexOf && (le = function(a, b) {
        return a.indexOf(b)
    }
    ),
    [].map && (me = function(a, b) {
        return a.map(b)
    }
    );
    var tg, ug = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, vg = a.isWordChar = function(a) {
        return /\w/.test(a) || a > "" && (a.toUpperCase() != a.toLowerCase() || ug.test(a))
    }
    , wg = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    tg = document.createRange ? function(a, b, c) {
        var d = document.createRange();
        return d.setEnd(a, c),
        d.setStart(a, b),
        d
    }
    : function(a, b, c) {
        var d = document.body.createTextRange();
        return d.moveToElementText(a.parentNode),
        d.collapse(!0),
        d.moveEnd("character", c),
        d.moveStart("character", b),
        d
    }
    ,
    Ye && 11 > Ze && (xe = function() {
        try {
            return document.activeElement
        } catch (a) {
            return document.body
        }
    }
    );
    var xg, yg, zg, Ag = !1, Bg = function() {
        if (Ye && 9 > Ze)
            return !1;
        var a = te("div");
        return "draggable"in a || "dragDrop"in a
    }(), Cg = a.splitLines = 3 != "\n\nb".split(/\n/).length ? function(a) {
        for (var b = 0, c = [], d = a.length; d >= b; ) {
            var e = a.indexOf("\n", b);
            -1 == e && (e = a.length);
            var f = a.slice(b, "\r" == a.charAt(e - 1) ? e - 1 : e)
              , g = f.indexOf("\r");
            -1 != g ? (c.push(f.slice(0, g)),
            b += g + 1) : (c.push(f),
            b = e + 1)
        }
        return c
    }
    : function(a) {
        return a.split(/\r\n?|\n/)
    }
    , Dg = window.getSelection ? function(a) {
        try {
            return a.selectionStart != a.selectionEnd
        } catch (b) {
            return !1
        }
    }
    : function(a) {
        try {
            var b = a.ownerDocument.selection.createRange()
        } catch (c) {}
        return b && b.parentElement() == a ? 0 != b.compareEndPoints("StartToEnd", b) : !1
    }
    , Eg = function() {
        var a = te("div");
        return "oncopy"in a ? !0 : (a.setAttribute("oncopy", "return;"),
        "function" == typeof a.oncopy)
    }(), Fg = null, Gg = {
        3: "Enter",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        107: "=",
        109: "-",
        127: "Delete",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
    };
    a.keyNames = Gg,
    function() {
        for (var a = 0; 10 > a; a++)
            Gg[a + 48] = Gg[a + 96] = String(a);
        for (var a = 65; 90 >= a; a++)
            Gg[a] = String.fromCharCode(a);
        for (var a = 1; 12 >= a; a++)
            Gg[a + 111] = Gg[a + 63235] = "F" + a
    }();
    var Hg, Ig = function() {
        function a(a) {
            return 247 >= a ? c.charAt(a) : a >= 1424 && 1524 >= a ? "R" : a >= 1536 && 1773 >= a ? d.charAt(a - 1536) : a >= 1774 && 2220 >= a ? "r" : a >= 8192 && 8203 >= a ? "w" : 8204 == a ? "b" : "L"
        }
        function b(a, b, c) {
            this.level = a,
            this.from = b,
            this.to = c
        }
        var c = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN"
          , d = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm"
          , e = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/
          , f = /[stwN]/
          , g = /[LRr]/
          , h = /[Lb1n]/
          , i = /[1n]/
          , j = "L";
        return function(c) {
            if (!e.test(c))
                return !1;
            for (var d, k = c.length, l = [], m = 0; k > m; ++m)
                l.push(d = a(c.charCodeAt(m)));
            for (var m = 0, n = j; k > m; ++m) {
                var d = l[m];
                "m" == d ? l[m] = n : n = d
            }
            for (var m = 0, o = j; k > m; ++m) {
                var d = l[m];
                "1" == d && "r" == o ? l[m] = "n" : g.test(d) && (o = d,
                "r" == d && (l[m] = "R"))
            }
            for (var m = 1, n = l[0]; k - 1 > m; ++m) {
                var d = l[m];
                "+" == d && "1" == n && "1" == l[m + 1] ? l[m] = "1" : "," != d || n != l[m + 1] || "1" != n && "n" != n || (l[m] = n),
                n = d
            }
            for (var m = 0; k > m; ++m) {
                var d = l[m];
                if ("," == d)
                    l[m] = "N";
                else if ("%" == d) {
                    for (var p = m + 1; k > p && "%" == l[p]; ++p)
                        ;
                    for (var q = m && "!" == l[m - 1] || k > p && "1" == l[p] ? "1" : "N", r = m; p > r; ++r)
                        l[r] = q;
                    m = p - 1
                }
            }
            for (var m = 0, o = j; k > m; ++m) {
                var d = l[m];
                "L" == o && "1" == d ? l[m] = "L" : g.test(d) && (o = d)
            }
            for (var m = 0; k > m; ++m)
                if (f.test(l[m])) {
                    for (var p = m + 1; k > p && f.test(l[p]); ++p)
                        ;
                    for (var s = "L" == (m ? l[m - 1] : j), t = "L" == (k > p ? l[p] : j), q = s || t ? "L" : "R", r = m; p > r; ++r)
                        l[r] = q;
                    m = p - 1
                }
            for (var u, v = [], m = 0; k > m; )
                if (h.test(l[m])) {
                    var w = m;
                    for (++m; k > m && h.test(l[m]); ++m)
                        ;
                    v.push(new b(0,w,m))
                } else {
                    var x = m
                      , y = v.length;
                    for (++m; k > m && "L" != l[m]; ++m)
                        ;
                    for (var r = x; m > r; )
                        if (i.test(l[r])) {
                            r > x && v.splice(y, 0, new b(1,x,r));
                            var z = r;
                            for (++r; m > r && i.test(l[r]); ++r)
                                ;
                            v.splice(y, 0, new b(2,z,r)),
                            x = r
                        } else
                            ++r;
                    m > x && v.splice(y, 0, new b(1,x,m))
                }
            return 1 == v[0].level && (u = c.match(/^\s+/)) && (v[0].from = u[0].length,
            v.unshift(new b(0,0,u[0].length))),
            1 == ke(v).level && (u = c.match(/\s+$/)) && (ke(v).to -= u[0].length,
            v.push(new b(0,k - u[0].length,k))),
            v[0].level != ke(v).level && v.push(new b(v[0].level,k,k)),
            v
        }
    }();
    return a.version = "4.4.0",
    a
}),
function(a) {
    "object" == typeof exports && "object" == typeof module ? a(require("codemirror")) : "function" == typeof define && define.amd ? define(["codemirror"], a) : a(CodeMirror)
}(function(a) {
    "use strict";
    a.defineMode("javascript", function(b, c) {
        function d(a) {
            for (var b, c = !1, d = !1; null != (b = a.next()); ) {
                if (!c) {
                    if ("/" == b && !d)
                        return;
                    "[" == b ? d = !0 : d && "]" == b && (d = !1)
                }
                c = !c && "\\" == b
            }
        }
        function e(a, b, c) {
            return na = a,
            oa = c,
            b
        }
        function f(a, b) {
            var c = a.next();
            if ('"' == c || "'" == c)
                return b.tokenize = g(c),
                b.tokenize(a, b);
            if ("." == c && a.match(/^\d+(?:[eE][+\-]?\d+)?/))
                return e("number", "number");
            if ("." == c && a.match(".."))
                return e("spread", "meta");
            if (/[\[\]{}\(\),;\:\.]/.test(c))
                return e(c);
            if ("=" == c && a.eat(">"))
                return e("=>", "operator");
            if ("0" == c && a.eat(/x/i))
                return a.eatWhile(/[\da-f]/i),
                e("number", "number");
            if (/\d/.test(c))
                return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),
                e("number", "number");
            if ("/" == c)
                return a.eat("*") ? (b.tokenize = h,
                h(a, b)) : a.eat("/") ? (a.skipToEnd(),
                e("comment", "comment")) : "operator" == b.lastType || "keyword c" == b.lastType || "sof" == b.lastType || /^[\[{}\(,;:]$/.test(b.lastType) ? (d(a),
                a.eatWhile(/[gimy]/),
                e("regexp", "string-2")) : (a.eatWhile(va),
                e("operator", "operator", a.current()));
            if ("`" == c)
                return b.tokenize = i,
                i(a, b);
            if ("#" == c)
                return a.skipToEnd(),
                e("error", "error");
            if (va.test(c))
                return a.eatWhile(va),
                e("operator", "operator", a.current());
            a.eatWhile(/[\w\$_]/);
            var f = a.current()
              , j = ua.propertyIsEnumerable(f) && ua[f];
            return j && "." != b.lastType ? e(j.type, j.style, f) : e("variable", "variable", f)
        }
        function g(a) {
            return function(b, c) {
                var d, g = !1;
                if (ra && "@" == b.peek() && b.match(wa))
                    return c.tokenize = f,
                    e("jsonld-keyword", "meta");
                for (; null != (d = b.next()) && (d != a || g); )
                    g = !g && "\\" == d;
                return g || (c.tokenize = f),
                e("string", "string")
            }
        }
        function h(a, b) {
            for (var c, d = !1; c = a.next(); ) {
                if ("/" == c && d) {
                    b.tokenize = f;
                    break
                }
                d = "*" == c
            }
            return e("comment", "comment")
        }
        function i(a, b) {
            for (var c, d = !1; null != (c = a.next()); ) {
                if (!d && ("`" == c || "$" == c && a.eat("{"))) {
                    b.tokenize = f;
                    break
                }
                d = !d && "\\" == c
            }
            return e("quasi", "string-2", a.current())
        }
        function j(a, b) {
            b.fatArrowAt && (b.fatArrowAt = null);
            var c = a.string.indexOf("=>", a.start);
            if (!(0 > c)) {
                for (var d = 0, e = !1, f = c - 1; f >= 0; --f) {
                    var g = a.string.charAt(f)
                      , h = xa.indexOf(g);
                    if (h >= 0 && 3 > h) {
                        if (!d) {
                            ++f;
                            break
                        }
                        if (0 == --d)
                            break
                    } else if (h >= 3 && 6 > h)
                        ++d;
                    else if (/[$\w]/.test(g))
                        e = !0;
                    else if (e && !d) {
                        ++f;
                        break
                    }
                }
                e && !d && (b.fatArrowAt = f)
            }
        }
        function k(a, b, c, d, e, f) {
            this.indented = a,
            this.column = b,
            this.type = c,
            this.prev = e,
            this.info = f,
            null != d && (this.align = d)
        }
        function l(a, b) {
            for (var c = a.localVars; c; c = c.next)
                if (c.name == b)
                    return !0;
            for (var d = a.context; d; d = d.prev)
                for (var c = d.vars; c; c = c.next)
                    if (c.name == b)
                        return !0
        }
        function m(a, b, c, d, e) {
            var f = a.cc;
            for (za.state = a,
            za.stream = e,
            za.marked = null,
            za.cc = f,
            a.lexical.hasOwnProperty("align") || (a.lexical.align = !0); ; ) {
                var g = f.length ? f.pop() : sa ? w : v;
                if (g(c, d)) {
                    for (; f.length && f[f.length - 1].lex; )
                        f.pop()();
                    return za.marked ? za.marked : "variable" == c && l(a, d) ? "variable-2" : b
                }
            }
        }
        function n() {
            for (var a = arguments.length - 1; a >= 0; a--)
                za.cc.push(arguments[a])
        }
        function o() {
            return n.apply(null, arguments),
            !0
        }
        function p(a) {
            function b(b) {
                for (var c = b; c; c = c.next)
                    if (c.name == a)
                        return !0;
                return !1
            }
            var d = za.state;
            if (d.context) {
                if (za.marked = "def",
                b(d.localVars))
                    return;
                d.localVars = {
                    name: a,
                    next: d.localVars
                }
            } else {
                if (b(d.globalVars))
                    return;
                c.globalVars && (d.globalVars = {
                    name: a,
                    next: d.globalVars
                })
            }
        }
        function q() {
            za.state.context = {
                prev: za.state.context,
                vars: za.state.localVars
            },
            za.state.localVars = Aa
        }
        function r() {
            za.state.localVars = za.state.context.vars,
            za.state.context = za.state.context.prev
        }
        function s(a, b) {
            var c = function() {
                var c = za.state
                  , d = c.indented;
                "stat" == c.lexical.type && (d = c.lexical.indented),
                c.lexical = new k(d,za.stream.column(),a,null,c.lexical,b)
            };
            return c.lex = !0,
            c
        }
        function t() {
            var a = za.state;
            a.lexical.prev && (")" == a.lexical.type && (a.indented = a.lexical.indented),
            a.lexical = a.lexical.prev)
        }
        function u(a) {
            function b(c) {
                return c == a ? o() : ";" == a ? n() : o(b)
            }
            return b
        }
        function v(a, b) {
            return "var" == a ? o(s("vardef", b.length), R, u(";"), t) : "keyword a" == a ? o(s("form"), w, v, t) : "keyword b" == a ? o(s("form"), v, t) : "{" == a ? o(s("}"), O, t) : ";" == a ? o() : "if" == a ? ("else" == za.state.lexical.info && za.state.cc[za.state.cc.length - 1] == t && za.state.cc.pop()(),
            o(s("form"), w, v, t, W)) : "function" == a ? o(aa) : "for" == a ? o(s("form"), X, v, t) : "variable" == a ? o(s("stat"), H) : "switch" == a ? o(s("form"), w, s("}", "switch"), u("{"), O, t, t) : "case" == a ? o(w, u(":")) : "default" == a ? o(u(":")) : "catch" == a ? o(s("form"), q, u("("), ba, u(")"), v, t, r) : "module" == a ? o(s("form"), q, fa, r, t) : "class" == a ? o(s("form"), ca, ea, t) : "export" == a ? o(s("form"), ga, t) : "import" == a ? o(s("form"), ha, t) : n(s("stat"), w, u(";"), t)
        }
        function w(a) {
            return y(a, !1)
        }
        function x(a) {
            return y(a, !0)
        }
        function y(a, b) {
            if (za.state.fatArrowAt == za.stream.start) {
                var c = b ? G : F;
                if ("(" == a)
                    return o(q, s(")"), M(S, ")"), t, u("=>"), c, r);
                if ("variable" == a)
                    return n(q, S, u("=>"), c, r)
            }
            var d = b ? C : B;
            return ya.hasOwnProperty(a) ? o(d) : "function" == a ? o(aa, d) : "keyword c" == a ? o(b ? A : z) : "(" == a ? o(s(")"), z, ma, u(")"), t, d) : "operator" == a || "spread" == a ? o(b ? x : w) : "[" == a ? o(s("]"), ka, t, d) : "{" == a ? N(J, "}", null, d) : "quasi" == a ? n(D, d) : o()
        }
        function z(a) {
            return a.match(/[;\}\)\],]/) ? n() : n(w)
        }
        function A(a) {
            return a.match(/[;\}\)\],]/) ? n() : n(x)
        }
        function B(a, b) {
            return "," == a ? o(w) : C(a, b, !1)
        }
        function C(a, b, c) {
            var d = 0 == c ? B : C
              , e = 0 == c ? w : x;
            return "=>" == b ? o(q, c ? G : F, r) : "operator" == a ? /\+\+|--/.test(b) ? o(d) : "?" == b ? o(w, u(":"), e) : o(e) : "quasi" == a ? n(D, d) : ";" != a ? "(" == a ? N(x, ")", "call", d) : "." == a ? o(I, d) : "[" == a ? o(s("]"), z, u("]"), t, d) : void 0 : void 0
        }
        function D(a, b) {
            return "quasi" != a ? n() : "${" != b.slice(b.length - 2) ? o(D) : o(w, E)
        }
        function E(a) {
            return "}" == a ? (za.marked = "string-2",
            za.state.tokenize = i,
            o(D)) : void 0
        }
        function F(a) {
            return j(za.stream, za.state),
            n("{" == a ? v : w)
        }
        function G(a) {
            return j(za.stream, za.state),
            n("{" == a ? v : x)
        }
        function H(a) {
            return ":" == a ? o(t, v) : n(B, u(";"), t)
        }
        function I(a) {
            return "variable" == a ? (za.marked = "property",
            o()) : void 0
        }
        function J(a, b) {
            if ("variable" == a) {
                if (za.marked = "property",
                "get" == b || "set" == b)
                    return o(K)
            } else if ("number" == a || "string" == a)
                za.marked = ra ? "property" : a + " property";
            else if ("[" == a)
                return o(w, u("]"), L);
            return ya.hasOwnProperty(a) ? o(L) : void 0
        }
        function K(a) {
            return "variable" != a ? n(L) : (za.marked = "property",
            o(aa))
        }
        function L(a) {
            return ":" == a ? o(x) : "(" == a ? n(aa) : void 0
        }
        function M(a, b) {
            function c(d) {
                if ("," == d) {
                    var e = za.state.lexical;
                    return "call" == e.info && (e.pos = (e.pos || 0) + 1),
                    o(a, c)
                }
                return d == b ? o() : o(u(b))
            }
            return function(d) {
                return d == b ? o() : n(a, c)
            }
        }
        function N(a, b, c) {
            for (var d = 3; d < arguments.length; d++)
                za.cc.push(arguments[d]);
            return o(s(b, c), M(a, b), t)
        }
        function O(a) {
            return "}" == a ? o() : n(v, O)
        }
        function P(a) {
            return ta && ":" == a ? o(Q) : void 0
        }
        function Q(a) {
            return "variable" == a ? (za.marked = "variable-3",
            o()) : void 0
        }
        function R() {
            return n(S, P, U, V)
        }
        function S(a, b) {
            return "variable" == a ? (p(b),
            o()) : "[" == a ? N(S, "]") : "{" == a ? N(T, "}") : void 0
        }
        function T(a, b) {
            return "variable" != a || za.stream.match(/^\s*:/, !1) ? ("variable" == a && (za.marked = "property"),
            o(u(":"), S, U)) : (p(b),
            o(U))
        }
        function U(a, b) {
            return "=" == b ? o(x) : void 0
        }
        function V(a) {
            return "," == a ? o(R) : void 0
        }
        function W(a, b) {
            return "keyword b" == a && "else" == b ? o(s("form", "else"), v, t) : void 0
        }
        function X(a) {
            return "(" == a ? o(s(")"), Y, u(")"), t) : void 0
        }
        function Y(a) {
            return "var" == a ? o(R, u(";"), $) : ";" == a ? o($) : "variable" == a ? o(Z) : n(w, u(";"), $)
        }
        function Z(a, b) {
            return "in" == b || "of" == b ? (za.marked = "keyword",
            o(w)) : o(B, $)
        }
        function $(a, b) {
            return ";" == a ? o(_) : "in" == b || "of" == b ? (za.marked = "keyword",
            o(w)) : n(w, u(";"), _)
        }
        function _(a) {
            ")" != a && o(w)
        }
        function aa(a, b) {
            return "*" == b ? (za.marked = "keyword",
            o(aa)) : "variable" == a ? (p(b),
            o(aa)) : "(" == a ? o(q, s(")"), M(ba, ")"), t, v, r) : void 0
        }
        function ba(a) {
            return "spread" == a ? o(ba) : n(S, P)
        }
        function ca(a, b) {
            return "variable" == a ? (p(b),
            o(da)) : void 0
        }
        function da(a, b) {
            return "extends" == b ? o(w) : void 0
        }
        function ea(a) {
            return "{" == a ? N(J, "}") : void 0
        }
        function fa(a, b) {
            return "string" == a ? o(v) : "variable" == a ? (p(b),
            o(ja)) : void 0
        }
        function ga(a, b) {
            return "*" == b ? (za.marked = "keyword",
            o(ja, u(";"))) : "default" == b ? (za.marked = "keyword",
            o(w, u(";"))) : n(v)
        }
        function ha(a) {
            return "string" == a ? o() : n(ia, ja)
        }
        function ia(a, b) {
            return "{" == a ? N(ia, "}") : ("variable" == a && p(b),
            o())
        }
        function ja(a, b) {
            return "from" == b ? (za.marked = "keyword",
            o(w)) : void 0
        }
        function ka(a) {
            return "]" == a ? o() : n(x, la)
        }
        function la(a) {
            return "for" == a ? n(ma, u("]")) : "," == a ? o(M(x, "]")) : n(M(x, "]"))
        }
        function ma(a) {
            return "for" == a ? o(X, ma) : "if" == a ? o(w, ma) : void 0
        }
        var na, oa, pa = b.indentUnit, qa = c.statementIndent, ra = c.jsonld, sa = c.json || ra, ta = c.typescript, ua = function() {
            function a(a) {
                return {
                    type: a,
                    style: "keyword"
                }
            }
            var b = a("keyword a")
              , c = a("keyword b")
              , d = a("keyword c")
              , e = a("operator")
              , f = {
                type: "atom",
                style: "atom"
            }
              , g = {
                "if": a("if"),
                "while": b,
                "with": b,
                "else": c,
                "do": c,
                "try": c,
                "finally": c,
                "return": d,
                "break": d,
                "continue": d,
                "new": d,
                "delete": d,
                "throw": d,
                "debugger": d,
                "var": a("var"),
                "const": a("var"),
                let: a("var"),
                "function": a("function"),
                "catch": a("catch"),
                "for": a("for"),
                "switch": a("switch"),
                "case": a("case"),
                "default": a("default"),
                "in": e,
                "typeof": e,
                "instanceof": e,
                "true": f,
                "false": f,
                "null": f,
                undefined: f,
                NaN: f,
                Infinity: f,
                "this": a("this"),
                module: a("module"),
                "class": a("class"),
                "super": a("atom"),
                "yield": d,
                "export": a("export"),
                "import": a("import"),
                "extends": d
            };
            if (ta) {
                var h = {
                    type: "variable",
                    style: "variable-3"
                }
                  , i = {
                    "interface": a("interface"),
                    "extends": a("extends"),
                    constructor: a("constructor"),
                    "public": a("public"),
                    "private": a("private"),
                    "protected": a("protected"),
                    "static": a("static"),
                    string: h,
                    number: h,
                    bool: h,
                    any: h
                };
                for (var j in i)
                    g[j] = i[j]
            }
            return g
        }(), va = /[+\-*&%=<>!?|~^]/, wa = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/, xa = "([{}])", ya = {
            atom: !0,
            number: !0,
            variable: !0,
            string: !0,
            regexp: !0,
            "this": !0,
            "jsonld-keyword": !0
        }, za = {
            state: null,
            column: null,
            marked: null,
            cc: null
        }, Aa = {
            name: "this",
            next: {
                name: "arguments"
            }
        };
        return t.lex = !0,
        {
            startState: function(a) {
                var b = {
                    tokenize: f,
                    lastType: "sof",
                    cc: [],
                    lexical: new k((a || 0) - pa,0,"block",!1),
                    localVars: c.localVars,
                    context: c.localVars && {
                        vars: c.localVars
                    },
                    indented: 0
                };
                return c.globalVars && "object" == typeof c.globalVars && (b.globalVars = c.globalVars),
                b
            },
            token: function(a, b) {
                if (a.sol() && (b.lexical.hasOwnProperty("align") || (b.lexical.align = !1),
                b.indented = a.indentation(),
                j(a, b)),
                b.tokenize != h && a.eatSpace())
                    return null;
                var c = b.tokenize(a, b);
                return "comment" == na ? c : (b.lastType = "operator" != na || "++" != oa && "--" != oa ? na : "incdec",
                m(b, c, na, oa, a))
            },
            indent: function(b, d) {
                if (b.tokenize == h)
                    return a.Pass;
                if (b.tokenize != f)
                    return 0;
                var e = d && d.charAt(0)
                  , g = b.lexical;
                if (!/^\s*else\b/.test(d))
                    for (var i = b.cc.length - 1; i >= 0; --i) {
                        var j = b.cc[i];
                        if (j == t)
                            g = g.prev;
                        else if (j != W)
                            break
                    }
                "stat" == g.type && "}" == e && (g = g.prev),
                qa && ")" == g.type && "stat" == g.prev.type && (g = g.prev);
                var k = g.type
                  , l = e == k;
                return "vardef" == k ? g.indented + ("operator" == b.lastType || "," == b.lastType ? g.info + 1 : 0) : "form" == k && "{" == e ? g.indented : "form" == k ? g.indented + pa : "stat" == k ? g.indented + ("operator" == b.lastType || "," == b.lastType ? qa || pa : 0) : "switch" != g.info || l || 0 == c.doubleIndentSwitch ? g.align ? g.column + (l ? 0 : 1) : g.indented + (l ? 0 : pa) : g.indented + (/^(?:case|default)\b/.test(d) ? pa : 2 * pa)
            },
            electricChars: ":{}",
            blockCommentStart: sa ? null : "/*",
            blockCommentEnd: sa ? null : "*/",
            lineComment: sa ? null : "//",
            fold: "brace",
            helperType: sa ? "json" : "javascript",
            jsonldMode: ra,
            jsonMode: sa
        }
    }),
    a.registerHelper("wordChars", "javascript", /[\\w$]/),
    a.defineMIME("text/javascript", "javascript"),
    a.defineMIME("text/ecmascript", "javascript"),
    a.defineMIME("application/javascript", "javascript"),
    a.defineMIME("application/ecmascript", "javascript"),
    a.defineMIME("application/json", {
        name: "javascript",
        json: !0
    }),
    a.defineMIME("application/x-json", {
        name: "javascript",
        json: !0
    }),
    a.defineMIME("application/ld+json", {
        name: "javascript",
        jsonld: !0
    }),
    a.defineMIME("text/typescript", {
        name: "javascript",
        typescript: !0
    }),
    a.defineMIME("application/typescript", {
        name: "javascript",
        typescript: !0
    })
}),
function(a) {
    "object" == typeof exports && "object" == typeof module ? a(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], a) : a(CodeMirror)
}(function(a) {
    "use strict";
    a.defineMode("xml", function(b, c) {
        function d(a, b) {
            function c(c) {
                return b.tokenize = c,
                c(a, b)
            }
            var d = a.next();
            if ("<" == d)
                return a.eat("!") ? a.eat("[") ? a.match("CDATA[") ? c(g("atom", "]]>")) : null : a.match("--") ? c(g("comment", "-->")) : a.match("DOCTYPE", !0, !0) ? (a.eatWhile(/[\w\._\-]/),
                c(h(1))) : null : a.eat("?") ? (a.eatWhile(/[\w\._\-]/),
                b.tokenize = g("meta", "?>"),
                "meta") : (x = a.eat("/") ? "closeTag" : "openTag",
                b.tokenize = e,
                "tag bracket");
            if ("&" == d) {
                var f;
                return f = a.eat("#") ? a.eat("x") ? a.eatWhile(/[a-fA-F\d]/) && a.eat(";") : a.eatWhile(/[\d]/) && a.eat(";") : a.eatWhile(/[\w\.\-:]/) && a.eat(";"),
                f ? "atom" : "error"
            }
            return a.eatWhile(/[^&<]/),
            null
        }
        function e(a, b) {
            var c = a.next();
            if (">" == c || "/" == c && a.eat(">"))
                return b.tokenize = d,
                x = ">" == c ? "endTag" : "selfcloseTag",
                "tag bracket";
            if ("=" == c)
                return x = "equals",
                null;
            if ("<" == c) {
                b.tokenize = d,
                b.state = l,
                b.tagName = b.tagStart = null;
                var e = b.tokenize(a, b);
                return e ? e + " tag error" : "tag error"
            }
            return /[\'\"]/.test(c) ? (b.tokenize = f(c),
            b.stringStartCol = a.column(),
            b.tokenize(a, b)) : (a.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),
            "word")
        }
        function f(a) {
            var b = function(b, c) {
                for (; !b.eol(); )
                    if (b.next() == a) {
                        c.tokenize = e;
                        break
                    }
                return "string"
            };
            return b.isInAttribute = !0,
            b
        }
        function g(a, b) {
            return function(c, e) {
                for (; !c.eol(); ) {
                    if (c.match(b)) {
                        e.tokenize = d;
                        break
                    }
                    c.next()
                }
                return a
            }
        }
        function h(a) {
            return function(b, c) {
                for (var e; null != (e = b.next()); ) {
                    if ("<" == e)
                        return c.tokenize = h(a + 1),
                        c.tokenize(b, c);
                    if (">" == e) {
                        if (1 == a) {
                            c.tokenize = d;
                            break
                        }
                        return c.tokenize = h(a - 1),
                        c.tokenize(b, c)
                    }
                }
                return "meta"
            }
        }
        function i(a, b, c) {
            this.prev = a.context,
            this.tagName = b,
            this.indent = a.indented,
            this.startOfLine = c,
            (z.doNotIndent.hasOwnProperty(b) || a.context && a.context.noIndent) && (this.noIndent = !0)
        }
        function j(a) {
            a.context && (a.context = a.context.prev)
        }
        function k(a, b) {
            for (var c; ; ) {
                if (!a.context)
                    return;
                if (c = a.context.tagName,
                !z.contextGrabbers.hasOwnProperty(c) || !z.contextGrabbers[c].hasOwnProperty(b))
                    return;
                j(a)
            }
        }
        function l(a, b, c) {
            return "openTag" == a ? (c.tagStart = b.column(),
            m) : "closeTag" == a ? n : l
        }
        function m(a, b, c) {
            return "word" == a ? (c.tagName = b.current(),
            y = "tag",
            q) : (y = "error",
            m)
        }
        function n(a, b, c) {
            if ("word" == a) {
                var d = b.current();
                return c.context && c.context.tagName != d && z.implicitlyClosed.hasOwnProperty(c.context.tagName) && j(c),
                c.context && c.context.tagName == d ? (y = "tag",
                o) : (y = "tag error",
                p)
            }
            return y = "error",
            p
        }
        function o(a, b, c) {
            return "endTag" != a ? (y = "error",
            o) : (j(c),
            l)
        }
        function p(a, b, c) {
            return y = "error",
            o(a, b, c)
        }
        function q(a, b, c) {
            if ("word" == a)
                return y = "attribute",
                r;
            if ("endTag" == a || "selfcloseTag" == a) {
                var d = c.tagName
                  , e = c.tagStart;
                return c.tagName = c.tagStart = null,
                "selfcloseTag" == a || z.autoSelfClosers.hasOwnProperty(d) ? k(c, d) : (k(c, d),
                c.context = new i(c,d,e == c.indented)),
                l
            }
            return y = "error",
            q
        }
        function r(a, b, c) {
            return "equals" == a ? s : (z.allowMissing || (y = "error"),
            q(a, b, c))
        }
        function s(a, b, c) {
            return "string" == a ? t : "word" == a && z.allowUnquoted ? (y = "string",
            q) : (y = "error",
            q(a, b, c))
        }
        function t(a, b, c) {
            return "string" == a ? t : q(a, b, c)
        }
        var u = b.indentUnit
          , v = c.multilineTagIndentFactor || 1
          , w = c.multilineTagIndentPastTag;
        null == w && (w = !0);
        var x, y, z = c.htmlMode ? {
            autoSelfClosers: {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                command: !0,
                embed: !0,
                frame: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
            },
            implicitlyClosed: {
                dd: !0,
                li: !0,
                optgroup: !0,
                option: !0,
                p: !0,
                rp: !0,
                rt: !0,
                tbody: !0,
                td: !0,
                tfoot: !0,
                th: !0,
                tr: !0
            },
            contextGrabbers: {
                dd: {
                    dd: !0,
                    dt: !0
                },
                dt: {
                    dd: !0,
                    dt: !0
                },
                li: {
                    li: !0
                },
                option: {
                    option: !0,
                    optgroup: !0
                },
                optgroup: {
                    optgroup: !0
                },
                p: {
                    address: !0,
                    article: !0,
                    aside: !0,
                    blockquote: !0,
                    dir: !0,
                    div: !0,
                    dl: !0,
                    fieldset: !0,
                    footer: !0,
                    form: !0,
                    h1: !0,
                    h2: !0,
                    h3: !0,
                    h4: !0,
                    h5: !0,
                    h6: !0,
                    header: !0,
                    hgroup: !0,
                    hr: !0,
                    menu: !0,
                    nav: !0,
                    ol: !0,
                    p: !0,
                    pre: !0,
                    section: !0,
                    table: !0,
                    ul: !0
                },
                rp: {
                    rp: !0,
                    rt: !0
                },
                rt: {
                    rp: !0,
                    rt: !0
                },
                tbody: {
                    tbody: !0,
                    tfoot: !0
                },
                td: {
                    td: !0,
                    th: !0
                },
                tfoot: {
                    tbody: !0
                },
                th: {
                    td: !0,
                    th: !0
                },
                thead: {
                    tbody: !0,
                    tfoot: !0
                },
                tr: {
                    tr: !0
                }
            },
            doNotIndent: {
                pre: !0
            },
            allowUnquoted: !0,
            allowMissing: !0,
            caseFold: !0
        } : {
            autoSelfClosers: {},
            implicitlyClosed: {},
            contextGrabbers: {},
            doNotIndent: {},
            allowUnquoted: !1,
            allowMissing: !1,
            caseFold: !1
        }, A = c.alignCDATA;
        return {
            startState: function() {
                return {
                    tokenize: d,
                    state: l,
                    indented: 0,
                    tagName: null,
                    tagStart: null,
                    context: null
                }
            },
            token: function(a, b) {
                if (!b.tagName && a.sol() && (b.indented = a.indentation()),
                a.eatSpace())
                    return null;
                x = null;
                var c = b.tokenize(a, b);
                return (c || x) && "comment" != c && (y = null,
                b.state = b.state(x || c, a, b),
                y && (c = "error" == y ? c + " error" : y)),
                c
            },
            indent: function(b, c, f) {
                var g = b.context;
                if (b.tokenize.isInAttribute)
                    return b.tagStart == b.indented ? b.stringStartCol + 1 : b.indented + u;
                if (g && g.noIndent)
                    return a.Pass;
                if (b.tokenize != e && b.tokenize != d)
                    return f ? f.match(/^(\s*)/)[0].length : 0;
                if (b.tagName)
                    return w ? b.tagStart + b.tagName.length + 2 : b.tagStart + u * v;
                if (A && /<!\[CDATA\[/.test(c))
                    return 0;
                var h = c && /^<(\/)?([\w_:\.-]*)/.exec(c);
                if (h && h[1])
                    for (; g; ) {
                        if (g.tagName == h[2]) {
                            g = g.prev;
                            break
                        }
                        if (!z.implicitlyClosed.hasOwnProperty(g.tagName))
                            break;
                        g = g.prev
                    }
                else if (h)
                    for (; g; ) {
                        var i = z.contextGrabbers[g.tagName];
                        if (!i || !i.hasOwnProperty(h[2]))
                            break;
                        g = g.prev
                    }
                for (; g && !g.startOfLine; )
                    g = g.prev;
                return g ? g.indent + u : 0
            },
            electricInput: /<\/[\s\w:]+>$/,
            blockCommentStart: "<!--",
            blockCommentEnd: "-->",
            configuration: c.htmlMode ? "html" : "xml",
            helperType: c.htmlMode ? "html" : "xml"
        }
    }),
    a.defineMIME("text/xml", "xml"),
    a.defineMIME("application/xml", "xml"),
    a.mimeModes.hasOwnProperty("text/html") || a.defineMIME("text/html", {
        name: "xml",
        htmlMode: !0
    })
}),
function(a) {
    "object" == typeof exports && "object" == typeof module ? a(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], a) : a(CodeMirror)
}(function(a) {
    "use strict";
    function b(a) {
        for (var b = {}, c = 0; c < a.length; ++c)
            b[a[c]] = !0;
        return b
    }
    function c(a, b) {
        for (var c, d = !1; null != (c = a.next()); ) {
            if (d && "/" == c) {
                b.tokenize = null;
                break
            }
            d = "*" == c
        }
        return ["comment", "comment"]
    }
    function d(a, b) {
        return a.skipTo("-->") ? (a.match("-->"),
        b.tokenize = null) : a.skipToEnd(),
        ["comment", "comment"]
    }
    a.defineMode("css", function(b, c) {
        function d(a, b) {
            return n = b,
            a
        }
        function e(a, b) {
            var c = a.next();
            if (q[c]) {
                var e = q[c](a, b);
                if (e !== !1)
                    return e
            }
            return "@" == c ? (a.eatWhile(/[\w\\\-]/),
            d("def", a.current())) : "=" == c || ("~" == c || "|" == c) && a.eat("=") ? d(null, "compare") : '"' == c || "'" == c ? (b.tokenize = f(c),
            b.tokenize(a, b)) : "#" == c ? (a.eatWhile(/[\w\\\-]/),
            d("atom", "hash")) : "!" == c ? (a.match(/^\s*\w*/),
            d("keyword", "important")) : /\d/.test(c) || "." == c && a.eat(/\d/) ? (a.eatWhile(/[\w.%]/),
            d("number", "unit")) : "-" !== c ? /[,+>*\/]/.test(c) ? d(null, "select-op") : "." == c && a.match(/^-?[_a-z][_a-z0-9-]*/i) ? d("qualifier", "qualifier") : /[:;{}\[\]\(\)]/.test(c) ? d(null, c) : "u" == c && a.match("rl(") ? (a.backUp(1),
            b.tokenize = g,
            d("property", "word")) : /[\w\\\-]/.test(c) ? (a.eatWhile(/[\w\\\-]/),
            d("property", "word")) : d(null, null) : /[\d.]/.test(a.peek()) ? (a.eatWhile(/[\w.%]/),
            d("number", "unit")) : a.match(/^\w+-/) ? d("meta", "meta") : void 0
        }
        function f(a) {
            return function(b, c) {
                for (var e, f = !1; null != (e = b.next()); ) {
                    if (e == a && !f) {
                        ")" == a && b.backUp(1);
                        break
                    }
                    f = !f && "\\" == e
                }
                return (e == a || !f && ")" != a) && (c.tokenize = null),
                d("string", "string")
            }
        }
        function g(a, b) {
            return a.next(),
            a.match(/\s*[\"\')]/, !1) ? b.tokenize = null : b.tokenize = f(")"),
            d(null, "(")
        }
        function h(a, b, c) {
            this.type = a,
            this.indent = b,
            this.prev = c
        }
        function i(a, b, c) {
            return a.context = new h(c,b.indentation() + p,a.context),
            c
        }
        function j(a) {
            return a.context = a.context.prev,
            a.context.type
        }
        function k(a, b, c) {
            return z[c.context.type](a, b, c)
        }
        function l(a, b, c, d) {
            for (var e = d || 1; e > 0; e--)
                c.context = c.context.prev;
            return k(a, b, c)
        }
        function m(a) {
            var b = a.current().toLowerCase();
            o = w.hasOwnProperty(b) ? "atom" : v.hasOwnProperty(b) ? "keyword" : "variable"
        }
        c.propertyKeywords || (c = a.resolveMode("text/css"));
        var n, o, p = b.indentUnit, q = c.tokenHooks, r = c.mediaTypes || {}, s = c.mediaFeatures || {}, t = c.propertyKeywords || {}, u = c.nonStandardPropertyKeywords || {}, v = c.colorKeywords || {}, w = c.valueKeywords || {}, x = c.fontProperties || {}, y = c.allowNested, z = {};
        return z.top = function(a, b, c) {
            if ("{" == a)
                return i(c, b, "block");
            if ("}" == a && c.context.prev)
                return j(c);
            if ("@media" == a)
                return i(c, b, "media");
            if ("@font-face" == a)
                return "font_face_before";
            if (/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(a))
                return "keyframes";
            if (a && "@" == a.charAt(0))
                return i(c, b, "at");
            if ("hash" == a)
                o = "builtin";
            else if ("word" == a)
                o = "tag";
            else {
                if ("variable-definition" == a)
                    return "maybeprop";
                if ("interpolation" == a)
                    return i(c, b, "interpolation");
                if (":" == a)
                    return "pseudo";
                if (y && "(" == a)
                    return i(c, b, "parens")
            }
            return c.context.type
        }
        ,
        z.block = function(a, b, c) {
            if ("word" == a) {
                var d = b.current().toLowerCase();
                return t.hasOwnProperty(d) ? (o = "property",
                "maybeprop") : u.hasOwnProperty(d) ? (o = "string-2",
                "maybeprop") : y ? (o = b.match(/^\s*:/, !1) ? "property" : "tag",
                "block") : (o += " error",
                "maybeprop")
            }
            return "meta" == a ? "block" : y || "hash" != a && "qualifier" != a ? z.top(a, b, c) : (o = "error",
            "block")
        }
        ,
        z.maybeprop = function(a, b, c) {
            return ":" == a ? i(c, b, "prop") : k(a, b, c)
        }
        ,
        z.prop = function(a, b, c) {
            if (";" == a)
                return j(c);
            if ("{" == a && y)
                return i(c, b, "propBlock");
            if ("}" == a || "{" == a)
                return l(a, b, c);
            if ("(" == a)
                return i(c, b, "parens");
            if ("hash" != a || /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(b.current())) {
                if ("word" == a)
                    m(b);
                else if ("interpolation" == a)
                    return i(c, b, "interpolation")
            } else
                o += " error";
            return "prop"
        }
        ,
        z.propBlock = function(a, b, c) {
            return "}" == a ? j(c) : "word" == a ? (o = "property",
            "maybeprop") : c.context.type
        }
        ,
        z.parens = function(a, b, c) {
            return "{" == a || "}" == a ? l(a, b, c) : ")" == a ? j(c) : "(" == a ? i(c, b, "parens") : ("word" == a && m(b),
            "parens")
        }
        ,
        z.pseudo = function(a, b, c) {
            return "word" == a ? (o = "variable-3",
            c.context.type) : k(a, b, c)
        }
        ,
        z.media = function(a, b, c) {
            if ("(" == a)
                return i(c, b, "media_parens");
            if ("}" == a)
                return l(a, b, c);
            if ("{" == a)
                return j(c) && i(c, b, y ? "block" : "top");
            if ("word" == a) {
                var d = b.current().toLowerCase();
                o = "only" == d || "not" == d || "and" == d ? "keyword" : r.hasOwnProperty(d) ? "attribute" : s.hasOwnProperty(d) ? "property" : "error"
            }
            return c.context.type
        }
        ,
        z.media_parens = function(a, b, c) {
            return ")" == a ? j(c) : "{" == a || "}" == a ? l(a, b, c, 2) : z.media(a, b, c)
        }
        ,
        z.font_face_before = function(a, b, c) {
            return "{" == a ? i(c, b, "font_face") : k(a, b, c)
        }
        ,
        z.font_face = function(a, b, c) {
            return "}" == a ? j(c) : "word" == a ? (o = x.hasOwnProperty(b.current().toLowerCase()) ? "property" : "error",
            "maybeprop") : "font_face"
        }
        ,
        z.keyframes = function(a, b, c) {
            return "word" == a ? (o = "variable",
            "keyframes") : "{" == a ? i(c, b, "top") : k(a, b, c)
        }
        ,
        z.at = function(a, b, c) {
            return ";" == a ? j(c) : "{" == a || "}" == a ? l(a, b, c) : ("word" == a ? o = "tag" : "hash" == a && (o = "builtin"),
            "at")
        }
        ,
        z.interpolation = function(a, b, c) {
            return "}" == a ? j(c) : "{" == a || ";" == a ? l(a, b, c) : ("variable" != a && (o = "error"),
            "interpolation")
        }
        ,
        {
            startState: function(a) {
                return {
                    tokenize: null,
                    state: "top",
                    context: new h("top",a || 0,null)
                }
            },
            token: function(a, b) {
                if (!b.tokenize && a.eatSpace())
                    return null;
                var c = (b.tokenize || e)(a, b);
                return c && "object" == typeof c && (n = c[1],
                c = c[0]),
                o = c,
                b.state = z[b.state](n, a, b),
                o
            },
            indent: function(a, b) {
                var c = a.context
                  , d = b && b.charAt(0)
                  , e = c.indent;
                return "prop" != c.type || "}" != d && ")" != d || (c = c.prev),
                !c.prev || ("}" != d || "block" != c.type && "top" != c.type && "interpolation" != c.type && "font_face" != c.type) && (")" != d || "parens" != c.type && "media_parens" != c.type) && ("{" != d || "at" != c.type && "media" != c.type) || (e = c.indent - p,
                c = c.prev),
                e
            },
            electricChars: "}",
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            fold: "brace"
        }
    });
    var e = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"]
      , f = b(e)
      , g = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid"]
      , h = b(g)
      , i = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-position", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode"]
      , j = b(i)
      , k = ["scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom"]
      , k = b(k)
      , l = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"]
      , m = b(l)
      , n = ["above", "absolute", "activeborder", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "auto", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "column", "compact", "condensed", "contain", "content", "content-box", "context-menu", "continuous", "copy", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "disc", "discard", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ew-resize", "expanded", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "landscape", "lao", "large", "larger", "left", "level", "lighter", "line-through", "linear", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "malayalam", "match", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "round", "row-resize", "rtl", "run-in", "running", "s-resize", "sans-serif", "scroll", "scrollbar", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "single", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "x-large", "x-small", "xor", "xx-large", "xx-small"]
      , o = b(n)
      , p = ["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"]
      , q = b(p)
      , r = e.concat(g).concat(i).concat(k).concat(l).concat(n);
    a.registerHelper("hintWords", "css", r),
    a.defineMIME("text/css", {
        mediaTypes: f,
        mediaFeatures: h,
        propertyKeywords: j,
        nonStandardPropertyKeywords: k,
        colorKeywords: m,
        valueKeywords: o,
        fontProperties: q,
        tokenHooks: {
            "<": function(a, b) {
                return a.match("!--") ? (b.tokenize = d,
                d(a, b)) : !1
            },
            "/": function(a, b) {
                return a.eat("*") ? (b.tokenize = c,
                c(a, b)) : !1
            }
        },
        name: "css"
    }),
    a.defineMIME("text/x-scss", {
        mediaTypes: f,
        mediaFeatures: h,
        propertyKeywords: j,
        nonStandardPropertyKeywords: k,
        colorKeywords: m,
        valueKeywords: o,
        fontProperties: q,
        allowNested: !0,
        tokenHooks: {
            "/": function(a, b) {
                return a.eat("/") ? (a.skipToEnd(),
                ["comment", "comment"]) : a.eat("*") ? (b.tokenize = c,
                c(a, b)) : ["operator", "operator"]
            },
            ":": function(a) {
                return a.match(/\s*\{/) ? [null, "{"] : !1
            },
            $: function(a) {
                return a.match(/^[\w-]+/),
                a.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"]
            },
            "#": function(a) {
                return a.eat("{") ? [null, "interpolation"] : !1
            }
        },
        name: "css",
        helperType: "scss"
    }),
    a.defineMIME("text/x-less", {
        mediaTypes: f,
        mediaFeatures: h,
        propertyKeywords: j,
        nonStandardPropertyKeywords: k,
        colorKeywords: m,
        valueKeywords: o,
        fontProperties: q,
        allowNested: !0,
        tokenHooks: {
            "/": function(a, b) {
                return a.eat("/") ? (a.skipToEnd(),
                ["comment", "comment"]) : a.eat("*") ? (b.tokenize = c,
                c(a, b)) : ["operator", "operator"]
            },
            "@": function(a) {
                return a.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/, !1) ? !1 : (a.eatWhile(/[\w\\\-]/),
                a.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"])
            },
            "&": function() {
                return ["atom", "atom"]
            }
        },
        name: "css",
        helperType: "less"
    })
}),
function(a) {
    "object" == typeof exports && "object" == typeof module ? a(require("codemirror"), require("cm-mode_xml"), require("cm-mode_javascript"), require("cm-mode_css")) : "function" == typeof define && define.amd ? define(["codemirror", "cm-mode_xml", "cm-mode_javascript", "cm-mode_css"], a) : a(CodeMirror)
}(function(a) {
    "use strict";
    a.defineMode("htmlmixed", function(b, c) {
        function d(a, b) {
            var c = b.htmlState.tagName
              , d = h.token(a, b.htmlState);
            if ("script" == c && /\btag\b/.test(d) && ">" == a.current()) {
                var e = a.string.slice(Math.max(0, a.pos - 100), a.pos).match(/\btype\s*=\s*("[^"]+"|'[^']+'|\S+)[^<]*$/i);
                e = e ? e[1] : "",
                e && /[\"\']/.test(e.charAt(0)) && (e = e.slice(1, e.length - 1));
                for (var k = 0; k < j.length; ++k) {
                    var l = j[k];
                    if ("string" == typeof l.matches ? e == l.matches : l.matches.test(e)) {
                        l.mode && (b.token = f,
                        b.localMode = l.mode,
                        b.localState = l.mode.startState && l.mode.startState(h.indent(b.htmlState, "")));
                        break
                    }
                }
            } else
                "style" == c && /\btag\b/.test(d) && ">" == a.current() && (b.token = g,
                b.localMode = i,
                b.localState = i.startState(h.indent(b.htmlState, "")));
            return d
        }
        function e(a, b, c) {
            var d, e = a.current(), f = e.search(b);
            return f > -1 ? a.backUp(e.length - f) : (d = e.match(/<\/?$/)) && (a.backUp(e.length),
            a.match(b, !1) || a.match(e)),
            c
        }
        function f(a, b) {
            return a.match(/^<\/\s*script\s*>/i, !1) ? (b.token = d,
            b.localState = b.localMode = null,
            d(a, b)) : e(a, /<\/\s*script\s*>/, b.localMode.token(a, b.localState))
        }
        function g(a, b) {
            return a.match(/^<\/\s*style\s*>/i, !1) ? (b.token = d,
            b.localState = b.localMode = null,
            d(a, b)) : e(a, /<\/\s*style\s*>/, i.token(a, b.localState))
        }
        var h = a.getMode(b, {
            name: "xml",
            htmlMode: !0,
            multilineTagIndentFactor: c.multilineTagIndentFactor,
            multilineTagIndentPastTag: c.multilineTagIndentPastTag
        })
          , i = a.getMode(b, "css")
          , j = []
          , k = c && c.scriptTypes;
        if (j.push({
            matches: /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^$/i,
            mode: a.getMode(b, "javascript")
        }),
        k)
            for (var l = 0; l < k.length; ++l) {
                var m = k[l];
                j.push({
                    matches: m.matches,
                    mode: m.mode && a.getMode(b, m.mode)
                })
            }
        return j.push({
            matches: /./,
            mode: a.getMode(b, "text/plain")
        }),
        {
            startState: function() {
                var a = h.startState();
                return {
                    token: d,
                    localMode: null,
                    localState: null,
                    htmlState: a
                }
            },
            copyState: function(b) {
                if (b.localState)
                    var c = a.copyState(b.localMode, b.localState);
                return {
                    token: b.token,
                    localMode: b.localMode,
                    localState: c,
                    htmlState: a.copyState(h, b.htmlState)
                }
            },
            token: function(a, b) {
                return b.token(a, b)
            },
            indent: function(b, c) {
                return !b.localMode || /^\s*<\//.test(c) ? h.indent(b.htmlState, c) : b.localMode.indent ? b.localMode.indent(b.localState, c) : a.Pass
            },
            innerMode: function(a) {
                return {
                    state: a.localState || a.htmlState,
                    mode: a.localMode || h
                }
            }
        }
    }, "xml", "javascript", "css"),
    a.defineMIME("text/html", "htmlmixed")
}),
function(a, b) {
    "use strict";
    var c, d = a, e = d.document, f = d.navigator, g = d.setTimeout, h = d.encodeURIComponent, i = d.ActiveXObject, j = d.Error, k = d.Number.parseInt || d.parseInt, l = d.Number.parseFloat || d.parseFloat, m = d.Number.isNaN || d.isNaN, n = d.Math.round, o = d.Date.now, p = d.Object.keys, q = d.Object.defineProperty, r = d.Object.prototype.hasOwnProperty, s = d.Array.prototype.slice, t = function() {
        var a = function(a) {
            return a
        };
        if ("function" == typeof d.wrap && "function" == typeof d.unwrap)
            try {
                var b = e.createElement("div")
                  , c = d.unwrap(b);
                1 === b.nodeType && c && 1 === c.nodeType && (a = d.unwrap)
            } catch (f) {}
        return a
    }(), u = function(a) {
        return s.call(a, 0)
    }, v = function() {
        var a, c, d, e, f, g, h = u(arguments), i = h[0] || {};
        for (a = 1,
        c = h.length; c > a; a++)
            if (null != (d = h[a]))
                for (e in d)
                    r.call(d, e) && (f = i[e],
                    g = d[e],
                    i !== g && g !== b && (i[e] = g));
        return i
    }, w = function(a) {
        var b, c, d, e;
        if ("object" != typeof a || null == a)
            b = a;
        else if ("number" == typeof a.length)
            for (b = [],
            c = 0,
            d = a.length; d > c; c++)
                r.call(a, c) && (b[c] = w(a[c]));
        else {
            b = {};
            for (e in a)
                r.call(a, e) && (b[e] = w(a[e]))
        }
        return b
    }, x = function(a, b) {
        for (var c = {}, d = 0, e = b.length; e > d; d++)
            b[d]in a && (c[b[d]] = a[b[d]]);
        return c
    }, y = function(a, b) {
        var c = {};
        for (var d in a)
            -1 === b.indexOf(d) && (c[d] = a[d]);
        return c
    }, z = function(a) {
        if (a)
            for (var b in a)
                r.call(a, b) && delete a[b];
        return a
    }, A = function(a, b) {
        if (a && 1 === a.nodeType && a.ownerDocument && b && (1 === b.nodeType && b.ownerDocument && b.ownerDocument === a.ownerDocument || 9 === b.nodeType && !b.ownerDocument && b === a.ownerDocument))
            do {
                if (a === b)
                    return !0;
                a = a.parentNode
            } while (a);return !1
    }, B = function(a) {
        var b;
        return "string" == typeof a && a && (b = a.split("#")[0].split("?")[0],
        b = a.slice(0, a.lastIndexOf("/") + 1)),
        b
    }, C = function(a) {
        var b, c;
        return "string" == typeof a && a && (c = a.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),
        c && c[1] ? b = c[1] : (c = a.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),
        c && c[1] && (b = c[1]))),
        b
    }, D = function() {
        var a, b;
        try {
            throw new j
        } catch (c) {
            b = c
        }
        return b && (a = b.sourceURL || b.fileName || C(b.stack)),
        a
    }, E = function() {
        var a, c, d;
        if (e.currentScript && (a = e.currentScript.src))
            return a;
        if (c = e.getElementsByTagName("script"),
        1 === c.length)
            return c[0].src || b;
        if ("readyState"in c[0])
            for (d = c.length; d--; )
                if ("interactive" === c[d].readyState && (a = c[d].src))
                    return a;
        return "loading" === e.readyState && (a = c[c.length - 1].src) ? a : (a = D()) ? a : b
    }, F = function() {
        var a, c, d, f = e.getElementsByTagName("script");
        for (a = f.length; a--; ) {
            if (!(d = f[a].src)) {
                c = null;
                break
            }
            if (d = B(d),
            null == c)
                c = d;
            else if (c !== d) {
                c = null;
                break
            }
        }
        return c || b
    }, G = function() {
        var a = B(E()) || F() || "";
        return a + "ZeroClipboard.swf"
    }, H = {
        bridge: null,
        version: "0.0.0",
        pluginType: "unknown",
        disabled: null,
        outdated: null,
        unavailable: null,
        deactivated: null,
        overdue: null,
        ready: null
    }, I = "11.0.0", J = {}, K = {}, L = null, M = {
        ready: "Flash communication is established",
        error: {
            "flash-disabled": "Flash is disabled or not installed",
            "flash-outdated": "Flash is too outdated to support ZeroClipboard",
            "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
            "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate",
            "flash-overdue": "Flash communication was established but NOT within the acceptable time limit"
        }
    }, N = {
        swfPath: G(),
        trustedDomains: a.location.host ? [a.location.host] : [],
        cacheBust: !0,
        forceEnhancedClipboard: !1,
        flashLoadTimeout: 3e4,
        autoActivate: !0,
        bubbleEvents: !0,
        containerId: "global-zeroclipboard-html-bridge",
        containerClass: "global-zeroclipboard-container",
        swfObjectId: "global-zeroclipboard-flash-bridge",
        hoverClass: "zeroclipboard-is-hover",
        activeClass: "zeroclipboard-is-active",
        forceHandCursor: !1,
        title: null,
        zIndex: 999999999
    }, O = function(a) {
        if ("object" == typeof a && null !== a)
            for (var b in a)
                if (r.call(a, b))
                    if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(b))
                        N[b] = a[b];
                    else if (null == H.bridge)
                        if ("containerId" === b || "swfObjectId" === b) {
                            if (!ba(a[b]))
                                throw new Error("The specified `" + b + "` value is not valid as an HTML4 Element ID");
                            N[b] = a[b]
                        } else
                            N[b] = a[b];
        {
            if ("string" != typeof a || !a)
                return w(N);
            if (r.call(N, a))
                return N[a]
        }
    }, P = function() {
        return {
            browser: x(f, ["userAgent", "platform", "appName"]),
            flash: y(H, ["bridge"]),
            zeroclipboard: {
                version: Ea.version,
                config: Ea.config()
            }
        }
    }, Q = function() {
        return !!(H.disabled || H.outdated || H.unavailable || H.deactivated)
    }, R = function(a, b) {
        var c, d, e, f = {};
        if ("string" == typeof a && a)
            e = a.toLowerCase().split(/\s+/);
        else if ("object" == typeof a && a && "undefined" == typeof b)
            for (c in a)
                r.call(a, c) && "string" == typeof c && c && "function" == typeof a[c] && Ea.on(c, a[c]);
        if (e && e.length) {
            for (c = 0,
            d = e.length; d > c; c++)
                a = e[c].replace(/^on/, ""),
                f[a] = !0,
                J[a] || (J[a] = []),
                J[a].push(b);
            if (f.ready && H.ready && Ea.emit({
                type: "ready"
            }),
            f.error) {
                var g = ["disabled", "outdated", "unavailable", "deactivated", "overdue"];
                for (c = 0,
                d = g.length; d > c; c++)
                    if (H[g[c]] === !0) {
                        Ea.emit({
                            type: "error",
                            name: "flash-" + g[c]
                        });
                        break
                    }
            }
        }
        return Ea
    }, S = function(a, b) {
        var c, d, e, f, g;
        if (0 === arguments.length)
            f = p(J);
        else if ("string" == typeof a && a)
            f = a.split(/\s+/);
        else if ("object" == typeof a && a && "undefined" == typeof b)
            for (c in a)
                r.call(a, c) && "string" == typeof c && c && "function" == typeof a[c] && Ea.off(c, a[c]);
        if (f && f.length)
            for (c = 0,
            d = f.length; d > c; c++)
                if (a = f[c].toLowerCase().replace(/^on/, ""),
                g = J[a],
                g && g.length)
                    if (b)
                        for (e = g.indexOf(b); -1 !== e; )
                            g.splice(e, 1),
                            e = g.indexOf(b, e);
                    else
                        g.length = 0;
        return Ea
    }, T = function(a) {
        var b;
        return b = "string" == typeof a && a ? w(J[a]) || null : w(J)
    }, U = function(a) {
        var b, c, d;
        return a = ca(a),
        a && !ia(a) ? "ready" === a.type && H.overdue === !0 ? Ea.emit({
            type: "error",
            name: "flash-overdue"
        }) : (b = v({}, a),
        ha.call(this, b),
        "copy" === a.type && (d = oa(K),
        c = d.data,
        L = d.formatMap),
        c) : void 0
    }, V = function() {
        if ("boolean" != typeof H.ready && (H.ready = !1),
        !Ea.isFlashUnusable() && null === H.bridge) {
            var a = N.flashLoadTimeout;
            "number" == typeof a && a >= 0 && g(function() {
                "boolean" != typeof H.deactivated && (H.deactivated = !0),
                H.deactivated === !0 && Ea.emit({
                    type: "error",
                    name: "flash-deactivated"
                })
            }, a),
            H.overdue = !1,
            ma()
        }
    }, W = function() {
        Ea.clearData(),
        Ea.blur(),
        Ea.emit("destroy"),
        na(),
        Ea.off()
    }, X = function(a, b) {
        var c;
        if ("object" == typeof a && a && "undefined" == typeof b)
            c = a,
            Ea.clearData();
        else {
            if ("string" != typeof a || !a)
                return;
            c = {},
            c[a] = b
        }
        for (var d in c)
            "string" == typeof d && d && r.call(c, d) && "string" == typeof c[d] && c[d] && (K[d] = c[d])
    }, Y = function(a) {
        "undefined" == typeof a ? (z(K),
        L = null) : "string" == typeof a && r.call(K, a) && delete K[a]
    }, Z = function(a) {
        return "undefined" == typeof a ? w(K) : "string" == typeof a && r.call(K, a) ? K[a] : void 0
    }, $ = function(a) {
        if (a && 1 === a.nodeType) {
            c && (wa(c, N.activeClass),
            c !== a && wa(c, N.hoverClass)),
            c = a,
            va(a, N.hoverClass);
            var b = a.getAttribute("title") || N.title;
            if ("string" == typeof b && b) {
                var d = la(H.bridge);
                d && d.setAttribute("title", b)
            }
            var e = N.forceHandCursor === !0 || "pointer" === xa(a, "cursor");
            Ba(e),
            Aa()
        }
    }, _ = function() {
        var a = la(H.bridge);
        a && (a.removeAttribute("title"),
        a.style.left = "0px",
        a.style.top = "-9999px",
        a.style.width = "1px",
        a.style.top = "1px"),
        c && (wa(c, N.hoverClass),
        wa(c, N.activeClass),
        c = null)
    }, aa = function() {
        return c || null
    }, ba = function(a) {
        return "string" == typeof a && a && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(a)
    }, ca = function(a) {
        var b;
        if ("string" == typeof a && a ? (b = a,
        a = {}) : "object" == typeof a && a && "string" == typeof a.type && a.type && (b = a.type),
        b) {
            v(a, {
                type: b.toLowerCase(),
                target: a.target || c || null,
                relatedTarget: a.relatedTarget || null,
                currentTarget: H && H.bridge || null,
                timeStamp: a.timeStamp || o() || null
            });
            var d = M[a.type];
            return "error" === a.type && a.name && d && (d = d[a.name]),
            d && (a.message = d),
            "ready" === a.type && v(a, {
                target: null,
                version: H.version
            }),
            "error" === a.type && (/^flash-(disabled|outdated|unavailable|deactivated|overdue)$/.test(a.name) && v(a, {
                target: null,
                minimumVersion: I
            }),
            /^flash-(outdated|unavailable|deactivated|overdue)$/.test(a.name) && v(a, {
                version: H.version
            })),
            "copy" === a.type && (a.clipboardData = {
                setData: Ea.setData,
                clearData: Ea.clearData
            }),
            "aftercopy" === a.type && (a = pa(a, L)),
            a.target && !a.relatedTarget && (a.relatedTarget = da(a.target)),
            a = ea(a)
        }
    }, da = function(a) {
        var b = a && a.getAttribute && a.getAttribute("data-clipboard-target");
        return b ? e.getElementById(b) : null
    }, ea = function(a) {
        if (a && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)) {
            var c = a.target
              , f = "_mouseover" === a.type && a.relatedTarget ? a.relatedTarget : b
              , g = "_mouseout" === a.type && a.relatedTarget ? a.relatedTarget : b
              , h = za(c)
              , i = d.screenLeft || d.screenX || 0
              , j = d.screenTop || d.screenY || 0
              , k = e.body.scrollLeft + e.documentElement.scrollLeft
              , l = e.body.scrollTop + e.documentElement.scrollTop
              , m = h.left + ("number" == typeof a._stageX ? a._stageX : 0)
              , n = h.top + ("number" == typeof a._stageY ? a._stageY : 0)
              , o = m - k
              , p = n - l
              , q = i + o
              , r = j + p
              , s = "number" == typeof a.movementX ? a.movementX : 0
              , t = "number" == typeof a.movementY ? a.movementY : 0;
            delete a._stageX,
            delete a._stageY,
            v(a, {
                srcElement: c,
                fromElement: f,
                toElement: g,
                screenX: q,
                screenY: r,
                pageX: m,
                pageY: n,
                clientX: o,
                clientY: p,
                x: o,
                y: p,
                movementX: s,
                movementY: t,
                offsetX: 0,
                offsetY: 0,
                layerX: 0,
                layerY: 0
            })
        }
        return a
    }, fa = function(a) {
        var b = a && "string" == typeof a.type && a.type || "";
        return !/^(?:(?:before)?copy|destroy)$/.test(b)
    }, ga = function(a, b, c, d) {
        d ? g(function() {
            a.apply(b, c)
        }, 0) : a.apply(b, c)
    }, ha = function(a) {
        if ("object" == typeof a && a && a.type) {
            var b = fa(a)
              , c = J["*"] || []
              , e = J[a.type] || []
              , f = c.concat(e);
            if (f && f.length) {
                var g, h, i, j, k, l = this;
                for (g = 0,
                h = f.length; h > g; g++)
                    i = f[g],
                    j = l,
                    "string" == typeof i && "function" == typeof d[i] && (i = d[i]),
                    "object" == typeof i && i && "function" == typeof i.handleEvent && (j = i,
                    i = i.handleEvent),
                    "function" == typeof i && (k = v({}, a),
                    ga(i, j, [k], b))
            }
            return this
        }
    }, ia = function(a) {
        var b = a.target || c || null
          , d = "swf" === a._source;
        delete a._source;
        var e = ["flash-disabled", "flash-outdated", "flash-unavailable", "flash-deactivated", "flash-overdue"];
        switch (a.type) {
        case "error":
            -1 !== e.indexOf(a.name) && v(H, {
                disabled: "flash-disabled" === a.name,
                outdated: "flash-outdated" === a.name,
                unavailable: "flash-unavailable" === a.name,
                deactivated: "flash-deactivated" === a.name,
                overdue: "flash-overdue" === a.name,
                ready: !1
            });
            break;
        case "ready":
            var f = H.deactivated === !0;
            v(H, {
                disabled: !1,
                outdated: !1,
                unavailable: !1,
                deactivated: !1,
                overdue: f,
                ready: !f
            });
            break;
        case "copy":
            var g, h, i = a.relatedTarget;
            !K["text/html"] && !K["text/plain"] && i && (h = i.value || i.outerHTML || i.innerHTML) && (g = i.value || i.textContent || i.innerText) ? (a.clipboardData.clearData(),
            a.clipboardData.setData("text/plain", g),
            h !== g && a.clipboardData.setData("text/html", h)) : !K["text/plain"] && a.target && (g = a.target.getAttribute("data-clipboard-text")) && (a.clipboardData.clearData(),
            a.clipboardData.setData("text/plain", g));
            break;
        case "aftercopy":
            Ea.clearData(),
            b && b !== ua() && b.focus && b.focus();
            break;
        case "_mouseover":
            Ea.focus(b),
            N.bubbleEvents === !0 && d && (b && b !== a.relatedTarget && !A(a.relatedTarget, b) && ja(v({}, a, {
                type: "mouseenter",
                bubbles: !1,
                cancelable: !1
            })),
            ja(v({}, a, {
                type: "mouseover"
            })));
            break;
        case "_mouseout":
            Ea.blur(),
            N.bubbleEvents === !0 && d && (b && b !== a.relatedTarget && !A(a.relatedTarget, b) && ja(v({}, a, {
                type: "mouseleave",
                bubbles: !1,
                cancelable: !1
            })),
            ja(v({}, a, {
                type: "mouseout"
            })));
            break;
        case "_mousedown":
            va(b, N.activeClass),
            N.bubbleEvents === !0 && d && ja(v({}, a, {
                type: a.type.slice(1)
            }));
            break;
        case "_mouseup":
            wa(b, N.activeClass),
            N.bubbleEvents === !0 && d && ja(v({}, a, {
                type: a.type.slice(1)
            }));
            break;
        case "_click":
        case "_mousemove":
            N.bubbleEvents === !0 && d && ja(v({}, a, {
                type: a.type.slice(1)
            }))
        }
        return /^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type) ? !0 : void 0
    }, ja = function(a) {
        if (a && "string" == typeof a.type && a) {
            var b, c = a.target || null, f = c && c.ownerDocument || e, g = {
                view: f.defaultView || d,
                canBubble: !0,
                cancelable: !0,
                detail: "click" === a.type ? 1 : 0,
                button: "number" == typeof a.which ? a.which - 1 : "number" == typeof a.button ? a.button : f.createEvent ? 0 : 1
            }, h = v(g, a);
            c && f.createEvent && c.dispatchEvent && (h = [h.type, h.canBubble, h.cancelable, h.view, h.detail, h.screenX, h.screenY, h.clientX, h.clientY, h.ctrlKey, h.altKey, h.shiftKey, h.metaKey, h.button, h.relatedTarget],
            b = f.createEvent("MouseEvents"),
            b.initMouseEvent && (b.initMouseEvent.apply(b, h),
            b._source = "js",
            c.dispatchEvent(b)))
        }
    }, ka = function() {
        var a = e.createElement("div");
        return a.id = N.containerId,
        a.className = N.containerClass,
        a.style.position = "absolute",
        a.style.left = "0px",
        a.style.top = "-9999px",
        a.style.width = "1px",
        a.style.height = "1px",
        a.style.zIndex = "" + Ca(N.zIndex),
        a
    }, la = function(a) {
        for (var b = a && a.parentNode; b && "OBJECT" === b.nodeName && b.parentNode; )
            b = b.parentNode;
        return b || null
    }, ma = function() {
        var a, b = H.bridge, c = la(b);
        if (!b) {
            var f = ta(d.location.host, N)
              , g = "never" === f ? "none" : "all"
              , h = ra(N)
              , i = N.swfPath + qa(N.swfPath, N);
            c = ka();
            var j = e.createElement("div");
            c.appendChild(j),
            e.body.appendChild(c);
            var k = e.createElement("div")
              , l = "activex" === H.pluginType;
            k.innerHTML = '<object id="' + N.swfObjectId + '" name="' + N.swfObjectId + '" width="100%" height="100%" ' + (l ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + i + '"') + ">" + (l ? '<param name="movie" value="' + i + '"/>' : "") + '<param name="allowScriptAccess" value="' + f + '"/><param name="allowNetworking" value="' + g + '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' + h + '"/></object>',
            b = k.firstChild,
            k = null,
            t(b).ZeroClipboard = Ea,
            c.replaceChild(b, j)
        }
        return b || (b = e[N.swfObjectId],
        b && (a = b.length) && (b = b[a - 1]),
        !b && c && (b = c.firstChild)),
        H.bridge = b || null,
        b
    }, na = function() {
        var a = H.bridge;
        if (a) {
            var b = la(a);
            b && ("activex" === H.pluginType && "readyState"in a ? (a.style.display = "none",
            function c() {
                if (4 === a.readyState) {
                    for (var d in a)
                        "function" == typeof a[d] && (a[d] = null);
                    a.parentNode && a.parentNode.removeChild(a),
                    b.parentNode && b.parentNode.removeChild(b)
                } else
                    g(c, 10)
            }()) : (a.parentNode && a.parentNode.removeChild(a),
            b.parentNode && b.parentNode.removeChild(b))),
            H.ready = null,
            H.bridge = null,
            H.deactivated = null
        }
    }, oa = function(a) {
        var b = {}
          , c = {};
        if ("object" == typeof a && a) {
            for (var d in a)
                if (d && r.call(a, d) && "string" == typeof a[d] && a[d])
                    switch (d.toLowerCase()) {
                    case "text/plain":
                    case "text":
                    case "air:text":
                    case "flash:text":
                        b.text = a[d],
                        c.text = d;
                        break;
                    case "text/html":
                    case "html":
                    case "air:html":
                    case "flash:html":
                        b.html = a[d],
                        c.html = d;
                        break;
                    case "application/rtf":
                    case "text/rtf":
                    case "rtf":
                    case "richtext":
                    case "air:rtf":
                    case "flash:rtf":
                        b.rtf = a[d],
                        c.rtf = d
                    }
            return {
                data: b,
                formatMap: c
            }
        }
    }, pa = function(a, b) {
        if ("object" != typeof a || !a || "object" != typeof b || !b)
            return a;
        var c = {};
        for (var d in a)
            if (r.call(a, d)) {
                if ("success" !== d && "data" !== d) {
                    c[d] = a[d];
                    continue
                }
                c[d] = {};
                var e = a[d];
                for (var f in e)
                    f && r.call(e, f) && r.call(b, f) && (c[d][b[f]] = e[f])
            }
        return c
    }, qa = function(a, b) {
        var c = null == b || b && b.cacheBust === !0;
        return c ? (-1 === a.indexOf("?") ? "?" : "&") + "noCache=" + o() : ""
    }, ra = function(a) {
        var b, c, e, f, g = "", i = [];
        if (a.trustedDomains && ("string" == typeof a.trustedDomains ? f = [a.trustedDomains] : "object" == typeof a.trustedDomains && "length"in a.trustedDomains && (f = a.trustedDomains)),
        f && f.length)
            for (b = 0,
            c = f.length; c > b; b++)
                if (r.call(f, b) && f[b] && "string" == typeof f[b]) {
                    if (e = sa(f[b]),
                    !e)
                        continue;
                    if ("*" === e) {
                        i.length = 0,
                        i.push(e);
                        break
                    }
                    i.push.apply(i, [e, "//" + e, d.location.protocol + "//" + e])
                }
        return i.length && (g += "trustedOrigins=" + h(i.join(","))),
        a.forceEnhancedClipboard === !0 && (g += (g ? "&" : "") + "forceEnhancedClipboard=true"),
        "string" == typeof a.swfObjectId && a.swfObjectId && (g += (g ? "&" : "") + "swfObjectId=" + h(a.swfObjectId)),
        g
    }, sa = function(a) {
        if (null == a || "" === a)
            return null;
        if (a = a.replace(/^\s+|\s+$/g, ""),
        "" === a)
            return null;
        var b = a.indexOf("//");
        a = -1 === b ? a : a.slice(b + 2);
        var c = a.indexOf("/");
        return a = -1 === c ? a : -1 === b || 0 === c ? null : a.slice(0, c),
        a && ".swf" === a.slice(-4).toLowerCase() ? null : a || null
    }, ta = function() {
        var a = function(a) {
            var b, c, d, e = [];
            if ("string" == typeof a && (a = [a]),
            "object" != typeof a || !a || "number" != typeof a.length)
                return e;
            for (b = 0,
            c = a.length; c > b; b++)
                if (r.call(a, b) && (d = sa(a[b]))) {
                    if ("*" === d) {
                        e.length = 0,
                        e.push("*");
                        break
                    }
                    -1 === e.indexOf(d) && e.push(d)
                }
            return e
        };
        return function(b, c) {
            var d = sa(c.swfPath);
            null === d && (d = b);
            var e = a(c.trustedDomains)
              , f = e.length;
            if (f > 0) {
                if (1 === f && "*" === e[0])
                    return "always";
                if (-1 !== e.indexOf(b))
                    return 1 === f && b === d ? "sameDomain" : "always"
            }
            return "never"
        }
    }(), ua = function() {
        try {
            return e.activeElement
        } catch (a) {
            return null
        }
    }, va = function(a, b) {
        if (!a || 1 !== a.nodeType)
            return a;
        if (a.classList)
            return a.classList.contains(b) || a.classList.add(b),
            a;
        if (b && "string" == typeof b) {
            var c = (b || "").split(/\s+/);
            if (1 === a.nodeType)
                if (a.className) {
                    for (var d = " " + a.className + " ", e = a.className, f = 0, g = c.length; g > f; f++)
                        d.indexOf(" " + c[f] + " ") < 0 && (e += " " + c[f]);
                    a.className = e.replace(/^\s+|\s+$/g, "")
                } else
                    a.className = b
        }
        return a
    }, wa = function(a, b) {
        if (!a || 1 !== a.nodeType)
            return a;
        if (a.classList)
            return a.classList.contains(b) && a.classList.remove(b),
            a;
        if ("string" == typeof b && b) {
            var c = b.split(/\s+/);
            if (1 === a.nodeType && a.className) {
                for (var d = (" " + a.className + " ").replace(/[\n\t]/g, " "), e = 0, f = c.length; f > e; e++)
                    d = d.replace(" " + c[e] + " ", " ");
                a.className = d.replace(/^\s+|\s+$/g, "")
            }
        }
        return a
    }, xa = function(a, b) {
        var c = d.getComputedStyle(a, null).getPropertyValue(b);
        return "cursor" !== b || c && "auto" !== c || "A" !== a.nodeName ? c : "pointer"
    }, ya = function() {
        var a, b, c, d = 1;
        return "function" == typeof e.body.getBoundingClientRect && (a = e.body.getBoundingClientRect(),
        b = a.right - a.left,
        c = e.body.offsetWidth,
        d = n(b / c * 100) / 100),
        d
    }, za = function(a) {
        var b = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        };
        if (a.getBoundingClientRect) {
            var c, f, g, h = a.getBoundingClientRect();
            "pageXOffset"in d && "pageYOffset"in d ? (c = d.pageXOffset,
            f = d.pageYOffset) : (g = ya(),
            c = n(e.documentElement.scrollLeft / g),
            f = n(e.documentElement.scrollTop / g));
            var i = e.documentElement.clientLeft || 0
              , j = e.documentElement.clientTop || 0;
            b.left = h.left + c - i,
            b.top = h.top + f - j,
            b.width = "width"in h ? h.width : h.right - h.left,
            b.height = "height"in h ? h.height : h.bottom - h.top
        }
        return b
    }, Aa = function() {
        var a;
        if (c && (a = la(H.bridge))) {
            var b = za(c);
            v(a.style, {
                width: b.width + "px",
                height: b.height + "px",
                top: b.top + "px",
                left: b.left + "px",
                zIndex: "" + Ca(N.zIndex)
            })
        }
    }, Ba = function(a) {
        H.ready === !0 && (H.bridge && "function" == typeof H.bridge.setHandCursor ? H.bridge.setHandCursor(a) : H.ready = !1)
    }, Ca = function(a) {
        if (/^(?:auto|inherit)$/.test(a))
            return a;
        var b;
        return "number" != typeof a || m(a) ? "string" == typeof a && (b = Ca(k(a, 10))) : b = a,
        "number" == typeof b ? b : "auto"
    }, Da = function(a) {
        function b(a) {
            var b = a.match(/[\d]+/g);
            return b.length = 3,
            b.join(".")
        }
        function c(a) {
            return !!a && (a = a.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(a) || "chrome.plugin" === a.slice(-13))
        }
        function d(a) {
            a && (i = !0,
            a.version && (m = b(a.version)),
            !m && a.description && (m = b(a.description)),
            a.filename && (k = c(a.filename)))
        }
        var e, g, h, i = !1, j = !1, k = !1, m = "";
        if (f.plugins && f.plugins.length)
            e = f.plugins["Shockwave Flash"],
            d(e),
            f.plugins["Shockwave Flash 2.0"] && (i = !0,
            m = "2.0.0.11");
        else if (f.mimeTypes && f.mimeTypes.length)
            h = f.mimeTypes["application/x-shockwave-flash"],
            e = h && h.enabledPlugin,
            d(e);
        else if ("undefined" != typeof a) {
            j = !0;
            try {
                g = new a("ShockwaveFlash.ShockwaveFlash.7"),
                i = !0,
                m = b(g.GetVariable("$version"))
            } catch (n) {
                try {
                    g = new a("ShockwaveFlash.ShockwaveFlash.6"),
                    i = !0,
                    m = "6.0.21"
                } catch (o) {
                    try {
                        g = new a("ShockwaveFlash.ShockwaveFlash"),
                        i = !0,
                        m = b(g.GetVariable("$version"))
                    } catch (p) {
                        j = !1
                    }
                }
            }
        }
        H.disabled = i !== !0,
        H.outdated = m && l(m) < l(I),
        H.version = m || "0.0.0",
        H.pluginType = k ? "pepper" : j ? "activex" : i ? "netscape" : "unknown"
    };
    Da(i);
    var Ea = function() {
        return this instanceof Ea ? void ("function" == typeof Ea._createClient && Ea._createClient.apply(this, u(arguments))) : new Ea
    };
    q(Ea, "version", {
        value: "2.1.5",
        writable: !1,
        configurable: !0,
        enumerable: !0
    }),
    Ea.config = function() {
        return O.apply(this, u(arguments))
    }
    ,
    Ea.state = function() {
        return P.apply(this, u(arguments))
    }
    ,
    Ea.isFlashUnusable = function() {
        return Q.apply(this, u(arguments))
    }
    ,
    Ea.on = function() {
        return R.apply(this, u(arguments))
    }
    ,
    Ea.off = function() {
        return S.apply(this, u(arguments))
    }
    ,
    Ea.handlers = function() {
        return T.apply(this, u(arguments))
    }
    ,
    Ea.emit = function() {
        return U.apply(this, u(arguments))
    }
    ,
    Ea.create = function() {
        return V.apply(this, u(arguments))
    }
    ,
    Ea.destroy = function() {
        return W.apply(this, u(arguments))
    }
    ,
    Ea.setData = function() {
        return X.apply(this, u(arguments))
    }
    ,
    Ea.clearData = function() {
        return Y.apply(this, u(arguments))
    }
    ,
    Ea.getData = function() {
        return Z.apply(this, u(arguments))
    }
    ,
    Ea.focus = Ea.activate = function() {
        return $.apply(this, u(arguments))
    }
    ,
    Ea.blur = Ea.deactivate = function() {
        return _.apply(this, u(arguments))
    }
    ,
    Ea.activeElement = function() {
        return aa.apply(this, u(arguments))
    }
    ;
    var Fa = 0
      , Ga = {}
      , Ha = 0
      , Ia = {}
      , Ja = {};
    v(N, {
        autoActivate: !0
    });
    var Ka = function(a) {
        var b = this;
        b.id = "" + Fa++,
        Ga[b.id] = {
            instance: b,
            elements: [],
            handlers: {}
        },
        a && b.clip(a),
        Ea.on("*", function(a) {
            return b.emit(a)
        }),
        Ea.on("destroy", function() {
            b.destroy()
        }),
        Ea.create()
    }
      , La = function(a, b) {
        var c, d, e, f = {}, g = Ga[this.id] && Ga[this.id].handlers;
        if ("string" == typeof a && a)
            e = a.toLowerCase().split(/\s+/);
        else if ("object" == typeof a && a && "undefined" == typeof b)
            for (c in a)
                r.call(a, c) && "string" == typeof c && c && "function" == typeof a[c] && this.on(c, a[c]);
        if (e && e.length) {
            for (c = 0,
            d = e.length; d > c; c++)
                a = e[c].replace(/^on/, ""),
                f[a] = !0,
                g[a] || (g[a] = []),
                g[a].push(b);
            if (f.ready && H.ready && this.emit({
                type: "ready",
                client: this
            }),
            f.error) {
                var h = ["disabled", "outdated", "unavailable", "deactivated", "overdue"];
                for (c = 0,
                d = h.length; d > c; c++)
                    if (H[h[c]]) {
                        this.emit({
                            type: "error",
                            name: "flash-" + h[c],
                            client: this
                        });
                        break
                    }
            }
        }
        return this
    }
      , Ma = function(a, b) {
        var c, d, e, f, g, h = Ga[this.id] && Ga[this.id].handlers;
        if (0 === arguments.length)
            f = p(h);
        else if ("string" == typeof a && a)
            f = a.split(/\s+/);
        else if ("object" == typeof a && a && "undefined" == typeof b)
            for (c in a)
                r.call(a, c) && "string" == typeof c && c && "function" == typeof a[c] && this.off(c, a[c]);
        if (f && f.length)
            for (c = 0,
            d = f.length; d > c; c++)
                if (a = f[c].toLowerCase().replace(/^on/, ""),
                g = h[a],
                g && g.length)
                    if (b)
                        for (e = g.indexOf(b); -1 !== e; )
                            g.splice(e, 1),
                            e = g.indexOf(b, e);
                    else
                        g.length = 0;
        return this
    }
      , Na = function(a) {
        var b = null
          , c = Ga[this.id] && Ga[this.id].handlers;
        return c && (b = "string" == typeof a && a ? c[a] ? c[a].slice(0) : [] : w(c)),
        b
    }
      , Oa = function(a) {
        if (Ta.call(this, a)) {
            "object" == typeof a && a && "string" == typeof a.type && a.type && (a = v({}, a));
            var b = v({}, ca(a), {
                client: this
            });
            Ua.call(this, b)
        }
        return this
    }
      , Pa = function(a) {
        a = Va(a);
        for (var b = 0; b < a.length; b++)
            if (r.call(a, b) && a[b] && 1 === a[b].nodeType) {
                a[b].zcClippingId ? -1 === Ia[a[b].zcClippingId].indexOf(this.id) && Ia[a[b].zcClippingId].push(this.id) : (a[b].zcClippingId = "zcClippingId_" + Ha++,
                Ia[a[b].zcClippingId] = [this.id],
                N.autoActivate === !0 && Wa(a[b]));
                var c = Ga[this.id] && Ga[this.id].elements;
                -1 === c.indexOf(a[b]) && c.push(a[b])
            }
        return this
    }
      , Qa = function(a) {
        var b = Ga[this.id];
        if (!b)
            return this;
        var c, d = b.elements;
        a = "undefined" == typeof a ? d.slice(0) : Va(a);
        for (var e = a.length; e--; )
            if (r.call(a, e) && a[e] && 1 === a[e].nodeType) {
                for (c = 0; -1 !== (c = d.indexOf(a[e], c)); )
                    d.splice(c, 1);
                var f = Ia[a[e].zcClippingId];
                if (f) {
                    for (c = 0; -1 !== (c = f.indexOf(this.id, c)); )
                        f.splice(c, 1);
                    0 === f.length && (N.autoActivate === !0 && Xa(a[e]),
                    delete a[e].zcClippingId)
                }
            }
        return this
    }
      , Ra = function() {
        var a = Ga[this.id];
        return a && a.elements ? a.elements.slice(0) : []
    }
      , Sa = function() {
        this.unclip(),
        this.off(),
        delete Ga[this.id]
    }
      , Ta = function(a) {
        if (!a || !a.type)
            return !1;
        if (a.client && a.client !== this)
            return !1;
        var b = Ga[this.id] && Ga[this.id].elements
          , c = !!b && b.length > 0
          , d = !a.target || c && -1 !== b.indexOf(a.target)
          , e = a.relatedTarget && c && -1 !== b.indexOf(a.relatedTarget)
          , f = a.client && a.client === this;
        return d || e || f ? !0 : !1
    }
      , Ua = function(a) {
        if ("object" == typeof a && a && a.type) {
            var b = fa(a)
              , c = Ga[this.id] && Ga[this.id].handlers["*"] || []
              , e = Ga[this.id] && Ga[this.id].handlers[a.type] || []
              , f = c.concat(e);
            if (f && f.length) {
                var g, h, i, j, k, l = this;
                for (g = 0,
                h = f.length; h > g; g++)
                    i = f[g],
                    j = l,
                    "string" == typeof i && "function" == typeof d[i] && (i = d[i]),
                    "object" == typeof i && i && "function" == typeof i.handleEvent && (j = i,
                    i = i.handleEvent),
                    "function" == typeof i && (k = v({}, a),
                    ga(i, j, [k], b))
            }
            return this
        }
    }
      , Va = function(a) {
        return "string" == typeof a && (a = []),
        "number" != typeof a.length ? [a] : a
    }
      , Wa = function(a) {
        if (a && 1 === a.nodeType) {
            var b = function(a) {
                (a || (a = d.event)) && ("js" !== a._source && (a.stopImmediatePropagation(),
                a.preventDefault()),
                delete a._source)
            }
              , c = function(c) {
                (c || (c = d.event)) && (b(c),
                Ea.focus(a))
            };
            a.addEventListener("mouseover", c, !1),
            a.addEventListener("mouseout", b, !1),
            a.addEventListener("mouseenter", b, !1),
            a.addEventListener("mouseleave", b, !1),
            a.addEventListener("mousemove", b, !1),
            Ja[a.zcClippingId] = {
                mouseover: c,
                mouseout: b,
                mouseenter: b,
                mouseleave: b,
                mousemove: b
            }
        }
    }
      , Xa = function(a) {
        if (a && 1 === a.nodeType) {
            var b = Ja[a.zcClippingId];
            if ("object" == typeof b && b) {
                for (var c, d, e = ["move", "leave", "enter", "out", "over"], f = 0, g = e.length; g > f; f++)
                    c = "mouse" + e[f],
                    d = b[c],
                    "function" == typeof d && a.removeEventListener(c, d, !1);
                delete Ja[a.zcClippingId]
            }
        }
    };
    Ea._createClient = function() {
        Ka.apply(this, u(arguments))
    }
    ,
    Ea.prototype.on = function() {
        return La.apply(this, u(arguments))
    }
    ,
    Ea.prototype.off = function() {
        return Ma.apply(this, u(arguments))
    }
    ,
    Ea.prototype.handlers = function() {
        return Na.apply(this, u(arguments))
    }
    ,
    Ea.prototype.emit = function() {
        return Oa.apply(this, u(arguments))
    }
    ,
    Ea.prototype.clip = function() {
        return Pa.apply(this, u(arguments))
    }
    ,
    Ea.prototype.unclip = function() {
        return Qa.apply(this, u(arguments))
    }
    ,
    Ea.prototype.elements = function() {
        return Ra.apply(this, u(arguments))
    }
    ,
    Ea.prototype.destroy = function() {
        return Sa.apply(this, u(arguments))
    }
    ,
    Ea.prototype.setText = function(a) {
        return Ea.setData("text/plain", a),
        this
    }
    ,
    Ea.prototype.setHtml = function(a) {
        return Ea.setData("text/html", a),
        this
    }
    ,
    Ea.prototype.setRichText = function(a) {
        return Ea.setData("application/rtf", a),
        this
    }
    ,
    Ea.prototype.setData = function() {
        return Ea.setData.apply(this, u(arguments)),
        this
    }
    ,
    Ea.prototype.clearData = function() {
        return Ea.clearData.apply(this, u(arguments)),
        this
    }
    ,
    Ea.prototype.getData = function() {
        return Ea.getData.apply(this, u(arguments))
    }
    ,
    "function" == typeof define && define.amd ? define(function() {
        return Ea
    }) : "object" == typeof module && module && "object" == typeof module.exports && module.exports ? module.exports = Ea : a.ZeroClipboard = Ea
}(function() {
    return this || window
}()),
function(a, b) {
    "use strict";
    var c = ""
      , d = "?"
      , e = "function"
      , f = "undefined"
      , g = "object"
      , h = "major"
      , i = "model"
      , j = "name"
      , k = "type"
      , l = "vendor"
      , m = "version"
      , n = "architecture"
      , o = "console"
      , p = "mobile"
      , q = "tablet"
      , r = "smarttv"
      , s = {
        has: function(a, b) {
            return "string" == typeof a ? -1 !== b.toLowerCase().indexOf(a.toLowerCase()) : void 0
        },
        lowerize: function(a) {
            return a.toLowerCase()
        }
    }
      , t = {
        rgx: function() {
            for (var a, c, d, h, i, j, k, l = 0, m = arguments; l < m.length; l += 2) {
                var n = m[l]
                  , o = m[l + 1];
                if (typeof a === f) {
                    a = {};
                    for (h in o)
                        i = o[h],
                        typeof i === g ? a[i[0]] = b : a[i] = b
                }
                for (c = d = 0; c < n.length; c++)
                    if (j = n[c].exec(this.getUA())) {
                        for (h = 0; h < o.length; h++)
                            k = j[++d],
                            i = o[h],
                            typeof i === g && i.length > 0 ? 2 == i.length ? typeof i[1] == e ? a[i[0]] = i[1].call(this, k) : a[i[0]] = i[1] : 3 == i.length ? typeof i[1] !== e || i[1].exec && i[1].test ? a[i[0]] = k ? k.replace(i[1], i[2]) : b : a[i[0]] = k ? i[1].call(this, k, i[2]) : b : 4 == i.length && (a[i[0]] = k ? i[3].call(this, k.replace(i[1], i[2])) : b) : a[i] = k ? k : b;
                        break
                    }
                if (j)
                    break
            }
            return a
        },
        str: function(a, c) {
            for (var e in c)
                if (typeof c[e] === g && c[e].length > 0) {
                    for (var f = 0; f < c[e].length; f++)
                        if (s.has(c[e][f], a))
                            return e === d ? b : e
                } else if (s.has(c[e], a))
                    return e === d ? b : e;
            return a
        }
    }
      , u = {
        browser: {
            oldsafari: {
                major: {
                    1: ["/8", "/1", "/3"],
                    2: "/4",
                    "?": "/"
                },
                version: {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                }
            }
        },
        device: {
            sprint: {
                model: {
                    "Evo Shift 4G": "7373KT"
                },
                vendor: {
                    HTC: "APA",
                    Sprint: "Sprint"
                }
            }
        },
        os: {
            windows: {
                version: {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2000: "NT 5.0",
                    XP: ["NT 5.1", "NT 5.2"],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    RT: "ARM"
                }
            }
        }
    }
      , v = {
        browser: [[/APP-([\w\s-\d]+)\/((\d+)?[\w\.]+)/i], [j, m, h], [/(opera\smini)\/((\d+)?[\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, /(opera).+version\/((\d+)?[\w\.]+)/i, /(opera)[\/\s]+((\d+)?[\w\.]+)/i], [j, m, h], [/\s(opr)\/((\d+)?[\w\.]+)/i], [[j, "Opera"], m, h], [/(kindle)\/((\d+)?[\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i, /(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i, /(rekonq)((?:\/)[\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i], [j, m, h], [/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i], [[j, "IE"], m, h], [/(yabrowser)\/((\d+)?[\w\.]+)/i], [[j, "Yandex"], m, h], [/(comodo_dragon)\/((\d+)?[\w\.]+)/i], [[j, /_/g, " "], m, h], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i], [j, m, h], [/(dolfin)\/((\d+)?[\w\.]+)/i], [[j, "Dolphin"], m, h], [/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i], [[j, "Chrome"], m, h], [/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i], [m, h, [j, "Mobile Safari"]], [/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i], [m, h, j], [/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i], [j, [h, t.str, u.browser.oldsafari.major], [m, t.str, u.browser.oldsafari.version]], [/(konqueror)\/((\d+)?[\w\.]+)/i, /(webkit|khtml)\/((\d+)?[\w\.]+)/i], [j, m, h], [/(navigator|netscape)\/((\d+)?[\w\.-]+)/i], [[j, "Netscape"], m, h], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i, /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i, /(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i, /(links)\s\(((\d+)?[\w\.]+)/i, /(gobrowser)\/?((\d+)?[\w\.]+)*/i, /(ice\s?browser)\/v?((\d+)?[\w\._]+)/i, /(mosaic)[\/\s]((\d+)?[\w\.]+)/i], [j, m, h], [/(apple(?:coremedia|))\/((\d+)[\w\._]+)/i, /(coremedia) v((\d+)[\w\._]+)/i], [j, m, h], [/(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i], [j, m], [/(ares|ossproxy)\s((\d+)[\w\.-]+)/i], [j, m, h], [/(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i, /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i, /(lg player|nexplayer)\s((\d+)[\d\.]+)/i, /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i], [j, m, h], [/(nexplayer)\s((\d+)[\w\.-]+)/i], [j, m, h], [/(flrp)\/((\d+)[\w\.-]+)/i], [[j, "Flip Player"], m, h], [/(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i], [j], [/(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i], [j, m, h], [/(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i, /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i, /(lavf)((\d+)[\d\.]+)/i], [j, m, h], [/(htc_one_s)\/((\d+)[\d\.]+)/i], [[j, /_/g, " "], m, h], [/(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i], [j, m], [/(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i], [j, m, h], [/(mplayer)/i, /(yourmuze)/i, /(media player classic|nero showtime)/i], [j], [/(nero (?:home|scout))\/((\d+)[\w\.-]+)/i], [j, m, h], [/(nokia\d+)\/((\d+)[\w\.-]+)/i], [j, m, h], [/\s(songbird)\/((\d+)[\w\.-]+)/i], [j, m, h], [/(winamp)3 version ((\d+)[\w\.-]+)/i, /(winamp)\s((\d+)[\w\.-]+)/i, /(winamp)mpeg\/((\d+)[\w\.-]+)/i], [j, m, h], [/(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i], [j], [/(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i], [j, m, h], [/(smp)((\d+)[\d\.]+)/i], [j, m, h], [/(vlc) media player - version ((\d+)[\w\.]+)/i, /(vlc)\/((\d+)[\w\.-]+)/i, /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i, /(foobar2000)\/((\d+)[\d\.]+)/i, /(itunes)\/((\d+)[\d\.]+)/i], [j, m, h], [/(wmplayer)\/((\d+)[\w\.-]+)/i, /(windows-media-player)\/((\d+)[\w\.-]+)/i], [[j, /-/g, " "], m, h], [/windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i], [m, h, [j, "Windows"]], [/(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i], [j, m, h], [/(rad.io)\s((\d+)[\d\.]+)/i, /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i], [[j, "rad.io"], m, h]],
        cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[n, "amd64"]], [/(ia32(?=;))/i], [[n, s.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[n, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[n, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[n, /ower/, "", s.lowerize]], [/(sun4\w)[;\)]/i], [[n, "sparc"]], [/(ia64(?=;)|68k(?=\))|arm(?=v\d+;)|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [n, s.lowerize]],
        device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [i, l, [k, q]], [/applecoremedia\/[\w\.]+ \((ipad)/], [i, [l, "Apple"], [k, q]], [/(apple\s{0,1}tv)/i], [[i, "Apple TV"], [l, "Apple"]], [/(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [l, i, [k, q]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i], [i, [l, "Amazon"], [k, q]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [i, l, [k, p]], [/\((ip[honed|\s\w*]+);/i], [i, [l, "Apple"], [k, p]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [l, i, [k, p]], [/\((bb10);\s(\w+)/i], [[l, "BlackBerry"], i, [k, p]], [/android.+((transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7))/i], [[l, "Asus"], i, [k, q]], [/(sony)\s(tablet\s[ps])/i], [l, i, [k, q]], [/(nintendo)\s([wids3u]+)/i], [l, i, [k, o]], [/((playstation)\s[3portablevi]+)/i], [[l, "Sony"], i, [k, o]], [/(sprint\s(\w+))/i], [[l, t.str, u.device.sprint.vendor], [i, t.str, u.device.sprint.model], [k, p]], [/(Lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], [[l, "Lenovo"], i, [k, q]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i], [l, [i, /_/g, " "], [k, p]], [/\s((milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?))[\w\s]+build\//i, /(mot)[\s-]?(\w+)*/i], [[l, "Motorola"], i, [k, p]], [/android.+\s((mz60\d|xoom[\s2]{0,2}))\sbuild\//i], [[l, "Motorola"], i, [k, q]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i], [[l, "Samsung"], i, [k, q]], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[l, "Samsung"], i, [k, p]], [/(sie)-(\w+)*/i], [[l, "Siemens"], i, [k, p]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i], [[l, "Nokia"], i, [k, p]], [/android\s3\.[\s\w-;]{10}((a\d{3}))/i], [[l, "Acer"], i, [k, q]], [/android\s3\.[\s\w-;]{10}(lg?)-([06cv9]{3,4})/i], [[l, "LG"], i, [k, q]], [/(lg) netcast\.tv/i], [l, [k, r]], [/((nexus\s[45]))/i, /(lg)[e;\s-\/]+(\w+)*/i], [[l, "LG"], i, [k, p]], [/android.+((ideatab[a-z0-9\-\s]+))/i], [[l, "Lenovo"], i, [k, q]], [/(mobile|tablet);.+rv\:.+gecko\//i], [k, l, i]],
        engine: [[/APP-([\w\s-\d]+)\/((\d+)?[\w\.]+)/i], [[j, "Mobile-App"], m], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [j, m], [/rv\:([\w\.]+).*(gecko)/i], [m, j]],
        os: [[/microsoft\s(windows)\s(vista|xp)/i], [j, m], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [j, [m, t.str, u.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[j, "Windows"], [m, t.str, u.os.windows.version]], [/\((bb)(10);/i], [[j, "BlackBerry"], m], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)\/([\w\.]+)/i, /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i], [j, m], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [[j, "Symbian"], m], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[j, "Firefox OS"], m], [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], [j, m], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[j, "Chromium OS"], m], [/(sunos)\s?([\w\.]+\d)*/i], [[j, "Solaris"], m], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], [j, m], [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i], [[j, "iOS"], [m, /_/g, "."]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i], [j, [m, /_/g, "."]], [/(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i, /(unix)\s?([\w\.]+)*/i], [j, m]]
    }
      , w = function(b) {
        var d = b || (a && a.navigator && a.navigator.userAgent ? a.navigator.userAgent : c);
        return this instanceof w ? (this.getBrowser = function() {
            return t.rgx.apply(this, v.browser)
        }
        ,
        this.getCPU = function() {
            return t.rgx.apply(this, v.cpu)
        }
        ,
        this.getDevice = function() {
            return t.rgx.apply(this, v.device)
        }
        ,
        this.getEngine = function() {
            return t.rgx.apply(this, v.engine)
        }
        ,
        this.getOS = function() {
            return t.rgx.apply(this, v.os)
        }
        ,
        this.getResult = function() {
            return {
                ua: this.getUA(),
                browser: this.getBrowser(),
                engine: this.getEngine(),
                os: this.getOS(),
                device: this.getDevice(),
                cpu: this.getCPU()
            }
        }
        ,
        this.getUA = function() {
            return d
        }
        ,
        this.setUA = function(a) {
            return d = a,
            this
        }
        ,
        void this.setUA(d)) : new w(b).getResult()
    };
    if (typeof exports !== f)
        typeof module !== f && module.exports && (exports = module.exports = w),
        exports.UAParser = w;
    else if (a.UAParser = w,
    typeof define === e && define.amd && define(function() {
        return w
    }),
    typeof a.jQuery !== f) {
        var x = a.jQuery
          , y = new w;
        x.ua = y.getResult(),
        x.ua.get = function() {
            return y.getUA()
        }
        ,
        x.ua.set = function(a) {
            y.setUA(a);
            var b = y.getResult();
            for (var c in b)
                x.ua[c] = b[c]
        }
    }
}(this),
self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
var Prism = function() {
    var a = /\blang(?:uage)?-(?!\*)(\w+)\b/i
      , b = self.Prism = {
        util: {
            encode: function(a) {
                return a instanceof c ? new c(a.type,b.util.encode(a.content),a.alias) : "Array" === b.util.type(a) ? a.map(b.util.encode) : a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
            },
            type: function(a) {
                return Object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1]
            },
            clone: function(a) {
                var c = b.util.type(a);
                switch (c) {
                case "Object":
                    var d = {};
                    for (var e in a)
                        a.hasOwnProperty(e) && (d[e] = b.util.clone(a[e]));
                    return d;
                case "Array":
                    return a.slice()
                }
                return a
            }
        },
        languages: {
            extend: function(a, c) {
                var d = b.util.clone(b.languages[a]);
                for (var e in c)
                    d[e] = c[e];
                return d
            },
            insertBefore: function(a, c, d, e) {
                e = e || b.languages;
                var f = e[a]
                  , g = {};
                for (var h in f)
                    if (f.hasOwnProperty(h)) {
                        if (h == c)
                            for (var i in d)
                                d.hasOwnProperty(i) && (g[i] = d[i]);
                        g[h] = f[h]
                    }
                return e[a] = g
            },
            DFS: function(a, c, d) {
                for (var e in a)
                    a.hasOwnProperty(e) && (c.call(a, e, a[e], d || e),
                    "Object" === b.util.type(a[e]) ? b.languages.DFS(a[e], c) : "Array" === b.util.type(a[e]) && b.languages.DFS(a[e], c, e))
            }
        },
        highlightAll: function(a, c) {
            for (var d, e = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), f = 0; d = e[f++]; )
                b.highlightElement(d, a === !0, c)
        },
        highlightElement: function(d, e, f) {
            for (var g, h, i = d; i && !a.test(i.className); )
                i = i.parentNode;
            if (i && (g = (i.className.match(a) || [, ""])[1],
            h = b.languages[g]),
            h) {
                d.className = d.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g,
                i = d.parentNode,
                /pre/i.test(i.nodeName) && (i.className = i.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g);
                var j = d.textContent;
                if (j) {
                    var k = {
                        element: d,
                        language: g,
                        grammar: h,
                        code: j
                    };
                    if (b.hooks.run("before-highlight", k),
                    e && self.Worker) {
                        var l = new Worker(b.filename);
                        l.onmessage = function(a) {
                            k.highlightedCode = c.stringify(JSON.parse(a.data), g),
                            b.hooks.run("before-insert", k),
                            k.element.innerHTML = k.highlightedCode,
                            f && f.call(k.element),
                            b.hooks.run("after-highlight", k)
                        }
                        ,
                        l.postMessage(JSON.stringify({
                            language: k.language,
                            code: k.code
                        }))
                    } else
                        k.highlightedCode = b.highlight(k.code, k.grammar, k.language),
                        b.hooks.run("before-insert", k),
                        k.element.innerHTML = k.highlightedCode,
                        f && f.call(d),
                        b.hooks.run("after-highlight", k)
                }
            }
        },
        highlight: function(a, d, e) {
            var f = b.tokenize(a, d);
            return c.stringify(b.util.encode(f), e)
        },
        tokenize: function(a, c) {
            var d = b.Token
              , e = [a]
              , f = c.rest;
            if (f) {
                for (var g in f)
                    c[g] = f[g];
                delete c.rest
            }
            a: for (var g in c)
                if (c.hasOwnProperty(g) && c[g]) {
                    var h = c[g];
                    h = "Array" === b.util.type(h) ? h : [h];
                    for (var i = 0; i < h.length; ++i) {
                        var j = h[i]
                          , k = j.inside
                          , l = !!j.lookbehind
                          , m = 0
                          , n = j.alias;
                        j = j.pattern || j;
                        for (var o = 0; o < e.length; o++) {
                            var p = e[o];
                            if (e.length > a.length)
                                break a;
                            if (!(p instanceof d)) {
                                j.lastIndex = 0;
                                var q = j.exec(p);
                                if (q) {
                                    l && (m = q[1].length);
                                    var r = q.index - 1 + m
                                      , q = q[0].slice(m)
                                      , s = q.length
                                      , t = r + s
                                      , u = p.slice(0, r + 1)
                                      , v = p.slice(t + 1)
                                      , w = [o, 1];
                                    u && w.push(u);
                                    var x = new d(g,k ? b.tokenize(q, k) : q,n);
                                    w.push(x),
                                    v && w.push(v),
                                    Array.prototype.splice.apply(e, w)
                                }
                            }
                        }
                    }
                }
            return e
        },
        hooks: {
            all: {},
            add: function(a, c) {
                var d = b.hooks.all;
                d[a] = d[a] || [],
                d[a].push(c)
            },
            run: function(a, c) {
                var d = b.hooks.all[a];
                if (d && d.length)
                    for (var e, f = 0; e = d[f++]; )
                        e(c)
            }
        }
    }
      , c = b.Token = function(a, b, c) {
        this.type = a,
        this.content = b,
        this.alias = c
    }
    ;
    if (c.stringify = function(a, d, e) {
        if ("string" == typeof a)
            return a;
        if ("[object Array]" == Object.prototype.toString.call(a))
            return a.map(function(b) {
                return c.stringify(b, d, a)
            }).join("");
        var f = {
            type: a.type,
            content: c.stringify(a.content, d, e),
            tag: "span",
            classes: ["token", a.type],
            attributes: {},
            language: d,
            parent: e
        };
        if ("comment" == f.type && (f.attributes.spellcheck = "true"),
        a.alias) {
            var g = "Array" === b.util.type(a.alias) ? a.alias : [a.alias];
            Array.prototype.push.apply(f.classes, g)
        }
        b.hooks.run("wrap", f);
        var h = "";
        for (var i in f.attributes)
            h += i + '="' + (f.attributes[i] || "") + '"';
        return "<" + f.tag + ' class="' + f.classes.join(" ") + '" ' + h + ">" + f.content + "</" + f.tag + ">"
    }
    ,
    !self.document)
        return self.addEventListener ? (self.addEventListener("message", function(a) {
            var c = JSON.parse(a.data)
              , d = c.language
              , e = c.code;
            self.postMessage(JSON.stringify(b.util.encode(b.tokenize(e, b.languages[d])))),
            self.close()
        }, !1),
        self.Prism) : self.Prism;
    var d = document.getElementsByTagName("script");
    return d = d[d.length - 1],
    d && (b.filename = d.src,
    document.addEventListener && !d.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", b.highlightAll)),
    self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism),
Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/g,
    prolog: /<\?.+?\?>/,
    doctype: /<!DOCTYPE.+?>/,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
        inside: {
            tag: {
                pattern: /^<\/?[\w:-]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[\w-]+?:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
                inside: {
                    punctuation: /=|>|"/g
                }
            },
            punctuation: /\/?>/g,
            "attr-name": {
                pattern: /[\w:-]+/g,
                inside: {
                    namespace: /^[\w-]+?:/
                }
            }
        }
    },
    entity: /\&#?[\da-z]{1,8};/gi
},
Prism.hooks.add("wrap", function(a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}),
Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//g,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
        inside: {
            punctuation: /[;:]/g
        }
    },
    url: /url\((["']?).*?\1\)/gi,
    selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
    property: /(\b|\B)[\w-]+(?=\s*:)/gi,
    string: /("|')(\\?.)*?\1/g,
    important: /\B!important\b/gi,
    punctuation: /[\{\};:]/g,
    "function": /[-a-z0-9]+(?=\()/gi
},
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
        inside: {
            tag: {
                pattern: /<style[\w\W]*?>|<\/style>/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.css
        }
    }
}),
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
        lookbehind: !0
    }],
    string: /("|')(\\?.)*?\1/g,
    "class-name": {
        pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
    "boolean": /\b(true|false)\b/g,
    "function": {
        pattern: /[a-z0-9_]+\(/gi,
        inside: {
            punctuation: /\(/
        }
    },
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
},
Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
}),
Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: !0
    }
}),
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi,
        inside: {
            tag: {
                pattern: /<script[\w\W]*?>|<\/script>/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.javascript
        }
    }
}),
this.cjs = this.cjs || {},
this.cjs.templates = this.cjs.templates || {},
this.cjs.templates.UIBlocker = Handlebars.template(function(a, b, c, d, e) {
    return this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {},
    '<div class="UIBlocker closed"></div>'
}),
this.cjs.templates.backToTop = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<div id="backToTop" class="hide">',
    (g = c.TOP) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.TOP,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "</div>\n"
}),
this.cjs.templates["demo-list"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f = "";
        return f += '\n	<div class="demo_image" style="background-image:url(',
        (e = c.IMAGE) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.IMAGE,
        d = typeof e === k ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += l(d) + ');"></div>\n		<div class="demo_text">\n			<h6 class="demo_title">',
        (e = c.TITLE) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.TITLE,
        d = typeof e === k ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += l(d) + '</h6>\n			<p class="demo_description">',
        (e = c.DESCRIPTION) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.DESCRIPTION,
        d = typeof e === k ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += l(d) + "</p>\n		</div>\n	"
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var g, h, i, j = "", k = "function", l = this.escapeExpression, m = this, n = c.helperMissing;
    return j += '<ul class="demo_list">\n	',
    h = c.demoList || b && b.demoList,
    i = {
        hash: {},
        inverse: m.noop,
        fn: m.program(1, f, e),
        data: e
    },
    g = h ? h.call(b, b && b.DISPLAY, i) : n.call(b, "demoList", b && b.DISPLAY, i),
    (g || 0 === g) && (j += g),
    j += "\n</ul>\n"
}),
this.cjs.templates.dialog = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<div class="dialog closed">\n	<h3 class="title"></h3>\n	<p class="message"></p>\n	<p class="close">',
    (g = c.CLOSE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.CLOSE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "</p>\n</div>"
}),
this.cjs.templates.nav = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<header>\n	<div id="nav_container">\n		<a id="nav-createjs" class="nav-item nav-logo" href="/"></a>\n		<p id="navToggle">',
    (g = c.MENU) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.MENU,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n		<nav role="navigation" id="nav" class="yes-touch closed">\n			<a href="/easeljs" class="nav-item">Easel<span class="title-js">JS</span></a>\n			<a href="/tweenjs" class="nav-item">Tween<span class="title-js">JS</span></a>\n			<a href="/soundjs" class="nav-item">Sound<span class="title-js">JS</span></a>\n			<a href="/preloadjs" class="nav-item">Preload<span class="title-js">JS</span></a>\n			<a href="/docs" class="nav-item">',
    (g = c.PAGE_DOCS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOCS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n			<a href="/tools" class="nav-item">',
    (g = c.PAGE_TOOLS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_TOOLS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n			<a href="http://blog.createjs.com" class="nav-item">',
    (g = c.BLOG) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BLOG,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n			<a href="https://github.com/CreateJS" id="nav-github" class="nav-item nav-icon"></a>\n			<a href="https://twitter.com/CreateJS" id="nav-twitter" class="nav-item nav-icon"></a>\n		</nav>\n	</div>\n</header>'
}),
this.cjs.templates.projects = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, h = "";
        return h += '\n		<div class="project_image">\n			<a class="project_link" href="',
        (e = c.PROJECT_URL) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.PROJECT_URL,
        d = typeof e === l ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        h += m(d) + '" style="background-image: url(/assets/images/required/',
        (e = c.IMAGE) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.IMAGE,
        d = typeof e === l ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        h += m(d) + ');"></a>\n		</div>\n		<div class="project_text">\n			<h4 class="project_title">\n				<a class="link-inline-invert" href="',
        (e = c.PROJECT_URL) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.PROJECT_URL,
        d = typeof e === l ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        h += m(d) + '">',
        (e = c.TITLE) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.TITLE,
        d = typeof e === l ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        h += m(d) + "</a>\n			</h4>\n			",
        e = c.generate || a && a.generate,
        f = {
            hash: {
                "class": "project_credits",
                element: "p"
            },
            inverse: n.noop,
            fn: n.program(2, g, b),
            data: b
        },
        d = e ? e.call(a, a && a.CREDITS, f) : o.call(a, "generate", a && a.CREDITS, f),
        (d || 0 === d) && (h += d),
        h += '\n			<p class="project_description">\n				',
        (e = c.DESCRIPTION) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.DESCRIPTION,
        d = typeof e === l ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        (d || 0 === d) && (h += d),
        h += "\n			</p>\n		</div>\n		"
    }
    function g(a, b) {
        var d, e, f = "";
        return f += '\n			<a class="link-inline-invert" href="',
        (e = c.URL) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.URL,
        d = typeof e === l ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += m(d) + '">',
        (e = c.COMPANY) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.COMPANY,
        d = typeof e === l ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += m(d) + "</a>\n			"
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var h, i, j, k = "", l = "function", m = this.escapeExpression, n = this, o = c.helperMissing;
    return k += '<div class="projects_container">\n	<div class="projects_list">\n		',
    i = c.projects || b && b.projects,
    j = {
        hash: {
            "class": "project",
            element: "div",
            filter: b && b.PROJECT_FILTER
        },
        inverse: n.noop,
        fn: n.program(1, f, e),
        data: e
    },
    h = i ? i.call(b, j) : o.call(b, "projects", j),
    (h || 0 === h) && (k += h),
    k += '\n	</div> <!-- /list -->\n\n	<div class="projects_controls">\n		<div class="scroll-left"></div>\n		<div class="scroll-right"></div>\n		<ul class="projects_pagination"></ul> <!-- placeholder, populated by JS -->\n	</div> <!-- /controls -->\n</div> <!-- /container -->\n'
}),
this.cjs.templates.sponsors = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<div class="sponsors">\n	<h6 class="footer_sponsors_title">',
    (g = c.SPONSOR_TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.SPONSOR_TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h6>\n	<div class="footer_sponsors">\n		<a class="link-image img-adobe img" href="http://www.adobe.com" title="Adobe"></a>\n		<a class="link-image img-microsoft img" href="http://dev.microsoftedge.com" title="Microsoft Edge"></a>\n		<a class="link-image img-mozilla img" href="http://www.mozilla.org" title="Mozilla"></a>\n		<a class="link-image img-gskinner img" href="http://www.gskinner.com" title="gskinner"></a>\n	</div>\n</div>'
}),
this.cjs.templates.tutorial = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, h = "";
        return h += '\n			<div class="dropdown closed">\n				<div class="dropdown_title">\n					<h6 class="dropdown_title-text">' + r((d = a && a.GETTING_STARTED,
        d = null == d || d === !1 ? d : d.OFFICIAL_TUTORIALS,
        typeof d === q ? d.apply(a) : d)) + '</h6>\n					<div class="dropdown-icon"></div>\n				</div>\n				<div class="dropdown_listContainer">\n					',
        e = c.generate || a && a.generate,
        f = {
            hash: {
                "class": "dropdown-list",
                element: "div"
            },
            inverse: s.noop,
            fn: s.program(2, g, b),
            data: b
        },
        d = e ? e.call(a, a && a.OFFICIAL_TUTS, f) : t.call(a, "generate", a && a.OFFICIAL_TUTS, f),
        (d || 0 === d) && (h += d),
        h += "\n				</div>\n			</div>\n		"
    }
    function g(a, b) {
        var d, e, f = "";
        return f += '\n						<a class="dropdown_item" href="',
        (e = c.LINK) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.LINK,
        d = typeof e === q ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += r(d) + '">',
        (e = c.TITLE) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.TITLE,
        d = typeof e === q ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += r(d) + "</a>\n					"
    }
    function h(a, b) {
        var d, e, f, h = "";
        return h += '\n			<div class="dropdown closed">\n				<div class="dropdown_title">\n					<h6 class="dropdown_title-text">' + r((d = a && a.GETTING_STARTED,
        d = null == d || d === !1 ? d : d.COMMUNITY_TUTORIALS,
        typeof d === q ? d.apply(a) : d)) + '</h6>\n					<div class="dropdown-icon"></div>\n				</div>\n				<div class="dropdown_listContainer">\n					',
        e = c.generate || a && a.generate,
        f = {
            hash: {
                "class": "dropdown-list",
                element: "div"
            },
            inverse: s.noop,
            fn: s.program(2, g, b),
            data: b
        },
        d = e ? e.call(a, a && a.COMMUNITY_TUTS, f) : t.call(a, "generate", a && a.COMMUNITY_TUTS, f),
        (d || 0 === d) && (h += d),
        h += "\n				</div>\n			</div>\n		"
    }
    function i(a, b) {
        var d, e, f, g = "";
        return g += "\n		",
        e = c.generate || a && a.generate,
        f = {
            hash: {
                "class": "tutorial_section",
                element: "div"
            },
            inverse: s.noop,
            fn: s.program(7, j, b),
            data: b
        },
        d = e ? e.call(a, a && a.SECTIONS, f) : t.call(a, "generate", a && a.SECTIONS, f),
        (d || 0 === d) && (g += d),
        g += " <!-- /sections -->\n	"
    }
    function j(a, b) {
        var d, e, f = "";
        return f += "\n			<p>",
        (e = c.TEXT) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.TEXT,
        d = typeof e === q ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        (d || 0 === d) && (f += d),
        f += "</p>\n			",
        d = c["if"].call(a, a && a.CODE, {
            hash: {},
            inverse: s.noop,
            fn: s.program(8, k, b),
            data: b
        }),
        (d || 0 === d) && (f += d),
        f += "\n		"
    }
    function k(a, b) {
        var d, e, f = "";
        return f += '\n				<div class="codeBox">\n<pre class="language-',
        (e = c.LANGUAGE) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.LANGUAGE,
        d = typeof e === q ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += r(d) + '"><code>',
        (e = c.CODE) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.CODE,
        d = typeof e === q ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += r(d) + "</code></pre>\n				</div>\n			"
    }
    function l(a, b) {
        var d, e, f = "";
        return f += '\n		<div class="iframe_container">\n			<iframe class="tutorial_iframe" src="',
        (e = c.TUT) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.TUT,
        d = typeof e === q ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += r(d) + '" frameborder="0" scrolling="no"></iframe>\n		</div> <!-- /iframe -->\n	'
    }
    function m(a, b) {
        var d, e, f = "";
        return f += '\n		<div class="complete_code">\n			<div class="link-default show-code">Show Code</div>\n			<div class="codeBox closed">\n<pre class="language-markup"><code>',
        (e = c.FULL_CODE) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.FULL_CODE,
        d = typeof e === q ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += r(d) + "</code></pre>\n			</div>\n		</div> <!-- /full code -->\n	"
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var n, o, p = "", q = "function", r = this.escapeExpression, s = this, t = c.helperMissing;
    return p += '<div id="',
    (o = c.ID) ? n = o.call(b, {
        hash: {},
        data: e
    }) : (o = b && b.ID,
    n = typeof o === q ? o.call(b, {
        hash: {},
        data: e
    }) : o),
    p += r(n) + '" class="tutorial">\n	<div class="tutorial_header">\n		<a href="',
    (o = c.ROUTE) ? n = o.call(b, {
        hash: {},
        data: e
    }) : (o = b && b.ROUTE,
    n = typeof o === q ? o.call(b, {
        hash: {},
        data: e
    }) : o),
    p += r(n) + '" class="link-image tutorial_title img"></a>\n		<div class="tutorial_buttons">\n			<a href="',
    (o = c.DOCS_LINK) ? n = o.call(b, {
        hash: {},
        data: e
    }) : (o = b && b.DOCS_LINK,
    n = typeof o === q ? o.call(b, {
        hash: {},
        data: e
    }) : o),
    p += r(n) + '" class="link-default">',
    (o = c.PAGE_DOCS) ? n = o.call(b, {
        hash: {},
        data: e
    }) : (o = b && b.PAGE_DOCS,
    n = typeof o === q ? o.call(b, {
        hash: {},
        data: e
    }) : o),
    p += r(n) + '</a>\n			<a href="',
    (o = c.ROUTE) ? n = o.call(b, {
        hash: {},
        data: e
    }) : (o = b && b.ROUTE,
    n = typeof o === q ? o.call(b, {
        hash: {},
        data: e
    }) : o),
    p += r(n) + '" class="link-default">' + r((n = b && b.GETTING_STARTED,
    n = null == n || n === !1 ? n : n.VIEW_LIBRARY,
    typeof n === q ? n.apply(b) : n)) + '</a>\n		</div>\n	</div> <!-- /header -->\n\n	<div class="dropdowns">\n		',
    n = c["if"].call(b, b && b.OFFICIAL_TUTS, {
        hash: {},
        inverse: s.noop,
        fn: s.program(1, f, e),
        data: e
    }),
    (n || 0 === n) && (p += n),
    p += "\n\n		",
    n = c["if"].call(b, b && b.COMMUNITY_TUTS, {
        hash: {},
        inverse: s.noop,
        fn: s.program(4, h, e),
        data: e
    }),
    (n || 0 === n) && (p += n),
    p += "\n	</div> <!-- /dropdowns -->\n\n	",
    n = c["if"].call(b, b && b.SECTIONS, {
        hash: {},
        inverse: s.noop,
        fn: s.program(6, i, e),
        data: e
    }),
    (n || 0 === n) && (p += n),
    p += "\n\n	",
    n = c["if"].call(b, b && b.TUT, {
        hash: {},
        inverse: s.noop,
        fn: s.program(10, l, e),
        data: e
    }),
    (n || 0 === n) && (p += n),
    p += "\n\n	",
    n = c["if"].call(b, b && b.FULL_CODE, {
        hash: {},
        inverse: s.noop,
        fn: s.program(12, m, e),
        data: e
    }),
    (n || 0 === n) && (p += n),
    p += "\n\n</div> <!-- /tutorial -->\n"
}),
this.cjs.templates.updates = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        return " "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var g, h, i, j = "", k = "function", l = this.escapeExpression, m = this, n = c.helperMissing;
    return j += '<div class="updates_container">\n	<h2>',
    (h = c.RECENT_UPDATES) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.RECENT_UPDATES,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + "</h2>\n	",
    h = c.updates || b && b.updates,
    i = {
        hash: {
            "class": "update_container",
            element: "div"
        },
        inverse: m.noop,
        fn: m.program(1, f, e),
        data: e
    },
    g = h ? h.call(b, b && b.UPDATES, i) : n.call(b, "updates", b && b.UPDATES, i),
    (g || 0 === g) && (j += g),
    j += "\n</div>\n"
}),
this.cjs.templates.demos = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<div id="demos" class="page-default">\n\n	<div id="menu">\n		<div class="menu_container closed">\n			<ul class="libraries">\n				<li id="lib_easeljs" class="list img"></li>\n				<li id="lib_tweenjs" class="list img"></li>\n				<li id="lib_soundjs" class="list img"></li>\n				<li id="lib_preloadjs" class="list img"></li>\n			</ul>\n			<div class="list_container">\n				<!-- populated by JS, template found in templates/demos/demo-list.template.html -->\n			</div>\n			<div class="demoList_arrows">\n				<div class="demoList_arrow previous img"></div>\n				<div class="demoList_arrow next img"></div>\n			</div>\n		</div>\n		<div id="info">\n			<div class="info_container">\n				<!-- all set by JS in DemosView -->\n				<h3 class="active_library"></h3>\n				<p class="demo_data">\n					<span class="active_demo"></span>\n					<span class="active_index"></span>/<span class="active_total"></span>\n				</p>\n				<p id="menu_text" class="more_demos">',
    (g = c.MORE_DEMOS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.MORE_DEMOS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n				<div class="dropdown-icon"></div>\n			</div> <!-- /info -->\n		</div>\n	</div> <!-- /menu -->\n\n	<div id="demo">\n		<div class="stage_container">\n			<div class="demo_arrow previous"></div>\n			<div class="iframe_container">\n				<iframe src="about:blank" id="stage" frameborder="0" scrolling="no"></iframe>\n			</div>\n			<div class="demo_arrow next"></div>\n		</div>\n	</div> <!-- /demo -->\n\n	<div id="code" class="closed">\n		<div class="toggle">\n			<span id="cm_text">',
    (g = c.LIVE_EDIT) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.LIVE_EDIT,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</span>\n			<div class="dropdown-icon"></div>\n		</div>\n		<hr>\n		<div class="codemirror_container">\n			<div class="controls">\n				<div class="link-default link-run img run">',
    (g = c.RUN) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.RUN,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</div>\n				<div class="link-default link-reset img reset">',
    (g = c.RESET) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.RESET,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</div>\n				<div class="link-default link-github img download">',
    (g = c.GITHUB_STR) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.GITHUB_STR,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</div>\n			</div>\n\n			<textarea class="code_element"></textarea>\n		</div>\n	</div> <!-- /code -->\n\n</div> <!-- /demos -->\n'
}),
this.cjs.templates.docs = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<div id="docs" class="page-default">\n\n	<div id="banner" class="banner_bg-createjs">\n		<div class="bgImage img"></div>\n		<section class="banner-small_container">\n			<h1>',
    (g = c.PAGE_DOCS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOCS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h1>\n			<p class="banner_text">',
    (g = c.META_DESCRIPTION) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.META_DESCRIPTION,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n		</section> <!-- /container -->\n	</div> <!-- /banner -->\n\n	<section id="suite" class="suite_container">\n        <h2>',
    (g = c.TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h2>\n		<div class="suite_item item_easeljs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.EASELJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.DOCS,
    f = null == f || f === !1 ? f : f.EASELJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.PAGE_DOCS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOCS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /easeljs -->\n\n		<div class="suite_item item_tweenjs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.TWEENJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.DOCS,
    f = null == f || f === !1 ? f : f.TWEENJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.PAGE_DOCS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOCS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /tweenjs -->\n\n		<div class="suite_item item_soundjs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.SOUNDJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.DOCS,
    f = null == f || f === !1 ? f : f.SOUNDJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.PAGE_DOCS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOCS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /soundjs -->\n\n		<div class="suite_item item_preloadjs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.PRELOADJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.DOCS,
    f = null == f || f === !1 ? f : f.PRELOADJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.PAGE_DOCS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOCS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /preloadjs -->\n        <p class="font-default">',
    (g = c.OFFLINE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.OFFLINE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</p>\n	</section>\n\n    <div id="browser_support">\n        <section class="browser_support_container">\n            <h2>' + j((f = b && b.HOME,
    f = null == f || f === !1 ? f : f.BROWSER_TITLE,
    typeof f === i ? f.apply(b) : f)) + '</h2>\n            <p class="font-default">' + j((f = b && b.HOME,
    f = null == f || f === !1 ? f : f.BROWSER_MESSAGE,
    typeof f === i ? f.apply(b) : f)) + '</p>\n\n            <div class="browser_support-logos">\n                <div class="browser-image img">\n                    <a href="http://dev.microsoftedge.com/" class="link-image img-microsoft_edge"></a>\n                    <p>Microsoft Edge</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-internet_explorer"></div>\n                    <p>Internet Explorer 9+</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-firefox"></div>\n                    <p>Firefox</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-chrome"></div>\n                    <p>Chrome</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-safari"></div>\n                    <p>Safari</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-opera"></div>\n                    <p>Opera</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-cordova png"></div>\n                    <p>Cordova</p>\n                </div>\n            </div>\n\n            <div class="notes_container">\n                <h6 class="notes_heading">',
    (g = c.NOTES_TITLE_1) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.NOTES_TITLE_1,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h6>\n                <ul>\n                    <li class="notes_list_item">',
    (g = c.NOTES_MESSAGE_1) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.NOTES_MESSAGE_1,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</li>\n                </ul>\n                <h6 class="notes_heading">',
    (g = c.NOTES_TITLE_2) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.NOTES_TITLE_2,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h6>\n                <ul>\n                    <li class="notes_list_item">',
    (g = c.NOTES_MESSAGE_2) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.NOTES_MESSAGE_2,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</li>\n                    <li class="notes_list_item">',
    (g = c.NOTES_MESSAGE_3) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.NOTES_MESSAGE_3,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</li>\n                    <li class="notes_list_item">',
    (g = c.NOTES_MESSAGE_4) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.NOTES_MESSAGE_4,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</li>\n                    <li class="notes_list_item">',
    (g = c.NOTES_MESSAGE_5) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.NOTES_MESSAGE_5,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</li>\n                </ul>\n            </div>\n\n            <p class="font-default">',
    (g = c.NOTES_MESSAGE_SUMMARY) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.NOTES_MESSAGE_SUMMARY,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</p>\n        </section>\n    </div>\n\n    <footer id="footer" class="banner_bg-createjs footer-shortPage">\n        <template id="backToTop_template"></template>\n        <div class="bgImage img"></div>\n        <section class="footer_container-small">\n            <a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.HOME,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image footer_logo img"></a>\n            <template id="sponsors_template"></template>\n        </section>\n    </footer> <!-- /footer -->\n\n</div> <!-- /docs -->\n'
}),
this.cjs.templates.downloads = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<div id="downloads" class="page-default">\n\n	<template id="dialog_template"></template>\n\n	<div id="banner" class="banner_bg-createjs">\n		<div class="bgImage img"></div>\n		<section class="banner_container">\n			<div class="downloads_banner_logo img"></div>\n			<h1 class="font-large downloads-title">',
    (g = c.PAGE_DOWNLOADS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOWNLOADS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h1>\n			<a href="' + j((f = b && b.CDN,
    f = null == f || f === !1 ? f : f.BASE,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.CDN_STR) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.CDN_STR,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n			<div class="link-default copy-to-clipboard" data-download-link="' + j((f = b && b.CDN,
    f = null == f || f === !1 ? f : f.CREATEJS,
    typeof f === i ? f.apply(b) : f)) + '" data-target="CreateJS">\n				',
    (g = c.COPY_CDN_URL) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COPY_CDN_URL,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '\n				<div class="copyAlert">',
    (g = c.COPIED_TO_CLIPBOARD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COPIED_TO_CLIPBOARD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</div>\n			</div>\n			<a href="' + j((f = b && b.GITHUB,
    f = null == f || f === !1 ? f : f.CREATEJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default link-github img">',
    (g = c.GITHUB_STR) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.GITHUB_STR,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n\n			<div class="cdn-notice">\n				<strong>Update, September 2017</strong>\n				<p>\n					Version 1.0.0 has been released, however the CreateJS CDN has not yet been updated. In the mean\n					time, you can download individual library builds from <a href="https://github.com/CreateJS/">GitHub</a>\n					(in the lib folder of each library), or a combined version of all libraries from the <a href="https://github.com/CreateJS/Combined/tree/master/builds/1.0.0">Combined\n					Repository</a>. You can also use the <a href="https://www.jsdelivr.com/package/npm/createjs">jsDelivr</a>\n					CDN.\n				</p>\n			</div>\n\n		</section> <!-- /container -->\n\n\n\n	</div> <!-- /banner -->\n\n	<section id="suite" class="suite_container">\n		<div class="suite_item item_easeljs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.EASELJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<div class="link-default copy-to-clipboard" data-download-link="' + j((f = b && b.CDN,
    f = null == f || f === !1 ? f : f.EASELJS,
    typeof f === i ? f.apply(b) : f)) + '" data-target="EaselJS">\n				',
    (g = c.COPY_CDN_URL) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COPY_CDN_URL,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '\n				<div class="copyAlert">',
    (g = c.COPIED_TO_CLIPBOARD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COPIED_TO_CLIPBOARD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</div>\n			</div>\n			<a href="' + j((f = b && b.GITHUB,
    f = null == f || f === !1 ? f : f.EASELJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default link-download" data-target="EaselJS">',
    (g = c.PAGE_DOWNLOAD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOWNLOAD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /easeljs -->\n\n		<div class="suite_item item_tweenjs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.TWEENJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<div class="link-default copy-to-clipboard" data-download-link="' + j((f = b && b.CDN,
    f = null == f || f === !1 ? f : f.TWEENJS,
    typeof f === i ? f.apply(b) : f)) + '" data-target="TweenJS">\n				',
    (g = c.COPY_CDN_URL) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COPY_CDN_URL,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '\n				<div class="copyAlert">',
    (g = c.COPIED_TO_CLIPBOARD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COPIED_TO_CLIPBOARD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</div>\n			</div>\n			<a href="' + j((f = b && b.GITHUB,
    f = null == f || f === !1 ? f : f.TWEENJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default link-download" data-target="TweenJS">',
    (g = c.PAGE_DOWNLOAD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOWNLOAD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /tweenjs -->\n\n		<div class="suite_item item_soundjs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.SOUNDJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<div class="link-default copy-to-clipboard" data-download-link="' + j((f = b && b.CDN,
    f = null == f || f === !1 ? f : f.SOUNDJS,
    typeof f === i ? f.apply(b) : f)) + '" data-target="SoundJS">\n				',
    (g = c.COPY_CDN_URL) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COPY_CDN_URL,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '\n				<div class="copyAlert">',
    (g = c.COPIED_TO_CLIPBOARD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COPIED_TO_CLIPBOARD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</div>\n			</div>\n			<a href="' + j((f = b && b.GITHUB,
    f = null == f || f === !1 ? f : f.SOUNDJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default link-download" data-target="SoundJS">',
    (g = c.PAGE_DOWNLOAD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOWNLOAD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /soundjs -->\n\n		<div class="suite_item item_preloadjs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.PRELOADJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<div class="link-default copy-to-clipboard" data-download-link="' + j((f = b && b.CDN,
    f = null == f || f === !1 ? f : f.PRELOADJS,
    typeof f === i ? f.apply(b) : f)) + '" data-target="PreloadJS">\n				',
    (g = c.COPY_CDN_URL) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COPY_CDN_URL,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '\n				<div class="copyAlert">',
    (g = c.COPIED_TO_CLIPBOARD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COPIED_TO_CLIPBOARD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</div>\n			</div>\n			<a href="' + j((f = b && b.GITHUB,
    f = null == f || f === !1 ? f : f.PRELOADJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default link-download" data-target="PreloadJS">',
    (g = c.PAGE_DOWNLOAD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOWNLOAD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /preloadjs -->\n	</section>\n\n	<section id="misc" class="misc_container">\n		<div class="suite_item misc-item-zoe">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.ZOE,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<h2>',
    (g = c.PAGE_ZOE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_ZOE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h2>\n			<a href="',
    (g = c.DL_ZOE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DL_ZOE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="link-default link-download" data-target="Zoe">',
    (g = c.PAGE_DOWNLOAD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOWNLOAD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /zoe -->\n\n		<div class="suite_item">\n			<div class="link-image-short img"></div>\n			<div class="link-image-short img"></div>\n			<h2 class="misc_title">',
    (g = c.SITE_BADGE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.SITE_BADGE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h2>\n			<a href="',
    (g = c.DL_MADE_WITH) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DL_MADE_WITH,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="link-default link-download" data-target="Site Badge">',
    (g = c.PAGE_DOWNLOAD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOWNLOAD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div>\n	</section>\n\n	<footer id="footer" class="banner_bg-createjs">\n		<template id="backToTop_template"></template>\n		<div class="bgImage img"></div>\n		<section class="footer_container-small">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.HOME,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image footer_logo img"></a>\n		</section>\n	</footer> <!-- /footer -->\n\n</div> <!-- /downloads -->\n'
}),
this.cjs.templates.error = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<div id="error" class="page-default">\n	<section class="error_container">\n\n		<h1 class="font-extra">',
    (g = c.TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "</h1>\n		<h2>",
    (g = c.SUBTITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.SUBTITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h2>\n		<div class="buttons">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.HOME,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default-invert">Home</a>\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.DEMOS,
    f = null == f || f === !1 ? f : f.BASE,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default-invert">Demos</a>\n		</div>\n\n	</section> <!-- /container -->\n</div> <!-- /error -->\n'
}),
this.cjs.templates["getting-started"] = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<div id="getting-started" class="page-default">\n\n	<div id="banner" class="banner_bg-createjs">\n		<div class="bgImage img"></div>\n		<section class="banner-small_container">\n			<h1>',
    (g = c.BANNER_TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BANNER_TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h1>\n			<p class="banner_text">',
    (g = c.BANNER_DESCRIPTION) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BANNER_DESCRIPTION,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n		</section> <!-- /container -->\n	</div> <!-- /banner -->\n\n	<div id="content">\n		<div class="content_container">\n			<div id="sidebar">\n				<div class="sidebar_container">\n					<div class="sidebar_easeljs img"></div>\n					<div class="sidebar_tweenjs img"></div>\n					<div class="sidebar_soundjs img"></div>\n					<div class="sidebar_preloadjs img"></div>\n					<div class="sidebar_zoe img"></div>\n				</div>\n			</div>\n			<!--\n				content appended here from the GettingStartedView class.\n				templates can be found in templates/tutorials/\n			-->\n		</div>\n	</div> <!-- content -->\n\n	<footer id="footer" class="banner_bg-createjs">\n		<template id="backToTop_template"></template>\n		<div class="bgImage img"></div>\n		<section class="footer_container-small">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.HOME,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image footer_logo img"></a>\n		</section>\n	</footer> <!-- /footer -->\n\n</div> <!-- /getting-started -->\n'
}),
this.cjs.templates.home = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<div id="home" class="page-default">\n\n\n\n	<div id="banner" class="banner_bg-createjs">\n		<canvas id="stage" class="canvas_bg-createjs" width="0" height="0"></canvas>\n		<section class="banner_container">\n			<div class="home_banner_logo img"></div>\n			<div>\n				<p class="banner_text">',
    (g = c.VALUE_PROPOSITION) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.VALUE_PROPOSITION,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.DOWNLOADS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.PAGE_DOWNLOAD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOWNLOAD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.DEMOS,
    f = null == f || f === !1 ? f : f.BASE,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.PAGE_DEMOS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DEMOS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.GETTING_STARTED,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.PAGE_GETTING_STARTED) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_GETTING_STARTED,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n			</div> <!-- /text -->\n			<a id="banner_gskinner_link" class="link-inline" href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.EXTERNAL,
    f = null == f || f === !1 ? f : f.GSKINNER,
    typeof f === i ? f.apply(b) : f)) + '">',
    (g = c.CREATED_BY_GSKINNER) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.CREATED_BY_GSKINNER,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</a>\n		</section> <!-- /container -->\n	</div> <!-- /banner -->\n\n\n\n	<section id="suite" class="suite_container">\n		<div class="suite_item item_easeljs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.EASELJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<p class="item_description">',
    (g = c.DESCRIPTION_EASELJS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DESCRIPTION_EASELJS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.EASELJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.LEARN_MORE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.LEARN_MORE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /feature/easeljs -->\n\n		<div class="suite_item item_tweenjs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.TWEENJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<p class="item_description">',
    (g = c.DESCRIPTION_TWEENJS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DESCRIPTION_TWEENJS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.TWEENJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.LEARN_MORE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.LEARN_MORE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /feature/tweenjs -->\n\n		<div class="suite_item item_soundjs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.SOUNDJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<p class="item_description">',
    (g = c.DESCRIPTION_SOUNDJS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DESCRIPTION_SOUNDJS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.SOUNDJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.LEARN_MORE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.LEARN_MORE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /feature/soundjs -->\n\n		<div class="suite_item item_preloadjs">\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.PRELOADJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img"></a>\n			<p class="item_description">',
    (g = c.DESCRIPTION_PRELOADJS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DESCRIPTION_PRELOADJS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.PRELOADJS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.LEARN_MORE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.LEARN_MORE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</div> <!-- /feature/preloadjs -->\n	</section> <!-- /suite -->\n\n\n\n	<div id="instructions">\n		<section class="instructions_container">\n			<h2>',
    (g = c.INSTRUCTIONS_TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.INSTRUCTIONS_TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h2>\n			<div class="codeBox">\n				<pre class="language-markup"><code>&lt;script src="https://code.createjs.com/createjs-2015.11.26.min.js"&gt;&lt;/script&gt;</code></pre>\n			</div> <!-- /codeBox -->\n\n			<p class="font-default">',
    (g = c.INSTRUCTIONS_CTA) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.INSTRUCTIONS_CTA,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</p>\n		</section>\n	</div> <!-- /instructions -->\n\n\n	<div id="browser_support">\n		<section class="browser_support_container">\n			<h2>',
    (g = c.BROWSER_TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BROWSER_TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h2>\n			<p class="font-default">',
    (g = c.BROWSER_MESSAGE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BROWSER_MESSAGE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n			<div class="browser_support-logos">\n                <div class="browser-image img">\n                    <a href="http://dev.microsoftedge.com/" class="link-image img-microsoft_edge"></a>\n                    <p>Microsoft Edge</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-internet_explorer"></div>\n                    <p>Internet Explorer 9+</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-firefox"></div>\n                    <p>Firefox</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-chrome"></div>\n                    <p>Chrome</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-safari"></div>\n                    <p>Safari</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-opera"></div>\n                    <p>Opera</p>\n                </div>\n                <div class="browser-image img">\n                    <div class="link-image img-cordova png"></div>\n                    <p>Cordova</p>\n                </div>\n            </div>\n			<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.DOCS,
    f = null == f || f === !1 ? f : f.BASE,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.MORE_INFO) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.MORE_INFO,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</section>\n	</div>\n\n\n\n	<div id="workflow_wrapper">\n		<section id="workflow" class="workflow_container">\n			<h2>',
    (g = c.WORKFLOW_TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.WORKFLOW_TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h2>\n			<div class="workflow_descriptions">\n				<a href="http://helpx.adobe.com/animate/using/creating-publishing-html5-canvas-document.html" class="link-image img-animate img"></a>\n				<p>',
    (g = c.WORKFLOW_ANIMATE_DESCRIPTION) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.WORKFLOW_ANIMATE_DESCRIPTION,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</p>\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.ZOE,
    typeof f === i ? f.apply(b) : f)) + '" class="link-image img-zoe img"></a>\n				<p>',
    (g = c.WORKFLOW_ZOE_DESCRIPTION) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.WORKFLOW_ZOE_DESCRIPTION,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</p>\n			</div>\n			<p class="font-default">',
    (g = c.WORKFLOW_CTA) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.WORKFLOW_CTA,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</p>\n		</section> <!-- /container -->\n	</div>\n\n\n\n	<div id="whitepaper">\n		<section class="whitepaper_container">\n			<a href="',
    (g = c.ADS_LINK_LOCATION) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.ADS_LINK_LOCATION,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="link-image banner-ads-icon img"></a>\n			<h2>',
    (g = c.ADS_TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.ADS_TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "</h2>\n			<p>",
    (g = c.ADS_MESSAGE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.ADS_MESSAGE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</p>\n			<a href="',
    (g = c.ADS_LINK_LOCATION) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.ADS_LINK_LOCATION,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="link-default">',
    (g = c.ADS_LINK_TEXT) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.ADS_LINK_TEXT,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</section>\n	</div>\n\n\n\n	<div id="updates">\n		<section>\n			<template id="updates_template">\n				<!-- template found in templates/modules/updates.template.html -->\n			</template>\n\n			<div class="twitter_container">\n				<h2>',
    (g = c.TWITTER_TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.TWITTER_TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h2>\n				<a\n					class="twitter-timeline"\n					data-tweet-limit="3"\n					data-theme="light"\n					href="https://twitter.com/CreateJS?ref_src=twsrc%5Etfw">\n				</a>\n			</div> <!-- /twitter -->\n		</section>\n	</div> <!-- /updates -->\n\n\n\n	<div id="community">\n		<section class="community_container">\n			<h3>',
    (g = c.COMMUNITY_TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COMMUNITY_TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h3>\n			<div class="fourButtons">\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.EXTERNAL,
    f = null == f || f === !1 ? f : f.REDDIT,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default-invert link-reddit img">',
    (g = c.COMMUNITY_REDDIT) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COMMUNITY_REDDIT,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.EXTERNAL,
    f = null == f || f === !1 ? f : f.GPLUS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default-invert link-googleplus img">',
    (g = c.COMMUNITY_GPLUS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COMMUNITY_GPLUS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.EXTERNAL,
    f = null == f || f === !1 ? f : f.GITHUB,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default-invert link-github img">',
    (g = c.COMMUNITY_GITHUB) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COMMUNITY_GITHUB,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.EXTERNAL,
    f = null == f || f === !1 ? f : f.STACK_OVERFLOW,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default-invert link-stackoverflow img">',
    (g = c.COMMUNITY_STACK_OVERFLOW) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COMMUNITY_STACK_OVERFLOW,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n			</div>\n		</section> <!-- /container -->\n	</div> <!-- /community -->\n\n\n	<div id="projects">\n		<template id="project_template">\n			<!-- template found in templates/modules/projects.template.html -->\n		</template>\n	</div> <!-- /projects -->\n\n\n\n	<footer id="footer" class="banner_bg-createjs footer-large">\n		<div class="bgImage img"></div>\n		<template id="backToTop_template"></template>\n		<section>\n			<div class="home_footer_logo img"></div>\n			<div>\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.DOWNLOADS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.PAGE_DOWNLOAD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOWNLOAD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.DEMOS,
    f = null == f || f === !1 ? f : f.BASE,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.PAGE_DEMOS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DEMOS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.GETTING_STARTED,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.PAGE_GETTING_STARTED) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_GETTING_STARTED,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n			</div>\n			<template id="sponsors_template"></template>\n		</section> <!-- /container -->\n	</footer> <!-- /footer -->\n\n\n\n</div> <!-- /home -->\n'
}),
this.cjs.templates.library = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<div id="library" class="page-default">\n\n\n\n	<div id="banner" class="',
    (g = c.BANNER_CLASS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BANNER_CLASS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n		<canvas id="stage" class="',
    (g = c.CANVAS_CLASS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.CANVAS_CLASS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" width="0" height="0"></canvas>\n\n		<section class="banner_container library_banner_container">\n			<div class="library_banner_logo img"></div>\n			<div class="buttons">\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.DOWNLOADS,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default">',
    (g = c.PAGE_DOWNLOAD) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOWNLOAD,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="',
    (g = c.DOCS_LINK) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DOCS_LINK,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="link-default">',
    (g = c.PAGE_DOCS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_DOCS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="',
    (g = c.GETTING_STARTED_LINK) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.GETTING_STARTED_LINK,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="link-default">',
    (g = c.PAGE_GETTING_STARTED) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.PAGE_GETTING_STARTED,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n			</div>\n			<a id="banner_gskinner_link" class="link-inline" href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.EXTERNAL,
    f = null == f || f === !1 ? f : f.GSKINNER,
    typeof f === i ? f.apply(b) : f)) + '">',
    (g = c.CREATED_BY_GSKINNER) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.CREATED_BY_GSKINNER,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</a>\n		</section> <!-- /container -->\n\n		<template id="notification"></template>\n	</div> <!-- /banner -->\n\n\n\n	<section class="valueProposition">\n		<p class="font-default">',
    (g = c.VALUE_PROPOSITION) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.VALUE_PROPOSITION,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n	</section>\n\n\n\n	<div class="library_demo">\n		<section class="library_demo_container">\n			<p class="library_demo_mobile_notice">',
    (g = c.DEMO_MOBILE_NOTICE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DEMO_MOBILE_NOTICE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n			<div class="library_demo_iframe_container">\n				<iframe class="library_demo_iframe" src="',
    (g = c.DEMO_SOURCE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DEMO_SOURCE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" frameborder="0" scrolling="no"></iframe>\n			</div>\n			<p class="font-default">',
    (g = c.DEMO_CTA) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DEMO_CTA,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</p>\n		</section>\n	</div>\n\n\n\n	<section class="details_info ',
    (g = c.DETAILS_CLASS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DETAILS_CLASS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n		<p class="description">',
    (g = c.DESCRIPTION) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.DESCRIPTION,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</p>\n		<ul class="feature_bullets">\n			<li class="feature_bullets-item">',
    (g = c.BULLET_1) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BULLET_1,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</li>\n			<li class="feature_bullets-item">',
    (g = c.BULLET_2) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BULLET_2,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</li>\n			<li class="feature_bullets-item">',
    (g = c.BULLET_3) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BULLET_3,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</li>\n			<li class="feature_bullets-item">',
    (g = c.BULLET_4) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BULLET_4,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</li>\n			<li class="feature_bullets-item">',
    (g = c.BULLET_5) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BULLET_5,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</li>\n		</ul>\n	</section>\n\n\n\n	<div id="updates">\n		<section>\n			<template id="updates_template">\n				<!-- template found in templates/modules/updates.template.html -->\n			</template>\n\n			<div class="github_container">\n				<h2>',
    (g = c.GITHUB_TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.GITHUB_TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</h2>\n				<div class="commit_container">\n					<!-- commits populate by JS -->\n				</div>\n			</div>\n		</section>\n	</div> <!-- /updates -->\n\n\n\n	<div id="whitepaper">\n		<section class="whitepaper_container">\n			<a href="',
    (g = c.ADS_LINK_LOCATION) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.ADS_LINK_LOCATION,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="link-image banner-ads-icon img"></a>\n			<h2>',
    (g = c.ADS_TITLE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.ADS_TITLE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "</h2>\n			<p>",
    (g = c.ADS_MESSAGE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.ADS_MESSAGE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</p>\n			<a href="',
    (g = c.ADS_LINK_LOCATION) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.ADS_LINK_LOCATION,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="link-default">',
    (g = c.ADS_LINK_TEXT) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.ADS_LINK_TEXT,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n		</section>\n	</div>\n\n\n\n	<div id="projects">\n		<template id="project_template">\n			<!-- template found in templates/modules/projects.template.html -->\n		</template>\n	</div> <!-- /projects -->\n\n\n\n	<footer id="footer" class="',
    (g = c.BANNER_CLASS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.BANNER_CLASS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n		<div class="bgImage img"></div>\n\n		<template id="backToTop_template"></template>\n\n		<section class="footer_container-small">\n			<h3>',
    (g = c.MORE) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.MORE,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + " ",
    (g = c.NAME) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.NAME,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</h3>\n			<div class="fourButtons">\n				<a href="' + j((f = b && b.ROUTE,
    f = null == f || f === !1 ? f : f.EXTERNAL,
    f = null == f || f === !1 ? f : f.REDDIT,
    typeof f === i ? f.apply(b) : f)) + '" class="link-default link-reddit img">',
    (g = c.COMMUNITY_REDDIT) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COMMUNITY_REDDIT,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="',
    (g = c.GPLUS_LINK) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.GPLUS_LINK,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="link-default link-googleplus img">',
    (g = c.COMMUNITY_GPLUS) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COMMUNITY_GPLUS,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="',
    (g = c.GITHUB_LINK) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.GITHUB_LINK,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="link-default link-github img">',
    (g = c.COMMUNITY_GITHUB) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COMMUNITY_GITHUB,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n				<a href="',
    (g = c.STACK_OVERFLOW_LINK) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.STACK_OVERFLOW_LINK,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="link-default link-stackoverflow img">',
    (g = c.COMMUNITY_STACK_OVERFLOW) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.COMMUNITY_STACK_OVERFLOW,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '</a>\n			</div>\n			<template id="sponsors_template"></template>\n		</section>\n	</footer> <!-- /footer -->\n\n\n\n</div> <!-- /library -->\n'
}),
this.cjs.templates.support = Handlebars.template(function(a, b, c, d, e) {
    return this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {},
    '<div id="support" class="page-default">\n	<h1>Support View</h1>\n</div>'
}),
this.cjs.templates.tools = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        return " "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var g, h, i, j = "", k = "function", l = this.escapeExpression, m = this, n = c.helperMissing;
    return j += '<div id="tools" class="page-default">\n\n	<div id="banner" class="banner_bg-createjs">\n		<div class="bgImage img"></div>\n		<section class="banner-small_container">\n			<h1>',
    (h = c.PAGE_TOOLS) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.PAGE_TOOLS,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '</h1>\n			<p class="banner_text">',
    (h = c.BANNER_DESCRIPTION) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.BANNER_DESCRIPTION,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '</p>\n		</section> <!-- /container -->\n	</div> <!-- /banner -->\n\n	<section id="list">\n		',
    h = c.tools || b && b.tools,
    i = {
        hash: {
            "class": "tool",
            element: "div"
        },
        inverse: m.noop,
        fn: m.program(1, f, e),
        data: e
    },
    g = h ? h.call(b, b && b.TOOL, i) : n.call(b, "tools", b && b.TOOL, i),
    (g || 0 === g) && (j += g),
    j += '\n	</section>\n\n	<footer id="footer" class="banner_bg-createjs footer-shortPage">\n        <template id="backToTop_template"></template>\n        <div class="bgImage img"></div>\n        <section class="footer_container-small">\n            <a href="' + l((g = b && b.ROUTE,
    g = null == g || g === !1 ? g : g.HOME,
    typeof g === k ? g.apply(b) : g)) + '" class="link-image footer_logo img"></a>\n	        <template id="sponsors_template"></template>\n        </section>\n    </footer> <!-- /footer -->\n\n</div>\n'
}),
function(a) {
    "use strict";
    function b() {
        this.init()
    }
    var c = b.prototype;
    c.parser = null,
    c.nav = window.navigator,
    c.init = function() {
        this.parser = new UAParser(this.nav.userAgent)
    }
    ,
    c.getDeviceInfo = function() {
        return {
            OS: this.getOS(),
            hasTouch: this.hasTouchSupport(),
            isMobile: this.isMobileDevice(),
            SVGSupported: this.detectSVGSupport()
        }
    }
    ,
    c.getOS = function() {
        return this.parser.getOS().name
    }
    ,
    c.hasTouchSupport = function() {
        return "ontouchstart"in window || "maxTouchPoints"in this.nav > 1 || "msMaxTouchPoints"in this.nav > 1
    }
    ,
    c.isMobileDevice = function() {
        return screen.height < 700 && screen.width < 500
    }
    ,
    c.detectSVGSupport = function() {
        return !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
    }
    ,
    a.deviceUtil = new b
}(window.cjs),
function(a) {
    "use strict";
    Handlebars.registerHelper("generate", function(a, b) {
        var c = b.hash["class"]
          , d = b.hash.element;
        return a.reduce(function(a, e) {
            return a + "<" + d + ' class="' + c + '">' + ("object" == typeof e ? b.fn(e) : e) + "</" + d + ">"
        }, "")
    }),
    Handlebars.registerHelper("tools", function(b, c) {
        var d = ""
          , e = c.hash.element
          , f = c.hash["class"]
          , g = a.strings.get("TOOLS", "CHECK_IT_OUT");
        for (var h in b)
            h = b[h],
            d += "<" + e + ' class="' + f + '"><h4 class="tool-title"><a class="link-inline" href="' + h.LINK + '">' + h.TITLE + "</a></h4>",
            h.ICON.length && (d += '<a class="link-image tool-image img" href="' + h.LINK + '" style="background-image:url(assets/images/required/' + h.ICON + ');"></a>'),
            d += '<p class="tool-description">' + h.DESCRIPTION + '</p><a href="' + h.LINK + '" class="link-default tools-link">' + g + "</a></" + e + ">";
        return d
    }),
    Handlebars.registerHelper("updates", function(a, b) {
        var c = b.hash.element
          , d = b.hash["class"]
          , e = Object.keys(a);
        return e.sort(g.sortHighToLow),
        e.reduce(function(b, e) {
            for (var f in a[e]) {
                b += "<" + c + ' class="' + d + '"><h5 class="update_subtitle">' + f + " " + e + '<ul class="update_list">';
                var g = a[e][f];
                if (Array.isArray(g))
                    for (var h = 0, i = g.length; i > h; h++)
                        b += '<li class="update">' + g[h] + "</li>";
                else
                    b += '<li class="update">' + g + "</li>";
                b += "</ul></" + c + ">"
            }
            return b
        }, "")
    }),
    Handlebars.registerHelper("projects", function(b) {
        var c = a.Projects
          , d = b.hash["class"]
          , e = b.hash.element
          , f = b.hash.filter;
        return c.filter(function(a) {
            return Boolean(~a.PRODUCTS.indexOf(f))
        }).reduce(function(a, c) {
            return "object" == typeof c.IMAGE && (c.IMAGE = c.IMAGE[f]),
            a + "<" + e + ' class="' + d + '">' + b.fn(c) + "</" + e + ">"
        }, "")
    }),
    Handlebars.registerHelper("demoList", function(a, b) {
        return a.reduce(function(a, c, d) {
            return a + '<li class="demo" data-id="' + d + '">' + b.fn(c) + "</li>"
        }, "")
    }),
    Handlebars.registerHelper("prefix", function(b, c) {
        return a.strings.get(b, c)
    }),
    Handlebars.registerHelper("if", function(a, b) {
        return 1 == a || a.length > 0 ? b.fn(this) : void 0
    })
}(window.cjs),
function(a) {
    function b(a, b) {
        this.init(a, b)
    }
    var c = b.prototype;
    c.scope = null,
    c.events = null,
    c.swipeSupport = null,
    c.clickSupport = null,
    c.preventScroll = !1,
    c.sensitivity = 75,
    c.activeElement = null,
    c.cancelClickTrigger = !1,
    c.cancelSwipeTrigger = !1,
    c.swipeInProgress = !1,
    c.detectScrollPrevention = !0,
    c.continuePreventingScroll = !1,
    c.listenTo = {
        up: 0,
        down: 0,
        left: 0,
        right: 0
    },
    c.swipeStart_clientX = null,
    c.swipeStart_clientY = null,
    c.swipeEnd_clientX = null,
    c.swipeEnd_clientY = null,
    c.timeStart = null,
    c.timeEnd = null,
    c.up = "up",
    c.down = "down",
    c.left = "left",
    c.right = "right",
    c.init = function(a, b) {
        "object" == typeof b && (this.swipeSupport = b.swipe,
        this.clickSupport = b.click,
        this.preventScroll = b.preventScroll);
        try {
            this.detectEventSupport(),
            this.scope = a || window.document.body,
            this.scope.addEventListener(this.events.start, this._handleTouchStart.bind(this)),
            this.scope.addEventListener(this.events.move, this._handleTouchMove.bind(this)),
            this.scope.addEventListener(this.events.end, this._handleTouchEnd.bind(this))
        } catch (c) {}
    }
    ,
    c.destroy = function() {
        this.scope.removeEventListener(this.events.start, this._handleTouchStart.bind(this)),
        this.scope.removeEventListener(this.events.move, this._handleTouchMove.bind(this)),
        this.scope.removeEventListener(this.events.end, this._handleTouchEnd.bind(this))
    }
    ,
    c.detectEventSupport = function() {
        if (!("ontouchstart"in window || "maxTouchPoints"in window.navigator > 1 || "msMaxTouchPoints"in window.navigator > 1))
            throw new Error("TouchEvent not supported.");
        this.events = {
            start: "touchstart",
            move: "touchmove",
            end: "touchend"
        }
    }
    ,
    c.addListener = function(a, b) {
        this.listenTo[a]++,
        this.scope.addEventListener(a, b)
    }
    ,
    c.removeListener = function(a, b) {
        this.listenTo[a] > 0 && this.listenTo[a]--,
        this.scope.removeEventListener(a, b)
    }
    ,
    c._directionHasListener = function(a) {
        return this.listenTo[a] > 0
    }
    ,
    c._calculateSwipe = function() {
        var a = this.timeEnd - this.timeStart
          , b = this.swipeStart_clientX - this.swipeEnd_clientX
          , c = this.swipeStart_clientY - this.swipeEnd_clientY
          , d = this._findSwipeDirection(b, c, a);
        d && this._triggerSwipe(d)
    }
    ,
    c._findSwipeDirection = function(a, b, c) {
        var d = Math.abs(a)
          , e = Math.abs(b);
        if (c -= this.sensitivity,
        d > e) {
            if (a >= c)
                return "left";
            if (d >= c)
                return "right"
        } else {
            if (b >= c)
                return "up";
            if (e >= c)
                return "down"
        }
        return !1
    }
    ,
    c._triggerClick = function(a) {
        var b = document.createEvent("MouseEvent");
        b.initMouseEvent("click", !0, !0, window, 1, a.screenX, a.screenY, a.clientX, a.clientY, !1, !1, !1, !1, 0, null),
        a.target.dispatchEvent(b)
    }
    ,
    c._triggerSwipe = function(a) {
        if (this.swipeInProgress && !this.cancelSwipeTrigger) {
            this.swipeInProgress = !1;
            var b = document.createEvent("Event");
            b.initEvent(a, !0, !0),
            this.activeElement.dispatchEvent(b)
        }
    }
    ,
    c._handleTouchStart = function(a) {
        if (this.activeElement = a.currentTarget,
        this.timeStart = (new Date).getTime(),
        this.clickSupport && (this.cancelClickTrigger = !1),
        this.swipeSupport) {
            this.cancelSwipeTrigger = !0;
            var b = !!a.touches;
            this.swipeStart_clientX = b ? a.touches[0].clientX : a.clientX,
            this.swipeStart_clientY = b ? a.touches[0].clientY : a.clientY
        }
    }
    ,
    c._handleTouchMove = function(a) {
        if (this.clickSupport && (this.cancelClickTrigger = !0),
        this.swipeSupport) {
            if (this.detectScrollPrevention) {
                var b = !!a.touches
                  , c = this.swipeStart_clientX - (b ? a.touches[0].clientX : a.clientX)
                  , d = this.swipeStart_clientY - (b ? a.touches[0].clientY : a.clientY)
                  , e = this._findSwipeDirection(c, d, 0, 0);
                this.continuePreventingScroll = this._directionHasListener(e),
                this.detectScrollPrevention = !1
            }
            this.preventScroll && this.continuePreventingScroll && a.preventDefault(),
            this.swipeInProgress = !0,
            this.cancelSwipeTrigger = !1
        }
    }
    ,
    c._handleTouchEnd = function(a) {
        if (this.timeEnd = (new Date).getTime(),
        this.clickSupport && !this.cancelClickTrigger && (a.preventDefault(),
        this._triggerClick(a)),
        this.swipeSupport) {
            var b = !!a.touches;
            this.swipeEnd_clientX = b ? a.changedTouches[0].clientX : a.clientX,
            this.swipeEnd_clientY = b ? a.changedTouches[0].clientY : a.clientY,
            this._calculateSwipe(),
            this.detectScrollPrevention = !0,
            this.continuePreventingScroll = !1
        }
    }
    ,
    a.TouchUtil = b
}(window),
function(a) {
    a.isInternalLink = function(b) {
        var c = "";
        if (b = dom.clean(b),
        "string" == typeof b) {
            if (!/^(https?|tel|mailto):/.test(b)) {
                var d, e = a.AppRouter.VIEWS;
                for (d in e)
                    if (e[d] === b)
                        return !0;
                return !1
            }
            c = b
        } else {
            if (!b.href)
                return !1;
            if (/^(localhost|10\.0\.1\.\d+):\d+/.test(b.href))
                return !0;
            c = b.href
        }
        var f = window.location
          , g = f.protocol + "//" + f.hostname;
        return ~c.indexOf(g) ? null === c.split(g)[1].match(/(tutorials|docs|assets|html5ads)/i) : !1
    }
}(window.cjs),
function(a) {
    Function.prototype.bind || (Function.prototype.bind = function(a) {
        if ("function" != typeof this)
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var b = Array.prototype.slice.call(arguments, 1)
          , c = this
          , d = function() {}
          , e = function() {
            return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)))
        };
        return d.prototype = this.prototype,
        e.prototype = new d,
        e
    }
    )
}(window.cjs),
function(a) {
    "use strict";
    var b = {};
    b.PAGE_TRANSITION = 200,
    b.COPY_ALERT = 3e3,
    b.SCROLL_DEBOUNCE = 100,
    b.GO_TO_ID = 350,
    a.Settings = {
        Timing: b
    }
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.initialize = function() {
        this.setTemplate(a.Templates.UIBLOCKER)
    }
    ,
    b.append = function() {
        $body.append(this.el)
    }
    ,
    b.remove = function() {
        this.$el.remove()
    }
    ,
    a.UIBlocker = g.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.initialize = function() {
        this.setTemplate(a.Templates.SPONSORS)
    }
    ,
    a.Sponsors = g.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.nav = null,
    b.open = !1,
    b.logo = null,
    b.github = null,
    b.twitter = null,
    b.items = null,
    b.UIBlocker = null,
    b.toggle = null,
    b.inHomeState = !0,
    b.initialize = function() {
        this.setTemplate(a.Templates.NAV),
        this.nav = this.$("#nav"),
        this.logo = this.$("#nav-createjs"),
        this.UIBlocker = new a.UIBlocker({
            el: document.createElement("template")
        }),
        this.UIBlocker.$el.addClass("nav-underlay"),
        this.UIBlocker.append(),
        this.github = this.$("#nav-github"),
        this.twitter = this.$("#nav-twitter"),
        this.items = this.$(".nav-item"),
        this.toggle = this.$("#navToggle"),
        this.itemProxy = g.proxy(this._handleItemClick, this),
        this.toggleProxy = g.proxy(this.toggleMobile, this),
        this.scrollProxy = g.proxy(this.preventScroll, this),
        this.addEventListeners()
    }
    ,
    b.addEventListeners = function() {
        this.UIBlocker.$el.on("click", this.toggleProxy),
        this.toggle.on("click", this.toggleProxy),
        this.items.on("click", this.itemProxy)
    }
    ,
    b.removeEventListeners = function() {
        this.UIBlocker.$el.off("click", this.toggleProxy),
        this.toggle.off("click", this.toggleProxy),
        this.items.off("click", this.itemProxy)
    }
    ,
    b.preventScroll = function(a) {
        a.preventDefault()
    }
    ,
    b.setNavStateHome = function() {
        this.inHomeState = !0,
        this.$el.removeClass("nav-default-state").addClass("nav-home-state"),
        this.logo.removeClass("logo-not-home").addClass("logo-home"),
        this.github.removeClass("github-not-home").addClass("github-home"),
        this.twitter.removeClass("twitter-not-home").addClass("twitter-home"),
        this.items.addClass("nav-item-home")
    }
    ,
    b.setNavStateDefault = function() {
        this.inHomeState = !1,
        this.$el.removeClass("nav-home-state").addClass("nav-default-state"),
        this.logo.removeClass("logo-home").addClass("logo-not-home"),
        this.github.removeClass("github-home").addClass("github-not-home"),
        this.twitter.removeClass("twitter-home").addClass("twitter-not-home"),
        this.items.removeClass("nav-item-home")
    }
    ,
    b.toggleMobile = function() {
        $window[this.open ? "off" : "on"]("scroll", this.scrollProxy),
        this.open = !this.open,
        this.nav.toggleClass("closed"),
        this.UIBlocker.$el.toggleClass("closed")
    }
    ,
    b.updateState = function() {
        var b = a.router.activeRoute;
        b === a.AppRouter.VIEWS.HOME ? this.setNavStateHome() : this.inHomeState && this.setNavStateDefault(),
        this.$(".active-page").removeClass("active-page"),
        this.$(".nav-item[href='" + b + "']").addClass("active-page")
    }
    ,
    b._handleItemClick = function(b) {
        var c = b.currentTarget;
        a.isInternalLink(c) && (b.preventDefault(),
        a.router.go(c.getAttribute("href"))),
        this.open && this.toggleMobile()
    }
    ,
    a.Nav = g.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.transitionManager = null,
    b.transitionEvent = null,
    b.hasTouch = null,
    b.carousel = null,
    b.pagination = null,
    b.leftScrollClick = null,
    b.rightScrollClick = null,
    b.setupProxy = null,
    b.swipe = null,
    b.activeBP = null,
    b.pageCount = null,
    b.currentPage = null,
    b.isAnimating = null,
    b.initialize = function() {
        this.setTemplate(a.Templates.PROJECTS),
        this.hasTouch = a.deviceUtil.hasTouchSupport(),
        this.carousel = this.$(".projects_list"),
        this.pagination = this.$(".projects_pagination"),
        this.leftScrollClick = this.$(".scroll-left"),
        this.rightScrollClick = this.$(".scroll-right"),
        this.transitionManager = new g.TransitionEvents(this.carousel[0]),
        this.setupProxy = g.proxy(this.setup, this),
        $window.off("resize", this.setupProxy),
        $window.on("resize", this.setupProxy),
        this.hasTouch && (this.swipe = new TouchUtil(this.el,{
            click: !1,
            swipe: !0,
            preventScroll: !0
        })),
        this.setup(),
        this.addEventListeners()
    }
    ,
    b.setup = function() {
        var a = window.innerWidth
          , b = this.$(".project").length;
        if (a >= 1500 && 3 !== this.activeBP)
            this.activeBP = 3,
            this.pageCount = b % 3 ? b / 3 + 1 | 0 : b / 3;
        else if (a >= 800 && 2 !== this.activeBP)
            this.activeBP = 2,
            this.pageCount = b % 2 ? b / 2 + 1 | 0 : b / 2;
        else {
            if (1 === this.activeBP)
                return;
            this.activeBP = 1,
            this.pageCount = b
        }
        this.pagination.empty(),
        this.carousel.css("right", 0),
        this.rightScrollClick.show();
        for (var c = 1; c <= this.pageCount; c++) {
            var d = document.createElement("li");
            d.className = "pagination_item",
            d.setAttribute("data-page-id", c + ""),
            this.pagination.append(d),
            d.addEventListener("click", g.proxy(this.handlePageClick, this))
        }
        this.currentPage = 1,
        this.pagination.children().first().addClass("active"),
        this.leftScrollClick.hide(),
        this.hasTouch && this.rightScrollClick.hide()
    }
    ,
    b.addEventListeners = function() {
        this.hasTouch ? (this.swipe.addListener(this.swipe.right, g.proxy(this.scrollLeft, this)),
        this.swipe.addListener(this.swipe.left, g.proxy(this.scrollRight, this))) : (this.leftScrollClick.on("click", g.proxy(this.scrollLeft, this)),
        this.rightScrollClick.on("click", g.proxy(this.scrollRight, this)))
    }
    ,
    b.removeEventListeners = function() {
        this.hasTouch ? (this.swipe.removeListener(this.swipe.right, g.proxy(this.scrollLeft, this)),
        this.swipe.removeListener(this.swipe.left, g.proxy(this.scrollRight, this))) : (this.leftScrollClick.off("click", g.proxy(this.scrollLeft, this)),
        this.rightScrollClick.off("click", g.proxy(this.scrollRight, this)))
    }
    ,
    b.scrollRight = function() {
        this.isAnimating || this.currentPage === this.pageCount || (this.isAnimating = !0,
        !this.hasTouch && this.leftScrollClick.show(),
        this.currentPage++,
        this.currentPage === this.pageCount && this.rightScrollClick.hide(),
        this.$(".active").removeClass("active").next().addClass("active"),
        this.transitionManager.off(g.TransitionEvents.TRANSITION_END, this.transitionEvent),
        this.transitionEvent = this.transitionManager.on(g.TransitionEvents.TRANSITION_END, function() {
            this.isAnimating = !1,
            this.carousel.css("right", (this.currentPage - 1) * document.body.clientWidth),
            this.carousel.removeClass("animate-right")
        }, this),
        this.carousel.addClass("animate-right"))
    }
    ,
    b.scrollLeft = function() {
        this.isAnimating || 1 === this.currentPage || (this.isAnimating = !0,
        !this.hasTouch && this.rightScrollClick.show(),
        this.currentPage--,
        1 === this.currentPage && this.leftScrollClick.hide(),
        this.$(".active").removeClass("active").prev().addClass("active"),
        this.transitionManager.off(g.TransitionEvents.TRANSITION_END, this.transitionEvent),
        this.transitionEvent = this.transitionManager.on(g.TransitionEvents.TRANSITION_END, function() {
            this.isAnimating = !1,
            this.carousel.css("right", (this.currentPage - 1) * document.body.clientWidth),
            this.carousel.removeClass("animate-left")
        }, this),
        this.carousel.addClass("animate-left"))
    }
    ,
    b.handlePageClick = function(a) {
        if (!this.isAnimating) {
            var b = Number($(a.currentTarget).data("page-id"))
              , c = Math.abs(this.currentPage - b);
            1 == c ? this.currentPage > b ? this.scrollLeft() : this.scrollRight() : 0 !== c && (this.isAnimating = !0,
            this.currentPage = b,
            this.hasTouch || (1 === this.currentPage ? this.leftScrollClick.hide() : this.leftScrollClick.show(),
            this.currentPage === this.pageCount ? this.rightScrollClick.hide() : this.rightScrollClick.show()),
            this.$(".active").removeClass("active"),
            this.$(".pagination_item").eq(this.currentPage - 1).addClass("active"),
            this.carousel.animate({
                right: (this.currentPage - 1) * document.body.clientWidth
            }, 1e3, g.proxy(function() {
                this.isAnimating = !1
            }, this)))
        }
    }
    ,
    b.disable = function() {
        this.$(".projects_scroll").hide(),
        this.pagination.addClass("disabled"),
        this.carousel.addClass("no-scroll"),
        this.removeEventListeners()
    }
    ,
    a.Carousel = g.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.winHeight = null,
    b.docHeight = null,
    b.footHeight = null,
    b.fromTop = null,
    b.isVisible = !0,
    b.initialize = function() {
        this.setTemplate(a.Templates.BACK_TO_TOP),
        this.stateProxy = g.proxy(this.calculateState, this),
        this.resizeProxy = g.proxy(this.handleResize, this),
        this.fromTop = 400,
        $window.off("scroll", this.stateProxy).on("scroll", this.stateProxy),
        $window.off("resize", this.resizeProxy).on("resize", this.resizeProxy),
        setTimeout(this.resizeProxy, 1e3)
    }
    ,
    b.handleResize = function() {
        this.calculateState(),
        this.docHeight = $body.height(),
        this.winHeight = $window.height(),
        this.footHeight = this.$el.parent().height() - 90
    }
    ,
    b.toggleVisibility = function() {
        this.isVisible = !this.isVisible,
        this.$el.toggleClass("hide")
    }
    ,
    b.toggleSticky = function() {
        this.isSticky = !this.isSticky,
        this.$el.toggleClass("sticky")
    }
    ,
    b.calculateState = function() {
        var a = window.scrollY;
        this.isVisible ? a > this.fromTop && this.toggleVisibility() : (a < this.fromTop && this.toggleVisibility(),
        a + this.winHeight > this.docHeight - this.footHeight && !this.isSticky ? this.toggleSticky() : a + this.winHeight < this.docHeight - this.footHeight && this.isSticky && this.toggleSticky())
    }
    ,
    b.destroy = function() {
        $window.off("resize", this.resizeProxy).off("scroll", this.stateProxy)
    }
    ,
    a.BackToTop = g.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.title = null,
    b.message = null,
    b.closeBtn = null,
    b.UIBlocker = null,
    b.initialize = function() {
        this.setTemplate(a.Templates.DIALOG),
        this.title = this.$(".title"),
        this.message = this.$(".message"),
        this.closeBtn = this.$(".close"),
        this.UIBlocker = new a.UIBlocker({
            el: document.createElement("template")
        }),
        this.UIBlocker.$el.addClass("dialog-underlay"),
        this.closeProxy = g.proxy(this._handleCloseDialog, this),
        this.disabledProxy = g.proxy(this._handleDisabledEvent, this)
    }
    ,
    b.setup = function(a, b) {
        this.title.text(a),
        this.message.text(b),
        this.addEventListeners(),
        this.toggleVisibility(),
        this.UIBlocker.append()
    }
    ,
    b.toggleVisibility = function() {
        this.$el.toggleClass("closed"),
        this.UIBlocker.$el.toggleClass("closed")
    }
    ,
    b.addEventListeners = function() {
        this.UIBlocker.$el.on("click", this.closeProxy),
        this.closeBtn.on("click", this.closeProxy),
        $window.on("touchmove", this.disabledProxy)
    }
    ,
    b.removeEventListeners = function() {
        this.UIBlocker.$el.off("click", this.closeProxy),
        this.UIBlocker.remove(),
        this.closeBtn.off("click", this.closeProxy),
        $window.off("touchmove", this.disabledProxy)
    }
    ,
    b._handleDisabledEvent = function(a) {
        a.preventDefault()
    }
    ,
    b._handleCloseDialog = function() {
        this.removeEventListeners(),
        this.toggleVisibility()
    }
    ,
    a.Dialog = g.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.initialize = function() {
        this.setTemplate(a.Templates.RECENT_UPDATES)
    }
    ,
    a.RecentUpdates = g.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.initialize = function() {
        this.setTemplate(a.Templates.TUTORIALS)
    }
    ,
    a.Tutorials = g.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    c.EVENT_DEMO_CLICKED = "DEMO_CLICK",
    b.demos = null,
    b.hidden = null,
    b.name = null,
    b.items = null,
    b.initialize = function() {
        this.setTemplate(a.Templates.DEMO_LIST),
        this.demos = this.model.get("DISPLAY"),
        this.hidden = this.model.get("HIDDEN"),
        this.name = this.model.get("NAME");
        var b = g.proxy(this.handleDemoClick, this);
        this.items = this.$(".demo").on("click", b)
    }
    ,
    b.handleDemoClick = function(a) {
        var b = Number(a.currentTarget.getAttribute("data-id"));
        this.trigger(c.EVENT_DEMO_CLICKED, this.demos[b], b)
    }
    ,
    a.DemoList = g.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    c.VIEWS = {
        HOME: "/",
        EASELJS: "/easeljs",
        TWEENJS: "/tweenjs",
        SOUNDJS: "/soundjs",
        PRELOADJS: "/preloadjs",
        ZOE: "/zoe",
        TOOLS: "/tools",
        DOWNLOADS: "/downloads",
        GETTING_STARTED: "/getting-started",
        DEMOS: "/demos",
        SUPPORT: "/support",
        ERROR: "/404",
        DOCS: "/docs"
    },
    c.DOCS = {
        EASELJS: "/docs/easeljs",
        TWEENJS: "/docs/tweenjs",
        SOUNDJS: "/docs/soundjs",
        PRELOADJS: "/docs/preloadjs"
    },
    c.DEMOS = {
        EASELJS: "/demos/easeljs",
        TWEENJS: "/demos/tweenjs",
        SOUNDJS: "/demos/soundjs",
        PRELOADJS: "/demos/preloadjs"
    },
    c.GETTING_STARTED = {
        EASELJS: "/getting-started/easeljs",
        TWEENJS: "/getting-started/tweenjs",
        SOUNDJS: "/getting-started/soundjs",
        PRELOADJS: "/getting-started/preloadjs",
        ZOE: "/getting-started/zoe"
    },
    c.EXTERNAL = {
        REDDIT: "http://reddit.com/r/CreateJS",
        GPLUS: "http://plus.google.com/communities/113475154727121541523",
        GITHUB: "https://github.com/CreateJS",
        GSKINNER: "http://gskinner.com",
        TWITTER: "https://twitter.com/CreateJS",
        BLOG: "http://blog.createjs.com",
        STACK_OVERFLOW: "http://stackoverflow.com/questions/tagged/createjs"
    },
    c.LEGACY_ROUTES = {
        HOME: ["createjs", "home"],
        GETTING_STARTED: ["learn"],
        DOWNLOADS: ["createjs/download", "easeljs/download", "tweenjs/download", "soundjs/download", "preloadjs/download"],
        DEMOS: ["easeljs/demos", "tweenjs/demos", "soundjs/demos", "preloadjs/demos"]
    },
    b.routes = {
        "": c.VIEWS.HOME,
        easeljs: c.VIEWS.EASELJS,
        tweenjs: c.VIEWS.TWEENJS,
        soundjs: c.VIEWS.SOUNDJS,
        preloadjs: c.VIEWS.PRELOADJS,
        zoe: c.VIEWS.ZOE,
        tools: c.VIEWS.TOOLS,
        downloads: c.VIEWS.DOWNLOADS,
        "getting-started(/:library)": c.VIEWS.GETTING_STARTED,
        "demos(/:library)(/:demo)": c.VIEWS.DEMOS,
        docs: c.VIEWS.DOCS,
        support: c.VIEWS.SUPPORT,
        "*error": c.VIEWS.ERROR
    },
    b.isHistorySupported = !!window.history.pushState,
    b.activeRoute = null,
    b.checkLegacyRoutes = function(a) {
        var b = c.LEGACY_ROUTES
          , d = c.VIEWS;
        return ~b.HOME.indexOf(a) ? d.HOME : ~b.GETTING_STARTED.indexOf(a) ? d.GETTING_STARTED : ~b.DOWNLOADS.indexOf(a) ? d.DOWNLOADS : ~b.DEMOS.indexOf(a) ? d.DEMOS : a
    }
    ,
    b.go = function(b) {
        !a.viewManager.isTransitioning && this.navigate(b, {
            trigger: !0
        })
    }
    ,
    b.replace = function(a) {
        this.navigate(a, {
            replace: !0
        })
    }
    ,
    a.AppRouter = Backbone.Router.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {};
    b.HOME = "home",
    b.LIBRARY = "library",
    b.TOOLS = "tools",
    b.GETTING_STARTED = "getting-started",
    b.DOCS = "docs",
    b.DOWNLOADS = "downloads",
    b.DEMOS = "demos",
    b.SUPPORT = "support",
    b.ERROR = "error",
    b.NAV = "nav",
    b.DIALOG = "dialog",
    b.PROJECTS = "projects",
    b.BACK_TO_TOP = "backToTop",
    b.RECENT_UPDATES = "updates",
    b.TUTORIALS = "tutorial",
    b.DEMO_LIST = "demo-list",
    b.UIBLOCKER = "UIBlocker",
    b.SPONSORS = "sponsors",
    a.Templates = b
}(window.cjs),
function(a) {
    "use strict";
    var b = {};
    b.EASELJS = {
        NAME: "EaselJS",
        PROJECT_FILTER: "e",
        PREFIX: "EASELJS",
        REPO_ID: 1280658,
        BANNER_CLASS: "banner_bg-easeljs",
        CANVAS_CLASS: "canvas_bg-easeljs",
        DEMO_SOURCE: "/demos/easeljs/SpriteSheet.html",
        DEMOS_LINK: a.AppRouter.DEMOS.EASELJS,
        DOCS_LINK: a.AppRouter.DOCS.EASELJS,
        GETTING_STARTED_LINK: a.AppRouter.GETTING_STARTED.EASELJS,
        GPLUS_LINK: "http://plus.google.com/communities/113475154727121541523",
        GITHUB_LINK: "https://github.com/CreateJS/EaselJS/issues",
        STACK_OVERFLOW_LINK: "http://stackoverflow.com/questions/tagged/easeljs",
        DEMOS: {
            NAME: "EaselJS",
            DISPLAY: [{
                TITLE: "Sprite Sheets",
                DESCRIPTION: "Animation using a sprite sheet, named states, and the BitmapAnimation class. Click to jump.",
                IMAGE: "/assets/images/required/easel-spritesheets.gif",
                SOURCE: "/demos/easeljs/SpriteSheet.html"
            }, {
                TITLE: "Drag And Drop",
                DESCRIPTION: "Object-specific mouse events allow you to create drag and drop behaviours.",
                IMAGE: "/assets/images/required/easel-dragAndDrop_1.png",
                SOURCE: "/demos/easeljs/DragAndDrop.html"
            }, {
                TITLE: "Transform",
                DESCRIPTION: "Manage object transformations, including: position, rotate, skew.",
                IMAGE: "/assets/images/required/easel-transform_1.png",
                SOURCE: "/demos/easeljs/Transform.html"
            }, {
                TITLE: "Caching",
                DESCRIPTION: "Cache vectors and groups for better performance.",
                IMAGE: "/assets/images/required/easel-cacheAsBitmap_1.png",
                SOURCE: "/demos/easeljs/Cache.html"
            }, {
                TITLE: "Game",
                DESCRIPTION: "An Asteroids clone made with EaselJS and SoundJS.",
                IMAGE: "/assets/images/required/easel-game_1.png",
                SOURCE: "/demos/soundjs/Game/Game.html"
            }, {
                TITLE: "Filters",
                DESCRIPTION: "Cool filters such as dropshadow, blur, and colorize.",
                IMAGE: "/assets/images/required/easel-filters_1.png",
                SOURCE: "/demos/easeljs/Filters.html"
            }, {
                TITLE: "Painting",
                DESCRIPTION: "A simple painting application that draws to the canvas using graphics.",
                IMAGE: "/assets/images/required/easel-painting_1.png",
                SOURCE: "/demos/easeljs/CurveTo.html"
            }, {
                TITLE: "Alpha Mask Filter",
                DESCRIPTION: "Apply a mask to content using another image.",
                IMAGE: "/assets/images/required/easel-alphamask_1.png",
                SOURCE: "/demos/easeljs/AlphaMaskReveal.html"
            }],
            HIDDEN: [{
                TITLE: "Bar Graph",
                SOURCE: "/demos/easeljs/BarGraph.html"
            }, {
                TITLE: "Local to Global",
                SOURCE: "/demos/easeljs/LocalToGlobal.html"
            }, {
                TITLE: "Bitmap Animation",
                SOURCE: "/demos/easeljs/BitmapAnimation.html"
            }, {
                TITLE: "Bitmap Text",
                SOURCE: "/demos/easeljs/BitmapText.html"
            }, {
                TITLE: "Vector Masks",
                SOURCE: "/demos/easeljs/Masks.html"
            }, {
                TITLE: "Cache Update",
                SOURCE: "/demos/easeljs/Cache_update.html"
            }, {
                TITLE: "Cache V-Day",
                SOURCE: "/demos/easeljs/Cache_vday.html"
            }, {
                TITLE: "Double Click Test",
                SOURCE: "/demos/easeljs/DoubleClickTest.html"
            }, {
                TITLE: "Drag And Drop - Hit Area",
                SOURCE: "/demos/easeljs/DragAndDrop_hitArea.html"
            }, {
                TITLE: "Event Bubbling",
                SOURCE: "/demos/easeljs/EventBubbling.html"
            }, {
                TITLE: "Extract Frame",
                SOURCE: "/demos/easeljs/ExtractFrame.html"
            }, {
                TITLE: "Filters Input",
                SOURCE: "/demos/easeljs/Filters_input.html"
            }, {
                TITLE: "Filters Simple",
                SOURCE: "/demos/easeljs/Filters_simple.html"
            }, {
                TITLE: "Global To Local 1",
                SOURCE: "/demos/easeljs/GlobalToLocal1.html"
            }, {
                TITLE: "Global To Local 2",
                SOURCE: "/demos/easeljs/GlobalToLocal2.html"
            }, {
                TITLE: "Graphics Inject",
                SOURCE: "/demos/easeljs/Graphics_inject.html"
            }, {
                TITLE: "Graphics Simple",
                SOURCE: "/demos/easeljs/Graphics_simple.html"
            }, {
                TITLE: "Graphics Winding",
                SOURCE: "/demos/easeljs/Graphics_winding.html"
            }, {
                TITLE: "Graphics Reuse",
                SOURCE: "/demos/easeljs/GraphicsReuse.html"
            }, {
                TITLE: "Graphics Test",
                SOURCE: "/demos/easeljs/GraphicsTest.html"
            }, {
                TITLE: "Graphics Test Tiny",
                SOURCE: "/demos/easeljs/GraphicsTestTiny.html"
            }, {
                TITLE: "Hello World",
                SOURCE: "/demos/easeljs/HelloWorld.html"
            }, {
                TITLE: "HTML Elements",
                SOURCE: "/demos/easeljs/HtmlElements.html"
            }, {
                TITLE: "Icons",
                SOURCE: "/demos/easeljs/Icons.html"
            }, {
                TITLE: "Movie Clip",
                SOURCE: "/demos/easeljs/MovieClip.html"
            }, {
                TITLE: "Roll Over, Mouse Over",
                SOURCE: "/demos/easeljs/RollOverMouseOver.html"
            }, {
                TITLE: "Segments",
                SOURCE: "/demos/easeljs/Segments.html"
            }, {
                TITLE: "Sparkles",
                SOURCE: "/demos/easeljs/Sparkles.html"
            }, {
                TITLE: "Sparkles Fade",
                SOURCE: "/demos/easeljs/SparklesFade.html"
            }, {
                TITLE: "Sprite Sheet Simple",
                SOURCE: "/demos/easeljs/SpriteSheet_simple.html"
            }, {
                TITLE: "Sprite Sheet Builder",
                SOURCE: "/demos/easeljs/SpriteSheetBuilder.html"
            }, {
                TITLE: "Text Links",
                SOURCE: "/demos/easeljs/Text_links.html"
            }, {
                TITLE: "Text Multiline",
                SOURCE: "/demos/easeljs/Text_multiline.html"
            }, {
                TITLE: "Text Simple",
                SOURCE: "/demos/easeljs/Text_simple.html"
            }, {
                TITLE: "Transform Simple",
                SOURCE: "/demos/easeljs/Transform_simple.html"
            }, {
                TITLE: "Two Stages",
                SOURCE: "/demos/easeljs/TwoStages.html"
            }]
        }
    },
    b.TWEENJS = {
        NAME: "TweenJS",
        PROJECT_FILTER: "t",
        PREFIX: "TWEENJS",
        REPO_ID: 1501185,
        BANNER_CLASS: "banner_bg-tweenjs",
        CANVAS_CLASS: "canvas_bg-tweenjs",
        DEMO_SOURCE: "/demos/tweenjs/Tween_Circles.html",
        DEMOS_LINK: a.AppRouter.DEMOS.TWEENJS,
        DOCS_LINK: a.AppRouter.DOCS.TWEENJS,
        GETTING_STARTED_LINK: a.AppRouter.GETTING_STARTED.TWEENJS,
        GPLUS_LINK: "http://plus.google.com/communities/113475154727121541523",
        GITHUB_LINK: "https://github.com/CreateJS/TweenJS/issues",
        STACK_OVERFLOW_LINK: "http://stackoverflow.com/questions/tagged/tweenjs",
        DEMOS: {
            NAME: "TweenJS",
            DISPLAY: [{
                TITLE: "Tween Circles",
                DESCRIPTION: "A simple example of a tween in use.",
                IMAGE: "/assets/images/required/tween-circles.png",
                SOURCE: "/demos/tweenjs/Tween_Circles.html"
            }, {
                TITLE: "Simple Demo",
                DESCRIPTION: "A sample of a chained tween including function calls and delays.",
                IMAGE: "/assets/images/required/tween-tween.png",
                SOURCE: "/demos/tweenjs/SimpleTweenDemo.html"
            }, {
                TITLE: "Spark Table",
                DESCRIPTION: "Preview ease functions.",
                IMAGE: "/assets/images/required/tween-sparkTable.png",
                SOURCE: "/demos/tweenjs/Tween_SparkTable.html"
            }],
            HIDDEN: [{
                TITLE: "Example",
                SOURCE: "/demos/tweenjs/Example.html"
            }, {
                TITLE: "CSS Example",
                SOURCE: "/demos/tweenjs/CssExample.html"
            }, {
                TITLE: "Motion Guide Blitz",
                SOURCE: "/demos/tweenjs/MotionGuideBlitz.html"
            }, {
                TITLE: "Motion Guide Demo",
                SOURCE: "/demos/tweenjs/MotionGuideDemo.html"
            }, {
                TITLE: "Multi Motion Demo",
                SOURCE: "/demos/tweenjs/MultiMotionDemo.html"
            }, {
                TITLE: "Tween Only",
                SOURCE: "/demos/tweenjs/TweenOnlyDemo.html"
            }, {
                TITLE: "Tween Sample",
                SOURCE: "/demos/tweenjs/SimpleTweenDemo.html"
            }]
        }
    },
    b.SOUNDJS = {
        NAME: "SoundJS",
        PROJECT_FILTER: "s",
        PREFIX: "SOUNDJS",
        REPO_ID: 2692921,
        BANNER_CLASS: "banner_bg-soundjs",
        CANVAS_CLASS: "canvas_bg-soundjs",
        DEMO_SOURCE: "/demos/soundjs/02_PlayOnClick.html",
        DEMOS_LINK: a.AppRouter.DEMOS.SOUNDJS,
        DOCS_LINK: a.AppRouter.DOCS.SOUNDJS,
        GETTING_STARTED_LINK: a.AppRouter.GETTING_STARTED.SOUNDJS,
        GPLUS_LINK: "http://plus.google.com/communities/113475154727121541523",
        GITHUB_LINK: "https://github.com/CreateJS/SoundJS/issues",
        STACK_OVERFLOW_LINK: "http://stackoverflow.com/questions/tagged/soundjs",
        DEMOS: {
            NAME: "SoundJS",
            DISPLAY: [{
                TITLE: "Web Audio Node Insertion",
                DESCRIPTION: "A simple visualizer (WebAudio only). Music is 'Underground' by Binarpilot.",
                IMAGE: "/assets/images/required/sound-visualizer_1.png",
                SOURCE: "/demos/soundjs/07_WebAudioNodeInsertion.html"
            }, {
                TITLE: "Play On Click",
                DESCRIPTION: "An audio soundboard. Click items to play them.",
                IMAGE: "/assets/images/required/sound-soundGrid_1.png",
                SOURCE: "/demos/soundjs/02_PlayOnClick.html"
            }, {
                TITLE: "Media Player",
                DESCRIPTION: "A simple media player example.",
                IMAGE: "/assets/images/required/sound-mediaPlayer_1.png",
                SOURCE: "/demos/soundjs/MediaPlayer/MediaPlayer.html"
            }, {
                TITLE: "Game",
                DESCRIPTION: "An Asteroids clone made with EaselJS and SoundJS.",
                IMAGE: "/assets/images/required/easel-game_1.png",
                SOURCE: "/demos/soundjs/Game/Game.html"
            }],
            HIDDEN: [{
                TITLE: "Just Play",
                SOURCE: "/demos/soundjs/JustPlay.html"
            }, {
                TITLE: "Mobile Safe",
                SOURCE: "/demos/soundjs/MobileSafe.html"
            }, {
                TITLE: "Preload And Play",
                SOURCE: "/demos/soundjs/PreloadAndPlay.html"
            }, {
                TITLE: "Sound Tween",
                SOURCE: "/demos/soundjs/SoundTween.html"
            }]
        }
    },
    b.PRELOADJS = {
        NAME: "PreloadJS",
        PROJECT_FILTER: "p",
        PREFIX: "PRELOADJS",
        REPO_ID: 3506930,
        BANNER_CLASS: "banner_bg-preloadjs",
        CANVAS_CLASS: "canvas_bg-preloadjs",
        DEMO_SOURCE: "/demos/preloadjs/MediaGrid.html",
        DEMOS_LINK: a.AppRouter.DEMOS.PRELOADJS,
        DOCS_LINK: a.AppRouter.DOCS.PRELOADJS,
        GETTING_STARTED_LINK: a.AppRouter.GETTING_STARTED.PRELOADJS,
        GPLUS_LINK: "http://plus.google.com/communities/113475154727121541523",
        GITHUB_LINK: "https://github.com/CreateJS/PreloadJS/issues",
        STACK_OVERFLOW_LINK: "http://stackoverflow.com/questions/tagged/preloadjs",
        DEMOS: {
            NAME: "PreloadJS",
            DISPLAY: [{
                TITLE: "Media Grid",
                DESCRIPTION: "Click items to preload them. Once preloaded, they will display or play.",
                IMAGE: "/assets/images/required/preload-mediaGrid_1.png",
                SOURCE: "/demos/preloadjs/MediaGrid.html"
            }, {
                TITLE: "Image Gallery",
                DESCRIPTION: "Preload a set of images and interact with them using EaselJS.",
                IMAGE: "/assets/images/required/preload-imageGallery_1.png",
                SOURCE: "/demos/preloadjs/PreloadImages.html"
            }, {
                TITLE: "Preload Queue",
                DESCRIPTION: "Add items to a preload queue in real time. As items load, the queue is updated.",
                IMAGE: "/assets/images/required/preload-preloadQueue_1.png",
                SOURCE: "/demos/preloadjs/PreloadQueue.html"
            }],
            HIDDEN: [{
                TITLE: "Plugin Sample",
                SOURCE: "/demos/preloadjs/PluginSample.html"
            }, {
                TITLE: "Sprite Sheet",
                SOURCE: "/demos/preloadjs/SpriteSheet.html"
            }]
        }
    },
    b.ZOE = {
        NAME: "Zo&#235;",
        PROJECT_FILTER: "z",
        PREFIX: "ZOE",
        REPO_ID: 2586926,
        BANNER_CLASS: "banner_bg-zoe",
        CANVAS_CLASS: "canvas_bg-zoe",
        DEMO_SOURCE: !1,
        GETTING_STARTED_LINK: a.AppRouter.GETTING_STARTED.ZOE,
        GPLUS_LINK: "http://plus.google.com/communities/113475154727121541523",
        GITHUB_LINK: "https://github.com/CreateJS/Zoe/issues",
        STACK_OVERFLOW_LINK: "http://stackoverflow.com/questions/tagged/zoe",
        DEMOS: {
            DISPLAY: [],
            HIDDEN: []
        }
    },
    a.LibraryData = b
}(window.cjs),
function(a) {
    a.Projects = [{
        TITLE: "Wiki Budgets",
        DESCRIPTION: "Expenditure: £753 billion, receipts: £681 billion, deficit: £72.0 billion. Explore all 22361 budget items in an interactive diagram.",
        CREDITS: [{
            COMPANY: "Wiki Budgets",
            URL: "http://wikibudgets.org"
        }],
        PROJECT_URL: "https://uk.wikibudgets.org/w/united-kingdom-budget-2015",
        IMAGE: "wikibudget.jpg",
        PRODUCTS: "et"
    }, {
        TITLE: "Coguz",
        DESCRIPTION: "Coguz is the personal presentation of Cankat Oguz through the random scenes of subconscious.",
        CREDITS: [{
            COMPANY: "Cankat Oguz",
            URL: "http://coguz.com"
        }],
        PROJECT_URL: "http://coguz.com",
        IMAGE: "coguz.png",
        PRODUCTS: "cpest"
    }, {
        TITLE: "Shoe Customizer",
        DESCRIPTION: "Configure your custom shoes to tackle your workouts with confidence. Performance running shoes and stylish clothes from New Balance.",
        CREDITS: [{
            COMPANY: "New Balance",
            URL: "http://newbalance.com"
        }],
        PROJECT_URL: "http://newbalance.com/nb1/explore/?ICID=HERO_NAV_CM_2020",
        IMAGE: "newbalance.jpg",
        PRODUCTS: "pe"
    }, {
        TITLE: "NYC Instagram Marathon",
        DESCRIPTION: "A realtime experimental project using Node, Socket, EaselJS, and fetching posts with #nycmarathon & #marathon hashtags from Instagram.",
        CREDITS: [{
            COMPANY: "Zulu",
            URL: "http://zulfeekar.com/"
        }],
        PROJECT_URL: "http://nycigmarathon.com/",
        IMAGE: "nycmarathon.jpg",
        PRODUCTS: "pe"
    }, {
        TITLE: "McWhopper",
        DESCRIPTION: "For Peace Day, Burger King made an unprecedented peace proposal to McDonald's - to join forces and create the McWhopper.",
        CREDITS: [{
            COMPANY: "Burger King",
            URL: "http://bk.com/"
        }],
        PROJECT_URL: "http://mcwhopper.com/",
        IMAGE: "mcwhopper.jpg",
        PRODUCTS: "cpest"
    }, {
        TITLE: "New From Bose",
        DESCRIPTION: "With the creation of the multichannel New From Bose experience platform, Bose created a unique way of presenting their new headphones to the market.",
        CREDITS: [{
            COMPANY: "This Page",
            URL: "http://thispage.amsterdam/"
        }, {
            COMPANY: "Iceleads",
            URL: "http://iceleads.com"
        }],
        PROJECT_URL: "http://thispage.amsterdam/new-from-bose/",
        IMAGE: "newfrombose.jpg",
        PRODUCTS: "pet"
    }, {
        TITLE: "Nike - Gec Kendini",
        DESCRIPTION: "An interactive, playful video experience promoting Nike Women 2015 Summer Styles. Visitors can shop, share and get inspired with this responsive website.",
        CREDITS: [{
            COMPANY: "Minus99",
            URL: "http://minus99.com/"
        }, {
            COMPANY: "PROJ-E",
            URL: "http://proj-e.com/"
        }, {
            COMPANY: "ilmisimya",
            URL: "http://ilmisimya.com/"
        }],
        PROJECT_URL: "http://nike.lidyana.com/",
        IMAGE: "nikelidyana.jpg",
        PRODUCTS: "cpest"
    }, {
        TITLE: "The A-Z of YouTube",
        DESCRIPTION: "Relive some of YouTube's best loved videos from the last decade with a game that tests your pop-culture knowledge. Do you know YouTube from A to Z?",
        CREDITS: [{
            COMPANY: "YouTube",
            URL: "http://youtube.com/"
        }, {
            COMPANY: "Hook",
            URL: "http://byhook.com/"
        }],
        PROJECT_URL: "https://youtube10.withgoogle.com/",
        IMAGE: "atozofyoutube.jpg",
        PRODUCTS: "cpes"
    }, {
        TITLE: "WWF Tiger Challenge",
        DESCRIPTION: "The Tiger Challenge website, set up together with the WWF Russia, allows runners to compare their achievements with those of an endangered Amur tiger living in Russia's Far East using GPS tags on an Amur tiger.",
        CREDITS: [{
            COMPANY: "Hungry Boys",
            URL: "http://hungryboys.ru/"
        }],
        PROJECT_URL: "http://run4tiger.com/",
        IMAGE: "run4tiger.jpg",
        PRODUCTS: "pe"
    }, {
        TITLE: "MARTIN H WEFAIL",
        DESCRIPTION: "A portfolio site, and bizarre interactive experience by Martin Hughes, web designer to the stars.",
        CREDITS: [{
            COMPANY: "WEFAIL",
            URL: "http://wefail.com/"
        }],
        PROJECT_URL: "http://www.martin-h.com/",
        IMAGE: "martinh.jpg",
        PRODUCTS: "cpest"
    }, {
        TITLE: "BBQ Cultures",
        DESCRIPTION: "A cinematic clash of BBQ cultures that captures and celebrates the devotion and diversity to that most awesome of activities. At any given time, somewhere, someone is BBQ’ing, explore how, where and when.",
        CREDITS: [{
            COMPANY: "Media Monks",
            URL: "http://mediamonks.com/"
        }, {
            COMPANY: "Uncle Grey",
            URL: "http://unclegrey.dk/"
        }],
        PROJECT_URL: "http://bbqcultures.com",
        IMAGE: "bbqcultures.jpg",
        PRODUCTS: "cpest"
    }, {
        TITLE: "BMW at the Geneva International Motorshow",
        DESCRIPTION: "Discover the BMW stand in 360° at the Geneva International Motorshow.",
        CREDITS: [{
            COMPANY: "84.Paris",
            URL: "http://84paris.com"
        }],
        PROJECT_URL: "http://bmw-autosalon.ch/int-en/stand/",
        IMAGE: "bmwautosalon.jpg",
        PRODUCTS: "cpest"
    }, {
        TITLE: "I N S P I R I T",
        DESCRIPTION: "An interactive VR story about people and lights.",
        CREDITS: [{
            COMPANY: "Unboring",
            URL: "http://unboring.net/"
        }],
        PROJECT_URL: "http://inspirit.unboring.net/",
        IMAGE: "inspiritunboring.jpg",
        PRODUCTS: "ps"
    }, {
        TITLE: "Thank God It's Pi Day",
        DESCRIPTION: "A Cerebral Canvas Celebration of this most unique of days. While Pi is a constant, each of its numbers animates across time and space creating playful patterns of color, creative and chords.",
        CREDITS: [{
            COMPANY: "Media Monks",
            URL: "http://mediamonks.com/"
        }],
        PROJECT_URL: "http://thankgoditspiday.com/",
        IMAGE: "thankgoditspiday.jpg",
        PRODUCTS: "ps"
    }, {
        TITLE: "Wildflower",
        DESCRIPTION: "Express your true feelings by sending a unique wildflower on Valentine's Day.",
        CREDITS: [{
            COMPANY: "Resn",
            URL: "http://resn.co.nz/"
        }],
        PROJECT_URL: "http://wildflower.resn.co.nz/",
        IMAGE: "wildflower.jpg",
        PRODUCTS: "cestp"
    }, {
        TITLE: "Become a Kingsman Knight",
        DESCRIPTION: "Do you have what it takes to become a Kingsman knight? Complete missions in this interactive world to earn your way in.",
        CREDITS: [{
            COMPANY: "20th Century Fox",
            URL: "http://foxmovies.com/"
        }, {
            COMPANY: "Unit9",
            URL: "http://unit9.com/"
        }],
        PROJECT_URL: "http://kingsmanmovie.com/becomeakingsman/code",
        IMAGE: "kingsmanknight.jpg",
        PRODUCTS: "ce"
    }, {
        TITLE: "Bad Assembly",
        DESCRIPTION: "Bad Assembly is a digital creative studio based in Los Angeles. They've been creating award-winning websites and apps since 2006.",
        CREDITS: [{
            COMPANY: "Bad Assembly",
            URL: "http://badassembly.com/"
        }],
        PROJECT_URL: "http://badassembly.com/",
        IMAGE: "badassembly.jpg",
        PRODUCTS: "et"
    }, {
        TITLE: "Barclays Code Playground",
        DESCRIPTION: "Learn to code with this interactive tool from Barclays. A great way for new programmers to explore JavaScript and see their changes reflected on the canvas.",
        CREDITS: [{
            COMPANY: "Barclays",
            URL: "http://barclays.co.uk/"
        }],
        PROJECT_URL: "http://barclayscodeplayground.co.uk/",
        IMAGE: "barclayscodeplayground.jpg",
        PRODUCTS: "ps"
    }, {
        TITLE: "The Family Farmer",
        DESCRIPTION: "Create and manage your own virtual farm with The Family Farmer, an interactive documentary game.",
        CREDITS: [{
            COMPANY: "Rotating Planet",
            URL: "http://rotatingplanet.com/"
        }],
        PROJECT_URL: "http://thefamilyfarmer.com/",
        IMAGE: "familyfarmer.jpg",
        PRODUCTS: "p"
    }, {
        TITLE: "Dream and Reach",
        DESCRIPTION: "Commemorate the history of Bose by reading about each development and milestone that Bose Corporation has accomplished.",
        CREDITS: [{
            COMPANY: "Bose",
            URL: "http://bose.com"
        }],
        PROJECT_URL: "http://dreamandreach.bose.com/en_US/explore",
        IMAGE: "bose-dreamandreach.jpg",
        PRODUCTS: "cetsp"
    }, {
        TITLE: "Free Rider HD",
        DESCRIPTION: "Free Rider HD is a game where you race bikes on tracks drawn by other players. Thousands of top tracks to race or draw your own!",
        CREDITS: [{
            COMPANY: "Free Rider",
            URL: "http://allstate.com"
        }],
        PROJECT_URL: "http://freeriderhd.com/",
        IMAGE: "freerider.jpg",
        PRODUCTS: "pes"
    }, {
        TITLE: "Holiday Decorator",
        DESCRIPTION: "Celebrate this Holiday season by decorating your home with lights, candles, presents, and more! Be the best on the block with Allstate's Holiday Home Decorator.",
        CREDITS: [{
            COMPANY: "AllState",
            URL: "http://allstate.com"
        }],
        PROJECT_URL: "http://holidaydecorator.allstateonline.com/",
        IMAGE: "holidaydecorator.jpg",
        PRODUCTS: "cpest"
    }, {
        TITLE: "Interactive Story Summary",
        DESCRIPTION: "The Dragon Age Keep helps players form their own world states for Dragon Age: Inquisition. The ISS is a cinematic summary of the player's story, spanning the times of the first 2 games.",
        CREDITS: [{
            COMPANY: "BioWare",
            URL: "http://bioware.com"
        }],
        PROJECT_URL: "http://dragonagekeep.com/",
        IMAGE: "dragonagekeep.jpg",
        PRODUCTS: "cetsp"
    }, {
        TITLE: "Digital For All Now",
        DESCRIPTION: "The digital revolution is happening now! Econocom's interactive experience shows us why we need to stand up for digital for all.",
        CREDITS: [{
            COMPANY: "Econocom",
            URL: "http://econocom.com"
        }],
        PROJECT_URL: "http://digitalforallnow.com/en/experience",
        IMAGE: "digitalforallnow.jpg",
        PRODUCTS: "ep"
    }, {
        TITLE: "Annoncez La Couleur",
        DESCRIPTION: "Ouiz is an invitation to announce color, dare to be remarkable. A new gesture to give flavor to everyday life.",
        CREDITS: [{
            COMPANY: "Ouiz",
            URL: "http://ouiz-enchanteurdeau.com/"
        }],
        PROJECT_URL: "http://ouiz-enchanteurdeau.com/",
        IMAGE: "ouiz.jpg",
        PRODUCTS: "p"
    }, {
        TITLE: "A Good Day Starts Here",
        DESCRIPTION: "A Good Day Starts here celebrates the ordinary - morning rituals we all recognize and relate to every single day. The interactive film is part of a larger integrated campaign online and on television.",
        CREDITS: [{
            COMPANY: "IKEA",
            URL: "http://ikea.com"
        }],
        PROJECT_URL: "http://engoddagstarterher.no/video",
        IMAGE: "engoddangstarterher.jpg",
        PRODUCTS: "cetsp"
    }, {
        TITLE: "Atari Arcade",
        DESCRIPTION: "To commemorate Atari's 40th anniversary and the launch of Microsoft Windows 8 and Internet Explorer 10, Create<strong>JS</strong> and gskinner.com reinvent the history of electronic games. <a href='//atari.com/arcade/developers' target='_blank'>Atari Arcade Developer Center</a>",
        CREDITS: [{
            COMPANY: "gskinner.com",
            URL: "http://gskinner.com"
        }],
        PROJECT_URL: "http://atari.com/arcade",
        IMAGE: "atariarcade.jpg",
        PRODUCTS: "cetspz"
    }, {
        TITLE: "Cards Against Humanity",
        DESCRIPTION: "Unlike most of the party games you've played before, Cards Against Humanity is as despicable and awkward as you and your friends.",
        CREDITS: [{
            COMPANY: "Cards Against Humanity LLC",
            URL: "http://cardsagainsthumanity.com"
        }, {
            COMPANY: "Ben Hantoot",
            URL: "http://benhantoot.com/"
        }],
        PROJECT_URL: "http://cardsagainsthumanity.com/",
        IMAGE: "cah.jpg",
        PRODUCTS: "et"
    }, {
        TITLE: "Noiseboard",
        DESCRIPTION: "A sound board for your day. Awesome visualization using EaselJS.",
        CREDITS: [{
            COMPANY: "M&C Saatchi Australia",
            URL: "http://mcsaatchi.com.au"
        }],
        PROJECT_URL: "http://noiseboard.com.au/",
        IMAGE: "noiseboard.jpg",
        PRODUCTS: "ce"
    }, {
        TITLE: "The Odd Couples",
        DESCRIPTION: "Blend famous faces into strange creatures, drag them around and send your creations to friends. FWA Site of the day for June 03 2013.",
        CREDITS: [{
            COMPANY: "Andy Foulds",
            URL: "http://andyfoulds.co.uk"
        }],
        PROJECT_URL: "http://screentoys.com",
        IMAGE: "odd-couple.jpg",
        PRODUCTS: "etc"
    }, {
        TITLE: "Wefail.com",
        DESCRIPTION: "Relaunching their iconic site in HTML5, Wefail is able to unleash their unique style once again to unsuspecting masses.",
        CREDITS: [{
            COMPANY: "Wefail",
            URL: "http://wefail.com"
        }],
        PROJECT_URL: "http://wefail.com",
        IMAGE: "wefail.jpg",
        PRODUCTS: "cetsp"
    }, {
        TITLE: "Platypus Game Engine",
        DESCRIPTION: "An open source game engine built with CreateJS. Check out their first game, Wild Kratts Monkey Mayhem.",
        CREDITS: [{
            COMPANY: "Gopherwood Studios",
            URL: "http://gopherwoodstudios.com/"
        }, {
            COMPANY: "PBS Kids",
            URL: "http://pbskids.org/"
        }],
        PROJECT_URL: "http://pbskids.org/wildkratts/games/monkey-mayhem/",
        IMAGE: "platypus-monkey.jpg",
        PRODUCTS: "cetsp"
    }, {
        TITLE: "Ion Drift",
        DESCRIPTION: "A port of the Animate game Ion Drift, b10b was able to build a CreateJS version in less than a day that hit target framerates on even the lowest devices, and outperformed ports to other libraries.",
        CREDITS: [{
            COMPANY: "b10b",
            URL: "http://b10b.com/"
        }],
        PROJECT_URL: "http://b10b.com/iondrift/epsilon/html5-createjs/",
        IMAGE: "b10b-epsilon.jpg",
        PRODUCTS: "cetsp"
    }]
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {}
      , d = a.AppRouter
      , e = d.VIEWS
      , f = d.DOCS
      , g = d.DEMOS
      , h = d.EXTERNAL;
    c.defaults = {
        ROUTE: {
            HOME: e.HOME,
            EASELJS: e.EASELJS,
            TWEENJS: e.TWEENJS,
            SOUNDJS: e.SOUNDJS,
            PRELOADJS: e.PRELOADJS,
            ZOE: e.ZOE,
            TOOLS: e.TOOLS,
            GETTING_STARTED: e.GETTING_STARTED,
            DOWNLOADS: e.DOWNLOADS,
            DOCS: {
                BASE: e.DOCS,
                EASELJS: f.EASELJS,
                TWEENJS: f.TWEENJS,
                SOUNDJS: f.SOUNDJS,
                PRELOADJS: f.PRELOADJS
            },
            DEMOS: {
                BASE: e.DEMOS,
                EASELJS: g.EASELJS,
                TWEENJS: g.TWEENJS,
                SOUNDJS: g.SOUNDJS,
                PRELOADJS: g.PRELOADJS
            },
            EXTERNAL: {
                REDDIT: h.REDDIT,
                GPLUS: h.GPLUS,
                GITHUB: h.GITHUB,
                GSKINNER: h.GSKINNER,
                TWITTER: h.TWITTER,
                BLOG: h.BLOG,
                STACK_OVERFLOW: h.STACK_OVERFLOW
            }
        }
    },
    a.AbstractModel = Backbone.Model.extend(c, b)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    a.LibraryModel = a.AbstractModel.extend(c, b)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    c.initialize = function() {
        this.set("PREFIX", "DEMOS")
    }
    ,
    a.DemosModel = a.AbstractModel.extend(c, b)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    c.initialize = function() {
        var b = "/gs_tuts/"
          , c = "GETTING_STARTED"
          , d = a.strings
          , e = {
            PREFIX: c,
            EASELJS: {
                DOCS_LINK: a.AppRouter.DOCS.EASELJS,
                ROUTE: a.AppRouter.VIEWS.EASELJS,
                NAME: "EaselJS",
                ID: "tutorial_easeljs",
                SECTIONS: [{
                    TEXT: d.get(c, "EASELJS_SECTION_1"),
                    CODE: '<script src="https://code.createjs.com/easeljs-0.8.2.min.js"></script>',
                    LANGUAGE: "markup"
                }, {
                    TEXT: d.get(c, "EASELJS_SECTION_2"),
                    CODE: '<body onload="init();">\n  <canvas id="demoCanvas" width="500" height="300"></canvas>\n</body>',
                    LANGUAGE: "markup"
                }, {
                    TEXT: d.get(c, "EASELJS_SECTION_3"),
                    CODE: "<script>\n  function init() {\n    // code here.\n  }\n</script>",
                    LANGUAGE: "markup"
                }, {
                    TEXT: d.get(c, "EASELJS_SECTION_4"),
                    CODE: 'var stage = new createjs.Stage("demoCanvas");',
                    LANGUAGE: "javascript"
                }, {
                    TEXT: d.get(c, "EASELJS_SECTION_5"),
                    CODE: 'var circle = new createjs.Shape();\ncircle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);\ncircle.x = 100;\ncircle.y = 100;\nstage.addChild(circle);',
                    LANGUAGE: "javascript"
                }, {
                    TEXT: d.get(c, "EASELJS_SECTION_6"),
                    CODE: "stage.update();",
                    LANGUAGE: "javascript"
                }, {
                    TEXT: d.get(c, "EASELJS_SECTION_7"),
                    CODE: "",
                    LANGUAGE: ""
                }],
                FULL_CODE: '<html>\n  <head>\n    <script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>\n    <script>      \n      function init() {\n        var stage = new createjs.Stage("demoCanvas");\n        var circle = new createjs.Shape();\n        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);\n        circle.x = 100;\n        circle.y = 100;\n        stage.addChild(circle);\n        stage.update();\n      }\n    </script>\n  </head>\n  <body onload="init();">\n    <canvas id="demoCanvas" width="500" height="200"></canvas>\n  </body>\n</html>',
                TUT: b + "EaselJS_Tutorial.html",
                OFFICIAL_TUTS: [{
                    TITLE: d.get(c, "EASELJS_OFFICIAL_1"),
                    LINK: "/tutorials/Inheritance/"
                }, {
                    TITLE: d.get(c, "EASELJS_OFFICIAL_2"),
                    LINK: "/tutorials/Animation%20and%20Ticker/"
                }, {
                    TITLE: d.get(c, "EASELJS_OFFICIAL_3"),
                    LINK: "/tutorials/Fonts/"
                }, {
                    TITLE: d.get(c, "EASELJS_OFFICIAL_4"),
                    LINK: "/tutorials/Mouse%20Interaction/"
                }, {
                    TITLE: d.get(c, "EASELJS_OFFICIAL_5"),
                    LINK: "/tutorials/HitTest/"
                }],
                COMMUNITY_TUTS: [{
                    TITLE: d.get(c, "EASELJS_COMMUNITY_1"),
                    LINK: "http://code.tutsplus.com/tutorials/using-createjs-easeljs--net-34840"
                }, {
                    TITLE: d.get(c, "EASELJS_COMMUNITY_2"),
                    LINK: "http://www.fabiobiondi.com/blog/2012/08/from-flash-to-javascript-to-html5-canvas-and-easel-js/"
                }, {
                    TITLE: d.get(c, "EASELJS_COMMUNITY_3"),
                    LINK: "http://small-codes.com/?p=563&preview=true&lang=en"
                }, {
                    TITLE: d.get(c, "EASELJS_COMMUNITY_4"),
                    LINK: "http://www.luxanimals.com/blog/article/combining_easel_box2d"
                }, {
                    TITLE: d.get(c, "EASELJS_COMMUNITY_5"),
                    LINK: "http://blogs.msdn.com/b/davrous/archive/2011/07/21/html5-gaming-animating-sprites-in-canvas-with-easeljs.aspx"
                }, {
                    TITLE: d.get(c, "EASELJS_COMMUNITY_6"),
                    LINK: "http://www.ilike2flash.com/2011/12/drag-and-drop-shapes-in-easeljs.html"
                }, {
                    TITLE: d.get(c, "EASELJS_COMMUNITY_7"),
                    LINK: "http://www.youtube.com/watch?v=KhJz2LmvWEg"
                }]
            },
            TWEENJS: {
                DOCS_LINK: a.AppRouter.DOCS.TWEENJS,
                ROUTE: a.AppRouter.VIEWS.TWEENJS,
                NAME: "TweenJS",
                ID: "tutorial_tweenjs",
                SECTIONS: [{
                    TEXT: d.get(c, "TWEENJS_SECTION_1"),
                    CODE: "",
                    LANGUAGE: ""
                }, {
                    TEXT: d.get(c, "TWEENJS_SECTION_2"),
                    CODE: '<script src="https://code.createjs.com/tweenjs-0.6.2.min.js"></script>',
                    LANGUAGE: "markup"
                }, {
                    TEXT: d.get(c, "TWEENJS_SECTION_3"),
                    CODE: "",
                    LANGUAGE: "javascript"
                }, {
                    TEXT: d.get(c, "TWEENJS_SECTION_4"),
                    CODE: "createjs.Tween.get(circle, { loop: true })\n  .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))\n  .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))\n  .to({ alpha: 0, y: 225 }, 100)\n  .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))\n  .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));",
                    LANGUAGE: "javascript"
                }, {
                    TEXT: d.get(c, "TWEENJS_SECTION_5"),
                    CODE: 'createjs.Ticker.setFPS(60);\ncreatejs.Ticker.addEventListener("tick", stage);',
                    LANGUAGE: "javascript"
                }, {
                    TEXT: d.get(c, "TWEENJS_SECTION_6"),
                    CODE: "",
                    LANGUAGE: ""
                }],
                FULL_CODE: '<html>\n  <head>\n    <script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>\n    <script>\n      function init() {\n        var stage = new createjs.Stage("demoCanvas");\n        var circle = new createjs.Shape();\n        circle.graphics.beginFill("Crimson").drawCircle(0, 0, 50);\n        circle.x = 100;\n        circle.y = 100;\n        stage.addChild(circle);\n        createjs.Tween.get(circle, {loop: true})\n          .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))\n          .to({alpha: 0, y: 75}, 500, createjs.Ease.getPowInOut(2))\n          .to({alpha: 0, y: 125}, 100)\n          .to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))\n          .to({x: 100}, 800, createjs.Ease.getPowInOut(2));\n        createjs.Ticker.setFPS(60);\n        createjs.Ticker.addEventListener("tick", stage);\n      }\n    </script>\n  </head>\n  <body onload="init();">\n    <canvas id="demoCanvas" width="500" height="200"></canvas>\n  </body>\n</html>',
                TUT: b + "TweenJS_Tutorial.html",
                OFFICIAL_TUTS: [],
                COMMUNITY_TUTS: [{
                    TITLE: d.get(c, "TWEENJS_COMMUNITY_1"),
                    LINK: "http://small-codes.com/?p=563&preview=true&lang=en"
                }, {
                    TITLE: d.get(c, "TWEENJS_COMMUNITY_2"),
                    LINK: "http://andysaia.com/blog/tweenjs/"
                }]
            },
            SOUNDJS: {
                DOCS_LINK: a.AppRouter.DOCS.SOUNDJS,
                ROUTE: a.AppRouter.VIEWS.SOUNDJS,
                NAME: "SoundJS",
                ID: "tutorial_soundjs",
                SECTIONS: [{
                    TEXT: d.get(c, "SOUNDJS_SECTION_1"),
                    CODE: '<script src="https://code.createjs.com/soundjs-0.6.2.min.js"></script></head>',
                    LANGUAGE: "markup"
                }, {
                    TEXT: d.get(c, "SOUNDJS_SECTION_2"),
                    CODE: '<body onload="loadSound();">\n  <button onclick="playSound();" class="playSound">Play Sound</button>\n</body>',
                    LANGUAGE: "markup"
                }, {
                    TEXT: d.get(c, "SOUNDJS_SECTION_3"),
                    CODE: "",
                    LANGUAGE: ""
                }, {
                    TEXT: d.get(c, "SOUNDJS_SECTION_4"),
                    CODE: 'var soundID = "Thunder";',
                    LANGUAGE: "javascript"
                }, {
                    TEXT: d.get(c, "SOUNDJS_SECTION_5"),
                    CODE: 'function loadSound () {\n  createjs.Sound.registerSound("assets/thunder.mp3", soundID);\n}',
                    LANGUAGE: "javascript"
                }, {
                    TEXT: d.get(c, "SOUNDJS_SECTION_6"),
                    CODE: "function playSound () {\n  createjs.Sound.play(soundID);\n}",
                    LANGUAGE: "javascript"
                }, {
                    TEXT: d.get(c, "SOUNDJS_SECTION_7"),
                    CODE: "",
                    LANGUAGE: ""
                }],
                FULL_CODE: '<html>\n  <head>\n    <script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>\n    <script>\n      var soundID = "Thunder";\n\n      function loadSound () {\n        createjs.Sound.registerSound("assets/thunder.ogg", soundID);\n      }\n\n      function playSound () {\n        createjs.Sound.play(soundID);\n      }\n    </script>\n  </head>\n  <body onload="loadSound();">\n    <button onclick="playSound();" class="playSound">Play Sound</button>\n  </body>\n</html>',
                TUT: b + "SoundJS_Tutorial.html",
                OFFICIAL_TUTS: [{
                    TITLE: d.get(c, "SOUNDJS_COMMUNITY_1"),
                    LINK: "/tutorials/Basics%20and%20Best%20Practices/"
                }, {
                    TITLE: d.get(c, "SOUNDJS_COMMUNITY_2"),
                    LINK: "/tutorials/Mobile%20Safe%20Approach/"
                }, {
                    TITLE: d.get(c, "SOUNDJS_COMMUNITY_3"),
                    LINK: "/tutorials/SoundJS%20and%20PreloadJS/"
                }],
                COMMUNITY_TUTS: []
            },
            PRELOADJS: {
                DOCS_LINK: a.AppRouter.DOCS.PRELOADJS,
                ROUTE: a.AppRouter.VIEWS.PRELOADJS,
                NAME: "PreloadJS",
                ID: "tutorial_preloadjs",
                SECTIONS: [{
                    TEXT: d.get(c, "PRELOADJS_SECTION_1"),
                    CODE: '<script src="https://code.createjs.com/preloadjs-0.6.2.min.js"></script>',
                    LANGUAGE: "markup"
                }, {
                    TEXT: d.get(c, "PRELOADJS_SECTION_2"),
                    CODE: '<button onclick="loadImage();" class="load-image">Load Image</button>',
                    LANGUAGE: "markup"
                }, {
                    TEXT: d.get(c, "PRELOADJS_SECTION_3"),
                    CODE: 'function loadImage() {\n  var preload = new createjs.LoadQueue();\n  preload.addEventListener("fileload", handleFileComplete);\n  preload.loadFile("assets/preloadjs-bg-center.png");\n}',
                    LANGUAGE: "javascript"
                }, {
                    TEXT: d.get(c, "PRELOADJS_SECTION_4"),
                    CODE: "",
                    LANGUAGE: ""
                }, {
                    TEXT: d.get(c, "PRELOADJS_SECTION_5"),
                    CODE: "function handleFileComplete(event) {\n  document.body.appendChild(event.result);\n}",
                    LANGUAGE: "javascript"
                }, {
                    TEXT: d.get(c, "PRELOADJS_SECTION_6"),
                    CODE: "",
                    LANGUAGE: ""
                }, {
                    TEXT: d.get(c, "PRELOADJS_SECTION_7"),
                    CODE: "",
                    LANGUAGE: ""
                }],
                FULL_CODE: '<html>\n  <head>\n    <script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>\n    <script>\n      function loadImage() {\n        var preload = new createjs.LoadQueue();\n        preload.addEventListener("fileload", handleFileComplete);\n        preload.loadFile("assets/preloadjs-bg-center.png");\n      }\n\n      function handleFileComplete(event) {\n        document.body.appendChild(event.result);\n      }\n    </script>\n  </head>\n  <body>\n    <button onclick="loadImage();" class="load-image">Load Image</button>\n  </body>\n</html>',
                TUT: b + "PreloadJS_Tutorial.html",
                OFFICIAL_TUTS: [],
                COMMUNITY_TUTS: [{
                    TITLE: d.get(c, "PRELOADJS_COMMUNITY_1"),
                    LINK: "http://nightlycoding.com/index.php/2012/09/image-slideshow-with-preloadjs-jquery-and-tweenmax/"
                }]
            },
            ZOE: {
                DOCS_LINK: "https://github.com/CreateJS/Zoe",
                ROUTE: a.AppRouter.VIEWS.ZOE,
                NAME: "Zoe",
                ID: "tutorial_zoe",
                SECTIONS: [],
                FULL_CODE: "",
                TUT: "",
                OFFICIAL_TUTS: [],
                COMMUNITY_TUTS: [{
                    TITLE: d.get(c, "ZOE_COMMUNITY_1"),
                    LINK: "http://www.fabiobiondi.com/blog/2012/08/createjs-zoe-create-spritesheets-in-adobe-flash-for-easeljs/"
                }, {
                    TITLE: d.get(c, "ZOE_COMMUNITY_2"),
                    LINK: "http://www.youtube.com/watch?v=uUX2E-otOUc"
                }]
            }
        };
        this.set(e)
    }
    ,
    a.GettingStartedModel = a.AbstractModel.extend(c, b)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    c.initialize = function() {
        this.set("PREFIX", "DOCS")
    }
    ,
    a.DocsModel = a.AbstractModel.extend(c, b)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    c.initialize = function() {
        var b = {
            PREFIX: "DOWNLOADS",
            CDN: {
                BASE: "https://code.createjs.com/",
                CREATEJS: "https://code.createjs.com/createjs-2015.11.26.min.js",
                EASELJS: "https://code.createjs.com/easeljs-0.8.2.min.js",
                TWEENJS: "https://code.createjs.com/tweenjs-0.6.2.min.js",
                SOUNDJS: "https://code.createjs.com/soundjs-0.6.2.min.js",
                PRELOADJS: "https://code.createjs.com/preloadjs-0.6.2.min.js"
            },
            GITHUB: {
                CREATEJS: "https://github.com/CreateJS",
                EASELJS: "https://github.com/CreateJS/EaselJS/archive/0.8.2.zip",
                TWEENJS: "https://github.com/CreateJS/TweenJS/archive/0.6.2.zip",
                SOUNDJS: "https://github.com/CreateJS/SoundJS/archive/0.6.2.zip",
                PRELOADJS: "https://github.com/CreateJS/PreloadJS/archive/0.6.2.zip"
            },
            DL_ZOE: "assets/files/" + ("Mac OS X" === a.deviceUtil.getOS() ? "ZoeMac.zip" : "ZoePC.zip"),
            DL_MADE_WITH: "assets/files/madewithcreatejs.zip"
        };
        this.set(b)
    }
    ,
    a.DownloadsModel = a.AbstractModel.extend(c, b)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    c.initialize = function() {
        this.set("PREFIX", "HOME")
    }
    ,
    a.HomeModel = a.AbstractModel.extend(c, b)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.REQUIRED_IMAGES = "assets/images/required/",
    c.initialize = function() {
        this.set("PREFIX", "TOOLS")
    }
    ,
    a.ToolsModel = a.AbstractModel.extend(c, b)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    c.initialize = function() {
        this.set("PREFIX", "ERROR")
    }
    ,
    a.ErrorModel = a.AbstractModel.extend(c, b)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.hideEvent = null,
    b.showEvent = null,
    b.btt = null,
    b.transitionManager = null,
    b.initialize = function() {
        this.transitionManager = new g.TransitionEvents(this.el),
        this.$(".img").addClass(a.deviceUtil.detectSVGSupport() ? "svg" : "png")
    }
    ,
    b.super_init = b.initialize,
    b.ready = function() {
        this.transitionManager.off(g.TransitionEvents.TRANSITION_END, this.showEvent),
        a.viewManager.isTransitioning = !1,
        this.$("a").on("click", this._handleClickRoute)
    }
    ,
    b.super_ready = b.ready,
    b.destroy = function() {
        this.transitionManager.off(g.TransitionEvents.TRANSITION_END, this.hideEvent),
        window.scroll(0, 0),
        this.$el.remove();
        for (var a in this)
            a = this[a],
            a && a.destroy && a.destroy(),
            delete this[a]
    }
    ,
    b.super_destroy = b.destroy,
    b.show = function() {
        this.showEvent = this.transitionManager.on(g.TransitionEvents.TRANSITION_END, this.ready, this),
        a.viewManager.isTransitioning = !0,
        this.$el.addClass("page-in")
    }
    ,
    b.hide = function() {
        this.hideEvent = this.transitionManager.on(g.TransitionEvents.TRANSITION_END, this.destroy, this),
        this.$el.removeClass("page-in")
    }
    ,
    b.initBTT = function() {
        this.btt = new a.BackToTop({
            el: this.$("#backToTop_template")
        }),
        this.btt.$el.on("click", g.proxy(this.handleBTTClick, this))
    }
    ,
    b.handleBTTClick = function() {
        this.goToID("header", a.Settings.Timing.GO_TO_ID)
    }
    ,
    b.super_handleBTTClick = b.handleBTTClick,
    b.initPrism = function() {
        window.Prism.highlightAll()
    }
    ,
    b.goToID = function(a, b) {
        "string" == typeof a && $("html, body").animate({
            scrollTop: $(a).offset().top
        }, b || 300, "swing")
    }
    ,
    b.showSponsors = function() {
        new a.Sponsors({
            el: this.$("#sponsors_template")[0]
        })
    }
    ,
    b._convertHTML = function(a) {
        return $("<p>").html(a).text()
    }
    ,
    b._handleClickRoute = function(b) {
        var c = b.currentTarget;
        a.isInternalLink(c) && (b.preventDefault(),
        a.router.go(c.getAttribute("href")))
    }
    ,
    a.AbstractView = g.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    var b = {}
      , c = {};
    b.maxElements = 0,
    b.maxTime = 5,
    b.element = null,
    b.nextElement = 0,
    b.activeTweens = [],
    b.hasFailed = !1,
    b.phaseTime = 1e3,
    b.initialize = function() {
        this.resizeProxy = g.proxy(this._resizeCanvas, this),
        this.initialized = !0,
        this.tickListener = createjs.Ticker.on("tick", this.handleTick, this),
        createjs.Ticker.timingMode = createjs.Ticker.RAF,
        createjs.Ticker.maxDelta = 50
    }
    ,
    b.setup = function(a, b) {
        this.canvas = a,
        this.stage = new createjs.Stage(a),
        this.banner = b,
        this.createBackground(),
        this._resizeCanvas(),
        $window.off("resize", this.resizeProxy),
        $window.on("resize", this.resizeProxy)
    }
    ,
    b.enableParent = function(a, b, c) {
        this.stage = new createjs.Container,
        this.homeStage = a,
        this.canvas = b,
        this.banner = c,
        this.createBackground(),
        this._resizeCanvas(),
        this.homeStage.addChild(this.stage),
        $window.off("resize", this.resizeProxy),
        $window.on("resize", this.resizeProxy)
    }
    ,
    b.destroy = function() {
        createjs.Ticker.off("tick", this.tickListener),
        this.stage.removeAllChildren()
    }
    ,
    b.phaseIn = function() {
        createjs.Tween.get(this.stage).to({
            alpha: 1
        }, this.phaseTime, createjs.Ease.linear)
    }
    ,
    b.phaseOut = function() {
        createjs.Tween.get(this.stage).to({
            alpha: 0
        }, this.phaseTime, createjs.Ease.linear)
    }
    ,
    b.handleFail = function() {
        this.hasFailed || (this.hasFailed = !0,
        $(this.canvas).fadeOut(2e3, g.proxy(this.destroy, this)))
    }
    ,
    b._resizeCanvas = function() {
        this.canvas.width = this.width = this.banner.width(),
        this.canvas.height = this.height = this.banner.height(),
        this.handleResize()
    }
    ,
    a.Backgrounds = a.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    var b = {}
      , c = {};
    b.displayTime = 1e4,
    b.createBackground = function() {
        this.model = new Backbone.Model({
            color: "rgba(255,255,144,1)",
            gradient: ["rgba(255,255,144,1)", "rgba(255,210,12,1)"]
        }),
        this.bg1 = new a.EaselJSBackground({
            model: this.model
        }),
        this.bg1.enableParent(this.stage, this.canvas, this.banner),
        this.active = 0,
        this.bgs = [this.bg1],
        this.createInterval = createjs.Tween.get(null, {
            loop: !0
        }).wait(this.displayTime).call(this.createEach, [], this)
    }
    ,
    b.createEach = function() {
        if (this.active < 3)
            switch (this.active++,
            this.active) {
            case 1:
                this.bg1.phaseOut(),
                setTimeout(g.proxy(function() {
                    this.bg2 = new a.TweenJSBackground({
                        model: this.model
                    }),
                    this.bg2.enableParent(this.stage, this.canvas, this.banner),
                    this.bgs.push(this.bg2)
                }, this), this.phaseTime);
                break;
            case 2:
                this.bg2.phaseOut(),
                setTimeout(g.proxy(function() {
                    this.bg3 = new a.SoundJSBackground({
                        model: this.model
                    }),
                    this.bg3.enableParent(this.stage, this.canvas, this.banner),
                    this.bgs.push(this.bg3)
                }, this), this.phaseTime);
                break;
            case 3:
                this.bg3.phaseOut(),
                setTimeout(g.proxy(function() {
                    this.bg4 = new a.PreloadJSBackground({
                        model: this.model
                    }),
                    this.bg4.enableParent(this.stage, this.canvas, this.banner),
                    this.bgs.push(this.bg4)
                }, this), this.phaseTime)
            }
        else
            this.createInterval.setPaused(!0),
            createjs.Tween.removeTweens(this.createInterval),
            this.loopBackgrounds(),
            this.loopInterval = createjs.Tween.get(null, {
                loop: !0
            }).wait(this.displayTime).call(this.loopBackgrounds, [], this)
    }
    ,
    b.loopBackgrounds = function() {
        var a = this.bgs[this.active];
        return a.hasFailed ? (this.loopInterval.setPaused(!0),
        createjs.Tween.removeTweens(this.loopInterval),
        void this.handleFail()) : (a.phaseOut(),
        void setTimeout(g.proxy(function() {
            3 == this.active ? this.active = 0 : this.active++,
            this.stage.autoClear = 3 != this.active,
            this.bgs[this.active].phaseIn()
        }, this), this.phaseTime))
    }
    ,
    b.handleTick = function() {}
    ,
    b.handleResize = function() {
        this.stage.update()
    }
    ,
    a.HomeBackground = a.Backgrounds.extend(b, c)
}(window.cjs),
function(a) {
    var b = {}
      , c = {};
    b.createBackground = function() {
        this.gradient = this.model ? this.model.get("gradient") : ["rgba(190,243,242,1)", "rgba(23,201,233,1)"]
    }
    ,
    b.handleTick = function(a) {
        var b = createjs.Ticker.getMeasuredTickTime(20);
        this.nextElement -= a.delta,
        this.stage.numChildren < this.maxElements && b < this.maxTime && this.nextElement <= 0 && this.addElement(),
        b > this.maxTime && this.stage.numChildren < .5 * this.maxElements && createjs.Ticker.getTicks() > 20 && ++this.failCount > 3 ? this.handleFail() : this.failCount = 0,
        this.homeStage ? this.homeStage.update() : this.stage.update()
    }
    ,
    b.addElement = function() {
        var a = this.getElement();
        this.stage.addChild(a),
        this.resetElement(a),
        this.nextElement = Rnd(5e3, 1e4) / this.maxElements
    }
    ,
    b.resetElement = function(a) {
        var b = Rnd(3e3, 7e3)
          , c = Rnd(.5, 1)
          , d = Rnd(-.2, .2);
        a._x = Rnd(),
        a.y = this.height,
        a.alpha = 0,
        a.scaleX = a.scaleY = c,
        createjs.Tween.get(a, {
            override: !0
        }).to({
            alpha: 1,
            y: this.height / 2,
            _x: a._x + d / 2
        }, b).to({
            alpha: 0,
            y: 0,
            _x: a._x + d
        }, b).call(this.removeElement, [a], this).on("change", this.handleChange, this)
    }
    ,
    b.removeElement = function(a) {
        this.stage.removeChild(a)
    }
    ,
    b.handleChange = function(a) {
        var b = a.target.target;
        b.x = b._x * this.width
    }
    ,
    b.getElement = function() {
        if (!this.element) {
            this.element = new createjs.Shape;
            var a = Math.min(150, this.height / 3);
            this.element.graphics.lf(this.gradient, [0, 1], -a, -a, a, a).r(-a, -a, 2 * a, 2 * a),
            this.element.cache(-a, -a, 2 * a, 2 * a),
            this.element.rotation = 45
        }
        return this.element.clone()
    }
    ,
    b.handleResize = function() {
        if (this.initialized) {
            var a = this.width
              , b = this.height;
            this.maxElements = a * b / 45e3,
            this.homeStage ? this.homeStage.update() : this.stage.update()
        }
    }
    ,
    a.EaselJSBackground = a.Backgrounds.extend(b, c)
}(window.cjs),
function(a) {
    var b = {}
      , c = {};
    b.createBackground = function() {
        this.color = this.model ? this.model.get("color") : "#FF2A56",
        this.powOut1 = createjs.Ease.getPowOut(1.1),
        this.powOut2 = createjs.Ease.getPowOut(3),
        this.powOut3 = createjs.Ease.getPowOut(4),
        this.powIn1 = createjs.Ease.getPowIn(1.1),
        this.powIn2 = createjs.Ease.getPowIn(3),
        this.powIn3 = createjs.Ease.getPowIn(4)
    }
    ,
    b.handleTick = function(a) {
        var b = createjs.Ticker.getMeasuredTickTime(20);
        this.nextElement -= a.delta,
        this.stage.numChildren < this.maxElements && b < this.maxTime && this.nextElement <= 0 && this.addElement(),
        b > this.maxTime && this.stage.numChildren < .5 * this.maxElements && createjs.Ticker.getTicks() > 20 && ++this.failCount > 3 ? this.handleFail() : this.failCount = 0,
        this.homeStage ? this.homeStage.update() : this.stage.update()
    }
    ,
    b.addElement = function() {
        var a = this.getElement();
        this.stage.addChild(a),
        this.resetElement(a),
        this.nextElement = Rnd(4e3, 8e3) / this.maxElements
    }
    ,
    b.resetElement = function(a) {
        var b = a._x = Rnd()
          , c = a.getChildAt(0);
        c.scaleX = c.scaleY = Rnd(.3, 1);
        var d = this.size * c.scaleX
          , e = a.y = 2 * -d;
        a.alpha = .6 * c.scaleX;
        var f = Rnd(2e3, 3e3)
          , g = .7 * Rnd(-1, 1)
          , h = this.height - .45 * d
          , i = g / 3.5;
        a.rotation = -i;
        var j = f / 2
          , k = .46 * f
          , l = .04 * f;
        createjs.Tween.get(a).to({
            _x: b + g,
            rotation: 0
        }, j, this.powOut1).to({
            _x: b + 2 * g,
            rotation: i
        }, j, this.powIn1),
        createjs.Tween.get(a).to({
            y: h
        }, j, this.powIn2).to({
            y: e
        }, j, this.powOut2).call(this.removeElement, [a], this).on("change", this.handleChange, this),
        createjs.Tween.get(a).to({
            scaleX: 1,
            scaleY: 1.1
        }, k, createjs.Ease.linear).to({
            scaleX: 1.5,
            scaleY: .5
        }, l, this.powIn3).to({
            scaleX: 1,
            scaleY: 1.1
        }, l, this.powOut3).to({
            scaleX: 1,
            scaleY: 1
        }, k, createjs.Ease.linear)
    }
    ,
    b.removeElement = function(a) {
        this.stage.removeChild(a)
    }
    ,
    b.handleChange = function(a) {
        var b = a.target.target;
        b.x = b._x * this.width
    }
    ,
    b.getElement = function() {
        if (!this.element) {
            this.element = new createjs.Container;
            var a = this.element.addChild(new createjs.Shape)
              , b = this.size = 70;
            a.graphics.beginFill(this.color).drawCircle(0, 0, b),
            a.cache(-b, -b, b, b)
        }
        return this.element.clone(!0)
    }
    ,
    b.handleResize = function() {
        if (this.initialized) {
            var a = this.width
              , b = this.height;
            this.maxElements = a * b / 8e3,
            this.homeStage ? this.homeStage.update() : this.stage.update()
        }
    }
    ,
    a.TweenJSBackground = a.Backgrounds.extend(b, c)
}(window.cjs),
function(a) {
    var b = {}
      , c = {};
    b.createBackground = function() {
        for (this.stage.removeAllChildren(),
        this.color = this.model ? this.model.get("color") : "#82FFCB",
        this.failCount = this.bars = 0,
        this.width = this.banner.width(),
        this.height = this.banner.height(),
        this.parent ? this.parent.removeAllChildren() : this.parent = new createjs.Container,
        this.barCount = (this.width - .2 * this.width) / 70 - 1 | 0; this.bars <= this.barCount; )
            this.addElement(),
            this.bars++;
        this.stage.addChild(this.parent)
    }
    ,
    b.handleTick = function(a) {
        var b = createjs.Ticker.getMeasuredTickTime(20);
        b > this.maxTime && createjs.Ticker.getTicks() > 20 && ++this.failCount > 3 ? this.handleFail() : this.failCount = 0,
        this.homeStage ? this.homeStage.update() : this.stage.update()
    }
    ,
    b.addElement = function() {
        var a = this.getElement();
        this.parent.addChild(a),
        this.resetElement(a),
        a.alpha = .4
    }
    ,
    b.resetElement = function(a) {
        a.x = 70 * this.bars,
        a.y = this.height / 2,
        a.scaleY = Rnd(.1, .3),
        setTimeout(g.proxy(function() {
            this.animateSound(a)
        }, this), Rnd(0, 300))
    }
    ,
    b.animateSound = function(a) {
        createjs.Tween.get(a, {
            override: !0
        }).to({
            scaleY: Rnd(.9, 1.1)
        }, Rnd(100, 250), createjs.Ease.getPowIn(2.5)).wait(Rnd(50, 100)).to({
            scaleY: Rnd(.1, .3)
        }, Rnd(600, 800), createjs.Ease.getPowOut(2.5)).wait(Rnd(50, 100)).call(this.animateSound, [a], this)
    }
    ,
    b.removeElement = function(a) {
        this.stage.removeChild(a)
    }
    ,
    b.handleChange = function(a) {
        var b = a.target.target;
        b.x = b._x * this.width
    }
    ,
    b.getElement = function() {
        if (!this.element) {
            this.element = new createjs.Shape;
            var a = 60
              , b = this.height / 1.5;
            this.element.graphics.beginFill(this.color).r(-a / 2, -b / 2, a, b),
            this.element.cache(-a / 2, -b / 2, a, b)
        }
        return this.element.clone()
    }
    ,
    b.centerContainer = function() {
        this.parent.x = (this.width - (70 * this.barCount - 10)) / 2
    }
    ,
    b.handleResize = function() {
        this.initialized && (this.createBackground(),
        this.centerContainer(),
        this.homeStage ? this.homeStage.update() : this.stage.update())
    }
    ,
    a.SoundJSBackground = a.Backgrounds.extend(b, c)
}(window.cjs),
function(a) {
    var b = {}
      , c = {};
    b.createBackground = function() {
        this.homeStage ? this.homeStage.autoClear = !1 : this.stage.autoClear = !1,
        this.gradient = ["hsla(304,24%,100%,1)", "hsla(299,55%,90%,1)"],
        this.block = this.stage.addChild(new createjs.Shape((new createjs.Graphics).f("rgba(255,0,0,0.1)").r(0, 0, 100, 100)).set({
            compositeOperation: "destination-out"
        })),
        this.square = null,
        this.elementSize = 0,
        this.pool = [],
        this.spacing = 2,
        this.numSquares = 10,
        this.blockT = 0,
        this.rows = [],
        this.failCount = 0
    }
    ,
    b.handleTick = function(a) {
        var b = a.delta
          , c = createjs.Ticker.getMeasuredTickTime(20);
        this.nextElement -= b,
        this.stage.numChildren < this.maxElements && c < this.maxTime && this.nextElement <= 0 && this.addElement(),
        c > this.maxTime && this.stage.numChildren < .1 * this.maxElements && createjs.Ticker.getTicks() > 20 && ++this.failCount > 3 ? this.handleFail() : this.failCount = 0,
        this.block.visible = this.blockT < 0,
        this.blockT += this.blockT < 0 ? 100 : -b,
        this.homeStage ? this.homeStage.update() : this.stage.update()
    }
    ,
    b.addElement = function() {
        var a = this.getElement();
        this.stage.addChild(a),
        this.resetElement(a),
        this.nextElement = Rnd(200, 400) / this.maxElements + Rnd(16)
    }
    ,
    b.resetElement = function(a) {
        var b = this.elementSize + this.spacing
          , c = this.height / b | 0
          , d = this.height - c * b >> 1;
        if (!this.rows.length) {
            for (var e = 0; c > e; e++)
                this.rows[e] = e;
            Rnd.shuffle(this.rows)
        }
        a.x = ((Rnd(this.width - this.numSquares / 2 * b) - b) / b | 0) * b,
        a.y = this.rows.pop() * b + d,
        a.timeline.gotoAndPlay(0)
    }
    ,
    b.removeElement = function(a) {
        this.stage.removeChild(a),
        a.timeline.setPaused(!0),
        this.pool.push(a)
    }
    ,
    b.getElement = function() {
        if (this.pool.length)
            return this.pool.pop();
        this.elementSize || (this.elementSize = this.height / 15 | 0);
        var a = new createjs.Container
          , b = this.elementSize
          , c = this.spacing
          , d = a.timeline = new createjs.Timeline;
        a.rotation = -this.angle;
        for (var e = Rnd(70, 100), f = Rnd(500), g = 0; g < this.numSquares; g++) {
            var h = a.addChild(this.getSquare());
            h.x = g * (b + c);
            var i = createjs.Tween.get(h).wait(g * e + f).to({
                alpha: Rnd(.1, .15)
            }, 60).to({
                alpha: 0
            });
            d.addTween(i)
        }
        return i.call(this.removeElement, [a], this),
        d.setPaused(!0),
        a
    }
    ,
    b.getSquare = function() {
        if (!this.square) {
            var a = this.square = new createjs.Shape
              , b = this.elementSize;
            this.homeStage ? a.graphics.beginFill("rgba(255,255,144,1)").r(0, 0, b, b) : a.graphics.lf(this.gradient, [0, 1], 0, 0, b, b).r(0, 0, b, b),
            a.cache(0, 0, b, b),
            a.size = b,
            a.alpha = 0
        }
        return this.square.clone()
    }
    ,
    b.handleResize = function() {
        if (this.initialized) {
            var a = this.width
              , b = this.height;
            this.maxElements = a * b / 2500 / this.numSquares,
            this.block.scaleX = a / 100,
            this.block.scaleY = b / 100,
            this.homeStage ? this.homeStage.update() : this.stage.update()
        }
    }
    ,
    a.PreloadJSBackground = a.Backgrounds.extend(b, c)
}(window.cjs),
function(a) {
    var b = {}
      , c = {};
    b.createBackground = function() {
        this.gradient = this.model ? this.model.get("gradient") : ["rgba(244,255,82,1)", "rgba(182,235,30,1)"]
    }
    ,
    b.handleTick = function(a) {
        var b = createjs.Ticker.getMeasuredTickTime(20);
        this.nextElement -= a.delta,
        this.stage.numChildren < this.maxElements && b < this.maxTime && this.nextElement <= 0 && this.addElement(),
        b > this.maxTime && this.stage.numChildren < .5 * this.maxElements && createjs.Ticker.getTicks() > 20 && ++this.failCount > 3 ? this.handleFail() : this.failCount = 0,
        this.homeStage ? this.homeStage.update() : this.stage.update()
    }
    ,
    b.addElement = function() {
        var a = this.getElement();
        this.stage.addChild(a),
        this.resetElement(a),
        this.nextElement = Rnd(7500, 15e3) / this.maxElements
    }
    ,
    b.resetElement = function(a) {
        a._x = Rnd(),
        a.y = this.height + 90,
        a.alpha = Rnd(.6, 1),
        createjs.Tween.get(a, {
            override: !0
        }).to({
            y: -this.height
        }, Rnd(8e3, 2e4)).call(this.removeElement, [a], this).on("change", this.handleChange, this)
    }
    ,
    b.removeElement = function(a) {
        this.stage.removeChild(a)
    }
    ,
    b.handleChange = function(a) {
        var b = a.target.target;
        b.x = b._x * this.width
    }
    ,
    b.getElement = function() {
        if (!this.element) {
            this.element = new createjs.Shape;
            var a = 60
              , b = 90;
            this.element.graphics.lf(this.gradient, [0, 1], -a, -b, a, b).r(-a, -b, 2 * a, 2 * b),
            this.element.cache(-a, -b, 2 * a, 2 * b)
        }
        return this.element.clone()
    }
    ,
    b.handleResize = function() {
        if (this.initialized) {
            var a = this.width
              , b = this.height;
            this.maxElements = a * b / 15e3,
            this.homeStage ? this.homeStage.update() : this.stage.update()
        }
    }
    ,
    a.ZoeBackground = a.Backgrounds.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.projects = null,
    b.bg = null,
    b.updates = null,
    b.initialize = function() {
        this.setTemplate(a.Templates.HOME),
        this.projects = new a.Carousel({
            el: this.$("#project_template"),
            model: new Backbone.Model({
                PROJECT_FILTER: "c"
            })
        }),
        this.updates = new a.RecentUpdates({
            el: this.$("#updates_template"),
            model: new Backbone.Model({
                UPDATES: a.strings.get(this.model.get("PREFIX"), "UPDATE")
            })
        }),
        this.showSponsors(),
        this.super_init()
    }
    ,
    b.ready = function() {
        this.super_ready(),
        this.initPrism(),
        this.initBTT(),
        this.createBackground();
        var a = this;
        window.twttr.ready(function(b) {
            b.events.bind("loaded", function(b) {
                a.injectTwitterStyles()
            }),
            b.widgets.load()
        })
    }
    ,
    b.destroy = function() {
        this.bg.destroy(),
        this.super_destroy()
    }
    ,
    b.createBackground = function() {
        this.bg = new a.HomeBackground,
        this.bg.setup(this.$("#stage")[0], this.$("#banner"))
    }
    ,
    b.injectTwitterStyles = function() {
        var a = document.createElement("style");
        a.type = "text/css",
        $.get("assets/files/twitter.css", g.proxy(function(b) {
            a.innerHTML = b;
            var c = this.$("iframe.twitter-timeline")[0].contentWindow;
            c && c.document.head.appendChild(a)
        }, this))
    }
    ,
    a.HomeView = a.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.activeLibrary = null,
    b.bg = null,
    b.updates = null,
    b.projects = null,
    b.initialize = function() {
        this.setTemplate(a.Templates.LIBRARY),
        this.projects = new a.Carousel({
            el: this.$("#project_template"),
            model: new Backbone.Model({
                PROJECT_FILTER: this.model.get("PROJECT_FILTER")
            })
        }),
        this.activeLibrary = this.model.get("NAME"),
        this.activeLibrary === a.LibraryData.ZOE.NAME && this.handleZoe(),
        this.getLatestFromGithub(),
        this.updates = new a.RecentUpdates({
            el: this.$("#updates_template"),
            model: new Backbone.Model({
                UPDATES: a.strings.get(this.model.get("PREFIX"), "UPDATE")
            })
        }),
        this.showSponsors(),
        this.super_init()
    }
    ,
    b.ready = function() {
        this.super_ready(),
        this.createBackground(),
        this.initBTT()
    }
    ,
    b.createBackground = function() {
        this.bg = new a[this.activeLibrary + "Background"],
        this.bg.setup(this.$("#stage")[0], this.$("#banner"))
    }
    ,
    b.destroy = function() {
        this.bg.destroy(),
        this.super_destroy()
    }
    ,
    b.getLatestFromGithub = function() {
        var a = "/php/jsonProxy.php?url=https://api.github.com/repositories/" + this.model.get("REPO_ID") + "/commits";
        $.get(a, g.proxy(this._injectCommitData, this))
    }
    ,
    b._injectCommitData = function(a) {
        if (a && a.contents)
            for (var b, c, d = $('<div class="commit"><p class="description"></p><a class="link-inline">View Commit</a></div>'), e = 0; 2 > e; e++)
                b = a.contents[e],
                c = d.clone(),
                c.children(".description").text(b.commit.message),
                c.children("a").attr("href", b.html_url),
                this.$(".commit_container").append(c)
    }
    ,
    b.handleZoe = function() {
        this.activeLibrary = "Zoe",
        this.$(".library_demo").remove(),
        this.$(".buttons > a").eq(1).hide(),
        this.projects.disable()
    }
    ,
    a.LibraryView = a.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.initialize = function() {
        this.setTemplate(a.Templates.TOOLS),
        this.showSponsors(),
        this.super_init()
    }
    ,
    b.ready = function() {
        this.super_ready(),
        this.initBTT()
    }
    ,
    a.ToolsView = a.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.dialog = null,
    b.initialize = function() {
        this.setTemplate(a.Templates.DOWNLOADS),
        this.dialog = new a.Dialog({
            el: this.$("#dialog_template")
        }),
        this._dialogProxy = g.proxy(this.createDialog, this),
        this._copyProxy = g.proxy(this._handleCopy, this),
        this._downloadProxy = g.proxy(this._handleDownload, this),
        this.super_init()
    }
    ,
    b.ready = function() {
        this.super_ready(),
        this.initBTT();
        var a = this.$(".copy-to-clipboard");
        if (this.detectSWFSupport()) {
            ZeroClipboard.config({
                swfPath: "/assets/files/ZeroClipboard.swf"
            });
            var b = new ZeroClipboard(a);
            b.on("copy", this._copyProxy),
            b.on("aftercopy", this._handleAfterCopy)
        } else
            a.on("click", this._dialogProxy);
        this.$(".link-download").on("click", this._downloadProxy)
    }
    ,
    b.createDialog = function(a) {
        this.sendAnalyticsEvent("CDN", a.currentTarget.getAttribute("data-target")),
        this.dialog.setup("Copy CDN URL", a.currentTarget.getAttribute("data-download-link"))
    }
    ,
    b.detectSWFSupport = function() {
        function a(a) {
            return a = a.match(/[\d]+/g),
            a.length = 3,
            a.join(".")
        }
        var b = !1
          , c = "";
        if (navigator.plugins && navigator.plugins.length) {
            var d = navigator.plugins["Shockwave Flash"];
            d && (b = !0,
            d.description && (c = a(d.description))),
            navigator.plugins["Shockwave Flash 2.0"] && (b = !0,
            c = "2.0.0.11")
        } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
            var e = navigator.mimeTypes["application/x-shockwave-flash"];
            (b = e && e.enabledPlugin) && (c = a(e.enabledPlugin.description))
        } else
            try {
                var f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
                  , b = !0
                  , c = a(f.GetVariable("$version"))
            } catch (g) {
                try {
                    f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),
                    b = !0,
                    c = "6.0.21"
                } catch (h) {
                    try {
                        f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
                        b = !0,
                        c = a(f.GetVariable("$version"))
                    } catch (i) {}
                }
            }
        return b
    }
    ,
    b.sendAnalyticsEvent = function(a, b) {
        window.ga("send", "event", "download", a, b)
    }
    ,
    b._handleDownload = function(a) {
        this.sendAnalyticsEvent("Download", a.currentTarget.getAttribute("data-target"))
    }
    ,
    b._handleCopy = function(a) {
        a.clipboardData.setData("text/plain", a.target.getAttribute("data-download-link")),
        this.sendAnalyticsEvent("CDN", a.target.getAttribute("data-target"))
    }
    ,
    b._handleAfterCopy = function(b) {
        var c = $(b.target);
        c.addClass("copyAlert-shown"),
        setTimeout(function() {
            c.removeClass("copyAlert-shown")
        }, a.Settings.Timing.COPY_ALERT)
    }
    ,
    a.DownloadsView = a.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.sidebar = null,
    b.tutorials = null,
    b.tutsToggle = null,
    b.tutsCode = null,
    b.scrollY = null,
    b.activeIndex = null,
    b.items = null,
    b._scrollProxy = null,
    b.overrideIndent = !1,
    b.initialize = function() {
        this.setTemplate(a.Templates.GETTING_STARTED),
        this.super_init(),
        this.renderTutorials(),
        this._scrollProxy = g.proxy(this.handleScroll, this),
        this.sidebar = this.$("#sidebar"),
        this.items = this.$(".sidebar_container").children(),
        this.tutorials = this.$(".dropdown"),
        this.tutsToggle = this.$(".dropdown_title"),
        this.tutsCode = this.$(".show-code"),
        this.model.set("sections", [this.$("#" + this.model.get("EASELJS").ID), this.$("#" + this.model.get("TWEENJS").ID), this.$("#" + this.model.get("SOUNDJS").ID), this.$("#" + this.model.get("PRELOADJS").ID), this.$("#" + this.model.get("ZOE").ID)])
    }
    ,
    b.ready = function() {
        this.super_ready(),
        this.initPrism(),
        this.initBTT(),
        this.tutsToggle.on("click", g.proxy(this.toggleTutorials, this)),
        this.tutsCode.on("click", g.proxy(this.toggleCode, this)),
        this.items.on("click", g.proxy(this.handleLibraryClick, this)),
        $window.on("scroll", this._scrollProxy),
        this.model.set("positions", this.getLibraryPositions()),
        this.override();
        var a = this.model.get("scrollTo");
        null !== a && this.goToID("#tutorial_" + a, 0)
    }
    ,
    b.destroy = function() {
        $window.off("scroll", this._scrollProxy),
        this.sidebar.removeClass("sticky-sidebar"),
        this.$(".active").removeClass("active"),
        this.super_destroy()
    }
    ,
    b.handleParams = function(a) {
        this.model.set("scrollTo", a[0])
    }
    ,
    b.renderTutorials = function() {
        for (var b, c, d = this.$(".content_container"), e = ["EASELJS", "TWEENJS", "SOUNDJS", "PRELOADJS", "ZOE"], f = a.Tutorials, g = Backbone.Model, h = 0, i = e.length; i > h; h++)
            c = this.model.get(e[h]),
            c.IMAGE = this.model.get("IMAGE"),
            b = new f({
                model: new g(c)
            }),
            d.append(b.el)
    }
    ,
    b.toggleTutorials = function(a) {
        $(a.currentTarget).parent().toggleClass("closed")
    }
    ,
    b.toggleCode = function(a) {
        var b = $(a.currentTarget)
          , c = b.siblings(".codeBox");
        c.toggleClass("closed"),
        b.text(c.hasClass("closed") ? "Show Code" : "Hide Code")
    }
    ,
    b.getLibraryPositions = function() {
        var a = this.items
          , b = this.model.get("sections");
        return [{
            $el: a.eq(0),
            fromTop: b[0].offset().top
        }, {
            $el: a.eq(1),
            fromTop: b[1].offset().top
        }, {
            $el: a.eq(2),
            fromTop: b[2].offset().top
        }, {
            $el: a.eq(3),
            fromTop: b[3].offset().top
        }, {
            $el: a.eq(4),
            fromTop: b[4].offset().top
        }]
    }
    ,
    b.indentLibrary = function() {
        var a = this.model.get("positions")
          , b = this.activeIndex;
        if (!(this.overrideIndent || null !== b && this.scrollY > a[b].fromTop && a[b + 1].fromTop > this.scrollY)) {
            this.$(".active").removeClass("active");
            var c = this.getCurrentLibrary();
            c && c.addClass("active")
        }
    }
    ,
    b.getCurrentLibrary = function() {
        var a, b = this.model.get("positions");
        for (a = b.length - 1; a >= 0; a--)
            if (this.scrollY >= b[a].fromTop)
                return this.activeIndex = a,
                b[a].$el;
        this.activeIndex = null
    }
    ,
    b.override = function() {
        this.overrideIndent = !0,
        this.$(".active").removeClass("active"),
        setTimeout(g.proxy(function() {
            this.overrideIndent = !1,
            this.indentLibrary()
        }, this), a.Settings.Timing.GO_TO_ID)
    }
    ,
    b.handleLibraryClick = function(b) {
        var c = b.currentTarget;
        this.override(),
        $(c).addClass("active"),
        this.goToID("#" + this.model.get("sections")[this.items.index(c)].attr("id"), a.Settings.Timing.GO_TO_ID)
    }
    ,
    b.handleScroll = function() {
        this.scrollY = window.scrollY,
        this.model.get("positions")[0].fromTop < this.scrollY ? this.sidebar.addClass("sticky-sidebar") : this.sidebar.removeClass("sticky-sidebar"),
        this.indentLibrary()
    }
    ,
    b.handleBTTClick = function() {
        this.override(),
        this.super_handleBTTClick()
    }
    ,
    a.GettingStartedView = a.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.initialize = function() {
        this.setTemplate(a.Templates.DOCS),
        this.showSponsors(),
        this.super_init()
    }
    ,
    b.ready = function() {
        this.super_ready(),
        this.initBTT()
    }
    ,
    a.DocsView = a.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.isMenuOpen = !1,
    b.isCodemirrorOpen = !1,
    b.isNewDemo = !0,
    b.isNewList = !0,
    b.isHiddenDemo = !1,
    b.proxy = {
        demoClick: null,
        listClick: null,
        toggleMenu: null,
        toggleCodemirror: null,
        arrowClick: null,
        run: null,
        reset: null,
        download: null,
        load: null,
        resize: null,
        iframeClick: null
    },
    b.info = null,
    b.listContainer = null,
    b.editable = null,
    b.codemirror = null,
    b.activeList = null,
    b.activeDemo = null,
    b.activeIndex = null,
    b.runCount = null,
    b.queue = null,
    b.initialize = function() {
        this.setTemplate(a.Templates.DEMOS),
        this.prefix = this.model.get("PREFIX"),
        this.renderDemoLists(),
        this.proxy = {
            demoClick: g.proxy(this.handleDemoClick, this),
            demoScroll: g.proxy(this.handleDemoScroll, this),
            listClick: g.proxy(this.handleListClick, this),
            toggleMenu: g.proxy(this.toggleMenu, this),
            toggleCodemirror: g.proxy(this.toggleCodemirror, this),
            arrowClick: g.proxy(this.handleDemoArrowClick, this),
            run: g.proxy(this.handleRunClick, this),
            reset: g.proxy(this.handleResetClick, this),
            download: g.proxy(this.handleGithubClick, this),
            load: g.proxy(this.handleStageReady, this),
            resize: g.proxy(this.handleResize, this),
            iframeClick: g.proxy(this.handleIFrameClick, this)
        },
        this.$(".list").on("click", this.proxy.listClick),
        this.info = {
            $el: this.$("#info"),
            lib: this.$(".active_library"),
            title: this.$(".active_demo"),
            index: this.$(".active_index"),
            total: this.$(".active_total")
        },
        this.info.$el.on("click", this.proxy.toggleMenu),
        this.listContainer = this.$(".list_container"),
        this.activeStage = this.$("#stage"),
        this.demoListPrevious = this.$(".demoList_arrow.previous"),
        this.demoListNext = this.$(".demoList_arrow.next"),
        this.$(".demo_arrow").on("click", this.proxy.arrowClick),
        this.$(".toggle").on("click", this.proxy.toggleCodemirror),
        this.$(".run").on("click", this.proxy.run),
        this.$(".reset").on("click", this.proxy.reset),
        this.$(".download").on("click", this.proxy.download),
        this.$(".demoList_arrow").on("click", this.proxy.demoScroll),
        this.demoListPrevious.hide(),
        this.demoScrollIndex = 0,
        this.initCodemirror(),
        this.queue = new createjs.LoadQueue(!0),
        this.queue.on("complete", this.handleSourceLoad, this),
        this.super_init()
    }
    ,
    b.ready = function() {
        this.super_ready(),
        $window.on("resize", this.proxy.resize),
        this.handleResize()
    }
    ,
    b.destroy = function() {
        this.isMenuOpen && this.toggleMenu(),
        this.isCodemirrorOpen && this.toggleCodemirror(),
        $window.off("resize", this.proxy.resize),
        this.super_destroy()
    }
    ,
    b.handleParams = function(a) {
        var b = a[0]
          , c = this.model.get("lists");
        if (null !== b) {
            var d = c[b.toUpperCase()];
            if (void 0 !== d && null !== d) {
                this.setActiveList(d);
                var e = a[1];
                if (null !== e) {
                    var f, g, h;
                    for (g = 0,
                    h = d.demos.length; h > g; g++)
                        if (f = d.demos[g],
                        e === this.parseURL(f.SOURCE, !0, !0))
                            return this.isHiddenDemo = !1,
                            void this.setActiveDemo(f, g);
                    for (g = 0,
                    h = d.hidden.length; h > g; g++)
                        if (f = d.hidden[g],
                        e === this.parseURL(f.SOURCE, !0, !0))
                            return this.isHiddenDemo = !0,
                            this.$(".demo_arrow").hide(),
                            void this.setActiveDemo(f, 0)
                }
                return void this.setActiveDemo(d.demos[0], 0)
            }
        }
        this.setActiveList(c.EASELJS),
        this.setActiveDemo(this.activeList.demos[0], 0)
    }
    ,
    b.renderDemoLists = function() {
        var b = a.DemoList
          , c = Backbone.Model
          , d = a.LibraryData;
        this.model.set("lists", {
            EASELJS: new b({
                model: new c(d.EASELJS.DEMOS)
            }),
            TWEENJS: new b({
                model: new c(d.TWEENJS.DEMOS)
            }),
            SOUNDJS: new b({
                model: new c(d.SOUNDJS.DEMOS)
            }),
            PRELOADJS: new b({
                model: new c(d.PRELOADJS.DEMOS)
            })
        })
    }
    ,
    b.initCodemirror = function() {
        var b = {
            mode: "javascript",
            theme: "createjs",
            lineNumbers: !0,
            dragDrop: !1,
            indentUnit: 4
        };
        a.deviceUtil.isMobileDevice() ? (b.readOnly = "nocursor",
        this.$("#cm_text").text(this.model.set("toggleText", a.strings.get(this.prefix, "VIEW_SOURCE")).get("toggleText")),
        this.$(".run, .reset").hide()) : this.model.set("toggleText", a.strings.get(this.prefix, "LIVE_EDIT")),
        this.codemirror = window.CodeMirror.fromTextArea(this.$(".code_element")[0], b)
    }
    ,
    b.setActiveList = function(b) {
        var c = a.DemoList.EVENT_DEMO_CLICKED;
        this.activeList && this.activeList.off(c),
        this.activeList = b,
        this.listContainer.html(b.el),
        this.activeList.on(c, this.proxy.demoClick),
        this.resetDemoList()
    }
    ,
    b.setActiveDemo = function(a, b) {
        this.runCount = 0,
        this.activeIndex = b,
        this.activeDemo = a,
        this.updateInfo(a, b),
        this.isMenuOpen && this.toggleMenu(),
        this.queue.loadFile({
            src: a.SOURCE,
            id: "demo"
        }),
        this.activeStage.hide()
    }
    ,
    b.loadNewStage = function(a) {
        var b = document.createElement("iframe");
        b.id = "stage",
        b.setAttribute("frameborder", "0"),
        b.setAttribute("scrolling", "no"),
        this.activeStage.replaceWith(b),
        this.activeStage = this.$("#stage"),
        this.activeStage.on("load", this.proxy.load);
        var c = b.contentDocument;
        c.open(),
        c.write(a),
        c.close()
    }
    ,
    b.handleStageReady = function() {
        this.activeStage.off("load"),
        this.editable = this.activeStage.contents().find("#editable"),
        this.activeStage.attr({
            width: "960",
            height: "400"
        }),
        this.isNewDemo && (this.isNewDemo = !1,
        this.codemirror.doc.setValue(this.model.set("sourceJS", this.stripWhiteSpace(this.editable.html())).get("sourceJS"))),
        this.activeStage.contents().find("canvas").on("click", this.proxy.iframeClick)
    }
    ,
    b.handleIFrameClick = function() {
        this.activeStage[0].contentWindow.focus()
    }
    ,
    b.handleResize = function() {
        this.codemirror.setSize(null, window.innerHeight - a.nav.$el.height() - this.info.$el.height() - 100),
        this.resetDemoList()
    }
    ,
    b.stripWhiteSpace = function(a) {
        return a.replace(/\n(\t|    )/g, "\n")
    }
    ,
    b.parseURL = function(a, b, c) {
        return a = a.substring(a.lastIndexOf("/") + 1, a.indexOf(".")),
        c && /^\d+_/.test(a) && (a = a.substring(3)),
        b ? a.toLowerCase() : a
    }
    ,
    b.toggleMenu = function() {
        this.$(".menu_container").toggleClass("closed"),
        this.isMenuOpen = !this.isMenuOpen,
        this.$("#menu_text").text(this.isMenuOpen ? a.strings.get(this.prefix, "CLOSE") : a.strings.get(this.prefix, "MORE_DEMOS")),
        this.isMenuOpen && this.isCodemirrorOpen && this.toggleCodemirror()
    }
    ,
    b.toggleCodemirror = function() {
        this.$("#code").toggleClass("closed"),
        this.isCodemirrorOpen = !this.isCodemirrorOpen,
        this.$("#cm_text").text(this.isCodemirrorOpen ? "Close" : this.model.get("toggleText")),
        this.isCodemirrorOpen && this.isMenuOpen && this.toggleMenu()
    }
    ,
    b.updateInfo = function(b, c) {
        var d = this.info
          , e = b.TITLE
          , f = this.activeList.name;
        this.isNewList && d.lib.text(f),
        d.title.text(e),
        d.index.text(c + 1),
        a.router.replace("/demos/" + f.toLowerCase() + "/" + this.parseURL(b.SOURCE, !0, !0)),
        document.title = a.strings.get(this.prefix, "META_TITLE") + " " + a.strings.get(this.prefix, "FOR") + " " + f + " - " + e,
        d.total.text(this.isHiddenDemo ? 1 : this.activeList.demos.length),
        this.queue.loaded && a.viewManager.sendAnalyticsView()
    }
    ,
    b.resetDemoList = function() {
        var a = $body.width() / this.activeList.items.width() + .5 | 0
          , b = this.activeList.demos.length;
        this.demoScrollIndex = 0,
        this.demoPageCount = Math.ceil(b / a),
        this.demoListPrevious.hide(),
        this.demoListNext[b > a ? "show" : "hide"](),
        this.activeList.$el.css("right", "0px")
    }
    ,
    b.handleListClick = function(a) {
        this.$(".list.active").removeClass("active");
        var b = $(a.currentTarget);
        b.addClass("active");
        var c = this.model.get("lists")[b.attr("id").replace("lib_", "").toUpperCase()];
        this.demoScrollIndex = 0,
        this.isNewList = c !== this.activeList,
        this.isNewList && this.setActiveList(c)
    }
    ,
    b.handleDemoClick = function(a, b) {
        this.isHiddenDemo && (this.isHiddenDemo = !1,
        this.$(".demo_arrow").show()),
        this.isNewDemo = this.isNewList || b !== this.activeIndex,
        this.isNewDemo && this.setActiveDemo(a, b)
    }
    ,
    b.handleDemoScroll = function(a) {
        if (!this.isAnimating) {
            var b, c = this.activeList.$el, d = "webkitTransitionEnd oTransitionEnd otransitionend transitionend webkitAnimationEnd animationend oanimationend MSAnimationEnd", e = $(a.currentTarget);
            this.isAnimating = !0,
            e.hasClass("previous") ? (this.demoListNext.show(),
            0 === --this.demoScrollIndex && this.demoListPrevious.hide(),
            b = "animate-left",
            c.addClass("animate-left")) : (this.demoListPrevious.show(),
            ++this.demoScrollIndex === this.demoPageCount - 1 && this.demoListNext.hide(),
            b = "animate-right"),
            c.addClass(b),
            c.on(d, g.proxy(function() {
                c.css("right", document.body.clientWidth * this.demoScrollIndex),
                c.removeClass(b),
                this.isAnimating = !1
            }, this))
        }
    }
    ,
    b.handleDemoArrowClick = function(a) {
        var b = this.activeList
          , c = this.activeIndex;
        $(a.currentTarget).hasClass("previous") ? 0 === c ? c = b.demos.length - 1 : c-- : c === b.demos.length - 1 ? c = 0 : c++,
        this.isNewDemo = !0,
        this.setActiveDemo(b.demos[c], c)
    }
    ,
    b.handleSourceLoad = function() {
        this.loadNewStage(this.model.set("sourceHTML", this.queue.getResult("demo")).get("sourceHTML"))
    }
    ,
    b.handleRunClick = function() {
        this.editable.html(this.codemirror.doc.getValue()),
        this.loadNewStage("<html>\n" + this.activeStage[0].contentDocument.documentElement.innerHTML + "\n</html>"),
        this.toggleCodemirror(),
        this.runCount++,
        this.sendAnalyticsEvent("run", this.activeList.name + ": " + this.activeDemo.TITLE)
    }
    ,
    b.handleResetClick = function() {
        this.codemirror.doc.setValue(this.model.get("sourceJS")),
        this.loadNewStage(this.model.get("sourceHTML")),
        this.toggleCodemirror(),
        this.sendAnalyticsEvent("reset", this.activeList.name + ": " + this.activeDemo.TITLE)
    }
    ,
    b.handleGithubClick = function() {
        window.open("https://github.com/CreateJS/" + this.activeList.name + "/blob/master/examples/" + this.parseURL(this.activeDemo.SOURCE, !1, !1) + ".html"),
        this.sendAnalyticsEvent("github", this.activeList.name + ": " + this.activeDemo.TITLE)
    }
    ,
    b.sendAnalyticsEvent = function(a, b) {
        window.ga("send", "event", "demo", a, b, "run" === a ? this.runCount : void 0)
    }
    ,
    a.DemosView = a.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = {}
      , c = {};
    b.initialize = function() {
        this.setTemplate(a.Templates.ERROR),
        this.super_init()
    }
    ,
    b.handleParams = function(a) {}
    ,
    a.ErrorView = a.AbstractView.extend(b, c)
}(window.cjs),
function(a) {
    "use strict";
    var b = function() {
        a.router.on("route", this.handleRoute, this),
        this.metaDescription = $('meta[name="description"], meta[name="twitter:description"]'),
        this.metaTitle = $('meta[property="og:title"], meta[name="twitter:title"]'),
        this.metaURL = $('meta[property="og:url"], meta[name="twitter:url"]'),
        this.metaImage = $('meta[property="og:image"], meta[name="twitter:image"]'),
        this.metaCanonical = $('link[rel="canonical"]')
    }
      , c = b.prototype = new createjs.EventDispatcher;
    c.viewList = null,
    c.activeView = null,
    c.isTransitioning = !1,
    c.metaDescription = null,
    c.metaCanonical = null,
    c.registerViewList = function() {
        var b = a.AppRouter.VIEWS
          , c = a.LibraryData;
        this.viewList = {
            home: {
                route: b.HOME,
                view: a.HomeView,
                model: new a.HomeModel
            },
            easeljs: {
                route: b.EASELJS,
                view: a.LibraryView,
                model: new a.LibraryModel(c.EASELJS)
            },
            tweenjs: {
                route: b.TWEENJS,
                view: a.LibraryView,
                model: new a.LibraryModel(c.TWEENJS)
            },
            soundjs: {
                route: b.SOUNDJS,
                view: a.LibraryView,
                model: new a.LibraryModel(c.SOUNDJS)
            },
            preloadjs: {
                route: b.PRELOADJS,
                view: a.LibraryView,
                model: new a.LibraryModel(c.PRELOADJS)
            },
            zoe: {
                route: b.ZOE,
                view: a.LibraryView,
                model: new a.LibraryModel(c.ZOE)
            },
            tools: {
                route: b.TOOLS,
                view: a.ToolsView,
                model: new a.ToolsModel
            },
            docs: {
                route: b.DOCS,
                view: a.DocsView,
                model: new a.DocsModel
            },
            downloads: {
                route: b.DOWNLOADS,
                view: a.DownloadsView,
                model: new a.DownloadsModel
            },
            gettingStarted: {
                route: b.GETTING_STARTED,
                view: a.GettingStartedView,
                model: new a.GettingStartedModel
            },
            demos: {
                route: b.DEMOS,
                view: a.DemosView,
                model: new a.DemosModel
            },
            error: {
                route: b.ERROR,
                view: a.ErrorView,
                model: new a.ErrorModel
            }
        },
        this.dispatchEvent("ready")
    }
    ,
    c.handleRoute = function(b, c) {
        if (a.router.activeRoute !== b) {
            a.router.activeRoute = b,
            this.activeView && this.activeView.hide();
            var d = this.getViewByRoute(b)
              , e = new d.view({
                model: d.model
            });
            c.length > 0 && e.handleParams(c),
            document.body.appendChild(e.el),
            setTimeout(g.proxy(e.show, e), a.Settings.Timing.PAGE_TRANSITION),
            this.activeView = e;
            var f = e.model.get("PREFIX");
            this.metaTitle.attr("content", document.title = a.strings.get(f, "META_TITLE")),
            this.metaDescription.attr("content", a.strings.get(f, "META_DESCRIPTION")),
            this.metaURL.attr("content", location.href),
            this.metaCanonical.attr("href", "http://" + window.location.host + window.location.pathname),
            this.sendAnalyticsView(),
            a.nav.updateState()
        }
    }
    ,
    c.getViewByRoute = function(a) {
        var b, c, d = this.viewList;
        for (b in d)
            if (c = d[b],
            c.route === a)
                return c;
        return d.error
    }
    ,
    c.sendAnalyticsView = function() {
        window.ga("send", "pageview", window.location.pathname, document.title)
    }
    ,
    a.ViewManager = b
}(window.cjs),
function(a) {
    "use strict";
    function b() {
        a.strings = new g.LanguageModel,
        a.strings.on("complete", this.init, this),
        a.strings.load()
    }
    var c = b.prototype;
    c.init = function() {
        window.$window = $(window),
        window.$body = $(document.body),
        $.fx.interval = 5,
        a.router = new a.AppRouter,
        this.parseFirstRoute(),
        a.nav = new a.Nav({
            el: $("#nav_template")
        }),
        a.viewManager = new a.ViewManager,
        a.viewManager.on("ready", this.startApp, this),
        a.viewManager.registerViewList()
    }
    ,
    c.startApp = function() {
        Backbone.history.start({
            pushState: a.router.isHistorySupported
        }),
        $body.removeClass("loading")
    }
    ,
    c.parseFirstRoute = function() {
        var b = window.location
          , c = decodeURI(b.hash.toLowerCase());
        if (c.length > 0)
            /\/$/.test(c) && (c = c.slice(0, -1)),
            /^#!\//.test(c) && (c = c.substr(3)),
            c = a.router.checkLegacyRoutes(c);
        else {
            if (!/[A-Z]/.test(b.pathname))
                return;
            c = b.pathname.slice(1).toLowerCase()
        }
        a.router.isHistorySupported ? window.history.replaceState({}, "", c) : b.replace(c)
    }
    ,
    a.Application = b
}(window.cjs);
