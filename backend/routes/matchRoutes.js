const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

// GET all matches
router.get('/', matchController.getAllMatches);

// POST a new match
router.post('/', matchController.addMatch);

// PUT update a match
router.put('/:id', matchController.updateMatch);

// DELETE a match
router.delete('/:id', matchController.deleteMatch);

module.exports = router;
