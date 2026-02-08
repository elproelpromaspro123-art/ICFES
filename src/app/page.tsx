import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfografiaSection from "@/components/InfografiaSection";
import SimulacroSection from "@/components/SimulacroSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <InfografiaSection />
      <SimulacroSection />
      <Footer />
    </main>
  );
}
