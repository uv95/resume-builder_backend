const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  sectionsOrder: {
    top: [{ type: String }],
    left: { leftSide: [{ type: String }], rightSide: [{ type: String }] },
    right: { leftSide: [{ type: String }], rightSide: [{ type: String }] },
  },
  layout: {
    columns: { type: Number, default: 1 },
    position: { type: String, enum: ['top', 'left', 'right'], default: 'top' },
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
  //font,sizes,format etc..
});

module.exports = mongoose.model('Settings', SettingsSchema);
