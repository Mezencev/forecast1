const express = require('express');

const weathersConstoller = require('../controllers/weathersController');

const router = express.Router();

router.get('/weather', weathersConstoller.getWeather);

module.exports = router;
