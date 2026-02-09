import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CopyProtection from "@/components/CopyProtection";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://icfes2026.vercel.app";
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: "Prepárate para el ICFES Saber 11 | Práctica Gratuita",
  description:
    "Proyecto educativo independiente y gratuito para prepararte para el examen ICFES Saber 11. Simulacros, infografías y material recopilado de fuentes públicas. No afiliado con el ICFES.",
  keywords: [
    "ICFES",
    "Saber 11",
    "práctica",
    "simulacro",
    "Colombia",
    "matemáticas",
    "preparación ICFES",
    "examen de estado",
  ],
  authors: [{ name: "Prepárate ICFES" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Prepárate para el ICFES Saber 11 | Práctica Gratuita",
    description:
      "Proyecto educativo independiente y gratuito para prepararte para el examen ICFES Saber 11. Simulacros, infografías y material recopilado de fuentes públicas.",
    type: "website",
    locale: "es_CO",
    siteName: "Prepárate ICFES",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Prepárate ICFES - Práctica gratuita para el Saber 11",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prepárate para el ICFES Saber 11",
    description:
      "Simulacros gratuitos e infografías para prepararte para el Saber 11. Proyecto educativo independiente.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CopyProtection />
        {children}
      </body>
    </html>
  );
}
