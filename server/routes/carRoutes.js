const express = require('express');
const router = express.Router();
const { getCarRecommendations } = require('../controllers/carController');

router.post('/recommend', getCarRecommendations);

module.exports = router;
