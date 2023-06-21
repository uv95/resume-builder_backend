const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: { type: String, default: 'My Resume' },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
  },
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Settings',
  },
});

module.exports = mongoose.model('Resume', ResumeSchema);
