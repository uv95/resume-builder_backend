const mongoose = require('mongoose');

const HeaderSchema = new mongoose.Schema({
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
    resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
});

module.exports = mongoose.model('Header', HeaderSchema);
