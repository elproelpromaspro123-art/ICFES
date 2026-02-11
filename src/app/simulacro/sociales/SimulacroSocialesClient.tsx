"use client";

import { Globe2 } from "lucide-react";
import SimulacroAreaClient from "@/components/SimulacroAreaClient";
import { Question } from "@/data/types";

const loadSocialesQuestions = () =>
  import("@/data/questions-sociales").then(
    (mod) => mod.socialesQuestions as Question[]
  );

export default function SimulacroSocialesClient() {
  return (
    <SimulacroAreaClient
      areaId="sociales"
      areaLabel="Sociales y Ciudadanas"
      areaDescription="48 preguntas verificadas y revisadas del examen Saber 11°"
      totalQuestions={48}
      icon={Globe2}
      iconGradient="from-green-400 to-green-600"
      loadQuestions={loadSocialesQuestions}
    />
  );
}
