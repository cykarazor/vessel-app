// backend/routes/voyages.js
const express = require('express');
const Voyage = require('../models/Voyage');

const router = express.Router();

// Create a new voyage
router.post('/', async (req, res) => {
  try {
    const newVoyage = new Voyage(req.body);
    await newVoyage.save();
    res.status(201).json(newVoyage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all voyages
router.get('/', async (req, res) => {
  try {
    const voyages = await Voyage.find();
    res.status(200).json(voyages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update voyage
router.put('/:id', async (req, res) => {
  try {
    const updatedVoyage = await Voyage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedVoyage) {
      return res.status(404).json({ message: 'Voyage not found' });
    }
    res.status(200).json(updatedVoyage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
