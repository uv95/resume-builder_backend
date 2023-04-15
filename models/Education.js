const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  degree: { type: String },
  school: { type: String },
  city: { type: String },
  country: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('Education', EducationSchema);
