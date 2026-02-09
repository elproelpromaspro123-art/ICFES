import type { Metadata } from "next";
import SimulacroMatematicasClient from "./SimulacroMatematicasClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://icfes2026.vercel.app";

export const metadata: Metadata = {
  title: "Simulacro de Matemáticas | Prepárate ICFES Saber 11",
  description:
    "Practica con 50 preguntas reales de matemáticas del examen ICFES Saber 11°. Simulacro gratuito con explicaciones detalladas.",
  alternates: {
    canonical: `${siteUrl}/simulacro/matematicas`,
  },
  openGraph: {
    title: "Simulacro de Matemáticas | Prepárate ICFES",
    description:
      "50 preguntas verificadas de matemáticas del Saber 11°. Practica gratis.",
    url: `${siteUrl}/simulacro/matematicas`,
  },
};

export default function SimulacroMatematicasPage() {
  return <SimulacroMatematicasClient />;
}
