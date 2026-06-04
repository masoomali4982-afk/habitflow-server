const express = require('express');
const router = express.Router();
const { getAllSuggestions } = require('../controllers/suggestionController');

router.get('/', getAllSuggestions);

module.exports = router;