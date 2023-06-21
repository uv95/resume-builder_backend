const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema({
    sectionName: { type: String, default: 'Skills' },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SkillsItem',
        },
    ],
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
    },
});

module.exports = mongoose.model('Skills', SkillsSchema);