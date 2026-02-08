"use client";

import Link from "next/link";
import { Calculator, BookOpen, Globe2, FlaskConical, Languages, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const areas = [
  {
    name: "Matemáticas",
    icon: Calculator,
    available: true,
    href: "/simulacro/matematicas",
    color: "from-blue-500 to-blue-700",
    questions: 50,
    description: "Álgebra, geometría, estadística y más",
  },
  { name: "Lectura Crítica", icon: BookOpen, available: false, color: "from-red-400 to-red-600", description: "Comprensión e interpretación textual" },
  { name: "Sociales y Ciudadanas", icon: Globe2, available: false, color: "from-green-400 to-green-600", description: "Pensamiento social y ciudadano" },
  { name: "Ciencias Naturales", icon: FlaskConical, available: false, color: "from-purple-400 to-purple-600", description: "Competencias científicas" },
  { name: "Inglés", icon: Languages, available: false, color: "from-orange-400 to-orange-600", description: "Comprensión lectora en inglés" },
];

export default function SimulacroSection() {
  return (
    <section id="simulacros" className="py-16 bg-icfes-gray">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-icfes-blue mb-2">
            Simulacros de Práctica
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto text-sm">
            Practica con preguntas reales de exámenes anteriores. Elige el área y la cantidad de preguntas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {area.available ? (
                  <Link
                    href={area.href!}
                    className="block bg-white rounded-xl p-6 border-2 border-transparent hover:border-icfes-blue shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-1">{area.name}</h3>
                        <p className="text-xs text-gray-500 mb-3">{area.description}</p>
                        {area.questions && (
                          <span className="text-xs bg-icfes-blue-lighter text-icfes-blue font-medium px-2 py-1 rounded-full">
                            {area.questions} preguntas disponibles
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-icfes-blue transition-colors shrink-0 mt-1" />
                    </div>
                  </Link>
                ) : (
                  <div className="bg-white/60 rounded-xl p-6 border-2 border-gray-200 opacity-60">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center shrink-0 opacity-50`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-600 mb-1">{area.name}</h3>
                        <p className="text-xs text-gray-400 mb-3">{area.description}</p>
                        <span className="text-xs bg-gray-100 text-gray-400 font-medium px-2 py-1 rounded-full inline-flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Próximamente
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
