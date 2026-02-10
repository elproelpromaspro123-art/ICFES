import type { Metadata } from "next";
import SimulacroLecturaClient from "./SimulacroLecturaClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://icfes2026.vercel.app";

export const metadata: Metadata = {
  title: "Simulacro de Lectura Crítica | Prepárate ICFES Saber 11",
  description:
    "Practica con 49 preguntas reales de lectura crítica del examen ICFES Saber 11.°. Simulacro gratuito con explicaciones detalladas.",
  alternates: {
    canonical: `${siteUrl}/simulacro/lectura`,
  },
  openGraph: {
    title: "Simulacro de Lectura Crítica | Prepárate ICFES",
    description:
      "49 preguntas verificadas de lectura crítica del Saber 11.°. Practica gratis.",
    url: `${siteUrl}/simulacro/lectura`,
  },
};

export default function SimulacroLecturaPage() {
  return <SimulacroLecturaClient />;
}
