const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Showcase = require('../models/Showcase');

// @route   GET /api/showcases
// @desc    Get all showcases
// @access  Public
router.get('/', async (req, res) => {
  try {
    const showcases = await Showcase.find().sort({ createdAt: -1 });
    res.json(showcases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/showcases
// @desc    Create a new showcase
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
  const { name, logoUrl, location, category } = req.body;

  try {
    const newShowcase = new Showcase({
      name,
      logoUrl,
      location,
      category
    });

    const showcase = await newShowcase.save();
    res.json(showcase);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/showcases/:id
// @desc    Update a showcase
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
  const { name, logoUrl, location, category } = req.body;

  try {
    let showcase = await Showcase.findById(req.params.id);
    if (!showcase) return res.status(404).json({ msg: 'Showcase not found' });

    showcase.name = name || showcase.name;
    showcase.logoUrl = logoUrl || showcase.logoUrl;
    showcase.location = location || showcase.location;
    showcase.category = category || showcase.category;

    await showcase.save();
    res.json(showcase);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/showcases/:id
// @desc    Delete a showcase
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const showcase = await Showcase.findById(req.params.id);
    if (!showcase) return res.status(404).json({ msg: 'Showcase not found' });

    await showcase.deleteOne();
    res.json({ msg: 'Showcase removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
