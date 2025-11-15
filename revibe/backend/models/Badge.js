const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Early Bird', 'Eco Warrior', 'Low Carbon Host', 'Community Champ'], required: true },
  awardedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Badge', badgeSchema);
