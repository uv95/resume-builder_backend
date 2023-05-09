const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  sectionsOrder: [{ type: String }],
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
  //font,sizes,format etc..
});

module.exports = mongoose.model('Settings', SettingsSchema);
