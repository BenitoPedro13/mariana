/*! jQuery Migrate v3.4.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
"undefined"==typeof jQuery.migrateMute&&(jQuery.migrateMute=!0),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(e){return t(e,window)}):"object"==typeof module&&module.exports?module.exports=t(require("jquery"),window):t(jQuery,window)}(function(s,n){"use strict";function e(e){return 0<=function(e,t){for(var r=/^(\d+)\.(\d+)\.(\d+)/,n=r.exec(e)||[],o=r.exec(t)||[],a=1;a<=3;a++){if(+o[a]<+n[a])return 1;if(+n[a]<+o[a])return-1}return 0}(s.fn.jquery,e)}s.migrateVersion="3.4.1";var t=Object.create(null);s.migrateDisablePatches=function(){for(var e=0;e<arguments.length;e++)t[arguments[e]]=!0},s.migrateEnablePatches=function(){for(var e=0;e<arguments.length;e++)delete t[arguments[e]]},s.migrateIsPatchEnabled=function(e){return!t[e]},n.console&&n.console.log&&(s&&e("3.0.0")&&!e("5.0.0")||n.console.log("JQMIGRATE: jQuery 3.x-4.x REQUIRED"),s.migrateWarnings&&n.console.log("JQMIGRATE: Migrate plugin loaded multiple times"),n.console.log("JQMIGRATE: Migrate is installed"+(s.migrateMute?"":" with logging active")+", version "+s.migrateVersion));var o={};function u(e,t){var r=n.console;!s.migrateIsPatchEnabled(e)||s.migrateDeduplicateWarnings&&o[t]||(o[t]=!0,s.migrateWarnings.push(t+" ["+e+"]"),r&&r.warn&&!s.migrateMute&&(r.warn("JQMIGRATE: "+t),s.migrateTrace&&r.trace&&r.trace()))}function r(e,t,r,n,o){Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){return u(n,o),r},set:function(e){u(n,o),r=e}})}function a(e,t,r,n,o){var a=e[t];e[t]=function(){return o&&u(n,o),(s.migrateIsPatchEnabled(n)?r:a||s.noop).apply(this,arguments)}}function c(e,t,r,n,o){if(!o)throw new Error("No warning message provided");return a(e,t,r,n,o),0}function i(e,t,r,n){return a(e,t,r,n),0}s.migrateDeduplicateWarnings=!0,s.migrateWarnings=[],void 0===s.migrateTrace&&(s.migrateTrace=!0),s.migrateReset=function(){o={},s.migrateWarnings.length=0},"BackCompat"===n.document.compatMode&&u("quirks","jQuery is not compatible with Quirks Mode");var d,l,p,f={},m=s.fn.init,y=s.find,h=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,g=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,v=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;for(d in i(s.fn,"init",function(e){var t=Array.prototype.slice.call(arguments);return s.migrateIsPatchEnabled("selector-empty-id")&&"string"==typeof e&&"#"===e&&(u("selector-empty-id","jQuery( '#' ) is not a valid selector"),t[0]=[]),m.apply(this,t)},"selector-empty-id"),s.fn.init.prototype=s.fn,i(s,"find",function(t){var r=Array.prototype.slice.call(arguments);if("string"==typeof t&&h.test(t))try{n.document.querySelector(t)}catch(e){t=t.replace(g,function(e,t,r,n){return"["+t+r+'"'+n+'"]'});try{n.document.querySelector(t),u("selector-hash","Attribute selector with '#' must be quoted: "+r[0]),r[0]=t}catch(e){u("selector-hash","Attribute selector with '#' was not fixed: "+r[0])}}return y.apply(this,r)},"selector-hash"),y)Object.prototype.hasOwnProperty.call(y,d)&&(s.find[d]=y[d]);c(s.fn,"size",function(){return this.length},"size","jQuery.fn.size() is deprecated and removed; use the .length property"),c(s,"parseJSON",function(){return JSON.parse.apply(null,arguments)},"parseJSON","jQuery.parseJSON is deprecated; use JSON.parse"),c(s,"holdReady",s.holdReady,"holdReady","jQuery.holdReady is deprecated"),c(s,"unique",s.uniqueSort,"unique","jQuery.unique is deprecated; use jQuery.uniqueSort"),r(s.expr,"filters",s.expr.pseudos,"expr-pre-pseudos","jQuery.expr.filters is deprecated; use jQuery.expr.pseudos"),r(s.expr,":",s.expr.pseudos,"expr-pre-pseudos","jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos"),e("3.1.1")&&c(s,"trim",function(e){return null==e?"":(e+"").replace(v,"$1")},"trim","jQuery.trim is deprecated; use String.prototype.trim"),e("3.2.0")&&(c(s,"nodeName",function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},"nodeName","jQuery.nodeName is deprecated"),c(s,"isArray",Array.isArray,"isArray","jQuery.isArray is deprecated; use Array.isArray")),e("3.3.0")&&(c(s,"isNumeric",function(e){var t=typeof e;return("number"==t||"string"==t)&&!isNaN(e-parseFloat(e))},"isNumeric","jQuery.isNumeric() is deprecated"),s.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){f["[object "+t+"]"]=t.toLowerCase()}),c(s,"type",function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?f[Object.prototype.toString.call(e)]||"object":typeof e},"type","jQuery.type is deprecated"),c(s,"isFunction",function(e){return"function"==typeof e},"isFunction","jQuery.isFunction() is deprecated"),c(s,"isWindow",function(e){return null!=e&&e===e.window},"isWindow","jQuery.isWindow() is deprecated")),s.ajax&&(l=s.ajax,p=/(=)\?(?=&|$)|\?\?/,i(s,"ajax",function(){var e=l.apply(this,arguments);return e.promise&&(c(e,"success",e.done,"jqXHR-methods","jQXHR.success is deprecated and removed"),c(e,"error",e.fail,"jqXHR-methods","jQXHR.error is deprecated and removed"),c(e,"complete",e.always,"jqXHR-methods","jQXHR.complete is deprecated and removed")),e},"jqXHR-methods"),e("4.0.0")||s.ajaxPrefilter("+json",function(e){!1!==e.jsonp&&(p.test(e.url)||"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&p.test(e.data))&&u("jsonp-promotion","JSON-to-JSONP auto-promotion is deprecated")}));var j=s.fn.removeAttr,b=s.fn.toggleClass,w=/\S+/g;function x(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()})}i(s.fn,"removeAttr",function(e){var r=this,n=!1;return s.each(e.match(w),function(e,t){s.expr.match.bool.test(t)&&r.each(function(){if(!1!==s(this).prop(t))return!(n=!0)}),n&&(u("removeAttr-bool","jQuery.fn.removeAttr no longer sets boolean properties: "+t),r.prop(t,!1))}),j.apply(this,arguments)},"removeAttr-bool"),i(s.fn,"toggleClass",function(t){return void 0!==t&&"boolean"!=typeof t?b.apply(this,arguments):(u("toggleClass-bool","jQuery.fn.toggleClass( boolean ) is deprecated"),this.each(function(){var e=this.getAttribute&&this.getAttribute("class")||"";e&&s.data(this,"__className__",e),this.setAttribute&&this.setAttribute("class",!e&&!1!==t&&s.data(this,"__className__")||"")}))},"toggleClass-bool");var Q,A,R=!1,C=/^[a-z]/,N=/^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;s.swap&&s.each(["height","width","reliableMarginRight"],function(e,t){var r=s.cssHooks[t]&&s.cssHooks[t].get;r&&(s.cssHooks[t].get=function(){var e;return R=!0,e=r.apply(this,arguments),R=!1,e})}),i(s,"swap",function(e,t,r,n){var o,a,i={};for(a in R||u("swap","jQuery.swap() is undocumented and deprecated"),t)i[a]=e.style[a],e.style[a]=t[a];for(a in o=r.apply(e,n||[]),t)e.style[a]=i[a];return o},"swap"),e("3.4.0")&&"undefined"!=typeof Proxy&&(s.cssProps=new Proxy(s.cssProps||{},{set:function(){return u("cssProps","jQuery.cssProps is deprecated"),Reflect.set.apply(this,arguments)}})),e("4.0.0")?(A={animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},"undefined"!=typeof Proxy?s.cssNumber=new Proxy(A,{get:function(){return u("css-number","jQuery.cssNumber is deprecated"),Reflect.get.apply(this,arguments)},set:function(){return u("css-number","jQuery.cssNumber is deprecated"),Reflect.set.apply(this,arguments)}}):s.cssNumber=A):A=s.cssNumber,Q=s.fn.css,i(s.fn,"css",function(e,t){var r,n,o=this;return e&&"object"==typeof e&&!Array.isArray(e)?(s.each(e,function(e,t){s.fn.css.call(o,e,t)}),this):("number"==typeof t&&(r=x(e),n=r,C.test(n)&&N.test(n[0].toUpperCase()+n.slice(1))||A[r]||u("css-number",'Number-typed values are deprecated for jQuery.fn.css( "'+e+'", value )')),Q.apply(this,arguments))},"css-number");var S,P,k,H,E=s.data;i(s,"data",function(e,t,r){var n,o,a;if(t&&"object"==typeof t&&2===arguments.length){for(a in n=s.hasData(e)&&E.call(this,e),o={},t)a!==x(a)?(u("data-camelCase","jQuery.data() always sets/gets camelCased names: "+a),n[a]=t[a]):o[a]=t[a];return E.call(this,e,o),t}return t&&"string"==typeof t&&t!==x(t)&&(n=s.hasData(e)&&E.call(this,e))&&t in n?(u("data-camelCase","jQuery.data() always sets/gets camelCased names: "+t),2<arguments.length&&(n[t]=r),n[t]):E.apply(this,arguments)},"data-camelCase"),s.fx&&(k=s.Tween.prototype.run,H=function(e){return e},i(s.Tween.prototype,"run",function(){1<s.easing[this.easing].length&&(u("easing-one-arg","'jQuery.easing."+this.easing.toString()+"' should use only one argument"),s.easing[this.easing]=H),k.apply(this,arguments)},"easing-one-arg"),S=s.fx.interval,P="jQuery.fx.interval is deprecated",n.requestAnimationFrame&&Object.defineProperty(s.fx,"interval",{configurable:!0,enumerable:!0,get:function(){return n.document.hidden||u("fx-interval",P),s.migrateIsPatchEnabled("fx-interval")&&void 0===S?13:S},set:function(e){u("fx-interval",P),S=e}}));var M=s.fn.load,q=s.event.add,O=s.event.fix;s.event.props=[],s.event.fixHooks={},r(s.event.props,"concat",s.event.props.concat,"event-old-patch","jQuery.event.props.concat() is deprecated and removed"),i(s.event,"fix",function(e){var t,r=e.type,n=this.fixHooks[r],o=s.event.props;if(o.length){u("event-old-patch","jQuery.event.props are deprecated and removed: "+o.join());while(o.length)s.event.addProp(o.pop())}if(n&&!n._migrated_&&(n._migrated_=!0,u("event-old-patch","jQuery.event.fixHooks are deprecated and removed: "+r),(o=n.props)&&o.length))while(o.length)s.event.addProp(o.pop());return t=O.call(this,e),n&&n.filter?n.filter(t,e):t},"event-old-patch"),i(s.event,"add",function(e,t){return e===n&&"load"===t&&"complete"===n.document.readyState&&u("load-after-event","jQuery(window).on('load'...) called after load event occurred"),q.apply(this,arguments)},"load-after-event"),s.each(["load","unload","error"],function(e,t){i(s.fn,t,function(){var e=Array.prototype.slice.call(arguments,0);return"load"===t&&"string"==typeof e[0]?M.apply(this,e):(u("shorthand-removed-v3","jQuery.fn."+t+"() is deprecated"),e.splice(0,0,t),arguments.length?this.on.apply(this,e):(this.triggerHandler.apply(this,e),this))},"shorthand-removed-v3")}),s.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,r){c(s.fn,r,function(e,t){return 0<arguments.length?this.on(r,null,e,t):this.trigger(r)},"shorthand-deprecated-v3","jQuery.fn."+r+"() event shorthand is deprecated")}),s(function(){s(n.document).triggerHandler("ready")}),s.event.special.ready={setup:function(){this===n.document&&u("ready-event","'ready' event is deprecated")}},c(s.fn,"bind",function(e,t,r){return this.on(e,null,t,r)},"pre-on-methods","jQuery.fn.bind() is deprecated"),c(s.fn,"unbind",function(e,t){return this.off(e,null,t)},"pre-on-methods","jQuery.fn.unbind() is deprecated"),c(s.fn,"delegate",function(e,t,r,n){return this.on(t,e,r,n)},"pre-on-methods","jQuery.fn.delegate() is deprecated"),c(s.fn,"undelegate",function(e,t,r){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",r)},"pre-on-methods","jQuery.fn.undelegate() is deprecated"),c(s.fn,"hover",function(e,t){return this.on("mouseenter",e).on("mouseleave",t||e)},"pre-on-methods","jQuery.fn.hover() is deprecated");function T(e){var t=n.document.implementation.createHTMLDocument("");return t.body.innerHTML=e,t.body&&t.body.innerHTML}var F=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;s.UNSAFE_restoreLegacyHtmlPrefilter=function(){s.migrateEnablePatches("self-closed-tags")},i(s,"htmlPrefilter",function(e){var t,r;return(r=(t=e).replace(F,"<$1></$2>"))!==t&&T(t)!==T(r)&&u("self-closed-tags","HTML tags must be properly nested and closed: "+t),e.replace(F,"<$1></$2>")},"self-closed-tags"),s.migrateDisablePatches("self-closed-tags");var D,W,_,I=s.fn.offset;return i(s.fn,"offset",function(){var e=this[0];return!e||e.nodeType&&e.getBoundingClientRect?I.apply(this,arguments):(u("offset-valid-elem","jQuery.fn.offset() requires a valid DOM element"),arguments.length?this:void 0)},"offset-valid-elem"),s.ajax&&(D=s.param,i(s,"param",function(e,t){var r=s.ajaxSettings&&s.ajaxSettings.traditional;return void 0===t&&r&&(u("param-ajax-traditional","jQuery.param() no longer uses jQuery.ajaxSettings.traditional"),t=r),D.call(this,e,t)},"param-ajax-traditional")),c(s.fn,"andSelf",s.fn.addBack,"andSelf","jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()"),s.Deferred&&(W=s.Deferred,_=[["resolve","done",s.Callbacks("once memory"),s.Callbacks("once memory"),"resolved"],["reject","fail",s.Callbacks("once memory"),s.Callbacks("once memory"),"rejected"],["notify","progress",s.Callbacks("memory"),s.Callbacks("memory")]],i(s,"Deferred",function(e){var a=W(),i=a.promise();function t(){var o=arguments;return s.Deferred(function(n){s.each(_,function(e,t){var r="function"==typeof o[e]&&o[e];a[t[1]](function(){var e=r&&r.apply(this,arguments);e&&"function"==typeof e.promise?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[t[0]+"With"](this===i?n.promise():this,r?[e]:arguments)})}),o=null}).promise()}return c(a,"pipe",t,"deferred-pipe","deferred.pipe() is deprecated"),c(i,"pipe",t,"deferred-pipe","deferred.pipe() is deprecated"),e&&e.call(a,a),a},"deferred-pipe"),s.Deferred.exceptionHook=W.exceptionHook),s});
;
(function () {

    /* =========================================================
       MOBILE REFRESH — ALWAYS START FROM THE TOP
       Prevent the browser from restoring the previous scroll
       position (for example SERVICES) after a reload.
       MOBILE ONLY. Desktop behavior is untouched.
    ========================================================= */

    const isMobileViewport =
        window.matchMedia(
            "(max-width: 767px)"
        ).matches;


    if (
        isMobileViewport &&
        "scrollRestoration" in window.history
    ) {

        window.history.scrollRestoration =
            "manual";

    }


    function resetMobileReloadPosition() {

        if (!isMobileViewport) {
            return;
        }


        let isReload = false;


        if (
            window.performance &&
            typeof window.performance.getEntriesByType === "function"
        ) {

            const navigationEntries =
                window.performance.getEntriesByType(
                    "navigation"
                );


            if (navigationEntries.length) {

                isReload =
                    navigationEntries[0].type ===
                    "reload";

            }

        } else if (
            window.performance &&
            window.performance.navigation
        ) {

            isReload =
                window.performance.navigation.type === 1;

        }


        if (!isReload) {
            return;
        }


        if (
            window.location.hash &&
            window.history &&
            window.history.replaceState
        ) {

            window.history.replaceState(
                null,
                "",
                window.location.pathname +
                window.location.search
            );

        }


        window.scrollTo(0, 0);


        window.requestAnimationFrame(
            function () {

                window.scrollTo(0, 0);

            }
        );

    }


    window.addEventListener(
        "pageshow",
        resetMobileReloadPosition,
        {
            once: true
        }
    );


    const header =
        document.querySelector(
            ".offform-header"
        );


    const mobileButton =
        document.querySelector(
            ".offform-mobile-menu-button"
        );


    const mobileMenuLinks =
        document.querySelectorAll(
            ".offform-mobile-menu a"
        );


    function showHeader() {

        if (!header) {
            return;
        }


        header.classList.add(
            "is-visible"
        );

    }


    /* =========================================================
       MOBILE MENU
    ========================================================= */

    if (
        header &&
        mobileButton
    ) {

        mobileButton.addEventListener(
            "pointerup",
            function (event) {

                event.preventDefault();

                const isOpen =
                    header.classList.toggle(
                        "menu-open"
                    );


                mobileButton.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );


                mobileButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close menu"
                        : "Open menu"
                );

            }
        );


        /* =====================================================
           ACCESSIBILITY — MOBILE MENU KEYBOARD SUPPORT
           POINTER / TOUCH BEHAVIOR ABOVE REMAINS UNCHANGED.
        ===================================================== */

        mobileButton.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !== "Enter" &&
                    event.key !== " "
                ) {
                    return;
                }


                event.preventDefault();


                const isOpen =
                    header.classList.toggle(
                        "menu-open"
                    );


                mobileButton.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );


                mobileButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close menu"
                        : "Open menu"
                );

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !== "Escape" ||
                    !header.classList.contains(
                        "menu-open"
                    )
                ) {
                    return;
                }


                header.classList.remove(
                    "menu-open"
                );


                mobileButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                mobileButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );


                mobileButton.focus();

            }
        );


        mobileMenuLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        let target =
                            href
                                ? document.querySelector(href)
                                : null;


                        /*
                         * MOBILE STICKY/PIN SECTIONS:
                         * ABOUT + CONTACT live inside animated/sticky wrappers.
                         * Scroll to the section root instead of the inner
                         * absolutely-positioned element so the mobile pin
                         * engine receives the correct page position.
                         */
                        if (
                            window.matchMedia(
                                "(max-width: 767px)"
                            ).matches
                        ) {

                            if (
                                href === "#about"
                            ) {

                                target =
                                    document.querySelector(
                                        ".offform-about-work"
                                    ) ||
                                    target;

                            }


                            if (
                                href === "#contact"
                            ) {

                                target =
                                    document.querySelector(
                                        ".offform-final"
                                    ) ||
                                    target;

                            }

                        }


                        if (target) {

                            event.preventDefault();


                            const targetTop =
                                target
                                    .getBoundingClientRect()
                                    .top +
                                (
                                    window.scrollY ||
                                    window.pageYOffset
                                );


                            window.scrollTo(
                                {
                                    top: targetTop,
                                    behavior: "smooth"
                                }
                            );


                            /*
                             * KEEP ONE-PAGE NAVIGATION OUT OF THE URL.
                             * ABOUT / TALENTS / SERVICES / CONTACT
                             * should scroll without leaving a hash that
                             * can send the browser back there on refresh.
                             */
                            if (
                                window.history &&
                                window.history.replaceState
                            ) {

                                window.history.replaceState(
                                    null,
                                    "",
                                    window.location.pathname +
                                    window.location.search
                                );

                            }

                        }


                        header.classList.remove(
                            "menu-open"
                        );


                        mobileButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        mobileButton.setAttribute(
                            "aria-label",
                            "Open menu"
                        );

                    }
                );

            }
        );

    }


    /* =========================================================
       ONE-PAGE NAVIGATION — ACTIVE STATE ONLY
       LINKS THEMSELVES USE NORMAL NATIVE ANCHORS
    ========================================================= */

    function initActiveNavigation() {

        const allMenuLinks =
            Array.from(
                document.querySelectorAll(
                    ".offform-nav a, .offform-mobile-menu a"
                )
            );


        const navTargets =
            allMenuLinks
                .map(
                    function (link) {

                        const selector =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !selector ||
                            selector.charAt(0) !== "#"
                        ) {

                            return null;

                        }


                        const target =
                            document.querySelector(
                                selector
                            );


                        return target
                            ? {
                                selector: selector,
                                target: target
                            }
                            : null;

                    }
                )
                .filter(Boolean);


        function setActiveMenuItem(selector) {

            allMenuLinks.forEach(
                function (link) {

                    const isActive =
                        link.getAttribute("href") === selector;


                    link.classList.toggle(
                        "is-active",
                        isActive
                    );


                    if (isActive) {

                        link.setAttribute(
                            "aria-current",
                            "location"
                        );

                    }

                    else {

                        link.removeAttribute(
                            "aria-current"
                        );

                    }

                }
            );

        }


        function updateActiveMenuItem() {

            if (!navTargets.length) {
                return;
            }


            const activationLine =
                window.innerHeight * 0.35;


            let activeSelector =
                "";


            navTargets.forEach(
                function (item) {

                    const rect =
                        item.target.getBoundingClientRect();


                    if (
                        rect.top <= activationLine &&
                        rect.bottom > activationLine
                    ) {

                        activeSelector =
                            item.selector;

                    }

                }
            );


            setActiveMenuItem(
                activeSelector
            );

        }


        let navScrollTicking =
            false;


        window.addEventListener(
            "scroll",
            function () {

                if (navScrollTicking) {
                    return;
                }


                navScrollTicking =
                    true;


                requestAnimationFrame(
                    function () {

                        updateActiveMenuItem();

                        navScrollTicking =
                            false;

                    }
                );

            },
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            updateActiveMenuItem,
            {
                passive: true
            }
        );


        updateActiveMenuItem();

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initActiveNavigation,
            {
                once: true
            }
        );

    } else {

        initActiveNavigation();

    }


    window.addEventListener(
        "offform-hero-ready",
        showHeader,
        {
            once: true
        }
    );


    if (
        window.__offformHeroReady
    ) {

        showHeader();

    }


    /* Safety fallback if intro code is absent */

    window.setTimeout(
        function () {

            if (
                !window.__offformLoaderActive &&
                !window.__offformHeroReady
            ) {

                showHeader();

            }

        },
        1200
    );


})();;
(function () {

    /* =========================================================
       MOBILE + TABLET ONLY — HEADER FIRST TAP
       OFFFORM LOGO + MENU BUTTON + MENU LINKS
       Desktop / wide untouched.
    ========================================================= */

    if (!window.matchMedia("(max-width: 1024px)").matches) {
        return;
    }

    const logo = document.querySelector(".offform-logo");
    const menuButton = document.querySelector(".offform-mobile-menu-button");
    const menuLinks = document.querySelectorAll(".offform-mobile-menu a");

    function fireFirstTapClick(element) {
        if (!element) {
            return;
        }

        element.addEventListener(
            "touchend",
            function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                element.click();
            },
            { passive: false }
        );
    }

    fireFirstTapClick(logo);
    fireFirstTapClick(menuButton);

    menuLinks.forEach(function (link) {
        fireFirstTapClick(link);
    });

})();;
(function () {

    window.__offformLoaderActive =
        true;


    window.__offformLoaderComplete =
        false;


    const root =
        document.documentElement;


    const loader =
        document.getElementById(
            "offform-loader"
        );


    const lineWrap =
        document.getElementById(
            "offform-loader-line-wrap"
        );


    const counter =
        document.getElementById(
            "offform-loader-counter"
        );


    const zone =
        document.getElementById(
            "offform-loader-progress-zone"
        );


    const line =
        document.getElementById(
            "offform-loader-line"
        );


    const square =
        document.getElementById(
            "offform-loader-square"
        );


    if (
        !loader ||
        !lineWrap ||
        !counter ||
        !zone ||
        !line ||
        !square
    ) {

        window.__offformLoaderActive =
            false;

        return;

    }


    root.classList.add(
        "offform-loading"
    );


    /* =========================================================
       ASSETS
    ========================================================= */

    const assets = [

        /* HERO */
        "https://offform.net/wp-content/uploads/2026/08/a1.png",
        "https://offform.net/wp-content/uploads/2026/08/a4.png",
        "https://offform.net/wp-content/uploads/2026/08/a3.png",

        /* TALENTS — WOMEN */
        "https://offform.net/wp-content/uploads/2026/08/n1.png",
        "https://offform.net/wp-content/uploads/2026/08/n2.png",
        "https://offform.net/wp-content/uploads/2026/08/n3.png",
        "https://offform.net/wp-content/uploads/2026/08/n4.png",
        "https://offform.net/wp-content/uploads/2026/08/n5.png",
        "https://offform.net/wp-content/uploads/2026/08/n6.png",
        "https://offform.net/wp-content/uploads/2026/08/n7.png",
        "https://offform.net/wp-content/uploads/2026/08/n8.png",
        "https://offform.net/wp-content/uploads/2026/08/n9.png",
        "https://offform.net/wp-content/uploads/2026/08/n10.png",

        /* TALENTS — MEN */
        "https://offform.net/wp-content/uploads/2026/08/y1.png",
        "https://offform.net/wp-content/uploads/2026/08/y2.png",
        "https://offform.net/wp-content/uploads/2026/08/y3.png",
        "https://offform.net/wp-content/uploads/2026/08/y4.png",
        "https://offform.net/wp-content/uploads/2026/08/y5.png",
        "https://offform.net/wp-content/uploads/2026/08/y6.png",
        "https://offform.net/wp-content/uploads/2026/08/y7.png",
        "https://offform.net/wp-content/uploads/2026/08/y8.png",
        "https://offform.net/wp-content/uploads/2026/08/y9.png",
        "https://offform.net/wp-content/uploads/2026/08/y10.png",

        /* SERVICES — LARGE OPENING / SPLIT IMAGE */
        "https://offform.net/wp-content/uploads/2026/08/o6-1.png",

        /* SELECTED CAMPAIGNS — FIRST OPENING IMAGE */
        "https://offform.net/wp-content/uploads/2026/08/d5.png"

    ];


    /*
     * KEEP PRELOADED / DECODED IMAGES ALIVE.
     * The loader now does not finish until every image above
     * has loaded and, where supported, decoded.
     */
    window.__offformPreloadedImages =
        window.__offformPreloadedImages ||
        new Map();


    const startTime =
        performance.now();


    const MIN_DURATION =
        1500;


    let loadedAssets =
        0;


    let pageReady =
        document.readyState ===
        "complete";


    let displayedProgress =
        0;


    let finished =
        false;


    let completing =
        false;


    /* =========================================================
       DESKTOP = HERO SYNC
       MOBILE = TRUE SCREEN CENTER
    ========================================================= */

    function syncLoaderToHero() {

        /*
         * MOBILE:
         * Do not sync to Hero.
         * Keep loader exactly in the center of the viewport.
         */

        if (
            window.matchMedia(
                "(max-width: 767px)"
            ).matches
        ) {

            lineWrap.style.top =
                "50vh";

            return true;

        }


        /*
         * DESKTOP:
         * Preserve original Hero synchronization.
         */

        const heroLineWrap =
            document.querySelector(
                ".offform-hero-line-wrap"
            );


        if (!heroLineWrap) {

            return false;

        }


        const heroRect =
            heroLineWrap.getBoundingClientRect();


        const heroCenterY =
            heroRect.top +
            (
                heroRect.height / 2
            );


        lineWrap.style.top =
            heroCenterY + "px";


        return true;

    }


    /* =========================================================
       ASSET LOADING
    ========================================================= */

    function assetDone() {

        loadedAssets =
            Math.min(
                assets.length,
                loadedAssets + 1
            );

    }


    assets.forEach(
        function (src) {

            const image =
                new Image();

            let assetSettled =
                false;


            function finishAsset() {

                if (assetSettled) {
                    return;
                }


                assetSettled =
                    true;


                window.__offformPreloadedImages.set(
                    src,
                    image
                );


                assetDone();

            }


            image.onload =
                function () {

                    /*
                     * Loading is not enough for the roster previews:
                     * wait for browser decoding too, so the first hover
                     * does not have to decode the PNG on demand.
                     */
                    if (
                        typeof image.decode ===
                        "function"
                    ) {

                        image.decode()
                            .catch(
                                function () {}
                            )
                            .finally(
                                finishAsset
                            );

                        return;

                    }


                    finishAsset();

                };


            image.onerror =
                finishAsset;


            image.src =
                src;

        }
    );


    if (!pageReady) {

        window.addEventListener(
            "load",
            function () {

                pageReady =
                    true;


                syncLoaderToHero();

            },
            {
                once: true
            }
        );

    }


    /* =========================================================
       REAL PROGRESS
    ========================================================= */

    function getAssetProgress() {

        const assetPart =
            assets.length > 0

                ? (
                    loadedAssets /
                    assets.length
                ) * 90

                : 90;


        const pagePart =
            pageReady
                ? 10
                : 0;


        return Math.min(
            100,
            assetPart +
            pagePart
        );

    }


    /* =========================================================
       TIME PROGRESS
    ========================================================= */

    function getTimeProgress(elapsed) {

        return Math.min(
            100,
            (
                elapsed /
                MIN_DURATION
            ) * 100
        );

    }


    /* =========================================================
       DRAW
    ========================================================= */

    function drawProgress(value) {

        const clamped =
            Math.max(
                0,
                Math.min(
                    100,
                    value
                )
            );


        counter.textContent =
            Math.round(
                clamped
            ) + "%";


        const wrapStyle =
            getComputedStyle(
                lineWrap
            );


        const gap =
            parseFloat(
                wrapStyle.columnGap ||
                wrapStyle.gap
            ) ||
            0;


        const maxZoneWidth =
            Math.max(
                0,
                lineWrap.clientWidth -
                counter.offsetWidth -
                square.offsetWidth -
                (gap * 2)
            );


        const currentZoneWidth =
            maxZoneWidth *
            (
                clamped / 100
            );


        zone.style.width =
            currentZoneWidth.toFixed(3) +
            "px";

    }


    /* =========================================================
       COMPLETE
    ========================================================= */

    function completeLoader() {

        if (
            finished ||
            completing
        ) {

            return;

        }


        completing =
            true;


        displayedProgress =
            100;


        drawProgress(
            100
        );


        counter.textContent =
            "100%";


        syncLoaderToHero();


        requestAnimationFrame(
            function () {

                syncLoaderToHero();


                drawProgress(
                    100
                );


                requestAnimationFrame(
                    function () {

                        loader.classList.add(
                            "is-leaving"
                        );


                        window.setTimeout(
                            function () {

                                syncLoaderToHero();


                                drawProgress(
                                    100
                                );


                                loader.remove();


                                root.classList.remove(
                                    "offform-loading"
                                );


                                window.__offformLoaderComplete =
                                    true;


                                window.__offformLoaderActive =
                                    false;


                                finished =
                                    true;


                                window.dispatchEvent(
                                    new CustomEvent(
                                        "offform-loader-complete"
                                    )
                                );

                            },
                            230
                        );

                    }
                );

            }
        );

    }


    /* =========================================================
       ANIMATION
    ========================================================= */

    function animate() {

        if (
            finished ||
            completing
        ) {

            return;

        }


        syncLoaderToHero();


        const now =
            performance.now();


        const elapsed =
            now -
            startTime;


        const assetProgress =
            getAssetProgress();


        const timeProgress =
            getTimeProgress(
                elapsed
            );


        let targetProgress;


        if (
            assetProgress >= 100
        ) {

            targetProgress =
                timeProgress;

        }

        else {

            targetProgress =
                Math.min(
                    assetProgress,
                    timeProgress
                );

        }


        targetProgress =
            Math.max(
                displayedProgress,
                targetProgress
            );


        displayedProgress +=
            (
                targetProgress -
                displayedProgress
            ) * 0.12;


        if (
            assetProgress >= 100 &&
            elapsed >= MIN_DURATION
        ) {

            displayedProgress +=
                (
                    100 -
                    displayedProgress
                ) * 0.12;

        }


        displayedProgress =
            Math.min(
                100,
                displayedProgress
            );


        drawProgress(
            displayedProgress
        );


        if (
            assetProgress >= 100 &&
            elapsed >= MIN_DURATION &&
            displayedProgress >= 99.98
        ) {

            completeLoader();

            return;

        }


        requestAnimationFrame(
            animate
        );

    }


    /* =========================================================
       RESIZE
    ========================================================= */

    window.addEventListener(
        "resize",
        function () {

            syncLoaderToHero();


            drawProgress(
                displayedProgress
            );

        },
        {
            passive: true
        }
    );


    /* =========================================================
       START
    ========================================================= */

    syncLoaderToHero();


    drawProgress(
        0
    );


    requestAnimationFrame(
        animate
    );


    /* =========================================================
       SAFETY FALLBACK
    ========================================================= */

    window.setTimeout(
        function () {

            if (
                !finished &&
                !completing
            ) {

                loadedAssets =
                    assets.length;


                pageReady =
                    true;

            }

        },
        6000
    );


})();;
/* =========================================================
   OFFFORM — MARKER POSITIONING
   TWO MARKERS PER IMAGE
========================================================= */

(function () {

    const hero =
        document.querySelector(
            ".offform-hero"
        );


    const lineArea =
        document.querySelector(
            ".offform-hero-line-area"
        );


    if (
        !hero ||
        !lineArea
    ) {

        return;

    }


    const markers =
        lineArea.querySelectorAll(
            ".offform-hero-marker"
        );


    function positionMarkers() {

        const heroRect =
            hero.getBoundingClientRect();


        const lineRect =
            lineArea.getBoundingClientRect();


        /*
         * MOBILE:
         * DISTRIBUTE ALL MARKERS EVENLY ACROSS
         * THE ACTUAL LINE AREA.
         *
         * DESKTOP:
         * KEEP THE ORIGINAL POSITIONING EXACTLY.
         */

        if (
            window.matchMedia(
                "(max-width: 767px)"
            ).matches
        ) {

            const firstLabel =
                markers[0]
                    ? markers[0].querySelector(
                        ".offform-hero-marker-label"
                    )
                    : null;


            const lastLabel =
                markers[markers.length - 1]
                    ? markers[markers.length - 1].querySelector(
                        ".offform-hero-marker-label"
                    )
                    : null;


            const firstHalf =
                firstLabel
                    ? firstLabel.offsetWidth / 2
                    : 0;


            const lastHalf =
                lastLabel
                    ? lastLabel.offsetWidth / 2
                    : 0;


            const start =
                firstHalf;


            const end =
                Math.max(
                    start,
                    lineRect.width - lastHalf
                );


            const step =
                markers.length > 1
                    ? (end - start) / (markers.length - 1)
                    : 0;


            markers.forEach(
                function (
                    marker,
                    index
                ) {

                    marker.style.left =
                        (
                            start +
                            (step * index)
                        ) + "px";

                }
            );


            return;

        }


        const heroWidth =
            heroRect.width;


        /*
         * TWO MARKERS PER IMAGE:
         *
         * IMAGE 01:
         * 1/3 + 2/3
         *
         * IMAGE 02:
         * 1/3 + 2/3
         *
         * IMAGE 03:
         * 1/3 + 2/3
         */

        const positions = [

            heroWidth * (1 / 9),
            heroWidth * (2 / 9),

            heroWidth * (4 / 9),
            heroWidth * (5 / 9),

            heroWidth * (7 / 9),
            heroWidth * (8 / 9)

        ];


        markers.forEach(
            function (
                marker,
                index
            ) {

                const viewportX =
                    heroRect.left +
                    positions[index];


                const localX =
                    viewportX -
                    lineRect.left;


                marker.style.left =
                    localX + "px";

            }
        );

    }


    positionMarkers();


    window.addEventListener(
        "resize",
        positionMarkers,
        {
            passive: true
        }
    );


})();;
/* =========================================================
   OFFFORM — HERO INTRO CONTROLLER
========================================================= */

(function () {

    const hero =
        document.querySelector(
            ".offform-hero"
        );


    if (!hero) {
        return;
    }


    const images =
        hero.querySelectorAll(
            ".offform-hero-image"
        );


    let started =
        false;


    function finishHeroIntro() {

        if (
            hero.classList.contains(
                "is-revealed"
            )
        ) {

            return;

        }


        hero.classList.add(
            "is-revealed"
        );


        hero.classList.add(
            "is-ui-visible"
        );


        window.__offformHeroReady =
            true;


        window.dispatchEvent(
            new CustomEvent(
                "offform-hero-ready"
            )
        );

    }


    function startHeroIntro() {

        if (started) {
            return;
        }


        started =
            true;


        hero.classList.add(
            "is-revealing"
        );


        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce) and (max-width: 767px)"
            ).matches;


        if (
            reducedMotion ||
            images.length === 0
        ) {

            finishHeroIntro();

            return;

        }


        const lastImage =
            images[
                images.length - 1
            ];


        let finished =
            false;


        function finishOnce() {

            if (finished) {
                return;
            }


            finished =
                true;


            finishHeroIntro();

        }


        lastImage.addEventListener(
            "animationend",
            finishOnce,
            {
                once: true
            }
        );


        window.setTimeout(
            finishOnce,
            1400
        );

    }


    window.addEventListener(
        "offform-loader-complete",
        startHeroIntro,
        {
            once: true
        }
    );


    if (
        window.__offformLoaderComplete
    ) {

        startHeroIntro();

    }


    window.setTimeout(
        function () {

            if (
                !window.__offformLoaderActive &&
                !started
            ) {

                startHeroIntro();

            }

        },
        600
    );


})();;
/* =========================================================
   OFFFORM — HERO IMAGE WAVE
========================================================= */

(function () {


    const DISTORTION_STRENGTH = 4.5;

    const WAVE_FREQUENCY = 0.045;

    const WAVE_SPEED = 0.13;

    const ORGANIC_AMOUNT = 0.65;

    const FADE_SPEED = 0.14;

    const MOVE_TIMEOUT = 70;


    const desktop =
        window.matchMedia(
            "(min-width: 1025px) and (hover: hover) and (pointer: fine)"
        );


    if (!desktop.matches) {
        return;
    }


    const blocks =
        document.querySelectorAll(
            ".offform-hero-image"
        );


    blocks.forEach(
        function (block) {


            const image =
                block.querySelector(
                    "img"
                );


            const canvas =
                block.querySelector(
                    ".offform-hero-wave"
                );


            if (
                !image ||
                !canvas
            ) {

                return;

            }


            const context =
                canvas.getContext(
                    "2d"
                );


            if (!context) {
                return;
            }


            const sourceCanvas =
                document.createElement(
                    "canvas"
                );


            const sourceContext =
                sourceCanvas.getContext(
                    "2d"
                );


            if (!sourceContext) {
                return;
            }


            let mouseY = null;

            let previousX = null;
            let previousY = null;

            let isInside = false;
            let isMoving = false;

            let movementAmount = 0;

            let wavePhase = 0;

            let moveTimer = null;


            /* =====================================================
               SIZE
            ===================================================== */

            function resizeCanvas() {


                const rect =
                    block.getBoundingClientRect();


                const width =
                    Math.max(
                        1,
                        Math.round(
                            rect.width
                        )
                    );


                const height =
                    Math.max(
                        1,
                        Math.round(
                            rect.height
                        )
                    );


                if (
                    canvas.width !== width ||
                    canvas.height !== height
                ) {

                    canvas.width =
                        width;

                    canvas.height =
                        height;

                }


                if (
                    sourceCanvas.width !== width ||
                    sourceCanvas.height !== height
                ) {

                    sourceCanvas.width =
                        width;

                    sourceCanvas.height =
                        height;

                }

            }


            /* =====================================================
               OBJECT POSITION
            ===================================================== */

            function valueToFactor(value) {


                if (!value) {
                    return 0.5;
                }


                const normalized =
                    value
                        .trim()
                        .toLowerCase();


                if (
                    normalized === "left" ||
                    normalized === "top"
                ) {

                    return 0;

                }


                if (
                    normalized === "right" ||
                    normalized === "bottom"
                ) {

                    return 1;

                }


                if (
                    normalized === "center"
                ) {

                    return 0.5;

                }


                if (
                    normalized.endsWith("%")
                ) {


                    const number =
                        parseFloat(
                            normalized
                        );


                    if (
                        !Number.isNaN(number)
                    ) {

                        return Math.max(
                            0,
                            Math.min(
                                1,
                                number / 100
                            )
                        );

                    }

                }


                return 0.5;

            }


            function getObjectPosition() {


                const style =
                    getComputedStyle(
                        image
                    );


                const values =
                    (
                        style.objectPosition ||
                        "50% 50%"
                    )
                        .trim()
                        .split(/\s+/);


                let x =
                    values[0] ||
                    "50%";


                let y =
                    values[1] ||
                    "50%";


                if (
                    values.length === 1
                ) {


                    if (
                        x === "top" ||
                        x === "bottom"
                    ) {

                        y = x;
                        x = "center";

                    }

                    else {

                        y = "center";

                    }

                }


                return {

                    x:
                        valueToFactor(x),

                    y:
                        valueToFactor(y)

                };

            }


            /* =====================================================
               CAPTURE IMAGE
            ===================================================== */

            function captureImage() {


                resizeCanvas();


                const width =
                    sourceCanvas.width;


                const height =
                    sourceCanvas.height;


                sourceContext.clearRect(
                    0,
                    0,
                    width,
                    height
                );


                if (
                    !image.complete ||
                    image.naturalWidth <= 0 ||
                    image.naturalHeight <= 0
                ) {

                    return false;

                }


                const naturalWidth =
                    image.naturalWidth;


                const naturalHeight =
                    image.naturalHeight;


                const scale =
                    Math.max(

                        width /
                        naturalWidth,

                        height /
                        naturalHeight

                    );


                const sourceWidth =
                    width /
                    scale;


                const sourceHeight =
                    height /
                    scale;


                const position =
                    getObjectPosition();


                const sourceX =
                    (
                        naturalWidth -
                        sourceWidth
                    ) *
                    position.x;


                const sourceY =
                    (
                        naturalHeight -
                        sourceHeight
                    ) *
                    position.y;


                try {


                    sourceContext.drawImage(

                        image,

                        sourceX,
                        sourceY,

                        sourceWidth,
                        sourceHeight,

                        0,
                        0,

                        width,
                        height

                    );


                    return true;

                }


                catch (error) {

                    return false;

                }

            }


            /* =====================================================
               DRAW WAVE
            ===================================================== */

            function drawWave() {


                const width =
                    canvas.width;


                const height =
                    canvas.height;


                if (
                    width <= 0 ||
                    height <= 0
                ) {

                    return;

                }


                const stripHeight =
                    2;


                const overlap =
                    1;


                for (
                    let y = 0;
                    y < height;
                    y += stripHeight
                ) {


                    const mainWave =
                        Math.sin(

                            y *
                                WAVE_FREQUENCY +

                            wavePhase

                        );


                    const organicWave =
                        Math.sin(

                            y * 0.021 -

                            wavePhase *
                                1.7

                        ) *

                        ORGANIC_AMOUNT;


                    const mouseInfluence =

                        mouseY !== null

                            ? Math.sin(

                                (
                                    y -
                                    mouseY
                                ) *

                                0.018 +

                                wavePhase *
                                0.65

                            ) *

                            0.35

                            : 0;


                    const displacement =

                        (
                            mainWave +
                            organicWave +
                            mouseInfluence
                        )

                        *

                        DISTORTION_STRENGTH

                        *

                        movementAmount;


                    const drawHeight =
                        Math.min(

                            stripHeight +
                            overlap,

                            height -
                            y

                        );


                    context.drawImage(

                        sourceCanvas,

                        0,
                        y,

                        width,
                        drawHeight,

                        displacement,
                        y,

                        width,
                        drawHeight

                    );


                    if (
                        displacement > 0
                    ) {


                        context.drawImage(

                            sourceCanvas,

                            0,
                            y,

                            1,
                            drawHeight,

                            0,
                            y,

                            displacement + 1,
                            drawHeight

                        );

                    }


                    if (
                        displacement < 0
                    ) {


                        const gap =
                            Math.abs(
                                displacement
                            );


                        context.drawImage(

                            sourceCanvas,

                            Math.max(
                                0,
                                width - 1
                            ),

                            y,

                            1,
                            drawHeight,

                            width -
                            gap -
                            1,

                            y,

                            gap + 1,
                            drawHeight

                        );

                    }

                }

            }


            /* =====================================================
               MOVEMENT
            ===================================================== */

            function clearMoveTimer() {


                if (
                    moveTimer !== null
                ) {

                    clearTimeout(
                        moveTimer
                    );


                    moveTimer =
                        null;

                }

            }


            function registerMovement() {


                isMoving =
                    true;


                clearMoveTimer();


                moveTimer =
                    setTimeout(

                        function () {


                            moveTimer =
                                null;


                            isMoving =
                                false;

                        },

                        MOVE_TIMEOUT

                    );

            }


            /* =====================================================
               POINTER
            ===================================================== */

            block.addEventListener(

                "mousemove",

                function (event) {


                    const rect =
                        block
                            .getBoundingClientRect();


                    const localX =
                        event.clientX -
                        rect.left;


                    const localY =
                        event.clientY -
                        rect.top;


                    mouseY =
                        localY;


                    if (
                        previousX !== null &&
                        previousY !== null
                    ) {


                        const dx =
                            localX -
                            previousX;


                        const dy =
                            localY -
                            previousY;


                        const distance =
                            Math.hypot(
                                dx,
                                dy
                            );


                        if (
                            distance > 0.2
                        ) {

                            registerMovement();

                        }

                    }


                    else {

                        registerMovement();

                    }


                    previousX =
                        localX;


                    previousY =
                        localY;

                },

                {
                    passive: true
                }

            );


            block.addEventListener(

                "mouseenter",

                function () {


                    isInside =
                        true;


                    previousX =
                        null;


                    previousY =
                        null;


                    movementAmount =
                        0;


                    resizeCanvas();

                }

            );


            block.addEventListener(

                "mouseleave",

                function () {


                    isInside =
                        false;


                    isMoving =
                        false;


                    previousX =
                        null;


                    previousY =
                        null;


                    mouseY =
                        null;


                    clearMoveTimer();

                }

            );


            window.addEventListener(

                "resize",

                resizeCanvas,

                {
                    passive: true
                }

            );


            /* =====================================================
               ANIMATION
            ===================================================== */

            function animate() {


                requestAnimationFrame(
                    animate
                );


                if (
                    !isInside &&
                    movementAmount <= 0.001
                ) {


                    canvas.style.opacity =
                        "0";


                    return;

                }


                if (
                    isMoving
                ) {


                    movementAmount +=

                        (
                            1 -
                            movementAmount
                        )

                        *

                        0.45;

                }


                else {


                    movementAmount *=

                        (
                            1 -
                            FADE_SPEED
                        );


                    if (
                        movementAmount < 0.01
                    ) {

                        movementAmount =
                            0;

                    }

                }


                if (
                    movementAmount <= 0
                ) {


                    canvas.style.opacity =
                        "0";


                    context.clearRect(

                        0,
                        0,

                        canvas.width,
                        canvas.height

                    );


                    return;

                }


                if (
                    !captureImage()
                ) {

                    return;

                }


                context.clearRect(

                    0,
                    0,

                    canvas.width,
                    canvas.height

                );


                wavePhase +=
                    WAVE_SPEED;


                drawWave();


                canvas.style.opacity =
                    "1";

            }


            resizeCanvas();


            requestAnimationFrame(
                animate
            );


        }
    );


})();;
/* =========================================================
   OFFFORM — HERO IMAGE PARALLAX EXIT

   LEFT EXITS FIRST
   CENTER EXITS A LITTLE SLOWER
   RIGHT EXITS SLOWEST

   The hero still scrolls normally.
   We only compensate each image column by a different amount,
   which creates the parallax exit.
========================================================= */

(function () {

    const hero =
        document.querySelector(
            ".offform-hero"
        );


    if (!hero) {
        return;
    }


    const blocks =
        Array.from(
            hero.querySelectorAll(
                ".offform-hero-image"
            )
        );


    if (blocks.length < 3) {
        return;
    }


    /* MOBILE HAS ITS OWN STACKED-IMAGE PARALLAX BELOW.
       DESKTOP CONTINUES WITH THE ORIGINAL CODE UNCHANGED. */

    if (
        window.matchMedia(
            "(max-width: 767px)"
        ).matches
    ) {

        return;

    }


    /* =====================================================
       PARALLAX STRENGTH

       LEFT   = 0.00  → natural page speed
       CENTER = 0.12  → slightly slower
       RIGHT  = 0.24  → slowest

       Increase the numbers for a stronger parallax.
    ===================================================== */

    const PARALLAX_FACTORS = [
        0.00,
        0.12,
        0.24
    ];


    let heroTopPage =
        0;


    let heroHeight =
        0;


    let ticking =
        false;


    /* =====================================================
       MEASURE
    ===================================================== */

    function measure() {

        blocks.forEach(
            function (block) {

                block.style.setProperty(
                    "--offform-parallax-y",
                    "0px"
                );

            }
        );


        const scrollY =
            window.scrollY ||
            window.pageYOffset ||
            0;


        const heroRect =
            hero.getBoundingClientRect();


        heroTopPage =
            heroRect.top +
            scrollY;


        heroHeight =
            hero.offsetHeight;


        update();

    }


    /* =====================================================
       UPDATE
    ===================================================== */

    function update() {

        const scrollY =
            window.scrollY ||
            window.pageYOffset ||
            0;


        const travelled =
            Math.max(
                0,
                scrollY -
                heroTopPage
            );


        const clampedTravel =
            Math.min(
                travelled,
                heroHeight
            );


        blocks.forEach(
            function (
                block,
                index
            ) {

                const factor =
                    PARALLAX_FACTORS[index] ||
                    0;


                const offsetY =
                    clampedTravel *
                    factor;


                block.style.setProperty(
                    "--offform-parallax-y",
                    offsetY + "px"
                );

            }
        );


        ticking =
            false;

    }


    /* =====================================================
       RAF SCROLL
    ===================================================== */

    function requestUpdate() {

        if (ticking) {
            return;
        }


        ticking =
            true;


        requestAnimationFrame(
            update
        );

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    window.addEventListener(
        "scroll",
        requestUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "offform-hero-ready",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            once: true
        }
    );


    requestAnimationFrame(
        measure
    );


})();;
/* =========================================================
   OFFFORM — HERO CENTER SYSTEM SCROLL HOLD
   HOLD UNTIL FIRST PROJECT ROW IS 30PX FROM LOWEST MARKER LABEL
========================================================= */

(function () {

    const hero =
        document.querySelector(
            ".offform-hero"
        );


    const lineWrap =
        document.querySelector(
            ".offform-hero-line-wrap"
        );


    const firstProjectRow =
        document.querySelector(
            ".offform-project-row"
        );


    if (
        !hero ||
        !lineWrap ||
        !firstProjectRow
    ) {

        return;

    }


    /* MOBILE USES THE SMOOTH HOLD CONTROLLER BELOW.
       DESKTOP CONTINUES WITH THE ORIGINAL CODE UNCHANGED. */

    if (
        window.matchMedia(
            "(max-width: 767px)"
        ).matches
    ) {

        return;

    }


    const markerLabels =
        lineWrap.querySelectorAll(
            ".offform-hero-marker-label"
        );


    if (!markerLabels.length) {

        return;

    }


    const RELEASE_GAP = 80;


    let heroTopPage = 0;

    let maxHoldDistance = 0;

    let ticking = false;


    /* =====================================================
       MEASURE NATURAL GEOMETRY
    ===================================================== */

    function measure() {

        lineWrap.style.setProperty(
            "--offform-line-pin-y",
            "0px"
        );


        const scrollY =
            window.scrollY ||
            window.pageYOffset ||
            0;


        const heroRect =
            hero.getBoundingClientRect();


        const rowRect =
            firstProjectRow.getBoundingClientRect();


        heroTopPage =
            heroRect.top +
            scrollY;


        const rowTopPage =
            rowRect.top +
            scrollY;


        let lowestMarkerBottomPage =
            -Infinity;


        markerLabels.forEach(
            function (label) {

                const rect =
                    label.getBoundingClientRect();


                lowestMarkerBottomPage =
                    Math.max(
                        lowestMarkerBottomPage,
                        rect.bottom + scrollY
                    );

            }
        );


        maxHoldDistance =
            Math.max(
                0,
                rowTopPage -
                lowestMarkerBottomPage -
                RELEASE_GAP
            );


        update();

    }


    /* =====================================================
       UPDATE HOLD
    ===================================================== */

    function update() {

        const scrollY =
            window.scrollY ||
            window.pageYOffset ||
            0;


        const travelled =
            Math.max(
                0,
                scrollY - heroTopPage
            );


        const holdY =
            Math.min(
                travelled,
                maxHoldDistance
            );


        lineWrap.style.setProperty(
            "--offform-line-pin-y",
            holdY + "px"
        );


        ticking = false;

    }


    /* =====================================================
       RAF SCROLL
    ===================================================== */

    function requestUpdate() {

        if (ticking) {
            return;
        }


        ticking = true;


        requestAnimationFrame(
            update
        );

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    window.addEventListener(
        "scroll",
        requestUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "offform-hero-ready",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            once: true
        }
    );


    if (
        document.fonts &&
        document.fonts.ready
    ) {

        document.fonts.ready.then(
            function () {

                requestAnimationFrame(
                    measure
                );

            }
        );

    }


    requestAnimationFrame(
        measure
    );


})();;
/* =========================================================
   OFFFORM — MOBILE STACKED IMAGE PARALLAX
   MOBILE ONLY

   IMPORTANT:
   - THE IMAGE BLOCKS THEMSELVES NEVER MOVE.
   - ONLY THE IMAGE INSIDE EACH BLOCK MOVES.
   - THIS PREVENTS BLACK GAPS BETWEEN STACKED IMAGES.
========================================================= */

(function () {

    const mobile =
        window.matchMedia(
            "(max-width: 767px)"
        );


    if (!mobile.matches) {
        return;
    }


    const hero =
        document.querySelector(
            ".offform-hero"
        );


    if (!hero) {
        return;
    }


    const blocks =
        Array.from(
            hero.querySelectorAll(
                ".offform-hero-image"
            )
        );


    if (!blocks.length) {
        return;
    }


    const MOBILE_PARALLAX_FACTORS = [
        0.32,
        0.32,
        0.32
    ];


    const MAX_SHIFT = 105;


    let heroTopPage = 0;
    let heroHeight = 0;
    let ticking = false;


    function measure() {

        const scrollY =
            window.scrollY ||
            window.pageYOffset ||
            0;


        const heroRect =
            hero.getBoundingClientRect();


        heroTopPage =
            heroRect.top +
            scrollY;


        heroHeight =
            hero.offsetHeight;


        update();

    }


    function update() {

        const scrollY =
            window.scrollY ||
            window.pageYOffset ||
            0;


        const travelled =
            Math.max(
                0,
                scrollY - heroTopPage
            );


        const clampedTravel =
            Math.min(
                travelled,
                heroHeight
            );


        blocks.forEach(
            function (
                block,
                index
            ) {

                const factor =
                    MOBILE_PARALLAX_FACTORS[index] ||
                    0;


                const rawShift =
                    clampedTravel *
                    factor;


                const shift =
                    Math.min(
                        MAX_SHIFT,
                        rawShift
                    );


                block.style.setProperty(
                    "--offform-mobile-image-parallax-y",
                    shift + "px"
                );

            }
        );


        ticking = false;

    }


    function requestUpdate() {

        if (ticking) {
            return;
        }


        ticking = true;


        requestAnimationFrame(
            update
        );

    }


    window.addEventListener(
        "scroll",
        requestUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "orientationchange",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "offform-hero-ready",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            once: true
        }
    );


    requestAnimationFrame(
        measure
    );


})();;
/* =========================================================
   OFFFORM — MOBILE CENTER SYSTEM SMOOTH SCROLL HOLD
   MOBILE ONLY

   SAME HOLD / RELEASE IDEA AS DESKTOP,
   BUT THE Y POSITION IS INTERPOLATED SO IT DOES NOT JUMP.
========================================================= */

(function () {

    const mobile =
        window.matchMedia(
            "(max-width: 767px)"
        );


    if (!mobile.matches) {
        return;
    }


    const hero =
        document.querySelector(
            ".offform-hero"
        );


    const lineWrap =
        document.querySelector(
            ".offform-hero-line-wrap"
        );


    const firstProjectRow =
        document.querySelector(
            ".offform-project-row"
        );


    if (
        !hero ||
        !lineWrap ||
        !firstProjectRow
    ) {

        return;

    }


    const markerLabels =
        lineWrap.querySelectorAll(
            ".offform-hero-marker-label"
        );


    if (!markerLabels.length) {
        return;
    }


    const RELEASE_GAP = 30;
    const SMOOTHING = 0.18;
    const SNAP_EPSILON = 0.05;


    let heroTopPage = 0;
    let maxHoldDistance = 0;

    let currentY = 0;
    let targetY = 0;

    let animationFrame = null;
    let geometryReady = false;


    function getScrollY() {

        return (
            window.scrollY ||
            window.pageYOffset ||
            0
        );

    }


    function measure() {

        const scrollY =
            getScrollY();


        const heroRect =
            hero.getBoundingClientRect();


        const rowRect =
            firstProjectRow.getBoundingClientRect();


        heroTopPage =
            heroRect.top +
            scrollY;


        const rowTopPage =
            rowRect.top +
            scrollY;


        let lowestMarkerBottomPage =
            -Infinity;


        markerLabels.forEach(
            function (label) {

                const rect =
                    label.getBoundingClientRect();


                /* REMOVE THE CURRENT MOBILE HOLD TRANSLATION
                   FROM THE MEASUREMENT WITHOUT VISUALLY RESETTING IT. */

                const naturalBottomPage =
                    rect.bottom +
                    scrollY -
                    currentY;


                lowestMarkerBottomPage =
                    Math.max(
                        lowestMarkerBottomPage,
                        naturalBottomPage
                    );

            }
        );


        maxHoldDistance =
            Math.max(
                0,
                rowTopPage -
                lowestMarkerBottomPage -
                RELEASE_GAP
            );


        geometryReady = true;


        updateTarget();

    }


    function updateTarget() {

        if (!geometryReady) {
            return;
        }


        const travelled =
            Math.max(
                0,
                getScrollY() -
                heroTopPage
            );


        targetY =
            Math.min(
                travelled,
                maxHoldDistance
            );


        startAnimation();

    }


    function animate() {

        animationFrame =
            null;


        const difference =
            targetY - currentY;


        if (
            Math.abs(difference) <=
            SNAP_EPSILON
        ) {

            currentY =
                targetY;

        }


        else {

            currentY +=
                difference *
                SMOOTHING;

        }


        lineWrap.style.setProperty(
            "--offform-line-pin-y",
            currentY + "px"
        );


        if (
            Math.abs(
                targetY - currentY
            ) > SNAP_EPSILON
        ) {

            animationFrame =
                requestAnimationFrame(
                    animate
                );

        }

    }


    function startAnimation() {

        if (
            animationFrame !== null
        ) {

            return;

        }


        animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    window.addEventListener(
        "scroll",
        updateTarget,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "orientationchange",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "offform-hero-ready",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            once: true
        }
    );


    if (
        document.fonts &&
        document.fonts.ready
    ) {

        document.fonts.ready.then(
            function () {

                requestAnimationFrame(
                    measure
                );

            }
        );

    }


    requestAnimationFrame(
        measure
    );


})();;
(function () {

    /* =========================================================
       MOBILE + TABLET ONLY — VIEW ALL TALENTS — FIRST TAP
       Keeps all existing colors / styling / navigation behavior.
       Desktop / wide untouched.
    ========================================================= */

    if (!window.matchMedia("(max-width: 1024px)").matches) {
        return;
    }

    const viewAllButton =
        document.querySelector(
            ".offform-view-button"
        );

    if (!viewAllButton) {
        return;
    }

    viewAllButton.addEventListener(
        "touchend",
        function (event) {

            event.preventDefault();
            event.stopImmediatePropagation();

            /*
             * Re-fire the button's normal click from the FIRST tap.
             * Existing color and navigation behavior stay unchanged.
             */
            viewAllButton.click();

        },
        {
            passive: false
        }
    );

})();;
(function () {

    const section =
        document.querySelector(
            ".offform-about-work"
        );


    if (!section) return;


    /* MOBILE-ONLY SIMPLIFIED MODE.
       Desktop continues through the original code path unchanged. */
    const mobileLayout =
        window.matchMedia(
            "(max-width: 767px)"
        );


    /* WIDE SCREEN ONLY — does not affect laptop/mobile */
    const wideScreenLayout =
        window.matchMedia(
            "(min-width: 1520px)"
        );


    const stage =
        section.querySelector(
            ".offform-about-work-stage"
        );


    const about =
        section.querySelector(
            ".offform-about"
        );


    const aboutHeading =
        section.querySelector(
            ".offform-about-heading"
        );

    const aboutTitle =
        section.querySelector(
            ".offform-about-label-text"
        );

    const aboutLine =
        section.querySelector(
            ".offform-about-heading-line"
        );

    const aboutView =
        section.querySelector(
            ".offform-about-heading-view"
        );

    const aboutSquare =
        section.querySelector(
            ".offform-about-label-square"
        );


    const aboutMainParagraph =
        section.querySelector(
            ".offform-about-main > p"
        );


    const aboutObstacleWrap =
        section.querySelector(
            ".offform-about-obstacle-wrap"
        );


    const aboutObstacle =
        section.querySelector(
            ".offform-about-obstacle"
        );


    const aboutServices =
        section.querySelector(
            ".offform-about-services"
        );


    const aboutServiceRows =
        Array.from(
            section.querySelectorAll(
                ".offform-about-service"
            )
        );


    const heading =
        section.querySelector(
            ".offform-work-heading"
        );


    const workTitle =
        section.querySelector(
            ".offform-work-title"
        );


    const workLine =
        section.querySelector(
            ".offform-work-line"
        );


    const workViewAll =
        section.querySelector(
            ".offform-work-view-all"
        );


    const workSquare =
        section.querySelector(
            ".offform-work-square"
        );


    const gallery =
        section.querySelector(
            ".offform-work-gallery"
        );


    const track =
        section.querySelector(
            ".offform-work-track"
        );


    if (
        !stage ||
        !aboutHeading ||
        !aboutTitle ||
        !aboutLine ||
        !aboutView ||
        !aboutSquare ||
        !heading ||
        !workTitle ||
        !workLine ||
        !workViewAll ||
        !workSquare ||
        !gallery ||
        !track
    ) {

        return;

    }



    /* =====================================================
       HELPERS
    ===================================================== */

    const clamp = (
        value,
        min,
        max
    ) => {

        return Math.max(
            min,
            Math.min(
                max,
                value
            )
        );

    };


    const smooth = value => {

        value =
            clamp(
                value,
                0,
                1
            );


        return (
            value *
            value *
            (
                3 -
                2 * value
            )
        );

    };


    const phase = (
        progress,
        start,
        end
    ) => {

        return smooth(
            (
                progress -
                start
            ) /
            (
                end -
                start
            )
        );

    };


    function getObstacleInfluence(
        lineCenterY,
        obstacleRect,
        openDistance,
        closeDistance
    ) {

        if (
            lineCenterY >
            obstacleRect.bottom
        ) {

            const distance =
                lineCenterY -
                obstacleRect.bottom;


            if (
                distance <
                openDistance
            ) {

                return smooth(
                    1 -
                    (
                        distance /
                        openDistance
                    )
                );

            }


            return 0;

        }


        if (
            lineCenterY >=
                obstacleRect.top &&
            lineCenterY <=
                obstacleRect.bottom
        ) {

            return 1;

        }


        const distance =
            obstacleRect.top -
            lineCenterY;


        if (
            distance <
            closeDistance
        ) {

            return smooth(
                1 -
                (
                    distance /
                    closeDistance
                )
            );

        }


        return 0;

    }


    function cssNumber(name) {

        return (
            parseFloat(
                getComputedStyle(section)
                    .getPropertyValue(name)
            ) ||
            0
        );

    }


    function cssPixels(name) {

        const value =
            getComputedStyle(section)
                .getPropertyValue(name)
                .trim();


        if (
            value.endsWith("vh")
        ) {

            return (
                parseFloat(value) *
                window.innerHeight /
                100
            );

        }


        return (
            parseFloat(value) ||
            0
        );

    }



    function updateAboutOpeningHeading(progress) {

        const headingProgress =
            smooth(
                clamp(
                    progress,
                    0,
                    1
                )
            );

        const lineStart =
            aboutTitleWidth +
            aboutLineTitleGap;

        const initialLineWidth =
            Math.max(
                0,
                cssNumber(
                    "--about-line-initial-width"
                )
            );

        const finalSquareLeft =
            wideScreenLayout.matches
                ? Math.max(
                    0,
                    document.documentElement.clientWidth -
                    aboutHeading.getBoundingClientRect().left -
                    20 -
                    aboutSquareSize
                )
                : Math.max(
                    0,
                    aboutHeadingWidth -
                    aboutSquareSize
                );

        const finalViewX =
            Math.max(
                lineStart +
                initialLineWidth +
                aboutLineViewGap,
                finalSquareLeft -
                aboutSideGap -
                aboutViewWidth
            );

        const finalLineEnd =
            finalViewX -
            aboutLineViewGap;

        const maxLineWidth =
            Math.max(
                initialLineWidth,
                finalLineEnd -
                lineStart
            );

        const currentLineWidth =
            initialLineWidth +
            (
                maxLineWidth -
                initialLineWidth
            ) *
            headingProgress;

        const currentLineEnd =
            lineStart +
            currentLineWidth;

        const initialViewX =
            lineStart +
            initialLineWidth +
            aboutLineViewGap;

        const pushedViewX =
            currentLineEnd +
            aboutLineViewGap;

        const viewX =
            Math.min(
                finalViewX,
                Math.max(
                    initialViewX,
                    pushedViewX
                )
            );

        aboutLine.style.left =
            lineStart +
            "px";

        aboutLine.style.width =
            currentLineWidth +
            "px";

        aboutView.style.transform =
            "translate3d(" +
            viewX.toFixed(2) +
            "px,0,0)";

        aboutSquare.style.left =
            Math.min(
                finalSquareLeft,
                viewX +
                aboutViewWidth +
                aboutSideGap
            ).toFixed(2) +
            "px";

        if (wideScreenLayout.matches) {

            /* WIDE SCREEN ONLY — keep the OFFFORM square on the same row */
            aboutSquare.style.top = "0px";
            aboutSquare.style.transform = "none";

        }

        else {

            aboutSquare.style.top = "";
            aboutSquare.style.transform =
                "translateY(-50%)";

        }
    }


    function alignAboutLineToDevicePixel() {

        if (!aboutLine) return;

        const dpr = window.devicePixelRatio || 1;

        aboutLine.style.transform =
            "translateY(-50%)";

        const rect =
            aboutLine.getBoundingClientRect();

        const targetTop =
            Math.round(rect.top * dpr) / dpr;

        const correction =
            targetTop - rect.top;

        aboutLine.style.transform =
            "translateY(calc(-50% + " +
            correction.toFixed(4) +
            "px))";
    }


    /* =====================================================
       CLONE ITEMS
    ===================================================== */

    const originals =
        Array.from(
            track.querySelectorAll(
                ".offform-work-item"
            )
        );


    originals.forEach(item => {

        const clone =
            item.cloneNode(true);


        clone.setAttribute(
            "aria-hidden",
            "true"
        );


        track.appendChild(clone);

    });


    let items =
        Array.from(
            track.querySelectorAll(
                ".offform-work-item"
            )
        );



    /* =====================================================
       MEASUREMENTS
    ===================================================== */

    let stickyStart = 0;

    let stickyDistance = 1;

    let galleryHeight = 0;


    let aboutTitleWidth = 0;
    let aboutTitleHeight = 0;
    let aboutHeadingWidth = 0;
    let aboutViewWidth = 0;
    let aboutSquareSize = 7;
    let aboutStartGap = 8;
    let aboutSideGap = 8;
    let aboutLineTitleGap = 8;
    let aboutLineViewGap = 8;


    let workTitleWidth = 0;

    let workTitleHeight = 0;

    let workViewAllWidth = 0;

    let headingWidth = 0;

    let workSquareSize = 7;

    let workStartGap = 8;

    let workSideGap = 8;

    let lineTitleGap = 8;

    let lineSquareGap = 8;


    let loopWidth = 0;

    let loopOffset = 0;

    let loopSpeed = 20;

    /* SELECTED TALENT NATURAL START OFFSET */
    let workInitialOffset = 0;

    /* ABOUT LIVE PIN COMPENSATION
       Used so 01 / 02 / 03 keep moving naturally 1:1 even while
       the ABOUT parent itself begins to pin in the viewport. */
    let aboutPinYForFlow = 0;

    /* LINE OPENS ONLY AFTER SELECTED TALENT + GALLERY REACH THEIR STICKY POSITION */
    let workLineStickyStartProgress = null;

    /* IMAGE HEIGHTS:
       once the gallery reaches its sticky position, keep every image
       top-aligned for one real second before the height transition begins. */
    let workImageHoldStarted = false;
    let workImageHoldReady = false;
    let workImageMorphStartProgress = null;
    let workImageHoldTimer = null;

    /* DESKTOP + WIDE ONLY — RELIABLE ORIGINAL IMAGE MORPH
       Tablet and mobile are intentionally untouched.

       The visual behavior is kept the same:
       1 real second top-aligned hold, then the same smooth top -> bottom
       morph. The only change is that, once the hold has started on desktop,
       it is allowed to finish even if the user scrolls very quickly past
       the trigger range. */
    const desktopReliableMorphLayout =
        window.matchMedia(
            "(min-width: 1025px)"
        );



    /* =====================================================
       MEASURE
    ===================================================== */

    function measure() {

        const scrollY =
            window.scrollY ||
            window.pageYOffset;


        const sectionTop =
            section
                .getBoundingClientRect()
                .top +
            scrollY;


        stickyStart =
            sectionTop;


        stickyDistance =
            Math.max(
                1,
                cssPixels(
                    "--sticky-distance"
                )
            );


        galleryHeight =
            gallery.offsetHeight;



        /* ABOUT */

        if (
            aboutTitle &&
            aboutSquare
        ) {

            aboutTitleWidth =
                aboutTitle.offsetWidth;


            aboutTitleHeight =
                aboutTitle.offsetHeight;

            aboutHeadingWidth =
                aboutHeading.offsetWidth;

            aboutViewWidth =
                aboutView.offsetWidth;

            aboutSquareSize =
                cssNumber(
                    "--about-square-size"
                ) ||
                7;

            aboutStartGap =
                cssNumber(
                    "--about-square-start-gap"
                );

            aboutSideGap =
                cssNumber(
                    "--about-square-side-gap"
                );

            aboutLineTitleGap =
                cssNumber(
                    "--about-line-title-gap"
                );

            aboutLineViewGap =
                cssNumber(
                    "--about-line-view-gap"
                );

        }


        /* MOBILE ONLY:
           MATCH THE GAP BELOW ABOUT TO THE GAP BELOW THE LEFT PARAGRAPH. */

        if (
            mobileLayout.matches &&
            aboutTitle
        ) {

            const mobileAboutIntro =
                section.querySelector(
                    ".offform-about-intro"
                );


            const mobileAboutMain =
                section.querySelector(
                    ".offform-about-main"
                );


            if (
                mobileAboutIntro &&
                mobileAboutMain
            ) {

                const mobileContent =
                    section.querySelector(
                        ".offform-about-content"
                    );

                const mobileRowGap =
                    mobileContent
                        ? (
                            parseFloat(
                                getComputedStyle(mobileContent)
                                    .rowGap
                            ) || 0
                        )
                        : 0;

                const mobileMainLift =
                    Math.max(
                        0,
                        mobileAboutIntro.offsetHeight +
                        mobileRowGap
                    );


                mobileAboutMain.style.setProperty(
                    "--mobile-about-main-lift",
                    mobileMainLift.toFixed(2) +
                    "px"
                );

            }

        }



        /* WORK */

        workTitleWidth =
            workTitle.offsetWidth;


        workTitleHeight =
            workTitle.offsetHeight;


        workViewAllWidth =
            workViewAll.offsetWidth;


        headingWidth =
            heading.offsetWidth;


        workSquareSize =
            cssNumber(
                "--work-square-size"
            ) ||
            7;


        workStartGap =
            cssNumber(
                "--work-square-start-gap"
            );


        workSideGap =
            cssNumber(
                "--work-square-side-gap"
            );


        lineTitleGap =
            cssNumber(
                "--work-line-title-gap"
            );


        lineSquareGap =
            cssNumber(
                "--work-line-square-gap"
            );



        /* LOOP WIDTH */

        if (
            originals.length
        ) {

            const first =
                originals[0]
                    .getBoundingClientRect();


            const last =
                originals[
                    originals.length - 1
                ]
                    .getBoundingClientRect();


            loopWidth =
                last.right -
                first.left;


            const seconds =
                cssNumber(
                    "--work-speed"
                ) ||
                150;


            loopSpeed =
                loopWidth /
                seconds;

        }



        /* IMAGE HEIGHTS */

        items.forEach(item => {

            const percent =
                parseFloat(
                    item.dataset.height
                ) ||
                50;


            const visibleHeight =
                window.innerHeight *
                percent /
                100;


            item._gap =
                Math.max(
                    0,
                    galleryHeight -
                    visibleHeight
                );


            /*
             * FIXED COVERAGE FOR PURE PARALLAX
             *
             * The image is enlarged ONCE, before hover/scroll interaction,
             * just enough to cover the full 50vh frame throughout its
             * maximum entry/exit translateY travel.
             *
             * This value does NOT animate.
             * Hover never changes it.
             */
            const parallaxStrength =
                parseFloat(
                    item.dataset.parallax
                ) ||
                40;


            const parallaxExitSpeed =
                parseFloat(
                    item.dataset.exitSpeed
                ) ||
                1;


            /*
             * MINIMAL FIXED COVERAGE
             *
             * Entry travels downward by parallaxStrength.
             * Exit travels upward by parallaxStrength * exitSpeed.
             *
             * Instead of reserving the larger distance on BOTH sides,
             * we reserve only the real total distance needed:
             *
             *     entryTravel + exitTravel
             *
             * Then we bias the enlarged image once so the spare pixels
             * are distributed exactly where each direction needs them.
             *
             * Nothing here animates. Hover never changes scale or bias.
             */
            const entryTravel =
                parallaxStrength;


            const exitTravel =
                parallaxStrength *
                parallaxExitSpeed;


            const safetyPixels =
                2;


            const totalExtra =
                entryTravel +
                exitTravel +
                safetyPixels;


            const coverScale =
                galleryHeight > 0
                    ?
                    (
                        galleryHeight +
                        totalExtra
                    ) /
                    galleryHeight
                    :
                    1;


            const coverBias =
                (
                    exitTravel -
                    entryTravel
                ) /
                2;


            item.style.setProperty(
                "--parallax-cover-scale",
                coverScale.toFixed(5)
            );


            item.style.setProperty(
                "--parallax-cover-bias",
                coverBias.toFixed(2) +
                "px"
            );

        });


        /* =================================================
           SELECTED TALENT — NATURAL START POSITION

           Keep the original smooth code and only give the
           heading + gallery the same spatial relationship as
           the reference layout:

           01 / 02 / 03
           ↓ 100PX
           SELECTED TALENT

           They then travel upward 1:1 with sticky scroll until
           the original final Selected Work position is reached.
        ================================================= */

        if (aboutServices) {

            const servicesRect =
                aboutServices.getBoundingClientRect();

            const headingRect =
                heading.getBoundingClientRect();

            const workGap =
                cssNumber(
                    "--about-work-gap"
                );

            workInitialOffset =
                Math.max(
                    0,
                    servicesRect.bottom +
                    workGap -
                    headingRect.top
                );
        }


        updateScroll();

    }



    /* =====================================================
       SCROLL UPDATE
    ===================================================== */

    function updateScroll() {

        const scrollY =
            window.scrollY ||
            window.pageYOffset;


        const viewportHeight =
            window.innerHeight;


        const stageRect =
            stage.getBoundingClientRect();



        /* =================================================
           STICKY PROGRESS
        ================================================= */

        const stickyProgress =
            clamp(
                (
                    scrollY -
                    stickyStart
                ) /
                stickyDistance,
                0,
                1
            );



        /* =================================================
           MOBILE ONLY — ONE 100VH STICKY COMPOSITION

           1. ABOUT + FEATURED + GALLERY all live inside ONE 100VH screen.
           2. Nothing enters from a second viewport below.
           3. Both ABOUT squares stay completely static.
           4. 01 / 02 / 03 stay completely static.
           5. The stage holds while FEATURED / TALENTS line opens.
           6. At progress 1 the sticky stage releases.

           IMPORTANT: this branch returns before ANY desktop
           animation logic below can run on mobile.
        ================================================= */

        if (mobileLayout.matches) {

            /*
             * FORCE THE MOBILE 100VH COMPOSITION TO ACT AS A REAL
             * STICKY STAGE. This is intentionally mobile-only.
             *
             * BEFORE:  the full text + gallery composition enters normally.
             * STUCK:   once the section reaches the viewport, the whole
             *          100vh composition is fixed while the line opens.
             * AFTER:   when the line is fully open, the stage is placed at
             *          the end of the section and leaves naturally.
             */
            /*
             * IMPORTANT — USE THE SECTION'S LIVE VIEWPORT POSITION,
             * NOT A CACHED DOCUMENT SCROLL THRESHOLD.
             *
             * This makes the pin completely symmetrical:
             * scrolling DOWN into the sticky and scrolling BACK UP
             * through it use the exact same boundaries, so there is
             * no missing frame and no jump when the stage re-enters.
             */
            const mobileSectionRect =
                section.getBoundingClientRect();

            /*
             * ONE CONTINUOUS PIN EQUATION — BOTH DIRECTIONS.
             *
             * The stage never changes positioning mode while scrolling.
             * It is fixed once, and only its Y translation changes:
             *
             * BEFORE SECTION: follow the section down/up normally.
             * STICKY RANGE:   Y = 0, so the full 100vh composition is held.
             * AFTER SECTION:  leave upward together with the section.
             *
             * At both boundaries the formulas meet at exactly Y = 0.
             * That removes the reverse-scroll jump caused by switching
             * absolute <-> fixed classes.
             */
            const mobileStageHeight =
                stage.offsetHeight;

            const mobileStickyTravel =
                Math.max(
                    1,
                    section.offsetHeight - mobileStageHeight
                );

            const mobileProgress =
                clamp(
                    -mobileSectionRect.top / mobileStickyTravel,
                    0,
                    1
                );

            let mobileStageY = 0;

            if (mobileSectionRect.top > 0) {

                mobileStageY =
                    mobileSectionRect.top;

            }
            else if (mobileSectionRect.bottom < mobileStageHeight) {

                mobileStageY =
                    mobileSectionRect.bottom - mobileStageHeight;

            }

            stage.classList.add(
                "offform-mobile-pin-engine"
            );

            stage.style.transform =
                "translate3d(0," +
                mobileStageY.toFixed(2) +
                "px,0)";


            /*
             * MOBILE = ONE SINGLE 100VH COMPOSITION.
             * ABOUT, FEATURED / TALENTS AND THE GALLERY ARE
             * ALREADY INSIDE THE SAME VIEWPORT FROM THE START.
             * THE STAGE ITSELF IS WHAT STAYS STICKY.
             */

            if (about) {

                aboutPinYForFlow = 0;

                about.style.transform =
                    "translate3d(0,0,0)";

            }


            if (
                aboutHeading &&
                aboutTitle &&
                aboutLine &&
                aboutView &&
                aboutSquare
            ) {
                /*
                 * FIRST STICKY ACTION:
                 * ABOUT / OFFFORM opens completely from 0.00 to 0.50.
                 * FEATURED / TALENTS below keeps its existing 0.50 to 1.00
                 * build, so the two lines never open together.
                 */
                const aboutOpeningProgress =
                    phase(
                        mobileProgress,
                        0.00,
                        0.54
                    );

                updateAboutOpeningHeading(
                    aboutOpeningProgress
                );

                alignAboutLineToDevicePixel();
            }


            if (aboutObstacle) {

                aboutObstacle.style.transform =
                    "translate3d(0,0,0)";

                aboutObstacle.style.opacity =
                    "1";

            }


            if (aboutServices) {

                aboutServices.style.transform =
                    "translate3d(0,0,0)";

            }


            aboutServiceRows.forEach(row => {

                row.style.setProperty(
                    "--service-left-shift",
                    "0px"
                );

                row.style.setProperty(
                    "--service-right-shift",
                    "0px"
                );

            });


            /* FEATURED + GALLERY NEVER ENTER FROM BELOW ON MOBILE.
               THEY ARE PART OF THE SAME 100VH STICKY SCREEN. */
            heading.style.transform =
                "translate3d(0,0,0)";


            gallery.style.transform =
                "translate3d(0,0,0)";


            const lineStart =
                workTitleWidth +
                lineTitleGap;


            const initialLineWidth =
                Math.max(
                    0,
                    cssNumber(
                        "--work-line-initial-width"
                    )
                );


            const finalButtonX =
                Math.max(
                    lineStart +
                    initialLineWidth +
                    lineSquareGap,
                    headingWidth -
                    workViewAllWidth -
                    lineSquareGap -
                    (
                        cssNumber(
                            "--about-obstacle-size"
                        ) ||
                        7
                    )
                );


            const maxLineWidth =
                Math.max(
                    initialLineWidth,
                    finalButtonX -
                    lineSquareGap -
                    lineStart
                );


            /* THE BAR IS THE MOBILE STICKY ACTION:
               IT OPENS WHILE THIS ONE 100VH SCREEN IS HELD. */
            const buildProgress =
                phase(
                    mobileProgress,
                    0.54,
                    1.00
                );


            const currentLineWidth =
                initialLineWidth +
                (
                    maxLineWidth -
                    initialLineWidth
                ) *
                buildProgress;


            const buttonX =
                lineStart +
                currentLineWidth +
                lineSquareGap;


            workTitle.style.transform =
                "translate3d(0,0,0)";


            workLine.style.left =
                lineStart +
                "px";


            workLine.style.width =
                currentLineWidth +
                "px";


            workViewAll.style.transform =
                "translate3d(" +
                Math.min(
                    finalButtonX,
                    buttonX
                ).toFixed(2) +
                "px,0,0)";


            /* -------------------------------------------------
               MOBILE — NATURAL ENTRY, STOP, PASS, COLLECTION

               Entry stays untouched:
               paragraph -> square -> 80px -> 01 / 02 / 03.

               The square starts receiving compensation only after
               its own natural position reaches the FUTURE fixed Y
               of the FEATURED / TALENTS row.
            ------------------------------------------------- */

            if (
                aboutMainParagraph &&
                aboutObstacleWrap &&
                aboutObstacle &&
                aboutServices &&
                aboutServiceRows.length
            ) {

                const paragraphRect =
                    aboutMainParagraph
                        .getBoundingClientRect();


                const obstacleNaturalRect =
                    aboutObstacleWrap
                        .getBoundingClientRect();


                const servicesNaturalRect =
                    aboutServices
                        .getBoundingClientRect();


                const finalServicesTop =
                    paragraphRect.bottom +
                    cssNumber(
                        "--about-services-gap"
                    );


                const servicesTravelNeeded =
                    Math.max(
                        0,
                        servicesNaturalRect.top -
                        finalServicesTop
                    );


                /*
                 * MOBILE 01 / 02 / 03:
                 * move with the real scroll distance, 1:1.
                 * This is intentionally independent from both
                 * ABOUT line opening and FEATURED / TALENTS line opening.
                 */
                const mobileScrollTravel =
                    mobileProgress *
                    mobileStickyTravel;


                const servicesShiftY =
                    -Math.min(
                        servicesTravelNeeded,
                        mobileScrollTravel
                    );


                aboutServices.style.transform =
                    "translate3d(0," +
                    servicesShiftY.toFixed(2) +
                    "px,0)";


                const obstacleSize =
                    cssNumber(
                        "--about-obstacle-size"
                    ) ||
                    7;


                /* Fixed future viewport position of the line.
                   Do not use the line's live entering position here. */
                const obstacleStopTop =
                    heading.offsetTop +
                    (
                        workTitleHeight -
                        obstacleSize
                    ) /
                    2 +
                    Math.min(
                        0,
                        mobileStageY
                    );


                const obstacleShiftY =
                    Math.max(
                        0,
                        obstacleStopTop -
                        obstacleNaturalRect.top
                    );


                aboutObstacle.style.transform =
                    "translate3d(0," +
                    obstacleShiftY.toFixed(2) +
                    "px,0)";


                const obstacleStoppedRect =
                    aboutObstacle
                        .getBoundingClientRect();


                const headingRect =
                    heading.getBoundingClientRect();


                const obstacleHeadingX =
                    obstacleStoppedRect.left -
                    headingRect.left;


                const desiredSquareX =
                    buttonX +
                    workViewAllWidth +
                    lineSquareGap;


                const finalSquareX =
                    headingWidth -
                    obstacleSize;


                const squareHeadingX =
                    Math.min(
                        finalSquareX,
                        Math.max(
                            obstacleHeadingX,
                            desiredSquareX
                        )
                    );


                const obstacleShiftX =
                    squareHeadingX -
                    obstacleHeadingX;


                aboutObstacle.style.transform =
                    "translate3d(" +
                    obstacleShiftX.toFixed(2) +
                    "px," +
                    obstacleShiftY.toFixed(2) +
                    "px,0)";


                const obstacleLiveRect =
                    aboutObstacle
                        .getBoundingClientRect();


                const clearance =
                    cssNumber(
                        "--about-obstacle-clearance"
                    );


                const openDistance =
                    cssNumber(
                        "--about-services-open-distance"
                    ) ||
                    70;


                const closeDistance =
                    cssNumber(
                        "--about-services-close-distance"
                    ) ||
                    70;


                aboutServiceRows.forEach(row => {

                    const number =
                        row.querySelector(
                            ".offform-about-service-number"
                        );


                    const label =
                        row.querySelector(
                            ".offform-about-service-label"
                        );


                    if (
                        !number ||
                        !label
                    ) {
                        return;
                    }


                    const rowRect =
                        row.getBoundingClientRect();


                    const numberRect =
                        number.getBoundingClientRect();


                    const labelRect =
                        label.getBoundingClientRect();


                    const rowCenterY =
                        rowRect.top +
                        (rowRect.height / 2);


                    const influence =
                        getObstacleInfluence(
                            rowCenterY,
                            obstacleLiveRect,
                            openDistance,
                            closeDistance
                        );


                    const numberShift =
                        Math.max(
                            0,
                            numberRect.right -
                            (
                                obstacleLiveRect.left -
                                clearance
                            )
                        );


                    const labelShift =
                        Math.max(
                            0,
                            (
                                obstacleLiveRect.right +
                                clearance
                            ) -
                            labelRect.left
                        );


                    row.style.setProperty(
                        "--service-left-shift",
                        (
                            numberShift *
                            influence
                        ).toFixed(2) +
                        "px"
                    );


                    row.style.setProperty(
                        "--service-right-shift",
                        (
                            labelShift *
                            influence
                        ).toFixed(2) +
                        "px"
                    );


                });

            }


            /* Every mobile image is always full gallery height. */
            items.forEach(item => {

                item._baseClipTop = 0;
                item._baseClipBottom = 0;

                item.style.setProperty(
                    "--clip-top",
                    "0px"
                );

                item.style.setProperty(
                    "--clip-bottom",
                    "0px"
                );

                item.style.setProperty(
                    "--parallax-y",
                    "0px"
                );

                item.style.setProperty(
                    "--parallax-cover-scale",
                    "1"
                );

                item.style.setProperty(
                    "--parallax-cover-bias",
                    "0px"
                );

            });


            return;

        }



        /* =================================================
           ABOUT — VIEWPORT STOP + OWN ENTRY PROGRESS

           The ABOUT keeps its original internal top position.
           It moves naturally with the section, then stops at
           --about-stop-top in the viewport. When the sticky
           stage finally releases, it leaves with the section.
        ================================================= */

        if (
            about &&
            aboutTitle &&
            aboutSquare
        ) {

            const aboutBaseTop =
                about.offsetTop;


            const aboutStopTop =
                cssNumber(
                    "--about-stop-top"
                );


            let aboutPinY = 0;


            if (
                stageRect.top > 0
            ) {

                const naturalAboutTop =
                    stageRect.top +
                    aboutBaseTop;


                aboutPinY =
                    Math.max(
                        0,
                        aboutStopTop -
                        naturalAboutTop
                    );

            }

            else {

                aboutPinY =
                    Math.max(
                        0,
                        aboutStopTop -
                        aboutBaseTop
                    );

            }


            aboutPinYForFlow =
                aboutPinY;


            about.style.transform =
                "translate3d(0," +
                aboutPinY.toFixed(2) +
                "px,0)";

            /*
             * FIRST STICKY ACTION:
             * the section enters first; once stickyProgress starts,
             * ABOUT / OFFFORM opens completely during 0.00 to 0.50.
             */
            const aboutOpeningProgress =
                phase(
                    stickyProgress,
                    0.00,
                    0.50
                );

            updateAboutOpeningHeading(
                aboutOpeningProgress
            );

            alignAboutLineToDevicePixel();

        }



        /* =================================================
           SELECTED TALENT — NATURAL ABOUT FLOW

           This is the missing spacing behavior:
           the entire Selected Work heading + gallery begins
           100px below 01 / 02 / 03 and rises with the sticky
           travel until it reaches its original final position.
        ================================================= */

        const workFlowTravel =
            stickyProgress *
            stickyDistance;

        const workOffset =
            Math.max(
                0,
                workInitialOffset -
                workFlowTravel
            );


        /* =================================================
           GALLERY HEIGHT HOLD — 1 REAL SECOND

           The gallery first reaches its final sticky position with
           every image still top-aligned.

           Only after the gallery has physically reached that position
           do we start a real 1000ms hold.

           When the hold ends, the height transition begins from the
           CURRENT scroll position, so there is no catch-up jump.
        ================================================= */

        if (
            workOffset <= 0.01 &&
            stickyProgress >= 0.54
        ) {

            if (
                !workImageHoldStarted
            ) {

                workImageHoldStarted =
                    true;

                workImageHoldReady =
                    false;

                workImageMorphStartProgress =
                    null;


                if (
                    workImageHoldTimer
                ) {

                    clearTimeout(
                        workImageHoldTimer
                    );

                }


                const holdDuration =
                    Math.max(
                        0,
                        cssNumber(
                            "--work-sticky-hold-ms"
                        ) ||
                        1000
                    );


                workImageHoldTimer =
                    window.setTimeout(
                        function () {

                            workImageHoldReady =
                                true;


                            const currentScrollY =
                                window.scrollY ||
                                window.pageYOffset;


                            workImageMorphStartProgress =
                                clamp(
                                    (
                                        currentScrollY -
                                        stickyStart
                                    ) /
                                    stickyDistance,
                                    0,
                                    1
                                );

                            /* Desktop/wide only:
                               if a fast scroll already reached the very end,
                               keep a tiny amount of scroll range available
                               for the original smooth phase() morph instead
                               of landing exactly on 1. This avoids the
                               original edge case where the morph never starts. */
                            if (
                                desktopReliableMorphLayout.matches &&
                                workImageMorphStartProgress >= 0.999999
                            ) {

                                workImageMorphStartProgress =
                                    0.94;

                            }


                            workImageHoldTimer =
                                null;


                            updateScroll();

                        },
                        holdDuration
                    );

            }

        }

        else {

            /* Desktop/wide:
               once the original 1-second hold has begun, do NOT cancel it
               just because a fast scroll moved past the trigger range.
               This preserves the exact original sequence and makes sure
               the transition cannot be skipped.

               Tablet/mobile keep the original reset behavior below. */
            const keepDesktopHoldAlive =
                desktopReliableMorphLayout.matches &&
                workImageHoldStarted &&
                !workImageHoldReady;

            if (
                !keepDesktopHoldAlive
            ) {

                workImageHoldStarted =
                    false;

                workImageHoldReady =
                    false;

                workImageMorphStartProgress =
                    null;


                if (
                    workImageHoldTimer
                ) {

                    clearTimeout(
                        workImageHoldTimer
                    );

                    workImageHoldTimer =
                        null;

                }

            }

        }


        heading.style.transform =
            "translate3d(0," +
            workOffset.toFixed(2) +
            "px,0)";

        gallery.style.transform =
            "translate3d(0," +
            workOffset.toFixed(2) +
            "px,0)";


        /* =================================================
           SELECTED TALENT — OWN ENTRY PROGRESS

           IMPORTANT:
           The measurement now includes the live natural-flow
           offset above, so the existing smooth entry animation
           is preserved at the correct vertical position.
        ================================================= */

        const headingRect =
            heading.getBoundingClientRect();


        const workMotionStart =
            viewportHeight *
            (
                cssNumber(
                    "--work-motion-start-vh"
                ) /
                100
            );


        const workMotionEnd =
            viewportHeight *
            (
                cssNumber(
                    "--work-motion-end-vh"
                ) /
                100
            );


        const workEntryProgress =
            clamp(
                (
                    workMotionStart -
                    headingRect.top
                ) /
                (
                    workMotionStart -
                    workMotionEnd
                ),
                0,
                1
            );



        /* =================================================
           SELECTED TALENT + TALENTS — SAME ROW FROM THE START

           START:
           SELECTED TALENT  ───  TALENTS

           - BOTH LABELS ARE ALREADY ON THE SAME FINAL Y.
           - A SHORT PART OF THE LINE IS ALREADY OPEN BETWEEN THEM.
           - NOTHING JUMPS INTO THE ROW LATER.

           STICKY:
           - SELECTED TALENT STAYS FIXED.
           - ONLY THE LINE CONTINUES TO GROW.
           - THE GROWING LINE PUSHES TALENTS TO THE RIGHT.
           - WHEN TALENTS REACHES THE FIXED ABOUT SQUARE AT THE
             EXISTING 8PX GAP, IT PUSHES THAT SAME SQUARE TOO.
        ================================================= */

        const buttonGap =
            workSideGap;


        const lineStart =
            workTitleWidth +
            lineTitleGap;


        const initialLineWidth =
            Math.max(
                0,
                cssNumber(
                    "--work-line-initial-width"
                )
            );


        /*
         * Final positions remain exactly the same as the current version:
         *
         * SELECTED TALENT ───────────── TALENTS | 8PX | SQUARE
         */
        const finalSquareLeft =
            wideScreenLayout.matches
                ? Math.max(
                    0,
                    document.documentElement.clientWidth -
                    heading.getBoundingClientRect().left -
                    20 -
                    workSquareSize
                )
                : headingWidth -
                  workSquareSize;


        const finalButtonX =
            finalSquareLeft -
            buttonGap -
            workViewAllWidth;


        const finalLineEnd =
            finalButtonX -
            lineSquareGap;


        const maxLineWidth =
            Math.max(
                initialLineWidth,
                finalLineEnd -
                lineStart
            );


        /*
         * TALENTS starts immediately after the already-visible short line.
         */
        const viewAllStartX =
            lineStart +
            initialLineWidth +
            lineSquareGap;


        /*
         * The build phase starts only once the sticky stage itself begins.
         * Before that, the short line + TALENTS remain perfectly still.
         */
        if (
            workOffset <= 0.01 &&
            stickyProgress >= 0.54
        ) {

            if (
                workLineStickyStartProgress === null
            ) {

                workLineStickyStartProgress =
                    stickyProgress;

            }

        }

        else {

            workLineStickyStartProgress =
                null;

        }


        const buildProgress =
            workLineStickyStartProgress === null
                ?
                0
                :
                (
                    workLineStickyStartProgress >= 0.999999
                        ?
                        1
                        :
                        phase(
                            stickyProgress,
                            workLineStickyStartProgress,
                            1.00
                        )
                );


        const currentLineWidth =
            initialLineWidth +
            (
                maxLineWidth -
                initialLineWidth
            ) *
            buildProgress;


        const currentLineEnd =
            lineStart +
            currentLineWidth;


        /*
         * The line pushes TALENTS continuously from its starting position.
         */
        const pushedButtonX =
            currentLineEnd +
            lineSquareGap;


        const buttonX =
            Math.min(
                finalButtonX,
                Math.max(
                    viewAllStartX,
                    pushedButtonX
                )
            );


        /*
         * Both labels are already on the same row from the moment
         * Selected Work enters. No vertical entry motion is added here.
         */
        workTitle.style.transform =
            "translate3d(0,0,0)";


        workLine.style.left =
            lineStart +
            "px";


        workLine.style.width =
            currentLineWidth +
            "px";


        workViewAll.style.transform =
            "translate3d(" +
            buttonX.toFixed(2) +
            "px,0,0)";


        /*
         * Stored for the ABOUT-square block below.
         * Once TALENTS reaches the square at the existing 8px gap,
         * this same square is pushed to the right with the group.
         */
        const desiredSharedSquareLeft =
            buttonX +
            workViewAllWidth +
            buttonGap;


        /* =================================================
           ABOUT OBSTACLE + 01 / 02 / 03

           IMPORTANT:
           THIS IS THE ONLY NEW SCROLL BEHAVIOUR ADDED TO
           THE SMOOTH BASE CODE.

           - THE SQUARE STARTS 100PX BELOW THE PARAGRAPH.
           - 01 / 02 / 03 START 100PX BELOW THE SQUARE.
           - SELECTED TALENT STARTS 100PX BELOW 01 / 02 / 03.
           - THE ROWS OPEN 70PX BEFORE THEY REACH THE SQUARE.
           - THEY CLOSE 70PX AFTER THEY PASS IT.
           - THE SQUARE MOVES SMOOTHLY TO THE EXACT Y OF THE
             TALENTS SQUARE BEFORE THE LINE TRAVEL BEGINS.
           - WHEN THE TALENTS SQUARE REACHES IT, THE TWO
             SQUARES OVERLAP. FROM THAT POINT THE ABOUT
             SQUARE DISAPPEARS AND THE TALENTS SQUARE
             CONTINUES AS THE ONE SHARED SQUARE.
           - SELECTED TALENT / TALENTS LOGIC ABOVE IS UNCHANGED.
        ================================================= */

        if (
            aboutMainParagraph &&
            aboutObstacleWrap &&
            aboutObstacle &&
            aboutServices &&
            aboutServiceRows.length
        ) {

            /* ---------------------------------------------
               RESET LIVE FLOW VALUES BEFORE MEASURING
            --------------------------------------------- */

            aboutServices.style.transform =
                "translate3d(0,0,0)";


            aboutServiceRows.forEach(row => {

                row.style.setProperty(
                    "--service-left-shift",
                    "0px"
                );

                row.style.setProperty(
                    "--service-right-shift",
                    "0px"
                );

            });


            /* ---------------------------------------------
               01 / 02 / 03 — CONTINUOUS 1:1 UPWARD PASS
            --------------------------------------------- */

            const paragraphRect =
                aboutMainParagraph
                    .getBoundingClientRect();


            const servicesNaturalRect =
                aboutServices
                    .getBoundingClientRect();


            const finalServicesTop =
                paragraphRect.bottom +
                cssNumber(
                    "--about-services-gap"
                );


            const servicesTravelNeeded =
                Math.max(
                    0,
                    servicesNaturalRect.top -
                    finalServicesTop
                );


            /*
             * NATURAL 1:1 FLOW:
             *
             * aboutPinYForFlow is the exact amount by which the ABOUT
             * parent is being held back from its natural upward scroll.
             * Giving that same amount back to 01 / 02 / 03 means they
             * never pause, reverse, jump or catch up. They simply keep
             * travelling upward exactly like normal document content.
             *
             * After the sticky stage itself begins, stickyProgress adds
             * the continuing 1:1 scroll distance.
             */
            const flowTravel =
                aboutPinYForFlow +
                (
                    stickyProgress *
                    stickyDistance
                );


            const servicesShift =
                -Math.min(
                    flowTravel,
                    servicesTravelNeeded
                );


            aboutServices.style.transform =
                "translate3d(0," +
                servicesShift.toFixed(2) +
                "px,0)";


            /* ---------------------------------------------
               ABOUT SQUARE — NATURAL ENTRY, THEN HARD STOP

               IMPORTANT:

               The square has NO independent entry animation.
               It enters as ordinary content in its natural position,
               exactly 100px below the paragraph.

               01 / 02 / 03 remain exactly 100px below it and keep
               travelling upward 1:1 with the page.

               Only when the square itself physically reaches the final
               viewport Y of the TALENTS square do we compensate its
               further upward movement and hold it there.

               Nothing below the square is pinned.
            --------------------------------------------- */

            const obstacleWrapRect =
                aboutObstacleWrap
                    .getBoundingClientRect();


            const obstacleSize =
                cssNumber(
                    "--about-obstacle-size"
                ) ||
                7;


            /*
             * The true final TALENTS row position is already defined
             * by the heading's absolute CSS position inside the sticky
             * stage. offsetTop is transform-free, so it is not affected
             * by the temporary Selected Work flow offset.
             */
            const finalWorkSquareCenterY =
                heading.offsetTop +
                (workTitleHeight / 2) +
                Math.min(
                    0,
                    stageRect.top
                );


            const naturalObstacleCenterY =
                obstacleWrapRect.top +
                (obstacleSize / 2);


            /*
             * Before reaching the stop: 0px transform = totally natural.
             * After reaching the stop: compensate only the extra upward
             * travel, keeping the square fixed at finalWorkSquareCenterY.
             */
            const obstacleShiftY =
                Math.max(
                    0,
                    finalWorkSquareCenterY -
                    naturalObstacleCenterY
                );


            /*
             * The square still enters naturally and hard-stops at the
             * exact same Y as before.
             *
             * Horizontally it remains completely fixed until TALENTS
             * reaches it at the existing buttonGap (8px). From that
             * moment TALENTS pushes this same square to the right.
             * This square therefore becomes the final shared square.
             *
             * Reset X before measuring so there is never any cumulative
             * frame-to-frame drift.
             */
            aboutObstacle.style.transform =
                "translate3d(0," +
                obstacleShiftY.toFixed(2) +
                "px,0)";


            const obstacleBaseRect =
                aboutObstacle
                    .getBoundingClientRect();


            const headingLiveRect =
                heading
                    .getBoundingClientRect();


            const obstacleBaseHeadingX =
                obstacleBaseRect.left -
                headingLiveRect.left;


            const targetObstacleHeadingX =
                Math.min(
                    finalSquareLeft,
                    Math.max(
                        obstacleBaseHeadingX,
                        desiredSharedSquareLeft
                    )
                );


            const finalObstaclePushX =
                targetObstacleHeadingX -
                obstacleBaseHeadingX;


            aboutObstacle.style.transform =
                "translate3d(" +
                finalObstaclePushX.toFixed(2) +
                "px," +
                obstacleShiftY.toFixed(2) +
                "px,0)";


            /* ---------------------------------------------
               PASS AROUND THE SQUARE — 70PX IN / 70PX OUT
            --------------------------------------------- */

            const obstacleRect =
                aboutObstacle
                    .getBoundingClientRect();


            const clearance =
                cssNumber(
                    "--about-obstacle-clearance"
                );


            const openDistance =
                cssNumber(
                    "--about-services-open-distance"
                ) ||
                70;


            const closeDistance =
                cssNumber(
                    "--about-services-close-distance"
                ) ||
                50;


            aboutServiceRows.forEach(row => {

                const leftHalf =
                    row.querySelector(
                        ".offform-about-service-number"
                    );


                const rightHalf =
                    row.querySelector(
                        ".offform-about-service-label"
                    );


                if (
                    !leftHalf ||
                    !rightHalf
                ) {

                    return;

                }


                const rowRect =
                    row.getBoundingClientRect();


                const leftRect =
                    leftHalf.getBoundingClientRect();


                const rightRect =
                    rightHalf.getBoundingClientRect();


                const lineCenterY =
                    rowRect.top +
                    (rowRect.height / 2);


                const influence =
                    getObstacleInfluence(
                        lineCenterY,
                        obstacleRect,
                        openDistance,
                        closeDistance
                    );


                const targetLeft =
                    obstacleRect.left -
                    clearance;


                const targetRight =
                    obstacleRect.right +
                    clearance;


                const neededLeftShift =
                    Math.max(
                        0,
                        leftRect.right -
                        targetLeft
                    );


                const neededRightShift =
                    Math.max(
                        0,
                        targetRight -
                        rightRect.left
                    );


                row.style.setProperty(
                    "--service-left-shift",
                    (
                        neededLeftShift *
                        influence
                    ).toFixed(2) +
                    "px"
                );


                row.style.setProperty(
                    "--service-right-shift",
                    (
                        neededRightShift *
                        influence
                    ).toFixed(2) +
                    "px"
                );

            });


            /* ---------------------------------------------
               ONE SQUARE ONLY

               The old TALENTS square no longer exists visually.
               The ABOUT square stays visible throughout and, after
               TALENTS reaches it at the 8px gap, it is physically
               pushed to the final square position.
            --------------------------------------------- */

            aboutObstacle.style.opacity =
                "1";

        }


        /* =================================================
           IMAGE ENTRY + EXIT / INTERNAL PARALLAX

           ENTRY:
           Images begin with positive Y offset and settle to 0.

           EXIT:
           Only after the sticky stage releases, the same internal
           parallax runs in the opposite direction (negative Y).

           Everything else remains unchanged.
        ================================================= */

        const stageEntryProgress =
            clamp(
                (
                    viewportHeight -
                    stageRect.top
                ) /
                viewportHeight,
                0,
                1
            );


        /*
         * Sticky release begins when the stage starts moving
         * upward out of the viewport.
         *
         * stageRect.top = 0      -> still sticky
         * stageRect.top < 0      -> released / exiting
         *
         * Progress reaches 1 after one viewport of exit.
         */
        const stageExitProgress =
            clamp(
                (
                    -stageRect.top
                ) /
                viewportHeight,
                0,
                1
            );


        items.forEach(item => {

            const strength =
                parseFloat(
                    item.dataset.parallax
                ) ||
                40;


            /*
             * ENTRY  : +strength -> 0
             * EXIT   : 0 -> -strength
             */
            const entryY =
                (
                    1 -
                    stageEntryProgress
                ) *
                strength;


            /*
             * EXIT SPEED:
             * Each image gets a very subtle individual multiplier.
             * This affects EXIT ONLY — entry remains identical.
             */
            const exitSpeed =
                parseFloat(
                    item.dataset.exitSpeed
                ) ||
                1;


            const exitY =
                -stageExitProgress *
                strength *
                exitSpeed;


            const y =
                entryY +
                exitY;


            /*
             * PURE PARALLAX:
             * entry and exit are translateY only.
             *
             * The fixed coverage scale was calculated in measure()
             * and never changes during hover or scrolling.
             */
            const gap =
                item._gap ||
                0;


            item.style.setProperty(
                "--parallax-y",
                y + "px"
            );


            /* ---------------------------------------------
               HEIGHT TRANSITION PROGRESS

               BEFORE sticky:
               top aligned.

               FIRST 1 SECOND IN sticky:
               still top aligned.

               AFTER the 1-second hold:
               begin the original top -> bottom height transition,
               remapped from the live scroll position at that moment.
            --------------------------------------------- */

            let imageHeightProgress =
                0;


            if (
                workImageHoldReady &&
                workImageMorphStartProgress !== null
            ) {

                if (
                    workImageMorphStartProgress >= 0.999999
                ) {

                    imageHeightProgress =
                        0;

                }

                else {

                    imageHeightProgress =
                        phase(
                            stickyProgress,
                            workImageMorphStartProgress,
                            1.00
                        );

                }

            }


            const baseClipTop =
                gap *
                imageHeightProgress;


            const baseClipBottom =
                gap *
                (
                    1 -
                    imageHeightProgress
                );


            item._baseClipTop =
                baseClipTop;


            item._baseClipBottom =
                baseClipBottom;


            if (
                typeof item._applyHoverClip ===
                "function"
            ) {

                item._applyHoverClip();

            }

            else {

                item.style.setProperty(
                    "--clip-top",
                    baseClipTop + "px"
                );


                item.style.setProperty(
                    "--clip-bottom",
                    baseClipBottom + "px"
                );

            }

        });

    }



    /* =====================================================
       SCROLL
    ===================================================== */

    let scrollTicking =
        false;


    window.addEventListener(
        "scroll",
        function () {

            if (
                scrollTicking
            ) {
                return;
            }


            scrollTicking =
                true;


            requestAnimationFrame(
                function () {

                    updateScroll();


                    scrollTicking =
                        false;

                }
            );

        },
        {
            passive: true
        }
    );



    /* =====================================================
       INFINITE LOOP + MANUAL DRAG CONTROL

       AUTO:
       Keeps moving at the exact same speed as before.

       DRAG:
       Hold + drag left/right anywhere on the gallery.
       The same loopOffset is used, so there is no second
       movement system and no jump when control is released.
    ===================================================== */

    let lastTime =
        performance.now();


    let gallerySectionVisible =
        false;


    let galleryHasEntered =
        false;


    let isDragging =
        false;


    let dragPointerId =
        null;


    let dragLastX =
        0;


    let dragMoved =
        false;


    /*
     * MOBILE DIRECTION LOCK
     *
     * Horizontal finger movement = gallery drag.
     * Vertical finger movement   = normal page scroll.
     *
     * Desktop behavior stays unchanged.
     */
    let dragStartX =
        0;


    let dragStartY =
        0;


    let dragAxis =
        null;


    const DRAG_THRESHOLD =
        3;


    const MOBILE_DIRECTION_THRESHOLD =
        4;


    const MOBILE_VERTICAL_LOCK_THRESHOLD =
        10;



    function normalizeLoopOffset() {

        if (
            loopWidth <=
            0
        ) {

            return;

        }


        loopOffset =
            (
                (
                    loopOffset %
                    loopWidth
                ) +
                loopWidth
            ) %
            loopWidth;

    }



    function renderTrack() {

        if (
            loopWidth <=
            0
        ) {

            return;

        }


        normalizeLoopOffset();


        track.style.transform =
            "translate3d(" +
            (-loopOffset) +
            "px,0,0)";

    }



    function loop(time) {

        const delta =
            Math.min(
                50,
                time -
                lastTime
            );


        lastTime =
            time;


        const sectionRect =
            section.getBoundingClientRect();


        const isSectionVisible =
            sectionRect.bottom > 0 &&
            sectionRect.top < window.innerHeight;


        if (isSectionVisible) {

            gallerySectionVisible =
                true;

            galleryHasEntered =
                true;

        }

        else {

            if (
                gallerySectionVisible ||
                galleryHasEntered
            ) {

                loopOffset =
                    0;


                isDragging =
                    false;


                dragPointerId =
                    null;


                dragLastX =
                    0;


                dragStartX =
                    0;


                dragStartY =
                    0;


                dragAxis =
                    null;


                dragMoved =
                    false;


                renderTrack();

            }


            gallerySectionVisible =
                false;

            galleryHasEntered =
                false;

        }


        if (
            loopWidth >
            0 &&
            gallerySectionVisible
        ) {

            if (
                !isDragging
            ) {

                loopOffset +=
                    loopSpeed *
                    delta /
                    1000;

            }


            renderTrack();

        }


        requestAnimationFrame(
            loop
        );

    }



    /* =====================================================
       POINTER DRAG
    ===================================================== */

    gallery.addEventListener(
        "pointerdown",
        function (event) {

            /*
             * REAL MOBILE TOUCH uses the dedicated touch handlers below.
             * Pointer handling remains intact for desktop / editor mouse.
             */
            if (
                mobileLayout.matches &&
                event.pointerType === "touch"
            ) {

                return;

            }


            if (
                event.pointerType ===
                    "mouse" &&
                event.button !==
                    0
            ) {

                return;

            }


            if (
                isDragging
            ) {

                return;

            }


            isDragging =
                true;


            dragPointerId =
                event.pointerId;


            dragLastX =
                event.clientX;


            dragStartX =
                event.clientX;


            dragStartY =
                event.clientY;


            dragAxis =
                null;


            dragMoved =
                false;


            /*
             * DESKTOP keeps the original immediate pointer capture.
             *
             * MOBILE deliberately waits until we know the gesture is
             * horizontal. This lets a vertical finger movement remain
             * a completely normal page scroll.
             */
            if (
                !mobileLayout.matches
            ) {

                try {

                    gallery.setPointerCapture(
                        event.pointerId
                    );

                }

                catch (error) {}

            }

        }
    );


    gallery.addEventListener(
        "pointermove",
        function (event) {

            /*
             * REAL MOBILE TOUCH uses touchmove below.
             */
            if (
                mobileLayout.matches &&
                event.pointerType === "touch"
            ) {

                return;

            }


            if (
                !isDragging ||
                event.pointerId !==
                    dragPointerId
            ) {

                return;

            }


            /*
             * MOBILE: decide the gesture direction before moving anything.
             *
             * If the finger is moving vertically, the gallery does nothing
             * and the browser/Lenis keeps the normal page scroll.
             *
             * If the finger is moving horizontally, lock the gesture to X
             * and only then start dragging the gallery.
             */
            if (
                mobileLayout.matches &&
                dragAxis === null
            ) {

                const totalX =
                    event.clientX -
                    dragStartX;


                const totalY =
                    event.clientY -
                    dragStartY;


                const absX =
                    Math.abs(totalX);


                const absY =
                    Math.abs(totalY);


                /*
                 * MOBILE — FAVOR HORIZONTAL GALLERY INTENT.
                 *
                 * A real finger swipe almost always has a little vertical
                 * wobble. Do not reject the gallery just because Y is a few
                 * pixels larger during the first tiny movement.
                 */
                if (
                    absX >=
                        MOBILE_DIRECTION_THRESHOLD &&
                    absX >=
                        absY * 0.70
                ) {

                    dragAxis =
                        "x";


                    try {

                        gallery.setPointerCapture(
                            event.pointerId
                        );

                    }

                    catch (error) {}


                    if (
                        event.cancelable
                    ) {

                        event.preventDefault();

                    }

                }

                else if (
                    absY >=
                        MOBILE_VERTICAL_LOCK_THRESHOLD &&
                    absY >
                        absX * 1.40
                ) {

                    /*
                     * Clear vertical intent = normal native page scroll.
                     */
                    isDragging =
                        false;


                    dragPointerId =
                        null;


                    dragLastX =
                        0;


                    dragAxis =
                        "y";


                    lastTime =
                        performance.now();


                    return;

                }

                else {

                    /*
                     * Still ambiguous — wait for a few more pixels instead
                     * of prematurely locking the gesture to vertical.
                     */
                    return;

                }

            }


            /*
             * On mobile, never move the gallery unless the gesture
             * has explicitly locked to the horizontal axis.
             */
            if (
                mobileLayout.matches &&
                dragAxis !== "x"
            ) {

                return;

            }


            /*
             * Once horizontal intent is confirmed, keep the page itself
             * from stealing the same gesture vertically.
             */
            if (
                mobileLayout.matches &&
                event.cancelable
            ) {

                event.preventDefault();

            }


            const deltaX =
                event.clientX -
                dragLastX;


            dragLastX =
                event.clientX;


            if (
                Math.abs(deltaX) >=
                DRAG_THRESHOLD
            ) {

                dragMoved =
                    true;

            }


            /*
             * Drag left  -> content follows left -> advance.
             * Drag right -> content follows right -> go back.
             */
            loopOffset -=
                deltaX;


            normalizeLoopOffset();


            renderTrack();

        },
        {
            passive: false
        }
    );



    /* =====================================================
       REAL MOBILE TOUCH DRAG

       On actual phones Safari / Chrome can treat touch differently
       from the editor's mouse/pointer emulation. Mobile therefore
       gets its own native touch path:

       - horizontal finger movement = gallery
       - vertical finger movement   = normal page scroll
       - desktop is not involved
    ===================================================== */

    let mobileTouchActive =
        false;


    function resetMobileTouchDrag() {

        mobileTouchActive =
            false;


        isDragging =
            false;


        dragPointerId =
            null;


        dragLastX =
            0;


        dragStartX =
            0;


        dragStartY =
            0;


        dragAxis =
            null;


        lastTime =
            performance.now();

    }


    gallery.addEventListener(
        "touchstart",
        function (event) {

            if (
                !mobileLayout.matches ||
                event.touches.length !== 1
            ) {

                return;

            }


            const touch =
                event.touches[0];


            mobileTouchActive =
                true;


            isDragging =
                true;


            dragPointerId =
                null;


            dragLastX =
                touch.clientX;


            dragStartX =
                touch.clientX;


            dragStartY =
                touch.clientY;


            dragAxis =
                null;


            dragMoved =
                false;

        },
        {
            passive: true
        }
    );


    gallery.addEventListener(
        "touchmove",
        function (event) {

            if (
                !mobileLayout.matches ||
                !mobileTouchActive ||
                event.touches.length !== 1
            ) {

                return;

            }


            const touch =
                event.touches[0];


            if (
                dragAxis === null
            ) {

                const totalX =
                    touch.clientX -
                    dragStartX;


                const totalY =
                    touch.clientY -
                    dragStartY;


                const absX =
                    Math.abs(totalX);


                const absY =
                    Math.abs(totalY);


                /*
                 * Favor horizontal intent so a normal small vertical wobble
                 * does not kill the gallery swipe on a real phone.
                 */
                if (
                    absX >=
                        MOBILE_DIRECTION_THRESHOLD &&
                    absX >=
                        absY * 0.70
                ) {

                    dragAxis =
                        "x";


                    dragLastX =
                        touch.clientX;

                }

                else if (
                    absY >=
                        MOBILE_VERTICAL_LOCK_THRESHOLD &&
                    absY >
                        absX * 1.40
                ) {

                    /*
                     * Clear vertical intent.
                     * Release the gallery completely and leave scrolling
                     * to the browser.
                     */
                    resetMobileTouchDrag();


                    return;

                }

                else {

                    return;

                }

            }


            if (
                dragAxis !== "x"
            ) {

                return;

            }


            /*
             * Only horizontal gallery movement suppresses the browser's
             * handling of this touchmove. Vertical gestures never get here.
             */
            if (
                event.cancelable
            ) {

                event.preventDefault();

            }


            const deltaX =
                touch.clientX -
                dragLastX;


            dragLastX =
                touch.clientX;


            if (
                Math.abs(deltaX) >=
                    DRAG_THRESHOLD
            ) {

                dragMoved =
                    true;

            }


            loopOffset -=
                deltaX;


            normalizeLoopOffset();


            renderTrack();

        },
        {
            passive: false
        }
    );


    gallery.addEventListener(
        "touchend",
        function () {

            if (
                !mobileLayout.matches
            ) {

                return;

            }


            resetMobileTouchDrag();

        },
        {
            passive: true
        }
    );


    gallery.addEventListener(
        "touchcancel",
        function () {

            if (
                !mobileLayout.matches
            ) {

                return;

            }


            resetMobileTouchDrag();

        },
        {
            passive: true
        }
    );



    function endDrag(event) {

        if (
            !isDragging
        ) {

            return;

        }


        if (
            event &&
            event.pointerId !==
                dragPointerId
        ) {

            return;

        }


        if (
            event
        ) {

            try {

                if (
                    gallery.hasPointerCapture(
                        event.pointerId
                    )
                ) {

                    gallery.releasePointerCapture(
                        event.pointerId
                    );

                }

            }

            catch (error) {}

        }


        isDragging =
            false;


        dragPointerId =
            null;


        dragLastX =
            0;


        dragStartX =
            0;


        dragStartY =
            0;


        dragAxis =
            null;


        /*
         * Reset timing here so the automatic movement resumes
         * at its normal speed without a large accumulated delta.
         */
        lastTime =
            performance.now();

    }


    gallery.addEventListener(
        "pointerup",
        endDrag
    );


    gallery.addEventListener(
        "pointercancel",
        endDrag
    );


    gallery.addEventListener(
        "lostpointercapture",
        function () {

            if (
                isDragging
            ) {

                isDragging =
                    false;


                dragPointerId =
                    null;


                dragLastX =
                    0;


                dragStartX =
                    0;


                dragStartY =
                    0;


                dragAxis =
                    null;


                lastTime =
                    performance.now();

            }

        }
    );


    /*
     * Prevent the browser's native image drag from taking over.
     * This does not affect the existing hover reveal or wave.
     */
    gallery.addEventListener(
        "dragstart",
        function (event) {

            event.preventDefault();

        }
    );



    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            passive: true
        }
    );



    /* =====================================================
       START
    ===================================================== */

    requestAnimationFrame(
        function () {

            measure();


            requestAnimationFrame(
                loop
            );

        }
    );


})();;
/* =========================================================
   IMAGE HOVER REVEAL — HERO-LIKE CURTAIN

   The scroll still decides the natural top/bottom crop.
   Hover only reveals the missing parts of that crop.
   The full 50vh image is already behind the mask.

   Bottom position  → opens upward
   Middle position  → opens both ways
   Top position     → opens downward
========================================================= */

(function () {

    const desktop =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        );


    if (!desktop.matches) {
        return;
    }


    const items =
        document.querySelectorAll(
            ".offform-work-item"
        );


    if (!items.length) {
        return;
    }


    const DURATION = 650;


    /* =====================================================
       SAME EASING AS HERO:
       cubic-bezier(0.76, 0, 0.24, 1)
    ===================================================== */

    function cubicBezier(
        x1,
        y1,
        x2,
        y2
    ) {

        const sampleCurveX = t => {

            const inv =
                1 - t;


            return (
                3 *
                inv *
                inv *
                t *
                x1
            ) +
            (
                3 *
                inv *
                t *
                t *
                x2
            ) +
            (
                t *
                t *
                t
            );

        };


        const sampleCurveY = t => {

            const inv =
                1 - t;


            return (
                3 *
                inv *
                inv *
                t *
                y1
            ) +
            (
                3 *
                inv *
                t *
                t *
                y2
            ) +
            (
                t *
                t *
                t
            );

        };


        return function (x) {

            x =
                Math.max(
                    0,
                    Math.min(
                        1,
                        x
                    )
                );


            let low = 0;

            let high = 1;

            let t = x;


            for (
                let i = 0;
                i < 14;
                i++
            ) {

                t =
                    (
                        low +
                        high
                    ) /
                    2;


                const estimate =
                    sampleCurveX(t);


                if (
                    estimate <
                    x
                ) {

                    low = t;

                }

                else {

                    high = t;

                }

            }


            return sampleCurveY(t);

        };

    }


    const ease =
        cubicBezier(
            0.76,
            0,
            0.24,
            1
        );


    items.forEach(item => {

        const media =
            item.querySelector(
                ".offform-work-media"
            );


        if (!media) {
            return;
        }


        let reveal = 0;

        let startReveal = 0;

        let targetReveal = 0;

        let startTime = 0;

        let frame = null;


        item._baseClipTop =
            item._baseClipTop || 0;


        item._baseClipBottom =
            item._baseClipBottom || 0;


        item._hoverReveal = 0;


        /* =================================================
           APPLY

           The scroll values keep changing underneath.
           We simply reveal a percentage of whatever crop
           currently exists, so hover and scroll never fight.
        ================================================= */

        item._applyHoverClip =
            function () {

                const amount =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            item._hoverReveal || 0
                        )
                    );


                const top =
                    (
                        item._baseClipTop ||
                        0
                    ) *
                    (
                        1 -
                        amount
                    );


                const bottom =
                    (
                        item._baseClipBottom ||
                        0
                    ) *
                    (
                        1 -
                        amount
                    );


                item.style.setProperty(
                    "--clip-top",
                    top.toFixed(3) +
                    "px"
                );


                item.style.setProperty(
                    "--clip-bottom",
                    bottom.toFixed(3) +
                    "px"
                );

            };


        item._applyHoverClip();


        /* =================================================
           ANIMATE REVEAL
        ================================================= */

        function animate(time) {

            const progress =
                Math.min(
                    1,
                    (
                        time -
                        startTime
                    ) /
                    DURATION
                );


            const eased =
                ease(progress);


            reveal =
                startReveal +
                (
                    targetReveal -
                    startReveal
                ) *
                eased;


            item._hoverReveal =
                reveal;


            item._applyHoverClip();


            if (
                progress <
                1
            ) {

                frame =
                    requestAnimationFrame(
                        animate
                    );

            }

            else {

                frame = null;

                reveal =
                    targetReveal;

                item._hoverReveal =
                    reveal;

                item._applyHoverClip();

            }

        }


        function moveTo(value) {

            if (
                targetReveal === value &&
                frame !== null
            ) {
                return;
            }


            if (
                frame !== null
            ) {

                cancelAnimationFrame(
                    frame
                );

                frame = null;

            }


            startReveal =
                reveal;


            targetReveal =
                value;


            startTime =
                performance.now();


            frame =
                requestAnimationFrame(
                    animate
                );

        }


        /* =================================================
           POINTER

           ENTER  → reveal full 50vh
           LEAVE  → return smoothly to live scroll crop
        ================================================= */

        media.addEventListener(
            "mouseenter",
            function () {

                moveTo(1);

            }
        );


        media.addEventListener(
            "mouseleave",
            function () {

                moveTo(0);

            }
        );

    });


})();;
/* =========================================================
   WAVE HOVER — SAME MOVEMENT LOGIC AS HERO
========================================================= */

(function () {

    const DISTORTION_STRENGTH = 4.5;

    const WAVE_FREQUENCY = 0.045;

    const WAVE_SPEED = 0.13;

    const ORGANIC_AMOUNT = 0.65;

    const FADE_SPEED = 0.14;

    /*
     * FINAL WAVE CROSSFADE
     *
     * The canvas stays fully visible through almost all of the wave,
     * then softly crossfades into the real image only at the very end.
     * This removes the tiny final "settle" / jump when the canvas
     * disappears, without changing the wave movement itself.
     */
    const WAVE_CROSSFADE_START = 0.12;

    const MOVE_TIMEOUT = 70;


    const desktop =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        );


    if (!desktop.matches) {
        return;
    }


    const blocks =
        document.querySelectorAll(
            ".offform-work-media"
        );


    blocks.forEach(
        function (block) {


            const image =
                block.querySelector(
                    "img"
                );


            const canvas =
                block.querySelector(
                    ".offform-work-wave"
                );


            if (
                !image ||
                !canvas
            ) {

                return;

            }


            const context =
                canvas.getContext(
                    "2d"
                );


            if (!context) {
                return;
            }


            const sourceCanvas =
                document.createElement(
                    "canvas"
                );


            const sourceContext =
                sourceCanvas.getContext(
                    "2d"
                );


            if (!sourceContext) {
                return;
            }


            let mouseY = null;

            let previousX = null;
            let previousY = null;

            let isInside = false;
            let isMoving = false;

            let movementAmount = 0;

            let wavePhase = 0;

            let moveTimer = null;


            /* =====================================================
               SIZE
            ===================================================== */

            function resizeCanvas() {


                const rect =
                    block.getBoundingClientRect();


                const width =
                    Math.max(
                        1,
                        Math.round(
                            rect.width
                        )
                    );


                const height =
                    Math.max(
                        1,
                        Math.round(
                            rect.height
                        )
                    );


                if (
                    canvas.width !== width ||
                    canvas.height !== height
                ) {

                    canvas.width =
                        width;

                    canvas.height =
                        height;

                }


                if (
                    sourceCanvas.width !== width ||
                    sourceCanvas.height !== height
                ) {

                    sourceCanvas.width =
                        width;

                    sourceCanvas.height =
                        height;

                }

            }


            /* =====================================================
               CAPTURE IMAGE
            ===================================================== */

            function captureImage() {


                resizeCanvas();


                const width =
                    sourceCanvas.width;


                const height =
                    sourceCanvas.height;


                sourceContext.clearRect(
                    0,
                    0,
                    width,
                    height
                );


                if (
                    !image.complete ||
                    image.naturalWidth <= 0 ||
                    image.naturalHeight <= 0
                ) {

                    return false;

                }


                const naturalWidth =
                    image.naturalWidth;


                const naturalHeight =
                    image.naturalHeight;


                const scale =
                    Math.max(

                        width /
                        naturalWidth,

                        height /
                        naturalHeight

                    );


                const sourceWidth =
                    width /
                    scale;


                const sourceHeight =
                    height /
                    scale;


                /*
                 * SELECTED TALENT uses:
                 * object-position: top center
                 */

                const sourceX =
                    (
                        naturalWidth -
                        sourceWidth
                    ) *
                    0.5;


                const sourceY =
                    0;


                try {


                    sourceContext.drawImage(

                        image,

                        sourceX,
                        sourceY,

                        sourceWidth,
                        sourceHeight,

                        0,
                        0,

                        width,
                        height

                    );


                    return true;

                }


                catch (error) {

                    return false;

                }

            }


            /* =====================================================
               DRAW WAVE
            ===================================================== */

            function drawWave() {


                const width =
                    canvas.width;


                const height =
                    canvas.height;


                if (
                    width <= 0 ||
                    height <= 0
                ) {

                    return;

                }


                const stripHeight =
                    2;


                const overlap =
                    1;


                for (
                    let y = 0;
                    y < height;
                    y += stripHeight
                ) {


                    const mainWave =
                        Math.sin(

                            y *
                                WAVE_FREQUENCY +

                            wavePhase

                        );


                    const organicWave =
                        Math.sin(

                            y * 0.021 -

                            wavePhase *
                                1.7

                        ) *

                        ORGANIC_AMOUNT;


                    const mouseInfluence =

                        mouseY !== null

                            ? Math.sin(

                                (
                                    y -
                                    mouseY
                                ) *

                                0.018 +

                                wavePhase *
                                0.65

                            ) *

                            0.35

                            : 0;


                    const displacement =

                        (
                            mainWave +
                            organicWave +
                            mouseInfluence
                        )

                        *

                        DISTORTION_STRENGTH

                        *

                        movementAmount;


                    const drawHeight =
                        Math.min(

                            stripHeight +
                            overlap,

                            height -
                            y

                        );


                    context.drawImage(

                        sourceCanvas,

                        0,
                        y,

                        width,
                        drawHeight,

                        displacement,
                        y,

                        width,
                        drawHeight

                    );


                    if (
                        displacement > 0
                    ) {


                        context.drawImage(

                            sourceCanvas,

                            0,
                            y,

                            1,
                            drawHeight,

                            0,
                            y,

                            displacement + 1,
                            drawHeight

                        );

                    }


                    if (
                        displacement < 0
                    ) {


                        const gap =
                            Math.abs(
                                displacement
                            );


                        context.drawImage(

                            sourceCanvas,

                            Math.max(
                                0,
                                width - 1
                            ),

                            y,

                            1,
                            drawHeight,

                            width -
                            gap -
                            1,

                            y,

                            gap + 1,
                            drawHeight

                        );

                    }

                }

            }


            /* =====================================================
               MOVEMENT
            ===================================================== */

            function clearMoveTimer() {


                if (
                    moveTimer !== null
                ) {

                    clearTimeout(
                        moveTimer
                    );


                    moveTimer =
                        null;

                }

            }


            function registerMovement() {


                isMoving =
                    true;


                clearMoveTimer();


                moveTimer =
                    setTimeout(

                        function () {


                            moveTimer =
                                null;


                            isMoving =
                                false;

                        },

                        MOVE_TIMEOUT

                    );

            }


            /* =====================================================
               POINTER
            ===================================================== */

            block.addEventListener(

                "mousemove",

                function (event) {


                    const rect =
                        block
                            .getBoundingClientRect();


                    const localX =
                        event.clientX -
                        rect.left;


                    const localY =
                        event.clientY -
                        rect.top;


                    mouseY =
                        localY;


                    if (
                        previousX !== null &&
                        previousY !== null
                    ) {


                        const dx =
                            localX -
                            previousX;


                        const dy =
                            localY -
                            previousY;


                        const distance =
                            Math.hypot(
                                dx,
                                dy
                            );


                        if (
                            distance > 0.2
                        ) {

                            registerMovement();

                        }

                    }


                    else {

                        registerMovement();

                    }


                    previousX =
                        localX;


                    previousY =
                        localY;

                },

                {
                    passive: true
                }

            );


            block.addEventListener(

                "mouseenter",

                function () {


                    isInside =
                        true;


                    previousX =
                        null;


                    previousY =
                        null;


                    movementAmount =
                        0;


                    resizeCanvas();

                }

            );


            block.addEventListener(

                "mouseleave",

                function () {


                    isInside =
                        false;


                    isMoving =
                        false;


                    previousX =
                        null;


                    previousY =
                        null;


                    mouseY =
                        null;


                    clearMoveTimer();

                }

            );


            window.addEventListener(

                "resize",

                resizeCanvas,

                {
                    passive: true
                }

            );


            /* =====================================================
               ANIMATION
            ===================================================== */

            function animate() {


                requestAnimationFrame(
                    animate
                );


                if (
                    !isInside &&
                    movementAmount <= 0.001
                ) {


                    canvas.style.opacity =
                        "0";


                    return;

                }


                if (
                    isMoving
                ) {


                    movementAmount +=

                        (
                            1 -
                            movementAmount
                        )

                        *

                        0.45;

                }


                else {


                    movementAmount *=

                        (
                            1 -
                            FADE_SPEED
                        );


                    if (
                        movementAmount < 0.01
                    ) {

                        movementAmount =
                            0;

                    }

                }


                if (
                    movementAmount <= 0
                ) {


                    canvas.style.opacity =
                        "0";


                    context.clearRect(

                        0,
                        0,

                        canvas.width,
                        canvas.height

                    );


                    return;

                }


                if (
                    !captureImage()
                ) {

                    return;

                }


                context.clearRect(

                    0,
                    0,

                    canvas.width,
                    canvas.height

                );


                wavePhase +=
                    WAVE_SPEED;


                drawWave();


                /*
                 * Keep the wave canvas fully opaque while the wave
                 * is clearly moving. Only during the final tiny tail
                 * do we blend it smoothly back into the real image.
                 *
                 * This prevents the last-frame swap from looking like
                 * the image shifts a few pixels into place.
                 */
                const canvasOpacity =
                    movementAmount >=
                    WAVE_CROSSFADE_START
                        ?
                        1
                        :
                        (
                            movementAmount /
                            WAVE_CROSSFADE_START
                        );


                canvas.style.opacity =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            canvasOpacity
                        )
                    ).toFixed(4);

            }


            resizeCanvas();


            requestAnimationFrame(
                animate
            );


        }
    );


})();;
(function () {

    const section =
        document.querySelector(
            ".talents"
        );


    if (!section) return;


    /* MOBILE-ONLY MODE. DESKTOP CONTINUES THROUGH THE ORIGINAL PATH. */
    const mobileLayout =
        window.matchMedia(
            "(max-width: 767px)"
        );


    /* WIDE SCREEN ONLY — same breakpoint/reference logic as approved section */
    const wideScreenLayout =
        window.matchMedia(
            "(min-width: 1520px)"
        );


    const shell =
        section.querySelector(
            ".talents-sticky-shell"
        );


    const stage =
        section.querySelector(
            ".talents-stage"
        );


    const transition =
        section.querySelector(
            ".talents-transition"
        );


    const rosterSwitchButtons =
        Array.from(
            section.querySelectorAll(
                ".talents-roster-switch-button"
            )
        );


    const rosterSwitchSquares =
        Array.from(
            section.querySelectorAll(
                ".talents-roster-switch-square"
            )
        );


    const rosterSwitchLines =
        Array.from(
            section.querySelectorAll(
                ".talents-roster-switch-line"
            )
        );


    const taxonomyList =
        section.querySelector(
            ".talents-transition-taxonomy-list"
        );


    const heading =
        section.querySelector(
            ".talents-heading"
        );


    const headingTitle =
        section.querySelector(
            ".talents-heading-title"
        );


    const headingLine =
        section.querySelector(
            ".talents-heading-line"
        );


    const headingViewAll =
        section.querySelector(
            ".talents-heading-view-all"
        );


    const headingSquare =
        section.querySelector(
            ".talents-heading-square"
        );


    const roster =
        section.querySelector(
            ".talents-roster"
        );


    if (
        !shell ||
        !stage ||
        !transition ||
        !rosterSwitchButtons.length ||
        !rosterSwitchSquares.length ||
        !rosterSwitchLines.length ||
        !taxonomyList ||
        !heading ||
        !headingTitle ||
        !headingLine ||
        !headingViewAll ||
        !headingSquare ||
        !roster
    ) {

        return;

    }


    /* =====================================================
       HELPERS
    ===================================================== */

    const clamp = (
        value,
        min,
        max
    ) => {

        return Math.max(
            min,
            Math.min(
                max,
                value
            )
        );

    };


    const smooth = value => {

        value =
            clamp(
                value,
                0,
                1
            );


        return (
            value *
            value *
            (
                3 -
                2 * value
            )
        );

    };


    const phase = (
        progress,
        start,
        end
    ) => {

        return smooth(
            (
                progress -
                start
            ) /
            (
                end -
                start
            )
        );

    };


    function cssNumber(name) {

        return (
            parseFloat(
                getComputedStyle(section)
                    .getPropertyValue(name)
            ) ||
            0
        );

    }


    function cssPixels(name) {

        const value =
            getComputedStyle(section)
                .getPropertyValue(name)
                .trim();


        if (
            value.endsWith("vh")
        ) {

            return (
                parseFloat(value) *
                window.innerHeight /
                100
            );

        }


        return (
            parseFloat(value) ||
            0
        );

    }


    /* =====================================================
       MEASUREMENTS
    ===================================================== */

    let stickyStart = 0;
    let stickyDistance = 1;

    let switchSquareSize = 7;
    let switchSquareSideGap = 8;
    let switchEntryStagger = 0.025;
    let switchLabelWidths = [];
    let switchFinalLineWidths = [];
    let switchSquareStartYs = [];
    let switchSquareFinalYs = [];

    let headingTitleWidth = 0;
    let headingViewAllWidth = 0;
    let headingWidth = 0;
    let headingSquareSize = 7;
    let headingSideGap = 8;
    let lineTitleGap = 8;
    let lineSquareGap = 8;

    let rosterInitialOffset = 0;
    let headingLineStickyStartProgress = null;


    /* =====================================================
       MEASURE
    ===================================================== */

    function measure() {

        const scrollY =
            window.scrollY ||
            window.pageYOffset;


        stickyStart =
            shell
                .getBoundingClientRect()
                .top +
            scrollY;


        stickyDistance =
            Math.max(
                1,
                cssPixels(
                    "--talents-sticky-distance"
                )
            );


        switchSquareSize =
            cssNumber(
                "--talents-switch-square-size"
            ) ||
            7;


        switchSquareSideGap =
            cssNumber(
                "--talents-switch-square-side-gap"
            ) ||
            8;


        switchEntryStagger =
            Math.max(
                0,
                cssNumber(
                    "--talents-switch-entry-stagger"
                )
            );


        switchLabelWidths =
            rosterSwitchButtons.map(
                button =>
                    button.querySelector(
                        ".talents-roster-switch-label"
                    ).offsetWidth
            );


        switchFinalLineWidths =
            switchLabelWidths.map(
                labelWidth =>
                    labelWidth +
                    switchSquareSideGap +
                    switchSquareSize
            );


        /*
         * TRUE VERTICAL GEOMETRY FOR WOMEN / MEN / NEW FACE
         *
         * IMPORTANT:
         * the square is positioned relative to .talents-roster-switch-top,
         * NOT relative to the whole button.
         *
         * So we measure the square's REAL neutral browser position first,
         * then calculate the exact translateY required.
         *
         * START:
         * the TOP edge of each square sits exactly on the TOP edge
         * of the 0.5px line.
         *
         * FINAL:
         * the CENTER of each square sits exactly on the CENTER
         * of its label row.
         */
        rosterSwitchSquares.forEach(
            square => {

                square.style.transform =
                    "translate3d(0,0,0) translateY(-50%)";

            }
        );


        switchSquareStartYs =
            rosterSwitchButtons.map(
                button => {

                    const square =
                        button.querySelector(
                            ".talents-roster-switch-square"
                        );


                    const line =
                        button.querySelector(
                            ".talents-roster-switch-line"
                        );


                    if (
                        !square ||
                        !line
                    ) {

                        return 0;

                    }


                    const squareRect =
                        square.getBoundingClientRect();


                    const lineRect =
                        line.getBoundingClientRect();


                    /*
                     * Exact requirement:
                     * square TOP === line TOP
                     */
                    return (
                        lineRect.top -
                        squareRect.top
                    );

                }
            );


        switchSquareFinalYs =
            rosterSwitchButtons.map(
                button => {

                    const square =
                        button.querySelector(
                            ".talents-roster-switch-square"
                        );


                    const label =
                        button.querySelector(
                            ".talents-roster-switch-label"
                        );


                    if (
                        !square ||
                        !label
                    ) {

                        return 0;

                    }


                    const squareRect =
                        square.getBoundingClientRect();


                    const labelRect =
                        label.getBoundingClientRect();


                    const squareCenterY =
                        squareRect.top +
                        (
                            squareRect.height /
                            2
                        );


                    const labelCenterY =
                        labelRect.top +
                        (
                            labelRect.height /
                            2
                        );


                    return (
                        labelCenterY -
                        squareCenterY
                    );

                }
            );


        /*
         * Make the ENTIRE visual button a real clickable / hoverable area.
         * Absolute-positioned line + square do not normally enlarge a button,
         * so without this the space between the word and square becomes dead.
         * We also include the extra 8px HERO hover travel.
         */
        rosterSwitchButtons.forEach(
            (button, index) => {

                const hitWidth =
                    switchFinalLineWidths[index] +
                    8;

                button.style.setProperty(
                    "--talents-switch-hit-width",
                    hitWidth + "px"
                );

            }
        );


        headingTitleWidth =
            headingTitle.offsetWidth;


        headingViewAllWidth =
            headingViewAll.offsetWidth;


        headingWidth =
            heading.offsetWidth;


        headingSquareSize =
            cssNumber(
                "--talents-heading-square-size"
            ) ||
            7;


        headingSideGap =
            cssNumber(
                "--talents-heading-square-side-gap"
            );


        lineTitleGap =
            cssNumber(
                "--talents-heading-line-title-gap"
            );


        lineSquareGap =
            cssNumber(
                "--talents-heading-line-square-gap"
            );


        /* Reset live transforms before measuring the natural flow. */
        transition.style.transform =
            "translate3d(0,0,0)";


        taxonomyList.style.transform =
            "translate3d(0,0,0)";


        roster.style.transform =
            "translate3d(0,0,0)";


        const stageRect =
            stage.getBoundingClientRect();


        const taxonomyRect =
            taxonomyList.getBoundingClientRect();


        const transitionRosterGap =
            cssNumber(
                "--talents-transition-roster-gap"
            );


        /*
         * TALENTS heading belongs to the same sticky text block.
         * Only the roster keeps its own natural travel below the text.
         */
        rosterInitialOffset =
            Math.max(
                0,
                taxonomyRect.bottom +
                transitionRosterGap -
                (
                    stageRect.top +
                    roster.offsetTop
                )
            );


        headingLineStickyStartProgress =
            null;


        updateScroll();

    }


    /* =====================================================
       SCROLL UPDATE
    ===================================================== */

    function updateScroll() {

        const scrollY =
            window.scrollY ||
            window.pageYOffset;


        const viewportHeight =
            window.innerHeight;


        const stageRect =
            stage.getBoundingClientRect();


        const stickyProgress =
            clamp(
                (
                    scrollY -
                    stickyStart
                ) /
                stickyDistance,
                0,
                1
            );


        /* =================================================
           MOBILE ONLY — ONE 100VH STICKY COMPOSITION

           - ALL TEXT + ROSTER ARE ALREADY INSIDE THE SAME 100VH.
           - THE WHOLE STAGE PINS.
           - CURRENT ROSTER / TALENTS LINE OPENS DURING THE PIN.
           - AT THE END THE WHOLE STAGE RELEASES.
           - REVERSE SCROLL USES THE SAME EQUATION IN REVERSE.
           - DESKTOP NEVER ENTERS THIS BRANCH.
        ================================================= */

        if (mobileLayout.matches) {

            const shellRect =
                shell.getBoundingClientRect();


            const mobileStageHeight =
                window.innerHeight;


            const mobileStickyTravel =
                Math.max(
                    1,
                    shell.offsetHeight - mobileStageHeight
                );


            const mobileProgress =
                clamp(
                    -shellRect.top / mobileStickyTravel,
                    0,
                    1
                );


            let mobileStageY = 0;


            if (shellRect.top > 0) {

                mobileStageY =
                    shellRect.top;

            }
            else if (shellRect.bottom < mobileStageHeight) {

                mobileStageY =
                    shellRect.bottom - mobileStageHeight;

            }


            stage.classList.add(
                "talents-mobile-pin-engine"
            );


            stage.style.transform =
                "translate3d(0," +
                mobileStageY.toFixed(2) +
                "px,0)";


            /* Mobile text and roster are static inside the pinned stage. */
            transition.style.transform =
                "translate3d(0,0,0)";


            taxonomyList.style.transform =
                "translate3d(0,0,0)";


            roster.style.transform =
                "translate3d(0,0,0)";


            /* =================================================
               MOBILE ONLY — WOMEN / MEN / NEW FACE
               SAME BUILD MOTION AS DESKTOP
            ================================================= */

            function mobileSwitchProgressFor(index) {

                /*
                 * MOBILE ONLY — SAME ENTRY LOGIC AS DESKTOP:
                 * animation is driven by the button block's REAL position
                 * inside the viewport while the section is still entering.
                 *
                 * It starts BEFORE the composition reaches its final pinned
                 * position, while the buttons are around the middle/lower
                 * part of the screen, and finishes before the sticky-phase
                 * upper heading line becomes the focus.
                 *
                 * TIMING ONLY — no dimensions or positions are changed.
                 */
                const switchWrap =
                    section.querySelector(
                        ".talents-transition-switch-wrap"
                    );


                const switchRect =
                    switchWrap
                        ? switchWrap.getBoundingClientRect()
                        : { top: viewportHeight };


                const mobileSwitchStartY =
                    viewportHeight * 0.70;


                const mobileSwitchEndY =
                    viewportHeight * 0.50;


                const mobileSwitchRawProgress =
                    (
                        mobileSwitchStartY -
                        switchRect.top
                    ) /
                    (
                        mobileSwitchStartY -
                        mobileSwitchEndY
                    );


                const delay =
                    switchEntryStagger *
                    index;


                return clamp(
                    mobileSwitchRawProgress -
                    delay,
                    0,
                    1
                );

            }


            rosterSwitchSquares.forEach(
                (square, index) => {

                    const buttonProgress =
                        mobileSwitchProgressFor(index);


                    const squareUnderTravelProgress =
                        phase(
                            buttonProgress,
                            0.00,
                            0.58
                        );


                    const squareRiseProgress =
                        phase(
                            buttonProgress,
                            0.58,
                            0.86
                        );


                    const labelWidth =
                        switchLabelWidths[index] ||
                        0;


                    const finalSquareX =
                        labelWidth +
                        switchSquareSideGap;


                    const squareX =
                        finalSquareX *
                        squareUnderTravelProgress;


                    const squareStartY =
                        switchSquareStartYs[index] ||
                        0;


                    const squareFinalY =
                        switchSquareFinalYs[index] ||
                        0;


                    const squareY =
                        squareStartY +
                        (
                            squareFinalY -
                            squareStartY
                        ) *
                        squareRiseProgress;


                    square.style.transform =
                        "translate3d(" +
                        squareX.toFixed(2) +
                        "px," +
                        squareY.toFixed(2) +
                        "px,0) " +
                        "translateY(-50%)";

                }
            );


            rosterSwitchLines.forEach(
                (line, index) => {

                    const buttonProgress =
                        mobileSwitchProgressFor(index);


                    const squareUnderTravelProgress =
                        phase(
                            buttonProgress,
                            0.00,
                            0.58
                        );


                    const lineFinishProgress =
                        phase(
                            buttonProgress,
                            0.58,
                            1.00
                        );


                    const labelWidth =
                        switchLabelWidths[index] ||
                        0;


                    const finalWidth =
                        switchFinalLineWidths[index] ||
                        0;


                    const originalFirstPhaseWidth =
                        labelWidth *
                        squareUnderTravelProgress;


                    const gapAdjustedFirstPhaseWidth =
                        Math.max(
                            0,
                            originalFirstPhaseWidth -
                            switchSquareSideGap *
                            (
                                1 -
                                squareUnderTravelProgress
                            )
                        );


                    const remainingWidth =
                        Math.max(
                            0,
                            finalWidth - labelWidth
                        );


                    const currentWidth =
                        gapAdjustedFirstPhaseWidth +
                        remainingWidth *
                        lineFinishProgress;


                    line.style.width =
                        Math.max(
                            0,
                            currentWidth
                        ).toFixed(2) +
                        "px";

                }
            );


            /* CURRENT ROSTER -> TALENTS: the one line that opens during sticky. */
            const buttonGap =
                headingSideGap;


            const lineStart =
                headingTitleWidth +
                lineTitleGap;


            const initialLineWidth =
                Math.max(
                    0,
                    cssNumber(
                        "--talents-heading-line-initial-width"
                    )
                );


            const finalSquareLeft =
                headingWidth -
                headingSquareSize;


            const finalButtonX =
                finalSquareLeft -
                buttonGap -
                headingViewAllWidth;


            const finalLineEnd =
                finalButtonX -
                lineSquareGap;


            const maxLineWidth =
                Math.max(
                    initialLineWidth,
                    finalLineEnd - lineStart
                );


            const buildProgress =
                phase(
                    mobileProgress,
                    0.00,
                    1.00
                );


            const currentLineWidth =
                initialLineWidth +
                (
                    maxLineWidth -
                    initialLineWidth
                ) *
                buildProgress;


            const buttonX =
                lineStart +
                currentLineWidth +
                lineSquareGap;


            headingTitle.style.transform =
                "translate3d(0,0,0)";


            headingLine.style.left =
                lineStart +
                "px";


            headingLine.style.width =
                currentLineWidth +
                "px";


            headingViewAll.style.transform =
                "translate3d(" +
                Math.min(
                    finalButtonX,
                    buttonX
                ).toFixed(2) +
                "px,0,0)";


            const squareX =
                Math.min(
                    finalSquareLeft,
                    buttonX +
                    headingViewAllWidth +
                    buttonGap
                );


            headingSquare.style.left =
                squareX.toFixed(2) +
                "px";


            return;

        }


        /* If viewport changed back to desktop, remove only the mobile pin class. */
        stage.classList.remove(
            "talents-mobile-pin-engine"
        );


        stage.style.transform =
            "";


        /* =================================================
           TRANSITION — NATURAL ENTRY, THEN VIEWPORT STOP
        ================================================= */

        const transitionBaseTop =
            transition.offsetTop;


        const transitionStopTop =
            cssNumber(
                "--talents-transition-stop-top"
            );


        let transitionPinY = 0;


        if (
            stageRect.top > 0
        ) {

            const naturalTransitionTop =
                stageRect.top +
                transitionBaseTop;


            transitionPinY =
                Math.max(
                    0,
                    transitionStopTop -
                    naturalTransitionTop
                );

        }

        else {

            transitionPinY =
                Math.max(
                    0,
                    transitionStopTop -
                    transitionBaseTop
                );

        }


        transition.style.transform =
            "translate3d(0," +
            transitionPinY.toFixed(2) +
            "px,0)";


        /* =================================================
           WOMEN / MEN — ENTRY MOTION
           LINE STARTS SHORT, SQUARE STARTS BELOW,
           SQUARE RISES, LINE CONTINUES TO FULL WIDTH
        ================================================= */

        const transitionRect =
            transition.getBoundingClientRect();


        const transitionStart =
            viewportHeight *
            (
                cssNumber(
                    "--talents-transition-motion-start-vh"
                ) /
                100
            );


        const transitionEnd =
            viewportHeight *
            (
                cssNumber(
                    "--talents-transition-motion-end-vh"
                ) /
                100
            );


        const transitionRawProgress =
            (
                transitionStart -
                transitionRect.top
            ) /
            (
                transitionStart -
                transitionEnd
            );


        const transitionProgress =
            clamp(
                transitionRawProgress,
                0,
                1
            );


        /*
         * BUTTON BUILD — EXACT ORDER:
         * 01. nothing is drawn at the start; square sits below-left.
         * 02. square travels horizontally underneath while the line grows behind it.
         * 03. square rises to text height while the line keeps extending to its final end.
         */
        /*
         * VERY SMALL STAGGER BETWEEN THE THREE BUTTONS.
         * WOMEN begins first, MEN a touch later, NEW FACE a touch after MEN.
         * Each button still uses the exact same motion curve.
         */
        function switchProgressFor(index) {

            const delay =
                switchEntryStagger *
                index;


            /*
             * REAL STAGGER:
             * do NOT compress the later buttons back into the same end point.
             * Every button keeps the exact same 0→1 motion duration;
             * MEN simply begins after WOMEN, and NEW FACE after MEN.
             */
            return clamp(
                transitionRawProgress -
                delay,
                0,
                1
            );

        }


        rosterSwitchSquares.forEach(
            (square, index) => {

                const buttonProgress =
                    switchProgressFor(index);


                const squareUnderTravelProgress =
                    phase(
                        buttonProgress,
                        0.00,
                        0.58
                    );


                const squareRiseProgress =
                    phase(
                        buttonProgress,
                        0.58,
                        0.86
                    );


                const labelWidth =
                    switchLabelWidths[index] ||
                    0;


                const finalSquareX =
                    labelWidth +
                    switchSquareSideGap;


                const squareX =
                    finalSquareX *
                    squareUnderTravelProgress;


                const squareStartY =
                    switchSquareStartYs[index] ||
                    0;


                const squareFinalY =
                    switchSquareFinalYs[index] ||
                    0;


                const squareY =
                    squareStartY +
                    (
                        squareFinalY -
                        squareStartY
                    ) *
                    squareRiseProgress;


                square.style.transform =
                    "translate3d(" +
                    squareX.toFixed(2) +
                    "px," +
                    squareY.toFixed(2) +
                    "px,0) " +
                    "translateY(-50%)";

            }
        );


        rosterSwitchLines.forEach(
            (line, index) => {

                const buttonProgress =
                    switchProgressFor(index);


                const squareUnderTravelProgress =
                    phase(
                        buttonProgress,
                        0.00,
                        0.58
                    );


                const lineFinishProgress =
                    phase(
                        buttonProgress,
                        0.58,
                        1.00
                    );


                const labelWidth =
                    switchLabelWidths[index] ||
                    0;


                const finalWidth =
                    switchFinalLineWidths[index] ||
                    0;


                /*
                 * ORIGINAL FULL OPENING IS PRESERVED.
                 *
                 * The ONLY change:
                 * while the square begins travelling from the left,
                 * the line starts only after there is enough room to
                 * keep the requested 8px gap.
                 *
                 * Once that tiny initial gap phase is passed, the line
                 * continues with the exact original calculation and
                 * therefore still reaches the exact original final width.
                 */
                const originalFirstPhaseWidth =
                    labelWidth *
                    squareUnderTravelProgress;


                const gapAdjustedFirstPhaseWidth =
                    Math.max(
                        0,
                        originalFirstPhaseWidth -
                        switchSquareSideGap *
                        (
                            1 -
                            squareUnderTravelProgress
                        )
                    );


                /* After the square begins rising, the line keeps opening
                   exactly as in the original code. */
                const remainingWidth =
                    Math.max(
                        0,
                        finalWidth - labelWidth
                    );


                const currentWidth =
                    gapAdjustedFirstPhaseWidth +
                    remainingWidth *
                    lineFinishProgress;


                line.style.width =
                    Math.max(
                        0,
                        currentWidth
                    ).toFixed(2) +
                    "px";

            }
        );


        /* =================================================
           TAXONOMY ROW — NORMAL FLOW UNDER THE PARAGRAPH
        ================================================= */

        taxonomyList.style.transform =
            "translate3d(0,0,0)";


        /* =================================================
           TALENTS HEADING IS PART OF THE SAME STICKY TEXT BLOCK.
           ONLY THE ROSTER KEEPS ITS OWN VERTICAL TRAVEL.
        ================================================= */

        const rosterFlowTravel =
            stickyProgress *
            stickyDistance;


        const rosterOffset =
            Math.max(
                0,
                rosterInitialOffset -
                rosterFlowTravel
            );


        roster.style.transform =
            "translate3d(0," +
            rosterOffset.toFixed(2) +
            "px,0)";


        /* =================================================
           TALENTS + LINE + VIEW ALL
           SAME HORIZONTAL OPENING, NOW INSIDE THE TEXT BLOCK
        ================================================= */

        const buttonGap =
            headingSideGap;


        const lineStart =
            headingTitleWidth +
            lineTitleGap;


        const initialLineWidth =
            Math.max(
                0,
                cssNumber(
                    "--talents-heading-line-initial-width"
                )
            );


        const finalSquareLeft =
            wideScreenLayout.matches
                ? Math.max(
                    0,
                    document.documentElement.clientWidth -
                    heading.getBoundingClientRect().left -
                    20 -
                    headingSquareSize
                )
                : headingWidth -
                  headingSquareSize;


        const finalButtonX =
            finalSquareLeft -
            buttonGap -
            headingViewAllWidth;


        const finalLineEnd =
            finalButtonX -
            lineSquareGap;


        const maxLineWidth =
            Math.max(
                initialLineWidth,
                finalLineEnd -
                lineStart
            );


        const viewAllStartX =
            lineStart +
            initialLineWidth +
            lineSquareGap;


        if (
            headingLineStickyStartProgress === null &&
            stickyProgress > 0
        ) {

            headingLineStickyStartProgress =
                stickyProgress;

        }


        const buildProgress =
            headingLineStickyStartProgress === null
                ?
                0
                :
                (
                    headingLineStickyStartProgress >= 0.999999
                        ?
                        1
                        :
                        phase(
                            stickyProgress,
                            headingLineStickyStartProgress,
                            1.00
                        )
                );


        const currentLineWidth =
            initialLineWidth +
            (
                maxLineWidth -
                initialLineWidth
            ) *
            buildProgress;


        const currentLineEnd =
            lineStart +
            currentLineWidth;


        const pushedButtonX =
            currentLineEnd +
            lineSquareGap;


        const buttonX =
            Math.min(
                finalButtonX,
                Math.max(
                    viewAllStartX,
                    pushedButtonX
                )
            );


        headingTitle.style.transform =
            "translate3d(0,0,0)";


        headingLine.style.left =
            lineStart +
            "px";


        headingLine.style.width =
            currentLineWidth +
            "px";


        headingViewAll.style.transform =
            "translate3d(" +
            buttonX.toFixed(2) +
            "px,0,0)";


        const squareX =
            buttonX +
            headingViewAllWidth +
            buttonGap;


        /* =================================================
           VIEW ALL SQUARE — ALWAYS 8PX AFTER VIEW ALL
           AND MOVES WITH THE WHOLE OPENING GROUP
        ================================================= */

        headingSquare.style.left =
            Math.min(
                finalSquareLeft,
                squareX
            ).toFixed(2) +
            "px";

    }


    /* =====================================================
       SCROLL RAF
    ===================================================== */

    let ticking =
        false;


    window.addEventListener(
        "scroll",
        function () {

            if (ticking) {
                return;
            }


            ticking =
                true;


            requestAnimationFrame(
                function () {

                    updateScroll();

                    ticking =
                        false;

                }
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            requestAnimationFrame(
                measure
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       START
    ===================================================== */

    requestAnimationFrame(
        measure
    );


})();;
/* =========================================================
   TALENTS ROSTER — ROW ROLL HOVER
========================================================= */

(function () {

    const section =
        document.querySelector(
            ".talents"
        );


    if (!section) {
        return;
    }


    const rows =
        Array.from(
            section.querySelectorAll(
                ".talents-roster-row"
            )
        );


    if (!rows.length) {
        return;
    }


    rows.forEach(row => {

        if (
            row.querySelector(
                ".talents-roster-roll-face"
            )
        ) {
            return;
        }


        const originalChildren =
            Array.from(
                row.children
            );


        const front =
            document.createElement(
                "span"
            );


        front.className =
            "talents-roster-roll-face talents-roster-roll-face--front";


        originalChildren.forEach(child => {
            front.appendChild(child);
        });


        const back =
            front.cloneNode(true);


        back.className =
            "talents-roster-roll-face talents-roster-roll-face--back";


        back.setAttribute(
            "aria-hidden",
            "true"
        );


        row.appendChild(front);
        row.appendChild(back);

    });


})();;
/* =========================================================
   TALENTS ROSTER — HOVER IMAGE
========================================================= */

(function () {

    const section =
        document.querySelector(
            ".talents"
        );


    if (!section) {
        return;
    }


    const mobileLayout =
        window.matchMedia(
            "(max-width: 767px)"
        );


    /* TABLET ONLY — interaction mode for roster preview.
       Separate from mobile and separate from desktop/wide. */
    const tabletInteraction =
        window.matchMedia(
            "(min-width: 768px) and (max-width: 1024px)"
        );


    /* WIDE SCREEN ONLY — laptop / normal desktop stay on the original path. */
    const wideScreenLayout =
        window.matchMedia(
            "(min-width: 1500px)"
        );


    const rows =
        Array.from(
            section.querySelectorAll(
                ".talents-roster-row"
            )
        );


    const preview =
        section.querySelector(
            ".talents-roster-preview"
        );


    const roster =
        section.querySelector(
            ".talents-roster"
        );


    if (
        !rows.length ||
        !preview ||
        !roster
    ) {
        return;
    }


    const previewImage =
        preview.querySelector(
            "img"
        );


    if (!previewImage) {
        return;
    }


    /* =====================================================
       POSITION
    ===================================================== */

    let currentX = 0;
    let currentY = 0;

    let targetX = 0;
    let targetY = 0;

    let pointerX = 0;
    let pointerY = 0;
    let hasPointer = false;

    /* ACCESSIBILITY — desktop keyboard preview state only. */
    let keyboardFocusedRow = null;


    /*
     * Normal state:
     * preview behaves exactly as before.
     *
     * While leaving the section:
     * the rising bottom edge of .talents becomes the new
     * lower boundary, so the preview moves upward instead
     * of being covered / cut by the next section.
     */
    function updatePreviewTarget() {

        /*
         * When a roster row has keyboard focus, the preview belongs to
         * that row — not to the last mouse position.
         */
        if (keyboardFocusedRow) {
            return;
        }


        if (!hasPointer) {
            return;
        }


        const previewWidth =
            preview.offsetWidth;


        const previewHeight =
            preview.offsetHeight;


        targetX =
            pointerX +
            24;


        targetY =
            pointerY -
            (
                previewHeight /
                2
            );


        targetX =
            Math.min(
                window.innerWidth -
                    previewWidth -
                    20,
                targetX
            );


        const sectionRect =
            section.getBoundingClientRect();


        /*
         * As long as the section continues below the viewport,
         * this is exactly the old viewport-bottom limit.
         *
         * Only when the section bottom enters the viewport
         * does the available bottom edge move upward with it.
         */
        const availableBottom =
            Math.min(
                window.innerHeight - 20,
                sectionRect.bottom - 20
            );


        const maxTargetY =
            availableBottom -
            previewHeight;


        targetY =
            Math.max(
                20,
                Math.min(
                    maxTargetY,
                    targetY
                )
            );

    }


    /* =====================================================
       WIDE SCREEN ONLY — KEEP HOVER IN SYNC WHILE SCROLLING
       Some desktop/browser combinations do not fire a new
       mouseenter/mouseleave when the page moves under a
       completely still pointer. On wide screens only, use
       the stored pointer position to ask which roster row is
       physically underneath it right now.
    ===================================================== */

    function syncWideScreenHoverFromPointer() {

        if (
            mobileLayout.matches ||
            !wideScreenLayout.matches ||
            !hasPointer ||
            keyboardFocusedRow
        ) {
            return;
        }


        const elementUnderPointer =
            document.elementFromPoint(
                pointerX,
                pointerY
            );


        const rowUnderPointer =
            elementUnderPointer
                ? elementUnderPointer.closest(
                    ".talents-roster-row"
                )
                : null;


        const activeRowUnderPointer =
            rowUnderPointer &&
            section.contains(rowUnderPointer) &&
            rowUnderPointer.closest(
                ".talents-roster-list.is-active"
            );


        /* Wide screen only:
           keep the pink visual hover state synchronized with
           the exact same row that controls the preview image. */
        rows.forEach(
            function (row) {
                row.classList.remove(
                    "is-wide-hover"
                );
            }
        );


        if (!activeRowUnderPointer) {

            preview.classList.remove(
                "is-visible"
            );

            return;
        }


        rowUnderPointer.classList.add(
            "is-wide-hover"
        );


        const image =
            rowUnderPointer.dataset.image;


        if (!image) {

            preview.classList.remove(
                "is-visible"
            );

            return;
        }


        if (previewImage.src !== image) {
            previewImage.src = image;
        }


        preview.classList.add(
            "is-visible"
        );

    }


    function animate() {

        if (mobileLayout.matches) {

            requestAnimationFrame(
                animate
            );

            return;

        }


        if (tabletInteraction.matches) {

            requestAnimationFrame(
                animate
            );

            return;

        }


        /*
         * Wide screens: keep the hovered roster row synchronized
         * with the stationary pointer while the page scrolls.
         * Laptop / normal desktop never enter this branch.
         */
        syncWideScreenHoverFromPointer();


        /*
         * Keyboard focus: keep the preview centered on the focused row.
         * Mouse focus: keep the original pointer-following behavior.
         */
        if (keyboardFocusedRow) {

            const focusedRect =
                keyboardFocusedRow.getBoundingClientRect();

            const previewWidth =
                preview.offsetWidth;

            const previewHeight =
                preview.offsetHeight;


            targetX =
                focusedRect.left +
                (
                    focusedRect.width /
                    2
                ) -
                (
                    previewWidth /
                    2
                );


            targetY =
                focusedRect.top +
                (
                    focusedRect.height /
                    2
                ) -
                (
                    previewHeight /
                    2
                );


            targetX =
                Math.max(
                    20,
                    Math.min(
                        window.innerWidth -
                            previewWidth -
                            20,
                        targetX
                    )
                );


            const maxKeyboardTargetY =
                Math.max(
                    20,
                    window.innerHeight -
                        previewHeight -
                        20
                );


            targetY =
                Math.max(
                    20,
                    Math.min(
                        maxKeyboardTargetY,
                        targetY
                    )
                );

        } else {

            /*
             * Original mouse behavior.
             */
            updatePreviewTarget();

        }


        currentX +=
            (
                targetX -
                currentX
            ) *
            0.16;


        currentY +=
            (
                targetY -
                currentY
            ) *
            0.16;


        preview.style.transform =
            "translate3d(" +
            currentX.toFixed(2) +
            "px," +
            currentY.toFixed(2) +
            "px,0)";


        requestAnimationFrame(
            animate
        );

    }


    document.addEventListener(
        "mousemove",
        function (event) {

            if (mobileLayout.matches) {
                return;
            }

            if (tabletInteraction.matches) {
                return;
            }


            pointerX =
                event.clientX;


            pointerY =
                event.clientY;


            hasPointer =
                true;


            updatePreviewTarget();

        },
        {
            passive: true
        }
    );


    /* =====================================================
       ACCESSIBILITY — KEYBOARD ENTRY INTO TALENTS

       Native Tab scrolling only exposes the newly focused control.
       In this 100vh sticky composition that can leave half of the
       previous section visible.

       When keyboard focus ENTERS Talents from outside the section,
       align the Talents section to the viewport so the whole 100vh
       composition is visible. Tabbing between controls already inside
       Talents does not trigger another jump.
    ===================================================== */

    section.addEventListener(
        "focusin",
        function (event) {

            if (mobileLayout.matches) {
                return;
            }


            const previous =
                event.relatedTarget;


            if (
                previous &&
                section.contains(previous)
            ) {
                return;
            }


            const target =
                event.target;


            if (
                !target ||
                !target.matches(
                    ".talents-roster-switch-button, .talents-roster-row"
                )
            ) {
                return;
            }


            const sectionTop =
                window.scrollY +
                section.getBoundingClientRect().top;


            window.scrollTo(
                0,
                Math.max(
                    0,
                    sectionTop
                )
            );


            window.requestAnimationFrame(
                function () {

                    try {

                        target.focus({
                            preventScroll: true
                        });

                    } catch (error) {

                        target.focus();

                    }

                }
            );

        }
    );


    /* =====================================================
       ROW HOVER
    ===================================================== */

    rows.forEach(row => {

        row.addEventListener(
            "mouseenter",
            function () {

                if (mobileLayout.matches) {
                    return;
                }

                if (tabletInteraction.matches) {
                    return;
                }


                const image =
                    row.dataset.image;


                if (!image) {
                    return;
                }


                previewImage.src =
                    image;


                preview.classList.add(
                    "is-visible"
                );

            }
        );


        row.addEventListener(
            "mouseleave",
            function () {

                if (mobileLayout.matches) {
                    return;
                }

                if (tabletInteraction.matches) {
                    return;
                }


                preview.classList.remove(
                    "is-visible"
                );

            }
        );


        /* =================================================
           KEYBOARD FOCUS — DESKTOP / WIDE SCREEN ONLY

           Tab focus gets the same roster image preview as mouse hover.
           Mobile tap behavior below remains unchanged.
        ================================================= */

        row.addEventListener(
            "focus",
            function () {

                if (mobileLayout.matches) {
                    return;
                }

                if (tabletInteraction.matches) {
                    return;
                }


                const image =
                    row.dataset.image;


                if (!image) {
                    return;
                }


                keyboardFocusedRow =
                    row;


                previewImage.src =
                    image;


                const rowRect =
                    row.getBoundingClientRect();


                const previewWidth =
                    preview.offsetWidth;


                const previewHeight =
                    preview.offsetHeight;


                /*
                 * KEYBOARD PREVIEW:
                 * center the image on the focused roster row itself.
                 * It does NOT follow the mouse and it is NOT pushed upward
                 * by the sticky-section boundary.
                 */
                targetX =
                    rowRect.left +
                    (
                        rowRect.width /
                        2
                    ) -
                    (
                        previewWidth /
                        2
                    );


                targetY =
                    rowRect.top +
                    (
                        rowRect.height /
                        2
                    ) -
                    (
                        previewHeight /
                        2
                    );


                /*
                 * Keep the keyboard preview safely inside the viewport.
                 * It remains centered on the focused row whenever there is room.
                 * Only rows near the top/bottom are nudged inward enough to keep
                 * the whole image visible.
                 */
                targetX =
                    Math.max(
                        20,
                        Math.min(
                            window.innerWidth -
                                previewWidth -
                                20,
                            targetX
                        )
                    );


                const maxKeyboardTargetY =
                    Math.max(
                        20,
                        window.innerHeight -
                            previewHeight -
                            20
                    );


                targetY =
                    Math.max(
                        20,
                        Math.min(
                            maxKeyboardTargetY,
                            targetY
                        )
                    );


                /*
                 * Open immediately at the calculated keyboard target.
                 * The existing animation loop continues to own transform.
                 */
                currentX =
                    targetX;

                currentY =
                    targetY;


                preview.style.transform =
                    "translate3d(" +
                    currentX.toFixed(2) +
                    "px," +
                    currentY.toFixed(2) +
                    "px,0)";


                preview.classList.add(
                    "is-visible"
                );

            }
        );


        row.addEventListener(
            "blur",
            function () {

                if (mobileLayout.matches) {
                    return;
                }

                if (tabletInteraction.matches) {
                    return;
                }


                if (
                    keyboardFocusedRow ===
                    row
                ) {
                    keyboardFocusedRow =
                        null;
                }


                preview.classList.remove(
                    "is-visible"
                );

            }
        );


        row.addEventListener(
            "click",
            function (event) {

                if (
                    row.getAttribute("href") ===
                    "#"
                ) {

                    event.preventDefault();

                }


                if (!mobileLayout.matches) {
                    return;
                }


                const image =
                    row.dataset.image;


                if (!image) {
                    return;
                }


                const sameImageOpen =
                    preview.classList.contains(
                        "is-visible"
                    ) &&
                    previewImage.src === image;


                if (sameImageOpen) {

                    preview.classList.remove(
                        "is-visible"
                    );

                    row.classList.remove(
                        "is-mobile-active"
                    );

                    return;

                }


                section.querySelectorAll(
                    ".talents-roster-row.is-mobile-active"
                ).forEach(
                    function (activeRow) {

                        activeRow.classList.remove(
                            "is-mobile-active"
                        );

                    }
                );


                row.classList.add(
                    "is-mobile-active"
                );


                previewImage.src = image;


                /*
                 * MOBILE ONLY — CENTER THE IMAGE INSIDE THE ROSTER,
                 * NOT INSIDE THE WHOLE SECTION / VIEWPORT.
                 */
                const rosterRect =
                    roster.getBoundingClientRect();


                const rosterCenterY =
                    rosterRect.top +
                    (
                        rosterRect.height /
                        2
                    );


                preview.style.left = "50%";
                preview.style.top =
                    rosterCenterY.toFixed(2) +
                    "px";
                preview.style.transform =
                    "translate3d(-50%,-50%,0)";

                preview.classList.add(
                    "is-visible"
                );

            }
        );


        /* TABLET ONLY — TAP/CLICK OPENS ROSTER IMAGE */
        row.addEventListener(
            "click",
            function () {

                if (!tabletInteraction.matches) {
                    return;
                }


                const image =
                    row.dataset.image;


                if (!image) {
                    return;
                }


                const sameImageOpen =
                    preview.classList.contains(
                        "is-visible"
                    ) &&
                    previewImage.src === image;


                if (sameImageOpen) {

                    preview.classList.remove(
                        "is-visible"
                    );

                    row.classList.remove(
                        "is-tablet-active"
                    );

                    return;

                }


                section.querySelectorAll(
                    ".talents-roster-row.is-tablet-active"
                ).forEach(
                    function (activeRow) {

                        activeRow.classList.remove(
                            "is-tablet-active"
                        );

                    }
                );


                row.classList.add(
                    "is-tablet-active"
                );


                previewImage.src = image;


                const rosterRect =
                    roster.getBoundingClientRect();


                const rosterCenterY =
                    rosterRect.top +
                    (
                        rosterRect.height /
                        2
                    );


                preview.style.left = "50%";
                preview.style.top =
                    rosterCenterY.toFixed(2) +
                    "px";
                preview.style.transform =
                    "translate3d(-50%,-50%,0)";


                preview.classList.add(
                    "is-visible"
                );

            }
        );

    });


    document.addEventListener(
        "click",
        function (event) {

            if (!mobileLayout.matches) {
                return;
            }


            if (
                event.target.closest(
                    ".talents-roster-row"
                ) ||
                event.target.closest(
                    ".talents-roster-preview"
                )
            ) {

                return;

            }


            preview.classList.remove(
                "is-visible"
            );


            section.querySelectorAll(
                ".talents-roster-row.is-mobile-active"
            ).forEach(
                function (activeRow) {

                    activeRow.classList.remove(
                        "is-mobile-active"
                    );

                }
            );

        }
    );


    /* TABLET ONLY — close preview when tapping outside roster/preview */
    document.addEventListener(
        "click",
        function (event) {

            if (!tabletInteraction.matches) {
                return;
            }


            if (
                event.target.closest(
                    ".talents-roster-row"
                ) ||
                event.target.closest(
                    ".talents-roster-preview"
                )
            ) {

                return;

            }


            preview.classList.remove(
                "is-visible"
            );


            section.querySelectorAll(
                ".talents-roster-row.is-tablet-active"
            ).forEach(
                function (activeRow) {

                    activeRow.classList.remove(
                        "is-tablet-active"
                    );

                }
            );

        }
    );


    /* =====================================================
       START
    ===================================================== */

    requestAnimationFrame(
        animate
    );


})();;
/* =========================================================
   TALENTS ROSTER — WOMEN / MEN SWITCH
   ROW-BY-ROW OPACITY WAVE
========================================================= */

(function () {

    const section =
        document.querySelector(
            ".talents"
        );


    if (!section) {
        return;
    }


    const switchButtons =
        Array.from(
            section.querySelectorAll(
                "[data-roster-switch]"
            )
        );


    const rosterLists =
        Array.from(
            section.querySelectorAll(
                "[data-roster]"
            )
        );


    const preview =
        section.querySelector(
            ".talents-roster-preview"
        );


    if (
        !switchButtons.length ||
        !rosterLists.length
    ) {
        return;
    }


    const rowStagger = 58;
    const fadeDuration = 180;
    const incomingDelay = 95;

    let activeName =
        rosterLists.find(list =>
            list.classList.contains(
                "is-active"
            )
        )?.dataset.roster ||
        "women";

    let switchToken = 0;


    function clearRowTimers(list) {

        if (!list) return;

        const rows =
            Array.from(
                list.querySelectorAll(
                    ".talents-roster-row"
                )
            );

        rows.forEach(row => {

            if (row._rosterFadeTimer) {
                clearTimeout(
                    row._rosterFadeTimer
                );
            }

            row._rosterFadeTimer = null;

        });

    }


    function setButtonState(name) {

        switchButtons.forEach(button => {

            const isActive =
                button.dataset.rosterSwitch ===
                name;

            button.classList.toggle(
                "is-active",
                isActive
            );

            button.setAttribute(
                "aria-pressed",
                isActive
                    ? "true"
                    : "false"
            );

        });

    }


    function setRoster(name, immediate = false) {

        const nextList =
            rosterLists.find(list =>
                list.dataset.roster ===
                name
            );


        const currentList =
            rosterLists.find(list =>
                list.dataset.roster ===
                activeName
            );


        if (!nextList) {
            return;
        }


        if (
            name === activeName &&
            !immediate
        ) {

            setButtonState(name);
            return;

        }


        switchToken += 1;
        const token = switchToken;


        rosterLists.forEach(list => {
            clearRowTimers(list);
        });


        const nextRows =
            Array.from(
                nextList.querySelectorAll(
                    ".talents-roster-row"
                )
            );


        if (immediate || !currentList) {

            rosterLists.forEach(list => {

                const isActive =
                    list === nextList;

                list.classList.toggle(
                    "is-active",
                    isActive
                );

                list.setAttribute(
                    "aria-hidden",
                    isActive
                        ? "false"
                        : "true"
                );

                Array.from(
                    list.querySelectorAll(
                        ".talents-roster-row"
                    )
                ).forEach(row => {
                    row.style.opacity =
                        isActive
                            ? "1"
                            : "0";
                });

            });

            activeName = name;
            setButtonState(name);
            return;

        }


        const currentRows =
            Array.from(
                currentList.querySelectorAll(
                    ".talents-roster-row"
                )
            );


        nextList.classList.add(
            "is-active"
        );

        nextList.setAttribute(
            "aria-hidden",
            "false"
        );

        nextList.style.pointerEvents =
            "none";


        nextRows.forEach(row => {
            row.style.opacity = "0";
        });


        currentList.style.pointerEvents =
            "none";


        currentRows.forEach((row, index) => {

            row._rosterFadeTimer =
                setTimeout(() => {

                    if (token !== switchToken) {
                        return;
                    }

                    row.style.opacity = "0";

                }, index * rowStagger);

        });


        nextRows.forEach((row, index) => {

            row._rosterFadeTimer =
                setTimeout(() => {

                    if (token !== switchToken) {
                        return;
                    }

                    row.style.opacity = "1";

                },
                index * rowStagger +
                incomingDelay);

        });


        const lastIndex =
            Math.max(
                currentRows.length,
                nextRows.length
            ) - 1;


        const finishDelay =
            Math.max(0, lastIndex) *
            rowStagger +
            incomingDelay +
            fadeDuration +
            30;


        setTimeout(() => {

            if (token !== switchToken) {
                return;
            }

            rosterLists.forEach(list => {

                const isActive =
                    list === nextList;

                list.classList.toggle(
                    "is-active",
                    isActive
                );

                list.setAttribute(
                    "aria-hidden",
                    isActive
                        ? "false"
                        : "true"
                );

                list.style.pointerEvents = "";

                if (!isActive) {

                    Array.from(
                        list.querySelectorAll(
                            ".talents-roster-row"
                        )
                    ).forEach(row => {
                        row.style.opacity = "0";
                    });

                }

            });

            activeName = name;

        }, finishDelay);


        activeName = name;
        setButtonState(name);


        if (preview) {
            preview.classList.remove(
                "is-visible"
            );
        }

    }


    switchButtons.forEach(button => {

        /*
         * DESKTOP + WIDE SCREEN ONLY:
         * Prevent mouse focus from changing the browser scroll position
         * inside the sticky Talents section on the first category click.
         *
         * The click itself is untouched.
         * Keyboard focus remains available.
         * Mobile + tablet are completely untouched.
         */
        button.addEventListener(
            "mousedown",
            function (event) {

                if (
                    window.matchMedia(
                        "(min-width: 1025px)"
                    ).matches
                ) {

                    event.preventDefault();

                }

            }
        );


        button.addEventListener(
            "click",
            function () {

                setRoster(
                    button.dataset.rosterSwitch
                );

            }
        );

    });


    setRoster(
        activeName,
        true
    );

})();;
(function () {

    const section =
        document.querySelector(
            ".services"
        );


    if (!section) {
        return;
    }


    /*
     * MOBILE-ONLY MODE.
     * Desktop continues through the original code path unchanged.
     */
    const mobileLayout =
        window.matchMedia(
            "(max-width: 767px)"
        );


    const shell =
        section.querySelector(
            ".services-shell"
        );


    const stage =
        section.querySelector(
            ".services-stage"
        );


    const frame =
        section.querySelector(
            ".services-frame"
        );


    const leftHalf =
        section.querySelector(
            ".services-half--left"
        );


    const rightHalf =
        section.querySelector(
            ".services-half--right"
        );


    const leftImage =
        leftHalf
            ? leftHalf.querySelector("img")
            : null;


    const rightImage =
        rightHalf
            ? rightHalf.querySelector("img")
            : null;


    const flow =
        section.querySelector(
            ".services-flow"
        );


    const imageStage =
        section.querySelector(
            ".services-image-stage"
        );


    const servicesLabel =
        section.querySelector(
            ".services-label"
        );


    const serviceImages =
        Array.from(
            section.querySelectorAll(
                ".services-current-image"
            )
        );


    const serviceBlocks =
        Array.from(
            section.querySelectorAll(
                ".service-block"
            )
        );


    if (
        !shell ||
        !stage ||
        !frame ||
        !leftHalf ||
        !rightHalf ||
        !leftImage ||
        !rightImage ||
        !flow ||
        !imageStage ||
        !servicesLabel ||
        !serviceImages.length ||
        !serviceBlocks.length
    ) {
        return;
    }


    /* =====================================================
       HELPERS
    ===================================================== */

    function clamp(
        value,
        min,
        max
    ) {

        return Math.max(
            min,
            Math.min(
                max,
                value
            )
        );

    }


    function smooth(value) {

        value =
            clamp(
                value,
                0,
                1
            );


        return (
            value *
            value *
            (
                3 -
                2 * value
            )
        );

    }


    function cssPixels(name) {

        const value =
            getComputedStyle(section)
                .getPropertyValue(name)
                .trim();


        if (
            value.endsWith("vh")
        ) {

            const viewportHeight =
                mobileLayout.matches
                    ? getMobileViewportHeight()
                    : window.innerHeight;


            return (
                parseFloat(value) *
                viewportHeight /
                100
            );

        }


        if (
            value.endsWith("vw")
        ) {

            return (
                parseFloat(value) *
                window.innerWidth /
                100
            );

        }


        return (
            parseFloat(value) ||
            0
        );

    }


    function cssNumber(name) {

        const value =
            getComputedStyle(section)
                .getPropertyValue(name)
                .trim();


        return (
            parseFloat(value) ||
            0
        );

    }


    /* =====================================================
       HEADER SPACE
    ===================================================== */

    function updateHeaderSpace() {

        const header =
            document.querySelector(
                ".offform-header"
            );


        const extraGap =
            cssPixels(
                "--services-header-gap"
            );


        let headerBottom =
            0;


        if (header) {

            const headerRect =
                header.getBoundingClientRect();


            headerBottom =
                Math.max(
                    0,
                    headerRect.bottom
                );

        }


        section.style.setProperty(
            "--services-top",
            (
                headerBottom +
                extraGap
            ) +
            "px"
        );

    }


    /* =====================================================
       SCROLL VALUES
    ===================================================== */

    let shellTop =
        0;


    let holdDistance =
        0;


    let splitDistance =
        1;


    let itemDistance =
        1;


    let imageEntryStart =
        0.60;


    let textDelayDistance =
        0;


    let exitCloseDistance =
        1;


    let maxTravel =
        0;


    let entryParallax =
        0;


    let exitParallax =
        0;


    let imageSwapDistance =
        1;


    /*
     * MOBILE ONLY — LOCK THE VIEWPORT GEOMETRY.
     * Real mobile browsers change window.innerHeight when the address bar
     * shows / hides. If all vh distances are recalculated during that change,
     * reversing direction can visibly jump. We lock one stable viewport
     * height for the whole sticky sequence and keep it until a real
     * orientation / width change.
     */
    let mobileLockedViewportHeight =
        0;


    let mobileLockedViewportWidth =
        0;


    function getMobileViewportHeight() {

        if (!mobileLayout.matches) {

            return window.innerHeight;

        }


        if (
            !mobileLockedViewportHeight ||
            !mobileLockedViewportWidth
        ) {

            mobileLockedViewportHeight =
                window.innerHeight;


            mobileLockedViewportWidth =
                window.innerWidth;

        }


        return mobileLockedViewportHeight;

    }


    /* =====================================================
       MEASURE
    ===================================================== */

    function measure() {

        updateHeaderSpace();


        const scrollY =
            window.scrollY ||
            window.pageYOffset;


        shellTop =
            shell
                .getBoundingClientRect()
                .top +
            scrollY;


        holdDistance =
            Math.max(
                0,
                cssPixels(
                    "--services-hold-distance"
                )
            );


        splitDistance =
            Math.max(
                1,
                cssPixels(
                    "--services-split-distance"
                )
            );


        itemDistance =
            Math.max(
                1,
                cssPixels(
                    "--services-item-distance"
                )
            );


        imageSwapDistance =
            Math.max(
                1,
                cssPixels(
                    "--service-image-swap-distance"
                )
            );


        imageEntryStart =
            clamp(
                cssNumber(
                    "--services-image-entry-start"
                ),
                0,
                0.95
            );


        textDelayDistance =
            Math.max(
                0,
                cssPixels(
                    "--services-text-delay-distance"
                )
            );
        exitCloseDistance =
            Math.max(
                1,
                cssPixels(
                    "--services-exit-close-distance"
                )
            );


        entryParallax =
            Math.max(
                0,
                cssPixels(
                    "--services-entry-parallax"
                )
            );


        exitParallax =
            Math.max(
                0,
                cssPixels(
                    "--services-exit-parallax"
                )
            );


        const edgeVisible =
            Math.max(
                0,
                cssPixels(
                    "--services-edge-visible"
                )
            );


        const frameWidth =
            frame.offsetWidth;


        const halfWidth =
            frameWidth /
            2;


        maxTravel =
            Math.max(
                0,
                halfWidth -
                edgeVisible
            );


        update();

    }


    /* =====================================================
       SERVICE IMAGE TRANSITIONS
       SCROLL-LINKED CROSSFADE — NO MOVEMENT, NO SRC JUMP
    ===================================================== */

    function updateServiceImages(textScroll) {

        const transitionProgress = [];


        for (
            let index = 1;
            index < serviceImages.length;
            index++
        ) {

            const boundary =
                index *
                itemDistance;


            const transitionStart =
                boundary -
                (
                    imageSwapDistance /
                    2
                );


            const rawProgress =
                (
                    textScroll -
                    transitionStart
                ) /
                imageSwapDistance;


            transitionProgress[index] =
                smooth(
                    clamp(
                        rawProgress,
                        0,
                        1
                    )
                );

        }


        serviceImages.forEach(
            function (
                image,
                index
            ) {

                let opacity = 0;


                if (index === 0) {

                    opacity =
                        1 -
                        (
                            transitionProgress[1] ||
                            0
                        );

                }

                else if (
                    index ===
                    serviceImages.length - 1
                ) {

                    opacity =
                        transitionProgress[index] ||
                        0;

                }

                else {

                    const enter =
                        transitionProgress[index] ||
                        0;


                    const leave =
                        transitionProgress[index + 1] ||
                        0;


                    opacity =
                        enter *
                        (1 - leave);

                }


                image.style.opacity =
                    clamp(
                        opacity,
                        0,
                        1
                    ).toFixed(3);

            }
        );

    }


    /* =====================================================
       TEXT SPLIT AROUND IMAGE
    ===================================================== */

    function updateTextSplit() {

        const imageRect =
            imageStage.getBoundingClientRect();


        const labelRect =
            servicesLabel.getBoundingClientRect();


        /*
         * COPY + SERVICE TITLES avoid the complete visual unit:
         * SERVICES label + gap + image.
         * Both the regular copy rows and the titles split into
         * left/right halves while crossing the obstacle, then
         * close back together only after passing above SERVICES.
         */
        const obstacleTop =
            Math.min(
                labelRect.top,
                imageRect.top
            );


        const obstacleBottom =
            imageRect.bottom;


        const styles =
            getComputedStyle(section);


        const clearance =
            parseFloat(
                styles.getPropertyValue(
                    "--service-image-clearance"
                )
            ) ||
            35;


        const avoidDistance =
            parseFloat(
                styles.getPropertyValue(
                    "--service-avoid-distance"
                )
            ) ||
            100;


        const targetLeft =
            imageRect.left -
            clearance;


        const targetRight =
            imageRect.right +
            clearance;


        const lines =
            section.querySelectorAll(
                ".service-line, .service-title-line"
            );


        lines.forEach(
            function (line) {

                const leftText =
                    line.querySelector(
                        ".service-text-half--left"
                    );


                const rightText =
                    line.querySelector(
                        ".service-text-half--right"
                    );


                if (
                    !leftText ||
                    !rightText
                ) {
                    return;
                }


                line.style.setProperty(
                    "--left-shift",
                    "0px"
                );


                line.style.setProperty(
                    "--right-shift",
                    "0px"
                );


                const lineRect =
                    line.getBoundingClientRect();


                const leftRect =
                    leftText.getBoundingClientRect();


                const rightRect =
                    rightText.getBoundingClientRect();


                const lineCenterY =
                    lineRect.top +
                    lineRect.height /
                    2;


                let influence =
                    0;


                /* BELOW IMAGE */

                if (
                    lineCenterY >
                    obstacleBottom
                ) {

                    const distance =
                        lineCenterY -
                        obstacleBottom;


                    if (
                        distance <
                        avoidDistance
                    ) {

                        influence =
                            smooth(
                                1 -
                                (
                                    distance /
                                    avoidDistance
                                )
                            );

                    }

                }


                /* BESIDE IMAGE */

                else if (
                    lineCenterY >=
                    obstacleTop &&
                    lineCenterY <=
                    obstacleBottom
                ) {

                    influence =
                        1;

                }


                /* ABOVE IMAGE */

                else {

                    const distance =
                        obstacleTop -
                        lineCenterY;


                    if (
                        distance <
                        avoidDistance
                    ) {

                        influence =
                            smooth(
                                1 -
                                (
                                    distance /
                                    avoidDistance
                                )
                            );

                    }

                }


                const leftStyle =
                    getComputedStyle(
                        leftText
                    );


                const rightStyle =
                    getComputedStyle(
                        rightText
                    );


                const leftPadding =
                    parseFloat(
                        leftStyle.paddingRight
                    ) ||
                    0;


                const rightPadding =
                    parseFloat(
                        rightStyle.paddingLeft
                    ) ||
                    0;


                const realLeftEdge =
                    leftRect.right -
                    leftPadding;


                const realRightEdge =
                    rightRect.left +
                    rightPadding;


                const neededLeftShift =
                    Math.max(
                        0,
                        realLeftEdge -
                        targetLeft
                    );


                const neededRightShift =
                    Math.max(
                        0,
                        targetRight -
                        realRightEdge
                    );


                const finalLeftShift =
                    neededLeftShift *
                    influence;


                const finalRightShift =
                    neededRightShift *
                    influence;


                line.style.setProperty(
                    "--left-shift",
                    finalLeftShift.toFixed(2) +
                    "px"
                );


                line.style.setProperty(
                    "--right-shift",
                    finalRightShift.toFixed(2) +
                    "px"
                );

            }
        );

    }


    /* =====================================================
       SERVICES FLOW
    ===================================================== */

    function updateServicesFlow(
        scrollY,
        splitLinearProgress
    ) {

        /*
         * פתיחת התמונה הגדולה מתחילה כאן.
         */
        const splitStart =
            shellTop +
            holdDistance;


        /*
         * התמונה הקטנה לא מחכה לסוף.
         * היא מתחילה בחלק מתקדם של הפתיחה.
         */
        const smallImageStart =
            splitStart +
            (
                splitDistance *
                imageEntryStart
            );


        /*
         * והיא חייבת להגיע למרכז בדיוק
         * כשהתמונה הגדולה מסיימת להיפתח.
         */
        const smallImageEnd =
            splitStart +
            splitDistance;


        /*
         * הטקסט מתחיל רק אחרי שהשתיים
         * הגיעו יחד למיקום הסופי שלהן.
         */
        const textStart =
            smallImageEnd +
            textDelayDistance;


        /*
         * סוף תנועת שלושת ה-Services.
         * רק אחרי שהאחרון עבר, מתחיל רצף הסגירה.
         */
        const textEnd =
            textStart +
            (
                itemDistance *
                serviceBlocks.length
            );


        const exitCloseStart =
            textEnd;


        const exitCloseEnd =
            exitCloseStart +
            exitCloseDistance;


        /* =================================================
           BEFORE SMALL IMAGE ENTRY
        ================================================= */

        if (
            scrollY <
            smallImageStart
        ) {

            /*
             * MOBILE ONLY:
             * keep the SERVICES flow layer alive BEFORE the small image
             * starts revealing. Toggling visibility exactly at the first
             * reveal frame was forcing a new compositing / paint step and
             * producing the visible "jump" in both scroll directions.
             *
             * Desktop keeps the original visibility behavior.
             */
            flow.style.visibility =
                mobileLayout.matches
                    ? "visible"
                    : "hidden";

            imageStage.style.clipPath =
                "inset(0 0 100% 0)";

            servicesLabel.style.clipPath =
                "inset(0 0 100% 0)";


            /*
             * Because the mobile flow now stays alive, keep all text
             * safely parked off-screen until its own timeline begins.
             */
            if (mobileLayout.matches) {

                serviceBlocks.forEach(
                    function (block) {

                        const title =
                            block.querySelector(
                                ".service-title"
                            );


                        const copy =
                            block.querySelector(
                                ".service-copy"
                            );


                        if (title) {
                            title.style.top =
                                "200vh";
                        }


                        if (copy) {
                            copy.style.top =
                                "200vh";
                        }

                    }
                );

            }

            return;
        }


        flow.style.visibility =
            "visible";


        /* =================================================
           SMALL IMAGE REVEALS TOP → BOTTOM
           DURING LARGE IMAGE SPLIT
        ================================================= */

        const imageEntryRaw =
            (
                scrollY -
                smallImageStart
            ) /
            Math.max(
                1,
                smallImageEnd -
                smallImageStart
            );


        const imageEntryProgress =
            smooth(
                clamp(
                    imageEntryRaw,
                    0,
                    1
                )
            );


        /*
         * התמונה כבר יושבת במיקום הסטיקי שלה.
         * במקום Fade In, היא נחשפת מלמעלה למטה.
         */
        imageStage.style.top =
            "50%";


        const entryClip =
            "inset(0 0 " +
            (
                (1 - imageEntryProgress) * 100
            ).toFixed(3) +
            "% 0)";


        imageStage.style.clipPath =
            entryClip;


        servicesLabel.style.clipPath =
            entryClip;


        /* =================================================
           NO TEXT UNTIL LARGE + SMALL IMAGE BOTH FINISH
        ================================================= */

        if (
            scrollY <
            textStart
        ) {

            serviceImages.forEach(
                function (image, index) {

                    image.style.opacity =
                        index === 0
                            ? "1"
                            : "0";

                }
            );


            serviceBlocks.forEach(
                function (block) {

                    const title =
                        block.querySelector(
                            ".service-title"
                        );


                    const copy =
                        block.querySelector(
                            ".service-copy"
                        );


                    if (title) {

                        title.style.top =
                            "200vh";

                    }


                    if (copy) {

                        copy.style.top =
                            "200vh";

                    }

                }
            );


            return;
        }


        /* =================================================
           SMALL IMAGE IS NOW STICKY IN CENTER
        ================================================= */

        imageStage.style.top =
            "50%";


        /* =================================================
           LAST SMALL IMAGE — EXACT REVERSE REVEAL
           Closing and curtain-close start together.
           The small image closes upward before the
           large image finishes closing, exactly like the
           entrance timeline played backwards.
        ================================================= */

        if (
            scrollY >=
            exitCloseStart
        ) {

            const exitCloseLinearProgress =
                clamp(
                    (
                        scrollY -
                        exitCloseStart
                    ) /
                    Math.max(
                        1,
                        exitCloseDistance
                    ),
                    0,
                    1
                );


            const reverseOpeningProgress =
                1 -
                exitCloseLinearProgress;


            const reverseImageFadeRaw =
                (
                    reverseOpeningProgress -
                    imageEntryStart
                ) /
                Math.max(
                    0.0001,
                    1 -
                    imageEntryStart
                );


            const reverseImageReveal =
                smooth(
                    clamp(
                        reverseImageFadeRaw,
                        0,
                        1
                    )
                );


            const exitClip =
                "inset(0 0 " +
                (
                    (1 - reverseImageReveal) * 100
                ).toFixed(3) +
                "% 0)";


            imageStage.style.clipPath =
                exitClip;


            servicesLabel.style.clipPath =
                exitClip;

        }

        else {

            imageStage.style.clipPath =
                "inset(0 0 0% 0)";


            servicesLabel.style.clipPath =
                "inset(0 0 0% 0)";

        }


        if (
            scrollY >=
            exitCloseEnd
        ) {

            flow.style.visibility =
                "hidden";

        }


        const textScroll =
            scrollY -
            textStart;


        /* =================================================
           ACTIVE SERVICE
        ================================================= */

        updateServiceImages(
            textScroll
        );


        /* =================================================
           TITLE + COPY SCROLL
        ================================================= */

        const styles =
            getComputedStyle(section);


        const titleCopyGap =
            parseFloat(
                styles.getPropertyValue(
                    "--service-title-copy-gap"
                )
            ) ||
            105;


        const titleStartY =
            (
                mobileLayout.matches
                    ? getMobileViewportHeight()
                    : window.innerHeight
            ) +
            80;


        serviceBlocks.forEach(
            function (
                block,
                index
            ) {

                const title =
                    block.querySelector(
                        ".service-title"
                    );


                const copy =
                    block.querySelector(
                        ".service-copy"
                    );


                if (
                    !title ||
                    !copy
                ) {
                    return;
                }


                const blockStart =
                    index *
                    itemDistance;


                const localScroll =
                    textScroll -
                    blockStart;


                const titleY =
                    titleStartY -
                    localScroll;


                const copyY =
                    titleY +
                    titleCopyGap;


                title.style.top =
                    titleY.toFixed(2) +
                    "px";


                copy.style.top =
                    copyY.toFixed(2) +
                    "px";

            }
        );


        updateTextSplit();

    }


    /* =====================================================
       MOBILE PIN ENGINE
       DESKTOP DOES NOT ENTER THIS FUNCTION.
    ===================================================== */

    function updateMobilePin() {

        if (!mobileLayout.matches) {

            stage.classList.remove(
                "services-mobile-pin-engine"
            );

            stage.style.transform = "";

            return;
        }


        const shellRect =
            shell.getBoundingClientRect();


        const mobileStageHeight =
            getMobileViewportHeight();


        /*
         * MOBILE ONLY — NATURAL ENTRY.
         *
         * Before the section reaches the top, the stage stays in its
         * normal absolute position inside the shell. We do NOT turn it
         * into a fixed layer and then translate the whole image upward.
         *
         * Result: when this section follows the previous one, the full
         * image is already sitting exactly at the start of this section.
         * The only entry movement that remains is the existing parallax
         * INSIDE the image itself.
         */
        if (shellRect.top > 0) {

            stage.classList.remove(
                "services-mobile-pin-engine"
            );

            stage.style.transform = "";

            return;
        }


        let mobileStageY = 0;


        /*
         * After the complete sequence is finished:
         * let the stage leave naturally with the bottom of the shell.
         */
        if (
            shellRect.bottom <
            mobileStageHeight
        ) {

            mobileStageY =
                shellRect.bottom -
                mobileStageHeight;

        }


        stage.classList.add(
            "services-mobile-pin-engine"
        );


        stage.style.transform =
            "translate3d(0," +
            mobileStageY.toFixed(2) +
            "px,0)";

    }


    /* =====================================================
       MAIN UPDATE
    ===================================================== */

    function update() {

        updateMobilePin();


        const scrollY =
            window.scrollY ||
            window.pageYOffset;


        /*
         * MOBILE ONLY — ONE CONTINUOUS VISUAL SCROLL TIMELINE.
         *
         * On mobile, browser chrome can make document scrollY and the
         * actually visible position differ by a few pixels between frames.
         * The large-image split used scrollY, which could therefore make
         * the opening appear to jump — especially when reversing direction.
         *
         * We derive the mobile timeline directly from the shell's CURRENT
         * viewport position. Forward and reverse now use the exact same
         * geometry and the exact same equation.
         *
         * Desktop continues to use the original scrollY path unchanged.
         */
        const animationScrollY =
            mobileLayout.matches
                ?
                    (
                        shellTop -
                        shell.getBoundingClientRect().top
                    )
                :
                    scrollY;


        /* =================================================
           ORIGINAL ENTRY PARALLAX
        ================================================= */

        const sectionTopInViewport =
            stage.getBoundingClientRect().top;


        const rawEntryProgress =
            (
                (
                    mobileLayout.matches
                        ? getMobileViewportHeight()
                        : window.innerHeight
                ) -
                sectionTopInViewport
            ) /
            (
                mobileLayout.matches
                    ? getMobileViewportHeight()
                    : window.innerHeight
            );


        const entryProgress =
            smooth(
                clamp(
                    rawEntryProgress,
                    0,
                    1
                )
            );


        const imageEntryTravel =
            entryParallax *
            (
                1 -
                entryProgress
            );


        /* =================================================
           ORIGINAL LARGE IMAGE SPLIT
        ================================================= */

        const splitStart =
            shellTop +
            holdDistance;


        const rawProgress =
            (
                animationScrollY -
                splitStart
            ) /
            splitDistance;


        /*
         * linear version is useful for synchronizing
         * the small image timing.
         */
        const splitLinearProgress =
            clamp(
                rawProgress,
                0,
                1
            );


        const progress =
            smooth(
                splitLinearProgress
            );


        /* =================================================
           LARGE IMAGE EXIT CLOSE — EXACT REVERSE
           Closing starts immediately when the last Service ends.
        ================================================= */

        const textStart =
            splitStart +
            splitDistance +
            textDelayDistance;


        const textEnd =
            textStart +
            (
                itemDistance *
                serviceBlocks.length
            );


        const exitCloseProgress =
            smooth(
                clamp(
                    (
                        animationScrollY -
                        textEnd
                    ) /
                    Math.max(
                        1,
                        exitCloseDistance
                    ),
                    0,
                    1
                )
            );


        /*
         * NO PARALLAX WHILE THE LARGE IMAGE IS CLOSING.
         * During the close, the internal image stays perfectly still.
         *
         * Only AFTER the sticky stage releases and the fully closed
         * section itself begins leaving the viewport do we add the
         * reverse internal parallax.
         */
        const stageRect =
            stage.getBoundingClientRect();


        const stageExitProgress =
            clamp(
                (
                    -stageRect.top
                ) /
                Math.max(
                    1,
                    (
                        mobileLayout.matches
                            ? getMobileViewportHeight()
                            : window.innerHeight
                    )
                ),
                0,
                1
            );


        const imageExitTravel =
            exitParallax *
            smooth(
                stageExitProgress
            );


        /*
         * ENTRY:
         * +parallax -> 0 while the full image arrives.
         *
         * EXIT:
         * 0 -> -parallax only while the already-closed
         * full image leaves the screen.
         */
        const imageTravel =
            exitCloseProgress < 1
                ?
                imageEntryTravel
                :
                -imageExitTravel;


        const imageTransform =
            "translate3d(0," +
            imageTravel.toFixed(2) +
            "px,0)";


        leftImage.style.transform =
            imageTransform;


        rightImage.style.transform =
            imageTransform;


        const travel =
            maxTravel *
            progress *
            (
                1 -
                exitCloseProgress
            );


        leftHalf.style.transform =
            "translate3d(" +
            (-travel).toFixed(2) +
            "px,0,0)";


        rightHalf.style.transform =
            "translate3d(" +
            travel.toFixed(2) +
            "px,0,0)";


        /* =================================================
           SERVICES FLOW
        ================================================= */

        updateServicesFlow(
            animationScrollY,
            splitLinearProgress
        );

    }


    /* =====================================================
       RAF
    ===================================================== */

    let ticking =
        false;


    function requestUpdate() {

        if (ticking) {
            return;
        }


        ticking =
            true;


        requestAnimationFrame(
            function () {

                update();

                ticking =
                    false;

            }
        );

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    window.addEventListener(
        "scroll",
        requestUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        function () {

            if (mobileLayout.matches) {

                const widthChanged =
                    !mobileLockedViewportWidth ||
                    Math.abs(
                        window.innerWidth -
                        mobileLockedViewportWidth
                    ) > 2;


                /*
                 * Ignore height-only resize events caused by the mobile
                 * browser chrome. They are the main source of forward /
                 * reverse jumps inside a vh-based sticky sequence.
                 */
                if (!widthChanged) {

                    requestUpdate();

                    return;

                }


                mobileLockedViewportHeight =
                    window.innerHeight;


                mobileLockedViewportWidth =
                    window.innerWidth;

            }


            requestAnimationFrame(
                measure
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       START
    ===================================================== */

    if (mobileLayout.matches) {

        mobileLockedViewportHeight =
            window.innerHeight;


        mobileLockedViewportWidth =
            window.innerWidth;

    }


    requestAnimationFrame(
        measure
    );


})();;
/* =========================================================
   SERVICES — SMALL IMAGE HOVER WAVE
   SAME BEHAVIOR AS HERO REFERENCE
========================================================= */

(function () {

    const DISTORTION_STRENGTH = 4.5;
    const WAVE_FREQUENCY = 0.045;
    const WAVE_SPEED = 0.13;
    const ORGANIC_AMOUNT = 0.65;
    const FADE_SPEED = 0.14;
    const MOVE_TIMEOUT = 70;


    const desktop =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        );


    if (!desktop.matches) {
        return;
    }


    const section =
        document.querySelector(
            ".services"
        );


    if (!section) {
        return;
    }


    const block =
        section.querySelector(
            ".services-image-stage"
        );


    if (!block) {
        return;
    }


    const images =
        Array.from(
            block.querySelectorAll(
                ".services-current-image"
            )
        );


    const canvas =
        block.querySelector(
            ".services-image-wave"
        );


    if (
        !images.length ||
        !canvas
    ) {
        return;
    }


    const context =
        canvas.getContext(
            "2d"
        );


    if (!context) {
        return;
    }


    const sourceCanvas =
        document.createElement(
            "canvas"
        );


    const sourceContext =
        sourceCanvas.getContext(
            "2d"
        );


    if (!sourceContext) {
        return;
    }


    let mouseY = null;

    let previousX = null;
    let previousY = null;

    let isInside = false;
    let isMoving = false;

    let movementAmount = 0;

    let wavePhase = 0;

    let moveTimer = null;


    /* =====================================================
       SIZE
    ===================================================== */

    function resizeCanvas() {

        const rect =
            block.getBoundingClientRect();


        const width =
            Math.max(
                1,
                Math.round(
                    rect.width
                )
            );


        const height =
            Math.max(
                1,
                Math.round(
                    rect.height
                )
            );


        if (
            canvas.width !== width ||
            canvas.height !== height
        ) {

            canvas.width = width;
            canvas.height = height;

        }


        if (
            sourceCanvas.width !== width ||
            sourceCanvas.height !== height
        ) {

            sourceCanvas.width = width;
            sourceCanvas.height = height;

        }

    }


    /* =====================================================
       CAPTURE CURRENT CROSSFADED IMAGE
    ===================================================== */

    function captureImages() {

        resizeCanvas();


        const width =
            sourceCanvas.width;


        const height =
            sourceCanvas.height;


        sourceContext.clearRect(
            0,
            0,
            width,
            height
        );


        let drewSomething = false;


        images.forEach(
            function (image) {

                if (
                    !image.complete ||
                    image.naturalWidth <= 0 ||
                    image.naturalHeight <= 0
                ) {
                    return;
                }


                const opacity =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            parseFloat(
                                getComputedStyle(image).opacity
                            ) || 0
                        )
                    );


                if (opacity <= 0.001) {
                    return;
                }


                const naturalWidth =
                    image.naturalWidth;


                const naturalHeight =
                    image.naturalHeight;


                const scale =
                    Math.max(
                        width / naturalWidth,
                        height / naturalHeight
                    );


                const sourceWidth =
                    width / scale;


                const sourceHeight =
                    height / scale;


                const sourceX =
                    (
                        naturalWidth -
                        sourceWidth
                    ) / 2;


                const sourceY =
                    (
                        naturalHeight -
                        sourceHeight
                    ) / 2;


                try {

                    sourceContext.save();

                    sourceContext.globalAlpha =
                        opacity;

                    sourceContext.drawImage(
                        image,
                        sourceX,
                        sourceY,
                        sourceWidth,
                        sourceHeight,
                        0,
                        0,
                        width,
                        height
                    );

                    sourceContext.restore();

                    drewSomething = true;

                }

                catch (error) {

                    sourceContext.restore();

                }

            }
        );


        return drewSomething;

    }


    /* =====================================================
       DRAW WAVE
    ===================================================== */

    function drawWave() {

        const width =
            canvas.width;


        const height =
            canvas.height;


        if (
            width <= 0 ||
            height <= 0
        ) {
            return;
        }


        const stripHeight = 2;
        const overlap = 1;


        for (
            let y = 0;
            y < height;
            y += stripHeight
        ) {

            const mainWave =
                Math.sin(
                    y *
                        WAVE_FREQUENCY +
                    wavePhase
                );


            const organicWave =
                Math.sin(
                    y * 0.021 -
                    wavePhase * 1.7
                ) *
                ORGANIC_AMOUNT;


            const mouseInfluence =
                mouseY !== null
                    ? Math.sin(
                        (
                            y -
                            mouseY
                        ) *
                            0.018 +
                        wavePhase *
                            0.65
                    ) *
                        0.35
                    : 0;


            const displacement =
                (
                    mainWave +
                    organicWave +
                    mouseInfluence
                ) *
                DISTORTION_STRENGTH *
                movementAmount;


            const drawHeight =
                Math.min(
                    stripHeight +
                        overlap,
                    height - y
                );


            context.drawImage(
                sourceCanvas,
                0,
                y,
                width,
                drawHeight,
                displacement,
                y,
                width,
                drawHeight
            );


            if (displacement > 0) {

                context.drawImage(
                    sourceCanvas,
                    0,
                    y,
                    1,
                    drawHeight,
                    0,
                    y,
                    displacement + 1,
                    drawHeight
                );

            }


            if (displacement < 0) {

                const gap =
                    Math.abs(
                        displacement
                    );


                context.drawImage(
                    sourceCanvas,
                    Math.max(
                        0,
                        width - 1
                    ),
                    y,
                    1,
                    drawHeight,
                    width -
                        gap -
                        1,
                    y,
                    gap + 1,
                    drawHeight
                );

            }

        }

    }


    /* =====================================================
       MOVEMENT
    ===================================================== */

    function clearMoveTimer() {

        if (moveTimer !== null) {

            clearTimeout(
                moveTimer
            );

            moveTimer = null;

        }

    }


    function registerMovement() {

        isMoving = true;

        clearMoveTimer();

        moveTimer =
            setTimeout(
                function () {

                    moveTimer = null;
                    isMoving = false;

                },
                MOVE_TIMEOUT
            );

    }


    /* =====================================================
       POINTER
    ===================================================== */

    block.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                block.getBoundingClientRect();


            const localX =
                event.clientX -
                rect.left;


            const localY =
                event.clientY -
                rect.top;


            mouseY = localY;


            if (
                previousX !== null &&
                previousY !== null
            ) {

                const dx =
                    localX -
                    previousX;


                const dy =
                    localY -
                    previousY;


                const distance =
                    Math.hypot(
                        dx,
                        dy
                    );


                if (distance > 0.2) {
                    registerMovement();
                }

            }

            else {

                registerMovement();

            }


            previousX = localX;
            previousY = localY;

        },
        {
            passive: true
        }
    );


    block.addEventListener(
        "mouseenter",
        function () {

            isInside = true;

            previousX = null;
            previousY = null;

            movementAmount = 0;

            resizeCanvas();

        }
    );


    block.addEventListener(
        "mouseleave",
        function () {

            isInside = false;
            isMoving = false;

            previousX = null;
            previousY = null;

            mouseY = null;

            clearMoveTimer();

        }
    );


    window.addEventListener(
        "resize",
        resizeCanvas,
        {
            passive: true
        }
    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    function animate() {

        requestAnimationFrame(
            animate
        );


        if (
            !isInside &&
            movementAmount <= 0.001
        ) {

            canvas.style.opacity =
                "0";

            return;

        }


        if (isMoving) {

            movementAmount +=
                (
                    1 -
                    movementAmount
                ) *
                0.45;

        }

        else {

            movementAmount *=
                (
                    1 -
                    FADE_SPEED
                );


            if (movementAmount < 0.01) {
                movementAmount = 0;
            }

        }


        if (movementAmount <= 0) {

            canvas.style.opacity =
                "0";

            context.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            return;

        }


        if (!captureImages()) {
            return;
        }


        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        wavePhase +=
            WAVE_SPEED;


        drawWave();


        canvas.style.opacity =
            "1";

    }


    resizeCanvas();

    requestAnimationFrame(
        animate
    );


})();;
(function () {

    const section =
        document.querySelector(
            ".campaign-selected"
        );


    if (!section) {
        return;
    }


    /*
     * MOBILE-ONLY LAYOUT FLAG.
     * Desktop continues through the original code path unchanged.
     */
    const mobileLayout =
        window.matchMedia(
            "(max-width: 1024px)"
        );


    /* WIDE SCREEN ONLY — same approved reference breakpoint */
    const wideScreenLayout =
        window.matchMedia(
            "(min-width: 1520px)"
        );

    /* DESKTOP ONLY — excludes mobile + tablet */
    const desktopTextFadeLayout =
        window.matchMedia(
            "(min-width: 1025px)"
        );


    const shell =
        section.querySelector(
            ".campaign-selected-shell"
        );


    const stage =
        section.querySelector(
            ".campaign-selected-stage"
        );


    const transition =
        section.querySelector(
            ".campaign-selected-transition"
        );


    const heading =
        section.querySelector(
            ".campaign-selected-heading"
        );


    const headingTitle =
        section.querySelector(
            ".campaign-selected-heading-title"
        );


    const headingLine =
        section.querySelector(
            ".campaign-selected-heading-line"
        );


    const headingView =
        section.querySelector(
            ".campaign-selected-heading-view"
        );


    const headingSquare =
        section.querySelector(
            ".campaign-selected-heading-square"
        );


    const gallery =
        section.querySelector(
            ".campaign-selected-gallery"
        );


    const imagesViewport =
        section.querySelector(
            ".campaign-selected-images"
        );


    /*
     * MOBILE ONLY — ONE SIMPLE ROW ABOVE THE IMAGE:
     * CAMPAIGN NAME LEFT / TALENT NAME RIGHT.
     * Nothing is inserted on desktop.
     */
    let mobileInfoRow = null;
    let mobileInfoName = null;
    let mobileInfoTalent = null;


    if (mobileLayout.matches) {

        mobileInfoRow =
            document.createElement(
                "div"
            );


        mobileInfoRow.className =
            "campaign-selected-mobile-info-row";


        mobileInfoName =
            document.createElement(
                "span"
            );


        mobileInfoName.className =
            "campaign-selected-mobile-info-name";


        mobileInfoTalent =
            document.createElement(
                "span"
            );


        mobileInfoTalent.className =
            "campaign-selected-mobile-info-talent";


        mobileInfoRow.appendChild(
            mobileInfoName
        );


        mobileInfoRow.appendChild(
            mobileInfoTalent
        );


        gallery.insertBefore(
            mobileInfoRow,
            imagesViewport
        );

    }





    const cards =
        Array.from(
            section.querySelectorAll(
                ".campaign-selected-card"
            )
        );


    const progressTrack =
        section.querySelector(
            ".campaign-selected-progress-track"
        );


    const progressSquare =
        section.querySelector(
            ".campaign-selected-info .campaign-selected-progress-square"
        );


    /*
     * MOBILE ONLY — duplicate visual progress bar.
     * Desktop continues using the original progressTrack/progressSquare.
     */
    const mobileProgressTrack =
        section.querySelector(
            ".campaign-selected-mobile-progress .campaign-selected-progress-track"
        );


    const mobileProgressSquare =
        section.querySelector(
            ".campaign-selected-mobile-progress .campaign-selected-progress-square"
        );


    const activeCount =
        section.querySelector(
            ".campaign-selected-active-count"
        );


    const activeInfo =
        section.querySelector(
            ".campaign-selected-active"
        );


    const activeTop =
        section.querySelector(
            ".campaign-selected-active-top"
        );


    const activeMiddle =
        section.querySelector(
            ".campaign-selected-active-middle"
        );


    const activeView =
        section.querySelector(
            ".campaign-selected-view"
        );


    const activeViewLabel =
        activeView
            ?
            activeView.querySelector(
                "span:first-child"
            )
            :
            null;


    const activeViewLine =
        activeView
            ?
            activeView.querySelector(
                ".campaign-selected-view-line"
            )
            :
            null;


    const activeViewSquare =
        activeView
            ?
            activeView.querySelector(
                ".campaign-selected-view-square"
            )
            :
            null;


    const activeBrand =
        section.querySelector(
            ".campaign-selected-active-brand"
        );


    const activeName =
        section.querySelector(
            ".campaign-selected-active-name"
        );


    const activeYear =
        section.querySelector(
            ".campaign-selected-active-year"
        );


    const activeCopy =
        section.querySelector(
            ".campaign-selected-active-copy"
        );


    const activeTalent =
        section.querySelector(
            ".campaign-selected-active-talent-name"
        );


    if (
        !shell ||
        !stage ||
        !transition ||
        !heading ||
        !headingTitle ||
        !headingLine ||
        !headingView ||
        !headingSquare ||
        !gallery ||
        !activeView ||
        !activeViewLabel ||
        !activeViewLine ||
        !activeViewSquare ||
        !cards.length
    ) {

        return;

    }


    /* =====================================================
       GALLERY TIMING
    ===================================================== */

    const HOLD_TIME = 2300;
    const CLOSE_TIME = 950;
    const OPEN_TIME = 950;


    let motionSession = 0;

    let infoFadeTimer = null;
    let infoMiddleTimer = null;


    /* =====================================================
       HELPERS
    ===================================================== */

    const clamp = (
        value,
        min,
        max
    ) => {

        return Math.max(
            min,
            Math.min(
                max,
                value
            )
        );

    };


    const smooth = value => {

        value =
            clamp(
                value,
                0,
                1
            );


        return (
            value *
            value *
            (
                3 -
                2 * value
            )
        );

    };


    const phase = (
        progress,
        start,
        end
    ) => {

        return smooth(
            (
                progress -
                start
            ) /
            (
                end -
                start
            )
        );

    };


    function cssNumber(name) {

        return (
            parseFloat(
                getComputedStyle(section)
                    .getPropertyValue(name)
            ) ||
            0
        );

    }


    function cssPixels(name) {

        const value =
            getComputedStyle(section)
                .getPropertyValue(name)
                .trim();


        if (
            value.endsWith("vh")
        ) {

            const viewportHeight =
                mobileLayout.matches
                    ? getMobileViewportHeight()
                    : window.innerHeight;


            return (
                parseFloat(value) *
                viewportHeight /
                100
            );

        }


        return (
            parseFloat(value) ||
            0
        );

    }


    function wait(ms) {

        return new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    ms
                )
        );

    }


    function animateClip(
        card,
        from,
        to,
        duration
    ) {

        const session =
            motionSession;


        return new Promise(
            resolve => {

                const start =
                    performance.now();


                function frame(now) {

                    if (
                        session !== motionSession
                    ) {

                        resolve();
                        return;

                    }


                    const progress =
                        clamp(
                            (
                                now -
                                start
                            ) /
                            duration,
                            0,
                            1
                        );


                    const eased =
                        smooth(
                            progress
                        );


                    const value =
                        from +
                        (
                            to -
                            from
                        ) *
                        eased;


                    const clip =
                        "inset(0 0 0 " +
                        value.toFixed(3) +
                        "%)";


                    card.style.clipPath =
                        clip;


                    card.style.webkitClipPath =
                        clip;


                    if (
                        progress < 1
                    ) {

                        requestAnimationFrame(
                            frame
                        );

                    }

                    else {

                        resolve();

                    }

                }


                requestAnimationFrame(
                    frame
                );

            }
        );

    }


    /* =====================================================
       ACTIVE CAMPAIGN
    ===================================================== */

    let activeIndex = 0;


    let progressAnimationFrame = null;


    function setProgressPosition(
        index,
        duration
    ) {

        if (
            !progressTrack ||
            !progressSquare ||
            cards.length <= 1
        ) {
            return;
        }


        /*
         * MOBILE ONLY — mirror the desktop progress position
         * onto the mobile progress square.
         */
        const syncMobileProgress = function (position) {

            if (
                !mobileLayout.matches ||
                !mobileProgressTrack ||
                !mobileProgressSquare
            ) {
                return;
            }


            mobileProgressSquare.dataset.position =
                String(position);


            mobileProgressSquare.style.left =
                (
                    position * 100
                ).toFixed(3) +
                "%";

        };


        const target =
            clamp(
                index /
                (
                    cards.length - 1
                ),
                0,
                1
            );


        const startLeft =
            parseFloat(
                progressSquare.dataset.position ||
                "0"
            );


        if (
            !duration ||
            duration <= 0
        ) {

            progressSquare.dataset.position =
                String(target);


            progressSquare.style.left =
                (
                    target * 100
                ).toFixed(3) +
                "%";


            syncMobileProgress(
                target
            );


            return;
        }


        if (progressAnimationFrame) {

            cancelAnimationFrame(
                progressAnimationFrame
            );

            progressAnimationFrame =
                null;

        }


        const session =
            motionSession;


        const startTime =
            performance.now();


        function animateProgress(now) {

            if (
                session !== motionSession
            ) {

                progressAnimationFrame =
                    null;

                return;

            }


            const progress =
                clamp(
                    (
                        now -
                        startTime
                    ) /
                    duration,
                    0,
                    1
                );


            const eased =
                smooth(progress);


            const current =
                startLeft +
                (
                    target -
                    startLeft
                ) *
                eased;


            progressSquare.dataset.position =
                String(current);


            progressSquare.style.left =
                (
                    current * 100
                ).toFixed(3) +
                "%";


            syncMobileProgress(
                current
            );


            if (
                progress < 1
            ) {

                progressAnimationFrame =
                    requestAnimationFrame(
                        animateProgress
                    );

            }

            else {

                progressAnimationFrame =
                    null;

            }

        }


        progressAnimationFrame =
            requestAnimationFrame(
                animateProgress
            );

    }


    function updateInfo(index) {

        const card =
            cards[index];


        if (!card) {
            return;
        }


        if (activeCount) {

            activeCount.textContent =
                String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                ) +
                " / " +
                String(
                    cards.length
                ).padStart(
                    2,
                    "0"
                );

        }


        if (activeBrand) {

            activeBrand.textContent =
                card.dataset.brand ||
                "";

        }


        if (activeName) {

            activeName.textContent =
                card.dataset.name ||
                "";

        }


        if (activeYear) {

            activeYear.textContent =
                card.dataset.year ||
                "";

        }


        if (activeCopy) {

            activeCopy.textContent =
                card.dataset.copy ||
                "";

        }


        if (activeTalent) {

            activeTalent.textContent =
                card.dataset.talent ||
                "";

        }


        /*
         * MOBILE ONLY — MINIMAL IMAGE INFO.
         */
        if (
            mobileLayout.matches &&
            mobileInfoName &&
            mobileInfoTalent
        ) {

            mobileInfoName.textContent =
                card.dataset.name ||
                "";


            mobileInfoTalent.textContent =
                card.dataset.talent ||
                "";

        }

    }


    function setActiveCard(index) {

        cards.forEach(
            function (card, cardIndex) {

                card.classList.toggle(
                    "is-active",
                    cardIndex === index
                );

            }
        );


        activeIndex =
            index;


        if (
            activeTop &&
            activeMiddle
        ) {

            if (desktopTextFadeLayout.matches) {

                /*
                 * DESKTOP ONLY:
                 * Pure fade-out / fade-in.
                 * No translate, no movement, no blur.
                 * TALENT label + square stay fixed.
                 */
                if (activeBrand) {
                    activeBrand.style.opacity = "0";
                }

                if (activeName) {
                    activeName.style.opacity = "0";
                }

                if (activeYear) {
                    activeYear.style.opacity = "0";
                }

                if (activeCopy) {
                    activeCopy.style.opacity = "0";
                }

                if (activeTalent) {
                    activeTalent.style.opacity = "0";
                }

            }
            else {

                /* MOBILE + TABLET — original behavior unchanged */
                activeTop.style.opacity =
                    "0";

                if (mobileLayout.matches) {
                    activeMiddle.style.opacity = "0";
                }
                else {
                    activeMiddle.style.opacity = "1";

                    if (activeCopy) {
                        activeCopy.style.opacity = "0";
                    }

                    if (activeTalent) {
                        activeTalent.style.opacity = "0";
                    }
                }

            }


            if (infoFadeTimer !== null) {

                clearTimeout(
                    infoFadeTimer
                );

            }


            if (infoMiddleTimer !== null) {

                clearTimeout(
                    infoMiddleTimer
                );

            }


            const session =
                motionSession;


            infoFadeTimer =
                window.setTimeout(
                    function () {

                        infoFadeTimer =
                            null;


                        if (
                            session !== motionSession
                        ) {
                            return;
                        }


                        updateInfo(
                            index
                        );


                        if (desktopTextFadeLayout.matches) {

                            /* NEW TEXT — fade back in at the exact same position */
                            if (activeBrand) {
                                activeBrand.style.opacity = "1";
                            }

                            if (activeName) {
                                activeName.style.opacity = "1";
                            }

                            if (activeYear) {
                                activeYear.style.opacity = "0.60";
                            }

                            if (activeCopy) {
                                activeCopy.style.opacity = "0.75";
                            }

                            if (activeTalent) {
                                activeTalent.style.opacity = "1";
                            }

                        }
                        else {

                            activeTop.style.opacity =
                                "1";


                            infoMiddleTimer =
                                window.setTimeout(
                                    function () {

                                        infoMiddleTimer =
                                            null;


                                        if (
                                            session !== motionSession
                                        ) {
                                            return;
                                        }


                                        activeMiddle.style.opacity =
                                            "1";

                                        if (!mobileLayout.matches) {
                                            if (activeCopy) {
                                                activeCopy.style.opacity = "0.75";
                                            }

                                            if (activeTalent) {
                                                activeTalent.style.opacity = "1";
                                            }
                                        }

                                    },
                                    90
                                );

                        }

                    },
                    desktopTextFadeLayout.matches
                        ? 650
                        : 280
                );

        }

        else {

            updateInfo(
                index
            );

        }


        setProgressPosition(
            index,
            OPEN_TIME
        );

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    cards.forEach(
        function (card, index) {

            const clip =
                index === 0
                    ? "inset(0 0 0 100%)"
                    : "inset(0 0 0 100%)";


            card.style.clipPath =
                clip;


            card.style.webkitClipPath =
                clip;

        }
    );


    updateInfo(
        0
    );


    activeIndex =
        0;


    if (activeInfo) {

        activeInfo.style.opacity =
            "1";

    }


    if (activeTop) {

        activeTop.style.opacity =
            "1";

    }


    if (activeMiddle) {

        activeMiddle.style.opacity =
            "1";

    }


    setProgressPosition(
        0,
        0
    );


    /* =====================================================
       TIMED GALLERY
    ===================================================== */

    let galleryRunning = false;

    let gallerySession = 0;

    let galleryPaused = false;

    let galleryExitRequested = false;


    async function runGallery(session) {

        while (
            galleryRunning &&
            session === gallerySession
        ) {

            while (
                galleryPaused &&
                !galleryExitRequested &&
                galleryRunning &&
                session === gallerySession
            ) {

                await wait(
                    80
                );

            }


            if (
                !galleryRunning ||
                session !== gallerySession
            ) {
                return;
            }


            /*
             * SAFE STOP:
             * At this point the current card is fully open.
             * If the section has started releasing, stop here.
             */
            if (galleryExitRequested) {

                galleryRunning =
                    false;

                return;

            }


            await wait(
                HOLD_TIME
            );


            if (
                !galleryRunning ||
                session !== gallerySession
            ) {
                return;
            }


            /*
             * If exit happened during the HOLD,
             * the current image is still fully open,
             * so stop immediately without starting a close.
             */
            if (galleryExitRequested) {

                galleryRunning =
                    false;

                return;

            }


            if (galleryPaused) {
                continue;
            }


            const currentCard =
                cards[activeIndex];


            /*
             * Once this close begins, we must finish the
             * current transition all the way to a fully open
             * next image, even if the section starts exiting.
             */
            await animateClip(
                currentCard,
                0,
                100,
                CLOSE_TIME
            );


            if (
                !galleryRunning ||
                session !== gallerySession
            ) {
                return;
            }


            const nextIndex =
                (
                    activeIndex + 1
                ) %
                cards.length;


            setActiveCard(
                nextIndex
            );


            const nextCard =
                cards[nextIndex];


            nextCard.style.clipPath =
                "inset(0 0 0 100%)";


            nextCard.style.webkitClipPath =
                "inset(0 0 0 100%)";


            await animateClip(
                nextCard,
                100,
                0,
                OPEN_TIME
            );


            if (
                !galleryRunning ||
                session !== gallerySession
            ) {
                return;
            }


            /*
             * The new image is now fully open.
             * If exit was requested anywhere during the
             * close/open transition, stop exactly here.
             */
            if (galleryExitRequested) {

                galleryRunning =
                    false;

                return;

            }

        }

    }


    function startGallery() {

        if (galleryRunning) {
            return;
        }


        galleryExitRequested =
            false;


        galleryRunning =
            true;


        gallerySession += 1;


        runGallery(
            gallerySession
        );

    }


    function stopGallery() {

        if (!galleryRunning) {
            return;
        }


        galleryRunning =
            false;


        gallerySession += 1;

    }


    function stopAllMotion() {

        stopGallery();


        motionSession += 1;


        if (progressAnimationFrame) {

            cancelAnimationFrame(
                progressAnimationFrame
            );

            progressAnimationFrame =
                null;

        }


        if (infoFadeTimer !== null) {

            clearTimeout(
                infoFadeTimer
            );

            infoFadeTimer =
                null;

        }


        if (infoMiddleTimer !== null) {

            clearTimeout(
                infoMiddleTimer
            );

            infoMiddleTimer =
                null;

        }

    }


    function requestStopAtFullState() {

        galleryExitRequested =
            true;


        /*
         * Do not cancel clip / text / progress mid-animation.
         * The current transition is allowed to finish,
         * then runGallery stops at the next fully open card.
         */

    }


    /* =====================================================
       PAUSE ON IMAGE HOVER
    ===================================================== */

    if (imagesViewport) {

        imagesViewport.addEventListener(
            "mouseenter",
            function () {

                galleryPaused =
                    true;

            }
        );


        imagesViewport.addEventListener(
            "mouseleave",
            function () {

                galleryPaused =
                    false;

            }
        );


        /*
         * MOBILE ONLY — HOLD THE IMAGE TO PAUSE.
         * Touch down pauses the timed gallery.
         * Releasing the finger resumes it immediately.
         * Desktop behavior remains unchanged.
         */
        imagesViewport.addEventListener(
            "touchstart",
            function () {

                if (!mobileLayout.matches) {
                    return;
                }


                galleryPaused =
                    true;

            },
            {
                passive: true
            }
        );


        imagesViewport.addEventListener(
            "touchend",
            function () {

                if (!mobileLayout.matches) {
                    return;
                }


                galleryPaused =
                    false;

            },
            {
                passive: true
            }
        );


        imagesViewport.addEventListener(
            "touchcancel",
            function () {

                if (!mobileLayout.matches) {
                    return;
                }


                galleryPaused =
                    false;

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       STICKY STATE
    ===================================================== */

    let stickyStart = 0;
    let stickyDistance = 1;

    let headingTitleWidth = 0;
    let headingViewWidth = 0;
    let headingWidth = 0;

    let headingSquareSize = 7;
    let headingSideGap = 8;
    let headingLineTitleGap = 8;
    let headingLineButtonGap = 8;

    let headingLineStickyStart =
        null;


    /*
     * MOBILE ONLY — keep one stable viewport height while browser
     * chrome opens/closes, so the pin does not jump.
     */
    let mobileViewportHeight =
        0;


    let mobileViewportWidth =
        0;


    function getMobileViewportHeight() {

        if (!mobileLayout.matches) {
            return window.innerHeight;
        }


        if (!mobileViewportHeight) {

            mobileViewportHeight =
                window.innerHeight;

        }


        return mobileViewportHeight;

    }


    let activeViewLabelWidth = 0;
    let activeViewFinalLineWidth = 0;
    let activeViewSquareSize = 7;
    let activeViewSquareStartY = 0;
    let activeViewSquareFinalY = 0;
    let activeViewSquareSideGap = 8;


    /* =====================================================
       MEASURE
    ===================================================== */

    function measure() {

        const scrollY =
            window.scrollY ||
            window.pageYOffset;


        stickyStart =
            shell
                .getBoundingClientRect()
                .top +
            scrollY;


        stickyDistance =
            Math.max(
                1,
                cssPixels(
                    "--campaign-sticky-distance"
                )
            );


        headingTitleWidth =
            headingTitle.offsetWidth;


        headingViewWidth =
            headingView.offsetWidth;


        headingWidth =
            heading.offsetWidth;


        headingSquareSize =
            cssNumber(
                "--campaign-heading-square-size"
            ) ||
            7;


        headingSideGap =
            cssNumber(
                "--campaign-heading-square-gap"
            ) ||
            8;


        headingLineTitleGap =
            cssNumber(
                "--campaign-heading-line-title-gap"
            ) ||
            8;


        headingLineButtonGap =
            cssNumber(
                "--campaign-heading-line-button-gap"
            ) ||
            8;


        headingLineStickyStart =
            null;


        /* VIEW CAMPAIGN */

        activeViewLabelWidth =
            activeViewLabel.offsetWidth;


        activeViewSquareSize =
            cssNumber(
                "--campaign-view-square-size"
            ) ||
            7;


        activeViewSquareSideGap =
            cssNumber(
                "--campaign-view-square-side-gap"
            ) ||
            8;


        /*
         * TRUE VERTICAL GEOMETRY — NO GUESSED PIXEL VALUE.
         *
         * START:
         * the TOP edge of the square sits exactly on the line.
         *
         * FINAL:
         * the CENTER of the square sits exactly on the center
         * of the VIEW CAMPAIGN text row.
         */
        const activeViewHeight =
            activeView.offsetHeight;


        const activeViewCenterY =
            activeViewHeight /
            2;


        const activeViewLineY =
            activeViewLine.offsetTop;


        const activeViewLabelCenterY =
            activeViewLabel.offsetTop +
            (
                activeViewLabel.offsetHeight /
                2
            );


        activeViewSquareStartY =
            activeViewLineY -
            activeViewCenterY +
            (
                activeViewSquareSize /
                2
            );


        activeViewSquareFinalY =
            activeViewLabelCenterY -
            activeViewCenterY;


        activeViewFinalLineWidth =
            activeViewLabelWidth +
            activeViewSquareSideGap +
            activeViewSquareSize;


        /*
         * Keep the whole finished visual area hoverable, including
         * the extra 8px hover travel.
         */
        activeView.style.setProperty(
            "--campaign-view-hit-width",
            (
                activeViewFinalLineWidth +
                8
            ) +
            "px"
        );


        setProgressPosition(
            activeIndex,
            0
        );


        updateScroll();

    }


    /* =====================================================
       MOBILE — TRUE SECTION PIN
       The whole 100VH stage enters, locks to the viewport,
       the SELECTED CAMPAIGNS line builds during stickyDistance,
       and only when that distance ends does the stage release.
       Desktop never enters this branch.
    ===================================================== */

    function updateMobilePin() {

        if (!mobileLayout.matches) {

            stage.classList.remove(
                "campaign-selected-mobile-pin"
            );

            stage.style.transform = "";

            return;
        }


        const shellRect =
            shell.getBoundingClientRect();


        const viewportHeight =
            getMobileViewportHeight();


        let stageY =
            0;


        /*
         * BEFORE PIN:
         * the complete 100vh section travels naturally into view.
         */
        if (shellRect.top > 0) {

            stageY =
                shellRect.top;

        }

        /*
         * AFTER THE TOP LINE HAS COMPLETED ITS STICKY RANGE:
         * release the complete section and let it leave naturally.
         */
        else if (
            shellRect.bottom <
            viewportHeight
        ) {

            stageY =
                shellRect.bottom -
                viewportHeight;

        }


        stage.classList.add(
            "campaign-selected-mobile-pin"
        );


        stage.style.transform =
            "translate3d(0," +
            stageY.toFixed(2) +
            "px,0)";

    }


    /* =====================================================
       SCROLL
    ===================================================== */

    function updateScroll() {

        updateMobilePin();


        const scrollY =
            window.scrollY ||
            window.pageYOffset;


        const stageRect =
            stage.getBoundingClientRect();


        const stickyProgress =
            clamp(
                (
                    scrollY -
                    stickyStart
                ) /
                stickyDistance,
                0,
                1
            );


        /* =================================================
           SECTION / GALLERY ENTRY PROGRESS
        ================================================= */

        const galleryEntryProgress =
            clamp(
                1 -
                (
                    stageRect.top /
                    (
                        mobileLayout.matches
                            ? getMobileViewportHeight()
                            : window.innerHeight
                    )
                ),
                0,
                1
            );


        /* =================================================
           FIRST IMAGE ENTRANCE
        ================================================= */

        if (
            !galleryRunning &&
            activeIndex === 0
        ) {

            const reveal =
                smooth(
                    galleryEntryProgress
                );


            const hiddenLeft =
                (
                    1 -
                    reveal
                ) *
                100;


            const clipValue =
                "inset(0 0 0 " +
                hiddenLeft.toFixed(3) +
                "%)";


            cards[0].style.clipPath =
                clipValue;


            cards[0].style.webkitClipPath =
                clipValue;

        }


        /* =================================================
           START / STOP TIMED GALLERY
        ================================================= */

        const stickyEnd =
            stickyStart +
            stickyDistance;


        const isInsideStickyRange =
            scrollY >= stickyStart &&
            scrollY < stickyEnd;


        if (isInsideStickyRange) {

            galleryExitRequested =
                false;


            if (!galleryRunning) {

                motionSession += 1;


                cards[activeIndex].style.clipPath =
                    "inset(0 0 0 0%)";


                cards[activeIndex].style.webkitClipPath =
                    "inset(0 0 0 0%)";


                startGallery();

            }

        }

        else {

            requestStopAtFullState();

        }


        /* TOP TEXT STOP */

        const transitionBaseTop =
            transition.offsetTop;


        const transitionStopTop =
            cssNumber(
                "--campaign-transition-stop-top"
            );


        let transitionPinY = 0;


        if (
            stageRect.top > 0
        ) {

            const naturalTransitionTop =
                stageRect.top +
                transitionBaseTop;


            transitionPinY =
                Math.max(
                    0,
                    transitionStopTop -
                    naturalTransitionTop
                );

        }

        else {

            transitionPinY =
                Math.max(
                    0,
                    transitionStopTop -
                    transitionBaseTop
                );

        }


        transition.style.transform =
            "translate3d(0," +
            transitionPinY.toFixed(2) +
            "px,0)";


        /* GALLERY STAYS IN PLACE */

        gallery.style.transform =
            "translate3d(0,0,0)";


        /* =================================================
           VIEW CAMPAIGN — BUTTON BUILD

           EXACT ORDER FROM THE ROSTER SWITCH BUTTONS:

           01. SQUARE STARTS BELOW-LEFT.
           02. SQUARE TRAVELS UNDER THE LABEL WHILE LINE OPENS.
           03. SQUARE RISES TO LABEL HEIGHT.
           04. LINE FINISHES ITS LAST PART.

           This is tied only to the section's natural entry.
           Gallery timing and every other sticky behavior stay untouched.
        ================================================= */

        const activeViewRect =
            activeView.getBoundingClientRect();


        /*
         * VIEW CAMPAIGN TIMING
         *
         * START:
         * a little earlier while the button is already entering the viewport.
         *
         * END:
         * exactly when the section reaches its sticky start.
         *
         * This keeps the same button motion itself and changes only
         * the scroll range over which that motion is played.
         */
        const viewButtonStartScroll =
            stickyStart -
            (
                (
                    mobileLayout.matches
                        ? getMobileViewportHeight()
                        : window.innerHeight
                ) *
                0.60
            );


        const viewButtonEndScroll =
            stickyStart;


        const viewButtonProgress =
            clamp(
                (
                    scrollY -
                    viewButtonStartScroll
                ) /
                Math.max(
                    1,
                    viewButtonEndScroll -
                    viewButtonStartScroll
                ),
                0,
                1
            );


        const viewSquareUnderProgress =
            phase(
                viewButtonProgress,
                0.00,
                0.58
            );


        const viewSquareRiseProgress =
            phase(
                viewButtonProgress,
                0.58,
                0.86
            );


        const viewLineFinishProgress =
            phase(
                viewButtonProgress,
                0.58,
                1.00
            );


        const viewFinalSquareX =
            activeViewLabelWidth +
            activeViewSquareSideGap;


        const viewSquareX =
            viewFinalSquareX *
            viewSquareUnderProgress;


        const viewSquareY =
            activeViewSquareStartY +
            (
                activeViewSquareFinalY -
                activeViewSquareStartY
            ) *
            viewSquareRiseProgress;


        activeViewSquare.style.transform =
            "translate3d(" +
            viewSquareX.toFixed(2) +
            "px," +
            viewSquareY.toFixed(2) +
            "px,0) " +
            "translateY(-50%)";


        /*
         * KEEP THE REQUESTED GAP AT THE START OF THE BUILD,
         * BUT PRESERVE THE ORIGINAL FULL FINAL LINE LENGTH.
         *
         * FIRST PHASE:
         * the line follows behind the travelling square with a gap.
         *
         * FINAL PHASE:
         * once the square starts rising, the line continues opening
         * to the exact original final width, so the finished button
         * remains unchanged.
         */
        const viewGapPhaseWidth =
            Math.max(
                0,
                viewSquareX -
                activeViewSquareSideGap
            );


        const viewFinalLineWidth =
            activeViewFinalLineWidth;


        const viewCurrentLineWidth =
            viewGapPhaseWidth +
            (
                viewFinalLineWidth -
                viewGapPhaseWidth
            ) *
            viewLineFinishProgress;


        activeViewLine.style.width =
            Math.max(
                0,
                viewCurrentLineWidth
            ).toFixed(2) +
            "px";


        /* TOP LINE BUILD */

        const lineStart =
            headingTitleWidth +
            headingLineTitleGap;


        const initialLineWidth =
            Math.max(
                0,
                cssNumber(
                    "--campaign-heading-line-initial-width"
                )
            );


        const finalSquareLeft =
            wideScreenLayout.matches
                ? Math.max(
                    0,
                    document.documentElement.clientWidth -
                    heading.getBoundingClientRect().left -
                    20 -
                    headingSquareSize
                )
                : headingWidth -
                  headingSquareSize;


        const finalButtonX =
            finalSquareLeft -
            headingSideGap -
            headingViewWidth;


        const finalLineEnd =
            finalButtonX -
            headingLineButtonGap;


        const maxLineWidth =
            Math.max(
                initialLineWidth,
                finalLineEnd -
                lineStart
            );


        const viewStartX =
            lineStart +
            initialLineWidth +
            headingLineButtonGap;


        if (
            headingLineStickyStart === null &&
            stickyProgress > 0
        ) {

            headingLineStickyStart =
                stickyProgress;

        }


        const lineProgress =
            headingLineStickyStart === null
                ?
                0
                :
                phase(
                    stickyProgress,
                    headingLineStickyStart,
                    1
                );


        const currentLineWidth =
            initialLineWidth +
            (
                maxLineWidth -
                initialLineWidth
            ) *
            lineProgress;


        const currentLineEnd =
            lineStart +
            currentLineWidth;


        const pushedButtonX =
            currentLineEnd +
            headingLineButtonGap;


        const buttonX =
            Math.min(
                finalButtonX,
                Math.max(
                    viewStartX,
                    pushedButtonX
                )
            );


        headingLine.style.left =
            lineStart +
            "px";


        headingLine.style.width =
            currentLineWidth +
            "px";


        headingView.style.transform =
            "translate3d(" +
            buttonX.toFixed(2) +
            "px,0,0)";


        const squareX =
            buttonX +
            headingViewWidth +
            headingSideGap;


        headingSquare.style.left =
            Math.min(
                finalSquareLeft,
                squareX
            ).toFixed(2) +
            "px";


        if (wideScreenLayout.matches) {

            /* WIDE SCREEN ONLY — same approved square alignment as reference */
            headingSquare.style.top = "0px";
            headingSquare.style.transform = "none";

        }
        else {

            headingSquare.style.top = "";
            headingSquare.style.transform = "translateY(-50%)";

        }

    }


    /* =====================================================
       RESET TO FIRST IMAGE WHEN SECTION IS FULLY OFF-SCREEN
    ===================================================== */

    let sectionWasVisible =
        false;


    function resetGalleryToFirstImage() {

        stopAllMotion();


        galleryRunning =
            false;

        gallerySession += 1;

        galleryPaused =
            false;

        galleryExitRequested =
            false;


        activeIndex =
            0;


        cards.forEach(
            function (card, index) {

                card.classList.toggle(
                    "is-active",
                    index === 0
                );


                card.style.clipPath =
                    "inset(0 0 0 100%)";


                card.style.webkitClipPath =
                    "inset(0 0 0 100%)";

            }
        );


        updateInfo(
            0
        );


        if (activeInfo) {

            activeInfo.style.opacity =
                "1";

        }


        if (activeTop) {

            activeTop.style.opacity =
                "1";

        }


        if (activeMiddle) {

            activeMiddle.style.opacity =
                "1";

        }


        setProgressPosition(
            0,
            0
        );

    }


    function updateSectionVisibility() {

        const sectionRect =
            section.getBoundingClientRect();


        const isVisible =
            sectionRect.bottom > 0 &&
            sectionRect.top <
            (
                mobileLayout.matches
                    ? getMobileViewportHeight()
                    : window.innerHeight
            );


        if (
            sectionWasVisible &&
            !isVisible
        ) {

            resetGalleryToFirstImage();

        }


        sectionWasVisible =
            isVisible;

    }


    /* =====================================================
       SCROLL RAF
    ===================================================== */

    let ticking = false;


    window.addEventListener(
        "scroll",
        function () {

            if (ticking) {
                return;
            }


            ticking =
                true;


            requestAnimationFrame(
                function () {

                    updateScroll();

                    updateSectionVisibility();


                    ticking =
                        false;

                }
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    let resizeTimer =
        null;


    window.addEventListener(
        "resize",
        function () {

            if (mobileLayout.matches) {

                const widthChanged =
                    !mobileViewportWidth ||
                    Math.abs(
                        window.innerWidth -
                        mobileViewportWidth
                    ) > 2;


                /*
                 * Mobile browser chrome changes only the viewport height.
                 * Do not re-measure the whole sticky timeline for that.
                 */
                if (!widthChanged) {

                    updateScroll();

                    return;

                }


                mobileViewportHeight =
                    window.innerHeight;


                mobileViewportWidth =
                    window.innerWidth;

            }


            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        measure();

                    },
                    80
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       START
    ===================================================== */

    if (mobileLayout.matches) {

        mobileViewportHeight =
            window.innerHeight;


        mobileViewportWidth =
            window.innerWidth;

    }


    requestAnimationFrame(
        function () {

            requestAnimationFrame(
                function () {

                    measure();

                    updateSectionVisibility();

                }
            );

        }
    );


})();;
/* =========================================================
   OFFFORM — SELECTED CAMPAIGNS IMAGE WAVE
   SAME EFFECT AS HERO REFERENCE
========================================================= */

(function () {


    const section =
        document.querySelector(
            ".campaign-selected"
        );


    if (!section) {
        return;
    }


    const desktop =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        );


    if (!desktop.matches) {
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        reducedMotion.matches &&
        window.innerWidth <= 767
    ) {
        return;
    }


    const DISTORTION_STRENGTH = 4.5;
    const WAVE_FREQUENCY = 0.045;
    const WAVE_SPEED = 0.13;
    const ORGANIC_AMOUNT = 0.65;
    const FADE_SPEED = 0.14;
    const MOVE_TIMEOUT = 70;


    const blocks =
        Array.from(
            section.querySelectorAll(
                ".campaign-selected-media"
            )
        );


    blocks.forEach(
        function (block) {


            const image =
                block.querySelector(
                    "img"
                );


            if (!image) {
                return;
            }


            let canvas =
                block.querySelector(
                    ".campaign-selected-wave"
                );


            if (!canvas) {

                canvas =
                    document.createElement(
                        "canvas"
                    );


                canvas.className =
                    "campaign-selected-wave";


                canvas.setAttribute(
                    "aria-hidden",
                    "true"
                );


                block.appendChild(
                    canvas
                );

            }


            const context =
                canvas.getContext(
                    "2d"
                );


            if (!context) {
                return;
            }


            const sourceCanvas =
                document.createElement(
                    "canvas"
                );


            const sourceContext =
                sourceCanvas.getContext(
                    "2d"
                );


            if (!sourceContext) {
                return;
            }


            let mouseY = null;

            let previousX = null;
            let previousY = null;

            let isInside = false;
            let isMoving = false;

            let movementAmount = 0;

            let wavePhase = 0;

            let moveTimer = null;


            function resizeCanvas() {

                const rect =
                    block.getBoundingClientRect();


                const width =
                    Math.max(
                        1,
                        Math.round(
                            rect.width
                        )
                    );


                const height =
                    Math.max(
                        1,
                        Math.round(
                            rect.height
                        )
                    );


                if (
                    canvas.width !== width ||
                    canvas.height !== height
                ) {

                    canvas.width =
                        width;

                    canvas.height =
                        height;

                }


                if (
                    sourceCanvas.width !== width ||
                    sourceCanvas.height !== height
                ) {

                    sourceCanvas.width =
                        width;

                    sourceCanvas.height =
                        height;

                }

            }


            function valueToFactor(value) {

                if (!value) {
                    return 0.5;
                }


                const normalized =
                    value
                        .trim()
                        .toLowerCase();


                if (
                    normalized === "left" ||
                    normalized === "top"
                ) {
                    return 0;
                }


                if (
                    normalized === "right" ||
                    normalized === "bottom"
                ) {
                    return 1;
                }


                if (
                    normalized === "center"
                ) {
                    return 0.5;
                }


                if (
                    normalized.endsWith("%")
                ) {

                    const number =
                        parseFloat(
                            normalized
                        );


                    if (
                        !Number.isNaN(number)
                    ) {

                        return Math.max(
                            0,
                            Math.min(
                                1,
                                number / 100
                            )
                        );

                    }

                }


                return 0.5;

            }


            function getObjectPosition() {

                const style =
                    getComputedStyle(
                        image
                    );


                const values =
                    (
                        style.objectPosition ||
                        "50% 50%"
                    )
                        .trim()
                        .split(/\s+/);


                let x =
                    values[0] ||
                    "50%";


                let y =
                    values[1] ||
                    "50%";


                if (
                    values.length === 1
                ) {

                    if (
                        x === "top" ||
                        x === "bottom"
                    ) {

                        y = x;
                        x = "center";

                    }

                    else {

                        y = "center";

                    }

                }


                return {

                    x:
                        valueToFactor(x),

                    y:
                        valueToFactor(y)

                };

            }


            function captureImage() {

                resizeCanvas();


                const width =
                    sourceCanvas.width;


                const height =
                    sourceCanvas.height;


                sourceContext.clearRect(
                    0,
                    0,
                    width,
                    height
                );


                if (
                    !image.complete ||
                    image.naturalWidth <= 0 ||
                    image.naturalHeight <= 0
                ) {

                    return false;

                }


                const naturalWidth =
                    image.naturalWidth;


                const naturalHeight =
                    image.naturalHeight;


                const scale =
                    Math.max(

                        width /
                        naturalWidth,

                        height /
                        naturalHeight

                    );


                const sourceWidth =
                    width /
                    scale;


                const sourceHeight =
                    height /
                    scale;


                const position =
                    getObjectPosition();


                const sourceX =
                    (
                        naturalWidth -
                        sourceWidth
                    ) *
                    position.x;


                const sourceY =
                    (
                        naturalHeight -
                        sourceHeight
                    ) *
                    position.y;


                try {

                    sourceContext.drawImage(

                        image,

                        sourceX,
                        sourceY,

                        sourceWidth,
                        sourceHeight,

                        0,
                        0,

                        width,
                        height

                    );


                    return true;

                }

                catch (error) {

                    return false;

                }

            }


            function drawWave() {

                const width =
                    canvas.width;


                const height =
                    canvas.height;


                if (
                    width <= 0 ||
                    height <= 0
                ) {
                    return;
                }


                const stripHeight =
                    2;


                const overlap =
                    1;


                for (
                    let y = 0;
                    y < height;
                    y += stripHeight
                ) {


                    const mainWave =
                        Math.sin(
                            y *
                            WAVE_FREQUENCY +
                            wavePhase
                        );


                    const organicWave =
                        Math.sin(
                            y * 0.021 -
                            wavePhase * 1.7
                        ) *
                        ORGANIC_AMOUNT;


                    const mouseInfluence =
                        mouseY !== null
                            ?
                            Math.sin(
                                (
                                    y -
                                    mouseY
                                ) *
                                0.018 +
                                wavePhase *
                                0.65
                            ) *
                            0.35
                            :
                            0;


                    const displacement =
                        (
                            mainWave +
                            organicWave +
                            mouseInfluence
                        ) *
                        DISTORTION_STRENGTH *
                        movementAmount;


                    const drawHeight =
                        Math.min(
                            stripHeight +
                            overlap,
                            height -
                            y
                        );


                    context.drawImage(
                        sourceCanvas,
                        0,
                        y,
                        width,
                        drawHeight,
                        displacement,
                        y,
                        width,
                        drawHeight
                    );


                    if (
                        displacement > 0
                    ) {

                        context.drawImage(
                            sourceCanvas,
                            0,
                            y,
                            1,
                            drawHeight,
                            0,
                            y,
                            displacement + 1,
                            drawHeight
                        );

                    }


                    if (
                        displacement < 0
                    ) {

                        const gap =
                            Math.abs(
                                displacement
                            );


                        context.drawImage(
                            sourceCanvas,
                            Math.max(
                                0,
                                width - 1
                            ),
                            y,
                            1,
                            drawHeight,
                            width -
                            gap -
                            1,
                            y,
                            gap + 1,
                            drawHeight
                        );

                    }

                }

            }


            function clearMoveTimer() {

                if (
                    moveTimer !== null
                ) {

                    clearTimeout(
                        moveTimer
                    );


                    moveTimer =
                        null;

                }

            }


            function registerMovement() {

                isMoving =
                    true;


                clearMoveTimer();


                moveTimer =
                    setTimeout(
                        function () {

                            moveTimer =
                                null;

                            isMoving =
                                false;

                        },
                        MOVE_TIMEOUT
                    );

            }


            block.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        block
                            .getBoundingClientRect();


                    const localX =
                        event.clientX -
                        rect.left;


                    const localY =
                        event.clientY -
                        rect.top;


                    mouseY =
                        localY;


                    if (
                        previousX !== null &&
                        previousY !== null
                    ) {

                        const dx =
                            localX -
                            previousX;


                        const dy =
                            localY -
                            previousY;


                        const distance =
                            Math.hypot(
                                dx,
                                dy
                            );


                        if (
                            distance > 0.2
                        ) {

                            registerMovement();

                        }

                    }

                    else {

                        registerMovement();

                    }


                    previousX =
                        localX;


                    previousY =
                        localY;

                },
                {
                    passive: true
                }
            );


            block.addEventListener(
                "mouseenter",
                function () {

                    isInside =
                        true;


                    previousX =
                        null;


                    previousY =
                        null;


                    movementAmount =
                        0;


                    resizeCanvas();

                }
            );


            block.addEventListener(
                "mouseleave",
                function () {

                    isInside =
                        false;


                    isMoving =
                        false;


                    previousX =
                        null;


                    previousY =
                        null;


                    mouseY =
                        null;


                    clearMoveTimer();

                }
            );


            window.addEventListener(
                "resize",
                resizeCanvas,
                {
                    passive: true
                }
            );


            const resizeObserver =
                typeof ResizeObserver !== "undefined"
                    ?
                    new ResizeObserver(
                        function () {

                            resizeCanvas();

                        }
                    )
                    :
                    null;


            if (resizeObserver) {

                resizeObserver.observe(
                    block
                );

            }


            function animate() {

                requestAnimationFrame(
                    animate
                );


                if (
                    !isInside &&
                    movementAmount <= 0.001
                ) {

                    canvas.style.opacity =
                        "0";

                    return;

                }


                if (
                    isMoving
                ) {

                    movementAmount +=
                        (
                            1 -
                            movementAmount
                        ) *
                        0.45;

                }

                else {

                    movementAmount *=
                        (
                            1 -
                            FADE_SPEED
                        );


                    if (
                        movementAmount < 0.01
                    ) {

                        movementAmount =
                            0;

                    }

                }


                if (
                    movementAmount <= 0
                ) {

                    canvas.style.opacity =
                        "0";


                    context.clearRect(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );


                    return;

                }


                if (
                    !captureImage()
                ) {

                    canvas.style.opacity =
                        "0";

                    return;

                }


                context.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );


                wavePhase +=
                    WAVE_SPEED;


                drawWave();


                canvas.style.opacity =
                    "1";

            }


            if (image.complete) {

                resizeCanvas();

            }

            else {

                image.addEventListener(
                    "load",
                    resizeCanvas,
                    {
                        once: true
                    }
                );

            }


            requestAnimationFrame(
                animate
            );


        }
    );


})();;
(function () {

    const section =
        document.querySelector(".offform-final");

    if (!section) return;


    const mobileLayout =
        window.matchMedia(
            "(max-width: 1024px)"
        );

    const wideScreenLayout =
        window.matchMedia(
            "(min-width: 1500px)"
        );


    /*
     * MOBILE CONTACT ONLY:
     * - MOVE THE EXISTING COMPANY FIELD UNDER EMAIL
     * - SHOW ONLY "COMPANY"
     * - KEEP DESKTOP HTML / LAYOUT UNCHANGED
     */
    const contactFieldGroups =
        Array.from(
            section.querySelectorAll(
                ".offform-final-contact-fields"
            )
        );

    const mobileNameEmailGroup =
        contactFieldGroups[0] || null;

    const desktopAgencyProjectGroup =
        contactFieldGroups[1] || null;

    const existingCompanyField =
        desktopAgencyProjectGroup
            ? desktopAgencyProjectGroup.querySelector(
                'input[name="company"]'
              )?.closest(
                ".offform-final-contact-field"
              )
            : null;

    const existingCompanyLabel =
        existingCompanyField
            ? existingCompanyField.querySelector("span")
            : null;

    const originalCompanyLabel =
        existingCompanyLabel
            ? existingCompanyLabel.textContent
            : "AGENCY / COMPANY";


    function syncMobileContactFields() {

        if (
            !mobileNameEmailGroup ||
            !desktopAgencyProjectGroup ||
            !existingCompanyField ||
            !existingCompanyLabel
        ) {
            return;
        }

        if (mobileLayout.matches) {

            if (
                existingCompanyField.parentElement !==
                mobileNameEmailGroup
            ) {
                mobileNameEmailGroup.appendChild(
                    existingCompanyField
                );
            }

            existingCompanyLabel.textContent =
                "COMPANY";
        }

        else {

            if (
                existingCompanyField.parentElement !==
                desktopAgencyProjectGroup
            ) {
                desktopAgencyProjectGroup.insertBefore(
                    existingCompanyField,
                    desktopAgencyProjectGroup.firstElementChild
                );
            }

            existingCompanyLabel.textContent =
                originalCompanyLabel;
        }
    }


    syncMobileContactFields();

    if (mobileLayout.addEventListener) {
        mobileLayout.addEventListener(
            "change",
            syncMobileContactFields
        );
    }
    else if (mobileLayout.addListener) {
        mobileLayout.addListener(
            syncMobileContactFields
        );
    }


    const stage =
        section.querySelector(".offform-final-stage");

    const about =
        section.querySelector(".offform-final-about");

    const heading =
        section.querySelector(".offform-final-heading");

    const headingTitle =
        section.querySelector(".offform-final-heading-title");

    const headingLine =
        section.querySelector(".offform-final-heading-line");

    const headingViewAll =
        section.querySelector(".offform-final-heading-view-all");

    const headingSquare =
        section.querySelector(".offform-final-heading-square");


    const contactHeading =
        section.querySelector(".offform-final-contact-heading");

    const contactHeadingTitle =
        section.querySelector(".offform-final-contact-heading-title");

    const contactHeadingLine =
        section.querySelector(".offform-final-contact-heading-line");

    const contactHeadingViewAll =
        section.querySelector(".offform-final-contact-heading-view-all");

    const contactHeadingSquare =
        section.querySelector(".offform-final-contact-heading-square");


    const roster =
        section.querySelector(
            ".offform-final-roster"
        );


    const rosterRows =
        Array.from(
            section.querySelectorAll(
                ".offform-final-roster-row"
            )
        );


    let mobilePreview = null;
    let mobilePreviewImage = null;
    let mobilePreviewRow = null;


    if (mobileLayout.matches) {

        mobilePreview =
            document.createElement(
                "div"
            );

        mobilePreview.className =
            "offform-final-mobile-preview";

        mobilePreview.setAttribute(
            "aria-hidden",
            "true"
        );


        mobilePreviewImage =
            document.createElement(
                "img"
            );

        mobilePreviewImage.alt = "";
        mobilePreviewImage.draggable = false;


        mobilePreview.appendChild(
            mobilePreviewImage
        );

        stage.appendChild(
            mobilePreview
        );
    }


    const infoImage =
        section.querySelector(
            ".offform-final-info-image"
        );

    const infoTalent =
        section.querySelector(
            ".offform-final-info-talent"
        );

    const infoProject =
        section.querySelector(
            ".offform-final-info-project"
        );

    const infoYear =
        section.querySelector(
            ".offform-final-info-year"
        );


    if (
        !stage ||
        !about ||
        !heading ||
        !headingTitle ||
        !headingLine ||
        !headingViewAll ||
        !headingSquare ||
        !contactHeading ||
        !contactHeadingTitle ||
        !contactHeadingLine ||
        !contactHeadingViewAll ||
        !contactHeadingSquare
    ) {
        return;
    }



    /* =====================================================
       HELPERS
    ===================================================== */

    const clamp = (value, min, max) => {

        return Math.max(
            min,
            Math.min(max, value)
        );

    };


    const smooth = value => {

        value =
            clamp(
                value,
                0,
                1
            );

        return (
            value *
            value *
            (3 - 2 * value)
        );

    };


    function cssNumber(name) {

        return (
            parseFloat(
                getComputedStyle(section)
                    .getPropertyValue(name)
            ) ||
            0
        );

    }


    function cssPixels(name) {

        const value =
            getComputedStyle(section)
                .getPropertyValue(name)
                .trim();


        if (value.endsWith("vh")) {

            const viewportHeight =
                mobileLayout.matches
                    ? getMobileViewportHeight()
                    : window.innerHeight;

            return (
                parseFloat(value) *
                viewportHeight /
                100
            );

        }


        return (
            parseFloat(value) ||
            0
        );

    }



    /* =====================================================
       ACTIVE PARTNER

       ONLY:
       - IMAGE
       - TALENT VALUE
       - PROJECT VALUE
       - YEAR VALUE

       CHANGE.

       DESCRIPTION + LABELS NEVER CHANGE.
    ===================================================== */

    /* =====================================================
       PRELOAD PARTNER IMAGES

       THIS MAKES FAST HOVERING FEEL CONTINUOUS:
       IMAGES ARE REQUESTED BEFORE THE POINTER REACHES THEM.
    ===================================================== */

    rosterRows.forEach(
        function (row) {

            const src =
                row.dataset.image ||
                "";

            if (!src) return;

            const preload =
                new Image();

            preload.src =
                src;

        }
    );


    /* =====================================================
       ACTIVE PARTNER — IMMEDIATE HOVER UPDATE

       NO TIMER.
       NO 220MS DELAY.
       THE IMAGE + VALUES CHANGE AS SOON AS THE POINTER
       ENTERS A ROSTER ROW.
    ===================================================== */

    function updatePartner(index) {

        const row =
            rosterRows[index];


        if (
            !row ||
            !infoImage ||
            !infoTalent ||
            !infoProject ||
            !infoYear
        ) {
            return;
        }


        const nextImage =
            row.dataset.image ||
            "";


        if (
            nextImage &&
            infoImage.getAttribute("src") !== nextImage
        ) {

            infoImage.src =
                nextImage;

        }


        infoTalent.textContent =
            row.dataset.talent ||
            "";


        infoProject.textContent =
            row.dataset.project ||
            "";


        infoYear.textContent =
            row.dataset.year ||
            "";


        /*
         * ACCESSIBILITY ONLY:
         * Keep the changing partner image description synchronized
         * with the existing partner / project / talent metadata.
         * No visual or interaction behavior changes.
         */
        infoImage.alt =
            (row.dataset.partner || "") +
            " — " +
            (row.dataset.project || "") +
            ", featuring " +
            (row.dataset.talent || "");

    }



    /* =====================================================
       ACCESSIBILITY — PARTNER ROW KEYBOARD SUPPORT

       Adds keyboard access to the EXISTING row behavior only.
       No mouse / touch / mobile / wide-screen logic is replaced.
    ===================================================== */

    rosterRows.forEach(
        function (row, index) {

            row.addEventListener(
                "focus",
                function () {
                    updatePartner(index);
                }
            );


            row.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key !== "Enter" &&
                        event.key !== " "
                    ) {
                        return;
                    }

                    event.preventDefault();

                    updatePartner(index);
                }
            );

        }
    );


    /* =====================================================
       VALUES
    ===================================================== */

    let stickyStart = 0;

    let stickyDistance = 1;

    let headingTitleWidth = 0;

    let headingViewAllWidth = 0;

    let headingWidth = 0;

    let headingSquareSize = 7;

    let headingSideGap = 8;

    let headingLineTitleGap = 8;

    let headingLineViewGap = 8;

    let contactTitleWidth = 0;
    let contactViewAllWidth = 0;
    let contactHeadingWidth = 0;


    let mobileViewportHeight =
        0;

    let mobileViewportWidth =
        0;


    function getMobileViewportHeight() {

        if (!mobileLayout.matches) {
            return window.innerHeight;
        }

        if (!mobileViewportHeight) {
            mobileViewportHeight =
                window.innerHeight;
        }

        return mobileViewportHeight;
    }



    /* =====================================================
       MEASURE
    ===================================================== */

    function measure() {

        const scrollY =
            window.scrollY ||
            window.pageYOffset;


        stickyStart =
            section
                .getBoundingClientRect()
                .top +
            scrollY;


        stickyDistance =
            Math.max(
                1,
                cssPixels(
                    "--sticky-distance"
                )
            );


        headingTitleWidth =
            headingTitle.offsetWidth;

        headingViewAllWidth =
            headingViewAll.offsetWidth;

        headingWidth =
            heading.offsetWidth;

        contactTitleWidth =
            contactHeadingTitle.offsetWidth;

        contactViewAllWidth =
            contactHeadingViewAll.offsetWidth;

        contactHeadingWidth =
            contactHeading.offsetWidth;


        headingSquareSize =
            cssNumber(
                "--final-heading-square-size"
            ) ||
            7;


        headingSideGap =
            cssNumber(
                "--final-heading-square-side-gap"
            );


        headingLineTitleGap =
            cssNumber(
                "--final-heading-line-title-gap"
            );


        headingLineViewGap =
            cssNumber(
                "--final-heading-line-view-gap"
            );


        updateScroll();

    }



    /* =====================================================
       MOBILE — TRUE 100VH PIN
    ===================================================== */

    function updateMobilePin() {

        if (!mobileLayout.matches) {

            stage.classList.remove(
                "offform-final-mobile-pin"
            );

            stage.style.transform = "";

            return;
        }


        const sectionRect =
            section.getBoundingClientRect();

        const viewportHeight =
            getMobileViewportHeight();

        let stageY = 0;


        if (sectionRect.top > 0) {

            stageY =
                sectionRect.top;
        }

        else if (
            sectionRect.bottom <
            viewportHeight
        ) {

            stageY =
                sectionRect.bottom -
                viewportHeight;
        }


        stage.classList.add(
            "offform-final-mobile-pin"
        );

        stage.style.transform =
            "translate3d(0," +
            stageY.toFixed(2) +
            "px,0)";
    }


    function positionMobilePreview() {

        if (
            !mobileLayout.matches ||
            !mobilePreview ||
            !roster
        ) {
            return;
        }


        const stageRect =
            stage.getBoundingClientRect();

        const rosterRect =
            roster.getBoundingClientRect();

        const centerY =
            (
                rosterRect.top -
                stageRect.top
            ) +
            (
                rosterRect.height /
                2
            );


        mobilePreview.style.top =
            centerY.toFixed(2) +
            "px";
    }


    /* =====================================================
       SCROLL
    ===================================================== */

    function updateScroll() {

        updateMobilePin();


        const scrollY =
            window.scrollY ||
            window.pageYOffset;


        const stickyProgress =
            clamp(
                (
                    scrollY -
                    stickyStart
                ) /
                stickyDistance,
                0,
                1
            );


        /*
         * MOBILE ONLY — WHOLE CONTACT BLOCK EXIT
         *
         * Resting state: exactly the original position, with the
         * existing 50px gap below the contact.
         *
         * Exit state: as the section leaves toward the next section,
         * the complete contact block moves down by 50px, closing that
         * visible bottom gap.
         */
        if (mobileLayout.matches) {

            const sectionRectForExit =
                section.getBoundingClientRect();

            const viewportHeightForExit =
                getMobileViewportHeight();

            const exitDistance =
                Math.max(
                    1,
                    viewportHeightForExit * 0.18
                );

            const exitProgress =
                clamp(
                    (
                        viewportHeightForExit -
                        sectionRectForExit.bottom
                    ) /
                    exitDistance,
                    0,
                    1
                );

            const contactExitDistance =
                window.matchMedia(
                    "(min-width: 768px) and (max-width: 1024px)"
                ).matches
                    ? 100
                    : 50;

            const contactExitY =
                contactExitDistance *
                smooth(exitProgress);

            section.style.setProperty(
                "--final-mobile-contact-exit-y",
                contactExitY.toFixed(2) + "px"
            );
        }

        else {

            section.style.removeProperty(
                "--final-mobile-contact-exit-y"
            );
        }



        /* =================================================
           VERTICAL POSITION
           SAME ENTRY / PIN / EXIT BEHAVIOR AS THE
           ABOUT + SELECTED TALENT REFERENCE

           - ENTERS NATURALLY WITH THE SECTION
           - STOPS SMOOTHLY AT --final-stop-top
           - STAYS THERE THROUGH THE STICKY RANGE
           - LEAVES NATURALLY WITH THE STICKY STAGE
        ================================================= */

        const stageRect =
            stage.getBoundingClientRect();

        const aboutBaseTop =
            about.offsetTop;

        const aboutStopTop =
            cssNumber(
                "--final-stop-top"
            );

        let aboutPinY = 0;

        if (
            stageRect.top > 0
        ) {

            const naturalAboutTop =
                stageRect.top +
                aboutBaseTop;

            aboutPinY =
                Math.max(
                    0,
                    aboutStopTop -
                    naturalAboutTop
                );

        }

        else {

            aboutPinY =
                Math.max(
                    0,
                    aboutStopTop -
                    aboutBaseTop
                );

        }

        if (mobileLayout.matches) {

            about.style.transform =
                "translate3d(0,0,0)";
        }

        else {

            about.style.transform =
                "translate3d(0," +
                aboutPinY.toFixed(2) +
                "px,0)";
        }




        /* =================================================
           SELECTED / PARTNERS LINE BUILD
        ================================================= */

        const lineStart =
            headingTitleWidth +
            headingLineTitleGap;


        const initialLineWidth =
            Math.max(
                0,
                cssNumber(
                    "--final-heading-line-initial-width"
                )
            );


        const finalSquareLeft =
            wideScreenLayout.matches
                ? Math.max(
                    0,
                    document.documentElement.clientWidth -
                    heading.getBoundingClientRect().left -
                    20 -
                    headingSquareSize
                )
                : Math.max(
                    0,
                    headingWidth -
                    headingSquareSize
                );


        const finalViewAllX =
            finalSquareLeft -
            headingSideGap -
            headingViewAllWidth;


        const finalLineEnd =
            finalViewAllX -
            headingLineViewGap;


        const maxLineWidth =
            Math.max(
                initialLineWidth,
                finalLineEnd -
                lineStart
            );


        const viewAllStartX =
            lineStart +
            initialLineWidth +
            headingLineViewGap;


        const headingBuildProgress =
            smooth(
                clamp(
                    stickyProgress / 0.5,
                    0,
                    1
                )
            );


        const currentLineWidth =
            initialLineWidth +
            (
                maxLineWidth -
                initialLineWidth
            ) *
            headingBuildProgress;


        const currentLineEnd =
            lineStart +
            currentLineWidth;


        const pushedViewAllX =
            currentLineEnd +
            headingLineViewGap;


        const viewAllX =
            Math.min(
                finalViewAllX,
                Math.max(
                    viewAllStartX,
                    pushedViewAllX
                )
            );


        headingLine.style.left =
            lineStart +
            "px";


        headingLine.style.width =
            currentLineWidth +
            "px";


        headingViewAll.style.transform =
            "translate3d(" +
            viewAllX.toFixed(2) +
            "px,0,0)";


        const headingSquareX =
            viewAllX +
            headingViewAllWidth +
            headingSideGap;


        headingSquare.style.left =
            Math.min(
                finalSquareLeft,
                headingSquareX
            ).toFixed(2) +
            "px";



        /* =================================================
           CONTACT LINE BUILD — SECOND HALF OF STICKY

           MOBILE SEQUENCE:
           0.00 → 0.50  SELECTED / PARTNERS OPENS
           0.50 → 1.00  CONTACT OPENS
           1.00         BOTH ARE COMPLETE, THEN THE
                        COMPLETE 100VH STAGE RELEASES
        ================================================= */

        const contactProgress =
            smooth(
                clamp(
                    (stickyProgress - 0.5) / 0.5,
                    0,
                    1
                )
            );

        const contactLineStart =
            contactTitleWidth +
            headingLineTitleGap;

        const contactInitialLineWidth =
            initialLineWidth;

        const contactFinalSquareLeft =
            wideScreenLayout.matches
                ? Math.max(
                    0,
                    document.documentElement.clientWidth -
                    contactHeading.getBoundingClientRect().left -
                    20 -
                    headingSquareSize
                )
                : Math.max(
                    0,
                    contactHeadingWidth -
                    headingSquareSize
                );

        const contactFinalViewAllX =
            contactFinalSquareLeft -
            headingSideGap -
            contactViewAllWidth;

        const contactFinalLineEnd =
            contactFinalViewAllX -
            headingLineViewGap;

        const contactMaxLineWidth =
            Math.max(
                contactInitialLineWidth,
                contactFinalLineEnd -
                contactLineStart
            );

        const contactViewAllStartX =
            contactLineStart +
            contactInitialLineWidth +
            headingLineViewGap;

        const contactCurrentLineWidth =
            contactInitialLineWidth +
            (
                contactMaxLineWidth -
                contactInitialLineWidth
            ) *
            contactProgress;

        const contactCurrentLineEnd =
            contactLineStart +
            contactCurrentLineWidth;

        const contactPushedViewAllX =
            contactCurrentLineEnd +
            headingLineViewGap;

        const contactViewAllX =
            Math.min(
                contactFinalViewAllX,
                Math.max(
                    contactViewAllStartX,
                    contactPushedViewAllX
                )
            );

        contactHeadingLine.style.left =
            contactLineStart + "px";

        contactHeadingLine.style.width =
            contactCurrentLineWidth + "px";

        contactHeadingViewAll.style.transform =
            "translate3d(" +
            contactViewAllX.toFixed(2) +
            "px,0,0)";

        const contactSquareX =
            contactViewAllX +
            contactViewAllWidth +
            headingSideGap;

        contactHeadingSquare.style.left =
            Math.min(
                contactFinalSquareLeft,
                contactSquareX
            ).toFixed(2) +
            "px";


        positionMobilePreview();

    }



    /* =====================================================
       RAF
    ===================================================== */

    let ticking = false;


    function requestUpdate() {

        if (ticking) return;

        ticking = true;


        requestAnimationFrame(
            function () {

                updateScroll();

                /* WIDE SCREEN ONLY:
                   after scroll moves the roster under a stationary pointer,
                   immediately re-check which row is physically underneath it. */
                syncWideScreenPartnerFromPointer();

                ticking = false;

            }
        );

    }



    /* =====================================================
       WIDE SCREEN ONLY — ROSTER / STATIONARY POINTER SYNC

       On some wide-screen desktop/browser combinations,
       mouseenter / mouseleave do not update when the page scrolls
       underneath a completely stationary pointer.

       Store the real pointer position, then use elementFromPoint()
       after each scroll update to determine which PARTNERS row is
       physically underneath the mouse right now.

       Leaving the roster returns to partner 01.
       Laptop / normal desktop / tablet / mobile are untouched.
    ===================================================== */

    let widePointerX = 0;
    let widePointerY = 0;
    let wideHasPointer = false;
    let widePartnerIndex = 0;


    function syncWideScreenPartnerFromPointer() {

        if (
            mobileLayout.matches ||
            !wideScreenLayout.matches ||
            !wideHasPointer
        ) {
            return;
        }


        const elementUnderPointer =
            document.elementFromPoint(
                widePointerX,
                widePointerY
            );


        const rowUnderPointer =
            elementUnderPointer
                ? elementUnderPointer.closest(
                    ".offform-final-roster-row"
                )
                : null;


        const validRow =
            rowUnderPointer &&
            roster &&
            roster.contains(rowUnderPointer);


        rosterRows.forEach(
            function (row) {
                row.classList.remove(
                    "is-wide-hover"
                );
            }
        );


        if (!validRow) {

            widePartnerIndex = 0;
            updatePartner(0);

            return;
        }


        rowUnderPointer.classList.add(
            "is-wide-hover"
        );


        const index =
            rosterRows.indexOf(rowUnderPointer);


        if (index >= 0) {

            widePartnerIndex = index;

            updatePartner(index);
        }
    }


    document.addEventListener(
        "mousemove",
        function (event) {

            if (!wideScreenLayout.matches) {
                return;
            }

            widePointerX = event.clientX;
            widePointerY = event.clientY;
            wideHasPointer = true;

            syncWideScreenPartnerFromPointer();
        },
        {
            passive: true
        }
    );


    /* =====================================================
       PARTNER HOVER
    ===================================================== */

    rosterRows.forEach(
        function (row, index) {

            row.addEventListener(
                "mouseenter",
                function () {

                    if (mobileLayout.matches) {
                        return;
                    }

                    if (wideScreenLayout.matches) {

                        rosterRows.forEach(
                            function (rosterRow) {
                                rosterRow.classList.remove(
                                    "is-wide-hover"
                                );
                            }
                        );

                        row.classList.add(
                            "is-wide-hover"
                        );
                    }

                    updatePartner(index);
                }
            );


            row.addEventListener(
                "mouseleave",
                function () {

                    if (mobileLayout.matches) {
                        return;
                    }

                    if (wideScreenLayout.matches) {
                        syncWideScreenPartnerFromPointer();
                        return;
                    }

                    updatePartner(0);
                }
            );


            row.addEventListener(
                "click",
                function () {

                    if (
                        !mobileLayout.matches ||
                        !mobilePreview ||
                        !mobilePreviewImage
                    ) {
                        return;
                    }


                    const image =
                        row.dataset.image ||
                        "";

                    if (!image) {
                        return;
                    }


                    if (
                        mobilePreviewRow === row &&
                        mobilePreview.classList.contains(
                            "is-visible"
                        )
                    ) {

                        mobilePreview.classList.remove(
                            "is-visible"
                        );

                        row.classList.remove(
                            "is-mobile-active"
                        );

                        mobilePreviewRow = null;

                        return;
                    }


                    rosterRows.forEach(
                        function (rosterRow) {
                            rosterRow.classList.remove(
                                "is-mobile-active"
                            );
                        }
                    );

                    row.classList.add(
                        "is-mobile-active"
                    );


                    mobilePreviewImage.src =
                        image;

                    mobilePreviewRow =
                        row;

                    positionMobilePreview();

                    mobilePreview.classList.add(
                        "is-visible"
                    );
                }
            );

        }
    );



    /* =====================================================
       EVENTS
    ===================================================== */

    window.addEventListener(
        "scroll",
        requestUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        function () {

            if (mobileLayout.matches) {

                const widthChanged =
                    !mobileViewportWidth ||
                    Math.abs(
                        window.innerWidth -
                        mobileViewportWidth
                    ) > 2;


                if (!widthChanged) {

                    requestUpdate();

                    return;
                }


                mobileViewportHeight =
                    window.innerHeight;

                mobileViewportWidth =
                    window.innerWidth;
            }


            measure();

        },
        {
            passive: true
        }
    );


    if (mobileLayout.matches) {

        mobileViewportHeight =
            window.innerHeight;

        mobileViewportWidth =
            window.innerWidth;
    }


    measure();

})();;
/* =========================================================
   OFFFORM FINAL — IMAGE WAVE
   IMPORTANT:
   - THE REAL <img> IS NEVER MOVED
   - THE REAL <img> IS NEVER RESIZED
   - THE CANVAS COVERS THE ORIGINAL WRAPPER
   - THE DISTORTED COPY IS DRAWN AT THE IMAGE'S EXACT
     MEASURED X/Y POSITION INSIDE THAT WRAPPER
   - DISTORTION IS X ONLY
========================================================= */

(function () {

    const DISTORTION_STRENGTH = 4.5;
    const WAVE_FREQUENCY = 0.045;
    const WAVE_SPEED = 0.13;
    const ORGANIC_AMOUNT = 0.65;
    const FADE_SPEED = 0.14;
    const MOVE_TIMEOUT = 70;
    const WAVE_CROSSFADE_START = 0.12;


    const desktop =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        );


    if (!desktop.matches) {
        return;
    }


    const section =
        document.querySelector(
            ".offform-final"
        );


    if (!section) {
        return;
    }


    const wrapper =
        section.querySelector(
            ".offform-final-info-image-wrap"
        );


    const image =
        section.querySelector(
            ".offform-final-info-image"
        );


    const canvas =
        section.querySelector(
            ".offform-final-info-image-wave"
        );


    if (
        !wrapper ||
        !image ||
        !canvas
    ) {
        return;
    }


    const context =
        canvas.getContext(
            "2d"
        );


    if (!context) {
        return;
    }


    const sourceCanvas =
        document.createElement(
            "canvas"
        );


    const sourceContext =
        sourceCanvas.getContext(
            "2d"
        );


    if (!sourceContext) {
        return;
    }


    let mouseY = null;

    let previousX = null;
    let previousY = null;

    let isInside = false;
    let isMoving = false;

    let movementAmount = 0;
    let wavePhase = 0;

    let moveTimer = null;


    let wrapperWidth = 1;
    let wrapperHeight = 1;

    let imageLeft = 0;
    let imageTop = 0;
    let imageWidth = 1;
    let imageHeight = 1;


    /* =====================================================
       MEASURE
       READ-ONLY GEOMETRY.
       NOTHING HERE WRITES TO THE IMAGE.
    ===================================================== */

    function measure() {

        const wrapperRect =
            wrapper.getBoundingClientRect();


        const imageRect =
            image.getBoundingClientRect();


        wrapperWidth =
            Math.max(
                1,
                wrapperRect.width
            );


        wrapperHeight =
            Math.max(
                1,
                wrapperRect.height
            );


        imageLeft =
            imageRect.left -
            wrapperRect.left;


        imageTop =
            imageRect.top -
            wrapperRect.top;


        imageWidth =
            Math.max(
                1,
                imageRect.width
            );


        imageHeight =
            Math.max(
                1,
                imageRect.height
            );


        const canvasPixelWidth =
            Math.max(
                1,
                Math.round(
                    wrapperWidth
                )
            );


        const canvasPixelHeight =
            Math.max(
                1,
                Math.round(
                    wrapperHeight
                )
            );


        if (
            canvas.width !==
                canvasPixelWidth ||
            canvas.height !==
                canvasPixelHeight
        ) {

            canvas.width =
                canvasPixelWidth;


            canvas.height =
                canvasPixelHeight;

        }


        const sourcePixelWidth =
            Math.max(
                1,
                Math.round(
                    imageWidth
                )
            );


        const sourcePixelHeight =
            Math.max(
                1,
                Math.round(
                    imageHeight
                )
            );


        if (
            sourceCanvas.width !==
                sourcePixelWidth ||
            sourceCanvas.height !==
                sourcePixelHeight
        ) {

            sourceCanvas.width =
                sourcePixelWidth;


            sourceCanvas.height =
                sourcePixelHeight;

        }

    }


    /* =====================================================
       OBJECT POSITION
    ===================================================== */

    function valueToFactor(value) {

        if (!value) {
            return 0.5;
        }


        const normalized =
            value
                .trim()
                .toLowerCase();


        if (
            normalized === "left" ||
            normalized === "top"
        ) {
            return 0;
        }


        if (
            normalized === "right" ||
            normalized === "bottom"
        ) {
            return 1;
        }


        if (
            normalized === "center"
        ) {
            return 0.5;
        }


        if (
            normalized.endsWith("%")
        ) {

            const number =
                parseFloat(
                    normalized
                );


            if (
                !Number.isNaN(number)
            ) {

                return Math.max(
                    0,
                    Math.min(
                        1,
                        number / 100
                    )
                );

            }

        }


        return 0.5;

    }


    function getObjectPosition() {

        const style =
            getComputedStyle(
                image
            );


        const values =
            (
                style.objectPosition ||
                "50% 50%"
            )
                .trim()
                .split(/\s+/);


        let x =
            values[0] ||
            "50%";


        let y =
            values[1] ||
            "50%";


        if (
            values.length === 1
        ) {

            if (
                x === "top" ||
                x === "bottom"
            ) {

                y = x;
                x = "center";

            }

            else {

                y = "center";

            }

        }


        return {
            x: valueToFactor(x),
            y: valueToFactor(y)
        };

    }


    /* =====================================================
       CAPTURE EXACT CURRENT IMAGE CROP
    ===================================================== */

    function captureImage() {

        measure();


        if (
            image.classList.contains(
                "is-changing"
            ) ||
            !image.complete ||
            image.naturalWidth <= 0 ||
            image.naturalHeight <= 0
        ) {

            canvas.style.opacity =
                "0";

            return false;

        }


        const width =
            sourceCanvas.width;


        const height =
            sourceCanvas.height;


        sourceContext.clearRect(
            0,
            0,
            width,
            height
        );


        const naturalWidth =
            image.naturalWidth;


        const naturalHeight =
            image.naturalHeight;


        const scale =
            Math.max(
                width /
                    naturalWidth,
                height /
                    naturalHeight
            );


        const sourceWidth =
            width /
            scale;


        const sourceHeight =
            height /
            scale;


        const position =
            getObjectPosition();


        const sourceX =
            (
                naturalWidth -
                sourceWidth
            ) *
            position.x;


        const sourceY =
            (
                naturalHeight -
                sourceHeight
            ) *
            position.y;


        try {

            sourceContext.drawImage(

                image,

                sourceX,
                sourceY,

                sourceWidth,
                sourceHeight,

                0,
                0,

                width,
                height

            );


            return true;

        }

        catch (error) {

            canvas.style.opacity =
                "0";

            return false;

        }

    }


    /* =====================================================
       DRAW WAVE
       IMAGE TOP NEVER CHANGES.
       EACH STRIP IS DRAWN BACK TO THE SAME Y.
    ===================================================== */

    function drawWave() {

        const width =
            sourceCanvas.width;


        const height =
            sourceCanvas.height;


        if (
            width <= 0 ||
            height <= 0
        ) {
            return;
        }


        const stripHeight = 2;
        const overlap = 1;


        for (
            let y = 0;
            y < height;
            y += stripHeight
        ) {

            const mainWave =
                Math.sin(
                    y *
                        WAVE_FREQUENCY +
                    wavePhase
                );


            const organicWave =
                Math.sin(
                    y *
                        0.021 -
                    wavePhase *
                        1.7
                ) *
                ORGANIC_AMOUNT;


            const mouseInfluence =
                mouseY !== null

                    ? Math.sin(
                        (
                            y -
                            mouseY
                        ) *
                            0.018 +
                        wavePhase *
                            0.65
                    ) *
                        0.35

                    : 0;


            const displacement =
                (
                    mainWave +
                    organicWave +
                    mouseInfluence
                ) *
                DISTORTION_STRENGTH *
                movementAmount;


            const drawHeight =
                Math.min(
                    stripHeight +
                        overlap,
                    height -
                        y
                );


            const destinationY =
                imageTop +
                y;


            context.drawImage(

                sourceCanvas,

                0,
                y,

                width,
                drawHeight,

                imageLeft +
                    displacement,
                destinationY,

                width,
                drawHeight

            );


            if (
                displacement > 0
            ) {

                context.drawImage(

                    sourceCanvas,

                    0,
                    y,

                    1,
                    drawHeight,

                    imageLeft,
                    destinationY,

                    displacement + 1,
                    drawHeight

                );

            }


            if (
                displacement < 0
            ) {

                const gap =
                    Math.abs(
                        displacement
                    );


                context.drawImage(

                    sourceCanvas,

                    Math.max(
                        0,
                        width - 1
                    ),
                    y,

                    1,
                    drawHeight,

                    imageLeft +
                        width -
                        gap -
                        1,
                    destinationY,

                    gap + 1,
                    drawHeight

                );

            }

        }

    }


    /* =====================================================
       MOVEMENT
    ===================================================== */

    function clearMoveTimer() {

        if (
            moveTimer !== null
        ) {

            clearTimeout(
                moveTimer
            );


            moveTimer =
                null;

        }

    }


    function registerMovement() {

        isMoving =
            true;


        clearMoveTimer();


        moveTimer =
            setTimeout(

                function () {

                    moveTimer =
                        null;


                    isMoving =
                        false;

                },

                MOVE_TIMEOUT

            );

    }


    /* =====================================================
       POINTER
    ===================================================== */

    wrapper.addEventListener(

        "mousemove",

        function (event) {

            const imageRect =
                image.getBoundingClientRect();


            const insideNow =
                event.clientX >=
                    imageRect.left &&
                event.clientX <=
                    imageRect.right &&
                event.clientY >=
                    imageRect.top &&
                event.clientY <=
                    imageRect.bottom;


            if (!insideNow) {

                if (isInside) {

                    isInside =
                        false;


                    isMoving =
                        false;


                    previousX =
                        null;


                    previousY =
                        null;


                    mouseY =
                        null;


                    clearMoveTimer();

                }


                return;

            }


            if (!isInside) {

                isInside =
                    true;


                previousX =
                    null;


                previousY =
                    null;


                movementAmount =
                    0;


                measure();

            }


            const localX =
                event.clientX -
                imageRect.left;


            const localY =
                event.clientY -
                imageRect.top;


            mouseY =
                localY;


            if (
                previousX !== null &&
                previousY !== null
            ) {

                const dx =
                    localX -
                    previousX;


                const dy =
                    localY -
                    previousY;


                const distance =
                    Math.hypot(
                        dx,
                        dy
                    );


                if (
                    distance > 0.2
                ) {

                    registerMovement();

                }

            }

            else {

                registerMovement();

            }


            previousX =
                localX;


            previousY =
                localY;

        },

        {
            passive: true
        }

    );


    wrapper.addEventListener(

        "mouseleave",

        function () {

            isInside =
                false;


            isMoving =
                false;


            previousX =
                null;


            previousY =
                null;


            mouseY =
                null;


            clearMoveTimer();

        }

    );


    image.addEventListener(

        "load",

        function () {

            movementAmount =
                0;


            canvas.style.opacity =
                "0";


            context.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            requestAnimationFrame(
                measure
            );

        }

    );


    window.addEventListener(

        "resize",

        measure,

        {
            passive: true
        }

    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    function animate() {

        requestAnimationFrame(
            animate
        );


        if (
            image.classList.contains(
                "is-changing"
            )
        ) {

            canvas.style.opacity =
                "0";


            context.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            return;

        }


        if (
            !isInside &&
            movementAmount <= 0.001
        ) {

            canvas.style.opacity =
                "0";


            return;

        }


        if (
            isMoving
        ) {

            movementAmount +=
                (
                    1 -
                    movementAmount
                ) *
                0.45;

        }

        else {

            movementAmount *=
                (
                    1 -
                    FADE_SPEED
                );


            if (
                movementAmount <
                    0.001
            ) {

                movementAmount =
                    0;

            }

        }


        if (
            movementAmount <= 0
        ) {

            canvas.style.opacity =
                "0";


            context.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            return;

        }


        if (
            !captureImage()
        ) {

            return;

        }


        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        wavePhase +=
            WAVE_SPEED;


        drawWave();


        const canvasOpacity =
            movementAmount >=
                WAVE_CROSSFADE_START

                ? 1

                : (
                    movementAmount /
                    WAVE_CROSSFADE_START
                );


        canvas.style.opacity =
            Math.max(
                0,
                Math.min(
                    1,
                    canvasOpacity
                )
            ).toFixed(4);

    }


    measure();


    requestAnimationFrame(
        animate
    );

})();;
/* =========================================================
   OFFFORM — CONTACT DEMO SUBMIT

   DEMO ONLY:
   - NO EMAIL IS SENT
   - NO DATA IS SAVED
   - NO SERVER / AJAX / FETCH REQUEST IS MADE
   - EXISTING DESIGN / LAYOUT / SCROLL / ANIMATIONS ARE UNCHANGED
========================================================= */

(function () {

    const section =
        document.querySelector(
            ".offform-final"
        );


    if (!section) {
        return;
    }


    const submitButton =
        section.querySelector(
            ".offform-final-contact-submit"
        );


    const submitLabel =
        section.querySelector(
            ".offform-final-contact-submit-label"
        );


    const nameInput =
        section.querySelector(
            '.offform-final-contact-field input[name="name"]'
        );


    const emailInput =
        section.querySelector(
            '.offform-final-contact-field input[name="email"]'
        );


    const contactInputs =
        Array.from(
            section.querySelectorAll(
                ".offform-final-contact-field input"
            )
        );


    if (
        !submitButton ||
        !submitLabel ||
        !nameInput ||
        !emailInput
    ) {
        return;
    }


    const ORIGINAL_LABEL =
        submitLabel.textContent.trim();


    const SENDING_LABEL =
        "SENDING...";


    const SUCCESS_LABEL =
        "INQUIRY SENT";


    const REQUIRED_LABEL =
        "COMPLETE FIELDS";


    const EMAIL_LABEL =
        "CHECK EMAIL";


    const SENDING_TIME =
        650;


    const SUCCESS_TIME =
        1800;


    const ERROR_TIME =
        1400;


    let busy =
        false;


    let resetTimer =
        null;


    const mobileDemoLayout =
        window.matchMedia(
            "(max-width: 1024px)"
        );


    function setMobileStatus(active) {

        if (!mobileDemoLayout.matches) {
            return;
        }

        submitButton.classList.toggle(
            "is-demo-status",
            active
        );

    }


    const viewportMeta =
        document.querySelector(
            'meta[name="viewport"]'
        );

    const originalViewportContent =
        viewportMeta
            ? (
                viewportMeta.getAttribute(
                    "content"
                ) || ""
              )
            : "";

    let viewportRestoreTimer =
        null;


    function lockMobileZoom() {

        if (
            !mobileDemoLayout.matches ||
            !viewportMeta
        ) {
            return;
        }

        if (
            viewportRestoreTimer !== null
        ) {
            window.clearTimeout(
                viewportRestoreTimer
            );

            viewportRestoreTimer =
                null;
        }

        const parts =
            originalViewportContent
                .split(",")
                .map(function (part) {
                    return part.trim();
                })
                .filter(Boolean)
                .filter(function (part) {
                    return (
                        !/^maximum-scale\s*=/i.test(part) &&
                        !/^user-scalable\s*=/i.test(part)
                    );
                });

        parts.push(
            "maximum-scale=1"
        );

        viewportMeta.setAttribute(
            "content",
            parts.join(", ")
        );

    }


    function restoreMobileZoom() {

        if (!viewportMeta) {
            return;
        }

        if (
            viewportRestoreTimer !== null
        ) {
            window.clearTimeout(
                viewportRestoreTimer
            );
        }

        viewportRestoreTimer =
            window.setTimeout(
                function () {

                    viewportRestoreTimer =
                        null;

                    const active =
                        document.activeElement;

                    if (
                        active &&
                        active.closest &&
                        active.closest(
                            ".offform-final-contact"
                        )
                    ) {
                        return;
                    }

                    viewportMeta.setAttribute(
                        "content",
                        originalViewportContent
                    );

                },
                250
            );

    }


    function setLabel(text) {

        submitLabel.textContent =
            text;

    }


    function clearResetTimer() {

        if (
            resetTimer !== null
        ) {

            window.clearTimeout(
                resetTimer
            );

            resetTimer =
                null;

        }

    }


    function restoreLabelAfter(delay) {

        clearResetTimer();


        resetTimer =
            window.setTimeout(
                function () {

                    resetTimer =
                        null;

                    setLabel(
                        ORIGINAL_LABEL
                    );

                    setMobileStatus(
                        false
                    );

                },
                delay
            );

    }


    function showValidationMessage(
        input,
        message
    ) {

        setLabel(
            message
        );

        setMobileStatus(
            true
        );

        lockMobileZoom();


        input.focus({
            preventScroll: true
        });


        restoreLabelAfter(
            ERROR_TIME
        );

    }


    function clearInvalidState(input) {

        input.classList.remove(
            "is-demo-invalid"
        );

    }


    function markInvalidState(input) {

        input.classList.add(
            "is-demo-invalid"
        );

    }


    function clearAllInvalidStates() {

        nameInput.classList.remove(
            "is-demo-invalid"
        );

        emailInput.classList.remove(
            "is-demo-invalid"
        );

    }


    function emailIsValid() {

        const value =
            emailInput.value.trim();


        if (!value) {
            return false;
        }


        return emailInput.validity.valid;

    }


    function runDemoSubmit() {

        if (busy) {
            return;
        }


        clearResetTimer();


        const nameMissing =
            !nameInput.value.trim();


        const emailMissing =
            !emailInput.value.trim();


        clearAllInvalidStates();


        if (nameMissing) {
            markInvalidState(
                nameInput
            );
        }


        if (emailMissing) {
            markInvalidState(
                emailInput
            );
        }


        if (
            nameMissing ||
            emailMissing
        ) {

            showValidationMessage(
                nameMissing
                    ? nameInput
                    : emailInput,
                REQUIRED_LABEL
            );

            return;

        }


        if (!emailIsValid()) {

            markInvalidState(
                emailInput
            );


            showValidationMessage(
                emailInput,
                EMAIL_LABEL
            );

            return;

        }


        busy =
            true;


        setLabel(
            SENDING_LABEL
        );

        setMobileStatus(
            true
        );


        window.setTimeout(
            function () {

                setLabel(
                    SUCCESS_LABEL
                );


                contactInputs.forEach(
                    function (input) {

                        input.value =
                            "";

                        clearInvalidState(
                            input
                        );

                    }
                );


                window.setTimeout(
                    function () {

                        setLabel(
                            ORIGINAL_LABEL
                        );

                        setMobileStatus(
                            false
                        );


                        busy =
                            false;


                        /*
                         * DESKTOP + WIDE SCREEN ONLY:
                         * After the demo submit finishes and the original
                         * label is restored, release button focus so the
                         * button returns automatically to its normal white state.
                         *
                         * Mobile + tablet are completely untouched.
                         */
                        if (
                            window.matchMedia(
                                "(min-width: 1025px)"
                            ).matches &&
                            document.activeElement ===
                                submitButton
                        ) {

                            submitButton.blur();

                        }

                    },
                    SUCCESS_TIME
                );

            },
            SENDING_TIME
        );

    }


    submitButton.addEventListener(
        "pointerdown",
        lockMobileZoom,
        {
            passive: true
        }
    );


    submitButton.addEventListener(
        "touchstart",
        lockMobileZoom,
        {
            passive: true
        }
    );


    submitButton.addEventListener(
        "focus",
        lockMobileZoom
    );


    submitButton.addEventListener(
        "blur",
        restoreMobileZoom
    );


    submitButton.addEventListener(
        "click",
        runDemoSubmit
    );


    contactInputs.forEach(
        function (input) {

            input.addEventListener(
                "pointerdown",
                lockMobileZoom,
                {
                    passive: true
                }
            );


            input.addEventListener(
                "touchstart",
                lockMobileZoom,
                {
                    passive: true
                }
            );


            input.addEventListener(
                "focus",
                lockMobileZoom
            );


            input.addEventListener(
                "blur",
                restoreMobileZoom
            );


            input.addEventListener(
                "input",
                function () {

                    clearInvalidState(
                        input
                    );

                }
            );


            input.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key !==
                        "Enter"
                    ) {
                        return;
                    }


                    event.preventDefault();


                    runDemoSubmit();

                }
            );

        }
    );

})();;
(function () {

    /* =========================================================
       OFFFORM — GLOBAL SMOOTH SECTION NAVIGATION
       Works with sticky sections without changing their logic.
    ========================================================= */

    const DURATION = 900;

    let animationFrame = null;


    /* =========================================================
       EASING
    ========================================================= */

    function easeInOutCubic(t) {

        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;

    }


    /* =========================================================
       HEADER HEIGHT
       Detects the fixed header automatically.
    ========================================================= */

    function getHeaderHeight() {

        const header =
            document.querySelector(
                ".aurea-header, header, .elementor-location-header"
            );


        if (!header) {
            return 0;
        }


        const style =
            window.getComputedStyle(header);


        if (
            style.position !== "fixed" &&
            style.position !== "sticky"
        ) {
            return 0;
        }


        return header.getBoundingClientRect().height || 0;

    }


    /* =========================================================
       TARGET POSITION
    ========================================================= */

    function getTargetY(target) {

        const scrollY =
            window.scrollY ||
            window.pageYOffset ||
            0;


        const rect =
            target.getBoundingClientRect();


        const headerHeight =
            getHeaderHeight();


        return Math.max(
            0,
            rect.top + scrollY - headerHeight
        );

    }


    /* =========================================================
       KEYBOARD FOCUS
       Only used when navigation was activated by keyboard.
    ========================================================= */

    function focusTarget(target) {

        const naturallyFocusable =
            target.matches(
                'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );


        if (!naturallyFocusable) {

            target.setAttribute(
                "tabindex",
                "-1"
            );

        }


        try {

            target.focus({
                preventScroll: true
            });

        }

        catch (error) {

            target.focus();

        }

    }


    /* =========================================================
       SMOOTH SCROLL ENGINE
       Existing 900ms behavior is preserved on all layouts.
    ========================================================= */

    function smoothScrollTo(
        targetY,
        onComplete
    ) {

        if (animationFrame) {

            cancelAnimationFrame(
                animationFrame
            );

            animationFrame = null;

        }


        const startY =
            window.scrollY ||
            window.pageYOffset ||
            0;


        const distance =
            targetY - startY;


        if (Math.abs(distance) < 1) {

            if (
                typeof onComplete === "function"
            ) {

                onComplete();

            }


            return;

        }


        const startTime =
            performance.now();


        function animate(currentTime) {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / DURATION,
                    1
                );


            const eased =
                easeInOutCubic(progress);


            window.scrollTo(
                0,
                startY + distance * eased
            );


            if (progress < 1) {

                animationFrame =
                    requestAnimationFrame(
                        animate
                    );

            }

            else {

                animationFrame = null;


                window.scrollTo(
                    0,
                    targetY
                );


                if (
                    typeof onComplete === "function"
                ) {

                    onComplete();

                }

            }

        }


        animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    /* =========================================================
       INTERNAL ANCHOR LINKS
    ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest(
                    'a[href^="#"]'
                );


            if (!link) {
                return;
            }


            const href =
                link.getAttribute("href");


            if (
                !href ||
                href === "#" ||
                href.length <= 1
            ) {
                return;
            }


            let target;


            try {

                target =
                    document.querySelector(
                        href
                    );

            }

            catch (error) {

                return;

            }


            if (!target) {
                return;
            }


            event.preventDefault();


            const targetY =
                getTargetY(
                    target
                );


            /*
             * event.detail === 0
             * means the link was activated through keyboard,
             * rather than a normal pointer click.
             */
            const keyboardActivation =
                event.detail === 0;


            smoothScrollTo(
                targetY,
                function () {

                    if (
                        keyboardActivation
                    ) {

                        focusTarget(
                            target
                        );

                    }

                }
            );


            if (
                history &&
                history.replaceState
            ) {

                history.replaceState(
                    null,
                    "",
                    href
                );

            }

        }
    );


})();;
(function () {

    const legalLinks =
        document.querySelectorAll(
            ".offform-clients-column:nth-child(2) .offform-clients-column-list a"
        );


    if (!legalLinks.length) {
        return;
    }


    function normalizePath(pathname) {

        let path =
            pathname || "/";


        path =
            path.replace(
                /\/+$/,
                ""
            );


        return path || "/";

    }


    const currentPath =
        normalizePath(
            window.location.pathname
        );


    legalLinks.forEach(
        function (link) {

            let linkPath = "";


            try {

                linkPath =
                    normalizePath(
                        new URL(
                            link.href,
                            window.location.origin
                        ).pathname
                    );

            }

            catch (error) {
                return;
            }


            const isCurrentPage =
                linkPath === currentPath;


            link.classList.toggle(
                "is-active",
                isCurrentPage
            );


            if (isCurrentPage) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }

            else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        }
    );

})();;
(function () {

    const section =
        document.querySelector(
            ".offform-clients"
        );

    if (!section) {
        return;
    }

    const columns =
        section.querySelector(
            ".offform-clients-columns"
        );

    const columnItems =
        Array.from(
            section.querySelectorAll(
                ".offform-clients-column"
            )
        );

    const heading =
        section.querySelector(
            ".offform-clients-heading"
        );

    const brand =
        section.querySelector(
            ".offform-clients-brand"
        );

    const masterText =
        section.querySelector(
            "#offform-clients-master-text"
        );

    if (
        !columns ||
        !columnItems.length ||
        !heading ||
        !brand ||
        !masterText
    ) {
        return;
    }

    function positionDesktopFooter() {

        const isDesktop =
            window.matchMedia(
                "(min-width: 768px)"
            ).matches;

        if (!isDesktop) {

            section.style.removeProperty(
                "--clients-desktop-columns-top"
            );

            section.style.removeProperty(
                "--clients-desktop-heading-top"
            );

            return;
        }

        const sectionRect =
            section.getBoundingClientRect();

        const brandRect =
            brand.getBoundingClientRect();

        let masterBox;

        try {
            masterBox =
                masterText.getBBox();
        }
        catch (error) {
            return;
        }

        /*
         * REAL VISUAL TOP OF THE LARGE OFFFORM LETTERS.
         * The SVG viewBox is 320 units high and stretches
         * to the rendered brand height.
         */
        const visualWordTop =
            (
                brandRect.top -
                sectionRect.top
            ) +
            (
                masterBox.y /
                320
            ) *
            brandRect.height;

        /*
         * The columns wrapper itself has zero height because
         * its four children are absolutely positioned.
         * Measure the real rendered bottom of those children.
         */
        const currentColumnsTop =
            columns.getBoundingClientRect().top;

        let columnsHeight = 0;

        columnItems.forEach(
            function (item) {

                const rect =
                    item.getBoundingClientRect();

                columnsHeight =
                    Math.max(
                        columnsHeight,
                        rect.bottom -
                        currentColumnsTop
                    );
            }
        );

        /*
         * 0px visual gap:
         * bottom of the tallest column touches the real
         * top edge of the large OFFFORM letters.
         */
        const columnsTop =
            visualWordTop -
            columnsHeight;

        /*
         * Exact 28px visual gap between the bottom of the
         * heading row and the top of the columns.
         */
        const headingHeight =
            heading.offsetHeight;

        const headingTop =
            columnsTop -
            28 -
            headingHeight;

        section.style.setProperty(
            "--clients-desktop-columns-top",
            columnsTop.toFixed(2) + "px"
        );

        section.style.setProperty(
            "--clients-desktop-heading-top",
            headingTop.toFixed(2) + "px"
        );
    }

    requestAnimationFrame(
        function () {

            requestAnimationFrame(
                positionDesktopFooter
            );
        }
    );

    let resizeTimer =
        null;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(
                    positionDesktopFooter,
                    80
                );
        },
        {
            passive: true
        }
    );

})();;
(function () {

    const section =
        document.querySelector(
            ".offform-clients"
        );


    if (!section) {
        return;
    }


    const wideScreenLayout =
        window.matchMedia(
            "(min-width: 1520px)"
        );


    const heading =
        section.querySelector(
            ".offform-clients-heading"
        );


    const title =
        section.querySelector(
            ".offform-clients-heading-title"
        );


    const line =
        section.querySelector(
            ".offform-clients-heading-line"
        );


    const view =
        section.querySelector(
            ".offform-clients-heading-view"
        );


    const square =
        section.querySelector(
            ".offform-clients-heading-square"
        );


    if (
        !heading ||
        !title ||
        !line ||
        !view ||
        !square
    ) {
        return;
    }


    /* =====================================================
       HELPERS
    ===================================================== */

    function clamp(
        value,
        min,
        max
    ) {

        return Math.max(
            min,
            Math.min(
                max,
                value
            )
        );

    }


    function smooth(value) {

        value =
            clamp(
                value,
                0,
                1
            );


        return (
            value *
            value *
            (
                3 -
                2 * value
            )
        );

    }


    function cssNumber(name) {

        return (
            parseFloat(
                getComputedStyle(section)
                    .getPropertyValue(name)
            ) ||
            0
        );

    }


    /* =====================================================
       MEASURED VALUES
    ===================================================== */

    let titleWidth = 0;
    let viewWidth = 0;
    let headingWidth = 0;

    let squareSize = 7;
    let squareGap = 8;

    let lineTitleGap = 8;
    let lineButtonGap = 8;

    let initialLineWidth = 3;


    function positionMobileFooterHeading() {

        const isMobile =
            window.matchMedia(
                "(max-width: 767px)"
            ).matches;


        if (!isMobile) {
            section.style.removeProperty(
                "--clients-mobile-heading-bottom"
            );
            return;
        }


        const firstRowItems =
            Array.from(
                section.querySelectorAll(
                    ".offform-clients-column:nth-child(1), " +
                    ".offform-clients-column:nth-child(2), " +
                    ".offform-clients-column:nth-child(4)"
                )
            );


        if (!firstRowItems.length) {
            return;
        }


        const sectionRect =
            section.getBoundingClientRect();


        const firstRowTop =
            Math.min(
                ...firstRowItems.map(
                    function (item) {
                        return (
                            item.getBoundingClientRect().top -
                            sectionRect.top
                        );
                    }
                )
            );


        const headingBottom =
            Math.max(
                0,
                section.offsetHeight -
                firstRowTop +
                28
            );


        section.style.setProperty(
            "--clients-mobile-heading-bottom",
            headingBottom.toFixed(2) + "px"
        );
    }


    function measure() {

        positionMobileFooterHeading();


        titleWidth =
            title.offsetWidth;


        viewWidth =
            view.offsetWidth;


        headingWidth =
            heading.offsetWidth;


        squareSize =
            cssNumber(
                "--clients-square-size"
            ) ||
            7;


        squareGap =
            cssNumber(
                "--clients-square-gap"
            ) ||
            8;


        lineTitleGap =
            cssNumber(
                "--clients-line-title-gap"
            ) ||
            8;


        lineButtonGap =
            cssNumber(
                "--clients-line-button-gap"
            ) ||
            8;


        initialLineWidth =
            Math.max(
                0,
                cssNumber(
                    "--clients-line-initial-width"
                )
            );


        update();

    }


    /* =====================================================
       SCROLL ANIMATION

       START:
       section top reaches 88% of viewport.

       END:
       section top reaches 32% of viewport.

       IMPORTANT:
       We finish EARLIER because this section is shorter
       than the viewport and is not sticky.
    ===================================================== */

    function update() {

        const rect =
            section.getBoundingClientRect();


        const viewportHeight =
            window.innerHeight;


        /*
         * DESKTOP KEEPS THE ORIGINAL TIMING.
         *
         * MOBILE:
         * start opening the moment the section enters the viewport,
         * finish when the section reaches its final on-screen position.
         */
        const isMobile =
            window.matchMedia(
                "(max-width: 767px)"
            ).matches;


        const startPoint =
            isMobile
                ? viewportHeight
                : viewportHeight * 0.88;


        const endPoint =
            isMobile
                ? viewportHeight * 0.22
                : viewportHeight * 0.32;


        const rawProgress =
            (
                startPoint -
                rect.top
            ) /
            (
                startPoint -
                endPoint
            );


        const progress =
            smooth(
                clamp(
                    rawProgress,
                    0,
                    1
                )
            );


        /* =================================================
           FINAL GEOMETRY
        ================================================= */

        const lineStart =
            titleWidth +
            lineTitleGap;


        const finalSquareLeft =
            wideScreenLayout.matches
                ? Math.max(
                    0,
                    document.documentElement.clientWidth -
                    heading.getBoundingClientRect().left -
                    20 -
                    squareSize
                )
                : headingWidth -
                  squareSize;


        const finalViewX =
            finalSquareLeft -
            squareGap -
            viewWidth;


        const finalLineEnd =
            finalViewX -
            lineButtonGap;


        const maximumLineWidth =
            Math.max(
                initialLineWidth,
                finalLineEnd -
                lineStart
            );


        /* =================================================
           CURRENT LINE WIDTH
        ================================================= */

        const currentLineWidth =
            initialLineWidth +
            (
                maximumLineWidth -
                initialLineWidth
            ) *
            progress;


        const currentLineEnd =
            lineStart +
            currentLineWidth;


        /* =================================================
           MOVING CLIENTS LABEL
        ================================================= */

        const initialViewX =
            lineStart +
            initialLineWidth +
            lineButtonGap;


        const pushedViewX =
            currentLineEnd +
            lineButtonGap;


        const viewX =
            Math.min(
                finalViewX,
                Math.max(
                    initialViewX,
                    pushedViewX
                )
            );


        /* =================================================
           APPLY
        ================================================= */

        line.style.left =
            lineStart +
            "px";


        line.style.width =
            currentLineWidth +
            "px";


        view.style.transform =
            "translate3d(" +
            viewX.toFixed(2) +
            "px,0,0)";


        const squareX =
            viewX +
            viewWidth +
            squareGap;


        square.style.left =
            Math.min(
                finalSquareLeft,
                squareX
            ).toFixed(2) +
            "px";

    }


    /* =====================================================
       SCROLL RAF
    ===================================================== */

    let ticking = false;


    window.addEventListener(
        "scroll",
        function () {

            if (ticking) {
                return;
            }


            ticking = true;


            requestAnimationFrame(
                function () {

                    update();

                    ticking = false;

                }
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    let resizeTimer = null;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        measure();

                    },
                    80
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       START
    ===================================================== */

    requestAnimationFrame(
        function () {

            requestAnimationFrame(
                function () {

                    measure();

                }
            );

        }
    );

})();;
(function () {

    const section =
        document.querySelector(
            ".offform-clients"
        );

    if (!section) return;


    const brand =
        section.querySelector(
            ".offform-clients-brand"
        );


    const svg =
        section.querySelector(
            ".offform-clients-brand-svg"
        );


    const masterText =
        section.querySelector(
            "#offform-clients-master-text"
        );


    const generatedDefs =
        section.querySelector(
            "#offform-clients-generated-defs"
        );


    const letterLayers =
        section.querySelector(
            ".offform-clients-letter-layers"
        );


    if (
        !brand ||
        !svg ||
        !masterText ||
        !generatedDefs ||
        !letterLayers
    ) {
        return;
    }


    const SVG_NS =
        "http://www.w3.org/2000/svg";


    const VIEWBOX_WIDTH = 1600;
    const VIEWBOX_HEIGHT = 320;

    const BRAND_TEXT = "OFFFORM";

    /* PERFORMANCE ONLY — WIDE SCREEN (1520px+) */
    const wideScreenInteraction =
        window.matchMedia(
            "(min-width: 1520px)"
        );


    /*
     * EACH ITEM HERE REPRESENTS
     * ONE COMPLETELY INDEPENDENT
     * LARGE LETTER.
     */

    let letters = [];


    let mouseX = 0;
    let mouseY = 0;

    let mouseInside = false;

    let activeLetterIndex = -1;

    let animationFrame = null;

    /* WIDE-SCREEN PERFORMANCE ONLY */
    let latestClientX = 0;
    let latestClientY = 0;
    let pointerNeedsUpdate = false;



    /* =========================================================
       HELPERS
    ========================================================= */

    function cssNumber(
        name,
        fallback
    ) {

        const value =
            parseFloat(
                getComputedStyle(section)
                    .getPropertyValue(name)
            );


        return Number.isFinite(value)
            ? value
            : fallback;
    }



    function clamp(
        value,
        min,
        max
    ) {

        return Math.max(
            min,
            Math.min(
                max,
                value
            )
        );
    }



    /* =========================================================
       BUILD ONE MASK PER LARGE LETTER
    ========================================================= */

    function buildLetterMasks() {

        generatedDefs.innerHTML = "";
        letterLayers.innerHTML = "";

        letters = [];


        /*
         * GET THE REAL POSITION OF EVERY CHARACTER
         * FROM THE MASTER OFFFORM.
         */

        for (
            let i = 0;
            i < BRAND_TEXT.length;
            i++
        ) {

            let start;
            let end;
            let extent;


            try {

                start =
                    masterText
                        .getStartPositionOfChar(i);


                end =
                    masterText
                        .getEndPositionOfChar(i);


                extent =
                    masterText
                        .getExtentOfChar(i);

            }

            catch (error) {

                continue;
            }


            /*
             * -----------------------------------------------------
             * MASK
             * -----------------------------------------------------
             *
             * IMPORTANT:
             * THIS MASK CONTAINS ONLY ONE CHARACTER.
             *
             * THEREFORE NOTHING DRAWN IN THIS LAYER
             * CAN EVER APPEAR IN ANOTHER LETTER.
             */

            const mask =
                document.createElementNS(
                    SVG_NS,
                    "mask"
                );


            const maskId =
                "offform-clients-letter-mask-" +
                i;


            mask.setAttribute(
                "id",
                maskId
            );


            mask.setAttribute(
                "maskUnits",
                "userSpaceOnUse"
            );


            mask.setAttribute(
                "x",
                "0"
            );


            mask.setAttribute(
                "y",
                "0"
            );


            mask.setAttribute(
                "width",
                VIEWBOX_WIDTH
            );


            mask.setAttribute(
                "height",
                VIEWBOX_HEIGHT
            );



            const blackRect =
                document.createElementNS(
                    SVG_NS,
                    "rect"
                );


            blackRect.setAttribute(
                "x",
                "0"
            );


            blackRect.setAttribute(
                "y",
                "0"
            );


            blackRect.setAttribute(
                "width",
                VIEWBOX_WIDTH
            );


            blackRect.setAttribute(
                "height",
                VIEWBOX_HEIGHT
            );


            blackRect.setAttribute(
                "fill",
                "#000000"
            );


            mask.appendChild(
                blackRect
            );



            /*
             * COPY THE MASTER WORD,
             * BUT SHOW ONLY THIS CHARACTER'S
             * HORIZONTAL REGION.
             *
             * THIS PRESERVES THE EXACT ORIGINAL
             * OFFFORM TYPOGRAPHY / SPACING.
             */

            const clip =
                document.createElementNS(
                    SVG_NS,
                    "clipPath"
                );


            const clipId =
                "offform-clients-letter-clip-" +
                i;


            clip.setAttribute(
                "id",
                clipId
            );


            clip.setAttribute(
                "clipPathUnits",
                "userSpaceOnUse"
            );



            const clipRect =
                document.createElementNS(
                    SVG_NS,
                    "rect"
                );


            /*
             * USE MIDPOINTS BETWEEN CHARACTERS.
             * THE CLIPS NEVER OVERLAP.
             */

            let zoneLeft;


            if (i === 0) {

                zoneLeft =
                    Math.min(
                        start.x,
                        extent.x
                    );

            }

            else {

                const previousEnd =
                    masterText
                        .getEndPositionOfChar(
                            i - 1
                        );


                zoneLeft =
                    (
                        previousEnd.x +
                        start.x
                    ) /
                    2;

            }



            let zoneRight;


            if (
                i ===
                BRAND_TEXT.length - 1
            ) {

                zoneRight =
                    Math.max(
                        end.x,
                        extent.x +
                        extent.width
                    );

            }

            else {

                const nextStart =
                    masterText
                        .getStartPositionOfChar(
                            i + 1
                        );


                zoneRight =
                    (
                        end.x +
                        nextStart.x
                    ) /
                    2;

            }



            clipRect.setAttribute(
                "x",
                zoneLeft
            );


            clipRect.setAttribute(
                "y",
                "0"
            );


            clipRect.setAttribute(
                "width",
                Math.max(
                    0,
                    zoneRight -
                    zoneLeft
                )
            );


            clipRect.setAttribute(
                "height",
                VIEWBOX_HEIGHT
            );


            clip.appendChild(
                clipRect
            );


            generatedDefs.appendChild(
                clip
            );



            const characterWord =
                masterText.cloneNode(
                    true
                );


            characterWord.removeAttribute(
                "id"
            );


            characterWord.setAttribute(
                "opacity",
                "1"
            );


            characterWord.setAttribute(
                "fill",
                "#ffffff"
            );


            characterWord.setAttribute(
                "clip-path",
                "url(#" +
                clipId +
                ")"
            );


            mask.appendChild(
                characterWord
            );


            generatedDefs.appendChild(
                mask
            );



            /*
             * -----------------------------------------------------
             * INDEPENDENT LETTER LAYER
             * -----------------------------------------------------
             */

            const layer =
                document.createElementNS(
                    SVG_NS,
                    "g"
                );


            layer.setAttribute(
                "mask",
                "url(#" +
                maskId +
                ")"
            );


            layer.setAttribute(
                "data-letter-index",
                i
            );


            letterLayers.appendChild(
                layer
            );



            letters.push({

                index: i,

                char:
                    BRAND_TEXT[i],

                layer: layer,

                rows: [],

                zoneLeft:
                    zoneLeft,

                zoneRight:
                    zoneRight,

                visualLeft:
                    extent.x,

                visualRight:
                    extent.x +
                    extent.width,

                visualTop:
                    extent.y,

                visualBottom:
                    extent.y +
                    extent.height

            });

        }

    }



    /* =========================================================
       BUILD MICRO TEXT INSIDE EVERY LETTER LAYER
    ========================================================= */

    function buildMicroText() {

        const rect =
            brand.getBoundingClientRect();


        if (
            rect.width <= 0 ||
            rect.height <= 0
        ) {
            return;
        }


        const microSize =
            cssNumber(
                "--clients-micro-size",
                12
            );


        const gapX =
            cssNumber(
                "--clients-micro-gap-x",
                3
            );


        const gapY =
            cssNumber(
                "--clients-micro-gap-y",
                1
            );


        const scaleX =
            VIEWBOX_WIDTH /
            rect.width;


        const scaleY =
            VIEWBOX_HEIGHT /
            rect.height;


        const svgFontSize =
            microSize *
            Math.min(
                scaleX,
                scaleY
            );


        const characterWidth =
            svgFontSize *
            0.60;


        const wordWidth =
            characterWidth *
            7;


        const horizontalStep =
            wordWidth +
            (
                gapX *
                scaleX
            );


        const verticalStep =
            svgFontSize +
            (
                gapY *
                scaleY
            );


        letters.forEach(
            function (letter) {

                letter.layer.innerHTML = "";

                letter.rows = [];

                /*
                   PERFORMANCE ONLY:
                   build all tiny words off-DOM first, then append once.
                   Geometry / sizes / masks / behavior stay identical.
                */
                const fragment =
                    document.createDocumentFragment();


                let rowIndex = 0;


                for (
                    let y = -verticalStep;
                    y <=
                        VIEWBOX_HEIGHT +
                        verticalStep;
                    y += verticalStep
                ) {

                    const baselineY =
                        y +
                        svgFontSize;


                    const row = {

                        centerY:
                            y +
                            (
                                svgFontSize /
                                2
                            ),

                        words: []

                    };


                    const rowOffset =
                        rowIndex % 2 === 0
                            ? 0
                            : -(horizontalStep / 2);


                    /*
                     * GENERATE ENOUGH WORDS TO COVER
                     * THE WHOLE LETTER.
                     *
                     * THEY EXIST ONLY IN THIS LETTER'S
                     * PRIVATE MASK.
                     */

                    const startX =
                        letter.zoneLeft -
                        horizontalStep * 3;


                    const endX =
                        letter.zoneRight +
                        horizontalStep * 3;


                    for (
                        let x =
                            startX +
                            rowOffset;

                        x <= endX;

                        x += horizontalStep
                    ) {

                        const text =
                            document.createElementNS(
                                SVG_NS,
                                "text"
                            );


                        text.setAttribute(
                            "class",
                            "offform-clients-micro-word"
                        );


                        text.setAttribute(
                            "x",
                            x
                        );


                        text.setAttribute(
                            "y",
                            baselineY
                        );


                        text.setAttribute(
                            "font-size",
                            svgFontSize
                        );


                        text.textContent =
                            "OFFFORM";


                        fragment.appendChild(
                            text
                        );


                        row.words.push({

                            element:
                                text,

                            baseX:
                                x,

                            left:
                                x,

                            right:
                                x +
                                wordWidth,

                            centerX:
                                x +
                                (
                                    wordWidth /
                                    2
                                ),

                            currentX:
                                0,

                            targetX:
                                0,

                            renderedX:
                                null

                        });

                    }


                    letter.rows.push(
                        row
                    );


                    rowIndex++;

                }


                letter.layer.appendChild(
                    fragment
                );

            }
        );

    }



    /* =========================================================
       WHICH LETTER IS THE MOUSE OVER?
    ========================================================= */

    function getLetterAtPoint(
        x,
        y
    ) {

        /*
         * FIRST FIND THE CHARACTER'S
         * OWN NON-OVERLAPPING ZONE.
         */

        for (
            let i = 0;
            i < letters.length;
            i++
        ) {

            const letter =
                letters[i];


            if (
                x >= letter.zoneLeft &&
                x < letter.zoneRight &&
                y >= letter.visualTop &&
                y <= letter.visualBottom
            ) {

                return i;

            }

        }


        return -1;
    }



    /* =========================================================
       MOUSE
    ========================================================= */

    function updateMouse(event) {

        if (wideScreenInteraction.matches) {
            latestClientX = event.clientX;
            latestClientY = event.clientY;
            mouseInside = true;
            pointerNeedsUpdate = true;
            requestAnimation();
            return;
        }

        const rect =
            brand.getBoundingClientRect();


        if (
            rect.width <= 0 ||
            rect.height <= 0
        ) {
            return;
        }


        mouseX =
            (
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width
            ) *
            VIEWBOX_WIDTH;


        mouseY =
            (
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height
            ) *
            VIEWBOX_HEIGHT;


        mouseInside = true;


        activeLetterIndex =
            getLetterAtPoint(
                mouseX,
                mouseY
            );


        requestAnimation();

    }



    /* =========================================================
       RESET TARGETS
    ========================================================= */

    function resetTargets() {

        letters.forEach(
            function (letter) {

                letter.rows.forEach(
                    function (row) {

                        row.words.forEach(
                            function (word) {

                                word.targetX =
                                    0;

                            }
                        );

                    }
                );

            }
        );

    }



    /* =========================================================
       ACTIVE ROWS — FIXED DISTANCE FROM CURSOR
    ========================================================= */

    function getActiveRows(
        letter,
        activeRange
    ) {

        const activeRows = [];


        letter.rows.forEach(
            function (row) {

                const distance =
                    Math.abs(
                        row.centerY -
                        mouseY
                    );


                if (
                    distance <=
                    activeRange
                ) {

                    activeRows.push(
                        row
                    );

                }

            }
        );


        return activeRows;

    }



    /* =========================================================
       OPEN ONLY ONE LETTER
       MULTIPLE ROWS AROUND THE CURSOR
    ========================================================= */

    function calculateTargets() {

        resetTargets();


        if (
            !mouseInside ||
            activeLetterIndex < 0
        ) {
            return;
        }


        const letter =
            letters[
                activeLetterIndex
            ];


        if (!letter) {
            return;
        }


        const rect =
            brand.getBoundingClientRect();


        const scaleX =
            VIEWBOX_WIDTH /
            rect.width;


        const scaleY =
            VIEWBOX_HEIGHT /
            rect.height;


        const cursorGap =
            cssNumber(
                "--clients-cursor-gap",
                20
            ) *
            scaleX;


        const activeRange =
            cssNumber(
                "--clients-row-active-range",
                20
            ) *
            scaleY;


        const activeRows =
            getActiveRows(
                letter,
                activeRange
            );


        if (!activeRows.length) {
            return;
        }



        /* =====================================================
           APPLY THE SAME OPENING
           TO EVERY ROW INSIDE THE ACTIVE RANGE
        ===================================================== */

        activeRows.forEach(
            function (row) {


                /* =================================================
                   SPLIT THIS ROW EXACTLY AT THE CURSOR
                ================================================= */

                const leftWords = [];

                const rightWords = [];


                row.words.forEach(
                    function (word) {

                        if (
                            word.centerX <
                            mouseX
                        ) {

                            leftWords.push(
                                word
                            );

                        }

                        else {

                            rightWords.push(
                                word
                            );

                        }

                    }
                );



                /* =================================================
                   LEFT SIDE
                ================================================= */

                let leftShift = 0;


                if (leftWords.length) {

                    let nearest =
                        leftWords[0];


                    leftWords.forEach(
                        function (word) {

                            if (
                                word.right >
                                nearest.right
                            ) {

                                nearest =
                                    word;

                            }

                        }
                    );


                    const desiredEdge =
                        mouseX -
                        cursorGap;


                    const needed =
                        nearest.right -
                        desiredEdge;


                    leftShift =
                        -Math.max(
                            0,
                            needed
                        );

                }



                /* =================================================
                   RIGHT SIDE
                ================================================= */

                let rightShift = 0;


                if (rightWords.length) {

                    let nearest =
                        rightWords[0];


                    rightWords.forEach(
                        function (word) {

                            if (
                                word.left <
                                nearest.left
                            ) {

                                nearest =
                                    word;

                            }

                        }
                    );


                    const desiredEdge =
                        mouseX +
                        cursorGap;


                    const needed =
                        desiredEdge -
                        nearest.left;


                    rightShift =
                        Math.max(
                            0,
                            needed
                        );

                }



                /* =================================================
                   APPLY TO THIS ACTIVE ROW
                ================================================= */

                leftWords.forEach(
                    function (word) {

                        word.targetX =
                            leftShift;

                    }
                );


                rightWords.forEach(
                    function (word) {

                        word.targetX =
                            rightShift;

                    }
                );

            }
        );

    }



    /* =========================================================
       ANIMATION
    ========================================================= */

    function animate() {

        animationFrame = null;

        if (
            wideScreenInteraction.matches &&
            pointerNeedsUpdate
        ) {
            const rect =
                brand.getBoundingClientRect();

            if (
                rect.width > 0 &&
                rect.height > 0
            ) {
                mouseX =
                    (
                        (
                            latestClientX -
                            rect.left
                        ) /
                        rect.width
                    ) *
                    VIEWBOX_WIDTH;

                mouseY =
                    (
                        (
                            latestClientY -
                            rect.top
                        ) /
                        rect.height
                    ) *
                    VIEWBOX_HEIGHT;

                activeLetterIndex =
                    getLetterAtPoint(
                        mouseX,
                        mouseY
                    );
            }

            pointerNeedsUpdate = false;
        }


        calculateTargets();


        const ease =
            clamp(
                cssNumber(
                    "--clients-mouse-ease",
                    0.16
                ),
                0.01,
                1
            );


        let stillMoving =
            false;


        letters.forEach(
            function (letter) {

                letter.rows.forEach(
                    function (row) {

                        row.words.forEach(
                            function (word) {

                                word.currentX +=
                                    (
                                        word.targetX -
                                        word.currentX
                                    ) *
                                    ease;


                                if (
                                    Math.abs(
                                        word.targetX -
                                        word.currentX
                                    ) >
                                    0.02
                                ) {

                                    stillMoving =
                                        true;

                                }


                                /*
                                 * X ONLY.
                                 * NO VERTICAL MOVEMENT.
                                 */

                                const renderedX =
                                    word.currentX.toFixed(2);

                                if (
                                    !wideScreenInteraction.matches ||
                                    word.renderedX !== renderedX
                                ) {
                                    word.element.setAttribute(
                                        "transform",
                                        "translate(" +
                                        renderedX +
                                        " 0)"
                                    );

                                    word.renderedX =
                                        renderedX;
                                }

                            }
                        );

                    }
                );

            }
        );


        if (
            stillMoving
        ) {

            requestAnimation();

        }

    }



    function requestAnimation() {

        if (animationFrame) {
            return;
        }


        animationFrame =
            requestAnimationFrame(
                animate
            );

    }



    /* =========================================================
       EVENTS
    ========================================================= */

    brand.addEventListener(
        "mousemove",
        updateMouse
    );


    brand.addEventListener(
        "mouseenter",
        updateMouse
    );


    brand.addEventListener(
        "mouseleave",
        function () {

            mouseInside = false;

            pointerNeedsUpdate = false;

            activeLetterIndex = -1;

            requestAnimation();

        }
    );

    /* =========================================================
       BUILD
    ========================================================= */

    function build() {

        mouseInside = false;

        activeLetterIndex = -1;


        buildLetterMasks();

        buildMicroText();


        requestAnimation();

    }



    /* =========================================================
       RESIZE
    ========================================================= */

    let resizeTimer =
        null;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    build,
                    80
                );

        },
        {
            passive: true
        }
    );



    /* =========================================================
       INITIAL
    ========================================================= */

    requestAnimationFrame(
        build
    );

})();;
(function () {

    /* =========================================================
       MOBILE FOOTER ONLY — ONE TAP + OFFFORM PINK PRESS
       LEGAL + NAVIGATION ONLY
       Desktop / tablet / wide / all other footer behavior untouched.
    ========================================================= */

    if (!window.matchMedia("(max-width: 767px)").matches) {
        return;
    }

    const footerLinks =
        document.querySelectorAll(
            ".offform-clients-column:nth-child(2) .offform-clients-column-list a, " +
            ".offform-clients-column:nth-child(4) .offform-clients-column-list a"
        );


    footerLinks.forEach(
        function (link) {

            link.addEventListener(
                "touchstart",
                function () {

                    link.classList.add(
                        "is-active"
                    );

                },
                {
                    passive: true
                }
            );


            link.addEventListener(
                "touchcancel",
                function () {

                    link.classList.remove(
                        "is-active"
                    );

                },
                {
                    passive: true
                }
            );


            link.addEventListener(
                "touchend",
                function (event) {

                    event.preventDefault();
                    event.stopImmediatePropagation();

                    /*
                     * Keep the site's own pink state visible for a
                     * brief instant, then use the link's NORMAL click
                     * behavior. This keeps the existing footer
                     * navigation logic intact and makes one tap reliable.
                     */
                    setTimeout(
                        function () {

                            link.classList.remove(
                                "is-active"
                            );

                            link.click();

                        },
                        90
                    );

                },
                {
                    passive: false
                }
            );

        }
    );

})();;
(function () {

    const footerNavLinks =
        document.querySelectorAll(
            ".offform-clients-column:nth-child(4) .offform-clients-column-list a"
        );


    if (!footerNavLinks.length) {
        return;
    }


    footerNavLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (!href) {
                        return;
                    }


                    const localTarget =
                        href.charAt(0) === "#"
                            ? document.querySelector(href)
                            : null;


                    /*
                     * GLOBAL FOOTER:
                     * On inner / legal pages the HOME section does not exist.
                     * Return to the matching HOME section.
                     *
                     * On HOME itself, keep the existing footer → header
                     * delegation completely unchanged.
                     */
                    if (
                        href.charAt(0) === "#" &&
                        !localTarget
                    ) {

                        event.preventDefault();

                        window.location.href =
                            "/" + href;

                        return;
                    }


                    const isMobile =
                        window.matchMedia(
                            "(max-width: 767px)"
                        ).matches;


                    /*
                     * DO NOT RE-CREATE THE STICKY SCROLL HERE.
                     * USE THE REAL HEADER LINK ITSELF.
                     *
                     * That means ABOUT / TALENTS / SERVICES / CONTACT
                     * get EXACTLY the same target and sticky/pin behavior
                     * as when they are clicked in the header.
                     */
                    const headerLink =
                        document.querySelector(
                            (
                                isMobile
                                    ? ".offform-mobile-menu a"
                                    : ".offform-nav a"
                            ) +
                            '[href="' + href + '"]'
                        );


                    if (!headerLink) {
                        return;
                    }


                    event.preventDefault();


                    headerLink.click();

                }
            );

        }
    );

})();;
(function () {

    const section =
        document.querySelector(
            ".offform-clients"
        );

    if (!section) {
        return;
    }

    const copyright =
        section.querySelector(
            ".offform-clients-copyright"
        );

    const desktopBrand =
        section.querySelector(
            ".offform-clients-brand"
        );

    const desktopSvg =
        section.querySelector(
            ".offform-clients-brand-svg"
        );

    const desktopMaster =
        section.querySelector(
            "#offform-clients-master-text"
        );

    const mobileBrand =
        section.querySelector(
            ".offform-clients-brand-mobile"
        );

    const mobileSvg =
        section.querySelector(
            ".offform-clients-brand-mobile-svg"
        );

    const mobileWord =
        mobileSvg
            ? mobileSvg.querySelector(":scope > text")
            : null;

    if (!copyright) {
        return;
    }

    function cssNumber(name) {

        const value =
            parseFloat(
                getComputedStyle(section)
                    .getPropertyValue(name)
            );

        return Number.isFinite(value)
            ? value
            : 0;
    }

    function getInkTopInSvgUnits(
        textElement
    ) {

        if (!textElement) {
            return null;
        }

        const fontSize =
            parseFloat(
                textElement.getAttribute(
                    "font-size"
                )
            ) || 300;

        const baseline =
            parseFloat(
                textElement.getAttribute(
                    "y"
                )
            ) || 290;

        const fontFamily =
            textElement.getAttribute(
                "font-family"
            ) ||
            "Arial Black, Arial, Helvetica, sans-serif";

        const fontWeight =
            textElement.getAttribute(
                "font-weight"
            ) ||
            "900";

        const canvas =
            document.createElement(
                "canvas"
            );

        const context =
            canvas.getContext(
                "2d"
            );

        if (!context) {
            return null;
        }

        context.font =
            fontWeight +
            " " +
            fontSize +
            "px " +
            fontFamily;

        const metrics =
            context.measureText(
                "M"
            );

        const ascent =
            metrics.actualBoundingBoxAscent;

        if (
            !Number.isFinite(ascent) ||
            ascent <= 0
        ) {
            return null;
        }

        return baseline - ascent;
    }

    function positionCopyright() {

        const isMobile =
            window.matchMedia(
                "(max-width: 767px)"
            ).matches;

        const isWide =
            window.matchMedia(
                "(min-width: 1520px)"
            ).matches;

        const isTablet =
            window.matchMedia(
                "(min-width: 768px) and (max-width: 1024px)"
            ).matches;

        const brand =
            isMobile
                ? mobileBrand
                : desktopBrand;

        const svg =
            isMobile
                ? mobileSvg
                : desktopSvg;

        const word =
            isMobile
                ? mobileWord
                : desktopMaster;

        if (
            !brand ||
            !svg ||
            !word
        ) {
            return;
        }

        const brandRect =
            brand.getBoundingClientRect();

        const svgRect =
            svg.getBoundingClientRect();

        const visualRect =
            isMobile
                ? svgRect
                : brandRect;

        const sectionRect =
            section.getBoundingClientRect();

        const viewBox =
            svg.viewBox.baseVal;

        if (
            !viewBox ||
            !viewBox.width ||
            !viewBox.height ||
            visualRect.width <= 0 ||
            visualRect.height <= 0
        ) {
            return;
        }

        const inkTopSvg =
            getInkTopInSvgUnits(
                word
            );

        if (inkTopSvg === null) {
            return;
        }

        let lastCharExtent;

        try {

            const content =
                word.textContent.trim();

            lastCharExtent =
                word.getExtentOfChar(
                    content.length - 1
                );
        }

        catch (error) {
            return;
        }

        const mInkTop =
            visualRect.top +
            (
                (
                    inkTopSvg -
                    viewBox.y
                ) /
                viewBox.height
            ) *
            visualRect.height;

        const mRight =
            visualRect.left +
            (
                (
                    lastCharExtent.x +
                    lastCharExtent.width -
                    viewBox.x
                ) /
                viewBox.width
            ) *
            visualRect.width;

        const gap =
            isMobile
                ? cssNumber(
                    "--clients-copyright-gap-mobile"
                )
                : (
                    isWide
                        ? cssNumber(
                            "--clients-copyright-gap-wide"
                        )
                        : cssNumber(
                            "--clients-copyright-gap-desktop"
                        )
                );

        /*
         * BELOW THE FINAL M.
         * The large OFFFORM wordmark itself is NOT moved.
         * Its existing bottom spacing stays exactly unchanged.
         *
         * 0px = top edge of © 2026 touches
         * the visual bottom of the final M.
         */
        const fontSize =
            parseFloat(
                word.getAttribute(
                    "font-size"
                )
            ) || 300;

        const baseline =
            parseFloat(
                word.getAttribute(
                    "y"
                )
            ) || 290;

        const fontFamily =
            word.getAttribute(
                "font-family"
            ) ||
            "Arial Black, Arial, Helvetica, sans-serif";

        const fontWeight =
            word.getAttribute(
                "font-weight"
            ) ||
            "900";

        const canvas =
            document.createElement(
                "canvas"
            );

        const context =
            canvas.getContext(
                "2d"
            );

        if (!context) {
            return;
        }

        context.font =
            fontWeight +
            " " +
            fontSize +
            "px " +
            fontFamily;

        const metrics =
            context.measureText(
                "M"
            );

        const descent =
            metrics.actualBoundingBoxDescent;

        if (
            !Number.isFinite(descent) ||
            descent < 0
        ) {
            return;
        }

        const inkBottomSvg =
            baseline +
            descent;

        const mInkBottom =
            visualRect.top +
            (
                (
                    inkBottomSvg -
                    viewBox.y
                ) /
                viewBox.height
            ) *
            visualRect.height;

        const top =
            mInkBottom -
            sectionRect.top +
            gap;

        const rightMargin =
            isMobile
                ? cssNumber(
                    "--clients-copyright-right-mobile"
                )
                : (
                    isTablet
                        ? cssNumber(
                            "--clients-copyright-right-tablet"
                        )
                        : (
                            isWide
                                ? cssNumber(
                                    "--clients-copyright-right-wide"
                                )
                                : cssNumber(
                                    "--clients-copyright-right-desktop"
                                )
                        )
                );

        let right;

        if (isMobile) {

            /*
             * MOBILE ONLY:
             * Safari/iOS can report the last SVG character extent
             * inconsistently when textLength + lengthAdjust are used.
             *
             * The mobile word is explicitly:
             *   viewBox = -40 0 1680 320
             *   text x = 0
             *   textLength = 1600
             *
             * So the intended visual end of the final M is always
             * 40 SVG units before the right edge of the viewBox.
             * Convert that fixed SVG geometry directly to rendered px.
             */
            const mobileViewBoxRight =
                viewBox.x +
                viewBox.width;

            const mobileWordRightSvg =
                0 +
                1600;

            const mobileRightGapSvg =
                Math.max(
                    0,
                    mobileViewBoxRight -
                    mobileWordRightSvg
                );

            right =
                Math.max(
                    rightMargin,
                    (
                        mobileRightGapSvg /
                        viewBox.width
                    ) *
                    visualRect.width
                );

        }

        else {

            /*
             * WIDE SCREEN ONLY:
             * Align the right edge of © 2026 with the real visual
             * right edge of the final M.
             *
             * The previous wide-screen calculation added the 20px
             * screen margin a second time after already measuring
             * the M's real right edge, which created the extra gap.
             *
             * Normal desktop keeps its existing calculation unchanged.
             */
            if (isWide) {

                right =
                    Math.max(
                        rightMargin,
                        sectionRect.right -
                        mRight
                    );

            }

            else {

                right =
                    Math.max(
                        rightMargin,
                        sectionRect.right -
                        mRight +
                        rightMargin
                    );

            }

        }

        copyright.style.top =
            top.toFixed(2) +
            "px";

        copyright.style.bottom =
            "auto";

        copyright.style.right =
            right.toFixed(2) +
            "px";
    }

    requestAnimationFrame(
        function () {
            requestAnimationFrame(
                positionCopyright
            );
        }
    );

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(
            positionCopyright
        );
    }

    let resizeTimer =
        null;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(
                    positionCopyright,
                    80
                );
        },
        {
            passive: true
        }
    );

})();;
( () => {
					const lazyloadRunObserver = () => {
						const lazyloadBackgrounds = document.querySelectorAll( `.e-con.e-parent:not(.e-lazyloaded)` );
						const lazyloadBackgroundObserver = new IntersectionObserver( ( entries ) => {
							entries.forEach( ( entry ) => {
								if ( entry.isIntersecting ) {
									let lazyloadBackground = entry.target;
									if( lazyloadBackground ) {
										lazyloadBackground.classList.add( 'e-lazyloaded' );
									}
									lazyloadBackgroundObserver.unobserve( entry.target );
								}
							});
						}, { rootMargin: '200px 0px 200px 0px' } );
						lazyloadBackgrounds.forEach( ( lazyloadBackground ) => {
							lazyloadBackgroundObserver.observe( lazyloadBackground );
						} );
					};
					const events = [
						'DOMContentLoaded',
						'elementor/lazyload/observe',
					];
					events.forEach( ( event ) => {
						document.addEventListener( event, lazyloadRunObserver );
					} );
				} )();;
!function(){class e{constructor(){this.initSettings(),this.initElements(),this.bindEvents()}initSettings(){this.settings={selectors:{menuToggle:".site-header .site-navigation-toggle",menuToggleHolder:".site-header .site-navigation-toggle-holder",dropdownMenu:".site-header .site-navigation-dropdown"}}}initElements(){this.elements={window,menuToggle:document.querySelector(this.settings.selectors.menuToggle),menuToggleHolder:document.querySelector(this.settings.selectors.menuToggleHolder),dropdownMenu:document.querySelector(this.settings.selectors.dropdownMenu)}}bindEvents(){this.elements.menuToggleHolder&&!this.elements.menuToggleHolder?.classList.contains("hide")&&(this.elements.menuToggle.addEventListener("click",()=>this.handleMenuToggle()),this.elements.dropdownMenu.querySelectorAll(".menu-item-has-children > a").forEach(e=>e.addEventListener("click",e=>this.handleMenuChildren(e))))}closeMenuItems(){this.elements.menuToggleHolder.classList.remove("elementor-active"),this.elements.window.removeEventListener("resize",()=>this.closeMenuItems())}handleMenuToggle(){const e=!this.elements.menuToggleHolder.classList.contains("elementor-active");this.elements.menuToggle.setAttribute("aria-expanded",e),this.elements.dropdownMenu.setAttribute("aria-hidden",!e),this.elements.dropdownMenu.inert=!e,this.elements.menuToggleHolder.classList.toggle("elementor-active",e),this.elements.dropdownMenu.querySelectorAll(".elementor-active").forEach(e=>e.classList.remove("elementor-active")),e?this.elements.window.addEventListener("resize",()=>this.closeMenuItems()):this.elements.window.removeEventListener("resize",()=>this.closeMenuItems())}handleMenuChildren(e){const t=e.currentTarget.parentElement;t?.classList&&t.classList.toggle("elementor-active")}}document.addEventListener("DOMContentLoaded",()=>{new e})}();
/* Elementor bundles are self-contained; this file exists for the elementor-webpack-runtime handle. */
;
"use strict";(function(){var __esmMin=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},__commonJSMin=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),e=__commonJSMin(((e,t)=>{function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}t.exports=_interopRequireDefault,t.exports.__esModule=!0,t.exports.default=t.exports})),t=__commonJSMin(((e,t)=>{var check=function(e){return e&&e.Math===Math&&e};t.exports=check(typeof globalThis==`object`&&globalThis)||check(typeof window==`object`&&window)||check(typeof self==`object`&&self)||check(typeof global==`object`&&global)||check(typeof e==`object`&&e)||(function(){return this})()||Function(`return this`)()})),n=__commonJSMin(((e,t)=>{t.exports=function(e){try{return!!e()}catch(e){return!0}}})),r=__commonJSMin(((e,t)=>{t.exports=!n()(function(){return Object.defineProperty({},1,{get:function(){return 7}})[1]!==7})})),i=__commonJSMin(((e,t)=>{t.exports=!n()(function(){var e=(function(){}).bind();return typeof e!=`function`||e.hasOwnProperty(`prototype`)})})),a=__commonJSMin(((e,t)=>{var n=i(),r=Function.prototype.call;t.exports=n?r.bind(r):function(){return r.apply(r,arguments)}})),o=__commonJSMin((e=>{var t={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor;e.f=n&&!t.call({1:2},1)?function propertyIsEnumerable(e){var t=n(this,e);return!!t&&t.enumerable}:t})),s=__commonJSMin(((e,t)=>{t.exports=function(e,t){return{enumerable:!(e&1),configurable:!(e&2),writable:!(e&4),value:t}}})),c=__commonJSMin(((e,t)=>{var n=i(),r=Function.prototype,a=r.call,o=n&&r.bind.bind(a,a);t.exports=n?o:function(e){return function(){return a.apply(e,arguments)}}})),l=__commonJSMin(((e,t)=>{var n=c(),r=n({}.toString),i=n(``.slice);t.exports=function(e){return i(r(e),8,-1)}})),u=__commonJSMin(((e,t)=>{var r=c(),i=n(),a=l(),o=Object,s=r(``.split);t.exports=i(function(){return!o(`z`).propertyIsEnumerable(0)})?function(e){return a(e)===`String`?s(e,``):o(e)}:o})),d=__commonJSMin(((e,t)=>{t.exports=function(e){return e==null}})),f=__commonJSMin(((e,t)=>{var n=d(),r=TypeError;t.exports=function(e){if(n(e))throw new r(`Can't call method on `+e);return e}})),p=__commonJSMin(((e,t)=>{var n=u(),r=f();t.exports=function(e){return n(r(e))}})),m=__commonJSMin(((e,t)=>{var n=typeof document==`object`&&document.all;t.exports=n===void 0&&n!==void 0?function(e){return typeof e==`function`||e===n}:function(e){return typeof e==`function`}})),h=__commonJSMin(((e,t)=>{var n=m();t.exports=function(e){return typeof e==`object`?e!==null:n(e)}})),g=__commonJSMin(((e,n)=>{var r=t(),i=m(),aFunction=function(e){return i(e)?e:void 0};n.exports=function(e,t){return arguments.length<2?aFunction(r[e]):r[e]&&r[e][t]}})),_=__commonJSMin(((e,t)=>{t.exports=c()({}.isPrototypeOf)})),v=__commonJSMin(((e,n)=>{var r=t().navigator,i=r&&r.userAgent;n.exports=i?String(i):``})),y=__commonJSMin(((e,n)=>{var r=t(),i=v(),a=r.process,o=r.Deno,s=a&&a.versions||o&&o.version,c=s&&s.v8,l,u;c&&(l=c.split(`.`),u=l[0]>0&&l[0]<4?1:+(l[0]+l[1])),!u&&i&&(l=i.match(/Edge\/(\d+)/),(!l||l[1]>=74)&&(l=i.match(/Chrome\/(\d+)/),l&&(u=+l[1]))),n.exports=u})),b=__commonJSMin(((e,r)=>{var i=y(),a=n(),o=t().String;r.exports=!!Object.getOwnPropertySymbols&&!a(function(){var e=Symbol(`symbol detection`);return!o(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&i&&i<41})})),x=__commonJSMin(((e,t)=>{t.exports=b()&&!Symbol.sham&&typeof Symbol.iterator==`symbol`})),S=__commonJSMin(((e,t)=>{var n=g(),r=m(),i=_(),a=x(),o=Object;t.exports=a?function(e){return typeof e==`symbol`}:function(e){var t=n(`Symbol`);return r(t)&&i(t.prototype,o(e))}})),C=__commonJSMin(((e,t)=>{var n=String;t.exports=function(e){try{return n(e)}catch(e){return`Object`}}})),w=__commonJSMin(((e,t)=>{var n=m(),r=C(),i=TypeError;t.exports=function(e){if(n(e))return e;throw new i(r(e)+` is not a function`)}})),T=__commonJSMin(((e,t)=>{var n=w(),r=d();t.exports=function(e,t){var i=e[t];return r(i)?void 0:n(i)}})),E=__commonJSMin(((e,t)=>{var n=a(),r=m(),i=h(),o=TypeError;t.exports=function(e,t){var a,s;if(t===`string`&&r(a=e.toString)&&!i(s=n(a,e))||r(a=e.valueOf)&&!i(s=n(a,e))||t!==`string`&&r(a=e.toString)&&!i(s=n(a,e)))return s;throw new o(`Can't convert object to primitive value`)}})),D=__commonJSMin(((e,t)=>{t.exports=!1})),O=__commonJSMin(((e,n)=>{var r=t(),i=Object.defineProperty;n.exports=function(e,t){try{i(r,e,{value:t,configurable:!0,writable:!0})}catch(n){r[e]=t}return t}})),k=__commonJSMin(((e,n)=>{var r=D(),i=t(),a=O(),o=`__core-js_shared__`,s=n.exports=i[o]||a(o,{});(s.versions||(s.versions=[])).push({version:`3.46.0`,mode:r?`pure`:`global`,copyright:`© 2014-2025 Denis Pushkarev (zloirock.ru), 2025 CoreJS Company (core-js.io)`,license:`https://github.com/zloirock/core-js/blob/v3.46.0/LICENSE`,source:`https://github.com/zloirock/core-js`})})),ee=__commonJSMin(((e,t)=>{var n=k();t.exports=function(e,t){return n[e]||(n[e]=t||{})}})),A=__commonJSMin(((e,t)=>{var n=f(),r=Object;t.exports=function(e){return r(n(e))}})),j=__commonJSMin(((e,t)=>{var n=c(),r=A(),i=n({}.hasOwnProperty);t.exports=Object.hasOwn||function hasOwn(e,t){return i(r(e),t)}})),te=__commonJSMin(((e,t)=>{var n=c(),r=0,i=Math.random(),a=n(1.1.toString);t.exports=function(e){return`Symbol(`+(e===void 0?``:e)+`)_`+a(++r+i,36)}})),M=__commonJSMin(((e,n)=>{var r=t(),i=ee(),a=j(),o=te(),s=b(),c=x(),l=r.Symbol,u=i(`wks`),d=c?l.for||l:l&&l.withoutSetter||o;n.exports=function(e){return a(u,e)||(u[e]=s&&a(l,e)?l[e]:d(`Symbol.`+e)),u[e]}})),ne=__commonJSMin(((e,t)=>{var n=a(),r=h(),i=S(),o=T(),s=E(),c=M(),l=TypeError,u=c(`toPrimitive`);t.exports=function(e,t){if(!r(e)||i(e))return e;var a=o(e,u),c;if(a){if(t===void 0&&(t=`default`),c=n(a,e,t),!r(c)||i(c))return c;throw new l(`Can't convert object to primitive value`)}return t===void 0&&(t=`number`),s(e,t)}})),re=__commonJSMin(((e,t)=>{var n=ne(),r=S();t.exports=function(e){var t=n(e,`string`);return r(t)?t:t+``}})),ie=__commonJSMin(((e,n)=>{var r=t(),i=h(),a=r.document,o=i(a)&&i(a.createElement);n.exports=function(e){return o?a.createElement(e):{}}})),ae=__commonJSMin(((e,t)=>{var i=r(),a=n(),o=ie();t.exports=!i&&!a(function(){return Object.defineProperty(o(`div`),"a",{get:function(){return 7}}).a!==7})})),oe=__commonJSMin((e=>{var t=r(),n=a(),i=o(),c=s(),l=p(),u=re(),d=j(),f=ae(),m=Object.getOwnPropertyDescriptor;e.f=t?m:function getOwnPropertyDescriptor(e,t){if(e=l(e),t=u(t),f)try{return m(e,t)}catch(e){}if(d(e,t))return c(!n(i.f,e,t),e[t])}})),se=__commonJSMin(((e,t)=>{var i=r(),a=n();t.exports=i&&a(function(){return Object.defineProperty(function(){},"prototype",{value:42,writable:!1}).prototype!==42})})),N=__commonJSMin(((e,t)=>{var n=h(),r=String,i=TypeError;t.exports=function(e){if(n(e))return e;throw new i(r(e)+` is not an object`)}})),P=__commonJSMin((e=>{var t=r(),n=ae(),i=se(),a=N(),o=re(),s=TypeError,c=Object.defineProperty,l=Object.getOwnPropertyDescriptor,u=`enumerable`,d=`configurable`,f=`writable`;e.f=t?i?function defineProperty(e,t,n){if(a(e),t=o(t),a(n),typeof e==`function`&&t===`prototype`&&`value`in n&&f in n&&!n[f]){var r=l(e,t);r&&r[f]&&(e[t]=n.value,n={configurable:d in n?n[d]:r[d],enumerable:u in n?n[u]:r[u],writable:!1})}return c(e,t,n)}:c:function defineProperty(e,t,r){if(a(e),t=o(t),a(r),n)try{return c(e,t,r)}catch(e){}if(`get`in r||`set`in r)throw new s(`Accessors not supported`);return`value`in r&&(e[t]=r.value),e}})),I=__commonJSMin(((e,t)=>{var n=r(),i=P(),a=s();t.exports=n?function(e,t,n){return i.f(e,t,a(1,n))}:function(e,t,n){return e[t]=n,e}})),ce=__commonJSMin(((e,t)=>{var n=r(),i=j(),a=Function.prototype,o=n&&Object.getOwnPropertyDescriptor,s=i(a,`name`);t.exports={EXISTS:s,PROPER:s&&(function something(){}).name===`something`,CONFIGURABLE:s&&(!n||n&&o(a,`name`).configurable)}})),le=__commonJSMin(((e,t)=>{var n=c(),r=m(),i=k(),a=n(Function.toString);r(i.inspectSource)||(i.inspectSource=function(e){return a(e)}),t.exports=i.inspectSource})),ue=__commonJSMin(((e,n)=>{var r=t(),i=m(),a=r.WeakMap;n.exports=i(a)&&/native code/.test(String(a))})),L=__commonJSMin(((e,t)=>{var n=ee(),r=te(),i=n(`keys`);t.exports=function(e){return i[e]||(i[e]=r(e))}})),R=__commonJSMin(((e,t)=>{t.exports={}})),de=__commonJSMin(((e,n)=>{var r=ue(),i=t(),a=h(),o=I(),s=j(),c=k(),l=L(),u=R(),d=`Object already initialized`,f=i.TypeError,p=i.WeakMap,set,get,has,enforce=function(e){return has(e)?get(e):set(e,{})},getterFor=function(e){return function(t){var n;if(!a(t)||(n=get(t)).type!==e)throw new f(`Incompatible receiver, `+e+` required`);return n}};if(r||c.state){var m=c.state||(c.state=new p);m.get=m.get,m.has=m.has,m.set=m.set,set=function(e,t){if(m.has(e))throw new f(d);return t.facade=e,m.set(e,t),t},get=function(e){return m.get(e)||{}},has=function(e){return m.has(e)}}else{var g=l(`state`);u[g]=!0,set=function(e,t){if(s(e,g))throw new f(d);return t.facade=e,o(e,g,t),t},get=function(e){return s(e,g)?e[g]:{}},has=function(e){return s(e,g)}}n.exports={set,get,has,enforce,getterFor}})),fe=__commonJSMin(((e,t)=>{var i=c(),a=n(),o=m(),s=j(),l=r(),u=ce().CONFIGURABLE,d=le(),f=de(),p=f.enforce,h=f.get,g=String,_=Object.defineProperty,v=i(``.slice),y=i(``.replace),b=i([].join),x=l&&!a(function(){return _(function(){},`length`,{value:8}).length!==8}),S=String(String).split(`String`),C=t.exports=function(e,t,n){v(g(t),0,7)===`Symbol(`&&(t=`[`+y(g(t),/^Symbol\(([^)]*)\).*$/,`$1`)+`]`),n&&n.getter&&(t=`get `+t),n&&n.setter&&(t=`set `+t),(!s(e,`name`)||u&&e.name!==t)&&(l?_(e,`name`,{value:t,configurable:!0}):e.name=t),x&&n&&s(n,`arity`)&&e.length!==n.arity&&_(e,`length`,{value:n.arity});try{n&&s(n,`constructor`)&&n.constructor?l&&_(e,`prototype`,{writable:!1}):e.prototype&&(e.prototype=void 0)}catch(e){}var r=p(e);return s(r,`source`)||(r.source=b(S,typeof t==`string`?t:``)),e};Function.prototype.toString=C(function toString(){return o(this)&&h(this).source||d(this)},`toString`)})),z=__commonJSMin(((e,t)=>{var n=m(),r=P(),i=fe(),a=O();t.exports=function(e,t,o,s){s||(s={});var c=s.enumerable,l=s.name===void 0?t:s.name;if(n(o)&&i(o,l,s),s.global)c?e[t]=o:a(t,o);else{try{s.unsafe?e[t]&&(c=!0):delete e[t]}catch(e){}c?e[t]=o:r.f(e,t,{value:o,enumerable:!1,configurable:!s.nonConfigurable,writable:!s.nonWritable})}return e}})),pe=__commonJSMin(((e,t)=>{var n=Math.ceil,r=Math.floor;t.exports=Math.trunc||function trunc(e){var t=+e;return(t>0?r:n)(t)}})),me=__commonJSMin(((e,t)=>{var n=pe();t.exports=function(e){var t=+e;return t!==t||t===0?0:n(t)}})),he=__commonJSMin(((e,t)=>{var n=me(),r=Math.max,i=Math.min;t.exports=function(e,t){var a=n(e);return a<0?r(a+t,0):i(a,t)}})),ge=__commonJSMin(((e,t)=>{var n=me(),r=Math.min;t.exports=function(e){var t=n(e);return t>0?r(t,9007199254740991):0}})),B=__commonJSMin(((e,t)=>{var n=ge();t.exports=function(e){return n(e.length)}})),_e=__commonJSMin(((e,t)=>{var n=p(),r=he(),i=B(),createMethod=function(e){return function(t,a,o){var s=n(t),c=i(s);if(c===0)return!e&&-1;var l=r(o,c),u;if(e&&a!==a){for(;c>l;)if(u=s[l++],u!==u)return!0}else for(;c>l;l++)if((e||l in s)&&s[l]===a)return e||l||0;return!e&&-1}};t.exports={includes:createMethod(!0),indexOf:createMethod(!1)}})),ve=__commonJSMin(((e,t)=>{var n=c(),r=j(),i=p(),a=_e().indexOf,o=R(),s=n([].push);t.exports=function(e,t){var n=i(e),c=0,l=[],u;for(u in n)!r(o,u)&&r(n,u)&&s(l,u);for(;t.length>c;)r(n,u=t[c++])&&(~a(l,u)||s(l,u));return l}})),V=__commonJSMin(((e,t)=>{t.exports=[`constructor`,`hasOwnProperty`,`isPrototypeOf`,`propertyIsEnumerable`,`toLocaleString`,`toString`,`valueOf`]})),ye=__commonJSMin((e=>{var t=ve(),n=V().concat(`length`,`prototype`);e.f=Object.getOwnPropertyNames||function getOwnPropertyNames(e){return t(e,n)}})),be=__commonJSMin((e=>{e.f=Object.getOwnPropertySymbols})),xe=__commonJSMin(((e,t)=>{var n=g(),r=c(),i=ye(),a=be(),o=N(),s=r([].concat);t.exports=n(`Reflect`,`ownKeys`)||function ownKeys(e){var t=i.f(o(e)),n=a.f;return n?s(t,n(e)):t}})),Se=__commonJSMin(((e,t)=>{var n=j(),r=xe(),i=oe(),a=P();t.exports=function(e,t,o){for(var s=r(t),c=a.f,l=i.f,u=0;u<s.length;u++){var d=s[u];!n(e,d)&&!(o&&n(o,d))&&c(e,d,l(t,d))}}})),Ce=__commonJSMin(((e,t)=>{var r=n(),i=m(),a=/#|\.prototype\./,isForced=function(e,t){var n=s[o(e)];return n===l?!0:n===c?!1:i(t)?r(t):!!t},o=isForced.normalize=function(e){return String(e).replace(a,`.`).toLowerCase()},s=isForced.data={},c=isForced.NATIVE=`N`,l=isForced.POLYFILL=`P`;t.exports=isForced})),H=__commonJSMin(((e,n)=>{var r=t(),i=oe().f,a=I(),o=z(),s=O(),c=Se(),l=Ce();n.exports=function(e,t){var n=e.target,u=e.global,d=e.stat,f,p=u?r:d?r[n]||s(n,{}):r[n]&&r[n].prototype,m,h,g,_;if(p)for(m in t){if(g=t[m],e.dontCallGetSet?(_=i(p,m),h=_&&_.value):h=p[m],f=l(u?m:n+(d?`.`:`#`)+m,e.forced),!f&&h!==void 0){if(typeof g==typeof h)continue;c(g,h)}(e.sham||h&&h.sham)&&a(g,`sham`,!0),o(p,m,g,e)}}})),we=__commonJSMin(((e,t)=>{var n=l();t.exports=Array.isArray||function isArray(e){return n(e)===`Array`}})),Te=__commonJSMin(((e,t)=>{var n=r(),i=we(),a=TypeError,o=Object.getOwnPropertyDescriptor;t.exports=n&&!function(){if(this!==void 0)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}()?function(e,t){if(i(e)&&!o(e,`length`).writable)throw new a(`Cannot set read only .length`);return e.length=t}:function(e,t){return e.length=t}})),Ee=__commonJSMin(((e,t)=>{var n=TypeError,r=9007199254740991;t.exports=function(e){if(e>r)throw n(`Maximum allowed index exceeded`);return e}})),U=__commonJSMin((()=>{var e=H(),t=A(),r=B(),i=Te(),a=Ee(),o=n()(function(){return[].push.call({length:4294967296},1)!==4294967297}),properErrorOnNonWritableLength=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}};e({target:`Array`,proto:!0,arity:1,forced:o||!properErrorOnNonWritableLength()},{push:function push(e){var n=t(this),o=r(n),s=arguments.length;a(o+s);for(var c=0;c<s;c++)n[o]=arguments[c],o++;return i(n,o),o}})})),De=__commonJSMin(((e,t)=>{var n=_(),r=TypeError;t.exports=function(e,t){if(n(t,e))return e;throw new r(`Incorrect invocation`)}})),Oe=__commonJSMin(((e,t)=>{t.exports=!n()(function(){function F(){}return F.prototype.constructor=null,Object.getPrototypeOf(new F)!==F.prototype})})),ke=__commonJSMin(((e,t)=>{var n=j(),r=m(),i=A(),a=L(),o=Oe(),s=a(`IE_PROTO`),c=Object,l=c.prototype;t.exports=o?c.getPrototypeOf:function(e){var t=i(e);if(n(t,s))return t[s];var a=t.constructor;return r(a)&&t instanceof a?a.prototype:t instanceof c?l:null}})),Ae=__commonJSMin(((e,t)=>{var n=fe(),r=P();t.exports=function(e,t,i){return i.get&&n(i.get,t,{getter:!0}),i.set&&n(i.set,t,{setter:!0}),r.f(e,t,i)}})),je=__commonJSMin(((e,t)=>{var n=r(),i=P(),a=s();t.exports=function(e,t,r){n?i.f(e,t,a(0,r)):e[t]=r}})),Me=__commonJSMin(((e,t)=>{var n=ve(),r=V();t.exports=Object.keys||function keys(e){return n(e,r)}})),Ne=__commonJSMin((e=>{var t=r(),n=se(),i=P(),a=N(),o=p(),s=Me();e.f=t&&!n?Object.defineProperties:function defineProperties(e,t){a(e);for(var n=o(t),r=s(t),c=r.length,l=0,u;c>l;)i.f(e,u=r[l++],n[u]);return e}})),Pe=__commonJSMin(((e,t)=>{t.exports=g()(`document`,`documentElement`)})),W=__commonJSMin(((e,t)=>{var n=N(),r=Ne(),i=V(),a=R(),o=Pe(),s=ie(),c=L(),l=`>`,u=`<`,d=`prototype`,f=`script`,p=c(`IE_PROTO`),EmptyConstructor=function(){},scriptTag=function(e){return u+f+l+e+u+`/`+f+l},NullProtoObjectViaActiveX=function(e){e.write(scriptTag(``)),e.close();var t=e.parentWindow.Object;return e=null,t},NullProtoObjectViaIFrame=function(){var e=s(`iframe`),t=`java`+f+`:`,n;return e.style.display=`none`,o.appendChild(e),e.src=String(t),n=e.contentWindow.document,n.open(),n.write(scriptTag(`document.F=Object`)),n.close(),n.F},m,NullProtoObject=function(){try{m=new ActiveXObject(`htmlfile`)}catch(e){}NullProtoObject=typeof document<`u`?document.domain&&m?NullProtoObjectViaActiveX(m):NullProtoObjectViaIFrame():NullProtoObjectViaActiveX(m);for(var e=i.length;e--;)delete NullProtoObject[d][i[e]];return NullProtoObject()};a[p]=!0,t.exports=Object.create||function create(e,t){var i;return e===null?i=NullProtoObject():(EmptyConstructor[d]=n(e),i=new EmptyConstructor,EmptyConstructor[d]=null,i[p]=e),t===void 0?i:r.f(i,t)}})),Fe=__commonJSMin(((e,t)=>{var r=n(),i=m(),a=h(),o=W(),s=ke(),c=z(),l=M(),u=D(),d=l(`iterator`),f=!1,p,g,_;[].keys&&(_=[].keys(),`next`in _?(g=s(s(_)),g!==Object.prototype&&(p=g)):f=!0),!a(p)||r(function(){var e={};return p[d].call(e)!==e})?p={}:u&&(p=o(p)),i(p[d])||c(p,d,function(){return this}),t.exports={IteratorPrototype:p,BUGGY_SAFARI_ITERATORS:f}})),Ie=__commonJSMin((()=>{var e=H(),i=t(),a=De(),o=N(),s=m(),c=ke(),l=Ae(),u=je(),d=n(),f=j(),p=M(),h=Fe().IteratorPrototype,g=r(),_=D(),v=`constructor`,y=`Iterator`,b=p(`toStringTag`),x=TypeError,S=i[y],C=_||!s(S)||S.prototype!==h||!d(function(){S({})}),w=function Iterator(){if(a(this,h),c(this)===h)throw new x(`Abstract class Iterator not directly constructable`)},defineIteratorPrototypeAccessor=function(e,t){g?l(h,e,{configurable:!0,get:function(){return t},set:function(t){if(o(this),this===h)throw new x(`You can't redefine this property`);f(this,e)?this[e]=t:u(this,e,t)}}):h[e]=t};f(h,b)||defineIteratorPrototypeAccessor(b,y),(C||!f(h,v)||h[v]===Object)&&defineIteratorPrototypeAccessor(v,w),w.prototype=h,e({global:!0,constructor:!0,forced:C},{Iterator:w})})),G=__commonJSMin((()=>{Ie()})),K=__commonJSMin(((e,t)=>{t.exports=function(e){return{iterator:e,next:e.next,done:!1}}})),Le=__commonJSMin(((e,t)=>{var n=z();t.exports=function(e,t,r){for(var i in t)n(e,i,t[i],r);return e}})),Re=__commonJSMin(((e,t)=>{t.exports=function(e,t){return{value:e,done:t}}})),q=__commonJSMin(((e,t)=>{var n=a(),r=N(),i=T();t.exports=function(e,t,a){var o,s;r(e);try{if(o=i(e,`return`),!o){if(t===`throw`)throw a;return a}o=n(o,e)}catch(e){s=!0,o=e}if(t===`throw`)throw a;if(s)throw o;return r(o),a}})),ze=__commonJSMin(((e,t)=>{var n=q();t.exports=function(e,t,r){for(var i=e.length-1;i>=0;i--)if(e[i]!==void 0)try{r=n(e[i].iterator,t,r)}catch(e){t=`throw`,r=e}if(t===`throw`)throw r;return r}})),Be=__commonJSMin(((e,t)=>{var n=a(),r=W(),i=I(),o=Le(),s=M(),c=de(),l=T(),u=Fe().IteratorPrototype,d=Re(),f=q(),p=ze(),m=s(`toStringTag`),h=`IteratorHelper`,g=`WrapForValidIterator`,_=`normal`,v=`throw`,y=c.set,createIteratorProxyPrototype=function(e){var t=c.getterFor(e?g:h);return o(r(u),{next:function next(){var n=t(this);if(e)return n.nextHandler();if(n.done)return d(void 0,!0);try{var r=n.nextHandler();return n.returnHandlerResult?r:d(r,n.done)}catch(e){throw n.done=!0,e}},return:function(){var r=t(this),i=r.iterator;if(r.done=!0,e){var a=l(i,`return`);return a?n(a,i):d(void 0,!0)}if(r.inner)try{f(r.inner.iterator,_)}catch(e){return f(i,v,e)}if(r.openIters)try{p(r.openIters,_)}catch(e){return f(i,v,e)}return i&&f(i,_),d(void 0,!0)}})},b=createIteratorProxyPrototype(!0),x=createIteratorProxyPrototype(!1);i(x,m,`Iterator Helper`),t.exports=function(e,t,n){var r=function Iterator(r,i){i?(i.iterator=r.iterator,i.next=r.next):i=r,i.type=t?g:h,i.returnHandlerResult=!!n,i.nextHandler=e,i.counter=0,i.done=!1,y(this,i)};return r.prototype=t?b:x,r}})),Ve=__commonJSMin(((e,t)=>{var n=N(),r=q();t.exports=function(e,t,i,a){try{return a?t(n(i)[0],i[1]):t(i)}catch(t){r(e,`throw`,t)}}})),He=__commonJSMin(((e,t)=>{t.exports=function(e,t){var n=typeof Iterator==`function`&&Iterator.prototype[e];if(n)try{n.call({next:null},t).next()}catch(e){return!0}}})),J=__commonJSMin(((e,n)=>{var r=t();n.exports=function(e,t){var n=r.Iterator,i=n&&n.prototype,a=i&&i[e],o=!1;if(a)try{a.call({next:function(){return{done:!0}},return:function(){o=!0}},-1)}catch(e){e instanceof t||(o=!1)}if(!o)return a}})),Ue=__commonJSMin((()=>{var e=H(),t=a(),n=w(),r=N(),i=K(),o=Be(),s=Ve(),c=D(),l=q(),u=He(),d=J(),f=!c&&!u(`filter`,function(){}),p=!c&&!f&&d(`filter`,TypeError),m=c||f||p,h=o(function(){for(var e=this.iterator,n=this.predicate,i=this.next,a,o,c;;){if(a=r(t(i,e)),o=this.done=!!a.done,o)return;if(c=a.value,s(e,n,[c,this.counter++],!0))return c}});e({target:`Iterator`,proto:!0,real:!0,forced:m},{filter:function filter(e){r(this);try{n(e)}catch(e){l(this,`throw`,e)}return p?t(p,this,e):new h(i(this),{predicate:e})}})})),Y=__commonJSMin((()=>{Ue()})),We=__commonJSMin(((e,t)=>{var n=l(),r=c();t.exports=function(e){if(n(e)===`Function`)return r(e)}})),Ge=__commonJSMin(((e,t)=>{var n=We(),r=w(),a=i(),o=n(n.bind);t.exports=function(e,t){return r(e),t===void 0?e:a?o(e,t):function(){return e.apply(t,arguments)}}})),Ke=__commonJSMin(((e,t)=>{t.exports={}})),qe=__commonJSMin(((e,t)=>{var n=M(),r=Ke(),i=n(`iterator`),a=Array.prototype;t.exports=function(e){return e!==void 0&&(r.Array===e||a[i]===e)}})),Je=__commonJSMin(((e,t)=>{var n=M()(`toStringTag`),r={};r[n]=`z`,t.exports=String(r)===`[object z]`})),Ye=__commonJSMin(((e,t)=>{var n=Je(),r=m(),i=l(),a=M()(`toStringTag`),o=Object,s=i(function(){return arguments}())===`Arguments`,tryGet=function(e,t){try{return e[t]}catch(e){}};t.exports=n?i:function(e){var t,n,c;return e===void 0?`Undefined`:e===null?`Null`:typeof(n=tryGet(t=o(e),a))==`string`?n:s?i(t):(c=i(t))===`Object`&&r(t.callee)?`Arguments`:c}})),Xe=__commonJSMin(((e,t)=>{var n=Ye(),r=T(),i=d(),a=Ke(),o=M()(`iterator`);t.exports=function(e){if(!i(e))return r(e,o)||r(e,`@@iterator`)||a[n(e)]}})),Ze=__commonJSMin(((e,t)=>{var n=a(),r=w(),i=N(),o=C(),s=Xe(),c=TypeError;t.exports=function(e,t){var a=arguments.length<2?s(e):t;if(r(a))return i(n(a,e));throw new c(o(e)+` is not iterable`)}})),Qe=__commonJSMin(((e,t)=>{var n=Ge(),r=a(),i=N(),o=C(),s=qe(),c=B(),l=_(),u=Ze(),d=Xe(),f=q(),p=TypeError,Result=function(e,t){this.stopped=e,this.result=t},m=Result.prototype;t.exports=function(e,t,a){var h=a&&a.that,g=!!(a&&a.AS_ENTRIES),_=!!(a&&a.IS_RECORD),v=!!(a&&a.IS_ITERATOR),y=!!(a&&a.INTERRUPTED),b=n(t,h),x,S,C,w,T,E,D,stop=function(e){return x&&f(x,`normal`),new Result(!0,e)},callFn=function(e){return g?(i(e),y?b(e[0],e[1],stop):b(e[0],e[1])):y?b(e,stop):b(e)};if(_)x=e.iterator;else if(v)x=e;else{if(S=d(e),!S)throw new p(o(e)+` is not iterable`);if(s(S)){for(C=0,w=c(e);w>C;C++)if(T=callFn(e[C]),T&&l(m,T))return T;return new Result(!1)}x=u(e,S)}for(E=_?e.next:x.next;!(D=r(E,x)).done;){try{T=callFn(D.value)}catch(e){f(x,`throw`,e)}if(typeof T==`object`&&T&&l(m,T))return T}return new Result(!1)}})),$e=__commonJSMin((()=>{var e=H(),t=a(),n=Qe(),r=w(),i=N(),o=K(),s=q(),c=J()(`forEach`,TypeError);e({target:`Iterator`,proto:!0,real:!0,forced:c},{forEach:function forEach(e){i(this);try{r(e)}catch(e){s(this,`throw`,e)}if(c)return t(c,this,e);var a=o(this),l=0;n(a,function(t){e(t,l++)},{IS_RECORD:!0})}})})),X=__commonJSMin((()=>{$e()})),et=__commonJSMin(((e,t)=>{U(),G(),Y(),X();var Module=function(){let e=jQuery,t=arguments,n=this,r={},i,ensureClosureMethods=function(){e.each(n,function(e){let t=n[e];typeof t==`function`&&(n[e]=function(){return t.apply(n,arguments)})})},initSettings=function(){i=n.getDefaultSettings();let r=t[0];r&&e.extend(!0,i,r)},init=function(){n.__construct.apply(n,t),ensureClosureMethods(),initSettings(),n.trigger(`init`)};this.getItems=function(e,t){if(t){let n=t.split(`.`),r=n.splice(0,1);return n.length?e[r]?this.getItems(e[r],n.join(`.`)):void 0:e[r]}return e},this.getSettings=function(e){return this.getItems(i,e)},this.setSettings=function(t,r,a){if(a||(a=i),typeof t==`object`)return e.extend(a,t),n;let o=t.split(`.`),s=o.splice(0,1);return o.length?(a[s]||(a[s]={}),n.setSettings(o.join(`.`),r,a[s])):(a[s]=r,n)},this.getErrorMessage=function(e,t){let n;switch(e){case`forceMethodImplementation`:n=`The method '${t}' must to be implemented in the inheritor child.`;break;default:n=`An error occurs`}return n},this.forceMethodImplementation=function(e){throw Error(this.getErrorMessage(`forceMethodImplementation`,e))},this.on=function(t,i){return typeof t==`object`?(e.each(t,function(e){n.on(e,this)}),n):(t.split(` `).forEach(function(e){r[e]||(r[e]=[]),r[e].push(i)}),n)},this.off=function(e,t){if(!r[e])return n;if(!t)return delete r[e],n;let i=r[e].indexOf(t);return i!==-1&&(delete r[e][i],r[e]=r[e].filter(e=>e)),n},this.trigger=function(t){let i=`on`+t[0].toUpperCase()+t.slice(1),a=Array.prototype.slice.call(arguments,1);n[i]&&n[i].apply(n,a);let o=r[t];return o&&e.each(o,function(e,t){t.apply(n,a)}),n},init()};Module.prototype.__construct=function(){},Module.prototype.getDefaultSettings=function(){return{}},Module.prototype.getConstructorID=function(){return this.constructor.name},Module.extend=function(e){let t=jQuery,n=this,child=function(){return n.apply(this,arguments)};return t.extend(child,n),child.prototype=Object.create(t.extend({},n.prototype,e)),child.prototype.constructor=child,child.__super__=n.prototype,child},t.exports=Module})),tt=__commonJSMin((t=>{var n=e();Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default=n(et()).default.extend({elements:null,getDefaultElements(){return{}},bindEvents(){},onInit(){this.initElements(),this.bindEvents()},initElements(){this.elements=this.getDefaultElements()}})})),nt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,U(),G(),X(),e.default=class InstanceType{static[Symbol.hasInstance](e){let t=super[Symbol.hasInstance](e);if(e&&!e.constructor.getInstanceType)return t;if(e&&(e.instanceTypes||(e.instanceTypes=[]),t||this.getInstanceType()===e.constructor.getInstanceType()&&(t=!0),t)){let t=this.getInstanceType===InstanceType.getInstanceType?`BaseInstanceType`:this.getInstanceType();e.instanceTypes.indexOf(t)===-1&&e.instanceTypes.push(t)}return!t&&e&&(t=e.instanceTypes&&Array.isArray(e.instanceTypes)&&e.instanceTypes.indexOf(this.getInstanceType())!==-1),t}static getInstanceType(){elementorModules.ForceMethodImplementation()}constructor(){let e=new.target,t=[];for(;e.__proto__&&e.__proto__.name;)t.push(e.__proto__),e=e.__proto__;t.reverse().forEach(e=>this instanceof e)}}})),rt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var _default=(e,t)=>{t=Array.isArray(t)?t:[t];for(let n of t)if(e.constructor.name===n.prototype[Symbol.toStringTag])return!0;return!1};e.default=_default})),it=__commonJSMin((t=>{var n=e();Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(nt()),i=n(rt()),ArgsObject=class extends r.default{static getInstanceType(){return`ArgsObject`}constructor(e){super(),this.args=e}requireArgument(e,t=this.args){if(!Object.prototype.hasOwnProperty.call(t,e))throw Error(`${e} is required.`)}requireArgumentType(e,t,n=this.args){if(this.requireArgument(e,n),typeof n[e]!==t)throw Error(`${e} invalid type: ${t}.`)}requireArgumentInstance(e,t,n=this.args){if(this.requireArgument(e,n),!(n[e]instanceof t)&&!(0,i.default)(n[e],t))throw Error(`${e} invalid instance.`)}requireArgumentConstructor(e,t,n=this.args){if(this.requireArgument(e,n),n[e].constructor.toString()!==t.prototype.constructor.toString())throw Error(`${e} invalid constructor type.`)}};t.default=ArgsObject})),at=__commonJSMin((t=>{var n=e();Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,U(),t.default=n(tt()).default.extend({getDefaultSettings(){return{container:null,items:null,columnsCount:3,verticalSpaceBetween:30}},getDefaultElements(){return{$container:jQuery(this.getSettings(`container`)),$items:jQuery(this.getSettings(`items`))}},run(){var e=[],t=this.elements.$container.position().top,n=this.getSettings(),r=n.columnsCount;t+=parseInt(this.elements.$container.css(`margin-top`),10),this.elements.$items.each(function(i){var a=Math.floor(i/r),o=jQuery(this),s=o[0].getBoundingClientRect().height+n.verticalSpaceBetween;if(a){var c=o.position(),l=i%r,u=c.top-t-e[l];u-=parseInt(o.css(`margin-top`),10),u*=-1,o.css(`margin-top`,u+`px`),e[l]+=s}else e.push(s)})}})})),ot=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,U();var Scroll=class{static scrollObserver(e){let t=0,buildThresholds=(e=0)=>{let t=[];if(e>0&&e<=100){let n=100/e;for(let e=0;e<=100;e+=n)t.push(e/100)}else t.push(0);return t},n={root:e.root||null,rootMargin:e.offset||`0px`,threshold:buildThresholds(e.sensitivity)};function handleIntersect(n){let r=n[0].boundingClientRect.y,i=n[0].isIntersecting,a=r<t?`down`:`up`,o=Math.abs(parseFloat((n[0].intersectionRatio*100).toFixed(2)));e.callback({sensitivity:e.sensitivity,isInViewport:i,scrollPercentage:o,intersectionScrollDirection:a}),t=r}return new IntersectionObserver(handleIntersect,n)}static getElementViewportPercentage(e,t={}){let n=e[0].getBoundingClientRect(),r=t.start||0,i=t.end||0,a=window.innerHeight*r/100,o=window.innerHeight*i/100,s=n.top-window.innerHeight,c=n.top+a+e.height(),l=0-s+a,u=c-s+o,d=Math.max(0,Math.min(l/u,1));return parseFloat((d*100).toFixed(2))}static getPageScrollPercentage(e={},t){let n=e.start||0,r=e.end||0,i=t||document.documentElement.scrollHeight-document.documentElement.clientHeight,a=i*n/100,o=i+a+i*r/100;return(document.documentElement.scrollTop+document.body.scrollTop+a)/o*100}};e.default=Scroll})),st=__commonJSMin(((e,t)=>{var n=M(),r=W(),i=P().f,a=n(`unscopables`),o=Array.prototype;o[a]===void 0&&i(o,a,{configurable:!0,value:r(null)}),t.exports=function(e){o[a][e]=!0}})),ct=__commonJSMin((()=>{var e=H(),t=_e().includes,r=n(),i=st();e({target:`Array`,proto:!0,forced:r(function(){return![,].includes()})},{includes:function includes(e){return t(this,e,arguments.length>1?arguments[1]:void 0)}}),i(`includes`)})),lt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.ForceMethodImplementation=void 0,ct();var t=class ForceMethodImplementation extends Error{constructor(e={},t={}){super(`${e.isStatic?`static `:``}${e.fullName}() should be implemented, please provide '${e.functionName||e.fullName}' functionality.`,t),Object.keys(t).length&&console.error(t),Error.captureStackTrace(this,ForceMethodImplementation)}};e.ForceMethodImplementation=t;var _default=e=>{let n=Error().stack.split(`
`)[2].trim(),r=n.startsWith(`at new`)?`constructor`:n.split(` `)[1],i={};if(i.functionName=r,i.fullName=r,i.functionName.includes(`.`)){let e=i.functionName.split(`.`);i.className=e[0],i.functionName=e[1]}else i.isStatic=!0;throw new t(i,e)};e.default=_default}));function _typeof(e){"@babel/helpers - typeof";return _typeof=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},_typeof(e)}var ut=__esmMin((()=>{}));function toPrimitive(e,t){if(_typeof(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(_typeof(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var dt=__esmMin((()=>{ut()}));function toPropertyKey(e){var t=toPrimitive(e,`string`);return _typeof(t)==`symbol`?t:t+``}var ft=__esmMin((()=>{ut(),dt()}));function _defineProperty(e,t,n){return(t=toPropertyKey(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var pt=__esmMin((()=>{ft()}));function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ownKeys(Object(n),!0).forEach(function(t){_defineProperty(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var mt=__esmMin((()=>{pt()})),ht=__commonJSMin((e=>{mt(),Object.defineProperty(e,"__esModule",{value:!0}),e.createGetInitialState=createGetInitialState;function createGetInitialState(e,t={}){return(n,r)=>{let i=r;if(n.hasOwnProperty(`uploadedData`)){var a;i=!1;let t=n.uploadedData.manifest.templates,r=((a=elementorAppConfig)==null||(a=a[`import-export-customization`])==null?void 0:a.exportGroups)||{};for(let n in t)if(r[t[n].doc_type]===e){i=!0;break}}return _objectSpread2({enabled:i},t)}}}));function _objectWithoutPropertiesLoose(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.includes(r))continue;n[r]=e[r]}return n}var gt=__esmMin((()=>{}));function _objectWithoutProperties(e,t){if(e==null)return{};var n,r,i=_objectWithoutPropertiesLoose(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.includes(n)||{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var _t=__esmMin((()=>{gt()})),vt=__commonJSMin((()=>{var e=H(),t=a(),n=w(),r=N(),i=K(),o=Be(),s=Ve(),c=q(),l=He(),u=J(),d=D(),f=!d&&!l(`map`,function(){}),p=!d&&!f&&u(`map`,TypeError),m=d||f||p,h=o(function(){var e=this.iterator,n=r(t(this.next,e));if(!(this.done=!!n.done))return s(e,this.mapper,[n.value,this.counter++],!0)});e({target:`Iterator`,proto:!0,real:!0,forced:m},{map:function map(e){r(this);try{n(e)}catch(e){c(this,`throw`,e)}return p?t(p,this,e):new h(i(this),{mapper:e})}})})),yt=__commonJSMin((()=>{vt()})),bt=__commonJSMin((e=>{_t(),mt();var t=[`children`];Object.defineProperty(e,"__esModule",{value:!0}),e.BaseRegistry=void 0,G(),Y(),X(),yt();var BaseRegistry=class{constructor(){this.sections=new Map}register(e){if(!e.key||!e.title)throw Error(`Template type must have key and title`);let t=this.get(e.key)||this.formatSection(e);if(e.children)if(t.children){let n=new Map(t.children.map(e=>[e.key,e]));e.children.forEach(e=>{let t=this.formatSection(e);n.set(e.key,t)}),t.children=Array.from(n.values())}else t.children=e.children.map(e=>this.formatSection(e));this.sections.set(e.key,t)}formatSection(e){let{children:n}=e,r=_objectWithoutProperties(e,t);return _objectSpread2({key:r.key,title:r.title,description:r.description||``,useParentDefault:r.useParentDefault!==!1,getInitialState:r.getInitialState||null,component:r.component||null,order:r.order||10,isAvailable:r.isAvailable||(()=>!0)},r)}getAll(){return Array.from(this.sections.values()).filter(e=>e.isAvailable()).map(e=>e.children?_objectSpread2(_objectSpread2({},e),{},{children:[...e.children].sort((e,t)=>e.order-t.order)}):e).sort((e,t)=>e.order-t.order)}get(e){return this.sections.get(e)}};e.BaseRegistry=BaseRegistry})),xt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.customizationDialogsRegistry=void 0,e.customizationDialogsRegistry=new(bt()).BaseRegistry})),St=__commonJSMin((t=>{var n=e();Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(et()),i=n(tt()),a=n(it()),o=n(at()),s=n(ot()),c=n(lt()),l=ht(),u=xt(),d={Module:r.default,ViewModule:i.default,ArgsObject:a.default,ForceMethodImplementation:c.default,utils:{Masonry:o.default,Scroll:s.default},importExport:{createGetInitialState:l.createGetInitialState,customizationDialogsRegistry:u.customizationDialogsRegistry}};window.elementorModules?Object.assign(window.elementorModules,d):window.elementorModules=d,t.default=window.elementorModules})),Ct=__commonJSMin((()=>{var e=H(),t=a(),n=Qe(),r=w(),i=N(),o=K(),s=q(),c=J()(`find`,TypeError);e({target:`Iterator`,proto:!0,real:!0,forced:c},{find:function find(e){i(this);try{r(e)}catch(e){s(this,`throw`,e)}if(c)return t(c,this,e);var a=o(this),l=0;return n(a,function(t,n){if(e(t,l++))return n(t)},{IS_RECORD:!0,INTERRUPTED:!0}).result}})})),Z=__commonJSMin((()=>{Ct()})),wt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,G(),Z();var _default=class extends elementorModules.ViewModule{getDefaultSettings(){return{selectors:{elements:`.elementor-element`,nestedDocumentElements:`.elementor .elementor-element`},classes:{editMode:`elementor-edit-mode`}}}getDefaultElements(){let e=this.getSettings(`selectors`);return{$elements:this.$element.find(e.elements).not(this.$element.find(e.nestedDocumentElements))}}getDocumentSettings(e){let t;if(this.isEdit){t={};let e=elementor.settings.page.model;jQuery.each(e.getActiveControls(),n=>{t[n]=e.attributes[n]})}else t=this.$element.data(`elementor-settings`)||{};return this.getItems(t,e)}runElementsHandlers(){this.elements.$elements.each((e,t)=>setTimeout(()=>elementorFrontend.elementsHandler.runReadyTrigger(t)))}onInit(){this.$element=this.getSettings(`$element`),super.onInit(),this.isEdit=this.$element.hasClass(this.getSettings(`classes.editMode`)),this.isEdit?elementor.on(`document:loaded`,()=>{elementor.settings.page.model.on(`change`,this.onSettingsChange.bind(this))}):this.runElementsHandlers()}onSettingsChange(){}};e.default=_default})),Tt=__commonJSMin(((e,t)=>{t.exports=elementorModules.ViewModule.extend({getDefaultSettings(){return{element:null,direction:elementorFrontend.config.is_rtl?`right`:`left`,selectors:{container:window},considerScrollbar:!1,cssOutput:`inline`}},getDefaultElements(){return{$element:jQuery(this.getSettings(`element`))}},stretch(){let e=this.getSettings(),t;try{t=jQuery(e.selectors.container)}catch(e){}(!t||!t.length)&&(t=jQuery(this.getDefaultSettings().selectors.container)),this.reset();var n=this.elements.$element,r=t.innerWidth(),i=n.offset().left,a=n.css(`position`)===`fixed`,o=a?0:i,s=window===t[0];if(!s){var c=t.offset().left;a&&(o=c),i>c&&(o=i-c)}if(e.considerScrollbar&&s){let e=window.innerWidth-r;o-=e}a||(elementorFrontend.config.is_rtl&&(o=r-(n.outerWidth()+o)),o=-o),e.margin&&(o+=e.margin);var l={};let u=r;if(e.margin&&(u-=e.margin*2),l.width=u+`px`,l[e.direction]=o+`px`,e.cssOutput===`variables`){this.applyCssVariables(n,l);return}n.css(l)},reset(){let e={},t=this.getSettings(),n=this.elements.$element;if(t.cssOutput===`variables`){this.resetCssVariables(n);return}e.width=``,e[t.direction]=``,n.css(e)},applyCssVariables(e,t){e.css(`--stretch-width`,t.width),t.left?e.css(`--stretch-left`,t.left):e.css(`--stretch-right`,t.right)},resetCssVariables(e){e.css({"--stretch-width":``,"--stretch-left":``,"--stretch-right":``})}})})),Q=__commonJSMin(((e,t)=>{U(),G(),Y(),Z(),X(),t.exports=elementorModules.ViewModule.extend({$element:null,editorListeners:null,onElementChange:null,onEditSettingsChange:null,onPageSettingsChange:null,isEdit:null,__construct(e){this.isActive(e)&&(this.$element=e.$element,this.isEdit=this.$element.hasClass(`elementor-element-edit-mode`),this.isEdit&&this.addEditorListeners())},isActive(){return!0},isElementInTheCurrentDocument(){return elementorFrontend.isEditMode()?elementor.documents.currentDocument.id.toString()===this.$element[0].closest(`.elementor`).dataset.elementorId:!1},findElement(e){var t=this.$element;return t.find(e).filter(function(){return jQuery(this).parent().closest(`.elementor-element`).is(t)})},getUniqueHandlerID(e,t){return e||(e=this.getModelCID()),t||(t=this.$element),e+t.attr(`data-element_type`)+this.getConstructorID()},initEditorListeners(){var e=this;if(e.editorListeners=[{event:`element:destroy`,to:elementor.channels.data,callback(t){t.cid===e.getModelCID()&&e.onDestroy()}}],e.onElementChange){let t=e.getWidgetType()||e.getElementType(),n=`change`;t!==`global`&&(n+=`:`+t),e.editorListeners.push({event:n,to:elementor.channels.editor,callback(t,n){e.getUniqueHandlerID(n.model.cid,n.$el)===e.getUniqueHandlerID()&&e.onElementChange(t.model.get(`name`),t,n)}})}e.onEditSettingsChange&&e.editorListeners.push({event:`change:editSettings`,to:elementor.channels.editor,callback(t,n){if(n.model.cid!==e.getModelCID())return;let r=Object.keys(t.changed)[0];e.onEditSettingsChange(r,t.changed[r])}}),[`page`].forEach(function(t){var n=`on`+t[0].toUpperCase()+t.slice(1)+`SettingsChange`;e[n]&&e.editorListeners.push({event:`change`,to:elementor.settings[t].model,callback(t){e[n](t.changed)}})})},getEditorListeners(){return this.editorListeners||this.initEditorListeners(),this.editorListeners},addEditorListeners(){var e=this.getUniqueHandlerID();this.getEditorListeners().forEach(function(t){elementorFrontend.addListenerOnce(e,t.event,t.callback,t.to)})},removeEditorListeners(){var e=this.getUniqueHandlerID();this.getEditorListeners().forEach(function(t){elementorFrontend.removeListeners(e,t.event,null,t.to)})},getElementType(){return this.$element.data(`element_type`)},getWidgetType(){let e=this.$element.data(`widget_type`);if(e)return e.split(`.`)[0]},getID(){return this.$element.data(`id`)},getModelCID(){return this.$element.data(`model-cid`)},getElementSettings(e){let t={},n=this.getModelCID();if(this.isEdit&&n){let e=elementorFrontend.config.elements.data[n],r=e.attributes,i=r.widgetType||r.elType;r.isInner&&(i=`inner-`+i);let a=elementorFrontend.config.elements.keys[i];a||(a=elementorFrontend.config.elements.keys[i]=[],jQuery.each(e.controls,(e,t)=>{(t.frontend_available||t.editor_available)&&a.push(e)})),jQuery.each(e.getActiveControls(),function(e){if(a.indexOf(e)!==-1){let n=r[e];n.toJSON&&(n=n.toJSON()),t[e]=n}})}else t=this.$element.data(`settings`)||{};return this.getItems(t,e)},getEditSettings(e){var t={};return this.isEdit&&(t=elementorFrontend.config.elements.editSettings[this.getModelCID()].attributes),this.getItems(t,e)},getCurrentDeviceSetting(e){return elementorFrontend.getCurrentDeviceSetting(this.getElementSettings(),e)},onInit(){this.isActive(this.getSettings())&&elementorModules.ViewModule.prototype.onInit.apply(this,arguments)},onDestroy(){this.isEdit&&this.removeEditorListeners(),this.unbindEvents&&this.unbindEvents()}})})),Et=__commonJSMin((t=>{var n=e();Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,G(),Z();var r=n(Q()),StretchedElement=class extends r.default{getStretchedClass(){return`e-stretched`}getStretchSettingName(){return`stretch_element`}getStretchActiveValue(){return`yes`}bindEvents(){let e=this.getUniqueHandlerID();elementorFrontend.addListenerOnce(e,`resize`,this.stretch),elementorFrontend.addListenerOnce(e,`sticky:stick`,this.stretch,this.$element),elementorFrontend.addListenerOnce(e,`sticky:unstick`,this.stretch,this.$element),elementorFrontend.isEditMode()&&(this.onKitChangeStretchContainerChange=this.onKitChangeStretchContainerChange.bind(this),elementor.channels.editor.on(`kit:change:stretchContainer`,this.onKitChangeStretchContainerChange))}unbindEvents(){elementorFrontend.removeListeners(this.getUniqueHandlerID(),`resize`,this.stretch),elementorFrontend.isEditMode()&&elementor.channels.editor.off(`kit:change:stretchContainer`,this.onKitChangeStretchContainerChange)}isActive(e){return elementorFrontend.isEditMode()||e.$element.hasClass(this.getStretchedClass())}getStretchElementForConfig(e=null){return e?this.$element.find(e):this.$element}getStretchElementConfig(){return{element:this.getStretchElementForConfig(),selectors:{container:this.getStretchContainer()},considerScrollbar:elementorFrontend.isEditMode()&&elementorFrontend.config.is_rtl}}initStretch(){this.stretch=this.stretch.bind(this),this.stretchElement=new elementorModules.frontend.tools.StretchElement(this.getStretchElementConfig())}getStretchContainer(){return elementorFrontend.getKitSettings(`stretched_section_container`)||window}isStretchSettingEnabled(){return this.getElementSettings(this.getStretchSettingName())===this.getStretchActiveValue()}stretch(){this.isStretchSettingEnabled()&&this.stretchElement.stretch()}onInit(...e){this.isActive(this.getSettings())&&(this.initStretch(),super.onInit(...e),this.stretch())}onElementChange(e){this.getStretchSettingName()===e&&(this.isStretchSettingEnabled()?this.stretch():this.stretchElement.reset())}onKitChangeStretchContainerChange(){this.stretchElement.setSettings(`selectors.container`,this.getStretchContainer()),this.stretch()}};t.default=StretchedElement})),Dt=__commonJSMin((t=>{var n=e();Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(Q()),SwiperHandlerBase=class extends r.default{getInitialSlide(){let e=this.getEditSettings();return e.activeItemIndex?e.activeItemIndex-1:0}getSlidesCount(){return this.elements.$slides.length}togglePauseOnHover(e){e?this.elements.$swiperContainer.on({mouseenter:()=>{this.swiper.autoplay.stop()},mouseleave:()=>{this.swiper.autoplay.start()}}):this.elements.$swiperContainer.off(`mouseenter mouseleave`)}handleKenBurns(){let e=this.getSettings();this.$activeImageBg&&this.$activeImageBg.removeClass(e.classes.kenBurnsActive),this.activeItemIndex=this.swiper?this.swiper.activeIndex:this.getInitialSlide(),this.swiper?this.$activeImageBg=jQuery(this.swiper.slides[this.activeItemIndex]).children(`.`+e.classes.slideBackground):this.$activeImageBg=jQuery(this.elements.$slides[0]).children(`.`+e.classes.slideBackground),this.$activeImageBg.addClass(e.classes.kenBurnsActive)}};t.default=SwiperHandlerBase}));function asyncGeneratorStep(e,t,n,r,i,a,o){try{var s=e[a](o),c=s.value}catch(e){n(e);return}s.done?t(c):Promise.resolve(c).then(r,i)}function _asyncToGenerator(e){return function(){var t=this,n=arguments;return new Promise(function(r,i){var a=e.apply(t,n);function _next(e){asyncGeneratorStep(a,r,i,_next,_throw,`next`,e)}function _throw(e){asyncGeneratorStep(a,r,i,_next,_throw,`throw`,e)}_next(void 0)})}}var Ot=__esmMin((()=>{})),kt=__commonJSMin((t=>{Ot();var n=e();Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,G(),Z(),X();var r=n(Dt()),CarouselHandlerBase=class extends r.default{getDefaultSettings(){return{selectors:{carousel:`.swiper`,swiperWrapper:`.swiper-wrapper`,slideContent:`.swiper-slide`,swiperArrow:`.elementor-swiper-button`,paginationWrapper:`.swiper-pagination`,paginationBullet:`.swiper-pagination-bullet`,paginationBulletWrapper:`.swiper-pagination-bullets`}}}getDefaultElements(){let e=this.getSettings(`selectors`),t={$swiperContainer:this.$element.find(e.carousel),$swiperWrapper:this.$element.find(e.swiperWrapper),$swiperArrows:this.$element.find(e.swiperArrow),$paginationWrapper:this.$element.find(e.paginationWrapper),$paginationBullets:this.$element.find(e.paginationBullet),$paginationBulletWrapper:this.$element.find(e.paginationBulletWrapper)};return t.$slides=t.$swiperContainer.find(e.slideContent),t}getSwiperSettings(){let e=this.getElementSettings(),t=+e.slides_to_show||3,n=t===1,r=elementorFrontend.config.responsive.activeBreakpoints,i={mobile:1,tablet:n?1:2},a={slidesPerView:t,loop:e.infinite===`yes`,speed:e.speed,handleElementorBreakpoints:!0};a.breakpoints={};let o=t;Object.keys(r).reverse().forEach(t=>{let n=i[t]?i[t]:o;a.breakpoints[r[t].value]={slidesPerView:+e[`slides_to_show_`+t]||n,slidesPerGroup:+e[`slides_to_scroll_`+t]||1},e.image_spacing_custom&&(a.breakpoints[r[t].value].spaceBetween=this.getSpaceBetween(t)),o=+e[`slides_to_show_`+t]||n}),e.autoplay===`yes`&&(a.autoplay={delay:e.autoplay_speed,disableOnInteraction:e.pause_on_interaction===`yes`}),n?(a.effect=e.effect,e.effect===`fade`&&(a.fadeEffect={crossFade:!0})):a.slidesPerGroup=+e.slides_to_scroll||1,e.image_spacing_custom&&(a.spaceBetween=this.getSpaceBetween());let s=e.navigation===`arrows`||e.navigation===`both`,c=e.navigation===`dots`||e.navigation===`both`||e.pagination;return s&&(a.navigation={prevEl:`.elementor-swiper-button-prev`,nextEl:`.elementor-swiper-button-next`}),c&&(a.pagination={el:`.elementor-element-${this.getID()} .swiper-pagination`,type:e.pagination?e.pagination:`bullets`,clickable:!0,renderBullet:(e,t)=>`<span class="${t}" role="button" tabindex="0" data-bullet-index="${e}" aria-label="${elementorFrontend.config.i18n.a11yCarouselPaginationBulletMessage} ${e+1}"></span>`}),e.lazyload===`yes`&&(a.lazy={loadPrevNext:!0,loadPrevNextAmount:1}),a.a11y={enabled:!0,prevSlideMessage:elementorFrontend.config.i18n.a11yCarouselPrevSlideMessage,nextSlideMessage:elementorFrontend.config.i18n.a11yCarouselNextSlideMessage,firstSlideMessage:elementorFrontend.config.i18n.a11yCarouselFirstSlideMessage,lastSlideMessage:elementorFrontend.config.i18n.a11yCarouselLastSlideMessage},a.on={slideChange:()=>{this.a11ySetPaginationTabindex(),this.handleElementHandlers(),this.a11ySetSlideAriaHidden()},init:()=>{this.a11ySetPaginationTabindex(),this.a11ySetSlideAriaHidden(`initialisation`)}},this.applyOffsetSettings(e,a,t),a}getOffsetWidth(){let e=elementorFrontend.getCurrentDeviceMode();return elementorFrontend.utils.controls.getResponsiveControlValue(this.getElementSettings(),`offset_width`,`size`,e)||0}applyOffsetSettings(e,t,n){let r=e.offset_sides;if(!(elementorFrontend.isEditMode()&&this.constructor.name===`NestedCarousel`||!r||r===`none`))switch(r){case`right`:this.forceSliderToShowNextSlideWhenOnLast(t,n),this.addClassToSwiperContainer(`offset-right`);break;case`left`:this.addClassToSwiperContainer(`offset-left`);break;case`both`:this.forceSliderToShowNextSlideWhenOnLast(t,n),this.addClassToSwiperContainer(`offset-both`);break}}forceSliderToShowNextSlideWhenOnLast(e,t){e.slidesPerView=t+.001}addClassToSwiperContainer(e){this.getDefaultElements().$swiperContainer[0].classList.add(e)}onInit(...e){var _superprop_getOnInit=()=>super.onInit,t=this;return _asyncToGenerator(function*(){_superprop_getOnInit().call(t,...e),!(!t.elements.$swiperContainer.length||2>t.elements.$slides.length)&&(yield t.initSwiper(),t.getElementSettings().pause_on_hover===`yes`&&t.togglePauseOnHover(!0))})()}initSwiper(){var e=this;return _asyncToGenerator(function*(){let t=elementorFrontend.utils.swiper;e.swiper=yield new t(e.elements.$swiperContainer,e.getSwiperSettings()),e.elements.$swiperContainer.data(`swiper`,e.swiper)})()}bindEvents(){this.elements.$swiperArrows.on(`keydown`,this.onDirectionArrowKeydown.bind(this)),this.elements.$paginationWrapper.on(`keydown`,`.swiper-pagination-bullet`,this.onDirectionArrowKeydown.bind(this)),this.elements.$swiperContainer.on(`keydown`,`.swiper-slide`,this.onDirectionArrowKeydown.bind(this)),this.$element.find(`:focusable`).on(`focus`,this.onFocusDisableAutoplay.bind(this)),elementorFrontend.elements.$window.on(`resize`,this.getSwiperSettings.bind(this))}unbindEvents(){this.elements.$swiperArrows.off(),this.elements.$paginationWrapper.off(),this.elements.$swiperContainer.off(),this.$element.find(`:focusable`).off(),elementorFrontend.elements.$window.off(`resize`)}onDirectionArrowKeydown(e){let t=elementorFrontend.config.is_rtl,n=[`ArrowLeft`,`ArrowRight`],r=e.originalEvent.code,i=n.indexOf(r)!==-1,a=t?`ArrowRight`:`ArrowLeft`,o=t?`ArrowLeft`:`ArrowRight`;if(i)a===r?this.swiper.slidePrev():o===r&&this.swiper.slideNext();else return!0}onFocusDisableAutoplay(){this.swiper.autoplay.stop()}updateSwiperOption(e){let t=this.getElementSettings()[e],n=this.swiper.params;switch(e){case`autoplay_speed`:n.autoplay.delay=t;break;case`speed`:n.speed=t;break}this.swiper.update()}getChangeableProperties(){return{pause_on_hover:`pauseOnHover`,autoplay_speed:`delay`,speed:`speed`,arrows_position:`arrows_position`}}onElementChange(e){if(e.indexOf(`image_spacing_custom`)===0){this.updateSpaceBetween(e);return}if(this.getChangeableProperties()[e])if(e===`pause_on_hover`){let e=this.getElementSettings(`pause_on_hover`);this.togglePauseOnHover(e===`yes`)}else this.updateSwiperOption(e)}onEditSettingsChange(e){e===`activeItemIndex`&&this.swiper.slideToLoop(this.getEditSettings(`activeItemIndex`)-1)}getSpaceBetween(e=null){let t=elementorFrontend.utils.controls.getResponsiveControlValue(this.getElementSettings(),`image_spacing_custom`,`size`,e);return Number(t)||0}updateSpaceBetween(e){let t=e.match(`image_spacing_custom_(.*)`),n=t?t[1]:`desktop`,r=this.getSpaceBetween(n);n!==`desktop`&&(this.swiper.params.breakpoints[elementorFrontend.config.responsive.activeBreakpoints[n].value].spaceBetween=r),this.swiper.params.spaceBetween=r,this.swiper.update()}getPaginationBullets(e=`array`){let t=this.$element.find(this.getSettings(`selectors`).paginationBullet);return e===`array`?Array.from(t):t}a11ySetPaginationTabindex(){var e,t,n,r,i;let a=(e=this.swiper)==null||(e=e.params)==null?void 0:e.pagination.bulletClass,o=(t=this.swiper)==null||(t=t.params)==null?void 0:t.pagination.bulletActiveClass;this.getPaginationBullets().forEach(e=>{var t;(t=e.classList)!=null&&t.contains(o)||e.removeAttribute(`tabindex`)});let s=((n=event)==null?void 0:n.code)===`ArrowLeft`||((r=event)==null?void 0:r.code)===`ArrowRight`;(i=event)!=null&&(i=i.target)!=null&&(i=i.classList)!=null&&i.contains(a)&&s&&this.$element.find(`.${o}`).trigger(`focus`)}getSwiperWrapperTranformXValue(){var e;let t=(e=this.elements.$swiperWrapper[0])==null?void 0:e.style.transform;return t=t.replace(`translate3d(`,``),t=t.split(`,`),t=parseInt(t[0].replace(`px`,``)),t||0}a11ySetSlideAriaHidden(e=``){var t;if(typeof(e===`initialisation`?0:(t=this.swiper)==null?void 0:t.activeIndex)!=`number`)return;let n=this.getSwiperWrapperTranformXValue(),r=this.elements.$swiperWrapper[0].clientWidth;this.elements.$swiperContainer.find(this.getSettings(`selectors`).slideContent).each((e,t)=>{0<=t.offsetLeft+n&&r>t.offsetLeft+n?(t.removeAttribute(`aria-hidden`),t.removeAttribute(`inert`)):(t.setAttribute(`aria-hidden`,!0),t.setAttribute(`inert`,``))})}handleElementHandlers(){}};t.default=CarouselHandlerBase})),$=e(),At=$(St()),jt=$(wt()),Mt=$(Tt()),Nt=$(Et()),Pt=$(Q()),Ft=$(Dt()),It=$(kt());At.default.frontend={Document:jt.default,tools:{StretchElement:Mt.default},handlers:{Base:Pt.default,StretchedElement:Nt.default,SwiperBase:Ft.default,CarouselBase:It.default}}})();;
jQuery.uiBackCompat = true;
;
/*! jQuery UI - v1.14.2 - 2026-07-15
* https://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-patch.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js
* Copyright OpenJS Foundation and other contributors; Licensed MIT */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(x){"use strict";x.ui=x.ui||{};x.ui.version="1.14.2";
/*!
 * jQuery UI Widget 1.14.2
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */var o,n,W,C,s,r,l,a,h,i,f=0,c=Array.prototype.hasOwnProperty,u=Array.prototype.slice;x.cleanData=(o=x.cleanData,function(t){for(var e,i,n=0;null!=(i=t[n]);n++)(e=x._data(i,"events"))&&e.remove&&x(i).triggerHandler("remove");o(t)}),x.widget=function(t,i,e){var n,o,s,r,l={},a=t.split(".")[0];return"__proto__"===(t=t.split(".")[1])||"constructor"===t?x.error("Invalid widget name: "+t):(r=a+"-"+t,e||(e=i,i=x.Widget),Array.isArray(e)&&(e=x.extend.apply(null,[{}].concat(e))),x.expr.pseudos[r.toLowerCase()]=function(t){return!!x.data(t,r)},x[a]=x[a]||{},n=x[a][t],o=x[a][t]=function(t,e){if(!this||!this._createWidget)return new o(t,e);arguments.length&&this._createWidget(t,e)},x.extend(o,n,{version:e.version,_proto:x.extend({},e),_childConstructors:[]}),(s=new i).options=x.widget.extend({},s.options),x.each(e,function(e,n){function o(){return i.prototype[e].apply(this,arguments)}function s(t){return i.prototype[e].apply(this,t)}l[e]="function"!=typeof n?n:function(){var t,e=this._super,i=this._superApply;return this._super=o,this._superApply=s,t=n.apply(this,arguments),this._super=e,this._superApply=i,t}}),o.prototype=x.widget.extend(s,{widgetEventPrefix:n&&s.widgetEventPrefix||t},l,{constructor:o,namespace:a,widgetName:t,widgetFullName:r}),n?(x.each(n._childConstructors,function(t,e){var i=e.prototype;x.widget(i.namespace+"."+i.widgetName,o,e._proto)}),delete n._childConstructors):i._childConstructors.push(o),x.widget.bridge(t,o),o)},x.widget.extend=function(t){for(var e,i,n=u.call(arguments,1),o=0,s=n.length;o<s;o++)for(e in n[o])i=n[o][e],c.call(n[o],e)&&void 0!==i&&(x.isPlainObject(i)?t[e]=x.isPlainObject(t[e])?x.widget.extend({},t[e],i):x.widget.extend({},i):t[e]=i);return t},x.widget.bridge=function(s,e){var r=e.prototype.widgetFullName||s;x.fn[s]=function(i){var t="string"==typeof i,n=u.call(arguments,1),o=this;return t?this.length||"instance"!==i?this.each(function(){var t,e=x.data(this,r);return"instance"===i?(o=e,!1):e?"function"!=typeof e[i]||"_"===i.charAt(0)?x.error("no such method '"+i+"' for "+s+" widget instance"):(t=e[i].apply(e,n))!==e&&void 0!==t?(o=t&&t.jquery?o.pushStack(t.get()):t,!1):void 0:x.error("cannot call methods on "+s+" prior to initialization; attempted to call method '"+i+"'")}):o=void 0:(n.length&&(i=x.widget.extend.apply(null,[i].concat(n))),this.each(function(){var t=x.data(this,r);t?(t.option(i||{}),t._init&&t._init()):x.data(this,r,new e(i,this))})),o}},x.Widget=function(){},x.Widget._childConstructors=[],x.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(t,e){e=x(e||this.defaultElement||this)[0],this.element=x(e),this.uuid=f++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=x(),this.hoverable=x(),this.focusable=x(),this.classesElementLookup={},e!==this&&(x.data(e,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===e&&this.destroy()}}),this.document=x(e.style?e.ownerDocument:e.document||e),this.window=x(this.document[0].defaultView||this.document[0].parentWindow)),this.options=x.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:x.noop,_create:x.noop,_init:x.noop,destroy:function(){var i=this;this._destroy(),x.each(this.classesElementLookup,function(t,e){i._removeClass(e,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:x.noop,widget:function(){return this.element},option:function(t,e){var i,n,o,s=t;if(0===arguments.length)return x.widget.extend({},this.options);if("string"==typeof t)if(s={},t=(i=t.split(".")).shift(),i.length){for(n=s[t]=x.widget.extend({},this.options[t]),o=0;o<i.length-1;o++)n[i[o]]=n[i[o]]||{},n=n[i[o]];if(t=i.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=e}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];s[t]=e}return this._setOptions(s),this},_setOptions:function(t){for(var e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(t){var e,i,n;for(e in t)n=this.classesElementLookup[e],t[e]!==this.options.classes[e]&&n&&n.length&&(i=x(n.get()),this._removeClass(n,e),i.addClass(this._classes({element:i,keys:e,classes:t,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(o){var s=[],r=this;function t(t,e){for(var i,n=0;n<t.length;n++)i=r.classesElementLookup[t[n]]||x(),i=o.add?(function(){var i=[];o.element.each(function(t,e){x.map(r.classesElementLookup,function(t){return t}).some(function(t){return t.is(e)})||i.push(e)}),r._on(x(i),{remove:"_untrackClassesElement"})}(),x(x.uniqueSort(i.get().concat(o.element.get())))):x(i.not(o.element).get()),r.classesElementLookup[t[n]]=i,s.push(t[n]),e&&o.classes[t[n]]&&s.push(o.classes[t[n]])}return(o=x.extend({element:this.element,classes:this.options.classes||{}},o)).keys&&t(o.keys.match(/\S+/g)||[],!0),o.extra&&t(o.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(i){var n=this;x.each(n.classesElementLookup,function(t,e){-1!==x.inArray(i.target,e)&&(n.classesElementLookup[t]=x(e.not(i.target).get()))}),this._off(x(i.target))},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,n){var o="string"==typeof t||null===t,e={extra:o?e:i,keys:o?t:e,element:o?this.element:t,add:n="boolean"==typeof n?n:i};return e.element.toggleClass(this._classes(e),n),this},_on:function(o,s,t){var r,l=this;"boolean"!=typeof o&&(t=s,s=o,o=!1),t?(s=r=x(s),this.bindings=this.bindings.add(s)):(t=s,s=this.element,r=this.widget()),x.each(t,function(t,e){function i(){if(o||!0!==l.options.disabled&&!x(this).hasClass("ui-state-disabled"))return("string"==typeof e?l[e]:e).apply(l,arguments)}"string"!=typeof e&&(i.guid=e.guid=e.guid||i.guid||x.guid++);var t=t.match(/^([\w:-]*)\s*(.*)$/),n=t[1]+l.eventNamespace,t=t[2];t?r.on(n,t,i):s.on(n,i)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.off(e),this.bindings=x(this.bindings.not(t).get()),this.focusable=x(this.focusable.not(t).get()),this.hoverable=x(this.hoverable.not(t).get())},_delay:function(t,e){var i=this;return setTimeout(function(){return("string"==typeof t?i[t]:t).apply(i,arguments)},e||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){this._addClass(x(t.currentTarget),null,"ui-state-hover")},mouseleave:function(t){this._removeClass(x(t.currentTarget),null,"ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){this._addClass(x(t.currentTarget),null,"ui-state-focus")},focusout:function(t){this._removeClass(x(t.currentTarget),null,"ui-state-focus")}})},_trigger:function(t,e,i){var n,o,s=this.options[t];if(i=i||{},(e=x.Event(e)).type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),e.target=this.element[0],o=e.originalEvent)for(n in o)n in e||(e[n]=o[n]);return this.element.trigger(e,i),!("function"==typeof s&&!1===s.apply(this.element[0],[e].concat(i))||e.isDefaultPrevented())}},x.each({show:"fadeIn",hide:"fadeOut"},function(s,r){x.Widget.prototype["_"+s]=function(e,t,i){var n,o=(t="string"==typeof t?{effect:t}:t)?!0!==t&&"number"!=typeof t&&t.effect||r:s;"number"==typeof(t=t||{})?t={duration:t}:!0===t&&(t={}),n=!x.isEmptyObject(t),t.complete=i,t.delay&&e.delay(t.delay),n&&x.effects&&x.effects.effect[o]?e[s](t):o!==s&&e[o]?e[o](t.duration,t.easing,i):e.queue(function(t){x(this)[s](),i&&i.call(e[0]),t()})}}),x.widget;function E(t,e,i){return[parseFloat(t[0])*(h.test(t[0])?e/100:1),parseFloat(t[1])*(h.test(t[1])?i/100:1)]}function P(t,e){return parseInt(x.css(t,e),10)||0}function H(t){return null!=t&&t===t.window}
/*!
 * jQuery UI Position 1.14.2
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 *
 * https://api.jqueryui.com/position/
 */
W=Math.max,C=Math.abs,s=/left|center|right/,r=/top|center|bottom/,l=/[\+\-]\d+(\.[\d]+)?%?/,a=/^\w+/,h=/%$/,i=x.fn.position,x.position={scrollbarWidth:function(){var t,e,i;return void 0!==n?n:(i=(e=x("<div style='display:block;position:absolute;width:200px;height:200px;overflow:hidden;'><div style='height:300px;width:auto;'></div></div>")).children()[0],x("body").append(e),t=i.offsetWidth,e.css("overflow","scroll"),t===(i=i.offsetWidth)&&(i=e[0].clientWidth),e.remove(),n=t-i)},getScrollInfo:function(t){var e=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),i=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),e="scroll"===e||"auto"===e&&t.width<t.element[0].scrollWidth;return{width:"scroll"===i||"auto"===i&&t.height<t.element[0].scrollHeight?x.position.scrollbarWidth():0,height:e?x.position.scrollbarWidth():0}},getWithinInfo:function(t){var e=x(t||window),i=H(e[0]),n=!!e[0]&&9===e[0].nodeType;return{element:e,isWindow:i,isDocument:n,offset:!i&&!n?x(t).offset():{left:0,top:0},scrollLeft:e.scrollLeft(),scrollTop:e.scrollTop(),width:e.outerWidth(),height:e.outerHeight()}}},x.fn.position=function(c){var u,d,p,g,m,v,w,y,b,_,t,e;return c&&c.of?(v="string"==typeof(c=x.extend({},c)).of?x(document).find(c.of):x(c.of),w=x.position.getWithinInfo(c.within),y=x.position.getScrollInfo(w),b=(c.collision||"flip").split(" "),_={},e=9===(e=(t=v)[0]).nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:H(e)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:e.preventDefault?{width:0,height:0,offset:{top:e.pageY,left:e.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()},v[0].preventDefault&&(c.at="left top"),d=e.width,p=e.height,m=x.extend({},g=e.offset),x.each(["my","at"],function(){var t,e,i=(c[this]||"").split(" ");(i=1===i.length?s.test(i[0])?i.concat(["center"]):r.test(i[0])?["center"].concat(i):["center","center"]:i)[0]=s.test(i[0])?i[0]:"center",i[1]=r.test(i[1])?i[1]:"center",t=l.exec(i[0]),e=l.exec(i[1]),_[this]=[t?t[0]:0,e?e[0]:0],c[this]=[a.exec(i[0])[0],a.exec(i[1])[0]]}),1===b.length&&(b[1]=b[0]),"right"===c.at[0]?m.left+=d:"center"===c.at[0]&&(m.left+=d/2),"bottom"===c.at[1]?m.top+=p:"center"===c.at[1]&&(m.top+=p/2),u=E(_.at,d,p),m.left+=u[0],m.top+=u[1],this.each(function(){var i,t,r=x(this),l=r.outerWidth(),a=r.outerHeight(),e=P(this,"marginLeft"),n=P(this,"marginTop"),o=l+e+P(this,"marginRight")+y.width,s=a+n+P(this,"marginBottom")+y.height,h=x.extend({},m),f=E(_.my,r.outerWidth(),r.outerHeight());"right"===c.my[0]?h.left-=l:"center"===c.my[0]&&(h.left-=l/2),"bottom"===c.my[1]?h.top-=a:"center"===c.my[1]&&(h.top-=a/2),h.left+=f[0],h.top+=f[1],i={marginLeft:e,marginTop:n},x.each(["left","top"],function(t,e){x.ui.position[b[t]]&&x.ui.position[b[t]][e](h,{targetWidth:d,targetHeight:p,elemWidth:l,elemHeight:a,collisionPosition:i,collisionWidth:o,collisionHeight:s,offset:[u[0]+f[0],u[1]+f[1]],my:c.my,at:c.at,within:w,elem:r})}),c.using&&(t=function(t){var e=g.left-h.left,i=e+d-l,n=g.top-h.top,o=n+p-a,s={target:{element:v,left:g.left,top:g.top,width:d,height:p},element:{element:r,left:h.left,top:h.top,width:l,height:a},horizontal:i<0?"left":0<e?"right":"center",vertical:o<0?"top":0<n?"bottom":"middle"};d<l&&C(e+i)<d&&(s.horizontal="center"),p<a&&C(n+o)<p&&(s.vertical="middle"),W(C(e),C(i))>W(C(n),C(o))?s.important="horizontal":s.important="vertical",c.using.call(this,t,s)}),r.offset(x.extend(h,{using:t}))})):i.apply(this,arguments)},x.ui.position={fit:{left:function(t,e){var i,n=e.within,o=n.isWindow?n.scrollLeft:n.offset.left,n=n.width,s=t.left-e.collisionPosition.marginLeft,r=o-s,l=s+e.collisionWidth-n-o;n<e.collisionWidth?0<r&&l<=0?(i=t.left+r+e.collisionWidth-n-o,t.left+=r-i):t.left=!(0<l&&r<=0)&&l<r?o+n-e.collisionWidth:o:0<r?t.left+=r:0<l?t.left-=l:t.left=W(t.left-s,t.left)},top:function(t,e){var i,n=e.within,n=n.isWindow?n.scrollTop:n.offset.top,o=e.within.height,s=t.top-e.collisionPosition.marginTop,r=n-s,l=s+e.collisionHeight-o-n;o<e.collisionHeight?0<r&&l<=0?(i=t.top+r+e.collisionHeight-o-n,t.top+=r-i):t.top=!(0<l&&r<=0)&&l<r?n+o-e.collisionHeight:n:0<r?t.top+=r:0<l?t.top-=l:t.top=W(t.top-s,t.top)}},flip:{left:function(t,e){var i=e.within,n=i.offset.left+i.scrollLeft,o=i.width,i=i.isWindow?i.scrollLeft:i.offset.left,s=t.left-e.collisionPosition.marginLeft,r=s-i,s=s+e.collisionWidth-o-i,l="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,a="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,h=-2*e.offset[0];r<0?((o=t.left+l+a+h+e.collisionWidth-o-n)<0||o<C(r))&&(t.left+=l+a+h):0<s&&(0<(n=t.left-e.collisionPosition.marginLeft+l+a+h-i)||C(n)<s)&&(t.left+=l+a+h)},top:function(t,e){var i=e.within,n=i.offset.top+i.scrollTop,o=i.height,i=i.isWindow?i.scrollTop:i.offset.top,s=t.top-e.collisionPosition.marginTop,r=s-i,s=s+e.collisionHeight-o-i,l="top"===e.my[1]?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,a="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,h=-2*e.offset[1];r<0?((o=t.top+l+a+h+e.collisionHeight-o-n)<0||o<C(r))&&(t.top+=l+a+h):0<s&&(0<(n=t.top-e.collisionPosition.marginTop+l+a+h-i)||C(n)<s)&&(t.top+=l+a+h)}},flipfit:{left:function(){x.ui.position.flip.left.apply(this,arguments),x.ui.position.fit.left.apply(this,arguments)},top:function(){x.ui.position.flip.top.apply(this,arguments),x.ui.position.fit.top.apply(this,arguments)}}};var t,e;
/*!
 * jQuery UI :data 1.14.2
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */x.ui.position,x.extend(x.expr.pseudos,{data:x.expr.createPseudo(function(e){return function(t){return!!x.data(t,e)}})}),x.fn.extend({disableSelection:(t="onselectstart"in document.createElement("div")?"selectstart":"mousedown",function(){return this.on(t+".ui-disableSelection",function(t){t.preventDefault()})}),enableSelection:function(){return this.off(".ui-disableSelection")}}),
/*!
 * jQuery UI Focusable 1.14.2
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
x.ui.focusable=function(t,e){var i,n,o,s=t.nodeName.toLowerCase();return"area"===s?(o=(i=t.parentNode).name,!(!t.href||!o||"map"!==i.nodeName.toLowerCase())&&0<(i=x("img[usemap='#"+o+"']")).length&&i.is(":visible")):(/^(input|select|textarea|button|object)$/.test(s)?(n=!t.disabled)&&(o=x(t).closest("fieldset")[0])&&(n=!o.disabled):n="a"===s&&t.href||e,n&&x(t).is(":visible")&&"visible"===x(t).css("visibility"))},x.extend(x.expr.pseudos,{focusable:function(t){return x.ui.focusable(t,null!=x.attr(t,"tabindex"))}}),x.ui.focusable,x.ui.formResetMixin={_formResetHandler:function(){var e=x(this);setTimeout(function(){var t=e.data("ui-form-reset-instances");x.each(t,function(){this.refresh()})})},_bindFormResetHandler:function(){var t;this.form=x(this.element.prop("form")),this.form.length&&((t=this.form.data("ui-form-reset-instances")||[]).length||this.form.on("reset.ui-form-reset",this._formResetHandler),t.push(this),this.form.data("ui-form-reset-instances",t))},_unbindFormResetHandler:function(){var t;this.form.length&&((t=this.form.data("ui-form-reset-instances")).splice(x.inArray(this,t),1),t.length?this.form.data("ui-form-reset-instances",t):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset"))}},
/*!
 * jQuery UI Legacy jQuery Core patches 1.14.2
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 *
 */
x.escapeSelector||(x.escapeSelector=function(t){return CSS.escape(t+"")}),x.fn.even&&x.fn.odd||x.fn.extend({even:function(){return this.filter(function(t){return t%2==0})},odd:function(){return this.filter(function(t){return t%2==1})}}),x.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},x.fn.labels=function(){var t,e,i;return this.length?this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(e=this.eq(0).parents("label"),(t=this.attr("id"))&&(i=(i=this.eq(0).parents().last()).add((i.length?i:this).siblings()),t="label[for='"+CSS.escape(t)+"']",e=e.add(i.find(t).addBack(t))),this.pushStack(e)):this.pushStack([])},x.fn.scrollParent=function(t){var e=this.css("position"),i="absolute"===e,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,t=this.parents().filter(function(){var t=x(this);return(!i||"static"!==t.css("position"))&&n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==e&&t.length?t:x(this[0].ownerDocument||document)},x.extend(x.expr.pseudos,{tabbable:function(t){var e=x.attr(t,"tabindex"),i=null!=e;return(!i||0<=e)&&x.ui.focusable(t,i)}}),x.fn.extend({uniqueId:(e=0,function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&x(this).removeAttr("id")})}});x.ui.plugin={add:function(t,e,i){var n,o=x.ui[t].prototype;for(n in i)o.plugins[n]=o.plugins[n]||[],o.plugins[n].push([e,i[n]])},call:function(t,e,i,n){var o,s=t.plugins[e];if(s&&(n||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(o=0;o<s.length;o++)t.options[s[o][0]]&&s[o][1].apply(t.element,i)}}});;
"use strict";(function(){var __esmMin=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},__commonJSMin=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),e=__commonJSMin(((e,t)=>{function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}t.exports=_interopRequireDefault,t.exports.__esModule=!0,t.exports.default=t.exports})),t=__commonJSMin(((e,t)=>{var check=function(e){return e&&e.Math===Math&&e};t.exports=check(typeof globalThis==`object`&&globalThis)||check(typeof window==`object`&&window)||check(typeof self==`object`&&self)||check(typeof global==`object`&&global)||check(typeof e==`object`&&e)||(function(){return this})()||Function(`return this`)()})),n=__commonJSMin(((e,t)=>{t.exports=function(e){try{return!!e()}catch(e){return!0}}})),r=__commonJSMin(((e,t)=>{t.exports=!n()(function(){return Object.defineProperty({},1,{get:function(){return 7}})[1]!==7})})),i=__commonJSMin(((e,t)=>{t.exports=!n()(function(){var e=(function(){}).bind();return typeof e!=`function`||e.hasOwnProperty(`prototype`)})})),a=__commonJSMin(((e,t)=>{var n=i(),r=Function.prototype.call;t.exports=n?r.bind(r):function(){return r.apply(r,arguments)}})),o=__commonJSMin((e=>{var t={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor;e.f=n&&!t.call({1:2},1)?function propertyIsEnumerable(e){var t=n(this,e);return!!t&&t.enumerable}:t})),s=__commonJSMin(((e,t)=>{t.exports=function(e,t){return{enumerable:!(e&1),configurable:!(e&2),writable:!(e&4),value:t}}})),c=__commonJSMin(((e,t)=>{var n=i(),r=Function.prototype,a=r.call,o=n&&r.bind.bind(a,a);t.exports=n?o:function(e){return function(){return a.apply(e,arguments)}}})),l=__commonJSMin(((e,t)=>{var n=c(),r=n({}.toString),i=n(``.slice);t.exports=function(e){return i(r(e),8,-1)}})),u=__commonJSMin(((e,t)=>{var r=c(),i=n(),a=l(),o=Object,s=r(``.split);t.exports=i(function(){return!o(`z`).propertyIsEnumerable(0)})?function(e){return a(e)===`String`?s(e,``):o(e)}:o})),d=__commonJSMin(((e,t)=>{t.exports=function(e){return e==null}})),f=__commonJSMin(((e,t)=>{var n=d(),r=TypeError;t.exports=function(e){if(n(e))throw new r(`Can't call method on `+e);return e}})),p=__commonJSMin(((e,t)=>{var n=u(),r=f();t.exports=function(e){return n(r(e))}})),m=__commonJSMin(((e,t)=>{var n=typeof document==`object`&&document.all;t.exports=n===void 0&&n!==void 0?function(e){return typeof e==`function`||e===n}:function(e){return typeof e==`function`}})),h=__commonJSMin(((e,t)=>{var n=m();t.exports=function(e){return typeof e==`object`?e!==null:n(e)}})),g=__commonJSMin(((e,n)=>{var r=t(),i=m(),aFunction=function(e){return i(e)?e:void 0};n.exports=function(e,t){return arguments.length<2?aFunction(r[e]):r[e]&&r[e][t]}})),_=__commonJSMin(((e,t)=>{t.exports=c()({}.isPrototypeOf)})),v=__commonJSMin(((e,n)=>{var r=t().navigator,i=r&&r.userAgent;n.exports=i?String(i):``})),y=__commonJSMin(((e,n)=>{var r=t(),i=v(),a=r.process,o=r.Deno,s=a&&a.versions||o&&o.version,c=s&&s.v8,l,u;c&&(l=c.split(`.`),u=l[0]>0&&l[0]<4?1:+(l[0]+l[1])),!u&&i&&(l=i.match(/Edge\/(\d+)/),(!l||l[1]>=74)&&(l=i.match(/Chrome\/(\d+)/),l&&(u=+l[1]))),n.exports=u})),b=__commonJSMin(((e,r)=>{var i=y(),a=n(),o=t().String;r.exports=!!Object.getOwnPropertySymbols&&!a(function(){var e=Symbol(`symbol detection`);return!o(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&i&&i<41})})),x=__commonJSMin(((e,t)=>{t.exports=b()&&!Symbol.sham&&typeof Symbol.iterator==`symbol`})),S=__commonJSMin(((e,t)=>{var n=g(),r=m(),i=_(),a=x(),o=Object;t.exports=a?function(e){return typeof e==`symbol`}:function(e){var t=n(`Symbol`);return r(t)&&i(t.prototype,o(e))}})),C=__commonJSMin(((e,t)=>{var n=String;t.exports=function(e){try{return n(e)}catch(e){return`Object`}}})),w=__commonJSMin(((e,t)=>{var n=m(),r=C(),i=TypeError;t.exports=function(e){if(n(e))return e;throw new i(r(e)+` is not a function`)}})),T=__commonJSMin(((e,t)=>{var n=w(),r=d();t.exports=function(e,t){var i=e[t];return r(i)?void 0:n(i)}})),E=__commonJSMin(((e,t)=>{var n=a(),r=m(),i=h(),o=TypeError;t.exports=function(e,t){var a,s;if(t===`string`&&r(a=e.toString)&&!i(s=n(a,e))||r(a=e.valueOf)&&!i(s=n(a,e))||t!==`string`&&r(a=e.toString)&&!i(s=n(a,e)))return s;throw new o(`Can't convert object to primitive value`)}})),D=__commonJSMin(((e,t)=>{t.exports=!1})),O=__commonJSMin(((e,n)=>{var r=t(),i=Object.defineProperty;n.exports=function(e,t){try{i(r,e,{value:t,configurable:!0,writable:!0})}catch(n){r[e]=t}return t}})),k=__commonJSMin(((e,n)=>{var r=D(),i=t(),a=O(),o=`__core-js_shared__`,s=n.exports=i[o]||a(o,{});(s.versions||(s.versions=[])).push({version:`3.46.0`,mode:r?`pure`:`global`,copyright:`© 2014-2025 Denis Pushkarev (zloirock.ru), 2025 CoreJS Company (core-js.io)`,license:`https://github.com/zloirock/core-js/blob/v3.46.0/LICENSE`,source:`https://github.com/zloirock/core-js`})})),A=__commonJSMin(((e,t)=>{var n=k();t.exports=function(e,t){return n[e]||(n[e]=t||{})}})),j=__commonJSMin(((e,t)=>{var n=f(),r=Object;t.exports=function(e){return r(n(e))}})),M=__commonJSMin(((e,t)=>{var n=c(),r=j(),i=n({}.hasOwnProperty);t.exports=Object.hasOwn||function hasOwn(e,t){return i(r(e),t)}})),N=__commonJSMin(((e,t)=>{var n=c(),r=0,i=Math.random(),a=n(1.1.toString);t.exports=function(e){return`Symbol(`+(e===void 0?``:e)+`)_`+a(++r+i,36)}})),P=__commonJSMin(((e,n)=>{var r=t(),i=A(),a=M(),o=N(),s=b(),c=x(),l=r.Symbol,u=i(`wks`),d=c?l.for||l:l&&l.withoutSetter||o;n.exports=function(e){return a(u,e)||(u[e]=s&&a(l,e)?l[e]:d(`Symbol.`+e)),u[e]}})),ee=__commonJSMin(((e,t)=>{var n=a(),r=h(),i=S(),o=T(),s=E(),c=P(),l=TypeError,u=c(`toPrimitive`);t.exports=function(e,t){if(!r(e)||i(e))return e;var a=o(e,u),c;if(a){if(t===void 0&&(t=`default`),c=n(a,e,t),!r(c)||i(c))return c;throw new l(`Can't convert object to primitive value`)}return t===void 0&&(t=`number`),s(e,t)}})),te=__commonJSMin(((e,t)=>{var n=ee(),r=S();t.exports=function(e){var t=n(e,`string`);return r(t)?t:t+``}})),ne=__commonJSMin(((e,n)=>{var r=t(),i=h(),a=r.document,o=i(a)&&i(a.createElement);n.exports=function(e){return o?a.createElement(e):{}}})),re=__commonJSMin(((e,t)=>{var i=r(),a=n(),o=ne();t.exports=!i&&!a(function(){return Object.defineProperty(o(`div`),"a",{get:function(){return 7}}).a!==7})})),ie=__commonJSMin((e=>{var t=r(),n=a(),i=o(),c=s(),l=p(),u=te(),d=M(),f=re(),m=Object.getOwnPropertyDescriptor;e.f=t?m:function getOwnPropertyDescriptor(e,t){if(e=l(e),t=u(t),f)try{return m(e,t)}catch(e){}if(d(e,t))return c(!n(i.f,e,t),e[t])}})),ae=__commonJSMin(((e,t)=>{var i=r(),a=n();t.exports=i&&a(function(){return Object.defineProperty(function(){},"prototype",{value:42,writable:!1}).prototype!==42})})),I=__commonJSMin(((e,t)=>{var n=h(),r=String,i=TypeError;t.exports=function(e){if(n(e))return e;throw new i(r(e)+` is not an object`)}})),L=__commonJSMin((e=>{var t=r(),n=re(),i=ae(),a=I(),o=te(),s=TypeError,c=Object.defineProperty,l=Object.getOwnPropertyDescriptor,u=`enumerable`,d=`configurable`,f=`writable`;e.f=t?i?function defineProperty(e,t,n){if(a(e),t=o(t),a(n),typeof e==`function`&&t===`prototype`&&`value`in n&&f in n&&!n[f]){var r=l(e,t);r&&r[f]&&(e[t]=n.value,n={configurable:d in n?n[d]:r[d],enumerable:u in n?n[u]:r[u],writable:!1})}return c(e,t,n)}:c:function defineProperty(e,t,r){if(a(e),t=o(t),a(r),n)try{return c(e,t,r)}catch(e){}if(`get`in r||`set`in r)throw new s(`Accessors not supported`);return`value`in r&&(e[t]=r.value),e}})),R=__commonJSMin(((e,t)=>{var n=r(),i=L(),a=s();t.exports=n?function(e,t,n){return i.f(e,t,a(1,n))}:function(e,t,n){return e[t]=n,e}})),oe=__commonJSMin(((e,t)=>{var n=r(),i=M(),a=Function.prototype,o=n&&Object.getOwnPropertyDescriptor,s=i(a,`name`);t.exports={EXISTS:s,PROPER:s&&(function something(){}).name===`something`,CONFIGURABLE:s&&(!n||n&&o(a,`name`).configurable)}})),se=__commonJSMin(((e,t)=>{var n=c(),r=m(),i=k(),a=n(Function.toString);r(i.inspectSource)||(i.inspectSource=function(e){return a(e)}),t.exports=i.inspectSource})),ce=__commonJSMin(((e,n)=>{var r=t(),i=m(),a=r.WeakMap;n.exports=i(a)&&/native code/.test(String(a))})),z=__commonJSMin(((e,t)=>{var n=A(),r=N(),i=n(`keys`);t.exports=function(e){return i[e]||(i[e]=r(e))}})),B=__commonJSMin(((e,t)=>{t.exports={}})),le=__commonJSMin(((e,n)=>{var r=ce(),i=t(),a=h(),o=R(),s=M(),c=k(),l=z(),u=B(),d=`Object already initialized`,f=i.TypeError,p=i.WeakMap,set,get,has,enforce=function(e){return has(e)?get(e):set(e,{})},getterFor=function(e){return function(t){var n;if(!a(t)||(n=get(t)).type!==e)throw new f(`Incompatible receiver, `+e+` required`);return n}};if(r||c.state){var m=c.state||(c.state=new p);m.get=m.get,m.has=m.has,m.set=m.set,set=function(e,t){if(m.has(e))throw new f(d);return t.facade=e,m.set(e,t),t},get=function(e){return m.get(e)||{}},has=function(e){return m.has(e)}}else{var g=l(`state`);u[g]=!0,set=function(e,t){if(s(e,g))throw new f(d);return t.facade=e,o(e,g,t),t},get=function(e){return s(e,g)?e[g]:{}},has=function(e){return s(e,g)}}n.exports={set,get,has,enforce,getterFor}})),ue=__commonJSMin(((e,t)=>{var i=c(),a=n(),o=m(),s=M(),l=r(),u=oe().CONFIGURABLE,d=se(),f=le(),p=f.enforce,h=f.get,g=String,_=Object.defineProperty,v=i(``.slice),y=i(``.replace),b=i([].join),x=l&&!a(function(){return _(function(){},`length`,{value:8}).length!==8}),S=String(String).split(`String`),C=t.exports=function(e,t,n){v(g(t),0,7)===`Symbol(`&&(t=`[`+y(g(t),/^Symbol\(([^)]*)\).*$/,`$1`)+`]`),n&&n.getter&&(t=`get `+t),n&&n.setter&&(t=`set `+t),(!s(e,`name`)||u&&e.name!==t)&&(l?_(e,`name`,{value:t,configurable:!0}):e.name=t),x&&n&&s(n,`arity`)&&e.length!==n.arity&&_(e,`length`,{value:n.arity});try{n&&s(n,`constructor`)&&n.constructor?l&&_(e,`prototype`,{writable:!1}):e.prototype&&(e.prototype=void 0)}catch(e){}var r=p(e);return s(r,`source`)||(r.source=b(S,typeof t==`string`?t:``)),e};Function.prototype.toString=C(function toString(){return o(this)&&h(this).source||d(this)},`toString`)})),V=__commonJSMin(((e,t)=>{var n=m(),r=L(),i=ue(),a=O();t.exports=function(e,t,o,s){s||(s={});var c=s.enumerable,l=s.name===void 0?t:s.name;if(n(o)&&i(o,l,s),s.global)c?e[t]=o:a(t,o);else{try{s.unsafe?e[t]&&(c=!0):delete e[t]}catch(e){}c?e[t]=o:r.f(e,t,{value:o,enumerable:!1,configurable:!s.nonConfigurable,writable:!s.nonWritable})}return e}})),de=__commonJSMin(((e,t)=>{var n=Math.ceil,r=Math.floor;t.exports=Math.trunc||function trunc(e){var t=+e;return(t>0?r:n)(t)}})),fe=__commonJSMin(((e,t)=>{var n=de();t.exports=function(e){var t=+e;return t!==t||t===0?0:n(t)}})),pe=__commonJSMin(((e,t)=>{var n=fe(),r=Math.max,i=Math.min;t.exports=function(e,t){var a=n(e);return a<0?r(a+t,0):i(a,t)}})),me=__commonJSMin(((e,t)=>{var n=fe(),r=Math.min;t.exports=function(e){var t=n(e);return t>0?r(t,9007199254740991):0}})),H=__commonJSMin(((e,t)=>{var n=me();t.exports=function(e){return n(e.length)}})),he=__commonJSMin(((e,t)=>{var n=p(),r=pe(),i=H(),createMethod=function(e){return function(t,a,o){var s=n(t),c=i(s);if(c===0)return!e&&-1;var l=r(o,c),u;if(e&&a!==a){for(;c>l;)if(u=s[l++],u!==u)return!0}else for(;c>l;l++)if((e||l in s)&&s[l]===a)return e||l||0;return!e&&-1}};t.exports={includes:createMethod(!0),indexOf:createMethod(!1)}})),ge=__commonJSMin(((e,t)=>{var n=c(),r=M(),i=p(),a=he().indexOf,o=B(),s=n([].push);t.exports=function(e,t){var n=i(e),c=0,l=[],u;for(u in n)!r(o,u)&&r(n,u)&&s(l,u);for(;t.length>c;)r(n,u=t[c++])&&(~a(l,u)||s(l,u));return l}})),U=__commonJSMin(((e,t)=>{t.exports=[`constructor`,`hasOwnProperty`,`isPrototypeOf`,`propertyIsEnumerable`,`toLocaleString`,`toString`,`valueOf`]})),_e=__commonJSMin((e=>{var t=ge(),n=U().concat(`length`,`prototype`);e.f=Object.getOwnPropertyNames||function getOwnPropertyNames(e){return t(e,n)}})),ve=__commonJSMin((e=>{e.f=Object.getOwnPropertySymbols})),ye=__commonJSMin(((e,t)=>{var n=g(),r=c(),i=_e(),a=ve(),o=I(),s=r([].concat);t.exports=n(`Reflect`,`ownKeys`)||function ownKeys(e){var t=i.f(o(e)),n=a.f;return n?s(t,n(e)):t}})),be=__commonJSMin(((e,t)=>{var n=M(),r=ye(),i=ie(),a=L();t.exports=function(e,t,o){for(var s=r(t),c=a.f,l=i.f,u=0;u<s.length;u++){var d=s[u];!n(e,d)&&!(o&&n(o,d))&&c(e,d,l(t,d))}}})),xe=__commonJSMin(((e,t)=>{var r=n(),i=m(),a=/#|\.prototype\./,isForced=function(e,t){var n=s[o(e)];return n===l?!0:n===c?!1:i(t)?r(t):!!t},o=isForced.normalize=function(e){return String(e).replace(a,`.`).toLowerCase()},s=isForced.data={},c=isForced.NATIVE=`N`,l=isForced.POLYFILL=`P`;t.exports=isForced})),W=__commonJSMin(((e,n)=>{var r=t(),i=ie().f,a=R(),o=V(),s=O(),c=be(),l=xe();n.exports=function(e,t){var n=e.target,u=e.global,d=e.stat,f,p=u?r:d?r[n]||s(n,{}):r[n]&&r[n].prototype,m,h,g,_;if(p)for(m in t){if(g=t[m],e.dontCallGetSet?(_=i(p,m),h=_&&_.value):h=p[m],f=l(u?m:n+(d?`.`:`#`)+m,e.forced),!f&&h!==void 0){if(typeof g==typeof h)continue;c(g,h)}(e.sham||h&&h.sham)&&a(g,`sham`,!0),o(p,m,g,e)}}})),Se=__commonJSMin(((e,t)=>{var n=_(),r=TypeError;t.exports=function(e,t){if(n(t,e))return e;throw new r(`Incorrect invocation`)}})),Ce=__commonJSMin(((e,t)=>{t.exports=!n()(function(){function F(){}return F.prototype.constructor=null,Object.getPrototypeOf(new F)!==F.prototype})})),we=__commonJSMin(((e,t)=>{var n=M(),r=m(),i=j(),a=z(),o=Ce(),s=a(`IE_PROTO`),c=Object,l=c.prototype;t.exports=o?c.getPrototypeOf:function(e){var t=i(e);if(n(t,s))return t[s];var a=t.constructor;return r(a)&&t instanceof a?a.prototype:t instanceof c?l:null}})),Te=__commonJSMin(((e,t)=>{var n=ue(),r=L();t.exports=function(e,t,i){return i.get&&n(i.get,t,{getter:!0}),i.set&&n(i.set,t,{setter:!0}),r.f(e,t,i)}})),Ee=__commonJSMin(((e,t)=>{var n=r(),i=L(),a=s();t.exports=function(e,t,r){n?i.f(e,t,a(0,r)):e[t]=r}})),De=__commonJSMin(((e,t)=>{var n=ge(),r=U();t.exports=Object.keys||function keys(e){return n(e,r)}})),Oe=__commonJSMin((e=>{var t=r(),n=ae(),i=L(),a=I(),o=p(),s=De();e.f=t&&!n?Object.defineProperties:function defineProperties(e,t){a(e);for(var n=o(t),r=s(t),c=r.length,l=0,u;c>l;)i.f(e,u=r[l++],n[u]);return e}})),ke=__commonJSMin(((e,t)=>{t.exports=g()(`document`,`documentElement`)})),Ae=__commonJSMin(((e,t)=>{var n=I(),r=Oe(),i=U(),a=B(),o=ke(),s=ne(),c=z(),l=`>`,u=`<`,d=`prototype`,f=`script`,p=c(`IE_PROTO`),EmptyConstructor=function(){},scriptTag=function(e){return u+f+l+e+u+`/`+f+l},NullProtoObjectViaActiveX=function(e){e.write(scriptTag(``)),e.close();var t=e.parentWindow.Object;return e=null,t},NullProtoObjectViaIFrame=function(){var e=s(`iframe`),t=`java`+f+`:`,n;return e.style.display=`none`,o.appendChild(e),e.src=String(t),n=e.contentWindow.document,n.open(),n.write(scriptTag(`document.F=Object`)),n.close(),n.F},m,NullProtoObject=function(){try{m=new ActiveXObject(`htmlfile`)}catch(e){}NullProtoObject=typeof document<`u`?document.domain&&m?NullProtoObjectViaActiveX(m):NullProtoObjectViaIFrame():NullProtoObjectViaActiveX(m);for(var e=i.length;e--;)delete NullProtoObject[d][i[e]];return NullProtoObject()};a[p]=!0,t.exports=Object.create||function create(e,t){var i;return e===null?i=NullProtoObject():(EmptyConstructor[d]=n(e),i=new EmptyConstructor,EmptyConstructor[d]=null,i[p]=e),t===void 0?i:r.f(i,t)}})),je=__commonJSMin(((e,t)=>{var r=n(),i=m(),a=h(),o=Ae(),s=we(),c=V(),l=P(),u=D(),d=l(`iterator`),f=!1,p,g,_;[].keys&&(_=[].keys(),`next`in _?(g=s(s(_)),g!==Object.prototype&&(p=g)):f=!0),!a(p)||r(function(){var e={};return p[d].call(e)!==e})?p={}:u&&(p=o(p)),i(p[d])||c(p,d,function(){return this}),t.exports={IteratorPrototype:p,BUGGY_SAFARI_ITERATORS:f}})),Me=__commonJSMin((()=>{var e=W(),i=t(),a=Se(),o=I(),s=m(),c=we(),l=Te(),u=Ee(),d=n(),f=M(),p=P(),h=je().IteratorPrototype,g=r(),_=D(),v=`constructor`,y=`Iterator`,b=p(`toStringTag`),x=TypeError,S=i[y],C=_||!s(S)||S.prototype!==h||!d(function(){S({})}),w=function Iterator(){if(a(this,h),c(this)===h)throw new x(`Abstract class Iterator not directly constructable`)},defineIteratorPrototypeAccessor=function(e,t){g?l(h,e,{configurable:!0,get:function(){return t},set:function(t){if(o(this),this===h)throw new x(`You can't redefine this property`);f(this,e)?this[e]=t:u(this,e,t)}}):h[e]=t};f(h,b)||defineIteratorPrototypeAccessor(b,y),(C||!f(h,v)||h[v]===Object)&&defineIteratorPrototypeAccessor(v,w),w.prototype=h,e({global:!0,constructor:!0,forced:C},{Iterator:w})})),G=__commonJSMin((()=>{Me()})),Ne=__commonJSMin(((e,t)=>{var n=l(),r=c();t.exports=function(e){if(n(e)===`Function`)return r(e)}})),Pe=__commonJSMin(((e,t)=>{var n=Ne(),r=w(),a=i(),o=n(n.bind);t.exports=function(e,t){return r(e),t===void 0?e:a?o(e,t):function(){return e.apply(t,arguments)}}})),K=__commonJSMin(((e,t)=>{t.exports={}})),Fe=__commonJSMin(((e,t)=>{var n=P(),r=K(),i=n(`iterator`),a=Array.prototype;t.exports=function(e){return e!==void 0&&(r.Array===e||a[i]===e)}})),Ie=__commonJSMin(((e,t)=>{var n=P()(`toStringTag`),r={};r[n]=`z`,t.exports=String(r)===`[object z]`})),Le=__commonJSMin(((e,t)=>{var n=Ie(),r=m(),i=l(),a=P()(`toStringTag`),o=Object,s=i(function(){return arguments}())===`Arguments`,tryGet=function(e,t){try{return e[t]}catch(e){}};t.exports=n?i:function(e){var t,n,c;return e===void 0?`Undefined`:e===null?`Null`:typeof(n=tryGet(t=o(e),a))==`string`?n:s?i(t):(c=i(t))===`Object`&&r(t.callee)?`Arguments`:c}})),Re=__commonJSMin(((e,t)=>{var n=Le(),r=T(),i=d(),a=K(),o=P()(`iterator`);t.exports=function(e){if(!i(e))return r(e,o)||r(e,`@@iterator`)||a[n(e)]}})),ze=__commonJSMin(((e,t)=>{var n=a(),r=w(),i=I(),o=C(),s=Re(),c=TypeError;t.exports=function(e,t){var a=arguments.length<2?s(e):t;if(r(a))return i(n(a,e));throw new c(o(e)+` is not iterable`)}})),q=__commonJSMin(((e,t)=>{var n=a(),r=I(),i=T();t.exports=function(e,t,a){var o,s;r(e);try{if(o=i(e,`return`),!o){if(t===`throw`)throw a;return a}o=n(o,e)}catch(e){s=!0,o=e}if(t===`throw`)throw a;if(s)throw o;return r(o),a}})),Be=__commonJSMin(((e,t)=>{var n=Pe(),r=a(),i=I(),o=C(),s=Fe(),c=H(),l=_(),u=ze(),d=Re(),f=q(),p=TypeError,Result=function(e,t){this.stopped=e,this.result=t},m=Result.prototype;t.exports=function(e,t,a){var h=a&&a.that,g=!!(a&&a.AS_ENTRIES),_=!!(a&&a.IS_RECORD),v=!!(a&&a.IS_ITERATOR),y=!!(a&&a.INTERRUPTED),b=n(t,h),x,S,C,w,T,E,D,stop=function(e){return x&&f(x,`normal`),new Result(!0,e)},callFn=function(e){return g?(i(e),y?b(e[0],e[1],stop):b(e[0],e[1])):y?b(e,stop):b(e)};if(_)x=e.iterator;else if(v)x=e;else{if(S=d(e),!S)throw new p(o(e)+` is not iterable`);if(s(S)){for(C=0,w=c(e);w>C;C++)if(T=callFn(e[C]),T&&l(m,T))return T;return new Result(!1)}x=u(e,S)}for(E=_?e.next:x.next;!(D=r(E,x)).done;){try{T=callFn(D.value)}catch(e){f(x,`throw`,e)}if(typeof T==`object`&&T&&l(m,T))return T}return new Result(!1)}})),J=__commonJSMin(((e,t)=>{t.exports=function(e){return{iterator:e,next:e.next,done:!1}}})),Y=__commonJSMin(((e,n)=>{var r=t();n.exports=function(e,t){var n=r.Iterator,i=n&&n.prototype,a=i&&i[e],o=!1;if(a)try{a.call({next:function(){return{done:!0}},return:function(){o=!0}},-1)}catch(e){e instanceof t||(o=!1)}if(!o)return a}})),Ve=__commonJSMin((()=>{var e=W(),t=a(),n=Be(),r=w(),i=I(),o=J(),s=q(),c=Y()(`find`,TypeError);e({target:`Iterator`,proto:!0,real:!0,forced:c},{find:function find(e){i(this);try{r(e)}catch(e){s(this,`throw`,e)}if(c)return t(c,this,e);var a=o(this),l=0;return n(a,function(t,n){if(e(t,l++))return n(t)},{IS_RECORD:!0,INTERRUPTED:!0}).result}})})),X=__commonJSMin((()=>{Ve()})),He=__commonJSMin((()=>{var e=W(),t=a(),n=Be(),r=w(),i=I(),o=J(),s=q(),c=Y()(`forEach`,TypeError);e({target:`Iterator`,proto:!0,real:!0,forced:c},{forEach:function forEach(e){i(this);try{r(e)}catch(e){s(this,`throw`,e)}if(c)return t(c,this,e);var a=o(this),l=0;n(a,function(t){e(t,l++)},{IS_RECORD:!0})}})})),Z=__commonJSMin((()=>{He()})),Ue=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0})})),We=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.loadChunk=loadChunk;function chunkUrl(e){var t;let n=window.elementorFrontendConfig||{},r=((t=n.urls)==null?void 0:t.assets)||``,i=n.version?`?ver=`+encodeURIComponent(n.version):``;return r+`js/chunks/`+e+`.min.js`+i}var t=window.__elementorChunks=window.__elementorChunks||{},n=new Map;function appendChunkScript(e){return new Promise((n,r)=>{let i=document.createElement(`script`);i.src=chunkUrl(e),i.async=!0,i.onload=()=>{t[e]?n(t[e]):r(Error(`[elementor] chunk "${e}" loaded but did not register`))},i.onerror=()=>r(Error(`[elementor] failed to load chunk "${e}" from ${i.src}`)),document.head.appendChild(i)})}function loadChunk(e){return t[e]?Promise.resolve(t[e]):(n.has(e)||n.set(e,appendChunkScript(e)),n.get(e))}window.__elementorLoadChunk=loadChunk})),Ge=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,G(),X();var _default=class extends elementorModules.ViewModule{getDefaultSettings(){return{selectors:{elements:`.elementor-element`,nestedDocumentElements:`.elementor .elementor-element`},classes:{editMode:`elementor-edit-mode`}}}getDefaultElements(){let e=this.getSettings(`selectors`);return{$elements:this.$element.find(e.elements).not(this.$element.find(e.nestedDocumentElements))}}getDocumentSettings(e){let t;if(this.isEdit){t={};let e=elementor.settings.page.model;jQuery.each(e.getActiveControls(),n=>{t[n]=e.attributes[n]})}else t=this.$element.data(`elementor-settings`)||{};return this.getItems(t,e)}runElementsHandlers(){this.elements.$elements.each((e,t)=>setTimeout(()=>elementorFrontend.elementsHandler.runReadyTrigger(t)))}onInit(){this.$element=this.getSettings(`$element`),super.onInit(),this.isEdit=this.$element.hasClass(this.getSettings(`classes.editMode`)),this.isEdit?elementor.on(`document:loaded`,()=>{elementor.settings.page.model.on(`change`,this.onSettingsChange.bind(this))}):this.runElementsHandlers()}onSettingsChange(){}};e.default=_default})),Ke=__commonJSMin((t=>{var n=e();Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(Ge()),_default=class extends elementorModules.ViewModule{constructor(...e){super(...e),this.documents={},this.initDocumentClasses(),this.attachDocumentsClasses()}getDefaultSettings(){return{selectors:{document:`.elementor`}}}getDefaultElements(){let e=this.getSettings(`selectors`);return{$documents:jQuery(e.document)}}initDocumentClasses(){this.documentClasses={base:r.default},elementorFrontend.hooks.doAction(`elementor/frontend/documents-manager/init-classes`,this)}addDocumentClass(e,t){this.documentClasses[e]=t}attachDocumentsClasses(){this.elements.$documents.each((e,t)=>this.attachDocumentClass(jQuery(t)))}attachDocumentClass(e){let t=e.data(),n=t.elementorId,r=t.elementorType,i=this.documentClasses[r]||this.documentClasses.base;this.documents[n]=new i({$element:e,id:n})}};t.default=_default})),qe=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,G(),Z();var _default=class extends elementorModules.Module{get(e,t){t=t||{};let n;try{n=t.session?sessionStorage:localStorage}catch(t){return e?void 0:{}}let r=n.getItem(`elementor`);r=r?JSON.parse(r):{},r.__expiration||(r.__expiration={});let i=r.__expiration,a=[];e?i[e]&&(a=[e]):a=Object.keys(i);let o=!1;return a.forEach(e=>{new Date(i[e])<new Date&&(delete r[e],delete i[e],o=!0)}),o&&this.save(r,t.session),e?r[e]:r}set(e,t,n){n=n||{};let r=this.get(null,n);if(r[e]=t,n.lifetimeInSeconds){let t=new Date;t.setTime(t.getTime()+n.lifetimeInSeconds*1e3),r.__expiration[e]=t.getTime()}this.save(r,n.session)}save(e,t){let n;try{n=t?sessionStorage:localStorage}catch(e){return}n.setItem(`elementor`,JSON.stringify(e))}};e.default=_default})),Je=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var matchUserAgent=e=>t.indexOf(e)>=0,t=navigator.userAgent,n=!!window.opr&&!!opr.addons||!!window.opera||matchUserAgent(` OPR/`),r=matchUserAgent(`Firefox`),i=/^((?!chrome|android).)*safari/i.test(t)||/constructor/i.test(window.HTMLElement)||(e=>e.toString()===`[object SafariRemoteNotification]`)(!window.safari||typeof safari<`u`&&safari.pushNotification),a=/Trident|MSIE/.test(t)&&!!document.documentMode,o=!a&&!!window.StyleMedia||matchUserAgent(`Edg`),s=!!window.chrome&&matchUserAgent(`Chrome`)&&!(o||n),c=matchUserAgent(`Chrome`)&&!!window.CSS,l=matchUserAgent(`AppleWebKit`)&&!c;e.default={isTouchDevice:`ontouchstart`in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,appleWebkit:l,blink:c,chrome:s,edge:o,firefox:r,ie:a,mac:matchUserAgent(`Macintosh`),opera:n,safari:i,webkit:matchUserAgent(`AppleWebKit`)}})),Q=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var BaseLoader=class extends elementorModules.ViewModule{getDefaultSettings(){return{isInserted:!1,selectors:{firstScript:`script:first`}}}getDefaultElements(){return{$firstScript:jQuery(this.getSettings(`selectors.firstScript`))}}insertAPI(){this.elements.$firstScript.before(jQuery(`<script>`,{src:this.getApiURL()})),this.setSettings(`isInserted`,!0)}getVideoIDFromURL(e){let t=e.match(this.getURLRegex());return t&&t[1]}onApiReady(e){this.getSettings(`isInserted`)||this.insertAPI(),this.isApiLoaded()?e(this.getApiObject()):setTimeout(()=>{this.onApiReady(e)},350)}getAutoplayURL(e){return e.replace(`&autoplay=0`,``)+`&autoplay=1`}};e.default=BaseLoader})),Ye=__commonJSMin((t=>{var n=e();Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(Q()),YoutubeLoader=class extends r.default{getApiURL(){return`https://www.youtube.com/iframe_api`}getURLRegex(){return/^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?vi?=|(?:embed|v|vi|user|shorts)\/))([^?&"'>]+)/}isApiLoaded(){return window.YT&&YT.loaded}getApiObject(){return YT}};t.default=YoutubeLoader})),Xe=__commonJSMin((t=>{var n=e();Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(Q()),VimeoLoader=class extends r.default{getApiURL(){return`https://player.vimeo.com/api/player.js`}getURLRegex(){return/^(?:https?:\/\/)?(?:www|player\.)?(?:vimeo\.com\/)?(?:video\/|external\/)?(\d+)([^.?&#"'>]?)/}isApiLoaded(){return window.Vimeo}getApiObject(){return Vimeo}getAutoplayURL(e){let t=e.match(/#t=[^&]*/);return e.replace(t[0],``)+t}};t.default=VimeoLoader}));function asyncGeneratorStep(e,t,n,r,i,a,o){try{var s=e[a](o),c=s.value}catch(e){n(e);return}s.done?t(c):Promise.resolve(c).then(r,i)}function _asyncToGenerator(e){return function(){var t=this,n=arguments;return new Promise(function(r,i){var a=e.apply(t,n);function _next(e){asyncGeneratorStep(a,r,i,_next,_throw,`next`,e)}function _throw(e){asyncGeneratorStep(a,r,i,_next,_throw,`throw`,e)}_next(void 0)})}}var Ze=__esmMin((()=>{})),Qe=__commonJSMin(((e,t)=>{var n=c(),r=w();t.exports=function(e,t,i){try{return n(r(Object.getOwnPropertyDescriptor(e,t)[i]))}catch(e){}}})),$e=__commonJSMin(((e,t)=>{var n=h();t.exports=function(e){return n(e)||e===null}})),et=__commonJSMin(((e,t)=>{var n=$e(),r=String,i=TypeError;t.exports=function(e){if(n(e))return e;throw new i(`Can't set `+r(e)+` as a prototype`)}})),tt=__commonJSMin(((e,t)=>{var n=Qe(),r=h(),i=f(),a=et();t.exports=Object.setPrototypeOf||(`__proto__`in{}?function(){var e=!1,t={},o;try{o=n(Object.prototype,`__proto__`,`set`),o(t,[]),e=t instanceof Array}catch(e){}return function setPrototypeOf(t,n){return i(t),a(n),r(t)&&(e?o(t,n):t.__proto__=n),t}}():void 0)})),nt=__commonJSMin(((e,t)=>{var n=m(),r=h(),i=tt();t.exports=function(e,t,a){var o,s;return i&&n(o=t.constructor)&&o!==a&&r(s=o.prototype)&&s!==a.prototype&&i(e,s),e}})),rt=__commonJSMin(((e,t)=>{var n=Le(),r=String;t.exports=function(e){if(n(e)===`Symbol`)throw TypeError(`Cannot convert a Symbol value to a string`);return r(e)}})),it=__commonJSMin(((e,t)=>{var n=rt();t.exports=function(e,t){return e===void 0?arguments.length<2?``:t:n(e)}})),at=__commonJSMin(((e,t)=>{t.exports={IndexSizeError:{s:`INDEX_SIZE_ERR`,c:1,m:1},DOMStringSizeError:{s:`DOMSTRING_SIZE_ERR`,c:2,m:0},HierarchyRequestError:{s:`HIERARCHY_REQUEST_ERR`,c:3,m:1},WrongDocumentError:{s:`WRONG_DOCUMENT_ERR`,c:4,m:1},InvalidCharacterError:{s:`INVALID_CHARACTER_ERR`,c:5,m:1},NoDataAllowedError:{s:`NO_DATA_ALLOWED_ERR`,c:6,m:0},NoModificationAllowedError:{s:`NO_MODIFICATION_ALLOWED_ERR`,c:7,m:1},NotFoundError:{s:`NOT_FOUND_ERR`,c:8,m:1},NotSupportedError:{s:`NOT_SUPPORTED_ERR`,c:9,m:1},InUseAttributeError:{s:`INUSE_ATTRIBUTE_ERR`,c:10,m:1},InvalidStateError:{s:`INVALID_STATE_ERR`,c:11,m:1},SyntaxError:{s:`SYNTAX_ERR`,c:12,m:1},InvalidModificationError:{s:`INVALID_MODIFICATION_ERR`,c:13,m:1},NamespaceError:{s:`NAMESPACE_ERR`,c:14,m:1},InvalidAccessError:{s:`INVALID_ACCESS_ERR`,c:15,m:1},ValidationError:{s:`VALIDATION_ERR`,c:16,m:0},TypeMismatchError:{s:`TYPE_MISMATCH_ERR`,c:17,m:1},SecurityError:{s:`SECURITY_ERR`,c:18,m:1},NetworkError:{s:`NETWORK_ERR`,c:19,m:1},AbortError:{s:`ABORT_ERR`,c:20,m:1},URLMismatchError:{s:`URL_MISMATCH_ERR`,c:21,m:1},QuotaExceededError:{s:`QUOTA_EXCEEDED_ERR`,c:22,m:1},TimeoutError:{s:`TIMEOUT_ERR`,c:23,m:1},InvalidNodeTypeError:{s:`INVALID_NODE_TYPE_ERR`,c:24,m:1},DataCloneError:{s:`DATA_CLONE_ERR`,c:25,m:1}}})),ot=__commonJSMin(((e,t)=>{var n=c(),r=Error,i=n(``.replace),a=(function(e){return String(new r(e).stack)})(`zxcasd`),o=/\n\s*at [^:]*:[^\n]*/,s=o.test(a);t.exports=function(e,t){if(s&&typeof e==`string`&&!r.prepareStackTrace)for(;t--;)e=i(e,o,``);return e}})),st=__commonJSMin((()=>{var e=W(),n=t(),i=g(),a=s(),o=L().f,c=M(),l=Se(),u=nt(),d=it(),f=at(),p=ot(),m=r(),h=D(),_=`DOMException`,v=i(`Error`),y=i(_),b=function DOMException(){l(this,x);var e=arguments.length,t=d(e<1?void 0:arguments[0]),n=new y(t,d(e<2?void 0:arguments[1],`Error`)),r=new v(t);return r.name=_,o(n,`stack`,a(1,p(r.stack,1))),u(n,this,b),n},x=b.prototype=y.prototype,S=`stack`in new v(_),C=`stack`in new y(1,2),w=y&&m&&Object.getOwnPropertyDescriptor(n,_),T=!!w&&!(w.writable&&w.configurable),E=S&&!T&&!C;e({global:!0,constructor:!0,forced:h||E},{DOMException:E?b:y});var O=i(_),k=O.prototype;if(k.constructor!==O){for(var A in h||o(k,`constructor`,a(1,O)),f)if(c(f,A)){var j=f[A],N=j.s;c(O,N)||o(O,N,a(6,j.c))}}})),ct=__commonJSMin((e=>{Ze(),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,st();var _default=class extends elementorModules.ViewModule{getDefaultSettings(){return{selectors:{links:`a[href^="%23elementor-action"], a[href^="#elementor-action"]`}}}bindEvents(){elementorFrontend.elements.$document.on(`click`,this.getSettings(`selectors.links`),this.runLinkAction.bind(this))}initActions(){this.actions={lightbox:function(){var e=_asyncToGenerator(function*(e){let t=yield elementorFrontend.utils.lightbox;e.slideshow?t.openSlideshow(e.slideshow,e.url):(e.id&&(e.type=`image`),t.showModal(e))});return function lightbox(t){return e.apply(this,arguments)}}()}}addAction(e,t){this.actions[e]=t}runAction(e,...t){e=decodeURI(e),e=decodeURIComponent(e);let n=e.match(/action=(.+?)&/);if(!n)return;let r=this.actions[n[1]];if(!r)return;let i={},a=e.match(/settings=(.+)/);a&&(i=JSON.parse(atob(a[1]))),i.previousEvent=event,r(i,...t)}runLinkAction(e){e.preventDefault(),this.runAction(jQuery(e.currentTarget).attr(`href`),e)}runHashAction(){if(!location.hash)return;let e=document.querySelector(`[data-e-action-hash="${location.hash}"], a[href*="${location.hash}"]`);e&&this.runAction(e.getAttribute(`data-e-action-hash`))}createActionHash(e,t){return encodeURIComponent(`#elementor-action:action=${e}&settings=${btoa(JSON.stringify(t))}`)}onInit(){super.onInit(),this.initActions(),elementorFrontend.on(`components:init`,this.runHashAction.bind(this))}};e.default=_default})),lt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,G(),Z();var SwiperHandler=class{constructor(e,t){var n,r;return this.config=t,this.config.breakpoints&&(this.config=this.adjustConfig(t)),e instanceof jQuery&&(e=e[0]),(n=e.closest(`.elementor-widget-wrap`))==null||n.classList.add(`e-swiper-container`),(r=e.closest(`.elementor-widget`))==null||r.classList.add(`e-widget-swiper`),new Promise(t=>{if(typeof Swiper>`u`){elementorFrontend.utils.assetsLoader.load(`script`,`swiper`).then(()=>t(this.createSwiperInstance(e,this.config)));return}typeof Swiper==`function`&&window.Swiper===void 0&&(window.Swiper=Swiper),t(this.createSwiperInstance(e,this.config))})}createSwiperInstance(e,t){let n=window.Swiper;return n.prototype.adjustConfig=this.adjustConfig,t=this.applyMotionPreferences(t),new n(e,t)}adjustConfig(e){if(!e.handleElementorBreakpoints)return e;let t=elementorFrontend.config.responsive.activeBreakpoints,n=elementorFrontend.breakpoints.getBreakpointValues();return Object.keys(e.breakpoints).forEach(r=>{let i=parseInt(r),a;if(i===t.mobile.value||i+1===t.mobile.value)a=0;else if(t.widescreen&&(i===t.widescreen.value||i+1===t.widescreen.value))a=i;else{let e=n.findIndex(e=>i===e||i+1===e);a=n[e-1]}e.breakpoints[a]=e.breakpoints[r],e.breakpoints[r]={slidesPerView:e.slidesPerView,slidesPerGroup:e.slidesPerGroup?e.slidesPerGroup:1}}),e}applyMotionPreferences(e){return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches?Object.assign({},e,{speed:0,autoplay:!1}):e}};e.default=SwiperHandler})),ut=__commonJSMin((e=>{Ze(),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,G(),X(),e.default=class LightboxManager extends elementorModules.ViewModule{static getLightbox(){let e=new Promise(e=>{__elementorLoadChunk(`lightbox-lightbox`).then(({default:t})=>e(new t))}),t=elementorFrontend.utils.assetsLoader.load(`script`,`dialog`),n=elementorFrontend.utils.assetsLoader.load(`style`,`dialog`),r=elementorFrontend.utils.assetsLoader.load(`script`,`share-link`),i=elementorFrontend.utils.assetsLoader.load(`style`,`swiper`),a=elementorFrontend.utils.assetsLoader.load(`style`,`e-lightbox`);return Promise.all([e,t,n,r,i,a]).then(()=>e)}getDefaultSettings(){return{selectors:{links:`a, [data-elementor-lightbox]`,slideshow:`[data-elementor-lightbox-slideshow]`}}}getDefaultElements(){return{$links:jQuery(this.getSettings(`selectors.links`)),$slideshow:jQuery(this.getSettings(`selectors.slideshow`))}}isLightboxLink(e){if(e.tagName.toLowerCase()===`a`&&(e.hasAttribute(`download`)||!/^[^?]+\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(e.href))&&!e.dataset.elementorLightboxVideo)return!1;let t=elementorFrontend.getKitSettings(`global_image_lightbox`),n=e.dataset.elementorOpenLightbox;return n===`yes`||t&&n!==`no`}isLightboxSlideshow(){return this.elements.$slideshow.length!==0}onLinkClick(e){var t=this;return _asyncToGenerator(function*(){let n=e.currentTarget,r=jQuery(e.target),i=elementorFrontend.isEditMode(),a=i&&elementor.$previewContents.find(`body`).hasClass(`elementor-editor__ui-state__color-picker`),o=!!r.closest(`.elementor-edit-area`).length;if(!t.isLightboxLink(n)){i&&o&&e.preventDefault();return}e.preventDefault(),!(i&&!elementor.getPreferences(`lightbox_in_editor`))&&(a||(yield LightboxManager.getLightbox()).createLightbox(n))})()}bindEvents(){elementorFrontend.elements.$document.on(`click`,this.getSettings(`selectors.links`),e=>this.onLinkClick(e))}onInit(...e){super.onInit(...e),!elementorFrontend.isEditMode()&&this.maybeActivateLightboxOnLink()}maybeActivateLightboxOnLink(){this.elements.$links.each((e,t)=>{if(this.isLightboxLink(t))return LightboxManager.getLightbox(),!1})}}})),dt=__commonJSMin((e=>{var t;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=class AssetsLoader{getScriptElement(e){let t=document.createElement(`script`);return t.src=e,t}getStyleElement(e){let t=document.createElement(`link`);return t.rel=`stylesheet`,t.href=e,t}load(e,t){let n=AssetsLoader.assets[e][t];return n.loader||(n.loader=this.isAssetLoaded(n,e)?Promise.resolve(!0):this.loadAsset(n,e)),n.loader}isAssetLoaded(e,t){var n;let r=t===`script`?`script[src="${e.src}"]`:`link[href="${e.src}"]`;return!!((n=document.querySelectorAll(r))!=null&&n.length)}loadAsset(e,t){return new Promise(n=>{let r=t===`style`?this.getStyleElement(e.src):this.getScriptElement(e.src);r.onload=()=>n(!0),this.appendAsset(e,r)})}appendAsset(e,t){let n=document.querySelector(e.before);if(n){n.insertAdjacentElement(`beforebegin`,t);return}let r=e.parent===`head`?e.parent:`body`;document[r].appendChild(t)}};e.default=n;var r=elementorFrontendConfig.urls.assets,i=elementorFrontendConfig.environmentMode.isScriptDebug?``:`.min`,a=elementorFrontendConfig.version;n.assets={script:{dialog:{src:`${r}lib/dialog/dialog${i}.js?ver=4.9.3`},"share-link":{src:`${r}lib/share-link/share-link${i}.js?ver=${a}`},swiper:{src:`${r}lib/swiper/v8/swiper${i}.js?ver=8.4.5`}},style:{swiper:{src:`${r}lib/swiper/v8/css/swiper${i}.css?ver=8.4.5`,parent:`head`},"e-lightbox":{src:(t=elementorFrontendConfig)!=null&&(t=t.responsive)!=null&&t.hasCustomBreakpoints?`${elementorFrontendConfig.urls.uploadUrl}/elementor/css/custom-lightbox.min.css?ver=${a}`:`${r}css/conditionals/lightbox${i}.css?ver=${a}`},dialog:{src:`${r}css/conditionals/dialog${i}.css?ver=${a}`,parent:`head`,before:`#elementor-frontend-css`}}}}));function _typeof(e){"@babel/helpers - typeof";return _typeof=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},_typeof(e)}var ft=__esmMin((()=>{}));function toPrimitive(e,t){if(_typeof(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(_typeof(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var pt=__esmMin((()=>{ft()}));function toPropertyKey(e){var t=toPrimitive(e,`string`);return _typeof(t)==`symbol`?t:t+``}var mt=__esmMin((()=>{ft(),pt()}));function _defineProperty(e,t,n){return(t=toPropertyKey(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ht=__esmMin((()=>{mt()}));function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ownKeys(Object(n),!0).forEach(function(t){_defineProperty(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var gt=__esmMin((()=>{ht()})),_t=__commonJSMin(((e,t)=>{var n=l();t.exports=Array.isArray||function isArray(e){return n(e)===`Array`}})),vt=__commonJSMin(((e,t)=>{var n=r(),i=_t(),a=TypeError,o=Object.getOwnPropertyDescriptor;t.exports=n&&!function(){if(this!==void 0)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}()?function(e,t){if(i(e)&&!o(e,`length`).writable)throw new a(`Cannot set read only .length`);return e.length=t}:function(e,t){return e.length=t}})),yt=__commonJSMin(((e,t)=>{var n=TypeError,r=9007199254740991;t.exports=function(e){if(e>r)throw n(`Maximum allowed index exceeded`);return e}})),$=__commonJSMin((()=>{var e=W(),t=j(),r=H(),i=vt(),a=yt(),o=n()(function(){return[].push.call({length:4294967296},1)!==4294967297}),properErrorOnNonWritableLength=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}};e({target:`Array`,proto:!0,arity:1,forced:o||!properErrorOnNonWritableLength()},{push:function push(e){var n=t(this),o=r(n),s=arguments.length;a(o+s);for(var c=0;c<s;c++)n[o]=arguments[c],o++;return i(n,o),o}})})),bt=__commonJSMin(((e,t)=>{var n=V();t.exports=function(e,t,r){for(var i in t)n(e,i,t[i],r);return e}})),xt=__commonJSMin(((e,t)=>{t.exports=function(e,t){return{value:e,done:t}}})),St=__commonJSMin(((e,t)=>{var n=q();t.exports=function(e,t,r){for(var i=e.length-1;i>=0;i--)if(e[i]!==void 0)try{r=n(e[i].iterator,t,r)}catch(e){t=`throw`,r=e}if(t===`throw`)throw r;return r}})),Ct=__commonJSMin(((e,t)=>{var n=a(),r=Ae(),i=R(),o=bt(),s=P(),c=le(),l=T(),u=je().IteratorPrototype,d=xt(),f=q(),p=St(),m=s(`toStringTag`),h=`IteratorHelper`,g=`WrapForValidIterator`,_=`normal`,v=`throw`,y=c.set,createIteratorProxyPrototype=function(e){var t=c.getterFor(e?g:h);return o(r(u),{next:function next(){var n=t(this);if(e)return n.nextHandler();if(n.done)return d(void 0,!0);try{var r=n.nextHandler();return n.returnHandlerResult?r:d(r,n.done)}catch(e){throw n.done=!0,e}},return:function(){var r=t(this),i=r.iterator;if(r.done=!0,e){var a=l(i,`return`);return a?n(a,i):d(void 0,!0)}if(r.inner)try{f(r.inner.iterator,_)}catch(e){return f(i,v,e)}if(r.openIters)try{p(r.openIters,_)}catch(e){return f(i,v,e)}return i&&f(i,_),d(void 0,!0)}})},b=createIteratorProxyPrototype(!0),x=createIteratorProxyPrototype(!1);i(x,m,`Iterator Helper`),t.exports=function(e,t,n){var r=function Iterator(r,i){i?(i.iterator=r.iterator,i.next=r.next):i=r,i.type=t?g:h,i.returnHandlerResult=!!n,i.nextHandler=e,i.counter=0,i.done=!1,y(this,i)};return r.prototype=t?b:x,r}})),wt=__commonJSMin(((e,t)=>{var n=I(),r=q();t.exports=function(e,t,i,a){try{return a?t(n(i)[0],i[1]):t(i)}catch(t){r(e,`throw`,t)}}})),Tt=__commonJSMin(((e,t)=>{t.exports=function(e,t){var n=typeof Iterator==`function`&&Iterator.prototype[e];if(n)try{n.call({next:null},t).next()}catch(e){return!0}}})),Et=__commonJSMin((()=>{var e=W(),t=a(),n=w(),r=I(),i=J(),o=Ct(),s=wt(),c=q(),l=Tt(),u=Y(),d=D(),f=!d&&!l(`map`,function(){}),p=!d&&!f&&u(`map`,TypeError),m=d||f||p,h=o(function(){var e=this.iterator,n=r(t(this.next,e));if(!(this.done=!!n.done))return s(e,this.mapper,[n.value,this.counter++],!0)});e({target:`Iterator`,proto:!0,real:!0,forced:m},{map:function map(e){r(this);try{n(e)}catch(e){c(this,`throw`,e)}return p?t(p,this,e):new h(i(this),{mapper:e})}})})),Dt=__commonJSMin((()=>{Et()})),Ot=__commonJSMin((e=>{gt(),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,$(),G(),Z(),Dt();var Breakpoints=class extends elementorModules.Module{constructor(e){super(),this.responsiveConfig=e}getActiveBreakpointsList(e={}){e=_objectSpread2(_objectSpread2({},{largeToSmall:!1,withDesktop:!1}),e);let t=Object.keys(this.responsiveConfig.activeBreakpoints);if(e.withDesktop){let e=t.indexOf(`widescreen`)===-1?t.length:t.length-1;t.splice(e,0,`desktop`)}return e.largeToSmall&&t.reverse(),t}getBreakpointValues(){let{activeBreakpoints:e}=this.responsiveConfig,t=[];return Object.values(e).forEach(e=>{t.push(e.value)}),t}getDesktopPreviousDeviceKey(){let e=``,{activeBreakpoints:t}=this.responsiveConfig,n=Object.keys(t),r=n.length;return e=t[n[r-1]].direction===`min`?n[r-2]:n[r-1],e}getDesktopMinPoint(){let{activeBreakpoints:e}=this.responsiveConfig;return e[this.getDesktopPreviousDeviceKey()].value+1}getDeviceMinBreakpoint(e){if(e===`desktop`)return this.getDesktopMinPoint();let{activeBreakpoints:t}=this.responsiveConfig,n=Object.keys(t),r;return r=n[0]===e?320:e===`widescreen`?t[e]?t[e].value:this.responsiveConfig.breakpoints.widescreen:t[n[n.indexOf(e)-1]].value+1,r}getActiveMatchRegex(){return RegExp(this.getActiveBreakpointsList().map(e=>`_`+e).join(`|`)+`$`)}};e.default=Breakpoints})),kt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.Events=void 0;var Events=class{static dispatch(e,t,n=null,r=null){e=e instanceof jQuery?e[0]:e,r&&e.dispatchEvent(new CustomEvent(r,{detail:n})),e.dispatchEvent(new CustomEvent(t,{detail:n}))}};e.Events=Events,e.default=Events})),At=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var _default=class extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler(`text-path`,()=>__elementorLoadChunk(`text-path`))}};e.default=_default})),jt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var Controls=class{getControlValue(e,t,n){let r;return r=typeof e[t]==`object`&&n?e[t][n]:e[t],r}getResponsiveControlValue(e,t,n=``,r=null){let i=r||elementorFrontend.getCurrentDeviceMode(),a=this.getControlValue(e,t,n);if(i===`widescreen`){let r=this.getControlValue(e,`${t}_widescreen`,n);return r||r===0?r:a}let o=elementorFrontend.breakpoints.getActiveBreakpointsList({withDesktop:!0}),s=i,c=o.indexOf(i),l=``;for(;c<=o.length;){if(s===`desktop`){l=a;break}let r=`${t}_${s}`,i=this.getControlValue(e,r,n);if(i||i===0){l=i;break}c++,s=o[c]}return l}};e.default=Controls})),Mt=__commonJSMin((()=>{var e=W(),t=a(),n=w(),r=I(),i=J(),o=Ct(),s=wt(),c=D(),l=q(),u=Tt(),d=Y(),f=!c&&!u(`filter`,function(){}),p=!c&&!f&&d(`filter`,TypeError),m=c||f||p,h=o(function(){for(var e=this.iterator,n=this.predicate,i=this.next,a,o,c;;){if(a=r(t(i,e)),o=this.done=!!a.done,o)return;if(c=a.value,s(e,n,[c,this.counter++],!0))return c}});e({target:`Iterator`,proto:!0,real:!0,forced:m},{filter:function filter(e){r(this);try{n(e)}catch(e){l(this,`throw`,e)}return p?t(p,this,e):new h(i(this),{predicate:e})}})})),Nt=__commonJSMin((()=>{Mt()})),Pt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,$(),G(),Nt(),Z();var _default=class extends elementorModules.ViewModule{getDefaultSettings(){return{selectors:{links:`.elementor-element a[href*="#"]`,stickyElements:`.elementor-element.elementor-sticky`}}}onInit(){this.observeStickyElements(()=>{this.initializeStickyAndAnchorTracking()})}observeStickyElements(e){new MutationObserver(t=>{for(let n of t)(n.type===`childList`||n.type===`attributes`&&n.target.classList.contains(`elementor-sticky`))&&e()}).observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`class`,`style`]})}initializeStickyAndAnchorTracking(){let e=this.getAllAnchorLinks(),t=this.getAllStickyElements(),n=[];!t.length>0&&!e.length>0||(this.trackStickyElements(t,n),this.trackAnchorLinks(e,n),this.organizeStickyAndAnchors(n))}trackAnchorLinks(e,t){e.forEach(e=>{let n=this.getAnchorTarget(e),r=this.getScrollPosition(n);t.push({element:n,type:`anchor`,scrollPosition:r})})}trackStickyElements(e,t){e.forEach(e=>{let n=this.getElementSettings(e);if(!n||!n.sticky_anchor_link_offset)return;let{sticky_anchor_link_offset:r}=n;if(r===0)return;let i=this.getScrollPosition(e);t.push({scrollMarginTop:r,type:`sticky`,scrollPosition:i})})}organizeStickyAndAnchors(e){let t=this.filterAndSortElementsByType(e,`sticky`),n=this.filterAndSortElementsByType(e,`anchor`);t.forEach((e,r)=>{this.defineCurrentStickyRange(e,r,t,n)})}defineCurrentStickyRange(e,t,n,r){let i=t+1<n.length?n[t+1].scrollPosition:1/0;e.anchor=r.filter(t=>{let n=t.scrollPosition>e.scrollPosition&&t.scrollPosition<i;return n&&(t.element.style.scrollMarginTop=`${e.scrollMarginTop}px`),n})}getScrollPosition(e){let t=0;for(;e;)t+=e.offsetTop,e=e.offsetParent;return t}getAllStickyElements(){let e=document.querySelectorAll(this.getSettings(`selectors.stickyElements`));return Array.from(e).filter((e,t,n)=>t===n.findIndex(t=>t.getAttribute(`data-id`)===e.getAttribute(`data-id`)))}getAllAnchorLinks(){let e=document.querySelectorAll(this.getSettings(`selectors.links`));return Array.from(e).filter((e,t,n)=>t===n.findIndex(t=>t.getAttribute(`href`)===e.getAttribute(`href`)))}filterAndSortElementsByType(e,t){return e.filter(e=>t===e.type).sort((e,t)=>e.scrollPosition-t.scrollPosition)}isValidSelector(e){return/^#[A-Za-z_][\w-]*$/.test(e)}getAnchorTarget(e){let t=e==null?void 0:e.hash;return this.isValidSelector(t)?document.querySelector(t):null}getElementSettings(e){return JSON.parse(e.getAttribute(`data-settings`))}};e.default=_default})),Ft=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.isScrollSnapActive=e.escapeHTML=void 0;var escapeHTML=e=>{let t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&#39;`,'"':`&quot;`};return e.replace(/[&<>'"]/g,e=>t[e]||e)};e.escapeHTML=escapeHTML;var isScrollSnapActive=()=>{var e,t;return(elementorFrontend.isEditMode()?(e=elementor.settings.page.model.attributes)==null?void 0:e.scroll_snap:(t=elementorFrontend.config.settings.page)==null?void 0:t.scroll_snap)===`yes`};e.isScrollSnapActive=isScrollSnapActive})),It=__commonJSMin(((e,t)=>{$();var EventManager=function(){var e=Array.prototype.slice,t,n={actions:{},filters:{}};function _removeHook(e,t,r,i){var a,o,s;if(n[e][t])if(!r)n[e][t]=[];else if(a=n[e][t],i)for(s=a.length;s--;)o=a[s],o.callback===r&&o.context===i&&a.splice(s,1);else for(s=a.length;s--;)a[s].callback===r&&a.splice(s,1)}function _hookInsertSort(e){for(var t,n,r,i=1,a=e.length;i<a;i++){for(t=e[i],n=i;(r=e[n-1])&&r.priority>t.priority;)e[n]=e[n-1],--n;e[n]=t}return e}function _addHook(e,t,r,i,a){var o={callback:r,priority:i,context:a},s=n[e][t];if(s){var c=!1;if(jQuery.each(s,function(){if(this.callback===r)return c=!0,!1}),c)return;s.push(o),s=_hookInsertSort(s)}else s=[o];n[e][t]=s}function _runHook(e,t,r){var i=n[e][t],a,o;if(!i)return e===`filters`&&r[0];if(o=i.length,e===`filters`)for(a=0;a<o;a++)r[0]=i[a].callback.apply(i[a].context,r);else for(a=0;a<o;a++)i[a].callback.apply(i[a].context,r);return e!==`filters`||r[0]}function addAction(e,n,r,i){return typeof e==`string`&&typeof n==`function`&&(r=parseInt(r||10,10),_addHook(`actions`,e,n,r,i)),t}function doAction(){var n=e.call(arguments),r=n.shift();return typeof r==`string`&&_runHook(`actions`,r,n),t}function removeAction(e,n){return typeof e==`string`&&_removeHook(`actions`,e,n),t}function addFilter(e,n,r,i){return typeof e==`string`&&typeof n==`function`&&(r=parseInt(r||10,10),_addHook(`filters`,e,n,r,i)),t}function applyFilters(){var n=e.call(arguments),r=n.shift();return typeof r==`string`?_runHook(`filters`,r,n):t}function removeFilter(e,n){return typeof e==`string`&&_removeHook(`filters`,e,n),t}return t={removeFilter,applyFilters,addFilter,removeAction,doAction,addAction},t};t.exports=EventManager})),Lt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var GlobalHandler=class extends elementorModules.frontend.handlers.Base{getWidgetType(){return`global`}animate(){let e=this.$element,t=this.getAnimation();if(t===`none`){e.removeClass(`elementor-invisible`);return}let n=this.getElementSettings(),r=n._animation_delay||n.animation_delay||0;e.removeClass(t),this.currentAnimation&&e.removeClass(this.currentAnimation),this.currentAnimation=t,setTimeout(()=>{e.removeClass(`elementor-invisible`).addClass(`animated `+t)},r)}getAnimation(){return this.getCurrentDeviceSetting(`animation`)||this.getCurrentDeviceSetting(`_animation`)}onInit(...e){if(super.onInit(...e),this.getAnimation()){let e=elementorModules.utils.Scroll.scrollObserver({callback:t=>{t.isInViewport&&(this.animate(),e.unobserve(this.$element[0]))}});e.observe(this.$element[0])}}onElementChange(e){/^_?animation/.test(e)&&this.animate()}},_default=e=>{elementorFrontend.elementsHandler.addHandler(GlobalHandler,{$element:e})};e.default=_default})),Rt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.createEditorHandler=createEditorHandler;function createEditorHandler(e){return()=>new Promise(t=>{elementorFrontend.isEditMode()&&e().then(t)})}})),zt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=Rt();e.default=[()=>__elementorLoadChunk(`background-slideshow`),()=>__elementorLoadChunk(`background-video`),(0,t.createEditorHandler)(()=>__elementorLoadChunk(`handles-position`)),(0,t.createEditorHandler)(()=>__elementorLoadChunk(`container-shapes`)),(0,t.createEditorHandler)(()=>__elementorLoadChunk(`container-grid-container`))]})),Bt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=Rt();e.default=[()=>__elementorLoadChunk(`section-stretched-section`),()=>__elementorLoadChunk(`background-slideshow`),()=>__elementorLoadChunk(`background-video`),(0,t.createEditorHandler)(()=>__elementorLoadChunk(`handles-position`)),(0,t.createEditorHandler)(()=>__elementorLoadChunk(`section-shapes`))]})),Vt=__commonJSMin((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,e.default=[()=>__elementorLoadChunk(`background-slideshow`)]})),Ht=__commonJSMin(((t,n)=>{var r=e();G(),Z();var i=r(Lt()),a=r(zt()),o=r(Bt()),s=r(Vt());n.exports=function(e){let t={};this.elementsHandlers={"accordion.default":()=>__elementorLoadChunk(`accordion`),"alert.default":()=>__elementorLoadChunk(`alert`),"counter.default":()=>__elementorLoadChunk(`counter`),"progress.default":()=>__elementorLoadChunk(`progress`),"tabs.default":()=>__elementorLoadChunk(`tabs`),"toggle.default":()=>__elementorLoadChunk(`toggle`),"video.default":()=>__elementorLoadChunk(`video`),"image-carousel.default":()=>__elementorLoadChunk(`image-carousel`),"text-editor.default":()=>__elementorLoadChunk(`text-editor`),"wp-widget-media_audio.default":()=>__elementorLoadChunk(`wp-audio`),container:a.default,section:o.default,column:s.default},elementorFrontendConfig.experimentalFeatures.container&&(this.elementsHandlers[`nested-tabs.default`]=()=>__elementorLoadChunk(`nested-tabs`),this.elementsHandlers[`nested-accordion.default`]=()=>__elementorLoadChunk(`nested-accordion`)),elementorFrontendConfig.experimentalFeatures.container&&(this.elementsHandlers[`contact-buttons.default`]=()=>__elementorLoadChunk(`contact-buttons`),this.elementsHandlers[`floating-bars-var-1.default`]=()=>__elementorLoadChunk(`floating-bars`));let addGlobalHandlers=()=>elementorFrontend.hooks.addAction(`frontend/element_ready/global`,i.default),addElementsHandlers=()=>{e.each(this.elementsHandlers,(e,t)=>{let n=e.split(`.`);e=n[0];let r=n[1]||null;this.attachHandler(e,t,r)})},isClassHandler=e=>{var t;return(t=e.prototype)==null?void 0:t.getUniqueHandlerID},addHandlerWithHook=(e,t,n=`default`)=>{n=n?`.`+n:``;let r=e+n;elementorFrontend.hooks.addAction(`frontend/element_ready/${r}`,e=>{if(isClassHandler(t))this.addHandler(t,{$element:e,elementName:r},!0);else{let n=t();if(!n)return;n instanceof Promise?n.then(({default:t})=>{this.addHandler(t,{$element:e,elementName:r},!0)}):this.addHandler(n,{$element:e,elementName:r},!0)}})};this.addHandler=function(n,r){let i=r.$element.data(`model-cid`),a;if(i){a=n.prototype.getConstructorID(),t[i]||(t[i]={});let e=t[i][a];e&&e.onDestroy()}let o=new n(r);elementorFrontend.hooks.doAction(`frontend/element_handler_ready/${r.elementName}`,r.$element,e),i&&(t[i][a]=o)},this.attachHandler=(e,t,n)=>{Array.isArray(t)||(t=[t]),t.forEach(t=>addHandlerWithHook(e,t,n))},this.getHandler=function(e){let t=this.elementsHandlers[e];return isClassHandler(t)?t:new Promise(e=>{t().then(({default:t})=>{e(t)})})},this.getHandlers=function(e){return elementorDevTools.deprecation.deprecated(`getHandlers`,`3.1.0`,`elementorFrontend.elementsHandler.getHandler`),e?this.getHandler(e):this.elementsHandlers},this.runReadyTrigger=function(t){let n=!!t.closest(`[data-delay-child-handlers="true"]`)&&t.closest(`[data-delay-child-handlers="true"]`).length!==0;if(elementorFrontend.config.is_static||n)return;let r=jQuery(t),i=r.attr(`data-element_type`);if(i&&(elementorFrontend.hooks.doAction(`frontend/element_ready/global`,r,e),elementorFrontend.hooks.doAction(`frontend/element_ready/${i}`,r,e),i===`widget`)){let t=r.attr(`data-widget_type`);elementorFrontend.hooks.doAction(`frontend/element_ready/${t}`,r,e)}},this.init=()=>{addGlobalHandlers(),addElementsHandlers()}}}));return __commonJSMin((t=>{var n=e();Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,G(),X(),Z(),Ue(),We();var r=n(Ke()),i=n(qe()),a=n(Je()),o=n(Ye()),s=n(Xe()),c=n(Q()),l=n(ct()),u=n(lt()),d=n(ut()),f=n(dt()),p=n(Ot()),m=n(kt()),h=n(At()),g=n(jt()),_=n(Pt()),v=Ft(),y=It(),b=Ht(),Frontend=class extends elementorModules.ViewModule{constructor(...e){super(...e),this.config=elementorFrontendConfig,this.config.legacyMode={get elementWrappers(){return elementorFrontend.isEditMode()&&window.top.elementorDevTools.deprecation.deprecated(`elementorFrontend.config.legacyMode.elementWrappers`,`3.1.0`),!1}},this.populateActiveBreakpointsConfig()}get Module(){return this.isEditMode()&&parent.elementorDevTools.deprecation.deprecated(`elementorFrontend.Module`,`2.5.0`,`elementorModules.frontend.handlers.Base`),elementorModules.frontend.handlers.Base}getDefaultSettings(){return{selectors:{elementor:`.elementor`,adminBar:`#wpadminbar`}}}getDefaultElements(){let e={window,$window:jQuery(window),$document:jQuery(document),$head:jQuery(document.head),$body:jQuery(document.body),$deviceMode:jQuery(`<span>`,{id:`elementor-device-mode`,class:`elementor-screen-only`})};return e.$body.append(e.$deviceMode),e}bindEvents(){this.elements.$window.on(`resize`,()=>this.setDeviceModeData())}getElements(e){return this.getItems(this.elements,e)}getPageSettings(e){let t=this.isEditMode()?elementor.settings.page.model.attributes:this.config.settings.page;return this.getItems(t,e)}getGeneralSettings(e){return this.isEditMode()&&parent.elementorDevTools.deprecation.deprecated(`getGeneralSettings()`,`3.0.0`,"getKitSettings() and remove the `elementor_` prefix"),this.getKitSettings(`elementor_${e}`)}getKitSettings(e){return this.getItems(this.config.kit,e)}getCurrentDeviceMode(){return getComputedStyle(this.elements.$deviceMode[0],`:after`).content.replace(/"/g,``)}getDeviceSetting(e,t,n){if(e===`widescreen`)return this.getWidescreenSetting(t,n);let r=elementorFrontend.breakpoints.getActiveBreakpointsList({largeToSmall:!0,withDesktop:!0}),i=r.indexOf(e);for(;i>0;){let e=r[i],a=t[n+`_`+e];if(a||a===0)return a;i--}return t[n]}getWidescreenSetting(e,t){let n=t+`_widescreen`,r;return r=e[n]?e[n]:e[t],r}getCurrentDeviceSetting(e,t){return this.getDeviceSetting(elementorFrontend.getCurrentDeviceMode(),e,t)}isEditMode(){return this.config.environmentMode.edit}isWPPreviewMode(){return this.config.environmentMode.wpPreview}initDialogsManager(){let e;this.getDialogsManager=()=>(e||(e=new DialogsManager.Instance),e)}initOnReadyComponents(){this.utils={youtube:new o.default,vimeo:new s.default,baseVideoLoader:new c.default,get lightbox(){return d.default.getLightbox()},urlActions:new l.default,swiper:u.default,environment:a.default,assetsLoader:new f.default,escapeHTML:v.escapeHTML,events:m.default,controls:new g.default,anchor_scroll_margin:new _.default},this.modules={StretchElement:elementorModules.frontend.tools.StretchElement,Masonry:elementorModules.utils.Masonry},this.elementsHandler.init(),this.isEditMode()?elementor.once(`document:loaded`,()=>this.onDocumentLoaded()):this.onDocumentLoaded()}initOnReadyElements(){this.elements.$wpAdminBar=this.elements.$document.find(this.getSettings(`selectors.adminBar`))}addUserAgentClasses(){for(let[e,t]of Object.entries(a.default))t&&this.elements.$body.addClass(`e--ua-`+e)}setDeviceModeData(){this.elements.$body.attr(`data-elementor-device-mode`,this.getCurrentDeviceMode())}addListenerOnce(e,t,n,r){if(r||(r=this.elements.$window),!this.isEditMode()){r.on(t,n);return}if(this.removeListeners(e,t,r),r instanceof jQuery){let i=t+`.`+e;r.on(i,n)}else r.on(t,n,e)}removeListeners(e,t,n,r){if(r||(r=this.elements.$window),r instanceof jQuery){let i=t+`.`+e;r.off(i,n)}else r.off(t,n,e)}debounce(e,t){let n;return function(){let r=this,i=arguments,later=()=>{n=null,e.apply(r,i)},a=!n;clearTimeout(n),n=setTimeout(later,t),a&&e.apply(r,i)}}muteMigrationTraces(){jQuery.migrateMute=!0,jQuery.migrateTrace=!1}initModules(){let e={shapes:h.default};elementorFrontend.trigger(`elementor/modules/init:before`),elementorFrontend.trigger(`elementor/modules/init/before`),Object.entries(e).forEach(([e,t])=>{this.modulesHandlers[e]=new t})}populateActiveBreakpointsConfig(){this.config.responsive.activeBreakpoints={},Object.entries(this.config.responsive.breakpoints).forEach(([e,t])=>{t.is_enabled&&(this.config.responsive.activeBreakpoints[e]=t)})}init(){this.hooks=new y,this.breakpoints=new p.default(this.config.responsive),this.storage=new i.default,this.elementsHandler=new b(jQuery),this.modulesHandlers={},this.addUserAgentClasses(),this.setDeviceModeData(),this.initDialogsManager(),this.isEditMode()&&this.muteMigrationTraces(),m.default.dispatch(this.elements.$window,`elementor/frontend/init`),this.initModules(),this.initOnReadyElements(),this.initOnReadyComponents()}onDocumentLoaded(){this.documentsManager=new r.default,this.trigger(`components:init`),new d.default}};t.default=Frontend,window.elementorFrontend=new Frontend,elementorFrontend.isEditMode()||jQuery(()=>elementorFrontend.init())}))()})();;
/*! elementor-pro - v4.2.0 - 31-08-2026 */
(()=>{"use strict";var e,r,a,n={},c={};function __webpack_require__(e){var r=c[e];if(void 0!==r)return r.exports;var a=c[e]={exports:{}};return n[e](a,a.exports,__webpack_require__),a.exports}__webpack_require__.m=n,e=[],__webpack_require__.O=(r,a,n,c)=>{if(!a){var i=1/0;for(b=0;b<e.length;b++){for(var[a,n,c]=e[b],d=!0,t=0;t<a.length;t++)(!1&c||i>=c)&&Object.keys(__webpack_require__.O).every(e=>__webpack_require__.O[e](a[t]))?a.splice(t--,1):(d=!1,c<i&&(i=c));if(d){e.splice(b--,1);var _=n();void 0!==_&&(r=_)}}return r}c=c||0;for(var b=e.length;b>0&&e[b-1][2]>c;b--)e[b]=e[b-1];e[b]=[a,n,c]},__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce((r,a)=>(__webpack_require__.f[a](e,r),r),[])),__webpack_require__.u=e=>635===e?"code-highlight.38ec4828db8d33cccbe9.bundle.min.js":519===e?"video-playlist.d48e1a11007fe8c248f8.bundle.min.js":375===e?"paypal-button.5c63e4c8f36fb06aff31.bundle.min.js":786===e?"9495d665fd4392e5c905.bundle.min.js":857===e?"stripe-button.b7e32b5d713d60752c7e.bundle.min.js":581===e?"progress-tracker.7b160888e308c5f64701.bundle.min.js":961===e?"animated-headline.bc08854fb1e1a80434b2.bundle.min.js":692===e?"media-carousel.87c2cf115553a2c4f709.bundle.min.js":897===e?"carousel.e2af910b095554625156.bundle.min.js":416===e?"countdown.05b148ca20af32fc8e9f.bundle.min.js":292===e?"hotspot.737497535441dc0bc037.bundle.min.js":325===e?"form.cfd61a9174be80f835c6.bundle.min.js":543===e?"gallery.cca2358f59857ce6f62f.bundle.min.js":970===e?"lottie.5ea185196aba9f2de4f4.bundle.min.js":334===e?"nav-menu.dc8790fd04afa5b6c0a3.bundle.min.js":887===e?"popup.61d4fcab8891b2e07802.bundle.min.js":535===e?"load-more.7c4417f8a727b79f546f.bundle.min.js":396===e?"posts.844727d8428792223d2f.bundle.min.js":726===e?"portfolio.3d0e387cc28c07bae511.bundle.min.js":316===e?"share-buttons.b99b5ff11c944a3a8ea9.bundle.min.js":829===e?"slides.8e9b74f1b31471377df8.bundle.min.js":158===e?"social.de5cec83bf689b2f1f01.bundle.min.js":404===e?"table-of-contents.bff952bd91349056fe78.bundle.min.js":345===e?"archive-posts.0b71f7023819e3872142.bundle.min.js":798===e?"search-form.9abeafeecde90cf7e0f4.bundle.min.js":6===e?"woocommerce-menu-cart.33fbf47b819947e7a2a7.bundle.min.js":80===e?"woocommerce-purchase-summary.118e54b95a68f0ad8c09.bundle.min.js":354===e?"woocommerce-checkout-page.8391e03a51a57a42528a.bundle.min.js":4===e?"woocommerce-cart.9131ef5e40333f8066dd.bundle.min.js":662===e?"woocommerce-my-account.ab469f426496c628ac6c.bundle.min.js":621===e?"woocommerce-notices.181b8701c45ec5374829.bundle.min.js":787===e?"product-add-to-cart.a4f88a0c19e95b3912b6.bundle.min.js":993===e?"loop.1594a1df76e87a11eda2.bundle.min.js":932===e?"loop-carousel.881847b13e8fe1f8bfc2.bundle.min.js":550===e?"ajax-pagination.505018eb312c83998279.bundle.min.js":727===e?"mega-menu.857df1cf3198ae47b617.bundle.min.js":87===e?"mega-menu-stretch-content.7ed04741ba7d5a80c556.bundle.min.js":912===e?"menu-title-keyboard-handler.b3891112675eb0b0c4d5.bundle.min.js":33===e?"nested-carousel.659b0373371215e60dab.bundle.min.js":225===e?"taxonomy-filter.6526351a1205655def47.bundle.min.js":579===e?"off-canvas.82d118980fb5aa03c82b.bundle.min.js":1===e?"contact-buttons.e1605c5cfaccbff3c14b.bundle.min.js":61===e?"contact-buttons-var-10.11bf4233106e1245bd61.bundle.min.js":249===e?"floating-bars-var-2.5287acd8570f1ce2dde3.bundle.min.js":440===e?"floating-bars-var-3.e9e9c0ea3c6fb0e51c58.bundle.min.js":187===e?"search.3ec7310139d97dd4cece.bundle.min.js":void 0,__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r={},a="elementor-pro:",__webpack_require__.l=(e,n,c,i)=>{if(r[e])r[e].push(n);else{var d,t;if(void 0!==c)for(var _=document.getElementsByTagName("script"),b=0;b<_.length;b++){var o=_[b];if(o.getAttribute("src")==e||o.getAttribute("data-webpack")==a+c){d=o;break}}d||(t=!0,(d=document.createElement("script")).charset="utf-8",__webpack_require__.nc&&d.setAttribute("nonce",__webpack_require__.nc),d.setAttribute("data-webpack",a+c),d.src=e),r[e]=[n];var onScriptComplete=(a,n)=>{d.onerror=d.onload=null,clearTimeout(u);var c=r[e];if(delete r[e],d.parentNode&&d.parentNode.removeChild(d),c&&c.forEach(e=>e(n)),a)return a(n)},u=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=onScriptComplete.bind(null,d.onerror),d.onload=onScriptComplete.bind(null,d.onload),t&&document.head.appendChild(d)}},(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var r=__webpack_require__.g.document;if(!e&&r&&(r.currentScript&&"SCRIPT"===r.currentScript.tagName.toUpperCase()&&(e=r.currentScript.src),!e)){var a=r.getElementsByTagName("script");if(a.length)for(var n=a.length-1;n>-1&&(!e||!/^http(s?):/.test(e));)e=a[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/^blob:/,"").replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),(()=>{var e={978:0};__webpack_require__.f.j=(r,a)=>{var n=__webpack_require__.o(e,r)?e[r]:void 0;if(0!==n)if(n)a.push(n[2]);else if(978!=r){var c=new Promise((a,c)=>n=e[r]=[a,c]);a.push(n[2]=c);var i=__webpack_require__.p+__webpack_require__.u(r),d=new Error;__webpack_require__.l(i,a=>{if(__webpack_require__.o(e,r)&&(0!==(n=e[r])&&(e[r]=void 0),n)){var c=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.src;d.message="Loading chunk "+r+" failed.\n("+c+": "+i+")",d.name="ChunkLoadError",d.type=c,d.request=i,n[1](d)}},"chunk-"+r,r)}else e[r]=0},__webpack_require__.O.j=r=>0===e[r];var webpackJsonpCallback=(r,a)=>{var n,c,[i,d,t]=a,_=0;if(i.some(r=>0!==e[r])){for(n in d)__webpack_require__.o(d,n)&&(__webpack_require__.m[n]=d[n]);if(t)var b=t(__webpack_require__)}for(r&&r(a);_<i.length;_++)c=i[_],__webpack_require__.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return __webpack_require__.O(b)},r=self.webpackChunkelementor_pro=self.webpackChunkelementor_pro||[];r.forEach(webpackJsonpCallback.bind(null,0)),r.push=webpackJsonpCallback.bind(null,r.push.bind(r))})()})();;
wp.i18n.setLocaleData( { 'text direction\u0004ltr': [ 'ltr' ] } );
;
/*! elementor-pro - v4.2.0 - 31-08-2026 */
(self.webpackChunkelementor_pro=self.webpackChunkelementor_pro||[]).push([[313],{6550(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isScrollSnapActive=t.escapeHTML=void 0;t.escapeHTML=e=>{const t={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"};return e.replace(/[&<>'"]/g,e=>t[e]||e)};t.isScrollSnapActive=()=>"yes"===(elementorFrontend.isEditMode()?elementor.settings.page.model.attributes?.scroll_snap:elementorFrontend.config.settings.page?.scroll_snap)},3e3(e,t,n){"use strict";var s=n(6784);n(2258);var i=s(n(4906)),o=s(n(2450)),r=s(n(4409)),a=s(n(7937)),l=s(n(8098)),c=s(n(6275)),d=s(n(3268)),u=s(n(4992));class ElementorProFrontend extends elementorModules.ViewModule{onInit(){super.onInit(),this.config=ElementorProFrontendConfig,this.modules={},this.initOnReadyComponents()}bindEvents(){jQuery(window).on("elementor/frontend/init",this.onElementorFrontendInit.bind(this))}initModules(){let e={motionFX:i.default,sticky:o.default,codeHighlight:r.default,videoPlaylist:a.default,payments:l.default,progressTracker:c.default};elementorProFrontend.trigger("elementor-pro/modules/init/before"),e=elementorFrontend.hooks.applyFilters("elementor-pro/frontend/handlers",e),jQuery.each(e,(e,t)=>{this.modules[e]=new t}),this.modules.linkActions={addAction:(...e)=>{elementorFrontend.utils.urlActions.addAction(...e)}}}onElementorFrontendInit(){this.initModules()}initOnReadyComponents(){this.utils={controls:new d.default,DropdownMenuHeightController:u.default}}}window.elementorProFrontend=new ElementorProFrontend},3268(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class Controls{getControlValue(e,t,n){let s;return s="object"==typeof e[t]&&n?e[t][n]:e[t],s}getResponsiveControlValue(e,t,n=""){const s=elementorFrontend.getCurrentDeviceMode(),i=this.getControlValue(e,t,n);if("widescreen"===s){const s=this.getControlValue(e,`${t}_widescreen`,n);return s||0===s?s:i}const o=elementorFrontend.breakpoints.getActiveBreakpointsList({withDesktop:!0});let r=s,a=o.indexOf(s),l="";for(;a<=o.length;){if("desktop"===r){l=i;break}const s=`${t}_${r}`,c=this.getControlValue(e,s,n);if(c||0===c){l=c;break}a++,r=o[a]}return l}}},4992(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class DropdownMenuHeightController{constructor(e){this.widgetConfig=e}calculateStickyMenuNavHeight(){this.widgetConfig.elements.$dropdownMenuContainer.css(this.widgetConfig.settings.menuHeightCssVarName,"");const e=this.widgetConfig.elements.$dropdownMenuContainer.offset().top-jQuery(window).scrollTop();return elementorFrontend.elements.$window.height()-e}calculateMenuTabContentHeight(e){return elementorFrontend.elements.$window.height()-e[0].getBoundingClientRect().top}isElementSticky(){return this.widgetConfig.elements.$element.hasClass("elementor-sticky")||this.widgetConfig.elements.$element.parents(".elementor-sticky").length}getMenuHeight(){return this.isElementSticky()?this.calculateStickyMenuNavHeight()+"px":this.widgetConfig.settings.dropdownMenuContainerMaxHeight}setMenuHeight(e){this.widgetConfig.elements.$dropdownMenuContainer.css(this.widgetConfig.settings.menuHeightCssVarName,e)}reassignMobileMenuHeight(){const e=this.isToggleActive()?this.getMenuHeight():0;return this.setMenuHeight(e)}reassignMenuHeight(e){if(!this.isElementSticky()||0===e.length)return;const t=elementorFrontend.elements.$window.height()-e[0].getBoundingClientRect().top;e.height()>t&&(e.css("height",this.calculateMenuTabContentHeight(e)+"px"),e.css("overflow-y","scroll"))}resetMenuHeight(e){this.isElementSticky()&&(e.css("height","initial"),e.css("overflow-y","visible"))}isToggleActive(){const e=this.widgetConfig.elements.$menuToggle;return this.widgetConfig.attributes?.menuToggleState?"true"===e.attr(this.widgetConfig.attributes.menuToggleState):e.hasClass(this.widgetConfig.classes.menuToggleActiveClass)}}},2258(e,t,n){"use strict";n.p=ElementorProFrontendConfig.urls.assets+"js/"},4409(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("code-highlight",()=>n.e(635).then(n.bind(n,7193)))}}t.default=_default},4906(e,t,n){"use strict";var s=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(820));class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("global",i.default,null)}}t.default=_default},820(e,t,n){"use strict";var s=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(739));class _default extends elementorModules.frontend.handlers.Base{__construct(...e){super.__construct(...e),this.toggle=elementorFrontend.debounce(this.toggle,200)}getDefaultSettings(){return{selectors:{container:".elementor-widget-container"}}}getDefaultElements(){const e=this.getSettings("selectors");let t=this.$element.find(e.container);return 0===t.length&&(t=this.$element),{$container:t}}bindEvents(){elementorFrontend.elements.$window.on("resize",this.toggle)}unbindEvents(){elementorFrontend.elements.$window.off("resize",this.toggle)}addCSSTransformEvents(){this.getElementSettings("motion_fx_motion_fx_scrolling")&&!this.isTransitionEventAdded&&(this.isTransitionEventAdded=!0,this.elements.$container.on("mouseenter",()=>{this.elements.$container.css("--e-transform-transition-duration","")}))}initEffects(){this.effects={translateY:{interaction:"scroll",actions:["translateY"]},translateX:{interaction:"scroll",actions:["translateX"]},rotateZ:{interaction:"scroll",actions:["rotateZ"]},scale:{interaction:"scroll",actions:["scale"]},opacity:{interaction:"scroll",actions:["opacity"]},blur:{interaction:"scroll",actions:["blur"]},mouseTrack:{interaction:"mouseMove",actions:["translateXY"]},tilt:{interaction:"mouseMove",actions:["tilt"]}}}prepareOptions(e){const t=this.getElementSettings(),n="motion_fx"===e?"element":"background",s={};jQuery.each(t,(n,i)=>{const o=new RegExp("^"+e+"_(.+?)_effect"),r=n.match(o);if(!r||!i)return;const a={},l=r[1];jQuery.each(t,(t,n)=>{const s=new RegExp(e+"_"+l+"_(.+)"),i=t.match(s);if(!i)return;"effect"!==i[1]&&("object"==typeof n&&(n=Object.keys(n.sizes).length?n.sizes:n.size),a[i[1]]=n)});const c=this.effects[l],d=c.interaction;s[d]||(s[d]={}),c.actions.forEach(e=>s[d][e]=a)});let i,o,r=this.$element;const a=this.getElementType();if("element"===n&&!["section","container"].includes(a)){let e;i=r,e="column"===a?".elementor-widget-wrap":".elementor-widget-container",o=r.find("> "+e),r=0===o.length?this.$element:o}const l={type:n,interactions:s,elementSettings:t,$element:r,$dimensionsElement:i,refreshDimensions:this.isEdit,range:t[e+"_range"],classes:{element:"elementor-motion-effects-element",parent:"elementor-motion-effects-parent",backgroundType:"elementor-motion-effects-element-type-background",container:"elementor-motion-effects-container",layer:"elementor-motion-effects-layer",perspective:"elementor-motion-effects-perspective"}};return l.range||"fixed"!==this.getCurrentDeviceSetting("_position")||(l.range="page"),"fixed"===this.getCurrentDeviceSetting("_position")&&(l.isFixedPosition=!0),"background"===n&&"column"===this.getElementType()&&(l.addBackgroundLayerTo=" > .elementor-element-populated"),l}activate(e){const t=this.prepareOptions(e);jQuery.isEmptyObject(t.interactions)||(this[e]=new i.default(t))}deactivate(e){this[e]&&(this[e].destroy(),delete this[e])}toggle(){const e=elementorFrontend.getCurrentDeviceMode(),t=this.getElementSettings();["motion_fx","background_motion_fx"].forEach(n=>{const s=t[n+"_devices"];(!s||-1!==s.indexOf(e))&&(t[n+"_motion_fx_scrolling"]||t[n+"_motion_fx_mouse"])?this[n]?this.refreshInstance(n):this.activate(n):this.deactivate(n)})}refreshInstance(e){const t=this[e];if(!t)return;const n=this.prepareOptions(e);t.setSettings(n),t.refresh()}onInit(){super.onInit();const e=window.matchMedia("(prefers-reduced-motion: reduce)");e&&e.matches||(this.initEffects(),this.addCSSTransformEvents(),this.toggle())}onElementChange(e){if(/motion_fx_((scrolling)|(mouse)|(devices))$/.test(e))return"motion_fx_motion_fx_scrolling"===e&&this.addCSSTransformEvents(),void this.toggle();const t=e.match(".*?(motion_fx|_transform)");if(t){const e=t[0].match("(_transform)")?"motion_fx":t[0];this.refreshInstance(e),this[e]||this.activate(e)}/^_position/.test(e)&&["motion_fx","background_motion_fx"].forEach(e=>{this.refreshInstance(e)})}onDestroy(){super.onDestroy(),["motion_fx","background_motion_fx"].forEach(e=>{this.deactivate(e)})}}t.default=_default},3039(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{getMovePointFromPassedPercents(e,t){return+(t/e*100).toFixed(2)}getEffectValueFromMovePoint(e,t){return e*t/100}getStep(e,t){return"element"===this.getSettings("type")?this.getElementStep(e,t):this.getBackgroundStep(e,t)}getElementStep(e,t){return-(e-50)*t.speed}getBackgroundStep(e,t){const n=this.getSettings("dimensions.movable"+t.axis.toUpperCase());return-this.getEffectValueFromMovePoint(n,e)}getDirectionMovePoint(e,t,n){let s;return e<n.start?"out-in"===t?s=0:"in-out"===t?s=100:(s=this.getMovePointFromPassedPercents(n.start,e),"in-out-in"===t&&(s=100-s)):e<n.end?"in-out-in"===t?s=0:"out-in-out"===t?s=100:(s=this.getMovePointFromPassedPercents(n.end-n.start,e-n.start),"in-out"===t&&(s=100-s)):"in-out"===t?s=0:"out-in"===t?s=100:(s=this.getMovePointFromPassedPercents(100-n.end,100-e),"in-out-in"===t&&(s=100-s)),s}translateX(e,t){e.axis="x",e.unit="px",this.transform("translateX",t,e)}translateY(e,t){e.axis="y",e.unit="px",this.transform("translateY",t,e)}translateXY(e,t,n){this.translateX(e,t),this.translateY(e,n)}tilt(e,t,n){const s={speed:e.speed/10,direction:e.direction};this.rotateX(s,n),this.rotateY(s,100-t)}rotateX(e,t){e.axis="x",e.unit="deg",this.transform("rotateX",t,e)}rotateY(e,t){e.axis="y",e.unit="deg",this.transform("rotateY",t,e)}rotateZ(e,t){e.unit="deg",this.transform("rotateZ",t,e)}scale(e,t){const n=this.getDirectionMovePoint(t,e.direction,e.range);this.updateRulePart("transform","scale",1+e.speed*n/1e3)}transform(e,t,n){n.direction&&(t=100-t),this.updateRulePart("transform",e,this.getStep(t,n)+n.unit)}setCSSTransformVariables(e){this.CSSTransformVariables=[],jQuery.each(e,(e,t)=>{const n=e.match(/_transform_(.+?)_effect/m);if(n&&t){if("perspective"===n[1])return void this.CSSTransformVariables.unshift(n[1]);if(this.CSSTransformVariables.includes(n[1]))return;this.CSSTransformVariables.push(n[1])}})}opacity(e,t){const n=this.getDirectionMovePoint(t,e.direction,e.range),s=e.level/10,i=1-s+this.getEffectValueFromMovePoint(s,n);this.$element.css({opacity:i,"will-change":"opacity"})}blur(e,t){const n=this.getDirectionMovePoint(t,e.direction,e.range),s=e.level-this.getEffectValueFromMovePoint(e.level,n);this.updateRulePart("filter","blur",s+"px")}updateRulePart(e,t,n){this.rulesVariables[e]||(this.rulesVariables[e]={}),this.rulesVariables[e][t]||(this.rulesVariables[e][t]=!0,this.updateRule(e));const s=`--${t}`;this.$element[0].style.setProperty(s,n)}updateRule(e){let t="";t+=this.concatTransformCSSProperties(e),t+=this.concatTransformMotionEffectCSSProperties(e),this.$element.css(e,t)}concatTransformCSSProperties(e){let t="";return"transform"===e&&jQuery.each(this.CSSTransformVariables,(e,n)=>{const s=n;n.startsWith("flip")&&(n=n.replace("flip","scale"));const i=n.startsWith("rotate")||n.startsWith("skew")?"deg":"px",o=n.startsWith("scale")?1:0+i;t+=`${n}(var(--e-transform-${s}, ${o}))`}),t}concatTransformMotionEffectCSSProperties(e){let t="";return jQuery.each(this.rulesVariables[e],e=>{t+=`${e}(var(--${e}))`}),t}runAction(e,t,n,...s){t.affectedRange&&(t.affectedRange.start>n&&(n=t.affectedRange.start),t.affectedRange.end<n&&(n=t.affectedRange.end)),this[e](t,n,...s)}refresh(){this.rulesVariables={},this.CSSTransformVariables=[],this.$element.css({transform:"",filter:"",opacity:"","will-change":""})}onInit(){this.$element=this.getSettings("$targetElement"),this.refresh()}}t.default=_default},3323(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.ViewModule{__construct(e){this.motionFX=e.motionFX,this.intersectionObservers||this.setElementInViewportObserver()}setElementInViewportObserver(){this.intersectionObserver=elementorModules.utils.Scroll.scrollObserver({callback:e=>{e.isInViewport?this.onInsideViewport():this.removeAnimationFrameRequest()}});const e="page"===this.motionFX.getSettings("range")?elementorFrontend.elements.$body[0]:this.motionFX.elements.$parent[0];this.intersectionObserver.observe(e)}onInsideViewport=()=>{this.run(),this.animationFrameRequest=requestAnimationFrame(this.onInsideViewport)};runCallback(...e){this.getSettings("callback")(...e)}removeIntersectionObserver(){this.intersectionObserver&&this.intersectionObserver.unobserve(this.motionFX.elements.$parent[0])}removeAnimationFrameRequest(){this.animationFrameRequest&&cancelAnimationFrame(this.animationFrameRequest)}destroy(){this.removeAnimationFrameRequest(),this.removeIntersectionObserver()}onInit(){super.onInit()}}t.default=_default},5481(e,t,n){"use strict";var s=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(3323));class MouseMoveInteraction extends i.default{bindEvents(){MouseMoveInteraction.mouseTracked||(elementorFrontend.elements.$window.on("mousemove",MouseMoveInteraction.updateMousePosition),MouseMoveInteraction.mouseTracked=!0)}run(){const e=MouseMoveInteraction.mousePosition,t=this.oldMousePosition;if(t.x===e.x&&t.y===e.y)return;this.oldMousePosition={x:e.x,y:e.y};const n=100/innerWidth*e.x,s=100/innerHeight*e.y;this.runCallback(n,s)}onInit(){this.oldMousePosition={},super.onInit()}}t.default=MouseMoveInteraction,MouseMoveInteraction.mousePosition={},MouseMoveInteraction.updateMousePosition=e=>{MouseMoveInteraction.mousePosition={x:e.clientX,y:e.clientY}}},2647(e,t,n){"use strict";var s=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(3323));class _default extends i.default{run(){if(pageYOffset===this.windowScrollTop)return!1;this.onScrollMovement(),this.windowScrollTop=pageYOffset}onScrollMovement(){this.updateMotionFxDimensions(),this.updateAnimation(),this.resetTransitionVariable()}resetTransitionVariable(){this.motionFX.$element.css("--e-transform-transition-duration","100ms")}updateMotionFxDimensions(){this.motionFX.getSettings().refreshDimensions&&this.motionFX.defineDimensions()}updateAnimation(){let e;e="page"===this.motionFX.getSettings("range")?elementorModules.utils.Scroll.getPageScrollPercentage():this.motionFX.getSettings("isFixedPosition")?elementorModules.utils.Scroll.getPageScrollPercentage({},window.innerHeight):elementorModules.utils.Scroll.getElementViewportPercentage(this.motionFX.elements.$parent),this.runCallback(e)}}t.default=_default},739(e,t,n){"use strict";var s=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(2647)),o=s(n(5481)),r=s(n(3039));class _default extends elementorModules.ViewModule{getDefaultSettings(){return{type:"element",$element:null,$dimensionsElement:null,addBackgroundLayerTo:null,interactions:{},refreshDimensions:!1,range:"viewport",classes:{element:"motion-fx-element",parent:"motion-fx-parent",backgroundType:"motion-fx-element-type-background",container:"motion-fx-container",layer:"motion-fx-layer",perspective:"motion-fx-perspective"}}}bindEvents(){this.defineDimensions=this.defineDimensions.bind(this),elementorFrontend.elements.$window.on("resize elementor-pro/motion-fx/recalc",this.defineDimensions)}unbindEvents(){elementorFrontend.elements.$window.off("resize elementor-pro/motion-fx/recalc",this.defineDimensions)}addBackgroundLayer(){const e=this.getSettings();this.elements.$motionFXContainer=jQuery("<div>",{class:e.classes.container}),this.elements.$motionFXLayer=jQuery("<div>",{class:e.classes.layer}),this.updateBackgroundLayerSize(),this.elements.$motionFXContainer.prepend(this.elements.$motionFXLayer);(e.addBackgroundLayerTo?this.$element.find(e.addBackgroundLayerTo):this.$element).prepend(this.elements.$motionFXContainer)}removeBackgroundLayer(){this.elements.$motionFXContainer.remove()}updateBackgroundLayerSize(){const e=this.getSettings(),t={x:0,y:0},n=e.interactions.mouseMove,s=e.interactions.scroll;n&&n.translateXY&&(t.x=10*n.translateXY.speed,t.y=10*n.translateXY.speed),s&&(s.translateX&&(t.x=10*s.translateX.speed),s.translateY&&(t.y=10*s.translateY.speed)),this.elements.$motionFXLayer.css({width:100+t.x+"%",height:100+t.y+"%"})}defineDimensions(){const e=this.getSettings("$dimensionsElement")||this.$element,t=e.offset(),n={elementHeight:e.outerHeight(),elementWidth:e.outerWidth(),elementTop:t.top,elementLeft:t.left};n.elementRange=n.elementHeight+innerHeight,this.setSettings("dimensions",n),"background"===this.getSettings("type")&&this.defineBackgroundLayerDimensions()}defineBackgroundLayerDimensions(){const e=this.getSettings("dimensions");e.layerHeight=this.elements.$motionFXLayer.height(),e.layerWidth=this.elements.$motionFXLayer.width(),e.movableX=e.layerWidth-e.elementWidth,e.movableY=e.layerHeight-e.elementHeight,this.setSettings("dimensions",e)}initInteractionsTypes(){this.interactionsTypes={scroll:i.default,mouseMove:o.default}}prepareSpecialActions(){const e=this.getSettings(),t=!(!e.interactions.mouseMove||!e.interactions.mouseMove.tilt);this.elements.$parent.toggleClass(e.classes.perspective,t)}cleanSpecialActions(){const e=this.getSettings();this.elements.$parent.removeClass(e.classes.perspective)}runInteractions(){const e=this.getSettings();this.actions.setCSSTransformVariables(e.elementSettings),this.prepareSpecialActions(),jQuery.each(e.interactions,(e,t)=>{this.interactions[e]=new this.interactionsTypes[e]({motionFX:this,callback:(...e)=>{jQuery.each(t,(t,n)=>this.actions.runAction(t,n,...e))}}),this.interactions[e].run()})}destroyInteractions(){this.cleanSpecialActions(),jQuery.each(this.interactions,(e,t)=>t.destroy()),this.interactions={}}refresh(){this.actions.setSettings(this.getSettings()),"background"===this.getSettings("type")&&(this.updateBackgroundLayerSize(),this.defineBackgroundLayerDimensions()),this.actions.refresh(),this.destroyInteractions(),this.runInteractions()}destroy(){this.destroyInteractions(),this.actions.refresh();const e=this.getSettings();this.$element.removeClass(e.classes.element),this.elements.$parent.removeClass(e.classes.parent),"background"===e.type&&(this.$element.removeClass(e.classes.backgroundType),this.removeBackgroundLayer())}onInit(){super.onInit();const e=this.getSettings();this.$element=e.$element,this.elements.$parent=this.$element.parent(),this.$element.addClass(e.classes.element),this.elements.$parent=this.$element.parent(),this.elements.$parent.addClass(e.classes.parent),"background"===e.type&&(this.$element.addClass(e.classes.backgroundType),this.addBackgroundLayer()),this.defineDimensions(),e.$targetElement="element"===e.type?this.$element:this.elements.$motionFXLayer,this.interactions={},this.actions=new r.default(e),this.initInteractionsTypes(),this.runInteractions()}}t.default=_default},8098(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("paypal-button",()=>n.e(375).then(n.bind(n,466))),elementorFrontend.elementsHandler.attachHandler("stripe-button",()=>Promise.all([n.e(786),n.e(857)]).then(n.bind(n,9036)))}}t.default=_default},6275(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("progress-tracker",()=>n.e(581).then(n.bind(n,287)))}}t.default=_default},2450(e,t,n){"use strict";var s=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(2121));class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("section",i.default,null),elementorFrontend.elementsHandler.attachHandler("container",i.default,null),elementorFrontend.elementsHandler.attachHandler("widget",i.default,null)}}t.default=_default},2121(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=n(6550);t.default=elementorModules.frontend.handlers.Base.extend({currentConfig:{},debouncedReactivate:null,bindEvents(){elementorFrontend.addListenerOnce(this.getUniqueHandlerID()+"sticky","resize",this.reactivateOnResize)},unbindEvents(){elementorFrontend.removeListeners(this.getUniqueHandlerID()+"sticky","resize",this.reactivateOnResize)},isStickyInstanceActive(){return void 0!==this.$element.data("sticky")},getResponsiveSetting(e){const t=this.getElementSettings();return elementorFrontend.getCurrentDeviceSetting(t,e)},getResponsiveSettingList:e=>["",...Object.keys(elementorFrontend.config.responsive.activeBreakpoints)].map(t=>t?`${e}_${t}`:e),getConfig(){const e=this.getElementSettings(),t={to:e.sticky,offset:this.getResponsiveSetting("sticky_offset"),effectsOffset:this.getResponsiveSetting("sticky_effects_offset"),classes:{sticky:"elementor-sticky",stickyActive:"elementor-sticky--active elementor-section--handles-inside",stickyEffects:"elementor-sticky--effects",spacer:"elementor-sticky__spacer"},isRTL:elementorFrontend.config.is_rtl,isScrollSnapActive:(0,s.isScrollSnapActive)(),handleScrollbarWidth:elementorFrontend.isEditMode()},n=elementorFrontend.elements.$wpAdminBar,i=this.isContainerElement(this.$element[0])&&!this.isContainerElement(this.$element[0].parentElement);return n.length&&"top"===e.sticky&&"fixed"===n.css("position")&&(t.offset+=n.height()),e.sticky_parent&&!i&&(t.parent=".e-con, .e-con-inner, .elementor-widget-wrap"),t},activate(){this.currentConfig=this.getConfig(),this.$element.sticky(this.currentConfig)},deactivate(){this.isStickyInstanceActive()&&this.$element.sticky("destroy")},run(e){if(this.getElementSettings("sticky")){var t=elementorFrontend.getCurrentDeviceMode();-1!==this.getElementSettings("sticky_on").indexOf(t)?!0===e?this.reactivate():this.isStickyInstanceActive()||this.activate():this.deactivate()}else this.deactivate()},reactivateOnResize(){clearTimeout(this.debouncedReactivate),this.debouncedReactivate=setTimeout(()=>{const e=this.getConfig();JSON.stringify(e)!==JSON.stringify(this.currentConfig)&&this.run(!0)},300)},reactivate(){this.deactivate(),this.activate()},onElementChange(e){-1!==["sticky","sticky_on"].indexOf(e)&&this.run(!0);-1!==[...this.getResponsiveSettingList("sticky_offset"),...this.getResponsiveSettingList("sticky_effects_offset"),"sticky_parent"].indexOf(e)&&this.reactivate()},onDeviceModeChange(){setTimeout(()=>this.run(!0))},onInit(){elementorModules.frontend.handlers.Base.prototype.onInit.apply(this,arguments),elementorFrontend.isEditMode()&&elementor.listenTo(elementor.channels.deviceMode,"change",()=>this.onDeviceModeChange()),this.run()},onDestroy(){elementorModules.frontend.handlers.Base.prototype.onDestroy.apply(this,arguments),this.deactivate()},isContainerElement:e=>["e-con","e-con-inner"].some(t=>e?.classList.contains(t))})},7937(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.hooks.addAction("frontend/element_ready/video-playlist.default",e=>{n.e(519).then(n.bind(n,4161)).then(({default:t})=>{elementorFrontend.elementsHandler.addHandler(t,{$element:e,toggleSelf:!1})})})}}t.default=_default},6784(e){e.exports=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}},e=>{var t;t=3e3,e(e.s=t)}]);;
/*! elementor-pro - v4.2.0 - 31-08-2026 */
"use strict";(self.webpackChunkelementor_pro=self.webpackChunkelementor_pro||[]).push([[624],{2371(e,t,n){var o=n(6784),s=o(n(6137)),r=o(n(7371)),i=o(n(3746)),l=o(n(9880)),a=o(n(6238)),d=o(n(4286)),u=o(n(4043)),c=o(n(1750)),m=o(n(4486)),h=o(n(1459)),g=o(n(8534)),f=o(n(6034)),p=o(n(6075)),_=o(n(570)),v=o(n(9302)),b=o(n(6302)),y=o(n(7492)),F=o(n(8241)),M=o(n(325)),w=o(n(7467)),S=o(n(1953)),H=o(n(282)),E=o(n(2969)),O=o(n(5355)),T=o(n(8945));const extendDefaultHandlers=e=>({...e,...{animatedText:s.default,carousel:r.default,countdown:i.default,dynamicTags:l.default,hotspot:a.default,form:d.default,gallery:u.default,lottie:c.default,nav_menu:m.default,popup:h.default,posts:g.default,share_buttons:f.default,slides:p.default,social:_.default,themeBuilder:b.default,themeElements:y.default,woocommerce:F.default,tableOfContents:v.default,loopBuilder:M.default,megaMenu:w.default,nestedCarousel:S.default,taxonomyFilter:H.default,offCanvas:E.default,contactButtons:O.default,search:T.default}});elementorProFrontend.on("elementor-pro/modules/init/before",()=>{elementorFrontend.hooks.addFilter("elementor-pro/frontend/handlers",extendDefaultHandlers)})},4921(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class AjaxHelper{addLoadingAnimationOverlay(e){const t=document.querySelector(`.elementor-element-${e}`);t&&t.classList.add("e-loading-overlay")}removeLoadingAnimationOverlay(e){const t=document.querySelector(`.elementor-element-${e}`);t&&t.classList.remove("e-loading-overlay")}}},6914(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.focusableElementSelectors=function focusableElementSelectors(){return"audio, button, canvas, details, iframe, input, select, summary, textarea, video, [accesskey], a[href], area[href], [tabindex]"}},5921(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.close=void 0;const s=new(o(n(5194)).default)("eicon");t.close={get element(){return s.createSvgElement("close",{path:"M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z",width:1e3,height:1e3})}}},5194(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class IconsManager{static symbolsContainer;static iconsUsageList=[];constructor(e){if(this.prefix=`${e}-`,!IconsManager.symbolsContainer){const e="e-font-icon-svg-symbols";IconsManager.symbolsContainer=document.getElementById(e),IconsManager.symbolsContainer||(IconsManager.symbolsContainer=document.createElementNS("http://www.w3.org/2000/svg","svg"),IconsManager.symbolsContainer.setAttributeNS(null,"style","display: none;"),IconsManager.symbolsContainer.setAttributeNS(null,"class",e),document.body.appendChild(IconsManager.symbolsContainer))}}createSvgElement(e,{path:t,width:n,height:o}){const s=this.prefix+e,r="#"+this.prefix+e;if(!IconsManager.iconsUsageList.includes(s)){if(!IconsManager.symbolsContainer.querySelector(r)){const e=document.createElementNS("http://www.w3.org/2000/svg","symbol");e.id=s,e.innerHTML='<path d="'+t+'"></path>',e.setAttributeNS(null,"viewBox","0 0 "+n+" "+o),IconsManager.symbolsContainer.appendChild(e)}IconsManager.iconsUsageList.push(s)}const i=document.createElementNS("http://www.w3.org/2000/svg","svg");return i.innerHTML='<use xlink:href="'+r+'" />',i.setAttributeNS(null,"class","e-font-icon-svg e-"+s),i}}t.default=IconsManager},7754(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(6914);t.default=class ModalKeyboardHandler{lastFocusableElement=null;firstFocusableElement=null;modalTriggerElement=null;constructor(e){this.config=e,this.changeFocusAfterAnimation=!1}onOpenModal(){this.initializeElements(),this.setTriggerElement(),this.changeFocusAfterAnimation="popup"===this.config.modalType&&!!this.config.hasEntranceAnimation,this.changeFocusAfterAnimation||this.changeFocus(),this.bindEvents()}onCloseModal(){elementorFrontend.elements.$window.off("keydown",this.onKeyDownPressed.bind(this)),this.modalTriggerElement&&this.setFocusToElement(this.modalTriggerElement)}bindEvents(){elementorFrontend.elements.$window.on("keydown",this.onKeyDownPressed.bind(this)),this.changeFocusAfterAnimation&&this.config.$modalElements.on("animationend animationcancel",this.changeFocus.bind(this)),"popup"===this.config.modalType&&this.onPopupCloseEvent()}onPopupCloseEvent(){elementorFrontend.elements.$window.on("elementor/popup/hide",this.onCloseModal.bind(this))}getFocusableElements(){const e="popup"===this.config.modalType?":focusable":(0,o.focusableElementSelectors)();return this.config.$modalElements.find(e)}initializeElements(){const e=this.getFocusableElements();e.length&&(this.lastFocusableElement=e[e.length-1],this.firstFocusableElement=e[0])}setTriggerElement(){const e=elementorFrontend.elements.window.document.activeElement;this.modalTriggerElement=e?elementorFrontend.elements.window.document.activeElement:null}changeFocus(){this.firstFocusableElement?this.setFocusToElement(this.firstFocusableElement):(this.config.$elementWrapper.attr("tabindex","0"),this.setFocusToElement(this.config.$elementWrapper[0]))}onKeyDownPressed(e){const t=e.shiftKey,n="Tab"===e.key||9===e.keyCode,o="0"===this.config.$elementWrapper.attr("tabindex");n&&o?e.preventDefault():n&&this.onTabKeyPressed(n,t,e)}onTabKeyPressed(e,t,n){elementorFrontend.isEditMode()&&this.initializeElements();const o=elementorFrontend.elements.window.document.activeElement;if(t){o===this.firstFocusableElement&&(this.setFocusToElement(this.lastFocusableElement),n.preventDefault())}else{o===this.lastFocusableElement&&(this.setFocusToElement(this.firstFocusableElement),n.preventDefault())}}setFocusToElement(e){const t="popup"===this.config.modalType?250:100;setTimeout(()=>{e?.focus()},t)}}},5012(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function runElementHandlers(e){[...e].flatMap(e=>[...e.querySelectorAll(".elementor-element")]).forEach(e=>elementorFrontend.elementsHandler.runReadyTrigger(e))}},6137(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("animated-headline",()=>n.e(961).then(n.bind(n,2590)))}}t.default=_default},7371(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("media-carousel",()=>n.e(692).then(n.bind(n,8948))),elementorFrontend.elementsHandler.attachHandler("testimonial-carousel",()=>n.e(897).then(n.bind(n,7181))),elementorFrontend.elementsHandler.attachHandler("reviews",()=>n.e(897).then(n.bind(n,7181)))}}t.default=_default},3746(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("countdown",()=>n.e(416).then(n.bind(n,475)))}}t.default=_default},9880(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.on("components:init",()=>this.onFrontendComponentsInit())}onFrontendComponentsInit(){elementorFrontend.utils.urlActions.addAction("reload-page",()=>document.location.reload())}}t.default=_default},5355(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.config.experimentalFeatures.container&&(["contact-buttons-var-1","contact-buttons-var-3","contact-buttons-var-4","contact-buttons-var-5","contact-buttons-var-6","contact-buttons-var-7","contact-buttons-var-8","contact-buttons-var-9"].forEach(e=>{elementorFrontend.elementsHandler.attachHandler(e,()=>n.e(1).then(n.bind(n,197)))}),elementorFrontend.elementsHandler.attachHandler("contact-buttons-var-10",()=>n.e(61).then(n.bind(n,7263))),elementorFrontend.elementsHandler.attachHandler("floating-bars-var-2",()=>n.e(249).then(n.bind(n,2319))),elementorFrontend.elementsHandler.attachHandler("floating-bars-var-3",()=>n.e(440).then(n.bind(n,7704))))}}t.default=_default},4286(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("form",[()=>n.e(325).then(n.bind(n,9230)),()=>n.e(325).then(n.bind(n,2176)),()=>n.e(325).then(n.bind(n,9613)),()=>n.e(325).then(n.bind(n,2478)),()=>n.e(325).then(n.bind(n,733)),()=>n.e(325).then(n.bind(n,6935))]),elementorFrontend.elementsHandler.attachHandler("subscribe",[()=>n.e(325).then(n.bind(n,9230)),()=>n.e(325).then(n.bind(n,2176)),()=>n.e(325).then(n.bind(n,9613))])}}t.default=_default},4043(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("gallery",()=>n.e(543).then(n.bind(n,771)))}}t.default=_default},6238(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("hotspot",()=>n.e(292).then(n.bind(n,507)))}}t.default=_default},325(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),["post","product","post_taxonomy","product_taxonomy"].forEach(e=>{elementorFrontend.elementsHandler.attachHandler("loop-grid",()=>n.e(535).then(n.bind(n,2245)),e),elementorFrontend.elementsHandler.attachHandler("loop-grid",()=>n.e(993).then(n.bind(n,2813)),e),elementorFrontend.elementsHandler.attachHandler("loop-carousel",()=>n.e(993).then(n.bind(n,2813)),e),elementorFrontend.elementsHandler.attachHandler("loop-carousel",()=>n.e(932).then(n.bind(n,7992)),e),elementorFrontend.elementsHandler.attachHandler("loop-grid",()=>n.e(550).then(n.bind(n,4734)),e)})}}t.default=_default},9585(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(5012)),r=o(n(4921)),i=o(n(1368)),l=n(275);class BaseFilterFrontendModule extends elementorModules.Module{constructor(){super(),this.loopWidgetsStore=new i.default}removeFilterFromLoopWidget(e,t,n="",o=""){if(!this.loopWidgetsStore.getWidget(e))return this.loopWidgetsStore.addWidget(e),void this.refreshLoopWidget(e,t);if(n===o&&this.loopWidgetsStore.unsetFilter(e,t),n!==o){const o=this.loopWidgetsStore.getFilterTerms(e,t).filter(function(e){return e!==n});this.loopWidgetsStore.setFilterTerms(e,t,o)}this.refreshLoopWidget(e,t)}setFilterDataForLoopWidget(e,t,n,o=!0,s="DISABLED"){this.loopWidgetsStore.maybeInitializeWidget(e),this.loopWidgetsStore.maybeInitializeFilter(e,t);const r=this.validateMultipleFilterOperator(s);if("DISABLED"!==r){const o=this.loopWidgetsStore.getFilterTerms(e,t)??[],s=n.filterData.terms;n.filterData.terms=[...new Set([...o,...s])],n.filterData.logicalJoin=r}this.loopWidgetsStore.setFilter(e,t,n),o?this.refreshLoopWidget(e,t):this.loopWidgetsStore.consolidateFilters(e)}validateMultipleFilterOperator(e){return e&&["AND","OR"].includes(e)?e:"DISABLED"}getQueryStringInObjectForm(){const e={};for(const t in this.loopWidgetsStore.get()){const n=this.loopWidgetsStore.getWidget(t);for(const o in n.consolidatedFilters){const s=n.consolidatedFilters[o];for(const n in s){const o=l.queryConstants[s[n].logicalJoin??"AND"].separator.decoded;e[`e-filter-${t}-${n}`]=Object.values(s[n].terms).join(o)}}}return e}updateURLQueryString(e,t){const n=new URL(window.location.href).searchParams,o=this.getQueryStringInObjectForm(),s=new URLSearchParams;n.forEach((t,n)=>{n.startsWith("e-filter")||s.append(n,t),n.startsWith("e-page-"+e)&&s.delete(n)});for(const e in o)s.set(e,o[e]);let r=s.toString();r=r.replace(new RegExp(`${l.queryConstants.AND.separator.encoded}`,"g"),l.queryConstants.AND.separator.decoded),r=r.replace(new RegExp(`${l.queryConstants.OR.separator.encoded}`,"g"),l.queryConstants.OR.separator.decoded);const i=this.getFilterHelperAttributes(t);r=i.pageNum>1?r?this.formatQueryString(i.baseUrl,r):i.baseUrl:r?`?${r}`:location.pathname,history.pushState(null,null,r)}formatQueryString(e,t){const n=e.includes("?")?new URLSearchParams(e.split("?")[1]):new URLSearchParams,o=new URLSearchParams(t);for(const e of n.keys())o.has(e)&&o.delete(e);const s=["page","paged"];for(const e of s)n.delete(e),o.delete(e);const r=new URLSearchParams(n.toString());for(const[e,t]of o.entries())r.append(e,t);return e.split("?")[0]+(r.toString()?`?${r.toString()}`:"")}getFilterHelperAttributes(e){const t=document.querySelector('[data-id="'+e+'"]');if(!t)return{baseUrl:location.href,pageNum:1};return t.querySelector(".e-filter").dataset}prepareLoopUpdateRequestData(e,t){const n=this.loopWidgetsStore.getConsolidatedFilters(e),o=this.getFilterHelperAttributes(t),s={post_id:this.getClosestDataElementorId(document.querySelector(`.elementor-element-${e}`))||elementorFrontend.config.post.id,widget_filters:n,widget_id:e,pagination_base_url:o.baseUrl};if(elementorFrontend.isEditMode()){const t=window.top.$e.components.get("document").utils.findContainerById(e);s.widget_model=t.model.toJSON({remove:["default","editSettings","defaultEditSettings"]}),s.is_edit_mode=!0}return s}getClosestDataElementorId(e){const t=e?.closest("[data-elementor-id]");return t?t.getAttribute("data-elementor-id"):null}getFetchArgumentsForLoopUpdate(e,t){const n=this.prepareLoopUpdateRequestData(e,t),o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)};return elementorFrontend.isEditMode()&&elementorPro.config.loopFilter?.nonce&&(o.headers["X-WP-Nonce"]=elementorPro.config.loopFilter?.nonce),o}fetchUpdatedLoopWidgetMarkup(e,t){return fetch(`${elementorProFrontend.config.urls.rest}elementor-pro/v1/refresh-loop`,this.getFetchArgumentsForLoopUpdate(e,t))}createElementFromHTMLString(e){const t=document.createElement("div");return e?(t.innerHTML=e.trim(),t.firstElementChild):(t.classList.add("elementor-widget-container"),t)}refreshLoopWidget(e,t){this.loopWidgetsStore.consolidateFilters(e),this.updateURLQueryString(e,t);const n=document.querySelector(`.elementor-element-${e}`);if(!n)return;this.ajaxHelper||(this.ajaxHelper=new r.default),this.ajaxHelper.addLoadingAnimationOverlay(e);return this.fetchUpdatedLoopWidgetMarkup(e,t).then(e=>e instanceof Response&&e?.ok&&!(400<=e?.status)?e.json():{}).catch(()=>({})).then(t=>{if(!t?.data&&""!==t?.data)return;const o=n.querySelector(".elementor-widget-container"),s=this.createElementFromHTMLString(t.data);n.replaceChild(s,o),this.handleElementHandlers(n),ElementorProFrontendConfig.settings.lazy_load_background_images&&document.dispatchEvent(new Event("elementor/lazyload/observe")),elementorFrontend.elementsHandler.runReadyTrigger(document.querySelector(`.elementor-element-${e}`)),n.classList.remove("e-loading")}).finally(()=>{this.ajaxHelper.removeLoadingAnimationOverlay(e)})}handleElementHandlers(e){const t=e.querySelectorAll(".e-loop-item");(0,s.default)(t)}}t.default=BaseFilterFrontendModule},282(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(9585));class LoopFilter extends s.default{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("taxonomy-filter",()=>n.e(225).then(n.bind(n,2236)))}}t.default=LoopFilter},1368(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class LoopWidgetsStore{constructor(){this.widgets={}}get(){return this.widgets}getWidget(e){return this.widgets[e]}setWidget(e,t){this.widgets[e]=t}unsetWidget(e){delete this.widgets[e]}getFilters(e){return this.getWidget(e).filters}getFilter(e,t){return this.getWidget(e).filters[t]}setFilter(e,t,n){this.getWidget(e).filters[t]=n}unsetFilter(e,t){delete this.getWidget(e).filters[t]}getFilterTerms(e,t){return this.getFilter(e,t).filterData.terms??[]}setFilterTerms(e,t,n){this.getFilter(e,t).filterData.terms=n}getConsolidatedFilters(e){return this.getWidget(e).consolidatedFilters}setConsolidatedFilters(e,t){this.getWidget(e).consolidatedFilters=t}addWidget(e){this.setWidget(e,{filters:{},consolidatedFilters:{}})}maybeInitializeWidget(e){this.getWidget(e)||this.addWidget(e)}maybeInitializeFilter(e,t){if(this.getFilter(e,t))return;this.setFilter(e,t,{filterData:{terms:[]}})}consolidateFilters(e){const t=this.getFilters(e),n={};for(const e in t){const o=t[e],s=o.filterType,r=o.filterData;0!==r.terms.length&&(n[s]||(n[s]={}),n[s][r.selectedTaxonomy]||(n[s][r.selectedTaxonomy]=[]),!r.terms||n[s][r.selectedTaxonomy].terms&&n[s][r.selectedTaxonomy].terms.includes(r.terms)||(n[s][r.selectedTaxonomy]={terms:"string"===r.terms?[r.terms]:r.terms}),r.logicalJoin&&!n[s][r.selectedTaxonomy].logicalJoin&&(n[s][r.selectedTaxonomy]={...n[s][r.selectedTaxonomy]||{},logicalJoin:r.logicalJoin??"AND"}))}this.setConsolidatedFilters(e,n)}}},275(e){e.exports={queryConstants:{AND:{separator:{decoded:"+",fromBrowser:" ",encoded:"%2B"},operator:"AND"},OR:{separator:{decoded:"~",fromBrowser:"~",encoded:"%7C"},operator:"IN"},NOT:{separator:{decoded:"!",fromBrowser:"!",encoded:"%21"},operator:"NOT IN"},DISABLED:{separator:{decoded:"",fromBrowser:"",encoded:""},operator:"AND"}}}},1750(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("lottie",()=>n.e(970).then(n.bind(n,5200)))}}t.default=_default},7467(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("mega-menu",[()=>n.e(727).then(n.bind(n,3431)),()=>n.e(87).then(n.bind(n,8636)),()=>n.e(912).then(n.bind(n,9774))])}}t.default=_default},4486(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),jQuery.fn.smartmenus&&(jQuery.SmartMenus.prototype.isCSSOn=function(){return!0},elementorFrontend.config.is_rtl&&(jQuery.fn.smartmenus.defaults.rightToLeftSubMenus=!0)),elementorFrontend.elementsHandler.attachHandler("nav-menu",()=>n.e(334).then(n.bind(n,757)))}}t.default=_default},1953(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("nested-carousel",()=>n.e(33).then(n.bind(n,1195)))}}t.default=_default},2969(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("off-canvas",()=>n.e(579).then(n.bind(n,9547))),elementorFrontend.on("components:init",()=>this.onFrontendComponentsInit())}onFrontendComponentsInit(){this.addUrlActions()}addUrlActions(){elementorFrontend.utils.urlActions.addAction("off_canvas:open",e=>{this.toggleOffCanvasDisplay(e)}),elementorFrontend.utils.urlActions.addAction("off_canvas:close",e=>{this.toggleOffCanvasDisplay(e)}),elementorFrontend.utils.urlActions.addAction("off_canvas:toggle",e=>{this.toggleOffCanvasDisplay(e)})}toggleOffCanvasDisplay(e){window.dispatchEvent(new CustomEvent("elementor-pro/off-canvas/toggle-display-mode",{detail:e}))}}t.default=_default},2506(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(3758)),r=o(n(5469)),i=n(5921),l=o(n(7754));class _default extends elementorModules.frontend.Document{keyboardHandler=null;bindEvents(){const e=this.getDocumentSettings("open_selector");e&&elementorFrontend.elements.$body.on("click",e,this.showModal.bind(this))}startTiming(){new r.default(this.getDocumentSettings("timing"),this).check()&&this.initTriggers()}initTriggers(){this.triggers=new s.default(this.getDocumentSettings("triggers"),this)}showModal(e){const t=this.getDocumentSettings();if(!this.isEdit){if(!elementorFrontend.isWPPreviewMode()){if(this.getStorage("disable"))return;if(e&&elementorProFrontend.modules.popup.popupPopped&&t.avoid_multiple_popups)return}this.$element=jQuery(this.elementHTML),this.elements.$elements=this.$element.find(this.getSettings("selectors.elements"))}const n=this.getModal(),o=n.getElements("closeButton");n.setMessage(this.$element).show(),this.isEdit||(t.close_button_delay&&(o.hide(),clearTimeout(this.closeButtonTimeout),this.closeButtonTimeout=setTimeout(()=>o.show(),1e3*t.close_button_delay)),super.runElementsHandlers()),this.setEntranceAnimation(),t.timing&&t.timing.times_count||this.countTimes(),elementorProFrontend.modules.popup.popupPopped=!0,!this.isEdit&&t.a11y_navigation&&this.handleKeyboardA11y()}setEntranceAnimation(){const e=this.getModal().getElements("widgetContent"),t=this.getDocumentSettings(),n=elementorFrontend.getCurrentDeviceSetting(t,"entrance_animation");if(this.currentAnimation&&e.removeClass(this.currentAnimation),this.currentAnimation=n,!n)return;const o=t.entrance_animation_duration.size;e.addClass(n),setTimeout(()=>e.removeClass(n),1e3*o)}handleKeyboardA11y(){this.keyboardHandler||(this.keyboardHandler=new l.default(this.getKeyboardHandlingConfig())),this.keyboardHandler.onOpenModal()}setExitAnimation(){const e=this.getModal(),t=this.getDocumentSettings(),n=e.getElements("widgetContent"),o=elementorFrontend.getCurrentDeviceSetting(t,"exit_animation"),s=o?t.entrance_animation_duration.size:0;setTimeout(()=>{o&&n.removeClass(o+" reverse"),this.isEdit||(this.$element.remove(),e.getElements("widget").hide())},1e3*s),o&&n.addClass(o+" reverse")}initModal(){let e;this.getModal=()=>{if(!e){const t=this.getDocumentSettings(),n=this.getSettings("id"),triggerPopupEvent=e=>{const t="elementor/popup/"+e;elementorFrontend.elements.$document.trigger(t,[n,this]),window.dispatchEvent(new CustomEvent(t,{detail:{id:n,instance:this}}))};let o="elementor-popup-modal";t.classes&&(o+=" "+t.classes);const s={id:"elementor-popup-modal-"+n,className:o,closeButton:!0,preventScroll:t.prevent_scroll,onShow:()=>triggerPopupEvent("show"),onHide:()=>triggerPopupEvent("hide"),effects:{hide:()=>{t.timing&&t.timing.times_count&&this.countTimes(),this.setExitAnimation()},show:"show"},hide:{auto:!!t.close_automatically,autoDelay:1e3*t.close_automatically,onBackgroundClick:!t.prevent_close_on_background_click,onOutsideClick:!t.prevent_close_on_background_click,onEscKeyPress:!t.prevent_close_on_esc_key,ignore:".flatpickr-calendar"},position:{enable:!1}};elementorFrontend.config.experimentalFeatures.e_font_icon_svg&&(s.closeButtonOptions={iconElement:i.close.element}),s.closeButtonClass="eicon-close",e=elementorFrontend.getDialogsManager().createWidget("lightbox",s),e.getElements("widgetContent").addClass("animated");const r=e.getElements("closeButton");this.isEdit&&(r.off("click"),e.hide=()=>{}),this.setCloseButtonPosition()}return e}}setCloseButtonPosition(){const e=this.getModal(),t=this.getDocumentSettings("close_button_position");e.getElements("closeButton").prependTo(e.getElements("outside"===t?"widget":"widgetContent"))}disable(){this.setStorage("disable",!0)}setStorage(e,t,n){elementorFrontend.storage.set(`popup_${this.getSettings("id")}_${e}`,t,n)}getStorage(e,t){return elementorFrontend.storage.get(`popup_${this.getSettings("id")}_${e}`,t)}countTimes(){const e=this.getStorage("times")||0;this.setStorage("times",e+1)}runElementsHandlers(){}async onInit(){super.onInit(),window.DialogsManager||await elementorFrontend.utils.assetsLoader.load("script","dialog"),this.initModal(),this.isEdit?this.showModal():(this.$element.show().remove(),this.elementHTML=this.$element[0].outerHTML,elementorFrontend.isEditMode()||(elementorFrontend.isWPPreviewMode()&&elementorFrontend.config.post.id===this.getSettings("id")?this.showModal():this.startTiming()))}onSettingsChange(e){const t=Object.keys(e.changed)[0];-1!==t.indexOf("entrance_animation")&&this.setEntranceAnimation(),"exit_animation"===t&&this.setExitAnimation(),"close_button_position"===t&&this.setCloseButtonPosition()}getEntranceAnimationDuration(){const e=this.getDocumentSettings(),t=e?.entrance_animation;if(!t||""===t||"none"===t)return 0;const n=e?.entrance_animation_duration?.size;return n?Number(n):0}getKeyboardHandlingConfig(){return{$modalElements:this.getModal().getElements("widgetContent"),$elementWrapper:this.$element,hasEntranceAnimation:0!==this.getEntranceAnimationDuration(),modalType:"popup",modalId:this.$element.data("elementor-id")}}}t.default=_default},1459(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(2506));class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.hooks.addAction("elementor/frontend/documents-manager/init-classes",this.addDocumentClass),elementorFrontend.elementsHandler.attachHandler("form",()=>n.e(887).then(n.bind(n,5985))),elementorFrontend.on("components:init",()=>this.onFrontendComponentsInit()),this.shouldSetViewsAndSessions()&&this.setViewsAndSessions()}shouldSetViewsAndSessions(){return!elementorFrontend.isEditMode()&&!elementorFrontend.isWPPreviewMode()&&ElementorProFrontendConfig.popup.hasPopUps}addDocumentClass(e){e.addDocumentClass("popup",s.default)}setViewsAndSessions(){const e=elementorFrontend.storage.get("pageViews")||0;elementorFrontend.storage.set("pageViews",e+1);if(!elementorFrontend.storage.get("activeSession",{session:!0})){elementorFrontend.storage.set("activeSession",!0,{session:!0});const e=elementorFrontend.storage.get("sessions")||0;elementorFrontend.storage.set("sessions",e+1)}}showPopup(e,t){const n=elementorFrontend.documentsManager.documents[e.id];if(!n)return;const o=n.getModal();e.toggle&&o.isVisible()?o.hide():n.showModal(null,t)}closePopup(e,t){const n=jQuery(t.target).parents('[data-elementor-type="popup"]').data("elementorId");if(!n)return;const o=elementorFrontend.documentsManager.documents[n];o.getModal().hide(),e.do_not_show_again&&o.disable()}onFrontendComponentsInit(){elementorFrontend.utils.urlActions.addAction("popup:open",(e,t)=>this.showPopup(e,t)),elementorFrontend.utils.urlActions.addAction("popup:close",(e,t)=>this.closePopup(e,t))}}t.default=_default},5469(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(164)),r=o(n(5873)),i=o(n(7471)),l=o(n(2880)),a=o(n(5104)),d=o(n(1837)),u=o(n(3940)),c=o(n(1533)),m=o(n(8254));class _default extends elementorModules.Module{constructor(e,t){super(e),this.document=t,this.timingClasses={page_views:s.default,sessions:r.default,url:i.default,sources:l.default,logged_in:a.default,devices:d.default,times:u.default,browsers:c.default,schedule:m.default}}check(){const e=this.getSettings();let t=!0;return jQuery.each(this.timingClasses,(n,o)=>{if(!e[n])return;new o(e,this.document).check()||(t=!1)}),t}}t.default=_default},2733(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(e,t){super(e),this.document=t}getTimingSetting(e){return this.getSettings(this.getName()+"_"+e)}}t.default=_default},1533(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(2733));class _default extends s.default{getName(){return"browsers"}check(){if("all"===this.getTimingSetting("browsers"))return!0;const e=this.getTimingSetting("browsers_options"),t=elementorFrontend.utils.environment;return e.some(e=>t[e])}}t.default=_default},1837(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(2733));class _default extends s.default{getName(){return"devices"}check(){return-1!==this.getTimingSetting("devices").indexOf(elementorFrontend.getCurrentDeviceMode())}}t.default=_default},5104(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(2733));class _default extends s.default{getName(){return"logged_in"}check(){const e=elementorFrontend.config.user;if(!e)return!0;if("all"===this.getTimingSetting("users"))return!1;return!this.getTimingSetting("roles").filter(t=>-1!==e.roles.indexOf(t)).length}}t.default=_default},164(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(2733));class _default extends s.default{getName(){return"page_views"}check(){const e=elementorFrontend.storage.get("pageViews"),t=this.getName();let n=this.document.getStorage(t+"_initialPageViews");return n||(this.document.setStorage(t+"_initialPageViews",e),n=e),e-n>=this.getTimingSetting("views")}}t.default=_default},9901(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class ScheduleUtils{constructor(e){this.settings=e.settings}getCurrentDateTime(){let e=new Date;return"site"===this.settings.timezone&&this.settings.serverDatetime&&(e=new Date(this.settings.serverDatetime)),e}shouldDisplay=()=>{if(!this.settings.startDate&&!this.settings.endDate)return!0;const e=this.getCurrentDateTime();return(!this.settings.startDate||e>=this.settings.startDate)&&(!this.settings.endDate||e<=this.settings.endDate)}}},8254(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(2733)),r=o(n(9901));class _default extends s.default{constructor(...e){super(...e);const{schedule_timezone:t,schedule_start_date:n,schedule_end_date:o,schedule_server_datetime:s}=this.getSettings();this.settings={timezone:t,startDate:!!n&&new Date(n),endDate:!!o&&new Date(o),serverDatetime:!!s&&new Date(s)},this.scheduleUtils=new r.default({settings:this.settings})}getName(){return"schedule"}check(){return this.scheduleUtils.shouldDisplay()}}t.default=_default},5873(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(2733));class _default extends s.default{getName(){return"sessions"}check(){const e=elementorFrontend.storage.get("sessions"),t=this.getName();let n=this.document.getStorage(t+"_initialSessions");return n||(this.document.setStorage(t+"_initialSessions",e),n=e),e-n>=this.getTimingSetting("sessions")}}t.default=_default},2880(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(2733));class _default extends s.default{getName(){return"sources"}check(){const e=this.getTimingSetting("sources");if(3===e.length)return!0;const t=document.referrer.replace(/https?:\/\/(?:www\.)?/,"");return 0===t.indexOf(location.host.replace("www.",""))?-1!==e.indexOf("internal"):-1!==e.indexOf("external")||-1!==e.indexOf("search")&&/^(google|yahoo|bing|yandex|baidu)\./.test(t)}}t.default=_default},1744(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class TimesUtils{constructor(e){this.uniqueId=e.uniqueId,this.settings=e.settings,this.storage=e.storage}getTimeFramesInSecounds(e){return{day:86400,week:604800,month:2628288}[e]}setExpiration(e,t,n){if(!this.storage.get(e)){const o={lifetimeInSeconds:this.getTimeFramesInSecounds(n)};return void this.storage.set(e,t,o)}this.storage.set(e,t)}getImpressionsCount(){const e=this.storage.get(this.uniqueId)??0;return parseInt(e)}incrementImpressionsCount(){if(this.settings.period)if("session"!==this.settings.period){const e=this.getImpressionsCount();this.setExpiration(this.uniqueId,e+1,this.settings.period)}else sessionStorage.setItem(this.uniqueId,parseInt(sessionStorage.getItem(this.uniqueId)??0)+1);else this.storage.set("times",(this.storage.get("times")??0)+1)}shouldCountOnOpen(){this.settings.countOnOpen&&this.incrementImpressionsCount()}shouldDisplayPerTimeFrame(){return this.getImpressionsCount()<this.settings.showsLimit&&(this.shouldCountOnOpen(),!0)}shouldDisplayPerSession(){const e=sessionStorage.getItem(this.uniqueId)??0;return parseInt(e)<this.settings.showsLimit&&(this.shouldCountOnOpen(),!0)}shouldDisplayBackwordCompatible(e=0,t){const n=parseInt(e)<parseInt(t);return this.shouldCountOnOpen(),n}}},3940(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(2733)),r=o(n(1744));class _default extends s.default{constructor(...e){super(...e),this.uniqueId=`popup-${this.document.getSettings("id")}-impressions-count`;const{times_count:t,times_period:n,times_times:o}=this.getSettings();this.settings={countOnOpen:t,period:n,showsLimit:parseInt(o)},""===this.settings.period&&(this.settings.period=!1),["","close"].includes(this.settings.countOnOpen)?(this.settings.countOnOpen=!1,this.onPopupHide()):this.settings.countOnOpen=!0,this.utils=new r.default({uniqueId:this.uniqueId,settings:this.settings,storage:elementorFrontend.storage})}getName(){return"times"}check(){if(!this.settings.period){const e=this.document.getStorage("times")||0,t=this.getTimingSetting("times");return this.utils.shouldDisplayBackwordCompatible(e,t)}if("session"!==this.settings.period){if(!this.utils.shouldDisplayPerTimeFrame())return!1}else if(!this.utils.shouldDisplayPerSession())return!1;return!0}onPopupHide(){window.addEventListener("elementor/popup/hide",()=>{this.utils.incrementImpressionsCount()})}}t.default=_default},7471(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(2733));class _default extends s.default{getName(){return"url"}check(){const e=this.getTimingSetting("url"),t=this.getTimingSetting("action"),n=document.referrer;if("regex"!==t)return"hide"===t^-1!==n.indexOf(e);let o;try{o=new RegExp(e)}catch(e){return!1}return o.test(n)}}t.default=_default},3758(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(9739)),r=o(n(9226)),i=o(n(4270)),l=o(n(1697)),a=o(n(9143)),d=o(n(3676)),u=o(n(7541));class _default extends elementorModules.Module{constructor(e,t){super(e),this.document=t,this.triggers=[],this.triggerClasses={page_load:s.default,scrolling:r.default,scrolling_to:i.default,click:l.default,inactivity:a.default,exit_intent:d.default,adblock_detection:u.default},this.runTriggers()}runTriggers(){const e=this.getSettings();jQuery.each(this.triggerClasses,(t,n)=>{if(!e[t])return;const o=new n(e,()=>this.onTriggerFired());o.run(),this.triggers.push(o)})}destroyTriggers(){this.triggers.forEach(e=>e.destroy()),this.triggers=[]}onTriggerFired(){this.document.showModal(!0),this.destroyTriggers()}}t.default=_default},7541(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(6904));class _default extends s.default{getName(){return"adblock_detection"}generateRandomString(){const e="abcdefghijklmnopqrstuvwxyz0123456789";let t="";for(let n=0;n<6;n++){t+=e[Math.floor(36*Math.random())]}return t}hasAdblock(){const e=`elementor-adblock-detection-${this.generateRandomString()}`;this.createEmptyAdBlockElement(e);const t=document.querySelector(`#${e}`);if(!t)return!0;const n="none"===window.getComputedStyle(t)?.display;return this.removeEmptyAdBlockElement(t),n}createEmptyAdBlockElement(e){const t=document.createElement("div");t.id=e,t.className="ad-box",t.style.position="fixed",t.style.top="0",t.style.left="0",t.setAttribute("aria-hidden","true"),t.innerHTML="&nbsp;",document.body.appendChild(t)}removeEmptyAdBlockElement(e){e.remove()}run(){this.timeout=setTimeout(()=>{this.hasAdblock()&&this.callback()},1e3*this.getTriggerSetting("delay"))}destroy(){clearTimeout(this.timeout)}}t.default=_default},6904(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(e,t){super(e),this.callback=t}getTriggerSetting(e){return this.getSettings(this.getName()+"_"+e)}}t.default=_default},1697(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(6904));class _default extends s.default{constructor(...e){super(...e),this.checkClick=this.checkClick.bind(this),this.clicksCount=0}getName(){return"click"}checkClick(){this.clicksCount++,this.clicksCount===this.getTriggerSetting("times")&&this.callback()}run(){elementorFrontend.elements.$body.on("click",this.checkClick)}destroy(){elementorFrontend.elements.$body.off("click",this.checkClick)}}t.default=_default},3676(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(6904));class _default extends s.default{constructor(...e){super(...e),this.detectExitIntent=this.detectExitIntent.bind(this)}getName(){return"exit_intent"}detectExitIntent(e){e.clientY<=0&&this.callback()}run(){elementorFrontend.elements.$window.on("mouseleave",this.detectExitIntent)}destroy(){elementorFrontend.elements.$window.off("mouseleave",this.detectExitIntent)}}t.default=_default},9143(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(6904));class _default extends s.default{constructor(...e){super(...e),this.restartTimer=this.restartTimer.bind(this)}getName(){return"inactivity"}run(){this.startTimer(),elementorFrontend.elements.$document.on("keypress mousemove",this.restartTimer)}startTimer(){this.timeOut=setTimeout(this.callback,1e3*this.getTriggerSetting("time"))}clearTimer(){clearTimeout(this.timeOut)}restartTimer(){this.clearTimer(),this.startTimer()}destroy(){this.clearTimer(),elementorFrontend.elements.$document.off("keypress mousemove",this.restartTimer)}}t.default=_default},9739(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(6904));class _default extends s.default{getName(){return"page_load"}run(){this.timeout=setTimeout(this.callback,1e3*this.getTriggerSetting("delay"))}destroy(){clearTimeout(this.timeout)}}t.default=_default},4270(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(6904));class _default extends s.default{getName(){return"scrolling_to"}run(){let e;try{e=jQuery(this.getTriggerSetting("selector"))}catch(e){return}e.length&&(this.setUpIntersectionObserver(),this.observer.observe(e[0]))}setUpIntersectionObserver(){this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&this.callback()})})}destroy(){this.observer&&this.observer.disconnect()}}t.default=_default},9226(e,t,n){var o=n(6784);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(6904));class _default extends s.default{constructor(...e){super(...e),this.checkScroll=this.checkScroll.bind(this),this.lastScrollOffset=0}getName(){return"scrolling"}checkScroll(){const e=scrollY>this.lastScrollOffset?"down":"up",t=this.getTriggerSetting("direction");if(this.lastScrollOffset=scrollY,e!==t)return;if("up"===e)return void this.callback();const n=elementorFrontend.elements.$document.height()-innerHeight;scrollY/n*100>=this.getTriggerSetting("offset")&&this.callback()}run(){elementorFrontend.elements.$window.on("scroll",this.checkScroll)}destroy(){elementorFrontend.elements.$window.off("scroll",this.checkScroll)}}t.default=_default},8534(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),["classic","full_content","cards"].forEach(e=>{elementorFrontend.elementsHandler.attachHandler("posts",()=>n.e(535).then(n.bind(n,2078)),e)}),elementorFrontend.elementsHandler.attachHandler("posts",()=>n.e(396).then(n.bind(n,2195)),"classic"),elementorFrontend.elementsHandler.attachHandler("posts",()=>n.e(396).then(n.bind(n,2195)),"full_content"),elementorFrontend.elementsHandler.attachHandler("posts",()=>n.e(396).then(n.bind(n,7907)),"cards"),elementorFrontend.elementsHandler.attachHandler("portfolio",()=>n.e(726).then(n.bind(n,2232)))}}t.default=_default},8945(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("search",[()=>n.e(187).then(n.bind(n,6963)),()=>n.e(187).then(n.bind(n,7112))])}}t.default=_default},6034(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("share-buttons",()=>n.e(316).then(n.bind(n,3607)))}}t.default=_default},6075(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("slides",()=>n.e(829).then(n.bind(n,3271)))}}t.default=_default},570(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("facebook-button",()=>n.e(158).then(n.bind(n,5070))),elementorFrontend.elementsHandler.attachHandler("facebook-comments",()=>n.e(158).then(n.bind(n,5070))),elementorFrontend.elementsHandler.attachHandler("facebook-embed",()=>n.e(158).then(n.bind(n,5070))),elementorFrontend.elementsHandler.attachHandler("facebook-page",()=>n.e(158).then(n.bind(n,5070)))}}t.default=_default},9302(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("table-of-contents",()=>Promise.all([n.e(786),n.e(404)]).then(n.bind(n,3827)))}}t.default=_default},6302(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),["archive_classic","archive_full_content","archive_cards"].forEach(e=>{elementorFrontend.elementsHandler.attachHandler("archive-posts",()=>n.e(345).then(n.bind(n,439)),e)}),elementorFrontend.elementsHandler.attachHandler("archive-posts",()=>n.e(345).then(n.bind(n,6629)),"archive_classic"),elementorFrontend.elementsHandler.attachHandler("archive-posts",()=>n.e(345).then(n.bind(n,6629)),"archive_full_content"),elementorFrontend.elementsHandler.attachHandler("archive-posts",()=>n.e(345).then(n.bind(n,2718)),"archive_cards"),jQuery(function(){var e=location.search.match(/theme_template_id=(\d*)/),t=e?jQuery(".elementor-"+e[1]):[];t.length&&jQuery("html, body").animate({scrollTop:t.offset().top-window.innerHeight/2})})}}t.default=_default},7492(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("search-form",()=>n.e(798).then(n.bind(n,9319)))}}t.default=_default},8241(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("woocommerce-menu-cart",()=>n.e(6).then(n.bind(n,2115))),elementorFrontend.elementsHandler.attachHandler("woocommerce-purchase-summary",()=>n.e(80).then(n.bind(n,193))),elementorFrontend.elementsHandler.attachHandler("woocommerce-checkout-page",()=>n.e(354).then(n.bind(n,9391))),elementorFrontend.elementsHandler.attachHandler("woocommerce-cart",()=>n.e(4).then(n.bind(n,2937))),elementorFrontend.elementsHandler.attachHandler("woocommerce-my-account",()=>n.e(662).then(n.bind(n,1627))),elementorFrontend.elementsHandler.attachHandler("woocommerce-notices",()=>n.e(621).then(n.bind(n,4702))),elementorFrontend.elementsHandler.attachHandler("woocommerce-product-add-to-cart",()=>n.e(787).then(n.bind(n,6973))),elementorFrontend.isEditMode()&&elementorFrontend.on("components:init",()=>{elementorFrontend.elements.$body.find(".elementor-widget-woocommerce-cart").length||elementorFrontend.elements.$body.append('<div class="woocommerce-cart-form">')})}}t.default=_default},2470(e){e.exports=wp.i18n}},e=>{e.O(0,[313],()=>{return t=2371,e(e.s=t);var t});e.O()}]);;
(function () {

    const desktop =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        );


    if (!desktop.matches) {
        return;
    }


    const wideScreen =
        window.matchMedia(
            "(min-width: 1520px)"
        );


    const cursor =
        document.querySelector(
            ".offform-cursor"
        );


    if (!cursor) {
        return;
    }


    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let initialized = false;


    const ease = 0.28;

    let previousFrameTime = 0;


    function render(time) {

        let frameEase =
            ease;


        if (wideScreen.matches) {

            if (!previousFrameTime) {
                previousFrameTime = time;
            }


            const delta =
                Math.min(
                    50,
                    Math.max(
                        0,
                        time - previousFrameTime
                    )
                );


            const normalFrame =
                1000 / 60;


            frameEase =
                1 -
                Math.pow(
                    1 - ease,
                    delta / normalFrame
                );


            previousFrameTime =
                time;

        }


        currentX +=
            (targetX - currentX) * frameEase;


        currentY +=
            (targetY - currentY) * frameEase;


        cursor.style.transform =
            "translate3d(" +
            currentX +
            "px," +
            currentY +
            "px,0) " +
            "translate3d(-50%,-50%,0)";


        requestAnimationFrame(
            render
        );

    }


    requestAnimationFrame(
        render
    );


    window.addEventListener(
        "pointermove",
        function (event) {

            if (
                event.pointerType &&
                event.pointerType !== "mouse" &&
                event.pointerType !== "pen"
            ) {
                return;
            }


            targetX =
                event.clientX;


            targetY =
                event.clientY;


            if (!initialized) {

                currentX =
                    targetX;


                currentY =
                    targetY;


                initialized =
                    true;

            }


            cursor.classList.add(
                "is-visible"
            );

        },
        {
            passive: true
        }
    );


    document.documentElement.addEventListener(
        "mouseleave",
        function () {

            cursor.classList.remove(
                "is-visible"
            );

        }
    );


    document.documentElement.addEventListener(
        "mouseenter",
        function () {

            cursor.classList.add(
                "is-visible"
            );

        }
    );


    window.addEventListener(
        "blur",
        function () {

            cursor.classList.remove(
                "is-visible"
            );

        }
    );

})();;
(function(){var e=`1.3.25`;function t(e,t,n){return Math.max(e,Math.min(t,n))}function n(e,t,n){return(1-n)*e+n*t}function r(e,t,r,i){return n(e,t,1-Math.exp(-r*i))}function i(e,t){return(e%t+t)%t}var a=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let n=!1;if(this.duration&&this.easing){this.currentTime+=e;let r=t(0,this.currentTime/this.duration,1);n=r>=1;let i=n?1:this.easing(r);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=r(this.value,this.to,this.lerp*60,e),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,n=!0)):(this.value=this.to,n=!0);n&&this.stop(),this.onUpdate?.(this.value,n)}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n,duration:r,easing:i,onStart:a,onUpdate:o}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=r,this.easing=i,this.currentTime=0,this.isRunning=!0,a?.(),this.onUpdate=o}};function o(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{n=void 0,e.apply(this,r)},t)}}var s=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(e,t,{autoResize:n=!0,debounce:r=250}={}){this.wrapper=e,this.content=t,n&&(this.debouncedResize=o(this.resize,r),this.wrapper instanceof Window?window.addEventListener(`resize`,this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener(`resize`,this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},c=class{events={};emit(e,...t){let n=this.events[e]||[];for(let e=0,r=n.length;e<r;e++)n[e]?.(...t)}on(e,t){return this.events[e]?this.events[e].push(t):this.events[e]=[t],()=>{this.events[e]=this.events[e]?.filter(e=>t!==e)}}off(e,t){this.events[e]=this.events[e]?.filter(e=>t!==e)}destroy(){this.events={}}};let l={passive:!1};function u(e,t){return e===1?16.666666666666668:e===2?t:1}var d=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new c;constructor(e,t={wheelMultiplier:1,touchMultiplier:1}){this.element=e,this.options=t,window.addEventListener(`resize`,this.onWindowResize),this.onWindowResize(),this.element.addEventListener(`wheel`,this.onWheel,l),this.element.addEventListener(`touchstart`,this.onTouchStart,l),this.element.addEventListener(`touchmove`,this.onTouchMove,l),this.element.addEventListener(`touchend`,this.onTouchEnd,l)}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener(`resize`,this.onWindowResize),this.element.removeEventListener(`wheel`,this.onWheel,l),this.element.removeEventListener(`touchstart`,this.onTouchStart,l),this.element.removeEventListener(`touchmove`,this.onTouchMove,l),this.element.removeEventListener(`touchend`,this.onTouchEnd,l)}onTouchStart=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit(`scroll`,{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(n-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:r,y:i},this.emitter.emit(`scroll`,{deltaX:r,deltaY:i,event:e})};onTouchEnd=e=>{this.emitter.emit(`scroll`,{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:n,deltaMode:r}=e,i=u(r,this.window.width),a=u(r,this.window.height);t*=i,n*=a,t*=this.options.wheelMultiplier,n*=this.options.wheelMultiplier,this.emitter.emit(`scroll`,{deltaX:t,deltaY:n,event:e})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};let f=e=>Math.min(1,1.001-2**(-10*e));var p=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new a;emitter=new c;dimensions;virtualScroll;constructor({wrapper:t=window,content:n=document.documentElement,eventsTarget:r=t,smoothWheel:i=!0,syncTouch:a=!1,syncTouchLerp:o=.075,touchInertiaExponent:c=1.7,duration:l,easing:u,lerp:p=.1,infinite:m=!1,orientation:h=`vertical`,gestureOrientation:g=h===`horizontal`?`both`:`vertical`,touchMultiplier:_=1,wheelMultiplier:v=1,autoResize:y=!0,prevent:b,virtualScroll:x,overscroll:S=!0,autoRaf:C=!1,anchors:w=!1,autoToggle:T=!1,allowNestedScroll:E=!1,__experimental__naiveDimensions:D=!1,naiveDimensions:O=D,stopInertiaOnNavigate:k=!1}={}){window.lenisVersion=e,window.lenis||(window.lenis={}),window.lenis.version=e,h===`horizontal`&&(window.lenis.horizontal=!0),a===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!t||t===document.documentElement)&&(t=window),typeof l==`number`&&typeof u!=`function`?u=f:typeof u==`function`&&typeof l!=`number`&&(l=1),this.options={wrapper:t,content:n,eventsTarget:r,smoothWheel:i,syncTouch:a,syncTouchLerp:o,touchInertiaExponent:c,duration:l,easing:u,lerp:p,infinite:m,gestureOrientation:g,orientation:h,touchMultiplier:_,wheelMultiplier:v,autoResize:y,prevent:b,virtualScroll:x,overscroll:S,autoRaf:C,anchors:w,autoToggle:T,allowNestedScroll:E,naiveDimensions:O,stopInertiaOnNavigate:k},this.dimensions=new s(t,n,{autoResize:y}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.addEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener(`click`,this.onClick),this.options.wrapper.addEventListener(`pointerdown`,this.onPointerDown),this.virtualScroll=new d(r,{touchMultiplier:_,wheelMultiplier:v}),this.virtualScroll.on(`scroll`,this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener(`transitionend`,this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.removeEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener(`pointerdown`,this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener(`click`,this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}onScrollEnd=e=>{e instanceof CustomEvent||(this.isScrolling===`smooth`||this.isScrolling===!1)&&e.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent(`scrollend`,{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){let e=this.isHorizontal?`overflow-x`:`overflow-y`;return getComputedStyle(this.rootElement)[e]}checkOverflow(){[`hidden`,`clip`].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=e=>{e.propertyName?.includes(`overflow`)&&e.target===this.rootElement&&this.checkOverflow()};setScroll(e){this.isHorizontal?this.options.wrapper.scrollTo({left:e,behavior:`instant`}):this.options.wrapper.scrollTo({top:e,behavior:`instant`})}onClick=e=>{let t=e.composedPath().filter(e=>e instanceof HTMLAnchorElement&&e.href).map(e=>new URL(e.href)),n=new URL(window.location.href);if(this.options.anchors){let e=t.find(e=>n.host===e.host&&n.pathname===e.pathname&&e.hash);if(e){let t=typeof this.options.anchors==`object`&&this.options.anchors?this.options.anchors:void 0,n=decodeURIComponent(e.hash);this.scrollTo(n,t);return}}if(this.options.stopInertiaOnNavigate&&t.some(e=>n.host===e.host&&n.pathname!==e.pathname)){this.reset();return}};onPointerDown=e=>{e.button===1&&this.reset()};isTouchOnSelectionHandle(e){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let n=e.targetTouches[0]??e.changedTouches[0];if(!n)return!1;let r=t.getRangeAt(0).getClientRects();if(r.length===0)return!1;let i=r[0],a=r[r.length-1],o=Math.hypot(n.clientX-i.left,n.clientY-i.top)<=40,s=Math.hypot(n.clientX-a.right,n.clientY-a.bottom)<=40;return o||s}onVirtualScroll=e=>{if(typeof this.options.virtualScroll==`function`&&this.options.virtualScroll(e)===!1)return;let{deltaX:t,deltaY:n,event:r}=e;if(this.emitter.emit(`virtual-scroll`,{deltaX:t,deltaY:n,event:r}),r.ctrlKey||r.lenisStopPropagation)return;let i=r.type.includes(`touch`),a=r.type.includes(`wheel`);if(i&&this.isIos&&(r.type===`touchstart`&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(r)),this._isDraggingSelection)){r.type===`touchend`&&(this._isDraggingSelection=!1);return}this.isTouching=r.type===`touchstart`||r.type===`touchmove`;let o=t===0&&n===0;if(this.options.syncTouch&&i&&r.type===`touchstart`&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let s=this.options.gestureOrientation===`vertical`&&n===0||this.options.gestureOrientation===`horizontal`&&t===0;if(o||s)return;let c=r.composedPath();c=c.slice(0,c.indexOf(this.rootElement));let l=this.options.prevent,u=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`;if(c.find(e=>e instanceof HTMLElement&&(typeof l==`function`&&l?.(e)||e.hasAttribute?.(`data-lenis-prevent`)||u===`vertical`&&e.hasAttribute?.(`data-lenis-prevent-vertical`)||u===`horizontal`&&e.hasAttribute?.(`data-lenis-prevent-horizontal`)||i&&e.hasAttribute?.(`data-lenis-prevent-touch`)||a&&e.hasAttribute?.(`data-lenis-prevent-wheel`)||this.options.allowNestedScroll&&this.hasNestedScroll(e,{deltaX:t,deltaY:n}))))return;if(this.isStopped||this.isLocked){r.cancelable&&r.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&a)){this.isScrolling=`native`,this.animate.stop(),r.lenisStopPropagation=!0;return}let d=n;this.options.gestureOrientation===`both`?d=Math.abs(n)>Math.abs(t)?n:t:this.options.gestureOrientation===`horizontal`&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&n>0||this.animatedScroll===this.limit&&n<0))&&(r.lenisStopPropagation=!0),r.cancelable&&r.preventDefault();let f=i&&this.options.syncTouch,p=i&&r.type===`touchend`;p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit(`scroll`,this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling===`native`){let e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-e,this.direction=Math.sign(this.animatedScroll-e),this.isStopped||(this.isScrolling=`native`),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty(`overflow`);return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty(`overflow`,`clip`);return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=e=>{let t=e-(this.time||e);this.time=e,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(e,{offset:n=0,immediate:r=!1,lock:i=!1,programmatic:a=!0,lerp:o=a?this.options.lerp:void 0,duration:s=a?this.options.duration:void 0,easing:c=a?this.options.easing:void 0,onStart:l,onComplete:u,force:d=!1,userData:p}={}){if((this.isStopped||this.isLocked)&&!d)return;let m=e,h=n;if(typeof m==`string`&&[`top`,`left`,`start`,`#`].includes(m))m=0;else if(typeof m==`string`&&[`bottom`,`right`,`end`].includes(m))m=this.limit;else{let e=null;if(typeof m==`string`?(e=m.startsWith(`#`)?document.getElementById(m.slice(1)):document.querySelector(m),e||(m===`#top`?m=0:console.warn(`Lenis: Target not found`,m))):m instanceof HTMLElement&&m?.nodeType&&(e=m),e){if(this.options.wrapper!==window){let e=this.rootElement.getBoundingClientRect();h-=this.isHorizontal?e.left:e.top}let t=e.getBoundingClientRect(),n=getComputedStyle(e),r=this.isHorizontal?Number.parseFloat(n.scrollMarginLeft):Number.parseFloat(n.scrollMarginTop),i=getComputedStyle(this.rootElement),a=this.isHorizontal?Number.parseFloat(i.scrollPaddingLeft):Number.parseFloat(i.scrollPaddingTop);m=(this.isHorizontal?t.left:t.top)+this.animatedScroll-(Number.isNaN(r)?0:r)-(Number.isNaN(a)?0:a)}}if(typeof m==`number`){if(m+=h,this.options.infinite){if(a){this.targetScroll=this.animatedScroll=this.scroll;let e=m-this.animatedScroll;e>this.limit/2?m-=this.limit:e<-this.limit/2&&(m+=this.limit)}}else m=t(0,m,this.limit);if(m===this.targetScroll){l?.(this),u?.(this);return}if(this.userData=p??{},r){this.animatedScroll=this.targetScroll=m,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}a||(this.targetScroll=m),typeof s==`number`&&typeof c!=`function`?c=f:typeof c==`function`&&typeof s!=`number`&&(s=1),this.animate.fromTo(this.animatedScroll,m,{duration:s,easing:c,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling=`smooth`,l?.(this)},onUpdate:(e,t)=>{this.isScrolling=`smooth`,this.lastVelocity=this.velocity,this.velocity=e-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=e,this.setScroll(this.scroll),a&&(this.targetScroll=e),t||this.emit(),t&&(this.reset(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(e,{deltaX:t,deltaY:n}){let r=Date.now();e._lenis||={};let i=e._lenis,a,o,s,c,l,u,d,f,p,m;if(r-(i.time??0)>2e3){i.time=Date.now();let t=window.getComputedStyle(e);if(i.computedStyle=t,a=[`auto`,`overlay`,`scroll`].includes(t.overflowX),o=[`auto`,`overlay`,`scroll`].includes(t.overflowY),l=[`auto`].includes(t.overscrollBehaviorX),u=[`auto`].includes(t.overscrollBehaviorY),i.hasOverflowX=a,i.hasOverflowY=o,!(a||o))return!1;d=e.scrollWidth,f=e.scrollHeight,p=e.clientWidth,m=e.clientHeight,s=d>p,c=f>m,i.isScrollableX=s,i.isScrollableY=c,i.scrollWidth=d,i.scrollHeight=f,i.clientWidth=p,i.clientHeight=m,i.hasOverscrollBehaviorX=l,i.hasOverscrollBehaviorY=u}else s=i.isScrollableX,c=i.isScrollableY,a=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,f=i.scrollHeight,p=i.clientWidth,m=i.clientHeight,l=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(a&&s||o&&c))return!1;let h=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`,g,_,v,y,b,x;if(h===`horizontal`)g=Math.round(e.scrollLeft),_=d-p,v=t,y=a,b=s,x=l;else if(h===`vertical`)g=Math.round(e.scrollTop),_=f-m,v=n,y=o,b=c,x=u;else return!1;return!x&&(g>=_||g<=0)?!0:(v>0?g<_:g>0)&&y&&b}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?`x`:`y`]}get isHorizontal(){return this.options.orientation===`horizontal`}get actualScroll(){let e=this.options.wrapper;return this.isHorizontal?e.scrollX??e.scrollLeft:e.scrollY??e.scrollTop}get scroll(){return this.options.infinite?i(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(e){this._isScrolling!==e&&(this._isScrolling=e,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(e){this._isStopped!==e&&(this._isStopped=e,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(e){this._isLocked!==e&&(this._isLocked=e,this.updateClassName())}get isSmooth(){return this.isScrolling===`smooth`}get className(){let e=`lenis`;return this.options.autoToggle&&(e+=` lenis-autoToggle`),this.isStopped&&(e+=` lenis-stopped`),this.isLocked&&(e+=` lenis-locked`),this.isScrolling&&(e+=` lenis-scrolling`),this.isScrolling===`smooth`&&(e+=` lenis-smooth`),e}updateClassName(){this.cleanUpClassName(),this.className.split(` `).forEach(e=>{this.rootElement.classList.add(e)})}cleanUpClassName(){for(let e of Array.from(this.rootElement.classList))(e===`lenis`||e.startsWith(`lenis-`))&&this.rootElement.classList.remove(e)}};globalThis.Lenis=p,globalThis.Lenis.prototype=p.prototype})();
;
window.addEventListener(
    "load",
    function () {

        /* =====================================================
           MOBILE — KEEP 100% NATIVE PHONE SCROLL

           NO LENIS TOUCH CONTROL.
           THIS PRESERVES:
           - PULL TO REFRESH
           - BROWSER BAR HIDE / SHOW
           - NORMAL VERTICAL TOUCH SCROLL
        ===================================================== */

        const mobile =
            window.matchMedia(
                "(max-width: 767px)"
            );


        if (mobile.matches) {

            /*
             * In case another Lenis instance was initialized
             * somewhere else before this script.
             */
            if (
                window.lenis &&
                typeof window.lenis.destroy === "function"
            ) {

                window.lenis.destroy();

            }


            window.lenis =
                null;


            return;

        }


        /* =====================================================
           SAFETY — PREVENT DUPLICATE LENIS INITIALIZATION
        ===================================================== */

        if (window.lenis) {
            return;
        }


        /* =====================================================
           CHECK LENIS LIBRARY
        ===================================================== */

        if (typeof Lenis === "undefined") {
            return;
        }


        /* =====================================================
           LENIS — DESKTOP ONLY
        ===================================================== */

        const lenis =
            new Lenis({

                lerp: 0.08,

                smoothWheel: true,

                wheelMultiplier: 0.9,

                syncTouch: false,

                anchors: true

            });


        /* =====================================================
           RAF LOOP
        ===================================================== */

        function raf(time) {

            lenis.raf(time);

            requestAnimationFrame(
                raf
            );

        }


        requestAnimationFrame(
            raf
        );


        /* =====================================================
           GLOBAL ACCESS
        ===================================================== */

        window.lenis =
            lenis;

    }
);;
(function () {

    function initMainLandmark() {

        /* =====================================================
           IF THE THEME / PAGE ALREADY HAS A REAL MAIN,
           DO NOT CREATE A SECOND MAIN LANDMARK.
        ===================================================== */

        if (document.querySelector("main")) {
            return;
        }


        /* =====================================================
           ELEMENTOR'S EXISTING PAGE WRAPPER
        ===================================================== */

        const pageContent =
            document.querySelector(
                '[data-elementor-type="wp-page"][data-elementor-post-type="page"]'
            );


        if (!pageContent) {
            return;
        }


        /* =====================================================
           CONNECT THE EXISTING THEME SKIP LINK
           href="#content"
        ===================================================== */

        if (!pageContent.id) {

            pageContent.id =
                "content";

        }


        /* =====================================================
           ACCESSIBLE MAIN LANDMARK
        ===================================================== */

        pageContent.setAttribute(
            "role",
            "main"
        );


        /*
         * Allows keyboard focus to move to the main content
         * without adding it to the normal Tab order.
         */
        pageContent.setAttribute(
            "tabindex",
            "-1"
        );


        /* =====================================================
           MAKE EXISTING SKIP LINK MOVE FOCUS AS WELL AS SCROLL
        ===================================================== */

        const skipLink =
            document.querySelector(
                'a.skip-link[href="#content"]'
            );


        if (skipLink) {

            skipLink.addEventListener(
                "click",
                function () {

                    window.requestAnimationFrame(
                        function () {

                            pageContent.focus(
                                {
                                    preventScroll: true
                                }
                            );

                        }
                    );

                }
            );

        }

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initMainLandmark,
            {
                once: true
            }
        );

    } else {

        initMainLandmark();

    }

})();