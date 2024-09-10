const mongoose = require('mongoose');

const MaterialGroupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    groupDescription: { type: String },
    criticalQuantity: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

const MaterialGroup = mongoose.model('MaterialGroup', MaterialGroupSchema);

module.exports = MaterialGroup;
