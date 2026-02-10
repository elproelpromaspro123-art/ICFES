const fs = require('fs');
const path = require('path');
const pdfjs = require('../node_modules/pdf-parse/lib/pdf.js/v2.0.550/build/pdf.js');
const { createCanvas } = require('@napi-rs/canvas');

const tolerance = 2;

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    return { canvas, context };
  }

  reset(canvasAndContext, width, height) {
    try {
      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    } catch {
      // ignore
    }
  }

  destroy(canvasAndContext) {
    try {
      canvasAndContext.canvas.width = 1;
      canvasAndContext.canvas.height = 1;
    } catch {
      // ignore
    }
  }
}

const noisePatterns = [
  /Cuadernillo de preguntas/gi,
  /Cuadernillo de Prueba preguntas Lectura Crítica/gi,
  /Cuadernillo de Prueba preguntas Sociales y Ciudadanas/gi,
  /Cuadernillo de Prueba/gi,
  /Prueba preguntas Lectura Crítica/gi,
  /Prueba preguntas Sociales y Ciudadanas/gi,
  /Saber 11\.º/gi,
  /Saber 11°/gi,
  /Saber 11/gi,
  /Lectura Crítica/gi,
  /Sociales y Ciudadanas/gi,
];

function stripNoise(line) {
  let output = line;
  for (const pattern of noisePatterns) {
    output = output.replace(pattern, '');
  }
  output = output.replace(/\s+2021(\s+2021)?\s*$/g, '');
  output = output.replace(/\s{2,}/g, ' ').trim();
  return output;
}

function groupLines(items) {
  const rows = [];
  for (const item of items) {
    const str = String(item.str || '').trim();
    if (!str) continue;
    const y = Math.round(item.transform[5] * 10) / 10;
    let row = rows.find((r) => Math.abs(r.y - y) <= tolerance);
    if (!row) {
      row = { y, items: [] };
      rows.push(row);
    }
    row.items.push({ str, x: item.transform[4] });
  }
  rows.sort((a, b) => b.y - a.y);
  return rows.map((r) =>
    r.items
      .sort((a, b) => a.x - b.x)
      .map((i) => i.str)
      .join(' ')
  );
}

function normalizeLine(line) {
  return line.replace(/\s+/g, ' ').trim();
}

function isSkippable(line, skipPatterns) {
  return skipPatterns.some((r) => r.test(line));
}

async function extractLinesByPage(pdfPath, skipPatterns) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await pdfjs.getDocument({ data }).promise;
  const pages = [];

  for (let p = 1; p <= pdf.numPages; p += 1) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const rawLines = groupLines(content.items)
      .map(normalizeLine)
      .map(stripNoise)
      .filter(Boolean)
      .filter((line) => !isSkippable(line, skipPatterns));

    pages.push({ pageNumber: p, lines: rawLines });
  }

  return { pdf, pages };
}

function parseQuestions(pages, stopAtAnswer = true) {
  const questions = [];
  let current = null;
  let inOptions = false;
  let started = false;
  let carryOver = [];
  let captureIntro = false;
  let postOptionsCarry = false;

  const endPatterns = [/^respuestas correctas/i, /^tabla de/i];

  for (const page of pages) {
    for (const line of page.lines) {
      if (stopAtAnswer && started && endPatterns.some((r) => r.test(line))) {
        if (current) {
          questions.push(current);
          current = null;
        }
        return questions;
      }

      const qMatch = line.match(/^Pregunta\s+(\d+)/i);
      if (qMatch) {
        started = true;
        captureIntro = false;
        postOptionsCarry = false;
        if (current) questions.push(current);
        current = {
          id: Number(qMatch[1]),
          pageNumber: page.pageNumber,
          textLines: [...carryOver],
          options: [],
        };
        carryOver = [];
        inOptions = false;
        continue;
      }

      if (!current) {
        if (/^RESPONDA/i.test(line) || captureIntro) {
          captureIntro = true;
          carryOver.push(line);
        }
        continue;
      }

      if (postOptionsCarry) {
        carryOver.push(line);
        continue;
      }

      const optMatch = line.match(/^([ABCD])\.\s*(.*)$/);
      if (optMatch) {
        inOptions = true;
        current.options.push({ letter: optMatch[1], text: normalizeLine(optMatch[2]) });
        continue;
      }

      if (inOptions) {
        if (current.options.length >= 4 && /^RESPONDA/i.test(line)) {
          carryOver.push(line);
          captureIntro = true;
          inOptions = false;
          postOptionsCarry = true;
          continue;
        }
        const last = current.options[current.options.length - 1];
        last.text = normalizeLine(`${last.text} ${line}`);
      } else {
        current.textLines.push(line);
      }
    }
  }

  if (current) questions.push(current);
  return questions;
}

async function extractAnswerKey(pdf, answerPage) {
  const page = await pdf.getPage(answerPage);
  const content = await page.getTextContent();
  const items = content.items
    .map((i) => ({
      str: String(i.str || '').trim(),
      x: Math.round(i.transform[4]),
      y: Math.round(i.transform[5]),
    }))
    .filter((i) => i.str);

  const rows = new Map();
  const rowTol = 2;
  for (const item of items) {
    if (!/^\d{1,2}$/.test(item.str) && !/^[ABCD]$/.test(item.str)) continue;
    let key = null;
    for (const y of rows.keys()) {
      if (Math.abs(y - item.y) <= rowTol) {
        key = y;
        break;
      }
    }
    if (key === null) {
      key = item.y;
      rows.set(key, []);
    }
    rows.get(key).push(item);
  }

  const answerMap = new Map();
  const sortedRows = [...rows.entries()].sort((a, b) => b[0] - a[0]);

  for (const [, row] of sortedRows) {
    const sorted = row.sort((a, b) => a.x - b.x);
    for (let i = 0; i < sorted.length; i += 1) {
      const current = sorted[i];
      if (!/^\d{1,2}$/.test(current.str)) continue;
      const letter = sorted.slice(i + 1).find((item) => /^[ABCD]$/.test(item.str));
      if (!letter) continue;
      answerMap.set(Number(current.str), letter.str);
      i = sorted.indexOf(letter);
    }
  }

  return answerMap;
}

async function findAnswerPage(pdf) {
  let candidate = null;
  for (let p = 1; p <= pdf.numPages; p += 1) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const text = content.items.map((i) => i.str).join(' ');
    if (/Tabla de respuestas correctas/i.test(text)) return p;
    if (/respuestas correctas/i.test(text)) candidate = p;
  }
  return candidate;
}

function cleanQuestionText(lines) {
  return lines.map(normalizeLine).join('\n');
}

function needsImage(text) {
  const lower = text.toLowerCase();
  return /(figura|gr[áa]fico|tabla|imagen|mapa|ilustraci[óo]n|diagrama|esquema|caricatura|vi[ñn]eta|fotograf|foto|afiche|cartel|anuncio|publicidad)/.test(
    lower
  );
}

async function renderPageToPng(pdf, pageNumber, outPath) {
  const page = await pdf.getPage(pageNumber);
  const scales = [1.5, 1.25, 1];
  const canvasFactory = new NodeCanvasFactory();
  let lastError = null;
  for (const scale of scales) {
    try {
      const viewport = page.getViewport(scale);
      const { canvas, context } = canvasFactory.create(
        Math.ceil(viewport.width),
        Math.ceil(viewport.height)
      );
      await page.render({ canvasContext: context, viewport, canvasFactory }).promise;
      fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
      canvasFactory.destroy({ canvas, context });
      return;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

async function run() {
  const baseDir = path.resolve(__dirname, '..');
  const outputDir = path.join(baseDir, 'src', 'data');

  const locales = {
    sociales: {
      pdfPath: path.join(baseDir, '..', '06_PRACTICA_SOCIALES.pdf'),
      outFile: path.join(outputDir, 'questions-sociales.ts'),
      exportName: 'socialesQuestions',
      skip: [
        /^Prueba$/i,
        /^Sociales y Ciudadanas$/i,
        /^Saber 11.*$/i,
        /^Cuadernillo de$/i,
        /^preguntas$/i,
        /^Módulo de$/i,
        /^\d{4}$/,
        /^\d{1,2}$/,
        /^Cuadernillo de preguntas$/i,
      ],
    },
    lectura: {
      pdfPath: path.join(baseDir, '..', '02_PRACTICA_LECTURA.pdf'),
      outFile: path.join(outputDir, 'questions-lectura.ts'),
      exportName: 'lecturaQuestions',
      skip: [
        /^Prueba$/i,
        /^Lectura Crítica$/i,
        /^Saber 11.*$/i,
        /^Cuadernillo de$/i,
        /^preguntas$/i,
        /^Módulo de$/i,
        /^\d{4}$/,
        /^\d{1,2}$/,
        /^Cuadernillo de preguntas$/i,
      ],
    },
  };

  for (const [key, cfg] of Object.entries(locales)) {
    const { pdf, pages } = await extractLinesByPage(cfg.pdfPath, cfg.skip);
    const answerPage = await findAnswerPage(pdf);
    const answers = answerPage ? await extractAnswerKey(pdf, answerPage) : new Map();

    const questionsRaw = parseQuestions(pages, true);
    const questions = questionsRaw.map((q) => {
      const text = cleanQuestionText(q.textLines);
      const options = q.options.map((opt) => ({
        letter: opt.letter,
        text: normalizeLine(opt.text),
      }));
      const correctAnswer = answers.get(q.id) || 'A';
      return {
        id: q.id,
        text,
        options,
        correctAnswer,
        explanation: `Respuesta correcta: ${correctAnswer}.`,
        pageNumber: q.pageNumber,
      };
    });

    const missing = questions.filter((q) => !answers.get(q.id)).map((q) => q.id);
    if (missing.length) {
      console.log(`[${key}] respuestas faltantes:`, missing);
    }

    let imagePages = [];
    if (key === 'lectura') {
      for (let p = 1; p <= pdf.numPages; p += 1) {
        const page = await pdf.getPage(p);
        const opList = await page.getOperatorList();
        const hasImage =
          opList.fnArray.includes(pdfjs.OPS.paintImageXObject) ||
          opList.fnArray.includes(pdfjs.OPS.paintJpegXObject);
        if (hasImage && p !== 1) imagePages.push(p);
      }

      const outImgDir = path.join(baseDir, 'public', 'images', 'lectura');
      fs.mkdirSync(outImgDir, { recursive: true });

      for (const p of imagePages) {
        const outPath = path.join(outImgDir, `pagina-${p}.png`);
        if (!fs.existsSync(outPath)) {
          await renderPageToPng(pdf, p, outPath);
        }
      }
    }

    const finalQuestions = questions.map((q) => {
      if (key !== 'lectura') return q;
      if (imagePages.includes(q.pageNumber) && needsImage(q.text)) {
        return {
          ...q,
          image: `/images/lectura/pagina-${q.pageNumber}.png`,
        };
      }
      return q;
    });

    const output = `import { Question } from "./types";\n\nexport const ${cfg.exportName}: Question[] = ${JSON.stringify(
      finalQuestions.map(({ pageNumber, ...rest }) => rest),
      null,
      2
    )};\n`;

    fs.writeFileSync(cfg.outFile, output, 'utf8');
    console.log(`Escrito ${cfg.outFile} con ${finalQuestions.length} preguntas.`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
