export type StudyGuideSection = {
  title: string;
  body?: string;
  bullets?: string[];
};

export type StudyGuide = {
  title: string;
  intro: string;
  sections: StudyGuideSection[];
};

export const studyGuides: Record<string, StudyGuide> = {
  matematicas: {
    title: "Guía de estudio del simulacro de Matemáticas",
    intro: "Este resumen recoge lo que aparece en el simulacro y cómo abordarlo antes de responder. La idea es entender el tipo de problemas y tener a mano las herramientas más usadas.",
    sections: [
      {
        title: "Panorama de lo que se pregunta",
        body: "Encontrarás problemas de razonamiento numérico, proporcionalidad, porcentajes, interpretación de tablas o situaciones y geometría básica. Varias preguntas piden justificar el procedimiento, no solo calcular.",
      },
      {
        title: "Fórmulas y relaciones que conviene dominar",
        bullets: [
          "Porcentaje: valor final = valor inicial × (1 + p/100)",
          "Proporcionalidad directa e inversa (regla de tres)",
          "Áreas: triángulo A = b×h/2, rectángulo A = b × h, círculo A = π × r²",
          "Volúmenes: prisma o caja V = A de base × h, cilindro V = π × r² × h, esfera V = 4/3 × π × r³",
          "Probabilidad: P = casos favorables/casos posibles",
        ],
      },
      {
        title: "Metodología recomendada",
        bullets: [
          "Paso 1. Identifica datos, unidades y lo que realmente se pregunta.",
          "Paso 2. Representa la situación con un esquema, tabla o ecuación simple.",
          "Paso 3. Resuelve con el procedimiento más corto y verifica el sentido del resultado.",
          "Paso 4. Compara con las opciones y descarta las que no cumplen las condiciones.",
        ],
      },
    ],
  },
  lectura: {
    title: "Guía de estudio del simulacro de Lectura Crítica",
    intro: "El banco evalúa comprensión de textos, argumentación y lectura crítica. Este resumen organiza los tipos de preguntas y una ruta clara para responderlas.",
    sections: [
      {
        title: "Tipos de preguntas que aparecen",
        bullets: [
          "Idea principal, resumen o tema del texto",
          "Intención comunicativa, propósito o función del texto",
          "Tesis, argumentos y postura del autor",
          "Inferencias y conclusiones que se deducen del pasaje",
          "Significado de palabras o expresiones en contexto",
          "Tono y actitud del narrador o del autor",
        ],
      },
      {
        title: "Cómo abordar cada texto",
        bullets: [
          "Lee primero la pregunta para saber qué buscar.",
          "Ubica las frases que dan pistas (conectores, ejemplos, conclusiones).",
          "Verifica que tu respuesta se sostenga en el texto y no en suposiciones.",
        ],
      },
      {
        title: "Criterios para descartar opciones",
        bullets: [
          "Si una opción exagera, generaliza o cambia el foco, descártala.",
          "Si introduce información no mencionada, no es válida.",
          "Prefiere la opción que responde exactamente a la pregunta, no la más llamativa.",
        ],
      },
    ],
  },
  sociales: {
    title: "Guía de estudio del simulacro de Sociales y Ciudadanas",
    intro: "Las preguntas trabajan conceptos de ciudadanía, Estado, historia y procesos sociales. La clave es leer con cuidado el contexto y justificar la opción con la información dada.",
    sections: [
      {
        title: "Ejes temáticos frecuentes",
        bullets: [
          "Estado, formas de gobierno y Constitución",
          "Derechos, deberes y ciudadanía",
          "Democracia, participación y control ciudadano",
          "Procesos históricos y cambios sociales",
          "Economía y organización social",
        ],
      },
      {
        title: "Lectura de fuentes en el simulacro",
        body: "Muchas preguntas se apoyan en fragmentos de textos, citas o descripciones. La respuesta correcta siempre se justifica con lo que el enunciado afirma, sin agregar supuestos externos.",
      },
      {
        title: "Método para responder con claridad",
        bullets: [
          "Paso 1. Identifica el concepto central (derecho, institución, proceso histórico, etc.).",
          "Paso 2. Busca en el enunciado la pista que conecta con ese concepto.",
          "Paso 3. Elige la opción que se ajusta al contexto y evita generalizaciones.",
        ],
      },
    ],
  },
};
