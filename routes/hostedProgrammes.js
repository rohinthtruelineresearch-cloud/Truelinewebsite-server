const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const HostedProgramme = require('../models/HostedProgramme');

// @route   GET /api/hosted-programmes
// @desc    Get all hosted programmes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const programmes = await HostedProgramme.find().sort({ createdAt: -1 });
    res.json(programmes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/hosted-programmes
// @desc    Create a new programme
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
  const { title, date, summary } = req.body;

  try {
    const newProgramme = new HostedProgramme({
      title,
      date,
      summary
    });

    const programme = await newProgramme.save();
    res.json(programme);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/hosted-programmes/:id
// @desc    Update a programme
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
  const { title, date, summary } = req.body;

  try {
    let programme = await HostedProgramme.findById(req.params.id);
    if (!programme) return res.status(404).json({ msg: 'Programme not found' });

    programme.title = title || programme.title;
    programme.date = date || programme.date;
    programme.summary = summary || programme.summary;

    await programme.save();
    res.json(programme);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/hosted-programmes/:id
// @desc    Delete a programme
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const programme = await HostedProgramme.findById(req.params.id);
    if (!programme) return res.status(404).json({ msg: 'Programme not found' });

    await programme.deleteOne();
    res.json({ msg: 'Programme removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
