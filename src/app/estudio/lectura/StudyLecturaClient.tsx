"use client";

import { BookOpen } from "lucide-react";
import StudyAreaClient from "@/components/StudyAreaClient";
import { Question } from "@/data/types";

const loadLecturaQuestions = () =>
  import("@/data/questions-lectura").then(
    (mod) => mod.lecturaQuestions as Question[]
  );

export default function StudyLecturaClient() {
  return (
    <StudyAreaClient
      areaId="lectura"
      areaLabel="Lectura Crítica"
      areaDescription="Analiza 49 preguntas con contexto y explicación detallada."
      totalQuestions={49}
      icon={BookOpen}
      iconGradient="from-red-400 to-red-600"
      loadQuestions={loadLecturaQuestions}
    />
  );
}
