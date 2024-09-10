const mongoose = require('mongoose');

const DivisionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    acronym: { type: String, required: true, unique:true },
    level:{type: Number },
    status: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

const Division = mongoose.model('Division', DivisionSchema);

module.exports = Division;
