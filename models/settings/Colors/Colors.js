const mongoose = require('mongoose');

const ColorsSchema = new mongoose.Schema({
    mode: { type: String, enum: ['basic', 'advanced'], default: 'basic' },
    basic: {
      selected: {
        type: String,
        enum: ['accent', 'multicolor'],
        default: 'accent',
      },
      accent: { type: String, default: '#000000' },
      multicolor: {
        accent: { type: String, default: '#f55c69' },
        font: { type: String, default: '#323d5e' },
        background: { type: String, default: '#ffffff' },
      },
    },
    advanced: {
      selected: {
        type: String,
        enum: ['accent', 'multicolor'],
        default: 'accent',
      },
      accent: { type: String, default: '#000000' },
      multicolor: {
        primary: {
          accent: { type: String, default: '#f55c69' },
          font: { type: String, default: '#fffcfa' },
          background: { type: String, default: '#323d5e' },
        },
        secondary: {
          accent: { type: String, default: '#f55c69' },
          font: { type: String, default: '#323d5e' },
          background: { type: String, default: '#fffcfa' },
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
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
      },
});

module.exports = mongoose.model('Colors', ColorsSchema);
