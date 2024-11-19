const db = require('../config/db');

class Option {
  static async create(questionId, optionText) {
    await db.execute(
      'INSERT INTO options (question_id, option_text) VALUES (?, ?)',
      [questionId, optionText]
    );
  }
}

module.exports = Option;