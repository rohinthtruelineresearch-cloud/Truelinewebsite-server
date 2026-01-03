const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true, // e.g. "AI SOLUTIONS"
  },
  accent: {
    type: String,
    default: "#22D3EE" // Hex color for the tag border/text
  },
  imageUrl: {
    type: String,
    required: false,
  },
  linkUrl: {
    type: String,
    default: "#" 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
