import { Anton, Hanken_Grotesk, Cinzel, Baloo_2 } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

/* Brand fonts, per the Sunder Masala type spec:
   Anton = display · Hanken Grotesk = everything else
   Cinzel = Heritage accent · Baloo 2 = Regional accent (+ all Devanagari) */

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["devanagari", "latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://sundermasala.com"),
  title: {
    default: "Sunder Masala — Local Hero Masala · Since 1975",
    template: "%s · Sunder Masala",
  },
  description:
    "Kam masala, poora swaad. Fifty years of slow-ground, single-origin Indian spice blends from the heart of Madhya Pradesh — Heritage, Regions and Everyday Essentials.",
  /* Google has ignored meta keywords since 2009 — these are here for the
     handful of other engines and internal tooling that still read them. What
     actually earns the category traffic is the Product / Recipe / FAQPage
     markup in lib/seo.js and the comparison answers in the FAQ. */
  keywords: [
    "Sunder Masala",
    "Indian spices online",
    "masala brand India",
    "garam masala",
    "Indori jeeravan",
    "pav bhaji masala",
    "chole masala",
    "sambhar masala",
    "kashmiri mirchi powder",
    "asafoetida hing",
    "single origin spices",
    "no added preservatives masala",
    "Indore Madhya Pradesh",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Sunder Masala — Local Hero Masala",
    description:
      "Kam masala, poora swaad. Bring your region back to your plate. Slow-ground Indian spice blends since 1975.",
    type: "website",
    locale: "en_IN",
    siteName: "Sunder Masala",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunder Masala — Local Hero Masala",
    description: "Kam masala, poora swaad. Slow-ground Indian spice, since 1975.",
  },
};

export const viewport = {
  themeColor: "#0e3b2c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${anton.variable} ${hanken.variable} ${cinzel.variable} ${baloo.variable} h-full`}
    >
      <body className="grain min-h-full flex flex-col bg-paper text-ink">
        {/* Claimed once for the whole site rather than per page. */}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:btn focus:btn-gold"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
