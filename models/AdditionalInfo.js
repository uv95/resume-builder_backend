const mongoose = require('mongoose');

const AdditionalInfoSchema = new mongoose.Schema({
  name: { type: String },
  info: { type: String },
  personalDetailsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalDetails',
  },
});

module.exports = mongoose.model('AdditionalInfo', AdditionalInfoSchema);
