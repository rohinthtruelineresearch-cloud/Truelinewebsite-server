const express = require('express');
const router = express.Router();
const TechResource = require('../models/TechResource');
const auth = require('../middleware/authMiddleware');

// Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await TechResource.find().sort({ _id: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new resource
router.post('/', auth, async (req, res) => {
  const resource = new TechResource(req.body);
  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a resource
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedResource = await TechResource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a resource
router.delete('/:id', auth, async (req, res) => {
  try {
    await TechResource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
