const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  personalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalDetails',
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skills',
    },
  ],
  language: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Language',
    },
  ],
  professionalExperience: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProfessionalExperience',
    },
  ],
  profile: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
  ],
  education: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Education',
    },
  ],
  project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Content', ContentSchema);
