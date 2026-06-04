const express = require('express');
const router = express.Router();
const {
  addHabit,
  getHabits,
  deleteHabit,
  updateReminder,
} = require('../controllers/habitController');

router.post('/add', addHabit);
router.get('/:userId', getHabits);
router.delete('/:id', deleteHabit);
router.patch('/:id/reminder', updateReminder);

module.exports = router;