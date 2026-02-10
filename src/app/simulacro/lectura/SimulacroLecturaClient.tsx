"use client";

import { BookOpen } from "lucide-react";
import SimulacroAreaClient from "@/components/SimulacroAreaClient";
import { Question } from "@/data/types";

const loadLecturaQuestions = () =>
  import("@/data/questions-lectura").then(
    (mod) => mod.lecturaQuestions as Question[]
  );

export default function SimulacroLecturaClient() {
  return (
    <SimulacroAreaClient
      areaId="lectura"
      areaLabel="Lectura Crítica"
      areaDescription="49 preguntas verificadas y revisadas del examen Saber 11.°"
      totalQuestions={49}
      icon={BookOpen}
      iconGradient="from-red-400 to-red-600"
      loadQuestions={loadLecturaQuestions}
    />
  );
}
