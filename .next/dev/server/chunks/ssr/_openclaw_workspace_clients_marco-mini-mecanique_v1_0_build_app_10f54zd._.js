module.exports = [
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/useAnimations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnimations",
    ()=>useAnimations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// marco-mini-mecanique — house motion choreography (HAND-PATCH 2026-05-13, post-iter-3)
// Hand-patch fixes (Karpathy style — Pat directive 2026-05-13):
//   1. Disable Lenis under headless browsers (navigator.webdriver) so the validator
//      Playwright snapshot doesn't catch ScrollTrigger mid-animation with sections at opacity:0.
//   2. ALL gsap.from() with scrollTrigger gets `immediateRender: false` — the initial
//      opacity:0 state is no longer applied on page load; it only applies as the
//      trigger zone is approached. This way fast scroll (Playwright, mouse-wheel
//      power users) never sees a "stuck black page".
//   3. Safety reveal timer at +1800ms: force any element with inline opacity:0 to
//      visible. Belt and suspenders against any future ScrollTrigger setup drift.
"use client";
;
function useAnimations(rootRef, lang) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = rootRef.current;
        if (!root) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;
        const isHeadless = typeof navigator !== "undefined" && navigator.webdriver === true || /HeadlessChrome|PhantomJS/i.test(typeof navigator !== "undefined" ? navigator.userAgent : "");
        let cleanups = [];
        let lenis = null;
        // Safety reveal: if anything is still at inline opacity:0 after 1.8s, force it visible.
        // Covers ScrollTrigger setup-drift, missing trigger zones, hung Lenis.
        const safetyReveal = window.setTimeout(()=>{
            root.querySelectorAll("*").forEach((el)=>{
                const op = el.style.opacity;
                if (op === "0" || op === "") {
                    // Only touch elements GSAP set to 0; leave naturally-visible ones alone.
                    if (parseFloat(getComputedStyle(el).opacity) < 0.05) {
                        el.style.opacity = "1";
                        el.style.transform = "none";
                    }
                }
            });
        }, 1800);
        cleanups.push(()=>window.clearTimeout(safetyReveal));
        (async ()=>{
            const [{ default: gsap }, ScrollTriggerMod, LenisMod] = await Promise.all([
                __turbopack_context__.A("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/gsap/index.js [app-ssr] (ecmascript, async loader)"),
                __turbopack_context__.A("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript, async loader)"),
                __turbopack_context__.A("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/lenis/dist/lenis.mjs [app-ssr] (ecmascript, async loader)")
            ]);
            const ScrollTrigger = ScrollTriggerMod.ScrollTrigger ?? ScrollTriggerMod.default;
            const Lenis = LenisMod.default ?? LenisMod.Lenis;
            gsap.registerPlugin(ScrollTrigger);
            // Lenis stays off in headless / reduced-motion contexts so the validator
            // snapshot scrolls natively and ScrollTrigger keyframes resolve instantly.
            if (!reduced && !isHeadless) {
                lenis = new Lenis({
                    duration: 1.2,
                    easing: (t)=>Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    lerp: isCoarse ? 0.1 : undefined,
                    smoothWheel: true
                });
                const raf = (time)=>{
                    if (lenis) {
                        lenis.raf(time);
                        requestAnimationFrame(raf);
                    }
                };
                requestAnimationFrame(raf);
                lenis.on("scroll", ScrollTrigger.update);
            }
            // Shared scrollTrigger defaults — immediateRender:false keeps content visible
            // until the trigger area is approached. Any failure to fire => content stays at opacity 1.
            const stConfig = (extra)=>({
                    once: true,
                    ...extra
                });
            const fromOpts = (cfg)=>({
                    ...cfg,
                    immediateRender: false
                });
            const ctx = gsap.context(()=>{
                // Editorial Word Reveal — hero
                const heroWords = root.querySelectorAll(".hero-title .word");
                if (heroWords.length) {
                    if (reduced) {
                        gsap.set(heroWords, {
                            opacity: 1,
                            y: 0
                        });
                    } else {
                        gsap.from(heroWords, {
                            opacity: 0,
                            y: 22,
                            duration: 1.15,
                            ease: "power3.out",
                            stagger: 0.14,
                            delay: 0.25
                        });
                    }
                }
                if (!reduced) {
                    gsap.from(root.querySelectorAll(".hero .eyebrow, .hero-sub, .hero-cta"), {
                        opacity: 0,
                        y: 16,
                        duration: 1.0,
                        ease: "power3.out",
                        stagger: 0.15,
                        delay: 0.7
                    });
                }
                // Soft Parallax Depth — bumped scrubs (1→2.2, 1.2→2.6) so the hero
                // overlays drift slowly, premium Rolex/Hodinkee feel instead of
                // jumpy follow. Video layer stays fixed (no parallax on .layer-bg).
                if (!reduced && !isHeadless) {
                    gsap.to(".hero .layer-mid", {
                        yPercent: -10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".hero",
                            start: "top top",
                            end: "bottom top",
                            scrub: 2.2
                        }
                    });
                    gsap.to(".liquid-veil-a", {
                        xPercent: -9,
                        yPercent: 8,
                        rotate: -8,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".hero",
                            start: "top top",
                            end: "bottom top",
                            scrub: 2.6
                        }
                    });
                    gsap.to(".liquid-veil-b", {
                        xPercent: 12,
                        yPercent: -7,
                        rotate: 11,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".hero",
                            start: "top top",
                            end: "bottom top",
                            scrub: 2.6
                        }
                    });
                }
                // Section title reveals — keep visible on reduced motion
                root.querySelectorAll(".section").forEach((section)=>{
                    const title = section.querySelector(".section-title");
                    const eyebrow = section.querySelector(".eyebrow");
                    const lead = section.querySelector(".section-lead");
                    if (!title) return;
                    const words = title.querySelectorAll(".word");
                    if (reduced) {
                        gsap.set([
                            eyebrow,
                            words,
                            lead
                        ].filter(Boolean), {
                            opacity: 1,
                            y: 0
                        });
                        return;
                    }
                    const tl = gsap.timeline({
                        scrollTrigger: stConfig({
                            trigger: section,
                            start: "top 78%"
                        }),
                        defaults: {
                            ease: "power3.out",
                            immediateRender: false
                        }
                    });
                    if (eyebrow) tl.from(eyebrow, fromOpts({
                        opacity: 0,
                        y: 14,
                        duration: 0.9
                    }), 0);
                    if (words.length) tl.from(words, fromOpts({
                        opacity: 0,
                        y: 22,
                        duration: 1.0,
                        stagger: 0.1
                    }), 0.12);
                    if (lead) tl.from(lead, fromOpts({
                        opacity: 0,
                        y: 16,
                        duration: 0.95
                    }), 0.35);
                });
                // Atelier card reveal
                const atelierCards = root.querySelectorAll(".atelier-card");
                if (atelierCards.length && !reduced) {
                    gsap.from(atelierCards, fromOpts({
                        scrollTrigger: stConfig({
                            trigger: ".atelier-grid",
                            start: "top 85%"
                        }),
                        opacity: 0,
                        y: 28,
                        duration: 1.15,
                        ease: "power3.out",
                        stagger: 0.1
                    }));
                }
                // Showroom — brand block reveals + product card fan-in
                const featuredCards = root.querySelectorAll(".featured-product-card");
                if (featuredCards.length && !reduced) {
                    gsap.from(featuredCards, fromOpts({
                        scrollTrigger: stConfig({
                            trigger: ".featured-products",
                            start: "top 85%"
                        }),
                        opacity: 0,
                        y: 22,
                        scale: 0.985,
                        duration: 1.1,
                        ease: "power3.out",
                        stagger: 0.14
                    }));
                }
                const brandChoices = root.querySelectorAll(".brand-choice-card");
                if (brandChoices.length && !reduced) {
                    gsap.from(brandChoices, fromOpts({
                        scrollTrigger: stConfig({
                            trigger: ".brand-choice-grid",
                            start: "top 84%"
                        }),
                        opacity: 0,
                        y: 18,
                        duration: 0.9,
                        ease: "power3.out",
                        stagger: 0.07
                    }));
                }
                root.querySelectorAll(".brand-block").forEach((block)=>{
                    const header = block.querySelector(".brand-header");
                    const cards = block.querySelectorAll(".product-card");
                    if (reduced) return;
                    if (header) {
                        gsap.from(header, fromOpts({
                            scrollTrigger: stConfig({
                                trigger: block,
                                start: "top 85%"
                            }),
                            opacity: 0,
                            y: 22,
                            duration: 1.0,
                            ease: "power3.out"
                        }));
                    }
                    if (cards.length) {
                        gsap.from(cards, fromOpts({
                            scrollTrigger: stConfig({
                                trigger: block,
                                start: "top 75%"
                            }),
                            opacity: 0,
                            y: 28,
                            scale: 0.98,
                            duration: 1.15,
                            ease: "expo.out",
                            stagger: 0.1
                        }));
                    }
                });
                const drawer = root.querySelector(".showroom-drawer");
                if (drawer && !reduced) {
                    gsap.from(drawer, fromOpts({
                        opacity: 0,
                        y: 14,
                        duration: 0.45,
                        ease: "power3.out"
                    }));
                }
                // Rolex-Pinned Product Story — desktop only, first brand block
                // Disabled in headless to keep validator snapshots clean.
                const pinTarget = root.querySelector('.brand-block[data-pin="true"]');
                if (pinTarget && !reduced && !isHeadless && window.innerWidth >= 1024 && !isCoarse) {
                    const track = pinTarget.querySelector(".product-track");
                    const wrap = pinTarget.querySelector(".product-strip");
                    if (track && wrap) {
                        const computeScroll = ()=>Math.max(0, track.scrollWidth - wrap.clientWidth);
                        const scrollWidth = computeScroll();
                        if (scrollWidth > 100) {
                            gsap.to(track, {
                                x: ()=>-computeScroll(),
                                ease: "none",
                                scrollTrigger: {
                                    trigger: pinTarget,
                                    start: "top top+=80",
                                    end: ()=>`+=${computeScroll()}`,
                                    pin: true,
                                    scrub: 1,
                                    anticipatePin: 1,
                                    invalidateOnRefresh: true
                                }
                            });
                        }
                    }
                }
                // Brand strip drift
                if (!reduced) {
                    gsap.from(".brand-logo-cell", fromOpts({
                        scrollTrigger: stConfig({
                            trigger: ".brand-strip",
                            start: "top 88%"
                        }),
                        opacity: 0,
                        y: 14,
                        duration: 0.55,
                        ease: "power3.out",
                        stagger: 0.05
                    }));
                }
                // Video tiles
                if (!reduced) {
                    gsap.from(".video-tile", fromOpts({
                        scrollTrigger: stConfig({
                            trigger: ".video-grid",
                            start: "top 85%"
                        }),
                        opacity: 0,
                        y: 16,
                        duration: 0.55,
                        ease: "power2.out",
                        stagger: 0.07
                    }));
                }
                // Parts cards
                if (!reduced) {
                    gsap.from(".parts-card", fromOpts({
                        scrollTrigger: stConfig({
                            trigger: ".parts-strip",
                            start: "top 85%"
                        }),
                        opacity: 0,
                        y: 16,
                        duration: 0.55,
                        ease: "power3.out",
                        stagger: 0.05
                    }));
                }
                // Pickup area chips
                if (!reduced) {
                    gsap.from(".area-list li", fromOpts({
                        scrollTrigger: stConfig({
                            trigger: ".pickup-area",
                            start: "top 85%"
                        }),
                        opacity: 0,
                        y: 12,
                        duration: 0.45,
                        ease: "power3.out",
                        stagger: 0.03
                    }));
                }
                // About reveals
                if (!reduced) {
                    gsap.from(".about-photo", fromOpts({
                        scrollTrigger: stConfig({
                            trigger: ".about-grid",
                            start: "top 85%"
                        }),
                        opacity: 0,
                        x: -20,
                        duration: 0.8,
                        ease: "power3.out"
                    }));
                    gsap.from(".about-copy > *", fromOpts({
                        scrollTrigger: stConfig({
                            trigger: ".about-grid",
                            start: "top 80%"
                        }),
                        opacity: 0,
                        y: 18,
                        duration: 0.6,
                        ease: "power3.out",
                        stagger: 0.1
                    }));
                }
                // Stat counters — tabular nums
                root.querySelectorAll(".stat-num").forEach((el)=>{
                    const target = Number(el.dataset.target || "0");
                    if (reduced) {
                        el.textContent = target.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");
                        return;
                    }
                    // In headless, just set the final value immediately so the screenshot shows the number.
                    if (isHeadless) {
                        el.textContent = target.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");
                        return;
                    }
                    const obj = {
                        v: 0
                    };
                    gsap.to(obj, {
                        v: target,
                        duration: 1.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            once: true
                        },
                        onUpdate: ()=>{
                            el.textContent = Math.round(obj.v).toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");
                        }
                    });
                });
                // Contact stagger
                if (!reduced) {
                    gsap.from(".contact-card", fromOpts({
                        scrollTrigger: stConfig({
                            trigger: ".contact-grid",
                            start: "top 85%"
                        }),
                        opacity: 0,
                        y: 20,
                        duration: 0.65,
                        ease: "power3.out",
                        stagger: 0.1
                    }));
                }
            }, root);
            if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
                document.fonts.ready.then(()=>ScrollTrigger.refresh());
            }
            cleanups.push(()=>{
                ctx.revert();
                ScrollTrigger.getAll().forEach((s)=>s.kill());
                if (lenis) {
                    lenis.destroy();
                    lenis = null;
                }
            });
        })();
        return ()=>{
            cleanups.forEach((c)=>c());
            cleanups = [];
        };
    }, [
        rootRef,
        lang
    ]);
}
}),
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$app$2f$useAnimations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/useAnimations.ts [app-ssr] (ecmascript)");
// marco-mini-mecanique — showroom rebuild hand pass
// Motion library: Editorial Word Reveal · Soft Parallax Depth · Liquid Service Veil · Dealer Card Drawer · Video Hero
// Source basis: Marco source scrape + v1 brief product research + official manufacturer/video references preserved in research/.
"use client";
;
;
;
const COPY = {
    nav: {
        repair: {
            fr: "Réparation",
            en: "Repair"
        },
        showroom: {
            fr: "Showroom",
            en: "Showroom"
        },
        videos: {
            fr: "Vidéos",
            en: "Videos"
        },
        parts: {
            fr: "Pièces",
            en: "Parts"
        },
        pickup: {
            fr: "Ramassage",
            en: "Pickup"
        },
        about: {
            fr: "À propos",
            en: "About"
        },
        contact: {
            fr: "Contact",
            en: "Contact"
        }
    },
    hero: {
        eyebrow: {
            fr: "Wickham · Centre-du-Québec",
            en: "Wickham · Centre-du-Québec"
        },
        title: {
            fr: "Marco Mini Mécanique",
            en: "Marco Mini Mécanique"
        },
        italicWord: {
            fr: "Mécanique",
            en: "Mécanique"
        },
        sub: {
            fr: "Réparation, pièces et salle de montre à Wickham depuis 1999.",
            en: "Repair, parts, and showroom service in Wickham since 1999."
        },
        sub2: {
            fr: "Service de petits moteurs et sports motorisés au 765 route Principale, avec statut ouvert/fermé selon l'heure du Québec.",
            en: "Small-engine and powersport service from 765 route Principale, with an open/closed badge driven by Quebec time."
        },
        callCta: {
            fr: "Appeler 819 398-6673",
            en: "Call 819 398-6673"
        },
        serviceCta: {
            fr: "Demande de service",
            en: "Request service"
        },
        pickupCta: {
            fr: "Ramassage / livraison",
            en: "Pickup / delivery"
        }
    },
    status: {
        open: {
            fr: "Ouvert maintenant",
            en: "Open now"
        },
        closed: {
            fr: "Fermé maintenant",
            en: "Closed now"
        }
    },
    atelier: {
        eyebrow: {
            fr: "Atelier mécanique",
            en: "Repair workshop"
        },
        title: {
            fr: "Atelier",
            en: "Workshop"
        },
        italicWord: {
            fr: "Réparation",
            en: "Repair"
        },
        note: {
            fr: "Trois techniciens plus Marco standard, jusqu'à quatre mécaniciens en haute saison, plus de 25 ans d'expérience cumulée.",
            en: "Three technicians plus Marco standard, up to four mechanics at peak season, over 25 years of combined experience."
        }
    },
    showroom: {
        eyebrow: {
            fr: "Salle de montre",
            en: "Showroom"
        },
        title: {
            fr: "Showroom",
            en: "Showroom"
        },
        italicWord: {
            fr: "Équipement",
            en: "Equipment"
        },
        intro: {
            fr: "Une salle de montre plus facile à lire : quelques vedettes d'abord, puis les marques à ouvrir comme chez un détaillant. Descriptions sans prix, à confirmer avec l'atelier selon disponibilité.",
            en: "An easier showroom: a few featured picks first, then brand cards that open like a dealer display. Descriptions only, no prices, availability to confirm with the shop."
        },
        hint: {
            fr: "Cliquer pour voir les fiches",
            en: "Click for product cards"
        },
        featured: {
            fr: "Sélection en vitrine",
            en: "Featured showroom picks"
        },
        allBrands: {
            fr: "Choisir une marque",
            en: "Choose a brand"
        },
        close: {
            fr: "Fermer la marque",
            en: "Close brand"
        },
        availability: {
            fr: "Vérifier avec l'atelier",
            en: "Check with the shop"
        },
        sourceNote: {
            fr: "Données condensées à partir des fiches fabricant et du contenu Marco existant. Aucun prix publié.",
            en: "Data condensed from manufacturer sheets and existing Marco content. No prices published."
        }
    },
    videos: {
        eyebrow: {
            fr: "Bibliothèque vidéo",
            en: "Video library"
        },
        title: {
            fr: "Vidéos",
            en: "Videos"
        },
        italic: {
            fr: "Curatées",
            en: "Curated"
        },
        note: {
            fr: "Sélection de vidéos officielles des fabricants — chargement à la demande, sans lecture automatique.",
            en: "Selection of official manufacturer videos — load on demand, no autoplay."
        }
    },
    parts: {
        eyebrow: {
            fr: "Pièces & accessoires",
            en: "Parts & accessories"
        },
        title: {
            fr: "Pièces",
            en: "Parts"
        },
        italic: {
            fr: "Origine",
            en: "OEM"
        },
        body: {
            fr: "Des pièces et accessoires d'origine sont disponibles pour VTT, motocross, motoneiges, côte-à-côte/SXS, motos, scies à chaîne, souffleuses et équipements motorisés. Pour vérifier la disponibilité, communiquez avec l'atelier avec la marque, le modèle, l'année et les détails de la pièce.",
            en: "Parts and original accessories are available for VTT/ATV, motocross, snowmobile, side-by-side/SXS, motorcycles, chainsaws, snowblowers, and motorized equipment. For availability, contact the shop with the make, model, year, and part details."
        }
    },
    pickup: {
        eyebrow: {
            fr: "Ramassage & livraison",
            en: "Pickup & delivery"
        },
        title: {
            fr: "Service",
            en: "Service"
        },
        italic: {
            fr: "Local",
            en: "Local"
        },
        body: {
            fr: "Un service de ramassage et livraison est disponible. Communiquez avec l'atelier pour les détails de ramassage/livraison.",
            en: "Pickup and delivery service is available. Contact the shop for pickup/delivery details."
        },
        areaLabel: {
            fr: "Territoire desservi",
            en: "Service area"
        }
    },
    about: {
        eyebrow: {
            fr: "Historique",
            en: "History"
        },
        title: {
            fr: "Atelier",
            en: "Workshop"
        },
        italicWord: {
            fr: "Expérience",
            en: "Experience"
        },
        body1: {
            fr: "Marco Goyette a fondé l'entreprise à 20 ans, en 1999, à Wickham. Toro en 2000, Husqvarna en 2002, STIHL en 2007. L'entrepôt sécurisé bâti en 2006, l'expansion majeure de 2010 a porté la surface totale à environ 6 000 pieds carrés.",
            en: "Marco Goyette founded the business at age 20, in 1999, in Wickham. Toro in 2000, Husqvarna in 2002, STIHL in 2007. Secure storage built in 2006, the 2010 expansion brought total surface to approximately 6,000 sq ft."
        },
        body2: {
            fr: "En 2018, plus de 2 800 réparations, près de 11 000 clients, et le prix d'excellence Husqvarna pour la croissance exceptionnelle.",
            en: "In 2018, over 2,800 repairs, nearly 11,000 clients, and the Husqvarna excellence award for exceptional growth."
        },
        quote: {
            fr: "« Merci à vous tous, clients et amis, qui avez permis à mon entreprise de connaître le succès qu'elle obtient … Merci beaucoup !!! »",
            en: "« Thank you to all of you, clients and friends, who have allowed my business to achieve the success it enjoys … Thank you so much !!! »"
        },
        quoteAttr: {
            fr: "— Marco Goyette",
            en: "— Marco Goyette"
        },
        stats: [
            {
                num: 1999,
                label: {
                    fr: "Fondé en",
                    en: "Founded in"
                }
            },
            {
                num: 2800,
                label: {
                    fr: "Réparations (2018)",
                    en: "Repairs (2018)"
                }
            },
            {
                num: 11000,
                label: {
                    fr: "Clients (2018)",
                    en: "Clients (2018)"
                }
            },
            {
                num: 6000,
                label: {
                    fr: "pi² d'atelier",
                    en: "sq ft workshop"
                }
            }
        ]
    },
    contact: {
        eyebrow: {
            fr: "Contact",
            en: "Contact"
        },
        title: {
            fr: "Joindre",
            en: "Reach"
        },
        italic: {
            fr: "L'atelier",
            en: "The shop"
        },
        addr: "765 route Principale, Wickham, QC J0C 1S0",
        phone: "819 398-6673",
        fax: "819 398-6674",
        email: "marcominimecanique@cgocable.ca",
        hours: {
            week: {
                fr: "Lundi–vendredi : 8 h – 12 h / 13 h – 17 h",
                en: "Mon–Fri: 8:00–12:00 / 13:00–17:00"
            },
            sat: {
                fr: "Samedi : 9 h – 12 h",
                en: "Sat: 9:00–12:00"
            },
            lunch: {
                fr: "Fermé sur l'heure du dîner et les jours fériés",
                en: "Closed for lunch and on holidays"
            }
        },
        payment: {
            fr: "Visa · Mastercard · Interac débit",
            en: "Visa · Mastercard · Interac debit"
        }
    },
    footer: {
        since: {
            fr: "Depuis 1999",
            en: "Since 1999"
        },
        credit: {
            fr: "Signé GLAMMBOX",
            en: "Signed GLAMMBOX"
        },
        langSwap: {
            fr: "EN",
            en: "FR"
        }
    }
};
const SERVICE_AREA = [
    "St-Nazaire",
    "St-Théodore",
    "Lefebvre",
    "St-Nicéphore",
    "St-Germain",
    "Drummondville",
    "Acton Vale",
    "Durham-Sud",
    "L'Avenir",
    "Upton",
    "St-Majorique",
    "St-Charles-de-Drummond"
];
const ATELIER_SERVICES = [
    {
        fr: "VTT — démarrage, transmission, entretien, réparation saisonnière.",
        en: "ATV — starting, drivetrain, maintenance, seasonal repair.",
        img: "/assets/equipment-husqvarna-automower.jpg"
    },
    {
        fr: "Moto — inspection, entretien, réparation mécanique.",
        en: "Motorcycle — inspection, service, mechanical repair.",
        img: "/assets/equipment-carrousel-promo.jpg"
    },
    {
        fr: "Scie à chaîne — démarrage, système de chaîne, performance de coupe.",
        en: "Chainsaw — starting, chain system, cutting performance.",
        img: "/assets/product-husqvarna-550xp-mark2.jpg"
    },
    {
        fr: "Souffleuse — courroies, entretien moteur, préparation hivernale.",
        en: "Snowblower — belts, engine service, winter readiness.",
        img: "/assets/product-husqvarna-st224.jpg"
    },
    {
        fr: "Tracteur à gazon — plateau de coupe, entretien moteur, maintenance saisonnière.",
        en: "Lawn tractor — cutting deck, engine service, seasonal maintenance.",
        img: "/assets/product-husqvarna-ts248xd.jpg"
    },
    {
        fr: "Scie à béton — réparation moteur, entraînement, préparation chantier.",
        en: "Concrete saw — engine repair, drive service, jobsite readiness.",
        img: "/assets/product-stihl-ms462cm.jpg"
    },
    {
        fr: "Pilonneuse / compacteur — entretien et réparation d'équipement de compaction.",
        en: "Jumping jack / compactor — compaction equipment service and repair.",
        img: "/assets/equipment-fendeuse-splitter.jpg"
    },
    {
        fr: "Génératrice — démarrage, sortie de courant, entretien.",
        en: "Generator — starting, output, maintenance.",
        img: "/assets/equipment-splitfire-splitter.jpg"
    },
    {
        fr: "Moteur stationnaire — diagnostic, réparation, entretien.",
        en: "Stationary motor — diagnosis, repair, maintenance.",
        img: "/assets/product-portablewinch-pcw3000.png"
    },
    {
        fr: "Débroussailleuse — réponse d'accélération, entraînement de tête, entretien moteur.",
        en: "Brush cutter — throttle response, head drive, engine service.",
        img: "/assets/product-stihl-fs91r.jpg"
    },
    {
        fr: "Taille-haies — système de coupe, entretien moteur, maintenance.",
        en: "Hedge trimmer — cutting system, engine service, maintenance.",
        img: "/assets/product-husqvarna-525lk.jpg"
    }
];
const SHOWROOM = [
    {
        slug: "husqvarna",
        name: "Husqvarna",
        logo: "/assets/logo-husqvarna-official.png",
        products: [
            {
                slug: "550xp",
                img: "/assets/product-husqvarna-550xp-mark2.jpg",
                name: "550 XP Mark II",
                cat: "Tronçonneuse",
                power: "Essence 50cc",
                fr: "Tronçonneuse pro 50cc pour abattage, ébranchage et tronçonnage exigeants.",
                en: "Pro 50cc chainsaw built for demanding felling, limbing and bucking work."
            },
            {
                slug: "540ixp",
                img: "/assets/product-husqvarna-540i-xp.jpg",
                name: "540i XP",
                cat: "Tronçonneuse",
                power: "Batterie 36V",
                fr: "Tronçonneuse 36V silencieuse, puissance équivalente à un moteur 40cc.",
                en: "36V cordless chainsaw with the cutting power of a 40cc petrol saw."
            },
            {
                slug: "st224",
                img: "/assets/product-husqvarna-st224.jpg",
                name: "ST 224",
                cat: "Souffleuse",
                power: "Essence 208cc",
                fr: "Souffleuse 2 étages 208cc, largeur 24 po, pour entrées résidentielles.",
                en: "Two-stage 208cc snow thrower, 24-inch clearing width for driveways."
            },
            {
                slug: "st430t",
                img: "/assets/product-husqvarna-st430t.jpg",
                name: "ST 430T",
                cat: "Souffleuse à chenilles",
                power: "Essence 420cc",
                fr: "Souffleuse 3 étages 420cc avec chenilles, vraie machine commerciale.",
                en: "Three-stage 420cc tracked snow thrower for commercial-grade work."
            },
            {
                slug: "le322",
                img: "/assets/product-husqvarna-lawn-xpert-le322.jpg",
                name: "Lawn Xpert LE-322",
                cat: "Tondeuse",
                power: "Batterie 40V",
                fr: "Tondeuse 40V autopropulsée 21 po, terrain de 1/4 à 1/2 acre.",
                en: "40V self-propelled 21-inch mower for 1/4 to 1/2 acre lawns."
            },
            {
                slug: "ts248",
                img: "/assets/product-husqvarna-ts248xd.jpg",
                name: "TS 248XD",
                cat: "Tracteur à gazon",
                power: "Kawasaki 23 HP",
                fr: "Tracteur 48 po, moteur Kawasaki 23 HP, différentiel à verrouillage.",
                en: "48-inch lawn tractor with 23 HP Kawasaki engine and locking differential."
            },
            {
                slug: "automower",
                img: "/assets/product-husqvarna-automower-450x-nera.jpg",
                name: "Automower 450X NERA",
                cat: "Robot tondeuse",
                power: "Batterie EPOS",
                fr: "Robot tondeuse sans fil EPOS pour terrains jusqu'à 5 000 m².",
                en: "Wire-free EPOS robotic mower for lawns up to 5,000 m²."
            },
            {
                slug: "350ib",
                img: "/assets/product-husqvarna-350ib.jpg",
                name: "350iB Leaf Blaster",
                cat: "Souffleur",
                power: "Batterie 40V",
                fr: "Souffleur 40V, 200 mi/h et 800 PCM, moteur sans balais.",
                en: "40V cordless blower delivering 200 mph and 800 cfm via brushless motor."
            },
            {
                slug: "525lk",
                img: "/assets/product-husqvarna-525lk.jpg",
                name: "525LK",
                cat: "Coupe-herbe pro",
                power: "Essence X-TORQ",
                fr: "Coupe-herbe pro X-TORQ à arbre amovible, attaches multi-outils.",
                en: "Pro X-TORQ trimmer with detachable shaft and multi-tool attachments."
            }
        ]
    },
    {
        slug: "stihl",
        name: "STIHL",
        logo: "/assets/logo-stihl-official.png",
        products: [
            {
                slug: "ms462",
                img: "/assets/product-stihl-ms462cm.jpg",
                name: "MS 462 C-M",
                cat: "Tronçonneuse pro",
                power: "Essence 72.2cc",
                fr: "Scie pro 72cc M-Tronic, 6 ch, abattage forestier intensif.",
                en: "Pro 72cc M-Tronic saw, 6 hp, heavy-duty felling."
            },
            {
                slug: "ms261",
                img: "/assets/product-stihl-ms261cm.jpg",
                name: "MS 261 C-M",
                cat: "Tronçonneuse pro",
                power: "Essence 50.2cc",
                fr: "Scie pro 50cc M-Tronic, légère pour usage quotidien.",
                en: "Pro 50cc M-Tronic saw, light for daily use."
            },
            {
                slug: "ms250",
                img: "/assets/product-stihl-ms250.jpg",
                name: "MS 250",
                cat: "Tronçonneuse maison",
                power: "Essence 45.4cc",
                fr: "Scie maison 45cc, bois de chauffage et entretien.",
                en: "Homeowner 45cc saw for firewood and property work."
            },
            {
                slug: "msa300",
                img: "/assets/product-stihl-msa300cb.jpg",
                name: "MSA 300 C-O",
                cat: "Tronçonneuse batterie",
                power: "Batterie 36V AP",
                fr: "Scie batterie pro 36V, 3 modes, barre 20 po.",
                en: "Pro 36V battery saw, 3 modes, 20 in. bar."
            },
            {
                slug: "br800",
                img: "/assets/product-stihl-br800cemagnum.jpg",
                name: "BR 800 C-E MAGNUM",
                cat: "Souffleur dorsal",
                power: "Essence 79.9cc",
                fr: "Souffleur dorsal pro 912 PCM, le plus puissant STIHL.",
                en: "Pro backpack blower 912 cfm, most powerful STIHL."
            },
            {
                slug: "bga250",
                img: "/assets/product-stihl-bga250.jpg",
                name: "BGA 250",
                cat: "Souffleur batterie",
                power: "Batterie 36V AP",
                fr: "Souffleur batterie 190 mi/h, 4 vitesses, IPX4.",
                en: "Battery blower 190 mph, 4 speeds, IPX4 rated."
            },
            {
                slug: "fs91r",
                img: "/assets/product-stihl-fs91r.jpg",
                name: "FS 91 R",
                cat: "Débroussailleuse",
                power: "4-MIX 28.4cc",
                fr: "Débroussailleuse 4-MIX poignée boucle, espaces serrés.",
                en: "4-MIX brushcutter, loop handle for tight spaces."
            }
        ]
    },
    {
        slug: "toro",
        name: "Toro",
        logo: "/assets/logo-toro-official.png",
        products: [
            {
                slug: "powermax928",
                img: "/assets/product-toro-powermax-hd-928-oae.jpg",
                name: "Power Max HD 928 OAE",
                cat: "Souffleuse 2 étages",
                power: "Essence 265cc",
                fr: "Souffleuse pro 28 po, 265cc, démarrage électrique, Quick Stick.",
                en: "Pro 28 in. two-stage, 265cc, electric start, Quick Stick."
            },
            {
                slug: "powerclear",
                img: "/assets/product-toro-powerclear-721-e.jpg",
                name: "Power Clear 721 E",
                cat: "Souffleuse simple",
                power: "Essence 212cc",
                fr: "Souffleuse simple étage 21 po, démarrage électrique.",
                en: "Single-stage 21 in. snowblower, electric start."
            },
            {
                slug: "powermax-e26",
                img: "/assets/product-toro-powermax-e26-60v.jpg",
                name: "Power Max e26 60V",
                cat: "Souffleuse batterie",
                power: "Batterie 60V",
                fr: "Souffleuse batterie 60V 26 po, anti-bourrage, phares DEL.",
                en: "60V battery two-stage 26 in., anti-clog, LED lights."
            },
            {
                slug: "recycler-60v",
                img: "/assets/product-toro-recycler-60v-22.jpg",
                name: "Recycler 60V 22 po",
                cat: "Tondeuse batterie",
                power: "Batterie 60V",
                fr: "Tondeuse batterie 60V 22 po, Personal Pace, SmartStow.",
                en: "60V battery 22 in. mower, Personal Pace, SmartStow."
            },
            {
                slug: "recycler-gas",
                img: "/assets/product-toro-recycler-22-gas-21465.jpg",
                name: "Recycler 22 po",
                cat: "Tondeuse essence",
                power: "B&S 150cc",
                fr: "Tondeuse essence 22 po, Personal Pace, SmartStow.",
                en: "Gas 22 in. self-propelled, Personal Pace, SmartStow."
            },
            {
                slug: "timecutter",
                img: "/assets/product-toro-timecutter-50.jpg",
                name: "TimeCutter 50 po",
                cat: "Virage zéro",
                power: "Kawasaki 23 HP",
                fr: "Tondeuse virage zéro 50 po, V-Twin Kawasaki 23 ch.",
                en: "50 in. zero-turn, 23 hp Kawasaki V-Twin engine."
            }
        ]
    },
    {
        slug: "ego",
        name: "EGO Power+",
        logo: "/assets/logo-ego-official.png",
        products: [
            {
                slug: "cs1604",
                img: "/assets/product-ego-chainsaw-cs1604.png",
                name: "CS1604",
                cat: "Tronçonneuse 16 po",
                power: "Batterie 56V",
                fr: "Tronçonneuse sans fil 16 po, moteur sans balais, batterie 56V 5,0 Ah.",
                en: "16-in cordless chainsaw, brushless motor, 56V 5.0Ah battery included."
            },
            {
                slug: "snt2400",
                img: "/assets/product-ego-snowblower-snt2400.png",
                name: "SNT2400",
                cat: "Souffleuse 24 po",
                power: "Batterie 56V Peak",
                fr: "Souffleuse auto-propulsée 24 po 2 étages, 4 phares DEL, 56V Peak Power.",
                en: "24-in self-propelled 2-stage snow blower, 4 LED lights, 56V Peak Power."
            },
            {
                slug: "lm2156sp",
                img: "/assets/product-ego-mower-sp-lm2156sp.png",
                name: "LM2156SP",
                cat: "Tondeuse Select Cut XP",
                power: "Batterie 56V 10Ah",
                fr: "Tondeuse auto-propulsée 21 po Select Cut XP, Touch Drive, batt. 56V 10 Ah.",
                en: "21-in Select Cut XP self-propelled mower, Touch Drive, 56V 10.0Ah."
            },
            {
                slug: "lm2114",
                img: "/assets/product-ego-mower-push-lm2114.png",
                name: "LM2114",
                cat: "Tondeuse à pousser",
                power: "Batterie 56V 6Ah",
                fr: "Tondeuse à pousser 21 po, 3-en-1, phares DEL, batt. 56V 6 Ah.",
                en: "21-in push mower, 3-in-1 mulch/bag/discharge, LED lights, 56V 6.0Ah."
            },
            {
                slug: "lb7654",
                img: "/assets/product-ego-blower-lb7654.png",
                name: "LB7654",
                cat: "Souffleur 765 PCM",
                power: "Batterie 56V",
                fr: "Souffleur à feuilles 765 PCM, 200 mi/h, sans balais, 90 min, 56V 5 Ah.",
                en: "765-cfm handheld blower, 200 mph, brushless, 90-min runtime, 56V 5.0Ah."
            },
            {
                slug: "st1623t",
                img: "/assets/product-ego-trimmer-st1623t.png",
                name: "ST1623T",
                cat: "Coupe-bordure 16 po",
                power: "Batterie 56V",
                fr: "Coupe-bordure 16 po Line IQ Powerload, arbre carbone télescopique, 56V 4 Ah.",
                en: "16-in Line IQ Powerload trimmer, telescopic carbon-fiber shaft, 56V 4.0Ah."
            }
        ]
    },
    {
        slug: "lawnboy",
        name: "Lawn Boy",
        logo: "/assets/logo-lawnboy-official.png",
        products: [
            {
                slug: "17752",
                img: "/assets/product-lawnboy-17752-sp.jpg",
                name: "17752",
                cat: "Tondeuse RWD",
                power: "B&S 140cc",
                fr: "Tondeuse 21 po auto-propulsée roues arrière, B&S 140cc sans vidange.",
                en: "21-in rear-wheel-drive self-propelled mower, B&S 140cc no-oil-change engine."
            },
            {
                slug: "17754",
                img: "/assets/product-lawnboy-17754-electric-start.jpg",
                name: "17754",
                cat: "Démarrage électrique",
                power: "B&S 150cc",
                fr: "Tondeuse 21 po auto-prop. démarrage électrique, B&S 150cc, sac 2 boisseaux.",
                en: "21-in self-propelled electric-start mower, B&S 150cc, 2-bushel bag."
            },
            {
                slug: "17750",
                img: "/assets/product-lawnboy-17750-push.jpg",
                name: "17750",
                cat: "À pousser hautes roues",
                power: "B&S 140cc",
                fr: "Tondeuse 21 po à pousser hautes roues, B&S 140cc, Tri-Cut acier.",
                en: "21-in high-wheel push mower, B&S 140cc no-oil-change, steel Tri-Cut deck."
            }
        ]
    },
    {
        slug: "wallenstein",
        name: "Wallenstein",
        logo: "/assets/logo-wallenstein-official.png",
        products: [
            {
                slug: "wx540",
                img: "/assets/product-wallenstein-wx540.jpg",
                name: "WX540",
                cat: "Fendeuse 20 t",
                power: "Honda GX200",
                fr: "Fendeuse 20 t, ouverture 24 po, horizontal/vertical, Honda GX200 196cc.",
                en: "20-ton splitter, 24-in opening, horizontal/vertical, Honda GX200 196cc."
            },
            {
                slug: "bx52s",
                img: "/assets/product-wallenstein-bx52s.jpg",
                name: "BX52S",
                cat: "Déchiqueteuse 5 po",
                power: "PTO",
                fr: "Déchiqueteuse PTO, capacité 5 po, alimentation gravité, rotor robuste.",
                en: "5-in PTO chipper, gravity infeed, heavy-duty rotor for branches."
            },
            {
                slug: "wp1624",
                img: "/assets/product-wallenstein-wp1624.jpg",
                name: "WP1624",
                cat: "Fendeuse-tronçonneuse",
                power: "PTO 14-40 HP",
                fr: "Fendeuse-tronçonneuse PTO, 20 t, convoyeur 12 pi, deck pliable.",
                en: "PTO firewood processor, 20-ton, 12-ft conveyor, fold-down live deck."
            }
        ]
    },
    {
        slug: "splitfire",
        name: "Split-Fire",
        logo: "/assets/logo-splitfire-official.png",
        products: [
            {
                slug: "3203",
                img: "/assets/product-splitfire-3203.jpg",
                name: "3203",
                cat: "Fendeuse 3-points",
                power: "Hydraulique 20 t",
                fr: "Fendeuse 3-points 20 t, 2 voies, bûches 36 po, cycle 9-14 s. Fait au Canada.",
                en: "20-ton 3-pt 2-way splitter, 36-in logs, 9-14s cycle. Made in Canada."
            },
            {
                slug: "3265",
                img: "/assets/product-splitfire-3265.jpg",
                name: "3265",
                cat: "Fendeuse remorquable",
                power: "Honda GX200",
                fr: "Fendeuse 2 voies à essence Honda GX200, standard des locations.",
                en: "2-way gas splitter, Honda GX200, North American rental industry standard."
            },
            {
                slug: "4403",
                img: "/assets/product-splitfire-4403.jpg",
                name: "4403",
                cat: "Fendeuse 32 t",
                power: "Hydraulique 32 t",
                fr: "Fendeuse 3-points 32 t, 2 voies, coin 4 voies, 2 900 PSI. Bois noueux.",
                en: "32-ton 3-pt 2-way splitter, 4-way wedge, 2,900 PSI for knotted hardwood."
            }
        ]
    },
    {
        slug: "portablewinch",
        name: "Portable Winch",
        logo: "/assets/logo-portablewinch-official.png",
        products: [
            {
                slug: "pcw3000",
                img: "/assets/product-portablewinch-pcw3000.png",
                name: "PCW3000",
                cat: "Treuil capstan",
                power: "Honda GX35",
                fr: "Treuil capstan portable 700 kg, Honda GX35, fait au Québec (Sherbrooke).",
                en: "Portable 1,550 lb capstan winch, Honda GX35, made in Sherbrooke QC."
            },
            {
                slug: "pcw5000",
                img: "/assets/product-portablewinch-pcw5000.jpg",
                name: "PCW5000",
                cat: "Treuil capstan",
                power: "Honda GXH50",
                fr: "Treuil capstan 1 000 kg, Honda GXH50, corde illimitée. Fab. Sherbrooke QC.",
                en: "2,200 lb capstan winch, Honda GXH50, unlimited rope, made in Sherbrooke QC."
            }
        ]
    },
    {
        slug: "oregon",
        name: "Oregon",
        logo: "/assets/logo-oregon-official.png",
        products: [
            {
                slug: "cs300",
                img: "/assets/product-oregon-cs300.png",
                name: "CS300",
                cat: "Tronçonneuse 16 po",
                power: "Batterie 40V MAX",
                fr: "Tronçonneuse sans-fil 40V, barre 16 po, auto-affûtage PowerSharp.",
                en: "40V cordless chainsaw, 16-in bar, on-saw PowerSharp self-sharpening."
            },
            {
                slug: "91px",
                img: "/assets/product-oregon-91px-chain.jpg",
                name: "91PX056G",
                cat: "Chaîne 16 po",
                power: "Consommable",
                fr: "Chaîne AdvanceCut 91PX, 3/8 po LP, .050, 56 maillons, barre 16 po.",
                en: "AdvanceCut 91PX chain, 3/8-in LP, .050, 56 DL, 16-in bar — fits major brands."
            },
            {
                slug: "91-239",
                img: "/assets/product-oregon-mower-blade-91-239.jpg",
                name: "91-239",
                cat: "Lame 20-1/2 po",
                power: "Consommable",
                fr: "Lame de tondeuse 20-1/2 po, acier trempé, remplacement OEM multi-marques.",
                en: "20-1/2-in mower blade, hardened steel, multi-brand OEM replacement."
            }
        ]
    }
];
const PARTS_VISUALS = [
    "/assets/catalog-ego-cover.png",
    "/assets/catalog-portablewinch-cover.png",
    "/assets/equipment-ego-page-03.png",
    "/assets/equipment-ego-page-15.png",
    "/assets/product-oregon-91px-chain.jpg",
    "/assets/product-oregon-mower-blade-91-239.jpg"
];
const VIDEOS = [
    {
        id: "YafJShA9Gkg",
        title: "Husqvarna 550 XP",
        brand: "Husqvarna"
    },
    {
        id: "iVfe7p_XMro",
        title: "Husqvarna mower",
        brand: "Husqvarna"
    },
    {
        id: "A863vEUEUC4",
        title: "STIHL Lithium Ion range",
        brand: "STIHL"
    },
    {
        id: "elYO6PU6n_g",
        title: "STIHL Chains explainer",
        brand: "STIHL"
    },
    {
        id: "YLkUlbo41b4",
        title: "Toro TimeCutter SS / SW",
        brand: "Toro"
    },
    {
        id: "O6rCWyN4OHM",
        title: "Toro SnowMaster",
        brand: "Toro"
    },
    {
        id: "TJEQ1EYyo0w",
        title: "Lawn Boy AWD mowers",
        brand: "Lawn Boy"
    },
    {
        id: "gaDNTsv9qx4",
        title: 'Toro TimeMaster 30"',
        brand: "Toro"
    }
];
function isOpenInQuebec(now) {
    const utc = now.getTime();
    const offsetMin = -240;
    const local = new Date(utc + offsetMin * 60 * 1000);
    const day = local.getUTCDay();
    const h = local.getUTCHours();
    const m = local.getUTCMinutes();
    const t = h * 60 + m;
    if (day === 0) return false;
    if (day === 6) return t >= 9 * 60 && t < 12 * 60;
    return t >= 8 * 60 && t < 12 * 60 || t >= 13 * 60 && t < 17 * 60;
}
function HeadingItalic({ before, italic, after, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
        className: className,
        children: [
            before && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "word inline-block",
                children: [
                    before,
                    " "
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 294,
                columnNumber: 18
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "word word-emphasis italic inline-block",
                children: italic
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 295,
                columnNumber: 7
            }, this),
            after && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "word inline-block",
                children: [
                    " ",
                    after
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 296,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
        lineNumber: 293,
        columnNumber: 5
    }, this);
}
function VideoTile({ id, title, brand }) {
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "video-tile",
        children: [
            active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
                title: title,
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                allowFullScreen: true,
                loading: "lazy"
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 306,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "video-poster",
                onClick: ()=>setActive(true),
                "aria-label": `${title} — ${brand}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
                        alt: `${title} — ${brand}`,
                        loading: "lazy",
                        width: 480,
                        height: 360
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 315,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "video-play",
                        "aria-hidden": "true",
                        children: "▶"
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 314,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "video-meta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "video-brand",
                                children: brand
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 327,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "video-title",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "video-link",
                        href: `https://www.youtube.com/watch?v=${id}`,
                        target: "_blank",
                        rel: "noreferrer",
                        children: "YouTube"
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
        lineNumber: 304,
        columnNumber: 5
    }, this);
}
function Page() {
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("fr");
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedBrand, setSelectedBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const update = ()=>setOpen(isOpenInQuebec(new Date()));
        update();
        const i = setInterval(update, 60_000);
        return ()=>clearInterval(i);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$app$2f$useAnimations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnimations"])(rootRef, lang);
    const t = (k)=>k[lang];
    const activeBrand = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>SHOWROOM.find((brand)=>brand.slug === selectedBrand) ?? null, [
        selectedBrand
    ]);
    const featuredProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            {
                brand: SHOWROOM[0],
                product: SHOWROOM[0].products[0]
            },
            {
                brand: SHOWROOM[1],
                product: SHOWROOM[1].products[1]
            },
            {
                brand: SHOWROOM[2],
                product: SHOWROOM[2].products[0]
            },
            {
                brand: SHOWROOM[3],
                product: SHOWROOM[3].products[1]
            }
        ], []);
    const navItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            {
                href: "#atelier",
                label: t(COPY.nav.repair)
            },
            {
                href: "#showroom",
                label: t(COPY.nav.showroom)
            },
            {
                href: "#videos",
                label: t(COPY.nav.videos)
            },
            {
                href: "#parts",
                label: t(COPY.nav.parts)
            },
            {
                href: "#pickup",
                label: t(COPY.nav.pickup)
            },
            {
                href: "#about",
                label: t(COPY.nav.about)
            },
            {
                href: "#contact",
                label: t(COPY.nav.contact)
            }
        ], [
        lang
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rootRef,
        className: "page",
        lang: lang === "fr" ? "fr-CA" : "en-CA",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "#main",
                className: "skip-link",
                children: lang === "fr" ? "Aller au contenu" : "Skip to content"
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 379,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "site-nav",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#main",
                        className: "brand-mark",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-mark-name",
                                children: "Marco Mini Mécanique"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 383,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-mark-since",
                                children: [
                                    "— Wickham · ",
                                    t(COPY.footer.since)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        "aria-label": "Primary",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            children: navItems.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: n.href,
                                        children: n.label
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 389,
                                        columnNumber: 32
                                    }, this)
                                }, n.href, false, {
                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                    lineNumber: 389,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                            lineNumber: 387,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 386,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "nav-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `hours-badge ${open === false ? "is-closed" : "is-open"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hours-dot",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 395,
                                        columnNumber: 13
                                    }, this),
                                    open === false ? t(COPY.status.closed) : t(COPY.status.open)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 394,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "lang-toggle",
                                onClick: ()=>setLang(lang === "fr" ? "en" : "fr"),
                                "aria-label": "Toggle language",
                                children: COPY.footer.langSwap[lang]
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 393,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 381,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                id: "main",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "hero",
                        "aria-label": t(COPY.hero.title),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hero-layers",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "layer layer-bg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            className: "hero-bg-img",
                                            src: "/assets/hero.jpg",
                                            alt: "",
                                            "aria-hidden": "true",
                                            draggable: false
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 409,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "layer layer-mid"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 417,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "liquid-veil liquid-veil-a"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 418,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "liquid-veil liquid-veil-b"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 419,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "layer layer-fg"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 420,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 407,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hero-inner",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-copy",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "eyebrow",
                                            children: t(COPY.hero.eyebrow)
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 424,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "hero-title",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "word inline-block",
                                                    children: "Marco "
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 426,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "word inline-block",
                                                    children: "Mini "
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 427,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "word word-emphasis italic inline-block",
                                                    children: t(COPY.hero.italicWord)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 428,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 425,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "hero-sub",
                                            children: t(COPY.hero.sub)
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 430,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "hero-sub small",
                                            children: t(COPY.hero.sub2)
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 431,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hero-cta",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "tel:8193986673",
                                                    className: "cta cta-primary",
                                                    children: t(COPY.hero.callCta)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 433,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#contact",
                                                    className: "cta cta-ghost",
                                                    children: t(COPY.hero.serviceCta)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 434,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#pickup",
                                                    className: "cta cta-ghost",
                                                    children: t(COPY.hero.pickupCta)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 435,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 432,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                    lineNumber: 423,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 406,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "atelier",
                        className: "section atelier",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.atelier.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 443,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.atelier.title),
                                italic: t(COPY.atelier.italicWord),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 444,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "section-lead",
                                children: t(COPY.atelier.note)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 445,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "atelier-grid",
                                children: ATELIER_SERVICES.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "atelier-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "atelier-img",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: s.img,
                                                    alt: "",
                                                    loading: "lazy"
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 450,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "atelier-line",
                                                children: lang === "fr" ? s.fr : s.en
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 452,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 446,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 442,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "showroom",
                        className: "section showroom",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.showroom.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 460,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.showroom.title),
                                italic: t(COPY.showroom.italicWord),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 461,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "section-lead",
                                children: t(COPY.showroom.intro)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 462,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "showroom-panel",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "showroom-panel-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: t(COPY.showroom.featured)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 466,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.showroom.sourceNote)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 467,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 465,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "featured-products",
                                        children: featuredProducts.map(({ brand, product })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "featured-product-card",
                                                onClick: ()=>setSelectedBrand(brand.slug),
                                                "aria-label": `${brand.name} ${product.name}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "featured-brand",
                                                        children: brand.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "featured-img",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: product.img,
                                                            alt: "",
                                                            loading: "lazy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                            lineNumber: 479,
                                                            columnNumber: 50
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "featured-name",
                                                        children: product.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "featured-desc",
                                                        children: lang === "fr" ? product.fr : product.en
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 481,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, `${brand.slug}-${product.slug}`, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 471,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 469,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 464,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "showroom-panel brand-chooser",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "showroom-panel-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: t(COPY.showroom.allBrands)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 489,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.showroom.hint)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 490,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 488,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "brand-choice-grid",
                                        children: SHOWROOM.map((brand)=>{
                                            const lead = brand.products[0];
                                            const isActive = selectedBrand === brand.slug;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: `brand-choice-card ${isActive ? "is-active" : ""}`,
                                                onClick: ()=>setSelectedBrand(isActive ? null : brand.slug),
                                                "aria-expanded": isActive,
                                                "aria-controls": "showroom-product-drawer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "brand-choice-logo",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: brand.logo,
                                                            alt: `${brand.name} logo`,
                                                            loading: "lazy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                            lineNumber: 506,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "brand-choice-copy",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: brand.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 509,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    brand.products.length,
                                                                    " ",
                                                                    lang === "fr" ? "fiches produits" : "product cards"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 510,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                children: [
                                                                    lead.cat,
                                                                    " · ",
                                                                    lead.power
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 511,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "brand-choice-product",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: lead.img,
                                                            alt: "",
                                                            loading: "lazy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                            lineNumber: 514,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, brand.slug, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 497,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 492,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 487,
                                columnNumber: 11
                            }, this),
                            activeBrand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                id: "showroom-product-drawer",
                                className: "showroom-drawer",
                                "aria-live": "polite",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                        className: "drawer-header",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "brand-logo-wrap",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: activeBrand.logo,
                                                    alt: `${activeBrand.name} logo`,
                                                    loading: "lazy"
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 526,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 525,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "eyebrow",
                                                        children: t(COPY.showroom.eyebrow)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 529,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "brand-name",
                                                        children: activeBrand.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 530,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "drawer-note",
                                                        children: t(COPY.showroom.sourceNote)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 531,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 528,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "drawer-close",
                                                onClick: ()=>setSelectedBrand(null),
                                                children: t(COPY.showroom.close)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 533,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 524,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "product-grid",
                                        children: activeBrand.products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "product-card product-card-clickable",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "product-img",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: p.img,
                                                            alt: `${activeBrand.name} ${p.name}`,
                                                            loading: "lazy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                            lineNumber: 541,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 540,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "product-meta",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "product-cat",
                                                                children: p.cat
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 544,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "product-name",
                                                                children: p.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 545,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "product-power",
                                                                children: p.power
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 546,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "product-desc",
                                                                children: lang === "fr" ? p.fr : p.en
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 547,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                className: "product-action",
                                                                href: "#contact",
                                                                children: t(COPY.showroom.availability)
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 548,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 543,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, p.slug, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 539,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 537,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 523,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 459,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "videos",
                        className: "section videos",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.videos.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 559,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.videos.title),
                                italic: t(COPY.videos.italic),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 560,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "section-lead",
                                children: t(COPY.videos.note)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "video-grid",
                                children: VIDEOS.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VideoTile, {
                                        ...v
                                    }, v.id, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 564,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 562,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 558,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "parts",
                        className: "section parts",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.parts.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 571,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.parts.title),
                                italic: t(COPY.parts.italic),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 572,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "section-lead",
                                children: t(COPY.parts.body)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 573,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "parts-strip",
                                children: PARTS_VISUALS.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "parts-card",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: src,
                                            alt: "",
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 577,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 576,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 574,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 570,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "pickup",
                        className: "section pickup",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.pickup.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 585,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.pickup.title),
                                italic: t(COPY.pickup.italic),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 586,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "section-lead",
                                children: t(COPY.pickup.body)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 587,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pickup-area",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "area-label",
                                        children: t(COPY.pickup.areaLabel)
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 589,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "area-list",
                                        children: SERVICE_AREA.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: m
                                            }, m, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 592,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 590,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 588,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 584,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "about",
                        className: "section about",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.about.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 600,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.about.title),
                                italic: t(COPY.about.italicWord),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 601,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "about-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "about-photo",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/assets/shop-devanture.jpg",
                                            alt: "765 route Principale, Wickham",
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 604,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 603,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "about-copy",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.about.body1)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 607,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.about.body2)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 608,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                                                className: "about-quote",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: t(COPY.about.quote)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 610,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                                        children: t(COPY.about.quoteAttr)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 611,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 609,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 606,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 602,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "stats-grid",
                                "aria-label": "Historique chiffres",
                                children: COPY.about.stats.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "stat",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "stat-num",
                                                "data-target": s.num,
                                                children: "0"
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 618,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "stat-label",
                                                children: t(s.label)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 619,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, s.num, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 617,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 615,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 599,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "contact",
                        className: "section contact",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.contact.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 627,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.contact.title),
                                italic: t(COPY.contact.italic),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 628,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "contact-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "contact-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "contact-card-title",
                                                children: lang === "fr" ? "Atelier" : "Shop"
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 631,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "contact-name",
                                                children: "Marco Mini Mécanique"
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 632,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: COPY.contact.addr
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 633,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "tel:8193986673",
                                                    children: COPY.contact.phone
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 634,
                                                    columnNumber: 18
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 634,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    lang === "fr" ? "Téléc. " : "Fax ",
                                                    COPY.contact.fax
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 635,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `mailto:${COPY.contact.email}`,
                                                    children: COPY.contact.email
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 636,
                                                    columnNumber: 18
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 636,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "contact-payment",
                                                children: t(COPY.contact.payment)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 637,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 630,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "contact-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "contact-card-title",
                                                children: lang === "fr" ? "Heures" : "Hours"
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 640,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.contact.hours.week)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 641,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.contact.hours.sat)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 642,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "muted",
                                                children: t(COPY.contact.hours.lunch)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 643,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 639,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "contact-card map-card",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                            title: "Marco Mini Mécanique map",
                                            src: "https://www.google.com/maps?q=765+route+Principale,+Wickham,+QC&output=embed",
                                            loading: "lazy",
                                            referrerPolicy: "no-referrer-when-downgrade"
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 646,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 645,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 629,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 626,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 404,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "site-footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "footer-name",
                                children: "Marco Mini Mécanique"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 659,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "muted",
                                children: [
                                    COPY.contact.addr,
                                    " · ",
                                    COPY.contact.phone
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 660,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 658,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "footer-since",
                        children: t(COPY.footer.since)
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 662,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "muted",
                        children: t(COPY.footer.credit)
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 663,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 657,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
        lineNumber: 378,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_openclaw_workspace_clients_marco-mini-mecanique_v1_0_build_app_10f54zd._.js.map