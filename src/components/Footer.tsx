import { ExternalLink, Heart, ShieldAlert } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-icfes-dark text-white py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-5 h-5 text-icfes-yellow shrink-0" />
              <h3 className="font-semibold text-sm">Aviso Legal</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Este es un proyecto educativo independiente, sin fines de lucro y{" "}
              <strong className="text-white/90">
                NO está afiliado, respaldado ni asociado con el ICFES ni con el
                Gobierno de Colombia.
              </strong>
            </p>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              La información aquí presentada fue recopilada de materiales
              públicamente disponibles en la{" "}
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
          </div>

          <div className="flex-1 md:text-right">
            <div className="flex items-center gap-2 mb-3 md:justify-end">
              <Heart className="w-5 h-5 text-icfes-yellow shrink-0" />
              <h3 className="font-semibold text-sm">Proyecto Educativo</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Hecho con dedicación para ayudar a estudiantes colombianos a
              prepararse para el examen Saber 11°.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-6">
          <p className="text-xs text-white/40 text-center">
            ICFES® y Saber 11° son marcas registradas del Instituto Colombiano
            para la Evaluación de la Educación. Este sitio no representa ni
            actúa en nombre del ICFES.
          </p>
        </div>
      </div>
    </footer>
  );
}
