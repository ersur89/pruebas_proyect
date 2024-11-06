
const {AssemblyAI} = require('assemblyai');

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

run();

/* const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


// Initialize a Gemini model appropriate for your use case.
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const base64Buffer = fs.readFileSync(join(__dirname, ".videos\Ejemplo-grupo-focal.mp3"));
const base64AudioFile = base64Buffer.toString("base64");

// Generate content using a prompt and the metadata of the uploaded file.
const result =  model.generateContent([
    {
      inlineData: {
        mimeType: "audio/mp3",
        data: base64AudioFile
      }
    },
    { text: "Please summarize the audio." },
  ]);

// Print the response.
console.log(result.response.text()) */