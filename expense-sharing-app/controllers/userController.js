const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, mobileNumber } = req.body;
    const user = new User({ name, email, mobileNumber });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
