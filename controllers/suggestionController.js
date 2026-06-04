const SuggestedHabit = require('../models/suggestedHabitModel');

exports.getAllSuggestions = async (req, res) => {
  try {
    const suggestions = await SuggestedHabit.find();
    res.status(200).json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};