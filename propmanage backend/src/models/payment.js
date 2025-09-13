const express = require('express');
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'property', required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'received'], default: 'pending' },
});

mongoose.model('payment', paymentSchema);