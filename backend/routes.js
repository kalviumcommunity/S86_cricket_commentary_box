const express = require('express');
const router = express.Router();
const Match = require('./models/Match'); // Import the Match Model

//  Create (POST)
router.post('/matches', async (req, res) => {
    try {
        const newMatch = new Match(req.body);
        await newMatch.save();
        res.status(201).json({ message: "Match added successfully", match: newMatch });
    } catch (error) {
        res.status(400).json({ message: "Error adding match", error });
    }
});

//  Read All (GET)
router.get('/matches', async (req, res) => {
    try {
        const matches = await Match.find();
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: "Error fetching matches", error });
    }
});

//  Read by ID (GET)
router.get('/matches/:id', async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) return res.status(404).json({ message: "Match not found" });
        res.json(match);
    } catch (error) {
        res.status(500).json({ message: "Error fetching match", error });
    }
});

//  Update (PUT)
router.put('/matches/:id', async (req, res) => {
    try {
        const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMatch) return res.status(404).json({ message: "Match not found" });
        res.json({ message: "Match updated successfully", match: updatedMatch });
    } catch (error) {
        res.status(500).json({ message: "Error updating match", error });
    }
});

//  Delete (DELETE)
router.delete('/matches/:id', async (req, res) => {
    try {
        const deletedMatch = await Match.findByIdAndDelete(req.params.id);
        if (!deletedMatch) return res.status(404).json({ message: "Match not found" });
        res.json({ message: "Match deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting match", error });
    }
});

module.exports = router;
