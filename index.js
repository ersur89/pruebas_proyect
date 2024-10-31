const { CohereClientV2 } = require('cohere-ai');
const cohere = new CohereClientV2({
  token: 'QYGtWwsD3cNvr5KdCoUl9y6eQBmg6y9yCI35ZEqm',
});
(async () => {
  const response = await cohere.chat({
    model: 'command-r-plus',
    messages: [
      {
        role: 'user',
        content: 'Ahora, vamos a preguntarte, quiero saber qué comes en el día, cómo desayuno. Primera respuesta, podría ser huevos fritos con tocino. Segunda respuesta, podría ser calentado. Tercer respuesta, podría ser encebollado. Pregunta número uno, pregunta número uno, dos preguntas número uno. ¿Por qué escogen la pregunta número dos? Pregunta número dos, pregunta número dos. Bueno, segunda pregunta, ¿qué comemos en el almuerzo? En el almuerzo, opción uno, sopa y un plato de segundo. Opción número dos, una comida bien corta, mínima, pequeña. Opción número tres, solo algo de picar. Entonces, comenzamos a preguntar, bueno, opción uno, una vez. Opción dos, una vez. Opción tres, una vez. Dos veces. Opción tres, dos veces.Según el texto que tienes anteriormente puedes generarme las preguntas y las opciones de respuestas de manera ordenada Porfavor',
      },
    ],
  });
  console.log(response.message);

  const texto = response.message;
  const regexPreguntas = /Pregunta (\d+): (.+?)(?=(Pregunta \d+:|\n$))/gs;

  let preguntas = [];
  let match;
  console.log("si si si");
  // Bucle para recorrer las preguntas y sus respuestas
  while ((match = regexPreguntas.exec(texto)) !== null) {
      const numeroPregunta = match[1].trim(); // Número de la pregunta
      const preguntaTexto = match[2].trim();  // Texto de la pregunta

      console.log(numeroPregunta);
      console.log(preguntaTexto);
      // Capturar opciones de respuesta si existen
      const regexOpciones = /\d+\. (.+)/g;
      let opciones = [];
      let matchOpciones;

      while ((matchOpciones = regexOpciones.exec(preguntaTexto)) !== null) {
          opciones.push(matchOpciones[1].trim()); // Extraer y limpiar las opciones
      }

      preguntas.push({
          id: numeroPregunta,
          texto: preguntaTexto.split('\n')[0], // Tomar solo el texto de la pregunta
          opciones: opciones.length > 0 ? opciones : null // Solo incluir opciones si existen
      });
  }

  console.log(preguntas);

})();