const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const checkEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    const count = await Event.countDocuments();
    console.log(`Event count: ${count}`);
    const items = await Event.find({});
    console.log('Items:', JSON.stringify(items, null, 2));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkEvents();
