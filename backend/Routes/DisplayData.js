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

        // Update the user's profile in the database based on the updatedData
        const updatedUser = await User.findOneAndUpdate(
            { email: updatedData.email },
            { $set: updatedData },
            { new: true } // Return the updated document
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

module.exports = router; // Correct the export statement, it should be 'router', not 'module.export'
