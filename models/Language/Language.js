const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    sectionName: { type: String, default: 'Languages' }, items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LanguageItem',
        },
    ],
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
    },
});

module.exports = mongoose.model('Language', LanguageSchema);