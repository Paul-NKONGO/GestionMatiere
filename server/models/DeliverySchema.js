const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    orderNumber: { type: String, required: true },
    budgetLine : { type: String },
    acquisitionType : { type: String },
    deliveryDate: { type: Date, default: Date.now },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    materialId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true }]
});

const Delivery = mongoose.model('Delivery', DeliverySchema);

module.exports = Delivery;
