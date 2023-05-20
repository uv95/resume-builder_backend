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
      selected: {
        type: String,
        enum: ['accent', 'multicolor'],
        default: 'accent',
      },
      accent: { type: String },
      multicolor: {
        accent: { type: String },
        font: { type: String },
        background: { type: String },
      },
    },
    advanced: {
      selected: {
        type: String,
        enum: ['accent', 'multicolor'],
        default: 'accent',
      },
      accent: { type: String },
      multicolor: {
        primary: {
          accent: { type: String },
          font: { type: String },
          background: { type: String },
        },
        secondary: {
          accent: { type: String },
          font: { type: String },
          background: { type: String },
        },
      },
    },
    applyAccentColor: {
      name: { type: Boolean, default: true },
      dots: { type: Boolean, default: false },
      headings: { type: Boolean, default: true },
      dates: { type: Boolean, default: false },
      headingsLine: { type: Boolean, default: true },
      linkIcons: { type: Boolean, default: false },
      headerIcons: { type: Boolean, default: false },
    },
  },
  spacing: {
    fontSize: { type: Number, default: 11 },
    lineHeight: { type: Number, default: 130 },
    leftRightMargin: { type: Number, default: 18 },
    topBottomMargin: { type: Number, default: 18 },
    spaceBetweenSections: { type: Number, default: 15 },
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
  //font,sizes,format etc..
});

module.exports = mongoose.model('Settings', SettingsSchema);
