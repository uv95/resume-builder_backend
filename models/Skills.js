const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema({
  skill: { type: String },
  info: { type: String },
  skillLevel: {
    type: String,
    enum: ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert', ''],
    default: '',
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Skills', SkillsSchema);
