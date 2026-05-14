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
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$app$2f$useAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/useAnimations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
// marco-mini-mecanique — showroom rebuild hand pass
// Motion library: Editorial Word Reveal · Soft Parallax Depth · Liquid Service Veil · Dealer Card Drawer · Video Hero
// Source basis: Marco source scrape + v1 brief product research + official manufacturer/video references preserved in research/.
"use client";
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
            fr: "L'atelier prend en charge l'entretien, le diagnostic et la réparation d'équipements de travail, de jardin et de sports motorisés : scies à chaîne, tracteurs à gazon, tondeuses, coupe-herbes, débroussailleuses, souffleuses, compacteurs, pilonneuses, fendeuses à bois, génératrices, moteurs stationnaires, VTT, motocross, motos, motoneiges et côte-à-côte/SXS. Trois techniciens plus Marco assurent le service régulier, avec jusqu'à quatre mécaniciens en haute saison.",
            en: "The workshop handles maintenance, diagnostics, and repairs for work, lawn, garden, and powersports equipment: chainsaws, lawn tractors, mowers, trimmers, brush cutters, snowblowers, compactors, jumping jacks, wood splitters, generators, stationary engines, ATVs, motocross bikes, motorcycles, snowmobiles, and side-by-side/SXS vehicles. Three technicians plus Marco handle regular service, with up to four mechanics during peak season."
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
            fr: "Marco Mini Mécanique répare tous les modèles et toutes les marques de petits moteurs, d'équipements motorisés et de sports motorisés : tondeuses, tracteurs à gazon, souffleuses, scies à chaîne, VTT, motos, motocross, motoneiges et côte-à-côte/SXS. L'atelier travaille avec des pièces d'origine lorsque disponibles, pour garder chaque réparation fiable, compatible et durable.",
            en: "Marco Mini Mécanique repairs all models and all brands of small-engine equipment, powered tools, and powersports machines: mowers, lawn tractors, snowblowers, chainsaws, ATVs, motorcycles, motocross bikes, snowmobiles, and side-by-side/SXS vehicles. The shop uses original OEM parts when available to keep every repair reliable, compatible, and durable."
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
        fr: "Scies à chaîne",
        en: "Chainsaws"
    },
    {
        fr: "Tracteurs à gazon",
        en: "Lawn tractors"
    },
    {
        fr: "Tondeuses",
        en: "Mowers"
    },
    {
        fr: "Coupe-herbes et débroussailleuses",
        en: "Trimmers and brush cutters"
    },
    {
        fr: "Souffleuses",
        en: "Snowblowers"
    },
    {
        fr: "Compacteurs et pilonneuses",
        en: "Compactors and jumping jacks"
    },
    {
        fr: "Fendeuses à bois",
        en: "Wood splitters"
    },
    {
        fr: "Génératrices et moteurs stationnaires",
        en: "Generators and stationary motors"
    },
    {
        fr: "VTT, motocross, motos, motoneiges et côte-à-côte/SXS",
        en: "ATVs, motocross bikes, motorcycles, snowmobiles, and side-by-side/SXS"
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
        className: className,
        children: [
            before && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "word inline-block",
                children: [
                    before,
                    " "
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 283,
                columnNumber: 18
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "word word-emphasis italic inline-block",
                children: italic
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            after && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "word inline-block",
                children: [
                    " ",
                    after
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 285,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
        lineNumber: 282,
        columnNumber: 5
    }, this);
}
_c = HeadingItalic;
function VideoTile({ id, title, brand }) {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "video-tile",
        children: [
            active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
                title: title,
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                allowFullScreen: true,
                loading: "lazy"
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 295,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "video-poster",
                onClick: ()=>setActive(true),
                "aria-label": `${title} — ${brand}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
                        alt: `${title} — ${brand}`,
                        loading: "lazy",
                        width: 480,
                        height: 360
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 304,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "video-play",
                        "aria-hidden": "true",
                        children: "▶"
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 311,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 303,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "video-meta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "video-brand",
                                children: brand
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "video-title",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "video-link",
                        href: `https://www.youtube.com/watch?v=${id}`,
                        target: "_blank",
                        rel: "noreferrer",
                        children: "YouTube"
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
        lineNumber: 293,
        columnNumber: 5
    }, this);
}
_s(VideoTile, "1cfVChV6gA1Fk8+xDnwTj3gmgZo=");
_c1 = VideoTile;
function Page() {
    _s1();
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("fr");
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedBrand, setSelectedBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            const update = {
                "Page.useEffect.update": ()=>setOpen(isOpenInQuebec(new Date()))
            }["Page.useEffect.update"];
            update();
            const i = setInterval(update, 60_000);
            return ({
                "Page.useEffect": ()=>clearInterval(i)
            })["Page.useEffect"];
        }
    }["Page.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$app$2f$useAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimations"])(rootRef, lang);
    const t = (k)=>k[lang];
    const activeBrand = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[activeBrand]": ()=>SHOWROOM.find({
                "Page.useMemo[activeBrand]": (brand)=>brand.slug === selectedBrand
            }["Page.useMemo[activeBrand]"]) ?? null
    }["Page.useMemo[activeBrand]"], [
        selectedBrand
    ]);
    const featuredProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[featuredProducts]": ()=>[
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
            ]
    }["Page.useMemo[featuredProducts]"], []);
    const navItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[navItems]": ()=>[
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
            ]
    }["Page.useMemo[navItems]"], [
        lang
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rootRef,
        className: "page",
        lang: lang === "fr" ? "fr-CA" : "en-CA",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "#main",
                className: "skip-link",
                children: lang === "fr" ? "Aller au contenu" : "Skip to content"
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "site-nav",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#main",
                        className: "brand-mark",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-mark-name",
                                children: "Marco Mini Mécanique"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 372,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-mark-since",
                                children: [
                                    "— Wickham · ",
                                    t(COPY.footer.since)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 373,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 371,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        "aria-label": "Primary",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            children: navItems.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: n.href,
                                        children: n.label
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 378,
                                        columnNumber: 32
                                    }, this)
                                }, n.href, false, {
                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                    lineNumber: 378,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                            lineNumber: 376,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 375,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "nav-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `hours-badge ${open === false ? "is-closed" : "is-open"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hours-dot",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 384,
                                        columnNumber: 13
                                    }, this),
                                    open === false ? t(COPY.status.closed) : t(COPY.status.open)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 383,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "lang-toggle",
                                onClick: ()=>setLang(lang === "fr" ? "en" : "fr"),
                                "aria-label": "Toggle language",
                                children: COPY.footer.langSwap[lang]
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 370,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                id: "main",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "hero",
                        "aria-label": t(COPY.hero.title),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hero-layers",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "layer layer-bg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            className: "hero-bg-img",
                                            src: "/assets/hero.jpg",
                                            alt: "",
                                            "aria-hidden": "true",
                                            draggable: false
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 398,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 397,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "layer layer-mid"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 406,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "liquid-veil liquid-veil-a"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "liquid-veil liquid-veil-b"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "layer layer-fg"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 409,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hero-inner",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-copy",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "eyebrow",
                                            children: t(COPY.hero.eyebrow)
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 413,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "hero-title",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "word inline-block",
                                                    children: "Marco "
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "word inline-block",
                                                    children: "Mini "
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "word word-emphasis italic inline-block",
                                                    children: t(COPY.hero.italicWord)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 417,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 414,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "hero-sub",
                                            children: t(COPY.hero.sub)
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 419,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "hero-sub small",
                                            children: t(COPY.hero.sub2)
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 420,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hero-cta",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "tel:8193986673",
                                                    className: "cta cta-primary",
                                                    children: t(COPY.hero.callCta)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 422,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#contact",
                                                    className: "cta cta-ghost",
                                                    children: t(COPY.hero.serviceCta)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 423,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#pickup",
                                                    className: "cta cta-ghost",
                                                    children: t(COPY.hero.pickupCta)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 424,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 421,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                    lineNumber: 412,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 395,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "atelier",
                        className: "section atelier",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.atelier.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 432,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.atelier.title),
                                italic: t(COPY.atelier.italicWord),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "atelier-summary",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "atelier-summary-img",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/assets/shop-gallery-100.jpg",
                                            alt: "Atelier Marco Mini Mécanique",
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 436,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 435,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "atelier-summary-copy",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "section-lead",
                                                children: t(COPY.atelier.note)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 439,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "atelier-service-list",
                                                children: ATELIER_SERVICES.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: lang === "fr" ? s.fr : s.en
                                                    }, s.fr, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 442,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 440,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 438,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 434,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 431,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "showroom",
                        className: "section showroom",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.showroom.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 451,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.showroom.title),
                                italic: t(COPY.showroom.italicWord),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 452,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "section-lead",
                                children: t(COPY.showroom.intro)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "showroom-panel",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "showroom-panel-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: t(COPY.showroom.featured)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 457,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.showroom.sourceNote)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 458,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 456,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "featured-products",
                                        children: featuredProducts.map(({ brand, product })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "featured-product-card",
                                                onClick: ()=>setSelectedBrand(brand.slug),
                                                "aria-label": `${brand.name} ${product.name}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "featured-brand",
                                                        children: brand.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "featured-img",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: product.img,
                                                            alt: "",
                                                            loading: "lazy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                            lineNumber: 470,
                                                            columnNumber: 50
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "featured-name",
                                                        children: product.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "featured-desc",
                                                        children: lang === "fr" ? product.fr : product.en
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, `${brand.slug}-${product.slug}`, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 462,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 460,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 455,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "showroom-panel brand-chooser",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "showroom-panel-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: t(COPY.showroom.allBrands)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 480,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.showroom.hint)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 481,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 479,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "brand-choice-grid",
                                        children: SHOWROOM.map((brand)=>{
                                            const lead = brand.products[0];
                                            const isActive = selectedBrand === brand.slug;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: `brand-choice-card ${isActive ? "is-active" : ""}`,
                                                onClick: ()=>setSelectedBrand(isActive ? null : brand.slug),
                                                "aria-expanded": isActive,
                                                "aria-controls": "showroom-product-drawer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "brand-choice-logo",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: brand.logo,
                                                            alt: `${brand.name} logo`,
                                                            loading: "lazy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                            lineNumber: 497,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 496,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "brand-choice-copy",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: brand.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 500,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    brand.products.length,
                                                                    " ",
                                                                    lang === "fr" ? "fiches produits" : "product cards"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 501,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                children: [
                                                                    lead.cat,
                                                                    " · ",
                                                                    lead.power
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 502,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "brand-choice-product",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: lead.img,
                                                            alt: "",
                                                            loading: "lazy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                            lineNumber: 505,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, brand.slug, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 488,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 483,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 478,
                                columnNumber: 11
                            }, this),
                            activeBrand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                id: "showroom-product-drawer",
                                className: "showroom-drawer",
                                "aria-live": "polite",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                        className: "drawer-header",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "brand-logo-wrap",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: activeBrand.logo,
                                                    alt: `${activeBrand.name} logo`,
                                                    loading: "lazy"
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 516,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "eyebrow",
                                                        children: t(COPY.showroom.eyebrow)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "brand-name",
                                                        children: activeBrand.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 521,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "drawer-note",
                                                        children: t(COPY.showroom.sourceNote)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 522,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 519,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "drawer-close",
                                                onClick: ()=>setSelectedBrand(null),
                                                children: t(COPY.showroom.close)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 524,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 515,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "product-grid",
                                        children: activeBrand.products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "product-card product-card-clickable",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "product-img",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: p.img,
                                                            alt: `${activeBrand.name} ${p.name}`,
                                                            loading: "lazy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                            lineNumber: 532,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 531,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "product-meta",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "product-cat",
                                                                children: p.cat
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 535,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "product-name",
                                                                children: p.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 536,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "product-power",
                                                                children: p.power
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 537,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "product-desc",
                                                                children: lang === "fr" ? p.fr : p.en
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 538,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                className: "product-action",
                                                                href: "#contact",
                                                                children: t(COPY.showroom.availability)
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                                lineNumber: 539,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 534,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, p.slug, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 530,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 528,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 514,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 450,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "videos",
                        className: "section videos",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.videos.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 550,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.videos.title),
                                italic: t(COPY.videos.italic),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 551,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "section-lead",
                                children: t(COPY.videos.note)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 552,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "video-grid",
                                children: VIDEOS.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VideoTile, {
                                        ...v
                                    }, v.id, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 555,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 553,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 549,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "parts",
                        className: "section parts",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.parts.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 562,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.parts.title),
                                italic: t(COPY.parts.italic),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 563,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "section-lead",
                                children: t(COPY.parts.body)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 564,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 561,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "pickup",
                        className: "section pickup",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.pickup.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 569,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.pickup.title),
                                italic: t(COPY.pickup.italic),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 570,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "section-lead",
                                children: t(COPY.pickup.body)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 571,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pickup-area",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "area-label",
                                        children: t(COPY.pickup.areaLabel)
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 573,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "area-list",
                                        children: SERVICE_AREA.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: m
                                            }, m, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 576,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 574,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 572,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 568,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "about",
                        className: "section about",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.about.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 584,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.about.title),
                                italic: t(COPY.about.italicWord),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 585,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "about-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "about-photo",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/assets/shop-devanture.jpg",
                                            alt: "765 route Principale, Wickham",
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 588,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 587,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "about-copy",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.about.body1)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 591,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.about.body2)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 592,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                                                className: "about-quote",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: t(COPY.about.quote)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 594,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                                        children: t(COPY.about.quoteAttr)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                        lineNumber: 595,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 593,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 590,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 586,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "stats-grid",
                                "aria-label": "Historique chiffres",
                                children: COPY.about.stats.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "stat",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "stat-num",
                                                "data-target": s.num,
                                                children: "0"
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 602,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "stat-label",
                                                children: t(s.label)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 603,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, s.num, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 601,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 599,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 583,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "contact",
                        className: "section contact",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: t(COPY.contact.eyebrow)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 611,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingItalic, {
                                before: t(COPY.contact.title),
                                italic: t(COPY.contact.italic),
                                className: "section-title"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 612,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "contact-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "contact-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "contact-card-title",
                                                children: lang === "fr" ? "Atelier" : "Shop"
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 615,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "contact-name",
                                                children: "Marco Mini Mécanique"
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 616,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: COPY.contact.addr
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 617,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "tel:8193986673",
                                                    children: COPY.contact.phone
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 618,
                                                    columnNumber: 18
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 618,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    lang === "fr" ? "Téléc. " : "Fax ",
                                                    COPY.contact.fax
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 619,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `mailto:${COPY.contact.email}`,
                                                    children: COPY.contact.email
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                    lineNumber: 620,
                                                    columnNumber: 18
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 620,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "contact-payment",
                                                children: t(COPY.contact.payment)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 621,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 614,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "contact-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "contact-card-title",
                                                children: lang === "fr" ? "Heures" : "Hours"
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 624,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.contact.hours.week)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 625,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: t(COPY.contact.hours.sat)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 626,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "muted",
                                                children: t(COPY.contact.hours.lunch)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                                lineNumber: 627,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 623,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "contact-card map-card",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                            title: "Marco Mini Mécanique map",
                                            src: "https://www.google.com/maps?q=765+route+Principale,+Wickham,+QC&output=embed",
                                            loading: "lazy",
                                            referrerPolicy: "no-referrer-when-downgrade"
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                            lineNumber: 630,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                        lineNumber: 629,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 613,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 610,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "site-footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "footer-name",
                                children: "Marco Mini Mécanique"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 643,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "muted",
                                children: [
                                    COPY.contact.addr,
                                    " · ",
                                    COPY.contact.phone
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                                lineNumber: 644,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 642,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "footer-since",
                        children: t(COPY.footer.since)
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 646,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "muted",
                        children: t(COPY.footer.credit)
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                        lineNumber: 647,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
                lineNumber: 641,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/page.tsx",
        lineNumber: 367,
        columnNumber: 5
    }, this);
}
_s1(Page, "AzFPYtkLI+VFreIBZWktcaOYZ+Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$app$2f$useAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimations"]
    ];
});
_c2 = Page;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HeadingItalic");
__turbopack_context__.k.register(_c1, "VideoTile");
__turbopack_context__.k.register(_c2, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_openclaw_workspace_clients_marco-mini-mecanique_v1_0_build_app_0lofn9_._.js.map