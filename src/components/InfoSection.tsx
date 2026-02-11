"use client";

import {
  BookOpen,
  Calculator,
  Globe2,
  FlaskConical,
  Languages,
  ClipboardList,
  GraduationCap,
  Eye,
  Search,
  Lightbulb,
  FileText,
  Target,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

type FeatureCard = {
  icon: typeof BookOpen;
  title: string;
  description: string;
  highlights: { text: string; href: string }[];
  gradient: string;
  iconColor: string;
};

const features: FeatureCard[] = [
  {
    icon: FileText,
    title: "Infografías oficiales",
    description:
      "Consulta las infografías publicadas por el ICFES que resumen las competencias evaluadas en cada área. Puedes verlas directamente en el sitio o descargarlas en PDF para estudiar sin conexión.",
    highlights: [
      { text: "Matemáticas", href: "/#infografias" },
      { text: "Lectura Crítica", href: "/#infografias" },
      { text: "Sociales y Ciudadanas", href: "/#infografias" },
      { text: "Ciencias Naturales", href: "/#infografias" },
      { text: "Inglés", href: "/#infografias" },
    ],
    gradient: "from-amber-500 to-orange-600",
    iconColor: "text-amber-500",
  },
  {
    icon: ClipboardList,
    title: "Simulacros de práctica",
    description:
      "Pon a prueba tus conocimientos con simulacros basados en preguntas reales de exámenes anteriores. Selecciona la cantidad de preguntas, responde a tu ritmo y recibe una calificación al finalizar con la explicación detallada de cada respuesta.",
    highlights: [
      { text: "Simulacro de Matemáticas", href: "/simulacro/matematicas" },
      { text: "Simulacro de Lectura Crítica", href: "/simulacro/lectura" },
      { text: "Simulacro de Sociales", href: "/simulacro/sociales" },
    ],
    gradient: "from-blue-500 to-indigo-600",
    iconColor: "text-blue-500",
  },
  {
    icon: GraduationCap,
    title: "Estudio guiado",
    description:
      "Lee cada pregunta con su contexto, opciones y explicación paso a paso sin la presión de un examen. Incluye una guía de estudio con fórmulas, metodología y criterios de descarte.",
    highlights: [
      { text: "Estudio de Matemáticas", href: "/estudio/matematicas" },
      { text: "Estudio de Lectura Crítica", href: "/estudio/lectura" },
      { text: "Estudio de Sociales", href: "/estudio/sociales" },
    ],
    gradient: "from-emerald-500 to-green-600",
    iconColor: "text-emerald-500",
  },
];

type ToolItem = {
  icon: typeof BookOpen;
  label: string;
  description: string;
  href: string;
};

const tools: ToolItem[] = [
  {
    icon: Eye,
    label: "Modo lectura",
    description:
      "Cambia el fondo a un tono cálido tipo papel para reducir la fatiga visual durante sesiones largas de estudio.",
    href: "/estudio/matematicas",
  },
  {
    icon: Search,
    label: "Buscador integrado",
    description:
      "Filtra preguntas por palabra clave o número para encontrar exactamente el tema que necesitas repasar.",
    href: "/estudio/matematicas",
  },
  {
    icon: Target,
    label: "Selector de preguntas",
    description:
      "En los simulacros puedes elegir cuántas preguntas responder: 10, 25 o el banco completo.",
    href: "/#simulacros",
  },
  {
    icon: Lightbulb,
    label: "Explicaciones detalladas",
    description:
      "Cada pregunta incluye una explicación clara del procedimiento y la razón por la que cada opción es correcta o incorrecta.",
    href: "/estudio/matematicas",
  },
];

const areaIcons: Record<string, typeof Calculator> = {
  "Matemáticas": Calculator,
  "Lectura Crítica": BookOpen,
  "Sociales y Ciudadanas": Globe2,
  "Ciencias Naturales": FlaskConical,
  "Inglés": Languages,
};

const areas = [
  {
    name: "Matemáticas",
    status: "Infografía + Simulacro + Estudio",
    complete: true,
    color: "border-blue-400 bg-blue-50",
    dotColor: "bg-blue-500",
  },
  {
    name: "Lectura Crítica",
    status: "Infografía + Simulacro + Estudio",
    complete: true,
    color: "border-red-400 bg-red-50",
    dotColor: "bg-red-500",
  },
  {
    name: "Sociales y Ciudadanas",
    status: "Infografía + Simulacro + Estudio",
    complete: true,
    color: "border-green-400 bg-green-50",
    dotColor: "bg-green-500",
  },
  {
    name: "Ciencias Naturales",
    status: "Infografía disponible",
    complete: false,
    color: "border-purple-400 bg-purple-50",
    dotColor: "bg-purple-500",
  },
  {
    name: "Inglés",
    status: "Infografía disponible",
    complete: false,
    color: "border-orange-400 bg-orange-50",
    dotColor: "bg-orange-500",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function InfoSection() {
  return (
    <section
      id="informacion"
      className="py-20 bg-gradient-to-b from-white via-icfes-gray/30 to-white border-t border-icfes-blue/10"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-icfes-blue-lighter text-icfes-blue text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Todo lo que necesitas saber
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-icfes-blue mb-3">
            ¿Qué encontrarás en esta página?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Un resumen completo de cada herramienta, sección y recurso disponible
            para que aproveches al máximo tu preparación para el{" "}
            <Link
              href="/#"
              prefetch={false}
              className="text-icfes-blue font-semibold hover:underline"
            >
              ICFES Saber 11°
            </Link>.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="space-y-6 mb-16">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shrink-0`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-[72ch]">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((hl) => (
                        <Link
                          key={hl.text}
                          href={hl.href}
                          prefetch={false}
                          className="inline-flex items-center gap-1 text-xs font-medium bg-icfes-blue-lighter text-icfes-blue px-3 py-1.5 rounded-lg hover:bg-icfes-blue hover:text-white transition-colors"
                        >
                          {hl.text}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tools grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl font-bold text-icfes-blue mb-2 text-center">
            Herramientas incluidas
          </h3>
          <p className="text-sm text-gray-500 text-center mb-8 max-w-lg mx-auto">
            Funciones diseñadas para que estudies de forma cómoda y eficiente.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.label}
                  href={tool.href}
                  prefetch={false}
                  className="block"
                >
                  <motion.div
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="group flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 hover:border-icfes-blue hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-icfes-blue-lighter flex items-center justify-center shrink-0 group-hover:bg-icfes-blue transition-colors">
                      <Icon className="w-5 h-5 text-icfes-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-icfes-blue transition-colors">
                        {tool.label}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Areas coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-icfes-blue mb-2 text-center">
            Cobertura por área
          </h3>
          <p className="text-sm text-gray-500 text-center mb-8 max-w-lg mx-auto">
            Estado actual de los recursos disponibles para cada materia del Saber 11°.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {areas.map((area, i) => {
              const Icon = areaIcons[area.name] ?? BookOpen;
              return (
                <motion.div
                  key={area.name}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`flex items-center gap-3 rounded-xl border p-4 ${area.color}`}
                >
                  <Icon className="w-5 h-5 text-gray-700 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{area.name}</p>
                    <p className="text-xs text-gray-600">{area.status}</p>
                  </div>
                  {area.complete ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  ) : (
                    <span className="text-[10px] font-medium bg-white/80 text-gray-500 px-2 py-0.5 rounded-full shrink-0">
                      En progreso
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="bg-gradient-to-r from-icfes-blue to-icfes-blue-light rounded-2xl p-8 sm:p-10 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Empieza tu preparación ahora
            </h3>
            <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
              Todo el material es gratuito, oficial y está diseñado para que estudies
              a tu propio ritmo. Elige por dónde quieres comenzar.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/#simulacros"
                prefetch={false}
                className="inline-flex items-center gap-2 bg-icfes-yellow text-icfes-blue font-semibold px-5 py-2.5 rounded-lg hover:bg-yellow-400 transition-colors text-sm"
              >
                <ClipboardList className="w-4 h-4" />
                Ir a simulacros
              </Link>
              <Link
                href="/#estudio"
                prefetch={false}
                className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-white/25 transition-colors text-sm border border-white/20"
              >
                <GraduationCap className="w-4 h-4" />
                Ir a estudio guiado
              </Link>
              <Link
                href="/#infografias"
                prefetch={false}
                className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-white/25 transition-colors text-sm border border-white/20"
              >
                <FileText className="w-4 h-4" />
                Ver infografías
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
