const mongoose = require('mongoose');

const PurchaseOrderSchema = new mongoose.Schema({
    entryNumber: { type: String, required: true },
    digitalFile: { type: String },
    createdAt: { type: Date, default: Date.now },
    signedAt: { type: Date },
    archivedAt: { type: Date },
    entryStatusId: { type: String, enum: ['PENDING', 'SIGNED'] },
    deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery' }
});

const PurchaseOrder = mongoose.model('PurchaseOrder', PurchaseOrderSchema);

module.exports = PurchaseOrder;
