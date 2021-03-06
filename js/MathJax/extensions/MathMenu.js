﻿/*
 *  /MathJax/extensions/MathMenu.js
 *
 *  Copyright (c) 2012 Design Science, Inc.
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 *
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */
(function (c, g, k, f, b) {
    var p = "2.1";
    var j = MathJax.Callback.Signal("menu");
    MathJax.Extension.MathMenu = {
        version: p,
        signal: j
    };
    var n = c.Browser.isPC,
        l = c.Browser.isMSIE,
        e = ((document.documentMode || 0) > 8);
    var i = (n ? null : "5px");
    var o = c.CombineConfig("MathMenu", {
        delay: 150,
        helpURL: "http://www.mathjax.org/help-v2/user/",
        closeImg: k.fileURL(b.imageDir + "/CloseX-31.png"),
        showRenderer: true,
        showMathPlayer: true,
        showFontMenu: false,
        showContext: false,
        showDiscoverable: false,
        windowSettings: {
            status: "no",
            toolbar: "no",
            locationbar: "no",
            menubar: "no",
            directories: "no",
            personalbar: "no",
            resizable: "yes",
            scrollbars: "yes",
            width: 400,
            height: 300,
            left: Math.round((screen.width - 400) / 2),
            top: Math.round((screen.height - 300) / 3)
        },
        styles: {
            "#MathJax_About": {
                position: "fixed",
                left: "50%",
                width: "auto",
                "text-align": "center",
                border: "3px outset",
                padding: "1em 2em",
                "background-color": "#DDDDDD",
                color: "black",
                cursor: "default",
                "font-family": "message-box",
                "font-size": "120%",
                "font-style": "normal",
                "text-indent": 0,
                "text-transform": "none",
                "line-height": "normal",
                "letter-spacing": "normal",
                "word-spacing": "normal",
                "word-wrap": "normal",
                "white-space": "nowrap",
                "float": "none",
                "z-index": 201,
                "border-radius": "15px",
                "-webkit-border-radius": "15px",
                "-moz-border-radius": "15px",
                "-khtml-border-radius": "15px",
                "box-shadow": "0px 10px 20px #808080",
                "-webkit-box-shadow": "0px 10px 20px #808080",
                "-moz-box-shadow": "0px 10px 20px #808080",
                "-khtml-box-shadow": "0px 10px 20px #808080",
                filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
            },
            ".MathJax_Menu": {
                position: "absolute",
                "background-color": "white",
                color: "black",
                width: "auto",
                padding: (n ? "2px" : "5px 0px"),
                border: "1px solid #CCCCCC",
                margin: 0,
                cursor: "default",
                font: "menu",
                "text-align": "left",
                "text-indent": 0,
                "text-transform": "none",
                "line-height": "normal",
                "letter-spacing": "normal",
                "word-spacing": "normal",
                "word-wrap": "normal",
                "white-space": "nowrap",
                "float": "none",
                "z-index": 201,
                "border-radius": i,
                "-webkit-border-radius": i,
                "-moz-border-radius": i,
                "-khtml-border-radius": i,
                "box-shadow": "0px 10px 20px #808080",
                "-webkit-box-shadow": "0px 10px 20px #808080",
                "-moz-box-shadow": "0px 10px 20px #808080",
                "-khtml-box-shadow": "0px 10px 20px #808080",
                filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
            },
            ".MathJax_MenuItem": {
                padding: (n ? "2px 2em" : "1px 2em"),
                background: "transparent"
            },
            ".MathJax_MenuTitle": {
                "background-color": "#CCCCCC",
                margin: (n ? "-1px -1px 1px -1px" : "-5px 0 0 0"),
                "text-align": "center",
                "font-style": "italic",
                "font-size": "80%",
                color: "#444444",
                padding: "2px 0",
                overflow: "hidden"
            },
            ".MathJax_MenuArrow": {
                position: "absolute",
                right: ".5em",
                color: "#666666",
                "font-family": (l ? "'Arial unicode MS'" : null)
            },
            ".MathJax_MenuActive .MathJax_MenuArrow": {
                color: "white"
            },
            ".MathJax_MenuCheck": {
                position: "absolute",
                left: ".7em",
                "font-family": (l ? "'Arial unicode MS'" : null)
            },
            ".MathJax_MenuRadioCheck": {
                position: "absolute",
                left: (n ? "1em" : ".7em")
            },
            ".MathJax_MenuLabel": {
                padding: (n ? "2px 2em 4px 1.33em" : "1px 2em 3px 1.33em"),
                "font-style": "italic"
            },
            ".MathJax_MenuRule": {
                "border-top": (n ? "1px solid #CCCCCC" : "1px solid #DDDDDD"),
                margin: (n ? "4px 1px 0px" : "4px 3px")
            },
            ".MathJax_MenuDisabled": {
                color: "GrayText"
            },
            ".MathJax_MenuActive": {
                "background-color": (n ? "Highlight" : "#606872"),
                color: (n ? "HighlightText" : "white")
            },
            ".MathJax_Menu_Close": {
                position: "absolute",
                width: "31px",
                height: "31px",
                top: "-15px",
                left: "-15px"
            }
        }
    });
    var h, d;
    c.Register.StartupHook("MathEvents Ready", function () {
        h = MathJax.Extension.MathEvents.Event.False;
        d = MathJax.Extension.MathEvents.Hover
    });
    var a = MathJax.Menu = MathJax.Object.Subclass({
        version: p,
        items: [],
        posted: false,
        title: null,
        margin: 5,
        Init: function (q) {
            this.items = [].slice.call(arguments, 0)
        },
        With: function (q) {
            if (q) {
                c.Insert(this, q)
            }
            return this
        },
        Post: function (r, B) {
            if (!r) {
                r = window.event
            }
            var z = (!this.title ? null : [
                ["div", {
                    className: "MathJax_MenuTitle"
                },
                    [this.title]
                ]
            ]);
            var q = document.getElementById("MathJax_MenuFrame");
            if (!q) {
                q = a.Background(this);
                delete m.lastItem;
                delete m.lastMenu;
                delete a.skipUp;
                j.Post(["post", a.jax])
            }
            var s = g.addElement(q, "div", {
                onmouseup: a.Mouseup,
                ondblclick: h,
                ondragstart: h,
                onselectstart: h,
                oncontextmenu: h,
                menuItem: this,
                className: "MathJax_Menu"
            }, z);
            for (var u = 0, t = this.items.length; u < t; u++) {
                this.items[u].Create(s)
            }
            if (a.isMobile) {
                g.addElement(s, "span", {
                    className: "MathJax_Menu_Close",
                    menu: B,
                    ontouchstart: a.Close,
                    ontouchend: h,
                    onmousedown: a.Close,
                    onmouseup: h
                }, [
                    ["img", {
                        src: o.closeImg,
                        style: {
                            width: "100%",
                            height: "100%"
                        }
                    }]
                ])
            }
            this.posted = true;
            s.style.width = (s.offsetWidth + 2) + "px";
            var A = r.pageX,
                w = r.pageY;
            if (!A && !w) {
                A = r.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                w = r.clientY + document.body.scrollTop + document.documentElement.scrollTop
            }
            if (!B) {
                if (A + s.offsetWidth > document.body.offsetWidth - this.margin) {
                    A = document.body.offsetWidth - s.offsetWidth - this.margin
                }
                if (a.isMobile) {
                    A = Math.max(5, A - Math.floor(s.offsetWidth / 2));
                    w -= 20
                }
                a.skipUp = r.isContextMenu
            } else {
                var v = "left",
                    C = B.offsetWidth;
                A = (a.isMobile ? 30 : C - 2);
                w = 0;
                while (B && B !== q) {
                    A += B.offsetLeft;
                    w += B.offsetTop;
                    B = B.parentNode
                }
                if (A + s.offsetWidth > document.body.offsetWidth - this.margin && !a.isMobile) {
                    v = "right";
                    A = Math.max(this.margin, A - C - s.offsetWidth + 6)
                }
                if (!n) {
                    s.style["borderRadiusTop" + v] = 0;
                    s.style["WebkitBorderRadiusTop" + v] = 0;
                    s.style["MozBorderRadiusTop" + v] = 0;
                    s.style["KhtmlBorderRadiusTop" + v] = 0
                }
            }
            s.style.left = A + "px";
            s.style.top = w + "px";
            if (document.selection && document.selection.empty) {
                document.selection.empty()
            }
            return h(r)
        },
        Remove: function (q, r) {
            j.Post(["unpost", a.jax]);
            var s = document.getElementById("MathJax_MenuFrame");
            if (s) {
                s.parentNode.removeChild(s);
                if (this.msieFixedPositionBug) {
                    detachEvent("onresize", a.Resize)
                }
            }
            if (a.jax.hover) {
                delete a.jax.hover.nofade;
                d.UnHover(a.jax)
            }
            return h(q)
        },
        Find: function (r) {
            var t = [].slice.call(arguments, 1);
            for (var s = 0, q = this.items.length; s < q; s++) {
                if (this.items[s].name === r) {
                    if (t.length) {
                        if (!this.items[s].menu) {
                            return null
                        }
                        return this.items[s].menu.Find.apply(this.items[s].menu, t)
                    }
                    return this.items[s]
                }
            }
            return null
        },
        IndexOf: function (r) {
            for (var s = 0, q = this.items.length; s < q; s++) {
                if (this.items[s].name === r) {
                    return s
                }
            }
            return null
        }
    }, {
        config: o,
        div: null,
        Close: function (q) {
            return a.Event(q, this.menu || this.parentNode, (this.menu ? "Touchend" : "Remove"))
        },
        Remove: function (q) {
            return a.Event(q, this, "Remove")
        },
        Mouseover: function (q) {
            return a.Event(q, this, "Mouseover")
        },
        Mouseout: function (q) {
            return a.Event(q, this, "Mouseout")
        },
        Mousedown: function (q) {
            return a.Event(q, this, "Mousedown")
        },
        Mouseup: function (q) {
            return a.Event(q, this, "Mouseup")
        },
        Touchstart: function (q) {
            return a.Event(q, this, "Touchstart")
        },
        Touchend: function (q) {
            return a.Event(q, this, "Touchend")
        },
        Event: function (s, u, q, t) {
            if (a.skipMouseover && q === "Mouseover" && !t) {
                return h(s)
            }
            if (a.skipUp) {
                if (q.match(/Mouseup|Touchend/)) {
                    delete a.skipUp;
                    return h(s)
                }
                if (q === "Touchstart" || (q === "Mousedown" && !a.skipMousedown)) {
                    delete a.skipUp
                }
            }
            if (!s) {
                s = window.event
            }
            var r = u.menuItem;
            if (r && r[q]) {
                return r[q](s, u)
            }
            return null
        },
        BGSTYLE: {
            position: "absolute",
            left: 0,
            top: 0,
            "z-index": 200,
            width: "100%",
            height: "100%",
            border: 0,
            padding: 0,
            margin: 0
        },
        Background: function (r) {
            var s = g.addElement(document.body, "div", {
                style: this.BGSTYLE,
                id: "MathJax_MenuFrame"
            }, [
                ["div", {
                    style: this.BGSTYLE,
                    menuItem: r,
                    onmousedown: this.Remove
                }]
            ]);
            var q = s.firstChild;
            if (r.msieBackgroundBug) {
                q.style.backgroundColor = "white";
                q.style.filter = "alpha(opacity=0)"
            }
            if (r.msieFixedPositionBug) {
                s.width = s.height = 0;
                this.Resize();
                attachEvent("onresize", this.Resize)
            } else {
                q.style.position = "fixed"
            }
            return s
        },
        Resize: function () {
            setTimeout(a.SetWH, 0)
        },
        SetWH: function () {
            var q = document.getElementById("MathJax_MenuFrame");
            if (q) {
                q = q.firstChild;
                q.style.width = q.style.height = "1px";
                q.style.width = document.body.scrollWidth + "px";
                q.style.height = document.body.scrollHeight + "px"
            }
        },
        saveCookie: function () {
            g.Cookie.Set("menu", this.cookie)
        },
        getCookie: function () {
            this.cookie = g.Cookie.Get("menu")
        },
        getImages: function () {
            if (a.isMobile) {
                var q = new Image();
                q.src = o.closeImg
            }
        }
    });
    var m = a.ITEM = MathJax.Object.Subclass({
        name: "",
        Create: function (r) {
            if (!this.hidden) {
                var q = {
                    onmouseover: a.Mouseover,
                    onmouseout: a.Mouseout,
                    onmouseup: a.Mouseup,
                    onmousedown: a.Mousedown,
                    ondragstart: h,
                    onselectstart: h,
                    onselectend: h,
                    ontouchstart: a.Touchstart,
                    ontouchend: a.Touchend,
                    className: "MathJax_MenuItem",
                    menuItem: this
                };
                if (this.disabled) {
                    q.className += " MathJax_MenuDisabled"
                }
                g.addElement(r, "div", q, this.Label(q, r))
            }
        },
        Mouseover: function (u, w) {
            if (!this.disabled) {
                this.Activate(w)
            }
            if (!this.menu || !this.menu.posted) {
                var v = document.getElementById("MathJax_MenuFrame").childNodes,
                    r = w.parentNode.childNodes;
                for (var s = 0, q = r.length; s < q; s++) {
                    var t = r[s].menuItem;
                    if (t && t.menu && t.menu.posted) {
                        t.Deactivate(r[s])
                    }
                }
                q = v.length - 1;
                while (q >= 0 && w.parentNode.menuItem !== v[q].menuItem) {
                    v[q].menuItem.posted = false;
                    v[q].parentNode.removeChild(v[q]);
                    q--
                }
                if (this.Timer && !a.isMobile) {
                    this.Timer(u, w)
                }
            }
        },
        Mouseout: function (q, r) {
            if (!this.menu || !this.menu.posted) {
                this.Deactivate(r)
            }
            if (this.timer) {
                clearTimeout(this.timer);
                delete this.timer
            }
        },
        Mouseup: function (q, r) {
            return this.Remove(q, r)
        },
        Touchstart: function (q, r) {
            return this.TouchEvent(q, r, "Mousedown")
        },
        Touchend: function (q, r) {
            return this.TouchEvent(q, r, "Mouseup")
        },
        TouchEvent: function (r, s, q) {
            if (this !== m.lastItem) {
                if (m.lastMenu) {
                    a.Event(r, m.lastMenu, "Mouseout")
                }
                a.Event(r, s, "Mouseover", true);
                m.lastItem = this;
                m.lastMenu = s
            }
            if (this.nativeTouch) {
                return null
            }
            a.Event(r, s, q);
            return false
        },
        Remove: function (q, r) {
            r = r.parentNode.menuItem;
            return r.Remove(q, r)
        },
        Activate: function (q) {
            this.Deactivate(q);
            q.className += " MathJax_MenuActive"
        },
        Deactivate: function (q) {
            q.className = q.className.replace(/ MathJax_MenuActive/, "")
        },
        With: function (q) {
            if (q) {
                c.Insert(this, q)
            }
            return this
        }
    });
    a.ITEM.COMMAND = a.ITEM.Subclass({
        action: function () { },
        Init: function (q, s, r) {
            this.name = q;
            this.action = s;
            this.With(r)
        },
        Label: function (q, r) {
            return [this.name]
        },
        Mouseup: function (q, r) {
            if (!this.disabled) {
                this.Remove(q, r);
                j.Post(["command", this]);
                this.action.call(this, q)
            }
            return h(q)
        }
    });
    a.ITEM.SUBMENU = a.ITEM.Subclass({
        menu: null,
        marker: (n && !c.Browser.isSafari ? "\u25B6" : "\u25B8"),
        Init: function (q, s) {
            this.name = q;
            var r = 1;
            if (!(s instanceof a.ITEM)) {
                this.With(s), r++
            }
            this.menu = a.apply(a, [].slice.call(arguments, r))
        },
        Label: function (q, r) {
            this.menu.posted = false;
            return [this.name + " ", ["span", {
                className: "MathJax_MenuArrow"
            },
                [this.marker]
            ]]
        },
        Timer: function (q, r) {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            q = {
                clientX: q.clientX,
                clientY: q.clientY
            };
            this.timer = setTimeout(f(["Mouseup", this, q, r]), o.delay)
        },
        Touchend: function (r, t) {
            var s = this.menu.posted;
            var q = this.SUPER(arguments).Touchend.apply(this, arguments);
            if (s) {
                this.Deactivate(t);
                delete m.lastItem;
                delete m.lastMenu
            }
            return q
        },
        Mouseup: function (r, t) {
            if (!this.disabled) {
                if (!this.menu.posted) {
                    if (this.timer) {
                        clearTimeout(this.timer);
                        delete this.timer
                    }
                    this.menu.Post(r, t)
                } else {
                    var s = document.getElementById("MathJax_MenuFrame").childNodes,
                        q = s.length - 1;
                    while (q >= 0) {
                        var u = s[q];
                        u.menuItem.posted = false;
                        u.parentNode.removeChild(u);
                        if (u.menuItem === this.menu) {
                            break
                        }
                        q--
                    }
                }
            }
            return h(r)
        }
    });
    a.ITEM.RADIO = a.ITEM.Subclass({
        variable: null,
        marker: (n ? "\u25CF" : "\u2713"),
        Init: function (r, q, s) {
            this.name = r;
            this.variable = q;
            this.With(s);
            if (this.value == null) {
                this.value = this.name
            }
        },
        Label: function (r, s) {
            var q = {
                className: "MathJax_MenuRadioCheck"
            };
            if (o.settings[this.variable] !== this.value) {
                q = {
                    style: {
                        display: "none"
                    }
                }
            }
            return [["span", q, [this.marker]], " " + this.name]
        },
        Mouseup: function (t, u) {
            if (!this.disabled) {
                var v = u.parentNode.childNodes;
                for (var r = 0, q = v.length; r < q; r++) {
                    var s = v[r].menuItem;
                    if (s && s.variable === this.variable) {
                        v[r].firstChild.style.display = "none"
                    }
                }
                u.firstChild.display = "";
                o.settings[this.variable] = this.value;
                a.cookie[this.variable] = o.settings[this.variable];
                a.saveCookie();
                j.Post(["radio button", this])
            }
            this.Remove(t, u);
            if (this.action && !this.disabled) {
                this.action.call(a, this)
            }
            return h(t)
        }
    });
    a.ITEM.CHECKBOX = a.ITEM.Subclass({
        variable: null,
        marker: "\u2713",
        Init: function (r, q, s) {
            this.name = r;
            this.variable = q;
            this.With(s)
        },
        Label: function (r, s) {
            var q = {
                className: "MathJax_MenuCheck"
            };
            if (!o.settings[this.variable]) {
                q = {
                    style: {
                        display: "none"
                    }
                }
            }
            return [["span", q, [this.marker]], " " + this.name]
        },
        Mouseup: function (q, r) {
            if (!this.disabled) {
                r.firstChild.display = (o.settings[this.variable] ? "none" : "");
                o.settings[this.variable] = !o.settings[this.variable];
                a.cookie[this.variable] = o.settings[this.variable];
                a.saveCookie();
                j.Post(["checkbox", this])
            }
            this.Remove(q, r);
            if (this.action && !this.disabled) {
                this.action.call(a, this)
            }
            return h(q)
        }
    });
    a.ITEM.LABEL = a.ITEM.Subclass({
        Init: function (q, r) {
            this.name = q;
            this.With(r)
        },
        Label: function (q, r) {
            delete q.onmouseover, delete q.onmouseout;
            delete q.onmousedown;
            q.className += " MathJax_MenuLabel";
            return [this.name]
        }
    });
    a.ITEM.RULE = a.ITEM.Subclass({
        Label: function (q, r) {
            delete q.onmouseover, delete q.onmouseout;
            delete q.onmousedown;
            q.className += " MathJax_MenuRule";
            return null
        }
    });
    a.About = function () {
        var t = b["HTML-CSS"] || {
            fontInUse: ""
        };
        var v = (t.webFonts ? "" : "local "),
            r = (t.webFonts ? " web" : "");
        var s = (t.imgFonts ? "Image" : v + t.fontInUse + r) + " fonts";
        if (s === "local  fonts" && b.SVG) {
            s = "web SVG fonts"
        }
        var q = ["MathJax.js v" + MathJax.fileversion, ["br"]];
        q.push(["div", {
            style: {
                "border-top": "groove 2px",
                margin: ".25em 0"
            }
        }]);
        a.About.GetJax(q, MathJax.InputJax, "Input Jax");
        a.About.GetJax(q, MathJax.OutputJax, "Output Jax");
        a.About.GetJax(q, MathJax.ElementJax, "Element Jax");
        q.push(["div", {
            style: {
                "border-top": "groove 2px",
                margin: ".25em 0"
            }
        }]);
        a.About.GetJax(q, MathJax.Extension, "Extension", true);
        q.push(["div", {
            style: {
                "border-top": "groove 2px",
                margin: ".25em 0"
            }
        }], ["center", {},
            [c.Browser + " v" + c.Browser.version + (t.webFonts && !t.imgFonts ? " \u2014 " + t.allowWebFonts.replace(/otf/, "woff or otf") + " fonts" : "")]
        ]);
        a.About.div = a.Background(a.About);
        var w = g.addElement(a.About.div, "div", {
            id: "MathJax_About"
        }, [
            ["b", {
                style: {
                    fontSize: "120%"
                }
            },
                ["MathJax"]
            ], " v" + MathJax.version, ["br"], "using " + s, ["br"],
            ["br"],
            ["span", {
                style: {
                    display: "inline-block",
                    "text-align": "left",
                    "font-size": "80%",
                    "max-height": "20em",
                    overflow: "auto",
                    "background-color": "#E4E4E4",
                    padding: ".4em .6em",
                    border: "1px inset"
                }
            },
                q
            ],
            ["br"],
            ["br"],
            ["a", {
                href: "http://www.mathjax.org/"
            },
                ["www.mathjax.org"]
            ],
            ["img", {
                src: o.closeImg,
                style: {
                    width: "21px",
                    height: "21px",
                    position: "absolute",
                    top: ".2em",
                    right: ".2em"
                },
                onclick: a.About.Remove
            }]
        ]);
        var x = (document.documentElement || {});
        var u = window.innerHeight || x.clientHeight || x.scrollHeight || 0;
        if (a.prototype.msieAboutBug) {
            w.style.width = "20em";
            w.style.position = "absolute";
            w.style.left = Math.floor((document.documentElement.scrollWidth - w.offsetWidth) / 2) + "px";
            w.style.top = (Math.floor((u - w.offsetHeight) / 3) + document.body.scrollTop) + "px"
        } else {
            w.style.marginLeft = Math.floor(-w.offsetWidth / 2) + "px";
            w.style.top = Math.floor((u - w.offsetHeight) / 3) + "px"
        }
    };
    a.About.Remove = function (q) {
        if (a.About.div) {
            document.body.removeChild(a.About.div);
            delete a.About.div
        }
    };
    a.About.GetJax = function (r, w, u, t) {
        var v = [];
        for (var x in w) {
            if (w.hasOwnProperty(x) && w[x]) {
                if ((t && w[x].version) || (w[x].isa && w[x].isa(w))) {
                    v.push((w[x].id || x) + " " + u + " v" + w[x].version)
                }
            }
        }
        v.sort();
        for (var s = 0, q = v.length; s < q; s++) {
            r.push(v[s], ["br"])
        }
        return r
    };
    a.Help = function () {
        window.open(o.helpURL, "MathJaxHelp")
    };
    a.ShowSource = function (t) {
        if (!t) {
            t = window.event
        }
        var s = {
            screenX: t.screenX,
            screenY: t.screenY
        };
        if (!a.jax) {
            return
        }
        if (this.format === "MathML") {
            var q = MathJax.ElementJax.mml;
            if (q && typeof (q.mbase.prototype.toMathML) !== "undefined") {
                try {
                    a.ShowSource.Text(a.jax.root.toMathML(), t)
                } catch (r) {
                    if (!r.restart) {
                        throw r
                    }
                    f.After([this, a.ShowSource, s], r.restart)
                }
            } else {
                if (!k.loadingToMathML) {
                    k.loadingToMathML = true;
                    a.ShowSource.Window(t);
                    f.Queue(k.Require("[MathJax]/extensions/toMathML.js"), function () {
                        delete k.loadingToMathML;
                        if (!q.mbase.prototype.toMathML) {
                            q.mbase.prototype.toMathML = function () { }
                        }
                    }, [this, a.ShowSource, s]);
                    return
                }
            }
        } else {
            if (a.jax.originalText == null) {
                alert("No original form available");
                return
            }
            a.ShowSource.Text(a.jax.originalText, t)
        }
    };
    a.ShowSource.Window = function (r) {
        if (!a.ShowSource.w) {
            var s = [],
                q = o.windowSettings;
            for (var t in q) {
                if (q.hasOwnProperty(t)) {
                    s.push(t + "=" + q[t])
                }
            }
            a.ShowSource.w = window.open("", "_blank", s.join(","))
        }
        return a.ShowSource.w
    };
    a.ShowSource.Text = function (t, s) {
        var q = a.ShowSource.Window(s);
        delete a.ShowSource.w;
        t = t.replace(/^\s*/, "").replace(/\s*$/, "");
        t = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        if (a.isMobile) {
            q.document.open();
            q.document.write("<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0' /><title>MathJax Equation Source</title></head><body style='font-size:85%'>");
            q.document.write("<pre>" + t + "</pre>");
            q.document.write("<hr><input type='button' value='Close' onclick='window.close()' />");
            q.document.write("</body></html>");
            q.document.close()
        } else {
            q.document.open();
            q.document.write("<html><head><title>MathJax Equation Source</title></head><body style='font-size:85%'>");
            q.document.write("<table><tr><td><pre>" + t + "</pre></td></tr></table>");
            q.document.write("</body></html>");
            q.document.close();
            var r = q.document.body.firstChild;
            setTimeout(function () {
                var w = (q.outerHeight - q.innerHeight) || 30,
                    v = (q.outerWidth - q.innerWidth) || 30,
                    u, z;
                v = Math.max(100, Math.min(Math.floor(0.5 * screen.width), r.offsetWidth + v + 25));
                w = Math.max(40, Math.min(Math.floor(0.5 * screen.height), r.offsetHeight + w + 25));
                q.resizeTo(v, w);
                if (s && s.screenX != null) {
                    u = Math.max(0, Math.min(s.screenX - Math.floor(v / 2), screen.width - v - 20));
                    z = Math.max(0, Math.min(s.screenY - Math.floor(w / 2), screen.height - w - 20));
                    q.moveTo(u, z)
                }
            }, 50)
        }
    };
    a.Scale = function () {
        var r = b["HTML-CSS"],
            q = b.NativeMML,
            u = b.SVG;
        var t = (r || q || u || {
            config: {
                scale: 100
            }
        }).config.scale;
        var s = prompt("Scale all mathematics (compared to surrounding text) by", t + "%");
        if (s) {
            if (s.match(/^\s*\d+(\.\d*)?\s*%?\s*$/)) {
                s = parseFloat(s);
                if (s) {
                    if (s !== t) {
                        if (r) {
                            r.config.scale = s
                        }
                        if (q) {
                            q.config.scale = s
                        }
                        if (u) {
                            u.config.scale = s
                        }
                        a.cookie.scale = s;
                        a.saveCookie();
                        c.Reprocess()
                    }
                } else {
                    alert("The scale should not be zero")
                }
            } else {
                alert("The scale should be a percentage (e.g., 120%)")
            }
        }
    };
    a.Zoom = function () {
        if (!MathJax.Extension.MathZoom) {
            k.Require("[MathJax]/extensions/MathZoom.js")
        }
    };
    a.Renderer = function () {
        var r = c.outputJax["jax/mml"];
        if (r[0] !== o.settings.renderer) {
            var u = c.Browser,
                t, q = a.Renderer.Messages,
                s;
            switch (o.settings.renderer) {
                case "NativeMML":
                    if (!o.settings.warnedMML) {
                        if (u.isChrome || (u.isSafari && !u.versionAtLeast("5.0"))) {
                            t = q.MML.WebKit
                        } else {
                            if (u.isMSIE) {
                                if (!u.hasMathPlayer) {
                                    t = q.MML.MSIE
                                }
                            } else {
                                t = q.MML[u]
                            }
                        }
                        s = "warnedMML"
                    }
                    break;
                case "SVG":
                    if (!o.settings.warnedSVG) {
                        if (u.isMSIE && !e) {
                            t = q.SVG.MSIE
                        }
                    }
                    break
            }
            if (t) {
                t += "\n\nSwitch the renderer anyway?\n\n(Press OK to switch, CANCEL to continue with the current renderer)";
                a.cookie.renderer = r[0].id;
                a.saveCookie();
                if (!confirm(t)) {
                    return
                }
                if (s) {
                    a.cookie[s] = o.settings[s] = true
                }
                a.cookie.renderer = o.settings.renderer;
                a.saveCookie()
            }
            c.Queue(["setRenderer", c, o.settings.renderer, "jax/mml"], ["Rerender", c])
        }
    };
    a.Renderer.Messages = {
        MML: {
            WebKit: "Your browser doesn't seem to support MathML natively, so switching to MathML output may cause the mathematics on the page to become unreadable.",
            MSIE: "Internet Explorer requires the MathPlayer plugin in order to process MathML output.",
            Opera: "Opera's support for MathML is limited, so switching to MathML output may cause some expressions to render poorly.",
            Safari: "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly.",
            Firefox: "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly."
        },
        SVG: {
            MSIE: "SVG is not implemented in Internet Explorer prior to IE9, or when the browser is emulating IE8 or below. Switching to SVG output will cause the mathemtics to not display properly."
        }
    };
    a.Font = function () {
        var q = b["HTML-CSS"];
        if (!q) {
            return
        }
        document.location.reload()
    };
    a.MPEvents = function (s) {
        var r = o.settings.discoverable,
            q = a.MPEvents.Messages;
        if (!e) {
            if (o.settings.mpMouse && !confirm(q.IE8warning)) {
                delete a.cookie.mpContext;
                delete o.settings.mpContext;
                delete a.cookie.mpMouse;
                delete o.settings.mpMouse;
                a.saveCookie();
                return
            }
            o.settings.mpContext = o.settings.mpMouse;
            a.cookie.mpContext = a.cookie.mpMouse = o.settings.mpMouse;
            a.saveCookie();
            MathJax.Hub.Queue(["Rerender", MathJax.Hub])
        } else {
            if (!r && s.name === "Menu Events" && o.settings.mpContext) {
                alert(q.IE9warning)
            }
        }
    };
    a.MPEvents.Messages = {
        IE8warning: "This will disable the MathJax menu and zoom features, but you can Alt-Click on an expression to obtain the MathJax menu instead.\n\nReally change the MathPlayer settings?",
        IE9warning: "The MathJax contextual menu will be disabled, but you can Alt-Click on an expression to obtain the MathJax menu instead."
    };
    c.Browser.Select({
        MSIE: function (q) {
            var r = (document.compatMode === "BackCompat");
            var s = q.versionAtLeast("8.0") && document.documentMode > 7;
            a.Augment({
                margin: 20,
                msieBackgroundBug: (document.documentMode < 9),
                msieFixedPositionBug: (r || !s),
                msieAboutBug: r
            });
            if (e) {
                delete o.styles["#MathJax_About"].filter;
                delete o.styles[".MathJax_Menu"].filter
            }
        },
        Firefox: function (q) {
            a.skipMouseover = q.isMobile && q.versionAtLeast("6.0");
            a.skipMousedown = q.isMobile
        }
    });
    a.isMobile = c.Browser.isMobile;
    a.noContextMenu = c.Browser.noContextMenu;
    c.Register.StartupHook("End Config", function () {
        o.settings = c.config.menuSettings;
        if (typeof (o.settings.showRenderer) !== "undefined") {
            o.showRenderer = o.settings.showRenderer
        }
        if (typeof (o.settings.showFontMenu) !== "undefined") {
            o.showFontMenu = o.settings.showFontMenu
        }
        if (typeof (o.settings.showContext) !== "undefined") {
            o.showContext = o.settings.showContext
        }
        a.getCookie();
        a.menu = a(m.SUBMENU("Show Math As", m.COMMAND("MathML Code", a.ShowSource, {
            nativeTouch: true,
            format: "MathML"
        }), m.COMMAND("Original Form", a.ShowSource, {
            nativeTouch: true
        }), m.RULE(), m.CHECKBOX("Show TeX hints in MathML", "texHints")), m.RULE(), m.SUBMENU("Math Settings", m.SUBMENU("Zoom Trigger", m.RADIO("Hover", "zoom", {
            action: a.Zoom
        }), m.RADIO("Click", "zoom", {
            action: a.Zoom
        }), m.RADIO("Double-Click", "zoom", {
            action: a.Zoom
        }), m.RADIO("No Zoom", "zoom", {
            value: "None"
        }), m.RULE(), m.LABEL("Trigger Requires:"), m.CHECKBOX((c.Browser.isMac ? "Option" : "Alt"), "ALT"), m.CHECKBOX("Command", "CMD", {
            hidden: !c.Browser.isMac
        }), m.CHECKBOX("Control", "CTRL", {
            hidden: c.Browser.isMac
        }), m.CHECKBOX("Shift", "Shift")), m.SUBMENU("Zoom Factor", m.RADIO("125%", "zscale"), m.RADIO("133%", "zscale"), m.RADIO("150%", "zscale"), m.RADIO("175%", "zscale"), m.RADIO("200%", "zscale"), m.RADIO("250%", "zscale"), m.RADIO("300%", "zscale"), m.RADIO("400%", "zscale")), m.RULE(), m.SUBMENU("Math Renderer", {
            hidden: !o.showRenderer
        }, m.RADIO("HTML-CSS", "renderer", {
            action: a.Renderer
        }), m.RADIO("MathML", "renderer", {
            action: a.Renderer,
            value: "NativeMML"
        }), m.RADIO("SVG", "renderer", {
            action: a.Renderer
        })), m.SUBMENU("MathPlayer", {
            hidden: !c.Browser.isMSIE || !o.showMathPlayer,
            disabled: !c.Browser.hasMathPlayer
        }, m.LABEL("Let MathPlayer Handle:"), m.CHECKBOX("Menu Events", "mpContext", {
            action: a.MPEvents,
            hidden: !e
        }), m.CHECKBOX("Mouse Events", "mpMouse", {
            action: a.MPEvents,
            hidden: !e
        }), m.CHECKBOX("Mouse and Menu Events", "mpMouse", {
            action: a.MPEvents,
            hidden: e
        })), m.SUBMENU("Font Preference", {
            hidden: !o.showFontMenu
        }, m.LABEL("For HTML-CSS:"), m.RADIO("Auto", "font", {
            action: a.Font
        }), m.RULE(), m.RADIO("TeX (local)", "font", {
            action: a.Font
        }), m.RADIO("TeX (web)", "font", {
            action: a.Font
        }), m.RADIO("TeX (image)", "font", {
            action: a.Font
        }), m.RULE(), m.RADIO("STIX (local)", "font", {
            action: a.Font
        })), m.SUBMENU("Contextual Menu", {
            hidden: !o.showContext
        }, m.RADIO("MathJax", "context"), m.RADIO("Browser", "context")), m.COMMAND("Scale All Math ...", a.Scale), m.RULE().With({
            hidden: !o.showDiscoverable,
            name: "discover_rule"
        }), m.CHECKBOX("Highlight on Hover", "discoverable", {
            hidden: !o.showDiscoverable
        })), m.RULE(), m.COMMAND("About MathJax", a.About), m.COMMAND("MathJax Help", a.Help));
        if (a.isMobile) {
            (function () {
                var r = o.settings;
                var q = a.menu.Find("Math Settings", "Zoom Trigger").menu;
                q.items[0].disabled = q.items[1].disabled = true;
                if (r.zoom === "Hover" || r.zoom == "Click") {
                    r.zoom = "None"
                }
                q.items = q.items.slice(0, 4);
                if (navigator.appVersion.match(/[ (]Android[) ]/)) {
                    a.ITEM.SUBMENU.Augment({
                        marker: "\u00BB"
                    })
                }
            })()
        }
    });
    a.showRenderer = function (q) {
        a.cookie.showRenderer = o.showRenderer = q;
        a.saveCookie();
        a.menu.Find("Math Settings", "Math Renderer").hidden = !q
    };
    a.showMathPlayer = function (q) {
        a.cookie.showMathPlayer = o.showMathPlayer = q;
        a.saveCookie();
        a.menu.Find("Math Settings", "MathPlayer").hidden = !q
    };
    a.showFontMenu = function (q) {
        a.cookie.showFontMenu = o.showFontMenu = q;
        a.saveCookie();
        a.menu.Find("Math Settings", "Font Preference").hidden = !q
    };
    a.showContext = function (q) {
        a.cookie.showContext = o.showContext = q;
        a.saveCookie();
        a.menu.Find("Math Settings", "Contextual Menu").hidden = !q
    };
    a.showDiscoverable = function (q) {
        a.cookie.showContext = o.showContext = q;
        a.saveCookie();
        a.menu.Find("Math Settings", "Highlight on Hover").hidden = !q;
        a.menu.Find("Math Settings", "discover_rule").hidden = !q
    };
    MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function () {
        if (!MathJax.OutputJax["HTML-CSS"].config.imageFont) {
            a.menu.Find("Math Settings", "Font Preference", "TeX (image)").disabled = true
        }
    });
    f.Queue(c.Register.StartupHook("End Config", {}), ["getImages", a], ["Styles", k, o.styles], ["Post", c.Startup.signal, "MathMenu Ready"], ["loadComplete", k, "[MathJax]/extensions/MathMenu.js"])
})(MathJax.Hub, MathJax.HTML, MathJax.Ajax, MathJax.CallBack, MathJax.OutputJax);