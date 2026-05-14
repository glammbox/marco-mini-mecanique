// marco-mini-mecanique — root layout (FIX iter 3)
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://marcominimecanique.com"),
  title: "Marco Mini Mécanique — Wickham · Réparation & Showroom depuis 1999",
  description:
    "Marco Mini Mécanique, Wickham (Centre-du-Québec). Détaillant autorisé Husqvarna, STIHL, Toro, EGO, Lawn Boy, Wallenstein, Split-Fire, Portable Winch, Oregon. Réparation de petits moteurs et sports motorisés depuis 1999.",
  alternates: {
    canonical: "/",
    languages: {
      "fr-CA": "/",
      "en-CA": "/",
    },
  },
  openGraph: {
    title: "Marco Mini Mécanique — Wickham depuis 1999",
    description:
      "Réparation, pièces et salle de montre. Détaillant autorisé pour 9 marques d'équipement.",
    type: "website",
    locale: "fr_CA",
    alternateLocale: ["en_CA"],
    images: [{ url: "/assets/shop-devanture.jpg", width: 1600, height: 1067, alt: "765 route Principale, Wickham" }],
  },
  robots: { index: true, follow: true },
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
    addressCountry: "CA",
  },
  telephone: "+1-819-398-6673",
  faxNumber: "+1-819-398-6674",
  email: "marcominimecanique@cgocable.ca",
  url: "https://marcominimecanique.com",
  foundingDate: "1999",
  image: "/assets/shop-devanture.jpg",
  priceRange: "$$",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "12:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "13:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "12:00" },
  ],
  areaServed: [
    "St-Nazaire", "St-Théodore", "Lefebvre", "St-Nicéphore", "St-Germain",
    "Drummondville", "Acton Vale", "Durham-Sud", "L'Avenir", "Upton",
    "St-Majorique", "St-Charles-de-Drummond",
  ].map((n) => ({ "@type": "City", name: n })),
  brand: ["Husqvarna","STIHL","Toro","EGO Power+","Lawn Boy","Wallenstein","Split-Fire","Portable Winch","Oregon"]
    .map((n) => ({ "@type": "Brand", name: n })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}