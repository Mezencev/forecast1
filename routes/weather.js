const express = require('express');

const weathersConstoller = require('../config/weathersController');

const router = express.Router();

router.get('/weather', weathersConstoller.getWeather);

module.exports = router;
