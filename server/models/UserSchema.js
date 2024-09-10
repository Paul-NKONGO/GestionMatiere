const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    registrationNumber: { type: String, required:true, unique:true} ,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    function: { type: String, required: true},
    phone: { type: String },
    dateOfBirth: {type: Date},
    password: { type: String, required: true },
    profile: { type: String, required:true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    divisionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Division' }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
