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
  res.render('inde');
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${Key.key}`;
  request(url, (err, response, body) => {
    if
    (err) {
      res.render('inde', { weather: null, err: 'Error, please try again' });
    }
    else
    {
      let weather = JSON.parse(body);
      if
      (weather.name === undefined) {
        res.render('inde', { weather: null, err: 'Error, please try again' });
      }
      else
      {
        let weatherText = `it is ${weather.main.temp} degress in ${weather.name} !`;
        res.render('inde', { weather: weatherText, err: null });
      }
    }
  });
});

app.listen(8080);

