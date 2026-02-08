"use client";

import { useState, useEffect, useMemo, useCallback, type ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Home,
  ArrowUp,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { mathQuestions, Question } from "@/data/questions";

interface Props {
  questionCount: number;
  randomize: boolean;
}

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

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function calculateScore(correct: number, total: number): number {
  const raw = correct / total;
  const score = Math.round(raw * 100);
  return Math.max(1, Math.min(100, score));
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-icfes-blue";
  if (score >= 40) return "text-icfes-yellow";
  return "text-icfes-red";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excelente";
  if (score >= 60) return "Bueno";
  if (score >= 40) return "Aceptable";
  return "Necesitas mejorar";
}

const fractionRegex =
  /([A-Za-zÁÉÍÓÚÑáéíóúñ0-9()°.,√·-]+)\/([A-Za-zÁÉÍÓÚÑáéíóúñ0-9()°.,√·-]+)/g;

function applyAutoBold(line: string): string {
  if (line.includes("**")) return line;
  const patterns = [
    /^(Paso \d+\.)/,
    /^(Procedimiento \d+\.)/,
    /^(Requerimiento \d+\.)/,
    /^(Ecuación \d+\.)/,
    /^(Restricción [A-Z0-9]+:)/,
    /^(Juego \d+\.)/,
    /^(Recuerde que:)/,
  ];
  let output = line;
  for (const pattern of patterns) {
    if (pattern.test(output)) {
      output = output.replace(pattern, "**$1**");
    }
  }
  return output;
}

function normalizeParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/g)
    .map((paragraph) =>
      paragraph.replace(/\n+/g, " ").replace(/\s+/g, " ").trim()
    )
    .filter(Boolean);
}

function renderFractions(text: string, keyBase: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let count = 0;
  const regex = new RegExp(fractionRegex);
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <span className="fraction" key={`${keyBase}-frac-${count}`}>
        <span className="fraction-top">{match[1]}</span>
        <span className="fraction-bar" />
        <span className="fraction-bottom">{match[2]}</span>
      </span>
    );
    lastIndex = match.index + match[0].length;
    count += 1;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

function renderBoldAndFractions(text: string, keyBase: string): ReactNode[] {
  const segments = text.split(/\*\*(.*?)\*\*/g);
  return segments.map((segment, i) => {
    const content = renderFractions(segment, `${keyBase}-${i}`);
    if (i % 2 === 1) {
      return (
        <strong key={`${keyBase}-b-${i}`} className="font-semibold text-gray-900">
          {content}
        </strong>
      );
    }
    return <span key={`${keyBase}-t-${i}`}>{content}</span>;
  });
}

function renderFormattedText(text: string, keyBase: string): ReactNode {
  const paragraphs = normalizeParagraphs(text);
  return paragraphs.map((paragraph, index) => {
    const formattedLine = applyAutoBold(paragraph);
    return (
      <p key={`${keyBase}-p-${index}`} className="leading-relaxed">
        {renderBoldAndFractions(formattedLine, `${keyBase}-l-${index}`)}
      </p>
    );
  });
}

export default function SimulacroExam({ questionCount, randomize }: Props) {
  const progressKey = useMemo(
    () =>
      `icfes_simulacro_progress_${questionCount}_${randomize ? "rand" : "fixed"}`,
    [questionCount, randomize]
  );

  const [questionOrder, setQuestionOrder] = useState<number[] | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(progressKey);
    if (raw) {
      try {
        const data = JSON.parse(raw) as SimulacroProgress;
        if (
          data &&
          Array.isArray(data.order) &&
          typeof data.currentIndex === "number"
        ) {
          setQuestionOrder(data.order);
          setAnswers(data.answers || {});
          setCurrentIndex(data.currentIndex || 0);
          setElapsed(data.elapsed || 0);
          setHydrated(true);
          return;
        }
      } catch {
        // ignore malformed data
      }
    }
    const base = randomize ? shuffleArray(mathQuestions) : [...mathQuestions];
    const order = base.slice(0, questionCount).map((q) => q.id);
    setQuestionOrder(order);
    setHydrated(true);
  }, [progressKey, questionCount, randomize]);

  const questions = useMemo(() => {
    if (!questionOrder) return [];
    const lookup = new Map(mathQuestions.map((q) => [q.id, q]));
    return questionOrder
      .map((id) => lookup.get(id))
      .filter(Boolean) as Question[];
  }, [questionOrder]);

  useEffect(() => {
    if (!hydrated || finished || !questionOrder) return;
    const payload: SimulacroProgress = {
      questionCount,
      randomize,
      order: questionOrder,
      answers,
      currentIndex,
      elapsed,
      startedAt: new Date().toISOString(),
    };
    localStorage.setItem(progressKey, JSON.stringify(payload));
  }, [
    hydrated,
    finished,
    questionOrder,
    answers,
    currentIndex,
    elapsed,
    progressKey,
    questionCount,
    randomize,
  ]);

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [finished]);

  useEffect(() => {
    if (questions.length === 0) return;
    if (currentIndex > questions.length - 1) {
      setCurrentIndex(0);
    }
  }, [questions.length, currentIndex]);

  const selectAnswer = useCallback(
    (questionId: number, letter: string) => {
      if (finished) return;
      setAnswers((prev) => ({ ...prev, [questionId]: letter }));
    },
    [finished]
  );

  const handleFinish = () => {
    const total = questions.length;
    const correct = questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
    const scoreValue = calculateScore(correct, total);
    const entry: SimulacroHistoryEntry = {
      id:
        (typeof crypto !== "undefined" &&
          "randomUUID" in crypto &&
          crypto.randomUUID()) ||
        `${Date.now()}`,
      date: new Date().toISOString(),
      questionCount,
      randomize,
      score: scoreValue,
      correct,
      incorrect: total - correct,
      elapsed,
    };
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const history = raw ? (JSON.parse(raw) as SimulacroHistoryEntry[]) : [];
      history.unshift(entry);
      localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history.slice(0, 50))
      );
      localStorage.removeItem(progressKey);
    } catch {
      // ignore storage issues
    }
    setFinished(true);
    setShowConfirm(false);
  };

  const correctCount = questions.filter(
    (q) => answers[q.id] === q.correctAnswer
  ).length;
  const answeredCount = Object.keys(answers).length;
  const score = calculateScore(correctCount, questions.length);

  if (!hydrated || questions.length === 0) {
    return (
      <div className="min-h-screen bg-icfes-gray flex items-center justify-center px-4">
        <div className="bg-white border rounded-2xl shadow-sm px-6 py-5 text-sm text-gray-600">
          Preparando simulacro...
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const lastSharedImage =
    currentIndex > 0 ? questions[currentIndex - 1]?.sharedImage : null;
  const showSharedImage =
    currentQ.sharedImage && currentQ.sharedImage !== lastSharedImage;

  if (finished) {
    return (
      <div className="min-h-screen bg-icfes-gray">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border p-8 mb-8 text-center"
          >
            <Trophy className="w-16 h-16 mx-auto mb-4 text-icfes-yellow" />
            <h1 className="text-2xl font-bold text-icfes-blue mb-2">
              ¡Simulacro Finalizado!
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Aquí están tus resultados detallados
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-icfes-blue-lighter rounded-xl p-4">
                <p className={`text-3xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </p>
                <p className="text-xs text-gray-500 mt-1">Puntaje /100</p>
                <p className={`text-xs font-semibold mt-1 ${getScoreColor(score)}`}>
                  {getScoreLabel(score)}
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-green-600">
                  {correctCount}
                </p>
                <p className="text-xs text-gray-500 mt-1">Correctas</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-red-500">
                  {questions.length - correctCount}
                </p>
                <p className="text-xs text-gray-500 mt-1">Incorrectas</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4 text-icfes-blue" />
                  <p className="text-xl font-bold text-icfes-blue">
                    {formatTime(elapsed)}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">Tiempo total</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/simulacro/matematicas"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-icfes-blue text-white rounded-xl font-medium hover:bg-icfes-blue-light transition-colors text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Intentar de nuevo
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                <Home className="w-4 h-4" />
                Ir al inicio
              </Link>
            </div>
          </motion.div>

          <div className="space-y-6">
            <h2 className="text-lg font-bold text-icfes-blue flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Revisión detallada de preguntas
            </h2>
            {questions.map((q, i) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
                    isCorrect
                      ? "border-green-200"
                      : userAnswer
                      ? "border-red-200"
                      : "border-yellow-200"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                        isCorrect
                          ? "bg-green-500"
                          : userAnswer
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                        <span
                          className={`text-xs font-semibold ${
                            isCorrect ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isCorrect
                            ? "Correcta"
                            : userAnswer
                            ? "Incorrecta"
                            : "Sin responder"}
                        </span>
                      </div>
                      <div className="space-y-2 text-base text-gray-700 mb-3">
                        {renderFormattedText(q.text, `review-q-${q.id}`)}
                      </div>

                      {q.groupLabel && (
                        <div className="bg-icfes-blue-lighter border border-icfes-blue/20 rounded-lg p-3 mb-3">
                          <p className="text-sm sm:text-base font-semibold text-icfes-blue uppercase mb-2">
                            {q.groupLabel}
                          </p>
                          {q.groupText && (
                            <div className="space-y-2 text-sm text-gray-700">
                              {renderFormattedText(q.groupText, `review-gt-${q.id}`)}
                            </div>
                          )}
                        </div>
                      )}

                      {q.sharedImage && (
                        <div className="mb-3">
                          <Image
                            src={q.sharedImage}
                            alt={`Contexto pregunta ${q.id}`}
                            width={600}
                            height={400}
                            className="rounded-lg max-w-full h-auto"
                          />
                        </div>
                      )}
                      {q.image && (
                        <div className="mb-3">
                          <Image
                            src={q.image}
                            alt={`Imagen pregunta ${q.id}`}
                            width={600}
                            height={400}
                            className="rounded-lg max-w-full h-auto"
                          />
                        </div>
                      )}
                      {q.extraImage && (
                        <div className="mb-3">
                          <Image
                            src={q.extraImage}
                            alt={`Imagen adicional pregunta ${q.id}`}
                            width={600}
                            height={400}
                            className="rounded-lg max-w-full h-auto"
                          />
                        </div>
                      )}

                      <div className="space-y-2 mb-4">
                        {q.options.map((opt) => {
                          const isUserChoice = userAnswer === opt.letter;
                          const isRightAnswer =
                            q.correctAnswer === opt.letter;
                          let style =
                            "border-gray-200 bg-white text-gray-700";
                          if (isRightAnswer)
                            style =
                              "border-green-400 bg-green-50 text-green-800";
                          else if (isUserChoice)
                            style =
                              "border-red-400 bg-red-50 text-red-800";

                          return (
                            <div
                              key={opt.letter}
                              className={`flex items-start gap-3 p-3 rounded-lg border-2 text-sm ${style}`}
                            >
                              <span className="font-bold shrink-0 mt-0.5">
                                {opt.letter}.
                              </span>
                              <div className="space-y-1">
                                {renderFormattedText(
                                  opt.text,
                                  `review-opt-${q.id}-${opt.letter}`
                                )}
                              </div>
                              {isRightAnswer && (
                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 ml-auto mt-0.5" />
                              )}
                              {isUserChoice && !isRightAnswer && (
                                <XCircle className="w-4 h-4 text-red-500 shrink-0 ml-auto mt-0.5" />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-icfes-blue-lighter rounded-lg p-4">
                        <p className="text-xs font-semibold text-icfes-blue mb-1">
                          Explicación:
                        </p>
                        <div className="space-y-2 text-sm text-gray-700">
                          {renderFormattedText(q.explanation, `review-exp-${q.id}`)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-icfes-blue text-white rounded-xl font-medium hover:bg-icfes-blue-light transition-colors text-sm"
            >
              <ArrowUp className="w-4 h-4" />
              Volver arriba
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-icfes-gray flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
              {currentIndex + 1} / {questions.length}
            </span>
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-icfes-blue font-medium">
              <Clock className="w-4 h-4" />
              {formatTime(elapsed)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              {answeredCount}/{questions.length} respondidas
            </span>
            <button
              onClick={() => setShowConfirm(true)}
              className="px-4 py-1.5 bg-icfes-red text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Finalizar
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-icfes-blue transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Confirm dialog */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center"
            >
              <AlertCircle className="w-12 h-12 mx-auto mb-3 text-icfes-yellow" />
              <h3 className="font-bold text-lg mb-2">¿Finalizar simulacro?</h3>
              <p className="text-sm text-gray-500 mb-1">
                Has respondido {answeredCount} de {questions.length} preguntas.
              </p>
              {answeredCount < questions.length && (
                <p className="text-xs text-icfes-red mb-4">
                  Hay {questions.length - answeredCount} pregunta(s) sin responder.
                </p>
              )}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 text-sm"
                >
                  Continuar
                </button>
                <button
                  onClick={handleFinish}
                  className="flex-1 py-2.5 rounded-xl bg-icfes-red text-white font-semibold hover:bg-red-700 text-sm"
                >
                  Finalizar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question */}
      <div className="flex-1 max-w-3xl mx-auto px-4 py-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {currentQ.groupLabel && showSharedImage && (
              <div className="bg-icfes-blue-lighter border-2 border-icfes-blue/20 rounded-xl p-4 mb-4">
                <p className="text-sm sm:text-base font-semibold text-icfes-blue uppercase mb-3">
                  {currentQ.groupLabel}
                </p>
                {currentQ.groupText && (
                  <div className="space-y-2 text-sm text-gray-700 mb-3">
                    {renderFormattedText(currentQ.groupText, `main-gt-${currentQ.id}`)}
                  </div>
                )}
                {currentQ.sharedImage && (
                  <Image
                    src={currentQ.sharedImage}
                    alt="Información compartida"
                    width={700}
                    height={500}
                    className="rounded-lg max-w-full h-auto"
                  />
                )}
              </div>
            )}

            {currentQ.groupLabel && !showSharedImage && currentQ.sharedImage && (
              <details className="bg-icfes-blue-lighter border-2 border-icfes-blue/20 rounded-xl p-4 mb-4">
                <summary className="text-sm sm:text-base font-semibold text-icfes-blue uppercase cursor-pointer">
                  {currentQ.groupLabel} (clic para ver la información)
                </summary>
                <div className="mt-3">
                  {currentQ.groupText && (
                    <div className="space-y-2 text-sm text-gray-700 mb-3">
                      {renderFormattedText(
                        currentQ.groupText,
                        `main-gt-${currentQ.id}-details`
                      )}
                    </div>
                  )}
                  <Image
                    src={currentQ.sharedImage}
                    alt="Información compartida"
                    width={700}
                    height={500}
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              </details>
            )}

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-icfes-blue text-white flex items-center justify-center text-sm font-bold">
                  {currentIndex + 1}
                </span>
                <div className="space-y-2 text-base sm:text-lg text-gray-800 flex-1">
                  {renderFormattedText(currentQ.text, `main-q-${currentQ.id}`)}
                </div>
              </div>

              {currentQ.image && (
                <div className="mb-4 ml-0 sm:ml-11 overflow-x-auto">
                  <Image
                    src={currentQ.image}
                    alt={`Imagen pregunta ${currentQ.id}`}
                    width={600}
                    height={400}
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              )}

              {currentQ.extraImage && (
                <div className="mb-4 ml-0 sm:ml-11 overflow-x-auto">
                  <Image
                    src={currentQ.extraImage}
                    alt={`Imagen adicional pregunta ${currentQ.id}`}
                    width={600}
                    height={400}
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              )}

              <div className="space-y-2 ml-0 sm:ml-11">
                {currentQ.options.map((opt) => {
                  const selected = answers[currentQ.id] === opt.letter;
                  return (
                    <button
                      key={opt.letter}
                      onClick={() => selectAnswer(currentQ.id, opt.letter)}
                      className={`w-full flex items-start gap-3 p-3 sm:p-4 rounded-xl border-2 text-left text-sm transition-all duration-200 ${
                        selected
                          ? "border-icfes-blue bg-icfes-blue-lighter text-icfes-blue"
                          : "border-gray-200 hover:border-icfes-blue/40 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span
                        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                          selected
                            ? "bg-icfes-blue text-white border-icfes-blue"
                            : "border-gray-300 text-gray-400"
                        }`}
                      >
                        {opt.letter}
                      </span>
                      <div className="pt-0.5 space-y-1">
                        {renderFormattedText(
                          opt.text,
                          `main-opt-${currentQ.id}-${opt.letter}`
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="bg-white border-t shadow-sm sticky bottom-0">
        <div className="max-w-3xl mx-auto px-2 sm:px-4 py-3 sm:py-3 flex items-center justify-between gap-2">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          <div className="flex items-center gap-1 overflow-x-auto max-w-[40vw] sm:max-w-md px-1 scrollbar-hide">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(i)}
                className={`w-7 h-7 sm:w-7 sm:h-7 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  i === currentIndex
                    ? "bg-icfes-blue text-white"
                    : answers[q.id]
                    ? "bg-icfes-blue-lighter text-icfes-blue"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (currentIndex === questions.length - 1) {
                setShowConfirm(true);
              } else {
                setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
              }
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              currentIndex === questions.length - 1
                ? "bg-icfes-red text-white hover:bg-red-700"
                : "text-icfes-blue hover:bg-icfes-blue-lighter"
            }`}
          >
            {currentIndex === questions.length - 1 ? "Finalizar" : "Siguiente"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
