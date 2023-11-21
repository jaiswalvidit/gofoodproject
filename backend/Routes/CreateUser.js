const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisviditLetsdddddd";

// User registration route
router.post(
  '/createuser',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('name').isLength({ min: 1 }).withMessage('Name is required'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        return   Error('Passwords do not match');
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        location: req.body.geolocation,
        phone: req.body.phone,
      });
      console.log('User created successfully:', req.body.email);
      res.json({ success: true });
    } catch (error) {
      console.error('Error creating user:', error);
      res.json({ success: false });
    }
  }
);

// User login route (no authentication required)
router.post('/loginuser', async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      console.log('User not found for email:', req.body.email);
      return res.status(400).json({ errors: 'Try logging with correct credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, userData.password);
    if (!isPasswordCorrect) {
      console.log('Incorrect password for user:', req.body.email);
      return res.status(400).json({ errors: 'Try logging with correct password' });
    }

     const data = {
      user: {
        id: userData.id
      }
    };
    const authToken = jwt.sign(data, jwtSecret);
    console.log('User logged in:', req.body.name);
    return res.json({ success: true, authToken: authToken });
    
    } catch (error) {
      console.error('Login error:', error);
      res.json({ success: false });
    }
  });


module.exports = router;
