const mongoose = require('mongoose');

const HeadingSchema = new mongoose.Schema({
    style: {
      type: String,
      enum: ['box', 'simple', 'topBottomLine', 'line'],
      default: 'line',
    },
    isUppercase: { type: Boolean, default: false },
    size: { type: String, enum: ['s', 'm', 'l'], default: 's' },
    resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Heading', HeadingSchema);
