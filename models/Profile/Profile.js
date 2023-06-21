const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    sectionName: { type: String, default: 'Profile' },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProfileItem',
        },
    ],
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
    },
});

module.exports = mongoose.model('Profile', ProfileSchema);