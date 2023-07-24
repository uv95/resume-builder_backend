const mongoose = require('mongoose');

const SubtitleSchema = new mongoose.Schema({
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
    resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Subtitle', SubtitleSchema);
