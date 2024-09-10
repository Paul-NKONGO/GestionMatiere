const mongoose = require('mongoose');

const BspSchema = new mongoose.Schema({
    bspnumber: { type: Number, required: true, unique: true },
    proof: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    create_at: Date,
});

const Bsp = mongoose.model('Bsp', BspSchema);

module.exports = Bsp;
