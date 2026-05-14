(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/useAnimations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnimations",
    ()=>useAnimations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
// marco-mini-mecanique — GLAMMBOX signature motion pass
// Source recipe checked against Fred AI School + GLAMMBOX core examples:
// - Lenis smooth scroll
// - GSAP fromTo only, not gsap.from flash states
// - clip-path heading reveals
// - horizontal signature image/text pairing
// - scroll-scrub parallax, no brightness/filter darkening
"use client";
;
function useAnimations(rootRef, _lang) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAnimations.useEffect": ()=>{
            const root = rootRef.current;
            if (!root) return;
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const isHeadless = typeof navigator !== "undefined" && navigator.webdriver === true || /HeadlessChrome|PhantomJS/i.test(typeof navigator !== "undefined" ? navigator.userAgent : "");
            if (reduced) {
                root.classList.add("motion-fallback");
                return;
            }
            let cleanup = {
                "useAnimations.useEffect.cleanup": ()=>{}
            }["useAnimations.useEffect.cleanup"];
            let mounted = true;
            ({
                "useAnimations.useEffect": async ()=>{
                    const [{ default: gsap }, ScrollTriggerMod, LenisMod] = await Promise.all([
                        __turbopack_context__.A("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/gsap/index.js [app-client] (ecmascript, async loader)"),
                        __turbopack_context__.A("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript, async loader)"),
                        __turbopack_context__.A("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/lenis/dist/lenis.mjs [app-client] (ecmascript, async loader)")
                    ]);
                    if (!mounted) return;
                    const ScrollTrigger = ScrollTriggerMod.ScrollTrigger ?? ScrollTriggerMod.default;
                    const Lenis = LenisMod.default ?? LenisMod.Lenis;
                    gsap.registerPlugin(ScrollTrigger);
                    let rafId = 0;
                    let lenis = null;
                    if (!isHeadless) {
                        lenis = new Lenis({
                            duration: 1.55,
                            smoothWheel: true,
                            wheelMultiplier: 0.85
                        });
                        const raf = {
                            "useAnimations.useEffect.raf": (time)=>{
                                lenis?.raf(time);
                                rafId = requestAnimationFrame(raf);
                            }
                        }["useAnimations.useEffect.raf"];
                        rafId = requestAnimationFrame(raf);
                        lenis.on("scroll", ScrollTrigger.update);
                    }
                    const ctx = gsap.context({
                        "useAnimations.useEffect.ctx": ()=>{
                            // Hero — same word reveal family as Fred/GLAMMBOX, slower and readable.
                            const heroWords = gsap.utils.toArray(".hero-title .word");
                            if (heroWords.length) {
                                gsap.fromTo(heroWords, {
                                    y: 58,
                                    opacity: 0,
                                    clipPath: "inset(35% 0 35% 0)"
                                }, {
                                    y: 0,
                                    opacity: 1,
                                    clipPath: "inset(0% 0 0% 0)",
                                    duration: 1.65,
                                    stagger: 0.18,
                                    ease: "power3.out"
                                });
                            }
                            gsap.fromTo(root.querySelectorAll(".hero .eyebrow, .hero-sub, .hero-cta"), {
                                y: 34,
                                opacity: 0
                            }, {
                                y: 0,
                                opacity: 1,
                                duration: 1.35,
                                stagger: 0.16,
                                delay: 0.35,
                                ease: "power3.out"
                            });
                            // GLAMMBOX section heading recipe: clip reveal, reversible on scroll.
                            gsap.utils.toArray(".section-title").forEach({
                                "useAnimations.useEffect.ctx": (heading)=>{
                                    gsap.fromTo(heading, {
                                        y: 28,
                                        opacity: 0,
                                        clipPath: "inset(0 0 18% 0)"
                                    }, {
                                        y: 0,
                                        opacity: 1,
                                        clipPath: "inset(0 0 0% 0)",
                                        duration: 1.25,
                                        ease: "power3.out",
                                        scrollTrigger: {
                                            trigger: heading,
                                            start: "top 82%",
                                            toggleActions: "play reverse play reverse"
                                        }
                                    });
                                }
                            }["useAnimations.useEffect.ctx"]);
                            gsap.utils.toArray(".eyebrow, .section-lead").forEach({
                                "useAnimations.useEffect.ctx": (el)=>{
                                    gsap.fromTo(el, {
                                        y: 34,
                                        opacity: 0
                                    }, {
                                        y: 0,
                                        opacity: 1,
                                        duration: 1.25,
                                        ease: "power3.out",
                                        scrollTrigger: {
                                            trigger: el,
                                            start: "top 86%",
                                            toggleActions: "play reverse play reverse"
                                        }
                                    });
                                }
                            }["useAnimations.useEffect.ctx"]);
                            // Signature horizontal pair: image left → final, text right → final.
                            // No brightness, no darkening, no flash.
                            [
                                {
                                    wrap: ".atelier-summary",
                                    image: ".atelier-summary-img",
                                    text: ".atelier-summary-copy"
                                },
                                {
                                    wrap: ".about-grid",
                                    image: ".about-photo",
                                    text: ".about-copy"
                                }
                            ].forEach({
                                "useAnimations.useEffect.ctx": ({ wrap, image, text })=>{
                                    const section = root.querySelector(wrap);
                                    const img = section?.querySelector(image);
                                    const copy = section?.querySelector(text);
                                    if (!section || !img || !copy) return;
                                    const tl = gsap.timeline({
                                        scrollTrigger: {
                                            trigger: section,
                                            start: "top 82%",
                                            end: "center center",
                                            scrub: 1.35,
                                            invalidateOnRefresh: true
                                        }
                                    });
                                    tl.fromTo(img, {
                                        xPercent: -18,
                                        y: 0,
                                        opacity: 0.96
                                    }, {
                                        xPercent: 0,
                                        y: 0,
                                        opacity: 1,
                                        ease: "none"
                                    }, 0).fromTo(copy, {
                                        xPercent: 18,
                                        y: 0,
                                        opacity: 0.96
                                    }, {
                                        xPercent: 0,
                                        y: 0,
                                        opacity: 1,
                                        ease: "none"
                                    }, 0);
                                }
                            }["useAnimations.useEffect.ctx"]);
                            gsap.utils.toArray(".atelier-service-list li, .featured-product-card, .brand-choice-card, .video-tile, .area-list li, .contact-card").forEach({
                                "useAnimations.useEffect.ctx": (el, i)=>{
                                    gsap.fromTo(el, {
                                        y: 42,
                                        opacity: 0
                                    }, {
                                        y: 0,
                                        opacity: 1,
                                        duration: 1.35,
                                        ease: "power3.out",
                                        delay: i % 8 * 0.035,
                                        scrollTrigger: {
                                            trigger: el,
                                            start: "top 88%",
                                            toggleActions: "play reverse play reverse"
                                        }
                                    });
                                }
                            }["useAnimations.useEffect.ctx"]);
                            // Product/media parallax: light horizontal drift only. Never darkens images.
                            gsap.utils.toArray(".featured-img, .product-img, .video-poster, .parts, .map-card").forEach({
                                "useAnimations.useEffect.ctx": (el, i)=>{
                                    gsap.fromTo(el, {
                                        xPercent: i % 2 ? 3 : -3
                                    }, {
                                        xPercent: i % 2 ? -3 : 3,
                                        ease: "none",
                                        scrollTrigger: {
                                            trigger: el,
                                            start: "top bottom",
                                            end: "bottom top",
                                            scrub: 1.8,
                                            invalidateOnRefresh: true
                                        }
                                    });
                                }
                            }["useAnimations.useEffect.ctx"]);
                            // Very soft decorative veil movement; slow, not flashy.
                            gsap.utils.toArray(".liquid-veil-a, .liquid-veil-b").forEach({
                                "useAnimations.useEffect.ctx": (el, i)=>{
                                    gsap.to(el, {
                                        xPercent: i ? 10 : -10,
                                        yPercent: i ? -6 : 6,
                                        rotate: i ? 7 : -7,
                                        ease: "none",
                                        scrollTrigger: {
                                            trigger: ".hero",
                                            start: "top top",
                                            end: "bottom top",
                                            scrub: 3.5
                                        }
                                    });
                                }
                            }["useAnimations.useEffect.ctx"]);
                            // Stat counters stay simple and readable.
                            root.querySelectorAll(".stat-num").forEach({
                                "useAnimations.useEffect.ctx": (el)=>{
                                    const target = Number(el.dataset.target || "0");
                                    if (isHeadless) {
                                        el.textContent = target.toLocaleString("fr-CA");
                                        return;
                                    }
                                    const obj = {
                                        v: 0
                                    };
                                    gsap.to(obj, {
                                        v: target,
                                        duration: 2.2,
                                        ease: "power2.out",
                                        scrollTrigger: {
                                            trigger: el,
                                            start: "top 90%",
                                            once: true
                                        },
                                        onUpdate: {
                                            "useAnimations.useEffect.ctx": ()=>{
                                                el.textContent = Math.round(obj.v).toLocaleString("fr-CA");
                                            }
                                        }["useAnimations.useEffect.ctx"]
                                    });
                                }
                            }["useAnimations.useEffect.ctx"]);
                        }
                    }["useAnimations.useEffect.ctx"], root);
                    if (document.fonts?.ready) {
                        document.fonts.ready.then({
                            "useAnimations.useEffect": ()=>ScrollTrigger.refresh()
                        }["useAnimations.useEffect"]);
                    }
                    cleanup = ({
                        "useAnimations.useEffect": ()=>{
                            ctx.revert();
                            ScrollTrigger.getAll().forEach({
                                "useAnimations.useEffect": (s)=>s.kill()
                            }["useAnimations.useEffect"]);
                            if (rafId) cancelAnimationFrame(rafId);
                            lenis?.destroy();
                        }
                    })["useAnimations.useEffect"];
                }
            })["useAnimations.useEffect"]().catch({
                "useAnimations.useEffect": ()=>{
                    root.classList.add("motion-fallback");
                }
            }["useAnimations.useEffect"]);
            return ({
                "useAnimations.useEffect": ()=>{
                    mounted = false;
                    cleanup();
                }
            })["useAnimations.useEffect"];
        }
    }["useAnimations.useEffect"], [
        rootRef
    ]);
}
_s(useAnimations, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx'\n\nUnexpected token. Did you mean `{'}'}` or `&rbrace;`?");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_openclaw_workspace_clients_marco-mini-mecanique_v1_0_build_0~51ap2._.js.map