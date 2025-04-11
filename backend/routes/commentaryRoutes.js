const express = require('express');
const router = express.Router();
const Commentary = require('../models/Commentary');

// POST a new commentary
router.post('/', async (req, res) => {
  try {
    const { commentator, style, text } = req.body;
    const newComment = new Commentary({ commentator, style, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: "Failed to add commentary" });
  }
});

// GET all commentaries
router.get('/', async (req, res) => {
  try {
    const allComments = await Commentary.find();
    res.status(200).json(allComments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch commentaries" });
  }
});

module.exports = router;
