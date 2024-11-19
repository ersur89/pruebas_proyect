const db = require('../config/db');

class Question {
  static async create(questionText) {
    const [result] = await db.execute(
      'INSERT INTO questions (question_text) VALUES (?)',
      [questionText]
    );
    return result.insertId;
  }
}

module.exports = Question;