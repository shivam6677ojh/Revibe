const express = require('express');
const router = express.Router();
const clerkAuth = require('../middleware/clerkAuth');
const User = require('../models/User');

// Ensure user exists in DB after Clerk auth
router.post('/ensure', clerkAuth, async (req, res) => {
  try {
    const clerkId = req.auth.sub;
    let user = await User.findOne({ clerkId });
    if (!user) {
      user = await User.create({
        clerkId,
        email: req.auth.email || '',
        firstName: req.auth.firstName || '',
        lastName: req.auth.lastName || '',
        roles: ['user']
      });
    }
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
