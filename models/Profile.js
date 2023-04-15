const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  text: { type: String },
});

module.exports = mongoose.model('Profile', ProfileSchema);
