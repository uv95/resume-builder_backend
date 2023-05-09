const mongoose = require('mongoose');

const PersonalDetailsSchema = new mongoose.Schema({
  fullName: { type: String },
  jobTitle: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  additionalInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdditionalInfo',
    },
  ],
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Link',
    },
  ],
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('PersonalDetails', PersonalDetailsSchema);
