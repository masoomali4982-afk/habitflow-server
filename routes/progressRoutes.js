const express = require('express');
const router = express.Router();
const {
  markDone,
  checkIn,
  getHabitProgress,
  getStreak,
} = require('../controllers/progressController');

router.post('/done', markDone);
router.post('/checkin', checkIn);
router.get('/:habitId', getHabitProgress);
router.get('/streak/:habitId', getStreak);

module.exports = router;