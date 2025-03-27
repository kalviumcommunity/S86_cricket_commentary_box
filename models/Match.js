const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
