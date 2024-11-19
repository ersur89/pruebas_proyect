const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');

// Ruta para guardar preguntas y opciones
router.post('/save-questions', questionsController.saveQuestionsAndOptions);

module.exports = router;