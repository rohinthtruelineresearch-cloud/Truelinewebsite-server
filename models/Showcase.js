const mongoose = require('mongoose');

const ShowcaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String, // URL of the institution logo
    required: true,
  },
  location: {
    type: String, // e.g. "Salem, Tamil Nadu"
  },
  category: {
    type: String, // e.g. "UNIVERSITY", "MEDICAL COLLEGE", "ENTERPRISE"
    uppercase: true,
    default: "INSTITUTION"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Showcase', ShowcaseSchema);
