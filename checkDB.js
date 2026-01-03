const mongoose = require('mongoose');
const dotenv = require('dotenv');
const EventHighlight = require('./models/EventHighlight');

dotenv.config();

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    const count = await EventHighlight.countDocuments();
    console.log(`EventHighlight count: ${count}`);
    const items = await EventHighlight.find({});
    console.log('Items:', JSON.stringify(items, null, 2));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkDB();
