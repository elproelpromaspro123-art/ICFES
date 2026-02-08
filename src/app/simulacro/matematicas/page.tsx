"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Clock,
  Shuffle,
  ArrowLeft,
  Play,
  CheckCircle2,
  ListChecks,
  History,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimulacroExam from "@/components/SimulacroExam";

type SimulacroProgress = {
  questionCount: number;
  randomize: boolean;
  order: number[];
  answers: Record<number, string>;
  currentIndex: number;
  elapsed: number;
  startedAt: string;
};

type SimulacroHistoryEntry = {
  id: string;
  date: string;
  questionCount: number;
  randomize: boolean;
  score: number;
  correct: number;
  incorrect: number;
  elapsed: number;
};

const HISTORY_KEY = "icfes_simulacro_history";

const modes = [
  { label: "Solo 10 preguntas", count: 10, icon: "⚡" },
  { label: "Solo 20 preguntas", count: 20, icon: "📝" },
  { label: "Solo 30 preguntas", count: 30, icon: "📋" },
  { label: "Solo 40 preguntas", count: 40, icon: "📖" },
  { label: "Todas las preguntas (50)", count: 50, icon: "🎯" },
];

export default function SimulacroMatematicas() {
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [randomize, setRandomize] = useState(false);
  const [started, setStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [progressMap, setProgressMap] = useState<
    Record<number, SimulacroProgress | null>
  >({});
  const [history, setHistory] = useState<SimulacroHistoryEntry[]>([]);

  const makeProgressKey = useMemo(
    () =>
      (count: number) =>
        `icfes_simulacro_progress_${count}_${randomize ? "rand" : "fixed"}`,
    [randomize]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const nextMap: Record<number, SimulacroProgress | null> = {};
    for (const mode of modes) {
      const raw = localStorage.getItem(makeProgressKey(mode.count));
      nextMap[mode.count] = raw ? (JSON.parse(raw) as SimulacroProgress) : null;
    }
    setProgressMap(nextMap);
  }, [makeProgressKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(HISTORY_KEY);
    const items = raw ? (JSON.parse(raw) as SimulacroHistoryEntry[]) : [];
    items.sort((a, b) => (a.date > b.date ? -1 : 1));
    setHistory(items);
  }, []);

  const handleStart = (count: number) => {
    setSelectedMode(count);
    setShowIntro(true);
  };

  const handleBegin = () => {
    setShowIntro(false);
    setStarted(true);
  };

  const clearProgress = (count: number) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(makeProgressKey(count));
    setProgressMap((prev) => ({ ...prev, [count]: null }));
  };

  const selectedProgress = selectedMode ? progressMap[selectedMode] : null;

  if (started && selectedMode) {
    return (
      <SimulacroExam questionCount={selectedMode} randomize={randomize} />
    );
  }

  return (
    <main className="min-h-screen bg-icfes-gray">
      <Navbar />

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-icfes-blue mb-4">
                  Simulacro de Matemáticas
                </h2>

                <div className="bg-icfes-blue-lighter rounded-xl p-5 text-left mb-6 text-sm text-gray-700 space-y-3">
                  <p className="font-semibold text-icfes-blue text-base">
                    ¿Qué contiene este cuadernillo?
                  </p>
                  <p>
                    Preguntas de la prueba Matemáticas de Saber 11.° que fueron
                    utilizadas en aplicaciones anteriores del examen. Estas serán
                    útiles para familiarizarte y conocer aún más la prueba. Al
                    final encontrarás las respuestas correctas de todas las
                    preguntas con su respectiva explicación.
                  </p>
                  <p>
                    <strong>¡Recuerda!</strong> El examen Saber 11.° evalúa
                    competencias. Por tanto, en las preguntas encontrarás una
                    situación (que debes tratar de entender) en la que tendrás
                    que aplicar tus conocimientos para tomar decisiones y elegir
                    la respuesta correcta.
                  </p>
                </div>

                {selectedProgress && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-yellow-900 mb-5">
                    <p className="font-semibold">
                      Simulacro en progreso (pendiente)
                    </p>
                    <p className="text-xs text-yellow-800">
                      Puedes continuar donde lo dejaste o reiniciar desde cero.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ListChecks className="w-4 h-4 text-icfes-blue" />
                    <span>{selectedMode} preguntas</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-icfes-blue" />
                    <span>Sin límite de tiempo</span>
                  </div>
                  {randomize && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Shuffle className="w-4 h-4 text-icfes-blue" />
                      <span>Aleatorizado</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-400 mb-6">
                  Al presionar &quot;Empezar&quot; se comenzará a tomar el tiempo.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowIntro(false)}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Volver
                  </button>
                  {selectedProgress ? (
                    <div className="flex-1 flex gap-2">
                      <button
                        onClick={() => {
                          if (selectedMode) clearProgress(selectedMode);
                          handleBegin();
                        }}
                        className="flex-1 py-3 rounded-xl border-2 border-icfes-blue text-icfes-blue font-semibold hover:bg-icfes-blue-lighter transition-colors flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reiniciar
                      </button>
                      <button
                        onClick={handleBegin}
                        className="flex-1 py-3 rounded-xl bg-icfes-blue text-white font-semibold hover:bg-icfes-blue-light transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Continuar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleBegin}
                      className="flex-1 py-3 rounded-xl bg-icfes-blue text-white font-semibold hover:bg-icfes-blue-light transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Empezar
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-icfes-blue hover:underline text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-icfes-blue mb-2">
            Simulacro de Matemáticas
          </h1>
          <p className="text-gray-500 text-sm">
            50 preguntas verificadas y revisadas del examen Saber 11.°
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
          <h2 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-icfes-blue" />
            Elige la cantidad de preguntas
          </h2>
          <p className="text-xs text-gray-400 mb-5">
            Selecciona un modo para iniciar tu simulacro
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {modes.map((mode) => (
              <button
                key={mode.count}
                onClick={() => handleStart(mode.count)}
                className="group relative rounded-xl border-2 border-gray-200 hover:border-icfes-blue p-4 text-left transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{mode.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm group-hover:text-icfes-blue transition-colors">
                      {mode.label}
                    </p>
                    <p className="text-xs text-gray-400">
                      {Math.round((mode.count / 50) * 100)}% del simulacro
                      completo
                    </p>
                    {progressMap[mode.count] && (
                      <p className="text-xs font-semibold text-icfes-yellow mt-1">
                        Simulacro en progreso (pendiente)
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shuffle className="w-5 h-5 text-icfes-blue" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  Aleatorización de preguntas
                </p>
                <p className="text-xs text-gray-400">
                  Las preguntas se mostrarán en orden aleatorio
                </p>
              </div>
            </div>
            <button
              onClick={() => setRandomize(!randomize)}
              className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
                randomize ? "bg-icfes-blue" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
                  randomize ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-icfes-blue" />
            <h2 className="font-bold text-gray-900">Historial de simulacros</h2>
          </div>
          {history.length === 0 ? (
            <p className="text-sm text-gray-500">
              Aún no tienes simulacros finalizados.
            </p>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.questionCount} preguntas ·{" "}
                      {item.randomize ? "Aleatorizado" : "Orden normal"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.date).toLocaleString("es-CO")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                    <span className="px-2 py-1 rounded-lg bg-icfes-blue-lighter text-icfes-blue font-semibold">
                      Puntaje: {item.score}
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-green-50 text-green-600 font-semibold">
                      Correctas: {item.correct}
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-red-50 text-red-600 font-semibold">
                      Incorrectas: {item.incorrect}
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-600 font-semibold">
                      Tiempo: {Math.floor(item.elapsed / 60)}m
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
