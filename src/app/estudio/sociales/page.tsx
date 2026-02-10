import type { Metadata } from "next";
import StudySocialesClient from "./StudySocialesClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://icfes2026.vercel.app";

export const metadata: Metadata = {
  title: "Estudio de Sociales | Prepárate ICFES Saber 11",
  description:
    "Estudia sociales y ciudadanas con 48 preguntas reales del ICFES Saber 11 y sus explicaciones.",
  alternates: {
    canonical: `${siteUrl}/estudio/sociales`,
  },
  openGraph: {
    title: "Estudio de Sociales | Prepárate ICFES",
    description:
      "Analiza ciudadanía, historia y sociedad con apoyo guiado.",
    url: `${siteUrl}/estudio/sociales`,
  },
};

export default function StudySocialesPage() {
  return <StudySocialesClient />;
}
