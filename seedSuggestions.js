require('dotenv').config();
const mongoose = require('mongoose');
const SuggestedHabit = require('./models/suggestedHabitModel');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://habitflow:HabitFlow2026!!@habitflow-cluster.5w3rpqj.mongodb.net/habit_tracker?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected for seeding'));

const suggestions = [
  { title: 'Morning Walk', category: 'Health', goalType: 'build', description: '30 min walk every morning' },
  { title: 'Drink 8 Glasses of Water', category: 'Health', goalType: 'build', description: 'Stay hydrated daily' },
  { title: 'Sleep by 10pm', category: 'Health', goalType: 'build', description: 'Consistent sleep schedule' },
  { title: 'Quit Smoking', category: 'Health', goalType: 'remove', description: 'Reduce and eliminate smoking' },
  { title: 'Reduce Sugar Intake', category: 'Health', goalType: 'remove', description: 'Cut sugary drinks and snacks' },
  { title: 'Daily Push-ups', category: 'Exercise', goalType: 'build', description: '3 sets every day' },
  { title: '20 Minute Run', category: 'Exercise', goalType: 'build', description: 'Daily cardio session' },
  { title: 'Evening Stretching', category: 'Exercise', goalType: 'build', description: 'Full body stretch before bed' },
  { title: 'Read 20 Pages Daily', category: 'Study', goalType: 'build', description: 'Any book of your choice' },
  { title: 'Study for 1 Hour', category: 'Study', goalType: 'build', description: 'Focused study without phone' },
  { title: 'Stop Skipping Classes', category: 'Study', goalType: 'remove', description: 'Attend all sessions' },
  { title: 'Plan Your Day', category: 'Productivity', goalType: 'build', description: 'Write daily tasks every morning' },
  { title: 'No Phone During Work', category: 'Productivity', goalType: 'remove', description: 'Keep phone away while working' },
  { title: 'Stop Procrastinating', category: 'Productivity', goalType: 'remove', description: 'Start tasks immediately' },
  { title: '10 Minute Meditation', category: 'Wellness', goalType: 'build', description: 'Daily mindfulness practice' },
  { title: 'Gratitude Journal', category: 'Wellness', goalType: 'build', description: 'Write 3 things you are grateful for' },
  { title: 'Reduce Screen Time', category: 'Wellness', goalType: 'remove', description: 'Limit phone before bed' },
];

SuggestedHabit.insertMany(suggestions)
  .then(() => {
    console.log('Suggestions seeded successfully');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log('Seed error:', err.message);
    mongoose.disconnect();
  });