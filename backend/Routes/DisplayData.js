const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

router.post('/userdata', (req, res) => {
    try {
        res.send(global.users); // Use the correct variable name 'global.users'
        console.log("hi");
        console.log(global.users);
    } catch (error) {
        console.log(error);
        res.send('Server Error'); // Put 'Server Error' inside quotes
    }
});

router.post('/updateprofile', async (req, res) => {
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
