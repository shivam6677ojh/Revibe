const express = require('express');
const router = express.Router();
const clerkAuth = require('../middleware/clerkAuth');
const Badge = require('../models/Badge');
const User = require('../models/User');

// List current user badges
router.get('/', clerkAuth, async (req, res) => {
  const user = await User.findOne({ clerkId: req.auth.sub });
  if (!user) return res.status(401).json({ error: 'User missing' });
  const badges = await Badge.find({ user: user._id });
  res.json(badges);
});

// Manual award (admin)
router.post('/award', clerkAuth, async (req, res) => {
  const admin = await User.findOne({ clerkId: req.auth.sub });
  if (!admin || !admin.roles.includes('admin')) return res.status(403).json({ error: 'Admin only' });
  const { clerkId, type } = req.body;
  const user = await User.findOne({ clerkId });
  if (!user) return res.status(404).json({ error: 'Target user not found' });
  const badge = await Badge.create({ user: user._id, type });
  res.status(201).json(badge);
});

module.exports = router;
