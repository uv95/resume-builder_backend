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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Colors',
  },
  spacing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spacing',
  },
  font: {
    type: { type: String, enum: ['serif', 'sans'], default: 'serif' },
    font: { type: String, default: 'Times New Roman' },
  },
  heading: {
    style: {
      type: String,
      enum: ['box', 'simple', 'topBottomLine', 'line'],
      default: 'line',
    },
    uppercase: { type: Boolean, default: false },
    size: { type: String, enum: ['s', 'm', 'l'], default: 's' },
  },
  subtitle: {
    style: {
      type: String,
      enum: ['normal', 'bold', 'italic'],
      default: 'normal',
    },
    position: {
      type: String,
      enum: ['sameLine', 'nextLine'],
      default: 'nextLine',
    },
  },
  header: {
    position: {
      type: String,
      enum: ['left', 'center'],
      default: 'center',
    },
    additionalInfoStyle: {
      type: String,
      enum: ['icon', 'bar'],
      default: 'icon',
    },
    additionalInfoOrder: [{ type: String }],
  },
  name: {
    size: { type: String, enum: ['s', 'm', 'l'], default: 'm' },
    style: {
      type: String,
      enum: ['normal', 'bold'],
      default: 'bold',
    },
  },
  jobTitle: {
    size: { type: String, enum: ['s', 'm', 'l'], default: 'm' },
    style: {
      type: String,
      enum: ['normal', 'bold', 'italic'],
      default: 'italic',
    },
  },
  date: {
    month: {
      type: String,
      enum: ['digits', 'short', 'long'],
      default: 'digits',
    },
    delimiter: {
      type: String,
      enum: ['/ Slash', '- Hyphen', '. Dot'],
      default: '/ Slash',
    },
  },
  skills: {
    format: {
      type: String,
      enum: ['grid', 'level', 'text', 'bubble'],
      default: 'level',
    },
    gridCols: {
      type: String,
      enum: ['one', 'two', 'three', 'four'],
      default: 'four',
    },
    textFormat: {
      type: String,
      enum: ['bullet', 'pipe', 'wrap'],
      default: 'bullet',
    },
    infoItalic: {
      type: Boolean,
      default: false,
    },
  },
  language: {
    format: {
      type: String,
      enum: ['grid', 'level', 'text', 'bubble'],
      default: 'level',
    },
    gridCols: {
      type: String,
      enum: ['one', 'two', 'three', 'four'],
      default: 'four',
    },
    textFormat: {
      type: String,
      enum: ['bullet', 'pipe', 'wrap'],
      default: 'bullet',
    },
    infoItalic: {
      type: Boolean,
      default: false,
    },
  },
  profile: {
    showHeading: {
      type: Boolean,
      default: true,
    },
  },
  education: {
    degreeFirst: {
      type: Boolean,
      default: true,
    },
  },
  professionalExperience: {
    jobTitleFirst: {
      type: Boolean,
      default: true,
    },
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Settings', SettingsSchema);
