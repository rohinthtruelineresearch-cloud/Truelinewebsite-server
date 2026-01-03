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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('EventHighlight', EventHighlightSchema);
