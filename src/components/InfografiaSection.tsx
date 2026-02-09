"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, BookOpen, Globe2, FlaskConical, Languages, Lock, X, ChevronRight } from "lucide-react";

const areas = [
  {
    name: "Matemáticas",
    icon: Calculator,
    available: true,
    color: "from-blue-500 to-blue-700",
    image: "/images/Infografia de matematicas.png",
  },
  { name: "Lectura Crítica", icon: BookOpen, available: false, color: "from-red-400 to-red-600" },
  { name: "Sociales y Ciudadanas", icon: Globe2, available: false, color: "from-green-400 to-green-600" },
  { name: "Ciencias Naturales", icon: FlaskConical, available: false, color: "from-purple-400 to-purple-600" },
  { name: "Inglés", icon: Languages, available: false, color: "from-orange-400 to-orange-600" },
];

export default function InfografiaSection() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const selected = areas.find((a) => a.name === selectedArea);

  const handleClose = useCallback(() => setSelectedArea(null), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedArea) handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedArea, handleClose]);

  return (
    <section id="infografias" className="py-16 bg-gradient-to-b from-white to-icfes-gray/40 border-t border-icfes-blue/10">
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
        {selected && selected.image && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="infografia-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white sm:rounded-t-2xl border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
                <h3 id="infografia-modal-title" className="font-bold text-icfes-blue text-base sm:text-lg">
                  Infografía — {selected.name}
                </h3>
                <button
                  onClick={handleClose}
                  className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="p-2 sm:p-6 overflow-auto touch-pan-x touch-pan-y">
                <Image
                  src={selected.image}
                  alt={`Infografía de ${selected.name}`}
                  width={1200}
                  height={1600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                  className="w-full h-auto sm:rounded-lg select-none"
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
