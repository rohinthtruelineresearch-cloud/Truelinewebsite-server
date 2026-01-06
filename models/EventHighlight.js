const mongoose = require('mongoose');

const EventHighlightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: [{
    type: String, // URLs
    required: true
  }],
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  category: {
    type: String,
    default: 'Event' 
  },
  eventDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('EventHighlight', EventHighlightSchema);
