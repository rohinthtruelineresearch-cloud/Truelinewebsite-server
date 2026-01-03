const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// @route   POST /api/subscribers
// @desc    Subscribe to newsletter
// @access  Public
router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const newSubscriber = new Subscriber({ email });
    const savedSubscriber = await newSubscriber.save();

    res.status(201).json(savedSubscriber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/subscribers
// @desc    Get all subscribers
// @access  Private (should be restricted ideally)
router.get('/', async (req, res) => {
  try {
    // Sort by most recent first
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
