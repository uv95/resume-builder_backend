const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('Project', ProjectSchema);
