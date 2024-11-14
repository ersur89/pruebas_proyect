
/* const {AssemblyAI} = require('assemblyai');

const client = new AssemblyAI({
  apiKey: "a243419e926d4867b0a14a8bfee852b1"
});

const audioUrl = 'https://github.com/ersur89/videos/raw/main/ejemplo-de-grupo-focal.mp4';

const config = {
  audio_url: audioUrl,
    language_code: 'es',
    audio_end_at: 280000,
    audio_start_from: 10
};

const run = async () => {
  try {
    const transcript = await client.transcripts.transcribe(config);
    console.log(transcript.text);
    console.log(transcript);
  } catch (error) {
    console.error("Error transcribing video:", error);
  }
};

run(); */

const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const { AssemblyAI } = require('assemblyai');

const app = express();
const PORT = 3000;

// Configura Body Parser
app.use(bodyParser.json());

// Sirve archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(__dirname, "../public")));

// Ruta principal que devuelve el archivo HTML principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/pagina.html"));
});

app.post('/transcribe', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL no proporcionada" });
    }

    const client = new AssemblyAI({ apiKey: "a243419e926d4867b0a14a8bfee852b1" });
    const config = {
        audio_url: url,
        language_code: 'es',
        audio_end_at: 280000,
        audio_start_from: 10
    };

    try {
        const transcript = await client.transcripts.transcribe(config);
        res.json({ transcript: transcript.text });
    } catch (error) {
        console.error("Error transcribiendo video:", error);
        res.status(500).json({ error: "Error al transcribir el video" });
    }
});


app.post('/generate-questions', async (req, res) => {
  const { content } = req.body;
console.log(content)
  if (!content) {
    return res.status(400).json({ error: "Contenido no proporcionado" });
  }

  try {
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content: content,
        },
      ],
    });

    const texto = response.message;
    /* const regexPreguntas = /Pregunta (\d+): (.+?)(?=(Pregunta \d+:|\n$))/gs;

    let preguntas = [];
    let match;

    while ((match = regexPreguntas.exec(texto)) !== null) {
      const numeroPregunta = match[1].trim(); // Número de la pregunta
      const preguntaTexto = match[2].trim();  // Texto de la pregunta

      const regexOpciones = /\d+\. (.+)/g;
      let opciones = [];
      let matchOpciones;

      while ((matchOpciones = regexOpciones.exec(preguntaTexto)) !== null) {
        opciones.push(matchOpciones[1].trim()); // Extraer y limpiar las opciones
      }

      preguntas.push({
        id: numeroPregunta,
        texto: preguntaTexto.split('\n')[0], // Tomar solo el texto de la pregunta
        opciones: opciones.length > 0 ? opciones : null, // Solo incluir opciones si existen
      });
    } */

    //res.json({ texto });
    res.json({ texto: response.message });
  } catch (error) {
    console.error("Error generando preguntas:", error);
    res.status(500).json({ error: "Error al generar las preguntas" });
  }
});


app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
