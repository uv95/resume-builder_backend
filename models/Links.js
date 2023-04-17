const mongoose = require('mongoose');

const LinksSchema = new mongoose.Schema({
  website: { type: String },
  github: { type: String },
  skype: { type: String },
  telegram: { type: String },
  personalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalDetails',
  },
});

module.exports = mongoose.model('Links', LinksSchema);
