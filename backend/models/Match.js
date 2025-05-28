const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
