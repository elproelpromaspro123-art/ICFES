export type SimulacroProgress = {
  areaId: string;
  questionCount: number;
  randomize: boolean;
  order: number[];
  answers: Record<number, string>;
  currentIndex: number;
  elapsed: number;
  startedAt: string;
};

export type SimulacroHistoryEntry = {
  id: string;
  date: string;
  areaId: string;
  questionCount: number;
  randomize: boolean;
  score: number;
  correct: number;
  incorrect: number;
  elapsed: number;
};

export const HISTORY_KEY = "icfes_simulacro_history";

export function makeProgressKey(
  areaId: string,
  count: number,
  randomize: boolean
): string {
  return `icfes_simulacro_progress_${areaId}_${count}_${
    randomize ? "rand" : "fixed"
  }`;
}

export function makeLegacyProgressKey(count: number, randomize: boolean): string {
  return `icfes_simulacro_progress_${count}_${randomize ? "rand" : "fixed"}`;
}

export function safeParseJSON<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
