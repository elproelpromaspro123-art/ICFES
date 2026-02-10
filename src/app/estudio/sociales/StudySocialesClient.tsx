"use client";

import { Globe2 } from "lucide-react";
import StudyAreaClient from "@/components/StudyAreaClient";
import { Question } from "@/data/types";

const loadSocialesQuestions = () =>
  import("@/data/questions-sociales").then(
    (mod) => mod.socialesQuestions as Question[]
  );

export default function StudySocialesClient() {
  return (
    <StudyAreaClient
      areaId="sociales"
      areaLabel="Sociales y Ciudadanas"
      areaDescription="Repasa 48 preguntas con contexto histórico y análisis ciudadano."
      totalQuestions={48}
      icon={Globe2}
      iconGradient="from-green-400 to-green-600"
      loadQuestions={loadSocialesQuestions}
    />
  );
}
