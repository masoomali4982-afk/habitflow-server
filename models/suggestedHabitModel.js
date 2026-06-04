const mongoose = require('mongoose');

const suggestedHabitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  goalType: { type: String, enum: ['build', 'remove'], required: true },
  description: { type: String },
});

module.exports = mongoose.model('SuggestedHabit', suggestedHabitSchema);