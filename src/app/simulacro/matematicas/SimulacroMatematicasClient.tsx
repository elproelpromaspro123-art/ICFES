"use client";

import { Calculator } from "lucide-react";
import SimulacroAreaClient from "@/components/SimulacroAreaClient";
import { Question } from "@/data/types";

const loadMathQuestions = () =>
  import("@/data/questions").then(
    (mod) => mod.mathQuestions as Question[]
  );

export default function SimulacroMatematicasClient() {
  return (
    <SimulacroAreaClient
      areaId="matematicas"
      areaLabel="Matemáticas"
      areaDescription="50 preguntas verificadas y revisadas del examen Saber 11.°"
      totalQuestions={50}
      icon={Calculator}
      iconGradient="from-blue-500 to-blue-700"
      loadQuestions={loadMathQuestions}
    />
  );
}
