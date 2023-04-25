const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema({
  skill: { type: String },
  info: { type: String },
  skillLevel: {
    type: String,
    enum: {
      values: ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert', ''],
    },
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Skills', SkillsSchema);
