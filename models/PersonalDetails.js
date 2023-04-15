const mongoose = require('mongoose');

const PersonalDetailsSchema = new mongoose.Schema({
  fullName: { type: String },
  jobTitle: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  additionalInfo: {
    dateOfBirth: { type: Date },
    drivingLicense: { type: String },
    gender: { type: String },
  },
  links: {
    website: { type: String },
    github: { type: String },
    skype: { type: String },
    telegram: { type: String },
  },
});

module.exports = mongoose.model('PersonalDetails', PersonalDetailsSchema);
