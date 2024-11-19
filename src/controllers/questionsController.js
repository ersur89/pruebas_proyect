const Question = require('../models/question');
const Option = require('../models/option');

exports.saveQuestionsAndOptions = async (req, res) => {
  try {
    const { texto } = req.body; // Asegúrate de que el body tenga el formato esperado
    const questionsData = texto.content[0].text.split('\n\n');

    for (const qData of questionsData) {
      const [questionPart, ...optionsPart] = qData.split('\n');
      const questionText = questionPart.split('. ')[1].trim();
      const questionId = await Question.create(questionText);

      for (const option of optionsPart) {
        const optionText = option.slice(2).trim();
        await Option.create(questionId, optionText);
      }
    }

    res.status(201).json({ message: 'Preguntas y opciones guardadas exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar los datos' });
  }
};