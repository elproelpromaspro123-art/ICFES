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
  title: "Prep�rate para el ICFES Saber 11� | Pr�ctica Gratuita",
  description:
    "Proyecto educativo independiente y gratuito para prepararte para el examen ICFES Saber 11�. Simulacros, infograf�as y material recopilado de fuentes p�blicas. No afiliado con el ICFES.",
  keywords: [
    "ICFES",
    "Saber 11",
    "pr�ctica",
    "simulacro",
    "Colombia",
    "matem�ticas",
    "preparaci�n ICFES",
    "examen de estado",
  ],
  authors: [{ name: "Prep�rate ICFES" }],
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
    title: "Prep�rate para el ICFES Saber 11� | Pr�ctica Gratuita",
    description:
      "Proyecto educativo independiente y gratuito para prepararte para el examen ICFES Saber 11�. Simulacros, infograf�as y material recopilado de fuentes p�blicas.",
    type: "website",
    locale: "es_CO",
    siteName: "Prep�rate ICFES",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prep�rate para el ICFES Saber 11�",
    description:
      "Simulacros gratuitos e infograf�as para prepararte para el Saber 11�. Proyecto educativo independiente.",
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CopyProtection />
        {children}
      </body>
    </html>
  );
}
