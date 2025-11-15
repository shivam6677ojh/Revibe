const express = require('express');
const router = express.Router();
const clerkAuth = require('../middleware/clerkAuth');
const Event = require('../models/Event');
const User = require('../models/User');

// Create event (organizer)
router.post('/', clerkAuth, async (req, res) => {
  try {
    const organizerClerkId = req.auth.sub;
    const organizer = await User.findOne({ clerkId: organizerClerkId });
    if (!organizer) return res.status(401).json({ error: 'User not found' });
    
    // Auto-grant organizer role if not present
    if (!organizer.roles.includes('organizer')) {
      organizer.roles.push('organizer');
      await organizer.save();
    }
    
    const event = await Event.create({ ...req.body, organizer: organizer._id, approved: true });
    organizer.eventsCreated.push(event._id);
    await organizer.save();
    res.status(201).json(event);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// List approved events
router.get('/', async (_req, res) => {
  const events = await Event.find({ approved: true }).sort({ date: 1 });
  res.json(events);
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json(event);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Update event (organizer or admin)
router.put('/:id', clerkAuth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    const user = await User.findOne({ clerkId: req.auth.sub });
    if (!user) return res.status(401).json({ error: 'User missing' });
    const isOwner = event.organizer.toString() === user._id.toString();
    const isAdmin = user.roles.includes('admin');
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Forbidden' });
    Object.assign(event, req.body);
    event.recalculateCarbon();
    await event.save();
    res.json(event);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Approve event (admin)
router.post('/:id/approve', clerkAuth, async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.auth.sub });
    if (!user || !user.roles.includes('admin')) return res.status(403).json({ error: 'Admin only' });
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    event.approved = true;
    event.recalculateCarbon();
    await event.save();
    res.json(event);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Delete event (organizer or admin)
router.delete('/:id', clerkAuth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    const user = await User.findOne({ clerkId: req.auth.sub });
    if (!user) return res.status(401).json({ error: 'User missing' });
    const isOwner = event.organizer.toString() === user._id.toString();
    const isAdmin = user.roles.includes('admin');
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Forbidden - only organizer or admin can delete' });
    
    // Remove event from organizer's eventsCreated
    await User.findByIdAndUpdate(event.organizer, { $pull: { eventsCreated: event._id } });
    
    // Delete event
    await Event.findByIdAndDelete(req.params.id);
    console.log(`Event deleted: ${event.title} by user ${user.email}`);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Carbon endpoint
router.get('/:id/carbon', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    event.recalculateCarbon();
    res.json({ carbonEstimateKg: event.carbonEstimateKg });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
