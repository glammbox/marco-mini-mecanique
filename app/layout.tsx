// marco-mini-mecanique — root layout (FIX iter 3)
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://marco-mini-mecanique.vercel.app"),
  applicationName: "Marco Mini Mécanique",
  title: {
    default: "Marco Mini Mécanique — Wickham · Réparation & Showroom depuis 1999",
    template: "%s · Marco Mini Mécanique",
  },
  description:
    "Marco Mini Mécanique, Wickham (Centre-du-Québec). Réparation de petits moteurs, pièces, ramassage/livraison et salle de montre depuis 1999.",
  alternates: {
    canonical: "https://marco-mini-mecanique.vercel.app/",
    languages: {
      "fr-CA": "https://marco-mini-mecanique.vercel.app/",
      "en-CA": "https://marco-mini-mecanique.vercel.app/",
    },
  },
  openGraph: {
    title: "Marco Mini Mécanique — Wickham depuis 1999",
    description:
      "Réparation, pièces, ramassage/livraison et salle de montre à Wickham. Détaillant autorisé pour 9 marques d'équipement.",
    siteName: "Marco Mini Mécanique",
    url: "https://marco-mini-mecanique.vercel.app/",
    type: "website",
    locale: "fr_CA",
    alternateLocale: ["en_CA"],
    images: [{ url: "/assets/shop-devanture.jpg", width: 1600, height: 1067, alt: "Marco Mini Mécanique — devanture à Wickham" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marco Mini Mécanique — Wickham depuis 1999",
    description: "Réparation, pièces et salle de montre à Wickham.",
    images: ["/assets/shop-devanture.jpg"],
  },
  appleWebApp: { title: "Marco Mini Mécanique" },
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