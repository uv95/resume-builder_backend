const mongoose = require('mongoose');

const ProfessionalExperienceSchema = new mongoose.Schema({
    sectionName: { type: String, default: 'Professional Experience' }, items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProfessionalExperienceItem',
        },
    ],
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
    },
});

module.exports = mongoose.model('ProfessionalExperience', ProfessionalExperienceSchema);