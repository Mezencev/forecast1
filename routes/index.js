const express = require('express');
const router = express();
const request = require('request');
const bodyParse = require('body-parser');


router.use(bodyParse.urlencoded({ extended: true }));
router.set('view engine', 'ejs');

router.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});


module.exports = router;
