const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String, // e.g. "TECH WORKSHOP", "HACKATHON"
    required: true,
  },
  description: {
    type: String, 
    required: true
  },
  date: {
    type: String, // e.g. "Sep 24, 2024 · Virtual"
    required: true,
  },
  accent: {
    type: String, // e.g. "#8B5CF6"
    default: "#8B5CF6"
  }
});

module.exports = mongoose.model('Event', EventSchema);
