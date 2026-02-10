"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  Search,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Question } from "@/data/types";
import { StudyGuide } from "@/data/study-guides";

interface Props {
  areaId: string;
  areaLabel: string;
  areaDescription: string;
  totalQuestions: number;
  icon: LucideIcon;
  iconGradient: string;
  loadQuestions: () => Promise<Question[]>;
  guide?: StudyGuide;
}

const fractionRegex = /([^\s/]+)\s*\/\s*([^\s/]+)/g;

function applyAutoBold(line: string): string {
  if (line.includes("**")) return line;
  const patterns = [
    /^(Paso \d+\.)/,
    /^(Procedimiento \d+\.)/,
    /^(Requerimiento \d+\.)/,
    /^(Ecuaci[o\u00f3]n \d+\.)/,
    /^(Restricci[o\u00f3]n [A-Z0-9]+:)/,
    /^(Juego \d+\.)/,
    /^(Recuerde que:)/,
    /^(RESPONDA.*)/,
    /^(Fuente:|FUENTE:)/,
    /^(Tomado.*)/,
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
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function splitIntoSentenceBlocks(text: string): string[] {
  const blocks: string[] = [];
  let buffer = "";
  let i = 0;

  while (i < text.length) {
    const char = text[i];
    buffer += char;

    if (char === "." || char === "!" || char === "?") {
      if (char === "." && text[i + 1] === "." && text[i + 2] === ".") {
        buffer += "..";
        i += 2;
      }

      let j = i + 1;
      while (j < text.length && text[j] === " ") j += 1;

      if (j >= text.length) {
        if (buffer.trim()) blocks.push(buffer.trim());
        buffer = "";
        break;
      }

      if (j > i + 1) {
        const next = text[j];
        if (/[A-Z0-9\u00bf\u00a1\u00c1\u00c9\u00cd\u00d3\u00da\u00d1]/.test(next)) {
          if (buffer.trim()) blocks.push(buffer.trim());
          buffer = "";
          i = j - 1;
        }
      }
    }

    i += 1;
  }

  if (buffer.trim()) blocks.push(buffer.trim());
  return blocks.length > 0 ? blocks : [text];
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
  const listLine =
    /^(\u2022|I\.|II\.|III\.|IV\.|V\.|VI\.|\d+\.|Paso \d+\.|Procedimiento \d+\.|Requerimiento \d+\.|Ecuaci[o\u00f3]n \d+\.|Restricci[o\u00f3]n [A-Z0-9]+:|Juego \d+\.)/;
  const tableLine = /^\|/;
  const headingLine = /:\s*$/;

  return (
    <div className="formatted-text">
      {paragraphs.map((paragraph, index) => {
        const lines = paragraph
          .split("\n")
          .map((line) => line.replace(/\s+/g, " ").trim())
          .filter(Boolean);
        const segments: { text: string; preserve: boolean }[] = [];
        let buffer = "";

        const flush = () => {
          if (buffer) {
            segments.push({ text: buffer, preserve: false });
            buffer = "";
          }
        };

        for (const line of lines) {
          if (listLine.test(line) || tableLine.test(line)) {
            flush();
            segments.push({ text: line, preserve: true });
            continue;
          }
          if (headingLine.test(line)) {
            buffer = buffer ? `${buffer} ${line}` : line;
            flush();
            continue;
          }
          buffer = buffer ? `${buffer} ${line}` : line;
        }
        flush();

        return (
          <div key={`${keyBase}-p-${index}`} className="formatted-paragraph">
            {segments.flatMap((segment, segIndex) => {
              const blocks = segment.preserve
                ? [segment.text]
                : splitIntoSentenceBlocks(segment.text);
              return blocks.map((block, blockIndex) => (
                <div
                  key={`${keyBase}-seg-${index}-${segIndex}-${blockIndex}`}
                  className={segment.preserve ? "formatted-line" : "formatted-sentence"}
                >
                  {renderBoldAndFractions(
                    applyAutoBold(block),
                    `${keyBase}-l-${index}-${segIndex}-${blockIndex}`
                  )}
                </div>
              ));
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function StudyAreaClient({
  areaId,
  areaLabel,
  areaDescription,
  totalQuestions,
  icon: Icon,
  iconGradient,
  loadQuestions,
  guide,
}: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [readingMode, setReadingMode] = useState(false);
  const [showAnswers, setShowAnswers] = useState(true);

  useEffect(() => {
    let mounted = true;
    loadQuestions()
      .then((items) => {
        if (!mounted) return;
        setQuestions(items);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setQuestions([]);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [loadQuestions]);

  const filteredQuestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return questions;
    return questions.filter((q) => {
      const content = [
        q.text,
        q.explanation,
        q.groupLabel ?? "",
        q.groupText ?? "",
        q.options.map((opt) => opt.text).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return content.includes(trimmed);
    });
  }, [questions, query]);

  const totalCount = questions.length > 0 ? questions.length : totalQuestions;
  const rootClass = readingMode ? "reading-mode" : "bg-icfes-gray";

  return (
    <main className={`min-h-screen ${rootClass}`}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-icfes-blue hover:underline text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="text-center mb-10">
          <div className={`w-16 h-16 bg-gradient-to-br ${iconGradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-icfes-blue mb-2">
            Estudio de {areaLabel}
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            {areaDescription}
          </p>
        </div>

        {guide && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 exam-surface">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-icfes-blue">
                {guide.title}
              </h2>
              <span className="text-xs text-gray-400">
                Resumen guiado del simulacro
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-6 max-w-[80ch]">
              {guide.intro}
            </div>
            <div className="space-y-4">
              {guide.sections.map((section, index) => (
                <div
                  key={`${areaId}-guide-${index}`}
                  className="border border-gray-100 rounded-xl p-4 sm:p-5"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {section.title}
                  </h3>
                  {section.body && (
                    <div className="text-sm text-gray-600 max-w-[80ch]">
                      {renderFormattedText(
                        section.body,
                        `guide-${areaId}-${index}`
                      )}
                    </div>
                  )}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                      {section.bullets.map((item, itemIndex) => (
                        <li key={`${areaId}-guide-${index}-bullet-${itemIndex}`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-8 exam-surface">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en preguntas y explicaciones"
                className="w-full bg-transparent text-sm text-gray-700 outline-none"
                aria-label="Buscar contenido"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setReadingMode((prev) => !prev)}
                role="switch"
                aria-checked={readingMode}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                  readingMode
                    ? "border-icfes-blue/30 bg-icfes-blue-lighter text-icfes-blue"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Modo lectura
              </button>
              <button
                onClick={() => setShowAnswers((prev) => !prev)}
                role="switch"
                aria-checked={showAnswers}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                  showAnswers
                    ? "border-icfes-blue/30 bg-icfes-blue-lighter text-icfes-blue"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {showAnswers ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {showAnswers ? "Ocultar respuestas" : "Mostrar respuestas"}
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-3">
            Mostrando {filteredQuestions.length} de {totalCount} preguntas
          </div>
        </div>

        {loading ? (
          <div className="bg-white border rounded-2xl shadow-sm px-6 py-5 text-sm text-gray-600">
            Cargando contenido de estudio...
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="bg-white border rounded-2xl shadow-sm px-6 py-5 text-sm text-gray-600">
            No se encontraron preguntas con ese criterio.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((q, index) => {
              const prev = filteredQuestions[index - 1];
              const showContext =
                q.groupLabel &&
                (q.groupLabel !== prev?.groupLabel ||
                  q.sharedImage !== prev?.sharedImage ||
                  q.groupText !== prev?.groupText);
              return (
                <div key={q.id}>
                  {showContext && (
                    <div className="bg-icfes-blue-lighter border border-icfes-blue/20 rounded-xl p-4 mb-4 exam-card">
                      <p className="text-sm sm:text-base md:text-lg font-semibold text-icfes-blue uppercase tracking-wide mb-2">
                        {q.groupLabel}
                      </p>
                      {q.groupText && (
                        <div className="text-sm sm:text-base text-gray-700 mb-3 max-w-[80ch]">
                          {renderFormattedText(q.groupText, `study-gt-${areaId}-${q.id}`)}
                        </div>
                      )}
                      {q.sharedImage && (
                        <Image
                          src={q.sharedImage}
                          alt={`Contexto pregunta ${q.id}`}
                          width={700}
                          height={500}
                          sizes="(max-width: 768px) 100vw, 700px"
                          className="rounded-lg max-w-full h-auto"
                        />
                      )}
                    </div>
                  )}

                  <div className="bg-white rounded-2xl shadow-sm border p-6 exam-card">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-icfes-blue text-white flex items-center justify-center text-sm font-bold">
                        {q.id}
                      </span>
                      <div className="text-base sm:text-lg text-gray-800 flex-1 max-w-[80ch]">
                        {renderFormattedText(q.text, `study-q-${areaId}-${q.id}`)}
                      </div>
                    </div>

                    {q.image && (
                      <div className="mb-4 ml-0 sm:ml-11">
                        <Image
                          src={q.image}
                          alt={`Imagen pregunta ${q.id}`}
                          width={600}
                          height={400}
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="rounded-lg max-w-full h-auto"
                        />
                      </div>
                    )}

                    {q.extraImage && (
                      <div className="mb-4 ml-0 sm:ml-11">
                        <Image
                          src={q.extraImage}
                          alt={`Imagen adicional pregunta ${q.id}`}
                          width={600}
                          height={400}
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="rounded-lg max-w-full h-auto"
                        />
                      </div>
                    )}

                    <div className="space-y-2 ml-0 sm:ml-11">
                      {q.options.map((opt) => {
                        const isCorrect = showAnswers && q.correctAnswer === opt.letter;
                        const optionStyle = isCorrect
                          ? "border-green-400 bg-green-50 text-green-800"
                          : "border-gray-200 bg-white text-gray-700";
                        return (
                          <div
                            key={opt.letter}
                            className={`flex items-start gap-3 p-3 rounded-xl border-2 text-sm ${optionStyle}`}
                          >
                            <span className="font-bold shrink-0 mt-0.5">
                              {opt.letter}.
                            </span>
                            <div className="max-w-[80ch]">
                              {renderFormattedText(
                                opt.text,
                                `study-opt-${areaId}-${q.id}-${opt.letter}`
                              )}
                            </div>
                            {isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 ml-auto mt-0.5" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {showAnswers && (
                      <div className="bg-icfes-blue-lighter rounded-lg p-4 mt-4">
                        <div className="flex items-center gap-2 mb-2 text-icfes-blue">
                          <CheckCircle2 className="w-4 h-4" />
                          <p className="text-xs font-semibold">
                            Respuesta correcta: {q.correctAnswer}
                          </p>
                        </div>
                        <div className="text-sm text-gray-700 max-w-[80ch]">
                          {renderFormattedText(
                            q.explanation,
                            `study-exp-${areaId}-${q.id}`
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}


