const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    mercurialReference: { type: String },
    name: { type: String },
    type: { type: String, enum: ['DURABLE', 'CONSUMABLE'] },
    nomenclature: { type: String, enum: ['201 - MATERIEL de guerre', '202 - VIVRES'] },
    quantity: { type: Number },
    unitPrice: { type: Number },
    createdAt: { type: Date, default: Date.now },
    materialgroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialGroup' }
});

const Material = mongoose.model('Material', MaterialSchema);

module.exports = Material;
