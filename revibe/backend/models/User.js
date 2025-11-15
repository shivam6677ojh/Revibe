const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: { type: String, unique: true, index: true },
  email: { type: String },
  firstName: String,
  lastName: String,
  roles: { type: [String], default: ['user', 'organizer'] }, // 'user', 'organizer', 'admin'
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
  eventsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  attendedEventsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
