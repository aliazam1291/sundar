import { Anton, Fraunces, Familjen_Grotesk, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const familjen = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin"],
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
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
  keywords: [
    "Sunder Masala",
    "Indian spices",
    "masala",
    "garam masala",
    "Indori Jeeravan",
    "single origin spices",
    "Madhya Pradesh",
  ],
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
      className={`${anton.variable} ${fraunces.variable} ${familjen.variable} ${tiro.variable} h-full`}
    >
      <body className="grain min-h-full flex flex-col bg-paper text-ink">
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
