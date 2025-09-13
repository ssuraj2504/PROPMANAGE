const express = require('express');
const MaintenanceRequest = require('../models/maintainReq');
const mongoose = require('mongoose');
const checkRole = require('../middleware/authMiddleware');
const Property = mongoose.model('property');
const User = mongoose.model('user');

const router = express.Router();

router.post('/create', checkRole, async (req, res) => {
    try {
        const { propertyId, description } = req.body;

        const newRequest = new MaintenanceRequest({
            propertyId,
            requestedBy: req.user._id,  
            description,
        });

        await newRequest.save();

        res.json({ message: 'Maintenance request created successfully', request: newRequest });
    } catch (error) {
        console.error('Error creating maintenance request:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/', checkRole, async (req, res) => {
    try {
        let filter = {};

        if (req.user.role === 'Admin') {
            filter = {};  
        } else if (req.user.role === 'Manager') {
            const properties = await Property.find({ managerId: req.user._id }).select('_id');
            const propertyIds = properties.map(p => p._id);
            filter = { propertyId: { $in: propertyIds } };
        } else if (req.user.role === 'Tenant') {
            filter = { requestedBy: req.user._id };
        }

        const requests = await MaintenanceRequest.find(filter)
            .populate('propertyId', 'name address')
            .populate('requestedBy', 'name email');

        res.json(requests);
    } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
