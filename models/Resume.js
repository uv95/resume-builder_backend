const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  personalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalDetails',
  },
  skills: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skills',
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language',
  },
  professionalExperience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProfessionalExperience',
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  education: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Education',
  },
});

module.exports = mongoose.model('Resume', ResumeSchema);
