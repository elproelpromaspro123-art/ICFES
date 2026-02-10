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
    title: "Guia de estudio del simulacro de Matematicas",
    intro:
      "Este resumen recoge lo que aparece en el simulacro y como abordarlo antes de responder. La idea es entender el tipo de problemas y tener a mano las herramientas mas usadas.",
    sections: [
      {
        title: "Panorama de lo que se pregunta",
        body:
          "Encontraras problemas de razonamiento numerico, proporcionalidad, porcentajes, interpretacion de tablas o situaciones y geometria basica. Varias preguntas piden justificar el procedimiento, no solo calcular.",
      },
      {
        title: "Formulas y relaciones que conviene dominar",
        bullets: [
          "Porcentaje: valor final = valor inicial Ã— (1 + p/100)",
          "Proporcionalidad directa e inversa (regla de tres)",
          "Areas: triangulo A = (bÃ—h)/2, rectangulo A = bÃ—h, circulo A = Ï€ rÂ²",
          "Volumenes: prisma/caja V = A de base Ã— h, cilindro V = Ï€ rÂ² Ã— h, esfera V = 4/3 Ï€ rÂ³",
          "Probabilidad: P = casos favorables / casos posibles",
        ],
      },
      {
        title: "Metodologia recomendada",
        bullets: [
          "Paso 1. Identifica datos, unidades y lo que realmente se pregunta.",
          "Paso 2. Representa la situacion con un esquema, tabla o ecuacion simple.",
          "Paso 3. Resuelve con el procedimiento mas corto y verifica el sentido del resultado.",
          "Paso 4. Compara con las opciones y descarta las que no cumplen las condiciones.",
        ],
      },
    ],
  },
  lectura: {
    title: "Guia de estudio del simulacro de Lectura Critica",
    intro:
      "El banco evalua comprension de textos, argumentacion y lectura critica. Este resumen organiza los tipos de preguntas y una ruta clara para responderlas.",
    sections: [
      {
        title: "Tipos de preguntas que aparecen",
        bullets: [
          "Idea principal, resumen o tema del texto",
          "Intencion comunicativa, proposito o funcion del texto",
          "Tesis, argumentos y postura del autor",
          "Inferencias y conclusiones que se deducen del pasaje",
          "Significado de palabras o expresiones en contexto",
          "Tono y actitud del narrador o del autor",
        ],
      },
      {
        title: "Como abordar cada texto",
        bullets: [
          "Lee primero la pregunta para saber que buscar.",
          "Ubica las frases que dan pistas (conectores, ejemplos, conclusiones).",
          "Verifica que tu respuesta se sostenga en el texto y no en suposiciones.",
        ],
      },
      {
        title: "Criterios para descartar opciones",
        bullets: [
          "Si una opcion exagera, generaliza o cambia el foco, descartala.",
          "Si introduce informacion no mencionada, no es valida.",
          "Prefiere la opcion que responde exactamente a la pregunta, no la mas llamativa.",
        ],
      },
    ],
  },
  sociales: {
    title: "Guia de estudio del simulacro de Sociales y Ciudadanas",
    intro:
      "Las preguntas trabajan conceptos de ciudadania, Estado, historia y procesos sociales. La clave es leer con cuidado el contexto y justificar la opcion con la informacion dada.",
    sections: [
      {
        title: "Ejes tematicos frecuentes",
        bullets: [
          "Estado, formas de gobierno y Constitucion",
          "Derechos, deberes y ciudadania",
          "Democracia, participacion y control ciudadano",
          "Procesos historicos y cambios sociales",
          "Economia y organizacion social",
        ],
      },
      {
        title: "Lectura de fuentes en el simulacro",
        body:
          "Muchas preguntas se apoyan en fragmentos de textos, citas o descripciones. La respuesta correcta siempre se justifica con lo que el enunciado afirma, sin agregar supuestos externos.",
      },
      {
        title: "Metodo para responder con claridad",
        bullets: [
          "Paso 1. Identifica el concepto central (derecho, institucion, proceso historico, etc.).",
          "Paso 2. Busca en el enunciado la pista que conecta con ese concepto.",
          "Paso 3. Elige la opcion que se ajusta al contexto y evita generalizaciones.",
        ],
      },
    ],
  },
};


