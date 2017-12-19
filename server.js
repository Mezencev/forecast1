const express = require('express');
const bodyParse = require('body-parser');
const request = require('request');

const Key = require('./total');
const app = express();

app.use(bodyParse.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('inde', { weather: null, error: null });
});

app.post('/', (req, res) => {
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Key.key}`;

  request(url, (err, response, body) => {
    if (err) {
      res.render('inde', { weather: null, error: 'Error, please try again' });
    } else {
      const weather = JSON.parse(body);
      if (weather.main === undefined) {
        res.render('inde', { weather: null, error: 'Error, please try again' });
      } else {
        const weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!
        ${weather.weather[0].main}`;
        res.render('inde', { weather: weatherText, error: null });
      }
    }
  });
});

app.listen(8080, () => {
  console.log('Example app listening on port 3000!');
});
