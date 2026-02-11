import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfografiaSection from "@/components/InfografiaSection";
import SimulacroSection from "@/components/SimulacroSection";
import StudySection from "@/components/StudySection";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://icfes2026.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Prepárate ICFES",
  url: siteUrl,
  description:
    "Proyecto educativo independiente y gratuito para prepararte para el examen ICFES Saber 11°. Simulacros, infografías y material recopilado de fuentes públicas.",
  inLanguage: "es-CO",
  publisher: {
    "@type": "Organization",
    name: "Prepárate ICFES",
  },
  isAccessibleForFree: true,
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <StudySection />
      <SimulacroSection />
      <InfografiaSection />
      <InfoSection />
      <Footer />
    </main>
  );
}
