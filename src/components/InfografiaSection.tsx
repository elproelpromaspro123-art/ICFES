"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  BookOpen,
  Globe2,
  FlaskConical,
  Languages,
  Lock,
  X,
  ChevronRight,
  Download,
} from "lucide-react";
import { useFocusTrap } from "@/lib/useFocusTrap";

const areas = [
  {
    name: "Matemáticas",
    icon: Calculator,
    available: true,
    color: "from-blue-500 to-blue-700",
    file: "/infografias/infografia-matematicas.pdf",
  },
  {
    name: "Lectura Crítica",
    icon: BookOpen,
    available: true,
    color: "from-red-400 to-red-600",
    file: "/infografias/infografia-lectura-critica.pdf",
  },
  {
    name: "Sociales y Ciudadanas",
    icon: Globe2,
    available: true,
    color: "from-green-400 to-green-600",
    file: "/infografias/infografia-sociales.pdf",
  },
  {
    name: "Ciencias Naturales",
    icon: FlaskConical,
    available: true,
    color: "from-purple-400 to-purple-600",
    file: "/infografias/infografia-ciencias.pdf",
  },
  {
    name: "Inglés",
    icon: Languages,
    available: true,
    color: "from-orange-400 to-orange-600",
    file: "/infografias/infografia-ingles.pdf",
  },
];

export default function InfografiaSection() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const selected = areas.find((a) => a.name === selectedArea);
  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef, Boolean(selected));

  const handleClose = useCallback(() => setSelectedArea(null), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedArea) handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedArea, handleClose]);

  return (
    <section
      id="infografias"
      className="py-16 bg-gradient-to-b from-white to-icfes-gray/40 border-t border-icfes-blue/10"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-icfes-blue mb-2">
            ¿Qué se evalúa?
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto text-sm">
            Infografías oficiales sobre las competencias evaluadas en cada área del examen Saber 11°.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <button
                key={area.name}
                onClick={() => area.available && setSelectedArea(area.name)}
                disabled={!area.available}
                className={`relative group rounded-2xl p-5 text-center transition-all duration-300 border-2 shadow-sm hover:-translate-y-0.5 ${
                  area.available
                    ? "border-icfes-blue/20 hover:border-icfes-blue hover:shadow-lg cursor-pointer bg-white"
                    : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-70"
                }`}
              >
                {!area.available && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                )}
                <div
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-xs sm:text-sm text-gray-800">{area.name}</h3>
                {area.available ? (
                  <span className="mt-2 inline-flex items-center text-xs text-icfes-blue font-medium">
                    Ver infografía <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                ) : (
                  <span className="mt-2 inline-block text-xs text-gray-400 font-medium">Próximamente</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && selected.file && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="infografia-modal-title"
            aria-describedby="infografia-modal-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              ref={modalRef}
              className="relative bg-white sm:rounded-2xl shadow-2xl w-full h-full sm:h-[90vh] sm:max-w-5xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white sm:rounded-t-2xl border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 z-10">
                <div>
                  <h3 id="infografia-modal-title" className="font-bold text-icfes-blue text-base sm:text-lg">
                    Infografía — {selected.name}
                  </h3>
                  <p id="infografia-modal-desc" className="text-xs text-gray-500">
                    En móvil puedes hacer zoom con los dedos o descargar el PDF para verlo sin conexión.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs mt-2">
                    <a
                      href={selected.file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-icfes-blue hover:underline"
                    >
                      Abrir en pestaña nueva
                    </a>
                    <a
                      href={selected.file}
                      download
                      className="inline-flex items-center gap-1 text-icfes-blue hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Descargar PDF
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="flex-1 bg-gray-50 overflow-auto">
                <iframe
                  title={`Infografía de ${selected.name}`}
                  src={selected.file}
                  className="w-full h-full infografia-frame"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
