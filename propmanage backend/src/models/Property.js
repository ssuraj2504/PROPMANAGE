const mongoose = require('mongoose');

const propSchema = new mongoose.Schema({
    name: String,
    address: String,
    status: { type: String, enum: ['occupied', 'vacant', 'maintenance_pending'], default: 'vacant' },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now }
});

mongoose.model('property', propSchema);