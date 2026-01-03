const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const staticEvents = [
  {
    tag: "TECH WORKSHOP",
    title: "AI Architecture Masterclass",
    description: "Deep-dive into scalable AI system design—from data pipelines to model serving, with live architecture reviews and optimization strategies.",
    date: "Sep 24, 2024 · Virtual",
    accent: "#8B5CF6",
  },
  {
    tag: "HACKATHON",
    title: "MLOps Sprint Challenge",
    description: "24-hour intensive on building production MLOps pipelines—automated training, monitoring, and deployment with industry mentors.",
    date: "Oct 12, 2024 · Bengaluru",
    accent: "#22D3EE",
  },
  {
    tag: "FOUNDER SESSION",
    title: "Startup Tech Stack Clinic",
    description: "Hands-on workshop optimizing cloud costs, scaling infrastructure, and implementing DevOps best practices for early-stage ventures.",
    date: "Nov 3, 2024 · Hybrid",
    accent: "#34D399",
  },
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Only seed if empty
    const count = await Event.countDocuments();
    if (count > 0) {
        console.log('Events collection not empty. Skipping seed.');
        process.exit();
    }

    await Event.insertMany(staticEvents);
    console.log('Events seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedEvents();
