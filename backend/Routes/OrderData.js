const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const User = require('../models/user');

router.get('/myOrderData', async (req, res) => {
  try {
   
    console.log(req.query);
    const { email } = req.query;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    console.log(email);
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
router.post('/myOrderData/:email', async (req, res) => {
  try {
  
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    const users = await User.find({ email });
    console.log(users);
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
