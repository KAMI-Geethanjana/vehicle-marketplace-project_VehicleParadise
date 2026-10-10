const express = require('express');
const router = express.Router();
const Ad = require('./models/Ad');

// GET /api/ads (Public)
// Returns all active ads
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find({ active: true }).sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
