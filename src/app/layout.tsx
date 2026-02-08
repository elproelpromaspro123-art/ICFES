import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prepárate para el ICFES Saber 11° | Práctica Gratuita",
  description:
    "Proyecto educativo independiente y gratuito para prepararte para el examen ICFES Saber 11°. Simulacros, infografías y material recopilado de fuentes públicas. No afiliado con el ICFES.",
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
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Prepárate para el ICFES Saber 11° | Práctica Gratuita",
    description:
      "Proyecto educativo independiente y gratuito para prepararte para el examen ICFES Saber 11°. Simulacros, infografías y material recopilado de fuentes públicas.",
    type: "website",
    locale: "es_CO",
    siteName: "Prepárate ICFES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prepárate para el ICFES Saber 11°",
    description:
      "Simulacros gratuitos e infografías para prepararte para el Saber 11°. Proyecto educativo independiente.",
  },
  robots: {
    index: true,
    follow: true,
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
        {children}
      </body>
    </html>
  );
}
