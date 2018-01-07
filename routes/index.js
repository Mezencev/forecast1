
const express = require('express');

const weathers = require('./weathersRouter');

const router = express.Router();

router.get('/', (req, res) => { res.render('index', { weather: null, error: null }); });
router.use(weathers);

module.exports = router;
