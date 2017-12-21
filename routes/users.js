const express = require('express');
const router = express();
const request = require('request');
const bodyParse = require('body-parser');
require('dotenv/config');

router.use(express.static('public'));
router.set('view engine', 'ejs');
router.use(bodyParse.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.KEY}`;
  request(url, (err, response, body) => {
    if (err) {
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      const weather = JSON.parse(body);
      if (weather.main === undefined) {
        res.render('index', { weather: null, error: 'new error' });
      } else {
        const weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!
        ${weather.weather[0].main}`;
        res.render('index', { weather: weatherText, error: null });
      }
    }
  });
});

module.exports = router;
