const express = require('express');
const router = express.Router();
const clerkAuth = require('../middleware/clerkAuth');
const Event = require('../models/Event');
const User = require('../models/User');

router.get('/events/pending', clerkAuth, async (req, res) => {
  const user = await User.findOne({ clerkId: req.auth.sub });
  if (!user || !user.roles.includes('admin')) return res.status(403).json({ error: 'Admin only' });
  const pending = await Event.find({ approved: false });
  res.json(pending);
});

module.exports = router;
