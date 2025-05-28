const Match = require('../models/Match');

// Get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch matches', error: error.message });
  }
};

// Add a new match
exports.addMatch = async (req, res) => {
  try {
    const { teamA, teamB, date, venue } = req.body;

    const newMatch = new Match({ teamA, teamB, date, venue });
    await newMatch.save();

    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add match', error: error.message });
  }
};

// Update match
exports.updateMatch = async (req, res) => {
  try {
    const updated = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Match not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update match', error: error.message });
  }
};

// Delete match
exports.deleteMatch = async (req, res) => {
  try {
    const deleted = await Match.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Match not found' });
    res.status(200).json({ message: 'Match deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete match', error: error.message });
  }
};
