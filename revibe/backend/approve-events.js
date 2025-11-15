require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');

async function approveAllEvents() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const result = await Event.updateMany({ approved: false }, { approved: true });
    console.log(`Approved ${result.modifiedCount} events`);
    
    const events = await Event.find();
    console.log('\nAll events:');
    events.forEach(e => console.log(`- ${e.title}: approved=${e.approved}`));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

approveAllEvents();
