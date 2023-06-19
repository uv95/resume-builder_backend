const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
  language: { type: String },
  info: { type: String },
  languageLevel: {
    type: String,
    enum: [
      'Beginner (A1)',
      'Elementary (A2)',
      'Limited working proficiency (B1)',
      'Highly proficient (B2-C1)',
      'Native / full working proficiency (C2)',
      '',
    ],
    default: '',
  },
  index: { type: Number },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Language', LanguageSchema);
