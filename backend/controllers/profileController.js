const User = require('../models/User');
// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username email bio');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user bio
exports.updateBio = async (req, res) => {
  const { bio } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { bio },
      { new: true }
    ).select('username email bio');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
