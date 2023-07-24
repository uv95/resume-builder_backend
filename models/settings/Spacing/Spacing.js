const mongoose = require('mongoose');

const SpacingSchema = new mongoose.Schema({
    fontSize: { type: Number, default: 16 },
    lineHeight: { type: Number, default: 1.3 },
    leftRightMargin: { type: Number, default: 16 },
    topBottomMargin: { type: Number, default: 16 },
    spaceBetweenSections: { type: Number, default: 22 },
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
  },
});

module.exports = mongoose.model('Spacing', SpacingSchema);
