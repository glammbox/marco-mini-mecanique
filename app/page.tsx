// marco-mini-mecanique — showroom rebuild hand pass
// Motion library: Editorial Word Reveal · Soft Parallax Depth · Liquid Service Veil · Dealer Card Drawer · Video Hero
// Source basis: Marco source scrape + v1 brief product research + official manufacturer/video references preserved in research/.
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useAnimations } from "./useAnimations";

type Lang = "fr" | "en";

const COPY = {
  nav: {
    repair:    { fr: "Réparation",  en: "Repair" },
    showroom:  { fr: "Showroom",    en: "Showroom" },
    videos:    { fr: "Vidéos",      en: "Videos" },
    parts:     { fr: "Pièces",      en: "Parts" },
    pickup:    { fr: "Ramassage",   en: "Pickup" },
    about:     { fr: "À propos",    en: "About" },
    contact:   { fr: "Contact",     en: "Contact" },
  },
  hero: {
    eyebrow:     { fr: "Wickham · Centre-du-Québec",   en: "Wickham · Centre-du-Québec" },
    title:       { fr: "Marco Mini Mécanique",          en: "Marco Mini Mécanique" },
    italicWord:  { fr: "Mécanique",                     en: "Mécanique" },
    sub: {
      fr: "Réparation, pièces et salle de montre à Wickham depuis 1999.",
      en: "Repair, parts, and showroom service in Wickham since 1999.",
    },
    sub2: {
      fr: "Service de petits moteurs et sports motorisés au 765 route Principale, avec statut ouvert/fermé selon l'heure du Québec.",
      en: "Small-engine and powersport service from 765 route Principale, with an open/closed badge driven by Quebec time.",
    },
    callCta:    { fr: "Appeler 819 398-6673",                 en: "Call 819 398-6673" },
    serviceCta: { fr: "Demande de service",                   en: "Request service" },
    pickupCta:  { fr: "Ramassage / livraison",                en: "Pickup / delivery" },
  },
  status: {
    open:   { fr: "Ouvert maintenant",  en: "Open now" },
    closed: { fr: "Fermé maintenant",   en: "Closed now" },
  },
  atelier: {
    eyebrow:    { fr: "Atelier mécanique",                    en: "Repair workshop" },
    title:      { fr: "Atelier",                              en: "Workshop" },
    italicWord: { fr: "Réparation",                           en: "Repair" },
    note: {
      fr: "Trois techniciens plus Marco standard, jusqu'à quatre mécaniciens en haute saison, plus de 25 ans d'expérience cumulée.",
      en: "Three technicians plus Marco standard, up to four mechanics at peak season, over 25 years of combined experience.",
    },
  },
  showroom: {
    eyebrow:    { fr: "Salle de montre",                      en: "Showroom" },
    title:      { fr: "Showroom",                             en: "Showroom" },
    italicWord: { fr: "Équipement",                           en: "Equipment" },
    intro: {
      fr: "Une salle de montre plus facile à lire : quelques vedettes d'abord, puis les marques à ouvrir comme chez un détaillant. Descriptions sans prix, à confirmer avec l'atelier selon disponibilité.",
      en: "An easier showroom: a few featured picks first, then brand cards that open like a dealer display. Descriptions only, no prices, availability to confirm with the shop.",
    },
    hint: {
      fr: "Cliquer pour voir les fiches",
      en: "Click for product cards",
    },
    featured: { fr: "Sélection en vitrine", en: "Featured showroom picks" },
    allBrands: { fr: "Choisir une marque", en: "Choose a brand" },
    close: { fr: "Fermer la marque", en: "Close brand" },
    availability: { fr: "Vérifier avec l'atelier", en: "Check with the shop" },
    sourceNote: {
      fr: "Données condensées à partir des fiches fabricant et du contenu Marco existant. Aucun prix publié.",
      en: "Data condensed from manufacturer sheets and existing Marco content. No prices published.",
    },
  },
  videos: {
    eyebrow: { fr: "Bibliothèque vidéo",  en: "Video library" },
    title:   { fr: "Vidéos",              en: "Videos" },
    italic:  { fr: "Curatées",            en: "Curated" },
    note: {
      fr: "Sélection de vidéos officielles des fabricants — chargement à la demande, sans lecture automatique.",
      en: "Selection of official manufacturer videos — load on demand, no autoplay.",
    },
  },
  parts: {
    eyebrow: { fr: "Pièces & accessoires",  en: "Parts & accessories" },
    title:   { fr: "Pièces",                en: "Parts" },
    italic:  { fr: "Origine",               en: "OEM" },
    body: {
      fr: "Marco Mini Mécanique répare tous les modèles et toutes les marques de petits moteurs, d'équipements motorisés et de sports motorisés : tondeuses, tracteurs à gazon, souffleuses, scies à chaîne, VTT, motos, motocross, motoneiges et côte-à-côte/SXS. L'atelier travaille avec des pièces d'origine lorsque disponibles, pour garder chaque réparation fiable, compatible et durable.",
      en: "Marco Mini Mécanique repairs all models and all brands of small-engine equipment, powered tools, and powersports machines: mowers, lawn tractors, snowblowers, chainsaws, ATVs, motorcycles, motocross bikes, snowmobiles, and side-by-side/SXS vehicles. The shop uses original OEM parts when available to keep every repair reliable, compatible, and durable.",
    },
  },
  pickup: {
    eyebrow: { fr: "Ramassage & livraison",  en: "Pickup & delivery" },
    title:   { fr: "Service",                en: "Service" },
    italic:  { fr: "Local",                  en: "Local" },
    body: {
      fr: "Un service de ramassage et livraison est disponible. Communiquez avec l'atelier pour les détails de ramassage/livraison.",
      en: "Pickup and delivery service is available. Contact the shop for pickup/delivery details.",
    },
    areaLabel: { fr: "Territoire desservi",  en: "Service area" },
  },
  about: {
    eyebrow:    { fr: "Historique",          en: "History" },
    title:      { fr: "Atelier",             en: "Workshop" },
    italicWord: { fr: "Expérience",          en: "Experience" },
    body1: {
      fr: "Marco Goyette a fondé l'entreprise à 20 ans, en 1999, à Wickham. Toro en 2000, Husqvarna en 2002, STIHL en 2007. L'entrepôt sécurisé bâti en 2006, l'expansion majeure de 2010 a porté la surface totale à environ 6 000 pieds carrés.",
      en: "Marco Goyette founded the business at age 20, in 1999, in Wickham. Toro in 2000, Husqvarna in 2002, STIHL in 2007. Secure storage built in 2006, the 2010 expansion brought total surface to approximately 6,000 sq ft.",
    },
    body2: {
      fr: "En 2018, plus de 2 800 réparations, près de 11 000 clients, et le prix d'excellence Husqvarna pour la croissance exceptionnelle.",
      en: "In 2018, over 2,800 repairs, nearly 11,000 clients, and the Husqvarna excellence award for exceptional growth.",
    },
    quote: {
      fr: "« Merci à vous tous, clients et amis, qui avez permis à mon entreprise de connaître le succès qu'elle obtient … Merci beaucoup !!! »",
      en: "« Thank you to all of you, clients and friends, who have allowed my business to achieve the success it enjoys … Thank you so much !!! »",
    },
    quoteAttr: { fr: "— Marco Goyette",  en: "— Marco Goyette" },
    stats: [
      { num: 1999,   label: { fr: "Fondé en",          en: "Founded in" } },
      { num: 2800,   label: { fr: "Réparations (2018)", en: "Repairs (2018)" } },
      { num: 11000,  label: { fr: "Clients (2018)",    en: "Clients (2018)" } },
      { num: 6000,   label: { fr: "pi² d'atelier",     en: "sq ft workshop" } },
    ],
  },
  contact: {
    eyebrow: { fr: "Contact",  en: "Contact" },
    title:   { fr: "Joindre",  en: "Reach" },
    italic:  { fr: "L'atelier", en: "The shop" },
    addr: "765 route Principale, Wickham, QC J0C 1S0",
    phone: "819 398-6673",
    fax:   "819 398-6674",
    email: "marcominimecanique@cgocable.ca",
    hours: {
      week:    { fr: "Lundi–vendredi : 8 h – 12 h / 13 h – 17 h",  en: "Mon–Fri: 8:00–12:00 / 13:00–17:00" },
      sat:     { fr: "Samedi : 9 h – 12 h",                          en: "Sat: 9:00–12:00" },
      lunch:   { fr: "Fermé sur l'heure du dîner et les jours fériés", en: "Closed for lunch and on holidays" },
    },
    payment: { fr: "Visa · Mastercard · Interac débit", en: "Visa · Mastercard · Interac debit" },
  },
  footer: {
    since:    { fr: "Depuis 1999",   en: "Since 1999" },
    credit:   { fr: "Signé GLAMMBOX", en: "Signed GLAMMBOX" },
    langSwap: { fr: "EN",            en: "FR" },
  },
};

const SERVICE_AREA = [
  "St-Nazaire", "St-Théodore", "Lefebvre", "St-Nicéphore", "St-Germain",
  "Drummondville", "Acton Vale", "Durham-Sud", "L'Avenir", "Upton",
  "St-Majorique", "St-Charles-de-Drummond",
];

const ATELIER_SERVICES = [
  { fr: "VTT — démarrage, transmission, entretien, réparation saisonnière.", en: "ATV — starting, drivetrain, maintenance, seasonal repair.", img: "/assets/equipment-husqvarna-automower.jpg" },
  { fr: "Moto — inspection, entretien, réparation mécanique.", en: "Motorcycle — inspection, service, mechanical repair.", img: "/assets/equipment-carrousel-promo.jpg" },
  { fr: "Scie à chaîne — démarrage, système de chaîne, performance de coupe.", en: "Chainsaw — starting, chain system, cutting performance.", img: "/assets/product-husqvarna-550xp-mark2.jpg" },
  { fr: "Souffleuse — courroies, entretien moteur, préparation hivernale.", en: "Snowblower — belts, engine service, winter readiness.", img: "/assets/product-husqvarna-st224.jpg" },
  { fr: "Tracteur à gazon — plateau de coupe, entretien moteur, maintenance saisonnière.", en: "Lawn tractor — cutting deck, engine service, seasonal maintenance.", img: "/assets/product-husqvarna-ts248xd.jpg" },
  { fr: "Scie à béton — réparation moteur, entraînement, préparation chantier.", en: "Concrete saw — engine repair, drive service, jobsite readiness.", img: "/assets/product-stihl-ms462cm.jpg" },
  { fr: "Pilonneuse / compacteur — entretien et réparation d'équipement de compaction.", en: "Jumping jack / compactor — compaction equipment service and repair.", img: "/assets/equipment-fendeuse-splitter.jpg" },
  { fr: "Génératrice — démarrage, sortie de courant, entretien.", en: "Generator — starting, output, maintenance.", img: "/assets/equipment-splitfire-splitter.jpg" },
  { fr: "Moteur stationnaire — diagnostic, réparation, entretien.", en: "Stationary motor — diagnosis, repair, maintenance.", img: "/assets/product-portablewinch-pcw3000.png" },
  { fr: "Débroussailleuse — réponse d'accélération, entraînement de tête, entretien moteur.", en: "Brush cutter — throttle response, head drive, engine service.", img: "/assets/product-stihl-fs91r.jpg" },
  { fr: "Taille-haies — système de coupe, entretien moteur, maintenance.", en: "Hedge trimmer — cutting system, engine service, maintenance.", img: "/assets/product-husqvarna-525lk.jpg" },
];

type Product = { slug: string; img: string; name: string; cat: string; power: string; fr: string; en: string };
type Brand = { slug: string; name: string; logo: string; products: Product[] };

const SHOWROOM: Brand[] = [
  {
    slug: "husqvarna", name: "Husqvarna", logo: "/assets/logo-husqvarna-official.png",
    products: [
      { slug: "550xp", img: "/assets/product-husqvarna-550xp-mark2.jpg", name: "550 XP Mark II", cat: "Tronçonneuse", power: "Essence 50cc", fr: "Tronçonneuse pro 50cc pour abattage, ébranchage et tronçonnage exigeants.", en: "Pro 50cc chainsaw built for demanding felling, limbing and bucking work." },
      { slug: "540ixp", img: "/assets/product-husqvarna-540i-xp.jpg", name: "540i XP", cat: "Tronçonneuse", power: "Batterie 36V", fr: "Tronçonneuse 36V silencieuse, puissance équivalente à un moteur 40cc.", en: "36V cordless chainsaw with the cutting power of a 40cc petrol saw." },
      { slug: "st224", img: "/assets/product-husqvarna-st224.jpg", name: "ST 224", cat: "Souffleuse", power: "Essence 208cc", fr: "Souffleuse 2 étages 208cc, largeur 24 po, pour entrées résidentielles.", en: "Two-stage 208cc snow thrower, 24-inch clearing width for driveways." },
      { slug: "st430t", img: "/assets/product-husqvarna-st430t.jpg", name: "ST 430T", cat: "Souffleuse à chenilles", power: "Essence 420cc", fr: "Souffleuse 3 étages 420cc avec chenilles, vraie machine commerciale.", en: "Three-stage 420cc tracked snow thrower for commercial-grade work." },
      { slug: "le322", img: "/assets/product-husqvarna-lawn-xpert-le322.jpg", name: "Lawn Xpert LE-322", cat: "Tondeuse", power: "Batterie 40V", fr: "Tondeuse 40V autopropulsée 21 po, terrain de 1/4 à 1/2 acre.", en: "40V self-propelled 21-inch mower for 1/4 to 1/2 acre lawns." },
      { slug: "ts248", img: "/assets/product-husqvarna-ts248xd.jpg", name: "TS 248XD", cat: "Tracteur à gazon", power: "Kawasaki 23 HP", fr: "Tracteur 48 po, moteur Kawasaki 23 HP, différentiel à verrouillage.", en: "48-inch lawn tractor with 23 HP Kawasaki engine and locking differential." },
      { slug: "automower", img: "/assets/product-husqvarna-automower-450x-nera.jpg", name: "Automower 450X NERA", cat: "Robot tondeuse", power: "Batterie EPOS", fr: "Robot tondeuse sans fil EPOS pour terrains jusqu'à 5 000 m².", en: "Wire-free EPOS robotic mower for lawns up to 5,000 m²." },
      { slug: "350ib", img: "/assets/product-husqvarna-350ib.jpg", name: "350iB Leaf Blaster", cat: "Souffleur", power: "Batterie 40V", fr: "Souffleur 40V, 200 mi/h et 800 PCM, moteur sans balais.", en: "40V cordless blower delivering 200 mph and 800 cfm via brushless motor." },
      { slug: "525lk", img: "/assets/product-husqvarna-525lk.jpg", name: "525LK", cat: "Coupe-herbe pro", power: "Essence X-TORQ", fr: "Coupe-herbe pro X-TORQ à arbre amovible, attaches multi-outils.", en: "Pro X-TORQ trimmer with detachable shaft and multi-tool attachments." },
    ],
  },
  {
    slug: "stihl", name: "STIHL", logo: "/assets/logo-stihl-official.png",
    products: [
      { slug: "ms462", img: "/assets/product-stihl-ms462cm.jpg", name: "MS 462 C-M", cat: "Tronçonneuse pro", power: "Essence 72.2cc", fr: "Scie pro 72cc M-Tronic, 6 ch, abattage forestier intensif.", en: "Pro 72cc M-Tronic saw, 6 hp, heavy-duty felling." },
      { slug: "ms261", img: "/assets/product-stihl-ms261cm.jpg", name: "MS 261 C-M", cat: "Tronçonneuse pro", power: "Essence 50.2cc", fr: "Scie pro 50cc M-Tronic, légère pour usage quotidien.", en: "Pro 50cc M-Tronic saw, light for daily use." },
      { slug: "ms250", img: "/assets/product-stihl-ms250.jpg", name: "MS 250", cat: "Tronçonneuse maison", power: "Essence 45.4cc", fr: "Scie maison 45cc, bois de chauffage et entretien.", en: "Homeowner 45cc saw for firewood and property work." },
      { slug: "msa300", img: "/assets/product-stihl-msa300cb.jpg", name: "MSA 300 C-O", cat: "Tronçonneuse batterie", power: "Batterie 36V AP", fr: "Scie batterie pro 36V, 3 modes, barre 20 po.", en: "Pro 36V battery saw, 3 modes, 20 in. bar." },
      { slug: "br800", img: "/assets/product-stihl-br800cemagnum.jpg", name: "BR 800 C-E MAGNUM", cat: "Souffleur dorsal", power: "Essence 79.9cc", fr: "Souffleur dorsal pro 912 PCM, le plus puissant STIHL.", en: "Pro backpack blower 912 cfm, most powerful STIHL." },
      { slug: "bga250", img: "/assets/product-stihl-bga250.jpg", name: "BGA 250", cat: "Souffleur batterie", power: "Batterie 36V AP", fr: "Souffleur batterie 190 mi/h, 4 vitesses, IPX4.", en: "Battery blower 190 mph, 4 speeds, IPX4 rated." },
      { slug: "fs91r", img: "/assets/product-stihl-fs91r.jpg", name: "FS 91 R", cat: "Débroussailleuse", power: "4-MIX 28.4cc", fr: "Débroussailleuse 4-MIX poignée boucle, espaces serrés.", en: "4-MIX brushcutter, loop handle for tight spaces." },
    ],
  },
  {
    slug: "toro", name: "Toro", logo: "/assets/logo-toro-official.png",
    products: [
      { slug: "powermax928", img: "/assets/product-toro-powermax-hd-928-oae.jpg", name: "Power Max HD 928 OAE", cat: "Souffleuse 2 étages", power: "Essence 265cc", fr: "Souffleuse pro 28 po, 265cc, démarrage électrique, Quick Stick.", en: "Pro 28 in. two-stage, 265cc, electric start, Quick Stick." },
      { slug: "powerclear", img: "/assets/product-toro-powerclear-721-e.jpg", name: "Power Clear 721 E", cat: "Souffleuse simple", power: "Essence 212cc", fr: "Souffleuse simple étage 21 po, démarrage électrique.", en: "Single-stage 21 in. snowblower, electric start." },
      { slug: "powermax-e26", img: "/assets/product-toro-powermax-e26-60v.jpg", name: "Power Max e26 60V", cat: "Souffleuse batterie", power: "Batterie 60V", fr: "Souffleuse batterie 60V 26 po, anti-bourrage, phares DEL.", en: "60V battery two-stage 26 in., anti-clog, LED lights." },
      { slug: "recycler-60v", img: "/assets/product-toro-recycler-60v-22.jpg", name: "Recycler 60V 22 po", cat: "Tondeuse batterie", power: "Batterie 60V", fr: "Tondeuse batterie 60V 22 po, Personal Pace, SmartStow.", en: "60V battery 22 in. mower, Personal Pace, SmartStow." },
      { slug: "recycler-gas", img: "/assets/product-toro-recycler-22-gas-21465.jpg", name: "Recycler 22 po", cat: "Tondeuse essence", power: "B&S 150cc", fr: "Tondeuse essence 22 po, Personal Pace, SmartStow.", en: "Gas 22 in. self-propelled, Personal Pace, SmartStow." },
      { slug: "timecutter", img: "/assets/product-toro-timecutter-50.jpg", name: "TimeCutter 50 po", cat: "Virage zéro", power: "Kawasaki 23 HP", fr: "Tondeuse virage zéro 50 po, V-Twin Kawasaki 23 ch.", en: "50 in. zero-turn, 23 hp Kawasaki V-Twin engine." },
    ],
  },
  {
    slug: "ego", name: "EGO Power+", logo: "/assets/logo-ego-official.png",
    products: [
      { slug: "cs1604", img: "/assets/product-ego-chainsaw-cs1604.png", name: "CS1604", cat: "Tronçonneuse 16 po", power: "Batterie 56V", fr: "Tronçonneuse sans fil 16 po, moteur sans balais, batterie 56V 5,0 Ah.", en: "16-in cordless chainsaw, brushless motor, 56V 5.0Ah battery included." },
      { slug: "snt2400", img: "/assets/product-ego-snowblower-snt2400.png", name: "SNT2400", cat: "Souffleuse 24 po", power: "Batterie 56V Peak", fr: "Souffleuse auto-propulsée 24 po 2 étages, 4 phares DEL, 56V Peak Power.", en: "24-in self-propelled 2-stage snow blower, 4 LED lights, 56V Peak Power." },
      { slug: "lm2156sp", img: "/assets/product-ego-mower-sp-lm2156sp.png", name: "LM2156SP", cat: "Tondeuse Select Cut XP", power: "Batterie 56V 10Ah", fr: "Tondeuse auto-propulsée 21 po Select Cut XP, Touch Drive, batt. 56V 10 Ah.", en: "21-in Select Cut XP self-propelled mower, Touch Drive, 56V 10.0Ah." },
      { slug: "lm2114", img: "/assets/product-ego-mower-push-lm2114.png", name: "LM2114", cat: "Tondeuse à pousser", power: "Batterie 56V 6Ah", fr: "Tondeuse à pousser 21 po, 3-en-1, phares DEL, batt. 56V 6 Ah.", en: "21-in push mower, 3-in-1 mulch/bag/discharge, LED lights, 56V 6.0Ah." },
      { slug: "lb7654", img: "/assets/product-ego-blower-lb7654.png", name: "LB7654", cat: "Souffleur 765 PCM", power: "Batterie 56V", fr: "Souffleur à feuilles 765 PCM, 200 mi/h, sans balais, 90 min, 56V 5 Ah.", en: "765-cfm handheld blower, 200 mph, brushless, 90-min runtime, 56V 5.0Ah." },
      { slug: "st1623t", img: "/assets/product-ego-trimmer-st1623t.png", name: "ST1623T", cat: "Coupe-bordure 16 po", power: "Batterie 56V", fr: "Coupe-bordure 16 po Line IQ Powerload, arbre carbone télescopique, 56V 4 Ah.", en: "16-in Line IQ Powerload trimmer, telescopic carbon-fiber shaft, 56V 4.0Ah." },
    ],
  },
  {
    slug: "lawnboy", name: "Lawn Boy", logo: "/assets/logo-lawnboy-official.png",
    products: [
      { slug: "17752", img: "/assets/product-lawnboy-17752-sp.jpg", name: "17752", cat: "Tondeuse RWD", power: "B&S 140cc", fr: "Tondeuse 21 po auto-propulsée roues arrière, B&S 140cc sans vidange.", en: "21-in rear-wheel-drive self-propelled mower, B&S 140cc no-oil-change engine." },
      { slug: "17754", img: "/assets/product-lawnboy-17754-electric-start.jpg", name: "17754", cat: "Démarrage électrique", power: "B&S 150cc", fr: "Tondeuse 21 po auto-prop. démarrage électrique, B&S 150cc, sac 2 boisseaux.", en: "21-in self-propelled electric-start mower, B&S 150cc, 2-bushel bag." },
      { slug: "17750", img: "/assets/product-lawnboy-17750-push.jpg", name: "17750", cat: "À pousser hautes roues", power: "B&S 140cc", fr: "Tondeuse 21 po à pousser hautes roues, B&S 140cc, Tri-Cut acier.", en: "21-in high-wheel push mower, B&S 140cc no-oil-change, steel Tri-Cut deck." },
    ],
  },
  {
    slug: "wallenstein", name: "Wallenstein", logo: "/assets/logo-wallenstein-official.png",
    products: [
      { slug: "wx540", img: "/assets/product-wallenstein-wx540.jpg", name: "WX540", cat: "Fendeuse 20 t", power: "Honda GX200", fr: "Fendeuse 20 t, ouverture 24 po, horizontal/vertical, Honda GX200 196cc.", en: "20-ton splitter, 24-in opening, horizontal/vertical, Honda GX200 196cc." },
      { slug: "bx52s", img: "/assets/product-wallenstein-bx52s.jpg", name: "BX52S", cat: "Déchiqueteuse 5 po", power: "PTO", fr: "Déchiqueteuse PTO, capacité 5 po, alimentation gravité, rotor robuste.", en: "5-in PTO chipper, gravity infeed, heavy-duty rotor for branches." },
      { slug: "wp1624", img: "/assets/product-wallenstein-wp1624.jpg", name: "WP1624", cat: "Fendeuse-tronçonneuse", power: "PTO 14-40 HP", fr: "Fendeuse-tronçonneuse PTO, 20 t, convoyeur 12 pi, deck pliable.", en: "PTO firewood processor, 20-ton, 12-ft conveyor, fold-down live deck." },
    ],
  },
  {
    slug: "splitfire", name: "Split-Fire", logo: "/assets/logo-splitfire-official.png",
    products: [
      { slug: "3203", img: "/assets/product-splitfire-3203.jpg", name: "3203", cat: "Fendeuse 3-points", power: "Hydraulique 20 t", fr: "Fendeuse 3-points 20 t, 2 voies, bûches 36 po, cycle 9-14 s. Fait au Canada.", en: "20-ton 3-pt 2-way splitter, 36-in logs, 9-14s cycle. Made in Canada." },
      { slug: "3265", img: "/assets/product-splitfire-3265.jpg", name: "3265", cat: "Fendeuse remorquable", power: "Honda GX200", fr: "Fendeuse 2 voies à essence Honda GX200, standard des locations.", en: "2-way gas splitter, Honda GX200, North American rental industry standard." },
      { slug: "4403", img: "/assets/product-splitfire-4403.jpg", name: "4403", cat: "Fendeuse 32 t", power: "Hydraulique 32 t", fr: "Fendeuse 3-points 32 t, 2 voies, coin 4 voies, 2 900 PSI. Bois noueux.", en: "32-ton 3-pt 2-way splitter, 4-way wedge, 2,900 PSI for knotted hardwood." },
    ],
  },
  {
    slug: "portablewinch", name: "Portable Winch", logo: "/assets/logo-portablewinch-official.png",
    products: [
      { slug: "pcw3000", img: "/assets/product-portablewinch-pcw3000.png", name: "PCW3000", cat: "Treuil capstan", power: "Honda GX35", fr: "Treuil capstan portable 700 kg, Honda GX35, fait au Québec (Sherbrooke).", en: "Portable 1,550 lb capstan winch, Honda GX35, made in Sherbrooke QC." },
      { slug: "pcw5000", img: "/assets/product-portablewinch-pcw5000.jpg", name: "PCW5000", cat: "Treuil capstan", power: "Honda GXH50", fr: "Treuil capstan 1 000 kg, Honda GXH50, corde illimitée. Fab. Sherbrooke QC.", en: "2,200 lb capstan winch, Honda GXH50, unlimited rope, made in Sherbrooke QC." },
    ],
  },
  {
    slug: "oregon", name: "Oregon", logo: "/assets/logo-oregon-official.png",
    products: [
      { slug: "cs300", img: "/assets/product-oregon-cs300.png", name: "CS300", cat: "Tronçonneuse 16 po", power: "Batterie 40V MAX", fr: "Tronçonneuse sans-fil 40V, barre 16 po, auto-affûtage PowerSharp.", en: "40V cordless chainsaw, 16-in bar, on-saw PowerSharp self-sharpening." },
      { slug: "91px", img: "/assets/product-oregon-91px-chain.jpg", name: "91PX056G", cat: "Chaîne 16 po", power: "Consommable", fr: "Chaîne AdvanceCut 91PX, 3/8 po LP, .050, 56 maillons, barre 16 po.", en: "AdvanceCut 91PX chain, 3/8-in LP, .050, 56 DL, 16-in bar — fits major brands." },
      { slug: "91-239", img: "/assets/product-oregon-mower-blade-91-239.jpg", name: "91-239", cat: "Lame 20-1/2 po", power: "Consommable", fr: "Lame de tondeuse 20-1/2 po, acier trempé, remplacement OEM multi-marques.", en: "20-1/2-in mower blade, hardened steel, multi-brand OEM replacement." },
    ],
  },
];

const VIDEOS = [
  { id: "YafJShA9Gkg", title: "Husqvarna 550 XP",          brand: "Husqvarna" },
  { id: "iVfe7p_XMro", title: "Husqvarna mower",            brand: "Husqvarna" },
  { id: "A863vEUEUC4", title: "STIHL Lithium Ion range",    brand: "STIHL" },
  { id: "elYO6PU6n_g", title: "STIHL Chains explainer",     brand: "STIHL" },
  { id: "YLkUlbo41b4", title: "Toro TimeCutter SS / SW",    brand: "Toro" },
  { id: "O6rCWyN4OHM", title: "Toro SnowMaster",            brand: "Toro" },
  { id: "TJEQ1EYyo0w", title: "Lawn Boy AWD mowers",        brand: "Lawn Boy" },
  { id: "gaDNTsv9qx4", title: 'Toro TimeMaster 30"',        brand: "Toro" },
];

function isOpenInQuebec(now: Date) {
  const utc = now.getTime();
  const offsetMin = -240;
  const local = new Date(utc + offsetMin * 60 * 1000);
  const day = local.getUTCDay();
  const h = local.getUTCHours();
  const m = local.getUTCMinutes();
  const t = h * 60 + m;
  if (day === 0) return false;
  if (day === 6) return t >= 9 * 60 && t < 12 * 60;
  return (t >= 8 * 60 && t < 12 * 60) || (t >= 13 * 60 && t < 17 * 60);
}

function HeadingItalic({ before, italic, after, className }: { before?: string; italic: string; after?: string; className?: string }) {
  return (
    <h2 className={className}>
      {before && <span className="word inline-block">{before} </span>}
      <span className="word word-emphasis italic inline-block">{italic}</span>
      {after && <span className="word inline-block"> {after}</span>}
    </h2>
  );
}

function VideoTile({ id, title, brand }: { id: string; title: string; brand: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className="video-tile">
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button type="button" className="video-poster" onClick={() => setActive(true)} aria-label={`${title} — ${brand}`}>
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={`${title} — ${brand}`}
            loading="lazy"
            width={480}
            height={360}
          />
          <span className="video-play" aria-hidden="true">▶</span>
        </button>
      )}
      <div className="video-meta">
        <span>
          <span className="video-brand">{brand}</span>
          <span className="video-title">{title}</span>
        </span>
        <a
          className="video-link"
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noreferrer"
        >
          YouTube
        </a>
      </div>
    </div>
  );
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("fr");
  const [open, setOpen] = useState<boolean | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => setOpen(isOpenInQuebec(new Date()));
    update();
    const i = setInterval(update, 60_000);
    return () => clearInterval(i);
  }, []);

  useAnimations(rootRef, lang);

  const t = (k: { fr: string; en: string }) => k[lang];
  const activeBrand = useMemo(() => SHOWROOM.find((brand) => brand.slug === selectedBrand) ?? null, [selectedBrand]);
  const featuredProducts = useMemo(() => [
    { brand: SHOWROOM[0], product: SHOWROOM[0].products[0] },
    { brand: SHOWROOM[1], product: SHOWROOM[1].products[1] },
    { brand: SHOWROOM[2], product: SHOWROOM[2].products[0] },
    { brand: SHOWROOM[3], product: SHOWROOM[3].products[1] },
  ], []);

  const navItems = useMemo(() => [
    { href: "#atelier",   label: t(COPY.nav.repair) },
    { href: "#showroom",  label: t(COPY.nav.showroom) },
    { href: "#videos",    label: t(COPY.nav.videos) },
    { href: "#parts",     label: t(COPY.nav.parts) },
    { href: "#pickup",    label: t(COPY.nav.pickup) },
    { href: "#about",     label: t(COPY.nav.about) },
    { href: "#contact",   label: t(COPY.nav.contact) },
  ], [lang]);

  return (
    <div ref={rootRef} className="page" lang={lang === "fr" ? "fr-CA" : "en-CA"}>
      <a href="#main" className="skip-link">{lang === "fr" ? "Aller au contenu" : "Skip to content"}</a>

      <header className="site-nav">
        <a href="#main" className="brand-mark">
          <span className="brand-mark-name">Marco Mini Mécanique</span>
          <span className="brand-mark-since">— Wickham · {t(COPY.footer.since)}</span>
        </a>
        <nav aria-label="Primary">
          <ul>
            {navItems.map((n) => (
              <li key={n.href}><a href={n.href}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <span className={`hours-badge ${open === false ? "is-closed" : "is-open"}`}>
            <span className="hours-dot" aria-hidden="true" />
            {open === false ? t(COPY.status.closed) : t(COPY.status.open)}
          </span>
          <button type="button" className="lang-toggle" onClick={() => setLang(lang === "fr" ? "en" : "fr")} aria-label="Toggle language">
            {COPY.footer.langSwap[lang]}
          </button>
        </div>
      </header>

      <main id="main">
        {/* HERO — cinematic-hero-parallax-real-shop-photo (marco-mini-mecanique) */}
        <section className="hero" aria-label={t(COPY.hero.title)}>
          <div className="hero-layers" aria-hidden="true">
            <div className="layer layer-bg">
              <img
                className="hero-bg-img"
                src="/assets/hero.jpg"
                alt=""
                aria-hidden="true"
                draggable={false}
              />
            </div>
            <div className="layer layer-mid" />
            <div className="liquid-veil liquid-veil-a" />
            <div className="liquid-veil liquid-veil-b" />
            <div className="layer layer-fg" />
          </div>
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">{t(COPY.hero.eyebrow)}</p>
              <h1 className="hero-title">
                <span className="word inline-block">Marco </span>
                <span className="word inline-block">Mini </span>
                <span className="word word-emphasis italic inline-block">{t(COPY.hero.italicWord)}</span>
              </h1>
              <p className="hero-sub">{t(COPY.hero.sub)}</p>
              <p className="hero-sub small">{t(COPY.hero.sub2)}</p>
              <div className="hero-cta">
                <a href="tel:8193986673" className="cta cta-primary">{t(COPY.hero.callCta)}</a>
                <a href="#contact" className="cta cta-ghost">{t(COPY.hero.serviceCta)}</a>
                <a href="#pickup" className="cta cta-ghost">{t(COPY.hero.pickupCta)}</a>
              </div>
            </div>
          </div>
        </section>

        {/* ATELIER (marco-mini-mecanique) */}
        <section id="atelier" className="section atelier">
          <p className="eyebrow">{t(COPY.atelier.eyebrow)}</p>
          <HeadingItalic before={t(COPY.atelier.title)} italic={t(COPY.atelier.italicWord)} className="section-title" />
          <p className="section-lead">{t(COPY.atelier.note)}</p>
          <ul className="atelier-grid">
            {ATELIER_SERVICES.map((s, i) => (
              <li key={i} className="atelier-card">
                <div className="atelier-img">
                  <img src={s.img} alt="" loading="lazy" />
                </div>
                <p className="atelier-line">{lang === "fr" ? s.fr : s.en}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* SHOWROOM — dealer-style brand cards, products revealed on click only */}
        <section id="showroom" className="section showroom">
          <p className="eyebrow">{t(COPY.showroom.eyebrow)}</p>
          <HeadingItalic before={t(COPY.showroom.title)} italic={t(COPY.showroom.italicWord)} className="section-title" />
          <p className="section-lead">{t(COPY.showroom.intro)}</p>

          <div className="showroom-panel">
            <div className="showroom-panel-head">
              <h3>{t(COPY.showroom.featured)}</h3>
              <p>{t(COPY.showroom.sourceNote)}</p>
            </div>
            <div className="featured-products">
              {featuredProducts.map(({ brand, product }) => (
                <button
                  type="button"
                  key={`${brand.slug}-${product.slug}`}
                  className="featured-product-card"
                  onClick={() => setSelectedBrand(brand.slug)}
                  aria-label={`${brand.name} ${product.name}`}
                >
                  <span className="featured-brand">{brand.name}</span>
                  <span className="featured-img"><img src={product.img} alt="" loading="lazy" /></span>
                  <span className="featured-name">{product.name}</span>
                  <span className="featured-desc">{lang === "fr" ? product.fr : product.en}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="showroom-panel brand-chooser">
            <div className="showroom-panel-head">
              <h3>{t(COPY.showroom.allBrands)}</h3>
              <p>{t(COPY.showroom.hint)}</p>
            </div>
            <div className="brand-choice-grid">
              {SHOWROOM.map((brand) => {
                const lead = brand.products[0];
                const isActive = selectedBrand === brand.slug;
                return (
                  <button
                    type="button"
                    key={brand.slug}
                    className={`brand-choice-card ${isActive ? "is-active" : ""}`}
                    onClick={() => setSelectedBrand(isActive ? null : brand.slug)}
                    aria-expanded={isActive}
                    aria-controls="showroom-product-drawer"
                  >
                    <span className="brand-choice-logo">
                      <img src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
                    </span>
                    <span className="brand-choice-copy">
                      <strong>{brand.name}</strong>
                      <span>{brand.products.length} {lang === "fr" ? "fiches produits" : "product cards"}</span>
                      <small>{lead.cat} · {lead.power}</small>
                    </span>
                    <span className="brand-choice-product">
                      <img src={lead.img} alt="" loading="lazy" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeBrand && (
            <article id="showroom-product-drawer" className="showroom-drawer" aria-live="polite">
              <header className="drawer-header">
                <div className="brand-logo-wrap">
                  <img src={activeBrand.logo} alt={`${activeBrand.name} logo`} loading="lazy" />
                </div>
                <div>
                  <p className="eyebrow">{t(COPY.showroom.eyebrow)}</p>
                  <h3 className="brand-name">{activeBrand.name}</h3>
                  <p className="drawer-note">{t(COPY.showroom.sourceNote)}</p>
                </div>
                <button type="button" className="drawer-close" onClick={() => setSelectedBrand(null)}>
                  {t(COPY.showroom.close)}
                </button>
              </header>
              <div className="product-grid">
                {activeBrand.products.map((p) => (
                  <article key={p.slug} className="product-card product-card-clickable">
                    <div className="product-img">
                      <img src={p.img} alt={`${activeBrand.name} ${p.name}`} loading="lazy" />
                    </div>
                    <div className="product-meta">
                      <p className="product-cat">{p.cat}</p>
                      <h4 className="product-name">{p.name}</h4>
                      <p className="product-power">{p.power}</p>
                      <p className="product-desc">{lang === "fr" ? p.fr : p.en}</p>
                      <a className="product-action" href="#contact">{t(COPY.showroom.availability)}</a>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          )}
        </section>

        {/* VIDEOS (marco-mini-mecanique) */}
        <section id="videos" className="section videos">
          <p className="eyebrow">{t(COPY.videos.eyebrow)}</p>
          <HeadingItalic before={t(COPY.videos.title)} italic={t(COPY.videos.italic)} className="section-title" />
          <p className="section-lead">{t(COPY.videos.note)}</p>
          <div className="video-grid">
            {VIDEOS.map((v) => (
              <VideoTile key={v.id} {...v} />
            ))}
          </div>
        </section>

        {/* PARTS (marco-mini-mecanique) */}
        <section id="parts" className="section parts">
          <p className="eyebrow">{t(COPY.parts.eyebrow)}</p>
          <HeadingItalic before={t(COPY.parts.title)} italic={t(COPY.parts.italic)} className="section-title" />
          <p className="section-lead">{t(COPY.parts.body)}</p>
        </section>

        {/* PICKUP (marco-mini-mecanique) */}
        <section id="pickup" className="section pickup">
          <p className="eyebrow">{t(COPY.pickup.eyebrow)}</p>
          <HeadingItalic before={t(COPY.pickup.title)} italic={t(COPY.pickup.italic)} className="section-title" />
          <p className="section-lead">{t(COPY.pickup.body)}</p>
          <div className="pickup-area">
            <p className="area-label">{t(COPY.pickup.areaLabel)}</p>
            <ul className="area-list">
              {SERVICE_AREA.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ABOUT — Historique with stat counters (marco-mini-mecanique) */}
        <section id="about" className="section about">
          <p className="eyebrow">{t(COPY.about.eyebrow)}</p>
          <HeadingItalic before={t(COPY.about.title)} italic={t(COPY.about.italicWord)} className="section-title" />
          <div className="about-grid">
            <div className="about-photo">
              <img src="/assets/shop-devanture.jpg" alt="765 route Principale, Wickham" loading="lazy" />
            </div>
            <div className="about-copy">
              <p>{t(COPY.about.body1)}</p>
              <p>{t(COPY.about.body2)}</p>
              <blockquote className="about-quote">
                <p>{t(COPY.about.quote)}</p>
                <footer>{t(COPY.about.quoteAttr)}</footer>
              </blockquote>
            </div>
          </div>
          <ul className="stats-grid" aria-label="Historique chiffres">
            {COPY.about.stats.map((s) => (
              <li key={s.num} className="stat">
                <span className="stat-num" data-target={s.num}>0</span>
                <span className="stat-label">{t(s.label)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CONTACT (marco-mini-mecanique) */}
        <section id="contact" className="section contact">
          <p className="eyebrow">{t(COPY.contact.eyebrow)}</p>
          <HeadingItalic before={t(COPY.contact.title)} italic={t(COPY.contact.italic)} className="section-title" />
          <div className="contact-grid">
            <div className="contact-card">
              <p className="contact-card-title">{lang === "fr" ? "Atelier" : "Shop"}</p>
              <p className="contact-name">Marco Mini Mécanique</p>
              <p>{COPY.contact.addr}</p>
              <p><a href="tel:8193986673">{COPY.contact.phone}</a></p>
              <p>{lang === "fr" ? "Téléc. " : "Fax "}{COPY.contact.fax}</p>
              <p><a href={`mailto:${COPY.contact.email}`}>{COPY.contact.email}</a></p>
              <p className="contact-payment">{t(COPY.contact.payment)}</p>
            </div>
            <div className="contact-card">
              <p className="contact-card-title">{lang === "fr" ? "Heures" : "Hours"}</p>
              <p>{t(COPY.contact.hours.week)}</p>
              <p>{t(COPY.contact.hours.sat)}</p>
              <p className="muted">{t(COPY.contact.hours.lunch)}</p>
            </div>
            <div className="contact-card map-card">
              <iframe
                title="Marco Mini Mécanique map"
                src="https://www.google.com/maps?q=765+route+Principale,+Wickham,+QC&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <p className="footer-name">Marco Mini Mécanique</p>
          <p className="muted">{COPY.contact.addr} · {COPY.contact.phone}</p>
        </div>
        <p className="footer-since">{t(COPY.footer.since)}</p>
        <p className="muted">{t(COPY.footer.credit)}</p>
      </footer>
    </div>
  );
}
