module.exports = [
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// marco-mini-mecanique — root layout (FIX iter 3)
__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
;
const metadata = {
    metadataBase: new URL("https://marcominimecanique.com"),
    title: "Marco Mini Mécanique — Wickham · Réparation & Showroom depuis 1999",
    description: "Marco Mini Mécanique, Wickham (Centre-du-Québec). Détaillant autorisé Husqvarna, STIHL, Toro, EGO, Lawn Boy, Wallenstein, Split-Fire, Portable Winch, Oregon. Réparation de petits moteurs et sports motorisés depuis 1999.",
    alternates: {
        canonical: "/",
        languages: {
            "fr-CA": "/",
            "en-CA": "/"
        }
    },
    openGraph: {
        title: "Marco Mini Mécanique — Wickham depuis 1999",
        description: "Réparation, pièces et salle de montre. Détaillant autorisé pour 9 marques d'équipement.",
        type: "website",
        locale: "fr_CA",
        alternateLocale: [
            "en_CA"
        ],
        images: [
            {
                url: "/assets/shop-devanture.jpg",
                width: 1600,
                height: 1067,
                alt: "765 route Principale, Wickham"
            }
        ]
    },
    robots: {
        index: true,
        follow: true
    }
};
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: "Marco Mini Mécanique",
    address: {
        "@type": "PostalAddress",
        streetAddress: "765 route Principale",
        addressLocality: "Wickham",
        addressRegion: "QC",
        postalCode: "J0C 1S0",
        addressCountry: "CA"
    },
    telephone: "+1-819-398-6673",
    faxNumber: "+1-819-398-6674",
    email: "marcominimecanique@cgocable.ca",
    url: "https://marcominimecanique.com",
    foundingDate: "1999",
    image: "/assets/shop-devanture.jpg",
    priceRange: "$$",
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            opens: "08:00",
            closes: "12:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            opens: "13:00",
            closes: "17:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "12:00"
        }
    ],
    areaServed: [
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
    ].map((n)=>({
            "@type": "City",
            name: n
        })),
    brand: [
        "Husqvarna",
        "STIHL",
        "Toro",
        "EGO Power+",
        "Lawn Boy",
        "Wallenstein",
        "Split-Fire",
        "Portable Winch",
        "Oregon"
    ].map((n)=>({
            "@type": "Brand",
            name: n
        }))
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "fr-CA",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/layout.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossOrigin: ""
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/layout.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://i.ytimg.com"
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/layout.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify(localBusinessSchema)
                        }
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/layout.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/layout.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$clients$2f$marco$2d$mini$2d$mecanique$2f$v1$2e$0$2f$build$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: children
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/layout.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/layout.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
}),
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/.openclaw/workspace/clients/marco-mini-mecanique/v1.0/build/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_openclaw_workspace_clients_marco-mini-mecanique_v1_0_build_0-~8wst._.js.map