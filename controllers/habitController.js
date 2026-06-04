const Habit = require('../models/habitModel');

exports.addHabit = async (req, res) => {
  try {
    const { userId, title, category, goalType } = req.body;
    const habit = await Habit.create({ userId, title, category, goalType });
    res.status(201).json({ message: "Habit added", habit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const { userId } = req.params;
    const habits = await Habit.find({ userId });
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;
    await Habit.findByIdAndDelete(id);
    res.status(200).json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reminderTime } = req.body;
    await Habit.findByIdAndUpdate(id, { reminderTime });
    res.status(200).json({ message: "Reminder updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};