const mongoose = require('mongoose');

const ProfessionalExperienceSchema = new mongoose.Schema({
  jobTitle: { type: String },
  employer: { type: String },
  city: { type: String },
  country: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model(
  'ProfessionalExperience',
  ProfessionalExperienceSchema
);
