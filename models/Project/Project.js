const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    sectionName: { type: String, default: 'Projects' }, items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        },
    ],
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
    },
});

module.exports = mongoose.model('Project', ProjectSchema);