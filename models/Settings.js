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
    fontSize: { type: Number, default: 16 },
    lineHeight: { type: Number, default: 1.3 },
    leftRightMargin: { type: Number, default: 16 },
    topBottomMargin: { type: Number, default: 16 },
    spaceBetweenSections: { type: Number, default: 22 },
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
      type: Number,
      enum: [1, 2, 3, 4],
      default: 4,
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
      type: Number,
      enum: [1, 2, 3, 4],
      default: 4,
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
