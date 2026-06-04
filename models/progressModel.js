const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  habitType: {
    type: String,
    enum: ['build', 'remove'],
    required: true,
  },
  // For build habits — timer session data
  startTime: { type: Date },
  endTime: { type: Date },
  durationSeconds: { type: Number },

  // For remove habits — check-in data
  checkInDate: { type: Date },
  resisted: { type: Boolean },
  note: { type: String },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Progress', progressSchema);