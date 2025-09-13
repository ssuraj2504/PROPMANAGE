const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Manager', 'Tenant'], required: true },
    status: { type: String, enum: ['active', 'suspended', 'blacklisted'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema);
