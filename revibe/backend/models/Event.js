const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approved: { type: Boolean, default: false },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  avgFootprintPerAttendeeKg: { type: Number, default: 5 },
  durationHours: { type: Number, default: 2 },
  carbonEstimateKg: { type: Number, default: 0 }
}, { timestamps: true });

// Recalculate carbon before save
eventSchema.methods.recalculateCarbon = function () {
  const attendeesCount = this.attendees.length || 0;
  this.carbonEstimateKg = attendeesCount * this.avgFootprintPerAttendeeKg * this.durationHours;
};

module.exports = mongoose.model('Event', eventSchema);
