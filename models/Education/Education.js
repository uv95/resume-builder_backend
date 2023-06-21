const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    sectionName: { type: String, default: 'Education' }, items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EducationItem',
        },
    ],
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
    },
});

module.exports = mongoose.model('Education', EducationSchema);