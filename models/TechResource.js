const mongoose = require('mongoose');

const TechResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: false, // For the "Read More" detailed view
  },
  category: {
    type: String,
    required: true, // e.g. "PLAYBOOK", "GUIDE"
    uppercase: true
  },
  icon: {
      type: String,
      default: "FileText" // e.g. "Shield", "Zap", etc.
  },
  linkText: {
    type: String,
    default: "Read More" 
  },
  linkUrl: {
    type: String,
    default: "/contact"
  },
  fileUrl: {
     type: String, 
     required: false
  }
});

module.exports = mongoose.model('TechResource', TechResourceSchema);
