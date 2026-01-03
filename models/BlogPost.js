const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  readingTime: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: [String], // Array of paragraphs
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isSpotlight: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
