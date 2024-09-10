const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    privilege: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
