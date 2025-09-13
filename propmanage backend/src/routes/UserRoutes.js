const express = require('express');
const mongoose = require('mongoose');

const user = mongoose.model('user');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { name, email, passwordHash, role } = req.body;

        const user1 = new user({
            name,
            email,
            passwordHash,
            role
        });

        await user1.save();

        res.json({ message: 'User created successfully', user });  
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
