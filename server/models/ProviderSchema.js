const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    taxNumber: { type: String, unique: true },
    location: { type: String },
    businessType: { type: String },
    phone: { type: Number },
    email: { type: String },
    postalBox: { type: String },
    createdAt: { type: Date, default: Date.now() }
});

const Provider = mongoose.model('Provider', ProviderSchema);

module.exports = Provider;
