const mongoose = require('mongoose');

const LinksSchema = new mongoose.Schema({
  name: { type: String },
  link: { type: String },
  personalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalDetails',
  },
});

module.exports = mongoose.model('Links', LinksSchema);
