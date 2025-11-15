const express = require('express');
const router = express.Router();
const clerkAuth = require('../middleware/clerkAuth');
const Event = require('../models/Event');
const User = require('../models/User');
const Rsvp = require('../models/Rsvp');
const Badge = require('../models/Badge');
const { sendMail } = require('../utils/mail');

async function awardBadges(user, event) {
  const badgesToAward = [];
  // Early Bird: among first 10 attendees
  if (event.attendees.length <= 10) badgesToAward.push('Early Bird');
  // Eco Warrior: footprint threshold
  if (event.avgFootprintPerAttendeeKg <= 3) badgesToAward.push('Eco Warrior');
  // Community Champ: attends X events
  if (user.attendedEventsCount >= 5) badgesToAward.push('Community Champ');
  // Low Carbon Host: organizer with low footprint (award to organizer)
  if (event.avgFootprintPerAttendeeKg <= 3) {
    const organizer = await User.findById(event.organizer);
    if (organizer && !organizer.badges.includes('Low Carbon Host')) {
      badgesToAward.push({ organizer, type: 'Low Carbon Host' });
    }
  }
  for (const b of badgesToAward) {
    if (typeof b === 'string') {
      await Badge.create({ user: user._id, type: b });
    } else {
      await Badge.create({ user: b.organizer._id, type: b.type });
    }
  }
}

// RSVP
router.post('/:eventId', clerkAuth, async (req, res) => {
  console.log('RSVP POST request received for event:', req.params.eventId);
  try {
    const event = await Event.findById(req.params.eventId);
    console.log('Event found:', event ? event.title : 'NOT FOUND');
    console.log('Event approved:', event ? event.approved : 'N/A');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (!event.approved) return res.status(403).json({ error: 'Event not yet approved by admin' });
    const user = await User.findOne({ clerkId: req.auth.sub });
    console.log('User found:', user ? user.email : 'NOT FOUND');
    if (!user) return res.status(401).json({ error: 'User missing' });
    if (event.attendees.includes(user._id)) return res.status(400).json({ error: 'Already RSVPed' });
    event.attendees.push(user._id);
    event.recalculateCarbon();
    user.attendedEventsCount += 1;
    await Promise.all([event.save(), user.save()]);
    await Rsvp.create({ user: user._id, event: event._id });
    await awardBadges(user, event);

    // Confirmation email
    await sendMail({
      to: user.email,
      subject: `RSVP Confirmed: ${event.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h1 style="color: #155e63;">Thanks for RSVPing!</h1>
          <p>You are confirmed for <strong>${event.title}</strong>.</p>
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Date:</strong> ${new Date(event.datetime).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${new Date(event.datetime).toLocaleTimeString()}</p>
          </div>
          <p style="color: #1b8f5a;">🌱 Estimated Carbon Footprint: ${event.carbonEstimateKg.toFixed(2)} kg CO₂</p>
          <p>See you there!</p>
        </div>
      `
    });
    res.json({ success: true, carbonEstimateKg: event.carbonEstimateKg });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
