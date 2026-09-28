import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Familia de marca Atheron (recuperado de V5.2): "Atheron" en el logo
 * usa Fraunces, igual que Atheron Suite. Solo para el lockup del logo
 * (`Logo.tsx`) — el resto de la tipografía del sitio sigue en Geist.
 *
 * `display: "optional"` (medido en V5.2, no supuesto): con "swap" el
 * LCP mobile empeoraba porque el elemento LCP pasaba a ser el texto
 * "Atheron" del logo esperando la fuente. "optional" usa Fraunces solo
 * si ya está lista casi de inmediato; si no, se queda en la fuente de
 * reserva para ese pintado y nunca bloquea el LCP.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600"],
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.name} — Seguridad que crece contigo`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Atheron Security te acompaña de una cámara a un sistema completo de seguridad: cámaras, alarmas, control de acceso y automatización.",
  openGraph: {
    siteName: siteConfig.name,
    locale: "es_CO",
    type: "website",
    images: ["/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  // Gate de indexación (auditoría 001B, hallazgo P0): noindex,nofollow en
  // TODO el sitio por herencia hasta que siteConfig.allowIndexing sea true.
  ...(siteConfig.allowIndexing ? {} : { robots: { index: false, follow: false } }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-text">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
