const mongoose = require('mongoose');
const User = mongoose.model('user');

async function checkRole(req, res, next) {
    try {
        const userId = req.header('userId'); 
        if (!userId) return res.status(400).json({ error: 'Missing userId in headers' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        req.user = user; 
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = checkRole;
