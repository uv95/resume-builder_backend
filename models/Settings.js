const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  sectionsOrder: {
    top: [{ type: String }],
    left: [{ type: String }],
    right: [{ type: String }],
  },
  layout: {
    columns: { type: Number, default: 1 },
    position: { type: String, enum: ['top', 'left', 'right'], default: 'top' },
    columnWidth: {
      left: { type: Number, default: 50 },
      right: { type: Number, default: 50 },
    },
  },
  colors: {
    mode: { type: String, enum: ['basic', 'advanced'], default: 'basic' },
    basic: {
      accent: { type: String },
      multicolor: {
        font: {
          accent: { type: String },
          primary: { type: String },
        },
        background: { type: String },
      },
    },
    advanced: {
      accent: { type: String },
      multicolor: {
        font: {
          accent: { type: String },
          primary: { type: String },
          secondary: { type: String },
        },
        background: { primary: { type: String }, secondary: { type: String } },
      },
    },
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
  //font,sizes,format etc..
});

module.exports = mongoose.model('Settings', SettingsSchema);
