const mongoose = require('mongoose');

const commentarySchema = new mongoose.Schema({
  commentator: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Commentary', commentarySchema);
