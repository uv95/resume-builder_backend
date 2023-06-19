const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
  index: { type: Number },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
