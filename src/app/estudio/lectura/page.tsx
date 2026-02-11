import type { Metadata } from "next";
import StudyLecturaClient from "./StudyLecturaClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://icfes2026.vercel.app";

export const metadata: Metadata = {
  title: "Estudio de Lectura Crítica | Prepárate ICFES Saber 11",
  description:
    "Estudia lectura crítica con 49 preguntas reales del ICFES Saber 11 y sus explicaciones.",
  alternates: {
    canonical: `${siteUrl}/estudio/lectura`,
  },
  openGraph: {
    title: "Estudio de Lectura Crítica | Prepárate ICFES",
    description:
      "Comprende textos y argumentos con explicaciones claras.",
    url: `${siteUrl}/estudio/lectura`,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio de Lectura Crítica | Prepárate ICFES",
    description:
      "Comprende textos y argumentos con explicaciones claras.",
    images: ["/og.png"],
  },
};

export default function StudyLecturaPage() {
  return <StudyLecturaClient />;
}
