const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  text: { type: String },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
