const express = require('express');
const router = express.Router();
const Order = require('../models/Orders'); // Adjust the path as needed
const User = require('../models/User');

// Get order data for a user
router.get('/myOrderData', async (req, res) => {
  try {
    // Validate the email address
    console.log(req.query);
    const { email } = req.query;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Find orders associated with the email
    const orders = await Order.find({ email });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'No orders found for the provided email' });
    }

    res.json({ orderData: orders });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user data for a user
router.post('/myUserData', async (req, res) => {
  try {
    // Validate the email address
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Find users associated with the email
    const users = await User.find({ email });

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found for the provided email' });
    }

    res.json({ UserData: users });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
