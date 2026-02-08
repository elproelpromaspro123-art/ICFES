import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-icfes-dark text-white py-10">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm text-white/70 mb-3">
          Este sitio web es un proyecto educativo sin fines de lucro.
          Toda la información es 100% oficial y ha sido recopilada de la{" "}
          <a
            href="https://www.icfes.gov.co/caja-de-herramientas-saber-11/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-icfes-yellow hover:underline inline-flex items-center gap-1"
          >
            Caja de Herramientas del ICFES
            <ExternalLink className="w-3 h-3" />
          </a>
        </p>
        <p className="text-xs text-white/40">
          ICFES® y Saber 11° son marcas registradas del Instituto Colombiano para la Evaluación de la Educación.
        </p>
      </div>
    </footer>
  );
}
