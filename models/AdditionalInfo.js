const mongoose = require('mongoose');

const AdditionalInfoSchema = new mongoose.Schema({
  dateOfBirth: { type: Date },
  drivingLicense: { type: String },
  gender: { type: String },
  personalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalDetails',
  },
});

module.exports = mongoose.model('AdditionalInfo', AdditionalInfoSchema);
