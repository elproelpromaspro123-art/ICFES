"use client";

import { Calculator } from "lucide-react";
import StudyAreaClient from "@/components/StudyAreaClient";
import { Question } from "@/data/types";

const loadMathQuestions = () =>
  import("@/data/questions").then(
    (mod) => mod.mathQuestions as Question[]
  );

export default function StudyMatematicasClient() {
  return (
    <StudyAreaClient
      areaId="matematicas"
      areaLabel="Matemáticas"
      areaDescription="Lee el desarrollo de 50 preguntas reales con explicaciones paso a paso."
      totalQuestions={50}
      icon={Calculator}
      iconGradient="from-blue-500 to-blue-700"
      loadQuestions={loadMathQuestions}
    />
  );
}
