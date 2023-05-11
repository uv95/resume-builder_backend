const mongoose = require('mongoose');

const PersonalDetailsSchema = new mongoose.Schema({
  fullName: { type: String },
  jobTitle: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  additionalInfo: [{ name: { type: String }, input: { type: String } }],
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('PersonalDetails', PersonalDetailsSchema);
