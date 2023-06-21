const mongoose = require('mongoose');

const PersonalDetailsSchema = new mongoose.Schema({
  fullName: { type: String, default: '' },
  jobTitle: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  additionalInfo: [{ name: { type: String }, input: { type: String } }],
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('PersonalDetails', PersonalDetailsSchema);
