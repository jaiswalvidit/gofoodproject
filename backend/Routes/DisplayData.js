const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

router.get('/userdata', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


router.patch('/userdata', async (req, res) => {
    try {
        const updatedData = req.body;

        // Ensure that the request body contains the email for updating
        if (!updatedData.email) {
            return res.status(400).json({ message: 'Email is required for updating user profile' });
        }

        // Find and update the user in the MongoDB collection
        const updatedUser = await User.findOneAndUpdate(
            { email: updatedData.email },
            { $set: updatedData },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
