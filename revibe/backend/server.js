require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const rsvpRoutes = require('./routes/rsvps');
const adminRoutes = require('./routes/admin');
const badgeRoutes = require('./routes/badges');
const contactRoutes = require('./routes/contact');

const app = express();
app.use(cors({ origin: '*'}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGODB_URI;

if (!MONGO) {
  console.error('Missing MONGODB_URI in environment. Create backend/.env based on .env.example and set MONGODB_URI.');
  process.exit(1);
}

connectDB(MONGO);

app.get('/', (_req, res) => res.json({ status: 'Revibe API running' }));

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/rsvps', rsvpRoutes);
app.use('/admin', adminRoutes);
app.use('/badges', badgeRoutes);
app.use('/contact', contactRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
