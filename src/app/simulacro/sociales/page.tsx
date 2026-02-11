import type { Metadata } from "next";
import SimulacroSocialesClient from "./SimulacroSocialesClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://icfes2026.vercel.app";

export const metadata: Metadata = {
  title: "Simulacro de Sociales y Ciudadanas | Prepárate ICFES Saber 11",
  description:
    "Practica con 48 preguntas reales de sociales y ciudadanas del examen ICFES Saber 11.°. Simulacro gratuito con explicaciones detalladas.",
  alternates: {
    canonical: `${siteUrl}/simulacro/sociales`,
  },
  openGraph: {
    title: "Simulacro de Sociales y Ciudadanas | Prepárate ICFES",
    description:
      "48 preguntas verificadas de sociales y ciudadanas del Saber 11.°. Practica gratis.",
    url: `${siteUrl}/simulacro/sociales`,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulacro de Sociales y Ciudadanas | Prepárate ICFES",
    description:
      "48 preguntas verificadas de sociales y ciudadanas del Saber 11.°. Practica gratis.",
    images: ["/og.png"],
  },
};

export default function SimulacroSocialesPage() {
  return <SimulacroSocialesClient />;
}
