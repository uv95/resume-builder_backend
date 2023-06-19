const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  text: { type: String },
  index: { type: Number },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
