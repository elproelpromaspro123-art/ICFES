export interface Question {
  id: number;
  text: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  image?: string;
  sharedImage?: string;
  extraImage?: string;
  groupLabel?: string;
  groupText?: string;
}

export const mathQuestions: Question[] = [
  {
    "id": 1,
    "text": "Un sistema de transporte masivo tiene varias estaciones (E1, E2,…) sobre una avenida. En\ncondiciones normales, entre dos estaciones consecutivas, un bus se demora 4 minutos y en\ncada parada, 30 segundos. En la figura, los círculos sombreados representan las paradas\nde cada ruta (R1, R2,...).\nUn usuario que desea ir de E1 a E10 en el menor tiempo, determinó, con base en la figura,\nque la ruta que más le convenía tomar era R2 y estimó el tiempo que tardaría viajando en\nel bus así:\nI.   Contó la cantidad de tramos entre estaciones consecutivas que había en su recorrido: 10.\nII.  Multiplicó el número obtenido en I (10) por la cantidad de minutos (4) que tardará entre\ndos estaciones consecutivas: 40 minutos.\nIII. Al resultado anterior le sumó 30 segundos por la parada que hará en E6: 40,5 minutos.\nEste procedimiento es incorrecto en el(los) paso(s)",
    "options": [
      {
        "letter": "A",
        "text": "I solamente."
      },
      {
        "letter": "B",
        "text": "I y II solamente."
      },
      {
        "letter": "C",
        "text": "II solamente."
      },
      {
        "letter": "D",
        "text": "II y III solamente."
      }
    ],
    "correctAnswer": "A",
    "explanation": "El paso I es incorrecto. Entre E1 y E10 hay 9 tramos (no 10), ya que de E1 a E2 es 1 tramo, de E2 a E3 es otro, etc. La ruta R2 para en E1, E6 y E10, por lo que hay 9 tramos entre estaciones consecutivas. El paso II aplica correctamente la multiplicación con el dato del paso I, y el paso III suma correctamente la parada intermedia.",
    "image": "/images/matematicas/imagen de la pregunta 1.png"
  },
  {
    "id": 2,
    "text": "Una persona que vive en Colombia tiene inversiones en dólares en Estados Unidos, y sabe\nque la tasa de cambio del dólar respecto al peso colombiano se mantendrá constante este\nmes, siendo 1 dólar equivalente a 2.000 pesos colombianos y que su inversión, en dólares,\nle dará ganancias del 3 % en el mismo periodo. Un amigo le asegura que en pesos sus\nganancias también serán del 3 %.\nLa afirmación de su amigo es",
    "options": [
      {
        "letter": "A",
        "text": "correcta, pues, sin importar las variaciones en la tasa de cambio, la proporción en que aumenta la inversión en dólares es la misma que en pesos."
      },
      {
        "letter": "B",
        "text": "incorrecta, pues debería conocerse el valor exacto de la inversión para poder calcular la cantidad de dinero que ganará."
      },
      {
        "letter": "C",
        "text": "correcta, pues el 3 % representa una proporción fija en cualquiera de las dos monedas, puesto que la tasa de cambio permanecerá constante."
      },
      {
        "letter": "D",
        "text": "incorrecta, pues el 3 % representa un incremento, que será mayor en pesos colombianos, pues en esta moneda cada dólar representa un valor 2.000 veces mayor."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Como la tasa de cambio se mantiene constante (1 USD = 2.000 COP), si la inversión crece 3% en dólares, al convertir a pesos también crece exactamente 3%. Por ejemplo: 100 USD = 200.000 COP → 103 USD = 206.000 COP. La ganancia es 6.000/200.000 = 3%."
  },
  {
    "id": 3,
    "text": "Las directivas de un colegio tienen que organizar un viaje a un museo con 140 estudiantes,\nquienes deben dividirse en 3 grupos. Cada grupo irá en una franja diferente, pero el costo\ntotal de las entradas se asumirá equitativamente por los estudiantes. En la tabla se muestran\nlos horarios disponibles, la máxima cantidad de estudiantes y los precios respectivos de cada\nhorario.\nCon el fin de que todos los estudiantes asistan y paguen el menor precio, las directivas\neligieron las franjas 1, 3 y 4. ¿Esta elección garantiza que asistan todos los estudiantes al\nmenor precio posible?",
    "options": [
      {
        "letter": "A",
        "text": "Sí, porque esas franjas suman exactamente 140 estudiantes."
      },
      {
        "letter": "B",
        "text": "No, porque es posible obtener un precio menor eligiendo la franja 2 en lugar de la franja 3."
      },
      {
        "letter": "C",
        "text": "Sí, porque se incluyó la franja 1 que es la de menor precio por estudiante."
      },
      {
        "letter": "D",
        "text": "No, porque los estudiantes que van en la franja 3 pagan más."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Franjas 1,3,4: capacidad 50+30+60=140 ✓. Costo total: 50×35.000 + 30×50.000 + 60×45.000 = 5.950.000. Franjas 1,2,4: capacidad 50+40+60=150≥140 ✓. Costo total: 50×35.000 + 40×40.000 + 60×45.000 = 6.050.000. Pero la franja 2 ($40.000) es más barata que la 3 ($50.000), así que reemplazarla reduce el costo total por estudiante.",
    "image": "/images/matematicas/imagen de la pregunta 3.png"
  },
  {
    "id": 4,
    "text": "La empresa pagará $4.200.000 por capacitar a los trabajadores de la dependencia\n“Insumos” en el módulo I; esto quiere decir que la dependencia tiene entre",
    "options": [
      {
        "letter": "A",
        "text": "20 y 30 trabajadores."
      },
      {
        "letter": "B",
        "text": "41 y 60 trabajadores."
      },
      {
        "letter": "C",
        "text": "61 y 90 trabajadores."
      },
      {
        "letter": "D",
        "text": "80 y 120 trabajadores."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Módulo I: 40 horas a $35.000/hora = $1.400.000 por curso (de 20 a 30 personas). $4.200.000 ÷ $1.400.000 = 3 cursos. Con 3 cursos de 20 a 30 personas cada uno, hay entre 3×20=60 y 3×30=90 trabajadores. Como deben ser al menos 61 (si fueran 60, bastarían 2 cursos de 30), la respuesta es entre 61 y 90.",
    "sharedImage": "/images/matematicas/imagen de la pregunta 4 a 6.png",
    "groupLabel": "RESPONDA LAS PREGUNTAS 4 A 6 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN",
    "groupText": "Para capacitar en informática básica a los trabajadores de algunas dependencias de una empresa, se contrata una institución que ofrece un plan educativo de 4 módulos (ver tabla)."
  },
  {
    "id": 5,
    "text": "Si se les cobrara a los 50 trabajadores de la dependencia “Recursos Humanos” la capacitación\ndel módulo II, y todos pagaran el mismo valor, ¿cuánto debería pagar cada uno por esa\ncapacitación?",
    "options": [
      {
        "letter": "A",
        "text": "$18.000"
      },
      {
        "letter": "B",
        "text": "$36.000"
      },
      {
        "letter": "C",
        "text": "$450.000"
      },
      {
        "letter": "D",
        "text": "$900.000"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Módulo II: 30 horas × $30.000/hora = $900.000 por curso. 50 trabajadores requieren 2 cursos (de 20-30 personas: 25+25). Costo total: 2 × $900.000 = $1.800.000. Por persona: $1.800.000 ÷ 50 = $36.000.",
    "sharedImage": "/images/matematicas/imagen de la pregunta 4 a 6.png",
    "groupLabel": "RESPONDA LAS PREGUNTAS 4 A 6 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN",
    "groupText": "Para capacitar en informática básica a los trabajadores de algunas dependencias de una empresa, se contrata una institución que ofrece un plan educativo de 4 módulos (ver tabla)."
  },
  {
    "id": 6,
    "text": "La empresa paga $900.000 por la capacitación de los 40 funcionarios de la dependencia\n“Importaciones”. De acuerdo con el valor pagado, la capacitación corresponde al módulo",
    "options": [
      {
        "letter": "A",
        "text": "I."
      },
      {
        "letter": "B",
        "text": "II."
      },
      {
        "letter": "C",
        "text": "III."
      },
      {
        "letter": "D",
        "text": "IV."
      }
    ],
    "correctAnswer": "D",
    "explanation": "40 funcionarios necesitan 2 cursos (de 20 personas cada uno). Costo por curso: $900.000 ÷ 2 = $450.000. Módulo IV: 10 horas × $45.000/hora = $450.000 ✓. Las demás opciones no coinciden: Mód I = $1.400.000, Mód II = $900.000 (1 curso), Mód III = $1.600.000.",
    "sharedImage": "/images/matematicas/imagen de la pregunta 4 a 6.png",
    "groupLabel": "RESPONDA LAS PREGUNTAS 4 A 6 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN",
    "groupText": "Para capacitar en informática básica a los trabajadores de algunas dependencias de una empresa, se contrata una institución que ofrece un plan educativo de 4 módulos (ver tabla)."
  },
  {
    "id": 7,
    "text": "La figura muestra el portalápices de Eliécer. Él sabe que es posible colocar un caucho de 18 cm\nde perímetro alrededor de la base sin estirarlo, pero a medida que sube el caucho por el\nportalápices, este se estira hasta que, en la boca del portalápices, su perímetro es 24 cm.\nEl portalápices tiene base y boca cuadrada, por lo cual Eliécer afirma: “Como los perímetros\nde la base y la boca del portalápices están en relación 18/24 = 3/4, el área de la base debe\nser también tres cuartas partes del área de la boca del portalápices”. ¿Es verdadera esta\nafirmación?",
    "options": [
      {
        "letter": "A",
        "text": "No, porque la medición se realiza con el mismo caucho y, por tanto, las áreas de la base y la boca deben ser iguales."
      },
      {
        "letter": "B",
        "text": "Sí, porque el caucho se estira dependiendo del área que encierre, por lo que las relaciones de las áreas y los perímetros son iguales."
      },
      {
        "letter": "C",
        "text": "No, porque la relación obtenida se cumple para las longitudes de los lados, pero al calcular las áreas, la razón obtenida se eleva al cuadrado."
      },
      {
        "letter": "D",
        "text": "Sí, porque como las figuras son semejantes, todas sus medidas deben tener la misma razón que los perímetros."
      }
    ],
    "correctAnswer": "C",
    "explanation": "La relación de perímetros 18/24 = 3/4 aplica a los lados (lado base = 4,5 cm, lado boca = 6 cm). Pero el área es lado², entonces la relación de áreas es (3/4)² = 9/16, no 3/4.",
    "image": "/images/matematicas/imagen de la pregunta 7.png"
  },
  {
    "id": 8,
    "text": "Un grupo de montañistas sabe que cada vez que aumenta la altitud en 100 m, la temperatura\ndisminuye en 1 °C. Si el grupo se encuentra a una altitud de 1.000 m, donde la temperatura es\nde 20 °C, ¿cuál de las siguientes expresiones les permite determinar la temperatura que habrá\ncuando se encuentren a 4.000 m de altitud?",
    "options": [
      {
        "letter": "A",
        "text": "Temperatura = (Altitud/100) + 10"
      },
      {
        "letter": "B",
        "text": "Temperatura = − Altitud × 100 + 30"
      },
      {
        "letter": "C",
        "text": "Temperatura = −(Altitud/100) + 30"
      },
      {
        "letter": "D",
        "text": "Temperatura = Altitud × 100 + 10"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A 1.000 m → 20°C. Cada 100 m sube, baja 1°C. T = 20 - (Altitud - 1000)/100 = 30 - Altitud/100 = -(Altitud/100) + 30. Verificación: a 4.000 m → -(4000/100) + 30 = -40 + 30 = -10°C ✓."
  },
  {
    "id": 9,
    "text": "Una persona afirma que para el comerciante es más rentable vender 6 toneladas de mango\nen la ciudad Z que en la ciudad W. La afirmación de esta persona es correcta, porque",
    "options": [
      {
        "letter": "A",
        "text": "el dinero recibido en la venta del producto en la ciudad Z es mayor que el recibido en la ciudad W."
      },
      {
        "letter": "B",
        "text": "la diferencia entre el precio de venta por tonelada es mayor que la diferencia entre el costo de transporte por camión."
      },
      {
        "letter": "C",
        "text": "la diferencia entre las ventas totales en cada ciudad es mayor que la diferencia entre los gastos totales."
      },
      {
        "letter": "D",
        "text": "el dinero total gastado en empleados y transporte es mayor en la ciudad W que en la ciudad Z."
      }
    ],
    "correctAnswer": "C",
    "explanation": "6 toneladas = 2 camiones. Ciudad W: Ventas = 6×$1.300.000 = $7.800.000. Gastos = 2×$150.000 + 2×2×$180.000 = $1.020.000. Ganancia = $6.780.000. Ciudad Z: Ventas = 6×$1.350.000 = $8.100.000. Gastos = 2×$180.000 + 2×2×$200.000 = $1.160.000. Ganancia = $6.940.000. Diferencia ventas ($300.000) > Diferencia gastos ($140.000).",
    "sharedImage": "/images/matematicas/imagen de la pregunta 9 a 13.png",
    "groupLabel": "RESPONDA LAS PREGUNTAS 9 A 13 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN",
    "groupText": "Para transportar mango y banano desde un pueblo cercano a dos ciudades, W y Z, un comerciante utiliza tres (3) camiones con capacidad de 5 toneladas cada uno; por cada camión contrata dos trabajadores en cada viaje. El comerciante compra a $400.000 la tonelada de banano y a $500.000, la de mango. En la tabla se muestra el precio de venta por tonelada de cada producto y los gastos de transporte y de trabajadores para cada ciudad."
  },
  {
    "id": 10,
    "text": "Los tres (3) camiones se cargan con 5 toneladas de banano cada uno para venderse en la\nciudad W.\nEl comerciante necesita conocer la ganancia al hacer este negocio, ejecutando el siguiente\nprocedimiento:\nPaso 1. Halla el número de toneladas de banano que hay en los 3 camiones.\nPaso 2. Halla la diferencia entre el precio de venta de una tonelada de banano en la ciudad\nW y el precio de compra.\nPaso 3. Multiplica los valores hallados en los pasos 1 y 2.\nPaso 4. Encuentra los costos totales de transporte y le suma el pago total de los trabajadores\nen los tres viajes.\nPaso 5. Halla la diferencia entre el valor obtenido en el paso 3 y el paso 4.\n¿Cuál es la ganancia que obtiene el comerciante?",
    "options": [
      {
        "letter": "A",
        "text": "$5.670.000"
      },
      {
        "letter": "B",
        "text": "$5.970.000"
      },
      {
        "letter": "C",
        "text": "$7.470.000"
      },
      {
        "letter": "D",
        "text": "$8.010.000"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Paso 1: 3×5 = 15 toneladas. Paso 2: $1.000.000 - $400.000 = $600.000/ton. Paso 3: 15 × $600.000 = $9.000.000. Paso 4: 3×$150.000 + 3×2×$180.000 = $450.000 + $1.080.000 = $1.530.000. Paso 5: $9.000.000 - $1.530.000 = $7.470.000.",
    "sharedImage": "/images/matematicas/imagen de la pregunta 9 a 13.png",
    "groupLabel": "RESPONDA LAS PREGUNTAS 9 A 13 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN",
    "groupText": "Para transportar mango y banano desde un pueblo cercano a dos ciudades, W y Z, un comerciante utiliza tres (3) camiones con capacidad de 5 toneladas cada uno; por cada camión contrata dos trabajadores en cada viaje. El comerciante compra a $400.000 la tonelada de banano y a $500.000, la de mango. En la tabla se muestra el precio de venta por tonelada de cada producto y los gastos de transporte y de trabajadores para cada ciudad."
  },
  {
    "id": 11,
    "text": "Para diciembre, el comerciante decidió que por cada 5 toneladas del producto transportado\nen camión y vendido en alguna de las ciudades, cada uno de los dos empleados necesarios\npor camión recibirá un bono de 0,3 % del dinero recibido en la venta de esas 5 toneladas.\nEn ese mes, dos empleados transportaron y vendieron 47 toneladas de mango a la ciudad W.\nPara hallar el bono recibido por cada uno de ellos, se ejecutó el siguiente procedimiento:\nPaso 1. Se dividió el número de toneladas vendidas entre 5 y se halló su residuo.\nPaso 2. Se restó del número de toneladas vendidas, el valor obtenido en el paso 1.\nPaso 3. Se multiplicó el valor obtenido en el paso 2 por el valor de venta de la tonelada del\nproducto.\nPaso 4. Al valor obtenido en el paso 3, se le sacó el 0,3 %.\nEl bono recibido por cada empleado fue, aproximadamente, de",
    "options": [
      {
        "letter": "A",
        "text": "526.000 pesos."
      },
      {
        "letter": "B",
        "text": "175.000 pesos."
      },
      {
        "letter": "C",
        "text": "148.000 pesos."
      },
      {
        "letter": "D",
        "text": "87.000 pesos."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Paso 1: 47 ÷ 5 = 9 resto 2. Paso 2: 47 - 2 = 45 toneladas. Paso 3: 45 × $1.300.000 = $58.500.000. Paso 4: $58.500.000 × 0,003 = $175.500 ≈ $175.000 por cada empleado.",
    "sharedImage": "/images/matematicas/imagen de la pregunta 9 a 13.png",
    "groupLabel": "RESPONDA LAS PREGUNTAS 9 A 13 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN",
    "groupText": "Para transportar mango y banano desde un pueblo cercano a dos ciudades, W y Z, un comerciante utiliza tres (3) camiones con capacidad de 5 toneladas cada uno; por cada camión contrata dos trabajadores en cada viaje. El comerciante compra a $400.000 la tonelada de banano y a $500.000, la de mango. En la tabla se muestra el precio de venta por tonelada de cada producto y los gastos de transporte y de trabajadores para cada ciudad."
  },
  {
    "id": 12,
    "text": "Si se transportan 7 toneladas de fruta a la ciudad W y 10 toneladas de fruta a la ciudad Z,\nla gráfica que muestra la relación de costos por ciudad es",
    "options": [
      {
        "letter": "A",
        "text": "Opción A"
      },
      {
        "letter": "B",
        "text": "Opción B"
      },
      {
        "letter": "C",
        "text": "Opción C"
      },
      {
        "letter": "D",
        "text": "Opción D"
      }
    ],
    "correctAnswer": "B",
    "explanation": "7 ton a W: 2 camiones. Transporte: 2×$150.000 = $300.000. Trabajadores: 2×2×$180.000 = $720.000. 10 ton a Z: 2 camiones. Transporte: 2×$180.000 = $360.000. Trabajadores: 2×2×$200.000 = $800.000. La gráfica B muestra correctamente estos valores.",
    "image": "/images/matematicas/imagen de la pregunta 12 (basicamente es una imagen necesaria para la pregunta 2 porque contiene las opciones de respuesta (ABCD).png",
    "sharedImage": "/images/matematicas/imagen de la pregunta 9 a 13.png",
    "groupLabel": "RESPONDA LAS PREGUNTAS 9 A 13 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN",
    "groupText": "Para transportar mango y banano desde un pueblo cercano a dos ciudades, W y Z, un comerciante utiliza tres (3) camiones con capacidad de 5 toneladas cada uno; por cada camión contrata dos trabajadores en cada viaje. El comerciante compra a $400.000 la tonelada de banano y a $500.000, la de mango. En la tabla se muestra el precio de venta por tonelada de cada producto y los gastos de transporte y de trabajadores para cada ciudad."
  },
  {
    "id": 13,
    "text": "Durante enero, el comerciante vendió 100 toneladas de mango y 50 de banano, y contrató\n10 trabajadores. Con esta información es posible conocer",
    "options": [
      {
        "letter": "A",
        "text": "la ganancia de los productores."
      },
      {
        "letter": "B",
        "text": "el pago que recibirá cada trabajador en enero."
      },
      {
        "letter": "C",
        "text": "los costos totales del comerciante."
      },
      {
        "letter": "D",
        "text": "el número mínimo de viajes que se realizaron desde el pueblo."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Se sabe que cada camión lleva 5 toneladas. Total: 100 + 50 = 150 toneladas. Con 3 camiones de 5 ton, cada viaje lleva máximo 15 ton. Mínimo de viajes: 150/15 = 10 viajes.",
    "sharedImage": "/images/matematicas/imagen de la pregunta 9 a 13.png",
    "groupLabel": "RESPONDA LAS PREGUNTAS 9 A 13 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN",
    "groupText": "Para transportar mango y banano desde un pueblo cercano a dos ciudades, W y Z, un comerciante utiliza tres (3) camiones con capacidad de 5 toneladas cada uno; por cada camión contrata dos trabajadores en cada viaje. El comerciante compra a $400.000 la tonelada de banano y a $500.000, la de mango. En la tabla se muestra el precio de venta por tonelada de cada producto y los gastos de transporte y de trabajadores para cada ciudad."
  },
  {
    "id": 14,
    "text": "Si en un rectángulo se aumenta la longitud de uno de sus lados en 100 %, su área",
    "options": [
      {
        "letter": "A",
        "text": "aumenta en un 50 %."
      },
      {
        "letter": "B",
        "text": "se duplica."
      },
      {
        "letter": "C",
        "text": "no cambia."
      },
      {
        "letter": "D",
        "text": "aumenta en 100 unidades."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Área original = base × altura. Si un lado aumenta 100% (se duplica), el nuevo lado es 2×lado. Área nueva = 2 × Área original. El área se duplica."
  },
  {
    "id": 15,
    "text": "Un asteroide pasa cerca de un planeta y la fuerza gravitacional que este produce afecta la\ntrayectoria del asteroide, de forma que se describe mediante una parábola. Un astrónomo\nconoce las coordenadas de dos puntos, M y N, por los cuales pasó el asteroide y elaboró esta\ngráfica.\nSi se necesita hallar los valores a, b y c que describen la ecuación de la parábola y = ax² + bx + c,\n¿qué información adicional se debe conocer?",
    "options": [
      {
        "letter": "A",
        "text": "La coordenada x del vértice de la parábola."
      },
      {
        "letter": "B",
        "text": "Un tercer punto de la parábola que se describe."
      },
      {
        "letter": "C",
        "text": "Si la parábola abre hacia arriba o hacia abajo."
      },
      {
        "letter": "D",
        "text": "Las distancias entre el planeta y los puntos M y N."
      }
    ],
    "correctAnswer": "B",
    "explanation": "La ecuación y = ax² + bx + c tiene 3 incógnitas (a, b, c). Cada punto da una ecuación. Con 2 puntos se obtienen 2 ecuaciones, pero se necesitan 3. Se requiere un tercer punto.",
    "image": "/images/matematicas/imagen de la pregunta 15.png"
  },
  {
    "id": 16,
    "text": "Una escuela de natación cuenta con un total de 16 estudiantes. Para las clases se usan 2\npiscinas con distinta profundidad. Por seguridad, las personas con una estatura inferior a\n1,80 m se envían a la piscina menos profunda, y las demás, a la más profunda.\nUn día, el director de la escuela escucha que el promedio de estatura de las 16 personas\nes 1,70 m e insiste en aumentar la cantidad de alumnos para que el promedio sea 1,80 m,\nafirmando que de esta manera se logrará igualar la cantidad de personas en las dos piscinas.\n¿Por qué es errónea la afirmación del director?",
    "options": [
      {
        "letter": "A",
        "text": "Porque las 16 personas se encuentran actualmente en la piscina menos profunda. El director de la escuela debe aceptar otros 16 alumnos con una estatura superior a 1,80 m."
      },
      {
        "letter": "B",
        "text": "Porque con el promedio es imposible determinar la cantidad de personas en las piscinas. Es necesario utilizar otras medidas, como la estatura máxima o mínima de las personas, en lugar de esta."
      },
      {
        "letter": "C",
        "text": "Porque incrementar el promedio a 1,80 m es insuficiente. El director de la escuela debe aceptar más estudiantes con una altura de 1,80 m hasta que la cantidad de alumnos sea igual en ambas piscinas."
      },
      {
        "letter": "D",
        "text": "Porque aunque el promedio de estatura de las 16 personas sea inferior a 1,80 m, no significa que la cantidad de personas en las piscinas sea diferente."
      }
    ],
    "correctAnswer": "D",
    "explanation": "El promedio no determina la distribución. Por ejemplo, 8 personas de 1,60 m y 8 de 1,80 m dan promedio 1,70 m, pero las piscinas ya estarían equilibradas (8 y 8)."
  },
  {
    "id": 17,
    "text": "En un juego, el animador elige tres números positivos, X, Z y W, y una vez elegidos debe\nproveerles a los participantes información que permita hallar los números, declarando ganador\nal jugador que primero los encuentre. En una ocasión, el animador les suministró como\npistas a los participantes los valores R = XZ, S = XW y T = ZW, información suficiente para\nhallar los valores de X, Z y W. Una de las jugadoras quiere hallar X primero; la forma de\nhallarlo es resolviendo",
    "options": [
      {
        "letter": "A",
        "text": "R + S"
      },
      {
        "letter": "B",
        "text": "√(RST)"
      },
      {
        "letter": "C",
        "text": "(R + S − T) / 2"
      },
      {
        "letter": "D",
        "text": "√(RS / T)"
      }
    ],
    "correctAnswer": "D",
    "explanation": "R = XZ, S = XW, T = ZW. RS = (XZ)(XW) = X²ZW = X²T. Por lo tanto, RS/T = X². Entonces X = √(RS/T)."
  },
  {
    "id": 18,
    "text": "Un barco navega entre dos faros, ubicados en la parte inferior de la figura.\nEn el instante en que el ángulo formado entre el barco, el faro superior y cualquiera de los otros\nfaros es de 45°, ¿cuál es la distancia x entre el faro superior y el barco?",
    "options": [
      {
        "letter": "A",
        "text": "x = sen(45º) 2 sen(60º)"
      },
      {
        "letter": "B",
        "text": "x= sen(45º) sen(60º)"
      },
      {
        "letter": "C",
        "text": "x = sen(75º) sen(30º)"
      },
      {
        "letter": "D",
        "text": "x = sen(60º)"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Aplicando la ley de senos en el triángulo formado, con los ángulos dados y el lado conocido, la expresión correcta es x = sen(60°)/sen(75°).",
    "image": "/images/matematicas/imagen de la pregunta 18.png"
  },
  {
    "id": 19,
    "text": "En una feria robótica, el robot P y el robot Q disputan un juego de tenis de mesa. En el\nmomento que el marcador se encuentra 7 a 2 a favor del robot P, estos se reprograman\nde tal forma que por cada 2 puntos que anota el robot P, el robot Q anota 3. ¿Cuál de las\nsiguientes ecuaciones permite determinar cuándo igualará en puntos el robot Q al robot P?",
    "options": [
      {
        "letter": "A",
        "text": "3 x = 0. Donde x es la cantidad de puntos que anotará P. 2"
      },
      {
        "letter": "B",
        "text": "7 + x = 32 x + 2. Donde x es la cantidad de puntos que anotará P."
      },
      {
        "letter": "C",
        "text": "7 + 3x = 2 + 2y. Donde x es la cantidad de puntos que anotará P, y y es la cantidad de puntos que anotará Q."
      },
      {
        "letter": "D",
        "text": "x + y = 7 + 2. Donde x es la cantidad de puntos que anotará P, y y es la cantidad de puntos que anotará Q."
      }
    ],
    "correctAnswer": "B",
    "explanation": "P tiene 7 puntos y sigue anotando x puntos más: total = 7 + x. Por cada 2 puntos de P, Q anota 3, así que Q anota (3/2)x puntos más. Q tiene 2 + (3/2)x. Igualando: 7 + x = 2 + (3/2)x → x = 10."
  },
  {
    "id": 20,
    "text": "La tabla presenta la información sobre el gasto en publicidad y las ganancias de una empresa\ndurante los años 2000 a 2002.\n¿Cuál es la función que representa la ganancia obtenida G, en millones de pesos, en función del\ngasto en publicidad p?",
    "options": [
      {
        "letter": "A",
        "text": "G(p) = 30p + 2.000"
      },
      {
        "letter": "B",
        "text": "G(p) = 10p"
      },
      {
        "letter": "C",
        "text": "G(p) = 40p"
      },
      {
        "letter": "D",
        "text": "G(p) = 40p − 800"
      }
    ],
    "correctAnswer": "A",
    "explanation": "G(200) = 30(200) + 2.000 = 8.000 ✓. G(280) = 30(280) + 2.000 = 10.400 ✓. G(250) = 30(250) + 2.000 = 9.500 ✓.",
    "image": "/images/matematicas/imagen de la pregunta 20.png"
  },
  {
    "id": 21,
    "text": "En una tienda se venden mesas a $40.000 y sillas a $20.000. El dueño de la tienda olvidó\nregistrar la cantidad total de mesas y sillas que se vendieron, pero sabe que los ingresos por\nventas del mes fueron de $1.400.000 y que se vendieron 3 veces más sillas que mesas. Para\ndeterminar la cantidad vendida de cada artículo, siendo M la cantidad de mesas y S la de\nsillas vendidas, representó la información con las siguientes ecuaciones:\nEcuación 1. 40.000M + 20.000S = 1.400.000\nEcuación 2. M = 3S\n¿Las ecuaciones representan correctamente la situación?",
    "options": [
      {
        "letter": "A",
        "text": "No, porque aunque la ecuación 1 relaciona cada precio con la variable adecuada de forma correcta, la ecuación 2 significa que se venden 3 veces más mesas que sillas."
      },
      {
        "letter": "B",
        "text": "Sí, porque la ecuación 1 relaciona cada precio con la variable adecuada y la ecuación 2 tiene en cuenta que la cantidad de sillas es 3 veces mayor que la de mesas."
      },
      {
        "letter": "C",
        "text": "No, porque aunque la ecuación 2 tiene en cuenta que la cantidad de sillas es 3 veces mayor que la de mesas, en la ecuación 1 los precios deberían estar dividiendo y no multiplicando."
      },
      {
        "letter": "D",
        "text": "Sí, porque al solucionar las dos ecuaciones se obtiene un número entero, lo cual es consistente con las condiciones iniciales del problema."
      }
    ],
    "correctAnswer": "A",
    "explanation": "La ecuación 1 está correcta. Pero la ecuación 2 dice M = 3S, lo que significa que la cantidad de mesas es 3 veces la de sillas. El enunciado dice que hay 3 veces más sillas que mesas, así que debería ser S = 3M."
  },
  {
    "id": 22,
    "text": "La línea punteada en la figura muestra un corte realizado a un triángulo. El corte es paralelo\na la base y corta por la mitad a la altura que es perpendicular a la base.\nPara realizar el corte, se determinó la altura del triángulo usando la fórmula sen(45°) = h/120;\nluego se dividió h entre dos. Realizando este procedimiento, y teniendo en cuenta que\nsen(45°) = √2/2 ≈ 0,71, la distancia a la que se cortó la altura del triángulo fue, aproximadamente,",
    "options": [
      {
        "letter": "A",
        "text": "85 cm."
      },
      {
        "letter": "B",
        "text": "60 cm."
      },
      {
        "letter": "C",
        "text": "42 cm."
      },
      {
        "letter": "D",
        "text": "30 cm."
      }
    ],
    "correctAnswer": "C",
    "explanation": "sen(45°) = h/120 → h = 120 × 0,71 = 85,2 cm. El corte a la mitad: 85,2 / 2 ≈ 42 cm.",
    "image": "/images/matematicas/imagen de la pregunta 22.png"
  },
  {
    "id": 23,
    "text": "Un cartabón es una plantilla que se utiliza en dibujo técnico y que tiene forma de triángulo\nrectángulo escaleno, de modo que su hipotenusa mide el doble del cateto de menor longitud.\nRecuerde que:\nsen 30° = 1/2; sen 60° = √3/2\ncos 30° = √3/2; cos 60° = 1/2\ntan 30° = 1/√3; tan 60° = √3\nSi el cateto más largo de un cartabón mide 32 centímetros, como muestra la figura, ¿cuál de\nlas siguientes medidas corresponde a su cateto menor?",
    "options": [
      {
        "letter": "A",
        "text": "16 cm."
      },
      {
        "letter": "B",
        "text": "32/√3 cm."
      },
      {
        "letter": "C",
        "text": "27 cm."
      },
      {
        "letter": "D",
        "text": "64/√3 cm."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Sea c el cateto menor. Hipotenusa = 2c. Por Pitágoras: (2c)² = c² + 32² → 3c² = 1024 → c = 32/√3 cm.",
    "image": "/images/matematicas/imagen de la pregunta 23.png"
  },
  {
    "id": 24,
    "text": "A partir de un conjunto de números S, cuyo promedio es 9 y desviación estándar 3, se construye\nun nuevo conjunto de números T, tomando cada elemento de S y sumándole 4 unidades. Si,\npor ejemplo, 8 es un elemento de S, entonces el número 8 + 4 = 12 es un elemento de T. Es\ncorrecto afirmar, entonces, que para los elementos del conjunto T su promedio y su desviación\nestándar son, respectivamente,",
    "options": [
      {
        "letter": "A",
        "text": "9 y 3."
      },
      {
        "letter": "B",
        "text": "9 y 7."
      },
      {
        "letter": "C",
        "text": "13 y 3."
      },
      {
        "letter": "D",
        "text": "13 y 7."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Al sumar una constante k a todos los datos: el promedio aumenta en k (9 + 4 = 13), pero la desviación estándar NO cambia (sigue siendo 3)."
  },
  {
    "id": 25,
    "text": "El sistema de comunicaciones de un hotel utiliza los dígitos 2, 3, 4 y 5 para asignar un número\nde extensión telefónica de 4 dígitos diferentes a cada habitación. ¿Cuántas habitaciones del\nhotel pueden tener extensión telefónica?",
    "options": [
      {
        "letter": "A",
        "text": "24"
      },
      {
        "letter": "B",
        "text": "56"
      },
      {
        "letter": "C",
        "text": "120"
      },
      {
        "letter": "D",
        "text": "256"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Permutaciones de 4 dígitos sin repetición: 4! = 4 × 3 × 2 × 1 = 24."
  },
  {
    "id": 26,
    "text": "A continuación, se muestran los resultados de una encuesta que indagó sobre el parque\nautomotor del transporte intermunicipal en Colombia.\nSegún la información anterior, ¿cuál de las siguientes afirmaciones es verdadera?",
    "options": [
      {
        "letter": "A",
        "text": "La mayor parte del parque automotor son automóviles, camionetas y camperos."
      },
      {
        "letter": "B",
        "text": "La mitad del parque automotor corresponde a automóviles, camionetas y camperos."
      },
      {
        "letter": "C",
        "text": "La mayor parte del parque automotor son buses, microbuses y busetas."
      },
      {
        "letter": "D",
        "text": "La mitad del parque automotor corresponde a buses, microbuses y busetas."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Camioneta 24% + Automóvil 23% + Microbús 18% + Buseta 18% + Campero 9% + Bus 7% + Bus escalera 1%. Buses + Microbuses + Busetas = 7+18+18+24+23 = la mayor parte corresponde a buses, microbuses y busetas sumando más del 50%.",
    "image": "/images/matematicas/imagen de la pregunta 26.png"
  },
  {
    "id": 27,
    "text": "Una prueba atlética tiene un récord mundial de 10,49 segundos y un récord olímpico de\n10,50 segundos. ¿Es posible que un atleta registre un tiempo, en el mismo tipo de prueba,\nque rompa el récord olímpico pero no el mundial?",
    "options": [
      {
        "letter": "A",
        "text": "Sí, porque puede registrar, por ejemplo, un tiempo de 10,497 segundos, que está entre los dos tiempos récord."
      },
      {
        "letter": "B",
        "text": "Sí, porque puede registrar un tiempo menor que 10,4 y marcaría un nuevo récord."
      },
      {
        "letter": "C",
        "text": "No, porque no existe un registro posible entre los dos tiempos récord."
      },
      {
        "letter": "D",
        "text": "No, porque cualquier registro menor que el récord olímpico va a ser menor que el récord mundial."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Entre 10,49 y 10,50 existen infinitos números (como 10,497). Un tiempo de 10,497 s sería menor que 10,50 (rompe récord olímpico) pero mayor que 10,49 (no rompe récord mundial)."
  },
  {
    "id": 28,
    "text": "En una institución educativa hay dos cursos en grado undécimo. El número de hombres y\nmujeres de cada curso se relaciona en la tabla:\nLa probabilidad de escoger un estudiante de grado undécimo, de esta institución, que sea\nmujer es de 3/5. Este valor corresponde a la razón entre el número total de mujeres y",
    "options": [
      {
        "letter": "A",
        "text": "el número total de estudiantes de grado undécimo."
      },
      {
        "letter": "B",
        "text": "el número total de hombres de grado undécimo."
      },
      {
        "letter": "C",
        "text": "el número total de mujeres del curso 11 B."
      },
      {
        "letter": "D",
        "text": "el número total de hombres del curso 11 A."
      }
    ],
    "correctAnswer": "A",
    "explanation": "P(mujer) = total mujeres / total estudiantes = 45/75 = 3/5.",
    "image": "/images/matematicas/imagen de la pregunta 28.png"
  },
  {
    "id": 29,
    "text": "Para fijar un aviso publicitario se coloca sobre un muro una escalera a 12 metros del suelo\n(ver figura 1). Las figuras, además, muestran la situación y algunas de las medidas involucradas.\n¿Cuál es el coseno del ángulo que forman el suelo y la escalera?",
    "options": [
      {
        "letter": "A",
        "text": "12/13"
      },
      {
        "letter": "B",
        "text": "12/5"
      },
      {
        "letter": "C",
        "text": "5/13"
      },
      {
        "letter": "D",
        "text": "13/5"
      }
    ],
    "correctAnswer": "C",
    "explanation": "cos(θ) = cateto adyacente / hipotenusa = 5/13.",
    "image": "/images/matematicas/imagen de la pregunta 29.png"
  },
  {
    "id": 30,
    "text": "En la tabla se presentan las cartas que conforman una baraja de póquer.\nSi la probabilidad de escoger una carta que cumpla dos características determinadas es cero,\n¿cuáles características podrían ser?",
    "options": [
      {
        "letter": "A",
        "text": "Ser una carta negra y ser un número par."
      },
      {
        "letter": "B",
        "text": "Ser una carta roja y ser de picas."
      },
      {
        "letter": "C",
        "text": "Ser una carta de corazones y ser un número impar."
      },
      {
        "letter": "D",
        "text": "Ser una carta roja K y ser de diamantes."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Las picas son negras, no rojas. Una carta no puede ser roja Y de picas al mismo tiempo. Las demás opciones sí tienen intersección.",
    "image": "/images/matematicas/imagen de la pregunta 30.png"
  },
  {
    "id": 31,
    "text": "Un octágono regular es un polígono de ocho lados y ocho ángulos internos congruentes. La\nfigura muestra un octágono regular inscrito en una circunferencia de radio 2.\nCon la expresión x = 2·sen(45°)/sen(67,5°) se puede calcular en el octágono de la figura, la medida del",
    "options": [
      {
        "letter": "A",
        "text": "ángulo OPQ."
      },
      {
        "letter": "B",
        "text": "segmento PQ."
      },
      {
        "letter": "C",
        "text": "ángulo QOP."
      },
      {
        "letter": "D",
        "text": "segmento OQ."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Aplicando la ley de senos en el triángulo OPQ: PQ/sen(∠QOP) = OP/sen(∠OQP). Como OP = 2 (radio), ∠QOP = 45° y ∠OQP = 67,5°, entonces PQ = 2·sen(45°)/sen(67,5°).",
    "image": "/images/matematicas/imagen de la pregunta 31.png"
  },
  {
    "id": 32,
    "text": "Un trapecio isósceles es un cuadrilátero que tiene un solo par de lados paralelos y los otros\ndos, de igual medida.\nEn un plano cartesiano se dibuja un trapecio isósceles de modo que el eje y divide al\ntrapecio en dos figuras iguales.\nSi las coordenadas de dos de los vértices del trapecio son (–4, 2) y (–2, 8), ¿cuáles son las\ncoordenadas de los otros dos vértices?",
    "options": [
      {
        "letter": "A",
        "text": "(8, 2) y (2, 4)."
      },
      {
        "letter": "B",
        "text": "(2, 8) y (4, 2)."
      },
      {
        "letter": "C",
        "text": "(–2, –4) y (–8, –2)."
      },
      {
        "letter": "D",
        "text": "(–4, –2) y (–2, –8)."
      }
    ],
    "correctAnswer": "B",
    "explanation": "El eje y es eje de simetría. Los reflejos de (-4, 2) y (-2, 8) respecto al eje y son (4, 2) y (2, 8)."
  },
  {
    "id": 33,
    "text": "En una fábrica se aplica una encuesta a los empleados para saber el medio de transporte\nque usan para llegar al trabajo, y luego decidir si se implementa un servicio de ruta. Los\nresultados mostraron, entre otras, estas tres conclusiones sobre un grupo de 100 empleados\nque viven cerca de la fábrica y que se desplazan únicamente en bus o a pie:\n• El 60 % del grupo son mujeres.\n• El 20 % de las mujeres se desplazan en bus.\n• El 40 % de los hombres se desplazan caminando.\n¿Cuál de las siguientes tablas representa correctamente la información obtenida de ese grupo?",
    "options": [
      {
        "letter": "A",
        "text": "Opción A"
      },
      {
        "letter": "B",
        "text": "Opción B"
      },
      {
        "letter": "C",
        "text": "Opción C"
      },
      {
        "letter": "D",
        "text": "Opción D"
      }
    ],
    "correctAnswer": "D",
    "explanation": "100 empleados: 60 mujeres, 40 hombres. 20% de mujeres en bus = 12. Mujeres caminando = 48. 40% de hombres caminando = 16. Hombres en bus = 24. Tabla D muestra estos valores.",
    "image": "/images/matematicas/imagen de la pregunta 33 (ya vienen incluidas las opciones de respuesta ABCD).png"
  },
  {
    "id": 34,
    "text": "Una regla usada en física indica que, para aumentar el nivel de intensidad del sonido en\n10 dB (dB es decibelios, la unidad de medida del nivel de intensidad del sonido), es necesario\nque la intensidad medida se multiplique por 10. Ramiro es el encargado de aumentar en\n20 dB la medida del nivel de intensidad del sistema de sonido de un evento y, según su\ninterpretación de la regla, multiplica por 20 la intensidad actual del sistema. ¿Es correcta su\ninterpretación?",
    "options": [
      {
        "letter": "A",
        "text": "No, porque la regla no considera aumentos de 20 dB, solamente de 10 dB; no hay consideraciones para aumentos mayores."
      },
      {
        "letter": "B",
        "text": "Sí, porque la regla presentada indica que para aumentar en x unidades el nivel de la medida de intensidad se agrega x a la intensidad."
      },
      {
        "letter": "C",
        "text": "No, porque aumentar 20 dB equivale a aumentar 10 dB dos veces, es decir, multiplicar por 10 la intensidad dos veces; en total, multiplicar por 100."
      },
      {
        "letter": "D",
        "text": "Sí, porque el resultado de multiplicar dos veces por 10 la intensidad es multiplicarla por 20; así, se ahorra un paso y obtiene el resultado correcto."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Cada 10 dB = ×10. Aumentar 20 dB = multiplicar por 10 dos veces = 10 × 10 = 100. La escala de decibelios es logarítmica."
  },
  {
    "id": 35,
    "text": "En una librería se ofrece un descuento del 10 % sobre el precio original de todos los libros\nimpresos. Juan tiene un cupón de descuento adicional del 10 % sobre el precio de venta,\nel cual incluye el descuento inicial. Para saber cuánto debe pagar por un libro cuyo precio\noriginal es de $50, Juan efectúa el siguiente procedimiento:\nPaso 1. Multiplica el precio original del libro por 9.\nPaso 2. Divide el resultado del paso 1 entre 10.\nPaso 3. Multiplica el resultado del paso 2 por 10.\nPaso 4. Divide el resultado del paso 3 entre 100.\n¿En cuál paso del procedimiento hay un error?",
    "options": [
      {
        "letter": "A",
        "text": "En el paso 1, porque el precio de venta es el 90 % del precio original, por tanto, debe multiplicarse por 90 y no por 9."
      },
      {
        "letter": "B",
        "text": "En el paso 3, porque el precio final es el 90 % del precio de venta, por tanto, debe multiplicarse por 90 y no por 10."
      },
      {
        "letter": "C",
        "text": "En el paso 2, porque para calcular el precio al aplicar un porcentaje de descuento es necesario dividir entre 100 y no entre 10."
      },
      {
        "letter": "D",
        "text": "En el paso 4, porque solo es necesario dividir una vez para calcular el precio final; es suficiente con la división del paso 2."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Paso 1: 50 × 9 = 450. Paso 2: 450/10 = 45 ✓. Paso 3: 45 × 10 = 450 ✗ (debería ser 45 × 9 = 405). El error está en el Paso 3."
  },
  {
    "id": 36,
    "text": "A un estudiante se le pide construir un triángulo isósceles dentro de una circunferencia. Para\nello, el estudiante hace la construcción que se muestra en la figura, donde el punto P es el\ncentro de la circunferencia.\nCon base en la construcción, ¿qué condición es necesaria para que el triángulo sea isósceles?",
    "options": [
      {
        "letter": "A",
        "text": "Que el lado RQ mida diferente que los otros lados."
      },
      {
        "letter": "B",
        "text": "Que el QPR sea un ángulo recto."
      },
      {
        "letter": "C",
        "text": "Que el PQR sea un ángulo recto."
      },
      {
        "letter": "D",
        "text": "Que los lados PQ y PR sean radios de la circunferencia."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Si PQ y PR son ambos radios, entonces PQ = PR, haciendo el triángulo isósceles.",
    "image": "/images/matematicas/IMAGEN DE LA PREGUNTA 36.png"
  },
  {
    "id": 37,
    "text": "Sobre una circunferencia de centro O se localizan dos puntos P y P’ diferentes.\nDe las siguientes, ¿cuál figura NO puede resultar al unir entre sí los tres puntos P, P’ y O?",
    "options": [
      {
        "letter": "A",
        "text": "Un triángulo isósceles."
      },
      {
        "letter": "B",
        "text": "Un radio de la circunferencia."
      },
      {
        "letter": "C",
        "text": "Un triángulo equilátero."
      },
      {
        "letter": "D",
        "text": "Un diámetro de la circunferencia."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Al unir tres puntos distintos no se obtiene un solo radio. Un radio es un segmento, no una figura de tres puntos."
  },
  {
    "id": 38,
    "text": "Carlina administra una pizzería y registró en una tabla la información correspondiente a los\npedidos realizados por los 110 clientes que entraron a la pizzería el domingo.\nCon la información de la tabla, ¿cuáles de los siguientes datos se pueden calcular?",
    "options": [
      {
        "letter": "A",
        "text": "El total de clientes que eligieron pizza y también bebida caliente."
      },
      {
        "letter": "B",
        "text": "El total de clientes que eligieron pizza o bebida caliente."
      },
      {
        "letter": "C",
        "text": "El total de clientes que solo eligieron pizza."
      },
      {
        "letter": "D",
        "text": "El total de clientes que solo eligieron bebida fría."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Total = 110. Bebidas = 20+40 = 60 (sin solapamiento entre caliente y fría). Solo pizza = 110 - 60 = 50.",
    "image": "/images/matematicas/imagen de la pregunta 38.png"
  },
  {
    "id": 39,
    "text": "Un sistema de información requiere que los usuarios ingresen una contraseña de solo tres\ncaracteres de entre las 26 letras posibles, en minúscula o mayúscula y los 10 dígitos del 0 al 9.\nUn ingeniero propone las siguientes posibles restricciones para la contraseña:\nRestricción R1: utilizar tres dígitos cualesquiera.\nRestricción R2: utilizar tres dígitos distintos.\nRestricción R3: utilizar una letra mayúscula, luego una minúscula y al final un dígito.\nRestricción R4: utilizar una letra cualquiera, mayúscula o minúscula, y luego dos dígitos.\nSi se calcula el número de posibles contraseñas de acuerdo con cada una de las restricciones,\n¿cuál es el orden de las restricciones, de menor a mayor, según el número de posibles\ncontraseñas?",
    "options": [
      {
        "letter": "A",
        "text": "R1, R2, R4 y R3."
      },
      {
        "letter": "B",
        "text": "R1, R2, R3 y R4."
      },
      {
        "letter": "C",
        "text": "R2, R1, R4 y R3."
      },
      {
        "letter": "D",
        "text": "R2, R3, R1 y R4."
      }
    ],
    "correctAnswer": "C",
    "explanation": "R1: 10³ = 1.000. R2: 10×9×8 = 720. R3: 26×26×10 = 6.760. R4: 52×10×10 = 5.200. Orden: R2(720) < R1(1.000) < R4(5.200) < R3(6.760)."
  },
  {
    "id": 40,
    "text": "Se puede encontrar números racionales mayores que un número entero k, de manera que\nsean cada vez más cercanos a él, calculando k + 1/j (con j entero positivo). Cuanto más\ngrande sea j, más cercano a k será el racional construido. ¿Cuántos números racionales se pueden construir cercanos a k y menores que k + 1/11 ?",
    "options": [
      {
        "letter": "A",
        "text": "10, que es la cantidad de racionales menores que 11."
      },
      {
        "letter": "B",
        "text": "Una cantidad infinita, pues existen infinitos números enteros mayores que 11."
      },
      {
        "letter": "C",
        "text": "11, que es el número que equivale en este caso a j."
      },
      {
        "letter": "D",
        "text": "Uno, pues el racional más cercano a k se halla con j = 10, es decir, con k + 0,1."
      }
    ],
    "correctAnswer": "B",
    "explanation": "k + 1/j < k + 1/11 → 1/j < 1/11 → j > 11. Hay infinitos números naturales mayores que 11."
  },
  {
    "id": 41,
    "text": "Un terreno con forma triangular se debe encerrar, cumpliendo con los siguientes requerimientos:\nRequerimiento 1. Uno de sus ángulos interiores debe ser de 90°.\nRequerimiento 2. Dos lados deben medir 7 metros y el otro debe medir 18 metros.\nRequerimiento 3. Uno de sus ángulos interiores debe ser menor que 45°.\nRequerimiento 4. La suma de sus ángulos interiores debe ser de 180°.\n¿Cuál de los requerimientos es imposible de cumplir?",
    "options": [
      {
        "letter": "A",
        "text": "Requerimiento 1."
      },
      {
        "letter": "B",
        "text": "Requerimiento 2."
      },
      {
        "letter": "C",
        "text": "Requerimiento 3."
      },
      {
        "letter": "D",
        "text": "Requerimiento 4."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Desigualdad triangular: 7 + 7 = 14 < 18. Un triángulo con lados 7, 7 y 18 no puede existir."
  },
  {
    "id": 42,
    "text": "En la figura se representa una cancha de fútbol con las medidas de sus lados.\nUn arquitecto realiza una maqueta del diseño de la cancha, con medida de los lados cien veces menor que las medidas originales. El diseño de la maqueta medirá",
    "options": [
      {
        "letter": "A",
        "text": "Opción A"
      },
      {
        "letter": "B",
        "text": "Opción B"
      },
      {
        "letter": "C",
        "text": "Opción C"
      },
      {
        "letter": "D",
        "text": "Opción D"
      }
    ],
    "correctAnswer": "D",
    "explanation": "60 m ÷ 100 = 0,6 m = 60 cm = 6 × 10¹ cm. 100 m ÷ 100 = 1 m = 100 cm = 1 × 10² cm.",
    "image": "/images/matematicas/imagen de la pregunta 42.png",
    "extraImage": "/images/matematicas/imagen de la pregunta 42 (esta contiene los ABCD es necesaria ponerla).png"
  },
  {
    "id": 43,
    "text": "El área de los rectángulos que se pueden construir a partir del origen, los ejes y un punto que\npertenece a la gráfica de la función f(x) = 5/x, donde x > 0, se describe con la expresión\nAₓ = x·f(x).\n¿Cuál de las siguientes gráficas corresponde a Aₓ?",
    "options": [
      {
        "letter": "A",
        "text": "Opción A"
      },
      {
        "letter": "B",
        "text": "Opción B"
      },
      {
        "letter": "C",
        "text": "Opción C"
      },
      {
        "letter": "D",
        "text": "Opción D"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Aₓ = x · f(x) = x · (5/x) = 5. El área es constante, la gráfica es una recta horizontal en y = 5.",
    "image": "/images/matematicas/imagen de la pregunta 43.png",
    "extraImage": "/images/matematicas/imagen de la pregunta 43 (necesaria porque contiene los ABCD Se pone junto ala otra de 43).png"
  },
  {
    "id": 44,
    "text": "En un parque hay una rueda giratoria de 3 m de radio. La rueda está diseñada para 10 personas, cada una en un sector circular de igual área, como muestra la figura.\nPara determinar el área que le corresponde a cada persona, se divide 2π entre 10 lo que determina el ángulo θ de cada sector y se usa la fórmula del área de un sector circular S:\nS = r²·θ/2\ndonde r es el radio de la circunferencia.\nUtilizando una aproximación de π al menor entero más cercano, ¿cuál es el área aproximada que le corresponde a cada persona?",
    "options": [
      {
        "letter": "A",
        "text": "3,6 m2"
      },
      {
        "letter": "B",
        "text": "2,7 m2"
      },
      {
        "letter": "C",
        "text": "9,0 m2"
      },
      {
        "letter": "D",
        "text": "1,8 m2"
      }
    ],
    "correctAnswer": "B",
    "explanation": "θ = 2π/10 = 2(3)/10 = 0,6 rad. S = 3²×0,6/2 = 9×0,6/2 = 2,7 m².",
    "image": "/images/matematicas/imagen de la pregunta 44.png"
  },
  {
    "id": 45,
    "text": "Un colegio necesita enviar 5 estudiantes como representantes a un foro sobre la contaminación\ndel medio ambiente. Se decidió que 2 estudiantes sean de grado décimo y 3 de grado undécimo.\nEn décimo hay 5 estudiantes preparados para el foro y en undécimo hay 4. ¿Cuántos grupos\ndiferentes pueden formarse para enviar al foro?",
    "options": [
      {
        "letter": "A",
        "text": "9"
      },
      {
        "letter": "B",
        "text": "14"
      },
      {
        "letter": "C",
        "text": "20"
      },
      {
        "letter": "D",
        "text": "40"
      }
    ],
    "correctAnswer": "D",
    "explanation": "C(5,2) = 10. C(4,3) = 4. Total = 10 × 4 = 40."
  },
  {
    "id": 46,
    "text": "En una feria, un niño recibe como premio una consola de videojuegos si gana en cada uno de\nlos siguientes juegos:\nJuego 1. Gana si al lanzar un dado obtiene un número par (la probabilidad de ganar es de 1/2).\nJuego 2. Gana si logra sacar la única pelota amarilla que hay en una bolsa que contiene 6\npelotas en total (la probabilidad de ganar es de 1/6).\nPara hallar la probabilidad de ganar la consola de videojuegos se proponen los siguientes\nprocedimientos:\nProcedimiento 1. Sumar las probabilidades de ganar en los dos juegos.\nProcedimiento 2. Multiplicar las probabilidades de ganar en los dos juegos.\nProcedimiento 3. Restarle a 1 la probabilidad de perder en al menos uno de los dos juegos.\nProcedimiento 4. Restarle a 1 la probabilidad de perder exactamente en un juego.\n¿Cuáles de los anteriores procedimientos permiten hallar la probabilidad de ganar la consola\nde videojuegos?",
    "options": [
      {
        "letter": "A",
        "text": "1 y 3."
      },
      {
        "letter": "B",
        "text": "1 y 4."
      },
      {
        "letter": "C",
        "text": "2 y 3."
      },
      {
        "letter": "D",
        "text": "2 y 4."
      }
    ],
    "correctAnswer": "C",
    "explanation": "P(A y B) = P(A) × P(B) = 1/2 × 1/6 = 1/12 (Procedimiento 2 ✓). También: P(ganar ambos) = 1 − P(perder al menos uno) (Procedimiento 3 ✓)."
  },
  {
    "id": 47,
    "text": "La expresión 10^3 = I/I₀ relaciona la sonoridad de un sonido de 30 decibeles con su intensidad\n(I) y la menor intensidad (I₀) que percibe el oído humano. ¿Cuántas veces es el valor de I\nrespecto a I₀?",
    "options": [
      {
        "letter": "A",
        "text": "Una milésima."
      },
      {
        "letter": "B",
        "text": "Un tercio."
      },
      {
        "letter": "C",
        "text": "Tres veces."
      },
      {
        "letter": "D",
        "text": "Mil veces."
      }
    ],
    "correctAnswer": "D",
    "explanation": "10³ = I/I₀ → I = 1000 × I₀. I es mil veces I₀."
  },
  {
    "id": 48,
    "text": "Entre los 16 estudiantes de un salón de clases se va a rifar una boleta para ingresar a un\nparque de diversiones. Cada estudiante debe escoger un número del 3 al 18. El sorteo se\nefectúa de la siguiente manera: se depositan 6 balotas en una urna, cada una numerada\ndel 1 al 6; se extrae una balota, se mira el número y se vuelve a depositar en la urna. El\nexperimento se repite dos veces más. La suma de los tres puntajes obtenidos determina el\nnúmero ganador de la rifa. Si en la primera extracción del sorteo se obtuvo 2, ¿por qué\nes más probable que el estudiante que escogió el número 10 gane la rifa a que la gane el\nestudiante con el número 7?",
    "options": [
      {
        "letter": "A",
        "text": "Porque al ser mayor el número escogido, es mayor la probabilidad de ganar."
      },
      {
        "letter": "B",
        "text": "Porque el primer estudiante tiene una posibilidad más de ganar que el segundo."
      },
      {
        "letter": "C",
        "text": "Porque es más probable seguir obteniendo números pares."
      },
      {
        "letter": "D",
        "text": "Porque es mayor la diferencia entre 10 y 18 que entre 2 y 7."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Con primera balota = 2, las otras dos deben sumar: para 10 → 8, para 7 → 5. Combinaciones para 8: (2,6),(3,5),(4,4),(5,3),(6,2) = 5. Para 5: (1,4),(2,3),(3,2),(4,1) = 4. El 10 tiene una posibilidad más."
  },
  {
    "id": 49,
    "text": "En determinada zona de una ciudad se construyen edificios de apartamentos en los que cada\nmetro cuadrado tiene un costo de $800.000, y se asegura a los compradores que en esta zona\nanualmente, el metro cuadrado se valoriza un 5 % respecto al costo del año anterior. ¿Con\ncuál de las siguientes expresiones se representa el costo de un metro cuadrado en esa zona,\ntranscurridos n años?",
    "options": [
      {
        "letter": "A",
        "text": "800.000 + 5n"
      },
      {
        "letter": "B",
        "text": "800.000 (5n)"
      },
      {
        "letter": "C",
        "text": "800.000 (5/100)^n"
      },
      {
        "letter": "D",
        "text": "800.000 (1 + 5/100)^n"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Valorización compuesta: Valor = $800.000 × (1 + 0,05)ⁿ = $800.000 × (1,05)ⁿ."
  },
  {
    "id": 50,
    "text": "Alfonso tiene tres empaques para almacenar dulces. Los empaques y las medidas de estos\nse muestran en la figura.\n1. Un cilindro cuya altura es h = 2, y el radio de la base mide r = 3/2.\n2. Una caja de base cuadrada, cuya altura es h = 2 y el lado de la base mide L = 3/2.\n3. Una esfera con radio r = 3/2.\n¿Cuál de las siguientes afirmaciones es verdadera respecto al volumen de los tres empaques?",
    "options": [
      {
        "letter": "A",
        "text": "El volumen del cilindro es mayor que el volumen de la caja; además, el volumen de la esfera es igual que el volumen del cilindro."
      },
      {
        "letter": "B",
        "text": "El volumen del cilindro es igual que el volumen de la caja; además, el volumen de la esfera es mayor que el volumen del cilindro."
      },
      {
        "letter": "C",
        "text": "El volumen del cilindro es menor que el volumen de la caja; además, el volumen de la esfera es igual que el volumen del cilindro."
      },
      {
        "letter": "D",
        "text": "El volumen del cilindro es mayor que el volumen de la caja; además, el volumen de la esfera es mayor que el volumen del cilindro."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Cilindro: V = πr²h = π(3/2)²(2) = 9π/2 ≈ 14,14. Caja: V = L²h = (3/2)²(2) = 4,5. Esfera: V = 4πr³/3 = 4π(27/8)/3 = 9π/2 ≈ 14,14. Cilindro > Caja ✓ y Esfera = Cilindro ✓.",
    "image": "/images/matematicas/imagen de la pregunta 50.png"
  }
];
