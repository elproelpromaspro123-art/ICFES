import { type ReactNode } from "react";

const urlSplitRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
const urlTestRegex = /^(https?:\/\/[^\s]+|www\.[^\s]+)$/i;

function splitTrailingPunctuation(value: string) {
  const match = value.match(/^(.*?)([).,;:!?]+)?$/);
  return {
    url: match?.[1] ?? value,
    trailing: match?.[2] ?? "",
  };
}

export const fractionRegex =
  /([A-Za-zÁÉÍÓÚÑáéíóúñ0-9.,°v·×÷+^p?\-]+)\s*\/\s*([A-Za-zÁÉÍÓÚÑáéíóúñ0-9.,°v·×÷+^p?\-]+)/g;

export function applyAutoBold(line: string): string {
  if (line.includes("**")) return line;
  const patterns = [
    /^(Paso \d+\.)/,
    /^(Procedimiento \d+\.)/,
    /^(Requerimiento \d+\.)/,
    /^(Ecuación \d+\.)/,
    /^(Restricción [A-Z0-9]+:)/,
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

export function normalizeParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function splitIntoSentenceBlocks(text: string): string[] {
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
        if (/[A-ZÁÉÍÓÚÑ¿¡0-9]/.test(next)) {
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

export function renderFractions(text: string, keyBase: string): ReactNode[] {
  const superscriptMap: Record<string, string> = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
    "-": "⁻",
  };

  const applySuperscripts = (input: string) =>
    input.replace(/\^(-?\d+)/g, (_, exp: string) =>
      exp
        .split("")
        .map((ch) => superscriptMap[ch] ?? ch)
        .join("")
    );

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let count = 0;
  const regex = new RegExp(fractionRegex);
  const processed = applySuperscripts(text);
  while ((match = regex.exec(processed)) !== null) {
    if (match.index > lastIndex) {
      parts.push(processed.slice(lastIndex, match.index));
    }
    parts.push(
      <span className="fraction" key={`${keyBase}-frac-${count}`} role="math" aria-label={`${match[1]} sobre ${match[2]}`}>
        <span className="fraction-top" aria-hidden="true">{match[1]}</span>
        <span className="fraction-bar" aria-hidden="true" />
        <span className="fraction-bottom" aria-hidden="true">{match[2]}</span>
      </span>
    );
    lastIndex = match.index + match[0].length;
    count += 1;
  }
  if (lastIndex < processed.length) {
    parts.push(processed.slice(lastIndex));
  }
  return parts;
}

function renderLinksAndFractions(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(urlSplitRegex);
  const nodes: ReactNode[] = [];

  parts.forEach((part, index) => {
    if (!part) return;
    if (urlTestRegex.test(part)) {
      const { url, trailing } = splitTrailingPunctuation(part);
      const href = url.startsWith("http") ? url : `https://${url}`;
      nodes.push(
        <a
          key={`${keyBase}-url-${index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      );
      if (trailing) {
        nodes.push(trailing);
      }
      return;
    }
    nodes.push(...renderFractions(part, `${keyBase}-frac-${index}`));
  });

  return nodes;
}

export function renderBoldAndFractions(text: string, keyBase: string): ReactNode[] {
  const segments = text.split(/\*\*(.*?)\*\*/g);
  return segments.map((segment, i) => {
    const content = renderLinksAndFractions(segment, `${keyBase}-${i}`);
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

export function renderFormattedText(text: string, keyBase: string): ReactNode {
  const paragraphs = normalizeParagraphs(text);
  const listLine =
    /^(•|I\.|II\.|III\.|IV\.|V\.|VI\.|\d+\.|Paso \d+\.|Procedimiento \d+\.|Requerimiento \d+\.|Ecuación \d+\.|Restricción [A-Z0-9]+:|Juego \d+\.)/;
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
