module.exports = [
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/useAnimations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnimations",
    ()=>useAnimations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = rootRef.current;
        if (!root) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isHeadless = typeof navigator !== "undefined" && navigator.webdriver === true || /HeadlessChrome|PhantomJS/i.test(typeof navigator !== "undefined" ? navigator.userAgent : "");
        if (reduced) {
            root.classList.add("motion-fallback");
            return;
        }
        let cleanup = ()=>{};
        let mounted = true;
        (async ()=>{
            const [{ default: gsap }, ScrollTriggerMod, LenisMod] = await Promise.all([
                __turbopack_context__.A("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/gsap/index.js [app-ssr] (ecmascript, async loader)"),
                __turbopack_context__.A("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript, async loader)"),
                __turbopack_context__.A("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/lenis/dist/lenis.mjs [app-ssr] (ecmascript, async loader)")
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
                const raf = (time)=>{
                    lenis?.raf(time);
                    rafId = requestAnimationFrame(raf);
                };
                rafId = requestAnimationFrame(raf);
                lenis.on("scroll", ScrollTrigger.update);
            }
            const ctx = gsap.context(()=>{
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
                gsap.utils.toArray(".section-title").forEach((heading)=>{
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
                });
                gsap.utils.toArray(".eyebrow, .section-lead").forEach((el)=>{
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
                });
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
                ].forEach(({ wrap, image, text })=>{
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
                });
                gsap.utils.toArray(".atelier-service-list li, .featured-product-card, .brand-choice-card, .video-tile, .area-list li, .contact-card").forEach((el, i)=>{
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
                });
                // Product/media parallax: light horizontal drift only. Never darkens images.
                gsap.utils.toArray(".featured-img, .product-img, .video-poster, .parts, .map-card").forEach((el, i)=>{
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
                });
                // Very soft decorative veil movement; slow, not flashy.
                gsap.utils.toArray(".liquid-veil-a, .liquid-veil-b").forEach((el, i)=>{
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
                });
                // Stat counters stay simple and readable.
                root.querySelectorAll(".stat-num").forEach((el)=>{
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
                        onUpdate: ()=>{
                            el.textContent = Math.round(obj.v).toLocaleString("fr-CA");
                        }
                    });
                });
            }, root);
            if (document.fonts?.ready) {
                document.fonts.ready.then(()=>ScrollTrigger.refresh());
            }
            cleanup = ()=>{
                ctx.revert();
                ScrollTrigger.getAll().forEach((s)=>s.kill());
                if (rafId) cancelAnimationFrame(rafId);
                lenis?.destroy();
            };
        })().catch(()=>{
            root.classList.add("motion-fallback");
        });
        return ()=>{
            mounted = false;
            cleanup();
        };
    }, [
        rootRef
    ]);
}
}),
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx'\n\nUnexpected token. Did you mean `{'}'}` or `&rbrace;`?");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_openclaw_workspace_clients_marco-mini-mecanique_v1_0_build_098w7aa._.js.map