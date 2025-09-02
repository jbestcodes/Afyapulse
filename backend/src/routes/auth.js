const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../services/authMiddleware');
// Greet logged-in user
router.get('/hello', authMiddleware, (req, res) => {
  const name = req.user && req.user.name ? req.user.name : 'User';
  res.json({ message: `Hello ${name}, hope you are fine today 😊` });
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash, phone });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, name: user.name, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({ message: 'If your email is registered, you will receive reset instructions.' });
  }
  // TODO: Generate reset token and send email/SMS here
  // For now, just respond
  res.json({ message: 'Reset instructions sent to your email.' });
});



module.exports = router;
