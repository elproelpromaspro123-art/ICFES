import type { Metadata } from "next";
import StudyMatematicasClient from "./StudyMatematicasClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://icfes2026.vercel.app";

export const metadata: Metadata = {
  title: "Estudio de Matemáticas | Prepárate ICFES Saber 11",
  description:
    "Estudia con 50 preguntas reales de matemáticas del ICFES Saber 11 con explicaciones claras.",
  alternates: {
    canonical: `${siteUrl}/estudio/matematicas`,
  },
  openGraph: {
    title: "Estudio de Matemáticas | Prepárate ICFES",
    description:
      "Repasa matemáticas con preguntas reales y explicación paso a paso.",
    url: `${siteUrl}/estudio/matematicas`,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio de Matemáticas | Prepárate ICFES",
    description:
      "Repasa matemáticas con preguntas reales y explicación paso a paso.",
    images: ["/og.png"],
  },
};

export default function StudyMatematicasPage() {
  return <StudyMatematicasClient />;
}
