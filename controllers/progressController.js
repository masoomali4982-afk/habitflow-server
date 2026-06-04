const Progress = require('../models/progressModel');

// For build habits — save timer session
exports.markDone = async (req, res) => {
  try {
    const { habitId, userId, startTime, endTime, durationSeconds } = req.body;

    if (!habitId || !userId || !startTime || !endTime || !durationSeconds) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const progress = await Progress.create({
      habitId,
      userId,
      habitType: 'build',
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      durationSeconds,
    });

    res.status(201).json({ message: "Session saved", progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// For remove habits — save daily check-in
exports.checkIn = async (req, res) => {
  try {
    const { habitId, userId, resisted, note } = req.body;

    if (!habitId || !userId || resisted === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already checked in today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existing = await Progress.findOne({
      habitId,
      userId,
      habitType: 'remove',
      checkInDate: { $gte: today, $lt: tomorrow },
    });

    if (existing) {
      return res.status(400).json({
        error: "Already checked in today",
        progress: existing,
      });
    }

    const progress = await Progress.create({
      habitId,
      userId,
      habitType: 'remove',
      checkInDate: new Date(),
      resisted,
      note: note || '',
    });

    res.status(201).json({ message: "Check-in saved", progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all progress for a habit
exports.getHabitProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ habitId: req.params.habitId })
      .sort({ createdAt: -1 });
    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get streak for a remove habit
exports.getStreak = async (req, res) => {
  try {
    const records = await Progress.find({
      habitId: req.params.habitId,
      habitType: 'remove',
      resisted: true,
    }).sort({ checkInDate: -1 });

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < records.length; i++) {
      const recordDate = new Date(records[i].checkInDate);
      recordDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (recordDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    res.status(200).json({ streak });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};