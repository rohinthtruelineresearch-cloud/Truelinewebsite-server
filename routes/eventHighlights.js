const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const EventHighlight = require('../models/EventHighlight');

// @route   GET /api/event-highlights
// @desc    Get all event highlights
// @access  Public
router.get('/', async (req, res) => {
  try {
    const highlights = await EventHighlight.find().sort({ createdAt: -1 });
    res.json(highlights);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/event-highlights
// @desc    Create a new highlight
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
  const { title, images, year, category, eventDate } = req.body;

  try {
    const newHighlight = new EventHighlight({
      title,
      images, // Expecting array of strings
      year,
      category,
      eventDate
    });

    const highlight = await newHighlight.save();
    res.json(highlight);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/event-highlights/:id
// @desc    Update a highlight
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
  const { title, images, year, category, eventDate } = req.body;

  try {
    let highlight = await EventHighlight.findById(req.params.id);
    if (!highlight) return res.status(404).json({ msg: 'Highlight not found' });

    highlight.title = title || highlight.title;
    highlight.images = images || highlight.images;
    highlight.year = year || highlight.year;
    highlight.category = category || highlight.category;
    highlight.eventDate = eventDate || highlight.eventDate;

    await highlight.save();
    res.json(highlight);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/event-highlights/:id
// @desc    Delete a highlight
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const highlight = await EventHighlight.findById(req.params.id);
    if (!highlight) return res.status(404).json({ msg: 'Highlight not found' });

    await highlight.deleteOne();
    res.json({ msg: 'Highlight removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
