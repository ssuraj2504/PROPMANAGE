const express = require('express');
const mongoose = require('mongoose');

const Property = mongoose.model('property');
const User = mongoose.model('user');

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const { name, address, managerId } = req.body;

        const property = new Property({ name, address, managerId });
        await property.save();

        res.json({ message: 'Property added successfully', property });
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const properties = await Property.find().populate('managerId', 'name email');
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
