const express = require('express');
const mongoose = require('mongoose');
const checkRole = require('../middleware/authMiddleware');

const Payment = mongoose.model('payment');
const User = mongoose.model('user');
const Property = mongoose.model('property');

const router = express.Router();

router.post('/create', checkRole, async (req, res) => {
    try {
        if (req.user.role !== 'Tenant') {
            return res.status(403).json({ error: 'Only tenants can make payments' });
        }

        const { propertyId, amount } = req.body;

        const payment = new Payment({
            tenantId: req.user._id,
            propertyId,
            amount,
            status: 'pending',
        });

        await payment.save();

        res.json({ message: 'Payment recorded successfully', payment });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/', checkRole, async (req, res) => {
    try {
        let filter = {};

        if (req.user.role === 'Admin') {
            filter = {}; 
        } else if (req.user.role === 'Tenant') {
            filter = { tenantId: req.user._id };  
        } else {
            return res.status(403).json({ error: 'Only Admin or Tenant can view payments' });
        }

        const payments = await Payment.find(filter)
            .populate('tenantId', 'name email')
            .populate('propertyId', 'name address');

        res.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
