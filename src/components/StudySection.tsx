"use client";

import Link from "next/link";
import { Calculator, BookOpen, Globe2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const studyAreas = [
  {
    name: "Matemáticas",
    icon: Calculator,
    href: "/estudio/matematicas",
    color: "from-blue-500 to-blue-700",
    total: 50,
    description: "Procedimientos claros y explicación paso a paso",
  },
  {
    name: "Lectura Crítica",
    icon: BookOpen,
    href: "/estudio/lectura",
    color: "from-red-400 to-red-600",
    total: 49,
    description: "Argumentos, intención comunicativa y comprensión",
  },
  {
    name: "Sociales y Ciudadanas",
    icon: Globe2,
    href: "/estudio/sociales",
    color: "from-green-400 to-green-600",
    total: 48,
    description: "Contexto histórico, ciudadanía y análisis crítico",
  },
];

export default function StudySection() {
  return (
    <section id="estudio" className="py-16 bg-white border-t border-icfes-blue/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-icfes-blue mb-2">
            Estudio guiado por simulacros
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Lee el contexto, las preguntas y las explicaciones de los simulacros sin
            responderlos. Ideal para estudiar con calma y repasar los temas clave.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {studyAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={area.href}
                  prefetch={false}
                  className="block bg-white rounded-2xl p-6 border-2 border-icfes-blue/10 hover:border-icfes-blue shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 mb-1">{area.name}</h3>
                      <p className="text-xs text-gray-500 mb-3">{area.description}</p>
                      <span className="text-xs bg-icfes-blue-lighter text-icfes-blue font-medium px-2 py-1 rounded-full">
                        {area.total} lecturas guiadas
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-icfes-blue transition-colors shrink-0 mt-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
