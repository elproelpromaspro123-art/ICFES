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
    "Plataforma gratuita de preparación para el examen ICFES Saber 11° con simulacros, infografías y material oficial verificado.",
  keywords: ["ICFES", "Saber 11", "práctica", "simulacro", "Colombia", "matemáticas"],
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
        {children}
      </body>
    </html>
  );
}
