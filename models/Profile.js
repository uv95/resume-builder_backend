const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  text: { type: String },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
